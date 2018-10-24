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
 
  render()  {
    var t = this;
    let data= t.props;

    return (
      <Group>
        <Group.List>
         <HBox key={data.id} className="cust-ques-list" vAlign="center">
            <VBox  className="t-FBV t-FB1 t-PL10 cust-ques-content-list" >
              <HBox className="item-left"> { data.quesDesc } </HBox>
              <HBox className="item-left">要求完成时间：{ data.quesGuestTime }</HBox>
              <HBox className="item-left">问题状态：{ data.quesStatus }</HBox>
            </VBox>
            <LogicRender show={ data.showEditButton } >
              <VBox className="t-list-title-date t-PR10" hAlign="center" >
                <a fill={'#42A5F5'}>编辑</a>
              </VBox>
            </LogicRender>
          </HBox>
        </Group.List>
      </Group>
    );
  }
};
