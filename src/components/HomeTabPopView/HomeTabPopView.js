import { Component } from 'refast';
import React from 'react';
import { ScrollView,Tab,Button,Grid,Badge,Toast,TabBar,Popup,ActionSheet } from 'saltui';

import { hashHistory } from 'react-router';

import User from 'salt-icon/lib/User';
import Time from 'salt-icon/lib/Time';
import Plus from 'salt-icon/lib/Plus';
import Map from 'salt-icon/lib/Map';
import Star from 'salt-icon/lib/Star';
import Setting from 'salt-icon/lib/Setting';

import { URLS } from '../../app/variables';

import './HomeTabPopView.less';

export default class HomeTabPopView extends Component {
  constructor(props) {
    super(props);
    let token = document.getElementById("token").value;
    this.state = {
      token:token
    };
  }

  handleClickItem(path) {
    $(".t-popup-mask").parent().parent().hide();
    hashHistory.push(path);
  }

  handleScan() {
    $(".t-popup-mask").parent().parent().hide();
    $("input[type='file']").click();
  }

  render() {
    let t = this;
    var options = {
      baseUrl: URLS.common.createFile,
      param:{
        token: t.state.token,
        dir: 'dist/image'
      }
    };

    return (
      <div ref="HomeTabPopView">
        <Grid col={2} className="t-BCf t-MB1" noLine touchable>
          <div className="pop_item" onClick={ t.handleClickItem.bind(t, '/customer/add')}>
           <Button type="danger"><Setting />新建客户</Button>
          </div>
          <div className="pop_item" onClick={ t.handleScan.bind(t)}>
            <Button type="danger"><Setting />扫描名片</Button>
          </div>
        </Grid>

        <Grid col={3} className="t-BCf t-MB30" noLine touchable>
          <div className="pop_item" onClick={ t.handleClickItem.bind(t, '/chance/form?type=create') }>
            <User fill={'#42A5F5'} />
            <div className="menu-title">新建商机</div>
          </div>
          <div className="pop_item" onClick={ t.handleClickItem.bind(t, '/question/form?type=create') }>
            <Time fill={'#FF8A65'} />
            <div className="menu-title">新建问题</div>
          </div>
          <div className="pop_item" onClick={ t.handleClickItem.bind(t, '/activity/add') }>
            <Star fill={'#EA80FC'} />
            <div className="menu-title">新建出差报告</div>
          </div>
        </Grid>
      </div>
    );
  }
}