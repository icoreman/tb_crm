export function defaults(props) {
  return {
    title:'',
    data:[],
    imageStatus:'none',
    addAboutPopVisable: false,
    selectedCustId: null
  };
}

export function load(context,page) {
  context.fn.DB.CrmCustomerAPI.customerManageList({
    page: page,
    pageSize: 15
  }).then((content) => {
      if(content.data.length>0){
        context.setState({
          data:content.data,
          imageStatus:'none',
        });
      }else{
         context.setState({
          data:content.data,
          imageStatus:'block'
        });
      }
    }).catch((error) => {
        // 失败 or 有异常被捕获
        context.setState({
          data:[],
          imageStatus:'block'
        });
        Toast.show({
          type: 'error',
          content: error
        });
    });
}

export function edit(context,id) {
  context.fn.history.push('/customer/edit?id='+id);
}