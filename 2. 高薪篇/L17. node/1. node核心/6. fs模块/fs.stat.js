const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname, "./myfiles/");

/* 
    1.获取文件或目录的状态信息：fs.promises.stat()
        参数：哪一个文件或目录(文件或目录路径)
        返回一个状态对象。有两个方法：isDirectory()、isFile()

    2.目录的状态信息中size: 0,为什么？
        因为目录本身也是一个文件，它什么也不存，就有一个指针指向其他文件。
*/
async function test() {
    const stat = await fs.promises.stat(filename);
    console.log(stat);
    console.log("是否是目录：", stat.isDirectory());
    console.log("是否是文件：", stat.isFile());
    /*
        输出：
            Stats {
                dev: 2365185402,
                mode: 16822,
                nlink: 1,
                uid: 0,
                gid: 0,
                rdev: 0,
                blksize: 4096,
                ino: 1125899906992208,
                size: 0,
                blocks: 8,
                atimeMs: 1597825678467.347,
                mtimeMs: 1597825678467.347,
                ctimeMs: 1597825678467.347,
                birthtimeMs: 1597751551942.4165,
                atime: 2020-08-19T08:27:58.467Z,
                mtime: 2020-08-19T08:27:58.467Z,
                ctime: 2020-08-19T08:27:58.467Z,
                birthtime: 2020-08-18T11:52:31.942Z
            }
            是否是目录： true
            是否是文件： false
    */
}
test();
