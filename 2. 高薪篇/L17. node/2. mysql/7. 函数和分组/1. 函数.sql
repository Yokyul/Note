/*
    1.数学函数
*/

SELECT ABS(-1);
SELECT CEIL(1.4);
SELECT ROUND(3.1415926, 3);
SELECT TRUNCATE(3.1415926,3);

SELECT TRUNCATE(salary,0)
FROM employee




/*
    2.聚合函数只能和聚合函数一起查询，查询的结果只有一个数据。
*/

SELECT AVG(salary) as `avg`, id
FROM employee;

-- 查询员工数量
SELECT COUNT(id)
FROM employee;

SELECT count(id) as 员工数量,
avg(salary) as 平均薪资,
sum(salary) as 总薪资,
min(salary) as 最小薪资
FROM employee;




/*
    3.字符串与日期函数
*/
SELECT CONCAT_WS('@', `name`,salary)
FROM employee;

SELECT CURDATE();
SELECT CURTIME();

SELECT TIMESTAMPDIFF(DAY,'2010-1-1 11:11:11','2010-1-2 11:11:12');

SELECT *, 
TIMESTAMPDIFF(YEAR, birthday, CURDATE()) as age
from employee
ORDER BY age;