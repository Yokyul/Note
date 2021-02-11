
// 1.全局对象：global
// console.log(global)


// 2.global对象 的属性
// 2.1
var timer = setTimeout(() => { }, 1000);
console.log(timer); //浏览器中返回一个数字，node中是一个对象。

var timer = setImmediate(() => {        //类似 setTimeout(() => {}, 0)
    console.log('yu');
});

// 2.2
console.log(__dirname); //当前运行模块所在目录的绝对路径。不包括文件本身
console.log(__filename); //当前运行模块的绝对路径

// 2.3 Buffer
// console.log(Buffer)


// 2.4 process
console.log(process.cwd()); //运行命令时所在的目录
/*
PS C:\Users\Administrator\Desktop\17th code\L15. node\2. 全局对象> node index
    C:\Users\Administrator\Desktop\17th code\L15. node\2. 全局对象
*/

setTimeout(() => {
    console.log("abc");
}, 1000);
process.exit(); //立即结束进程，不会等一秒后输出abc。可以传参：0代表正常结束；1代表错误结束。

console.log(process.argv); //得到所有命令行参数。如下：
/*
PS C:\Users\Administrator\Desktop\17th code\L15. node\2. 全局对象> node index a c s
    [
    'D:\\07 node.js\\node.exe',     (node的绝对路径)
    'C:\\Users\\Administrator\\Desktop\\17th code\\L15. node\\2. 全局对象\\index',   (index的绝对路径)
    'a',
    'c',
    's'
    ]
*/

console.log(process.platform); //win32 (平台版本，支持windows32位及以上的api) (获取当前操作系统)

process.kill(10428); //可以杀死一个进程。参数为：进程id (PID)

console.log(process.env); //获取系统环境变量，对象形式。


