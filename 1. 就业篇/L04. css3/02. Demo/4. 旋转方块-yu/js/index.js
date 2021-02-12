// box背景色
var boxBg = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#564545', '#607d8b', '#405d6b', '#9e9e9e', '#70737d', '#389fa0', '#38a05e', '#b3c981', '#76a803', '#fecf43', '#e2785f'];

// body背景色
var bodyBg = ['#F7E8ED', '#F2D9E6', '#ECC6DE', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#E0E1F5', '#F7E8ED', '#F2D9E6', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#DFD1F0', '#6161616'];

var style = document.getElementsByTagName('style')[0];
var boxs = Array.from(document.getElementsByClassName('box'));
var rot = ['rotateX(-180deg)','rotateY(-180deg)','rotateX(180deg)','rotateX(180deg)']
var content = document.getElementsByClassName('content')[0];

var str = ``;
for (i = 0; i < boxBg.length; i++) {
    str += `.box:nth-child(${i + 1}) div {
        background: ${boxBg[i]} url(./images/${i + 1}.png) center no-repeat;
    }`
}
style.innerHTML = str;
document.head.appendChild(style);


boxs.forEach(function (box) {
    box.onmouseenter = function (e) {
        var dir = getDir(this,e);
        this.style.transform = `translateZ(150px) ${rot[dir]}`;
        document.body.style.background = bodyBg[Math.round(Math.random() * (bodyBg.length - 1))]
    }
    box.onmouseleave = function () {
        this.style.transform = '';
    }
})

function getDir(box, e) {
    var l = box.getBoundingClientRect().left
    var t = box.getBoundingClientRect().top
    var w = box.getBoundingClientRect().width;
    var h = box.getBoundingClientRect().height;

    var y = e.clientY - t - h / 2;
    var x = e.clientX - l - w / 2;
    var deg = Math.atan2(y , x) / (Math.PI / 180);
    var d = (Math.round((deg + 180) / 90) + 3) % 4;
    return d;
}

document.onmousemove = function(ev){
    var x = (0.5 - ev.clientY / window.innerHeight) * 15;	//-7.5-7.5
	var y = (ev.clientX / window.innerWidth - 0.5) * 15;

	content.style.transform = `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`;
}
