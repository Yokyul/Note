// URL 是一个构造函数
const URL = require("url");

/* 
    1.字符串url 转 对象，两种写法：
        new URL.URL() ==  URL.parse()。但输出对象有些许差别。
*/
const url = new URL.URL("https://nodejs.org:80/a/b/c?t=3&u=5#abc");
console.log(url);
console.log(url.searchParams.has("a"));
console.log(url.searchParams.has("t"));
console.log(url.searchParams.get("t"));

/* 
    2.对象 转 字符串url：
        URL.format()
*/
const obj = {
  href: "https://nodejs.org:80/a/b/c?t=3&u=5#abc",
  origin: "https://nodejs.org:80",
  protocol: "https:",
  username: "",
  password: "",
  host: "nodejs.org:80",
  hostname: "nodejs.org",
  port: "80",
  pathname: "/a/b/c",
  search: "?t=3&u=5",
  hash: "#abc"
};

const url1 = URL.format(obj);
console.log(url1);      // 输出：https://nodejs.org:80/a/b/c?t=3&u=5#abc
