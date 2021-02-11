// 取消事件绑定
function removeEvent(ele,type,handle){
    if(ele.removeEventListener){
        ele.removeEventListener(type,handle,false);
    }else{
        ele.detachEvent('on'+type,handle)
    }
}


// 给一个DOM对象封装该事件类型的处理函数
function addEvent(ele,type,handle){
    if(ele.addEventListener){
        ele.addEventListener(type,handle,false)
    }else{
        if(ele.attachEvent){
            ele.attachEvent('on'+type,function(){
                handle.call(ele);
            })
        }else{
            ele['on'+type] = handle;
        }
    }
}

// 取消事件冒泡
function stopBubble(event){
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
}


// 阻止默认事件
function cancelHandler(event){
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}