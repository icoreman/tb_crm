import { Component,LogicRender } from 'refast';
import {
    Boxs,Group,Grid
} from 'saltui';
import './CustChanceListItem.less'

const { HBox,Box,VBox } = Boxs;
            
export default class CustChanceListItem extends Component {
  constructor(props){
    super(props);
  }

  clickItem(custId, custName, id, type) {
    this.props.clickItem(custId, custName, id ,type);
  }
 
  render()  {
    const t = this;
    let data= t.props;
    return (
      <Group>
        <Group.List>
         <HBox key={data.id} className="cust-chance-list" vAlign="center">
            <VBox  className="t-FBV t-FB1 t-PL16" onClick={ t.clickItem.bind(t, data.custId, data.custName, data.id, 'get') }  >
              <HBox className="item-left t-MT6"> { data.chanName } </HBox>
              <HBox className="item-left t-MT6">商机时间：{ data.chanTime }</HBox>
              <HBox className="item-left t-MT6">商机阶段：{ data.chanStage }</HBox>
            </VBox>
            <LogicRender show={ data.showEditButton } >
              <VBox className="t-list-title-date t-PR10" hAlign="center" >
                <a fill={'#42A5F5'} onClick={ t.clickItem.bind(t, data.custId, data.custName, data.id, 'edit') }>编辑</a>
              </VBox>
            </LogicRender>
          </HBox>
        </Group.List>
      </Group>
    );
  }
};
