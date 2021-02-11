$(function(){
	//案例分析：当滚动条滚动到一定位置时，去请求不同的数据(四个选项卡) 每个选项卡中
	//对应的不同的数据
	//如果由于网络问题，比方 网速较慢 那么可能会出现 前一次的加载还没有完成
	//就出现了 另外一次加载。所以说咱们需要避免这种问题
	//当滚动条滚动到一定位置时 瀑布流通常是 网页的最底部 懒加载 是对应位置 footer
	//区域时
	//网页的最底部
	var load=false;//判断当前是否可以请求数据 当他为true时 不可以 false可以
	var indexNums=[0,0,0,0]; //四个div不同的请求次数
	$(window).scroll(function(){
		//$(window).scrollTop()=网页的高度-footer的高度-当前屏幕的高度
		if (load) return
		var dh=$("body").height();//当前网页的高度 2000px
		var wh=$(this).height();//当前窗口的高度
		var fh=$(".foot").height()
		if($(window).scrollTop()>=dh-wh-fh){
			load=true
			// console.log("请求数据")
			//四个选项卡需要请求 四个 api接口
			//data.js sq.js sy.js js.js
			//判断当前是哪个选项卡被选中
			var index=$(".tabBox .show").index();
			var url
			switch(index){
				case 0:url="json/data.js"
				break
				case 1:url="json/sq.js"
				break
				case 2:url="json/sy.js"
				break
				case 3:url="json/js.js"
				break
			}
			$.ajax({
			type:"post",
			url:url,
			dataType:"json",
			success:function(data){
				 console.log(data)
				
				if(indexNums[index]>=data.length){//如果当前页的请求次数 大于了 总数据
					//的长度 那么就需要再次赋值了 但是 load需要开启
					load=false
					return
				}
				var data1=data[indexNums[index]]//当前需要遍历的数组
				var param=""
				for(var n=0;n<data1.length;n++){
					// data1[n].img //图片地址
					// data1[n].text//
					// data1[n].price
					param+='<a class="con"><img src="'+data1[n].img+'" width="222" height="130"><h2 class="name">'+data1[n].text+'</h2></a>'

				}
				$(".tabBox .show").append(param)
				indexNums[index]++
				
				if(indexNums[index]>=data.length){
					$(".tabBox .show").append("<span class='no-more' style='clear:both;display:block'>没有更多啦</span>")
				}
				load=false
			}	

		})
			
		}
	})
})