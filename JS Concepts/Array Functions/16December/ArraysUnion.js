let arr2d = [
    [10, 50, 70, 80, 90, 100, 30, 60],
    [11, 50, 75, 85, 90, 100, 34, 60], // [10, 50, 70, 80, 90, 100, 30, 60, 11, 75, 85, 34]
    [10, 51, 70, 80, 90, 100, 30, 60], // [10, 50, 70, 80, 90, 100, 30, 60, 11, 75, 85, 34, 51]
    [11, 50, 75, 85, 92, 100, 34, 60], // [10, 50, 70, 80, 90, 100, 30, 60, 11, 75, 85, 34, 51, 92]
    [10, 50, 70, 80, 90, 100, 30, 60], // [10, 50, 70, 80, 90, 100, 30, 60, 11, 75, 85, 34, 51, 92]
];

// [10, 50, 70, 80, 90, 100, 30, 60, 11, 75, 85, 34, 51, 92] (union of arrays)

let union = arr2d.reduce((pv,cv) => {
    let temp1 = cv.filter(v => !pv.includes(v)); //checks for non-similar values in cv other than values in pv
    let temp2 = pv.concat(temp1); //concats non-similar values of cv in pv
    return temp2; //union of pv and cv
})

console.log(union);