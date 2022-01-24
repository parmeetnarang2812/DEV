//Q1
let products = [
    {name: "T-shirt", price: 25},
    {name: "Headphones", price: 125},
    {name: "Keyboard", price: 75},
    {name: "Monitor", price: 200}
];
// long way
let arr = products.map(function(v){
    if(v.price >= 100)
        return v.name.toUpperCase();
    else    
        return v.name.toLowerCase();
})
console.log(arr);
// short way
let ans1 = products.map(v => v.price>=100 ? v.name.toUpperCase() : v.name.toLowerCase());
console.log(ans1);


//Q2
let arr = [5, 83, 24, 67, 71, 12, 24, 7];
// return cubes of values whose square is <=1000
let ans3 = arr.filter(v => v*v<=1000).map(v => v*v*v);
console.log(ans3);
// long way
let ans4 = arr.filter((v,i,arr)=>{
    if(v*v<=1000) {
        return true;
    }
    else{
       return false;
    }
}).map((v,i,arr)=>{
    return v*v*v;
});
console.log(ans4);


//Q3
//cubes of no.s whose cubes are less than 10000
let ans5 = arr.filter(v=>v*v*v<10000).map(v=>v*v*v);
console.log(ans5);


//Q4
// what is the following returning
let ans6 = arr.map(val=>val*val).filter(val=>val<=1000).map(val=>val*val*val);
//map=>[squares of all] then filter=>[those squared values which are less than equal to 1000] 
//then map=> those whose squares were less than equal to 1000 are now cubed
//therefore gives v^6