import { Component } from 'refast';
import React from 'react';
import DB from '../../app/db';
import { tips,noDataImage } from '../../app/variables';
import { ScrollView,Tab,Button,Grid,Badge,Toast,TabBar,Popup,ScrollList} from 'saltui';

import User from 'salt-icon/lib/User';
import Time from 'salt-icon/lib/Time';
import Plus from 'salt-icon/lib/Plus';

import { hashHistory } from 'react-router';


import HomeTabPopView from 'components/HomeTabPopView';
import NoData from 'components/no_data';
import Upload from 'components/upload';

import './PageHome.less';

export default class PageHome extends Component {
  constructor(props) {
    super(props);
    let token = document.getElementById("token").value;

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
      token: token,
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

  onRefresh() {

  }

  clickGridItem(pathTo) {
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
    let t = this;
    $(".t-tabs-bar-item-more-container-inner").remove();

    var centerItem = $(".t-tabs-bar-item").eq(1);

    centerItem.on('click', function(e) {
      t.showTbCenterPopView(e);
    });

    let token = t.state.token;
    if(token == "" || token == undefined) {

      return;
    }

    DB.CrmUserAPI.getUserNew({
      token: token
    }).then((content) => {
      t.setState({
          badges: content
      });
    }).catch((error) => {
      t.setState({
        badges:[]
      });
      Toast.show({
        type: 'error',
        content: '查询出错'
      });
    });


  }

  beforeFetch (data, from) {
    return data;
  }

  handleChangePic(key, value, isInit) {
    var fid = value.id;
    var checksum = value.checksum;
    hashHistory.push('link/scan?fid=' + fid + '&checksum=' + checksum);
  }
  render() {
    const tabBarStyle = {};
    const t = this;
    const { refreshing, loading, activeIndex, badges } = t.state;

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
        <Upload
          label= { '扫描名片' }
          dir= { 'dist/image' }
          fileSizeLimit = { 1024 }
          uploadType = { 'image' }
          onChange={(value,isInit) => { t.handleChangePic('', value,isInit) } }/>
        <div className="container">
            <Tab active={'0'} showScroll>
              <Tab.Item title="待审阅" >
                <ScrollView
                  infiniteScroll
                  refreshControl
                  refreshControlOptions={{
                    refreshing: refreshing,
                    onRefresh: this.onRefresh.bind(this),
                  }}

                  className="scroll-view-demo"
                >
                  <div className="section-content"
                    style={{ backgroundColor: 'rgba(31,56,88,0.06)', padding: '10px 0 10px 0' }}
                  >
                    <Grid col={2} className="t-BCf" touchable>
                      <Badge count={ badges.review } onClick={ t.clickGridItem.bind(t,'/customer/list?custNew=ok&states=over') }>
                        <div className="demo" onClick={t.clickGridItem.bind(t,'/customer/list?custNew=ok&states=over') }>
                          <User fill={'#FF8A65'} />
                          <div className="menu-title">已评审客户</div>
                        </div>
                      </Badge>

                      <Badge count={ badges.cust } onClick={t.clickGridItem.bind(t,'/customer/list?custNew=ok') }>
                        <div className="demo" onClick={t.clickGridItem.bind(t,'/customer/list?custNew=ok') }>
                          <User fill={'#EA80FC'} />
                          <div className="menu-title">新客户</div>
                        </div>
                      </Badge>

                      <Badge count={ badges.chan } onClick={t.clickGridItem.bind(t,'/chance/list?chanNew=ok') }>
                        <div className="demo" onClick={t.clickGridItem.bind(t,'/chance/list?chanNew=ok')  }>
                          <User fill={'#EF9A9A'} />
                          <div className="menu-title">新商机</div>
                        </div>
                      </Badge>

                      <Badge count={ badges.chanType } onClick={t.clickGridItem.bind(t,'/chance/list?chanNew=ok&chanType=ok') }>
                        <div className="demo" onClick={t.clickGridItem.bind(t,'/chance/list?chanNew=ok&chanType=ok')  }>
                          <User fill={'#EF9A9A'} />
                          <div className="menu-title">已评估商机</div>
                        </div>
                      </Badge>

                      <Badge count={ badges.ques } onClick={t.clickGridItem.bind(t,'/question/list?quesNew=ok')  }>
                        <div className="demo" onClick={t.clickGridItem.bind(t,'/question/list?quesNew=ok') }>
                          <User fill={'#9FA8DA'} />
                          <div className="menu-title">新问题</div>
                        </div> 
                      </Badge>

                      <Badge count={ badges.acti } onClick={t.clickGridItem.bind(t,'出差报告')  }>
                        <div className="demo" onClick={t.clickGridItem.bind(t,'出差报告')  }>
                          <User fill={'#80DEEA'} />
                          <div className="menu-title">出差报告</div>
                        </div>  
                      </Badge>
                    </Grid>
                </div>
              </ScrollView>
            </Tab.Item>
            <Tab.Item title="出差清单" >
              <NoData/>
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