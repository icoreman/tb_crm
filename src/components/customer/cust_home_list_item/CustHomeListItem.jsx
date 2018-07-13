import {
    Boxs,Group,Grid
} from 'saltui';
import Plus from 'salt-icon/lib/Plus';
import './CustHomeListItem.less'

const { HBox,Box,VBox } = Boxs;
            
export default ({ list, onClick }) => (
<Group.List >
    {
      list.map(function (item, key) {
        return  <HBox key={key} className="cust-manage-list" vAlign="center">
                  <VBox  className="t-FBV t-FB1 t-PL10 " onClick={ onClick.bind(this,item.id) }>
                    <HBox className="cust-manage-content-list">
                        <HBox className="item-left">{ item.custName }</HBox>
                    </HBox>
                    <HBox className="cust-manage-content-list">
                      <HBox className="item-left">客户等级： { item.custLevel }</HBox>
                    </HBox>
                    <HBox className="cust-manage-content-list">
                      <HBox className="item-left">创建时间： { item.createDate }</HBox>
                      <HBox className="item-right">创建人：{ item.createName }</HBox>  
                    </HBox>
                  </VBox>
                </HBox>

      })
    }
</Group.List >
);
