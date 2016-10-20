var citypicker=(function(){
    U.fillHead('#citypicker_wrapper');
	var scroll = I.initIscroll('citypicker_wrapper', 45);
	initPage();
	function initEvent(){
		_('.menu div').eq(0).uclick(function(event){
			C.cityPicker({
				'callback': function(json) {
					_('.menu div').eq(0).html(json.provinceName+json.cityName+json.areaName);
				}
			});
		});
		_('.menu div').eq(1).uclick(function(event){
			C.cityPicker({
				'layout':2,
				'callback': function(json) {
					_('.menu div').eq(1).html(json.provinceName+json.cityName+json.areaName);
				}
			});
		});
	}
	function initPage() {
		initEvent();
	}
	return {'initPage':function(){
		return null;
	}};
})()
