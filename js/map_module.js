/**
 * author			zk(QQ:77424797)
 * date				2016-09-01
 * 百度地图 坐标、城市、两点距离、地图
 */
define(['zepto.min.js', 'dialog_module.js'], function(require, exports, module) {
	var D = require('dialog_module');
	var exports = {
		//获取当前坐标
		getLocation: function(callback) {
			var options = {
				enableHighAccuracy: true,
				maximumAge: 1000
			}
			var position = {
				'success': false,
				'longitude': 113.711664,
				'latitude': 22.996389
			};
			D.toast(true, '正在定位...');
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					//地理位置获取成功
					position['success'] = true;
					position['longitude'] = position.coords.longitude; //经度
					position['latitude'] = position.coords.latitude; //纬度
					callback(position);
				}, function(error) {
					//地址位置获取失败
					switch(error.code) {
						case 1:
							D.toast(false, "位置服务被拒绝");
							break;
						case 2:
							D.toast(false, "暂时获取不到位置信息");
							break;
						case 3:
							D.toast(false, "获取信息超时");
							break;
						case 4:
							D.toast(false, "未知错误");
							break;
					}
					callback(position);
				}, options);
			} else {
				D.toast(false, '不支持获取地理位置！');
				callback(position);
			}
		},
		//通过坐标获取当前地址
		getAddressByLocation: function(longitude, latitude, callback) {
			D.loadOpt(true);
			$.ajax({
				url: 'http://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&callback=renderReverse&location=' + latitude + ',' + longitude + '&output=json&pois=1',
				type: "get",
				dataType: "jsonp",
				jsonp: "callback",
				success: function(data) {
					var address = {
						country: data.result.addressComponent.country, //国家
						province: data.result.addressComponent.province, //省区
						city: data.result.addressComponent.city, //城市
						district: data.result.addressComponent.district, //区县
						street: data.result.addressComponent.street, //街道
						formatted_address: data.result.formatted_address, //完整地址
						longitude: longitude, //经度
						latitude: latitude //纬度
					};
					D.loadOpt(false);
					if(typeof callback == "function") {
						callback(address);
					}
				}
			});
		},
		//根据坐标获取两点距离
		getDistance: function(lat1, lng1, lat2, lng2) {
			var radLat1 = lat1 * Math.PI / 180.0;
			var radLat2 = lat2 * Math.PI / 180.0;
			var a = radLat1 - radLat2;
			var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
			var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
			s = s * 6378137.0 / 1000; //单位km
			s = Math.round(s * 10000) / 10000.0;
			return s.toFixed(2);
		},
		//初始化地图
		initMap: function(conf) {
			var config = {
				container: 'map',
				longitude: 113.711664,
				latitude: 22.996389,
				height: $(window).height(),
				callback: null
			}
			$.extend(config, conf);
			var map = new BMap.Map(config.container);
			var point = new BMap.Point(config.longitude, config.latitude); //定义一个中心点坐标
			map.centerAndZoom(point, 17);
			marker = new BMap.Marker(point);
			map.addOverlay(marker);
			$('#' + config.container).height(config.height);
			if(config.callback) {
				config.callback();
			}
		},
		//GPS转换成百度坐标.
		convertorBd:function(longitude,latitude,callback){
			seajs.use(['http://developer.baidu.com/map/jsdemo/demo/convertor.js'],function(){
				BMap.Convertor.translate(new BMap.Point(longitude,latitude),0,callback);
			});
		},
		//百度坐标转换成火星坐标
		bdConverToGPS:function(longitude,latitude){
			var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
			var x = longitude - 0.0065
			var y = latitude - 0.006;  
		    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);  
		    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);  
		    gg_lon = z * Math.cos(theta);  
		    gg_lat = z * Math.sin(theta);
		    return {"lng":gg_lon,"lat":gg_lat};
		},
		//打开导航页面
		toNavigation: function(conf) {
			var config = {
				longitude: 113.711664,
				latitude: 22.996389,
			}
			$.extend(config, conf);
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger') {
				var point = exports.bdConverToGPS(config.longitude, config.latitude);
				$.getJSON('http://pay.52pb.net/wxcore/jssdk?callback=?&appId=wx30c8fd970ac0c480&url=' + location.href, function(json) {
					seajs.use(['jweixin-1.0.0.js'], function(wx) {
						wx.config({
							debug: false,
							appId: json.params.appid,
							timestamp: json.params.timestamp,
							nonceStr: json.params.nonceStr,
							signature: json.params.signature,
							jsApiList: ['openLocation']
						});
						wx.openLocation({
							latitude: point.lat, // 纬度
							longitude: point.lng, // 经度
							name: config.name, // 位置名
							address: config.name, // 地址详情说明
							scale: 25, // 地图缩放级别,整形值,范围从1~28。默认为最大
							infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
						});
					});
				});
			} else {
				location.href = 'http://api.map.baidu.com/marker?location=' + config.latitude + ',' + config.longitude + '&title=' + config.name + '&name=' + config.name + '&content=' + config.name + '&output=html&src=weiba|weiweb';
			}
		}
	};
	module.exports = exports;
});