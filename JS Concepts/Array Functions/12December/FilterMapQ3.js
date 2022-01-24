let arr = [5,83,24,67,71,12,24,7]

// return cubes of values whose sq are <=1000

// Method1 
let ans = arr.filter((v)=>(v*v<=1000)).map((v)=>(v*v*v))
console.log(ans);

// Method2
Array.prototype.myFilter = function(cb){
    let res = [];
    for(i in this){
        let v = this[i]
        let rv = cb(v,i,this);
        if(rv==true){
            res.push(v*v*v);   
        }
    }
    return res;
}
let ans2 = arr.myFilter((v)=>(v*v<=1000))
console.log(ans2)

// return cubes whoes cube is less than <=1000
console.log(arr.map((v)=>(v*v*v)).filter((v)=>(v<=1000)))
