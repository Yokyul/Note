/*
    1.查询某一列的数据：SELECT 字段(可以有多个) from 表名;
        - 可以是不存在的列
        - 可以给字段定别名(写法1：as ，写法2：直接在字段后跟别名)
        - *：查所有列
*/
SELECT id, loginid, loginpwd, 'abc' as '额外的一列' from `user`;    -- 查不存在的列
SELECT ismale '性别' from `employee`;     -- 别名
SELECT *, 'abc' as 'extra' from `employee`;     -- 查所有列


/*
    2.查询某一列的数据，并将某一个字段处理后在显示。
        如：物理表的 `ismale字段` 值为0/1，我们希望展示时为男/女。
        - 写法1：
            case ismale
            when 1 then '男'
            else '女'
            end 
            sex,
        - 写法2：
            case
            when ismale = 1 then '男'
            else '女'
            end 
            sex,
*/
SELECT id, `name`, 
case ismale
when 1 then '男'
else '女'
end sex, 
salary 
FROM employee;

SELECT id, `name`, 
case
when ismale = 1 then '男'
else '女'
end sex, 
case
when salary>=10000 then '高'
when salary>=5000 then '中'
else '低'
end `level`,
salary
FROM employee;


/*
    3.去重：将所有员工分布的地址重复的去掉
        DISTINCT 后一般只写一列
*/
select DISTINCT location from employee;