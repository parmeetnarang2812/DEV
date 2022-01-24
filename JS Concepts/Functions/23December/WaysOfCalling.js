Function.prototype.myBind = function(){
    let orgFun = this;
    let args = Array.from(arguments);

    let boundFun = function(){
        let thisForOrgFun = args[0];
        let argsForOrgFun = args.slice(1);
        let argsFromInvocation = Array.from(arguments);
        argsForOrgFun = argsForOrgFun.concat(argsFromInvocation);

        orgFun.apply(thisForOrgFun, argsForOrgFun);
    }

    return boundFun;
}

let obj = {
    fun1: function(frnd1, frnd2){
        console.log("This person is called " + this.fullName + ". His/Her age is " + this.age + ".");
        console.log(this.fullName + " says hello to " + frnd1 + ".");
        console.log(this.fullName + " says hello to " + frnd2 + ".");

        console.log(arguments);
    },
    fullName: "Sumeet Malik",
    age: 34
};

// obj.fun1("Navdeep", "Vikas");
let o2 = {
    fullName: "Neha",
    age: 33
};

// obj.fun1.call(o2, "Mehwish", "Shailja");
// obj.fun1.apply(o2, ["Mehwish", "Shailja", "Supriya"]);
let boundFunction = obj.fun1.myBind(o2, "Mehwish", "Shailja", "Supriya");
boundFunction("Sumeet");



// call is a function. it is available on all functions. it can be used to call the functions.
// the use case is, if you want to override the default this

// apply is similar to call. It just uses an array to pass arguments

// bind is dis-similar. It doesn't make a call. It gives you a new function to call.