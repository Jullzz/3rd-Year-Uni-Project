from flask import Flask, render_template
import http.client, sys, requests
app = Flask(__name__)

# API SERVER ADDRESS:
#   http://web:8000

@app.route('/')
def hello_world():
    return 'hey'

@app.route('/displayAll')
def get_data():
    return requests.get('http://web:8000/api/getdbdata').content

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
