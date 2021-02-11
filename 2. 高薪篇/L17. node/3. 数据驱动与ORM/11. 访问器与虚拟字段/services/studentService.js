const Student = require("../models/Student");
const { Op } = require("sequelize");
const Class = require("../models/Class");

/*
    数据验证：本节课使用 validate 库。导入的对象有以下方法：
        1 同步验证：.validate(stuObj, rule): 
            - 参数1：验证对象
            - 参数2：验证规则
            - 返回：验证通过返回 undefined，否则返回 错误信息。
        2 异步验证：.async(stuObj, rule)

*/
const validate = require("validate.js");            //导入验证库。
const moment = require("moment");
const { pick } = require("../util/propertyHelper"); //导入一个处理函数。传入的对象中有无用的属性，将它们去除，这样就不会添加到数据库了。

// 增
exports.addStudent = async function (stuObj) {
    stuObj = pick(stuObj, "name", "birthday", "sex", "mobile", "ClassId");
    console.log(stuObj);

    // 设置自定义验证规则。该库的所有规则都在 validate.validators 对象内，所以直接在该对象内加一个规则就好。
    validate.validators.classExits = async function (value) {
        const c = await Class.findByPk(value);
        if (c) {
            return;
        }
        return "is not exist";  //返回的消息会自动在开头带上 value 的值，所以不用写。
    };
    // 配置验证规则。给每一个属性都设置1个或多个验证规则。
    const rule = {
        name: {
            presence: {     //presence规则。表示是否为必填，但是为空的话验证也会通过，需要 allowEmpty 配置。
                allowEmpty: false,  //不容许为空
            },
            type: "string", //type规则
            length: {       //length规则。设置字符串长度得最大最小值。
                minimum: 1,
                maximum: 10,
            },
        },
        birthday: {
            presence: {
                allowEmpty: false,
            },
            datetime: {         //不使用type: date 规则。因为改规则要求数据必须是日期格式，而实际上这类数据也可以写成时间戳。所以使用datetime，具体看文档。此时还用到了扩展器，写在服务层的 init()，为了将用户传入的数据统一转为时间戳在验证下列规则。
                dateOnly: true,
                earliest: +moment.utc().subtract(100, "y"),     //不能早于某一时间
                latest: +moment.utc().subtract(5, "y"),         //不能晚于某一时间
            },
        },
        sex: {
            presence: true,
            type: "boolean",
        },
        mobile: {
            presence: {
                allowEmpty: false,
            },
            format: /1\d{10}/,      //格式规则。该规则将根据填写的正则表达式验证值。
        },
        ClassId: {
            presence: true,
            numericality: {         //验证类型。法1写type 规则，但是太严格，写数字类型就必须是数字，"123" 这样也会失败；法2写 numericality 规则，具体看文档。
                onlyInteger: true,
                strict: false,
            },
            classExits: true,   //自定义规则。
        },
    };
    await validate.async(stuObj, rule);

    // 在数据库中创建此记录。
    const ins = await Student.create(stuObj);
    return ins.toJSON();
};

// 删
exports.deleteStudent = async function (id) {
    return await Student.destroy({
        where: {
            id,
        },
    });
};

// 改
exports.updateStudent = async function (id, obj) {
    return await Student.update(obj, {
        where: {
            id,
        },
    });
};

// 查
exports.getStudentById = async function (id) {
    const result = await Student.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
};
exports.getStudents = async function (
    page = 1,
    limit = 10,
    sex = -1,
    name = ""
) {
    // const results = await Student.findAll({
    //   offset: (page - 1) * limit,
    //   limit: +limit,
    // });
    // const total = await Student.count()
    // const datas = JSON.parse(JSON.stringify(results));
    // return {
    //   total,
    //   datas
    // }
    const where = {};
    if (sex !== -1) {
        where.sex = !!sex;
    }
    if (name) {
        where.name = {
            [Op.like]: `%${name}%`,
        };
    }

    const result = await Student.findAndCountAll({
        attributes: ["id", "name", "sex", "birthday"],
        where,
        include: [Class],
        offset: (page - 1) * limit,
        limit: +limit,
    });
    return {
        total: result.count,
        datas: JSON.parse(JSON.stringify(result.rows)),
    };
};
