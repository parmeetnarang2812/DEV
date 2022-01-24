//odd-even code

let args = process.argv;
let n = parseInt(args[2]);
if(n%2==0){
    console.log(n + " " + "is even.");
}
else{
    console.log(n + " " + "is odd.");
}

//for 7 => 7 is odd.
//for 10 => 10 is even.