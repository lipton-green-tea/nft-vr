from flask import Flask, jsonify, request, render_template, send_file, send_from_directory
import requests
import flask
import time
import os
import requests_cache
from flask_cors import CORS
from TranscriptFilter import filter_transcript, check_in_array, resultfunct
import base64
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

template_dir = os.path.abspath('../client')
app = Flask(__name__, template_folder=template_dir)
CORS(app)

DOMAIN = "https://api2.cryptoslam.io/api"
CDN = "https://d35vxokfjoq7rk.cloudfront.net"
SIZE = 800

requests_cache.install_cache(
    cache_name='github_cache', backend='sqlite', expire_after=3000)


def fetchData(p):
    url = f"{DOMAIN}/{p}"
    print(url)

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7',
    }

    req = requests.get(url, headers=headers)
    data = req.json()
    return data


def getNFT(tokenAddress, tokenID, size=800):
    url = f"{CDN}/{tokenAddress}/{tokenID}-0.png?d={size}"
    return url


def getExchange():
    req = requests.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR")
    data = req.json()
    return data

@app.route('/transcript', methods=['GET', 'POST'])
def handleTranscript():
    content = request.json["text"]
    print(content)

    collections = ["bored ape yacht club", "art blocks", "doodles"]
    info = ["buyers", "sellers", "sales"]

    words = content.split(" ")

    if "trending" or "refresh" in words:
        res = []
        for c in colls:
            data = fetchData(
                "marketplace/{}/12/last?_={}".format(c, round(int(time.time()), -6)))
            address = data[0]["tokens"][0]["address"]
            tokenID = data[0]["tokens"][0]["tokenId"]
            img_url = getNFT(address, tokenID, size=SIZE)
            data[0]["width"] = SIZE
            data[0]["height"] = SIZE
            data[0]["dollars"] = getExchange()["USD"]
            data[0]["url"] = "https://nft-vr.herokuapp.com/url/{}".format(
                img_url)
            res.append(data[0])
        return jsonify(res)

    if "collection" in words:
        for c in collections:
            if all([x in words for x in c.split(" ")]):
                data = fetchData(
                    "marketplace/{}/12/last?_={}".format(c, round(int(time.time()), -6)))
                for nft in data:
                    address = nft["tokens"][0]["address"]
                    tokenID = nft["tokens"][0]["tokenId"]
                    img_url = getNFT(address, tokenID, size=SIZE)
                    nft["width"] = SIZE
                    nft["height"] = SIZE
                    nft["dollars"] = getExchange()["USD"]
                    nft["url"] = "/url/{}".format(img_url)
                    return jsonify(data)

    for w in info:
        if w in words:
            return w

    return jsonify(None)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/get_trending')
def fetchTrendingCollections(timescale="day"):
    if timescale in ["day", "week", "month", "all"]:
        data = fetchData("nft-dashboard/nft-dashboard-data")
        return jsonify(data["saleSummaries"][timescale]["saleSummaries"])


@app.route('/get_trending_nfts')
def fetchTrendingNFTs(timescale="day"):
    colls = ["bored ape yacht club", "art blocks",
             "doodles", "world of women", "Mutant Ape Yacht Club", "Clonex", "meebits"]
    res = []
    for c in colls:
        data = fetchData(
            "marketplace/{}/12/last?_={}".format(c, round(int(time.time()), -6)))
        address = data[0]["tokens"][0]["address"]
        tokenID = data[0]["tokens"][0]["tokenId"]
        img_url = getNFT(address, tokenID, size=SIZE)
        data[0]["width"] = SIZE
        data[0]["height"] = SIZE
        data[0]["dollars"] = getExchange()["USD"]
        data[0]["url"] = "https://nft-vr.herokuapp.com/url/{}".format(img_url)
        res.append(data[0])
    return jsonify(res)


@app.route('/get_collection')
def fetchCollectionMarketplace():
    c = request.args.get("c")
    data = fetchData("marketplace/{}/12/last?_={}".format(c,
                     round(int(time.time()), -6)))
    for nft in data:
        address = nft["tokens"][0]["address"]
        tokenID = nft["tokens"][0]["tokenId"]
        img_url = getNFT(address, tokenID, size=SIZE)
        nft["width"] = SIZE
        nft["height"] = SIZE
        nft["dollars"] = getExchange()["USD"]
        nft["url"] = "https://nft-vr.herokuapp.com/url/{}".format(img_url)
    return jsonify(data)


@app.route('/get_collection_data_graph')
def fetchCollectionData():
    c = request.args.get("c")
    t = request.args.get("t")
    dict_ = {'buyers': 'Buyers', 'sellers': 'Sellers', 'value': 'Total Sales'}
    if t in ["buyers", "sellers", "value"]:
        data = fetchData(
            "sales/{}/summary-daily-{}?_={}".format(c, t, round(int(time.time()), -6)))
        
        days = list(range(len(data)))
        vals = list(map(lambda i: i["count"], data))
        fig, ax = plt.subplots(1, 1)
        ax.plot(days, vals, color='blue', alpha=1)
        fig.patch.set_alpha(0)
        ax.patch.set_alpha(0)
        plt.title("{} - Trend over 30 days".format(dict_[t]), y = -.085)
        plt.fill_between(days, vals, color='blue', alpha=0.4)
        # plt.axis('off')
        plt.xticks(days, "")
        plt.yticks(vals, "")      
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        ax.axes.xaxis.set_ticks([])
        ax.axes.yaxis.set_ticks([])
        plt.savefig("chart.png")

        return send_file("chart.png", mimetype='image/png')
    else:
        return jsonify(None)


method_requests_mapping = {
    'GET': requests.get,
    'HEAD': requests.head,
    'POST': requests.post,
    'PUT': requests.put,
    'DELETE': requests.delete,
    'PATCH': requests.patch,
    'OPTIONS': requests.options,
}

url_cache = []


@app.route('/url/<path:url>', methods=method_requests_mapping.keys())
def proxy(url):
    requests_function = method_requests_mapping[flask.request.method]
    request = requests_function(url, stream=True, params=flask.request.args)
    response = flask.Response(flask.stream_with_context(request.iter_content()),
                              content_type=request.headers['content-type'],
                              status=request.status_code)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

# @app.route('/url/<path:url>', methods=method_requests_mapping.keys())
# def proxy(url):
#     img = url.split("/")[-1].split("?")[0]
#     if url not in url_cache:
#         r = requests.get(url)
#         with open("../client/images/" + img, 'wb') as f:
#             f.write(r.content)
#     return send_from_directory('../client/images/', img)


@app.route('/<path:path>')
def static_dir(path):
    return send_from_directory('../client/', path)


if __name__ == "__main__":
    app.run(debug=True)
