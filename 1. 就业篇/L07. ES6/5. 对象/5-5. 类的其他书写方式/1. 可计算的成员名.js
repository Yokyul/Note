const printName = "print";
class Animal {
    constructor(type, name, age, sex) {
        this.type = type;
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    // 1.可计算的成员名
    [printName]() {
        console.log(`【种类】：${this.type}`);
        console.log(`【名字】：${this.name}`);
        console.log(`【年龄】：${this.age}`);
        console.log(`【性别】：${this.sex}`);
    }
}
const a = new Animal("狗", "旺财", 3, "男");
a[printName]();                                     // a[printName]() === a.print()