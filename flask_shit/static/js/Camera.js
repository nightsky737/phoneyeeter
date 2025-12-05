
    import {
    FilesetResolver,
    ObjectDetector
    } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js";

    const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    let objectDetector = await ObjectDetector.createFromOptions(vision, {
    baseOptions: {
    modelAssetPath: `https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite`
    },
    scoreThreshold: 0.5,
    runningMode: "VIDEO"
    });

    const videoElement = document.getElementById('camFeed')
    const canvas = document.getElementById('canvas') 
    const ctx = canvas.getContext('2d') 


    let sendInterval; //aprarently it returns a number
    const fps = 60;
    const width = screen.width  * 0.8;
    const height = screen.height * 0.8;
    canvas.width = width
    canvas.height = height

    let canvasInterval = window.setInterval(() => {

    ctx.drawImage(videoElement, 0, 0, width, height);
    }, 1000 / fps);

    if (videoElement.videoWidth > 0){
    const detections = objectDetector.detectForVideo(
    videoElement,
    performance.now()
    );
    console.log(detections)
    }


    videoElement.onplay = function() {
    clearInterval(canvasInterval);


    canvasInterval = window.setInterval(() => {
    ctx.drawImage(videoElement, 0, 0, width, height);
    }, 1000 / fps);

    };

    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        videoElement.srcObject = stream;
        videoElement.onloadedmetadata = () => {
        videoElement.play();

        };    
    }) 
    .catch(error => {
            alert("Could not access the camera. Please ensure you have a camera connected and grant permission.");
    });

