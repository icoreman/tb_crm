import { Component } from 'refast';
import DB from '../../../app/db';
import {
    Group,DatetimeField,
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

import './PageCustAdd.less';

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

export default class PageCustAdd extends Component {

    constructor(props) {
        super(props);
        let t = this;
        
        t.state = {
            custName: '',
            custSimpleName: '',
            custIndustryStatus: '',
            custStage: '',
            custLevel: '',
            custCenter: '',
            custSource: '',
            poteSalesOne:'',
            custMainBusiness:'',
            custSalesman: '',
            custAddress:''
        };
        

         dd.biz.navigation.setMenu({
            backgroundColor : "#ADD8E6",
            textColor : "#ADD8E611",
            items : [
              {
                 "id":"1",//字符串
                "iconId":"",//字符串，图标命名
                "text":"新增客户"
              }
            ],
            onSuccess: function(data) {
           
            },
            onFail: function(err) {
            }
        });
        
    }

    handleClick() {
        for (let key in this.state) {
            if (/^required\d+$/.test(key) && !this.state[key]) {
                Toast.show({
                    type: 'error',
                    content: '请填写必填项',
                    onHide: function () {
                    }
                });
                return;
            }
        }
        
        console.log(this.state);
    }
    
    handleChange(label, value) {
        let t = this;
        t.setState({
            [label]: value
        }, () => {
            let disabled = false;
            for (let key in t.state) {
                if (/^required\d+$/.test(key) && !t.state[key]) {
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
                <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                        <TextField required label="客户名称*" placeholder="请选择" value={ t.state.custName }
                                   onChange={t.handleChange.bind(t, 'custName')} />
                    </Group.List>
                </Group>
                <div className="t-MB10"></div>
                <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                        <TextField label="客户简称" placeholder="请选择" value={ t.state.custSimpleName }
                                   onChange={t.handleChange.bind(t, 'custSimpleName')} />
                    </Group.List>
                </Group>
                <div className="t-MB10"></div>
                <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                        <SelectField
                            required
                            label="行业地位"
                            options={custLevelProps}
                            onSelect={this.handleChange.bind(t, 'custLevel')}
                            value={this.state.custLevel}
                            placeholder="请选择"
                            />
                    </Group.List>
                </Group>
                <div className="t-MB10"></div>
                <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                        <SelectField
                            required
                            label="客户阶段"
                            options={custStageProps}
                            onSelect={this.handleChange.bind(t, 'custStage')}
                            value={this.state.custStage}
                            placeholder="请选择"
                            />
                    </Group.List>
                </Group>
                <div className="t-MB10"></div>
                <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                        <TextField required label="产品中心" onSelect={t.handleChange.bind(t, 'custCenter')} 
                        value={t.state.custCenter} placeholder="请输入" />
                    </Group.List>
                </Group>
                <div className="t-MB10"></div>
                <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                        <SelectField
                            required
                            label="客户来源"
                            options={custSourceProps}
                            onSelect={this.handleChange.bind(t, 'custStage')}
                            value={this.state.custSource}
                            placeholder="请选择"
                            />
                    </Group.List>
                </Group>
                <div className="t-MB10"></div>
                <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                        <TextField required label="上年度营收（万元）"
                          placeholder="请输入" value={t.state.poteSalesOne}
                          onChange={t.handleChange.bind(t,'poteSalesOne')}/>
                    </Group.List>
                </Group>
                <div className="t-MB10"></div>
                <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                        <TextField required label="主营业务"
                          placeholder="请输入" value={t.state.custMainBusiness}
                          onChange={t.handleChange.bind(t,'custMainBusiness')}/>
                    </Group.List>
                </Group>
                <div className="t-MB10"></div>
                <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                        <TextField required label="公司地址"
                          placeholder="请输入" value={t.state.custAddress}
                          onChange={t.handleChange.bind(t,'custAddress')}/>
                    </Group.List>
                </Group>
                <div className="t-MB10"></div>
                <Group>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                        <TextField required label="销售人员"
                          placeholder="请输入" value={t.state.custSalesman}
                          onChange={t.handleChange.bind(t,'custSalesman')}/>
                    </Group.List>
                </Group>
                <div className="t-MB10"></div>
                <div style={{padding: '30px 15px'}}>
                    <Button.Group>
                      <Button type="secondary" display="inline" onClick={this.handleClick.bind(this)}>暂存</Button>
                      <Button type="primary" display="inline" onClick={this.handleClick.bind(this)}>保存</Button>
                    </Button.Group>
                </div>
            </div>
        )
    }
}

