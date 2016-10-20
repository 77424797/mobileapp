var clip_image = (function() {
    define(['clip_module.js'], function(require, exports, module) {
		var clip = require('clip_module');
		U.fillHead('#clip_image_wrapper');
		initPage();

		function initEvent() {
			clip.clipImage("#clip_image_wrapper .clip_area", {
				size: [200, 200],
				circle:true,
				outputSize: [100, 100],
				file: "#clip_image_wrapper .file",
				view: "#clip_image_wrapper .show",
				ok: "#clip_image_wrapper .clip_btn",
				loadStart: function() {
					D.loadOpt(true);
				},
				loadComplete: function() {
					D.loadOpt(false);
				},
				clipFinish: function(dataURL) {
				}
			});
			_('#clip_image_wrapper .upload_btn').uclick(function(){
				_('.file').click();
			});
			
		}

		function initPage() {
			initEvent();
		}
	});
	return {
		'initPage': function() {
			return null;
		}
	};
})()