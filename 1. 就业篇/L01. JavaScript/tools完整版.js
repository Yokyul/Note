// 查看滚动条滚动距离
function getScrollOffset() {

    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}


// 查看视口尺寸
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}


// 获取给定元素elem的prop属性值
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}

// 取消事件绑定
function removeEvent(ele, type, handle) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, handle, false);
    } else {
        ele.detachEvent('on' + type, handle)
    }
}


// 给一个DOM对象封装该事件类型的处理函数
function addEvent(ele, type, handle) {
    if (ele.addEventListener) {
        ele.addEventListener(type, handle, false)
    } else {
        if (ele.attachEvent) {
            ele.attachEvent('on' + type, function () {
                handle.call(ele);
            })
        } else {
            ele['on' + type] = handle;
        }
    }
}

// 取消事件冒泡
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}


// 阻止默认事件
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}


// 判断是否需要加载资源
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "complete" || "loaded") {
                callback();
            }
        }
    } else {
        script.onload = function () {
            callback();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}


// 获取某一节点的所有兄弟节点(以数组形式返回)
function getSiblings(node) {
    var parentNode = node.parentNode;
    var children = parentNode.children;
    var result = [];
    for (var i = 0; i < children.length; i++) {
        if (children[i] != node) {
            result.push(children[i])
        }
    }
    return result;
}