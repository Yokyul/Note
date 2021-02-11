const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/:filename", (req, res) => {
    const absPath = path.resolve(__dirname, "../../resource", req.params.filename);

    //参数1：要下载文件的绝对路径。参数2：下载的文件的默认名。参数3：错误处理函数。
    res.download(absPath, req.params.filename);
});

module.exports = router;
