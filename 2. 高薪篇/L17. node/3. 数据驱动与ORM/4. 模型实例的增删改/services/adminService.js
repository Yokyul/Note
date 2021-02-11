/*
    这是管理员增删改的业务逻辑：
        1.管理员初始化：判断数据库中是否有管理员，如果没有，自动添加一个默认管理员
        2.进行增删改操作：
            - 导入模型
            - 写业务逻辑(功能)，包含验证。
*/
const Admin = require("../models/Admin");

// 增
exports.addAdmin = async function (adminObj) {
    // 应该判断adminObj的各种属性是否合理，以及账号是否已存在
    const ins = await Admin.create(adminObj);
    return ins.toJSON();
};

// 删
exports.deleteAdmin = async function (adminId) {
    // 方式1
    // const ins = await Admin.findByPk(adminId);
    // if (ins) {
    //     await ins.destroy();
    // }

    // 方式2
    const result = await Admin.destroy({
        where: {
            id: adminId,
        },
    });
    return result;
};

// 改
exports.updateAdmin = async function (id, adminObj) {
    // 方式1
    // const ins = await Admin.findByPk(id);
    // ins.loginId = adminObj.loginId;
    // ins.save();

    // 方式2
    const result = await Admin.update(adminObj, {
        where: {
            id,
        },
    });
    return result;
};
