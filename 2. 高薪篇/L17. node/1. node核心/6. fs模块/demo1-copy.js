const fs = require("fs");
const path = require("path");


/* 
    fs.promises.readFile 和 fs.promises.writeFile 的练习:
        手动复制图片
*/

async function test() {
    const fromFile = path.resolve(__dirname, "./myfiles/3.jpeg")
    const buffer = await fs.promises.readFile(fromFile)
    const toFile = path.resolve(__dirname, "./myfiles/3copy.jpeg")
    await fs.promises.writeFile(toFile, buffer)
    console.log("copy success!")
}
test();