import taskIndex from 'views/task/index/Index.vue'
import taskDetail from 'views/task/detail.vue'
import taskConfig from 'views/task/config.vue'
import homeComp from 'views/home/home'
import targetEventQuery from 'views/dataSearch/targetEventQuery'
import warningCom from 'views/warning/warningCom'
import overseasPage from 'views/situationAnalysis/overseasPage'
import keyAreaPage from 'views/situationAnalysis/keyAreaMonitor'
// import keyAreaPage from 'views/situationAnalysis/keyAreaPage'
import newKeyArea from 'views/situationAnalysis/newKeyArea'
import areaCondition from 'views/situationAnalysis/areaCondition'
import outProvincePage from 'views/situationAnalysis/outProvincePage'
import allProvincePage from 'views/situationAnalysis/allProvincePage'
import minoritySJPage from 'views/situationAnalysis/minoritySJPage'
import minoritySZPage from 'views/situationAnalysis/minoritySZPage'
import targetTicketQuery from 'views/dataSearch/targetTicketQuery.vue'
import personnalPortrayal from 'views/msgAnalysis/personnalPortrayal'
import partHistorySearch from 'views/wholeNetAnalysis/partHistorySearch'
import partRealTimeSearch from 'views/wholeNetAnalysis/partRealTimeSearch'
import nationHistorySearch from 'views/wholeNetAnalysis/nationHistorySearch'
import nationRealTimeSearch from 'views/wholeNetAnalysis/nationRealTimeSearch'
import msgLogic from 'views/msgAnalysis/msgLogic'
import harmMsg from 'views/msgAnalysis/harmMsg'
import loginComp from 'views/login/index'
import areaManage from 'views/system/areaManage'
import mapRegion from 'views/system/areaManage/mapRegion'
import recordType from 'views/system/areaManage/recordType'
import importType from 'views/system/areaManage/importType'
import baseStationCheck from 'views/system/baseStationCheck'
import targetNumberManage from 'views/system/targetNumberManage'
import keyWordManage from 'views/system/keywordsManage'
import organizationManage from 'views/system/organizationManage'
import inTimeAppAnalysis from 'views/relationAnalysis/inTimeAppAnalysis'
import roleManagement from 'views/system/roleManagement.vue'
import department from 'views/system/department.vue'
import targetMsg from 'views/msgAnalysis/targetMsg'
import personnelManagement from 'views/system/personnelManagement'
import auditManage from 'views/system/auditManage'
import taskAgree from 'views/system/taskAgree'
import taskAgreePop from 'views/system/taskAgreePop'
import taskManage from 'views/system/taskCreate/index'
import taskAdd from 'views/system/taskCreate/config/index'
import bookSMSQuery from 'views/msgAnalysis/bookSMSQuery'
import msgGroupQuery from 'views/msgAnalysis/msgGroupQuery'
import outImportantContact from 'views/relationAnalysis/outImportantContact'
import insideImportantContact from 'views/relationAnalysis/insideImportantContact'
import interblockContact from 'views/relationAnalysis/interblockContact'
import baseStationSearch from 'views/system/baseStationSearch/baseStationSearch'
import nationPsNumSearch from 'views/wholeNetAnalysis/nationPsNumSearch'
import partPsNumSearch from 'views/wholeNetAnalysis/partPsNumSearch'
// 人物画像
// import figurePortrait from 'views/relationAnalysis/figurePortrait/index'
// 新人物画像
// import newFigurePortrait from 'views/relationAnalysis/newFigurePortrait/index'
//  个人预警桌面
import warningDesktop from 'views/system/warningDesktop/index'
//  数据查询导出
import dataExport from 'views/system/dataExport'
//  配置对象查询
import configureObject from 'views/system/configureObject'
//  目标号码标签管理
import tarNumLabelMag from 'views/system/tarNumLabelMag'
//  报表
import reportFrom from 'views/reportFrom/index'
// 重点区域导出
// import importantPersonExport from 'views/system/importantPersonExport'
// 业务审计
import businessAudit from 'views/businessAudit/index'
import businessAuditCheck from 'views/businessAudit/check'
// 快捷查询
import quickQueryIndex from 'views/quickQuery/quickQueryPage/index'
// 快速查询审批
import QuickQueryApproval from 'views/quickQuery/quickQueryApproval'
// 快速查询审计
import quickQueryAudit from 'views/quickQuery/quickQueryAudit'

