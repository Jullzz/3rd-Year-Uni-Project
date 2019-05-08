from flask import Flask, render_template
import http.client, sys, requests, json
app = Flask(__name__)

# API SERVER ADDRESS:
#   http://web:8000

@app.route('/')
def hello_world():
    return 'hey'

@app.route('/displayAll')
def get_data():
    response = requests.get('http://web:8000/api/getdbdata').content
    y = json.loads(response)
    return y[2]['host']

@app.route('/FuckenSendIt')
def send_data():
    response = json.loads(requests.get('http://web:8000/api/getdbdata').content)
    requests.get('http://web:8000/test/addData', json=response)
    return 'i tried'

@app.route('/post')
def post_data():
    return

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
