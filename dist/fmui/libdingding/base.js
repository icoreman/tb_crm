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
document.getElementById('context').value = contextPath;
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
	//信息-线上
	if( appid== 3992){
		suiteKey = "suitep41lhgkbzhgs9uma";
	}
	//信息-204
	if( appid== 4427){
		suiteKey = "suitettsty8kmffyfiven";
	}
	dd.util.domainStorage.setItem({
	    name:'suiteKey' , // 存储信息的key值
	    value:suiteKey, // 存储信息的Value值
	    onSuccess : function(info) {
	    },
	    onFail : function(err) {
	    }
	});
	dd.util.domainStorage.setItem({
	    name:'corpid' , // 存储信息的key值
	    value:corpid, // 存储信息的Value值
	    onSuccess : function(info) {
	    },
	    onFail : function(err) {
	    }
	});
	dd.util.domainStorage.setItem({
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
				dd.error(function(err) {
					alert('dd error: ' + JSON.stringify(err));
				});
				dd.config({
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
							'biz.customContact.choose'
					// 'service.request.httpOverLwp'
					]
				// 必填，需要使用的jsapi列表
				});

				dd.ready(function() {
					if (typeof(index) == "function") {
						index();
					}
				});
			});
		});
*/
//获取js授权
function jsready(callback,apid){
			var appid = apid;
			if(apid != null){
			
			}else{
				appid = getQueryString('appid');
			}
			
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

			if( appid==4048 ){
				suiteKey = "suitecmgwaty0he0eh1zd";
			}

			if( appid== 4049){
				suiteKey = "suited1ldwvcwsrn1wvgy";
			}

			if( appid== 4047){
				suiteKey = "suitersgovwhh7rf7pu25";
			}
			if(appid == 3835 || appid == 3844 || appid == 3845){
				suiteKey = "suitexezzlmy6ftlkv0zc";
			}
			//信息-线上
			if( appid== 3992){
				suiteKey = "suitep41lhgkbzhgs9uma";
			}
			//信息-204
			if( appid== 4427){
				suiteKey = "suitettsty8kmffyfiven";
			}
			var url = window.location.href;
			var indexpos = url.indexOf("#");
			if (indexpos > 0) {
				url = url.substring(0, indexpos);
			}
			$.post(contextPath + "/dingisv/api/common/get_jsconfig", {//, {//获取js授权 ding-isv-app/get_js_config"
				"url" : url,
				"corpId" : corpid,
				"suiteKey" : suiteKey,
				"appId" : appid
			}, function(result) {
				_config = JSON.parse(result);
				dd.error(function(err) {
					console.log('dd error: ' + JSON.stringify(err));
				});
				dd.config({
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
							'biz.cspace.preview',
							'biz.contact.departmentsPicker',
							'biz.contact.complexPicker',
							'biz.util.uploadAttachment',
							'biz.customContact.choose',
							'device.geolocation.get','device.base.getInterface','biz.map.locate',
							'biz.ding.create'
					// 'service.request.httpOverLwp'
					]
				// 必填，需要使用的jsapi列表
				});
				dd.ready(function() {
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
			console.log("error:" + errorType + ', ' + error);
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
			console.log("error:" + errorType + ', ' + error);
		}
	});
}


//授权钉盘
function allowdownload(callback,agentid){
	var url = contextPath
	+ '/dingisv/api/common/grant_custom_space_download?type=download';
	if(agentid != null){
		url = url + "&agentid=" + agentid;
	}
	if(appid != null){
		url = url + "&appid=" + appod;
	}
	$.ajax({
		url : url,
		type : 'GET',
		success : function(data, status, xhr) {
			
			callback(data);
		},
		error : function(xhr, errorType, error) {
			//logger.e("yinyien:" + _config.corpId);
			console.log("error:" + errorType + ', ' + error);
		}
	});
}

//页面跳转
function pageSkip(urlHash){
	var url1 = url.replace("index.html","dist/detail.html");
	dd.biz.util.openLink({
    url: url1+urlHash,//要打开链接的地址
    onSuccess : function(result) {
        /**/
    },
    onFail : function(err) {}
	})
}

