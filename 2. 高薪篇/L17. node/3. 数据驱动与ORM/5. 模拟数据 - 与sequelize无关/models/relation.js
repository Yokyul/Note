/* 
    设置模型关系。
        本来 student表 和 class表 是存在外键关系的，但是只写在了 class表。当我们模拟student表的数据时，只引入 student表 会导致外键信息不全，以至于无法生成外键 classID 的数据。所以干脆就提取出来单独写一个文件来保存外键信息。
*/
const Class = require("./Class");
const Student = require("./Student");
Class.hasMany(Student);
Student.belongsTo(Class);
