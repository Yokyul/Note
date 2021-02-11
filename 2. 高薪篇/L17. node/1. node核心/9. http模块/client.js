const http = require("http");

/* 
    1.客户端发送http请求：http.request(url[, options][, callback])
        参数1：url
        参数2：配置对象
        参数3：回调。服务器的响应结果(对象形式)，是一个可读流。是Class: http.IncomingMessage 的子类。
        返回：request对象，是一个可写流。是Class: http.ClientRequest 的子类。

    注意：http模块比之前学的ajax更底层。需要写上请求体(消息体)才行。
            - request.write()：写消息体
            - request.end()：表示消息体写完
            - 由于get不需要消息体，所以只写request.end()就可以了。http模块会自动将这个空串加到http请求里。

*/

// 1.发送请求。但是服务器会一直等待客户端的消息体
const request = http.request("http://yuanjin.tech:5005/api/movie", { method: "GET" }, resp => {
    console.log("服务器响应的状态码:", resp.statusCode);     // 读取响应的状态码
    console.log("服务器响应头:", resp.headers);             // 读取响应头
    let result = "";
    resp.on("data", chunk => {                              // 以流的方式，读取响应体
        result += chunk.toString("utf-8");
    });

    resp.on("end", () => {
        console.log("服务器响应体:", JSON.parse(result));
    });
});

// 2.表示消息体结束
request.end(); 
