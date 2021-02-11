// 1.timers队列 和 poll队列
const start = Date.now();
setTimeout(function f1() {
    console.log("setTimeout", Date.now() - start);
}, 200);

const fs = require("fs");
fs.readFile("./index.js", "utf-8", function f2() {
    console.log("readFile");
    const start = Date.now();
    while (Date.now() - start < 300) { }
});

/* 
    解析:
        一开始，没什么好执行的，直接进入事件循环。
        在poll队列一直等待，等到文件读取完成执行回调之后，在该回调卡了300ms。
        在这一过程中，timers队列出现事件回调了，但是因为poll队列未执行完，所以事件回调执行的时候输出的时间差就不是200ms了。
*/