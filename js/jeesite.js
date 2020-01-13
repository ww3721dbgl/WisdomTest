/*!
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 * 
 * 通用公共方法
 * @author ThinkGem
 * @version 2014-4-29
 */
$(document).ready(function() {
	try{
		// 链接去掉虚框
		$("a").bind("focus",function() {
			if(this.blur) {this.blur()};
		});
		//所有下拉框使用select2
		loadSelect2()
		$("a[tipsTitle]").mouseover(function (){  
			layer.closeAll('tips');
			layer.tips($(this).attr('tipsTitle'), $(this), {
			  tips: [3, '#3595CC']
			});
	     }).mouseout(function (){  
	     	layer.closeAll('tips');
	     });  
	}catch(e){
		// blank
	}
	
	subStringTdContent();
	$(window).resize(function () {   
		//当浏览器大小变化时,刷新下拉框插件
		if(typeof $('select').select2 == 'function'){
			loadSelect2()
		}
	});
	//兼容IE10以下maxlength属性
	maxLengthLoad('textarea[maxlength]');
	maxLengthLoad('input[maxlength]');
});
//所有下拉框使用select2
function loadSelect2(){
	$("select").each(function(){
		$(this).select2({language:"zh-CN"});
		if($(this).hasClass('js-example-basic-multiple')){
			var valStr = $(this).prev().val();
			if(!checkNull(valStr)){
				var val=valStr.split(',');
				var vals = [];
				$.each(val,function(){
					vals.push(this);
				});
				$(this).val(vals).trigger('change');
			}
		}
	});
}
/**
 * 删除空格
 * @param str
 * @returns
 */
function removeAllSpace(str) {
	return $.trim(str);
}
// 引入js和css文件
function include(id, path, file){
	if (document.getElementById(id)==null){
        var files = typeof file == "string" ? [file] : file;
        for (var i = 0; i < files.length; i++){
            var name = files[i].replace(/^\s|\s$/g, "");
            var att = name.split('.');
            var ext = att[att.length - 1].toLowerCase();
            var isCSS = ext == "css";
            var tag = isCSS ? "link" : "script";
            var attr = isCSS ? " type='text/css' rel='stylesheet' " : " type='text/javascript' ";
            var link = (isCSS ? "href" : "src") + "='" + path + name + "'";
            document.write("<" + tag + (i==0?" id="+id:"") + attr + link + "></" + tag + ">");
        }
	}
}

// 获取URL地址参数
function getQueryString(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if (!url || url == ""){
	    url = window.location.search;
    }else{	
    	url = url.substring(url.indexOf("?"));
    }
    r = url.substr(1).match(reg)
    if (r != null) return unescape(r[2]); return null;
}

//获取字典标签
function getDictLabel(data, value, defaultValue){
	for (var i=0; i<data.length; i++){
		var row = data[i];
		if (row.value == value){
			return row.label;
		}
	}
	return defaultValue;
}

// 打开一个窗体
function windowOpen(url, name, width, height){
	var top=parseInt((window.screen.height-height)/2,10),left=parseInt((window.screen.width-width)/2,10),
		options="location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,"+
		"resizable=yes,scrollbars=yes,"+"width="+width+",height="+height+",top="+top+",left="+left;
	window.open(url ,name , options);
}

// 恢复提示框显示
function resetTip(){
	top.$.jBox.tip.mess = null;
}

// 关闭提示框
function closeTip(){
	top.$.jBox.closeTip();
}

//显示提示框
function showTip(mess, type, timeout, lazytime){
	resetTip();
	setTimeout(function(){
		top.$.jBox.tip(mess, (type == undefined || type == '' ? 'info' : type), {opacity:0, 
			timeout:  timeout == undefined ? 2000 : timeout});
	}, lazytime == undefined ? 500 : lazytime);
}

// 显示加载框
function loading(mess){
	if (mess == undefined || mess == ""){
		mess = "正在提交，请稍等...";
	}
	resetTip();
	top.$.jBox.tip(mess,'loading',{opacity:0});
}

// 关闭提示框
function closeLoading(){
	// 恢复提示框显示
	resetTip();
	// 关闭提示框
	closeTip();
}

// 警告对话框
function alertx(mess, closed){
	top.$.jBox.info(mess, '提示', {closed:function(){
		if (typeof closed == 'function') {
			closed();
		}
	}});
	top.$('.jbox-body .jbox-icon').css('top','55px');
}

