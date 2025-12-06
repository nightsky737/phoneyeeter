import math, threading
import numpy as np
from flask import Flask, render_template, request, jsonify, url_for
from flask_socketio import SocketIO, send, emit, join_room, leave_room 
import random
import json
import os
import base64


app = Flask(__name__) 

app.config['SECRET_KEY'] = 'secret!' #i have no idea what this does but i guess its supposed to be an env variable. i deal with it later.
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')


def integrate_list(datalist, timesteps):
    total  = 0
    #ig ill just LHS riemanns it
    for i in range(len(datalist)):
        total += datalist[i] * (timesteps[i + 1] - timesteps[i]) / 1000 #cause in milli
    return total

def proj_motion(vix, viy, dt=0.03):
    g = 9.81 
    x = 0
    y = 0
    #this is all in meters
    points = [[0,0]]
    while(y >= -2):
        #no shot u drop it from >2m
        x += vix * dt
        y += viy * dt
        viy -= g * dt
        points.append([x, y])
    
def find_acceleration(accel_data):
    #int over x y z sperately. Returns {vx, vy, vz}
    ax = sum([datapoint['x'] for datapoint in accel_data])
    ay = [datapoint['y'] for datapoint in accel_data]
    # az = [datapoint['z'] for datapoint in accel_data]
    timesteps = [datapoint['timestep'] for datapoint in accel_data]

    vix = integrate_list(ax, timesteps)
    viy = integrate_list(ay, timesteps)


    return proj_motion(vix, viy)

users = {} 
'''
Example user data:
uid : 
'''


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/newUser',  methods=["POST"])
def newUser():
    if request.method == 'POST':
        data = request.get_json()
        users[data["uid"]] = {}
        users[data["uid"]]["last_signal"] = 0 #now
    return {}

@app.route("/setHeight", methods=["POST"]) 
def setHeight():
    if request.method == 'POST':
        data = request.get_json()
        users[data["uid"]]['h'] = data["height"]
        print(users)
        return {}

@app.route("/pushAccel", methods=["POST"]) 
def pushAccel():
    if request.method == 'POST':
        data = request.get_json()
        # users[data["uid"]]['adata'] = data['data']

        find_acceleration(data['data'])

        return {}


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

@socketio.on('connect')
def handle_connect():
    uid = request.sid
    users[uid] = {}
    users[uid]["last_signal"] = 0 #now
    emit("uid", uid)

@socketio.on('accel_data')
def handle_accel(data): #data be dict with phone_id, accelerometer data
    users[data["phone_id"]] = data["accel_data"]  
    print(data) 
    emit("message", f"we got ur shit")
    emit("pong") 


# @socketio.on('cam_data')
# def handle_cam(data): #data be dict with phone_id, accelerometer data
#     with open("imageToSave.png", "wb") as fh:
#         fh.write(data)

#     emit("pong") 

    
if __name__ == "__main__":
    # app.run(host="0.0.0.0", port=4500, debug=True)
    socketio.run(app, host="0.0.0.0", port= int(os.environ.get("PORT", 8080)), debug=True)
