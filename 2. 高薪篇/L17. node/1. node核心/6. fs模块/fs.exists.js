const fs = require("fs");
const path = require("path");
const dirname = path.resolve(__dirname, "./myfiles/2");

/* 
    1.判断文件或目录是否存在：exists()
        该函数已经过时了，不能使用 fs.promises.exists() 这种形式。但是依然可以使用另外两种：fs.exists() fs.existsSync()
        参数：要判断的目录的路径

    2.手写 fs.promises.exists()，见下：
*/
async function exists(filename) {
    try {
        await fs.promises.stat(filename);
        return true;
    } catch (err) {
        if (err.code === "ENOENT") {    // 文件不存在的错误
            return false;
        }
        throw err;  // 其他错误，如无权限访问等。
    }
}

async function test() {
    const result = await exists(dirname);
    if (result) {
        console.log("目录已存在，无需操作");
    } else {
        await fs.promises.mkdir(dirname);
        console.log("目录创建成功");
    }
}
test();
