const Mock = require("mockjs");

// 模拟班级数组
const result = Mock.mock({
    "datas|16": [
        {
            "id|+1": 1,                 //如果模拟多个数据，+1规则就会依次递增1
            name: "前端第 @id 期",      //占位符@ 取id的值
            openDate: "@date",          //随机生成日期
        },
    ],
}).datas;
console.log(result);

const Class = require("../models/Class");
Class.bulkCreate(result);       //向数据库插入多条数据