//确认对话框
function confirmx(mess, href, closed){
	top.layer.confirm(mess, {icon: 3, title:'系统提示'}, function(index){
		var searchFormParm = $("#searchForm").serialize(); 
	    //do something
		if (typeof href == 'function') {
			href();
		}else{
			resetTip(); //loading();
			location = href+"&searchFormParm="+encodeURIComponent(searchFormParm);
		}
	    top.layer.close(index);
	});
}
function confirmxOfAjax(mess, href, closed){
	var layerConfirm =top.layer.confirm(mess, {icon: 3, title:'系统提示'}, function(index){
	var searchFormParm = $("#searchForm").serialize(); 
    //do something
	if (typeof href == 'function') {
		href();
	}else{
		var loadLayer= top.layer.load(0);
		$.ajax({
			type : "post",
			url : href,
			data : {},
			success : function(data) {
				top.layer.close(loadLayer);
				if(isLoginPage(data)){
					var successAlertLayer= top.layer.alert('登录超时，请重新登录！', {icon: 2, title:'系统提示'}, function(index) {
	            		//返回登录页
						top.location = "${ctx}";
	            		//关闭弹出信息
						top.layer.close(layerConfirm);
	            		top.layer.close(successAlertLayer);
					});
				}else{
					if (data.code == 200) {
		            	//弹出信息框提示成功
		            	var successAlertLayer= top.layer.alert(data.msg, {icon: 1, title:'系统提示'}, function(index) {
		            		//点击确认信息后刷新列表页面
		            		sortOrRefresh();
		            		//关闭当前编辑页面的弹窗
		            		top.layer.close(layerConfirm);
		            		//关闭弹出信息
		            		top.layer.close(successAlertLayer);
						});
		            } else if (data.code == 500){
		            	top.layer.close(layerConfirm);
		            	top.layer.alert(data.msg, {icon: 5, title:'系统提示'});
		            }else{
		            	top.layer.close(layerConfirm);
		            	top.layer.alert(data.msg, {icon: 2, title:'系统提示'});
		            }
				}
			}
		});
	}
    top.layer.close(index);
});
//	top.$.jBox.confirm(mess,'系统提示',function(v,h,f){
//		if(v=='ok'){
//			if (typeof href == 'function') {
//				href();
//			}else{
//				resetTip(); //loading();
//				location = href;
//			}
//		}
//	},{buttonsFocus:1, closed:function(){
//		if (typeof closed == 'function') {
//			closed();
//		}
//	}});
//	top.$('.jbox-body .jbox-icon').css('top','55px');
	return false;
}


function confirmxScheduleOfAjax(mess, href,i,closed){
	var layerConfirm =top.layer.confirm(mess, {icon: 3, title:'系统提示'}, function(index){
    //do something
	if (typeof href == 'function') {
		href();
	}else{
		var loadLayer= top.layer.load(0);
		$.ajax({
			type : "post",
			url : href,
			data : {},
			success : function(data) {
				top.layer.close(loadLayer);
				if(isLoginPage(data)){
					var successAlertLayer= top.layer.alert('登录超时，请重新登录！', {icon: 2, title:'系统提示'}, function(index) {
	            		//返回登录页
						top.location = "${ctx}";
	            		//关闭弹出信息
						top.layer.close(layerConfirm);
	            		top.layer.close(successAlertLayer);
					});
				}else{
					if (data.code == 200) {
		            	//弹出信息框提示成功
		            	var successAlertLayer= top.layer.alert(data.msg, {icon: 1, title:'系统提示'}, function(index) {
		            		//点击确认信息后刷新列表页面
		            		refresh(i);
		            		//关闭当前编辑页面的弹窗
		            		top.layer.close(layerConfirm);
		            		//关闭弹出信息
		            		top.layer.close(successAlertLayer);
						});
		            } else if (data.code == 500){
		            	top.layer.close(layerConfirm);
		            	top.layer.alert(data.msg, {icon: 5, title:'系统提示'});
		            }else{
		            	top.layer.close(layerConfirm);
		            	top.layer.alert(data.msg, {icon: 2, title:'系统提示'});
		            }
				}
			}
		});
	}
    top.layer.close(index);
});
	return false;
}

// 提示输入对话框
function promptx(title, lable, href, closed){
	top.$.jBox("<div class='form-search' style='padding:20px;text-align:center;'>" + lable + "：<input type='text' id='txt' name='txt'/></div>", {
			title: title, submit: function (v, h, f){
	    if (f.txt == '') {
	        top.$.jBox.tip("请输入" + lable + "。", 'error');
	        return false;
	    }
		if (typeof href == 'function') {
			href();
		}else{
			resetTip(); //loading();
			location = href + encodeURIComponent(f.txt);
		}
	},closed:function(){
		if (typeof closed == 'function') {
			closed();
		}
	}});
	return false;
}