//下载文件
function downloadFile(id,type) {
	if(!type){
		type = 'download';
	}
	if(type == 'android' || type == 'ios'){
	
		var convertType = 1;
		dd.device.notification.showPreloader({
			text: "文件转码中..", //loading显示的字符，空表示不显示文字
			showIcon: true, //是否显示icon，默认true
			onSuccess : function(result) {
				/*{}*/
			},
			onFail : function(err) {}
		})
		$.ajax({
			type : 'GET',
			url : contextPath+"/dingisv/api/common/convert",
			data : {
				/*"input" : "E:\\tomcat\\apache-tomcat-8.0.33-windows-x86\\apache-tomcat-8.0.33\\wtpwebapps\\dev\\attachment\\platform\\201706\\8c47f70ccb7244f4a4ae0e0f6c64cc77.docx",*/
				"input" : id,
				"convertType" : convertType,
			},
			cache : false,
			dataType : "json",
			success : function(data) {
					//alert(JSON.stringify(data));
				dd.device.notification.hidePreloader({
					onSuccess : function(result) {
						/*{}*/
					},
					onFail : function(err) {}
				})
				console.info(data);
				if(data.result == 0){
					/*data.data = "http://192.168.7.56:8080/ezp-0.1.0/fileview/realPath?pathId="+data.data;*/
					data.data = window.location.protocol+"//"+window.location.host+"/"+contextPath+"/dingisv/api/common/realPath?pathId="+data.data;
					dd.biz.util.openLink({
						url: data.data,//要打开链接的地址
						onSuccess : function(result) {
				        
						},
						onFail : function(err) {
						}
					})
				}else{
					alert(data.message);
				}
				/*window.open(data.data ,"_blank");*/
			},
			error : function() {
				dd.device.notification.hidePreloader({
					onSuccess : function(result) {
						/*{}*/
					},
					onFail : function(err) {}
				})
				console.log("异常！");
			}
		});
	
	}
//	else if(type == 'ios'){ //ios
//		var url = window.location.protocol+"//"+window.location.host+"/"+contextPath+'/dingisv/api/common/viewImage?fid='+id+"&token="+document.getElementById('token').value ;
//		dd.biz.util.openLink({
//		url: url,//要打开链接的地址
//		onSuccess : function(result) {
//        
//		},
//		onFail : function(err) {
//		}
//		})
//	}
	else{ //下载
		var url = window.location.protocol+"//"+window.location.host+"/"+contextPath+'/dingisv/api/common/viewImage?fid='+id+"&token="+document.getElementById('token').value ;
		dd.biz.util.openLink({
		url: url,//要打开链接的地址
		onSuccess : function(result) {
        
		},
		onFail : function(err) {
		}
		})
	}
}

//获取url全路径
function getAllPath(urlHash){
	var url1 = url.replace("index.html","dist/detail.html");
	//alert(urlHash);
	return url1+urlHash;
}

//登录
function login(callback,module) {
	dd.runtime.permission
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
									console.log("error:" + errorType + ', ' + error);
								}
							});
				},
				onFail : function(err) {
					console.log('fail: ' + JSON.stringify(err));
				}
	});

}

//获取用户session
function getUser(callback){
	$.ajax({
		url : contextPath + '/dingisv/api/common/getSession?corpId=' + corpid  + '&suiteKey=' + suiteKey,
		type : 'GET',
		success : function(data, status, xhr) {
			callback(data);
		},
		error : function(xhr, errorType, error) {
			//logger.e("yinyien:" + _config.corpId);
			console.log("error:" + errorType + ', ' + error);
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
			console.log("error:" + errorType + ', ' + error);
		}
	});

}

//判断emoji
function isEmojiCharacter(substring) {  
    for ( var i = 0; i < substring.length; i++) {  
        var hs = substring.charCodeAt(i);  
        if (0xd800 <= hs && hs <= 0xdbff) {  
            if (substring.length > 1) {  
                var ls = substring.charCodeAt(i + 1);  
                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
                if (0x1d000 <= uc && uc <= 0x1f77f) {  
                    return true;  
                }  
            }  
        } else if (substring.length > 1) {  
            var ls = substring.charCodeAt(i + 1);  
            if (ls == 0x20e3) {  
                return true;  
            }  
        } else {  
            if (0x2100 <= hs && hs <= 0x27ff) {  
                return true;  
            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
                return true;  
            } else if (0x2934 <= hs && hs <= 0x2935) {  
                return true;  
            } else if (0x3297 <= hs && hs <= 0x3299) {  
                return true;  
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
                    || hs == 0x2b50) {  
                return true;  
            }  
        }  
    }  
} 

//获取滚动列表的高度(是否有搜索，是否有顶部tab，是否有底部tab)
function getScrollHigh(hasSearch,hasTopTab,hasBottomTab){
	
	var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	var winHeight = '';
    //alert(isAndroid);
	// alert(isiOS);
	var high = 0;
	if(hasSearch==1){ //如果有搜索
		high += 46;
	}
	if(hasTopTab == 1){ //如果有顶部tab页
		high += 46;
	}
	if(hasBottomTab == 1){ //如果有底部tab页
		high += 50;
	}
    if(isAndroid==true){
       winHeight = window.screen.height-64-high+"px"; //-46
    }else if(isiOS==true){
       winHeight = window.screen.availHeight-high+"px"; //-46
	}
	return winHeight;
}

//格式化日期,格式为2017-08-09
function formatDate(date){
  var myyear = date.getFullYear();   
  var mymonth = date.getMonth()+1;   
  var myweekday = date.getDate();  
  //alert("formatDate"+myyear+":"+mymonth+":"+myweekday)  
  if(mymonth < 10){   
      mymonth = "0" + mymonth;   
  }   
  if(myweekday < 10){   
      myweekday = "0" + myweekday;   
  }   
  return (myyear+"-"+mymonth + "-" + myweekday);   
}

//转成平台
function transformScopeUserDd2Platform(users,type){
    var platform = [];
    if(users && users instanceof Array && users.length > 0){
      for(var j=0; j<users.length; j++){
        var i = {
          scopeType: type,
          scopeValue: users[j].key,
          scopeName: users[j].label
        }
        platform.push(i);
      }
    }
    return platform;

  }