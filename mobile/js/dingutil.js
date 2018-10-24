function getJWTToken(context,agentId,code,jwtCorpId,callback){
    $.ajax({
        type: "get",
        url: context + "/mobile/api/dingding/getJWTToken?code="  + code + "&agentId=" + agentId + "&jwtCorpId="+jwtCorpId, //替换网址，xxx根据自己jssdk文件位置修改 
        success: function (data) {
        	if(callback != null){
				callback(data);
			}
        },
        error:function(){
        	if(callback != null){
				callback();
        	}
        }
     });
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function GetQueryContextUrl(suffName){
	return window.location.origin + suffName;
}