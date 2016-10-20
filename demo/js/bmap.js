var bmap=(function(){
    U.fillHead('#bmap_wrapper');
	var myLocation;
	initPage();
	function initPage() {
		if(myLocation==null){
			M.getLocation(function(json){
				myLocation=json;
				M.initMap({'longitude':myLocation.longitude,'latitude':myLocation.latitude});
			});
		}else{
			M.initMap({'longitude':myLocation.longitude,'latitude':myLocation.latitude});
		}
	}
	return {'initPage':function(){
		return initPage();
	}};
})()
