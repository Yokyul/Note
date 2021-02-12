

// 实例、 工具

// 实例： 由一个构造函数构造出来的就是实例
// 工具： 拿过来就可以用的 


// 使用立即执行函数，封闭作用域，使外部无法使用内部变量
(function () {
    // 1. 存储轮播图数据的构造函数
    function Slider(options, wrap) {
        // 动画类型
        this.animateType = options.animateType || 'fade';
        // 自动轮播的状态  默认为自动轮播
        this.isAutoChange = options.isAutoChange === undefined ? true : options.isAutoChange;
        // 轮播内容列表
        this.domList = options.domList || [];
        // 左右按钮显示状态
        this.showChangeBtn = options.showChangeBtn || 'always';
        // 小圆点按钮显示状态
        this.showSpotBtn = options.showSpotBtn === undefined ? true : options.showSpotBtn;
        // 小圆点的位置
        this.spotPosition = options.spotPosition || "left";

        // 包裹轮播图的页面的区域， wrap就是调用扩展方法swiper的元素，是最外层的包裹层。
        this.wrap = wrap;
        // 轮播图的大小， 兼容用户没有传值。
        this.width = options.width || $(wrap).width();
        this.height = options.height || $(wrap).height();

        // 轮播内容长度
        this.len = this.domList.length;
        // 当前展示的轮播内容索引值
        this.nowIndex = options.nowIndex || 0;

        // 加锁  当前是否有动画正在进行中   true代表有   false代表没有
        this.lock = false;
        // 自动轮播的定时器
        this.timer = null;
        // 自动轮播的时间
        this.autoTime = options.autoTime || 2000;
    }

    // 2. 创建轮播图结构
    Slider.prototype.createElement = function () {
        var swiperWrapper = $('<div class="my-swiper"></div>');
        var imgDomList = $('<ul class="my-swiper-list"></ul>');
        var leftBtn = $('<div class="my-swiper-lBtn my-swiper-btn">&lt;</div>');
        var rightBtn = $('<div class="my-swiper-rBtn my-swiper-btn">&gt;</div>');
        var spotsBtn = $('<div class="my-swiper-spots"></div>');
        for (var i = 0; i < this.domList.length; i++) {
            // 包裹着轮播内容的结构  方便书写样式
            var oLi = $('<li class="my-swiper-item"></li>');
            // this.domList[i] 代表当前轮播内容信息 
            oLi.append($(this.domList[i])).appendTo(imgDomList);
            spotsBtn.append('<span></span>');
        }
        // 如果当前轮播效果为从左到右的轮播  那么在最后插入一个轮播区域  这个轮播区域的内容和第一个轮播区域的内容相同
        if (this.animateType == 'animation') {
            $('<li class="my-swiper-item"></li>')
                .append($(this.domList[0]).clone())
                .appendTo(imgDomList);
        }
        swiperWrapper
            .append(imgDomList)
            .append(leftBtn)
            .append(rightBtn)
            .append(spotsBtn)
            .appendTo(this.wrap);
    }

    // 3. 设置样式
    Slider.prototype.initStyle = function () {
        $('.my-swiper', this.wrap)
            .css({
                width: this.width,
                height: this.height
            })
            .find('.my-swiper-item')
            .css({
                width: this.width,
                height: this.height
            })
            .end()
            .find('.my-swiper-spots')
            .css({
                textAlign: this.spotPosition                // 设置小圆点的显示位置
            })
            .find('span')
            .eq(this.nowIndex)
            .addClass('active')
        // 3.1 设置动画类型
        if (this.animateType == 'animation') {
            $('.my-swiper', this.wrap)
                .find('.my-swiper-list')
                .css({
                    width: this.width * (this.len + 1),
                    height: this.height,
                    position: 'absolute',
                    left: -(this.width * this.nowIndex)     // 根据传入的索引值，显示第一次展示的轮播图片
                })
                .find('.my-swiper-item')
                .css({
                    float: 'left'
                })
        } else if (this.animateType == 'fade') {
            $('.my-swiper', this.wrap)
                .find('.my-swiper-list')
                .css({
                    width: this.width,
                    height: this.height,
                    position: 'relative'
                })
                .find('.my-swiper-item')
                .css({
                    position: 'absolute'
                })
                .hide()                                     // 根据传入的索引值，显示第一次展示的轮播图片
                .eq(this.nowIndex)
                .show();
        }
        // 3.2 设置小圆点的显示情况
        if (!this.showSpotBtn) {
            $(".my-swiper", this.wrap)
                .find(".my-swiper-spots")
                .hide();
        }
        // 3.3 设置左右按钮的显示情况
        if (this.showChangeBtn === "hide") {
            $(".my-swiper", this.wrap)
                .find(".my-swiper-btn")
                .hide();
        } else if (this.showChangeBtn === "hover") {
            var self = this;                                                // 解决this指向问题
            $(".my-swiper", self.wrap)
                .find(".my-swiper-btn")
                .hide();                                                    // 一开始轮播图不显示按钮
            $(".my-swiper", this.wrap).hover(
                function () {
                    $(".my-swiper", self.wrap)
                        .find(".my-swiper-btn")
                        .show();                                            // 鼠标移入显示
                },
                function () {
                    $(".my-swiper", self.wrap)
                        .find(".my-swiper-btn")
                        .hide();                                            // 鼠标移出隐藏
                }
            );
        } else {
            $(".my-swiper", self.wrap)
                .find(".my-swiper-btn")
                .show();
        }
    };

    // 4. 设置行为
    Slider.prototype.bindEvent = function () {
        var self = this;
        $(".my-swiper-lBtn", this.wrap).click(function () {
            if (self.lock) {                                 // 加锁
                return false;
            }
            self.lock = true;
            if (self.nowIndex === 0) {
                self.nowIndex = self.len - 1;               // 切换到最后一张
                if (self.animateType === "animation") {
                    $(".my-swiper-list", self.wrap).css({
                        left: -self.width * self.len,       // 切换到最后一张
                    });
                }
            } else {
                self.nowIndex--;
            }
            self.change();
        });
        $(".my-swiper-rBtn", this.wrap).click(function () {
            if (self.lock) {                                // 加锁
                return false;
            }
            self.lock = true;
            if (self.animateType === "fade") {
                if (self.nowIndex === self.len - 1) {
                    self.nowIndex = 0;                      // 切换到第一张
                } else {
                    self.nowIndex++;
                }
            } else if (self.animateType === "animation") {
                // 如果是从左到右的轮播  那么判断当前是不是最后一张图片  如果是的话那么瞬间移动到前面第一张图片的位置  之后正常轮播
                if (self.nowIndex === self.len) {
                    $(".my-swiper-list", self.wrap).css({
                        left: 0,                           // 切换到第一张
                    });
                    self.nowIndex = 0;
                }
                self.nowIndex++;
            }
            self.change();
        });
        $(".my-swiper-spots", this.wrap).on("mouseenter", "span", function () {
            if (self.lock) {                                // 加锁
                return false;
            }
            self.lock = true;
            self.nowIndex = $(this).index();                // 使用.index()方法，获取索引值 
            self.change();                                  // 根据索引切换图片
        });
        $(".my-swiper", this.wrap).mouseenter(function () { // 设置鼠标移入暂停轮播，移出后又正常轮播
            clearInterval(self.timer)
        }).mouseleave(function () {
            if (self.isAutoChange) {
                self.autoChange();
            }
        })
    };

    // 5. 切换样式
    Slider.prototype.change = function () {
        // 5.1 切换图片
        var self = this;
        if (this.animateType === "animation") {
            $(".my-swiper-list", this.wrap).animate(            // 自定义动画（轮播）
                {
                    left: -this.width * this.nowIndex,
                },
                function () {
                    self.lock = false;                          // 解锁
                }
            );
        } else {
            $(".my-swiper-list", this.wrap)
                .find(".my-swiper-item")
                .fadeOut()                                      // 淡入淡出
                .eq(this.nowIndex)
                .fadeIn(function () {                           // 解锁
                    self.lock = false;
                });
        }
        // 5.2 切换小圆点
        $(".my-swiper", this.wrap)
            .find(".my-swiper-spots > span")
            .removeClass("active")
            .eq(this.nowIndex % this.len)                       // 轮播的话图片多一张，当是最后一张时，取余正好为0
            .addClass("active");
    };

    // 6. 自动轮播
    Slider.prototype.autoChange = function () {
        var self = this;
        this.timer = setInterval(function () {                  // 定时器中this指向window
            $(".my-swiper-rBtn", self.wrap).trigger("click");
        }, this.autoTime);
    };


    $.fn.extend({
        swiper: function (options) {
            var obj = new Slider(options, this);
            obj.createElement();
            obj.initStyle();
            obj.bindEvent();
            if (obj.isAutoChange) {
                obj.autoChange();
            }
        },
    });
}())