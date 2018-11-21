import { Component,LogicRender } from 'refast';
import { selectKeyValues } from '../../../app/variables';
import {
    Boxs,
    Group,
    SelectField,
    Button
} from 'saltui';

const { HBox,Box,VBox } = Boxs;
const { actiThemeProps } = selectKeyValues;

import './ActivitySearchView.less'
      
export default class ActivitySearchView extends Component {
  constructor(props){
    let viewHeight = getScrollHighWithOther(0, 0, 0, 100);
    super(props);
    this.state = {
      actiThemes: props.actiThemes,
      viewHeight: viewHeight
    }
  }

  handleSelectActiThemes = (value) => {
    this.props.selectActiThemes(value);
    this.setState({
      actiThemes: value
    });
  }

  resetAll = () => {
    this.setState({
      actiThemes: ''
    })
    this.props.resetSearch();
  }

  search = () => {
    this.props.search();
  }

  render()  {
    const t = this;
    let data= t.props;

    const viewStyle = { 'height': t.state.viewHeight };

    return (
      <div>
        <div style={ viewStyle }>
          <Group> 
            <Group.List>
              <SelectField
                label="活动缘由"
                layout="v"
                options={ actiThemeProps }
                onSelect={ t.handleSelectActiThemes }
                value={ t.state.actiThemes }
                placeholder="请选择"
              />
            </Group.List>
          </Group>
        </div> 
        <div className="t-P12">
          <Button.Group>
           <Button type="secondary" onClick={ t.resetAll } display="inline" >重置</Button>
           <Button type="primary" onClick={ t.search } display="inline" >搜索</Button>
          </Button.Group>
        </div>
      </div>
    );
  }
};
