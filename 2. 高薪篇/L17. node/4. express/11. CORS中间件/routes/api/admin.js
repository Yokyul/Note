const express = require("express");
const router = express.Router();
const adminServ = require("../../services/adminService");
const { asyncHandler } = require("../getSendResult");
const cryptor = require("../../util/crypt");         //导入加密，解密方法

router.post(
    "/login",
    asyncHandler(async (req, res) => {
        const result = await adminServ.login(req.body.loginId, req.body.loginPwd);
        if (result) {
            let value = result.id;
            value = cryptor.encrypt(value.toString());  //加密 token 值，再响应给浏览器。保证安全

            //登录成功，服务器为当前账号设置 token ，之后证明身份会用到。(浏览器端)
            res.cookie("token", value, {        //参数1：key; 参数2: value; 参数3：其他配置的对象
                path: "/",
                domain: "localhost",
                maxAge: 7 * 24 * 3600 * 1000,   //由秒数变为毫秒数
            });

            //登录成功，服务器为当前账号设置 token (其他终端)
            res.header("authorization", value);
        }
        return result;
    })
);

module.exports = router;
