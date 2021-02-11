const { getErr } = require("./getSendResult");
const { pathToRegexp } = require("path-to-regexp");     //该库将一个路径规则转化为正则表达式
const cryptor = require("../util/crypt");               //导入加密，解密方法

// 需要验证的 url
const needTokenApi = [
    { method: "POST", path: "/api/student" },
    { method: "GET", path: "/api/student/:id" },
    { method: "GET", path: "/api/student" },
];

//解析 token 的流程：
module.exports = (req, res, next) => {
    // 1.使用 path-to-regexp 库匹配 /api/student/:id 和 /api/student/1771 是否一致。
    const apis = needTokenApi.filter((api) => {
        const reg = pathToRegexp(api.path);
        return api.method === req.method && reg.test(req.path);
    });
    if (apis.length === 0) {
        next();     //没有需要验证的就交给后续中间件处理
        return;
    }

    // 2.开始认证
    let token = req.cookies.token;
    if (!token) {
        // 从header的authorization中获取
        token = req.headers.authorization;
    }
    if (!token) {
        //没有认证
        handleNonToken(req, res, next);
        return;
    }
    const userId = cryptor.decrypt(token);  //认证时解密
    req.userId = userId;    //解密后的 token 值放到req对象，方便之后使用。
    next();
};

//处理没有认证的情况
function handleNonToken(req, res, next) {
    res.status(403).send(getErr("you dont have any token to access the api", 403));
}
