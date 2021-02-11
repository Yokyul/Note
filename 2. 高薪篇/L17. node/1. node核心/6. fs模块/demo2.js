const fs = require("fs");
const path = require("path");

/* 
    练习：读取一个目录中的所有子目录和文件。每个目录或文件都是一个对象:
        - 属性:
            name：文件名
            ext：后缀名，目录为空字符串
            isFile：是否是一个文件
            size：文件大小
            createTime：日期对象，创建时间
            updateTime：日期对象，修改时间
        - 方法:
            getChildren()：得到目录的所有子文件对象，如果是文件，则返回空数组
            getContent(isBuffer = false)：读取文件内容，如果是目录，则返回null
*/

class File {
    constructor(filename, name, ext, isFile, size, createTime, updateTime) {
        this.filename = filename;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    async getContent(isBuffer = false) {
        if (this.isFile) {
            if (isBuffer) {
                return await fs.promises.readFile(this.filename);
            } else {
                return await fs.promises.readFile(this.filename, "utf-8");
            }
        }
        return null;
    }

    async getChildren() {
        if (this.isFile) {
            //文件不可能有子文件
            return [];
        }
        let children = await fs.promises.readdir(this.filename);
        children = children.map(name => {
            const result = path.resolve(this.filename, name);
            return File.getFile(result);
        });
        return Promise.all(children);
    }

    static async getFile(filename) {
        const stat = await fs.promises.stat(filename);
        const name = path.basename(filename);
        const ext = path.extname(filename);
        const isFile = stat.isFile();
        const size = stat.size;
        const createTime = new Date(stat.birthtime);
        const updateTime = new Date(stat.mtime);
        return new File(filename, name, ext, isFile, size, createTime, updateTime);
    }
}

async function readDir(dirname) {
    const file = await File.getFile(dirname);
    return await file.getChildren();
}

async function test() {
    const dirname = path.resolve(__dirname, "./myfiles");
    const result = await readDir(dirname);
    const datas = await result[0].getChildren();
    console.log(datas);
}

test();
