import { Component,LogicRender } from 'refast';
import React from 'react';
import DB from '../../app/db';
import { URLS,tips,noDataImage } from '../../app/variables';
import { ScrollView,Tab,Button,Grid,Badge,Toast,TabBar,Popup,ScrollList} from 'saltui';

import User from 'salt-icon/lib/User';
import Time from 'salt-icon/lib/Time';
import Plus from 'salt-icon/lib/Plus';

import { hashHistory } from 'react-router';


import HomeTabPopView from 'components/HomeTabPopView';
import Upload from 'components/upload';

import './PageHome.less';

export default class PageHome extends Component {
  constructor(props) {
    super(props);
    let loadUpload = $("input[type='file']").length == 0;
    this.tabBarItems = [
      { title: '首页',
        icon: <Time />,
        path: '/home', }, 
      {
        title: '隐藏',
        icon: <Plus />,
        iconHeight: 40,
        path: '/center', 
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
        }],},
      {
        title: '功能',
        icon: <Time />,
        path: '/func', },
    ];

    this.state = {
      loadUpload: loadUpload,
      title: '首页',
      badges: {
        xx : 0,
        chanType : 0,
        review : 0,
        ques : 0,
        acti : 0,
        chan : 0,
        cust : 0
      },
      refreshing: false,
      loading: false,
      activeIndex: 0
    };
  }

  clickGridItem = (pathTo) => {
    hashHistory.push(pathTo);
  }

  showTbCenterPopView = (e) => {
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

    let token = localStorage.token;
    let context =  localStorage.context;
    let agentid = localStorage.agentid;
    let code = localStorage.code;
    let baseUrl = localStorage.baseUrl;

    if(!token) {
      Toast.show({
        type: 'loading',
        content: '信息认证...',
        duration: 30000
      });

      getJWTToken(context,agentid,code,function(data){
        if(data.result == 0) {
          localStorage.token = data.token;
          localStorage.userId = data.userId;
          localStorage.ezplatformUserId = data.ezplatformUserId;
          localStorage.ezplatformUserName = data.ezplatformUserName;
          localStorage.ezplatformOrgId = data.ezplatformOrgId;
          localStorage.ezplatformOrgName = data.ezplatformOrgName;
          localStorage.moblieMainPageUrl = data.moblieMainPageUrl;

          t.getUserNew(data.token);
        } else {
          Toast.hide();
          alert("获取用户信息失败，请重试或者联系管理员！");
        }
      });
    } else {
      t.getUserNew(token);
    }
    getJSToken(context,baseUrl,agentid,null);

    $(".t-tabs-bar-item-more-container-inner").remove();

    var centerItem = $(".t-tabs-bar-item").eq(1);

    centerItem.on('click', function(e) {
      t.showTbCenterPopView(e);
    });

  }

  getUserNew = (token) => {
    const t = this;
    t.setState({
      token: token
    });
    DB.CrmUserAPI.getUserNew({
      token: token
    }).then((content) => {
      t.setState({
        badges: content
      });
      Toast.hide();
    }).catch((error) => {
      t.setState({
        badges:[]
      });
      Toast.hide();
      Toast.show({
        type: 'error',
        content: '查询出错'
      });
    });
  }

  beforeFetch = () => {
    data.token = localStorage.token;

    return data;
  }

  handleClickItem = (data) => {

  }

  render() {
    const tabBarStyle = {};
    const t = this;
    let { refreshing, activeIndex, badges } = t.state;

    const onChange = (activeIndex) => {
     // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
      if(activeIndex == 0) {

      } else if (activeIndex == 2) {
        hashHistory.push('/func/');
      } else if (activeIndex == '1-0') {
         hashHistory.push('/customer/add');
      }
    };

    return (
      <div> 
        <div className="container">
          <Tab activeKey={'0'} showScroll>
            <Tab.Item title="待审阅" >
              <ScrollView
                infiniteScroll
                refreshControl
                refreshControlOptions={{
                  refreshing: refreshing
                }}

                className="scroll-view-demo"
              >
                <div className="section-content"
                  style={{ backgroundColor: 'rgba(31,56,88,0.06)', padding: '10px 0 10px 0' }}
                >
                  <Grid col={2} className="t-BCf" touchable>
                    <Badge count={ badges.review } onClick= { ()=>{ t.clickGridItem('/customer/list?custNew=ok&states=over'); }}>
                      <div className="demo" onClick= { () => { t.clickGridItem('/customer/list?custNew=ok&states=over') } }>
                        <User fill={'#FF8A65'} />
                        <div className="menu-title">已评审客户</div>
                      </div>
                    </Badge>

                    <Badge count={ badges.cust } onClick = { () => { t.clickGridItem('/customer/list?custNew=ok') }}>
                      <div className="demo" onClick = { () => { t.clickGridItem('/customer/list?custNew=ok') }}>
                        <User fill={'#EA80FC'} />
                        <div className="menu-title">新客户</div>
                      </div>
                    </Badge>
                    <Badge count={ badges.chan } onClick = {() => {t.clickGridItem('/chance/list?chanNew=ok') }}>
                      <div className="demo" onClick = {() => {t.clickGridItem('/chance/list?chanNew=ok')  }}>
                        <User fill={'#EF9A9A'} />
                        <div className="menu-title">新商机</div>
                      </div>
                    </Badge>

                    <Badge count={ badges.chanType } onClick = {() => { t.clickGridItem('/chance/list?chanNew=ok&chanType=ok') }}>
                      <div className="demo" onClick = {() => { t.clickGridItem('/chance/list?chanNew=ok&chanType=ok')  }}>
                        <User fill={'#EF9A9A'} />
                        <div className="menu-title">已评估商机</div>
                      </div>
                    </Badge>

                    <Badge count={ badges.ques } onClick = {() => { t.clickGridItem('/question/list?quesNew=ok')  }}>
                      <div className="demo" onClick = {() => { t.clickGridItem('/question/list?quesNew=ok') }}>
                        <User fill={'#9FA8DA'} />
                        <div className="menu-title">新问题</div>
                      </div> 
                    </Badge>

                    <Badge count={ badges.acti } onClick = {() => { t.clickGridItem('/activity/list?actiNew=ok')  }}>
                      <div className="demo" onClick = {() => { t.clickGridItem('/activity/list?actiNew=ok')  }}>
                        <User fill={'#80DEEA'} />
                        <div className="menu-title">出差报告</div>
                      </div>  
                    </Badge>
                  </Grid>
                </div>
              </ScrollView>
            </Tab.Item>
            <Tab.Item title="出差清单" >
             
            </Tab.Item>
          </Tab>
        </div>
        <TabBar
          className="main-tabbar"
          tabBarStyle={ tabBarStyle }
          activeIndex={ activeIndex }
          onChange={ onChange }
          iconHeight={ 24 }
          cIconHeight={ 50 }
          items={ t.tabBarItems }
        />
      </div>
    );
  }
}