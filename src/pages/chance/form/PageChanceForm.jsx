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
    Boxs,
    Popup,
    Dialog
} from 'saltui';

import SearchCustomerView from 'components/searchCustomerView';

import './PageChanceForm.less';

const {
  IconButton,
  ButtonGroup,
} = Button;

const {
  chanceStageProps
} = selectKeyValues;

const {
  HBox,VBox,Box
} = Boxs;

export default class PageChanceForm extends Component {

    constructor(props) {
      super(props);
      const t = this;

      const token = localStorage.token;
      const userName = localStorage.ezplatformUserName;
      const location = t.props.location;
      let custId,type,id,custName,readOnly;

      if(!location) {
        custId = props.custId;
        custName = props.custName;
        id = null;
        type = "chance_create";
        readOnly = false; 
      } else {
        let query = location.query;
        custId = query.custId;
        custName = query.custName;
        type = query.type;
        id = query.id;
        readOnly = type == 'get' ? true : false;
      }


      t.state = {
        token: token,
        type: type,
        readOnly: readOnly,
        data: {
          chanStatus : null,
          flag : null,
          chanNextStep : null,
          chanContact : null,
          chanCenter : null,
          custView : null,
          chanDesc : null,
          custId : custId,
          optlock : 0,
          id : id,
          chanRecord : null,
          chanConclusion : null,
          chanSalesman : userName,
          chanSource : null,
          chanResponcer : null,
          lastModifiedDate : null,
          chanStage : null,
          chanTime : null,
          lastModifiedBy : null,
          chanName : null,
          chanResult : null,
          chanReason : null,
          custDelete : null,
          custName : custName,
          custUpdate : null,
          lastModifiedOrg : null,
          createdDate : null,
          createdBy : null,
          createUser : null,
          chanSupport : null,
          corp_id : null,
          createdOrg : null
        },
        selectOfCenter:[],
        selectOfContact:[],
        selectOfResponcer: {
          data: [],
          ids: [],
          id: ''
        }
      };
    }

