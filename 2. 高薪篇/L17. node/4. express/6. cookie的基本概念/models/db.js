// 建立数据库连接
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("myschooldb", "root", "ea686522", {
  host: "localhost",    // 数据库所在的服务器
  dialect: "mysql",     // 数据库类型
  logging: null         // 控制日志的输出与否
});

module.exports = sequelize;
