import { Component } from 'refast';
import React from 'react';
import { ScrollView,Tab,Button,Grid,Badge,Toast,TabBar,Popup} from 'saltui';

import User from 'salt-icon/lib/User';
import Time from 'salt-icon/lib/Time';
import Plus from 'salt-icon/lib/Plus';

import { hashHistory } from 'react-router';
import './PageHome.less';
import * as logic from './logic';

import HomeTabPopView from 'components/HomeTabPopView';

export default class PageHome extends Component {
  constructor(props) {
    super(props, logic);

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

    this.onClickTabBarItem = this.onClickTabBarItem.bind(this);
    this.onHandlerClickGrid = this.onHandlerClickGrid.bind(this);
  }
  
  onClickTabBarItem(activeIndex) {
    this.dispatch('clickTabBarItem',activeIndex);
  }

  onRefresh() {

  }

  renderInfo() {
    

    return null;
  }

  onHandlerClickGrid(pathTo) {
    this.dispatch('clickGridItem',pathTo);
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
    const tabBarStyle = {};
    const t = this;
    const { refreshing, loading, activeIndex, badges, clickTabBarItem } = t.state;

    return (
      <div>
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
                  <div
                    className="section-content"
                    style={{ backgroundColor: 'rgba(31,56,88,0.06)', padding: '10px 0 10px 0' }}
                  >
                    <Grid col={3} className="t-BCf" square touchable>
                      <Badge count={ badges.custToBeReviewed } onClick={() => { t.onHandlerClickGrid('/customer/to_be_reviewed'); }}>
                        <div className="demo" onClick={() => { t.onHandlerClickGrid('/customer/to_be_reviewed'); }}>
                          <User fill={'#42A5F5'} />
                          <div className="menu-title">待评审客户</div>
                        </div>
                      </Badge>

                      <Badge count={ badges.custReviewed } onClick={() => { t.onHandlerClickGrid('/customer/reviewed'); }}>
                        <div className="demo" onClick={() => { t.onHandlerClickGrid('/customer/reviewed'); }}>
                          <User fill={'#FF8A65'} />
                          <div className="menu-title">已评审客户</div>
                        </div>
                      </Badge>

                      <Badge count={ badges.custNew } onClick={() => { t.onHandlerClickGrid('/customer/new'); }}>
                        <div className="demo" onClick={() => { t.onHandlerClickGrid('/customer/new'); }}>
                          <User fill={'#EA80FC'} />
                          <div className="menu-title">新客户</div>
                        </div>
                      </Badge>

                      <Badge count={ badges.chanceNew } onClick={() => { t.onHandlerClickGrid('新商机'); }}>
                        <div className="demo" onClick={() => { t.onHandlerClickGrid('新商机'); }}>
                          <User fill={'#EF9A9A'} />
                          <div className="menu-title">新商机</div>
                        </div>
                      </Badge>

                      <Badge count={ badges.questionNew } onClick={() => { t.onHandlerClickGrid('新问题'); }}>
                        <div className="demo" onClick={() => { t.onHandlerClickGrid('新问题'); }}>
                          <User fill={'#9FA8DA'} />
                          <div className="menu-title">新问题</div>
                        </div> 
                      </Badge>

                      <Badge count={ badges.reportNew } onClick={() => { t.onHandlerClickGrid('出差报告'); }}>
                        <div className="demo" onClick={() => { t.onHandlerClickGrid('出差报告'); }}>
                          <User fill={'#80DEEA'} />
                          <div className="menu-title">出差报告</div>
                        </div>  
                      </Badge>
                    </Grid>
                </div>
              </ScrollView>
            </Tab.Item>
            <Tab.Item title="出差清单" >
              <div>
               <h1>出差清单</h1>
              </div>
            </Tab.Item>
          </Tab>
        </div>
        <TabBar
          className="main-tabbar"
          tabBarStyle={ tabBarStyle }
          activeIndex={ activeIndex }
          onChange={ t.onClickTabBarItem }
          iconHeight={ 24 }
          cIconHeight={ 50 }
          items={ t.tabBarItems }
        />
      </div>
    );
  }
}