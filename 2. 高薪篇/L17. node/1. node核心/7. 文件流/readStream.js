const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname, "./myFiles/abc.txt");

/* 
    1.创建可读文件流:fs.createReadStream()
        参数1：要读的文件路径
        参数2：配置对象
            - encoding：默认null，以buffer形式读出来
            - start/end：指定要读的字符位置
            - highWaterMark：每次读的数量。默认64 *1024
            - autoClose: 读完是否自动完毕。默认为true

        返回：Readable的子类ReadStream。
            该子类有5个事件，2个方法。


    注意：utf-8编码模式下，中文一个字占3个字节，英文一个字母占一个字节。
*/
const rs = fs.createReadStream(filename, {
    encoding: "utf-8",
    highWaterMark: 4,
    autoClose: true   // 读完后会自动完毕，默认为true
});

// 打开文件时触发
rs.on("open", () => {
    console.log("文件被打开了");
});

// 发生错误时触发
rs.on("error", () => {
    console.log("出错了！！");
});

// 关闭文件时触发。读完会自动关闭。也可以手动：rs.close()
rs.on("close", () => {
    console.log("文件关闭了");
});

// 读取数据。读多少取决于配置对象里的 highWaterMark。注册data事件后，才会真正开始读取。回调函数中会附带读取到的数据。
rs.on("data", chunk => {
    console.log("读到了一部分数据：", chunk);
    rs.pause(); //暂停
});

// 暂停读取时触发
rs.on("pause", () => {
    console.log("暂停了");
    setTimeout(() => {
        rs.resume();
    }, 1000);
});

// 恢复读取时触发
rs.on("resume", () => {
    console.log("恢复了");
});

// 数据读取完毕触发
rs.on("end", () => {
    console.log("全部数据读取完毕");
});
