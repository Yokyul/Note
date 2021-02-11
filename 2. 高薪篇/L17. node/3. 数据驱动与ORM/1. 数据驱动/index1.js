// 一、使用回调函数的写法
const mysql = require("mysql2");

// 1.创建一个数据库连接 (node程序和sql数据库可能在不同的计算机上)
const connection = mysql.createConnection({
    host: "localhost",      // ip或域名
    user: "root",           // 数据库账号
    password: "ea686522",
    database: "demo-companydb",  // 数据库名
});


/* 
    2.数据库操作：query()
        - 参数1：sql语句
        - 参数2：回调函数fun
            - 参数1：err (sql语句执行错误的信息)
            - 参数2：result (sql语句查询结果)
*/
// 2.1 查询语句
connection.query(
    "SELECT * FROM `company`;",
    (err, results) => {
        console.log(results);
    }
);
/* 输出结果：
[
  TextRow {
    id: 1,
    name: '腾讯科技',
    location: '广东省深圳市腾讯大厦',
    buildDate: 2009-07-09T16:00:00.000Z
  },
  TextRow {
    id: 2,
    name: '渡一教育',
    location: '黑龙江哈尔滨',
    buildDate: 2004-02-09T16:00:00.000Z
  },
  TextRow {
    id: 3,
    name: '蚂蚁金服',
    location: '中国杭州市西湖区西溪路556号蚂蚁Z空间',
    buildDate: 2010-04-03T16:00:00.000Z
  }
]
*/

// 2.2 新增语句
connection.query(
    "insert into company(`name`, location, buildDate) values('我的公司', '公司地址', curdate());",
    (err, result) => {
        console.log(result);
    }
);
/* 输出结果：
ResultSetHeader {
  fieldCount: 0,
  affectedRows: 1,          // 受影响的行数
  insertId: 4,              // 新增的id
  info: '',
  serverStatus: 2,
  warningStatus: 0
}
*/

// 2.3 修改语句
connection.query(
    "update company set `name`='abc' where id=4",
    (err, result) => {
        console.log(result);
    }
);
/* 输出结果：
ResultSetHeader {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1          // 改变的行数
  }
*/

// 2.4 删除语句
connection.query(
    "delete from company where id in (4,5)",
    (err, result) => {
        console.log(result);
    }
);

// 3.主动断开连接
connection.end()
