const express = require("express");
const app = express();

// 映射public目录中的静态资源
const path = require("path");
const staticRoot = path.resolve(__dirname, "../public");
app.use(express.static(staticRoot));

// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));

// 解析 application/json 格式的请求体
app.use(express.json());

// 处理对下载资源的请求
app.use("/resource", require("./api/download"));


const port = 5008;
app.listen(port, () => {
    console.log(`server listen on ${port}`);
});
