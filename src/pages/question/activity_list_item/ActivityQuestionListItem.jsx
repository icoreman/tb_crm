import { Component,LogicRender } from 'refast';
import {
    Boxs,Group,Grid
} from 'saltui';

import {
  Form,
  FormCell,
  CellHeader,
  CellBody,
  Checkbox
} from 'react-weui';

import './ActivityQuestionListItem.less'

const { HBox,Box,VBox } = Boxs;
            
export default class ActivityQuestionListItem extends Component {
  constructor(props){
    super(props);

  }

  clickCheckbox = (data,e) => {
    this.props.clickCheckbox(data);
  }
 
  render()  {
    const t = this;
    let data= t.props;
    let defaultChecked = false;
    data.defaultData.map((chance) => {
      if(chance.id == data.id) {
        defaultChecked = true;
      }
    });

    return (
      <Form checkbox key={ data.id }>
        <FormCell checkbox>
          <CellHeader>
              <Checkbox name="chance" value={ data.id } onClick={ (e) => t.clickCheckbox(data,e)  } defaultChecked={ defaultChecked } readOnly={ data.old }/>
          </CellHeader>
          <CellBody>
            <HBox key={data.id} className="cust-chance-list" vAlign="center">
              <VBox  className="t-FBV t-FB1 t-PL10 cust-chance-content-list">
                <HBox className="item-left t-MT10"> { data.quesDesc } </HBox>
                <HBox className="item-left t-MT10">创建时间：{ data.quesGuestTime }</HBox>
                <HBox className="item-left t-MT10">问题状态：{ data.quesStatus }</HBox>
              </VBox>
            </HBox>
          </CellBody>
        </FormCell>
      </Form> 
    );
  }
};
