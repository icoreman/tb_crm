import { Component } from 'refast';
import DB from '../../../app/db';
import { URLS,noDataImage,selectKeyValues } from '../../../app/variables';
import { hashHistory } from 'react-router';
import {
    Group,DatetimeField,
    TextField,
    TextareaField,
    NumberField,
    Slot,
    SelectField,
    Note,
    Button,
    CheckboxField,
    RadioField,
    Toast,
    SwitchField,
    CitySelectField,
    CalendarField,
    CascadeSelectField,
    PickerField,PhotoField
} from 'saltui';

import './PageCustomerAdd.less';

const {
  IconButton,
  ButtonGroup,
} = Button;

const {
    custLevelProps,
    custSourceProps,
    custAreaProps
} = selectKeyValues;

export default class PageCustAdd extends Component {

    constructor(props) {
        super(props);
        let t = this;
        var token = document.getElementById("token").value;

        t.state = {
          token: token,
          data: {
            custName: '',
            custAbbreviation: '',
            custSalesman: '',
            custCenter: '',
            custArea:'',
            custAddress:'',
            custIncomeLast:'',
            custIndustryStatus: '',
            custMainBusiness:'',
            custSource: ''
          },
          selectOfCenter:[]
        };
    }

    componentDidMount() {
      var token = this.state.token;
      if(token == "" || token == undefined) {
        alert("没有token");
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
      
    }
    handleSubmitForm(saveType) {
      let t = this;
      for (let key in t.state.data) {
          if (/^required\d+$/.test(key) && !t.state.data[key]) {
              Toast.show({
                  type: 'error',
                  content: '请填写必填项',
                  onHide: function () {
                  }
              });
              return;
          }
      }

      var token = t.state.token;
      if(token == "" || token == undefined) {
        alert("没有token");
        return;
      }
      var data = t.state.data;
      console.log(data);

      DB.CrmCustomerAPI.create({
        token: token,
        custName: data.custName,
        custAbbreviation: data.custAbbreviation,
        custSalesman: data.custSalesman,
        custCenter: data.custCenter.value,
        custArea: data.custArea.value,
        custAddress:data.custAddress,
        custIncomeLast:data.custIncomeLast,
        custIndustryStatus: data.custIndustryStatus.value,
        custMainBusiness:data.custMainBusiness,
        custSource: data.custSource.value,
        saveType: saveType
      })
      .then((content) => {
        console.log(content);
        hashHistory.goBack();
      })
      .catch((error) => {
        // 失败 or 有异常被捕获
        Toast.show({
          type: 'error',
          content: '保存失败'
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
                    <TextField required key="custName" label="客户名称" placeholder="请选择" value={ t.state.data.custName }
                      onChange={t.handleChange.bind(this, 'custName')} />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField label="客户简称" placeholder="请选择" value={ t.state.data.custAbbreviation }
                    onChange={t.handleChange.bind(this, 'custAbbreviation')} />
                </Group.List>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField required label="销售人员"
                    placeholder="请输入" 
                    value={t.state.data.custSalesman}
                    onChange={t.handleChange.bind(this,'custSalesman')}/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <SelectField
                    required
                    label="产品中心"
                    options={ t.state.selectOfCenter }
                    onSelect={t.handleChange.bind(this, 'custCenter')}
                    value={t.state.data.custCenter}
                    placeholder="请选择"
                    />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <SelectField
                    required
                    label="客户区域"
                    options={custAreaProps}
                    onSelect={t.handleChange.bind(this, 'custArea')}
                    value={t.state.data.custArea}
                    placeholder="请选择"
                    />
                </Group.List>
                <div className="t-MB3"></div>
                  <Group.List lineIndent={18} className="content-FAR t-FS16">
                    <TextField required label="公司地址"
                      placeholder="请输入" 
                      value={t.state.data.custAddress}
                      onChange={t.handleChange.bind(this,'custAddress')}/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <NumberField required 
                    label="上年度营收（万元）"
                    type="money"
                    placeholder="请输入" 
                    delimiter=","
                    fixedNum="2"
                    value={ t.state.data.custIncomeLast }
                    onChange={ t.handleNumberChange.bind(this,'custIncomeLast') }
                  />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <SelectField
                    required
                    label="行业地位"
                    options={custLevelProps}
                    onSelect={t.handleChange.bind(this, 'custIndustryStatus')}
                    value={t.state.data.custIndustryStatus}
                    placeholder="请选择"
                    />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField required label="主营业务"
                    placeholder="请输入" 
                    value={ t.state.data.custMainBusiness }
                    onChange={t.handleChange.bind(this,'custMainBusiness')}/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <SelectField required
                    label="客户来源"
                    options={custSourceProps}
                    onSelect={t.handleChange.bind(this, 'custSource')}
                    value={t.state.data.custSource}
                    placeholder="请选择"
                  />
                </Group.List>
              </Group>
              <div className="t-MB3"></div>
              <div style={{padding: '30px 15px'}}>
                  <Button.Group>
                    <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(this,1)}>暂存</Button>
                    <Button type="primary" display="inline" onClick={t.handleSubmitForm.bind(this,2)}>保存</Button>
                  </Button.Group>
              </div>
            </div>
        )
    }
}

