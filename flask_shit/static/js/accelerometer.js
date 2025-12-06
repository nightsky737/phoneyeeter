function requestMotionPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(response => {
            console.log(response)

                if (response === 'granted') {
                    window.addEventListener('devicemotion', handleMotion);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('devicemotion', handleMotion);
    }
}

requestMotionPermission()

let accelHistory = []
let lastMotion = 0 //time when last zero was taken
let shouldCollect = false;

function start(){
    accelHistory  = []
    lastMotion = Date.now()
    shouldCollect = true;
}


async function handleMotion(event) {
    const acl = event.accelerationIncludingGravity;

    // if (acc && acc.x !== null && acc.y !== null && acc.z !== null) {
    // 	// Add to history for strum detection
        // accelHistory.push({
        // 	x: acc.x, 
        // 	y: acc.y,
        // 	z: acc.z,
        // 	timestamp: Date.now()
        // });

        accel_data = {
        'x' : acl.x,
        'y' : acl.y,
        'z' : acl.z,
        'timestamp': Date.now()

        }
        console.log(accel_data);

        if(shouldCollect){
        accelHistory.push(accel_data)
        }

        if(acl.x ** 2 + acl.y ** 2 + acl.z ** 2 > 0.01){
            //motion has stopped 
            lastMotion = Date.now();
        }
        if(Date.now - lastMotion > 2000){
            //stopped moving for 2s
            shouldCollect = false;
             
            await fetch('/pushAccel', {
                    method: 'POST',   
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json',  
                    "Accept": "application/json"
                    },
                body: JSON.stringify({ "uid": uid, 'data' : accelHistory}) 
                })
        }

    } 


document.getElementById("motionPerms").addEventListener('click', requestMotionPermission())
document.getElementById("startTracking").addEventListener('click', start())
