import { Component } from 'refast';
import React from 'react';
import DB from '../../../app/db';
import { URLS,noDataImage,selectKeyValues } from '../../../app/variables';
import { hashHistory } from 'react-router';

import {
  Group,
  TextField,
  Button,
  Toast,
  Boxs,
  Popup,
  SearchBar,
  ScrollList
} from 'saltui';

import {
  Flex,
  FlexItem,
  Select
} from 'react-weui';

import Plus from 'salt-icon/lib/Plus';
import Search from 'salt-icon/lib/Search';

import CustManageListItem from 'components/customer/cust_manage_list_item';
import CustManageAddAboutPop from 'components/customer/cust_manage_add_about_pop';
import SearchCustomerView from 'components/searchCustomerView';// 这个是搜索客户的
import CustomerSearchView from 'pages/customer/searchView';// 这个是其他的搜索



import './PageCustList.less';

const { 
  HBox,VBox, Box 
} = Boxs; 

const {
  IconButton,
  ButtonGroup,
} = Button;

const {
  weuiCustStageProps
} = selectKeyValues;

export default class PageCustList extends Component {

    constructor(props) {
       super(props);

       var scrollViewHeight = getScrollHighWithOther(0, 0, 1, 130);
       let query = this.props.location.query;
       let states = !query.states ? null : query.states;
       let custNew = !query.custNew ? null : query.custNew;

       this.state = {
        query: {
          pageSize: 10,
          currentPage: 1,
          noPass:null,
          custId: null,
          custName: '',
          prod_centers:'',
          salesman:'',
          states:states,
          custNew:custNew,
          custStage:null,
          order:'desc',
          orderBy:'createdDate',
        },
        numbers: {
          totalCust: 0,
          reviewingCust: 0,
          unReviewCust: 0,
          passCust: 0,
          noPassCust: 0
        },
        selectOfCenter: [],
        title:'客户管理',
        selectedCustId: null,
        scrollViewHeight:scrollViewHeight
      };
    }

    componentDidMount() {
      const t= this;
      t.getNumbers();

      let token = localStorage.token;
      DB.CrmUserAPI.getSelectOfCenter({
        token: token
      })
      .then((content) => {
        t.setState({
            selectOfCenter: content
        });
      })
      .catch((error) => {
        // 失败 or 有异常被捕获
        t.setState({
          selectOfCenter:[]
        });
        Toast.show({
          type: 'error',
          content: '获取用户产品中心失败'
        });
      });
    }

    componentWillUnmount() {
      Popup.hide();
    }

    handleClickItem(id,edit) {
     hashHistory.push('/customer/detail?id=' + id + '&edit=' + edit);
    }

    handleClickItemPlus(id, custName) {
      Popup.show(<CustManageAddAboutPop custId={ id } custName={ custName } handleClickPopItem= { this.handleClickPopItem } />, {
        animationType: 'slide-up',
      });
    }

    handleClickPopItem(id, custName, item) {
      Popup.hide();
      hashHistory.push('/' + item + '/form?type=create&custId='+id + '&custName=' + custName);
    }

    handleAddClick() {
      hashHistory.push('/customer/add');
    } 

    handleClickMoreSearch = () => {
      const t = this;
      let query = t.state.query;
      Popup.show(
        <div className="activity-add-popup-container">
          <CustomerSearchView
            salesman= { query.salesman }
            prod_centers={ query.prod_centers }
            selectOfCenter= { t.state.selectOfCenter }
            handleChange= { t.handelSearchChange }
            resetSearch = { t.resetSearch }
            search = { t.search }
          />
        </div>, {
        animationType: 'slide-left'
      });
    }
    
    handelSearchChange = (label,value) => {
      this.setState({
        query: {
          [label]: value
        } 
      });
    }

    resetSearch = () => {
      this.setState({
        query:{
          custName: '',
          salesman: '',
          prod_centers: ''
        } 
      })
    }

    search = () => {
      const t = this;
      t.refs.cust_list_ref.fetchData('bottom');
      t.getNumbers();
      Popup.hide();
    }

