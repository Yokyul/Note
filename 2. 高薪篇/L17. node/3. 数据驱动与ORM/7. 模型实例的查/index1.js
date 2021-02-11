require("./models/relation");

// 查询 admins 表
const adminServ = require("./services/adminService");
adminServ.login("bcd", "123").then((r) => {
  console.log(r);
});
adminServ.getAdminById(1).then((r) => {
    console.log(r);
});
adminServ.getAdmins().then((r) => {
    console.log(r);
});