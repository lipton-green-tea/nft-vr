import json
import matplotlib.pyplot as plt

#with open('testdata.json') as json_file:
#    data = json.load(json_file)

#for
#print(data[i]['bicycle']['price'])

with open('testdata.json') as json_file:
    data = json.load(json_file)

history = []
daysAgo = []

for i in range(len(data)):
    value=data[i]["value"]
    day=data[i]["daysAgo"]
    history.append(value)
    daysAgo.append(day)

plt.plot(daysAgo, history)
plt.xlim(daysAgo[0], 0)
plt.xlabel("Days Ago")
plt.ylabel("Value, $")
plt.savefig('testPlot.png')
plt.show()