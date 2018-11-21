import { Component,LogicRender } from 'refast';
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

import './PageCustomerEdit.less';

const {
  IconButton,
  ButtonGroup,
} = Button;

const {
  custLevelProps,
  custSourceProps,
  custAreaProps
} = selectKeyValues;

export default class PageCustomerEdit extends Component {

    constructor(props) {
        super(props);
        let t = this;
        var token = localStorage.token;
        var ezplatformUserName = localStorage.ezplatformUserName;

        const query = t.props.location.query;
        let custId = query.custId;

        t.state = {
          token: token,
          ezplatformUserName: ezplatformUserName,
          data: {
            id: custId,
            poteFixedAssetsOne : '',
            custDemandNum : '',
            poteSalesTwo : '',
            custArea : '',
            custView : '',
            custOrgCategory : '',
            createdUserName : '',
            reviewMatchDegree2 : '',
            custBuildTime : '',
            poteFixedAssetsTwo : '',
            custIncomeLast : '',
            custDiffculty : '',
            reviewService : '',
            custCorporation : '',
            reviewProcScale : '',
            custCooperationTime : '',
            poteAssetsTwo : '',
            reviewBraceTotb : '',
            poteFixedAssetsThree : '',
            poteAssetsThree : '',
            custBuyRate : '',
            reviewQuality : '',
            custDelete : '',
            custOrderWave : '',
            custRegCapital : '',
            lastModifiedOrg : '',
            custPaymentPeriod : '',
            custCompanyCategory : '',
            poteProfitThree : '',
            custCenter : '',
            custAddress : '',
            corp_id : '',
            custNotByReason : '',
            custMainBusiness : '',
            flag : '',
            custStrategy : '',
            custSalesman : '',
            reviewTbRelyon : '',
            poteAssetsOne : '',
            custSapNo : '',
            poteProfitOne : '',
            custPriceWave : '',
            custSource : '',
            reviewDeliveryTime : '',
            custSupplierNow : '',
            reviewRelyOntb : '',
            optlock : 0,
            custMainMarket : '',
            custCredit : '',
            custAbbreviation : '',
            custMainCustomer : '',
            custIndustryStatus : '',
            custCategory : '',
            poteProfitTwo : '',
            lastModifiedDate : '',
            lastModifiedBy : '',
            custThreshold : '',
            reviewPrice : '',
            custName : '',
            custLevel : '',
            custStage : '',
            userId : '',
            reviewPotential : '',
            reviewMatchDegree : '',
            reviewGrossRate : '',
            reviewStrategyTosup : '',
            custUpdate : '',
            reviewLevel : '',
            createdDate : '',
            poteSalesThree : '',
            createdBy : '',
            custEmployees : '',
            createUser : '',
            createdOrgName : '',
            reviewState : '',
            poteSalesOne : '',
            reviewId : '',
            custCompetitor : '',
            createdOrg : ''
          },
          selectOfCenter:[]
        };
    }

    componentDidMount() {
      const t = this;
      const token = t.state.token;
      if(!token) {
        alert("没有token");
        return;
      }
     
      let id = t.state.data.id;
      if(!id) {
        alert("没有id");
        return;
      }

      DB.CrmCustomerAPI.customer360InfoBase({
        id: id,
        token: token
      })
      .then((content) => {
        t.setState({
          data: content,
        });

        t.getSelectOfCenter(content.custCenter);
        t.dealDefaultValue(content.custArea, custAreaProps, 'custArea');
        t.dealDefaultValue(content.custSource, custSourceProps, 'custSource');
        t.dealDefaultValue(content.custIndustryStatus, custLevelProps, 'custIndustryStatus');
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          content: '获取客户信息出错'
        });
      });
    }

    componentWillUnmount () {
      Dialog.hide();
      Toast.hide(); 
    }

    getSelectOfCenter = (defaultValue) => {
      const t = this;
      const token = t.state.token;
      DB.CrmUserAPI.getSelectOfCenter({
        token: token
      })
      .then((content) => {
        t.setState({
            selectOfCenter: content
        });

        if(!!defaultValue) {
          content.map((center) => {
            if(center.value == defaultValue) {
              let data = t.state.data;
              data.custCenter = center;
              t.setState({
                data: data
              });
            }
          });
        }
      })
      .catch((error) => {
        t.setState({
          selectOfCenter:[]
        });
        Toast.show({
          type: 'error',
          content: '查询出错'
        });
      });
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

    handleSubmitForm(saveType) {
      if(saveType == '0') {
        hashHistory.goBack();
        return;
      }

      const t = this;
      let data = t.state.data;
      if(data.reviewState != '2' && !t.checkParam()) {
        return;
      }
      
      const token = t.state.token;
      if(!token) {
        alert("没有token");
        return;
      }
      
      DB.CrmCustomerAPI.update({
        custId: data.id,
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
        const reviewed = t.state.data.reviewState == "2";

        return (
            <div className="t-FS16">
              <Group>  
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                    <TextField required key="custName" label="客户名称" placeholder="请选择" value={ t.state.data.custName }
                      onChange={t.handleChange.bind(this, 'custName')} readOnly={ reviewed } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField label="客户简称" placeholder="请选择" value={ t.state.data.custAbbreviation }
                    onChange={t.handleChange.bind(this, 'custAbbreviation')} />
                </Group.List>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField required label="销售人员" readOnly
                    placeholder="请输入" 
                    value={ t.state.data.createdUserName }/>
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
                    readOnly={ reviewed }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <SelectField
                    required
                    label="客户区域"
                    options={custAreaProps}
                    onSelect={t.handleChange.bind(t, 'custArea')}
                    value={t.state.data.custArea}
                    placeholder="请选择" 
                    readOnly={ reviewed }/>
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
                    readOnly={ reviewed }
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
                    readOnly={ reviewed }
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
                    readOnly={ reviewed }
                    />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField required label="主营业务"
                    placeholder="请输入" 
                    value={ t.state.data.custMainBusiness }
                    onChange={t.handleChange.bind(t,'custMainBusiness')}
                    readOnly={ reviewed } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <SelectField required
                    label="客户来源"
                    options={custSourceProps}
                    onSelect={t.handleChange.bind(t, 'custSource')}
                    value={t.state.data.custSource}
                    placeholder="请选择"
                    readOnly={ reviewed }
                  />
                </Group.List>
              </Group>
              <div className="t-MB3"></div>
              <div style={{padding: '30px 15px'}}>
                <LogicRender show={ t.state.data.flag == '1' }>
                  <Button.Group>
                    <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(t,1)}>暂存</Button>
                    <Button type="primary" display="inline" onClick={t.handleSubmitForm.bind(t,2)}>保存</Button>
                  </Button.Group>
                </LogicRender>
                <LogicRender show={ t.state.data.flag == '2' }>
                  <Button.Group>
                    <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(t,0)}>取消</Button>
                    <Button type="primary" display="inline" onClick={t.handleSubmitForm.bind(t,2)}>保存</Button>
                  </Button.Group>
                </LogicRender>  
              </div>
            </div>
        )
    }
}

