var waterfall=(function(){
    U.fillHead('#waterfall_wrapper');
	var scroll = I.initIscroll('waterfall_wrapper', 45);
	initPage();
	function initEvent(){
		$('#waterfall_wrapper .more').unbind('click').click(function(){
				var images=['http://www.freshtimess.com:8889//uploadfile/product_other_images/20160829172635_19.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_images/20160824152634_866.png',
				'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160823170835_136.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160830094631_842.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_images/20160728162515_828.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160829172635_19.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_images/20160824152634_866.png',
				'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160823170835_136.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160830094631_842.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_images/20160728162515_828.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160829172635_19.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_images/20160824152634_866.png',
				'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160823170835_136.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
				'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160830094631_842.jpg']
				W.loadWaterfall({'images':images,'callback':function(){
					scroll.refresh();
				}});
			});
	}
	function initPage() {
		$('#waterfall').html('');
		var images=['http://www.freshtimess.com:8889//uploadfile/product_other_images/20160829172635_19.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_images/20160824152634_866.png',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160823170835_136.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160830094631_842.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_images/20160728162515_828.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160829172635_19.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_images/20160824152634_866.png',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160823170835_136.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160830094631_842.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_images/20160728162515_828.jpg',]
			W.loadWaterfall({'images':images,'count':3,'callback':function(){
				scroll.refresh();
			}});
			initEvent();
	}
	return {'initPage':function(){
	}}
})()
