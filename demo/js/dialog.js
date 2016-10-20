var dialog=(function(){
    U.fillHead('#dialog_wrapper');
	var scroll = I.initIscroll('dialog_wrapper', 45);
	initPage();
	function initEvent() {
		_('.menu div').eq(0).uclick(function(){//成功弹框
			console.info(1)
			D.toast(true,'我是成功',function(){//回调
				_('.menu div').eq(0).html('成功回调');
			})
		});
		_('.menu div').eq(1).uclick(function(){//失败弹框
			D.toast(false,'我是失败',function(){//回调
				_('.menu div').eq(1).html('失败回调');
			})
		});
		_('.menu div').eq(2).uclick(function(){//确定or取消
			D.okCancle({'txt':'我是提示文字','okTxt':'我是确定文字','ok':function(){//确定回调
				_('.menu div').eq(2).html('确定回调');
			},'cancle':function(){//取消回调
				_('.menu div').eq(2).html('取消回调');
			}})
		});
		_('.menu div').eq(3).uclick(function(){
			D.confirm({'txt':'我是提示内容','title':'我的提示标题','ok':function(){
				_('.menu div').eq(3).html('确定回调');
			},'cancle':function(){//取消回调
				_('.menu div').eq(3).html('取消回调');
			}})
		});
		_('.menu div').eq(4).uclick(function(){//确定or取消
			D.tip({'callback':function(){
				D.toast(true,'回调');
			}});
		});
		_('.menu div').eq(5).uclick(function(){
			D.confirmInput({'txt':'请输入姓名','title':'标题','ok':function(result){
				D.toast(true,result);
			},'cancle':function(result){//取消回调
				D.toast(false,result);
			}})
		});
	}
	
	function initPage() {
		initEvent();
	}
	return {'initPage':function(){
		return initPage();
	}};
})()
