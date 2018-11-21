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

import CustChanceListItem from 'pages/chance/list_item';
import SearchCustomerView from 'components/searchCustomerView';
import ChanceSearchView from 'pages/chance/searchView';

import './PageChanceList.less';

const { HBox,VBox, Box } = Boxs; 

const {
  IconButton,
  ButtonGroup,
} = Button;

export default class PageChanceList extends Component {

    constructor(props) {
      super(props);
      let token = localStorage.token;

      let winHeight = getScrollHighWithOther(0, 0, 1, 120);
      let query = this.props.location.query;
      let chanType = query.chanType == undefined ? null : query.chanType;
      let chanNew = query.chanNew == undefined ? null : query.chanNew;
      
      this.state = {
        token:token,
        query: {
          pageSize: 10,
          currentPage:1,
          chanId:null,
          noClose: null,
          noGroup: 'no',
          noValue: null,
          idall: null,
          chanNew: chanNew,
          chanCenter: null,
          chanCustName: null,
          custName: '',
          chanStages: '',
          chanType: chanType,
          chanNames: '',
          saveType: null,
          order: 'desc',
          orderBy: 'createdDate'
        },
        numbers: {
          totalChance: 0,
          newChance: 0,
          dealChance: 0,
          closeChance: 0
        },
        data: [],
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
      hashHistory.push('/chance/form?custId=' + custId + '&custName=' + custName + '&id=' + id + '&type=' + type);
    }

    handleClickMoreSearch = () => {
      const t = this;
 
      Popup.show(
        <div className="activity-add-popup-container">
          <ChanceSearchView
            chanStages = { t.state.query.chanStages }
            chanNames = { t.state.query.chanNames }
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
      this.refs.chance_lit_ref.fetchData('bottom');
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

      DB.CrmChanceAPI.getNumbers({
        token: token,
        chanId: query.chanId,
        idall: query.idall,
        noClose: query.noClose,
        noGroup: query.noGroup,
        noValue: query.noValue,
        chanNew: query.chanNew,
        chanCenter: query.chanCenter,
        chanCustName: query.chanCustName,
        chanStages: query.chanStages.value,
        chanType: query.chanType,
        saveType: query.saveType
      })
      .then((content) => {
        t.setState({
          numbers: content.numbers
        });
      }).catch((error) => {
        t.setState({
          numbers: {
            totalChance: 0,
            newChance: 0,
            dealChance: 0,
            closeChance: 0
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
      query.chanCustName = customer.id,
      query.custName = customer.text

      t.setState({
        query: query
      }, ()=> {
        t.refs.chance_lit_ref.fetchData('bottom');
        t.getNumbers();
      });
      Popup.hide();
    }


    /**
     * ScrollList 请求数据之前的函数
     */
    beforeFetchChance = (data, from) => {
      var chance = this.state.query;

      data.token = this.state.token;
      data.chanId = chance.chanId;
      data.order = chance.order;
      data.orderBy = chance.orderBy;
      data.idall = chance.idall;
      data.noClose = chance.noClose;
      data.noGroup = chance.noGroup;
      data.noValue = chance.noValue;
      data.chanNew = chance.chanNew;
      data.chanCenter = chance.chanCenter;
      data.chanCustName = chance.chanCustName;
      data.chanNames = chance.chanNames;
      data.chanStages = chance.chanStages.value;
      data.chanType = chance.chanType;
      data.saveType = chance.saveType;

      return data;
    }

    render() {
        const t = this;
        let scrollViewStyle = { 'height': t.state.winHeight };

        return (
          <div>
            <VBox className='t-chance-list-top-bg'>
              <HBox className='t-FBH t-ML10 t-MR10 t-PL6 t-MT16 t-H28'>
                <HBox className="t-WS cell-placeholder t-FBH t-BCf t-H28 t-FL t-R12 t-LH28 t-FS14" onClick= { t.onFocusCustName.bind(t) }>
                  <Search fill='rgba(31, 56, 88, 0.3)' width='20px' height='20px' className='t-MT2 t-ML6'/>
                  { !t.state.query.custName ? "客户名称" : t.state.query.custName }</HBox>
                <Plus fill='#fff' onClick={ t.handleClickMoreSearch }/>
              </HBox>
              <VBox className='t-ML10 t-MR10 t-PL6 t-BCf t-chance-list-top-content'>
                <HBox className="t-PT8 t-PL20 t-PB14">
                  <Box className="t-FS16">商机总数： { t.state.numbers.totalChance }个</Box>
                </HBox>
                <Box className="t-ML10">
                  <Flex>
                    <FlexItem>新建： { t.state.numbers.newChance }个</FlexItem>
                    <FlexItem>跟进中： { t.state.numbers.dealChance }个</FlexItem>
                    <FlexItem>关闭：{ t.state.numbers.closeChance }个</FlexItem>
                  </Flex>
                </Box>
              </VBox>
            </VBox>
            <div style={ scrollViewStyle } className='t-PL10 t-PR10'>
              <ScrollList
                url={ URLS.chance.list }
                dataType="json"
                pageSize={ 10 }
                ref = 'chance_lit_ref'
                beforeFetch ={ t.beforeFetchChance }
              >      
                <CustChanceListItem 
                  showEditButton= { t.state.showAddButton }
                  clickItem= { t.handleQuestionClick }/>
              </ScrollList>
            </div> 

            <div className="t-tabs-button">
               <Button type="primary" onClick={ t.handleQuestionClick.bind(t, '', '', '', 'create') } >新建商机</Button>
            </div>
          </div>
        )
    }
}

