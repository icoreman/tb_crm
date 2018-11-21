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
  Collapse,
  ScrollView,
  Popup,
  SearchBar,
  Boxs,
  ScrollList,
  Dialog
} from 'saltui';

import Icon from 'salt-icon';

import {
  Flex,
  FlexItem
} from 'react-weui';

import FaceSadLine from 'salt-icon/lib/FaceSadLine';
import FaceSmileLine from 'salt-icon/lib/FaceSmileLine';

import SearchCustomerView from 'components/searchCustomerView';
import ActivityChanceList from 'pages/chance/activity_list';
import PageChanceForm from 'pages/chance/form';
import ActivityQuestionList from 'pages/question/activity_list';
import PageQuesForm from 'pages/question/form';

import './PageActivityForm.less';

const {
  IconButton,
  ButtonGroup,
} = Button;

const {
  HBox,VBox,Box
} = Boxs;

const Panel = Collapse.Panel;

export default class PageActivityForm extends Component {

  constructor(props) {
    super(props);
    const t = this;

    let query =  t.props.location.query;
    const token = localStorage.token;
    const id = query.id;
    const type = query.type;
    let userName = localStorage.ezplatformUserName;
    let orgName = localStorage.ezplatformOrgName;
    let scrollHeight = getScrollHigh(0,0,0);
    const readOnly = type == 'get';
    const nowDate = new Date().getTime();

    t.state = {
      token: token,
      userName: userName,
      orgName: orgName,
      custName: '',
      type: type,
      createdOrgName: orgName,
      readOnly: readOnly,
      scrollHeight: scrollHeight,
      data: {
        detail: {
          id: id,
          createdUserName: userName,
          actiCustNo: '',
          actiProductCenter: null,
          actisTime: nowDate,
          actieTime: nowDate,
          actiPlace: '',
          actiLinkNo: '',
          actiTheme: '',
          actiType: '1',
          flag: ''
        },
        rc: {
          actiResult: '',
          id: '',
          actiRecord: '',
          actiLeftQues: '',
          actiSupport: '',
          actiNextStep: ''
        },
        cz: {
          actiLeftQues_2: '',
          id: '',
          actiRecord_2: '',
          actiNextStep_2: '',
          actiResult_2: '',
          actiSupport_2: ''
        }
      },
      selectOfCenter: [],
      chances: [],
      questions: []
    };
  }

  componentDidMount() {
    const t = this;
    var token = t.state.token;
    if(!token) {
      alert("没有token");
      return;
    }

    const type = t.state.type;

    if(type == 'get' | type == 'edit') {
      const id = t.state.data.detail.id;
      if(!id) {
        alert("没有id");
        return;
      }
      DB.CrmActivityAPI.get({
        token: token,
        id: id
      })
      .then((content) => {
        t.setState({
          data: {
            detail: content.detail,
            cz: !content.cz ?  {
              actiResult: '',
              id: '',
              actiRecord: '',
              actiLeftQues: '',
              actiSupport: '',
              actiNextStep: ''
            } : content.cz,
            rc: !content.rc ? {
              actiLeftQues_2: '',
              id: '',
              actiRecord_2: '',
              actiNextStep_2: '',
              actiResult_2: '',
              actiSupport_2: ''
            } : content.rc
          }
        });

        t.getSelectOfCenter(content.detail.actiProductCenter);
        t.getCustInfoById(content.detail.actiCustNo);

      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          content: '查询出错'
        });
      });

