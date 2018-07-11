(function(w){
  w.CalendarMobile = function (opt) {
    // 创建日历控件基本结构
    var cldbox = document.createElement("div");
    cldbox.className = 'calendar-container';
    cldbox.id = opt.el;
    var tpl = "";
    tpl += '<div class="calendar-title">';
    tpl += '<div class="calendar-prevmonth"><</div>';
    tpl += '<div class="calendar-info"><span class="calendar-year"></span><span class="calendar-month"></span></div>';
    tpl += '<div class="calendar-nextmonth">></div>';
    tpl += '</div>';
    tpl += '<div class="calendar-wrap"><div class="calendar-week"><div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></div>';
    tpl += '<div class="calendar-content clearfix"></div>';
    tpl += '<div class="show-all-content clearfix" id="showAllContent" data-flag="false"><i class="iconfont icon-arrow-down"></i></div>';
    tpl += '</div>';
    cldbox.innerHTML=tpl;
    opt.parentNode.appendChild(cldbox);

    // dom 对象
    var omonth = cldbox.querySelector(".calendar-month");
    var oyear = cldbox.querySelector(".calendar-year");
    var prevmonth = cldbox.querySelector(".calendar-prevmonth");
    var nextmonth = cldbox.querySelector(".calendar-nextmonth");
    var content = cldbox.querySelector(".calendar-content");
    var showAllContent=document.getElementById("showAllContent");



    // 时间对象(默认当前)
    var dateObj;
    if(opt.value){
      dateObj = opt.value;
    }else{
      dateObj = new Date();
    }
    // 年月获取

    var year = getYear(dateObj);
    var month = getMonth(dateObj);
    //当前的日月
    var nowYear=new Date().getFullYear();
    var nowMonth=new Date().getMonth()+1;
    // 月年的显示
    omonth.innerHTML = month+"月";
    oyear.innerHTML = year+"年";
    // 获取本月1号的周值
    var fistWeek = getCurmonWeeknum(dateObj);
    // 本月总日数
    var monDaynum = getCurmonDaynum(dateObj);
    // 当前日期
    // 当前日期
    var nowDay = getDay(dateObj);
    var nowMonth = getMonth(dateObj);
    var nowYear = getYear(dateObj);

    //初始化显示本月信息
    setContent(content, fistWeek, monDaynum, nowDay, nowMonth, nowYear);
    showAllContent.setAttribute('data-flag','true')
    calendarDisplay(content,showAllContent)

    if(  typeof opt.calendarInit=='function') {
      opt.calendarInit({
        'year': nowYear,
        'month': nowMonth,
        'day': nowDay
      });
    }

    var isSupportMUI = (typeof mui === 'function');
    var evt = {
      type: isSupportMUI?'tap':'click'
    }
    // 显示当前时间
    content.addEventListener(evt.type,function (event) {
      if(event.target.tagName=="SPAN"&& event.target.nodeType=="1" && hasclass(event.target.parentNode.className,"canChoose")){
        ele=event.target.parentNode;
        var day = parseInt(event.target.innerHTML);
        var year=parseInt(oyear.innerHTML);
        var month=parseInt(omonth.innerHTML);
        var dateObj = new Date(year, month-1, day);
        var week = getWeek(dateObj);
        var canChoose=  opt.parentNode.getElementsByClassName("canChoose");
        for(var j=0;j<canChoose.length;j++){
          canChoose[j].classList.remove('canChoose-active');
        }
        ele.classList.add("canChoose-active");
        var tSpan=document.getElementsByClassName('today')[0].firstChild;
        tSpan.style.background='#fdfdfd';
        tSpan.style.color='#333';

        if(ele.classList.contains('today')&&ele.classList.contains('canChoose-active')){
          var spanElemnt= ele.firstChild;
          spanElemnt.style.background='#38ADFF';
          spanElemnt.style.color='#fff';
        }


        if(  typeof opt.fn=='function') {
          opt.fn({
            'year': year,
            'month': month,
            'day': day,
            'week': week
          });
        }
      };
    })

    //上一月
    prevmonth.addEventListener(evt.type,function(){

      var ddm = null;
      var ddy = null;
      if((dateObj.getMonth()-1)==-1){
        ddm = 11;
        ddy = dateObj.getFullYear()-1;
      }else{
        ddm = dateObj.getMonth()-1;
        ddy = dateObj.getFullYear();
      };
      dateObj.setFullYear(ddy);
      dateObj.setMonth(ddm);
      omonth.innerHTML = getMonth(dateObj)+"月";
      oyear.innerHTML = dateObj.getFullYear()+"年";
      clearContent(content);
      fistWeek = getCurmonWeeknum(dateObj);
      monDaynum = getCurmonDaynum(dateObj);
      nowDay = getDay(dateObj);
      nowMonth = getMonth(dateObj);
      nowYear = getYear(dateObj);
      setContent(content, fistWeek, monDaynum, nowDay, nowMonth, nowYear);
      if(  typeof opt.prevMonth=='function'){
        opt.prevMonth({
          'year': nowYear,
          'month': nowMonth,
          'day': nowDay,
        });
      }
      showAllContent.setAttribute('data-flag','true')
      calendarDisplay(content,showAllContent)
    });
    //下一月
    nextmonth.addEventListener(evt.type,function(){

      var date=dateObj;
      date.setDate(1);
      var ddm = null;
      var ddy = null;
      if((date.getMonth()+1)==12){
        ddm =0;
        ddy = date.getFullYear()+1;
      }else{
        ddm = date.getMonth()+1;
        ddy = date.getFullYear();
      };

      date.setFullYear(ddy);
      date.setMonth(ddm);
      omonth.innerHTML = getMonth(date)+"月";
      oyear.innerHTML = date.getFullYear()+"年";
      clearContent(content);
      fistWeek = getCurmonWeeknum(date);
      monDaynum = getCurmonDaynum(date);
      nowDay = getDay(date);
      nowMonth = getMonth(date);
      nowYear = getYear(date);
      setContent(content, fistWeek, monDaynum, nowDay, nowMonth, nowYear);
      if(  typeof opt.nextMonth=='function'){
        opt.nextMonth({
          'year': nowYear,
          'month': nowMonth,
          'day': nowDay,
        });
      }
      showAllContent.setAttribute('data-flag','true')
      calendarDisplay(content,showAllContent)
    });

    showAllContent.addEventListener(evt.type,function(){
      calendarDisplay(content,this)
    })
  }

//隐藏日期的方法
  function  calendarDisplay(content,item) {
    var divs = content.getElementsByTagName("div");
    if(item.getAttribute('data-flag')=='false'){
      for(var i=0;i<divs.length;i++){

        divs[i].style.display='block';
      }
      item.innerHTML='<i class="iconfont icon-arrow-up"></i>';
      item.setAttribute('data-flag','true')
    }else{
      var flag;
      var rowArray =[];
      for(var i = 0; i <divs.length; i++) {
        divs[i].style.display = 'none';
        if(divs[i].classList.contains('canChoose-active')) {
          flag = i;
        }
        //选择上移显示的区间
        if(i% 7 == 0) {
          rowArray.push(i);
        }
      }
      rowArray.push(35);
      for(var j = 0; j < rowArray.length; j++) {
        if(flag >= rowArray[j] && flag <= rowArray[j + 1]) {
          if(flag % 7 == 0) {
            j = j + 1;
          }
          if(flag==0){
            j=0;
          }
          for(var k = rowArray[j]; k < rowArray[j + 1]; k++) {
            if(k<divs.length){
              divs[k].style.display = 'block';
            }
          }
        }
      }
      item.innerHTML='<i class="iconfont icon-arrow-down"></i>';
      item.setAttribute('data-flag','false')
    }
  }
  //有无指定类名的判断
  function hasclass(str,cla){
    var i=str.search(cla);
    if(i==-1){
      return false;
    }else{
      return true;
    };
  }

  // 初始化日期显示方法
  function setContent(el, fistWeek, monDaynum, nowDay,nowMonth,nowYear) {
    //当前的日月
    var date=new Date();
    var nYear = date.getFullYear();
    var nMonth = date.getMonth() + 1;
    var nDay = date.getDate();
    //留空
    for(var i = 1; i <= fistWeek; i++) {
      var subContent = document.createElement("div");
      var subContentChild=document.createElement("span");
      subContent.innerHTML = "";
      subContentChild.innerHTML='';
      el.appendChild(subContent);
      subContent.appendChild(subContentChild);
    }
    // 正常区域
    for(var i = 1; i <= monDaynum; i++) {
      var subContent = document.createElement("div");
      var subContentChild=document.createElement("span");
      subContent.className = "canChoose";
      if(i == 1&&nMonth!=nowMonth ){
        subContent.classList.add("today","canChoose-active");

      }
      if(i == nDay && nMonth==nowMonth && nowYear==nYear) {
        subContent.classList.add("today","canChoose-active");

      }
      if(i == 1 && nMonth==nowMonth && nowYear!=nYear) {
        subContent.classList.add("today","canChoose-active");

      }
      subContentChild.innerHTML = i;
      el.appendChild(subContent);
      subContent.appendChild(subContentChild);
    }
  }


  // 清除内容
  function clearContent(el){
    el.innerHTML="";
  }

  // 判断闰年
  function isLeapYear(year){
    if( (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)){
      return true;
    }else{
      return false;
    }
  }

  // 得到当前年份
  function getYear (dateObj) {
    return dateObj.getFullYear()
  }

  // 得到当前月份
  function getMonth (dateObj) {
    var month=parseInt(dateObj.getMonth());
    switch(month) {
      case 0: return "1"; break;
      case 1: return "2"; break;
      case 2: return "3"; break;
      case 3: return "4"; break;
      case 4: return "5"; break;
      case 5: return "6"; break;
      case 6: return "7"; break;
      case 7: return "8"; break;
      case 8: return "9"; break;
      case 9: return "10"; break;
      case 10: return "11"; break;
      case 11: return "12"; break;
      default:
    }
  }

  // 得到当前号数
  function getDay (dateObj) {
    return dateObj.getDate();
  }

  // 得到周期数
  function getWeek (dateObj) {
    var week;
    switch (dateObj.getDay()){
      case 1: week = "星期一"; break;
      case 2: week = "星期二"; break;
      case 3: week = "星期三"; break;
      case 4: week = "星期四"; break;
      case 5: week = "星期五"; break;
      case 6: week = "星期六"; break;
      default: week = "星期天";
    }
    return week;
  }

  // 获取本月总日数方法
  function getCurmonDaynum(dateObj){
    var year=dateObj.getFullYear();
    var month=dateObj.getMonth();
    if(isLeapYear(year)){//闰年
      switch(month) {
        case 0: return "31"; break;
        case 1: return "29"; break; //2月
        case 2: return "31"; break;
        case 3: return "30"; break;
        case 4: return "31"; break;
        case 5: return "30"; break;
        case 6: return "31"; break;
        case 7: return "31"; break;
        case 8: return "30"; break;
        case 9: return "31"; break;
        case 10: return "30"; break;
        case 11: return "31"; break;
        default:
      }
    }else{//平年
      switch(month) {
        case 0: return "31"; break;
        case 1: return "28"; break; //2月
        case 2: return "31"; break;
        case 3: return "30"; break;
        case 4: return "31"; break;
        case 5: return "30"; break;
        case 6: return "31"; break;
        case 7: return "31"; break;
        case 8: return "30"; break;
        case 9: return "31"; break;
        case 10: return "30"; break;
        case 11: return "31"; break;
        default:
      }
    }
  }

  // 获取本月1号的周值
  function getCurmonWeeknum(dateObj){
    var oneyear = new Date();
    var year = dateObj.getFullYear();
    var month = dateObj.getMonth(); //0是12月
    oneyear.setFullYear(year);
    oneyear.setMonth(month); //0是12月
    oneyear.setDate(1);
    return oneyear.getDay();
  }
})(window);
