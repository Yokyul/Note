SELECT * FROM employee
WHERE ismale = 1;

SELECT * FROM department
WHERE companyId in (1, 2);

SELECT * from employee
WHERE location is not null;

SELECT * from employee
WHERE location is null;

SELECT * from employee
WHERE salary>=10000;

SELECT * from employee
WHERE salary BETWEEN 10000 and 12000;

-- 模糊查询：%代表一系列字符。
SELECT * from employee
WHERE `name` like '%袁%';

-- 模糊查询：_代表一个字符
SELECT * from employee
WHERE `name` like '袁_';

-- 多个条件查询，and优先级高于or
SELECT * from employee
WHERE `name` like '张%' and ismale=0 and salary>=12000;

SELECT * from employee
WHERE `name` like '张%' and (ismale=0 and salary>=12000
or
birthday>='1996-1-1');