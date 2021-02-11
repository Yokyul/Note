const net = require("net");
const fs = require("fs");
const path = require("path");

/* 
    1.创建服务器：net.createServer()
        参数：监听函数(监听是否创建)
        返回：server对象
*/
const server = net.createServer();

//================================================================================================================

// 1.服务器监听当前计算机中某个端口，等客户端发请求过来
server.listen(9527);

// 2.开始监听端口后触发的事件
server.on("listening", () => {
    console.log("server listen 9527");
});

// 3.当某个连接到来时，触发connection事件。事件的监听函数会获得一个socket对象。
// 不仅client有socket对象，server也有，只不过服务器会有很多socket分别与不同客户端对接。
server.on("connection", socket => {
    console.log("有客户端连接到服务器");

    socket.on("data", async chunk => {
        // console.log(chunk.toString("utf-8"));
        const filename = path.resolve(__dirname, "./static/hsq.jpg");
        const bodyBuffer = await fs.promises.readFile(filename);
        const headBuffer = Buffer.from(`HTTP/1.1 200 OK
Content-Type: image/jpeg

`, "utf-8");
        const result = Buffer.concat([headBuffer, bodyBuffer]);
        socket.write(result);   // 写入消息头和消息体
        socket.end();
    });

    socket.on("end", () => {
        console.log("数据读完了");
    });
    socket.on("close", () => {
        console.log("连接关闭了");
    });
});
