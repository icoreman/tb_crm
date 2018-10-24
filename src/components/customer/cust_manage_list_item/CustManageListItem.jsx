import { Component } from 'refast';
import {
    Boxs,Group,Grid
} from 'saltui';
import Plus from 'salt-icon/lib/Plus';
import './CustManageListItem.less'

const { HBox,Box,VBox } = Boxs;
            
export default class CustManageListItem extends Component {
  constructor(props){
    super(props);
  }

  handleClickItem(id,edit) {
    this.props.handleClickItem(id,edit);
  }

  handleClickItemPlus(id) {
    this.props.handleClickItemPlus(id);
  }
 
  render()  {
    var t = this;
    let data= t.props;

    return (
      <Group className="cust-manage-list">
        <Group.List>
          <HBox key={data.id} vAlign="center">
            <VBox  className="t-FBV t-FB1 t-PL10 " onClick={ t.handleClickItem.bind(this, data.id, data.custEdit) }>
              <HBox className="cust-manage-content-list">
                  <HBox className="t-MT8 t-Omit t-Omit t-FS16">{ data.custName }</HBox>
              </HBox>
              <HBox className="cust-manage-content-list t-PT4">
                <Box className="t-Omit t-FS14">客户分类： { data.custCategory }</Box>
              </HBox>
              <HBox className="cust-manage-content-list">
                <Box className="item-left ">客户阶段： { data.custStage }</Box>
                <Box className="item-right t-Omit t-FS14">{ data.reviewState }</Box>  
              </HBox>
            </VBox>
            <VBox className="t-list-title-date t-PR10" hAlign="center" >
              <Plus fill={'#42A5F5'} onClick={ t.handleClickItemPlus.bind(this,data.id) }/>
            </VBox>
          </HBox>
        </Group.List>
      </Group>
    );
  }
};
