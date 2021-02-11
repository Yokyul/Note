/* 
    排序：ORDER BY 列名 排序方式
        - 升序asc (默认)
        - 降序desc
*/

-- 按性别升序排，性别相同时，按薪资降序排。
SELECT *, case ismale
when 1 then '男'
else '女'
end sex from employee
ORDER BY sex asc, salary desc;