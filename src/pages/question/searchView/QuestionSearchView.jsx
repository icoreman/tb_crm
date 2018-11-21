import { Component,LogicRender } from 'refast';
import { selectKeyValues } from '../../../app/variables';
import {
    Boxs,
    Group,
    SelectField,
    TextField,
    Button
} from 'saltui';

const { HBox,Box,VBox } = Boxs;
const { quesStatusProps } = selectKeyValues;

import './QuestionSearchView.less'
      
export default class QuestionSearchView extends Component {
  constructor(props){
    super(props);
    let viewHeight = getScrollHighWithOther(0, 0, 0, 100);
    const selectOfCenter = props.selectOfCenter;
    this.state = {
      quesState: props.quesState,
      quesDescs: props.quesDescs,
      viewHeight: viewHeight
    }
  }

  handleChange = (label,value) => {
    const t = this;
    
    t.setState({
      [label]: value
    })

    t.props.handleChange(label, value);
  }

  resetAll = () => {
    this.setState({
      quesState: '',
      quesDescs: ''
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
                label="问题阶段" 
                layout="v"
                options={ quesStatusProps }
                onSelect={ (value) => t.handleChange("quesState",value) }
                value={ t.state.quesState }
                placeholder="请选择"
              />
            </Group.List>
            <Group.List>
              <TextField label="问题描述" layout="v" placeholder="请输入" value={ t.state.quesDescs }
                onChange= { (value) => t.handleChange("quesDescs", value) }/>
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
