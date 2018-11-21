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
    Dialog,
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
        var token = localStorage.token;
        var ezplatformUserName = localStorage.ezplatformUserName;
        t.state = {
          token: token,
          ezplatformUserName: ezplatformUserName,
          data: {
            custName: '',
            custAbbreviation: '',
            custCenter: '',
            custArea:'',
            custAddress:'',
            custIncomeLast:'',
            custDemandNum: '',
            custIndustryStatus: '',
            custMainBusiness:'',
            custSource: ''
          },
          selectOfCenter:[]
        };
    }

    componentDidMount() {
      var token = this.state.token;
      if(!token) {
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

    componentWillUnmount () {
      Dialog.hide();
      Toast.hide(); 
    }


    handleSubmitForm(saveType) {
      const t = this;
      if(!t.checkParam()) {
        return;
      }
      
      let data = t.state.data;

      const token = t.state.token;
      if(!token) {
        alert("没有token");
        return;
      }
      
      DB.CrmCustomerAPI.create({
        token: token,
        custName: data.custName,
        custAbbreviation: data.custAbbreviation,
        custCenter: data.custCenter.value,
        custArea: data.custArea.value,
        custAddress:data.custAddress,
        custIncomeLast:data.custIncomeLast.replace(/\,/g,""),
        custDemandNum: data.custDemandNum.replace(/\,/g,""),
        custIndustryStatus: data.custIndustryStatus.value,
        custMainBusiness:data.custMainBusiness,
        custSource: data.custSource.value,
        saveType: saveType
      })
      .then((content) => {
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

    checkParam = () => {
      const t = this;
      let data  = t.state.data;
      if(!t.checkParamNull(data,'custName','请填写客户名称！')) {
        return false;
      }
      
      if(!t.checkParamNull(data,'custCenter','请选择产品中心！')) {
        return false;
      }

      if(!t.checkParamNull(data,'custArea','请选择客户区域！')) {
        return false;
      }

      if(!t.checkParamNull(data,'custIncomeLast','请填写上年度营收（万元）！')) {
        return false;
      }

      if(!t.checkParamNull(data,'custDemandNum','请填写年PCBA采购规模（万元）！')) {
        return false;
      }

      if(!t.checkParamNull(data,'custIndustryStatus','请选择行业地位！')) {
        return false;
      }

      if(!t.checkParamNull(data,'custMainBusiness','请填写主营业务！')) {
        return false;
      }

      if(!t.checkParamNull(data,'custSource','请选择客户来源！')) {
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
      data[label] = value.replace(/^0*([0-9]+)/, '$1');

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
                  <TextField required label="销售人员" readOnly
                    placeholder="请输入" 
                    value={ t.state.ezplatformUserName }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <SelectField
                    required
                    label="产品中心"
                    options={ t.state.selectOfCenter }
                    onSelect={t.handleChange.bind(this, 'custCenter')}
                    value={t.state.data.custCenter}
                    placeholder="请选择" />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <SelectField
                    required
                    label="客户区域"
                    options={custAreaProps}
                    onSelect={t.handleChange.bind(t, 'custArea')}
                    value={t.state.data.custArea}
                    placeholder="请选择" />
                </Group.List>
                <div className="t-MB3"></div>
                  <Group.List lineIndent={18} className="content-FAR t-FS16">
                    <TextField label="公司地址"
                      placeholder="请输入" 
                      value={t.state.data.custAddress}
                      onChange={t.handleChange.bind(t,'custAddress')}/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <NumberField required 
                    label="上年度营收（万元）"
                    type="money"
                    placeholder="请输入" 
                    delimiter=","
                    fixedNum="2"
                    formatOnBlur
                    value={ t.state.data.custIncomeLast }
                    onChange={ t.handleNumberChange.bind(t,'custIncomeLast') }
                  />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <NumberField required 
                    label="年PCBA采购规模（万元）"
                    type="money"
                    placeholder="请输入" 
                    delimiter=","
                    fixedNum="2"
                    formatOnBlur
                    value={ t.state.data.custDemandNum }
                    onChange={ t.handleNumberChange.bind(t,'custDemandNum') }
                  />
                </Group.List>

                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <SelectField
                    required
                    label="行业地位"
                    options={custLevelProps}
                    onSelect={t.handleChange.bind(t, 'custIndustryStatus')}
                    value={t.state.data.custIndustryStatus}
                    placeholder="请选择"
                    />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField required label="主营业务"
                    placeholder="请输入" 
                    value={ t.state.data.custMainBusiness }
                    onChange={t.handleChange.bind(t,'custMainBusiness')}/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <SelectField required
                    label="客户来源"
                    options={custSourceProps}
                    onSelect={t.handleChange.bind(t, 'custSource')}
                    value={t.state.data.custSource}
                    placeholder="请选择"
                  />
                </Group.List>
              </Group>
              <div className="t-MB3"></div>
              <div style={{padding: '30px 15px'}}>
                  <Button.Group>
                    <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(t,1)}>暂存</Button>
                    <Button type="primary" display="inline" onClick={t.handleSubmitForm.bind(t,2)}>保存</Button>
                  </Button.Group>
              </div>
            </div>
        )
    }
}

