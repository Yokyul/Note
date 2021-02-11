require("./models/relation");

// 查 student 表
const stuServ = require("./services/studentService");
stuServ.getStudentById(669).then(r => {
    console.log(r)
})
stuServ.getStudents(1, 10, false, "秀").then((r) => {
    console.log(r);
});
