let minimist = require("minimist");
let args = minimist(process.argv);

let fs = require("fs");

// console.log(args.source);
// console.log(args.dest);
// console.log(args.n);

//task1 area begins
let t1 = Date.now();
console.log("Starting task at " + (t1 % 100000));

let data = fs.readFileSync(args.source);

let t2 = Date.now();
console.log("Finishing task at " + (t2 % 100000));
console.log(t2 - t1);
//task1 area ends

//task2 area begins
let t3 = Date.now();
console.log("Starting task at " + (t3 % 100000));
let arr = [];
for (let i = 2; i < args.n; i++) {
  let isPrime = IsPrime(i);
  if (isPrime == true) {
    arr.push(i);
  }
}

function IsPrime(x) {
  let isPrime = true;
}

let t4 = Date.now();
console.log("Finishing task at " + (t2 % 100000));
console.log(t4 - t3);
//task2 area ends

console.log(t4 - t1);