// INTRO
// (function(){
//     let uname = prompt("What's your name?");
//     alert("Hello " + uname);
// })();
// IIFE = immediately invoked function execution

//TASK
(function myTimer(){
    let msg = prompt("Timer for how long?");
    let time = msg;
    let timer = setInterval(function(){
        console.log(time--);
        if(time==0){
            alert("Counted till timer");
            clearInterval(timer);
        }
    },1000);
    
})();