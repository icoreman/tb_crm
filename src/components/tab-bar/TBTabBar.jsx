/**
 * TabBar Component for tingle
 * @author zhouwenjie
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TabBar } from 'saltui';
import { TabBarItem } from 'saltui/lib/TabBar';
import { Boxs } from 'saltui/lib/Boxs';

import Context  from 'saltui/lib/Context';

import { TBTabBarCenter } from './TBTabBarCenter';

const HBox = Boxs;

class TBTabBar extends TabBar {

 static displayName = 'TabBar';

  static propTypes = {
    className: PropTypes.string,
    activeIndex: PropTypes.number,
    height: PropTypes.number,
    iconHeight: PropTypes.number,
    cIconHeight: PropTypes.number,
    onChange: PropTypes.func,
    tabBarStyle: PropTypes.object,
    menuFlat: PropTypes.bool,
    children: PropTypes.any,
    items: PropTypes.array,
    theme: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    activeIndex: 0,
    height: 50,
    iconHeight: 24,
    cIconHeight: 50,
    onChange: () => {
    },
    tabBarStyle: {},
    menuFlat: undefined,
    children: undefined,
    items: undefined,
    theme: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
      centerMoreVisible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const t = this;
    const nextActiveIndex = nextProps.activeIndex;
    if (nextActiveIndex !== t.props.activeIndex) {
      t.setActiveIndex(nextActiveIndex);
    }
  }

  onItemClick(index, path) {
    if (index !== this.state.activeIndex) {
      this.setActiveIndex(index, path);
    }
    // this.props.onChange(index, path);
  }

  setActiveIndex(index, path) {
    const t = this;
    if (t.centerTabIndex && t.centerTabIndex === index) {
      t.props.onChange(index, path);
    } else {
      t.setState({
        activeIndex: index,
      }, () => {
        t.props.onChange(index, path);
      });
    }
  }

  handleCenterMoreVisibleChange(visible) {
    this.setState({
      centerMoreVisible: visible,
    });
  }

  /**
  * Tab bar items data from child React Element
  * like: <TabBar><TabBar.Item></TabBar.Item></TabBar> Render way
  */
  propsRenderWay() {
    const t = this;
    return this.props.items.map((item, idx) => {
      if (item.items) {
        t.centerTabIndex = idx;
        return (
          <TBTabBarCenter 
            {...item}
            key={idx.toString()}
          />
        );
      }
      return (
        <TabBarItem
          key={idx.toString()}
          {...item}
          iconHeight={t.props.iconHeight}
          active={idx === t.state.activeIndex}
          onClick={() => {
            t.onItemClick(idx, item.path);
          }}
        />
      );
    });
  }

  childrenRenderWay() {
    const t = this;
    return React.Children.map(this.props.children, (child, idx) => {
      if (!child) {
        return null;
      }
      if (child.props.items) {
        t.centerTabIndex = idx;
        return (
          <TBTabBarCenter 
            {...item}
            key={idx.toString()}
          />
        );
      }
      return (
        <TabBarItem
          key={idx}
          item={child}
          iconHeight={t.props.iconHeight}
          active={idx === t.state.activeIndex}
          onClick={() => {
            t.onItemClick(idx, child.props.path);
          }}
        />
      );
    });
  }

  renderItems() {
    const t = this;
    let content;
    if (this.props.children) {
      content = t.childrenRenderWay();
    } else {
      content = t.propsRenderWay();
    }
    const style = {
      ...t.props.tabBarStyle,
    };

    return (
      <HBox
        className={Context.prefixClass('tabs-bar-items')}
        style={style}
        hAlign="center"
        vAlign="center"
      >
        {content}
      </HBox>
    );
  }
  render() {
    const t = this;
    const className = classnames(Context.prefixClass('tabs-bar'), {
      [t.props.className]: !!t.props.className,
      [Context.prefixClass('tabs-bar-dark')]: this.props.theme === 'dark',
    });
    const style = {};
    if (this.state.centerMoreVisible) {
      style.zIndex = 1010;
    }
    return (
      <div className={className} style={style}>
        {t.renderItems()}
      </div>
    );
  }
}

TabBar.Item = TabBarItem;
TabBar.Item2 = TBTabBarCenter;

export default TBTabBar;
