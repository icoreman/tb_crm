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

context.create('SomeModuleAPI', {
  getSomeInfo: {
    mockUrl: 'query/getSomeInfo.json',
    url: 'query/getSomeInfo.json',
    willFetch() {
      Toast.show({
        type: 'loading',
        content: 'Loading',
      });
    },
  },
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
});

export default context.api;
