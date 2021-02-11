require("./models/relation");

// md5加密，写在服务层： adminService.js
const adminServ = require("./services/adminService");
adminServ.addAdmin({ 
    loginId: "gugu",
    loginPwd: "123123gdf" 
});
adminServ.updateAdmin(7, {
    loginPwd: "123",
});
adminServ.login("bcd", "123").then((r) => {
    console.log(r);
});
