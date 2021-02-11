//5.类的表达式写法
const A = class {           // 匿名类
    a = 1;
    b = 2;
}
const a = new A();
console.log(a);     //A { a: 1, b: 2 }