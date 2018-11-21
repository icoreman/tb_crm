import { Component,LogicRender } from 'refast';
import DB from '../../../app/db';
import { URLS,noDataImage,selectKeyValues } from '../../../app/variables';
import { hashHistory } from 'react-router';
import {
    Group,DatetimeField,
    TextField,
    TextareaField,
    SelectField,
    Button,
    Toast,
    Dialog
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
      
      let t = this;

      var token = localStorage.token;
      let query = this.props.location.query;
      var custId = query.custId;
      var custName = query.custName;
      var type = query.type;
      var id = query.id;

      var readOnly = type == 'get' ? true : false;

      t.state = {
        token: token,
        type: type,
        readOnly: readOnly,
        custName: custName,
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
      const t = this;
      let type = t.state.type;
      if(type == 'get' || type == 'edit') {
        var token = t.state.token;
        if(!token) {
          Toast.show({
            type: 'error',
            content: '登录过期，请重新登录！'
          });
          return;
        }

        var id = t.state.data.id;
        if(!id) {
          Toast.show({
            type: 'error',
            content: '数据错误，请重试！'
          });
          return;
        }

        DB.CrmLinkAPI.get({
          token: token,
          id: id
        })
        .then((content) => {
          let linkSex,linkFunction;

          sexProps.map((sex) => {
            if(sex.value == content.linkSex) {
              linkSex = sex;
            }
          });

          linkFunctionProps.map((func) => {
            if(func.value == content.linkFunction) {
              linkFunction = func;
            }
          });

          t.setState({
            data: content
          });

          t.dealDefaultValue(content.linkSex, sexProps, 'linkSex');
          t.dealDefaultValue(content.linkFunction, linkFunctionProps, 'linkFunction');
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            content: '查询数据出错，请重试！'
          });
        });
      }
    }

    dealDefaultValue = (defaultValue, defaultProps, label) => {
      const t = this;
      if(!!defaultValue) {
        defaultProps.map((prop) => {
          if(prop.value == defaultValue) {
            let data = t.state.data;
            data[label] = prop;
            t.setState({
              data: data
            });
          }
        });
      }
    }

    handleSubmitForm = (saveType) => {
      const t = this;
      if(saveType == 0) {
        hashHistory.goBack();
        return;
      }

      let token = t.state.token;
      if(!token) {
        Toast.show({
          type: 'error',
          content: '登录过期，请重新登录'
        });
        return;
      }

      let data = t.state.data;
      let custId = data.custId;
      if(!custId) {
        Toast.show({
          type: 'error',
          content: 'custId为空，请重试!'
        });
        return;
      }

      if(!t.checkParam()) {
        return;
      }

      if(t.state.type == 'create') {
        DB.CrmLinkAPI.create({
          token: token,
          custId: custId,
          linkName: data.linkName,
          linkTele: data.linkTele,
          linkEmail: data.linkEmail,
          linkSex: !data.linkSex ? null : data.linkSex.value,
          linkWorkAge: data.linkWorkAge,
          linkDep:data.linkDep,
          linkAge:data.linkAge,
          linkPosition:data.linkPosition,
          linkFunction: !data.linkFunction ? null : data.linkFunction.value,
          linkHobby:data.linkHobby,
          linkAttention: data.linkAttention,
          linkRemark: data.linkRemark
        })
        .then((content) => {
          Toast.show({
            type: 'success',
            content: '保存成功',
          });

          setTimeout(() => {
            hashHistory.goBack();
          }, 1000);
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            content: '保存失败'
          });
        });
      } else {
        DB.CrmLinkAPI.update({
          token: token,
          custId: custId,
          id: data.id,
          linkName: data.linkName,
          linkTele: data.linkTele,
          linkEmail: data.linkEmail,
          linkSex: !data.linkSex ? null : data.linkSex.value,
          linkWorkAge: data.linkWorkAge,
          linkDep:data.linkDep,
          linkAge:data.linkAge,
          linkPosition:data.linkPosition,
          linkFunction: !data.linkFunction ? null : data.linkFunction.value,
          linkHobby:data.linkHobby,
          linkAttention: data.linkAttention,
          linkRemark: data.linkRemark
        })
        .then((content) => {
          Toast.show({
            type: 'success',
            content: '保存成功',       
          });

          setTimeout(() => {
            hashHistory.goBack();
          }, 1000);
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            content: '保存失败'
          });
        });
      }
    }

    checkParam = () => {
      const t = this;
      let data  = t.state.data;
      if(!t.checkParamNull(data,'linkName','请填写联系人姓名！')) {
        return false;
      }
      if(!t.checkParamNull(data,'linkTele','请填写联系方式！')) {
        return false;
      }
      if(!t.checkParamNull(data,'linkEmail','请填写邮件！')) {
        return false;
      }
      if(!t.checkParamNull(data,'linkPosition','请填写职务！')) {
        return false;
      }
      if(!t.checkParamNull(data,'linkFunction','请填写智能域！')) {
        return false;
      }

      return true;
    }

    checkParamNull = (data,label,text) => {
      if(!data[label]) {
        Dialog.alert({
          title: '提示',
          content: text
        });
        return false;
      }
      return true;
    }
    
    handleChange = (label, value) => {
      const t = this;
      let data = t.state.data;

      data[label] = value;
      t.setState({
          data: data
      });
    }

    handleNumberChange = (label, value) => {
      const t = this;
      let data = t.state.data;
      data[label] = value.replace(/^0*([0-9]+)/, '$1');

      t.setState({
          data: data
      });
    }


    render() {
        const t = this;
        return (
            <div className="t-FS16">
              <Group> 
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='custName' label="客户名称" value={ t.state.custName } readOnly/>
                </Group.List> 
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                    <TextField key="linkName" required label="姓名" placeholder="请输入" value={ t.state.data.linkName }
                      onChange={t.handleChange.bind(t, 'linkName')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='linkTele' required label="联系方式" placeholder="请输入" value={ t.state.data.linkTele }
                    onChange={t.handleChange.bind(t, 'linkTele')} readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='linkEmail' required label="邮件" placeholder="请输入" value={ t.state.data.linkEmail }
                    onChange={t.handleChange.bind(t, 'linkEmail')} readOnly={ t.state.readOnly }/>
                </Group.List>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                   <SelectField
                    label="性别"
                    options={ sexProps }
                    onSelect={t.handleChange.bind(t, 'linkSex')}
                    value={t.state.data.linkSex}
                    placeholder="请选择"
                    readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='linkWorkAge' label="工龄（年）" placeholder="请输入" value={ t.state.data.linkWorkAge }
                    onChange={t.handleChange.bind(t, 'linkWorkAge')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='linkDep' label="部门" placeholder="请输入" value={ t.state.data.linkDep }
                    onChange={t.handleChange.bind(t, 'linkDep')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='linkAge' label="年龄" placeholder="请输入" value={ t.state.data.linkAge }
                    onChange={t.handleChange.bind(t, 'linkAge')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='linkPosition' required label="职务" placeholder="请输入" value={ t.state.data.linkPosition }
                    onChange={t.handleChange.bind(t, 'linkPosition')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                   <SelectField
                    required
                    label="职能域"
                    options={ linkFunctionProps }
                    onSelect={t.handleChange.bind(t, 'linkFunction')}
                    value={t.state.data.linkFunction}
                    placeholder="请选择"
                    readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                 <TextField key='linkHobby' label="爱好" placeholder="请输入" value={ t.state.data.linkHobby }
                    onChange={t.handleChange.bind(t, 'linkHobby')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextareaField key='linkHobby' label="沟通策略及注意事项" placeholder="请输入" value={ t.state.data.linkAttention }
                    minRows={2} maxRows={5}
                    onChange={t.handleChange.bind(t, 'linkAttention')} readOnly={ t.state.readOnly } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextareaField key='linkHobby' label="备注" placeholder="请输入" value={ t.state.data.linkRemark }
                    minRows={2} maxRows={5}
                    onChange={t.handleChange.bind(t, 'linkRemark')} readOnly={ t.state.readOnly } />
                </Group.List>
              </Group>
              <div className="t-MB3"></div>
              <div style={{padding: '30px 15px'}}>
                <LogicRender show={ 'get' != t.state.type } >
                  <Button.Group>
                   <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(t,0)}>取消</Button>
                   <Button type="primary" display="inline" onClick={t.handleSubmitForm.bind(t,2)}>保存</Button>
                  </Button.Group>
                </LogicRender>   
                <LogicRender show={ 'get' == t.state.type } >
                  <Button.Group>
                    <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(t,0)}>关闭</Button>
                  </Button.Group>   
                </LogicRender> 
              </div>
            </div>
        )
    }
}

