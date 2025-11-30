# Plan: 
Throw your phone!

# Features:
 - you yeet your phone but dont actually yeet it
 - integrates full vel (from start button pressed) to when the velocity becomes 0 (or close enough) to find the thrown at velocity
 - send to backend to apply kinematic equations? wait how do i find position? With a webcam? Or ig we'll start with the "assume an avg person of height x and release height y" and then make graphs based on random scenarios (ie off a cliff, etc)
 - also maybe they can also have a webcam to throw one across the room. But I also need reference image for size (ig i can use the phone and ask to stand flat from camera)
 - use person as height calibrator?

# okay actual plan more thought out than rambles
1. Person grabs phone. Person then stands in front of PC webcam camera (STRAIGHT) until I borow the bounding boxes
    Also inputs their height and I will use that as the scale (pixels to meters) for everything.
2. They yeet the phone. pull accelerometer data to find the velocity as it leaves?
3. Plot the trajectory onto the video or plot it onto 3.js

# Things i need to figure out:
1. Phone on mobile
 - Detect if on mobile
 - send data to a pc. 
 - uh ig ill figure out websocket servers too. 

## Flask endpoints (no websocket)
- vidImage : Finds the person in the image and their height in pixels. Returns the image with bounding box on it in addition to the pixel length of their height. Captures readings/images if 2 consecutive (5s) bounding boxes are similarish. 
- setHeight : Sets the calibration height.

## Websockets
- (Phone) : SendAcc -> starts sending accelerometer data. Will currently not be websocket? (can I get away with this?)
- (PC) : server sends info over to PC. Info includes:
    - Pixel coordinates of line, and ig needs to also plot it.
    - would be cool asf to plot ALL the lines depending on when you would have released.

# Actual plan:
1. 

## issues:
 - give options for what to use to calibrate.

# todo:
- ig i figure out how to websocket onto a server (mine) before i figure out how to send stuff to clients.
