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

import './PageChanceForm.less';

const {
  IconButton,
  ButtonGroup,
} = Button;

const {
  chanceStageProps
} = selectKeyValues;

export default class PageChanceForm extends Component {

    constructor(props) {
      super(props);
      let t = this;

      var token = document.getElementById("token").value;
      var custId = this.props.location.query.custId;
      var type = this.props.location.query.type;
      var id = this.props.location.query.id;
      var readOnly = type == 'get' ? true : false;

      t.state = {
        token: token,
        type: type,
        readOnly: readOnly,
        data: {
          custId: custId,
          id: id,
          chanName: '',
          chanSalesman: '',
          chanContact: '',
          chanCenter: '',
          chanStage: chanceStageProps[0],
          chanTime:'',
          chanDesc:'',
          chanSource:'',
          chanResponcer: '',
          flag: ''
        },
        selectOfCenter:[],
        selectOfContact:[]
      };
    }

    componentDidMount() {
      var token = this.state.token;
      if(token == "" || token == undefined) {
        alert("没有token");
        return;
      }

      var custId = this.state.data.custId;
     

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

      if(custId == "" || custId == undefined) {
        
      } else {
        DB.CrmLinkAPI.listByCustId({
          token: token,
          custId: custId
        })
        .then((content) => {
          this.setState({
              selectOfContact: content
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
      

      var type = this.state.type;
      if(type == 'get' || type == 'edit') {
        var id = this.state.data.id;
        if(id == "" || id == undefined) {
          alert("没有id");
          return;
        }
    
        DB.CrmChanceAPI.get({
          token: token,
          id: id
        })
        .then((content) => {
          console.log(content);
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
      if(saveType == '0') {
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
        DB.CrmChanceAPI.create({
          token: token,
          custId: custId,
          chanName: data.chanName,
          chanSalesman: data.chanSalesman,
          chanContact: data.chanContact.value,
          chanCenter: data.chanCenter.value,
          chanStage: data.chanStage.value,
          chanTime: data.chanTime.value,
          chanDesc: data.chanDesc,
          chanSource: data.chanSource,
          chanResponcer: data.chanResponcer,
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
        DB.CrmChanceAPI.update({
          token: token,
          custId: custId,
          id: data.id,
          chanName: data.chanName,
          chanSalesman: data.chanSalesman,
          chanContact: data.chanContact.value,
          chanCenter: data.chanCenter.value,
          chanStage: data.chanStage.value,
          chanTime: data.chanTime,
          chanDesc: data.chanDesc,
          chanSource: data.chanSource,
          chanResponcer: data.chanResponcer
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
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                    <TextField required key="custName" label="客户名称" placeholder="请输入" value={ t.state.data.custName }
                      onChange={t.handleChange.bind(t, 'custName')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='chanName' label="商机名称" placeholder="请输入" value={ t.state.data.chanName }
                    onChange={t.handleChange.bind(t, 'chanName')} readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='chanSalesman' label="销售人员" placeholder="请输入" value={ t.state.data.chanSalesman }
                    onChange={t.handleChange.bind(t, 'chanSalesman')} readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                   <SelectField
                    label="客户联系人"
                    options={ t.state.selectOfContact }
                    onSelect={t.handleChange.bind(t, 'chanContact')}
                    value={t.state.data.chanContact}
                    placeholder="请选择"
                    readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                   <SelectField
                    label="产品中心"
                    required
                    options={ t.state.selectOfCenter }
                    onSelect={t.handleChange.bind(t, 'chanCenter')}
                    value={t.state.data.chanCenter}
                    placeholder="请选择"
                    readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                   <SelectField
                    label="商机阶段"
                    options={ chanceStageProps }
                    onSelect={t.handleChange.bind(t, 'chanStage')}
                    value={t.state.data.chanStage}
                    placeholder="请选择"
                    readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <DatetimeField label="商机时间" onSelect={ t.handleChange.bind(t, 'chanTime') } 
                  value={ t.state.data.chanTime } columns={ DatetimeField.YMD } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='chanDesc' label="商机描述" placeholder="请输入" value={ t.state.data.chanDesc }
                    onChange={t.handleChange.bind(t, 'chanDesc')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='chanSource' label="商机来源" placeholder="请输入" value={ t.state.data.chanSource }
                    onChange={t.handleChange.bind(t, 'chanSource')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='chanResponcer' label="商机跟进人" placeholder="请输入" value={ t.state.data.chanResponcer }
                    onChange={t.handleChange.bind(t, 'chanResponcer')} readOnly={ t.state.readOnly } />
                </Group.List>
                
              </Group>
              <div className="t-MB3"></div>
              <div style={{padding: '30px 15px'}}>
                <LogicRender show={ (t.state.type == 'edit' && t.state.data.flag == '1') | t.state.type == 'create'  } >
                  <Button.Group>
                    <Button type="secondary" display="inline" onClick={ t.handleSubmitForm.bind(t,1)} >暂存</Button>
                    <Button type="primary" display="inline" onClick={ t.handleSubmitForm.bind(t,2)} >保存</Button>
                  </Button.Group>
                </LogicRender>  
                <LogicRender show={ t.state.type == 'edit' && t.state.data.flag == '2'  } >
                  <Button.Group>
                    <Button type="secondary" display="inline" onClick={ t.handleSubmitForm.bind(t,0)} >取消</Button>
                    <Button type="primary" display="inline" onClick={ t.handleSubmitForm.bind(t,2)} >保存</Button>
                  </Button.Group>
                </LogicRender>  
                <LogicRender show={ t.state.type == 'get' } >
                  <Button.Group>
                    <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(t,0)}>关闭</Button>
                  </Button.Group>   
                </LogicRender> 
              </div>
            </div>
        )
    }
}

