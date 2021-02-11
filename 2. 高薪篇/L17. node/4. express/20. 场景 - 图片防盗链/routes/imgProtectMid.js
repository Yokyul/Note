const url = require("url");
const path = require("path");

module.exports = (req, res, next) => {
    const host = req.headers.host;      //获取图片拥有者网站的主机名（包括端口号）
    let referer = req.headers.referer;  //获取盗用图片的网站 referer

    // 只防盗图片
    const extname = path.extname(req.path);
    if (![".jpg", ".jpeg", ".png", ".gif"].includes(extname)) {
        console.log("欢迎");
        next();
        return;
    }
    if (referer) {
        referer = url.parse(referer).host;
    }
    if (referer && host !== referer) {
        console.log("有人盗图！！")
        req.url = "/img/logo.jpg"; // 链到其他图
    }
    next();
};
