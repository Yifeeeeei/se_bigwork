from flask import Flask
from flask import request
from flask import render_template, redirect,url_for
import json
app = Flask(__name__)

@app.route('/')
def hello_word():
    return 'Hello World'

@app.route('/api/get_container',methods = ['POST'])
def api_get_container():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    container_id = json_data['container_id']
    


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=11451)