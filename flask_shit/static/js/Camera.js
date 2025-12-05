
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
let loaded = false

const fps = 60;
const width = screen.width * 0.8 ;
const height = screen.height;

const vidH = 480
const vidW = 640

canvas.width = width
canvas.height = height
ctx.font = "20px Georgia";


videoElement.addEventListener('loadeddata', function() {
  loaded = true;
}, false);

function loop() {
ctx.drawImage(videoElement, 0, 0, width, height);

if (loaded){
const detections = objectDetector.detectForVideo(
videoElement,
performance.now()
); 


detections.detections.forEach(det => {
    console.log(videoElement.videoWidth)
    console.log(videoElement.videoHeight)

    let box = det.boundingBox
    let cat = det.categories
    ctx.strokeStyle = "red";

    ctx.strokeRect(box.originX *  width / vidW, box.originY  *height / vidH, box.width *  width / vidW, box.height*height / vidH)
    ctx.fillText(cat[0].categoryName , box.originX *  width / vidW, box.originY*height / vidH);

});

console.log(detections)
}

requestAnimationFrame(loop);
};
loop();


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