    getNumbers = () => {
      const t = this;
      let token = localStorage.token;
      if(!token) {
        alert("没有token");
        return;
      }
      let query = t.state.query;
      DB.CrmCustomerAPI.getNumbers({
        token: token,
        noPass: query.noPass,
        customer: query.custId,
        prod_centers: !query.prod_centers ? null : query.prod_centers.value,
        salesman: query.salesman,
        states: query.states,
        custNew: query.custNew,
        custStage: query.custStage
      })
      .then((content) => {
        t.setState({
          numbers: content.numbers
        });
      }).catch((error) => {
        t.setState({
          numbers: {
            totalCust: 0,
            reviewingCust: 0,
            unReviewCust: 0,
            passCust: 0,
            noPassCust: 0
          }
        });
        Toast.show({
          type: 'error',
          content: '查询数量出错'
        });
      });
    }

    onFocusCustName(){
      const t = this;

      Popup.show(
        <div className="activity-add-popup-container">
          <SearchCustomerView 
            defaultValue={ t.state.query.custName } 
            clickCell= { (customer) => t.clickSelectCustomer(customer) }/>
        </div>, {
          animationType: 'slide-right'
      });

    }  

    clickSelectCustomer = (customer) => {
      const t = this;
      t.setState({
        query: {
          custId: customer.id,
          custName: customer.text
        }
      }, ()=> {
        t.search();
      });
      Popup.hide();
    }

    handleChange(label, value) {
      const t = this;
      let query = t.query;
      query[lable] = value;
      t.setState({
          query: query
      });
    }


    /**
     * ScrollList 请求数据之前的函数
     */
    beforeFetch = (data, from)  => {
      const t = this;

      let query = t.state.query;
      data.token = localStorage.token;
      data.noPass = query.noPass;
      data.customer = query.custId;
      data.prod_centers = !query.prod_centers ? null : query.prod_centers.value;
      data.salesman = query.salesman;
      data.states = query.states;
      data.custNew = query.custNew;
      data.custStage = query.custStage;
      data.order = query.order;
      data.orderBy = query.orderBy;

      return data;
    }

    render() {
        const t = this;
        let scrollViewStyle = { 'height': t.state.scrollViewHeight };
      
        return (
            <div>
              <VBox className='t-list-top-bg'>
                <HBox className='t-FBH t-ML10 t-MR10 t-PL6 t-MT16 t-H28'>
                  <HBox className="t-WS cell-placeholder t-FBH t-BCf t-H28 t-FL t-R12 t-LH28 t-FS14" onClick= { t.onFocusCustName.bind(t) }>
                    <Search fill='rgba(31, 56, 88, 0.3)' width='20px' height='20px' className='t-MT2 t-ML6'/>
                    { !t.state.query.custName ? "客户名称" : t.state.query.custName }</HBox>
                  <Plus fill='#fff' onClick={ t.handleClickMoreSearch }/>
                </HBox>
                <VBox className='t-ML10 t-MR10 t-PL6 t-BCf t-list-top-content'>
                  <HBox className="t-PT8 t-PL20 t-PB14">
                    <Box className="t-FS16">客户数量： { t.state.numbers.totalCust }个</Box>
                  </HBox>
                  <Box className="t-MT6 t-ML6">
                    <Flex>
                      <FlexItem>评审通过： { t.state.numbers.passCust }个</FlexItem>
                      <FlexItem>评审未通过： { t.state.numbers.noPassCust }个</FlexItem>
                    </Flex>
                  </Box>
                  <Box className="t-MT6 t-ML6">
                    <Flex>
                      <FlexItem>评审中： { t.state.numbers.reviewingCust }个</FlexItem>
                      <FlexItem>未评审： { t.state.numbers.unReviewCust }个</FlexItem>
                    </Flex>
                  </Box>  
                </VBox>
              </VBox>
              
              <div style={ scrollViewStyle } className='t-PL10 t-PR10'>
                <ScrollList
                  url={ URLS.customer.list }
                  dataType="json"
                  pageSize={ 10 }
                  ref='cust_list_ref'
                  beforeFetch ={ t.beforeFetch }
                >          
                  <CustManageListItem 
                    handleClickItem={ t.handleClickItem.bind(t) } 
                    handleClickItemPlus={ t.handleClickItemPlus.bind(t) } />
                </ScrollList>
              </div> 
              <div className="t-tabs-button">
                <Button  onClick={ t.handleAddClick }>新建客户</Button>
              </div>
            </div>
        )
    }
}

