//4.字段初始化器: 变量 = 值
class Test {
    // 字段初始化器的功能：可以直接给变量赋值
    static a = 1;           // 静态成员
    b = 2;                  // 实例成员
    c = 3;

    constructor() {
        this.d = this.b + this.c;
    }
}
const t = new Test();
console.log(t);     //Test { b: 2, c: 3, d: 5 }
