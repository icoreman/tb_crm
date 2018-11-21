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
  Form,
  Flex,
  FlexItem,
  Select
} from 'react-weui';

import Plus from 'salt-icon/lib/Plus';
import Search from 'salt-icon/lib/Search';

import ActivityChanceListItem from 'pages/chance/activity_list_item';
import SearchCustomerView from 'components/searchCustomerView';
import ChanceSearchView from 'pages/chance/searchView';

import './ActivityChanceList.less';

const { HBox,VBox, Box } = Boxs; 

const {
  IconButton,
  ButtonGroup,
} = Button;

export default class ActivityChanceList extends Component {

    constructor(props) {
      super(props);
      let token = localStorage.token;

      let winHeight = getScrollHighWithOther(0, 0, 1, 120);

      this.state = {
        token:token,
        query: {
          pageSize: 10,
          currentPage:1,
          chanId: null,
          noClose: 'ok',
          noGroup: 'no',
          noValue: null,
          idall: null,
          chanNew: '',
          chanCenter: null,
          chanCustName: props.custId,
          custName: props.custName,
          chanStages: '',
          chanType: '',
          chanNames: '',
          saveType: null,
          order: 'desc',
          orderBy: 'createdDate'
        },
        data: [],
        selectedData: !props.defaultData ? [] : props.defaultData,
        winHeight:winHeight
      };
    }

    componentDidMount() {
      
    }

    componentWillUnmount() {
      Popup.hide();
    }

    handleCancle = () => {
      Popup.hide();
    }

    handleComfirm = () => {
      Popup.hide();
      this.props.handleComfirm(this.state.selectedData);
    }

    handleClickCheckbox = (data) => {
      const t = this;
      let selectedData = t.state.selectedData; 
      let length = selectedData.length;

      if(length == 0) {
        let tempData = t.changeData(data);
        selectedData.push(tempData);
        t.setState({
          selectedData:selectedData
        });
        return;
      }

      let isexist = false;
      for(let i = 0; i < length; i ++) {
        let chance = selectedData[i];
        if(chance.id == data.id) {
          isexist = true;
          selectedData.splice(i,1);
          break;
        }
      }

      if(!isexist) {
        let tempData = t.changeData(data);
        selectedData.push(tempData);
      }
 
      t.setState({
        selectedData:selectedData
      });
    }

    /**
     * 把获取商机接口获取的data转成建活动所需要的data格式
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    changeData = (data) => {
      let tempData = {
        id: data.id,
        actiRecord: '',
        actiResult: '',
        actiLeftQues: '',
        actiSupport: '',
        actiNextStep: '',
        chanName: data.chanName,
        chanStage: data.chanStage,
        chanTime: data.chanTime
      };
      return tempData;
    }

    /**
     * ScrollList 请求数据之前的函数
     */
    beforeFetchQues = (data, from) => {
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
            <VBox>
              <HBox className='t-FBH t-ML10 t-MR10 t-PL6 t-MT16 t-H28'>
                <HBox className="t-WS cell-placeholder t-FBH t-BCf t-H28 t-FL t-R12 t-LH28 t-FS14" >
                  <Search fill='rgba(31, 56, 88, 0.3)' width='20px' height='20px' className='t-MT2 t-ML6'/>
                  { t.state.query.custName }</HBox>
              </HBox>
            </VBox>
            <div style={ scrollViewStyle } className='t-PL10 t-PR10'>
              <ScrollList
                url={ URLS.chance.list }
                dataType="json"
                pageSize={ 10 }
                ref = 'chance_lit_ref'
                beforeFetch ={ t.beforeFetchQues }
              >      
               <ActivityChanceListItem
                  clickCheckbox={(data) => t.handleClickCheckbox(data) } 
                  defaultData={ t.state.selectedData }/>
              </ScrollList>
            </div> 
            <div className="t-tabs-button">
              <Button.Group>
                  <Button type="secondary" display="inline" onClick={ t.handleCancle } >取消</Button>
                  <Button type="primary" display="inline" onClick={ t.handleComfirm } >确认</Button>
                </Button.Group>
            </div>
          </div>
        )
    }
}

