class Chess {
    constructor(name) {
        this.name = name;
    }

    // 1.现在静态成员写法如下：写在构造函数里面，通过static关键字
    static width = 50;
    static height = 50;
    // 静态方法
    static method() {
        console.log("这是静态方法");
    }
}

// 2.过去静态成员写法如下：写在构造函数外面
// Chess.width = 50;                    // 其中width、height是构造函数的静态成员
// Chess.height = 50;

console.log(Chess.width);
console.log(Chess.height);
Chess.method();