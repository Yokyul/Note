/*
    1.自己写一个webpack合并后的js文件，合并两个文件：
        ./src/a.js
        ./src/index.js

    2.为了防止全局变量污染，使用立即执行函数，参数为模块对象。
*/

(function (modules) {
    var moduleExports = {};                                 // 用于缓存模块的导出结果
    /*
        最终缓存对象的结果：
        moduleExports = {
            "./src/a.js": 导出值,
            "./src/index.js": 导出值
        }
    */

    // __webpack_require函数相当于是运行一个模块，得到模块导出结果。
    // 参数：moduleId，即模块的路径。
    function __webpack_require(moduleId) { 
        if (moduleExports[moduleId]) {                      // 检查是否有缓存
            return moduleExports[moduleId];
        }

        var func = modules[moduleId];                       // 得到该模块对应的函数
        var module = {
            exports: {}
        }
        func(module, module.exports, __webpack_require);    // 运行模块
        var result = module.exports;                        // 得到模块导出的结果
        moduleExports[moduleId] = result;                   // 将结果缓存起来
        return result;
    }

    // 执行入口模块
    return __webpack_require("./src/index.js");             // __webpack_require函数相当于是运行一个模块，得到模块导出结果

})(
    // 该对象保存了所有的模块，以及模块对应的代码
    {
        "./src/a.js": function (module, exports) {
            // 将函数代码写在eval()里，更容易调试。如果出错，可以避免其他代码的干扰，更容易找到问题。
            // 后面添加的注释可以显示函数代码文件在开发时态的位置。
            eval("console.log(\"module a\")\nmodule.exports = \"a\";\n //# sourceURL=webpack:///./src/a.js")
        },
        "./src/index.js": function (module, exports, __webpack_require) {
            eval("console.log(\"index module\")\nvar a = __webpack_require(\"./src/a.js\")\na.abc();\nconsole.log(a)\n //# sourceURL=webpack:///./src/index.js")

        }
    }
);



