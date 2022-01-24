let arr=[
    {name:"A",age:14,gender:"M"},
    {name:"B",age:34,gender:"M"},
    {name:"C",age:24,gender:"F"},
    {name:"D",age:44,gender:"F"},
    {name:"E",age:44,gender:"M"},
    {name:"F",age:28,gender:"F"},
    {name:"G",age:36,gender:"M"},
    {name:"H",age:47,gender:"F"} 
]
let narr=arr.filter((v,i,arr)=>{
    return v.gender=="F";
}).map((v,i,arr)=>{
    return v.age;
})
console.log(narr);

let res = arr.filter((obj) => obj.gender === "F").map((obj) => obj.age);
console.log(res);