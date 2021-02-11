require("./init");// 项目入口文件，导入初始化操作。

// 使用服务层 studentService.js 中的 addStuden() 作为本节课使用验证库的例子。
const stuServ = require("./services/studentService");
stuServ.addStudent({
    name: "adfd",
    birthday: "2010-3-5",
    sex: true,
    mobile: "15454545444",
    ClassId: 38,
    deletedAt: "2010-1-1",
    a: 3,
    b: 4,
}).catch((err) => {     //验证出错，消息会从这打印出来。
    console.log(err);
});


