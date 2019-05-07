from flask import Flask
import http.client
import sys
app = Flask(__name__)

# API SERVER ADDRESS:
#   http://web:8000

@app.route('/')
def hello_world():
    return sys.version

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
