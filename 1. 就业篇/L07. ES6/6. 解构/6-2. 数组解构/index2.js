const numbers = ["a", "b", "c", "d"];

// 解构第一位，第四位，第五位
const [n1, , , n4, n5 = 123] = numbers;
console.log(n1, n4, n5)


