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

import './PageLinkForm.less';

const {
  IconButton,
  ButtonGroup,
} = Button;

const {
    sexProps,
    linkFunctionProps
} = selectKeyValues;

export default class PageLinkForm extends Component {

    constructor(props) {
      super(props);
      console.log(props);
      
      let t = this;

      var token = document.getElementById("token").value;
      let query = this.props.location.query;
      var custId = query.custId;
      var type = query.type;
      var id = query.id;
      var readOnly = type == 'get' ? true : false;

      t.state = {
        token: token,
        type: type,
        readOnly: readOnly,
        data: {
          custId: custId,
          id: id,
          linkName: '',
          linkEmail: '',
          linkTele: '',
          linkSex: null,
          linkWorkAge: '',
          linkDep:'',
          linkAge:'',
          linkPosition:'',
          linkFunction: '',
          linkHobby:'',
          linkAttention: '',
          linkRemark: ''
        }
      };
    }

    componentDidMount() {
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

        DB.CrmLinkAPI.get({
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
        DB.CrmLinkAPI.create({
          token: token,
          custId: custId,
          linkName: data.linkName,
          linkTele: data.linkTele,
          linkEmail: data.linkEmail,
          linkSex: data.linkSex.value,
          linkWorkAge: data.linkWorkAge,
          linkDep:data.linkDep,
          linkAge:data.linkAge,
          linkPosition:data.linkPosition,
          linkFunction: data.linkFunction.value,
          linkHobby:data.linkHobby,
          linkAttention: data.linkAttention,
          linkRemark: data.linkRemark
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
        DB.CrmLinkAPI.update({
          token: token,
          custId: custId,
          id: id,
          linkName: data.linkName,
          linkTele: data.linkTele,
          linkEmail: data.linkEmail,
          linkSex: data.linkSex.value,
          linkWorkAge: data.linkWorkAge,
          linkDep:data.linkDep,
          linkAge:data.linkAge,
          linkPosition:data.linkPosition,
          linkFunction: data.linkFunction.value,
          linkHobby:data.linkHobby,
          linkAttention: data.linkAttention,
          linkRemark: data.linkRemark
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
                    <TextField required key="linkName" label="姓名" placeholder="请输入" value={ t.state.data.linkName }
                      onChange={t.handleChange.bind(this, 'linkName')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='linkTele' label="联系方式" placeholder="请输入" value={ t.state.data.linkTele }
                    onChange={t.handleChange.bind(this, 'linkTele')} readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='linkEmail' label="邮件" placeholder="请输入" value={ t.state.data.linkEmail }
                    onChange={t.handleChange.bind(this, 'linkEmail')} readOnly={ t.state.readOnly }/>
                </Group.List>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                   <SelectField
                    label="性别"
                    options={ sexProps }
                    onSelect={t.handleChange.bind(this, 'linkSex')}
                    value={t.state.data.linkSex}
                    placeholder="请选择"
                    readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='linkWorkAge' label="工龄（年）" placeholder="请输入" value={ t.state.data.linkWorkAge }
                    onChange={t.handleChange.bind(this, 'linkWorkAge')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='linkDep' label="部门" placeholder="请输入" value={ t.state.data.linkDep }
                    onChange={t.handleChange.bind(this, 'linkDep')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='linkAge' label="年龄" placeholder="请输入" value={ t.state.data.linkAge }
                    onChange={t.handleChange.bind(this, 'linkAge')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='linkPosition' label="职务" placeholder="请输入" value={ t.state.data.linkPosition }
                    onChange={t.handleChange.bind(this, 'linkPosition')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                   <SelectField
                    required
                    label="职能域"
                    options={ linkFunctionProps }
                    onSelect={t.handleChange.bind(this, 'linkFunction')}
                    value={t.state.data.linkFunction}
                    placeholder="请选择"
                    readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='linkHobby' label="爱好" placeholder="请输入" value={ t.state.data.linkHobby }
                    onChange={t.handleChange.bind(this, 'linkHobby')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextareaField key='linkHobby' label="沟通策略及注意事项" placeholder="请输入" value={ t.state.data.linkAttention }
                    minRows={2} maxRows={5}
                    onChange={t.handleChange.bind(this, 'linkAttention')} readOnly={ t.state.readOnly } />
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

