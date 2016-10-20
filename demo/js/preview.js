var preview=(function(){
    U.fillHead('#preview_wrapper');
	var scroll = I.initIscroll('preview_wrapper', 45);
	initPage();
	function initPage() {
		I.initPreview({'selector':_('.prevoewImg')});
	}
	return {'initPage':function(){
		return null;
	}};
})()
