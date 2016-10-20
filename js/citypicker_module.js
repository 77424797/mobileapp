/**
 * author			zk(QQ:77424797)
 * date				2016-08-17
 * 省、市、区联动	
 * 
 * layout			样式
 * headBg			头部背景颜色
 * headColor		头部文字颜色
 * headTxt			头部文字
 * borderColor		请选择底部边框颜色
 * backImg			返回按钮图片地址
 * checkClass		选中的样式名称
 * checkImg			选中的图片
 * selectArea		是否需要查询区域
 * callback			回调函数（provinceId:省编号，provinceName:省名称，cityId：市编号，cityName：市名称，areaId：区域编号，areaName：区域名称）
 * -------------------------------
 * css文件		citypicker.css
 * 
 */
define(['zepto.min.js', 'iscroll.min.js', 'iscroll_module.js', 'dialog_module.js', 'util_module.js'], function(require, exports, module) {
	var U = require('util_module');
	var D = require('dialog_module');
	var province_scroll;
	var city_scroll;
	var area_scroll;
	var provinceJson;
	var cityJson;
	var areaJson;
	var config;
	var page_in = "cp_left_in cp_right_in";
	var page_out = "cp_left_out cp_right_out";
	function loadDate(callback) {
		D.loadOpt(true);
		$.getJSON('resource/wine_province.json', function(json) {
			provinceJson = json;
			$.getJSON('resource/wine_city.json', function(json) {
				cityJson = json;
				$.getJSON('resource/wine_area.json', function(json) {
					areaJson = json;
					D.loadOpt(false);
					callback();
				});
			});
		});
	}

	function initPicker() {
		if(config.layout == 1) {
			if($('#city_picker div').length > 0) {
				if($('#address_menu div').eq(2).html() != null) {
					$('#area_page').removeClass(page_in).removeClass(page_out).show();
				} else if($('#address_menu div').eq(1).html() != null) {
					$('#city_page').removeClass(page_in).removeClass(page_out).show();
				} else if($('#address_menu div').eq(0).html() != null) {
					$('#province_page').removeClass(page_in).removeClass(page_out).show();
				}
				province_scroll.refresh();
				city_scroll.refresh();
				area_scroll.refresh();
				$('#city_picker').removeClass(page_out).addClass('cp_right_in');
				return;
			}
			$('body').append('<div id="city_picker" class="cp_right_in">');
			$('#city_picker').append('<div id="cp_head" style="background:' + config.headBg + ';color:' + config.headColor + ';">' + config.headTxt + '<img src="' + config.backImg + '" /></div>');
			$('#city_picker').append('<div id="address_menu"><div id="province">请选择<span style="border-bottom:3px solid ' + config.borderColor + '"></span></div></div>')
			$('#city_picker').append('<div id="province_page"><div id="province_wrapper"><div id="province_list"></div></div></div>');
			$('#city_picker').append('<div id="city_page"><div id="city_wrapper"><div id="city_list"></div></div/div>');
			$('#city_picker').append('<div id="area_page"><div id="area_wrapper"><div id="area_list"></div></div></div></div>');
			$('#province_wrapper,#city_wrapper,#area_wrapper').height($(window).height() - 92);
			province_scroll = new iScroll('province_wrapper', {
				scrollbarClass: 'myScrollbar'
			});
			city_scroll = new iScroll('city_wrapper', {
				scrollbarClass: 'myScrollbar'
			});
			area_scroll = new iScroll('area_wrapper', {
				scrollbarClass: 'myScrollbar'
			});
			$('#cp_head').click(function() {
				$('#province_page,#city_page,#area_page').hide();
				$('#city_picker').removeClass(page_in).addClass('cp_right_out');
			});
			if($('#province_list div').length <= 0) {
				$(provinceJson.RECORDS).each(function() {
					$('#province_list').append('<div provinceId="' + this.id + '">' + this.province_name + '</div>')
				});
				province_scroll.refresh();
				$('#province_list div').unbind('click').click(function() {
					var provinceName = $(this).html();
					var provinceId = $(this).attr('provinceId');
					$('#province_list div').removeClass(config.checkClass).find('img').remove();
					$(this).addClass(config.checkClass).append('<img src="' + config.checkImg + '" />');
					$('#city_list').html("");
					$(cityJson.RECORDS).each(function() {
						if(this.province_id == provinceId) {
							$('#city_list').append('<div cityId="' + this.id + '">' + this.city_name + '</div>')
						}
						city_scroll.refresh();
					});
					city_scroll.refresh();
					$('#address_menu div').eq(0).html(provinceName).attr('provinceId', provinceId).find('img').remove();
					$('#address_menu').append('<div id="city">请选择<span style="border-bottom:3px solid ' + config.borderColor + '"></span></div>');
					$('#province_page').removeClass(page_in).addClass('cp_left_out');
					$('#city_page').show().removeClass(page_out).addClass('cp_right_in');
					$('#province').unbind('click').click(function() {
						$('#city_page,#area_page').removeClass(page_in).addClass('cp_right_out');
						$('#province_page').show().removeClass(page_out).addClass('cp_left_in');
						$('#city,#area').remove();
						province_scroll.refresh();
						$('#province').append('<span style="border-bottom:3px solid ' + config.borderColor + '"></span>');
					});
					$('#city_list div').unbind('click').click(function() {
						var cityName = $(this).html();
						var cityId = $(this).attr('cityId');
						if(config.selectArea) {
							$('#city_list div').removeClass(config.checkClass).find('img').remove();
							$(this).addClass(config.checkClass).append('<img src="' + config.checkImg + '" />');
							$('#area_list').html('');
							$(areaJson.RECORDS).each(function() {
								if(this.city_id == cityId) {
									$('#area_list').append('<div provinceId="' + this.id + '">' + this.area_name + '</div>');
									area_scroll.refresh();
								}
							});
							area_scroll.refresh();
							$('#address_menu div').eq(1).html(cityName).attr('cityId', cityId).find('img').remove();
							$('#address_menu').append('<div id="area">请选择<span style="border-bottom:3px solid ' + config.borderColor + '"></span></div>');
							$('#city_page').removeClass(page_in).addClass('cp_left_out');
							$('#area_page').show().removeClass(page_out).addClass('cp_right_in');
							$('#city').unbind('click').click(function() {
								$('#area_page').removeClass(page_in).addClass('cp_right_out');
								$('#city_page').show().removeClass(page_out).addClass('cp_left_in');
								$('#area').remove();
								$('#city').append('<span style="border-bottom:3px solid ' + config.borderColor + '"></span>');
								city_scroll.refresh();
							});
							$('#area_list div').unbind('click').click(function() {
								var areaName = $(this).html();
								var areaId = $(this).attr('areaId');
								$('#area_list div').removeClass(config.checkClass).find('img').remove();
								$(this).addClass(config.checkClass).append('<img src="' + config.checkImg + '" />');
								$('#address_menu div').eq(2).html(areaName).attr('areaId', areaId).append('<span style="border-bottom:3px solid ' + config.borderColor + '">').find('img').remove();
								$('#cp_head').click();
								if(config.callback) {
									config.callback({
										provinceId: $('#address_menu div').eq(0).attr('provinceId'),
										provinceName: $('#address_menu div').eq(0).html(),
										cityId: $('#address_menu div').eq(1).attr('cityId'),
										cityName: $('#address_menu div').eq(1).html(),
										areaId: areaId,
										areaName: areaName
									});
								}
							});
						} else {
							$('#cp_head').click();
							$('#city_list div').removeClass(config.checkClass).find('img').remove();
							$(this).addClass(config.checkClass).append('<img src="' + config.checkImg + '" />');
							$('#address_menu div').eq(1).html(cityName).attr('cityId', cityId).find('img').remove();
							$('#city').append('<span style="border-bottom:3px solid ' + config.borderColor + '"></span>');
							if(config.callback) {
								config.callback({
									provinceId: $('#address_menu div').eq(0).attr('provinceId'),
									provinceName: $('#address_menu div').eq(0).html(),
									cityId: $('#address_menu div').eq(1).attr('cityId'),
									cityName: $('#address_menu div').eq(1).html(),
								});
							}
						}
					});
				});
			}
		} else {
			if($('#ios_cpicker .city').length > 0) {
				$('#ios_cpicker_mask').show().css('opacity', '0.5');
				$('#ios_cpicker').removeClass('pickerDown').addClass('pickerUp');
				return;
			}
			$('#ios_cpicker_mask,#ios_cpicker').remove();
			$('body').append('<div id="ios_cpicker_mask"></div><div id="ios_cpicker" class="pickerUp"><div id="c_header"><div id="cpicker_cancle">取消</div><div id="cpicker_ok">确定</div></div><div id="c_title"><div>省</div><div>市</div><div>区</div></div><div id="c_body"><div id="c_selecter_top"></div><div id="c_selecter_fotter"></div></div></div>');
			$('#c_body').append('<div id="ios_province_wrapper"><div><div></div><div></div><div class="end_province"></div><div></div><div></div><div></div></div></div>');
			$('#c_body').append('<div id="ios_city_wrapper"><div><div></div><div></div><div class="end_city"></div><div></div><div></div><div></div></div></div>');
			$('#c_body').append('<div id="ios_area_wrapper"><div><div></div><div></div><div class="end_area"></div><div></div><div></div><div></div></div></div>');
			$('#ios_province_wrapper,#ios_city_wrapper,#ios_area_wrapper').height(280);
			province_scroll = new iScroll('ios_province_wrapper', {
				scrollbarClass: 'myScrollbar',
				bounce: false,
				snap: 'div',
				onScrollEnd: function() {
					$('.city,.area').remove();
					loadCity($('.province').eq(-province_scroll.y / 40).attr('provinceId'));
				}
			});
			city_scroll = new iScroll('ios_city_wrapper', {
				scrollbarClass: 'myScrollbar',
				bounce: false,
				snap: 'div',
				onScrollEnd: function() {
					$('.area').remove();
					loadArea($('.city').eq(-city_scroll.y / 40).attr('cityId'));
				}
			});
			area_scroll = new iScroll('ios_area_wrapper', {
				scrollbarClass: 'myScrollbar',
				bounce: false,
				snap: 'div'
			});
			$(provinceJson.RECORDS).each(function() {
				$('<div class="province" provinceId="' + this.id + '">' + this.province_name + '</div>').insertBefore('.end_province');
			});
			loadCity($('.province').eq(0).attr('provinceId'));
			province_scroll.refresh();

			function loadCity(provinceId) {
				$(cityJson.RECORDS).each(function() {
					if(this.province_id == provinceId) {
						$('<div class="city" cityId="' + this.id + '">' + this.city_name + '</div>').insertBefore('.end_city');
					}
				});
				loadArea($('.city').eq(0).attr('cityId'));
				$('#ios_city_wrapper').fadeIn(100);
				city_scroll.refresh();
			}

			function loadArea(cityId) {
				$(areaJson.RECORDS).each(function() {
					if(this.city_id == cityId) {
						$('<div class="area" areaId="' + this.id + '">' + this.area_name + '</div>').insertBefore('.end_area');
					}
				});
				$('#ios_area_wrapper').fadeIn(100);
				area_scroll.refresh();
				area_scroll.scrollTo(0, 0, 0);
			}
			$('#cpicker_ok').click(function() {
				if(config.callback) {
					config.callback({
						provinceId: $('.province').eq(-province_scroll.y / 40).attr('provinceId'),
						provinceName: $('.province').eq(-province_scroll.y / 40).html(),
						cityId: $('.city').eq(-city_scroll.y / 40).attr('cityId'),
						cityName: $('.city').eq(-city_scroll.y / 40).html(),
						areaId: $('.area').eq(-area_scroll.y / 40).attr('areaId'),
						areaName: $('.area').eq(-area_scroll.y / 40).html()
					});
				}
				$('#cpicker_cancle').click();
			});
			$('#cpicker_cancle,#ios_cpicker_mask').click(function() {
				$('#ios_cpicker_mask').hide();
				$('#ios_cpicker').removeClass('pickerUp').addClass('pickerDown');
			});
		}
	}

	function cityPicker(params) {
		config = {
			selector: $('#citypicker'),
			layout: 1,
			headBg: '#0097FF',
			headColor: 'white',
			headTxt: '地址选择',
			borderColor: '#0097FF',
			backImg: 'images/icons/left.png',
			checkClass: 'cp_check',
			checkImg: 'images/icons/checkImg.png',
			selectArea: true,
			callback: null,
		};
		$.extend(config, params);
		if(provinceJson == null) {
			loadDate(function() {
				initPicker();
			});
		} else {
			initPicker();
		}

	}
	var exports = {
		cityPicker: function(params) {
			cityPicker(params);
		}
	};
	module.exports = exports;
});