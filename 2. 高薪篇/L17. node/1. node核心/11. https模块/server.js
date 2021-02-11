//静态资源服务器
// http://localhost:443/index.html  -> public/index.html 文件内容
// http://localhost:443/css/index.css  -> public/css/index.css 文件内容

const https = require("https");
const URL = require("url");
const path = require("path");
const fs = require("fs");


/* 
    1.搭建服务器：https.createServer(options, requestListener)
        参数1：配置对象。
          - key：私钥
          - cert：证书
        参数2：回调函数。监听是否有请求来了
        返回：server对象。是 Class: http.Server 的子类
*/
const server = https.createServer(
  {
    key: fs.readFileSync(path.resolve(__dirname, "./myFiles/server-key.pem")), //私钥
    cert: fs.readFileSync(path.resolve(__dirname, "./myFiles/server-cert.crt"))
  },
  handler
);

server.on("listening", () => {
  console.log("server listen 443");
});

server.listen(443);



async function getStat(filename) {
  try {
    return await fs.promises.stat(filename);
  } catch {
    return null;
  }
}

// 得到要处理的文件内容
async function getFileContent(url) {
  const urlObj = URL.parse(url);
  let filename; //要处理的文件路径
  filename = path.resolve(__dirname, "public", urlObj.pathname.substr(1));
  let stat = await getStat(filename);
  if (!stat) {
    //文件不存在
    return null;
  } else if (stat.isDirectory()) {
    //文件是一个目录
    filename = path.resolve(
      __dirname,
      "public",
      urlObj.pathname.substr(1),
      "index.html"
    );
    stat = await getStat(filename);
    if (!stat) {
      return null;
    } else {
      return await fs.promises.readFile(filename);
    }
  } else {
    return await fs.promises.readFile(filename);
  }
}

async function handler(req, res) {
  const info = await getFileContent(req.url);
  if (info) {
    res.write(info);
  } else {
    res.statusCode = 404;
    res.write("Resource is not exist");
  }
  res.end();
}

