const express = require("express");
const app = express();
const path = require("path");
const staticRoot = path.resolve(__dirname, "../public");

/**
 * 下面这段代码的作用：
 * 当请求时，会根据请求路径( req.path 而不是 req.baseUrl )，从指定的目录中寻找是否存在该文件。
 * 如果存在该文件，直接响应文件内容，而不再移交给后续的中间件。
 * 如果不存在文件，则直接移交给后续的中间件处理。
 * 默认情况下，如果映射的结果是一个目录，则会自动使用index.html文件。也可以配置
 */
app.use(express.static(staticRoot));
// app.use("/static", (req, res) => {
//   console.log(req.baseUrl, req.path);        //req.path 是去掉 req.baseUr 后的url
// });

app.use(express.urlencoded({ extended: true }));
// app.use(require("./myUrlEncoded"));      //手动实现express.urlencoded() 中间件

app.use(express.json());

app.post("/api/student", (req, res) => {
    console.log(req.body);
});

app.use(require("./errorMiddleware"));

const port = 5010;
app.listen(port, () => {
    console.log(`server listen on ${port}`);
});
