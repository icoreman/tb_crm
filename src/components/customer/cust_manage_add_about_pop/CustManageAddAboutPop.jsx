import { Component } from 'refast';
import {
    Boxs,Grid,Button
} from 'saltui';
import Plus from 'salt-icon/lib/Plus';
import Time from 'salt-icon/lib/Time';
import Setting from 'salt-icon/lib/Setting';
import User from 'salt-icon/lib/User';
import Map from 'salt-icon/lib/Map';
import Star from 'salt-icon/lib/Star';
import Pen from 'salt-icon/lib/Pen';
import InfoCircle from 'salt-icon/lib/InfoCircle';
import PlusCircle from 'salt-icon/lib/PlusCircle';
import Search from 'salt-icon/lib/Search';



import './CustManageAddAboutPop.less'

const { HBox,VBox } = Boxs;

export default class CustomerSearchView extends Component {
  constructor(props){
    super(props);
    this.state = {
      custId: props.custId,
      custName: props.custName
    }
  }

  clickItem = (item) => {
    this.props.handleClickPopItem(this.state.custId, this.state.custName, item);
  }

  render() {
    const t = this;
    return (
      <div className="cust-about-add-wrapper" >
        <HBox className="title" vAlign="center">
          <VBox  className="t-FBV t-FB1 t-PL10 t-FCf" >
           新建客户相关
          </VBox>
          <VBox className="t-list-title-date t-PR10" hAlign="center" >
            <Plus fill={'#fff'} />
          </VBox>
        </HBox>
        <Grid col={4} className="t-BCf" square={true} noLine touchable={true}>
          <div className="item" onClick={ t.clickItem.bind(t, 'chance')}>
            <User fill={'#42A5F5'} />
            <div className="menu-title">商机</div>
          </div>
          <div className="item" onClick={ t.clickItem.bind(t, 'question')}>
            <Time fill={'#FF8A65'} />
            <div className="menu-title">问题</div>
          </div>
          <div className="item" onClick={ t.clickItem.bind(t, 'link')}>
            <Star fill={'#EA80FC'} />
            <div className="menu-title">联系人</div>
          </div>
          <div className="item" onClick={ t.clickItem.bind(t, 'activity')}>
            <Pen fill={'#9FA8DA'} />
            <div className="menu-title">出差报告</div>
          </div>
        </Grid>
      </div>    
    )
  }
}