import { Component } from 'refast';
import React from 'react';
import DB from '../../../app/db';
import { hashHistory } from 'react-router';

import { URLS,noDataImage } from '../../../app/variables';

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

import {
  Flex,
  FlexItem,
  Select
} from 'react-weui';

import Plus from 'salt-icon/lib/Plus';
import Search from 'salt-icon/lib/Search';

import CustQuesListItem from 'pages/question/list_item'
import SearchCustomerView from 'components/searchCustomerView';
import QuestionSearchView from 'pages/question/searchView';

import './PageQuesList.less';

const { HBox,VBox, Box } = Boxs; 

const {
  IconButton,
  ButtonGroup,
} = Button;

export default class PageQuesList extends Component {

    constructor(props) {
      super(props);
      let token = localStorage.token;

      let query = this.props.location.query;
      let quesNew = !query.quesNew ? null : query.quesNew;

      let winHeight = getScrollHighWithOther(0, 0, 1, 130);
      this.state = {
        token:token,
        query: {
          pageSize: 10,
          currentPage: 1,
          quesId: null,
          noClose: null,
          noGroup: null,
          noValue: null,
          idall: null,
          quesNew: quesNew,
          quesCenter: null,
          quesCustName: null,
          custName: '',
          quesState: '',
          quesDescs: null,
          saveType: null,
          order: 'desc',
          orderBy: 'createdDate',
        },
        numbers: {
          totalQues: 0,
          newQues: 0,
          dealQues: 0,
          closeQues: 0
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

    handleQuestionClick(custId, custName, id, type) {
      hashHistory.push('/question/form?custId=' + custId + '&custName=' + custName + '&id=' + id + '&type=' + type);
    }

    handleClickMoreSearch = () => {
      const t = this;
 
      Popup.show(
        <div className="activity-add-popup-container">
          <QuestionSearchView
            quesState = { t.state.query.quesState }
            quesDescs = { t.state.query.quesDescs }
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
      const t = this;
      t.setState({
        query: {
          chanStages: '',
          chanNames: ''
        }
      });
    }

    search = () => {
      Popup.hide();
      this.refs.ques_list_ref.fetchData('bottom');
      this.getNumbers();
    }

    getNumbers = () => {
      const t = this;
      let token = t.state.token;
      if(!token) {
        alert("没有token");
        return;
      }
      let query = t.state.query;

      DB.CrmQustionAPI.getNumbers({
        token: token,
        quesId: query.quesId,
        idall: query.idall,
        noClose: query.noClose,
        noGroup: query.noGroup,
        noValue: query.noValue,
        quesNew: query.quesNew,
        quesCenter: query.quesCenter,
        quesCustName: query.quesCustName,
        quesState: !query.quesState ? null : query.quesState.value,
        quesDescs: query.quesDescs,
        saveType: query.saveType
      })
      .then((content) => {
        t.setState({
          numbers: content.numbers
        });
      }).catch((error) => {
        t.setState({
          numbers: {
            totalQues: 0,
            newQues: 0,
            dealQues: 0,
            closeQues: 0
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
            type='sample' 
            clickCell= { (customer) => t.clickSelectCustomer(customer) }/>
        </div>, {
          animationType: 'slide-right'
      });

    }

    clickSelectCustomer = (customer) => {
      const t = this;
      t.setState({
        query: {
          quesCustName: customer.id,
          custName: customer.text
        }
      }, ()=> {
        t.refs.ques_list_ref.fetchData('bottom');
        t.getNumbers();
      });
      Popup.hide();
    }

    /**
     * ScrollList 请求数据之前的函数
     */
    beforeFetchQues = (data, from) => {
      let query = this.state.query;
      data.token = this.state.token;
      data.quesId = query.quesId;
      data.order = query.order;
      data.orderBy = query.orderBy;
      data.idall = query.idall;
      data.noClose = query.noClose;
      data.noGroup = query.noGroup;
      data.noValue = query.noValue;
      data.quesNew = query.quesNew;
      data.quesCenter = query.quesCenter;
      data.quesCustName = query.quesCustName;
      data.quesState = !query.quesState ? null : query.quesState.value;
      data.quesDescs = query.saveType;
      data.saveType = query.orderBy;
 
      return data;
    }

    render() {
        let t = this;
        let scrollViewStyle = { 'height': t.state.winHeight };

        return (
          <div>
            <VBox className='t-question-list-top-bg'>
              <HBox className='t-FBH t-ML10 t-MR10 t-PL6 t-MT16 t-H28'>
                <HBox className="t-WS cell-placeholder t-FBH t-BCf t-H28 t-FL t-R12 t-LH28 t-FS14" onClick= { t.onFocusCustName.bind(t) }>
                  <Search fill='rgba(31, 56, 88, 0.3)' width='20px' height='20px' className='t-MT2 t-ML6'/>
                  { !t.state.query.custName ? "客户名称" : t.state.query.custName }</HBox>
                <Plus fill='#fff' onClick={ t.handleClickMoreSearch }/>
              </HBox>
              <VBox className='t-ML10 t-MR10 t-PL6 t-BCf t-question-list-top-content'>
                <HBox className="t-PT8 t-PL20 t-PB14">
                  <Box className="t-FS16">问题总数： { t.state.numbers.totalQues }个</Box>
                </HBox>
                <Box className="t-ML10">
                  <Flex>
                    <FlexItem>新问题： { t.state.numbers.newQues }个</FlexItem>
                    <FlexItem>处理中： { t.state.numbers.dealQues }个</FlexItem>
                    <FlexItem>已关闭： { t.state.numbers.closeQues }个</FlexItem>
                  </Flex>
                </Box>
              </VBox>
            </VBox>
            <div style={ scrollViewStyle } className='t-PL10 t-PR10'>
              <ScrollList
                url={ URLS.question.list }
                dataType="json"
                ref="ques_list_ref"
                pageSize={ 10 }
                beforeFetch = { t.beforeFetchQues }
              >      
                <CustQuesListItem 
                  showEditButton= { t.state.showAddButton }
                  clickItem= { t.handleQuestionClick }/>
              </ScrollList>
            </div> 
            <div className="t-tabs-button">
               <Button type="primary" onClick={ t.handleQuestionClick.bind(t, '', '', '', 'create') } >新建问题</Button>
            </div>
          </div>
        )
    }
}

