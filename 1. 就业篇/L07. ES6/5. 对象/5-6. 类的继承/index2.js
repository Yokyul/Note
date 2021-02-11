// 类的使用
class Animal {
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
    jiao(){
        throw new Error("动物怎么叫的？");
    }
}

class Dog extends Animal {
    constructor(name, age, sex) {
        super("犬类", name, age, sex);
        this.loves = "吃骨头";           
    }
    print(){
        super.print();                     // 调用父类的print
        console.log(`【爱好】：${this.loves}`); 
    }
    jiao(){
        console.log("旺旺！");
    }
}

const d = new Dog("旺财", 3, "公");
d.print();
console.log(d);
d.jiao();