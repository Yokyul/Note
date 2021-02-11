
/**
 * ajax: async javascript and xml(json)
 *      主要用于数据交互（网络请求）
 * 
 *      duing： 邓哥奇遇记系列
 *         五层网络模型：
 *          应用层
 *          传输层
 *          网络层
 *          数据链路层
 *          物理层
 *      url: 请求地址
 *      type: 请求方式
 *      data: 请求参数
 *      success：请求成功的回调函数
 *      async: 当前请求是否允许异步 true 允许异步  false 不允许异步
 */
function ajax(options) {

    // xhr 用于存储当前网络请求中的所有信息
    var xhr = null;
    // 判断当前浏览器是否含有XMLHTTPRequest对象, 没有则判断是否含有ActiveXOject对象
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();        //IE7+， Chrome, firefox及其他浏览器有的
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');  //IE6/5中特有的
    } else {
        return alert('当前浏览器不支持XMLHttpRequest')
    }

    var dataStr = '';
    if (typeof options.data == 'object') {
        for (var prop in options.data) {
            if (options.data.hasOwnProperty(prop)) {
                dataStr += prop + '=' + options.data[prop] + '&';
            }
        }
    } else if (typeof options.data == 'string') {
        dataStr = options.data;
    } else {
        // return alert('数据格式只能为字符串或者对象');
        dataStr = '';
    }



    // 默认当前请求是异步请求
    if (typeof options.async !== 'boolean') {
        options.async = true;
    }
   

    // onreadystatechange事件是用来监听xhr 对象身上的readyState属性的
    // readyState 属性有5个值：0 1 2 3 4
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {  
                // 只有后台传回的数据是json字符串，如"{data: 'xxx'}"  ，才可以使用JSON.parse(xhr.responseText)
                // 如果是普通字符串， 如 "我是xx" ，使用下面的写法
                options.success(xhr.responseText);
            }
        }
    }


    options.type = options.type.toUpperCase();
    if (options.type == 'GET') {
        // 此时 GET 的数据编码格式为：key=value&key1=value1(默认)
        xhr.open(options.type, options.url + '?' + dataStr, options.async);
        xhr.send();
    } else{
        xhr.open(options.type, options.url, options.async);
        // 在请求头信息中给 POST 设置数据编码格式(Content-Type)
        // 1) 字符串格式 "key=value&key1=value1"      application/x-www-form-urlencoded
        // 2）对象格式 { key:value, key1:value1 }     appliction/json
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')  //参数：请求头属性名，属性值
        if(options.headers) {
            for (var prop in options.headers) {
                xhr.setRequestHeader(prop, options.headers[prop])
            }
        }
        xhr.send(dataStr);
    }
   
    
}