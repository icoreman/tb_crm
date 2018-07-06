import { Component } from 'react';

import { TabBar,ScrollView,Tab,Button } from 'saltui';
import Time from 'salt-icon/lib/Time';
import Plus from 'salt-icon/lib/Plus';
import Setting from 'salt-icon/lib/Setting';

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
        path: '/star',
      },
      {
        title: '隐藏',
        icon: <Plus />,
        iconHeight: 40,
        items: [{
          title: '用户',
          icon: <Time />,
          name: 'user',
          path: '/b/user',
        },{
          title: '用户',
          icon: <Time />,
          name: 'user',
          path: '/b/user',
        }],
        path: '/center',
      },
      {
        title: '功能',
        icon: <Time />,
        path: '/a/star',
      }
    ];
  }
 
  onRefresh() {
    this.setState({ refreshing: true });

    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  }

  renderInfo() {
    

    return null;
  }

  render() {
    const onChange = (activeIndex) => {
      // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
      
    };

    const tabBarStyle = {};

    return (
      <div>
        <div className="container">
          <ScrollView
            infiniteScroll
            refreshControl
            refreshControlOptions={{
              refreshing: this.state.refreshing,
              onRefresh: this.onRefresh.bind(this),
            }}

            className="scroll-view-demo"
          >
            <Tab activeKey={'1'}>
              <Tab.Item title="待审阅" />
              <Tab.Item title="出差清单" />
            </Tab>
            <div
              className="section-content"
              style={{ backgroundColor: 'rgba(31,56,88,0.06)', padding: '10px 0 10px 0' }}
            >
              <Button type="minor" display="banner" onClick={this.handleClick}>
                <Setting />新客户    5个
              </Button>
              <Button type="minor" display="banner" onClick={this.handleClick}>
                <Setting />新商机    5个
              </Button>
              <Button type="minor" display="banner" onClick={this.handleClick}>
                <Setting />新问题    5个
              </Button>
              <Button type="minor" display="banner" onClick={this.handleClick}>
                <Setting />已评审客户    5个
              </Button>
              <Button type="minor" display="banner" onClick={this.handleClick}>
                <Setting />出差报告    5个
              </Button>
               <Button type="minor" display="banner" onClick={this.handleClick}>
                <Setting />逾期报告    5个
              </Button>
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