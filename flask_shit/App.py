import math, threading
import numpy as np
from flask import Flask, render_template, request, jsonify, url_for
from flask_soceketio 
import random
import json


app = Flask(__name__) #assuming this makes flask stuff



@app.route('/')
def index():
    # sim.refresh()
    return render_template('index.html')

@app.route("/get_one_body_info", methods=["POST"])
def get_info():
    if request.method == 'POST':
        return jsonify(sim.get_one_body_info(request.get_json()['index']))

@app.route("/wind", methods=["POST"]) 
def wind():
    if request.method == 'POST':  
        timestep = request.get_json()["timestep"]
        sim.wind(int(timestep))
        return {}

@app.route("/remove", methods=["POST"]) 
def remove():
    if request.method == 'POST':  
        sim.remove(request.get_json()["index"])
        return {}




    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4500, debug=True)
