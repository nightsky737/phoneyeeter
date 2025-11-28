// typescrip compiles to javascript (tsc path_to_typescript_file)
//vite auto compiles but u needa double check that via tsc

let age :number; //or string
let names : string[];
let random_shit : []; //can chose to specify variable type ofr array
let random : any; //not reccommended bc whole point of ts is to check
let idk : number | string; //or
let outputType : "as-string"; //forces literal defn
const same =5; //const is same as in js

let person :{
    firstName: string,
    age: number,
} = {
    firstName: "betty",
    age: 10,
}


function add(NumberOne: number, numberTwo: number):number{
    return 2//returns a number (and takes 2 number.)
}

//bc functions are objects in python, we can add callbacks in javascript that are executed after a function 
//medium microclip.lakeesha basics of typescript