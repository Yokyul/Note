// 面试题
console.log("当前模块路径：", __dirname);
console.log("当前模块文件：", __filename);
exports.c = 3;      // exports 只是修改原来对象的值。
module.exports = {  // 此时，module.exports 不再指向原来的对象，而是指向一个新对象。
  a: 1,
  b: 2
};
this.m = 5;         // 此时 this == exports。但不等于 module.exports

console.log(this === exports);      // true

// 但是最终导出的是：module.exports对象。见index4.js


// 以上代码的内部原理，见 myModule.js 文件
