import { Component } from 'refast';
import React from 'react';
import { hashHistory } from 'react-router';
import CustChanceListItem from 'pages/chance/list_item';

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

import { URLS,noDataImage } from '../../../app/variables';

import './PageChanceList.less';

const { HBox,VBox, Box } = Boxs; 

const {
  IconButton,
  ButtonGroup,
} = Button;

export default class PageChanceList extends Component {

    constructor(props) {
      super(props);
      let token = document.getElementById("token").value;

      let winHeight = getScrollHigh(0, 0, 1);
      let query = this.props.location.query;
      let chanType = query.chanType == undefined ? null : query.chanType;
      let chanNew = query.chanNew == undefined ? null : query.chanNew;
      
      this.state = {
        dataGetted: false,
        hasError: false,
        token:token,
        chance: {
          pageSize: 10,
          currentPage:1,
          chanId:null,
          noClose: null,
          noGroup: null,
          noValue: null,
          idall: null,
          chanNew: chanNew,
          chanCenter: null,
          chanCustName: null,
          chanStages: null,
          chanType: chanType,
          chanNames: null,
          saveType: null,
          order: null,
          orderBy: null
        },
        data: [],
        loading: false,
        refreshing: false,
        title:'客户管理',
        addAboutPopVisable: false,
        winHeight:winHeight
      };
    }

    componentDidMount() {
     
    }

    handleQuestionClick(custId, id, type) {
      hashHistory.push('/chance/form?custId=' + custId + '&id=' + id + '&type=' + type);
    }

    /**
     * ScrollList 请求数据之前的函数
     */
    beforeFetchQues(data, from) {
      var chance = this.state.chance;
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
      data.chanStages = chance.chanStages;
      data.chanType = chance.chanType;
      data.saveType = chance.saveType;
  
      return data;
    }

    render() {
        let t = this;
        let scrollViewStyle = { 'height': this.state.winHeight };
        const props = {
          locale: 'zh_CN',
          instantSearch: true,
          hasHistory: true,
          searchDelay: 450,
          onEnter: () => { console.log('enter'); },
          onExit: () => { console.log('exit'); },
          onChange: (value) => {
            console.log(`Typing>>${value}`);
          },
          onSearch: (value) => {
            console.info(`Do search>>${value}`);
            if (t.refs.list) {
              t.refs.list.fetchData({
                keyword: value,
              });
            }
          },
        };

        return (
          <div>
            <div style={ scrollViewStyle }>
              <SearchBar {...props} /> 
              <ScrollList
                url={ URLS.chance.list }
                dataType="json"
                pageSize={ t.state.chance.pageSize }
                ref = 'cust_ques_ref'
                noDataImage={noDataImage}
                beforeFetch ={ t.beforeFetchQues.bind(t)}
                currentPage={ t.state.chance.currentPage }
              >      
                <CustChanceListItem 
                  showEditButton= { t.state.showAddButton }
                  clickItem= { t.handleQuestionClick }/>
              </ScrollList>
            </div> 
            <div className="t-tabs-button">
               <Button type="primary" onClick={ t.handleQuestionClick.bind('', '', 'create') } >新建商机</Button>
            </div>
          </div>
        )
    }
}

