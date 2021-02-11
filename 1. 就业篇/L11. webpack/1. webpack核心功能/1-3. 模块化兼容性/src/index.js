
// 1.es6导出，commonjs导入
// var obj = require("./es6a")
// console.log(obj.a, obj.b, obj.default)


// 2.commonjs导出，es6导入
// import * as obj from "./commonjsa"
import obj from "./commonjsa"
console.log(obj)


// 3.第三方库的不同模块化标准导入
// jquery库的commonjs导出：module.exports = function(){}

// var $ = require("jquery")
// console.log($)

// import $ from "jquery"
// console.log($);


// 4.
// var obj = require("./es6a")
// console.log(obj)