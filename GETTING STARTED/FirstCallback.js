let minimist = require("minimist");
let args = minimist(process.argv);

let fs = require("fs");

function IsPrime(x){
    let isPrime=true;
    for(let div=2; div<x; div++){
        if(x%div==0){
            isPrime=false;
            break;
        }
    }
    return isPrime;
}

//task1 area begins
let t1 = Date.now();
console.log("Starting task 1 at " + (t1 % 100000));

// let data = fs.readFileSync(args.source);
//callback -> function passed as a parameter
fs.readFile(args.source, function(data){
    let t2 = Date.now();
    console.log("Finishing task 1 at " + (t2 % 100000));
    console.log(t2 - t1);
})

//task1 area ends

//task2 area begins
let t3 = Date.now();
console.log("Starting task 2 at " + (t3 % 100000));
let arr = [];
for (let i = 2; i < args.n; i++) {
  let isPrime = IsPrime(i);
  if (isPrime == true) {
    arr.push(i);
  }
}

let t4 = Date.now();
console.log("Finishing task 2 at " + (t4 % 100000));
console.log(t4 - t3);
//task2 area ends

// console.log(t4 - t1);