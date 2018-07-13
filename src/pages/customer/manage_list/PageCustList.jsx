import { Component } from 'refast';
import DB from '../../../app/db';
import CustManageListItem from 'components/customer/cust_manage_list_item';
import CustManageAddAboutPop from 'components/customer/cust_manage_add_about_pop';
import {
    Group,
    TextField,
    SelectField,
    Button,
    Toast,
    Boxs,
    Popup
} from 'saltui';

import './PageCustList.less';
import { hashHistory } from 'react-router';

const { HBox,VBox, Box } = Boxs; 

const {
  IconButton,
  ButtonGroup,
} = Button;

export default class PageCustList extends Component {

    constructor(props) {
        super(props);
        let t = this;

        t.state = {
          title:'',
          data:[],
          imageStatus:'none',
          addAboutPopVisable: false,
          selectedCustId: null
        };

        dd.biz.navigation.setTitle({
          title : "客户管理",//控制标题文本，空字符串表示显示默认文本
          onSuccess : function(result) {

          },
          onFail : function(err) {}
        });
    }

    componentDidMount() {
     
      DB.SomeModuleAPI.customerManageList({
        page:1,
        pageSize:15
      })
         .then((content) => {
          if(content.data.length>0){
            this.setState({
              data:content.data,
              imageStatus:'none',
            });
          }else{
             this.setState({
              data:content.data,
              imageStatus:'block'
            });
          }
        }).catch((error) => {
           alert('--' + error);
            // 失败 or 有异常被捕获
            this.setState({
              data:[],
              imageStatus:'block'
            });
            Toast.show({
            type: 'error',
            content: '查询出错'
             });
        });
    }

    clickItem(id,item) {
      if(item == "add"){
        Popup.show(<CustManageAddAboutPop custId={ id } onClick= { this.clickPopItem.bind(this) } />, {
          animationType: 'slide-up',
        });
      } else {
        hashHistory.push('/customer/edit?id='+id);
      }
    }

    clickPopItem(id,item) {
      console.log(id);
    }

    render() {
        let t = this;
        return (
            <div className="page-form">
                  <Group>             
                   <CustManageListItem list={t.state.data} onClick= { t.clickItem.bind(this) }/>
                  </Group>
                  <div className="nodata-wrapper" style={{display:t.state.imageStatus}}>
                      <VBox vAlign="center" hAlign="center" className="nodata">
                          <Box>
                            <i className="iconfont icon-file-search t-FS68 t-FCc"></i>
                          </Box>
                          <Box className="t-FCc"> 
                              暂无数据
                          </Box>
                      </VBox>
                  </div>
                  <div className="t-tabs-button">
                     <Button type="primary" onClick={ t.handleClick }>新建客户</Button>
                  </div>
            </div>
        )
    }
}

