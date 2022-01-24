let sarr = ["hello", "bello", "bye", "there", "pep", "nados"];
let arr = [20, 54, 12, 33, 98, 76, 100, 11, 291, 34];

let reverse1 = sarr.reverse();
let reverse2 = arr.reverse();
console.log(reverse1);
console.log(reverse2);
// [ 'nados', 'pep', 'there', 'bye', 'bello', 'hello' ]
// [ 34, 291, 11, 100, 76, 98,  33, 12,  54, 20 ]
console.log(sort1);
let sort2 = arr.sort((a,b)=> a-b);

let sort1 = sarr.sort();
console.log(sort2);
// [ 'bello', 'bye', 'hello', 'nados', 'pep', 'there' ]
// [ 11, 12, 20,  33,  34, 54, 76, 98, 100, 291]


// sort and reverse
console.log(sarr.sort().reverse());
console.log(arr.sort(function(a, b){return a-b}).reverse());
// [ 'there', 'pep', 'nados', 'hello', 'bye', 'bello' ]
// [ 291, 100, 98, 76, 54, 34,  33, 20, 12, 11 ]