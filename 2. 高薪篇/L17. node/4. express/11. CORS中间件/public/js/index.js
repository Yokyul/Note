// 简单请求
// fetch("http://localhost:5008/api/student")
//   .then((resp) => resp.json())
//   .then((resp) => {
//     console.log(resp);
//   });

// 预检请求
// fetch("http://localhost:5008/api/student", {
//     method: "POST",
//     headers: {
//         "content-type": "application/json",
//         a: 1,
//     },
// })
//     .then((resp) => resp.json())
//     .then((resp) => {
//         console.log(resp);
//     });

// 附带身份凭证的请求
fetch("http://localhost:5008/api/student", {
    method: "POST",
    headers: {
        "content-type": "application/json",
        a: 1,
    },
    credentials: "include",     //通过此配置可以实现附带 cookie
})
    .then((resp) => resp.json())
    .then((resp) => {
        console.log(resp);
    });