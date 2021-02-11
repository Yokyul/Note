// 模型实例的增删改写在服务层，然后引入。
const adminServ = require("./services/adminService");

// 增
adminServ.addAdmin({
    loginId: "asdfasdfasdfssa",
    loginPwd: "adsfasdfd",
});

// 删
adminServ.deleteAdmin(4).then((r) => {
    console.log(r);
});

// 改
adminServ.updateAdmin(4, {
    loginId: "aaaaaa",
}).then((r) => {
    console.log(r);
});
