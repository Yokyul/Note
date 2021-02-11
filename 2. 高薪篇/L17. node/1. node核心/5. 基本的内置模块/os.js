// 用来操作操作系统的对象os
const os = require("os");

console.log(os.EOL);                    // 表示换行符，Windows下是\r\n，其他操作系统是\n

console.log(os.arch())                  // 获取CPU架构名

console.log(os.cpus().length);          // CPU 每个内核的信息，是数组。

console.log(os.freemem() / 2 ** 30);    // freemem：当前还有多少空闲内存(单位：字节)

console.log(os.homedir());              // 获取用户目录

console.log(os.hostname());             // 获取主机名

console.log(os.tmpdir());               // 获取操作系统的临时目录
