var zsmap=(function(){
    U.fillHead('#zsmap_wrapper');
	var scroll = I.initIscroll('zsmap_wrapper', 45);
	var myLocation;
	initPage();
	function initEvent(){
		_('.menu div').eq(0).unbind('click').click(function(){
			M.getLocation(function(json){
				myLocation=json;
				_('.menu div').eq(0).html('经度:'+json.longitude+',纬度:'+json.latitude);
			});
		});
		_('.menu div').eq(1).unbind('click').click(function(){
			if(myLocation==null){
				M.getLocation(function(json){
					myLocation=json;
					M.getAddressByLocation(myLocation.longitude,myLocation.latitude,function(json){
						_('.menu div').eq(1).html(json.formatted_address);
					});
				});
			}else{
				M.getAddressByLocation(myLocation.longitude,myLocation.latitude,function(json){
					_('.menu div').eq(1).html(json.formatted_address);
				});
			}
		});
		_('.menu div').eq(2).unbind('click').click(function(){
	      	location.href='#demo/bmap.html';
		});
		_('.menu div').eq(3).unbind('click').click(function(){
	      	if(myLocation==null){
				M.getLocation(function(json){
					myLocation=json;
					M.toNavigation({longitude:myLocation.longitude,latitude:myLocation.latitude,name:'天安数码城'});
				});
			}else{
				M.toNavigation({longitude:myLocation.longitude,latitude:myLocation.latitude,name:'天安数码城'});
			}
		});
	}
	function initPage() {
		initEvent();
	}
	return {'initPage':function(){
		return null;
	}};
})()
