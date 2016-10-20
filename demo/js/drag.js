var drag=(function(){
    U.fillHead('#drag_wrapper');
	var scroll = I.initIscroll('drag_wrapper', 45);
	initPage();
	function initPage() {
		U.dragElement($('#drag_wrapper .drag'));
		U.dragElement($('#drag_wrapper header'));
	}
	return {'initPage':function(){
		return initPage();
	}};
})()
