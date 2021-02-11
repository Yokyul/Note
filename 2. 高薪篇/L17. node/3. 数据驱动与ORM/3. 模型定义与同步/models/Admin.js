const sequelize = require("./db");
const { DataTypes } = require("sequelize");

/* 
    1.创建一个模型对象(即数据库的表): sequelize.define()
        - 参数1：模型名
        - 参数2：配置对象。(配置表的每一列，一般不配置主键列，sequelize会自动生成)
        - 参数3：其他配置。
        - 返回一个模型对象
*/
module.exports = sequelize.define(
    "Admin",
    {
        loginId: {
            type: DataTypes.STRING,     // 列的类型
            allowNull: false,           // 是否允许为null。默认true
        },
        loginPwd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: false,         // 表名与模型名是否一致。默认false，表名自动为模型名复数。
        // tableName: '表名',               // 直接定义表名   
        createdAt: false,               // 创建时间列。false表示不需要该列。也可以给该列改名，值写为名称即可
        updatedAt: false,               // 更新时间列。
        // deletedAt: "名称",               // 删除时间列。只能改名
        paranoid: true                  // 从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间。
    }
);

