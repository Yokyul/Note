const http = require("http");
const url = require("url");

/* 
    1.搭建服务器：http.createServer([options], [requestListener])
        参数1：配置对象
        参数2：回调函数。监听是否有请求来了
            - 回调参数1：request，是 http.IncomingMessage 的子类
            - 回调参数2：response，是一个可写流。是 http.ServerResponse 的子类
        返回：server对象。是 Class: http.Server 的子类
*/
const server = http.createServer((req, res) => {
    handleReq(req);
    res.setHeader("a", "1");    // 写入消息头
    res.setHeader("b", "2");
    res.statusCode = 404;       // 响应的状态码
    res.write("你好！");        // 写入消息体
    res.end();
});

// 1.监听某个端口
server.listen(9527);

// 2.开始监听端口后触发的事件
server.on("listening", () => {
    console.log("server listen 9527");
});

// 处理请求
function handleReq(req) {
    console.log("有客户端连接到服务器！");
    const urlobj = url.parse(req.url);
    console.log("请求路径：", urlobj);
    console.log("请求方法：", req.method);
    console.log("请求头：", req.headers);

    let body = "";
    req.on("data", chunk => {
        body += chunk.toString("utf-8");
    });

    req.on("end", () => {
        console.log("请求体：", body);
    });
}