// 重点信源数据挖掘
import informationSource from 'views/informationSource/index'
// 重点人小众信源挖掘
import inforUserSource from 'views/inforUserSource/index'
// 通联实时推送
import unionRealTime from 'views/relationAnalysis/unionRealTime'
// 移动上网态势分析(新)
import mobileInternetAnalysis from 'views/mobileInternetAnalysis/index'

// 省外境外在线用户数据导出
import onlineUserExport from 'views/onlineUser/onlineUserExport'

// 机身码查询
import imeiQuery from 'views/imeiQuery/index'
// 多轨迹
import multiPath from 'views/wholeNetAnalysis/multiPath'

// 短信平台
import smsPlatform from 'views/system/smsplatform'
// 短信记录查询
import smsRecordQuery from 'views/system/smsRecordQuery/index'

// 626中非论坛专题
import chinaAfrica from 'views/chinaAfrica/index'

// 信访综合态势
import letterVisit from 'views/letterVisit/index'
// 重点群体
import keyPersons from 'views/keyPersons/index'

// 新增橘子洲区域监测
import keyAreaPageJZZ from 'views/situationAnalysis/keyAreaMonitor/keyAreaPageJZZ'

// 嵌入反恐链接页面
import counterTerrorism from 'views/situationAnalysis/CounterTerrorism'

