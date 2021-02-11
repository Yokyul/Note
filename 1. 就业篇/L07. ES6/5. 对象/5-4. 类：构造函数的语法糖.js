//面向对象中，将对一个对象的所有成员的定义，统称为类。

// 1.传统写法分两个部分：构造函数 + 定义实例方法（原型方法）
function Animal1(type, name, age, sex) {
    this.type = type;
    this.name = name;
    this.age = age;
    this.sex = sex;
}
Animal1.prototype.print = function () {
    console.log(`【种类】：${this.type}`);
    console.log(`【名字】：${this.name}`);
    console.log(`【年龄】：${this.age}`);
    console.log(`【性别】：${this.sex}`);
}
const a = new Animal1("狗", "旺财", 3, "男");
a.print();

// 原型上的成员也可以被枚举
for (const prop in a) {
    console.log(prop);
}
console.log("---- 分割线 ----");



//2.类的写法
class Animal2 {
    constructor(type, name, age, sex) {
        this.type = type;
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    print() {
        console.log(`【种类】：${this.type}`);
        console.log(`【名字】：${this.name}`);
        console.log(`【年龄】：${this.age}`);
        console.log(`【性别】：${this.sex}`);
    }
}
const b = new Animal2("狗", "旺财", 3, "男");
b.print();

// 原型上的成员不能被枚举
for (const prop in b) {
    console.log(prop);
}