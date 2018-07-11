import {
    Boxs,Group
} from 'saltui';
import Plus from 'salt-icon/lib/Plus';

const { HBox,Box } = Boxs;
            
export default ({ list, onClick }) => (
<Group.List >
    {
      list.map(function (item, key) {
        return <HBox key={key} vAlign="center" className="department-list">
                <vBox  vAlign="center" className="t-PR10" onClick={ onClick.bind(this,item.id, 'edit') }>
                  {item.custName} 
                </vBox>
                
                <Box className='t-list-title-date' vAlign="center" onClick={ onClick.bind(this,item.id, 'add') }>
                  <Plus fill={'#42A5F5'} onClick={ onClick.bind(this, item.id, 'add') }/>
                </Box>
              </HBox>

      })
    }
</Group.List >
);
