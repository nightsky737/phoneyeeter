let server_path = "http://192.168.1.134:8080" //"https://flask-shit.fly.dev/"
const socket = io(server_path);
const uid = crypto.randomUUID();


await fetch('/newUser', {
    method: 'POST',  
    credentials: 'include',
    headers: {
    'Content-Type': 'application/json',  
    "Accept": "application/json"
    },
body: JSON.stringify({ uid: uid}) 
})

// function handleMotion(event) {
//     const acl = event.accelerationIncludingGravity;
//     console.log(acl)

//         accel_data = {
//         'x' : acl.x,
//         'y' : acl.y,
//         'z' : acl.z
//         }
//         var message = {"phone_id" : 1, "accel_data" : accel_data}
//         socket.emit('accel_data', message); 
//     } 



socket.on("message", (msg) => {
    console.log(msg)
})

socket.on("uid", (args)=> {
    uid = args;
}) 



async function setHeight(){
fetch('/setHeight', {
    method: 'POST',  
    credentials: 'include',
    headers: {
    'Content-Type': 'application/json',  
    "Accept": "application/json"
    },
body: JSON.stringify({ uid: uid, height: document.getElementById("height").value}) 
})
}
document.getElementById("heightButton").addEventListener("click", setHeight);

