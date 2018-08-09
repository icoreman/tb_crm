import {
    Boxs,Group,Grid
} from 'saltui';
import './CustLinkListItem.less'

const { HBox,Box,VBox } = Boxs;
            
export default ({ list, onClick }) => (
<Group.List >
    {
      list.map(function (item, key) {
        return  <HBox key={key} className="cust-manage-list" vAlign="center">
                  <VBox  className="t-FBV t-FB1 t-PL10 cust-manage-content-list" onClick={ onClick.bind(this,item.id) }>
                    <HBox className="item-left">姓名：{ item.linkName }</HBox>
                    <HBox className="item-left">电话：{ item.linkTele }</HBox>
                    <HBox className="item-left">邮箱：{ item.linkEmail }</HBox>
                  </VBox>
                  <VBox className="t-list-title-date t-PR10" hAlign="center" >
                    <a fill={'#42A5F5'} onClick={ onClick.bind(this, item.id) }>编辑</a>
                  </VBox>
                </HBox>
      })
    }
</Group.List >
);
