function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}
var contextPath = getQueryString('contextPath');
if(typeof(contextPath) == 'undefined' || contextPath == null || contextPath == ''){
	contextPath = "";
}else{
	contextPath = "/"+contextPath;
}
var corpid = getQueryString('corpid');
var hash = 'f09cf7bb84a74fbe5285';
var _config;
var url = window.location.href;
var indexpos = url.indexOf("#");
if (indexpos > 0) {
	url = url.substring(0, indexpos);
}
var suiteKey = "";
var appid = getQueryString('appid');
if(appid== 3907 ){//排班
	suiteKey = "suitecq7s4oxjml7fuxph";
}
if( appid == 3944){//排班
	suiteKey = "suitehg6xf9ztjjswepxq";
}
if(appid== 3906 || appid== 4024 || appid== 4025){//公文
	suiteKey = "suitettsty8kmffyfiven";
}
if(appid == 3943 ){//公文)
	suiteKey = "suitekiwm4va2gobjwaxm";
}
if(appid== 3905){//报修
	suiteKey = "suite6vbaqzdreygzzz2q";
}  
if( appid == 3942){//报修
	suiteKey = "suitedzp4w2ovg0hnautn";
}
if(appid == 3835 || appid == 3844 || appid == 3845){
	suiteKey = "suitexezzlmy6ftlkv0zc";
}

if( appid==4048 ){
	suiteKey = "suitecmgwaty0he0eh1zd";
}

if( appid== 4049){
	suiteKey = "suited1ldwvcwsrn1wvgy";
}

if( appid== 4047){
	suiteKey = "suitersgovwhh7rf7pu25";
}
//信息-线上
if( appid== 3992){
	suiteKey = "suitep41lhgkbzhgs9uma";
}
//公文-204
if( appid== 5540){
	suiteKey = "suitepgkopqukd5anyath";
}

//会议-204
if( appid== 5541){
	suiteKey = "suitepgkopqukd5anyath";
}

//审批-204
if( appid== 5542){
	suiteKey = "suitepgkopqukd5anyath";
}

//信息-204
if( appid== 5543){
	suiteKey = "suitepgkopqukd5anyath";
}

//日程-204
if( appid== 5544){
	suiteKey = "suitepgkopqukd5anyath";
}

//任务-204
if( appid== 5545){
	suiteKey = "suitepgkopqukd5anyath";
}

//汇报-204
if( appid== 5546){
	suiteKey = "suitepgkopqukd5anyath";
}

//问卷-204
if( appid== 5548){
	suiteKey = "suitepgkopqukd5anyath";
}

//邮件-204
if( appid== 5549){
	suiteKey = "suitepgkopqukd5anyath";
}

//论坛-204
if( appid== 5550){
	suiteKey = "suitepgkopqukd5anyath";
}


function savedata(){
	var corpid = getQueryString('corpid');
	var appid = getQueryString('appid');
	var suiteKey;
	if(appid== 3907 ){//排班
		suiteKey = "suitecq7s4oxjml7fuxph";
	}
	if( appid == 3944){//排班
		suiteKey = "suitehg6xf9ztjjswepxq";
	}
	if(appid== 3906 ){//公文
		suiteKey = "suitettsty8kmffyfiven";
	}
	if(appid == 3943 ){//公文)
		suiteKey = "suitekiwm4va2gobjwaxm";
	}
	if(appid== 3905){//报修
		suiteKey = "suite6vbaqzdreygzzz2q";
	}  
	if( appid == 3942){//报修
		suiteKey = "suitedzp4w2ovg0hnautn";
	}
	if(appid == 3835 || appid == 3844 || appid == 3845){
		suiteKey = "suitexezzlmy6ftlkv0zc";
	}
	
	if( appid==4048 ){
		suiteKey = "suitecmgwaty0he0eh1zd";
	}

	if( appid== 4049){
		suiteKey = "suited1ldwvcwsrn1wvgy";
	}

	if( appid== 4047){
		suiteKey = "suitersgovwhh7rf7pu25";
	}
	
	DingTalkPC.util.domainStorage.setItem({
	    name:'suiteKey' , // 存储信息的key值
	    value:suiteKey, // 存储信息的Value值
	    onSuccess : function(info) {
	    },
	    onFail : function(err) {
	    }
	});
	DingTalkPC.util.domainStorage.setItem({
	    name:'corpid' , // 存储信息的key值
	    value:corpid, // 存储信息的Value值
	    onSuccess : function(info) {
	    },
	    onFail : function(err) {
	    }
	});
	DingTalkPC.util.domainStorage.setItem({
	    name:'appid' , // 存储信息的key值
	    value:appid, // 存储信息的Value值
	    onSuccess : function(info) {
	    },
	    onFail : function(err) {
	    }
	});
}


