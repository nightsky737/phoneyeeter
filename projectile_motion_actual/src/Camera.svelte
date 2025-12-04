
<script lang='ts'>
     import { onMount } from 'svelte';
    onMount(() => {
    const videoElement = document.getElementById('camFeed') as HTMLVideoElement;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        
   
    let sendInterval: number; //aprarently it returns a number
    const fps = 60;
    const width = screen.width  * 0.8;
    const height = screen.height * 0.8;
    canvas.width = width
    canvas.height = height

    let canvasInterval = window.setInterval(() => {
        
    ctx.drawImage(videoElement, 0, 0, width, height);
        }, 1000 / fps);


    sendInterval = window.setInterval(() => {
    const imageData = canvas.toDataURL('image/png')
        console.log(imageData);

        

        }, 500);

    videoElement.onplay = function() {
        clearInterval(canvasInterval);
        clearInterval(sendInterval);


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

         });

</script>



<main>
    <canvas id="canvas"> </canvas>
        <video id="camFeed" autoplay loop muted hidden > </video>

</main>


