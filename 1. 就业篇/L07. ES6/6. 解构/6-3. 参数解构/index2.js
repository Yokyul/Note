// 参数解构：

// 1.之前写法
function ajaxOld(options) {
    const defaultOptions = {
        method: "get",
        url: "/"
    }
    const opt = {
        ...defaultOptions,
        ...options
    }
    console.log(opt);
}

// 2.解构写法
function ajax({ method = "get", url = "/" } = {}) {
    console.log(method, url);
}

ajax(); //不传参，形参是undefined。