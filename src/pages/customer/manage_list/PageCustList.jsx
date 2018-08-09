import { Component } from 'refast';
import React from 'react';
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
import * as logic from './logic';

const { HBox,VBox, Box } = Boxs; 

const {
  IconButton,
  ButtonGroup,
} = Button;

export default class PageCustList extends Component {

    constructor(props) {
        super(props, logic);
    }

    componentDidMount() {
      this.dispatch('load', 1);      
    }

    clickItem(id,item) {
      if(item == "add"){
        Popup.show(<CustManageAddAboutPop custId={ id } onClick= { this.clickPopItem.bind(this) } />, {
          animationType: 'slide-up',
        });
      } else {
        this.dispatch('edit',id);
      }
    }

    clickPopItem(id,item) {
      console.log(id);
    }

    handleAddClick() {
       hashHistory.push('/customer/add');
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
                     <Button type="primary" onClick={ t.handleAddClick }>新建客户</Button>
                  </div>
            </div>
        )
    }
}

