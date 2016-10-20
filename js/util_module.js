/**
 * author			zk(QQ:77424797)
 * date				2016-08-01
 * 
 * 工具模块
 */
define(['zepto.min.js','dialog_module.js'],function(require, exports, module){
	var M = require('dialog_module');
	
	function getRootPath(){
	    var curWwwPath=window.document.location.href;
	    var pathName=window.document.location.pathname;
	    var pos=curWwwPath.indexOf(pathName);
	    var localhostPaht=curWwwPath.substring(0,pos);
	    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	    return(localhostPaht+projectName);
	}
	function getBasePath(){
	    var curWwwPath=window.document.location.href;
	    var pathName=window.document.location.pathname;
	    var pos=curWwwPath.indexOf(pathName);
	    var localhostPaht=curWwwPath.substring(0,pos);
	    return(localhostPaht);
	}
	var homeurl = getRootPath();
	var basepath=getBasePath();
	//读取cookie的值
	function readCookie(name) {
		var cookieValue = "";
		var search = name + "=";
		if (document.cookie.length > 0) {
			offset = document.cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length;
				end = document.cookie.indexOf(";", offset);
				if (end == -1)
					end = document.cookie.length;
					cookieValue = decodeURIComponent(document.cookie.substring(offset, end));
			}
		}
		return cookieValue;
	};
	function removeCookie(name){
		writeCookie(name, "", -1);  
	}
	//写入cookie
	function writeCookie(name, value, time) {
		var expire = "";
		if (time) {
			expire = new Date((new Date()).getTime() + time);
			expire = "; expires=" + expire.toGMTString();
		}

		document.cookie = name + "=" + encodeURIComponent(value) + "; path=/"+ expire;
	};
	function getParam(name) {
		var url=location.href;
		var paramsArray=url.split('?');
		var params={};
		$(paramsArray).each(function(i){
			if(i>0){
				params[this.substring(0,this.indexOf('='))]=this.substring(this.indexOf('=')+1,this.length);
			}
		})
		return params[name];
	}
	function removeUrlParam(url,name) {
		var i2 = new RegExp('[\?]' + name + '([=]*)([^&]*)', 'i');
		if (url.match(i2) != null) {
			return url.replace(i2, '');
		}
	}
	function isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
	}
	function request(type,url,data,async,callback){
		$.ajax({
			type : type,
			url : basepath+'/apiModule/'+url,
			//url : 'http://192.168.1.124:8080/apiModule/'+url,
			data :data,
			async : async,
			dataType : "json",
			success : function(json) {
				if(callback){
					callback(json);
				}else{
					console.log('error:'+url);
				}
			}
		});
	}
	function ajax(url,data,callback){
		request('post',url,data,true,callback);
	}
	
	function ajaxAsync(url,data,callback){
		request('post',url,data,false,callback);
	}
	var exports = {
			homeurl:homeurl,
			basepath:basepath,
			imageurl:'http://192.168.1.34:8888/',
			getParam:getParam,
			writeCookie:function(name, value, time){
				writeCookie(name, value, time);
			},
			removeCookie:function(name){
				removeCookie(name);
			},
			readCookie:function(name){
				return readCookie(name);
			},
			isWeiXin:isWeiXin,
			getWxUser:function(){
				getWxUser();
			},
			ajax:function(url,data,callback){
				ajax(url,data,callback);
			},
			ajaxAsync:function(url,data,callback){
				ajaxAsync(url,data,callback);
			},
			//填充顶部导航
			fillHead:function(selector){
				$(selector).append('<header>'+
										'<div class="back" style="width:45px;height:45px;position:absolute;z-index:1;">'+
											'<img src="images/icons/left.png" style="position:absolute;width:100%;"/>'+
										'</div>'+
										'<div style="position:absolute;top:0px;width:100%;max-width:640px;text-align:center;">'+$('title').html()+'</div>'+
									'</header>');
				$(selector+' header').css({'color':'white','position':'absolute','top':'0px','z-index':'10','width':'100%','max-width':'640px','height':'45px','line-height':'45px','font-size':'17px','background-color':'#0097FF'});
				$(selector+' .back').uclick(function(){history.go(-1);});
			},
			//填充底部菜单
			fillFooter:function(selector){
				var footer = $('<fotter style="border-top:1px solid #E6E6E6"></div>');
				footer.css({'z-index':'10','position':'absolute','color':'white','bottom':'-50px','width':'100%','height':'50px','background-color':'#0097FF','font-size': '12px','max-width':'640px','font-family':'Microsoft YaHei'});
				var menus = [{'log':'menuIcon.png','txt':'菜单'},
							{'log':'menuIcon.png','txt':'菜单'},
							{'log':'menuIcon.png','txt':'菜单'},
							{'log':'menuIcon.png','txt':'菜单'},
							{'log':'menuIcon.png','txt':'菜单'},
				];
				for(var i=0;i<menus.length;i++){
					footer.append('<div style="width: 20%;float: left;text-align: center;" class="ci_item"><img style="height:25px!important;margin-top: 5px;" src="images/icons/'+menus[i].log+'"/><div style="height:25px;line-height:25px;margin-top: -5px;" class="ci_txt">'+menus[i].txt+'</div></div>');
				}
				$(selector).append(footer);
				footer.find('.ci_item').click(function(){
					var selMenu = $(selector+' footer').find('.selMenu');
					if(selMenu!=null&&selMenu.length>0){
						selMenu.css('color','#969696');	
					}
					$(this).css('color','#17A1FE');
					var index = $(this).index();
					if(index==0){
					}if(index==1){
					}if(index==2){
					}if(index==3){
					}if(index==4){
					}
				});
			},
			dragElement:function(dom){//拖动元素
			  	var element =dom[0] ;
			  	var oW,oH;
			  	element.addEventListener("touchstart", function(e) {
				console.info(1)
			  		var touches = e.touches[0];
			   		oW = touches.clientX - element.offsetLeft;
			   		oH = touches.clientY - element.offsetTop;
			   		document.addEventListener("touchmove",defaultEvent,false);//阻止页面的滑动默认事件
			  	},false);
			  	element.addEventListener("touchmove", function(e) {
				   	var touches = e.touches[0];
				   	var oLeft = touches.clientX - oW;
				   	var oTop = touches.clientY - oH;
				   	if(oLeft < 0) {
				    	oLeft = 0;
				   	}else if(oLeft > document.documentElement.clientWidth - element.offsetWidth) {
				    	oLeft = (document.documentElement.clientWidth - element.offsetWidth);
				   	}
				   	element.style.left = oLeft + "px";
				   	element.style.top = oTop + "px";
			 	},false);
			  	element.addEventListener("touchend",function() {
			   		document.removeEventListener("touchmove",defaultEvent,false);
			  	},false);
			  	function defaultEvent(e) {
			   		e.preventDefault();
			  	}
			}
	};
	module.exports = exports;
}); 