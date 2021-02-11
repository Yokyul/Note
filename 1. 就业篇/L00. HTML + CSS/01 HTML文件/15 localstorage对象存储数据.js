//用localstorage方法存储
function saveStorage(id) {
    var target = document.getElementById(id);
    var str = target.value;
    //通过key/value（键值对）保存数据
    localStorage.setItem("message", str);
}

function loadStorage(id) {
    var target = document.getElementById(id);
    //读取数据
    var gu = localStorage.getItem("message");//通过"键"读取数据
    target.innerHTML = gu;
}