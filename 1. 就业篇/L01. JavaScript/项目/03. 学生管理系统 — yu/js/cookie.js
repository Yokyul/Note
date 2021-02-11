
/* 
    cookie在这的用处是 存储登录的信息，然后在 index页面展示。
    用于在相同域名下的不同页面传数据
*/


// 获取cookie值
function getCookie(key) {
    var cookie = document.cookie.trim().split('; ');
    var cookieObj = {}
    for (var i = 0; i < cookie.length; i++) {
        var arr = cookie[i].split('=');
        cookieObj[arr[0]] = arr[1];
    }
    return cookieObj[key]
}

// 设置cookie值
function setCookie(key, value, time) {
    var expires = new Date(new Date().getTime() + time)
    document.cookie = key + '=' + value + '; expires=' + expires.toGMTString();
    console.log(document.cookie)
}

// 移除cookie值
function removeCookie(key) {
    setCookie(key, '', -1)
}