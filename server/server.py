from flask import Flask, jsonify, request, render_template, send_from_directory
import requests
import time
import os

template_dir = os.path.abspath('client')
app = Flask(__name__, template_folder=template_dir)

DOMAIN = "https://api2.cryptoslam.io/api"
CDN = "https://d35vxokfjoq7rk.cloudfront.net"
SIZE = 800


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


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/get_trending')
def fetchTrendingCollections(timescale="day"):
    if timescale in ["day", "week", "month", "all"]:
        data = fetchData("nft-dashboard/nft-dashboard-data")
        return jsonify(data["saleSummaries"][timescale]["saleSummaries"])


@app.route('/get_collection')
def fetchCollectionMarketplace():
    c = request.args.get("c")
    data = fetchData("marketplace/{}/12/last?_={}".format(c, int(time.time())))
    for nft in data:
        address = nft["tokens"][0]["address"]
        tokenID = nft["tokens"][0]["tokenId"]
        nft["url"] = getNFT(address, tokenID, size=SIZE)
        nft["width"] = SIZE
        nft["height"] = SIZE
    return jsonify(data)


@app.route('/<path:path>')
def static_dir(path):
    return send_from_directory('../client/', path)


if __name__ == "__main__":
    app.run(debug=True)
