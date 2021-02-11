// 判断一个数是不是奇数
// const isOdd = function (num) {
//     return num % 2 !== 0;
// }


// 1.使用语法3 的写法
const isOdd = num => num % 2 !== 0;

console.log(isOdd(3))
console.log(isOdd(4))



// 2.
// 写法3的问题：如果要返回的是一个对象，使用简写会将对象的{}误认为函数体的{}，会报错。
// 解决方法：在{}外加上()变为表达式即可
const sum = (a, b) => ({
    a: a,
    b: b,
    sum: a + b
});

console.log(sum(3, 5))