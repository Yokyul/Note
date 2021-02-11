const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname, "./myFiles/abc1.txt");

/* 
    1.创建可写文件流:fs.createWriteStream()
        参数1：要写的文件路径
        参数2：配置对象
            - flags：操作文件的方式(默认是w覆盖写入；a 表示追加内容append)
            - encoding：如果chunk是字符串，默认值：utf8。对象模式下的可写流将始终忽略编码参数。
            - start/end：指定要读的字符位置
            - highWaterMark：每次最多写入的字节数。默认16 *1024 (即16kb)

        返回：Writable的子类WriteStream
            该子类有以下几个事件：
                - open
                - error
                - close
                - drain: 当写入队列清空时，会触发drain事件
            该子类有以下几个方法：
                - .write()：写入一组数据
                - .end()：结束写入，将自动关闭文件

    
    注意：utf-8编码模式下，中文一个字占3个字节，英文一个字母占一个字节。
*/
const ws = fs.createWriteStream(filename, {
    encoding: 'utf-8',
    flags: 'w',
    highWaterMark: 3,
});

// 写入:可以是字符串，也可以是buffer。返回布尔值
// const sign = ws.write("渡一")
// console.log(sign)
// ws.end("abcde")


/*
    2.从内存写入数据到磁盘会出现内压问题(内存处理速度很快，而磁盘处理速度比较慢)
        如何解决？
        当返回的布尔值为true(表示队列未满)再写入
*/

// 一直写，直到到达上限，或无法再直接写入，需要等待。
let i = 0;
function write() {
    let sign = true;
    while (i < 1024 * 512 && sign) {
        sign = ws.write("====Yokyul****");
        i++;
    }
}
write();

// 当写入队列清空时，会触发drain事件
ws.on("drain", () => {
    write();
});


