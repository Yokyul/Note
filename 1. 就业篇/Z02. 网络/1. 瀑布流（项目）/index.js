

// 当页面划到最底端时，客户端向服务器发送请求后，数据还未返回。用户就又划动页面，又重新发送请求获取数据 
// 为了解决这样的问题， 可以加锁判断当前有没有请求在触发
var flag = false;
function getData() {
    // 判断当前是否有请求在进行，有的话不进行下次数据请求
    if(flag){
        return ;
    }
    // 如果没有，发送数据请求并上锁
    flag = true;
    ajax({
        url: './data.json',
        type: 'get',
        data: '',
        success: function (data) {
            data = JSON.parse(data);
            // console.log(data);
            renderDom(data);
            flag = false;
        },
        // 当数据返回后，解开锁
        async: true
    })
}

// 将数据渲染到页面上，两种方式。
// 一种方式是顺序插入，但会导致页面在显示图片时，某一列很长，某一列又很短。
// 优化方式是最短列插入。
function renderDom(data) {
    var oLi = document.getElementsByClassName('col');
    var imgDomWidth = oLi[0].offsetWidth - 20 - 20;
    console.log(imgDomWidth);

    data.forEach(function (item, index) {
        var itemDom = document.createElement('div');
        itemDom.className = 'item';
        
        /**
         *  item.width            imgDomWidth
         * -------------   ==   ----------------
         *  item.height           image.height
         */
        var oImg = new Image();
        oImg.height = (imgDomWidth * item.height) / item.width;    // 提前预留图片的位置，以防加载过慢导致找最短列出错
        oImg.src = item.img;
        var oP = document.createElement('p');
        oP.innerText = item.desc;
        itemDom.appendChild(oImg);
        itemDom.appendChild(oP);

        // 按顺序一行一行插入图片
        var minIndex = getMinLi().minIndex;
        console.log(itemDom)
        oLi[minIndex].appendChild(itemDom)
    })
}

// 查找最短列
function getMinLi() {
    var oLi = document.getElementsByClassName('col');
    var minIndex = 0;
    var minHeight = oLi[0].offsetHeight;
    for (var i = 0; i < oLi.length; i++) {
        if (oLi[i].offsetHeight < minHeight) {
            minHeight = oLi[i].offsetHeight;
            minIndex = i;
        }
    }
    return {
        minIndex: minIndex,
        minHeight: minHeight
    }
}

getData();


window.onscroll = function (e){
    var clientHeight = document.documentElement.clientHeight;
    var scrollTop = document.documentElement.scrollTop;
    var minHeight = getMinLi().minHeight;
    if(minHeight < clientHeight + scrollTop){
        getData();
    }
}