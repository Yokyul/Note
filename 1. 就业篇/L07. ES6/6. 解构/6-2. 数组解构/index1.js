const numbers = ["a", "b", "c", "d"];

// 数组解构写法
// 写法一：对象的写法
const {
    0: n1,
    1: n2
} = numbers;
console.log(n1, n2)


// 写法二：数组的写法
const [x1, x2] = numbers;

console.log(x1, x2)