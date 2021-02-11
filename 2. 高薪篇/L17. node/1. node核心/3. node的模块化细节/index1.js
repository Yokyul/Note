/*
    1. 模块的查找。不管写什么路径，最终都是转为绝对路径。
*/

//写法1：绝对路径
require("C:\\Users\\Administrator\\Desktop\\17th code\\L15. node\\1. node核心\\3. node的模块化细节\\module\\ab.js");

//写法2：相对路径(自己写的模块)
require("./module/ab");

//写法3：相对路径(内置模块 或 node_modules 目录下的模块)
require("fs");


//先找文件，按4种后缀依次找。找不到当作目录，再找该目录下的 index.js 文件(由 package.jso 的 main 字段决定)
require("./src");

