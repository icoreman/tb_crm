import {
    Boxs,Group,Grid
} from 'saltui';
import Plus from 'salt-icon/lib/Plus';
import './CustManageListItem.less'

const { HBox,Box,VBox } = Boxs;
            
export default ({ list, onClick }) => (
<Group.List >
    {
      list.map(function (item, key) {
        return  <HBox key={key} className="cust-manage-list" vAlign="center">
                  <VBox  className="t-FBV t-FB1 t-PL10 " onClick={ onClick.bind(this,item.id, 'edit') }>
                    <HBox className="cust-manage-content-list">
                        <HBox className="item-left">{ item.custName }</HBox>
                    </HBox>
                    <HBox className="cust-manage-content-list">
                      <HBox className="item-left">客户分类： { item.custMainCustomer }</HBox>
                      <HBox className="item-right">客户阶段： { item.custStage }</HBox>  
                    </HBox>
                    <HBox className="cust-manage-content-list">
                      <HBox className="item-left">未更新天数： { item.noUpdateDays }</HBox>
                      <HBox className="item-right">{ item.custStage }</HBox>  
                    </HBox>
                  </VBox>
                
                  <VBox className="t-list-title-date t-PR10" hAlign="center" >
                    <Plus fill={'#42A5F5'} onClick={ onClick.bind(this, item.id, 'add') }/>
                  </VBox>
                </HBox>

      })
    }
</Group.List >
);
