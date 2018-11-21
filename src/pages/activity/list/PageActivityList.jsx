import { Component } from 'refast';
import React from 'react';
import DB from '../../../app/db';
import { hashHistory } from 'react-router';

import { URLS,noDataImage,selectKeyValues } from '../../../app/variables';

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

import CustActivityListItem from 'pages/activity/list_item';
import SearchCustomerView from 'components/searchCustomerView';
import ActivitySearchView from 'pages/activity/searchView';

import './PageActivityList.less';

const { HBox,VBox, Box } = Boxs; 

const {
  IconButton,
  ButtonGroup,
} = Button;

const { actiThemeProps } = selectKeyValues;

export default class PageActivityList extends Component {

    constructor(props) {
      super(props);
      var token = localStorage.token;

      let query = this.props.location.query;
      let actiNew = !query.actiNew ? null : query.actiNew;
      let actiType = !query.actiType ? "1" : query.actiType;

      let winHeight = getScrollHighWithOther(0, 0, 1, 130);
      this.state = {
        token:token,
        query: {
          pageSize: 10,
          currentPage: 1,
          actiNew: actiNew,
          actiThemes: '',
          actiCustName: null,
          custName: null,
          actiType: actiType,
          order: 'desc',
          orderBy: 'createdDate',
        },
        data: [],
        numbers: {
          totalActi: 0,
          lastTime: '无'
        },
        title:'客户管理',
        addAboutPopVisable: false,
        winHeight:winHeight
      };
    }

    componentDidMount() {
      this.getNumbers();
    }

    componentWillUnmount() {
      Popup.hide();
    }

    handleActivityClick(custId, id, type) {
      hashHistory.push('/activity/form?custId=' + custId + '&id=' + id + '&type=' + type);
    }

    handleActivityAddClick(custId, id, type) {
      hashHistory.push('/activity/form?custId=' + custId + '&id=' + id + '&type=' + type);
    }

    getNumbers = () => {
      const t = this;
      let token = t.state.token;
      if(!token) {
        alert("没有token");
        return;
      }
      let query = t.state.query;

      DB.CrmActivityAPI.getNumbers({
        token: token,
        actiNew: query.actiNew,
        actiCustName: query.actiCustName,
        actiType: query.actiType,
        actiThemes: query.actiThemes.value
      })
      .then((content) => {
        t.setState({
          numbers: content.numbers
        });
      }).catch((error) => {
        t.setState({
          numbers: {
            totalActi: 0,
            lastTime: '无'
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
      let query = t.state.query;
      query.actiCustName = customer.id,
      query.custName = customer.text

      t.setState({
        query: query
      }, ()=> {
        t.refs.acti_lit_ref.fetchData('bottom');
        t.getNumbers();
      });
      Popup.hide();
    }

    handleClickMoreSearch = () => {
      const t = this;
 
      Popup.show(
        <div className="activity-add-popup-container">
          <ActivitySearchView
            actiThemes = { t.state.query.actiThemes }
            selectActiThemes = { t.handleActiThemes }
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

    handleActiThemes = (value)=> {
      const t = this;
      t.setState({
        query: {
          actiThemes: value
        }
      });
    }

    resetSearch = () => {
      const t = this;
      let query = t.state.query;
      query.actiThemes = '';
      query.actiCustName = '';
      query.custName = '';
      query.currentPage = 1;

      t.setState({
        query: query
      });
    }

    search = () => {
      Popup.hide();
      this.refs.acti_lit_ref.fetchData('bottom');
      this.getNumbers();
    }

    /**
     * ScrollList 请求数据之前的函数
     */
    beforeFetchActivity = (data, from) => {
      let activities = this.state.query;
      data.token = this.state.token;
      
      data.actiNew = activities.actiNew;
      data.actiThemes = activities.actiThemes.value;
      data.actiCustName = activities.actiCustName;
      data.actiType = activities.actiType;
      data.order = activities.order;
      data.orderBy = activities.orderBy;
   
      return data;
    }

    render() {
        const t = this;
        const scrollViewStyle = { 'height': this.state.winHeight };
        return (
          <div>
            <VBox className='t-activity-list-top-bg'>
              <HBox className='t-FBH t-ML10 t-MR10 t-PL6 t-MT16 t-H28'>
                <HBox className="t-WS cell-placeholder t-FBH t-BCf t-H28 t-FL t-R12 t-LH28 t-FS14" onClick= { t.onFocusCustName.bind(t) }>
                  <Search fill='rgba(31, 56, 88, 0.3)' width='20px' height='20px' className='t-MT2 t-ML6'/>
                  { !t.state.query.custName ? "客户名称" : t.state.query.custName }</HBox>
                <Plus fill='#fff' onClick={ t.handleClickMoreSearch }/>
              </HBox>
              <VBox className='t-ML10 t-MR10 t-PL6 t-BCf t-activity-list-top-content t-PL10'>
                <HBox className="t-PT8 t-PL20 t-PB14">
                  <Box className="t-FS16">出差总数： { t.state.numbers.totalActi }个</Box>
                </HBox>
                <Flex>
                  <FlexItem>最近出差日期： { t.state.numbers.lastTime }</FlexItem>
                </Flex>
              </VBox>
            </VBox>
            <div style={ scrollViewStyle } className='t-PL10 t-PR10'>
              <ScrollList
                url={ URLS.activity.list }
                dataType="json"
                pageSize={ 10 }
                ref = 'acti_lit_ref'
                beforeFetch = { t.beforeFetchActivity }
              >      
                <CustActivityListItem 
                  showEditButton= { t.state.showAddButton }
                  clickItem= { t.handleActivityClick }/>
              </ScrollList>
            </div> 
            <div className="t-tabs-button">
               <Button type="primary" onClick={ t.handleActivityAddClick.bind(t, '', '', 'create') } >新建出差报告</Button>
            </div>
          </div>
        )
    }
}

