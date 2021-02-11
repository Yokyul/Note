/*
    修改语句：UPDATE 表名 SET 字段=字段值 WHERE 条件语句
        - WHERE 表示条件限制。写法很多，见查询语句
*/

-- 只给 id=12 的行修改name字段值
UPDATE student SET `name`='邓旭名' 
WHERE id=12;