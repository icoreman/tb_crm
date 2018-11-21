import nattyFetch from 'natty-fetch';
import { Toast } from 'saltui';

import { urlPrefix,URLS, isDev } from 'variables';
import Loading from 'components/loading';

// See https://github.com/Jias/natty-fetch for more details.
const context = nattyFetch.context({
  mockUrlPrefix: urlPrefix,
  urlPrefix,
  mock: false,
  // jsonp: true,
  withCredentials: false,
  traditional: true,
  timeout: 10000,
  didFetch: () => Toast.hide(),
  // 请按照需要开启
  fit(response) {
    return {
      success: response.success,
      content: response.content,
      error: response.error
    };
  },
});
context.create('CrmCommonAPI', {
  getImgInfo: {
    url: URLS.common.getImgInfo,
    method:'POST',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  }
});

context.create('CrmUserAPI', {
  getSelectOfCenter: {
    url: URLS.crmUser.getSelectOfCenter,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  getUserNew: {
    url: URLS.crmUser.getUserNew,
    method:'GET'
  },
  getWXJsInfo: {
    url: URLS.crmUser.getWXJsInfo,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  getUserInfoByScope: {
    url: URLS.crmUser.getUserInfoByScope,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  }
});

context.create('CrmActivityAPI', {
  getNumbers: {
    url: URLS.activity.getNumbers,
    method:'GET',
    overrideSelfConcurrent: true
  },
  get: {
    url: URLS.activity.get,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  create: {
    url: URLS.activity.create,
    method:'POST',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  update: {
    url: URLS.activity.update,
    method:'POST',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  getChanTable: {
    url: URLS.activity.getChanTable,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  deleteQuesOrChan: {
    url: URLS.activity.deleteQuesOrChan,
    method:'POST',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  }
});

context.create('CrmCustomerAPI', {
  customer360InfoBase: {
    url: URLS.customer.get,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  create: {
    url: URLS.customer.create,
    method:'POST',
    ignoreSelfConcurrent: true,
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  update: {
    url: URLS.customer.update,
    method:'POST',
    ignoreSelfConcurrent: true,
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  checkIsExistByName: {
    url: URLS.customer.checkIsExistByName,
    method:'POST',
    overrideSelfConcurrent: true,
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  getCustomer: {
    url: URLS.customer.getCustomer,
    method:'GET',
    overrideSelfConcurrent: true
  },
  getNumbers: {
    url: URLS.customer.getNumbers,
    method:'POST',
    overrideSelfConcurrent: true
  },
  getCustomerOfPass: {
    url: URLS.customer.getCustomerOfPass,
    method:'GET'
  },
});

context.create('CrmLinkAPI', {
  create: {
    url: URLS.link.create,
    method:'POST',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  get: {
    url: URLS.link.get,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  listByCustId: {
    url: URLS.link.listByCustId,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  update: {
    url: URLS.link.update,
    method:'POST',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  }
});

context.create('CrmChanceAPI', {
  create: {
    url: URLS.chance.create,
    method:'POST',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  get: {
    url: URLS.chance.get,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  update: {
    url: URLS.chance.update,
    method:'POST',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  getNumbers: {
    url: URLS.chance.getNumbers,
    method:'POST',
    overrideSelfConcurrent: true
  }
});

context.create('CrmQustionAPI', {
  create: {
    url: URLS.question.create,
    method:'POST',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  get: {
    url: URLS.question.get,
    method:'GET',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  update: {
    url: URLS.question.update,
    method:'POST',
    willFetch() {
       Toast.show({
        content: <Loading />
      });
    }
  },
  getNumbers: {
    url: URLS.question.getNumbers,
    method:'POST',
    overrideSelfConcurrent: true
  }
});

export default context.api;