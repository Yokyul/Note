const fs = require("fs");
const path = require("path");
const dirname = path.resolve(__dirname, "./myfiles/");

/* 
    1.获取目录中的文件和子目录：fs.promises.readdir()
        参数：目录的路径
        返回一个数组，每一项是目录中的文件和子目录的字符串
*/
async function test() {
  const pathes = await fs.promises.readdir(dirname);
  console.log(pathes);      // 输出：[ '1', '1.txt', '2.txt', '3.jpeg', '3copy.jpeg', 'sub' ]
}
test();
