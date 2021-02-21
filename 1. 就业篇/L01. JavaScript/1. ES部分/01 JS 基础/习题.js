//1.交换 a，b 的值。
var a = 1,
    b = 2;

// 方法一
var c = a;
a = b;
b = c;
console.log(a, b);

// 方法二
a = a + b;
b = a - b;
a = a - b;
console.log(a, b);