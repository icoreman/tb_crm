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
    Dialog,
    Boxs,
    Popup
} from 'saltui';

import SearchCustomerView from 'components/searchCustomerView';

import './PageQuesForm.less';

const {
  IconButton,
  ButtonGroup,
} = Button;

const {
  HBox,VBox,Box
} = Boxs;

const {
  quesStatusProps
} = selectKeyValues;

export default class PageQuesForm extends Component {

    constructor(props) {
      super(props);
      const t = this;

      const location = t.props.location;
      const token = localStorage.token;
      let custId,type,id,custName,readOnly;
      let ezplatformUserName = localStorage.ezplatformUserName;
      if(!location) {
        custId = props.custId;
        custName = props.custName;
        id = null;
        type = "activity_create";
        readOnly = false; 
      } else {
        const query = location.query;
        custId = query.custId;
        type = query.type;
        id = query.id;
        custName = query.custName;
        readOnly= type == 'get' ? true : false;
      }

      
      t.state = {
        token: token,
        type: type,
        readOnly: readOnly,
        custName: custName,
        data: {
          flag : null,
          quesStatus : quesStatusProps[0],
          quesItem : null,
          quesCenter : null,
          quesName : null,
          quesDesc : null,
          quesGuestTime : null,
          quesFollow : null,
          createdUserName : ezplatformUserName,
          quesCompTime : null,
          custId : custId,
          createUser : null,
          id : id
        },
        selectOfCenter: [],
        selectOfFollowId: {
          data: [],
          ids: [],
          id: ''
        }
      };
    }

