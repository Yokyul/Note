const fs = require("fs");
const os = require("os")
const path = require("path");
const filename = path.resolve(__dirname, "./myfiles/2.txt");


/* 
    1.异步写入文件内容：fs.promises.writeFile()
        参数1：写到哪(文件路径)；
        参数2：要写入的内容(可以是字符串，也可以是Buffer)；
        参数3：配置(可以是对象，也可以是字符串)。不写默认"utf-8"
        
    2.具体配置如下：
        - encoding: 编码方式
        - flag: 标识(默认是w覆盖写入；a 表示追加内容append)

    3.注意：
        - 若要写入的文件不存在，就新建一个。
        - 若要写入的文件的上一级目录不存在，会报错。

*/

// 1.以字符串形式写入
async function test1() {
    await fs.promises.writeFile(filename, os.EOL + "add 1 俞杰", {
        flag: "a"
    });
    console.log("写入成功1");
}
test1();

// 2.以Buffer形式写入
async function test2() {
    const buffer = Buffer.from(os.EOL + "add 2 俞杰", "utf-8");
    await fs.promises.writeFile(filename, buffer, {
        flag: "a"
    });
    console.log("写入成功2");
}
test2();


