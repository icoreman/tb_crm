import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Refast, { LogicRender } from 'refast';
import { Component } from 'react';
import { render } from 'react-dom';
import FastClick from 'fastclick';
import { Toast, Dialog } from 'saltui';

import { isDev } from 'variables';
import PageHome from 'pages/home';
import PageFunc from 'pages/func';
import PageCustomerAdd from 'pages/customer/add';
import PageCustomerNew from 'pages/customer/new';
import PageCustomerEdit from 'pages/customer/edit';
import PageCustomerManage from 'pages/customer/manage_list';
import PageCustomerReviewed from 'pages/customer/reviewed';
import PageCustomerToReviewed from 'pages/customer/to_be_reviewed';

import DB from 'db';
import './app.less';

const customHistory = hashHistory;

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
  history: hashHistory,
});

const Loading = () => <div className="kuma-loading" />;
const Empty = () => <div>暂无数据</div>;

// 修改 LogicRender 增加默认配置
// 用来自定义Loading和Empty的样式
LogicRender.defaultProps.Empty = Empty;
LogicRender.defaultProps.Loading = Loading;

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

render(
  <Router history={customHistory}>
    <Route name="app" path="/" component={App}>
      <IndexRoute component={PageHome} />
      <Route path="/home" component={PageHome} />
      <Route path="/func" component={PageFunc} />
      <Route path="/customer/add" component={PageCustomerAdd} />
      <Route path="/customer/new" component={PageCustomerNew} />
      <Route path="/customer/edit" component={PageCustomerEdit} />
      <Route path="/customer/managelist" component={PageCustomerManage} />
      <Route path="/customer/reviewed" component={PageCustomerReviewed} />
      <Route path="/customer/to_be_reviewed" component={PageCustomerToReviewed} />
    </Route>
  </Router>,
  document.getElementById('App'),
);
