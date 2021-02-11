const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname, "./myfiles/1.txt");


/* 
    1.异步读取文件内容：fs.readFile()
        这时ES6之前的方法，即回调函数法。
        参数1：文件路径；
        参数2：配置(可以是对象，也可以是字符串)。不写默认按buffer形式读取
        参数3：回调函数。
        
    2.具体配置：
        如果不配置编码方式为utf-8，那么输出的文件内容为Buffer形式(如：<Buffer 79 75 79 75 2d 31 2e 74 78 74>)。
*/
fs.readFile(filename, {
    encoding:"utf-8"
}, (err, content) => {
    console.log(1, content);
});
console.log("========1========")


/* 
    2.同步读取文件内容：fs.readFileSync()
        Sync系列的函数是同步的，会导致JS运行阻塞，极其影响性能。通常只会用在程序初始化的时候。
*/
const content = fs.readFileSync(filename, "utf-8");
console.log(2, content);
console.log("========2========")


/* 
    3.异步读取文件内容：fs.promises.readFile()
        这是ES6的方法。
*/
async function test() {
    const content = await fs.promises.readFile(filename, "utf-8");
    console.log(3, content);
}
test();


// 注意:fs模块的其他api用法和readFile 一样，之后都统一使用第三种方式
