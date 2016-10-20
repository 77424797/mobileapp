var index=(function(){
    U.fillHead('#wrapper');
	var scroll = I.initIscroll('wrapper', 45);
	initPage();
	
	function initEvent() {
		_('.menu div').eq(0).uclick(function() {
			location.href = '#demo/dialog.html';
		});
		_('.menu div').eq(1).uclick(function() {
			location.href = '#demo/iscroll.html';
		});
		_('.menu div').eq(2).uclick(function() {
			location.href = '#demo/date.html';
		});
		_('.menu div').eq(3).uclick(function() {
			location.href = '#demo/selector.html';
		});
		_('.menu div').eq(4).uclick(function() {
			location.href = '#demo/waterfall.html';
		});
		_('.menu div').eq(5).uclick(function() {
			location.href = '#demo/lazyload.html';
		});
		_('.menu div').eq(6).uclick(function() {
			location.href = '#demo/citypicker.html';
		});
		_('.menu div').eq(7).uclick(function() {
			location.href = '#demo/zsmap.html';
		});
		_('.menu div').eq(8).uclick(function() {
			location.href = '#demo/preview.html';
		});
		_('.menu div').eq(9).uclick(function() {
			location.href = '#demo/pull.html';
		});
		_('.menu div').eq(10).uclick(function() {
			location.href = '#demo/drag.html';
		});
		_('.menu div').eq(11).uclick(function() {
			location.href = '#demo/clip_image.html';
		});
	}
	function initPage() {
		initEvent();
	}
	return {'initPage':function(){
		return null;
	}};
})()
