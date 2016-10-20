/**
 * author    		zk(QQ:77424797)
 * date				2016-08-01
 * 
 * 初始化js（主入口）
 * 
 */

var U,D,I,Dt,W,M,C;//工具模块、弹窗模块、Iscroll模块、日期选择模块、瀑布流、地图、省市级联动
window.onload = function(){
	//通过sea.js加载需要用到的js模块
	seajs.use(['zepto.min.js','mobile_module.js','iscroll.min.js','iscroll_module.js',
	'dialog_module.js','util_module.js','datepicker_module.js','waterfall_module.js',
	'map_module.js','citypicker_module.js']
	,function(zepto,mobile,iscrollm,iscroll,dialog,util,datepicker,waterfall,map,city){
		U=util;
		D=dialog;
		I=iscroll;
		Dt=datepicker;
		W=waterfall;
		M=map;
		C=city;
		D.initLoadOpt(2)
		D.initLoadPage(3,'#33B5E5');
		mobile.init({'enableTouch':true});//初始化路由模块
		if(location.href.indexOf('#')>-1){
			location.href=location.href.substring(location.href.indexOf('#'),location.href.length);
		}else{
			location.href='#demo/index.html';
		}
	});
}