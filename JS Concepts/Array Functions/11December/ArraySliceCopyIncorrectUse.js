// like substring
// start is inclusive, end is exclusive

let o1 = {
    age: 100
};
let o2 = {
    age: 200
};
let o3 = {
    age: 300
}

let anarr = [o1, o2, o3];
displayObjectArray(anarr);

let scopy = anarr.slice();
displayObjectArray(scopy);

scopy[0].age = 110;
displayObjectArray(anarr);
displayObjectArray(scopy);

function displayObjectArray(arr){
    let str = "";

    for(let i = 0; i < arr.length; i++){
        str += arr[i].age + ", ";    
    }

    console.log(str + ".");
}