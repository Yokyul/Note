const express = require("express");
const app = express();
const port = 5008;

app.listen(port, () => {
    console.log(`se+-r
    ver listen on ${port}`);
});

/* 
    配置一个请求映射：app.请求方法("请求路径", 处理函数)
        如果 请求方法 和 请求路径 均满足匹配，就交给相应的处理函数进行处理。
        请求方法all 可以匹配所有的请求方法。
        请求路径* 可以匹配所有的get请求。
        

    在处理函数中：
        1)获取请求信息：
            请求头：req.headers         // 对象形式
            请求路径：req.path
            请求参数：req.query         // 对象形式
            动态参数：req.params

        2)发出响应:
            - 自动设置响应头，只要写响应体：
                res.send(响应体);       //响应体可以为：字符串，数组，对象。不同的响应体会有不同的响应头。

            - 手动设置响应头，再写响应体：
                res.setHeader("a", "123");
                res.send([2, 3, 4]);

            - 可以设置重定向：(以下操作都会返回response对象，所以可以链式操作)
                res.status(302).header("location", "https://duyi.ke.qq.com").end();
                简写：res.status(302).location("https://duyi.ke.qq.com").end();
                再简写：res.redirect(302, "https://duyi.ke.qq.com");

            注意：send() 会在内部调用 end()。  调用 end() 服务器就不会一直等待响应。  
            
            
    url路径，我们一般遵循REST风格：
        api/student     get         获取学生
        api/student     post        添加学生
        api/student     put         修改学生
        api/student     delete      删除学生

    该风格使用统一的url路径，通过请求方法来区别要进行什么操作。
*/
// 请求来了后触发回调
app.get("/news/:id/:aaa", (req, res) => {       // req 和 res 是被express封装过后的对象
    // 获取请求信息
    console.log("请求头：", req.headers);
    console.log("请求路径：", req.path);
    console.log("请求参数：", req.query);
    console.log("动态参数：", req.params);

    // 发出响应
    // res.send({
    //     id: 123,
    //     name: "成哥",
    //     age: 18,
    // });
    // res.setHeader("a", "123");
    // res.send([2, 3, 4]);
    res.redirect(302, "https://duyi.ke.qq.com");        //默认信息码 301
});

app.get("*", (req, res) => {
    console.log("======= 匹配任何get请求 =======");
    res.send([2, 3, 4]);
});
