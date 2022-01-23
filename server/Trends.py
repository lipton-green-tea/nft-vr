# import urllib library
from urllib.request import urlopen
from datetime import datetime, timedelta
from winreg import QueryInfoKey
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import numpy as np
# import json
import json
# store the URL in url as
# parameter for urlopen

# store the response of URL


# storing the JSON response
# from url in data

def json_data(query):
    url = "http://localhost:5000/get_collection_data?c=bored%20ape%20yacht%20club&t={}".format(
        query)
    response = urlopen(url)
    data_json = json.loads(response.read())
    return data_json


data = [{"daysAgo": 29, "count": 14}, {"daysAgo": 28, "count": 25}, {"daysAgo": 27, "count": 42}, {"daysAgo": 26, "count": 40}, {"daysAgo": 25, "count": 25}, {"daysAgo": 24, "count": 20}, {"daysAgo": 23, "count": 12}, {"daysAgo": 22, "count": 12}, {"daysAgo": 21, "count": 19}, {"daysAgo": 20, "count": 30}, {"daysAgo": 19, "count": 51}, {"daysAgo": 18, "count": 52}, {"daysAgo": 17, "count": 18}, {"daysAgo": 16, "count": 24}, {"daysAgo": 15, "count": 16}, {
    "daysAgo": 14, "count": 16}, {"daysAgo": 13, "count": 21}, {"daysAgo": 12, "count": 61}, {"daysAgo": 11, "count": 287}, {"daysAgo": 10, "count": 161}, {"daysAgo": 9, "count": 102}, {"daysAgo": 8, "count": 81}, {"daysAgo": 7, "count": 66}, {"daysAgo": 6, "count": 73}, {"daysAgo": 5, "count": 59}, {"daysAgo": 4, "count": 65}, {"daysAgo": 3, "count": 123}, {"daysAgo": 2, "count": 48}, {"daysAgo": 1, "count": 65}, {"daysAgo": 0, "count": 48}]


def plot_data(data, query):
    days = list(range(len(data)))
    vals = list(map(lambda i: i["count"], data))
    fig, ax = plt.subplots(1, 1)
    ax.plot(days, vals, color='blue', alpha=1)
    plt.fill_between(days, vals, color='blue', alpha=0.4)
    plt.axis('off')
    plt.savefig("chart.png")


plot_data(data, query='sellers')
