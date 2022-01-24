let arr = [
    "Sumeet Malik",
    "Amit Malik",
    "Inderjit Malik",
    "Daya Malik",
    "Kunal Malik",
    "Aryan Malik"
];

// Use the map function to produce the below output
//["S.M.", "A.M.", "I.M.", "D.M.", "K.M.", "A.M."];

let res = arr.map(function(v, i, oarr){
    let nameParts = v.split(" ");
    let fname = nameParts[0];
    let lname = nameParts[1];
    
    let fnfc = fname[0];
    let lnfc = lname[0];
    let initials = fnfc + "." + lnfc + ".";
    return initials;
});

console.log(res);