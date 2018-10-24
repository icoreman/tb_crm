import { Component } from 'react';

import { ScrollView,Button,Grid,Badge,Toast,TabBar,Group,Popup } from 'saltui';
import { Agreement } from 'react-weui';

import Time from 'salt-icon/lib/Time';
import Plus from 'salt-icon/lib/Plus';
import Setting from 'salt-icon/lib/Setting';
import User from 'salt-icon/lib/User';
import Map from 'salt-icon/lib/Map';
import Star from 'salt-icon/lib/Star';
import Pen from 'salt-icon/lib/Pen';
import InfoCircle from 'salt-icon/lib/InfoCircle';
import PlusCircle from 'salt-icon/lib/PlusCircle';
import Search from 'salt-icon/lib/Search';

import { hashHistory } from 'react-router';

import HomeTabPopView from 'components/HomeTabPopView';

import { func_bcimg_01 } from '../../app/variables';

import './PageFunc.less';
import { Style } from 'saltui';


export default class PageFunc extends Component {
  constructor(props) {
    super(props);

      //获取内容显示区域高度
    var winHeight = getScrollHigh(0, 0, 1);
    var winWidth = getWidth();
    this.state = {
      title: '功能',
      activeIndex: 2,
      loading: false,
      refreshing: false,
      winHeight:winHeight,
      winWidth: winWidth
    };
    this.tabBarItems = [
      {
        title: '首页',
        icon: <Time />,
        path: '/home',
      },
      {
        title: '隐藏',
        icon: <Plus />,
        iconHeight: 40,
        items: [{
          title: '用户',
          icon: <Plus />,
          name: 'user',
          path: '/b/user',
        },{
          title: '用户',
          icon: <Plus />,
          name: 'user',
          path: '/b/user',
        }],
        path: '/center',
      },
      {
        title: '功能',
        icon: <Time />,
        path: '/func',
      }
    ];
  }
 
  onRefresh() {
    this.setState({ refreshing: true });

    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 4000);
  }

  renderInfo() {

    return null;
  }

  handlerClickGrid(pathTo) {
      hashHistory.push(pathTo);
  }

  showTbCenterPopView(e) {
    e.preventDefault();
    e.stopPropagation();
    // 隐藏默认的弹出框
    Popup.show(<HomeTabPopView/>, {
      animationType: 'slide-up',
    });
    
    $(".main-tabbar").css('z-index','0');
  }

  componentDidMount(){
    const t = this;
    $(".t-tabs-bar-item-more-container-inner").remove();

    var centerItem = $(".t-tabs-bar-item").eq(1);

    centerItem.on('click', function(e) {
      t.showTbCenterPopView(e);
    });
  }

  render() {
    const onChange = (activeIndex) => {
      // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
      if(activeIndex == 0) {
        hashHistory.push("/home");
      } else if (activeIndex == 2) {
        
      } else if (activeIndex == '1-0') {
        hashHistory.push("/customer/add");
      }
    };

    const tabBarStyle = {};
    const t = this;

    let scrollViewStyle = { height: this.state.winHeight, backgroundImage: "url(" + func_bcimg_01 + ")",
                            backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',
                            backgroundSize:'cover'  };
    let buttonTopStyle = { width:'120px', height:'66px', lineHeight:'64px', marginLeft: '16px', marginTop: '100px', background: 'rgba(83, 99, 179,0.6)'};
    let buttonOtherStyle = { width:'120px',height:'66px', lineHeight:'64px',marginLeft: '16px', marginTop: '20px', background: 'rgba(83, 99, 179,0.6)'};
    
    return (
      <div>
        <div style={ scrollViewStyle } >
          <Button style={ buttonTopStyle } display="inline"  onClick={ t.handlerClickGrid.bind(t,'/customer/list') }><Setting />客户管理</Button><br /> 
          <Button style={ buttonOtherStyle } display="inline"  onClick={ t.handlerClickGrid.bind(t,'/chance/list') }><Setting />商机管理</Button><br /> 
          <Button style={ buttonOtherStyle } display="inline"  onClick={ t.handlerClickGrid.bind(t,'/question/list') }><Setting />问题管理</Button><br /> 
          <Button style={ buttonOtherStyle } display="inline"  onClick={ t.handlerClickGrid.bind(t,'/activity/list') }><Setting />出差报告</Button><br /> 
        </div> 
        <TabBar
          tabBarStyle={tabBarStyle}
          activeIndex={this.state.activeIndex}
          onChange={onChange}
          iconHeight={24}
          cIconHeight={50}
          items={this.tabBarItems}
        />
      </div>
    );
  }
}