// 添加TAB页面
function addTabPage(title, url, closeable, $this, refresh){
	top.$.fn.jerichoTab.addTab({
        tabFirer: $this,
        title: title,
        closeable: closeable == undefined,
        data: {
            dataType: 'iframe',
            dataLink: url
        }
    }).loadData(refresh != undefined);
}

// cookie操作
function cookie(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}

// 数值前补零
function pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

// 转换为日期
function strToDate(date){
	return new Date(date.replace(/-/g,"/"));
}

// 日期加减
function addDate(date, dadd){  
	date = date.valueOf();
	date = date + dadd * 24 * 60 * 60 * 1000;
	return new Date(date);  
}

//截取字符串，区别汉字和英文
function abbr(name, maxLength){  
 if(!maxLength){  
     maxLength = 20;  
 }  
 if(name==null||name.length<1){  
     return "";  
 }  
 var w = 0;//字符串长度，一个汉字长度为2   
 var s = 0;//汉字个数   
 var p = false;//判断字符串当前循环的前一个字符是否为汉字   
 var b = false;//判断字符串当前循环的字符是否为汉字   
 var nameSub;  
 for (var i=0; i<name.length; i++) {  
    if(i>1 && b==false){  
         p = false;  
    }  
    if(i>1 && b==true){  
         p = true;  
    }  
    var c = name.charCodeAt(i);  
    //单字节加1   
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {  
         w++;  
         b = false;  
    }else {  
         w+=2;  
         s++;  
         b = true;  
    }  
    if(w>maxLength && i<=name.length-1){  
         if(b==true && p==true){  
             nameSub = name.substring(0,i-2)+"...";  
         }  
         if(b==false && p==false){  
             nameSub = name.substring(0,i-3)+"...";  
         }  
         if(b==true && p==false){  
             nameSub = name.substring(0,i-2)+"...";  
         }  
         if(p==true){  
             nameSub = name.substring(0,i-2)+"...";  
         }  
         break;  
    }  
 }  
 if(w<=maxLength){  
     return name;  
 }  
 return nameSub;  
}
function reset(){//重置，页码清零
	layer.load();
	$("#pageNo").val(0);
	$("#searchForm div select").val("");
	$("#searchForm div input[type='text']").val("");
	$("#searchForm div .form-control").val("");
	$("#searchForm #titleSettingsNames").val("");
	$("#searchForm").submit();
		return false;
	 }

function search(){//查询，页码清零
	$("#pageNo").val(0);
	$("#searchForm").submit();
		return false;
}
function sortOrRefresh(){//刷新或者排序，页码不清零
	
	$("#searchForm").submit();
		return false;
}
//打开对话框(添加修改)
function openDialog(title,url,width,height,target){
	top.layer.open({
	    type: 2,  
	    area: [width, height],
	    title: title,
        maxmin: true, //开启最大化最小化按钮
	    content: url ,
	    btn: ['确定', '关闭'],
	    yes: function(index, layero){
	    	var body = top.layer.getChildFrame('body', index);  
            var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();  
	         var inputForm = body.find('#inputForm');
	         $(inputForm).find('#searchFormParm').val($("#searchForm").serialize());
	         var top_iframe;
	         if(target){
	        	 top_iframe = target;//如果指定了iframe，则在改frame中跳转
	         }else{
//	        	 var topWindow =  window.top.document;
//	        	 var showDiv = $(topWindow).find('.curholder')[0];
//	        	 if(showDiv){
//	        		 var top_iframe_obj =  $(showDiv).find('iframe').get(0);
//		        	 top_iframe=$(top_iframe_obj).attr('name');
//	        	 }else{
//	        		 top_iframe='mainFrame';
//	        	 }
	        	 //top_iframe = $('.curholder:first-child').attr("name");//获取当前active的tab的iframe 
	        	 var topWindow =  window.top.document;
	        	 var showIFrame = $(topWindow).find('.J_iframe:visible')[0];
	        	 top_iframe = $(showIFrame).attr("name");//获取当前active的tab的iframe 
	         }
	         inputForm.attr("target",top_iframe);//表单提交成功后，从服务器返回的url在当前tab中展示
	         
	        if(iframeWin.contentWindow.doSubmit() ){
	        	 top.layer.close(index);//关闭对话框。
	        	  //setTimeout(function(){top.layer.close(index)}, 100);//延时0.1秒，对应360 7.1版本bug
	         }
		  },
		  cancel: function(index){ 
	       }
	}); 	
	
}

