function requestMotionPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    window.addEventListener('devicemotion', handleMotion);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('devicemotion', handleMotion);
    }
}
let server_path = "http://192.168.1.134:8080" //"https://flask-shit.fly.dev/"
const socket = io(server_path);


function handleMotion(event) {
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
        'z' : acl.z
        }
        var message = {"phone_id" : 1, "accel_data" : accel_data}
        socket.emit('accel_data', message); 
    } 

    socket.on("message", (msg) => {
        console.log(msg)
    })

    socket.on("pong", (args)=> {
        console.log("u got pong'd")
    }) 

