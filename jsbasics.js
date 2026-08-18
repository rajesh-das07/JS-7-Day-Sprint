const name = "Rajesh";
let age = 20;
age = 21;


/*difference between == and === the double is trying to covert thipes before comparing like number to string make string to string then compare or viseversa and === is strict checks value only */
console.log(5 == "5"); //true but dangerous as number equals string 
console.log(5 === "5"); // false safe number does not equal to 
console.log(0 == false); //true but dangerous 
console.log(0 === false);  // false and safe

// conditionals truthy and falsy
// in conditionals the 0 "" empty string null undefined and NaN and false are falsy and rest everything is true 

let data = "0";
if(data) {
    console.log("this will print because its truthy");
}
let empty ="";
if(empty){
    console.log("this will never print as its falsy the string is empty");
}

//arrow function 
// instead of using function keword you use arrow between parameters 
const addnumbers =(a,b) => {
    return a + b;
}
// if function is one line 
const multiply = (a, b) => a*b;

// question asked 
//Write an arrow function named checkPassword.

const a = "password";
const checkpassword = (a) => {
 if(a === "Admin123") {
    return "access Granted";
 }
 else{
    return "access denied"
 }
}

console.log(checkpassword("admin123"));
console.log(checkpassword("wrongpassword"));