//if(corpid == null ) corpid = "dingf88a5b65b0a6892f";
/*$(document).ready(
		function() {

			$.post(contextPath + "/dingisv/api/common/get_jsconfig", {//, {//获取js授权 ding-isv-app/get_js_config"
				"url" : url,
				"corpId" : corpid,
				"suiteKey" : suiteKey,
				"appId" : appid
			}, function(result) {
				_config = JSON.parse(result);
				DingTalkPC.error(function(err) {
					alert('dd error: ' + JSON.stringify(err));
				});
				
				
				DingTalkPC.config({
					agentId : _config.agentId, // 必填，微应用ID
					corpId : _config.corpId,//必填，企业ID
					timeStamp : _config.timeStamp, // 必填，生成签名的时间戳
					nonceStr : _config.nonce, // 必填，生成签名的随机串
					signature : _config.signature, // 必填，签名
					jsApiList : [ 'runtime.info', 
							'device.notification.confirm',
							'device.notification.alert', 
							'biz.contact.choose', 
							'biz.contact.departmentsPicker',
							'biz.customContact.choose'
					// 'service.request.httpOverLwp'
					]
				// 必填，需要使用的jsapi列表
				});

				DingTalkPC.ready(function() {
					if (typeof(index) == "function") {
						index();
					}

				});
			});
		});*/

//获取js授权
function jsready(callback){
			$.post(contextPath + "/dingisv/api/common/get_jsconfig", {//, {//获取js授权 ding-isv-app/get_js_config"
				"url" : url,
				"corpId" : corpid,
				"suiteKey" : suiteKey,
				"appId" : appid
			}, function(result) {
				_config = JSON.parse(result);
				DingTalkPC.error(function(err) {
					alert('dd error: ' + JSON.stringify(err));
				});
				DingTalkPC.config({
					agentId : _config.agentId, // 必填，微应用ID
					corpId : _config.corpId,//必填，企业ID
					timeStamp : _config.timeStamp, // 必填，生成签名的时间戳
					nonceStr : _config.nonce, // 必填，生成签名的随机串
					signature : _config.signature, // 必填，签名
					jsApiList : [ 'runtime.info', 'biz.util.openLink',
							'biz.navigation.setLeft',
							'biz.navigation.setTitle',
							'biz.navigation.setRight',
							'device.notification.confirm',
							'device.notification.alert', 'biz.util.share',
							'ui.webViewBounce', 'ui.webViewBounce.disable',
							'biz.contact.choose', 'biz.util.uploadImage',
							'biz.util.previewImage',
							'biz.contact.departmentsPicker',
							'biz.util.uploadAttachment',
							'biz.cspace.preview',
							'biz.customContact.choose'
					// 'service.request.httpOverLwp'
					]
				// 必填，需要使用的jsapi列表
				});
				DingTalkPC.ready(function() {
					if (callback != undefined) {
						callback();
					}

				});
			});
}

//授权钉盘
function allowupload(callback){
	$.ajax({
		url : contextPath
				+ '/dingisv/api/common/grant_custom_space',
		type : 'GET',
		success : function(data, status, xhr) {
			
			callback(data);
		},
		error : function(xhr, errorType, error) {
			//logger.e("yinyien:" + _config.corpId);
			alert("error:" + errorType + ', ' + error);
		}
	});
}

//授权钉盘
function allowdownload(callback){
	$.ajax({
		url : contextPath
				+ '/dingisv/api/common/grant_custom_space?type=download',
		type : 'GET',
		success : function(data, status, xhr) {
			
			callback(data);
		},
		error : function(xhr, errorType, error) {
			//logger.e("yinyien:" + _config.corpId);
			alert("error:" + errorType + ', ' + error);
		}
	});
}


//登录
function login(callback,module) {
	DingTalkPC.runtime.permission
			.requestAuthCode({
				corpId : corpid,
				onSuccess : function(info) {
					var loginurl = contextPath
					+ '/dingisv/api/common/get_user?code='
					+ info.code + '&corpId=' + corpid + '&suiteKey=' + suiteKey;
					if(module != undefined){
						loginurl = loginurl + "&module=" + module;
					}
					
					$
							.ajax({
								url : loginurl,
								type : 'GET',
								success : function(data, status, xhr) {
									callback(data);
								},
								error : function(xhr, errorType, error) {
									//logger.e("yinyien:" + _config.corpId);
									alert("error:" + errorType + ', ' + error);
								}
							});
				},
				onFail : function(err) {
					alert('fail: ' + JSON.stringify(err));
				}
	});

}

//流程
function copyflow(callback) {

	$.ajax({
		url : contextPath + '/dingisv/api/common/get_flow?corpId=' + corpid  + '&suiteKey=' + suiteKey,
		type : 'GET',
		success : function(data, status, xhr) {
			callback(data);
		},
		error : function(xhr, errorType, error) {
			//logger.e("yinyien:" + _config.corpId);
			alert("error:" + errorType + ', ' + error);
		}
	});

}