import { Component } from 'refast';
import DB from '../../../app/db';
import CustManageList from 'components/customer/cust_manage_list';
import {
    Group,
    TextField,
    SelectField,
    Button,
    Toast,
    Boxs
} from 'saltui';

import './PageCustList.less';

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
          imageStatus:'none'
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
              imageStatus:'none'
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
      Toast.show({
        type: 'error',
        content: '查询出错'
      });
    }

    render() {
        let t = this;
        return (
            <div className="page-form">
                  <Group>             
                   <CustManageList list={this.state.data} onClick= { this.clickItem.bind(this) }/>
                 </Group>
                 <div className="nodata-wrapper" style={{display:this.state.imageStatus}}>
                      <VBox vAlign="center" hAlign="center" className="nodata">
                          <Box>
                            <i className="iconfont icon-file-search t-FS68 t-FCc"></i>
                          </Box>
                          <Box className="t-FCc"> 
                              暂无数据
                          </Box>
                      </VBox>
                </div>
            </div>
        )
    }
}

