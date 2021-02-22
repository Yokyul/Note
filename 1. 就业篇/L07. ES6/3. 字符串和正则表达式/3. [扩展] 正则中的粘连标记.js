const text = "Hello World!!!";
const reg = /W\w+/y;

reg.lastIndex = 3;
console.log(reg.lastIndex); //3。lastIndex默认为0
console.log(reg.test(text)); //false