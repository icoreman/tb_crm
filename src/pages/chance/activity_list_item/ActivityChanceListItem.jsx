import { Component,LogicRender } from 'refast';
import {
    Boxs,Group,Grid,Dialog
} from 'saltui';

import {
  Form,
  FormCell,
  CellHeader,
  CellBody,
  Checkbox
} from 'react-weui';

import './ActivityChanceListItem.less'

const { HBox,Box,VBox } = Boxs;
            
export default class ActivityChanceListItem extends Component {
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
                <HBox className="item-left t-MT10"> { data.chanName } </HBox>
                <HBox className="item-left t-MT10">商机时间：{ data.chanTime }</HBox>
                <HBox className="item-left t-MT10">商机阶段：{ data.chanStage }</HBox>
              </VBox>
            </HBox>
          </CellBody>
        </FormCell>
      </Form> 
    );
  }
};
