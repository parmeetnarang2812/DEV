let a1 = [10, 30, 50, 70, 90];
let a2 = [63, 34, 50, 90, 80, 10, 60];
// 10, 50, 90

console.log(a2.includes(80));
console.log(a2.includes(88));

let inter1 = a1.filter(v => a2.includes(v));
console.log(inter1);

let arr2d = [
    [10, 50, 70, 80, 90, 100, 30, 60],
    [11, 50, 75, 85, 90, 100, 34, 60], // 50, 90, 100, 60
    [10, 51, 70, 80, 90, 100, 30, 60], // 90, 100, 60
    [11, 50, 75, 85, 92, 100, 34, 60], // 100, 60
    [10, 50, 70, 80, 90, 100, 30, 61], // 100
];

let res1 = arr2d.reduce((pv,cv) => {
    let temp1 = pv.filter(v=>cv.includes(v));
    return temp1;
})
console.log(res1);

let res2 = arr2d.reduce().filter(v=>cv)