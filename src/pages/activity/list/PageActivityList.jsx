import { Component } from 'refast';
import React from 'react';
import { hashHistory } from 'react-router';
import CustActivityListItem from 'pages/activity/list_item';

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

import './PageActivityList.less';

const { HBox,VBox, Box } = Boxs; 

const {
  IconButton,
  ButtonGroup,
} = Button;

export default class PageActivityList extends Component {

    constructor(props) {
      super(props);
      var token = document.getElementById("token").value;

      let query = this.props.location.query;
      let actiNew = query.actiNew == undefined ? null : query.actiNew;
      let actiStages = query.actiStages == undefined ? null : query.actiStages;

      var winHeight = getScrollHigh(0, 0, 1);
      this.state = {
        dataGetted: false,
        hasError: false,
        token:token,
        activities: {
          pageSize: 10,
          currentPage: 1,
          actiNew: actiNew,
          actiThemes: null,
          actiCustName: null,
          actiStages: actiStages,
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

    handleActivityClick(custId, id, type) {
      hashHistory.push('/activity/form?custId=' + custId + '&id=' + id + '&type=' + type);
    }

    /**
     * ScrollList 请求数据之前的函数
     */
    beforeFetchActivity(data, from) {
      let activities = this.state.activities;
      data.token = this.state.token;
      
      data.currentPage = activities.currentPage;
      data.actiNew = activities.actiNew;
      data.actiThemes = activities.actiThemes;
      data.actiCustName = activities.actiCustName;
      data.actiStages = activities.actiStages;
      data.order = activities.order;
      data.orderBy = activities.orderBy;
  
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
                url={ URLS.activity.list }
                dataType="json"
                pageSize={ t.state.activities.pageSize }
                ref = 'activity_ref'
                noDataImage={noDataImage}
                beforeFetch ={ t.beforeFetchActivity.bind(t)}
                currentPage={ t.state.activities.currentPage }
              >      
                <CustActivityListItem 
                  showEditButton= { t.state.showAddButton }
                  clickItem= { t.handleActivityClick }/>
              </ScrollList>
            </div> 
            <div className="t-tabs-button">
               <Button type="primary" onClick={ t.handleActivityClick.bind(t, '', '', 'create') } >新建出差报告</Button>
            </div>
          </div>
        )
    }
}

