$(function(){
	calculatePx();
	
	//
	$(".one-level-ul li").click(function(){
		var two = $(this).attr("data-two");
		if(two==0){
			var tabsArr=[];
			var url = $(this).attr("data-url");
			var text = $(this).text();
			$(".breadcrumb-nav .tabs-list").each(function(index,item){
				tabsArr.push($(item).find("p").text());
			});
			if(tabsArr.indexOf(text)==-1){
				tabsArr.push(text);
				$(".breadcrumb-nav .tabs-list li.on").removeClass("on");
				$(".breadcrumb-nav .tabs-list ul").append(
							"<li class='on' data-url = '"+url+"' class='on'><p>"+text+"</p><img src='../images/closetab.png'></li>"
							);
				$(".tabs-list ul").width(($(".tabs-list ul li").outerWidth()+26)*$(".tabs-list ul li").length);
			}else{
				$(".breadcrumb-nav .tabs-list li.on").eq(tabsArr.indexOf(text)).addClass("on");
			}
			$("iframe").attr("src",url);
		}
	});
	$(".page-nav").hover(function(){},function(){$(".two-level,.three-level").hide();});
	//展示二级测单
	$(".one-level ul li").hover(
		function(){
			var two = $(this).attr("data-two");
			var index = $(this).index();
			$(".three-level").hide();
			if(two!=0){
				$(".two-level").show();
				$(".two-level .level-con-warp").eq(index).show().siblings().hide();
			}else{
				$(".two-level").hide();
			}
		},
		function(){
			
		}
	);
	
	// 展示三级菜单
	$(".two-level .level-con-warp ul li").hover(
		function(){
			var three = $(this).attr("data-three");
			var index  = $(this).parent().parent().index();
			if(three!=0){
				$(".three-level").show();
				$("#"+three).show().siblings().hide();
			}else{
				$(".three-level").hide();
			}
			
		},
		function(){
			$(this).removeClass("on");
		}
	);
	$(".three-level ul li").hover(
		function(){
			
		},function(){
			
		});
	//控制隐藏于显示
	
	//菜单点击事件
		//二级菜单点击事件level-con-warp
		$(document).on("click",".two-level ul li",function(){
			var tabsArr=[];
			var url = $(this).attr("data-url");
			var text = $(this).text();
			$(".breadcrumb-nav .tabs-list").each(function(index,item){
				tabsArr.push($(item).find("p").text());
			});
			if($(this).attr("data-three")==0){
				if(tabsArr.indexOf(text)==-1){
					tabsArr.push(text);
					$(".breadcrumb-nav .tabs-list li.on").removeClass("on");
					$(".breadcrumb-nav .tabs-list ul").append(
								"<li class='on' data-url = '"+url+"' class='on'><p>"+text+"</p><img src='../images/closetab.png'></li>"
								);
					$(".tabs-list ul").width(($(".tabs-list ul li").outerWidth()+26)*$(".tabs-list ul li").length);
				}else{
					$(".breadcrumb-nav .tabs-list li.on").eq(tabsArr.indexOf(text)).addClass("on");
				}
			}
			$("iframe").attr("src",url);
		});
		//三级菜单点击事件
		$(document).on("click",".three-level ul li",function(){
			var tabsArr=[];
			var url = $(this).attr("data-url");
			var text = $(this).text();
			$(".breadcrumb-nav .tabs-list").each(function(index,item){
				tabsArr.push($(item).find("p").text());
			});
			if(tabsArr.indexOf(text)==-1){
				tabsArr.push(text);
				$(".breadcrumb-nav .tabs-list li.on").removeClass("on");
				$(".breadcrumb-nav .tabs-list ul").append(
							"<li class='on' data-url = '"+url+"' class='on'><p>"+text+"</p><img src='../images/closetab.png'></li>"
							);
				$(".tabs-list ul").width(($(".tabs-list ul li").outerWidth()+26)*$(".tabs-list ul li").length);
			}else{
				$(".breadcrumb-nav .tabs-list li.on").eq(tabsArr.indexOf(text)).addClass("on");
			}
			$("iframe").attr("src",url);
		});
	//面包屑导航点击事件homePage
	$(".home-tab").click(function(){
		$("iframe").attr("src","首页/home-iframe.html");
		calculatePx();
	});
	$(document).on("click",".breadcrumb-nav ul li",function(){
		if(!$(this).hasClass("on")){
			$(this).addClass("on").siblings().removeClass("on");
			$("iframe").attr("src",$(this).attr("data-url"));
		}
	});
	//设置
	$(".header .adminer").hover(
		function(){
			$(this).find(".adminer-con").show().stop().animate({
				opacity:1,
				top:52
			},300)
		},
		function(){
			$(this).find(".adminer-con").stop().animate({
				opacity:0,
				top:40
			},300,function(){
				$(".adminer-con").hide();
			})
		}
	);
	// 关闭操作
	$(".breadcrumb-nav .close-btn").hover(
		function(){
			$(this).find(".close-btn-warp").show().stop().animate({
				opacity:1,
				top:28
			},300)
		},
		function(){
			$(this).find(".close-btn-warp").stop().animate({
				opacity:0,
				top:16
			},300,function(){
				$(".breadcrumb-nav .close-btn-warp").hide();
			})
		}
	);
	$(document).on("click",".breadcrumb-nav ul li img",function(){
		var index = $(this).parent().index();
		if(index==0){
			$("iframe").attr("src","首页/home-iframe.html");
		}else{
			$("iframe").attr("src",$(this).parent().parent().find("li").eq(index-1).attr("data-url"));
			$(this).parent().parent().find("li").eq(index-1).addClass("on").siblings().removeClass("on");
		}
		$(this).parent().remove();
	});
	//
	$(".iframe-btn .iframe-btn-list").click(function(){
		$("iframe").attr("src",$(this).attr("data-url"));
	});
	
	//
	$(".closePop").click(function(){
		$(".page-layer").hide();
		$('iframe',window.parent.document).css("z-index","9");
	});
});
$(window).resize(function(){
	calculatePx();
});
var calculatePx = function(){
	var pageH = $(window).height();
	/*alert(pageH);*/
	var pageW = $(window).width();
	
	
	$(".login-page").width(pageW);
	/*$(".login-page").height(pageH);*/
	$(".login-page").height(pageH);
	$(".iframe-content,#map").width(pageW-260);
	$(".iframe-content,#map").height(pageH-46-28-46-20);
	$(".search-warp").width($(".iframe-content").width());
	
	$(".zhailei").width($(".layui-tab-content").width())
	
	
	$(".page-warp").height(pageH-$(".header").height());
	$(".page-con").width(pageW-$(".page-nav").width());
	$(".nav-body").height($(".page-warp").height()-$(".breadcrumb-nav").height()-28);
	$(".nav-body").width($(".page-con").width()-20);
	
	$(".module-page .page-warp-con").css({"margin-left":-$(".module-page .page-warp-con").width()/2,"margin-top":-$(".module-page .page-warp-con").height()/2});
	$(".page-warp-con-left-con,.page-warp-con-right-con,.page-warp-con-right-con a").height(($(".page-warp-con").height()-12)/2);
	$(".page-warp-con-right-con-top ul li,.page-warp-con-right-con-top ul li a").width(($(".page-warp-con-right-con-top ul").width()-21*3)/4);
	$(".page-warp-con-right-con-bottom ul li").width(($(".page-warp-con-right-con-top ul").width()-21*3)/4);
	$(".page-warp-con-left-top ul li").height(($(".page-warp-con").height()-12)/2);
	$(".page-warp-con-left-top ul li").width($(".page-warp-con-left").width());
	$(".page-warp-con-left-top ul ").width($(".page-warp-con-left").width()*$(".page-warp-con-left-top ul li").length);
	
	$(".home-page .top-con .ul .li").width(($(".home-page .top-con .ul").width()-30)/4);
	$(".home-page .center-con .ul .li").width(($(".home-page .top-con .ul").width()-10)/2);
	$(".home-page .bottom-con .ul .li").width(($(".home-page .top-con .ul").width()-20)/3);
	$(".home-page .ul .li").each(function(index,item){
		$(item).find(".li-content").height($(item).parent().height()-$(".home-page .li-header").height());
	});
	$(".breadcrumb-nav .tab-warp").width($(".breadcrumb-nav").width()-$(".breadcrumb-nav .right").width()-30);
	$(".breadcrumb-nav .tabs-list").width($(".breadcrumb-nav").width()-$(".breadcrumb-nav .right").width()-30-72-42-21-15-50);
	$(".road-map-page #map").height($(".iframe-content").height()-20);
	
	//搜索区域位置尺寸
	$(".table-page .search-warp form").width(pageW-$(".search-btn-warp").width());
	if(pageW>992){
		$(".table-page .search-warp form").width($(".search-warp").width()-$(".search-btn-warp").width());
		$(".table-page .search-warp .search-btn-warp button").css({"margin-top":($(".table-page .search-warp").outerHeight()-$(".table-page .search-warp .search-btn-warp button").height())/2-2,"margin-bottom":0});
		$(".table-page .search-warp .search-btn-warp").css({"text-align":"center","padding-right":0});
		$(".table-page .search-warp .search-btn-warp").css({"margin-top":"0","margin-right":0});
		$(".search-warp").width($(".iframe-content").width());
	}else{
		$(".table-page .search-warp form").width($(".search-warp").width()-40);
		$(".table-page .search-warp .search-btn-warp button").css({"margin-top":0,"margin-bottom":10});
		$(".table-page .search-warp .search-btn-warp").css({"margin-top":10,"text-align":"right","margin-right":20});
		$(".search-warp").width($(".iframe-content").width()-20);
	}
	
	var index = 0;
	setInterval(function(){
		index++;
		if(index==$(".page-warp-con-left-top ul li").length){
			index = 0;
		};
		$(".page-warp-con-left-top ul").stop().animate({
			marginLeft:-$(".page-warp-con-left-top ul li").width()*index
		},500);
		$(".page-warp-con-left-top-footer div span").eq(index).addClass("on").siblings().removeClass("on");
		$(".page-warp-con-left-top-footer p").text($(".page-warp-con-left-top-footer div span").eq(index).attr("data-name"));
	},3000)
	
	//面包屑导航
	$(".tabs-list ul").width(($(".tabs-list ul li").outerWidth()+26)*$(".tabs-list ul li").length);
	var index=0;
	$(".tab-btn").click(function(e){
		var W = $(".tabs-list").width();
		var num = $(".tabs-list ul li").length;
		if(($(".tabs-list ul li").eq(num-1).position().left)>W){
			if((($(".tabs-list ul li").outerWidth()+26)*$(".tabs-list ul li").length)>W){
				if($(this).hasClass("right-btn")){
					index++;
					$(".tabs-list ul").stop().animate({
						marginLeft:-150*index
					},500);
				}
			}
		}
		if($(".tabs-list ul li").eq(0).position().left!=150){
			if($(this).hasClass("left-btn")){
				index--;
				$(".tabs-list ul").stop().animate({
					marginLeft:-150*index
				},500);
			}
		}
	});
	
	$(".nl-fuild-warp").each(function(index,item){
		$(item).find(".fuild-warp-fuild").width($(item).width()-$(item).find(".fuild-warp-fixed").width());
		$(item).find(".fuild-warp-fuild-search-warp-content").width($(item).find(".fuild-warp-fuild").width()-$(item).find(".fuild-warp-fuild-search-warp-btn").width()-60);
		$(item).find(".fuild-warp-fuild-search-result-warp").height($(item).find(".fuild-warp-fuild").height()-$(item).find(".fuild-warp-fuild-search-warp").outerHeight(true));
	});
	
	$(".iframe-two-level").height($(".iframe-content").height()-$(".step-tab").outerHeight(true)-20);
};