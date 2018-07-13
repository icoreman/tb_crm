import { Component } from 'react';

import { ScrollView,Button,Grid,Badge,Toast,TabBar,Group } from 'saltui';

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
import './PageFunc.less';
import { Style } from 'saltui';


export default class PageFunc extends Component {


  
  constructor(props) {
    super(props);

      //获取内容显示区域高度
   var winHeight = getScrollHigh(0, 0, 1);

    this.state = {
      activeIndex: 2,
      loading: false,
      refreshing: false,
      winHeight:winHeight,
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

  render() {
    const onChange = (activeIndex) => {
      // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
      if(activeIndex == 0) {
        hashHistory.push('/#/home/');
      } else if (activeIndex == 2) {
        
      } else if (activeIndex == '1-0') {
         hashHistory.push('/customer/add');
      }
    };

    const tabBarStyle = {};
    const t = this;

    let scrollViewStyle = {height: this.state.winHeight};

    return (
      <div>
        <div style={ scrollViewStyle }>
          <ScrollView
            refreshControl
            refreshControlOptions={{
              refreshing: this.state.refreshing,
              onRefresh: this.onRefresh.bind(this),
            }}
          >
            <div
              className="section-content"
              style={{ backgroundColor: 'rgba(31,56,88,0.06)'}}
            >
              <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">客户管理</Group.Head>
              <Group.List>
                <Grid col={3} className="t-BCf" square touchable>
                  <Badge count={0} onClick={() => { t.handlerClickGrid('/customer/managelist'); }}>
                    <div className="demo" onClick={() => { t.handlerClickGrid('/customer/managelist'); }}>
                      <User fill={'#42A5F5'} />
                      <div className="menu-title">客户管理</div>
                    </div>
                  </Badge>
                </Grid>
              </Group.List>

              <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">商机管理</Group.Head>
              <Group.List>
                <Grid col={3} className="t-BCf" square touchable>
                  <Badge count={0} onClick={() => { t.handlerClickGrid('商机管理'); }}>
                    <div className="demo" onClick={() => { t.handlerClickGrid('商机管理'); }}>
                      <User fill={'#42A5F5'} />
                      <div className="menu-title">商机管理</div>
                    </div>
                  </Badge>
                </Grid>
              </Group.List>
             
              <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">活动管理</Group.Head>
              <Group.List>
                <Grid col={3} className="t-BCf" square touchable>
                  <Badge count={0} onClick={() => { t.handlerClickGrid('活动管理'); }}>
                    <div className="demo" onClick={() => { t.handlerClickGrid('活动管理'); }}>
                      <User fill={'#42A5F5'} />
                      <div className="menu-title">活动管理</div>
                    </div>
                  </Badge>
                </Grid>
              </Group.List>

              <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">问题管理</Group.Head>
              <Group.List>
                <Grid col={3} className="t-BCf" square touchable>
                  <Badge count={0} onClick={() => { t.handlerClickGrid('问题管理'); }}>
                    <div className="demo" onClick={() => { t.handlerClickGrid('问题管理'); }}>
                      <User fill={'#42A5F5'} />
                      <div className="menu-title">问题管理</div>
                    </div>
                  </Badge>
                </Grid>
              </Group.List>

              <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">送样管理</Group.Head>
              <Group.List>
                <Grid col={3} className="t-BCf" square touchable>
                  <Badge count={0} onClick={() => { t.handlerClickGrid('送样管理'); }}>
                    <div className="demo" onClick={() => { t.handlerClickGrid('送样管理'); }}>
                      <User fill={'#42A5F5'} />
                      <div className="menu-title">送样管理</div>
                    </div>
                  </Badge>
                </Grid>
              </Group.List>
            </div>
          </ScrollView>
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