export function defaults(props) {
  return {
    activeIndex : 0,
    loading : false,
    refreshing : false,
    badges : {
      "custToBeReviewed" : 0,
      "custReviewed" : 0,
      "custNew" : 0,
      "chanceNew" : 0,
      "questionNew" : 0,
      "reportNew" : 0, 
    }
  };
}

export function clickTabBarItem(context, activeIndex) {
  // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
  if(activeIndex == 0) {

  } else if (activeIndex == 2) {
    context.fn.history.push('/func/');
  } else if (activeIndex == '1-0') {
     context.fn.history.push('/customer/add');
  }
}

export function clickGridItem(context, pathTo) {
  context.fn.history.push(pathTo);
}