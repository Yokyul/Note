$(function(){
	//tab选项卡 点击指令li时，让对应的div进行显示
	//找到事件源
	// $(".tabNav li").on("click",function(){
	// 	$(this).addClass("active").siblings().removeClass("active")
	// 	var index=$(this).index() //获取当前点击li的索引值
	// 	$(".tabBox .box").eq(index).addClass("show").siblings().removeClass("show")
	// })
	//选项卡的导航容器 类名必须为 tabNav
	//每一个显示区域的div 类名必须为box
	$.fn.extend({
		"tab":function(ops){
			var obj={
				evenType:"click",
				liCurClass:"active",
				divCurClass:"show"	
			}
			var opt=$.extend(obj,ops)
			if($(".tabNav li").length!=$(".tabBox .box").length) throw ""
			$(".tabNav li").on(opt.evenType,function(){
				$(this).addClass(opt.liCurClass).siblings().removeClass(opt.liCurClass)
				var index=$(this).index() //获取当前点击li的索引值
				$(".tabBox .box").eq(index).addClass(opt.divCurClass).siblings().removeClass(opt.divCurClass)
			})
		}
	})
	$(".main").tab({evenType:"mouseover"})
	// 
})