from flask import Flask, render_template
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
    # return json.dumps(y), 200, 'application/json'

@app.route('/sendIt')
def send_data():
    response = json.loads(requests.get('http://web:8000/api/getdbdata').content)
    return requests.get('http://web:8000/test/addData', json=response).content

@app.route('/post')
def post_data():
    return

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
