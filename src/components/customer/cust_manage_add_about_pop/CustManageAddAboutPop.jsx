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

            

export default ({ custId, onClick }) => (
  <div className="cust-about-add-wrapper" >
      <HBox className="title" vAlign="center">
        <VBox  className="t-FBV t-FB1 t-PL10 t-FCf" >
         新建客户相关
        </VBox>
        <VBox className="t-list-title-date t-PR10" hAlign="center" >
          <Plus fill={'#fff'} />
        </VBox>
      </HBox>
      <Grid col={3} className="t-BCf" square noLine touchable>
        <div className="item" onClick={onClick.bind(null, custId, 'sj')}>
          <User fill={'#42A5F5'} />
          <div className="menu-title">商机</div>
        </div>
        <div className="item" onClick={onClick.bind(null, custId, 'wt')}>
          <Time fill={'#FF8A65'} />
          <div className="menu-title">问题</div>
        </div>
        <div className="item" onClick={onClick.bind(null, custId, 'lxr')}>
          <Star fill={'#EA80FC'} />
          <div className="menu-title">联系人</div>
        </div>
        <div className="item" onClick={onClick.bind(null, custId, 'rchd')}>
          <Map fill={'#EF9A9A'} />
          <div className="menu-title">日程活动</div>
        </div>
        <div className="item" onClick={onClick.bind(null, custId, 'ccbg')}>
          <Pen fill={'#9FA8DA'} />
          <div className="menu-title">出差报告</div>
        </div>
        <div className="item" onClick={onClick.bind(null, custId, 'fj')}>
          <InfoCircle fill={'#80DEEA'} />
          <div className="menu-title">附件</div>
        </div>
      </Grid>
  </div>    
);