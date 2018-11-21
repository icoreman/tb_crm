var hash = 'f09cf7bb84a74fbe5285';
var _config;
var url = window.location.href;
var indexpos = url.indexOf("#");
if (indexpos > 0) {
	url = url.substring(0, indexpos);
}

//获取url全路径
function getAllPath(urlHash){
	return url1+urlHash;
}

//获取用户session
function getUser(callback){
	$.ajax({
		url : '/pub/weixin/getSession',
		type : 'GET',
		success : function(data, status, xhr) {
			callback(data);
		},
		error : function(xhr, errorType, error) {
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
	return getScrollHighWithOther(hasSearch,hasTopTab,hasBottomTab,0);
}

//获取滚动列表的高度(是否有搜索，是否有顶部tab，是否有底部tab,是否还有其他的)
function getScrollHighWithOther(hasSearch,hasTopTab,hasBottomTab,otherHeight){
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
    high += 50;
  }
  if(hasBottomTab == 1){ //如果有底部tab页
    high += 50;
  }

  high = high + otherHeight;
  

  if(isAndroid==true){
    winHeight = window.screen.height-64-high+"px"; //-46
  }else if(isiOS==true){
     winHeight = window.screen.availHeight-56-high+"px"; //如果在chrome测试，要把这个-56去掉，因为这是假的ios
  }
  return winHeight;
}


function getWidth(){
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

  var winWidth = 0;
  if(isAndroid==true){
    winWidth = window.screen.width; //-46
  }else if(isiOS==true){
     winWidth = window.screen.availWidth; //-46
  }
  return winWidth;
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

//缩短链接
function shortUrl(url,callback){
  $.ajax({
    url : "http://suo.im/api.php?format=jsonp&callback=callbackname&url="+encodeURIComponent(url),
    type : 'POST',
	dataType:'jsonp',
    jsonpCallback:'callbackname',
    success : function(data, status, xhr) {
        callback(data);
    },
    error : function(xhr, errorType, error) {
        console.log("error:" + errorType + ', ' + error);
    }
  });
}