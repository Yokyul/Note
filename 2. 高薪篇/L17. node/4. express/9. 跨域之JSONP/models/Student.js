const sequelize = require("./db");
const { DataTypes } = require("sequelize");
const moment = require("moment");

module.exports = sequelize.define(
    "Student",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false,
            get() { //访问器。在数据库中保存的是日期，但我想拿到时是个时间戳，同时又不改变数据库的值。此时可以使用访问器。
                const birth = this.getDataValue("birthday");    //得到 "birthday" 字段的值。
                if (birth) {
                    return birth.getTime();
                }
                return undefined;
            },
        },
        // 虚拟字段 age
        age: {
            type: DataTypes.VIRTUAL,
            get() {
                const now = moment.utc();
                const birth = moment.utc(this.birthday);
                return now.diff(birth, "y"); //得到两个日期的年份的差异
            },
        },
        sex: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING(11),
            allowNull: false,
        },
    },
    {
        createdAt: false,
        updatedAt: false,
        paranoid: true,
    }
);
