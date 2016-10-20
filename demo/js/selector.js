var selector=(function(){
    U.fillHead('#selector_wrapper');
	var scroll = I.initIscroll('selector_wrapper', 45);
	initPage();
	function initPage() {
		var array =['选择1','选择2','选择3','选择4','选择5'];
		D.initSelect({selector:_('.chose'),selectArray:array,callback:function(result){
			_('.chose').html(result);
		}});
	}
	return {'initPage':function(){
		return null;
	}};
})()
