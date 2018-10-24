import { Component,LogicRender } from 'refast';
import {
    Boxs,Group,Grid
} from 'saltui';
import './CustLinkListItem.less'

const { HBox,Box,VBox } = Boxs;
            
export default class CustLinkListItem extends Component {
  constructor(props){
    super(props);
  }
 
  clickItem(custId, id, type) {
    this.props.clickItem(custId, id ,type);
  }

  render()  {
    var t = this;
    let data= t.props;
    return (
      <Group>
        <Group.List>
         <HBox key={data.id} className="cust-link-list" vAlign="center">
            <VBox  className="t-FBV t-FB1 t-PL10 cust-link-content-list" onClick={ t.clickItem.bind(this, data.custId, data.id, 'get') } >
              <HBox className="item-left">姓名：{ data.linkName }</HBox>
              <HBox className="item-left">电话：{ data.linkTele }</HBox>
              <HBox className="item-left">邮箱：{ data.linkEmail }</HBox>
            </VBox>
            <LogicRender show={ data.showEditButton } >
              <VBox className="t-list-title-date t-PR10" hAlign="center" >
                <a fill={'#42A5F5'} onClick={ t.clickItem.bind(this, data.custId, data.id, 'edit') }>编辑</a>
              </VBox>
            </LogicRender>
          </HBox>
        </Group.List>
      </Group>
    );
  }
};