//打开对话框(添加修改)
function openDialogOfAjax(title,url,width,height,target){
	var dialogLayer= top.layer.open({
	    type: 2,  
	    area: [width, height],
	    title: title,
        maxmin: true, //开启最大化最小化按钮
	    content: [url, 'no'],
	    btn: ['确定', '关闭'],
	    yes: function(index, layero){
	    	var body = top.layer.getChildFrame('body', index);  
            var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();  
	         var inputForm = body.find('#inputForm');	//得到编辑页面的form
	         var formAction = $(inputForm).attr("action");//得到编辑页面的提交URL
	         //if(iframeWin.contentWindow.validateParm() ){//调用编辑新增页面的验证方法
	        	var saveLoadLayer= top.layer.load(0);//发送请求前，加载效果显示
	        	 $.ajax({
						url : formAction,
						type : 'POST',
						data : new FormData($(inputForm)[0]),
						async : true,
						cache : false,
						contentType : false,
						processData : false,
						success: function (data) {
							top.layer.close(saveLoadLayer);//发送请求前，加载效果关闭
							//判断返回的是否是登录页面的html(登录超时的情况下会返回)
							if(isLoginPage(data)){
								var successAlertLayer= top.layer.alert('登录超时，请重新登录！', {icon: 2, title:'系统提示'}, function(index) {
				            		//返回登录页
									top.location = "${ctx}";
				            		//关闭弹出信息
				            		top.layer.close(successAlertLayer);
								});
							}else{
								if (data.code == 200) {
					            	//弹出信息框提示成功
					            	var successAlertLayer= top.layer.alert(data.msg, {icon: 1, title:'系统提示'}, function(index) {
					            		//点击确认信息后刷新列表页面
					            		sortOrRefresh();
					            		//关闭当前编辑页面的弹窗
					            		top.layer.close(dialogLayer);
					            		//关闭弹出信息
					            		top.layer.close(successAlertLayer);
									});
					            } else if (data.code == 500){
					            	top.layer.alert(data.msg, {icon: 5, title:'系统提示'});
					            }else{
					            	top.layer.alert(data.msg, {icon: 2, title:'系统提示'});
					            }
							}
				            
				        }
					});
	         //}
		  },
		  cancel: function(index){ 
	       }
	}); 	
	
}

//打开对话框(添加修改)
function openScheduleDialogOfAjax(title,url,width,height,i,target){
	var dialogLayer= top.layer.open({
	    type: 2,  
	    area: [width, height],
	    title: title,
      maxmin: true, //开启最大化最小化按钮
	    content: [url, 'no'],
	    btn: ['确定', '关闭'],
	    yes: function(index, layero){
    	  var body = top.layer.getChildFrame('body', index);  
          var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();  
	         var inputForm = body.find('#inputForm');	//得到编辑页面的form
	         var formAction = $(inputForm).attr("action");//得到编辑页面的提交URL
	         if(iframeWin.contentWindow.validateParm() ){//调用编辑新增页面的验证方法
	        	var saveLoadLayer= top.layer.load(0);//发送请求前，加载效果显示
	        	 $.ajax({
						url : formAction,
						type : 'POST',
						data : new FormData($(inputForm)[0]),
						async : true,
						cache : false,
						contentType : false,
						processData : false,
						success: function (data) {
							top.layer.close(saveLoadLayer);//发送请求前，加载效果关闭
							//判断返回的是否是登录页面的html(登录超时的情况下会返回)
							if(isLoginPage(data)){
								var successAlertLayer= top.layer.alert('登录超时，请重新登录！', {icon: 2, title:'系统提示'}, function(index) {
				            		//返回登录页
									top.location = "${ctx}";
				            		//关闭弹出信息
				            		top.layer.close(successAlertLayer);
								});
							}else{
								if (data.code == 200) {
					            	//弹出信息框提示成功
					            	var successAlertLayer= top.layer.alert(data.msg, {icon: 1, title:'系统提示'}, function(index) {
					            		//点击确认信息后刷新列表页面
					            		refresh(i);
					            		//关闭当前编辑页面的弹窗
					            		top.layer.close(dialogLayer);
					            		//关闭弹出信息
					            		top.layer.close(successAlertLayer);
									});
					            } else if (data.code == 500){
					            	top.layer.alert(data.msg, {icon: 5, title:'系统提示'});
					            }else{
					            	top.layer.alert(data.msg, {icon: 2, title:'系统提示'});
					            }
							}
				            
				        }
					});
	         }
		  },
		  cancel: function(index){ 
	       }
	}); 	
	
}

