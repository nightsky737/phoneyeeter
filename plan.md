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

## issues:
 - give options for what to use to calibrate.

# todo:

