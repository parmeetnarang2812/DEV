// print 
    // console.log("Hello js :)");

// variable declaration 
    // let a;
    // console.log(a); => undefined
    // a=1.5;
    // console.log(a); => 1.5
    // a=true;
    // console.log(a); => true
    // a="hello";
    // console.log(a); => hello
    // a="null";
    // console.log(variable contains, a); => variable contains null

/*  types of variables : primitive(basic) - number, string, boolean, null
                      non-primitive - functions, arrays, objects  */   

// loops
// let number = 10;
// for(let i=1; i<=number; i++) {
//     console.log("Number is ", i);
// }                      

// is prime
let number = 23;
let flag = true;
for(let div = 2; div < number; div++) {
    if(number % div == 0) {
        flag = false;
        break;
    }
}

if(flag == true) {
    console.log(number, "is prime");
}
else {
    console.log(number, "is not prime");
}