function layerAjaxBtnClick(dialogLayer,index,layero,message){
	 var body = top.layer.getChildFrame('body', index);  
    var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();  
    var inputForm = body.find('#inputForm');	//得到编辑页面的form
    var formAction = $(inputForm).attr("action");//得到编辑页面的提交URL
    if(iframeWin.contentWindow.validateParm() ){//调用编辑新增页面的验证方法
   	var layerConfirm =top.layer.confirm(message, {icon: 3, title:'系统提示'}, function(index){	
   	var saveLoadLayer= top.layer.load(0);//发送请求前，加载效果显示
   	 $.ajax({
				url : formAction,
				type : 'POST',
				data : new FormData($(inputForm)[0]),
				async : true,
				cache : false,
				contentType : false,
				processData : false,
				success: function (data) {
					top.layer.close(saveLoadLayer);//发送请求前，加载效果关闭
					//判断返回的是否是登录页面的html(登录超时的情况下会返回)
					if(isLoginPage(data)){
						var successAlertLayer= top.layer.alert('登录超时，请重新登录！', {icon: 2, title:'系统提示'}, function(index) {
		            		//返回登录页
							top.location = "${ctx}";
		            		//关闭弹出信息
		            		top.layer.close(successAlertLayer);
						});
					}else{
						if (data.code == 200) {
			            	//弹出信息框提示成功
			            	var successAlertLayer= top.layer.alert(data.msg, {icon: 1, title:'系统提示'}, function(index) {
			            		//点击确认信息后刷新列表页面
			            		sortOrRefresh();
			            		//关闭当前编辑页面的弹窗
			            		top.layer.close(dialogLayer);
			            		//关闭弹出信息
			            		top.layer.close(successAlertLayer);
							});
			            } else if (data.code == 500){
			            	top.layer.alert(data.msg, {icon: 5, title:'系统提示'});
			            }else{
			            	top.layer.alert(data.msg, {icon: 2, title:'系统提示'});
			            }
					}
		            
		        }
			});
   	 });
    }
}

function openDialogOfLayer(title,url,width,height,target){
	top.layer.open({
	    type: 2,  
	    area: [width, height],
	    title: title,
        maxmin: true, //开启最大化最小化按钮
	    content: url ,
	    btn: ['确定', '关闭'],
	    yes: function(index, layero){
	    	var body = top.layer.getChildFrame('body', index);  
            var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();  
	         var inputForm = body.find('#inputForm');
	         $(inputForm).find('#searchFormParm').val($("#searchForm").serialize());
	         var top_iframe;
	         if(target){
	        	 top_iframe = target;//如果指定了iframe，则在改frame中跳转
	         }else{
	        	 var topWindow =  top.window.document;
	        	 var showDiv = $(topWindow).find('iframe[name^="layui-layer-iframe"]')[0];
	        	 if(showDiv){
	        		 var top_iframe_obj =  $(showDiv).get(0);
		        	 top_iframe=$(top_iframe_obj).attr('name');
	        	 }else{
	        		 top_iframe='mainFrame';
	        	 }
	        	 
	        	 //top_iframe = $('.curholder:first-child').attr("name");//获取当前active的tab的iframe 
	        	 //top_iframe = top.getActiveTab().attr("name");//获取当前active的tab的iframe 
	         }
	         inputForm.attr("target",top_iframe);//表单提交成功后，从服务器返回的url在当前tab中展示
	        if(iframeWin.contentWindow.doSubmit() ){
	        	 top.layer.close(index);//关闭对话框。
	        	  //setTimeout(function(){top.layer.close(index)}, 100);//延时0.1秒，对应360 7.1版本bug
	         }
		  },
		  cancel: function(index){ 
	       }
	}); 	
	
}

//打开对话框(查看)
function openDialogView(title,url,width,height){
	top.layer.open({
	    type: 2,  
	    area: [width, height],
	    title: title,
        maxmin: true, //开启最大化最小化按钮
	    content: url ,
	    btn: ['关闭'],
	    cancel: function(index){ 
	       }
	}); 	
}


function openSonDialogView(title,url,width,height){
	top.layer.open({
	    type: 2,  
	    area: [width, height],
	    title: title,
        maxmin: true, //开启最大化最小化按钮
	    content: url ,
	    btn: ['确定','关闭'],
	    cancel: function(index){ 
	    },
	    yes:function(index,layero){
	    	var data = $(layero).find("iframe")[0].contentWindow.setValue();
	    	getValue(data);
	    	parent.layer.close(index);
	    }
	});
}
//判断非空
function checkNull(value) {
	value=$.trim(value);
	return ( value == null ||value=="null"|| typeof (value) == "undefined" || value == "");
}