      DB.CrmActivityAPI.getChanTable({
        token: token,
        id: id,
        currentPage: '1',
        pageSize: '999',
        type: 'chan'
      })
      .then((content) => {
        t.setState({
          chances: content
        });
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          content: '查询出错'
        });
      });
      
      DB.CrmActivityAPI.getChanTable({
        token: token,
        id: id,
        currentPage: '1',
        pageSize: '999',
        type: 'ques'
      })
      .then((content) => {
        t.setState({
          questions: content
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

  componentWillUnmount() {
    Popup.hide();
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
              data.detail.actiProductCenter = center;
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

  getCustInfoById = (custId) => {
    const t = this;
    const token = t.state.token;
    DB.CrmCustomerAPI.getCustomerOfPass({
      token: token,
      custId: custId,
      type: 'chan'
    })
    .then((content) => {
      t.setState({
        custName: content[0].text
      });
    })
    .catch((error) => {
      Toast.show({
        type: 'error',
        content: '根据客户id获取客户失败'
      });
    });
  }

  handleSubmitForm(saveType) {
    if(saveType == 0) {
      hashHistory.goBack();
      return;
    }
    const t = this;
    let actiTheme = '';

    let rc1 = t.state.data.rc;
    let cz1 = t.state.data.cz;
    let chances = t.state.chances;
    let questions = t.state.questions;

    if(!t.state.custName) {
      Dialog.alert({
        title:'提示',
        content:'请选择客户！'
      });
      return;
    }

    if(document.getElementsByName("option-checked").length == 0) {
      Dialog.alert({
        title:'提示',
        content:'请至少填写一个跟进记录！'
      });
      return;
    }

    if(!t.state.data.detail.actiProductCenter) {
      Dialog.alert({
        title:'提示',
        content:'请选择产品中心！'
      });
      return;
    }

    let rcParam = '';
    if(!!rc1.actiResult) {
      let rc=[{
        id:rc1.id,
        actiRecord:rc1.actiRecord,
        actiResult:rc1.actiResult,
        actiLeftQues:rc1.actiLeftQues,
        actiSupport:rc1.actiSupport,
        actiNextStep:rc1.actiNextStep
      }];
      rcParam = JSON.stringify(rc)
      actiTheme += '3,';
    }

    let czParam = '';
    if(!!cz1.actiResult_2) {
      let cz=[{
        id:cz1.id,
        actiRecord:cz1.actiRecord_2,
        actiResult:cz1.actiResult_2,
        actiLeftQues:cz1.actiLeftQues_2,
        actiSupport:cz1.actiSupport_2,
        actiNextStep:cz1.actiNextStep_2
      }];
      czParam = JSON.stringify(cz);
      actiTheme += '4,';
    }

    let chancesParam = t.getChanQuesJson(chances);
    let questionsParam = t.getChanQuesJson(questions);

    if(chancesParam != '[]') {
      actiTheme += '1,';
    }


    if(questionsParam != '[]') {
      actiTheme += '2,';
    }

    const type = t.state.type;
    const token = t.state.token;
    let detail = t.state.data.detail;
    if(type == 'create') {
      DB.CrmActivityAPI.create({
        token: token,
        actisTime: !detail.actisTime.value ? detail.actisTime : detail.actisTime.value,
        actieTime: !detail.actieTime.value ? detail.actieTime : detail.actieTime.value,
        actiProductCenter: detail.actiProductCenter.value,
        actiPlace: detail.actiPlace,
        actiLinkNo:detail.actiLinkNo,
        actiCustNo:detail.actiCustNo,
        actiTheme: actiTheme.substring(0,actiTheme.length - 1),
        actiType:detail.actiType,
        rc:rcParam,
        cz:czParam,
        chance:chancesParam,
        question:questionsParam,
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
        Toast.show({
          type: 'error',
          content: '保存失败'
        });
      });
    } else {
      DB.CrmActivityAPI.update({
        token: token,
        id: detail.id,
        actisTime:detail.actisTime,
        actieTime:detail.actieTime,
        actiPlace:detail.actiPlace,
        actiLinkNo:detail.actiLinkNo,
        actiCustNo:detail.actiCustNo,
        actiTheme: actiTheme,
        actiType:detail.actiType,
        rc:rcParam,
        cz:czParam,
        chance:chancesParam,
        question:questionsParam,
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
        Toast.show({
          type: 'error',
          content: '保存失败'
        });
      });
    }
  }

  getChanQuesJson(data) {
    if(data.length ==0) {
      return "[]";
    }
    var result = [];
    for(let i = 0 ;i < data.length; i++) {
      let chanQues = data[i];
      if(!chanQues.actiResult) {
        continue;
      }
      var chanQuesJson = {
        actiRecord : chanQues.actiRecord,
        actiResult : chanQues.actiResult,
        actiSupport : chanQues.actiSupport,
        actiNextStep : chanQues.actiNextStep,
        actiLeftQues : "",
        id : chanQues.id
      };
      result.push(chanQuesJson);
    }
    return JSON.stringify(result);
  }
  
  handleDeatilChange(label, value) {
    const t = this;
    let data = t.state.data;

    data.detail[label] = value;
    t.setState({
      data: data    
    });
  }

  handleRCChange(label,value) {
    const t = this;
    let data = t.state.data;
 
    data.rc[label] = value;
    t.setState({
      data: data
    });
  }

  handleCZChange(label,value) {
    const t = this;
    let data = t.state.data;

    data.cz[label] = value;
    t.setState({
      data: data
    });
  }

  /**
   * 选择客户
   */
  onFocusCustName(){
    const t = this;

    Popup.show(
      <div className="activity-add-popup-container">
        <SearchCustomerView 
          defaultValue={ t.state.custName } 
          clickCell= { (customer) => t.clickSelectCustomer(customer) }/>
      </div>, {
        animationType: 'slide-right'
    });
  }  

  clickSelectCustomer(customer) {
    const t = this;
    let data = t.state.data;
    data.detail.actiCustNo = customer.id;

    t.setState({
      custName: customer.text,
      data: data
    });
    Popup.hide();
  }

  getCustomer(value) {
    
  }

  /**
   * 点击选择商机
   */
  handleClickSelectChance = () => {
    const t = this;
    let custId = t.state.data.detail.actiCustNo;
    if(!custId) {
      Dialog.alert({
        content: '请先选择客户！'
      });
      return;
    }

    Popup.show(
      <div className="activity-add-popup-container">
        <ActivityChanceList 
          custId = { custId }
          custName = { t.state.data.custName }
          handleComfirm = { (data) => t.handleSelectChance(data) }
          defaultData = { t.state.chances }/>
      </div>, {
        animationType: 'slide-right'
    });
  }

  handleSelectChance = (data) => {
    this.setState({
      chances: data
    });
  }

  handleClickNewChance = () => {
    const t = this;
    let custId = t.state.data.custId;
    if(!custId) {
      Dialog.alert({
        content: '请先选择客户！'
      });
      return;
    }

    Popup.show(
      <div className="activity-add-popup-container">
        <PageChanceForm 
          custId = { custId }
          custName = { t.state.data.custName } 
          complete = { (chance) => t.handleAddChanceComplete(chance) }/>
      </div>, {
        animationType: 'slide-right'
    });
  }

  handleAddChanceComplete = (chance) => {
    const t = this;
    let tempChance = t.changeChanceData(chance);
    let chances = t.state.chances;
    chances.push(tempChance);
    
    t.setState({
      chances: chances
    });
  }

  /**
   * 把获取商机接口获取的data转成建活动所需要的data格式
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  changeChanceData = (data) => {
    let tempData = {
      id: data.id,
      actiRecord: '',
      actiResult: '',
      actiLeftQues: '',
      actiSupport: '',
      actiNextStep: '',
      chanName: data.chanName,
      chanStage: data.chanStage,
      chanTime: data.chanTime
    };
    return tempData;
  }

  handleClickClearChance = () => {
    this.setState({
      chances: []
    });
  }

  /**
   * 点击选择问题
   */
  handleClickSelectQuestion = () => {
    const t = this;
    let custId = t.state.data.detail.actiCustNo;
    if(!custId) {
      Dialog.alert({
        content: '请先选择客户！'
      });
      return;
    }

    Popup.show(
      <div className="activity-add-popup-container">
        <ActivityQuestionList 
          custId = { custId }
          custName = { t.state.data.custName }
          handleComfirm = { (data) => t.handleSelectQuestion(data) }
          defaultData = { t.state.questions }/>
      </div>, {
        animationType: 'slide-right'
    });
  }

  handleSelectQuestion = (data) => {
    this.setState({
      questions: data
    });
  }

  /**
   * 点击新建问题
   */
  handleClickNewQuestion = () => {
    const t = this;
    let custId = t.state.data.custId;
    if(!custId) {
      Dialog.alert({
        content: '请先选择客户！'
      });
      return;
    }

    
    Popup.show(
      <div className="activity-add-popup-container">
        <PageQuesForm 
         custId = { custId }
         custName = { t.state.data.custName } 
         complete = { (question) => t.handleAddQuestionComplete(question) }/>
      </div>, {
        animationType: 'slide-right'
    });
  }

  handleAddQuestionComplete = (question) => {
    const t = this;
    let questions = t.state.questions;
    questions.push(changeQuestionData(question));

    t.setState({
      questions: questions
    });
  }

  handleClickClearQuestion = () => {
    this.setState({
      questions: []
    });
  }

  cilckDeleteRecord = (e,id,type) => {
    e.stopPropagation();
    const t = this;
    Dialog.confirm({
      title: '提示',
      content: '确认删除这条跟进记录？',
      onConfirm() {
        let token = t.state.token;
        let actiId = t.state.data.detail.id;
        DB.CrmActivityAPI.deleteQuesOrChan({
          token: token,
          type: type,
          actiId: actiId,
          ids: id
        })
        .then((content) => {
          t.deleteRecord(id, type);
        }).catch((error) => {
          Toast.show({
            type: 'error',
            content: '删除出错'
          });
        });
      }
    });
  }

  deleteRecord = (id, type) => {
    const t = this;
    if(type == "ques") {
      let questions = t.state.questions;
      for(let i = 0; i < questions.length; i ++) {
        let question = questions[i];
        if(question.id == id) {
          questions.splice(i,1);
          break;
        }
      }
      t.setState({
        questions: questions
      });
    } else {
      let chances = t.state.chances;
      for(let i = 0; i < chances.length; i ++) {
        let chance = chances[i];
        if(chance.id == id) {
          chances.splice(i,1);
          break;
        }
      }
      t.setState({
        chances: chances
      });
    }
  }

  /**
   * 把获取商机接口获取的data转成建活动所需要的data格式
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  changeQuestionData = (data) => {
    let tempData = {
      id: data.id,
      detailType: '',
      actiRecord: '',
      actiResult: '',
      actiLeftQues: '',
      actiSupport: '',
      actiNextStep: '',
      quesDesc: data.quesDesc,
      quesStatus: data.quesStatus,
      quesGuestTime: data.quesGuestTime
    };
    return tempData;
  }

  /**
   * 处理问题、商机跟进的记录
   */
  handleSpanChange = (type,id, label, value) => {
    const t = this;
    
    if("2" == type) {
      let data = t.state.chances;
      for(let i = 0; i < data.length; i++) {
        let tempData = data[i];
        if(tempData.id == id) {
          tempData[label] = value;
          break;
        }
      }
      t.setState({
        chances: data
      });
    } else {
      let data = t.state.questions;
      for(let i = 0; i < data.length; i++) {
        let tempData = data[i];
        if(tempData.id == id) {
          tempData[label] = value;
          break;
        }
      }
      t.setState({
        questions: data
      });
    }
    
  }

  render() {
    const t = this;
    let scrollViewStyle = { height: t.state.scrollHeight };
    let chances = t.state.chances;
    let questions = t.state.questions;
    const readonly = t.state.readOnly;
    const placeholder = readonly ? '' : '请输入';

    const rcHeader =  <HBox><LogicRender show={ !!t.state.data.rc.actiResult } ><Icon name='option-checked' fill='#ff6f00' width='22' height='22'/></LogicRender><Box>日常维护</Box></HBox>;
    const czHeader =  <HBox><LogicRender show={ !!t.state.data.cz.actiResult_2 } ><Icon name='option-checked' fill='#ff6f00' width='22' height='22'/></LogicRender><Box>参展</Box></HBox>;

    return (
      <div>
        <ScrollView 
          infiniteScroll={ false }
          style={ scrollViewStyle }
        >
          <Group>  
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
                <TextField required label="销售人员" value={ t.state.data.detail.createdUserName } readOnly />
            </Group.List>
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <TextField label="部  门" value={ t.state.createdOrgName } readOnly />
            </Group.List>
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
               <SelectField
                label="产品中心"
                required
                options={ t.state.selectOfCenter }
                onSelect={t.handleDeatilChange.bind(t, 'actiProductCenter')}
                value={t.state.data.detail.actiProductCenter}
                placeholder={ placeholder }
                readOnly={ readonly }/>
            </Group.List>
             <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <DatetimeField label="活动起始时间" onSelect={ t.handleDeatilChange.bind(t, 'actisTime') } 
                value={ t.state.data.detail.actisTime } columns={ DatetimeField.YMD }  readOnly={ readonly }/>
            </Group.List>
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <DatetimeField label="活动结束时间" onSelect={ t.handleDeatilChange.bind(t, 'actieTime') } 
                value={ t.state.data.detail.actieTime } columns={ DatetimeField.YMD }  readOnly={ readonly }/>
            </Group.List> 
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <TextField label="活动地点" placeholder={ placeholder } value={ t.state.data.detail.actiPlace }
                onChange={t.handleDeatilChange.bind(t, 'actiPlace') } readOnly={ readonly }/>
            </Group.List>
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <LogicRender show={ t.state.type != 'create' }>
                <TextField label="客户名称" required placeholder={ placeholder } value={ t.state.custName } readOnly/>
              </LogicRender>
              <LogicRender show={ t.state.type == 'create' }>
                <VBox className='t-PR16 t-PL16 t-H44 t-FBJC'>
                  <HBox>
                    <Box className='cell-header'><span className='t-FS16'>客户名称*</span></Box>
                    <Box className="cell-placeholder" onClick= { t.onFocusCustName.bind(t) }>{ t.state.custName == "" ?  "请选择" : t.state.custName }</Box>
                  </HBox> 
                </VBox>
              </LogicRender>  
            </Group.List>
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <TextField label="联系人" placeholder={ placeholder } value={ t.state.data.detail.actiLinkNo }
                onChange={ t.handleDeatilChange.bind(t, 'actiLinkNo') } readOnly={ readonly } />
            </Group.List>
            <div className="t-MB3"></div>
            <Group.List lineIndent={18} className="content-FAR">
              <Collapse 
                key = "activity_collapse"
                accordion= { false } 
              >
                <Panel key="chance" header="跟进商机" showArrow={ true }>
                  <LogicRender show={ !readonly }>
                    <ButtonGroup>
                      <Button type="secondary" size="small" display="inline" onClick={ t.handleClickSelectChance } >选择商机</Button>
                      <Button type="secondary" size="small" display="inline" onClick={ t.handleClickNewChance } >新商机</Button>
                      <Button type="primary" size="small" display="inline" onClick={ t.handleClickClearChance }>清空</Button>
                    </ButtonGroup>
                  </LogicRender>
                  <Collapse
                    key = "chance_collapse"
                    accordion= { false } 
                  >
                    {
                      chances.map((chance) => 
                        <Panel key={chance.id} header= {
                          <Flex>
                            <LogicRender show={ !!chance.actiResult }>
                              <Icon name='option-checked' width='22' height='22' fill='#ff6f00'/>
                            </LogicRender>
                            <FlexItem>{chance.chanName}</FlexItem>
                            <LogicRender show={ !readonly && chance.old == 1 }>
                              <Icon className="t-FR t-MR6" name='cross' width='22' height='22' fill='#ff6f00' onClick={ (e) => t.cilckDeleteRecord(e, chance.id, 'chan')}/>
                            </LogicRender>
                          </Flex>
                        } showArrow={ true }>
                          <Group>
                            <div className="t-MB3"></div>
                            <Group.List lineIndent={18} className="content-FAR">
                                <TextField label="状态" value={ chance.chanStage }  readOnly />
                            </Group.List>
                            <div className="t-MB3"></div>
                            <Group.List lineIndent={18} className="content-FAR">
                                <TextField label="创建时间" value={ chance.chanTime } readOnly />
                            </Group.List>
                            <div className="t-MB3"></div>
                            <Group.List lineIndent={18} className="content-FAR">
                                <TextField label="活动记录" value={ chance.actiRecord } placeholder={ placeholder }
                                onChange={ t.handleSpanChange.bind(t, '2', chance.id, 'actiRecord') } readOnly={ readonly } />
                            </Group.List>
                            <div className="t-MB3"></div>
                            <Group.List lineIndent={18} className="content-FAR">
                                <TextField required label="活动结果" value={ chance.actiResult } placeholder={ placeholder }
                                onChange={ t.handleSpanChange.bind(t, '2', chance.id, 'actiResult') } readOnly={ readonly } />
                            </Group.List>
                            <div className="t-MB3"></div>
                            <Group.List lineIndent={18} className="content-FAR">
                                <TextField label="遗留问题" value={ chance.actiLeftQues } placeholder={ placeholder }
                                onChange={ t.handleSpanChange.bind(t, '2', chance.id, 'actiLeftQues') } readOnly={ readonly } />
                            </Group.List>
                            <div className="t-MB3"></div>
                            <Group.List lineIndent={18} className="content-FAR">
                                <TextField label="资源支持" value={ chance.actiSupport } placeholder={ placeholder }
                                onChange={ t.handleSpanChange.bind(t, '2', chance.id, 'actiSupport') } readOnly={ readonly } />
                            </Group.List>
                          </Group> 
                        </Panel>
                      )
                    }
                  </Collapse>
                </Panel>
                <Panel key="question" header="解决问题">
                  <LogicRender show={ !readonly }>
                    <ButtonGroup>
                      <Button type="secondary" size="small" display="inline" onClick={ t.handleClickSelectQuestion } >选择问题</Button>
                      <Button type="secondary" size="small" display="inline" onClick={ t.handleClickNewQuestion } >新问题</Button>
                      <Button type="primary" size="small" display="inline" onClick={ t.handleClickClearQuestion }>清空</Button>
                    </ButtonGroup>
                  </LogicRender>
                  <Collapse
                    key = "chance_collapse"
                    accordion= { false } 
                  >
                    {
                      questions.map((question) => 
                        <Panel key={question.id} header= {
                          <Flex>
                            <LogicRender show={ !!question.actiResult }>
                              <Icon name='option-checked' width='22' height='22' fill='#ff6f00'/>
                            </LogicRender>
                            <FlexItem>{question.quesDesc}</FlexItem>
                            <LogicRender show={ !readonly && question.old == 1 }>
                              <Icon className="t-FR t-MR6" name='cross' width='22' height='22' fill='#ff6f00' onClick={ (e) => t.cilckDeleteRecord(e, question.id, 'ques')}/>
                            </LogicRender>
                          </Flex>
                        } showArrow={ true }>
                          <Group>
                            <div className="t-MB3"></div>
                            <Group.List lineIndent={18} className="content-FAR">
                                <TextField label="状态" value={ question.quesStatus }  readOnly />
                            </Group.List>
                            <div className="t-MB3"></div>
                            <Group.List lineIndent={18} className="content-FAR">
                                <TextField label="创建时间" value={ question.quesGuestTime } readOnly />
                            </Group.List>
                            <div className="t-MB3"></div>
                            <Group.List lineIndent={18} className="content-FAR">
                                <TextField label="活动记录" value={ question.actiRecord } placeholder={ placeholder }
                                onChange={ t.handleSpanChange.bind(t, '1', question.id, 'actiRecord') } readOnly={ readonly } />
                            </Group.List>
                            <div className="t-MB3"></div>
                            <Group.List lineIndent={18} className="content-FAR">
                                <TextField required label="活动结果" value={ question.actiResult } placeholder={ placeholder }
                                onChange={ t.handleSpanChange.bind(t, '1', question.id, 'actiResult') } readOnly={ readonly } />
                            </Group.List>
                            <div className="t-MB3"></div>
                            <Group.List lineIndent={18} className="content-FAR">
                                <TextField label="遗留问题" value={ question.actiLeftQues } placeholder={ placeholder }
                                onChange={ t.handleSpanChange.bind(t, '1', question.id, 'actiLeftQues') } readOnly={ readonly } />
                            </Group.List>
                            <div className="t-MB3"></div>
                            <Group.List lineIndent={18} className="content-FAR">
                                <TextField label="资源支持" value={ question.actiSupport } placeholder={ placeholder }
                                onChange={ t.handleSpanChange.bind(t, '1', question.id, 'actiSupport') } readOnly={ readonly } />
                            </Group.List>
                          </Group> 
                      </Panel>)
                    }
                  </Collapse>
                </Panel>
                <Panel key="rc" header={ rcHeader }>
                  <Group>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR">
                        <TextField label="活动记录" value={ t.state.data.rc.actiRecord } placeholder={ placeholder }
                        onChange={ t.handleRCChange.bind(t, 'actiRecord') } readOnly={ readonly }/>
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR">
                        <TextField required label="活动结果" value={ t.state.data.rc.actiResult } placeholder={ placeholder }
                        onChange={ t.handleRCChange.bind(t, 'actiResult') } readOnly={ readonly }/>
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR">
                        <TextField label="资源支持" value={ t.state.data.rc.actiSupport } placeholder={ placeholder }
                        onChange={ t.handleRCChange.bind(t, 'actiSupport') } readOnly={ readonly }/>   
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR">
                        <TextField label="下一步计划" value={ t.state.data.rc.actiNextStep } placeholder={ placeholder }
                        onChange={ t.handleRCChange.bind(t, 'actiNextStep') } readOnly={ readonly }/>
                    </Group.List>
                  </Group> 
                </Panel>
                <Panel key="cz" header={ czHeader }>
                  <Group>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR">
                        <TextField label="活动记录" value={ t.state.data.cz.actiRecord_2 } placeholder={ placeholder }
                        onChange={ t.handleCZChange.bind(t, 'actiRecord_2') } readOnly={ readonly }/>
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR">
                        <TextField required label="活动结果" value={ t.state.data.cz.actiResult_2 } placeholder={ placeholder }
                        onChange={ t.handleCZChange.bind(t, 'actiResult_2') } readOnly={ readonly }/>
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR">
                        <TextField label="资源支持" value={ t.state.data.cz.actiSupport_2 } placeholder={ placeholder }
                        onChange={ t.handleCZChange.bind(t, 'actiSupport_2') } readOnly={ readonly }/>
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR">
                        <TextField label="下一步计划" value={ t.state.data.cz.actiNextStep_2 } placeholder={ placeholder }
                        onChange={ t.handleCZChange.bind(t, 'actiNextStep_2') } readOnly={ readonly }/>
                    </Group.List>
                  </Group> 
                </Panel>
              </Collapse>
            </Group.List>
          </Group>
          <div className="t-MB3"></div>
          <div style={{padding: '30px 15px'}}>
            <LogicRender show={ readonly }>
              <Button.Group>
                <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(t,0)}>关闭</Button>
              </Button.Group> 
            </LogicRender>
            <LogicRender show={ t.state.type == 'edit' && t.state.data.detail.flag == '2' }>
              <Button.Group>
                <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(t,0)}>取消</Button>
                <Button type="primary" display="inline" onClick={t.handleSubmitForm.bind(t,2)}>保存</Button>
              </Button.Group>
            </LogicRender>
            <LogicRender show={ t.state.data.detail.flag == '1' | t.state.type == 'create'}>
              <Button.Group>
                <Button type="secondary" display="inline" onClick={t.handleSubmitForm.bind(t,1)}>暂存</Button>
                <Button type="primary" display="inline" onClick={t.handleSubmitForm.bind(t,2)}>保存</Button>
              </Button.Group>
            </LogicRender>
          </div>
        </ScrollView>  
      </div>
    )
  }
}

