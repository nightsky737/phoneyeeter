import math, threading
import numpy as np
from flask import Flask, render_template, request, jsonify, url_for
from flask_socketio import SocketIO, send, emit, join_room, leave_room 
import random
import json


app = Flask(__name__) 

app.config['SECRET_KEY'] = 'secret!' #i have no idea what this does but i guess its supposed to be an env variable. i deal with it later.
socketio = SocketIO(app, cors_allowed_origins="*")

users = {} #haha as if we would get > 1 user
#will store the sids of users ig

@app.route('/')
def index():
    # sim.refresh()
    return render_template('index.html')

# @app.route("/get_one_body_info", methods=["POST"]) 
# def get_info():
#     if request.method == 'POST':
#         return jsonify(sim.get_one_body_info(request.get_json()['index']))

# @app.route("/wind", methods=["POST"]) 
# def wind():
#     if request.method == 'POST':  
#         timestep = request.get_json()["timestep"]
#         sim.wind(int(timestep))
#         return {}
# @app.route("/remove", methods=["POST"]) 
# def remove():
#     if request.method == 'POST':  
#         sim.remove(request.get_json()["index"])
#         return {}

@socketio.on('message')
def handle_join(data): #data be dict with phone_id, accelerometer data
    users[data["phone_id"]] = data["accel_data"]   
    emit("message", f"we got ur shit")

    
if __name__ == "__main__":
    # app.run(host="0.0.0.0", port=4500, debug=True)
    socketio.run(app, host="0.0.0.0", port=4500, debug=True)
