const http = require("http");
const express = require("express");
const app = express();      //创建一个express应用。app实际上是一个用于处理请求的函数。
const port = 5008;


// 写法1：使用 express + http 模块
// const server = http.createServer(app);
// server.listen(port, () => {  
//     console.log(`server listen on ${port}`);
// });


// 写法2：只用 express
app.listen(port, () => {
    console.log(`server listen on ${port}`);
});
