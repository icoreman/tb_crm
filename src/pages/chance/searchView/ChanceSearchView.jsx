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
const { chanceStageProps } = selectKeyValues;

import './ChanceSearchView.less'
      
export default class ChanceSearchView extends Component {
  constructor(props){
    super(props);
    let viewHeight = getScrollHighWithOther(0, 0, 0, 100);

    this.state = {
      chanStages: props.chanStages,
      chanNames: props.chanNames,
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
      chanStages: '',
      chanNames: ''
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
                label="商机阶段" 
                layout="v"
                options={ chanceStageProps }
                onSelect={ (value) => t.handleChange("chanStages",value) }
                value={ t.state.chanStages }
                placeholder="请选择"
              />
            </Group.List>
            <Group.List>
              <TextField label="商机名称" layout="v" placeholder="请输入" value={ t.state.chanNames }
                onChange= { (value) => t.handleChange("chanNames", value) }/>
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
