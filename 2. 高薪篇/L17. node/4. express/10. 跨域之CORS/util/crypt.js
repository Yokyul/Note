// 使用对称加密算法：aes 128。即使用 128 位的秘钥， 也就是16个bit的字符串。
const secret = Buffer.from("mm7h3ck87ugk9l4a");     //秘钥。使用 Buffer 保存
const crypto = require("crypto");   //node 内置库，提供很多加密算法。 crypto.getCiphers() 会返回所有加密算法。

// 准备一个iv，随机向量
const iv = Buffer.from("jxkvxz97409u3m8c");

// 加密
exports.encrypt = function (str) {
    /*
        .createCipheriv(): 创建加密算法。
            - 参数1：加密算法
            - 参数2：秘钥
            - 参数3：随机向量

        .update(): 
            - 参数1：要加密的字符串
            - 参数2：加密前的字符串的类型
            - 参数3：加密后的字符串的类型

        .final(): 
            - 参数1：加密后的字符串的类型

        ===============================================================================
        .createDecipheriv(): 创建解密密算法。
            - 参数1：加密的算法
            - 参数2：秘钥
            - 参数3：随机向量

        .update(): 
            - 参数1：要解密密的字符串
            - 参数2：解密前的字符串的类型
            - 参数3：解密后的字符串的类型

        .final(): 
            - 参数1：解密后的字符串的类型

    */
    const cry = crypto.createCipheriv("aes-128-cbc", secret, iv);
    let result = cry.update(str, "utf-8", "hex");     //使用 .update() 生成加密字符串。
    result += cry.final("hex");   //最后再使用 .final() 生成新的字符串进行拼接形成最终的加密字符串。
    return result;
};

// 解密
exports.decrypt = function (str) {
    const decry = crypto.createDecipheriv("aes-128-cbc", secret, iv);
    let result = decry.update(str, "hex", "utf-8");
    result += decry.final("utf-8");
    return result;
};
