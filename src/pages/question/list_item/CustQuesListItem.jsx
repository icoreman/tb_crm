import { Component,LogicRender } from 'refast';
import {
    Boxs,Group,Grid
} from 'saltui';
import './CustQuesListItem.less'

const { HBox,Box,VBox } = Boxs;
            
export default class CustQuesListItem extends Component {
  constructor(props){
    super(props);
  }

 clickItem(custId, custName, id, type) {
    this.props.clickItem(custId,custName, id ,type);
  }


  render()  {
    var t = this;
    let data= t.props;

    return (
      <Group>
        <Group.List>
         <HBox key={data.id} className="cust-ques-list" vAlign="center">
            <VBox  className="t-FBV t-FB1 t-PL20" onClick={ t.clickItem.bind(t, data.custId, data.custName, data.id, 'get') } >
              <HBox className="item-left t-MT6"> { data.quesDesc } </HBox>
              <HBox className="item-left t-MT6">要求完成时间：{ data.quesGuestTime }</HBox>
              <HBox className="item-left t-MT6">问题状态：{ data.quesStatus }</HBox>
            </VBox>
            <LogicRender show={ data.showEditButton } >
              <VBox className="t-list-title-date t-PR10" hAlign="center" >
                <a fill={'#42A5F5'} onClick={ t.clickItem.bind(this, data.custId,data.custName, data.id, 'edit') }>编辑</a>
              </VBox>
            </LogicRender>
          </HBox>
        </Group.List>
      </Group>
    );
  }
};