/**
 * ajax请求
 * parData:数据
 * defaultValue：默认值
 * callbackFun：执行方法
 */
function ajaxRequest(parData, url, callbackFun) {
	$.ajax({
		type : "post",
		url : url,
		data : parData,
		dataType : "json",
		success : function(data) {
			callbackFun(data);
		},
		error : function(data,type, err) {
			console.log("ajax错误类型："+type);
	        console.log(err);
			top.layer.closeAll('loading');
			top.layer.alert("请求数据加载失败！")
		}
	});
}



/**
 * 填充0
 * @param value
 * @returns
 */
function fillZero(value) {
	if (value.toString().length < 2) {
		return "0" + value;
	}
	return value;
}

/**
 * 日期格式化 str:格式化字符，d:js日期对象，d为空则自动获取当前日期格式化
 * @param str
 * @param d
 * @returns
 */
function dateFormat(str, d) {
	if (this.checkNull(str) || this.checkNull(d)) { // 如果格式化字符为空，返回空字符 如果日期为空，自动获取当前日期
		return "";
	}
	
	if (d.constructor != Date) {// 如果参数不是一个日期对象，就认为是一个标准Long值日期
		d = new Date(d);
	}
	return str.replace("yyyy", d.getFullYear()).replace("MM",
			this.fillZero(d.getMonth() + 1)).replace("dd", this.fillZero(d.getDate()))
			.replace("HH", this.fillZero(d.getHours())).replace("mm",
					this.fillZero(d.getMinutes())).replace("ss",
					this.fillZero(d.getSeconds())).replace("sss",
					d.getMilliseconds());
}

//打开对话框(查看)
function downloadFile(url,name){
	var $a=$("<a></a>").attr("href",url).attr("download",name);
	$a[0].click();
}

//查询窗口关闭或打开
function openOrCloseSearch(obj){
	if($('#searchDiv').is(':visible')){
		$("#searchDiv").fadeOut(200);
		$('#searchFormOpenFlag').val('0');
	}else{
		$('#searchFormOpenFlag').val('1');
		$("#searchDiv").fadeIn(500);
	}
	var iTag = $(obj).find('i').get(0);
	if($(iTag).attr('class')=='fa fa-angle-double-down'){
		$(obj).html('<i class="fa fa-angle-double-up"></i>&nbsp;隐藏查询');
	}else{
		$(obj).html('<i class="fa fa-angle-double-down"></i>&nbsp;显示查询');
	}
}

//判断ajax请求返回是否登陆超时
function isLoginPage(htmlStr){
	var indexOfNum = htmlStr.toString().indexOf("id=\"loginForm\"");
	var flag=false;
	if(indexOfNum>=0){
		flag=true;
	}
	return flag;
}

//判断图片是否存在
function CheckImgExists(imgurl,success,err) {
    var ImgObj = new Image(); //判断图片是否存在  
    ImgObj.onload=function(){
        success && success(ImgObj)
    }
    ImgObj.onerror=function(){
        err && err(ImgObj)
    }
    ImgObj.src = imgurl;
}
//筛选列弹窗选择全部列
function checkAllSettingsTitle(obj){
	if($(obj).is(':checked')){
		var titleSettingsDiv =window.top.document.getElementById('titleSettings');
        //获取所有已选的列
        $(titleSettingsDiv).find('input').attr("checked", true);
	}else{
		 var titleSettingsDiv =window.top.document.getElementById('titleSettings');
        //获取所有已选的列
        $(titleSettingsDiv).find('input:checkbox:checked').attr("checked", false);
	}
}

