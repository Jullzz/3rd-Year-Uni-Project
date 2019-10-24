from flask import Flask, render_template, request
from random import *
import http.client, sys, requests, json, base64, struct
app = Flask(__name__)
URL_BASE = "/flask/"

# API SERVER ADDRESS:
#   http://web:8000
API_SA = 'http://web:8000'

count =0;# used because everytime 1 person is detected the arduino send 3 packages

@app.route(URL_BASE + 'test', methods=['GET','POST'])
def test():
    #obj = json.loads(request.get_data().decode('utf-8'))
    #load64 = obj.get('payload_raw')
    #loadString1 = base64.b64decode(load64)
    loadString = [1,2,3,4,5,6,7,8]
    data_dict = {
            'title': 'Rosalind1',
            'lat': -36.757234,
            'lng': 144.279113,
            'direction1': 1,
            'direction2': 0,
            'bikeDir1': 0,
            'bikeDir2': 0,
            'pedDir1': 1,
            'pedDir2': 0,
            'timestamp':0
    }
    if random()<0.5:## function to determine whether it is a cyclist or pedestrian
        data_dict['bikeDir1']=1;
        data_dict['pedDir1']=0;
    count++
    info = json.dumps(data_dict)
    info_array = [info]
    if count=3:# if its on its 3 package, it finally sends to the database
        count=0
        response = requests.get(API_SA +'/api/sendSingleData', json=info_array)
    return "done"
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
