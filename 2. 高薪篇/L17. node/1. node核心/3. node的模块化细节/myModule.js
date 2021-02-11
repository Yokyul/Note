/*
    3. 模块化的原理(伪代码)
        const result = require("./index3");
        require() 的内部原理见下：
*/

require.cache = {};

function require(modulePath) {
    //1. 将modulePath转换为绝对路径：D:\repository\NodeJS\源码\myModule.js
    //2. 判断该模块是否已有缓存
    if (require.cache["D:\\repository\\NodeJS\\源码\\myModule.js"]) {
        return require.cache["D:\\repository\\NodeJS\\源码\\myModule.js"].result;
    }

    //3. 没有缓存的话，读取模块的文件内容。
    //4. 将文件内容包裹到一个函数中：

    function __temp(module, exports, require, __dirname, __filename) {
        console.log("当前模块路径：", __dirname);
        console.log("当前模块文件：", __filename);
        exports.c = 3;
        module.exports = {
            a: 1,
            b: 2
        };
        this.m = 5;
    }

    //5. 创建module对象
    module.exports = {};
    const exports = module.exports;
    // 一开始的时候，this == exports == module.exports，都指向同一个空对象。
    __temp.call(module.exports, module, exports, require, module.path, module.filename)
    return module.exports;
}
