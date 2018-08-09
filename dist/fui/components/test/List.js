import { Component } from 'react';

import { CheckboxField,Toast} from 'saltui';

export default class PageHome extends Component {
    constructor(props) {
		super(props);
	    this.state = {
	     }
    }

    componentDidMount(){
      let t = this;
      //获取分发
      var calendar=document.getElementById("calendar");
      var cld=new CalendarMobile({
        el: 'box',
        value: '', // 默认为new Date();
        parentNode: calendar,
        fn: function(obj) {
            t.getBoardroom(date);

        },
        calendarInit:function(obj){
         // t.initData(obj);
        },
        prevMonth:function(obj){
          console.log(obj)
          t.initData(obj);
        },
        nextMonth:function(obj){
          console.log(obj)
          t.initData(obj);
        }
        });
    }
   
  selectUnit(data){
  	//alert(JSON.stringify(data));
  	this.setState({
  		sendUnitSelectList:data
  	});
  }

  //分发
  sendToReceive(){
  	let t = this;
  	 let selected = t.state.sendUnitSelectList;
  	 let sendUnit = '';
  	 for(let i=0;i<selected.length;i++){
  	 	sendUnit += selected[i].value+",";
  	 }
  	 if(sendUnit != ''){
  	 	sendUnit = sendUnit.substring(0,sendUnit.length-1);
  	 }
  	 if(t.state.sendUnit != ''){
  	 	sendUnit += ','+ t.state.sendUnit;
  	 }

    Toast.show({
		    type: 'success',
	        content: '分发成功',
		});
      setTimeout(function(){
     	 	
			  history.back();
     	 },2000);
  }

    render() {
       	const t = this;
       	return (
   			<div  >
             <div id="calendar" ></div>
             </div>
       	)
       }
}