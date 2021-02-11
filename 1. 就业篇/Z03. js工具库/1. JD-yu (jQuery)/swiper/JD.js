$.fn.extend({
    swiper: function (options) {
        var obj = new Slider(options, this);
        obj.createElement();
        obj.initStyle();
    }
})

function Slider(options, wrap) {
    this.animateType = options.animateType;
    this.isAutoChange = options.isAutoChange;
    this.domList = options.domList;
    this.showChangeBtn = options.showChangeBtn;
    this.showSpotBtn = options.showSpotBtn;
    this.width = options.width;
    this.height = options.height;
    this.wrap = wrap
    this.nowIndex = 0
}

Slider.prototype.createElement = function () {
    var swiperWrapper = $('<div class="my-swiper"></div>');
    var imgDomList = $('<ul class="my-swiper-list"></ul>')
    var leftBtn = $('<div class="my-swiper-lBtn">&lt;</div>');
    var rightBtn = $('<div class="my-swiper-rBtn">&gt;</div>');
    var spotBtn = $('<div class="my-swiper-spotBtn"><div>');
    for (var i = 0; i < this.domList.length; i++) {
        var oLi = $('<li class="my-swiper-item"></li>');
        oLi.append($(this.domList[i])).appendTo(imgDomList);
        spotBtn.append('<span></span>')
    }
    swiperWrapper.append(imgDomList)
        .append(leftBtn)
        .append(rightBtn)
        .append(spotBtn)
        .appendTo(this.wrap);
}


Slider.prototype.initStyle = function () {
    $('.my-swiper', this.wrap).css({
        width: this.width,
        height: this.height
    }).find('.my-swiper-item').css({
        width: this.width,
        height: this.height
    }).end().find('.my-swiper-spotBtn > span').eq(this.nowIndex).addClass('active')
}