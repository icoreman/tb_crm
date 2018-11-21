import { Component,LogicRender } from 'refast';
import {
    Boxs
} from 'saltui';

import {
  Form,
  FormCell,
  CellHeader,
  CellBody,
  Radio
} from 'react-weui';

import './TravelListItem.less'

const {
  HBox,VBox,Box
} = Boxs;
            
export default class TravelListItem extends Component {
  constructor(props){
    super(props);
  }

  handleClickItem = (data,e) => {
    this.props.handleClickItem(data);
  }
 
  render()  {
    const t = this;
    let data= t.props;

    return (
      <Form radio key={ data.id }>
        <FormCell radio>
          <CellBody>
            <HBox key={data.id} className="travel-list" vAlign="center">
              <VBox  className="t-FBV t-FB1 t-PL10 travel-content-list">
                <HBox className="item-left t-MT10"> { data.start_time } ~ { data.end_time } </HBox>
              </VBox>
            </HBox>
          </CellBody>
          <CellFooter>
            <HBox> { data.reason } </HBox>
            <Radio name="travel" value={ data.id } onClick={ (e) => t.handleClickItem(data,e)  }/>
          </CellFooter>
        </FormCell>
      </Form> 
    );
  }
};
