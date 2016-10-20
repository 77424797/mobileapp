var date=(function(){
    U.fillHead('#date_wrapper');
	var scroll = I.initIscroll('date_wrapper', 45);
	initPage();
	function initEvent(){
	}
	function initPage() {
		Dt.datePicker({selector:_('.menu div').eq(0),format:'yyyy-MM-dd','minYear':2000});
		Dt.datePicker({selector:_('.menu div').eq(1),format:'yyyy-MM-dd HH:mm:ss',minYear:2000});
		initEvent();
	}
	return {'initPage':function(){
		return null;
	}};
})()
