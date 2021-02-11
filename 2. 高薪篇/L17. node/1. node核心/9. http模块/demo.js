/*
    (demo)搭建静态资源服务器: 访问静态资源，可以得到文件内容。
        http://localhost:9527/index.html  -> public/index.html 文件内容
        http://localhost:9527/css/index.css  -> public/css/index.css 文件内容
*/

const http = require("http");
const URL = require("url");
const path = require("path");
const fs = require("fs");

const server = http.createServer(handler);
server.on("listening", () => {
    console.log("server listen 6000");
});
server.listen(6000);

async function handler(req, res) {
    const info = await getFileContent(req.url);
    if (info) {
        res.write(info);    //写入消息体
    } else {
        res.statusCode = 404;
        res.write("Resource is not exist");
    }
    res.end();
}

// 得到要处理的文件内容(读的是完整文件，但最好以流的方式读取)
async function getFileContent(url) {
    const urlObj = URL.parse(url);
    let filename; //要处理的文件路径
    filename = path.resolve(__dirname, "public", urlObj.pathname.substr(1));  // substr(1)：字符串截取，从下标为1开始。因为 / 代表根路径
    let stat = await getStat(filename);

    if (!stat) {    //文件不存在
        return null;
    } else if (stat.isDirectory()) {    // 如果文件是目录，自动访问该目录下的index.html文件。
        filename = path.resolve(__dirname, "public", urlObj.pathname.substr(1), "index.html");
        stat = await getStat(filename);
        if (!stat) {
            return null;
        } else {
            return await fs.promises.readFile(filename);
        }
    } else {    //是文件
        return await fs.promises.readFile(filename);
    }
}

// 得到文件状态，用来判断文件存不存在。存在返回一个对象，不存在返回null。
async function getStat(filename) {
    try {
        return await fs.promises.stat(filename);
    } catch {
        return null;
    }
}