// 冷知识：
// Animal就是一个抽象类，按理说不能直接创建对象，可以加个if判断
class Animal {
    constructor(type, name, age, sex) {
        if (new.target === Animal) {
            throw new TypeError("你不能直接创建Animal的对象，应该通过子类创建")
        }
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
    jiao() {
        throw new Error("动物怎么叫的？");
    }
}

class Dog extends Animal {
    constructor(name, age, sex) {
        super("犬类", name, age, sex);
        this.loves = "吃骨头";
    }
    print() {
        super.print();
        console.log(`【爱好】：${this.loves}`);
    }
    jiao() {
        console.log("旺旺！");
    }
}

//下面的代码逻辑有误。Animal就是一个抽象类，按理说不能直接创建对象
const a = new Dog("旺财", 3, "公")
a.print();