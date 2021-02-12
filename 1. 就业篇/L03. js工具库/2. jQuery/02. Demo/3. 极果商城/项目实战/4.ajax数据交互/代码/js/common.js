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
})