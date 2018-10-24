import { Component } from 'refast';
import React from 'react';
import { hashHistory } from 'react-router';
import CustQuesListItem from 'pages/question/list_item'

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

import './PageQuesList.less';

const { HBox,VBox, Box } = Boxs; 

const {
  IconButton,
  ButtonGroup,
} = Button;

export default class PageQuesList extends Component {

    constructor(props) {
      super(props);
      var token = document.getElementById("token").value;

      let query = this.props.location.query;
      let quesNew = query.quesNew == undefined ? null : query.quesNew;

      var winHeight = getScrollHigh(0, 0, 1);
      this.state = {
        dataGetted: false,
        hasError: false,
        token:token,
        questions: {
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
          quesState: null,
          quesDescs: null,
          saveType: null,
          order: null,
          orderBy: null,
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
      hashHistory.push('/question/form?custId=' + custId + '&id=' + id + '&type=' + type);
    }

    /**
     * ScrollList 请求数据之前的函数
     */
    beforeFetchQues(data, from) {
      var questions = this.state.questions;
      data.token = this.state.token;
      data.quesId = questions.quesId;
      data.order = questions.order;
      data.orderBy = questions.orderBy;
      data.idall = questions.idall;
      data.noClose = questions.noClose;
      data.noGroup = questions.noGroup;
      data.noValue = questions.noValue;
      data.quesNew = questions.quesNew;
      data.quesCenter = questions.quesCenter;
      data.quesCustName = questions.quesCustName;
      data.quesState = questions.quesState;
      data.quesDescs = questions.saveType;
      data.saveType = questions.orderBy;
  
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
                url={ URLS.question.list }
                dataType="json"
                pageSize={ t.state.questions.pageSize }
                ref = 'cust_ques_ref'
                noDataImage={noDataImage}
                beforeFetch ={ t.beforeFetchQues.bind(t)}
                currentPage={ t.state.questions.currentPage }
              >      
                <CustQuesListItem 
                  showEditButton= { t.state.showAddButton }
                  clickItem= { t.handleQuestionClick }/>
              </ScrollList>
            </div> 
            <div className="t-tabs-button">
               <Button type="primary" onClick={ t.handleQuestionClick.bind(t, '', '', 'create') } >新建问题</Button>
            </div>
          </div>
        )
    }
}