// import organizeLevelAnalysis from 'views/relationAnalysis/organizeLevelAnalysis'
// import minorityPage from 'views/situationAnalysis/minorityPage'
// import minorityStatePage from 'views/situationAnalysis/minorityStatePage'
// import sysImportantArea from 'views/system/areaManage/sysImportantArea'
const routerMenuConfig = [
    // { path: '*', redirect: '/' },
    { path: '/', redirect: '/login' },
    {
        path: '/login',
        component: loginComp,
        name: '登录'
    },
    {
        path: '/home',
        component: homeComp,
        name: '首页'
    },
    {
        path: '/task',
        redirect: '/task/index'
    },
    {
        path: '/task/index',
        name: '任务列表',
        component: taskIndex
    },
    {
        path: '/task/config',
        name: '任务配置',
        component: taskConfig
    },
    {
        path: '/task/detail/:taskId',
        name: '任务详情',
        component: taskDetail
    },
    {
        path: '/dataSearch/targetTicketQuery',
        name: '目标话单查询',
        component: targetTicketQuery
    },
    {
        path: '/dataSearch/targetEventQuery',
        name: '目标事件查询',
        component: targetEventQuery
    },
    {
        path: '/warningCom',
        name: '告警模块详情',
        component: warningCom
    },
    {
        path: '/situationAnalysis/overseasPage',
        name: '境外人口态势分析',
        component: overseasPage
    },
    {
        path: '/chinaAfrica',
        name: '626中非论坛专题',
        component: chinaAfrica
    },
    {
        path: '/letterVisit',
        name: '信访综合态势',
        component: letterVisit
    },
    {
        path: '/situationAnalysis/keyAreaPageJZZ',
        name: '橘子洲实时监测',
        component: keyAreaPageJZZ
    },
    {
        path: '/counterTerrorism',
        name: '态势与告警',
        component: counterTerrorism
    },
    {
        path: '/keyPersons',
        name: '重点群体',
        component: keyPersons
    },
    {
        path: '/situationAnalysis/keyAreaPage',
        name: '重点区域实时监测',
        component: keyAreaPage
    },
    {
        path: '/situationAnalysis/newKeyArea',
        name: '新版重点区域实时监测',
        component: newKeyArea

    },
    {
        path: '/situationAnalysis/areaCondition',
        name: '重点区域录入',
        component: areaCondition

    },
    {
        path: '/situationAnalysis/outProvincePage',
        name: '省外人口态势分析',
        component: outProvincePage
    },
    {
        path: '/situationAnalysis/allProvincePage',
        name: '实有人口态势分析',
        component: allProvincePage
    },
    {
        path: '/mobileInternetAnalysis',
        name: '移动上网态势分析',
        component: mobileInternetAnalysis
    },
    {
        path: '/situationAnalysis/minoritySJPage',
        name: '涉疆人员分析',
        component: minoritySJPage
    },
    {
        path: '/situationAnalysis/minoritySZPage',
        name: '涉藏人员分析',
        component: minoritySZPage
    },
    {
        path: '/msgAnalysis/personnalPortrayal',
        name: '人物画像短信查询',
        component: personnalPortrayal
    },
    {
        path: '/wholeNetAnalysis/partRealTimeSearch',
        name: '省内最新位置查询',
        component: partRealTimeSearch
    },
    {
        path: '/wholeNetAnalysis/partHistorySearch',
        name: '省内历史轨迹查询',
        component: partHistorySearch
    },
    {
        path: '/wholeNetAnalysis/multiPath',
        name: '省内多天历史轨迹查询',
        component: multiPath
    },
    {
        path: '/wholeNetAnalysis/partPsNumSearch',
        name: '省内机身码查询',
        component: partPsNumSearch
    },
    {
        path: '/wholeNetAnalysis/nationRealTimeSearch',
        name: '全国最新位置查询',
        component: nationRealTimeSearch
    },
    {
        path: '/wholeNetAnalysis/nationHistorySearch',
        name: '全国历史轨迹查询',
        component: nationHistorySearch
    },
    {
        path: '/wholeNetAnalysis/nationPsNumSearch',
        name: '全国机身码查询',
        component: nationPsNumSearch
    },
    {
        path: '/msgAnalysis/msgLogic',
        name: '短信内容逻辑查询',
        component: msgLogic
    },
    {
        path: '/msgAnalysis/targetMsg',
        name: '目标短信查询',
        component: targetMsg
    },
    {
        path: '/msgAnalysis/msgGroupQuery',
        name: '群发短信查询',
        component: msgGroupQuery
    },
    {
        path: '/msgAnalysis/harmMsg',
        name: '有害短信溯源分析',
        component: harmMsg
    },
    {
        path: '/msgAnalysis/bookSMSQuery',
        name: '订票短信查询',
        component: bookSMSQuery
    },
    {
        path: '/system/areaManage',
        name: '区域管理',
        component: areaManage
    },
    {
        path: '/system/areaManage/mapRegion',
        name: '地图框选',
        component: mapRegion
    },
    {
        path: '/system/areaManage/recordType',
        name: '录入',
        component: recordType
    },
    {
        path: '/system/areaManage/importType',
        name: '导入',
        component: importType
    },
    {
        path: '/baseData/targetNumberManage',
        name: '目标号码管理',
        component: targetNumberManage
    },
    {
        path: '/baseData/keyWordManage',
        name: '关键词管理',
        component: keyWordManage
    },
    {
        path: '/system/organizationManage',
        name: '机构管理',
        component: organizationManage
    },
    {
        path: '/system/roleManagement',
        name: '角色管理',
        component: roleManagement
    },
    {
        path: '/system/department',
        name: '部门管理',
        component: department
    },
    {
        path: '/system/personnelManagement',
        name: '人员管理',
        component: personnelManagement
    },
    {
        path: '/system/auditManage',
        name: '审计管理',
        component: auditManage
    },
    {
        path: '/system/taskAgree',
        name: '任务审批',
        component: taskAgree
    },
    {
        path: '/system/taskAgree/taskAgreePop',
        name: '审批详情',
        component: taskAgreePop
    },
    {
        path: '/system/taskManage',
        name: '任务管理',
        component: taskManage
    },
    {
        path: '/system/taskAdd',
        name: '任务新增',
        component: taskAdd
    },
    {
        path: '/system/configureObject',
        component: configureObject,
        name: '配置对象查询'
    },
    {
        path: '/system/tarNumLabelMag',
        component: tarNumLabelMag,
        name: '目标号码标签管理'
    },
    {
        path: '/relationAnalysis/outImportantContact',
        name: '外部重点人挖掘',
        component: outImportantContact
    },
    {
        path: '/relationAnalysis/insideImportantContact',
        name: '内部重点人分析',
        component: insideImportantContact
    },
    {
        path: '/relationAnalysis/interblockContact',
        name: '组间联系人挖掘',
        component: interblockContact
    },
    {
        path: '/relationAnalysis/inTimeAppAnalysis',
        name: '即时通讯类APP应用分析',
        component: inTimeAppAnalysis
    },
    // {
    //     path: '/relationAnalysis/figurePortrait',
    //     name: '人物画像',
    //     component: figurePortrait
    // },
    // {
    //     path: '/relationAnalysis/newFigurePortrait',
    //     name: '人物画像',
    //     component: newFigurePortrait
    // },
    {
        path: '/system/baseStationSearch',
        component: baseStationSearch,
        name: '基站查询'
    },
    {
        path: '/system/warningDesktop',
        component: warningDesktop,
        name: '个人预警信息'
    },
    {
        path: '/system/dataExport',
        component: dataExport,
        name: '数据查询导出'
    },
    {
        path: '/reportFrom',
        component: reportFrom,
        name: '业务报表'
    },
    {
        path: '/businessAudit',
        component: businessAudit,
        name: '业务审计'
    },
    {
        path: '/businessAudit/check',
        component: businessAuditCheck,
        name: '审计查看'
    },
    {
        path: '/baseStationCheck',
        component: baseStationCheck,
        name: '基站校准'
    },
    {
        path: '/quickQueryIndex',
        component: quickQueryIndex,
        name: '快捷查询'
    },
    {
        path: '/quickQueryApproval',
        component: QuickQueryApproval,
        name: '快捷查询审批'
    },
    {
        path: '/quickQueryAudit',
        component: quickQueryAudit,
        name: '快捷查询审计'
    },
    {
        path: '/informationSource',
        component: informationSource,
        name: '小众信源用户挖掘'
    },
    {
        path: '/inforUserSource',
        component: inforUserSource,
        name: '重点人小众信源挖掘'
    },
    {
        path: '/imeiQuery',
        component: imeiQuery,
        name: '机身码查询'
    },
    {
        path: '/onlineUserExport',
        component: onlineUserExport,
        name: '省外境外在线用户数据导出'
    },
    {
        path: '/relationAnalysis/unionRealTime',
        name: '通联实时推送',
        component: unionRealTime
    },
    {
        path: '/smsPlatform',
        name: '短信平台',
        component: smsPlatform
    },
    {
        path: '/smsRecordQuery',
        name: '短信记录查询',
        component: smsRecordQuery
    }
    // 无效路由
    // {
    //     path: '/relationAnalysis/organizeLevelAnalysis',
    //     name: '目标团伙组织层级分析',
    //     component: organizeLevelAnalysis
    // },
    // {
    //     path: '/situationAnalysis/minorityPage',
    //     name: '涉疆涉藏人员分析',
    //     component: minorityPage
    // },
    // {
    //     path: '/situationAnalysis/minorityStatePage',
    //     name: '涉疆涉藏人口态势分析',
    //     component: minorityStatePage
    // },
    // {
    //     path: '/system/importantPersonExport',
    //     name: '重点区域导出',
    //     component: importantPersonExport
    // },
    // {
    //     path: '/system/areaManage/sysImportantArea',
    //     name: '系统内置重点区域',
    //     component: sysImportantArea
    // },
]
export { routerMenuConfig }
