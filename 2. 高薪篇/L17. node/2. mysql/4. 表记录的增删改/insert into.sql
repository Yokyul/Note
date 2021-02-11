/*
    增加语句：INSERT INTO 表名(各字段) VALUES(字段值)

        - sql语句里不写分号就不会结束语句。
        - `stu`表示数据库对象stu
        - 'stu'表示字符串stu
        - 可以不写``，但必须保证不与数据库的关键字冲突。
        - 数字也可以写成字符串形式。会自动解析为数字
*/

-- sex为bit类型。可以写true/false，也可以写数字及字符串1/2。
INSERT INTO `student`(sNo, `name`, birthday, sex, phone, classid)
VALUES('100', '成哥', '1900-1-1', TRUE, '13344445555', 2); 
 
-- 如果sex有默认值的话，也可以写default。或者直接不用给sex设置内容，会自动添加
INSERT INTO `student`(sNo, `name`, birthday, phone, classid)
VALUES('100', '成哥', '1900-1-1', '13344445555', 2);

-- 同时增加多条数据
INSERT INTO `student`(sNo, `name`, birthday, phone, classid)
VALUES('100', '成哥', '1900-1-1', '13344445555', 2), ('101', '邓哥', '1900-1-2', '13344445556', 2);


