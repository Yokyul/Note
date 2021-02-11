const Class = require("../models/Class");

// 增
exports.addClass = async function (obj) {
  const ins = await Class.create(obj);
  return ins.toJSON();
};

// 删
exports.deleteClass = async function (id) {
  return await Class.destroy({
    where: {
      id,
    },
  });
};

// 改
exports.updateClass = async function (id, obj) {
  return await Class.update(obj, {
    where: {
      id,
    },
  });
};

// 查
exports.getClassById = async function (id) {
  const result = await Class.findByPk(id);
  if (result) {
    return result.toJSON();
  }
  return null;
};
exports.getClasses = async function () {
  const result = await Class.findAll();
  return JSON.parse(JSON.stringify(result));
};
