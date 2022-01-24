// using map, filter, reduce, includes
let arr2d = [
  [10, 50, 70, 80, 90, 100, 30, 60],
  [11, 50, 75, 85, 90, 100, 34, 60],
  [10, 51, 70, 80, 90, 100, 30, 60],
  [11, 50, 75, 85, 92, 100, 34, 60],
  [10, 50, 70, 80, 90, 100, 30, 60],
];

let result = arr2d.reduce((pv,cv) => {
  let temp = pv.filter((v) => cv.includes(v));
  return temp;
});

console.log(result);


/*  Output
    1 [ 50, 90, 100, 60 ]
    2 [ 90, 100, 60 ]
    3 [ 100, 60 ]
    4 [ 100, 60 ]
    final ans  => [ 100, 60 ] 
*/