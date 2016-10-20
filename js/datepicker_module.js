/**
 * author			zk(QQ:77424797)
 * date				2016-08-17
 * 
 * 	时间选择器
 * 	params		参数
 * 	selector		选择器
 * 	format		日期格式
 * 	minYear		最小年份
 * 	maxYear		最大年份
 * 	initial		初始化时间
 *  -------------------------------
 * 	css文件		datepicker.css
 */
define(['zepto.min.js','iscroll.min.js'],function(require, exports, module){
	function datePicker(params){
		var config={
			selector:'#datepicker',
			format:'yyyy-MM-dd HH:mm',
			minYear:new Date().getFullYear(),
			maxYear:new Date().getFullYear()+100,
			initial:(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds()),
			selectYear:new Date().getFullYear(),
			selectMonth:new Date().getMonth()+1
		};
		$.extend(config, params);
		config.selector.uclick(function(){
			$('#dpicker_mask,#dpicker').remove();
			$('body').append('<div id="dpicker_mask"></div><div id="dpicker" class="pickerUp"><div id="d_header"><div id="dpicker_cancle">取消</div><div id="dpicker_ok">确定</div></div><div id="d_title"></div><div id="d_body"><div id="d_selecter_top"></div><div id="d_selecter_fotter"></div></div></div>');
			var year_scroll,month_scroll,day_scroll,hour_scroll,minute_scroll,max,showCount=0;
			if(config.format.indexOf('yyyy')>-1){
				$('#d_title').append('<div>年</div><div>月</div><div>日</div>');
				$('#d_body').append('<div id="year_wrapper"><div><div class="d_year"></div><div class="d_year"></div><div class="d_year end_year"></div><div class="d_year"></div><div class="d_year"></div><div class="d_year"></div></div></div>');
				$('#d_body').append('<div id="month_wrapper"><div><div class="d_month"></div><div class="d_month"></div><div class="d_month end_month"></div><div class="d_month"></div><div class="d_month"></div><div class="d_month"></div></div></div>');
				$('#year_wrapper,#month_wrapper').height(280);
				for(var i=config.minYear;i<=config.maxYear;i++){$('<div class="d_year">'+i+'</div>').insertBefore('.end_year');}
				for(var i=1;i<=12;i++){$('<div class="d_month">'+(i<10?'0'+i:i)+'</div>').insertBefore('.end_month');}
				year_scroll=new iScroll('year_wrapper',{scrollbarClass: 'myScrollbar',bounce:false,snap: 'div',
					onScrollEnd: function () {
						config.selectYear=$('.d_year').eq(-this.y/40+2).html();
						if(config.selectYear !=null && config.selectYear!=""){
							loadDay();
						}
				    }
				});
				month_scroll=new iScroll('month_wrapper',{scrollbarClass: 'myScrollbar',bounce:false,snap: 'div',
					onScrollEnd: function () {
						config.selectMonth=$('.d_month').eq(-this.y/40+2).html();
						if(config.selectMonth !=null && config.selectMonth!=""){
							loadDay();
						}
				    }
				});
				loadDay();
				showCount+=3;
			}
			function loadDay(){
				max = new Date(config.selectYear,config.selectMonth,0).getDate();
				if($('#day_wrapper').length>0){
					var diff=max-($('.d_day').length-6);
					if(diff<0){
						for(var i=diff;i<0;i++){$('.end_day').prev().remove();}
					}else{
						for(var i=diff;i>0;i--){$('<div class="d_day">'+(parseInt($('.end_day').prev().html())+1)+'</div>').insertBefore('.end_day');}
					}
					day_scroll.refresh();
				}else{
					$('<div id="day_wrapper"><div><div class="d_day"></div><div class="d_day"></div><div class="d_day end_day"></div><div class="d_day"></div><div class="d_day"></div><div class="d_day"></div</div></div>').insertAfter('#month_wrapper');
					for(var i=1;i<=max;i++){$('<div class="d_day">'+(i<10?'0'+i:i)+'</div>').insertBefore('.end_day');}
					$('#day_wrapper').height(280);
					day_scroll=new iScroll('day_wrapper',{ scrollbarClass: 'myScrollbar','bounce':false,snap: 'div'});
				}
			}
			if(config.format.indexOf('HH')>-1){
				$('#d_title').append('<div>时</div><div>分</div>');
				$('#d_body').append('<div id="hour_wrapper"><div><div class="d_hour"></div><div class="d_hour"></div><div class="d_hour end_hour"></div><div class="d_hour"></div><div class="d_hour"></div><div class="d_hour"></div></div></div>');
				$('#d_body').append('<div id="minute_wrapper"><div><div class="d_minute"></div><div class="d_minute"></div><div class="d_minute end_minute"></div><div class="d_minute"></div><div class="d_minute"></div><div class="d_minute"></div></div></div>');
				for(var i=0;i<=23;i++){$('<div class="d_hour">'+(i<10?'0'+i:i)+'</div>').insertBefore('.end_hour');}
				for(var i=0;i<=59;i++){$('<div class="d_minute">'+(i<10?'0'+i:i)+'</div>').insertBefore('.end_minute');}
				$('#hour_wrapper,#minute_wrapper').height(280);
				hour_scroll=new iScroll('hour_wrapper',{ scrollbarClass: 'myScrollbar','bounce':false,snap: 'div'});
				minute_scroll=new iScroll('minute_wrapper',{ scrollbarClass: 'myScrollbar','bounce':false,snap: 'div'});
				showCount+=2;
			}
			$('#year_wrapper,#month_wrapper,#day_wrapper,#hour_wrapper,#minute_wrapper,#d_title div').css({'width':(100/showCount)+"%"});
			var nowTime=config.selector.html()==""&&config.selector.html()!=null?config.initial:config.selector.html();
			var formatReg=/^[0-9]{4}-[0][1-9]|[10-12]{1}-[0][1-9]|[10-31]$/;
			if(nowTime!=null && nowTime!="" && formatReg.test(nowTime)){
				if(config.format.indexOf('yyyy')>-1){
					var year=nowTime.substring(0,nowTime.indexOf('-'));
					year_scroll.scrollTo(0,-(year-$('.d_year').eq(2).html())*40,0);
					var month=nowTime.substring(nowTime.indexOf('-')+1,nowTime.lastIndexOf('-'));
					month_scroll.scrollTo(0,-(month-$('.d_month').eq(2).html())*40,0);
					var day=nowTime.substring(nowTime.lastIndexOf('-')+1,nowTime.lastIndexOf('-')+3);
					day_scroll.scrollTo(0,-(day-$('.d_day').eq(2).html())*40,0);
				}
				if(config.format.indexOf('HH')>-1){
					var hour=nowTime.substring(nowTime.indexOf(':')-2,nowTime.indexOf(':'));
					hour_scroll.scrollTo(0,-(hour-$('.d_hour').eq(2).html())*40,0);
					var minute=nowTime.substring(nowTime.indexOf(':')+1,nowTime.lastIndexOf(':'));
					minute_scroll.scrollTo(0,-(minute-$('.d_minute').eq(2).html())*40,0);
				}
			}
			$('#dpicker_ok').click(function(){
				var time;
				if(config.format.indexOf('yyyy')>-1 && config.format.indexOf('HH')>-1){
					var year=$('.d_year').eq(-year_scroll.y/40+2).html();
					var month=$('.d_month').eq(-month_scroll.y/40+2).html();
					var day=$('.d_day').eq(-day_scroll.y/40+2).html();
					var hour=$('.d_hour').eq(-hour_scroll.y/40+2).html();
					var minute=$('.d_minute').eq(-minute_scroll.y/40+2).html();
					time=year+'-'+month+'-'+day+' '+hour+':'+minute+':00';
				}else if(config.format.indexOf('yyyy')>-1){
					var year=$('.d_year').eq(-year_scroll.y/40+2).html();
					var month=$('.d_month').eq(-month_scroll.y/40+2).html();
					var day=$('.d_day').eq(-day_scroll.y/40+2).html();
					time=year+'-'+month+'-'+day;
				}else if(config.format.indexOf('HH')>-1){
					var hour=$('.d_hour').eq(-hour_scroll.y/40+2).html();
					var minute=$('.d_minute').eq(-minute_scroll.y/40+2).html();
					time=hour+':'+minute+':00';
				}
				config.selector.html(time);
				$('#dpicker_cancle').click();
			});
			$('#dpicker_cancle,#dpicker_mask').click(function(){
				$('#dpicker_mask').hide();
				$('#dpicker').removeClass('pickerUp').addClass('pickerDown');
			});
		});
		
	}
	var exports = {
		datePicker:function(params){//初始化日期选择控件
			datePicker(params);
		}
	};
	module.exports = exports;
}); 