//筛选列按钮点击事件
function settingTableTitle(tableId){
	var titleAllObjs = [];
	var titleShowStrs = [];
	//获取所有当前表的所有列名
	$('#'+tableId).find('th').each(function(index,obj){
		var text = $(obj).text();
		if(!checkNull(text)&&text!='操作'){
			var isShow = false;
			if($(obj).is(':visible')){
				titleShowStrs.push($(obj).text());
				isShow = true;
			}
			var titleObj = {
					isShow:isShow,
					title:$(obj).text(),
			};
			titleAllObjs.push(titleObj);
		}
	});
	var body=$('<html></html>');
	var titleSettingsDiv=$('<div id="titleSettings"></div>');
	var checkAllDiv = $('<div class="titleCheck" style="margin:5px 5px 5px 20px;" ></div>');
	var checkAllCheckbox = $('<input type="checkbox"  onclick="checkAllSettingsTitle(this)" class="i-checks" style="margin-right: 5px;">')
	//如果已经全选,默认勾上
	if(titleAllObjs.length == titleShowStrs.length){
		$(checkAllCheckbox).attr("checked", true);
	}
	checkAllDiv.append(checkAllCheckbox);
	checkAllDiv.append('全选');
	titleSettingsDiv.append(checkAllDiv);
	$.each(titleAllObjs,function(index,obj){
	    var div = $('<div class="titleCheck" style="margin:5px 5px 5px 20px;" ></div>');
	    var checkBox = $('<input type="checkbox" id="'+obj.title+'" class="" style="margin-right: 5px;">');
	    if(obj.isShow==true){
	    	checkBox = $('<input type="checkbox" id="'+obj.title+'" class="i-checks" checked="checked" style="margin-right: 5px;">');
	    }
	    $(div).append(checkBox);
	    $(div).append(obj.title);
	    $(titleSettingsDiv).append(div);
	   	$(body).append(titleSettingsDiv);
	});
	var titleSettingsLayer=top.layer.open({
		  type: 1,
		  title:'筛选列',
		  area: ['220px', '340px'], //宽高
		  content: $(body).html(),
		  btn: ['确定','关闭'],
		    cancel: function(index){ 
		    },
		    yes:function(index,layero){
		        var body =window.top.document.getElementById('titleSettings');
		        //获取所有已选的列
		        var checkboxs = $(body).find('input:checkbox:checked');
		        
		        var showTitleNames='';
		        //遍历列名
		        $.each(checkboxs,function(index,checkboxObj){
		        	if(checkNull(showTitleNames)){
		        		showTitleNames=checkboxObj.id;
		        	}else{
		        		showTitleNames=showTitleNames+','+checkboxObj.id;
		        	}
		        });
		        
		        if(checkNull(showTitleNames)){
		        	 top.layer.alert('请至少选择一列显示！');
		        }else{
		        	showTableTitle(showTitleNames,tableId);
			        $('#titleSettingsNames').val(showTitleNames);
			        top.layer.close(titleSettingsLayer);
		        }
		    }
	});
}
function showTableTitle(showTitleNamesStr,tableId){
	if(!checkNull(showTitleNamesStr)){
		var showTitleNames =showTitleNamesStr.split(',');
		//隐藏所有列
        var showCaozuoTitleIdex=-1;
        $.each($('#'+tableId).find('th'),function(index,thObj){
        	var thObjText = $.trim($(thObj).text());
        	//显示操作列
        	if(thObjText=='操作'){
        		showCaozuoTitleIdex = index;
    			$(thObj).show();
    		}else{
    			$(thObj).hide();
    		}
        	//显示勾选列
        	if($(thObj).find('input').length>0){
    			$(thObj).show();
    		}
        });
        $.each($('#'+tableId).find('tbody tr'),function(index,trObj){
        	$(trObj).find('td').hide();
        	$(trObj).find('td').eq(showCaozuoTitleIdex).show();
    		/*$.each($(trObj).find('td'),function(index,tdObj){
    			$(tdObj).hide();
    			//显示勾选列
    			if($(tdObj).find('input').length>0){
        			$(tdObj).show();
        		}
    			//显示操作列
    			if(showCaozuoTitleIdex==index){
        			$(tdObj).show();
        		}
        	});*/
    	});
        
		 $.each(showTitleNames,function(index,titleName){
			 //查找需要显示列，在table中的位置
        	var titleIdex=-1;
        	var caozuoTitleIdex=-1;
        	$.each($('#'+tableId).find('th'),function(index,thObj){
        		var thObjText = $.trim($(thObj).text());
        		if(thObjText==titleName){
        			titleIdex=index;
        			$(thObj).show();
        		}
        	});
        	//隐藏列内容
        	//遍历内容行
        	$.each($('#'+tableId).find('tbody tr'),function(index,trObj){
        		var tds =$(trObj).find('td').eq(titleIdex).show();
        	});
		 });
	}
}
//截取字符串样式
function subStringTdContent(){
	$("td[data-substring]").each(function(){
		 var subCountStr = $(this).attr('data-substring');
		 var subCount = Number(subCountStr);
		 var textAll = $.trim($(this).text());
		 if(textAll.length>subCount){
			var text = textAll.substring(0,subCount)+'...';
			$(this).text(text);
			$(this).attr('title',textAll);
		 }
	 });
}
//自适应标签页的高度
//otherHeight 是整个页面空余的高度
function tabPaneHeightLoad(otherHeight){
	var htmlHeight = $('html').height();
	var paneHeight =htmlHeight-otherHeight;
	$('.tab-pane').height(paneHeight);
}


