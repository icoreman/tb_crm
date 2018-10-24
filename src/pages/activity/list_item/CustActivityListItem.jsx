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

    return (
      <Group>
        <Group.List>
         <HBox key={data.id} className="cust-ques-list" vAlign="center">
            <VBox  className="t-FBV t-FB1 t-PL10 cust-ques-content-list" onClick={ t.clickItem.bind(this, data.actiCustNo, data.id, 'get') } >
              <HBox className="item-left t-MT12"> 活动时间： { data.actisTime } 至 { data.actieTime }</HBox>
              <HBox className="item-left"> 活动地点： { data.actiPlace } </HBox>
              <HBox className="item-left"> { data.actiTheme } </HBox>
              <HBox className="item-left"> { data.actiCustNo } </HBox>
            </VBox>
   
          </HBox>
        </Group.List>
      </Group>
    );
  }
};
