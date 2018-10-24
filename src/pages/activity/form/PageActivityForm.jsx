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
    Collapse
} from 'saltui';

import './PageActivityForm.less';

const {
  IconButton,
  ButtonGroup,
} = Button;

const {
  quesStatusProps
} = selectKeyValues;

export default class PageActivityForm extends Component {

  constructor(props) {
    super(props);
    let t = this;

    let query =  this.props.location.query;
    let token = document.getElementById("token").value;
    let custId = query.custId;
    let type = query.type;
    console.log(type);
    let id = query.id;
    let readOnly = type == 'get' ? true : false;

    t.state = {
      token: token,
      type: type,
      readOnly: readOnly,
      data: {
        custId: custId,
        id: id,
        quesGuestTime: '',
        quesCompTime: '',
        quesCenter: null,
        quesStatus: quesStatusProps[0],
        quesDesc: '',
        quesFollow: ''
      },
      user:{
        name: ''
      },
      selectOfCenter: []
    };
  }

  componentDidMount() {
    var token = this.state.token;
    if(token == "" || token == undefined) {
      alert("没有token");
      return;
    }

    var custId = this.state.data.custId;
    if(custId == "" || custId == undefined) {
      return;
    }

    DB.CrmUserAPI.getSelectOfCenter({
      token: token
    })
    .then((content) => {
      this.setState({
          selectOfCenter: content
      });
    })
    .catch((error) => {
        // 失败 or 有异常被捕获
      this.setState({
        selectOfCenter:[]
      });
      Toast.show({
        type: 'error',
        content: '查询出错'
      });
    });

    var type = this.state.type;
   
  }

  handleSubmitForm(saveType) {
    if(saveType == 1) {
      hashHistory.goBack();
      return;
    }

    for (let key in this.state.data) {
        if (/^required\d+$/.test(key) && !this.state.data[key]) {
            Toast.show({
                type: 'error',
                content: '请填写必填项',
                onHide: function () {
                }
            });
            return;
        }
    }

    var token = this.state.token;
    if(token == "" || token == undefined) {
      alert("没有token");
      return;
    }

    var data = this.state.data;
    var custId = data.custId;
    if(custId == "" || custId == undefined) {
      alert("custId为空，请重试");
      return;
    }
  }
  
  handleChange(label, value) {
    let t = this;
    var data = t.state.data;

    data[label] = value;
    t.setState({
        data: data
    });
  }

  handleNumberChange(label, value) {
    let t = this;
    var data = t.state.data;
    data[label] = value.replace(/\.$/, '').replace(/^0*([0-9]+)/, '$1');

    t.setState({
        data: data
    });
  }


  render() {
      let t = this;
      return (
          <div className="t-FS16">
            <Group>  
              <div className="t-MB3"></div>
              <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField required key="custName" label="销售人员" value={ '' }
                  readOnly={ true } />
              </Group.List>
              <div className="t-MB3"></div>
              <Group.List lineIndent={18} className="content-FAR t-FS16">
                <TextField key='quesDesc' label="部  门" value={ t.state.data.quesDesc }
                readOnly={ true }/>
              </Group.List>
              <div className="t-MB3"></div>
              <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <SelectField
                  label="产品中心"
                  required
                  options={ t.state.selectOfCenter }
                  onSelect={t.handleChange.bind(t, 'quesCenter')}
                  value={t.state.data.quesCenter}
                  placeholder="请选择"
                  readOnly={ t.state.readOnly }/>
              </Group.List>
               <div className="t-MB3"></div>
              <Group.List lineIndent={18} className="content-FAR t-FS16">
                <DatetimeField key='quesGuestTime' label="活动起始时间" onSelect={ t.handleChange.bind(t, 'quesGuestTime') } 
                  value={ t.state.data.quesGuestTime } columns={ DatetimeField.YMD } />
              </Group.List>
              <div className="t-MB3"></div>
              <Group.List lineIndent={18} className="content-FAR t-FS16">
                <DatetimeField key='quesCompTime' label="活动结束时间" onSelect={ t.handleChange.bind(t, 'quesCompTime') } 
                  value={ t.state.data.quesCompTime } columns={ DatetimeField.YMD } />
              </Group.List> 
              <div className="t-MB3"></div>
              <Group.List lineIndent={18} className="content-FAR t-FS16">
                <TextField key='userName' label="活动地点" placeholder="请输入" value={ t.state.user.name }
                  readOnly={ true }/>
              </Group.List>
              <div className="t-MB3"></div>
              <Group.List lineIndent={18} className="content-FAR t-FS16">
                <TextField key='userName' label="客户名称" placeholder="请输入" value={ t.state.user.name }
                  readOnly={ true }/>
              </Group.List>
               <div className="t-MB3"></div>
              <Group.List lineIndent={18} className="content-FAR t-FS16">
                <TextField key='userName' label="联系人" placeholder="请输入" value={ t.state.user.name }
                  readOnly={ true }/>
              </Group.List>
            </Group>
            <div className="t-MB3"></div>
            <div style={{padding: '30px 15px'}}>
              <LogicRender show={ t.state.type == 'edit' | t.state.type == 'create'  } >
                <Button.Group>
                 <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(this,1)}>取消</Button>
                 <Button type="primary" display="inline" onClick={t.handleSubmitForm.bind(this,2)}>保存</Button>
                </Button.Group>
              </LogicRender>   
              <LogicRender show={ t.state.type == 'get' } >
                <Button.Group>
                  <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(this,1)}>关闭</Button>
                </Button.Group>   
              </LogicRender> 
            </div>
          </div>
      )
  }
}

