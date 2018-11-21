import { Component,LogicRender } from 'refast';
import DB from '../../../app/db';
import { URLS,noDataImage } from '../../../app/variables';
import { hashHistory } from 'react-router';
import './PageCustomerDetail.less';

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
    PickerField,PhotoField,
    SearchBar,
    ScrollList
} from 'saltui';

import CustLinkListItem from 'pages/link/list_item';
import CustQuesListItem from 'pages/question/list_item';
import CustChanceListItem from 'pages/chance/list_item';

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

const { RightAddon } = TextField;

export default class PageCustomerDetail extends Component {

    constructor(props) {
        super(props);
        var query = this.props.location.query;
        var id = query.id;
        var custEdit = query.edit;
        var activeKey = query.activeKey;
        var showAddButton = custEdit == 1 ? true : false;
        let t = this;

        var otherLength = 42 + 71 + (showAddButton ? 50 : 0 );
        var firstTableHeight = getScrollHighWithOther(0, 0, 0, (42 + 71));
        var tableHeight = getScrollHighWithOther(0, 0, 0, otherLength);
        var tableWith = getWidth();
        var token = localStorage.token;
        t.state = {
          token: token,
          custId: id,
          custName: '',
          custEdit: custEdit,
          showAddButton: showAddButton,
          baseInfo: {
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
            reviewTechnology : '',
            id : '',
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
          links: {
            pageSize: 15,
            currentPage:1,
            order: null,
            orderBy: null,
          },
          chances: {
            pageSize: 15,
            currentPage:1,
            chanId:null,
            noClose: null,
            noGroup: 'no',
            noValue: null,
            idall: null,
            chanNew: null,
            chanCenter: null,
            chanCustName: null,
            chanStages: null,
            chanType: null,
            chanNames: null,
            saveType: null,
            order: 'desc',
            orderBy: 'createdDate',
          },
          questions : {
            pageSize: 15,
            currentPage:1,
            quesId: null,
            noClose: null,
            noGroup: null,
            noValue: null,
            idall: null,
            quesNew: null,
            quesCenter: null,
            quesCustName: null,
            quesState: null,
            quesDescs: null,
            saveType: null,
            order: null,
            orderBy: null,
          },
          title:'客户详情',
          selectOfCenter:[],
          centerName: '',
          tableWith: tableWith,
          firstTableHeight: firstTableHeight,
          tableHeight: tableHeight
        };
    }

    componentDidMount() {
      var id = this.state.custId;
      if(id == "" || id == undefined) {
        alert("没有客户id");
        return;
      }
      var token = this.state.token;
      if(token == "" || token == undefined) {
        alert("没有token");
        return;
      }

      DB.CrmUserAPI.getSelectOfCenter({
        token: token
      })
      .then((selectOfCenter) => {
        this.setState({
            selectOfCenter: selectOfCenter
        });

        DB.CrmCustomerAPI.customer360InfoBase({
          id: id,
          token: token
        })
        .then((content) => {
          this.setState({
              baseInfo: content,
              custName: content.custName
          });

          var custCenter = content.custCenter; 
          selectOfCenter.forEach((centerMap,index) => {
            if(centerMap.value == custCenter) {
              this.setState({
                centerName: centerMap.text
              });
              return;
            }
          });
        })
        .catch((error) => {
          // 失败 or 有异常被捕获
          this.setState({
            baseInfo:[]
          });
          Toast.show({
            type: 'error',
            content: '查询出错1'
          });
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

    handleEditClick = () => {
      let custId = this.state.custId;
      hashHistory.push('/customer/edit?custId=' + custId);
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

    handleOnLeftClick() {
       hashHistory.goBack();
    }

    beforeFetchLinks(data, from) {
      data.token = this.state.token;
      data.order = this.state.links.order;
      data.orderBy = this.state.links.orderBy;
      data.custId = this.state.custId;

      return data;
    }

    handleLinkClick(custId, custName, id, type) {   
      hashHistory.push('/link/form?custId=' + custId + '&custName=' + custName + '&id=' + id + '&type=' + type);
    }

    handleChanceClick(custId, custName, id, type) {
      hashHistory.push('/chance/form?custId=' + custId + '&custName=' + custName + '&id=' + id + '&type=' + type);
    }

    handleQuestionClick(custId, custName, id, type) {
      hashHistory.push('/question/form?custId=' + custId + '&custName=' + custName + '&id=' + id + '&type=' + type);
    }

    beforeFetchQues(data, from) {
      let questions = this.state.questions;
      data.token = this.state.token;
      data.quesId = questions.quesId;
      data.order = questions.order;
      data.orderBy = questions.orderBy;
      data.idall = questions.idall;
      data.noClose = questions.noClose;
      data.noGroup = questions.noGroup;
      data.noValue = questions.noValue;
      data.quesNew = questions.quesNew;
      data.quesCenter = questions.quesCenter;
      data.quesCustName = this.state.custId;
      data.quesState = questions.quesState;
      data.quesDescs = questions.saveType;
      data.saveType = questions.orderBy;
  
      return data;
    }

    beforeFetchChance(data, from) {
      data.token = this.state.token;
      data.chanId = this.state.chances.chanId;
      data.order = this.state.chances.order;
      data.orderBy = this.state.chances.orderBy;
      data.idall = this.state.chances.idall;
      data.noClose = this.state.chances.noClose;
      data.noGroup = this.state.chances.noGroup;
      data.noValue = this.state.chances.noValue;
      data.chanNew = this.state.chances.chanNew;
      data.chanCenter = this.state.chances.chanCenter;
      data.chanCustName = this.state.custId;
      data.chanNames = this.state.chances.chanNames;
      data.chanStages = this.state.chances.chanStages;
      data.chanType = this.state.chances.chanType;
      data.saveType = this.state.chances.saveType;

      return data;
    }

    render() {
        const t = this;
        const firstTableViewStyle = {'height': t.state.firstTableHeight,'overflowX': 'hidden'};
        const otherTableViewStyle = {'height': t.state.tableHeight,'overflowX': 'hidden'};
        const custName = t.state.baseInfo.custName;

        return (
          <div>
            <Card mode="full" className="card-sence">
              <div className="t-card-header t-MT3">
                <span className="card-custName">{ custName }  </span>
              </div>
              <div className="card-footer">
                <div className="card-footer-meta">
                  <span className="card-footer-meta-item">
                   { t.state.baseInfo.custCategory }
                  </span>
                </div>
                <div className="card-footer-extra">{ t.state.baseInfo.custStage }</div>
              </div>
            </Card>
            <Tab activeKey={'0'}>  
              <Tab.Item title="基本信息"> 
                <div style={ firstTableViewStyle }> 
                  <Group>   
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField  readOnly label="客户名称"  value={ custName }/>
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="客户简称" readOnly  value={ t.state.baseInfo.custAbbreviation }/>
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="行业地位" readOnly  value={ t.state.baseInfo.custIndustryStatus } />
                    </Group.List>
                    <div className="t-MB3"></div>  
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="客户阶段" readOnly  value={ t.state.baseInfo.custStage } />
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="产品中心" readOnly  value={ t.state.centerName } >
                      <RightAddon>
                        <span></span>
                      </RightAddon>
                      </TextField>
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="客户来源" readOnly  value={ t.state.baseInfo.custSource } />
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="上年度营收（万元）" readOnly  value={ t.state.baseInfo.custIncomeLast } />
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="年PCBA采购规模（万元）" readOnly  value={ t.state.baseInfo.custDemandNum } />
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="主营业务" readOnly  value={ t.state.baseInfo.custMainBusiness } />
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="公司地址" readOnly  value={ t.state.baseInfo.custAddress } />
                    </Group.List>
                    <div className="t-MB3"></div>
                    <Group.List lineIndent={18} className="content-FAR t-FS16">
                      <TextField label="销售人员" readOnly  value={ t.state.baseInfo.createdUserName } />
                    </Group.List>
                  </Group> 
                </div> 
                <LogicRender show={ t.state.showAddButton }>
                 <Button key="cust-edt" className="t-tabs-button" type="primary" display="inline-block" onClick={t.handleEditClick.bind(t)}>编    辑</Button>
                </LogicRender>
              </Tab.Item>
              <Tab.Item title="联系人" >
                <div  style={ otherTableViewStyle }>
                  <ScrollList
                    url={ URLS.link.list }
                    dataType="json"
                    pageSize={ t.state.links.pageSize }
                    ref = 'cust_link_ref'
                    noDataImage={noDataImage}
                    beforeFetch ={ t.beforeFetchLinks.bind(t)}
                    currentPage={ t.state.links.currentPage }
                  >          
                    <CustLinkListItem
                      showEditButton={ t.state.showAddButton } 
                      clickItem={ (custId, id ,type) => t.handleLinkClick(custId, custName, id ,type) }/>
                  </ScrollList>
                </div>
                <LogicRender show={ t.state.showAddButton } >
                  <Button key="link-add" className="t-tabs-button-link-add" type="primary" display="inline-block" onClick={ t.handleLinkClick.bind(t, t.state.custId, custName, '', 'create') }>新建联系人</Button>
                </LogicRender>
              </Tab.Item>
              <Tab.Item title="商机" >
                <div style={ otherTableViewStyle }>
                  <ScrollList
                    url={ URLS.chance.list }
                    dataType="json"
                    pageSize={ t.state.chances.pageSize }
                    ref = 'cust_chance_ref'
                    noDataImage={noDataImage}
                    beforeFetch ={ t.beforeFetchChance.bind(t)}
                    currentPage={ t.state.chances.currentPage }
                  >          
                    <CustChanceListItem 
                    showEditButton={ t.state.showAddButton }
                    clickItem={ t.handleChanceClick } />
                  </ScrollList>
                </div>
                <LogicRender show={ t.state.showAddButton }>
                  <Button key="chance-add" className="t-tabs-button-chance-add" type="primary" display="inline-block" onClick={ t.handleChanceClick.bind(t, t.state.custId, custName, '', 'create') }>新建商机</Button>
                </LogicRender>
              </Tab.Item>
              <Tab.Item title="问题" >
                <div style={ otherTableViewStyle }>
                  <ScrollList
                    url={ URLS.question.list }
                    dataType="json"
                    pageSize={ t.state.links.pageSize }
                    ref = 'cust_ques_ref'
                    noDataImage={noDataImage}
                    beforeFetch ={ t.beforeFetchQues.bind(t)}
                    currentPage={ t.state.links.currentPage }
                  >          
                    <CustQuesListItem 
                      showEditButton= { t.state.showAddButton }
                      clickItem= { t.handleQuestionClick }/>
                  </ScrollList>
                </div>
                <LogicRender show={ t.state.showAddButton }>
                  <Button key="ques-add" className="t-tabs-button-ques-add" type="primary" display="inline-block" onClick={t.handleQuestionClick.bind(t, t.state.custId, custName, '', 'create')}>新建问题</Button>
                </LogicRender>
              </Tab.Item>  
            </Tab>
          </div>
        )
    }
}

