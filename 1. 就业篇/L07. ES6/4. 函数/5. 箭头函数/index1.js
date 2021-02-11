const obj = {
    count: 0,
    start: function () {
        setInterval(() => {
            this.count++;
            console.log(this.count);
        }, 1000)
    },
    regEvent: function () {
        window.onclick = () => {
            console.log(this.count);
        }
    },
    print: function () {
        console.log(this)
        console.log(this.count)
    }
}


// 使用语法1 的写法
obj.start();
obj.regEvent();

obj.print();

// 箭头函数一般是解决this指向的问题，用在函数套函数里