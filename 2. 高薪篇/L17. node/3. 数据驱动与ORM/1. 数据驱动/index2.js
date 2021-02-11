// 二、使用promise写法
const mysql = require("mysql2/promise");

async function test() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "ea686522",
        database: "demo-companydb",
    });
    const [results] = await connection.query("SELECT * FROM `company`;");   // await 返回的是数组[err, result]
    console.log(results);
    connection.end();
}
test();
