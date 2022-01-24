// Custom map function
Array.prototype.myMap = function(callback){
    let res = [];

    for(let i = 0; i < this.length; i++){
        let val = this[i];
        let rv = callback(val, i, this);
        res.push(rv);
    }

    return res;
}

// Map is itself a fn
// Map takes as input a callback fn 
// The callback fn takes 3 parameter (v, i, oarr)
// map will call the callback multiple times (once for each value)
// for each run of callback, map will pass v, i and original array to callback
// callback will process the value and index and return a single value
// Single value returned by each run of callback will be collected in a new array by map
// Map returns that new array
// length of returned array is equal to original array


let arr = [2, 5, 9, 8, 15, 11, 6];

let sqarr = arr.myMap(function(v, i, oarr){
    return v * v;
});
console.log(sqarr);

let narr = [
    "Sumeet Malik",
    "Amit Malik",
    "Inderjit Malik",
    "Daya Malik",
    "Kunal Malik",
    "Aryan Malik"
];

// Use the map function to produce the below output
//["S.M.", "A.M.", "I.M.", "D.M.", "K.M.", "A.M."];

let res1 = narr.myMap(function(v, i, oarr){
    let nameParts = v.split(" ");
    let fname = nameParts[0];
    let lname = nameParts[1];
    
    let fnfc = fname[0];
    let lnfc = lname[0];
    let initials = fnfc + "." + lnfc + ".";
    return initials;
});

console.log(res1);

let oarr = [
    {
        gender: 'M',
        age: 24
    },
    {
        gender: 'F',
        age: 34
    },
    {
        gender: 'F',
        age: 28
    },
    {
        gender: 'M',
        age: 74
    },
    {
        gender: 'F',
        age: 31
    },
    {
        gender: 'M',
        age: 47
    },
    {
        gender: 'F',
        age: 26
    },
    {
        gender: 'M',
        age: 47
    },
    {
        gender: 'F',
        age: 47
    },
    {
        gender: 'F',
        age: 19
    },
    {
        gender: 'M',
        age: 20
    }
];

// Use the map function to produce the below output
// return an array with true and false for females between 20 and 30
// let us say xyz corp wants to hire females between age >= 20 and <= 30

let shortlist = oarr.myMap(function (v, i, oarr) {
    if (v.gender == 'F' && v.age >= 20 && v.age <= 30) {
        return true;
    } else {
        return false;
    }
})

console.log(shortlist);

let sl3 = oarr.myMap((v, i, oarr) => { 
    return v.gender == 'F' && v.age >= 20 && v.age <= 30 ;
});
console.log(sl3);

let sl2 = oarr.myMap((v, i, oarr) => v.gender == 'F' && v.age >= 20 && v.age <= 30);
console.log(sl2);