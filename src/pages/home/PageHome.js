import { Component } from 'react';

import { ScrollView,Tab,Button,Grid,Badge,Toast,TabBar } from 'saltui';

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
import './PageHome.less';

export default class PageHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      loading: false,
      refreshing: false,
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
     Toast.show({
        type: 'loading',
        content: pathTo,
      });

      setTimeout(() => {
        Toast.hide(() => {
         
        });
      }, 2000);
  }

  render() {
    const onChange = (activeIndex) => {
      // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
      if(activeIndex == 0) {

      } else if (activeIndex == 2) {
        hashHistory.push('/func/');
      } else if (activeIndex == '1-0') {
         hashHistory.push('/customer/add');
      }

    };

    const tabBarStyle = {};
    const t = this;

    return (
      <div>
        <div className="container">
            <Tab activeKey={ '0' } showScroll>
            <Tab.Item key="0" title="待审阅" >
              <ScrollView
                infiniteScroll
                refreshControl
                refreshControlOptions={{
                  refreshing: this.state.refreshing,
                  onRefresh: this.onRefresh.bind(this),
                }}

                className="scroll-view-demo"
              >
                <div
                  className="section-content"
                  style={{ backgroundColor: 'rgba(31,56,88,0.06)', padding: '10px 0 10px 0' }}
                >
                  <Grid col={3} className="t-BCf" square touchable>
                    <Badge count={10} onClick={() => { t.handlerClickGrid('新用户'); }}>
                      <div className="demo" onClick={() => { t.handlerClickGrid('新用户'); }}>
                        <User fill={'#42A5F5'} />
                        <div className="menu-title">新客户</div>
                      </div>
                    </Badge>

                    <Badge count={0} onClick={() => { t.handlerClickGrid('新商机'); }}>
                      <div className="demo" onClick={() => { t.handlerClickGrid('新商机'); }}>
                        <Time fill={'#FF8A65'} />
                        <div className="menu-title">新商机</div>
                      </div>
                    </Badge>

                    <Badge count={10} onClick={() => { t.handlerClickGrid('新问题'); }}>
                      <div className="demo" onClick={() => { t.handlerClickGrid('新问题'); }}>
                        <Star fill={'#EA80FC'} />
                        <div className="menu-title">新问题</div>
                      </div>
                    </Badge>

                    <Badge count={10} onClick={() => { t.handlerClickGrid('已评审客户'); }}>
                      <div className="demo" onClick={() => { t.handlerClickGrid('已评审客户'); }}>
                        <Map fill={'#EF9A9A'} />
                        <div className="menu-title">已评审客户</div>
                      </div>
                    </Badge>

                    <Badge count={10} onClick={() => { t.handlerClickGrid('出差报告'); }}>
                      <div className="demo" onClick={() => { t.handlerClickGrid('出差报告'); }}>
                        <Pen fill={'#9FA8DA'} />
                        <div className="menu-title">出差报告</div>
                      </div> 
                    </Badge>

                    <Badge count={10} onClick={() => { t.handlerClickGrid('逾期回款'); }}>
                      <div className="demo" onClick={() => { t.handlerClickGrid('逾期回款'); }}>
                        <InfoCircle fill={'#80DEEA'} />
                        <div className="menu-title">逾期回款</div>
                      </div>  
                    </Badge>
                  </Grid>
                </div>
              </ScrollView>
            </Tab.Item>
            <Tab.Item key="1" title="出差清单" >
              <div>
                <h1>出差清单</h1>
              </div>
            </Tab.Item>
          </Tab>
          
        </div>
        <TabBar
          className="main-tabbar"
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