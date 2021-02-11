const Class = require("./Class");
const Student = require("./Student");

// 设置模型关系
Class.hasMany(Student);
Student.belongsTo(Class);
