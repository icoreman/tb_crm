import { Component } from 'refast';
import React from 'react';
import DB from '../../app/db';
import { Scroller,Group,Button,Toast,SearchBar } from 'saltui';

import WeUI from 'react-weui';

const {
  Cells,
  Cell,
  CellBody,
  CellFooter
} = WeUI;
    


import { URLS } from '../../app/variables';

import './SearchCustomerView.less';

export default class SearchCustomerView extends Component {
  constructor(props) {
    super(props);
    let token = localStorage.token;
    let scrollViewHeight = getScrollHighWithOther(0, 0, 0, 80);

    this.state = {
      token:token,
      selectOfCustomer: [],
      showOfCustomer: [],
      scrollViewHeight: scrollViewHeight,
      defaultValue: props.defaultValue,
      type: props.type
    };
  }

  handleClickCell(customer) {
    const t = this;
    t.props.clickCell(customer);
  }

  render() {
    const t = this;
    var token = t.state.token;
    if(!token) {
      alert("没有token");
      return;
    }

    let scrollViewStyle = {'height': t.state.scrollViewHeight,'overflowX': 'hidden'};
    let showOfCustomer = t.state.showOfCustomer;

    const props = {
      locale: 'zh_CN',
      instantSearch: true,
      searchDelay: 350,
      value: t.state.defaultValue,
      onEnter: () => {
        DB.CrmCustomerAPI.getCustomer({
          token: token,
          type: t.state.type
        })
        .then((content) => {
          t.setState({
              selectOfCustomer: content
          });
          if(!t.state.defaultValue) {
            let i = 0;
            content.forEach(function (customer,index){
              if(customer.text.indexOf(t.state.defaultValue) > -1) {
                showOfCustomer[i] = customer;
                i++;
              }
            });
            t.setState({
              showOfCustomer: showOfCustomer
            });
          }
        })
        .catch((error) => {
          // 失败 or 有异常被捕获
          t.setState({
            selectOfCustomer:[]
          });
          Toast.show({
            type: 'error',
            content: '获取用户所拥有的客户失败' + error.msg
          });
        });
      },
      onSearch: (value) => {
        var selectOfCustomer = t.state.selectOfCustomer;
        if(!value) {
          showOfCustomer = selectOfCustomer;
        } else {
          showOfCustomer = [];
          let i = 0;
          selectOfCustomer.map(function (customer){
            if(customer.text.indexOf(value) > -1) {
              showOfCustomer[i] = customer;
              i++;
            }
          });
        } 
        t.setState({
          showOfCustomer: showOfCustomer
        });
      }
    };

    return (
      <div>
        <SearchBar {...props} />
        <Scroller style= { scrollViewStyle } mouseWheel>
          <Cells>
              {
                showOfCustomer.map(function (customer) {
                  return (
                    <Cell key={ customer.id } access onClick={ t.handleClickCell.bind(t,customer) }>
                      <CellBody>
                        { customer.text }
                      </CellBody>
                      <CellFooter/>
                    </Cell>
                  );
                })
              }
          </Cells>
        </Scroller>
      </div>
    );
  }
}