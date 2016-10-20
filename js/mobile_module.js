/**
 * author			zk(QQ:77424797)
 * date				2016-08-01
 * 
 * web单页应用模块
 * 
 * store			库存
 * enableTouch  	是否启用滑动切换页面
 */
define(['zepto.min.js'],function(require, exports, module){
	var store={}
	left_in = 'pt-page-moveFromLeft';	//从左进入
	left_out = 'pt-page-moveToLeft';	//从左退出
	right_in = 'pt-page-moveFromRight';	//从右进入
	right_out = 'pt-page-moveToRight';	//从右退出
	var hideTimeOut;
	var config={
		enableTouch:false,
	}
	function request(type,url,data,async,dataType,callback){
		$.ajax({
			type : type,
			url : url,
			data :data,
			async : async,
			dataType : dataType,
			success : function(json) {
				if(callback){
					callback(json);
				}else{
					console.log('error:'+url);
				}
			},
			error:function(json){
				jumpPage('error.html');
			}
		});
	}
	function ajax(type,url,data,dataType,callback){
		request(type,url,data,dataType,true,callback);
	}
	//获取当前页面dom元素
	window._=function(selector){
		return $('.current_page').find(selector);
	}
	//防止重复注册事件
	$.fn.uclick=function(callback){
		this.unbind('click').click(function(){
			callback();
		});
	}
	function bindTouch(){//绑定滑动切换页面事件
	    var pressX = 0,spanX=0;
		 $('body')[0].addEventListener('touchmove', function(event) {
		 	if(event.targetTouches.length == 1) {
		 		var touch = event.targetTouches[0];
		 		spanX = touch.pageX - pressX;
		 	}
		 }, false);
		 $('body')[0].addEventListener('touchstart', function(event) {
		 	if(event.targetTouches.length == 1) {
		 		var touch = event.targetTouches[0];
		 		pressX = touch.pageX;
		 	}
		 }, false);
		 $('body')[0].addEventListener('touchend', function(event) {
		 	if(spanX > 200) {
		 		history.go(-1)
		 	} else if(spanX<-200){
		 		history.go(1)
		 	}
		 	spanX=0;
		 }, false);
	}
	function jumpPage(pageUrl) {
		var hash="";
		if(pageUrl==null){
			hash = location.hash.replace("#&", "").replace(/^#/, ""); //获取URL锚部分（从 # 号开始的部分）。
		}else{
			hash=pageUrl;
		}
		var pageId=hash.substring(0, hash.indexOf('.html')).replace(/\//g, '_');
		//判断库存中是否存在该页面
		if(store[pageId] == null) {
			D.loadPage(true);
			//不存在：发送AJAx请求加载页面
			ajax('get', hash, null, 'html', function(html) {
				var pageHtml = $('<div>' + html + '</div>');
				$('body').append('<div id="' + pageId + '" class="page">' + html + '</div>');
				//保存页面到库存中
				store[pageId] = {
					'title': pageHtml.find('title').html()
				};
				//获取页面当中的js文件地址（css文件加载页面会同时加载）
				var jsArray = new Array();
				$(pageHtml.find('script')).each(function() {
					var url=location.href.substring(0,location.href.indexOf('index.html'));
					jsArray[jsArray.length] =url+$(this).attr('src');
				});
				$('title').html(store[pageId].title);
				var dom = $('.current_page');
				dom.removeClass(right_in).removeClass(left_in).removeClass('current_page').addClass(left_out);
				clearTimeout(hideTimeOut);
				hideTimeOut = setTimeout(function() {
					dom.hide();
				}, 500);
				$('#' + pageId).addClass('current_page');
				//加载js文件
				seajs.use(jsArray, function() {
					D.loadPage(false);
					//添加动画效果
					if(JSON.stringify(store).split(',').length > 1) {
						$('#' + pageId).addClass(right_in);
					}
				});
			});
		} else {
			D.loadPage(false);
			D.loadOpt(false);
			$('#search_box').remove();
			$('#preview_page').remove();
			prevPage = $('.page').index($('.current_page'));
			curPage = $('.page').index($('#' + pageId));
			if(prevPage != curPage) {
				var dom = $('.current_page');
				dom.removeClass(left_in).removeClass(right_in);
				dom.removeClass('current_page');
				clearTimeout(hideTimeOut);
				hideTimeOut = setTimeout(function() {
					dom.hide();
				}, 500);
				if(prevPage > curPage) { //返回效果
					dom.addClass(right_out);
					$('#' + pageId).show().removeClass(left_out).removeClass(right_out).addClass(left_in).addClass('current_page');
				} else { //前进效果
					dom.addClass(left_out);
					$('#' + pageId).show().removeClass(left_out).removeClass(right_out).addClass(right_in).addClass('current_page');
				}
				$('title').html(store[pageId].title);
			}
			//重新初始化当前页面
			var page = pageId.substring(pageId.indexOf('_') + 1, pageId.length);
			eval(page + '.initPage()');
		}
	}
	var exports = {
		init:function(conf){
			$.extend(config,conf);
			if(config.enableTouch){
				bindTouch();
			}
			window.addEventListener("popstate", function() {//监听地址变化
				jumpPage();
			});
		},
		jumpPage:function(pageUrl){
			jumpPage(pageUrl)
		}
	};
	module.exports = exports;
}); 