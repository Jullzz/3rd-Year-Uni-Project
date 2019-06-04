from flask import Flask, render_template, request
import http.client, sys, requests, json
app = Flask(__name__)

# API SERVER ADDRESS:
#   http://web:8000
API_SA = 'http://web:8000'

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/displayAll')
def get_data():
    response = requests.get(API_SA +'/api/getPointData').content
    y = json.loads(response)

    ret = app.response_class(
        response=json.dumps(y),
        status=200,
        mimetype='application/json'
    )
    return response



@app.route('/sendIt')
def send_data():
    return requests.get(API_SA +'/test/writePoints', json=json.loads(requests.get(API_SA +'/api/getPointData').content)).content

@app.route('/deleteAll')
def post_data():
    return requests.get(API_SA+ '/api/deleteAllData').content

@app.route('/sendCustomData', methods=['GET','POST'])
def send_customer_data():
    if request.method =='POST':
        data_dict = {
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
