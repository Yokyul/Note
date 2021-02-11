	//插件封装 可维护 复用 交互性
	//参数 当前插件的 作用 效果 
	// {
	// 	isBack:true, // 可选属性，控制是否返回顶部
	// 	scrollTop:0,//可选属性 滚动条高度为多少时出现
	// 	position:"left",//可选属性 控制当前按钮在内容区域的位置
	// 	width:1000,//可选属性 当前网页内容区域的宽度
	// 	offset:0,//可选属性 当前距离内容的距离
	// 	speed:800,//可选属性 滚动速度
	// 	ifShow:true//默认是否显示
	// }
(function($){
	//
	$.fn.extend({
		"backBtn":function(options){
			var obj={
				isBack:true,
				scrollTop:0,
				position:"left",
				width:1000,
				offset:0,
				speed:800,
				ifShow:false,
				bottom:100
			}//默认值 如果用户不传 就按照默认值得属性来走
			var ops=$.extend(obj,options)//对象的比较融合 第二个对象中替换第一个 如果相同的属性
			//第二个替换第一个 不相同 全部加上
			var $win=$(window),$dom=$(this)
			var opr={ 
				//1.获取想要的值 2.设置想要的值 3.实现想要的功能
				getLeft:function(){
					var l//距离
					var ww=$win.width() //表示当前窗口的宽度
					var dw=$dom.outerWidth()//获取到当前元素的宽度
					if(ops.position=="left"){
						l=(ww-ops.width)/2-dw-ops.offset
					}else if(ops.position=="right"){
						//l= 空白区域+ops.width+ops.offset
						l=(ww-ops.width)/2+ops.width+ops.offset
					}
					return l
				},
				getTop:function(){
					var t
					var wh=$win.height() //表示当前窗口的高度
					var dh=$dom.outerHeight()//获取到当前元素的高度
					t=wh-dh-ops.bottom
					return t
				},
				setPosition:function(){
					var L=this.getLeft()
					var T=this.getTop()
					$dom.css({
						left:L+"px",
						top:T+"px"
					})
				},
				init:function(){//插件的初始化
					this.setPosition()
					$win.scroll(function(){
						if($win.scrollTop()>ops.scrollTop){
							
							$dom.show()
						}else{
							$dom.hide()
						}
					})
					$win.resize(function(){
						opr.setPosition()
					})
					if(ops.isBack){
						$dom.on("click",function(){
							$("body,html").animate({
								scrollTop:0
							},ops.speed)
						})
					}
					
					if(ops.ifShow){
						$dom.show()
					}else{
						$dom.hide()
					}

				}
			}
			opr.init()
			return $dom
		}
	})//.html()
})(jQuery)



$(function(){
	//面向过程 面向对象  插件封装
	//javascript权威指南 犀牛书
	$(".next").click(function(){
		// console.log(1)
		//每点击一次next 让ul 向左侧移动 1002px
		// index==2?index=0:index++
		var ul=$(".hot ul")
		if(!ul.is(":animated")){
			ul.animate({
				left:"-1002px"
			},800,function(){
				//将移走的第一个li放入到 ul的最后面
				ul.find("li").eq(0).appendTo($(".hot ul"))
				//再将原本已经移动过的Ul 还原，因为需要显示第一个li
				ul.css("left",0)
			})
		}
		
	})
	//点击前一张按钮时
	$(".prev").click(function(){
		var ul=$(".hot ul")
		//先将原本是最后的的li放到首位
		//判断 当前这个ul 是否在执行动画
		//element.is(":animated")
		//不在执行动画时，
		// console.log(ul.is(":animated"))
		if(!ul.is(":animated")){
			ul.find("li").last().prependTo(ul)
			//将放到首位的li 藏到外面
			ul.css("left","-1002px")
			//利用动画的方式移动进来
			ul.animate({
				left:0
			},800)
		}
		
	})
	// var t=setInterval(function(){
	// 	var ul=$(".hot ul")
	// 	ul.animate({
	// 		left:"-1002px"
	// 	},800,function(){
	// 		//将移走的第一个li放入到 ul的最后面
	// 		ul.find("li").eq(0).appendTo($(".hot ul"))
	// 		//再将原本已经移动过的Ul 还原，因为需要显示第一个li
	// 		ul.css("left",0)
	// 	})
	// },2000)
	// $(".slide-box").mouseover(function(){
	// 	clearInterval(t)
	// })
	// $(".slide-box").mouseout(function(){
	// 	t=setInterval(function(){
	// 	var ul=$(".hot ul")
	// 	ul.animate({
	// 		left:"-1002px"
	// 	},800,function(){
	// 		//将移走的第一个li放入到 ul的最后面
	// 		ul.find("li").eq(0).appendTo($(".hot ul"))
	// 		//再将原本已经移动过的Ul 还原，因为需要显示第一个li
	// 		ul.css("left",0)
	// 	})
	// },2000)
	// })

	//发现json 请求
	var indexNum=0;//统计当前的请求次数
	$(".comMore").click(function(){
		var self=$(this);
		self.html("正在加载中").removeClass("cl").addClass("loading");
		$.ajax({
			type:"post",
			url:"json/json.js",
			dataType:"json",
			success:function(data){
				console.log(data)
				var data1=data[indexNum]//当前需要遍历的数组
				var param=""
				for(var n=0;n<data1.length;n++){
					// data1[n].img //图片地址
					// data1[n].text//
					// data1[n].price
					param+='<li><img src="'+data1[n].img+'" width="222" height="130"><div class="info"><p class="name">'+data1[n].text+'</p><div class="fix"><span class="left price">'+data1[n].price+'</span><p class="right"> <span class="xin">3</span><span class="look">3</span></p></div></div></li>'

				}
				self.parent().prev().append(param)
				indexNum++
				self.html("点击加载更多").removeClass("loading").addClass("cl");
				if(indexNum>=data.length){
					self.parent().html("<span class='no-more'>没有更多啦</span>")
				}
			}	

		})
	})
	//返回顶部按钮
	// $(window).scroll(function(){
	// 	// console.log($(window).scrollTop())
	// 	if($(window).scrollTop()>100){//当滚动距离大于100时
	// 		$("#backTop").show()
	// 	}else{
	// 		$("#backTop").hide()
	// 	}
	// })
	// //当点击返回顶部按钮时，返回到当前的最顶端
	// $("#backTop").click(function(){
	// 	$("html,body").animate({
	// 		scrollTop:0
	// 	},800)
	// })
	
	$("#backTop").backBtn({
		isBack:true,
		scrollTop:100,
		position:"right",
		offset:100,
		speed:500
	})
})