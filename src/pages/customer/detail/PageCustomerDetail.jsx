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
        var token = document.getElementById("token").value;
        t.state = {
          token: token,
          custId: id,
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
            noGroup: null,
            noValue: null,
            idall: null,
            chanNew: null,
            chanCenter: null,
            chanCustName: null,
            chanStages: null,
            chanType: null,
            chanNames: null,
            saveType: null,
            order: null,
            orderBy: null,
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

    handleLinkClick(custId, id, type) {   
      hashHistory.push('/link/form?custId=' + custId + '&id=' + id + '&type=' + type);
    }

    handleChanceClick(custId, id, type) {
      hashHistory.push('/chance/form?custId=' + custId + '&id=' + id + '&type=' + type);
    }

    handleQuestionClick(custId, id, type) {
      hashHistory.push('/question/form?custId=' + custId + '&id=' + id + '&type=' + type);
    }

    beforeFetchQues(data, from) {
      data.token = this.state.token;
      data.quesId = this.state.questions.quesId;
      data.order = this.state.questions.order;
      data.orderBy = this.state.questions.orderBy;
      data.idall = this.state.questions.idall;
      data.noClose = this.state.questions.noClose;
      data.noGroup = this.state.questions.noGroup;
      data.noValue = this.state.questions.noValue;
      data.quesNew = this.state.questions.quesNew;
      data.quesCenter = this.state.questions.quesCenter;
      data.quesCustName = this.state.custId;
      data.quesState = this.state.questions.quesState;
      data.quesDescs = this.state.questions.saveType;
      data.saveType = this.state.questions.orderBy;
  
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
        let t = this;
        let firstTableViewStyle = {'height': t.state.firstTableHeight,'overflowX': 'hidden'};
        let otherTableViewStyle = {'height': t.state.tableHeight,'overflowX': 'hidden'};
        return (
            <div className="t-FS16">
              <div>
                <Card mode="full" className="card-sence">
                  <div className="t-card-header">
                    <span className="card-custName">{ t.state.baseInfo.custName }  </span>
                    <span className="card-custCategory">{ t.state.baseInfo.custCategory }</span>
                  </div>
                  <div className="card-footer">
                    <div className="card-footer-meta">
                      <span className="card-footer-meta-item">
                        未更新天数：
                        <span className="card-eye-count"></span>
                      </span>
                    </div>
                    <div className="card-footer-extra">{ t.state.baseInfo.custStage }</div>
                  </div>
                </Card>
                <Tab active={'0'}>  
                  <Tab.Item title="基本信息"> 
                    <div style={ firstTableViewStyle }> 
                      <Group>   
                        <Group.List lineIndent={18} className="content-FAR t-FS16">
                          <TextField  readOnly label="客户名称"  value={ t.state.baseInfo.custName }/>
                        </Group.List>
                        <div className="t-MB3"></div>
                        <Group.List lineIndent={18} className="content-FAR t-FS16">
                          <TextField label="客户简称" readOnly  value={ t.state.baseInfo.custSimpleName }/>
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
                          <TextField label="主营业务" readOnly  value={ t.state.baseInfo.custMainBusiness } />
                        </Group.List>
                        <div className="t-MB3"></div>
                        <Group.List lineIndent={18} className="content-FAR t-FS16">
                          <TextField label="公司地址" readOnly  value={ t.state.baseInfo.custAddress } />
                        </Group.List>
                        <div className="t-MB3"></div>
                        <Group.List lineIndent={18} className="content-FAR t-FS16">
                          <TextField label="销售人员" readOnly  value={ t.state.baseInfo.custSalesman } />
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
                          clickItem={ t.handleLinkClick }/>
                      </ScrollList>
                    </div>
                    <LogicRender show={ t.state.showAddButton } >
                      <Button key="link-add" className="t-tabs-button-link-add" type="primary" display="inline-block" onClick={ t.handleLinkClick.bind(this,t.state.custId,'','create') }>新建联系人</Button>
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
                        clickItem={ t.handleChanceClick }/>
                      </ScrollList>
                    </div>
                    <LogicRender show={ t.state.showAddButton }>
                      <Button key="chance-add" className="t-tabs-button-chance-add" type="primary" display="inline-block" onClick={ t.handleChanceClick.bind(this, t.state.custId, '', 'create') }>新建商机</Button>
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
                      <Button key="ques-add" className="t-tabs-button-ques-add" type="primary" display="inline-block" onClick={t.handleQuestionClick.bind(this,t.state.custId, '', 'create')}>新建问题</Button>
                    </LogicRender>
                  </Tab.Item>  
                </Tab>
              </div>  
            </div>
        )
    }
}