function maxLengthLoad(objStr){
	$(objStr).on('keyup blur', function(event) {
        var maxlength = $(this).attr('maxlength');
        var val = $(this).val();

        if (val.length > maxlength) {
            /*这里是为了兼容win10自带输入法在字数到达极限值之后再输入中文会清空输入框的内容*/
            $(this).hide().show();
            
            $(this).val(val.substr(0, maxlength));
        }
        event.stopImmediatePropagation();
    });
}
/**
 * 
 * @param objId 点击元素ID
 * @param title 弹窗标题
 * @param url	页面URL
 * @param width	弹窗宽度
 * @param height 弹窗高度
 * @param isMultiple 是否多选
 * @param callbackFun 返回方法
 */
function chooseOneObjInWindow(objId,title,url,width,height,isMultiple,callbackFun){
	$('#'+objId).click(function(){
		var dialogLayer= top.layer.open({
		    type: 2,  
		    area: [width, height],
		    title: title,
	        maxmin: true, //开启最大化最小化按钮
		    content: [url+'?'+$('#'+objId).attr('name')+'='+$(this).val(), 'no'],
		    btn: ['确定', '取消'],
		    yes: function(index, layero){
		    	//获取弹窗页面的元素
				  var body = top.layer.getChildFrame('body', index);
				  //获取所有checkbox
				  var checkboxs = $(body).find('#selectId:checkbox:checked');
				  if(checkboxs.length==0){
					  top.layer.alert('请至少选择一个');
					  return;
				  }
				  if(isMultiple){
					  
				  }else{
					  if(checkboxs.length>1){
						  top.layer.alert('只能选择一个');
						  return;
					  }else if(checkboxs.length==1){
						  debugger;
						 var input = $(checkboxs[0]);
						 var lineId=$(input).val();
						 var th = $(input).parent().parent();
						 var allValue = $(th).find('input[type=hidden]');
						 var returnData={};
						 for(var i=0;i<allValue.length;i++){
							 var name = $(allValue[i]).attr('name'); 
							 var value  = $(allValue[i]).val();
							 returnData[name]=value;
						 }
						 callbackFun(returnData);
					  }
				  }
				  top.layer.close(dialogLayer);
				 
		    },
		  	cancel: function(index){ 
		  		
	       }
		});
	});
}

/**
 * 点击弹窗显示地图并编辑获取位置
 */
function openMapLookMark(showFieldName,lngFieldName,latFieldName,lngFieldValue,latFieldValue,operationType){
	if(operationType =='2'){
		if(checkNull(lngFieldValue)||checkNull(lngFieldValue)){
			operationType='1';
		}
	}
	if(operationType=='3'){
		top.layer.open({
		    type: 2,  
		    area: ['85%', '90%'],
		    title: '地图位置',
	        maxmin: true, //开启最大化最小化按钮
		    content: ['/zhnl-web/rrdBaseRoadLatlng/pointNotopleft?type='+operationType+'&longitude='+lngFieldValue+'&latitude='+latFieldValue,'no'],
		    btn: ['关闭'],
		    cancel: function(index){ 
		       }
		}); 
	}else if(operationType=='1'||operationType=='2'){
		var dialogLayer= top.layer.open({
		    type: 2,  
		    area: ['1600px', '1000px'],
		    title: '地图位置',
	        maxmin: true, //开启最大化最小化按钮
		    content: ['/zhnl-web/rrdBaseRoadLatlng/pointNotopleft?type='+operationType+'&longitude='+lngFieldValue+'&latitude='+latFieldValue, 'no'],
		    btn: ['确定','清除','取消'],
		    yes: function(index, layero){
		    	var body = top.layer.getChildFrame('body', index);  
	            var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();  
		        var array = iframeWin.contentWindow.getMapGPS().split(",");
		        $("#"+lngFieldName).val(array[0]);
		        $("#"+latFieldName).val(array[1]);
		        $("#"+showFieldName).val(array[0]+','+array[1]);
		        //关闭当前编辑页面的弹窗
        		top.layer.close(dialogLayer);
			},
			btn2: function(index, layero){
		        $("#"+lngFieldName).val('');
		        $("#"+latFieldName).val('');
		        $("#"+showFieldName).val('');
		        //关闭当前编辑页面的弹窗
        		top.layer.close(dialogLayer);
			},
		    cancel: function(index){ 
	       }
		}); 	
	}
}