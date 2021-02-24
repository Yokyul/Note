import a from "./a.js"

const fs = require("fs"); //内置模块fs，文件处理
const path = require("path");
const abPath = path.resolve(__dirname, "./test.txt");
let content = fs.readFileSync(abPath, {
    encoding: "utf-8"
});
console.log(content);