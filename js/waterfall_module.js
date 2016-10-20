/**
 * author			zk(QQ:77424797)
 * date				2016-09-01
 * 
 * 瀑布流
 * 
 * selector		选择器
 * count		列数
 * images		填充的图片数组
 * callback		填充之后的回调函数
 */
define(['zepto.min.js','dialog_module.js'],function(require, exports, module){
	var D = require('dialog_module');
	function loadWaterfall(conf){
		var config={};
		var config={
			selector:$('#waterfall'),
			count:2,
			images:new Array(),
			callback:null
		};
		$.extend(config, conf);
		if(config.selector.find('div').length<=0){
			for (var i=0;i<config.count;i++) {
				config.selector.append('<div></div>');
			}
			config.selector.css('overflow','auto');
			config.selector.find('div').css({'position':'relative','float':'left','width':$('body').width()/config.count+'px'});
		}
		D.loadOpt(true);
		loadlist(config,0);
	}
	function loadImg(opt) {
		var img = new Image();
		var complete = false;
		var t = setTimeout(function() {
			if(!complete && opt.onTimeout) opt.onTimeout();
			complete = true;
		}, opt.timeout || 5000);
		img.onload = function() {
			clearTimeout(t);
			if(!complete && opt.onComplete) opt.onComplete(this);
			complete = true;
		}
		img.src = opt.url;
	}
	function loadlist(config,index) {
		loadImg({
			url: config.images[index],
			onComplete: function(img) {
				if(++index < config.images.length) {
					loadlist(config,index);
				}
				var dom=config.selector.find('div').eq(0);
				$(config.selector.find('div')).each(function(i){
					if(dom.height()>$(this).height()){
						dom=$(this);
					}
				});
				dom.append(img);
				config.selector.find('img').css({'width':'90%','margin':'10px auto 0px auto','display':'block','border-radius':'5px'});
				if(config.images.length==index){
					D.loadOpt(false);
					if(config.callback){
						config.callback();
					}
				}
			},
			onTimeout: function() {
				if(++index < config.images.length) {
					loadlist(config,index);
				}
			}
		});
	}
	var exports = {
		loadWaterfall:function(conf){
			loadWaterfall(conf);
		}
	};
	module.exports = exports;
}); 