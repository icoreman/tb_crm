import { Component } from 'refast';
import DB from '../../../app/db';
import {
    Group,DatetimeField,Card,Tab,
    TextField,
    TextareaField,
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

import { hashHistory } from 'react-router';
import './PageCustomerEdit.less';

const custLevelProps = [
    {value: '前10', text: '前10'}, 
    {value: '前20', text: '前20'},
    {value: '前30', text: '前30'}];

const custStageProps = [
    {value: '接触', text: '接触'}, 
    {value: '意向', text: '意向'},
    {value: '项目合作', text: '项目合作'},
    {value: '订单合作', text: '订单合作'}];

const custSourceProps = [
    {value: '同行介绍', text: '同行介绍'}, 
    {value: '网上搜索', text: '网上搜索'},
    {value: '展会认识', text: '展会认识'},
    {value: '上门拜访', text: '上门拜访'},
    {value: '主动询盘', text: '主动询盘'}];

const {
  IconButton,
  ButtonGroup,
} = Button;

export default class PageCustomerEdit extends Component {

    constructor(props) {
        super(props);
        let t = this;
        
        t.state = {
          baseInfo : {
                "id": "",
                "custName" : "",
                "noUpdateDays" : "",
                "custSimpleName" : "",
                "custSapNo" : "",
                "custStage" : "",
                "custCenter" : "",
                "custIncomeLast" : "",
                "custDemandNum" : "",
                "custSource" : "",
                "custIndustryStatus" : "",
                "custMainBusiness" : "",
                "custAddress" : "",
                "custSalesman" : ""
          },
          links : [],
          chances: [],
          questions : []
        };
        

         dd.biz.navigation.setMenu({
            backgroundColor : "#ADD8E6",
            textColor : "#ADD8E611",
            items : [
              {
                 "id":"1",//字符串
                "iconId":"",//字符串，图标命名
                "text":"客户详细信息"
              }
            ],
            onSuccess: function(data) {
           
            },
            onFail: function(err) {
            }
        });
        
    }

    componentDidMount() {
     
      DB.CrmCustomerAPI.customer360InfoBase({
        page:1,
        pageSize:15
      })
         .then((content) => {
          console.log(content);
          if(content.length>0){
            this.setState({
              baseInfo:content.baseInfo,
            });
          }else{
             this.setState({
              baseInfo:content.baseInfo,
            });
          }
        }).catch((error) => {
           alert('--' + error);
            // 失败 or 有异常被捕获
            this.setState({
              baseInfo:[]
            });
            Toast.show({
              type: 'error',
              content: '查询出错'
            });
        });
    }

    handleEditClick() {
       hashHistory.push('/customer/add');
    }

    handleChange(label, value) {
        let t = this;
        t.setState({
            [label]: value
        }, () => {
            let disabled = false;
            for (let key in t.state) {
                if (/^\d+$/.test(key) && !t.state[key]) {
                    disabled = true;
                    break;
                }
            }
            if (!t.state.checked) {
                disabled = true;
            }
            if (disabled !== t.state.disabled) {
                t.setState({
                    disabled: disabled
                });
            }
        });
    }


    render() {
        let t = this;
        return (
            <div className="t-FS16">
              <Card mode="full" className="card-sence">
                <div className="card-body">
                  <div className="card-title">{ t.state.baseInfo.custName }</div>
                </div>
                <div className="card-footer">
                  <div className="card-footer-meta">
                    <span className="card-footer-meta-item">
                      未更新天数：
                      <span className="card-eye-count">{ t.state.baseInfo.noUpdateDays }</span>
                    </span>
                  </div>
                  <div className="card-footer-extra">{ t.state.baseInfo.custStage }</div>
                </div>
              </Card>
              <Tab active={'0'} showScroll>
                <Tab.Item title="待审阅" >
                  <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField  readOnly label="客户名称"  value={ t.state.baseInfo.custName }/>
                    </Group.List>
                  </Group>
                  <div className="t-MB10"></div>
                    <Group>  
                      <Group.List lineIndent={18} className="content-FAR t-FS16">
                        <TextField label="客户简称" readOnly  value={ t.state.baseInfo.custSimpleName }/>
                      </Group.List>
                    </Group>
                  <div className="t-MB10"></div>
                  <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="行业地位" readOnly  value={ t.state.baseInfo.custIndustryStatus } />
                    </Group.List>
                  </Group>
                  <div className="t-MB10"></div>  
                  <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="客户阶段" readOnly  value={ t.state.baseInfo.custStage } />
                    </Group.List>
                  </Group>
                  <div className="t-MB10"></div>
                  <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="产品中心" readOnly  value={ t.state.baseInfo.custCenter } />
                    </Group.List>
                  </Group>
                  <div className="t-MB10"></div>
                  <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="客户来源" readOnly  value={ t.state.baseInfo.custSource } />
                    </Group.List>
                  </Group>
                  <div className="t-MB10"></div>
                  <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="上年度营收（万元）" readOnly  value={ t.state.baseInfo.custIncomeLast } />
                    </Group.List>
                  </Group>
                  <div className="t-MB10"></div>
                  <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="主营业务" readOnly  value={ t.state.baseInfo.custMainBusiness } />
                    </Group.List>
                  </Group>
                  <div className="t-MB10"></div>
                  <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="公司地址" readOnly  value={ t.state.baseInfo.custAddress } />
                    </Group.List>
                  </Group>
                  <div className="t-MB10"></div>
                  <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="销售人员" readOnly  value={ t.state.baseInfo.custSalesman } />
                    </Group.List>
                  </Group>
                  <div className="t-MB10"></div>
                  <Button className="t-tabs-button" type="primary" display="inline" onClick={this.handleEditClick.bind(this)}>编    辑</Button>
                
                </Tab.Item>
                <Tab.Item title="联系人" >
                  <div>
                   <h1>联系人</h1>
                  </div>
                </Tab.Item>
                <Tab.Item title="商机" >
                  <div>
                   <h1>商机</h1>
                  </div>
                </Tab.Item>
                <Tab.Item title="问题" >
                  <div>
                   <h1>问题</h1>
                  </div>
                </Tab.Item>  
              </Tab>
            </div>
        )
    }
}

