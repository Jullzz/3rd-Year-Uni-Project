from flask import Flask, render_template, request
import http.client, sys, requests, json
app = Flask(__name__)

# API SERVER ADDRESS:
#   http://web:8000

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/displayAll')
def get_data():
    response = requests.get('http://web:8000/api/getdbdata').content
    y = json.loads(response)

    ret = app.response_class(
        response=json.dumps(y),
        status=200,
        mimetype='application/json'
    )
    return response



@app.route('/sendIt')
def send_data():
    response = json.loads(requests.get('http://web:8000/api/getdbdata').content)
    print(response)
    return requests.get('http://web:8000/test/writePoints', json=response).content

@app.route('/post')
def post_data():
    return

@app.route('/sendCustomData', methods=['GET','POST'])
def send_customer_data():
    if request.method =='POST':
        data_dict = {
            'direction': request.form['direction'],
            'host': request.form['host'],
            'value': int(request.form['value'])
        }
        info = json.dumps(data_dict)
        info = [info]
        response = requests.get('http://web:8000/test/writePoint', json=info)
    return response.content


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
