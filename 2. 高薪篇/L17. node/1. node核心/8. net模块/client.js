const net = require("net");

/* 
    1.创建客户端连接：net.createConnection(options, [connectListener])
        参数1：配置对象
            - host：主机名 (不用写协议)
            - port: 端口号 (必须的配置)
        参数2：监听函数，完成连接之后做的事情。
        返回：socket对象。可以当作一个文件，可以通过文件流操作。
            - 服务器响应的数据会放到该文件，
            - 客户端向该文件写入数据就等于发送请求，客户端也可以读取文件内容从而获取服务器响应的数据。
    
    注意：net模块内部会自动进行三次握手，四次挥手。
    注意：必须先向服务器发送请求，然后服务器才会返回内容。
*/
const socket = net.createConnection(
    {
        host: "duyi.ke.qq.com",
        port: 80
    },
    () => {
        console.log("连接成功");
    }
);

//================================================================================================================

// // 使用net模块进行http请求
// // 读socket的数据，来自服务器
// socket.on("data", chunk => {
//     console.log(chunk.toString("utf-8"))
//     socket.end();   // 断开连接，一般都是客户端断开连接。需要注意的是，服务器传数据chunk是一块一块传递的。这种写法只传了一块数据就断开连接了。想要传递完再断开见2。
// });

// // 向socket写入数据(需要样按照格式书写：请求行/n请求头/n/n请求体)
// socket.write(`GET / HTTP/1.1
// Host: duyi.ke.qq.com
// Connection: keep-alive

// `);

// socket.on('close', () => {
//     console.log("连接关闭了")
// })

//================================================================================================================

/*
    2.服务器传递完数据，客户端再断开连接：
        通过服务器发送回的响应头的 Content-Length 来判断服务器是否传输完成。
*/

var receive = null;
// 提炼出响应字符串的消息头和消息体
function parseResponse(response) {
    const index = response.indexOf("\r\n\r\n"); 
    const head = response.substring(0, index);      // 从字符串中提取一些字符，到index前一位
    const body = response.substring(index + 2);
    const headParts = head.split("\r\n");
    const headerArray = headParts.slice(1).map(str => {
        return str.split(":").map(s => s.trim());
    });
    const header = headerArray.reduce((a, b) => {
        a[b[0]] = b[1];
        return a;
    }, {});
    return {
        header,
        body: body.trimStart()
    };
}
function isOver() {
    //需要接收的消息体的总字节数
    const contentLength = +receive.header["Content-Length"];
    const curReceivedLength = Buffer.from(receive.body, "utf-8").byteLength;
    console.log(contentLength, curReceivedLength);
    return curReceivedLength > contentLength;
}

// 读socket的数据
socket.on("data", chunk => {
    const response = chunk.toString("utf-8");
    if (!receive) {
        //第一次
        receive = parseResponse(response);
        if (isOver()) {
            socket.end();
        }
        return;
    }
    receive.body += response;
    if (isOver()) {
        socket.end();
        return;
    }
});

// 向socket写入数据
socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com
Connection: keep-alive

`);

// 读完自动关闭
socket.on("close", () => {
    console.log(receive.body);
    console.log("连接关闭了");
});

//================================================================================================================

// 3.使用http模块进行http请求
// const http = require("http");
// const request = http.request("http://duyi.ke.qq.com", { method: "GET" }, re => {
//     console.log(re.statusCode)
//     console.log(re.headers)
//     let result = "";
//     re.on("data", chunk => {      // 以流的方式，读取响应体
//         result += chunk.toString("utf-8");
//     });

//     re.on("end", () => {
//         console.log(JSON.parse(result));
//     });
// })
// request.end()