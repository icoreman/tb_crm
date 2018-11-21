import { Component } from 'refast';
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
    Toast,Dialog
} from 'saltui';

import './PageLinkScan.less';

const {
  IconButton,
  ButtonGroup,
} = Button;

const {
    sexProps,
    linkFunctionProps
} = selectKeyValues;

export default class PageLinkScan extends Component {

  constructor(props) {
    super(props);
    let t = this;
    var token = localStorage.token;
    let query = t.props.location.query;
    var fid = query.fid;
    var checksum = query.checksum;

    t.state = {
      token: token,
      checksum: checksum,
      fid: fid,
      localData: '',
      custId: '',
      data: {
        custName: '',
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
    var t = this;
    let token = t.state.token;
    if(!token) {
      alert("没有token");
      return;
    }

    let fid = t.state.fid;
    if(!fid) {
      alert("没有fid");
      return;
    }

    let checksum = t.state.checksum;
    if(!checksum) {
      alert("没有checksum");
      return;
    }

    
    DB.CrmCommonAPI.getImgInfo({
      token: token,
      fid: fid,
      checksum: checksum
    })
    .then((content) => {
      var jsonResult = JSON.parse(content);
      var name = jsonResult.name;// 除了这个，其余全都是数组
      var company = jsonResult.company;
      var department = jsonResult.department;
      var email = jsonResult.email;
      var tel_cell = jsonResult.tel_cell;
      var tel_work = jsonResult.tel_work;
      var title = jsonResult.title;// 职务

      t.setState({
        data: {
          custName: company.length > 0 ? company[0] : '',
          linkName: name,
          linkEmail: email.length > 0 ? email[0] : '',
          linkTele: tel_work.length > 0 ? tel_work[0] :  (tel_cell.length > 0 ? tel_cell[0] : ''),
          linkDep: department.length > 0 ? department[0] : '',
          linkPosition: title.length > 0 ? title[0] : ''
        }
      });
      
    })
    .catch((error) => {
      // 失败 or 有异常被捕获
      Toast.show({
        type: 'error',
        content: '获取名片信息失败,请重试'
      });
    });
  }

  handleChange(label, value) {
    let t = this;
    var data = t.state.data;
    console.log(value);
    data[label] = value;
    t.setState({
      data: data
    });
  }

  handleNumberChange(label, value) {
    let t = this;
    var data = t.state.data;
    data[label] = value.replace(/^0*([0-9]+)/, '$1');

    t.setState({
      data: data
    });
  }

  handleSubmitForm(type) {
    if(type == 0) {
      hashHistory.goBack();
      return;
    }

    let t = this;
    var data = t.state.data;
    var token = t.state.token;
    if(!token) {
      alert("没有token");
      return;
    }

    if(!t.checkParam()) {
      return;
    }

    let custName = t.state.data.required_custName;
    DB.CrmCustomerAPI.checkIsExistByName({
      token: token,
      custName: custName
    })
    .then((content) => {
      if(content.code == '300') {// 存在且评审通过
        Dialog.comfirm({
          title: '请确认',
          content: content.msg,
          onConfirm() {
            t.createLink(content.custId);
          }
        });
      } else if(content.code == '301') {// 存在，且评审不通过
        Dialog.comfirm({
          title: '请确认',
          content: content.msg,
          onConfirm() {
            t.createCustomer();
          }
        });
      } else {
        t.createCustomer();
      }
    })
    .catch((error) => {
      Dialog.alert({
        title: '错误',
        content: '检查客户是否存在失败:' + error.msg
      });
    });
  }

  checkParam = () => {
    const t = this;
    let data  = t.state.data;
    if(!t.checkParamNull(data,'custName','请填写客户名称！')) {
      return false;
    }

    if(!t.checkParamNull(data,'linkName','请填写联系人名称！')) {
      return false;
    }

    if(!t.checkParamNull(data,'linkTele','请填写联系方式！')) {
      return false;
    }

    if(!t.checkParamNull(data,'linkEmail','请填写联系人邮件！')) {
      return false;
    }

    if(!t.checkParamNull(data,'linkPosition','请填写联系人职务！')) {
      return false;
    }

    if(!t.checkParamNull(data,'linkFunction','请填写联系人智能域！')) {
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


  createCustomer = () => {
    let t = this;
    var token = t.state.token;
    var custName = t.state.data.custName;
    DB.CrmCustomerAPI.create({
      token: token,
      custName: custName,
      custAbbreviation: '',
      custSalesman: '',
      custCenter: '',
      custArea: '',
      custAddress: '',
      custIncomeLast: '',
      custIndustryStatus: '',
      custMainBusiness: '',
      custSource:'',
      saveType: '1'
    })
    .then((content) => {
      t.createLink(content.id);
    })
    .catch((error) => {
      Dialog.alert({
        title: 'error',
        content: '暂存客户失败' + error.msg
      });
    });
  }

  createLink = (custId) => {
    let t= this;
    var data = t.state.data;
    DB.CrmLinkAPI.create({
      token: t.state.token,
      custId: custId,
      linkName: data.linkName,
      linkTele: data.linkTele,
      linkEmail: data.linkEmail,
      linkSex: data.linkSex.value,
      linkWorkAge: data.linkWorkAge,
      linkDep: data.linkDep,
      linkAge: data.linkAge,
      linkPosition: data.linkPosition,
      linkFunction: data.linkFunction.value,
      linkHobby: data.linkHobby,
      linkAttention: data.linkAttention,
      linkRemark: data.linkRemark
    })
    .then((content) => {
      Toast.show({
        type: 'success',
        content: '创建成功',
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


  render() {
    let t = this;
    return (
      <div className="t-FS16">
        <Group>
         <Group.List lineIndent={18} className="content-FAR t-FS16">
              <TextField required key="custName" label="关联客户名称" placeholder="请输入" value={ t.state.data.custName }
                onChange={t.handleChange.bind(t, 'custName')} />
          </Group.List>
          <Group.List lineIndent={18} className="content-FAR t-FS16">
              <TextField required key="linkName" label="姓名" placeholder="请输入" value={ t.state.data.linkName }
                onChange={t.handleChange.bind(t, 'linkName')} />
          </Group.List>
          <div className="t-MB3"></div>
          <Group.List lineIndent={18} className="content-FAR t-FS16">
            <TextField required key='linkTele' label="联系方式" placeholder="请输入" value={ t.state.data.linkTele }
              onChange={t.handleChange.bind(t, 'linkTele')}/>
          </Group.List>
          <div className="t-MB3"></div>
          <Group.List lineIndent={18} className="content-FAR t-FS16">
            <TextField required key='linkEmail' label="邮件" placeholder="请输入" value={ t.state.data.linkEmail }
              onChange={t.handleChange.bind(t, 'linkEmail')}/>
          </Group.List>
          <Group.List lineIndent={18} className="content-FAR t-FS16">
            <SelectField
              label="性别"
              options={ sexProps }
              onSelect={t.handleChange.bind(t, 'linkSex')}
              value={t.state.data.linkSex}
              placeholder="请选择"/>
          </Group.List>
          <div className="t-MB3"></div>
          <Group.List lineIndent={18} className="content-FAR t-FS16">
           <TextField key='linkWorkAge' label="工龄（年）" placeholder="请输入" value={ t.state.data.linkWorkAge }
              onChange={t.handleChange.bind(t, 'linkWorkAge')} />
          </Group.List>
          <div className="t-MB3"></div>
          <Group.List lineIndent={18} className="content-FAR t-FS16">
           <TextField key='linkDep' label="部门" placeholder="请输入" value={ t.state.data.linkDep }
              onChange={t.handleChange.bind(t, 'linkDep')} />
          </Group.List>
          <div className="t-MB3"></div>
          <Group.List lineIndent={18} className="content-FAR t-FS16">
           <TextField key='linkAge' label="年龄" placeholder="请输入" value={ t.state.data.linkAge }
              onChange={t.handleChange.bind(t, 'linkAge')} />
          </Group.List>
          <div className="t-MB3"></div>
          <Group.List lineIndent={18} className="content-FAR t-FS16">
           <TextField key='linkPosition' label="职务" placeholder="请输入" value={ t.state.data.linkPosition }
              onChange={t.handleChange.bind(t, 'linkPosition')} />
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
             />
          </Group.List>
          <div className="t-MB3"></div>
          <Group.List lineIndent={18} className="content-FAR t-FS16">
           <TextField key='linkHobby' label="爱好" placeholder="请输入" value={ t.state.data.linkHobby }
              onChange={t.handleChange.bind(t, 'linkHobby')} />
          </Group.List>
          <div className="t-MB3"></div>
          <Group.List lineIndent={18} className="content-FAR t-FS16">
            <TextareaField key='linkHobby' label="沟通策略及注意事项" placeholder="请输入" value={ t.state.data.linkAttention }
              minRows={2} maxRows={5}
              onChange={t.handleChange.bind(t, 'linkAttention')} />
          </Group.List>
          <div className="t-MB3"></div>
          <Group.List lineIndent={18} className="content-FAR t-FS16">
            <TextareaField key='linkHobby' label="备注" placeholder="请输入" value={ t.state.data.linkRemark }
              minRows={2} maxRows={5}
              onChange={t.handleChange.bind(t, 'linkRemark')} />
          </Group.List>
        </Group>
        <div className="t-MB3"></div>
        <div style={{padding: '30px 15px'}}>
          <Button.Group>
           <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(t,1)}>取消</Button>
           <Button type="primary" display="inline" onClick={t.handleSubmitForm.bind(t,2)}>保存</Button>
          </Button.Group>
        </div>
      </div>
    )
  }
}

