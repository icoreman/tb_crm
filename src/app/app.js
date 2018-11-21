import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Refast, { LogicRender } from 'refast';
import { Component } from 'react';
import { render } from 'react-dom';
import FastClick from 'fastclick';
import { Toast, Dialog } from 'saltui';
import WeUI from 'react-weui';
import DocumentTitle from 'react-document-title';

import 'weui';

import { isDev } from 'variables';
import PageHome from 'pages/home';
import PageFunc from 'pages/func';
import PageActivityForm from 'pages/activity/form';
import PageActivityList from 'pages/activity/list';
import PageCustomerAdd from 'pages/customer/add';
import PageCustomerDetail from 'pages/customer/detail';
import PageCustomerEdit from 'pages/customer/edit';
import PageCustomerList from 'pages/customer/list';
import PageLinkForm from 'pages/link/form';
import PageLinkScan from 'pages/link/scan';
import PageLinkUpload from 'pages/link/upload';
import PageChanceForm from 'pages/chance/form';
import PageChanceList from 'pages/chance/list';
import PageQuestionForm from 'pages/question/form';
import PageQuestionList from 'pages/question/list';


import DB from 'db';
import './app.less';

const history = hashHistory;

if (isDev && window.chrome && window.chrome.webstore) { // This is a Chrome only hack
  // see https://github.com/livereload/livereload-extensions/issues/26
  setInterval(() => {
    document.body.focus();
  }, 200);
}

// bind fastclick
FastClick.attach(document.body);

// 这里使用 use 来配置 Refast
// Refast 文档 https://recore.github.io/refast-docs/
Refast.use('fn', {
  toast: Toast,
  dialog: Dialog,
  DB,
  history: history,
});

const Empty = () => { return <div>暂无数据</div> };
const Loading = () => { return <div className="kuma-loading"></div> };

// 修改 LogicRender 增加默认配置
// 用来自定义Loading和Empty的样式
LogicRender.defaultProps.Empty = Empty;
LogicRender.defaultProps.Loading = Loading;

class App extends Component {
  constructor(props) {
    super(props);

    var url = window.location.href;
    if(isDev) {
      localStorage.context = 'http://localhost:8080/flexoffice';
      var token = url.substring(url.indexOf("token") + 6, url.indexOf('#'));
      localStorage.token = token;
    } else {
      var params = url.split('&');
      var context = params[0].substring(0,params[0].indexOf('flexoffice') + 11);
      var agentid = params[1].split('=')[1];
      var code = params[2].split('=')[1];
      var baseUrl = url.substring(0,url.indexOf('#'));

      localStorage.context = context;
      localStorage.agentid = agentid;
      localStorage.code = code;
      localStorage.baseUrl = baseUrl;
    }
   
    this.state = {
      title: 'CRM',
    };
  }

  render() {
    return (
      <DocumentTitle title={this.state.title}>
        { this.props.children }
      </DocumentTitle>
    );
  }
}

render(
  <Router history={ history }>
    <Route name="app" path="/" component={App}>
      <IndexRoute component={PageHome} />
      <Route path="/home" component={PageHome} />
      <Route path="/func" component={PageFunc} />
      <Route path="/activity/form" component={PageActivityForm} />
      <Route path="/activity/list" component={PageActivityList} />
      <Route path="/chance/form" component={PageChanceForm} />
      <Route path="/chance/list" component={PageChanceList} />
      <Route path="/customer/detail" component={PageCustomerDetail} />
      <Route path="/customer/add" component={PageCustomerAdd} />
      <Route path="/customer/edit" component={PageCustomerEdit} />
      <Route path="/customer/list" component={PageCustomerList} />
      <Route path="/link/form" component={PageLinkForm} />
      <Route path="/link/scan" component={PageLinkScan} />
      <Route path="/link/upload" component={PageLinkUpload} />
      <Route path="/question/form" component={PageQuestionForm} />
      <Route path="/question/list" component={PageQuestionList} />
    </Route>
  </Router>,
  document.getElementById('App'),
);
