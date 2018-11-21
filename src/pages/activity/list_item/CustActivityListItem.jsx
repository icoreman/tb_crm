import { Component,LogicRender } from 'refast';
import {
    Boxs,Group,Grid
} from 'saltui';
import './CustActivityListItem.less'

const { HBox,Box,VBox } = Boxs;
            
export default class CustActivityListItem extends Component {
  constructor(props){
    super(props);
  }

 clickItem(actiCustNo, id, type) {
    this.props.clickItem(actiCustNo, id ,type);
  }


  render()  {
    var t = this;
    let data= t.props;

    var realvalue="";
    var actiTheme=new Array(4)
    actiTheme[1]="跟进商机";
    actiTheme[2]="解决问题";
    actiTheme[3]="日常维护";
    actiTheme[4]="参展";
    var array = data.actiTheme.split(",");
    if(array.length >0){
      for (var i = 0; i < array.length; i++) {
        realvalue += actiTheme[array[i]] + "+";
      } 
    }
   //去掉最后一个逗号
    if (realvalue.length > 0) {
      realvalue = realvalue.substr(0, realvalue.length - 1);
    }

    return (
      <Group>
        <Group.List>
         <HBox key={data.id} className="cust-activity-list" vAlign="center">
            <VBox  className="t-FBV t-FB1 t-PL10" onClick={ t.clickItem.bind(this, data.actiCustNo, data.id, 'get') } >
              <HBox className="item-left t-MT6"> 活动时间： { data.actisTime } 至 { data.actieTime }</HBox>
              <HBox className="item-left t-MT10"> 活动地点： { data.actiPlace } </HBox>
              <HBox className="item-left t-MT6"> { realvalue } </HBox>
              <HBox className="item-left t-MT10"> { data.actiCustNo } </HBox>
            </VBox>
            <LogicRender show={ data.showEditButton } >
              <VBox className="t-list-title-date t-PR10" hAlign="center" >
                <a fill={'#42A5F5'} onClick={ t.clickItem.bind(t, data.custId, data.id, 'edit') }>编辑</a>
              </VBox>
            </LogicRender>
          </HBox>
        </Group.List>
      </Group>
    );
  }
};
