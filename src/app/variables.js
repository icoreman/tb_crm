// 这里放置全局的变量
const isDev = __LOCAL__;
const context = document.getElementById('context').value;
//访问链接前缀
const urlPrefix = isDev ? '/mock/' : context+'/client/';
const crmPrefix = 'tb/crm/';
export default {
  urlPrefix,
  isDev,
  // 这里放置全局的调用的URL
  URLS: {
    customerManageList: urlPrefix + crmPrefix + "customer/listCustomerManage",//客户管理list
    custToBeReviewedList: urlPrefix + crmPrefix + "customer/listCustomerstToBeReviewed",//待评审的客户list
    custReviewedList: urlPrefix + crmPrefix + "customer/listCustomerstReviewed",//已评审的客户list
    custNewList: urlPrefix + crmPrefix + "customer/listCustomerNew",//新客户list
    cust360Info: urlPrefix + crmPrefix + "customer/360Info",//新客户list
    custLinkList: urlPrefix + crmPrefix + "link/listLinkByCustomer"// 通过客户获取对应的联系人
  },
  nodataIcon:context+"/dist/fmui/images/nodata.svg",
  loadingIcon:context+"/dist/fmui/images/loading.gif"
};
