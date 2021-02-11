require("./init");

// 本节课以数据层的 student 模型为例。在 student 模型的 birthday 字段添加访问器，并给该模型添加虚拟字段。
const stuServ = require("./services/studentService");
stuServ.getStudents().then((res) => {
  console.log(res);
});
