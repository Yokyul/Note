/* 
    四、Using connection pools (使用连接池)
        - 一个用户会创建一个数据库连接。如果有500个用户的话，会创建500个连接，会大量占用服务器资源。
        - 此时可以使用连接池，它是一个数组，里面存储许多连接对象。我们可以设置数组长度为10，这样其他的连接需要排队等待，节约服务器资源。并且连接池会自动关闭连接
*/
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "ea686522",
    database: "demo-companydb",
    multipleStatements: true,
    waitForConnections: true,   // 有新连接是否等待。默认true。不等待的话，当前连接会出错。
    connectionLimit: 10,        // 最大连接数量。默认10
    queueLimit: 0               // 要排的队列最大长度。默认0，无限长
});

async function test(id) {
    const sql = `select * from employee where \`name\` like concat('%', ?, '%') ;`;
    const [results] = await pool.execute(sql, [id]);
    console.log(results);
}
test("袁");
