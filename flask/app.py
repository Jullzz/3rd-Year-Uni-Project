from flask import Flask, render_template, request
import http.client, sys, requests, json, base64, struct
app = Flask(__name__)
URL_BASE = "/flask/"

# API SERVER ADDRESS:
#   http://web:8000
API_SA = 'http://web:8000'

@app.route(URL_BASE)
def hello_world():
    return render_template('index.html')


@app.route(URL_BASE + 'displayAll')
def get_data():
    response = requests.get(API_SA +'/api/getPointData').content
    y = json.loads(response)

    ret = app.response_class(
        response=json.dumps(y),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route(URL_BASE + 'test', methods=['POST'])
def test():
    obj = json.loads(request.get_data().decode('utf-8'))
    print(obj.get('counter'), file=sys.stderr)
    load64 = obj.get('payload_raw')
    print(load64, file=sys.stderr)
    loadString = base64.b64decode(load64)
    print(loadString, file=sys.stderr)
    out=""
    for x in loadString:
        out = out + x +", "
    return "done"

@app.route(URL_BASE + 'sendIt')
def send_data():
    return requests.get(API_SA +'/test/writePoints', json=json.loads(requests.get(API_SA +'/api/getPointData').content)).content

@app.route(URL_BASE + 'deleteAll')
def post_data():
    return requests.get(API_SA+ '/api/deleteAllData').content

@app.route(URL_BASE + 'sendCustomData', methods=['GET','POST'])
def send_customer_data():
    if request.method =='POST':
        data_dict = {
            # 'time': int(request.form['time']),
            'direction': request.form['direction'],
            'host': request.form['host'],
            'value': int(request.form['value'])
        }
        info = json.dumps(data_dict)
        #info_array = [info, info, info]
        info_array = [info]
        response = requests.get(API_SA +'/test/writePoint', json=info_array)
    return response.content


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
