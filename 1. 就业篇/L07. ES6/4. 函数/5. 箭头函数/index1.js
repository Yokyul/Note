//箭头函数一般是解决this指向的问题，用在函数套函数里。
//1. 语法1：
const obj = {
    count: 0,
    print() {
        console.log(this); //{ count: 0, start: [Function: start], print: [Function: print] }
        console.log(this.count); //0
    }
}
obj.print();


//2. 语法2
const print = num => {
    console.log("给我的数字是：", num)
}
print(2);


//3. 语法3
const isOdd = num => num % 2 !== 0;
console.log(isOdd(3));

//语法3的问题：如果要返回的是一个对象，使用简写会将对象的{}误认为函数体的{}，会报错。
//解决方法：在{}外加上()变为表达式即可。
const sum = (a, b) => ({
    a: a,
    b: b,
    sum: a + b
});
console.log(sum(3, 5));