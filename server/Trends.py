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
    url = "http://localhost:5000/get_collection_data?c=bored%20ape%20yacht%20club&t={}".format(query)
    response = urlopen(url)
    data_json = json.loads(response.read())
    return data_json


def plot_data(query):
    data_json = json_data(query)
    print(data_json)
    days = []
    vals=[]
    for member in data_json:

        vals.append(member['value'])
        d = datetime.today() - timedelta(member['daysAgo'])
        
        date = '%s-%s-%s' % (d.day, d.month, d.year)
        print(date)
        days.append(date)


    fig, ax = plt.subplots(1, 1)
    ax.plot(days, vals,color='blue', alpha=1)
    ax.get_yaxis().get_major_formatter().set_scientific(False)
    plt.xticks(rotation=45, ha="right")
    #plt.xticks(days, " ")
    plt.xlabel("30 Days Trend")
    plt.ylabel("Total {}".format(query))
    fig.patch.set_facecolor('blue')
    fig.patch.set_alpha(0.1)

    ax.set(facecolor = "blue")
    ax.patch.set_alpha(0.1)
    plt.fill_between(days, vals, color='blue', alpha=0.4)



    ax.set_xticks(ax.get_xticks()[::40])
    plt.savefig("filename.png")

    plt.show()




plot_data(query='value')


