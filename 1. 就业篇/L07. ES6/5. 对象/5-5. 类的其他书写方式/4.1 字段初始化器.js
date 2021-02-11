class Test {
    constructor() {
        this.a = 123;
    }
    print = () => {         //箭头函数在字段初始化器位置上，指向当前对象。
        console.log(this.a);
    }
}

const t1 = new Test();
const t2 = new Test();
console.log(t1.print === t2.print);     //false
