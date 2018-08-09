import { Component } from 'refast';
import React from 'react';
import { ScrollView,Tab,Button,Grid,Badge,Toast,TabBar,Popup} from 'saltui';

import User from 'salt-icon/lib/User';
import Time from 'salt-icon/lib/Time';
import Plus from 'salt-icon/lib/Plus';
import Map from 'salt-icon/lib/Map';
import Star from 'salt-icon/lib/Star';
import Setting from 'salt-icon/lib/Setting';


export default class HomeTabPopView extends Component {
  constructor(props) {
        super(props);
  }

  render() {
    return (
      <div >
        <Grid col={2} className="t-BCf t-MB30" noLine touchable>
          <div className="demo" onClick={() => { onClickItem('1'); }}>
           <Button type="danger"><Setting />新建客户</Button>
          </div>
          <div className="demo" onClick={() => { onClickItem('2'); }}>
            <Button type="danger"><Setting />扫描名片</Button>
          </div>
        </Grid>

        <Grid col={4} className="t-BCf t-MB30" noLine touchable>
          <div className="demo" onClick={() => { onClickItem('3'); }}>
            <User fill={'#42A5F5'} />
            <div className="menu-title">新建商机</div>
          </div>
          <div className="demo" onClick={() => { onClickItem('4'); }}>
            <Time fill={'#FF8A65'} />
            <div className="menu-title">新建问题</div>
          </div>
          <div className="demo" onClick={() => { onClickItem('5'); }}>
            <Star fill={'#EA80FC'} />
            <div className="menu-title">新建出差报告</div>
          </div>
          <div className="demo" onClick={() => { onClickItem('6'); }}>
            <Map fill={'#EF9A9A'} />
            <div className="menu-title">新建送样</div>
          </div>
        </Grid>
      </div>
    );
  }
}