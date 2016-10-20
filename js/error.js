var error=(function(){
	var scroll=I.initIscroll('error_wrapper',0);
	initPage();
	function initPage(){
		initEvent();
	}
	function initEvent(){
		_('.back').uclick(function(){
			history.go(-1);
		});
	}
	return {'initPage':function(){
		return initPage();
	}}
})();
