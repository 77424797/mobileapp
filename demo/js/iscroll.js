var iscroll=(function(){
    U.fillHead('#iscroll_wrapper');
	var scroll = I.initIscroll('iscroll_wrapper', 45);
	initPage();
	function initPage() {
		var images =['images/banner.png','images/banner.png','images/banner.png','images/banner.png','images/banner.png'];
		I.initScrollImg({'images':images,'speed':2000});
	}
	return {'initPage':function(){
		return null;
	}};
})()
