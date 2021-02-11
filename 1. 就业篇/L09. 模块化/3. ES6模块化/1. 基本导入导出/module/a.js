import "./b.js"             // 这条导入语句，仅会运行模块，不使用它内部的任何导出

// 导出a，值为1，类似于CommonJS中的exports.a = 1
export var a = 1;           

// 导出test，值为一个函数，类似于CommonJS中的exports.test = function (){}
export function test() {    

}

// 导出类
export class Person {       

}

// 导出常量
export const name = "abc"   

// 将age变量的名称 作为导出的名称，age变量的值 作为导出的值
var age = 18;
var sex = 1;
export { age, sex }         
