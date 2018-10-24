import { Component,LogicRender } from 'refast';
import DB from '../../../app/db';
import { URLS,noDataImage,selectKeyValues } from '../../../app/variables';
import { hashHistory } from 'react-router';
import {
  Group,DatetimeField,
  TextField,
  TextareaField,
  NumberField,
  SelectField,
  Button,
  Toast,
  Collapse,
  ScrollView,
  Popup,
  SearchBar,
  Boxs,
  ScrollList
} from 'saltui';

import FaceSadLine from 'salt-icon/lib/FaceSadLine';
import FaceSmileLine from 'salt-icon/lib/FaceSmileLine';

import SearchCustomerView from 'components/searchCustomerView';

import './PageActivityAdd.less';

const {
  IconButton,
  ButtonGroup,
} = Button;

const {
  HBox,VBox,Box
} = Boxs;

const Panel = Collapse.Panel;

export default class PageActivityAdd extends Component {

  constructor(props) {
    super(props);
    let t = this;

    let query =  this.props.location.query;
    let token = document.getElementById("token").value;
    let custId = query.custId;
    let custName = query.custName == null ? "" : query.custName;
    let userName = document.getElementById("ezplatformUserName").value;
    let orgName = document.getElementById("ezplatformOrgName").value;
    let scrollHeight = getScrollHigh(0,0,0);
    t.state = {
      token: token,
      userName: userName,
      orgName: orgName,
      scrollHeight: scrollHeight,
      data: {
        custId: custId,
        custName: custName,
        actiProductCenter: null,
        actisTime: '',
        actieTime: '',
        actiPlace: '',
        actiLinkNo: ''
      },
      selectOfCenter: []
    };
  }

  componentDidMount() {
    let t = this;
    var token = t.state.token;
    if(token == "" || token == undefined) {
      alert("没有token");
      return;
    }

    DB.CrmUserAPI.getSelectOfCenter({
      token: token
    })
    .then((content) => {
      t.setState({
          selectOfCenter: content
      });
    })
    .catch((error) => {
      // 失败 or 有异常被捕获
      t.setState({
        selectOfCenter:[]
      });
      Toast.show({
        type: 'error',
        content: '获取用户产品中心失败'
      });
    });
  }

  componentWillUnmount() {
    Popup.hide();
  }


  handleSubmitForm(saveType) {
  
  }
  
  handleChange(label, value) {
    let t = this;
    var data = t.state.data;

    data[label] = value;
    t.setState({
      data: data
    });
  }

  onFocusCustName(){
    let t = this;
    let token = t.state.token;
    var selectOfCustomer = t.state.selectOfCustomer;
    var showOfCustomer = t.state.showOfCustomer;

    Popup.show(
      <div className="activity-add-popup-container">
        <SearchCustomerView 
          defaultValue={ t.state.data.custName } 
          clickCell= { (customer) => t.clickSelectCustomer(customer) }/>
      </div>, {
        animationType: 'slide-right'
    });
  }  

  clickSelectCustomer(customer) {
    let t = this;
    this.setState({
      data:{
        custId: customer.id,
        custName: customer.text
      }
    });
    Popup.hide();
  }

  getCustomer(value) {
    
  }

  handleSelectChance() {

  }

  handleNewChance() {

  }

  handleClearChance() {

  }

  handleSelectQuestion() {

  }

  handleNewQuestion() {

  }

  handleClearQuestion() {
    
  }

  render() {
    let t = this;
    let scrollViewStyle = { height: t.state.scrollHeight };

    return (
      <div>
        <ScrollView 
          infiniteScroll={ false }
          style={ scrollViewStyle }
        >
          <Group>  
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
                <TextField required key="userName" label="销售人员" value={ t.state.data.userName }
                readOnly={ true } />
            </Group.List>
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <TextField key='orgName' label="部  门" value={ t.state.data.orgName }
              readOnly={ true }/>
            </Group.List>
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
               <SelectField
                label="产品中心"
                required
                options={ t.state.selectOfCenter }
                onSelect={t.handleChange.bind(t, 'actiProductCenter')}
                value={t.state.data.actiProductCenter}
                placeholder="请选择"
                readOnly={ t.state.readOnly }/>
            </Group.List>
             <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <DatetimeField key='actisTime' label="活动起始时间" onSelect={ t.handleChange.bind(t, 'actisTime') } 
                value={ t.state.data.actisTime } columns={ DatetimeField.YMD } />
            </Group.List>
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <DatetimeField key='actieTime' label="活动结束时间" onSelect={ t.handleChange.bind(t, 'actieTime') } 
                value={ t.state.data.actieTime } columns={ DatetimeField.YMD } />
            </Group.List> 
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <TextField key='actiPlace' label="活动地点" placeholder="请输入" value={ t.state.data.actiPlace }
                onChange={t.handleChange.bind(t, 'actiPlace')}/>
            </Group.List>
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <VBox className='t-PR16 t-PL16 t-H44 t-FBJC'>
                <HBox>
                  <Box className='cell-header'><span className='t-FS16'>客户名称</span></Box>
                  <Box className="cell-placeholder" onClick= { t.onFocusCustName.bind(t) }>{ t.state.data.custName == "" ? "请输入" : t.state.data.custName }</Box>
                </HBox> 
              </VBox>
            </Group.List>
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <TextField key='actiLinkNo' label="联系人" placeholder="请输入" value={ t.state.data.actiLinkNo }
                onChange={t.handleChange.bind(t, 'actiLinkNo')} />
            </Group.List>
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <Collapse
                accordion= { false } 
              >
                <Panel key="chance" header="跟进商机" showArrow={ true }>
                  <ButtonGroup>
                    <Button type="secondary" size="small" display="inline" onClick={ t.handleSelectChance.bind(t) } >选择商机</Button>
                    <Button type="secondary" size="small" display="inline" onClick={ t.handleNewChance.bind(t) } >新商机</Button>
                    <Button type="primary" size="small" display="inline" onClick={ t.handleClearChance.bind(t) }>清空</Button>
                  </ButtonGroup>
                </Panel>
                <Panel key="question" header="解决问题">
                  <div>question</div>
                </Panel>
                <Panel key="rc" header="日常维护">
                  <div>rc</div>
                </Panel>
                <Panel key="cz" header="参展">
                  <div>cz</div>
                </Panel>
              </Collapse>
            </Group.List>
          </Group>
          <div className="t-MB3"></div>
          <div style={{padding: '30px 15px'}}>
            <Button.Group>
             <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(this,1)}>取消</Button>
             <Button type="primary" display="inline" onClick={t.handleSubmitForm.bind(this,2)}>保存</Button>
            </Button.Group>
          </div>
        </ScrollView>  
      </div>
    )
  }
}

