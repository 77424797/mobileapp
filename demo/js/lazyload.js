var lazyload = (function() {
    U.fillHead('#lazyload_wrapper');
	var scroll;
	initPage();

	function initPage() {
		initIscroll();
	}

	function initIscroll() {
		$('#lazyload_wrapper').height($(window).height() - 45);
		scroll = new iScroll("lazyload_wrapper", {
			scrollbarClass: 'myScrollbar',
			useTransition: false,
			onScrollMove: function() {
				I.lazyload({'lazyImages':_('.lazyload'),'height':$('#lazyload_wrapper').height(),'scroll':this});
			},
			onScrollEnd: function() {
				I.lazyload({'lazyImages':_('.lazyload'),'height':$('#lazyload_wrapper').height(),'scroll':this});
			}
		});
		I.lazyload({'lazyImages':_('.lazyload'),'height':$('#lazyload_wrapper').height(),'scroll':scroll});
	}
	return {'initPage': function() {
			return null;
		}
	};
})()