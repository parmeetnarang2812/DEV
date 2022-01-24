// node FirstJSON.js --dest=first.json
let minimist = require("minimist");
let fs = require("fs");
let args = minimist(process.argv);

let s1 = {
    name: "Parmeet" ,
    gender: "female", 
    age: 19
};
let s2 = {
    name: "Karanjot" ,
    gender: "Male" , 
    age: 16
};
let students = [s1, s2];

let json = JSON.stringify(students);

fs.writeFileSync(args.dest, json, "utf-8");
// output
// [
//     { "name": "Parmeet", 
//       "gender": "female", 
//       "age": 19 },
//     { 
//       "name": "Karanjot", 
//       "gender": "Male", 
//       "age": 16 }
// ]


// let arrOfObjects = [
//     {
//         name: "Tina" ,
//         gender: "female", 
//         age: 19
//     },
//     {
//         name: "Rahul" ,
//         gender: "Male" , 
//         age: 16 
//     },
//     {
//         name: "Meena" ,
//         gender: "female", 
//         age: 25
//     }
// ]
// let json = JSON.stringify(arrOfObjects);        --for writing in first.json
// fs.writeFileSync(args.dest, json, "utf-8");
     // ------outputs------
// console.log(arrOfObjects);
// o/p -- in terminal
// [
//     { name: 'Tina', gender: 'female', age: 19 },
//     { name: 'Rahul', gender: 'Male', age: 16 },
//     { name: 'Meena', gender: 'female', age: 25 }
//   ]
// console.log(arrOfObjects[0]);
// o/p
// { name: 'Tina', gender: 'female', age: 19 }
// console.log(arrOfObjects[1]);
// o/p
// { name: 'Rahul', gender: 'Male', age: 16 }
// console.log(arrOfObjects[2].name);
// o/p
// Meena