// 这里放置全局的变量
const isDev = __LOCAL__;
const context = document.getElementById('context').value;
//访问链接前缀
const urlPrefix = isDev ? '/mock/' : context+'/client/';

export default {
  urlPrefix,
  isDev,
  // 这里放置全局的调用的URL
  URLS: {
    customerManageList: urlPrefix + "customer/listCustomerManage",//客户管理list
    custToBeReviewedList: urlPrefix + "customer/listCustomerstToBeReviewed",//待评审的客户list
    custReviewedList: urlPrefix + "customer/listCustomerstReviewed",//已评审的客户list
    custNewList: urlPrefix + "customer/listCustomerNew"//新客户
  },
};
