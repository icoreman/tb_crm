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
} from 'saltui';

import './PageQuesForm.less';

const {
  IconButton,
  ButtonGroup,
} = Button;

const {
  quesStatusProps
} = selectKeyValues;

export default class PageQuesForm extends Component {

    constructor(props) {
      super(props);
      let t = this;

      let query =  this.props.location.query;
      let token = document.getElementById("token").value;
      let custId = query.custId;
      let type = query.type;

      let id = query.id;
      let custName = query.custName;
      let readOnly = type == 'get' ? true : false;

      t.state = {
        token: token,
        type: type,
        readOnly: readOnly,
        custName: custName,
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
      if(type == 'get' || type == 'edit') {
        var token = this.state.token;
        if(token == "" || token == undefined) {
          alert("没有token");
          return;
        }

        var id = this.state.data.id;
        if(id == "" || id == undefined) {
          alert("没有id");
          return;
        }

        DB.CrmQustionAPI.get({
          token: token,
          id: id
        })
        .then((content) => {
          this.setState({
              data: content
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
      }
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

     if(this.state.type == 'create') {
         DB.CrmQustionAPI.create({
          token: token,
          custId: custId,
          quesGuestTime: data.quesGuestTime.value,
          quesCompTime: data.quesCompTime.value,
          quesCenter: data.quesCenter.value,
          quesStatus: data.quesStatus.value,
          quesDesc: data.quesDesc,
          quesFollow: data.quesFollow,
          flag: saveType
        })
        .then((content) => {
          Toast.show({
            type: 'success',
            content: '保存成功',
            onDidHide() {
              hashHistory.goBack();
            }
          });
        })
        .catch((error) => {
          // 失败 or 有异常被捕获
          Toast.show({
            type: 'error',
            content: '保存失败'
          });
        });
      } else {
        DB.CrmQustionAPI.update({
          token: token,
          custId: custId,
          id: data.id,
          quesGuestTime: data.quesGuestTime.value,
          quesCompTime: data.quesCompTime.value,
          quesCenter: data.quesCenter.value,
          quesStatus: data.quesStatus.value,
          quesDesc: data.quesDesc,
          quesFollow: data.quesFollow,
          flag: saveType
        })
        .then((content) => {
          Toast.show({
            type: 'success',
            content: '保存成功',
            onDidHide() {
              hashHistory.goBack();
            }
          });      
        })
        .catch((error) => {
          // 失败 or 有异常被捕获
          Toast.show({
            type: 'error',
            content: '保存失败'
          });
        });
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
                    <TextField required key="custName" label="客户名称" value={ t.state.custName }
                    readOnly={ true } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='quesDesc' label="问题描述" placeholder="请输入" value={ t.state.data.quesDesc }
                    onChange={t.handleChange.bind(this, 'quesDesc')} readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='userName' label="创建人" placeholder="请输入" value={ t.state.user.name }
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
                  <DatetimeField key='quesGuestTime' label="问题提出时间" onSelect={ t.handleChange.bind(t, 'quesGuestTime') } 
                    value={ t.state.data.quesGuestTime } columns={ DatetimeField.YMD } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <DatetimeField key='quesCompTime' label="要求完成时间" onSelect={ t.handleChange.bind(t, 'quesCompTime') } 
                    value={ t.state.data.quesCompTime } columns={ DatetimeField.YMD } />
                </Group.List>   
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                   <SelectField
                    label="问题状态"
                    options={ quesStatusProps }
                    onSelect={t.handleChange.bind(t, 'quesStatus')}
                    value={t.state.data.quesStatus}
                    placeholder="请选择"
                    readOnly={ t.state.readOnly }/>
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