    componentDidMount() {
      const t = this;
      const token = t.state.token;
      if(!token) {
        alert("没有token");
        return;
      }

      const custId = t.state.data.custId;

      const type = t.state.type;
      if(type == 'get' || type == 'edit') {
        const id = t.state.data.id;
        if(!id) {
          alert("没有id");
          return;
        }

        DB.CrmQustionAPI.get({
          token: token,
          id: id
        })
        .then((content) => {
          // 要获取跟进人字段
          t.getQuesFolloew(content.quesFollow);
          t.getSelectOfCenter(content.quesCenter);
          // 需要适配下拉，一个是产品中心，一个是问题状态
          const quesStatus = content.quesStatus;
          quesStatusProps.map((status) => {
            if(status.value == quesStatus) {
              content.quesStatus = status;
            }
          });
         
          t.setState({
              data: content
          });
          
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            content: '查询出错'
          });
        });
      } else {
        t.getSelectOfCenter();
      }
    }

    getSelectOfCenter = (defaultValue) => {
      const t = this;
      const token = this.state.token;
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
              data.quesCenter = center;
              t.setState({
                data: data
              });
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

    /**
     * 将cmp_scope转成企业微信的能识别值
     */
    getQuesFolloew = (quesFollow) => {
      if(!quesFollow) {
        return;
      }
      const t = this;
      const token = t.state.token;

      DB.CrmUserAPI.getUserInfoByScope({
        token: token,
        fieldDataTable: 'tb_crm_question',
        fieldData: 'quesFollow',
        fieldDataValue: quesFollow
      })
      .then((content) => {
        let data = t.state.data;
        data.quesFollow = content.userName;
        t.setState({
          data: data,
          selectOfFollowId: content.userId
        })
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          content: '查询出错'
        });
      });
    }

    handleSubmitForm(saveType) {
      const t = this;

      if(saveType == 0) {
        hashHistory.goBack();
        return;
      }

      const token = t.state.token;
      if(!token) {
        alert("没有token");
        return;
      }

      if(!t.checkParam()) {
        return;
      }

      let data = t.state.data;
      
      let custId = data.custId;
      if(custId == "" || custId == undefined) {
        alert("custId为空，请重试");
        return;
      }

     if(t.state.type.indexOf('create') > -1 ) {
         DB.CrmQustionAPI.create({
          token: token,
          custId: custId,
          quesName: data.quesName,
          quesItem: data.quesItem,
          quesGuestTime: data.quesGuestTime.value,
          quesCompTime: data.quesCompTime.value,
          quesCenter: data.quesCenter.value,
          quesStatus: data.quesStatus.value,
          quesDesc: data.quesDesc,
          quesFollow: t.state.selectOfFollowId.id,
          flag: saveType
        })
        .then((content) => {
          Toast.show({
            type: 'success',
            content: '保存成功'
          });
          if(t.state.type == 'activity_create') {
            this.props.complete(content);
          }

          setTimeout(() => {
            hashHistory.goBack();
          }, 1000);
        })
        .catch((error) => {
          // 失败 or 有异常被捕获
          Toast.show({
            type: 'error',
            content: '保存失败'
          });
        });
      } else {
        DB.CrmQustionAPI.update({
          token: token,
          custId: custId,
          id: data.id,
          quesName: data.quesName,
          quesItem: data.quesItem,
          quesGuestTime: data.quesGuestTime.value,
          quesCompTime: data.quesCompTime.value,
          quesCenter: data.quesCenter.value,
          quesStatus: data.quesStatus.value,
          quesDesc: data.quesDesc,
          quesFollow: t.state.selectOfFollowId.id,
          flag: saveType
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
          // 失败 or 有异常被捕获
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
      if(!t.checkParamNull(data,'quesDesc','请填写问题描述！')) {
        return false;
      }
      if(!t.checkParamNull(data,'quesCenter','请填写产品中心！')) {
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
    
    onFocusCustName(){
      const t = this;

      Popup.show(
        <div className="activity-add-popup-container">
          <SearchCustomerView 
            defaultValue={ t.state.custName } 
            type='sample'
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

      Popup.hide();
    }

    handleChange(label, value) {
      const t = this;
      var data = t.state.data;

      data[label] = value;
      t.setState({
          data: data
      });
    }

    handleNumberChange(label, value) {
      const t = this;
      var data = t.state.data;
      data[label] = value.replace(/\.$/, '').replace(/^0*([0-9]+)/, '$1');

      t.setState({
          data: data
      });
    }

    onFocusQuesFollow = () => {
      const t = this;
      let selectOfFollowId = t.state.selectOfFollowId;
      let ids = selectOfFollowId.id;
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
            selectOfFollowId: {
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
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <LogicRender show={  !!t.state.custName | t.state.type != 'create'  }>
                    <TextField required key="custName" label="客户名称" value={ t.state.custName }
                    readOnly={ true } />
                  </LogicRender> 
                  <LogicRender show={ !t.state.custName && t.state.type == 'create'  }>
                    <VBox className='t-PR16 t-PL16 t-H44 t-FBJC'>
                      <HBox>
                        <Box className='cell-header'><span className='t-FS16' >客户名称*</span></Box>
                        <Box className="cell-placeholder" onClick= { t.onFocusCustName.bind(t) }>{ !t.state.data.custName? "请输入" : t.state.data.custName }</Box>
                      </HBox> 
                    </VBox>
                  </LogicRender>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='quesName' label="项目名称" placeholder="请输入" value={ t.state.data.quesName }
                    onChange={t.handleChange.bind(t, 'quesName')} readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='quesItem' label="产品编码" placeholder="请输入" value={ t.state.data.quesItem }
                    onChange={t.handleChange.bind(t, 'quesItem')} readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='quesDesc' required label="问题描述" placeholder="请输入" value={ t.state.data.quesDesc }
                    onChange={t.handleChange.bind(t, 'quesDesc')} readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <TextField key='userName' label="创建人" placeholder="请输入" value={ t.state.data.createdUserName }
                    readOnly={ true }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                   <SelectField
                    label="产品中心"
                    required
                    options={ t.state.selectOfCenter }
                    onSelect={t.handleChange.bind(t, 'quesCenter')}
                    value={t.state.data.quesCenter}
                    placeholder="请选择"
                    readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <DatetimeField key='quesGuestTime' label="问题提出时间" onSelect={ t.handleChange.bind(t, 'quesGuestTime') } 
                    value={ t.state.data.quesGuestTime } columns={ DatetimeField.YMD } />
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <DatetimeField key='quesCompTime' label="要求完成时间" onSelect={ t.handleChange.bind(t, 'quesCompTime') } 
                    value={ t.state.data.quesCompTime } columns={ DatetimeField.YMD } />
                </Group.List>   
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <SelectField
                    label="问题状态"
                    options={ quesStatusProps }
                    onSelect={t.handleChange.bind(t, 'quesStatus')}
                    value={t.state.data.quesStatus}
                    placeholder="请选择"
                    readOnly={ t.state.readOnly }/>
                </Group.List>
                <div className="t-MB3"></div>
                <Group.List lineIndent={18} className="content-FAR t-FS16">
                  <LogicRender show={ t.state.readOnly }>
                    <TextField label="问题跟进人" value={ t.state.data.quesFollow }
                       readOnly={ t.state.readOnly } />
                  </LogicRender>
                  <LogicRender show={ !t.state.readOnly }>
                    <VBox className='t-PR16 t-PL16 t-H44 t-FBJC'>
                      <HBox>
                        <Box className='cell-header'><span className='t-FS16'>问题跟进人</span></Box>
                        <Box className="cell-placeholder" onClick= { t.onFocusQuesFollow }>{ !t.state.data.quesFollow ? "请选择" : t.state.data.quesFollow }</Box>
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
                   <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(t,0)}>取消</Button>
                   <Button type="primary" display="inline" onClick={t.handleSubmitForm.bind(t,2)}>保存</Button>
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

