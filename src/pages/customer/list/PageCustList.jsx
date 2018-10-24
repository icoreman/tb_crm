import { Component } from 'refast';
import React from 'react';
import { hashHistory } from 'react-router';

import {
  Group,
  TextField,
  SelectField,
  Button,
  Toast,
  Boxs,
  Popup,
  SearchBar,
  ScrollList
} from 'saltui';

import CustManageListItem from 'components/customer/cust_manage_list_item';
import CustManageAddAboutPop from 'components/customer/cust_manage_add_about_pop';

import { URLS,noDataImage } from '../../../app/variables';

import './PageCustList.less';

const { 
  HBox,VBox, Box 
} = Boxs; 

const {
  IconButton,
  ButtonGroup,
} = Button;

export default class PageCustList extends Component {

    constructor(props) {
       super(props);

       var scrollViewHeight = getScrollHighWithOther(0, 0, 1, 120);
       let query = this.props.location.query;
       let states = query.states == undefined ? null : query.states;
       let custNew = query.custNew == undefined ? null : query.custNew;

       this.state = {
        dataGetted: false,
        data: [],
        hasError: false,
        query: {
          pageSize: 10,
          currentPage: 1,
          noPass:null,
          customer:null,
          prod_center:null,
          prod_centers:null,
          salesman:null,
          states:states,
          custNew:custNew,
          custStage:null,
          order:null,
          orderBy:null,
        },
        loading: false,
        refreshing: false,
        title:'客户管理',
        addAboutPopVisable: false,
        selectedCustId: null,
        scrollViewHeight:scrollViewHeight
      };
    }

    componentDidMount() {
     
    }

    handleClickItem(id,edit) {
     hashHistory.push('/customer/detail?id=' + id + '&edit=' + edit);
    }

    handleClickItemPlus(id) {
      Popup.show(<CustManageAddAboutPop custId={ id } onClick= { this.handleClickPopItem } />, {
        animationType: 'slide-up',
      });
    }

    handleClickPopItem(id,item) {
      console.log(id);
    }

    handleAddClick() {
      hashHistory.push('/customer/add');
    } 

        /**
     * ScrollList 请求数据之前的函数
     */
    beforeFetch (data, from) {
        data.token = document.getElementById("token").value;
        let query = this.state.query;
        data.noPass = query.noPass;
        data.customer = query.customer;
        data.prod_center = query.prod_center;
        data.prod_centers = query.prod_centers;
        data.salesman = query.salesman;
        data.states = query.states;
        data.custNew = query.custNew;
        data.custStage = query.custStage;
        data.order = query.order;
        data.orderBy = query.orderBy;

        return data;
    }

    render() {
        let t = this;
        let scrollViewStyle = { 'height': t.state.scrollViewHeight };
      
        return (
            <div>
              <VBox className='t-list-top-bg'>
                <VBox className='t-ML10 t-MR10 t-PL6 t-BCf t-list-top-content'>
                  <HBox className="t-PT8 t-PL20 t-PB14">
                    <Box className="t-FS16">客户数量： 0个</Box>
                  </HBox>
                  <HBox>
                    <Box>已评审： 0个</Box>
                    <Box className="t-ML16">评审中： 0个</Box>
                    <Box className="t-ML16">未评审： 0个</Box>
                  </HBox>
                </VBox>
              </VBox>
              
              <div style={ scrollViewStyle } className='t-PL10 t-PR10'>
                <ScrollList
                  url={ URLS.customer.list }
                  dataType="json"
                  pageSize={ t.state.query.pageSize }
                  ref = 'cust_list_ref'
                  noDataImage={noDataImage}
                  beforeFetch ={ t.beforeFetch.bind(this)}
                  currentPageKey="currentPage"
                >          
                  <CustManageListItem 
                    handleClickItem={ t.handleClickItem.bind(this) } 
                    handleClickItemPlus={ t.handleClickItemPlus.bind(this) } />
                </ScrollList>
              </div> 
              <div className="t-tabs-button">
                 <Button  onClick={ t.handleAddClick }>新建客户</Button>
              </div>
            </div>
        )
    }
}

