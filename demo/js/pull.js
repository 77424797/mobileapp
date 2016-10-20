var pull=(function(){
    U.fillHead('#pull_wrapper');
	var scroll;
	initIscroll();
	initPage();
	function initPage() {
		$('.content').html('');
		loadDate();
	}
	function loadDate(){
		var images=['http://www.freshtimess.com:8889//uploadfile/product_other_images/20160829172635_19.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_images/20160824152634_866.png',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160823170835_136.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160830094631_842.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160829172635_19.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_images/20160824152634_866.png',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160823170835_136.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160830094631_842.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160829172635_19.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_images/20160824152634_866.png',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160823170835_136.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160830094631_842.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160823170835_136.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160830094631_842.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160823170835_136.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160830094631_842.jpg',
			'http://www.freshtimess.com:8889//uploadfile/product_other_images/20160729173631_940.jpg']
			W.loadWaterfall({'selector':_('.content'),'images':images,'count':3,'callback':function(){
				scroll.refresh();
			}});
			scroll.refresh();
	}
	function initIscroll(){
		$('#pull_wrapper').height($(window).height()-45);
		pullDownEl = document.getElementById('pull_pullDown');
		pullDownOffset = pullDownEl.offsetHeight;
		pullUpEl = document.getElementById('pull_pullUp');
		pullUpOffset = pullUpEl.offsetHeight;
		scroll = new iScroll('pull_wrapper', {
			scrollbarClass: 'myScrollbar',
			useTransition: false,
			topOffset: pullDownOffset,
			onRefresh: function() {
				if(pullDownEl.className.match('loading')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
					$(pullDownEl.querySelector('.pullDownIcon')).attr('src','images/icons/pullDown.png');
				} else if(pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
					$(pullUpEl.querySelector('.pullUpIcon')).attr('src','images/icons/pullUp.png');
				}
			},
			onScrollMove: function() {
				if(this.y > 15 && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
					$(pullDownEl.querySelector('.pullDownIcon')).attr('src','images/icons/pullUp.png');
					this.minScrollY = 0;
				} else if(this.y < 15 && pullDownEl.className.match('flip')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
					$(pullDownEl.querySelector('.pullDownIcon')).attr('src','images/icons/pullDown.png');
					this.minScrollY = -pullDownOffset;
				} else if(this.y < (this.maxScrollY - 15) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
					$(pullUpEl.querySelector('.pullUpIcon')).attr('src','images/icons/pullDown.png');
					this.maxScrollY = this.maxScrollY;
				} else if(this.y > (this.maxScrollY + 15) && pullUpEl.className.match('flip')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
					$(pullUpEl.querySelector('.pullUpIcon')).attr('src','images/icons/pullUp.png');
					this.maxScrollY = pullUpOffset;
				}
			},
			onScrollEnd: function() {
				if(pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
					$(pullDownEl.querySelector('.pullDownIcon')).attr('src','images/icons/refresh.gif');
					initPage();
				} else if(pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
					$(pullUpEl.querySelector('.pullUpIcon')).attr('src','images/icons/refresh.gif');
					loadDate();
				}
				I.backTop(scroll,$('#pull_wrapper'),35);
			}
		});
	}
	return {'initPage':function(){
		null;
	}}
})()
