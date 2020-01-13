//layui页面初始化方法
var layInit = function(cb){
	/*
	*
	* 模块化引入layui第三方组件库
	*/
	//引入select多选组件
//	layui.config({
//			base: '../../layui/component/'
//	}).extend({
//			formSelects: 'formSelects-v4'
//	});
	layui.use(['jquery','element','form','table','laydate','layer','laypage','upload','colorpicker'], function(){
		  var $ = layui.$;
		  //var formSelects = layui.formSelects;
		  var upload = layui.upload;
		  typeof cb == "function" && cb(layui,$);
		   
	});
};

//格式化日期
var formatTime = function formatTime(datetime) {
		var date = new Date(datetime);
		var year = date.getFullYear()
		var month = date.getMonth() + 1
		var day = date.getDate()
		var hour = date.getHours()
		var minute = date.getMinutes()
		var second = date.getSeconds()
		return {"year":year,"month":month,"day":formatNumber(day),"hour":formatNumber(hour),"minute":formatNumber(minute),"second":formatNumber(second)}
}

//小于10的数，在前面自动补0
var formatNumber = function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//判断不为空
var isNotEmpty = function(val) {
    return val != null && val != "null" && val != "undefined" && val != undefined && val != '';
}

//判断为空
var isEmpty = function(val) {
    return !isNotEmpty(val);
}

//获取URL地址参数
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