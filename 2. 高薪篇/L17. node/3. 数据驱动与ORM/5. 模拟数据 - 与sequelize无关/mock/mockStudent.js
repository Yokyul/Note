const Mock = require("mockjs");

// 模拟学生数组
const result = Mock.mock({
    "datas|500-700": [
        {
            name: "@cname",
            birthday: "@date",
            "sex|1-2": true,
            mobile: /1\d{10}/,
            "ClassId|1-16": 0,      // 外键
        },
    ],
}).datas;
// console.log(result);

const Student = require("../models/Student");
Student.bulkCreate(result);
