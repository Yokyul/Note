
/*

./ : 
1. 模块化代码中，比如require("./")，表示当前js文件所在的目录
2. 在路径处理中，"./"表示node运行目录

__dirname: 所有情况下，都表示当前运行的js文件所在的目录，它是一个绝对路径

*/


var path = require("path")      // 导出了一个对象,该对象提供了大量路径处理的函数

var result = path.resolve("./", "child", "abc", "123");     // resolve()方法，将多个参数组合成一个绝对路径
console.log(result);

var result1 = path.resolve(__dirname, "src", "child");      
console.log(result1);



