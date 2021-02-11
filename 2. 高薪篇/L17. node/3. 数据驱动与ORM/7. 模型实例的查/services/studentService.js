const Student = require("../models/Student");
const { Op } = require("sequelize");
const Class = require("../models/Class");

exports.addStudent = async function (stuObj) {
    const ins = await Student.create(stuObj);
    return ins.toJSON();
};

exports.deleteStudent = async function (id) {
    return await Student.destroy({
        where: {
            id,
        },
    });
};

exports.updateStudent = async function (id, obj) {
    return await Student.update(obj, {
        where: {
            id,
        },
    });
};


//========================================================================================
// 以下是查询，查不到返回null
exports.getStudentById = async function (id) {
    const result = await Student.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
};

exports.getStudents = async function (page = 1, limit = 10, sex = -1, name = "") {
    /*
        像这种有很多数据的表，一般都是会进行分页查询，不然数据太多，服务器受不了。

        // 分页查询，写法1：
        const results = await Student.findAll({
            offset: (page - 1) * limit,
            limit: +limit,
        });
        const total = await Student.count();                        //总数
        const datas = JSON.parse(JSON.stringify(results));          //查的数据
        return {
            total,
            datas
        }
    */
    // 写法2
    const where = {};
    if (sex !== -1) {           //数据库0为女，1为男。一般我们希望不传参数时，查所有。
        where.sex = !!sex;      //将sex值转为布尔值。
    }
    if (name) {
        where.name = {
            [Op.like]: `%${name}%`,     //Op是sequelize提供的。要先导入，它提供了类似sql语句的操作符。
        };
    }

    const result = await Student.findAndCountAll({
        attributes: ["id", "name"],     //控制要查哪些字段(列)的信息
        where,
        include: [Class],               //可以联表查询，查学生表和class表的所有信息。要先导入class模型，并且定义好表关系
        offset: (page - 1) * limit,
        limit: +limit,                  //将字符串转为数字
    });
    return {
        total: result.count,
        datas: JSON.parse(JSON.stringify(result.rows)),
    };
};
