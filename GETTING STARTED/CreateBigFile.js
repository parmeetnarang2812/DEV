// Creating a big file to understand "Callback" better.
// node CreateBigFile.js --dest=big.data

let minimist = require("minimist");
let fs = require("fs");

let args = minimist(process.argv);

let arr = [];
for(let i = 0; i < 50000; i++){
    arr.push(i);
}

let str = arr.join("\n");

fs.writeFileSync(args.dest, str, "utf-8");
fs.appendFileSync(args.dest, str, "utf-8");
fs.appendFileSync(args.dest, str, "utf-8");
fs.appendFileSync(args.dest, str, "utf-8");