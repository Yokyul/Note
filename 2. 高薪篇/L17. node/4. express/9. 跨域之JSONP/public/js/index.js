// 使用 jsonp 跨域请求数据。
function jsonp(url) {
    // 创建 <script> 元素
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);

    // 拿到响应的数据后，删除 <script> 元素
    script.onload = function () {
        script.remove();
    };
}

function callback(data) {
    console.log(data);
}

jsonp("http://localhost:5008/api/student");
