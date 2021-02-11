const express = require("express");
const router = express.Router();
const stuServ = require("../../services/studentService");

router.get("/", async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sex = req.query.sex || -1;
    const name = req.query.name || "";
    const result = await stuServ.getStudents(page, limit, sex, name);

    // 1.将服务器返回的json数据变为字符串，作为callback的参数传递给客户端。
    const json = JSON.stringify(result);
    const script = `callback(${json})`;
    // 2.设置响应内容的格式，是js代码。
    res.header("content-type", "application/javascript").send(script);
});

module.exports = router;
