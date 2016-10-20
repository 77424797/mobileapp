/*
 * author			zk(QQ:77424797)
 * date				2016-08-02
 * 
 * 弹窗模块
 */

define(['zepto.min.js'], function(require, exports, module) {
	var toastTimeOut;
	var loadPage;
	var loadPageBgColor;
	var loadOpt;
	var exports = {
		initLoadOpt:function(loading){//初始化加载
			switch(loading){
				case 1:
					loadOpt='<div class="loading-mask-1"></div><div class="loading-1"><span></span><span></span><span></span><span></span><span></span></div>';
					break;
				case 2:
					loadOpt='<div class="loading-mask-1"></div><div class="loading-2"><span></span><span></span><span></span><span></span><span></span></div>';
					break;
				case 3:
					loadOpt='<div class="loading-mask-3"></div><div class="loading-3"><div class="dot white"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>'
					break;
				case 4:
					loadOpt='<div class="loading-mask-1"></div><div class="loading-4"><div></div><div></div><div></div></div>';
					break;
				case 5:
					loadOpt='<div class="loading-mask-1"></div><div class="loading-5"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
					break;
				case 6:
					loadOpt='<div class="loading-mask-1"></div><div class="loading-6"><div></div><div></div><div></div><div></div><div></div></div>';
					break;
				case 7:
					loadOpt='<div class="loading-mask-1"></div><div class="loading-7"><div></div><div></div><div></div><div></div><div></div></div>'
			}
		},
		initLoadPage:function(loading,bg){//初始化加载
			loadPageBgColor=bg==null?'black':bg;
			switch(loading){
				case 1:
					loadPage='<div class="loading-1"><span></span><span></span><span></span><span></span><span></span></div>';
					break;
				case 2:
					loadPage='<div class="loading-2"><span></span><span></span><span></span><span></span><span></span></div>';
					break;
				case 3:
					loadPage='<div class="loading-3"><div class="dot white"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>'
					break;
				case 4:
					loadPage='<div class="loading-4"><div></div><div></div><div></div></div>';
					break;
				case 5:
					loadPage='<div class="loading-5"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
					break;
				case 6:
					loadPage='<div class="loading-6"><div></div><div></div><div></div><div></div><div></div></div>';
					break;
				case 7:
					loadPage='<div class="loading-7"><div></div><div></div><div></div><div></div><div></div></div>';
					break;
				case 8:
					loadPage='<span class="ball-loader">Loading…</span>';
			}
		},
		//显示/隐藏操作加载框
		loadOpt: function(open) {
			if(open) {
				$('body').append('<div class="loadOpt-mask"></div><div class="loadOpt">'+loadOpt+'</div>');
				$('.loadOpt').css({'top':($(window).height()-$('.loadOpt').height())/2,'left':($(window).width()-$('.loadOpt').width())/2});
			} else {
				$('.loadOpt,.loadOpt-mask').remove();
			}
		},
		//显示/隐藏页面加载框
		loadPage: function(open) { 
			if(open) {
				$('body').append('<div class="loadPage-mask"></div><div class="loadPage">'+loadPage+'</div>');
				$('.loadPage').css({'top':($(window).height()-$('.loadPage').height())/2,'left':($(window).width()-$('.loadPage').width())/2});
				$('.loadPage .loading-1 span,.loadPage .loading-2 span,.loadPage .loading-4 div,.loadPage .loading-5 div,.loadPage .loading-7 div').css('background',loadPageBgColor);
				$('.loadPage .loading-6 div').eq(2).css('background',loadPageBgColor);
				$('.loadPage .loading-6 div').eq(3).css('background',loadPageBgColor);
				$('.loadPage .loading-6 div').eq(4).css('background',loadPageBgColor);
				$('.loadPage .loading-6 div').eq(0).css('border-color',loadPageBgColor).css('border-right-color','transparent');
				$('.loadPage .loading-6 div').eq(1).css('border-color',loadPageBgColor).css('border-right-color','transparent');
			} else {
				$('.loadPage,.loadPage-mask').remove();
			}
		},
		//提示框
		tip: function(conf) {
			var config = {
				title: '提示',
				txt: '错误提示',
				ok: '我知道了',
				callback: null
			};
			$.extend(config, conf);
			$('body').append('<div id="alert_mask"></div>' +
				'<div id="alert_box">' +
				'<div id="alert_title">' + config.title + '</div>' +
				'<div id="alert_txt">' + config.txt + '</div>' +
				'<div id="alert_ok">' + config.ok + '</div>' +
				'</div>');
			$('#alert_box').css('top', ($(window).height() - $('#alert_box').height()) / 2 + 'px').addClass('bounceIn');
			$('#alert_ok').click(function() {
				$('#alert_mask,#alert_box').remove();
				if(config.callback) {
					config.callback();
				}
			});
		},
		//确认提示框
		confirm: function(conf) {
			var config = {
				title: '提示标题',
				txt: '提示内容',
				ok: null,
				cancle: null
			};
			$.extend(config, conf);
			$('body').append('<div id="alert_mask"></div>' +
				'<div id="alert_box">' +
				'<div id="alert_title">' + config.title + '</div>' +
				'<div id="alert_txt">' + config.txt + '</div>' +
				'<div id="alert_confirm">确定</div>' +
				'<div id="alert_cancle">取消</div>' +
				'</div>');
			$('#alert_confirm,#alert_cancle').width(($('#alert_box').width() - 1) / 2);
			$('#alert_box').css('top', ($(window).height() - $('#alert_box').height()) / 2 + 'px').addClass('bounceIn');
			$('#alert_confirm').click(function() {
				$('#alert_mask,#alert_box').remove();
				if(config.ok) {
					config.ok();
				}
			});
			$('#alert_cancle').click(function() {
				$('#alert_mask,#alert_box').remove();
				if(config.cancle) {
					config.cancle();
				}
			});
		},
		//带输入的提示框
		confirmInput: function(conf) {
			var config = {
				title: '提示标题',
				txt: '提示内容',
				ok: null,
				cancle: null
			};
			$.extend(config, conf);
			$('body').append('<div id="alert_mask"></div>' +
				'<div id="alert_box">' +
				'<div id="alert_title">' + config.title + '</div>' +
				'<div id="alert_txt"><input type="text" placeholder="' + config.txt + '"/></div>' +
				'<div id="alert_confirm">确定</div>' +
				'<div id="alert_cancle">取消</div>' +
				'</div>');
			$('#alert_confirm,#alert_cancle').width(($('#alert_box').width() - 1) / 2);
			$('#alert_box').css('top', ($(window).height() - $('#alert_box').height()) / 2 + 'px').addClass('bounceIn');
			$('#alert_confirm').click(function() {
				if(config.ok) {
					config.ok($('#alert_txt input').val());
				}
				$('#alert_mask,#alert_box').remove();
			});
			$('#alert_cancle').click(function() {
				if(config.cancle) {
					config.cancle($('#alert_txt input').val());
				}
				$('#alert_mask,#alert_box').remove();
			});
		},
		//确定or取消提示框（底部）
		okCancle: function(params) {
			var config = {
				txt: '确定/取消？',	
				okTxt: '确定',
				cancleTxt: '取消',
				ok: null,
				cancle: null
			};
			$.extend(config, params);
			$('body').append('<div id="confirm-box">' +
				'<div class="confirm-mask"></div>' +
				'<div class="confirm confirmUp">' +
				'<div class="confirm-txt">' + config.txt + '</div>' +
				'<div class="ok">' + config.okTxt + '</div>' +
				'<div class="cancle">' + config.cancleTxt + '</div>' +
				'</div>' +
				'</div>');
			$('#confirm-box .ok').click(function() {
				$('.confirm').removeClass('confirmUp').addClass('confirmDown');
				$('.confirm-mask').remove()
				setTimeout(function() {
					$('#confirm-box').remove();
				}, 300);
				if(config.ok) {
					config.ok();
				}
			});
			$('#confirm-box .cancle,#confirm-box .confirm-mask').click(function() {
				$('.confirm').removeClass('confirmUp').addClass('confirmDown');
				$('.confirm-mask').remove()
				setTimeout(function() {
					$('#confirm-box').remove();
				}, 300);
				if(config.cancle) {
					config.cancle();
				}
			});
		},
		//淡入淡出定时小时提示框
		toast: function(flag, msg, callback) {
			$('.messge-box').remove();
			$('#message_mask').remove();
			clearTimeout(toastTimeOut);
			$('body').prepend('<div id="message_mask"></div><div class="messge-box bounceIn"><div class="message-mark"></div><div class="messge-box-icon"><i class="message-toast-icon"></i></div><div class="messge-box-content"></div></div>');
			$('.messge-box').css('left', ($(window).width() - 180) / 2 + 'px');
			$('.messge-box').css('top', ($(window).height() - 110) / 2 + 'px');
			$('.messge-box-content').html(msg.toString());
			$('.message-toast-icon').addClass(flag ? 'succee-icon' : 'info-icon');
			toastTimeOut = setTimeout(function() {
				$('.messge-box').removeClass('bounceIn').fadeOut(function() {
					$('.messge-box').remove();
					$('#message_mask').remove();
				});
				if(callback) {
					callback();
				}
			}, 1500);
			$('#message_mask').click(function() {
				clearTimeout(toastTimeOut);
				$('.messge-box').removeClass('bounceIn').fadeOut(function() {
					$('.messge-box').remove();
					$('#message_mask').remove();
				});
				if(callback) {
					callback();
				}
			});
		},
		//仿ios选择控件
		initSelect: function(params) {
			var config = {
				selector: $('#select'),//选择器
				selectArray: new Array(),//选择列表
				callback: null	//回调函数
			};
			$.extend(config, params);
			config.selector.click(function(event) {
				event.stopPropagation();
				$('#select_mask,#select_picker').remove();
				$('body').append('<div id="select_mask"></div><div id="select_picker" class="selectUp"><div id="select_header"><div id="select_cancle">取消</div><div id="select_ok">确定</div></div><div id="select_body"><div id="select_top"></div><div id="select_fotter"></div></div></div>');
				$('#select_body').append('<div id="select_wrapper"><div><div class="m_select"></div><div class="m_select"></div><div class="m_select end_select"></div><div class="m_select"></div><div class="m_select"></div></div></div>');
				$('#select_wrapper').height(240);
				$(config.selectArray).each(function() {
					$('<div class="m_select">' + this + '</div>').insertBefore('.end_select');
				});
				var select_scroll = new iScroll('select_wrapper', {
					scrollbarClass: 'myScrollbar',
					bounce: false,
					snap: 'div'
				});
				var index = config.selector.html() == "" || config.selector.html() == null ? 0 : config.selectArray.indexOf(config.selector.html());
				select_scroll.scrollTo(0, -index * 40, 0);
				$('#select_ok').click(function() {
					index = -select_scroll.y / 40;
					if(config.callback) {
						config.callback(config.selectArray[index]);
					}
					$('#select_cancle').click();
				});
				$('#select_cancle,#select_mask').click(function() {
					$('#select_mask').hide();
					$('#select_picker').removeClass('selectUp').addClass('selectDown');
				});
			});
		}
	};

	module.exports = exports;
});