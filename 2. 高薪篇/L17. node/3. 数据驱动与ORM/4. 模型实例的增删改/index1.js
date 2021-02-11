// require("./models/sync");

// 注意：本文件的代码是要写在业务逻辑函数里的，写在这是为了看得清楚。index2 文件则是正确写法。
const Admin = require("./models/Admin");

//==============================================================================================
// 1.添加一个模型实例 (即数据库表的一条记录)
//方法1：Admin.build() + ins.save()
const ins = Admin.build({   //同步方法，构建一个模型实例
    loginId: "abc",
    loginPwd: "123",
});
ins.loginId = "bcd";
ins.save().then(() => {
    console.log("新建管理员成功");
});

//方法2：Admin.create() 就相当于 build()+save()
Admin.create({
    loginId: "admin",
    loginPwd: "123456",
}).then((ins) => {
    console.log(ins.id, ins.loginId, ins.loginPwd);
});


//==============================================================================================
// 2.删除一个模型实例
// 方法1：ins.destroy()。删除已有的模型实例
const ins = Admin.findByPk(adminId);
if (ins) {
    ins.destroy();
}
// 方法2：Admin.destroy()
Admin.destroy({
    where: {
        id: 5,
    },
});


//==============================================================================================
// 3.修改一个模型实例
// 方法1：ins.save()。修改已有的模型实例
const ins = Admin.findByPk(1);
ins.loginId = "qqqq";
ins.save();

// 方法2：Admin.update()
Admin.update(
    { loginId: "bbbb" },
    {
        where: { id: 2 },
    }
);