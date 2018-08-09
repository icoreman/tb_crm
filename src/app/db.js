import nattyFetch from 'natty-fetch';
import { Toast } from 'saltui';

import { urlPrefix,URLS, isDev } from './variables';
import Loading from 'components/loading';

// See https://github.com/Jias/natty-fetch for more details.
const context = nattyFetch.context({
  mockUrlPrefix: urlPrefix,
  urlPrefix,
  mock: isDev,
  // jsonp: true,
  withCredentials: false,
  traditional: true,
  data: {
    _tb_token_: '',
  },
  timeout: 5000,
  didFetch: () => Toast.hide(),
  // 请按照需要开启
  fit(response) {
    return {
      success: response.success,
      content: response.content,
      error: {
        errorMsg: response.errorMsg,
        errorCode: response.errorCode,
        errorLevel: response.errorLevel,
      },
    };
  },
});
context.create('CrmHomeAPI', {

});

context.create('CrmCustomerAPI', {
  customerManageList: {
    mockUrl: 'customer/listCustomerManage.json',
    url: URLS.customerManageList,
    method:'POST',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    },
  },
  customerToBeReviewedList: {
    mockUrl: 'customer/listCustomerToBeReviewed.json',
    url: URLS.custToBeReviewedList,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  customerReviewedList: {
    mockUrl: 'customer/listCustomerReviewed.json',
    url: URLS.custReviewedList,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  customerNewList: {
    mockUrl: 'customer/listCustomerNew.json',
    url: URLS.custNewList,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  customer360InfoBase: {
    mockUrl: 'customer/getCustomer360InfoBase.json',
    url: URLS.cust360Info,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  }
});

context.create('CrmLinkAPI', {
  custLinkList: {
    mockUrl: 'link/listLinkByCustomer.json',
    url: URLS.custLinkList,
    method:'get',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    },
  }
});
export default context.api;
