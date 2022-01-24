// like substring
// start is inclusive, end is exclusive

let arr = [10, 20, 30, 40, 50, 60];
let na1 = arr.slice(-4, 4); // 30, 40
displayArray(na1); 

let na2 = arr.slice(-3, 2); // 30, 40
displayArray(na2); 

function displayArray(arr){
    console.log(arr + " = " + arr.length);
}
function displayObjectArray(arr){
    let str = "";

    for(let i = 0; i < arr.length; i++){
        str += arr[i].age + ", ";    
    }

    console.log(str + ".");
}