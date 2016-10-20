/*
 * author			zk(QQ:77424797)
 * date				2016-08-02
 * 
 * 基于Iscroll的滚动模块
 */

define(['zepto.min.js', 'iscroll.min.js'], function(require, exports, module) {
	var imgIntArrat={};
	var exports = {
		//初始化滚动控件
		initIscroll: function(IDSelector, height) { 
			$('#' + IDSelector).height($(window).height() - height);
			return new iScroll(IDSelector, {
				scrollbarClass: 'myScrollbar'
			});
		},
		//初始化轮播图
		initScrollImg: function(conf) {
			var config={
				selector:'scrollImg',	//父元素选择器
				images:new Array(),	//图片数组
				speed:2000,	//切换时间
				direction:'left'
			}
			$.extend(config, conf);
			var scroll = $('<div class="scroll_bar" style="position:relative;"></div>')
			var list = $("<ul class='indexList' style='position: absolute;bottom: 10px;list-style:none;'></ul>");
			$('#'+config.selector).append(scroll);
			$('#'+config.selector).append(list).css('position', 'relative');
			$(config.images).each(function(i) {
				scroll.append('<img src="' + this + '"/>');
				list.append('<li style="background-color: white;height: 8px;width: 8px;border-radius: 50%;float: left;margin-left: 3px;opacity: 0.7;"></li>');
			});
			list.find('li').eq(0).css("background-color", "#5953a1");
			var width = $('body')[0].clientWidth;
			scroll.find('img').css("width", width + "px");
			scroll.css('width', config.images.length * width + "px");
			var myScroll = new iScroll(config.selector, {
				snap: true,
				momentum: false,
				vScroll: false,
				hScroll: true,
				hScrollbar: false,
				onScrollEnd: function() {
					clearInterval(imgIntArrat[config.selector]);
					imgIntArrat[config.selector] = setInterval(a, config.speed);
						$('#' + config.selector + ' .indexList li').css("background-color", "white");
					if(config.direction=='right'){
						$('#' + config.selector + ' .indexList li').eq(config.images.length-1-this.currPageX).css("background-color", "#5953a1");
					}else{
						$('#' + config.selector + ' .indexList li').eq(this.currPageX).css("background-color", "#5953a1");
					}
				}
			});
			if(config.direction=='right'){
				myScroll.scrollToPage(config.images.length - 1,0,0);
			}
			function a() {
				if(config.direction=='left'){
					myScroll.scrollToPage(myScroll.currPageX == config.images.length - 1 ? 0 : myScroll.currPageX + 1);
				}else{
					myScroll.scrollToPage(myScroll.currPageX == 0 ? config.images.length - 1 : myScroll.currPageX - 1);
				}
			}
			clearInterval(imgIntArrat[config.selector]);
			imgIntArrat[config.selector] = setInterval(a, config.speed);
			list.css('margin-left', ($('body')[0].clientWidth - list[0].clientWidth) / 2);
		},
		//图片懒加载
		lazyload: function(conf) {
			var config={
				lazyImages:$('img'),	//懒加载的图片
				height:$('#wrapper').height(),	//高度
				scroll:null	//滚动控件
			}
			$.extend(config,conf);
			$(config.lazyImages).each(function(i) {
				if(this.offsetTop <= (-config.scroll.y) + config.height) {
					var imgDom = $(this).removeClass('lazyload');
					var img = new Image();
					img.src = $(this).attr('data-src');
					img.onload = function() {
						imgDom.attr('src', img.src).fadeIn(200);
					}
					config.scroll.refresh();
				}
			});
		},
		//图片预览
		initPreview:function(conf){
			var config={
				selector:$('img'),	
				images:null
			}
			$.extend(config,conf);
			config.selector.unbind('click').click(function(event){
				event.stopPropagation();
				var indexImg=$(this).parent().find('img').index($(this));
				var preview_scroll=$('<div id="preview_scroll" style="position:fixed;z-index: 1001;background: #F0F5F9;height: 100%;top:0px"></div>')
				var prevoew_index=$('<div class="prevoew_index" style="position: fixed;z-index: 1002;width: 100%; max-width: 640px;text-align: center; top: 20px; font-size: 18px;color: #424242;font-weight: bold;"><span>1</span>/'+$(this).parent().find('img').length+'</div>')
				var preview_page=$('<div id="preview_page"></div>');
				$('body').append(preview_page);
				preview_page.append(preview_scroll);
				preview_page.append(prevoew_index);
				var width=$('body').width();
				$(this).parent().find('img').each(function(i){
					preview_scroll.append('<img src="'+$(this).attr('src')+'" style="float: left;max-height: 100%;"/>');
					preview_scroll.find('img').css({"width":width+"px"});
					preview_scroll.find('img').eq(i).css({'margin-top':(preview_scroll.height()-width)/2+"px"});
					var img=new Image();
					img.src=$(this).attr('src');
					img.onload=function(){
						preview_scroll.find('img').eq(i).css({'margin-top':(preview_scroll.height()-preview_scroll.find('img').eq(i).height())/2+"px"});
					}
				});
				preview_scroll.css('width', $(this).parent().find('img').length * width+"px");
				var myScroll = new iScroll("preview_page", {
							snap: true,
							momentum: false,
							vScroll: false,
							hScroll: true,
							hScrollbar: false,
							bounce:false,
							onScrollEnd : function() {
								$('.prevoew_index span').html(this.currPageX+1);
							}
				});
				myScroll.scrollToPage(indexImg,0,0);
				$('#preview_scroll').unbind('click').click(function(){
					$('#preview_page').remove("");
				});
			});
		},
		//返回顶部
		backTop: function(scroll,wrapper,bottom) {
			bottom = bottom == null ? 70 : bottom;
			if((-scroll.y) > wrapper.height() * 1.2) {
				if(wrapper.find('.backTop').length <= 0) {
					wrapper.append('<img src="images/icons/returnTop.png" class="backTop" style="position: fixed;width: 35px;z-index: 10;bottom: ' + bottom + 'px;right: 10px;background:white;border-radius:50%">');
					wrapper.find('.backTop').fadeIn(200).click(function() {
						scroll.scrollTo(0, 0, 500);
					});
				}
			} else {
				wrapper.find('.backTop').remove();
			}
		},
	};
	module.exports = exports;
});