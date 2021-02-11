/*
    1.定义模型：一个模型就是数据库的一张表，js的一个对象。
        - 方法1：调用 sequelize.define(modelName, attributes, options)
        - 方法2：扩展 Model 并调用 init(attributes, options)

    2.同步模型：
        - 方法1：一个一个同步
            - 模型名.sync()
            - 模型名.sync({ force: true })
            - 模型名.sync({ alter: true })
        - 方法2：一起同步
            - sequelize.sync()：如果表不存在,则创建该表 (如果已经存在,则不执行任何操作)
            - sequelize.sync({ force: true })：将会创建表。如果表已经存在，则将其先删除。
            - sequelize.sync({ alter: true })：检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配。

    3.补充：自动生成外键
        假设我们有两个模型 A 和 B， 告诉 Sequelize 两者之间的关联仅需要调用一个函数：
        - A.hasOne(B)：     A 和 B 之间存在一对一的关系,外键在目标模型(B)中定义.
        - A.belongsTo(B)：  A 和 B 之间存在一对一的关系,外键在源模型中定义(A).
        - A.hasMany(B)：    A 和 B 之间存在一对多关系,外键在目标模型(B)中定义.
        - A.belongsToMany(B, { through: 'C' })：将表 C 用作联结表,在 A 和 B 之间存在多对多关系.
*/

require("./models/sync");