    componentDidMount() {
      const t =this;
      const token = t.state.token;
      if(!token) {
        alert("没有token");
        return;
      }

      var custId = t.state.data.custId;
      var type = t.state.type;
      if(type == 'get' || type == 'edit') {
        var id = t.state.data.id;
        if(!id) {
          alert("没有id");
          return;
        }
    
        DB.CrmChanceAPI.get({
          token: token,
          id: id
        })
        .then((content) => {
          custId = content.custId;
          let stages;
          let chanStage = content.chanStage;
          chanceStageProps.map((stage) => {
            if(stage.value == chanStage) {
              stages = stage;
            }
          });

          const chanResponcer = content.chanResponcer;
          content.chanResponcer = '';
          t.setState({
            data: content
          });
          t.getLinksByCustId(content.custId, content.chanContact);
          t.getSelectOfCenter(content.chanCenter);
          t.dealResponcer(chanResponcer);
          t.dealDefaultValue(content.chanStage, chanceStageProps, 'chanStage');
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            content: '查询出错'
          });
        });
      } else {
        t.getLinksByCustId(custId);
        t.getSelectOfCenter();
      }
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
              data.chanCenter = center;
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

    getLinksByCustId = (custId,defaultValue) => {
      const t =this;
      const token = t.state.token;

      DB.CrmLinkAPI.listByCustId({
        token: token,
        custId: custId
      })
      .then((content) => {
        t.setState({
            selectOfContact: content
        });
        if(!!defaultValue) {
          content.map((contact) => {
            if(contact.value == defaultValue) {
              let data = t.state.data;
              data.chanContact = contact;
              t.setState({
                data: data
              })
            }
          });
        }
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          content: '查询出错'
        });
      });
    }

    dealResponcer = (defaultValue) => {
      if(!defaultValue) {
        return;
      }
      const t = this;
      const token = t.state.token;
      DB.CrmUserAPI.getUserInfoByScope({
        token: token,
        fieldDataValue: defaultValue,
        fieldDataTable: 'tb_crm_chance',
        fieldData: 'chanResponcer'
      })
      .then((content) => {
        let data = t.state.data;
        data.chanResponcer = content.userName;

        t.setState({
          data: data,
          selectOfResponcer: {
            ids: content.userId
          } 
        });
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          content: '查询出错'
        });
      });
    }
    
    /**
     * 处理下拉默认值
     * @param  {[String]} defaultValue [默认值]
     * @param  {[List]} defaultProps [下拉选项]
     * @param  {[String]} label        [字段]
     */
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

    onFocusCustName(){
      const t = this;

      Popup.show(
        <div className="activity-add-popup-container">
          <SearchCustomerView 
            defaultValue={ t.state.data.required_custName } 
            clickCell= { (customer) => t.clickSelectCustomer(customer) }/>
        </div>, {
          animationType: 'slide-right'
      });
    }

    clickSelectCustomer = (customer) => {
      const t = this;
      let data = t.state.data;
      data.custId = customer.id;
      data.custName = customer.text;

      t.setState({
        data: data
      });

      t.getLinksByCustId(customer.id);
      Popup.hide();
    }

    handleSubmitForm = (saveType) => {
      const t = this;
      if(saveType == '0') {
        hashHistory.goBack();
        return;
      }

      const token = t.state.token;
      if(!token) {
        alert("没有token");
        return;
      }

      let data = t.state.data;
      const custId = data.custId;
      if(!custId) {
        alert("custId为空，请重试");
        return;
      }

      if(!t.checkParam()) {
        return;
      }

      const type = t.state.type;

      if(type.indexOf('create') > -1) {
        DB.CrmChanceAPI.create({
          token: token,
          custId: custId,
          chanName: data.chanName,
          chanSalesman: data.chanSalesman,
          chanContact: !data.chanContact ? null : data.chanContact.value,
          chanCenter: !data.chanCenter ? null : data.chanCenter.value,
          chanStage: !data.chanStage ? null : data.chanStage.value,
          chanTime: !data.chanTime ? null : data.chanTime.value,
          chanDesc: data.chanDesc,
          chanSource: data.chanSource,
          chanResponcer: t.state.selectOfResponcer.id,
          flag: saveType
        })
        .then((content) => {
          Toast.show({
            type: 'success',
            content: '保存成功'
          });

          if(type == 'chance_create'){
            t.props.complete(content);
          }

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
        DB.CrmChanceAPI.update({
          token: token,
          custId: custId,
          id: data.id,
          chanName: data.chanName,
          chanSalesman: data.chanSalesman,
          chanContact: !data.chanContact ? null : data.chanContact.value,
          chanCenter: !data.chanCenter ? null : data.chanCenter.value,
          chanStage: !data.chanStage ? null : data.chanStage.value,
          chanTime: !data.chanTime ? null : data.chanTime.value,
          chanDesc: data.chanDesc,
          chanSource: data.chanSource,
          //chanResponcer: t.state.selectOfResponcer.id,
          chanResponcer: 'XuXingXing',
          flag:saveType
        })
        .then((content) => {
          Toast.show({
            type: 'success',
            content: '保存成功'
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
      if(!t.checkParamNull(data,'chanName','请填写商机名称！')) {
        return false;
      }

      if(!t.checkParamNull(data,'chanCenter','请填写产品中心！')) {
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

    onFocusChanResponcer = ()=> {
      const t = this;
      let selectOfResponcer = t.state.selectOfResponcer;
      let ids = !selectOfResponcer.ids ? null : selectOfResponcer.ids;
      wx.invoke("selectEnterpriseContact", {
        "fromDepartmentId": -1,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
        "mode": "multi",// 必填，选择模式，single表示单选，multi表示多选
        "type": ["user"],// 必填，选择限制类型，指定department、user中的一个或者多个
        "selectedUserIds": ids// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
      },function(res){
        if (res.err_msg == "selectEnterpriseContact:ok") {
          if(typeof res.result == 'string') {
            res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
          }
          var selectedUserList = res.result.userList; // 已选的成员列表
          let chanResponcerName = ''; 
          let id = '';
          for (var i = 0; i < selectedUserList.length; i++) {
            var user = selectedUserList[i];
            var userId = user.id; // 已选的单个成员ID
            var userName = user.name;// 已选的单个成员名称
            var userAvatar= user.avatar;// 已选的单个成员头像
            chanResponcerName += userName + ',';
            id += userId + ',';
            ids[i] = userId;
          }
          let data = t.state.data;
          data.chanResponcer = chanResponcerName;
          t.setState({
            data: data,
            selectOfResponcer: {
              data: selectedUserList,
              ids: ids,
              id: id
            }
          });
        }
      });
    }


    render() {
        const t = this;
        return (
            <div className="t-FS16">
              <Group>  
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <LogicRender show={  !!t.state.data.custId | t.state.type != 'create'  }>
                  <TextField required key="custName" label="客户名称" placeholder="请输入" value={ t.state.data.custName }
                    onChange={ t.handleChange.bind(t, 'custName') } readOnly  />
                  </LogicRender> 
                  <LogicRender show={ !t.state.data.custId && t.state.type == 'create'  }>
                    <VBox className='t-PR16 t-PL16 t-H44 t-FBJC'>
                      <HBox>
                        <Box className='cell-header'><span className='t-FS16'>客户名称*</span></Box>
                        <Box className="cell-placeholder" onClick= { t.onFocusCustName.bind(t) }>{ !t.state.data.custName? "请输入" : t.state.data.custName }</Box>
                      </HBox> 
                    </VBox>
                  </LogicRender>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='chanName' required label="商机名称" placeholder="请输入" value={ t.state.data.chanName }
                    onChange={ t.handleChange.bind(t, 'chanName') } readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='chanSalesman' label="销售人员" placeholder="请输入" value={ t.state.data.chanSalesman } readOnly />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <SelectField
                    label="客户联系人"
                    options={ t.state.selectOfContact }
                    onSelect={ t.handleChange.bind(t, 'chanContact') }
                    value={ t.state.data.chanContact }
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
                  value={ t.state.data.chanTime } columns={ DatetimeField.YMD } readOnly={ t.state.readOnly }/>
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
                  <LogicRender show={ t.state.readOnly }>
                    <TextField key='chanResponcer' label="商机跟进人" placeholder="请输入" value={ t.state.data.chanResponcer }
                      onChange={t.handleChange.bind(t, 'chanResponcer')} readOnly={ t.state.readOnly } />
                  </LogicRender>
                  <LogicRender show={ !t.state.readOnly }>
                    <VBox className='t-PR16 t-PL16 t-H44 t-FBJC'>
                      <HBox>
                        <Box className='cell-header'><span className='t-FS16'>商机跟进人</span></Box>
                        <Box className="cell-placeholder" onClick= { t.onFocusChanResponcer }>{ !t.state.data.chanResponcer ? "请选择" : t.state.data.chanResponcer }</Box>
                      </HBox> 
                    </VBox>
                  </LogicRender>
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
                <LogicRender show={ t.state.type == 'chance_create' | (t.state.type == 'edit' && t.state.data.flag == '2')  } >
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

