// path是一个对象。只是根据规则做一些操作，不检测路径存不存在。
const path = require("path");
console.log(path)

// 1.参数是绝对路径，获取路径中最后一个值。两个参数的话，第二个参数是文件后缀。相同的话，输出值可省
const basename = path.basename("fdg/dfgdfg/adfaf/fdgdfgd/a.asf", ".html"); 
console.log(basename);      

// 2.获取路径分隔符。window系统是\，其他系统为/。
console.log(path.sep);     

// 3.获取环境变量中值的分隔符。window系统是';'，其他系统为':'。
console.log(path.delimiter);     
console.log(process.env.PATH.split(path.delimiter));

// 4.获取路径的目录。与 basename 互补。
const dir = path.dirname("fdg/dfgdfg/adfaf/fdgdfgd/a.asf");
console.log(dir);

// 5.获取文件后缀名。没有返回空字符串
const ext = path.extname("a/b/c/a.js");
console.log(ext);

// 6.拼接路径
const basePath = "a/b";
const fullpath = path.join(basePath, "../", "d.js");
console.log(fullpath);

// 7.将路径，变得规范
path.normalize('/foo/bar//baz/asdf/quux/..');
path.normalize('C:\\temp\\\\foo\\bar\\..\\');

// 8.获取 第二个参数相对于第一个参数 的相对路径。
const rel = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
console.log(rel)

// 9.将参数转为绝对路径。相对于node命令行。但如果前面拼接__dirname，就相对于模块所在位置
const absPath = path.resolve(__dirname, "./a.js");
console.log(absPath);
