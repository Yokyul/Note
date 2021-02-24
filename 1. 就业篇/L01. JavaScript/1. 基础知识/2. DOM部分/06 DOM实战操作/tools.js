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
function getViewportOffset(){
    if (window.innerWidth) {
        return {
            w : window.innerWidth,
            h : window.innerHeight
        }
    }else{
        if (document.compatMode === "BackCompat") {
            return {
                w : document.body.clientWidth,
                h : document.body.clientHeight
            }
        }else{
            return {
                w : document.documentElement.clientWidth,
                h : document.documentElement.clientHeight
            }
        }
    }
}


// 获取给定元素elem的prop属性值
function getStyle(elem,prop){
    if(window.getComputedStyle){
        return window.getComputedStyle(elem,null)[prop];
    }else{
        return elem.currentStyle[prop];
    }
}
