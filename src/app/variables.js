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
    customerManageList:urlPrefix+"customer/listCustomerManage"//客户管理list
  },
};
