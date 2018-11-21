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
const { actiThemeProps } = selectKeyValues;

import './CustomerSearchView.less'
      
export default class CustomerSearchView extends Component {
  constructor(props){
    super(props);
    let viewHeight = getScrollHighWithOther(0, 0, 0, 100);
    const selectOfCenter = props.selectOfCenter;
    
    this.state = {
      salesman: props.salesman,
      prod_centers: props.prod_centers,
      viewHeight: viewHeight,
      selectOfCenter: selectOfCenter
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
      salesman: '',
      prod_centers: ''
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
              <TextField label="销售人员" layout="v" placeholder="请输入" value={ t.state.salesman }
                onChange= { (value) => t.handleChange("salesman", value) }/>
            </Group.List>
            <Group.List>
              <SelectField
                label="产品中心" 
                layout="v"
                options={ t.state.selectOfCenter }
                onSelect={ (value) => t.handleChange("prod_centers",value) }
                value={ t.state.prod_centers }
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
