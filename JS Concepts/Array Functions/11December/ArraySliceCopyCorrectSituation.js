// like substring
// start is inclusive, end is exclusive

let arr = [10, 20, 30, 40, 50, 60];
let na = arr.slice(); // slice for cloning is fine for integer array becuase ints are value type

displayArray(arr);
displayArray(na);
na[3] = 400;
displayArray(arr);
displayArray(na);

function displayArray(arr){
    console.log(arr + " = " + arr.length);
}