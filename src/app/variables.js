// 这里放置全局的变量
const isDev = true;
//const context = 'http://crm.topband.com.cn:18081/flexoffice/';
const context = 'http://localhost:8080/flexoffice/';

const crmPrefix = 'api/tb/crm/';
const commonPrefix = 'api/tb/crm/common/';
export default {
  crmPrefix: crmPrefix,
  isDev: isDev,
  context: context,
  // 这里放置全局的调用的URL
  URLS: {
    common: {
      createFile: context + commonPrefix + 'createFile',
      getImgInfo: context + commonPrefix + 'getImgInfo' //获取名片信息
    },
    customer: {
      list: context + crmPrefix + "customer/getCustomerPage",//客户管理list
      get: context + crmPrefix + "customer/getCustomerAndReview",//客户管理详情
      create: context + crmPrefix + "customer/create",// 新增客户
      checkIsExistByName: context + crmPrefix + "customer/checkIsExistByName", // 检查是否存在
      getCustomer: context + crmPrefix + "customer/getCustomer" // 获取一个人的能管理所有客户
    },
    link: {
      list: context + crmPrefix + "link/getLinkPage",// 联系人list
      listByCustId: context + crmPrefix + "link/listByCustId",
      create: context + crmPrefix + "link/create",// 新增联系人
      get: context + crmPrefix + "link/get", //获取详情
      update: context + crmPrefix + "link/update" //更新详情
    },
    question: {
      list: context + crmPrefix + "question/getQuestionPage",// 问题列表
      create: context + crmPrefix + "question/create",// 新增问题
      get: context + crmPrefix + "question/get", //获取详情
      update: context + crmPrefix + "question/update" //更新详情
    },
    chance: {
      list: context + crmPrefix + "chance/getChancePage",// 商机列表
      create: context + crmPrefix + "chance/create",// 新增联系人
      get: context + crmPrefix + "chance/get", 
      update: context + crmPrefix + "chance/update" 
    },
    crmUser: {
      getSelectOfCenter: context + crmPrefix + "user/getSelectOfCenter",// 获取产品中心
      getUserNew: context + crmPrefix + "user/getUserNew",// 获取首页未读数
      getWXJsInfo: context + crmPrefix + "user/getWXJsInfo" // 获取
    },
    activity: {
      list: context + crmPrefix + "activity/getActivityPage",// 活动列表
      create: context + crmPrefix + "activity/create",// 新增活动
      get: context + crmPrefix + "activity/get", 
      update: context + crmPrefix + "activity/update" 
    }
  },
  nodataIcon: './images/nodata.svg',
  loadingIcon: './images/loading.gif' ,
  func_bcimg_01: './images/func_bg_01.jpg' ,
  // 这里放置全局调用下拉选项
  selectKeyValues: {
    custLevelProps: [
      {value: '前10', text: '前10'}, 
      {value: '前20', text: '前20'},
      {value: '前30', text: '前30'}],
    custStageProps: [
      {value: '接触', text: '接触'}, 
      {value: '意向', text: '意向'},
      {value: '项目合作', text: '项目合作'},
      {value: '订单合作', text: '订单合作'}],
    custSourceProps: [
      {value: '同行介绍', text: '同行介绍'}, 
      {value: '网上搜索', text: '网上搜索'},
      {value: '展会认识', text: '展会认识'},
      {value: '上门拜访', text: '上门拜访'},
      {value: '主动询盘', text: '主动询盘'}],
    custAreaProps:[
      {value: '国内', text: '国内'},
      {value: '国外', text: '国外'}],
    sexProps:[
      {value: '男', text: '男'},
      {value: '女', text: '女'}],
    linkFunctionProps:[
      {value: '采购', text: '采购'},
      {value: '技术', text: '技术'},
      {value: '质量', text: '质量'},
      {value: '管理层', text: '管理层'},
      {value: '销售', text: '销售'},
      {value: '其他', text: '其他'} ],
    chanceStageProps:[
      {value: '新建', text: '新建'},
      {value: '跟进中', text: '跟进中'},
      {value: '转为项目', text: '转为项目'},
      {value: '关闭', text: '关闭'}],
    quesStatusProps:[
      {value: '新建', text: '新建'},
      {value: '处理中', text: '处理中'},
      {value: '关闭', text: '关闭'}],
  },
  // 存放一些固定提示
  tips: {
    noToken: '没有token，请重新登录！',
    outToken: 'token过期，请重新登录！'
  }
};
