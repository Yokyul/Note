var oContentl = document.getElementsByClassName('contentl')[0];
var oDivArr = [
    {
        left: '用户名',
        placeholder: '请设置用户名',
        zs: '设置后不可更改<br>中英文均可，最长14个英文或7个汉字',
    }, {
        left: '手机号',
        placeholder: '可用于登录和找回密码',
        zs: '请输入中国大陆手机号，其他用户不可见'
    }, {
        left: '验证码',
        placeholder: '请输入验证码',
        zs: ''
    }, {
        left: '密码',
        placeholder: '请设置登录密码',
        zs: '<div id="mima"><ul><li>长度为6到14个字符</li><li>支持数字，大小写字母和标点符号</li><li>不允许有空格</li></ul></div>'
    }
]

for (var i = 0; i < 5; i++) {
    var oDiv = document.createElement('div');
    if (i < 4) {
        oDiv.className = 'shuru';
        oDiv.innerHTML = '<span>' + oDivArr[i].left + '</span><div class="eeq"><input placeholder="' + oDivArr[i].placeholder + '" id="inp' + i + '"><div style="width:0px;" class="zsa"></div></div>';
        oContentl.appendChild(oDiv);
    } else {
        oDiv.innerHTML = '<div id="xieyi"><input type="checkbox">阅读并接受<span>《百度用户协议》</span>及<span>《百度隐私权保护声明》</span></div>';
        oContentl.appendChild(oDiv);
    }

}
var oDiv = document.createElement('div');
oDiv.innerHTML = '<a><button>注册</button></a>';
oDiv.className = 'sumzc';
oContentl.appendChild(oDiv);
// 功能
var oZsaArr = document.getElementsByClassName('zsa');
var oName = ['wzm', 'cst', 'qqq', 'www', 'eee']
for (var i = 0; i < 4; i++) {
    var oInput = document.getElementById('inp' + i);
    (function (index) {
        oInput.onfocus = function () {
            oZsaArr[index].innerHTML = oDivArr[index].zs;
            oZsaArr[index].style.width = 'auto';
            oZsaArr[index].id = '';
        }
    })(i)
}
var oInput0 = document.getElementById('inp0')
if (!oInput.value) {
    oInput0.onblur = function () {
        oZsaArr[0].innerHTML = '';
        oZsaArr[0].style.width = '0px';
        oZsaArr[0].id = '';
    }
}
oInput0.onchange = function () {
    if (!oInput0.value) {
        oInput0.onblur = function () {
            oZsaArr[0].innerHTML = '';
            oZsaArr[0].style.width = '0px';
            oZsaArr[0].id = '';
        }
    } else if (oName.indexOf(oInput0.value) >= 0) {
        oInput0.onblur = function () {
            oZsaArr[0].id = 'chongfu';
            chongfu.innerHTML = '此用户名太受欢迎,请更换一个';
        }
    } else {
        oInput0.onblur = function () {
            oZsaArr[0].id = 'chenggong';
            chenggong.innerHTML = '';
        }
    }
}
var oInput1 = document.getElementById('inp1');
if (!oInput1.value) {
    oInput1.onblur = function () {
        oZsaArr[1].innerHTML = '';
        oZsaArr[1].style.width = '0px';
        oZsaArr[1].id = '';
    }
}
oInput1.onchange = function () {
    if (!oInput1.value) {
        oInput1.onblur = function () {
            oZsaArr[1].innerHTML = '';
            oZsaArr[1].style.width = '0px';
            oZsaArr[1].id = '';
        }
    } else if (isNaN(oInput1.value) || oInput1.value < 13000000000 || oInput1.value > 18999999999) {
        oInput1.onblur = function () {
            oZsaArr[1].id = 'chongfu1';
            chongfu1.innerHTML = '手机号码格式不正确';
        }
    } else {
        oInput1.onblur = function () {
            oZsaArr[1].id = 'chenggong1';
            chenggong1.innerHTML = '';
        }
    }
}
var oInput3 = document.getElementById('inp3');
if (!oInput3.value) {
    oInput3.onblur = function () {
        oZsaArr[3].innerHTML = '';
        oZsaArr[3].style.width = '0px';
        oZsaArr[3].id = '';
    }
}

// for (var i = 0; i < 4; i++) {
//     var oInput = document.getElementById('inp'+ i);
//     (function (index) {
//         oInput.onfocus = function () {
//             oZsaArr[index].style.width = 'auto';
//         }
//         oInput.onchange = function () {
//             var oInput0 = document.getElementById('inp0');
//             if (!oInput0.value) {
//                 oInput0.onblur = function () {
//                     oZsaArr[0].style.width = '0px'
//                     console.log(1)
//                 }
//             }else if (oName.indexOf(oInput0.value)) {
//                 oInput0.onblur = function () {
//                     oZsaArr[0].id = 'chongfu';
//                     chongfu.innerHTML = '此用户名太受欢迎,请更换一个';
//                 }
//             }else {
//                 oInput0.onblur = function () {
//                     oZsaArr[0].id = 'chenggong';
//                     chenggong.innerHTML = '';
//                 }
//             }

//         }
//     })(i)
// }
