//处理静态资源的中间件
module.exports = (req, res, next) => {
    if (req.path.startsWith("/static")) {
        // 说明你想要的是静态资源
        if (true) {
            res.send("静态资源");
        } else {
            next();
        }
    } else {
        // 说明你请求的是 api 接口
        next();
    }
};
