require("./Admin");
require("./Book");
require("./Class");
require("./Student");
const sequelize = require("./db");

// 同步所有模型。一个模型就是数据库的一张表，js的一个对象。
sequelize.sync({ alter: true }).then(() => {
    console.log("所有模型同步完成");
});
