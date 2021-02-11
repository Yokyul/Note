
console.log("入口文件执行了!");

var util1 = require("./util.js")
var util2 = require("./util.js")
console.log(util1 === util2);

;
console.log(require("./util").getNumber());
console.log(require("./util").getNumber());
console.log(require("./util").getNumber());

require("./util2")
