let arr = [10, 20, 30, 40, 50];

let na = arr.splice(2, 2, 300, 400, 500);

displayArray(arr); // 10 20 300 400 500 50
displayArray(na); // 30 40

function displayArray(arr){
    console.log(arr + " = " + arr.length);
}