/* 
    三、Using Prepared Statements (预编译的变量)
        - 注意：最好不要写query函数，要防止sql注入。
        - 比如说：test()希望传入id值，进行查询。但是：如果用户传的是"''; delete from company where id = 5"，那么就是删除语句了。
        - 我们要避免这样的sql注入：使用预编译的变量(execute函数)。
            - 预编译的变量在sql语句中用?表示
            - execute()第二个参数是数组，每一项依次对应每一个?的值。
            - 注意：如果是模糊查询，?会写在''里。此时?就不是变量了。需要用concat()
*/
const mysql = require("mysql2/promise");

async function test(id, per) {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "ea686522",
        database: "demo-companydb",
        multipleStatements: true,     // 允许运行多条sql语句
    });
    const sql = `select * from employee where id = ? and \`name\` like concat('%', ?, '%');`;
    const [results] = await connection.execute(sql, [id, per]);      // id传给sql的?
    console.log(results);
    connection.end();
}
test("''; delete from company where id = 5", "袁");
test(1, "袁")
