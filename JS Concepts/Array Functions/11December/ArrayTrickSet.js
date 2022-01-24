// pop removes 1 value from the end 
// pop returns the removed value

let arr = [20, 30, 80, 100, 40];
displayArray(arr);

arr[10] = 500; // no array out of index exception, increases the length
displayArray(arr);

function displayArray(arr){
    console.log(arr + " = " + arr.length);
}