//read from f1.txt, capitalize, write to f2.txt
// node FirstFiles.js --source=f1.txt --dest=f2.txt

//Install minimist -> npm install minimist
//require similar to import
let minimist = require("minimist");
let args = minimist(process.argv);
// console.log(args.source);  -> f1.txt
// console.log(args.dest);    -> f2.txt

let fs = require("fs");

//read from source
let stext = fs.readFileSync(args.source, "utf-8");
//capitalize
let dtext = stext.toUpperCase();
//write to f2.txt
fs.writeFileSync(args.dest, dtext, "utf-8");