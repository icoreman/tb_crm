function getJWTToken(context,agentid,code,callback){
    $.ajax({
            type: "get",
            url: context + "/mobile/api/weixin/getJWTToken?code="  + code + "&agentId=" + agentid, //替换网址，xxx根据自己jssdk文件位置修改 
           // jsonp: "callback",
            //jsonpCallback: "success_jsonpCallback",
			
            success: function (data) {
				//alert(1);
				//alert(JSON.stringify(data));
            	if(callback != null){
					callback(data);
				}
            },
            error:function(){
				//alert("error");
            	if(callback != null){
					callback();

            	}
            	
            }

     });
}

function getJSToken(context,url,agentId,callback){
	       $.ajax({
                type: "get",
                url: context + "/mobile/api/weixin/getJsTicket?agentId=" +agentId+ "&url=" + encodeURIComponent(url), //替换网址，xxx根据自己jssdk文件位置修改 
                //dataType: "jsonp",
               // jsonp: "callback",
                //jsonpCallback: "success_jsonpCallback",
				 success:function(data){
                    wx.config({
                        debug:true,
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: [
                          'checkJsApi',
				        'onMenuShareTimeline',
				        'onMenuShareAppMessage',
				        'onMenuShareQQ',
				        'onMenuShareWeibo',
				        'onMenuShareQZone',
				        'hideMenuItems',
				        'showMenuItems',
				        'hideAllNonBaseMenuItem',
				        'showAllNonBaseMenuItem',
				        'translateVoice',
				        'startRecord',
				        'stopRecord',
				        'onVoiceRecordEnd',
				        'playVoice',
				        'onVoicePlayEnd',
				        'pauseVoice',
				        'stopVoice',
				        'uploadVoice',
				        'downloadVoice',
				        'chooseImage',
				        'previewImage',
				        'uploadImage',
				        'downloadImage',
				        'getNetworkType',
				        'openLocation',
				        'getLocation',
				        'hideOptionMenu',
				        'showOptionMenu',
				        'closeWindow',
				        'scanQRCode',
				        'chooseWXPay',
				        'openProductSpecificView',
				        'addCard',
				        'chooseCard',
				        'openCard'
                        ]
                    });

                    if(callback != null){
                    	callback();
                    }
                },
                error: function (data) {
                    console.log("连接失败！");
                }
            });
}



function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}