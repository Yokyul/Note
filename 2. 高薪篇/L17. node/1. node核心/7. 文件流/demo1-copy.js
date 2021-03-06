const fs = require("fs");
const path = require("path");

//方式1：读完整文件
async function method1() {
    const from = path.resolve(__dirname, "./myFiles/abc1.txt");
    const to = path.resolve(__dirname, "./myFiles/abc2.txt");
    console.time("方式1");
    const content = await fs.promises.readFile(from);
    await fs.promises.writeFile(to, content);
    console.timeEnd("方式1");
    console.log("复制完成");
}

//方式2：以流的方式读文件
async function method2() {
    const from = path.resolve(__dirname, "./myFiles/abc1.txt");
    const to = path.resolve(__dirname, "./myFiles/abc2.txt");
    console.time("方式2");
    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to);

    rs.on("data", chunk => {
        //读到一部分数据
        const flag = ws.write(chunk);
        if (!flag) {
            //表示下一次写入，会造成背压
            rs.pause(); //暂停读取
        }
    });
    ws.on("drain", () => {
        //可以继续写了
        rs.resume();
    });
    rs.on("close", () => {
        //写完了
        ws.end(); //完毕写入流
        console.timeEnd("方式2");
        console.log("复制完成");
    });
}

//方式2的简化
async function method3() {
    const from = path.resolve(__dirname, "./myFiles/abc1.txt");
    const to = path.resolve(__dirname, "./myFiles/abc2.txt");
    console.time("方式3");
    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to);

    rs.pipe(ws);
    rs.on("close", () => {
        console.timeEnd("方式3");
        console.log("复制完成");
    });
}

method3();
