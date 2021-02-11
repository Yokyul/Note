const fs = require("fs");
fs.readFile("./index.js", () => {
    setTimeout(() => console.log(1), 0);
    setImmediate(() => console.log(2));
});

/* 
    输出：2,1
    解析:
        一开始，没什么好执行的，直接进入事件循环。
        在poll队列一直等待，等到文件读取完。然后执行回调，此时无论网速如何，由于下一个队列是check队列，所以一定先输出2。
        
*/