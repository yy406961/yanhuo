import Mock from 'mockjs'

import login from './login'
Mock.mock(/\/login\/userLogin/, 'post', login.userLogin)
Mock.mock(/\/login\/userExit/, 'get', login.getProvinceConfig)
Mock.mock(/\/login\/getProvinceConfig/, 'get', login.getProvinceConfig)

import home from './home'
Mock.mock(/\/home\/selectHome/, 'get', home.selectHome)
Mock.mock(/\/population\/populationMinutes/, 'post', home.populationMinutes)
Mock.mock(/\/population\/populationDay/, 'post', home.populationDay)
Mock.mock(/\/population\/populationHour/, 'post', home.populationHour)
Mock.mock(/\/population\/allUserCount/, 'post', home.allUserCount)
Mock.mock(/\/population\/temporaryUserCount/, 'post', home.moveUserData)
Mock.mock(/\/population\/permanentUserCount/, 'post', home.residenceUserData)
Mock.mock(/\/population\/userTrendWeekCount/, 'post', home.userLineData)
Mock.mock(/\/population\/foreignTravelCount/, 'post', home.tourUserData)
Mock.mock(/\/population\/externalUserCount/, 'post', home.userSourceData)
Mock.mock(/\/keyArea\/userCountTop5/, 'post', home.userCountTop5)

import menu from './menu'
Mock.mock(/\/menu\/getMenuInfo/, 'get', menu.getMenuInfo)

import alarmInfo from './alarm'
import taskInfo from './task'
// // 任务接口
Mock.mock(/\/taskConfInit/, 'get', taskInfo.taskConfInit)
Mock.mock(/\/taskListInit/, 'post', taskInfo.taskListInit)
Mock.mock(/\/taskFunListInit/, 'post', taskInfo.taskFunListInit)
Mock.mock(/\/task\/taskBaseInfoQuery/, 'post', taskInfo.taskFunListInit)
Mock.mock(/\/task\/taskBaseQuery/, 'post', taskInfo.taskBaseQuery)

import msisdn from './msisdn'
Mock.mock(/\/msisdn\/getMsisdn/, 'post', msisdn.getMsisdn)

import situation from './situation'
Mock.mock(/\/situation\/heat/, 'post', situation.heat)
Mock.mock(/\/situation\/overall/, 'post', situation.overall)
Mock.mock(/\/situation\/zhutu/, 'post', situation.zhutu)
Mock.mock(/\/situation\/source/, 'post', situation.source)
Mock.mock(/\/situation\/snapHomePage/, 'post', situation.snapHomePage)
Mock.mock(/\/situation\/snap/, 'post', situation.snap)

// 移动上网态势
import ybrz from './ybrz'
Mock.mock(/\/ybrz\/getYbrz/, 'post', ybrz.getYbrz)
Mock.mock(/\/ybrz\/getCityCode/, 'post', ybrz.getCityCode)

// 实时检测
import zdqy from './zdqy'
Mock.mock(/\/zdqy\/overall/, 'post', zdqy.overall)
Mock.mock(/\/zdqy\/cylinderInner/, 'post', zdqy.cylinderInner)
Mock.mock(/\/zdqy\/cylinderOuter/, 'post', zdqy.cylinderOuter)
Mock.mock(/\/zdqy\/cylinderOverseas/, 'post', zdqy.cylinderOverseas)
Mock.mock(/\/zdqy\/gpshot/, 'post', zdqy.gpshot)
Mock.mock(/\/zdqy\/listcumulation/, 'post', zdqy.listcumulation)
Mock.mock(/\/zdqy\/persons/, 'post', zdqy.persons)
Mock.mock(/\/zdqy\/snap/, 'post', zdqy.snap)
Mock.mock(/\/keyArea\/keyAreaRank/, 'post', zdqy.keyAreaRank)
Mock.mock(/\/keyArea\/getLineChart/, 'post', zdqy.getLineChart)
Mock.mock(/\/keyArea\/getDataOneDay/, 'post', zdqy.getDataOneDay)
Mock.mock(/\/keyArea\/getTimeInterval/, 'post', zdqy.getTimeInterval)
// 新重点区域实时检测
Mock.mock(/\/focus\/getHot/, 'post', zdqy.gpshot)
import keyAreaMonitor from './keyAreaMonitor'
Mock.mock(/\/keyArea\/getUserNum/, 'post', keyAreaMonitor.getUserNum)
Mock.mock(/\/keyArea\/getRankingList/, 'post', keyAreaMonitor.getRankingList)
Mock.mock(/\/keyArea\/getKeyPerson/, 'post', keyAreaMonitor.getKeyPerson)
Mock.mock(/\/keyArea\/getKeyAreaHot/, 'post', keyAreaMonitor.getKeyAreaHot)
Mock.mock(/\/zdqy\/listcumulation/, 'post', keyAreaMonitor.listcumulation) // 查询累积人数任务列表
Mock.mock(/\/zdqy\/addcumulation/, 'post', keyAreaMonitor.addcumulation) // 添加查询累积人数任务
Mock.mock(/\/keyArea\/delZdqyCumulation/, 'post', keyAreaMonitor.delZdqyCumulation) // 删除查询累积人数任务
Mock.mock(/\/keyAreaConfig\/getKeyAreaConfig/, 'post', keyAreaMonitor.getKeyAreaConfig) // 配置查询接口
Mock.mock(/\/keyAreaConfig\/insertKeyAreaConfig/, 'post', keyAreaMonitor.insertKeyAreaConfig) // 配置新增接口
Mock.mock(/\/keyAreaConfig\/delKeyAreaConfig/, 'post', keyAreaMonitor.delKeyAreaConfig) // 配置删除接口
Mock.mock(/\/keyArea\/warn/, 'post', keyAreaMonitor.warn)
Mock.mock(/\/focus\/getMinCount/, 'post', keyAreaMonitor.getMinCount)
Mock.mock(/\/focus\/dialogHeat/, 'post', zdqy.gpshot)
// Mock.mock(/\/focus\/getUliCarCount/, 'post', keyAreaMonitor.carAPI)

// 湖南实时监测接口
Mock.mock(/\/focus\/getNum/, 'post', keyAreaMonitor.getNum)
Mock.mock(/\/focus\/getRankingList/, 'post', keyAreaMonitor.getRankingList)
Mock.mock(/\/focus\/getLineChart/, 'post', zdqy.getLineChart)

import goalArea from './goalArea'
Mock.mock(/\/goalArea\/selectedAreaInfoQuery/, 'post', goalArea.selectedAreaInfoQuery)
Mock.mock(/\/goalArea\/cellCoordinatesQuery/, 'post', goalArea.cellCoordinatesQuery)

import targetNumberManage from './targetNumberManage'
Mock.mock(/\/targetNumberManage\/tarNumQuery/, 'post', targetNumberManage.tarNumQuery)

import message from './message'
Mock.mock(/\/message\/getPortraitDict/, 'post', message.getPortraitDict)
Mock.mock(/\/message\/getAccountMovementMSG/, 'post', message.getAccountMovementMSG)

// 信源类
import informationSource from './informationSource'
Mock.mock(/\/informationSource\/selectSourceTaskList/, 'post', informationSource.selectSourceTaskList)
Mock.mock(/\/informationSource\/selectSourceTaskById/, 'post', informationSource.selectSourceTaskById)
Mock.mock(/\/informationSource\/selectPhoneStatOne/, 'post', informationSource.selectPhoneStatOne)
Mock.mock(/\/informationSource\/selectInforSourceStatOne/, 'post', informationSource.selectInforSourceStatOne)
import keyPersonInforSource from './keyPersonInforSource'
Mock.mock(/\/keyPersonInforSource\/selectKeyPersonTaskList/, 'post', keyPersonInforSource.selectKeyPersonTaskList)
Mock.mock(/\/keyPersonInforSource\/selectTaskResult/, 'post', keyPersonInforSource.selectTaskResult)
Mock.mock(/\/keyPersonInforSource\/selectByMsisdn/, 'post', keyPersonInforSource.selectByMsisdn)
Mock.mock(/\/keyPersonInforSource\/selectKeyPersonStat/, 'post', keyPersonInforSource.selectKeyPersonStat)

// 人物画像
import baseInfo from './baseInfo'
import figurePortraitNew from './figurePortraitNew'
Mock.mock(/\/baseInfo\/getBaseInfo/, 'post', baseInfo.getBaseInfo)
Mock.mock(/\/baseInfo\/getInfos/, 'post', baseInfo.getInfos)
Mock.mock(/\/baseInfo\/getCommunicationsCount/, 'post', baseInfo.getCommunicationsCount)
Mock.mock(/\/baseInfo\/getNetPlayCount/, 'post', baseInfo.getNetPlayCount)
Mock.mock(/\/baseInfo\/getUseApp/, 'post', baseInfo.getUseApp)
Mock.mock(/\/baseInfo\/getActiveCountyTop5/, 'post', baseInfo.getActiveCountyTop5)
Mock.mock(/\/baseInfo\/getWorkHomeArea/, 'post', baseInfo.getWorkHomeArea)
Mock.mock(/\/baseInfo\/getFuselageCode/, 'post', baseInfo.getFuselageCode)
Mock.mock(/\/baseInfo\/getInternetDetails/, 'post', baseInfo.getInternetDetails)
Mock.mock(/\/figurePortraitNew\/getNewContactInformation/, 'post', figurePortraitNew.getNewContactInformation)
Mock.mock(/\/figurePortraitNew\/relatedCertainNew/, 'post', figurePortraitNew.relatedCertainNew)

// 任务审批
import approval from './approval'
Mock.mock(/\/approval\/getAllList/, 'post', approval.getAllList)
Mock.mock(/\/approval\/setStatus/, 'post', approval.setStatus)
Mock.mock(/\/approval\/getApproverInfo/, 'post', approval.getApproverInfo)
Mock.mock(/\/approval\/getApprovalStaff/, 'post', approval.getApprovalStaff)

// 省内最新位置查询
import areaRealTime from './areaRealTime'
Mock.mock(/\/areaRealTime\/entities/, 'post', areaRealTime.entities)
Mock.mock(/\/areaRealTime\/getAllData/, 'post', areaRealTime.getAllData)

// 省内历史轨迹查询
import goalHistoryOrbitLocal from './goalHistoryOrbitLocal'
Mock.mock(/\/goalHistoryOrbitLocal\/tarNumQuery/, 'post', goalHistoryOrbitLocal.tarNumQuery)
Mock.mock(/\/goalHistoryOrbitLocal\/goalHistoryOrbitQuery/, 'post', goalHistoryOrbitLocal.goalHistoryOrbitQuery)

// 机构管理
import org from './org'
Mock.mock(/\/common\/prov\/provinces/, 'post', org.provinces)
Mock.mock(/\/org\/selectOrg/, 'post', org.selectOrg)
Mock.mock(/\/org\/addAuthorityTree/, 'post', org.addAuthorityTree)
Mock.mock(/\/org\/addOrg/, 'post', org.addOrg)
Mock.mock(/\/org\/resetPwd/, 'post', org.resetPwd)
Mock.mock(/\/org\/deleteOrg/, 'post', org.deleteOrg)

// 人员管理
import users from './users'
import dept from './dept'
import role from './role'
Mock.mock(/\/users\/selectUsers/, 'post', users.selectUsers)
Mock.mock(/\/users\/addDeptTree/, 'post', users.addDeptTree)
Mock.mock(/\/users\/addUsers/, 'post', users.addUsers)
Mock.mock(/\/users\/resetPwd/, 'post', users.resetPwd)
Mock.mock(/\/users\/deleteUsers/, 'post', users.deleteUsers)
Mock.mock(/\/users\/usersById\/163/, 'get', users.usersById)
Mock.mock(/\/dept\/addDeptTree/, 'get', dept.addDeptTree)
Mock.mock(/\/role\/addRoleTree/, 'get', role.addRoleTree)

// 部门管理
Mock.mock(/\/dept\/selectDept/, 'post', dept.selectDept)
Mock.mock(/\/dept\/addDept/, 'post', dept.addDept)
Mock.mock(/\/dept\/deleteDept/, 'post', dept.deleteDept)

// 审计管理
import audit from './audit'
Mock.mock(/\/audit\/userAuditQuery/, 'post', audit.userAuditQuery)
Mock.mock(/\/common\/dictionary\/auditType/, 'get', audit.auditType)
Mock.mock(/\/common\/dictionary\/auditHehavior/, 'get', audit.auditHehavior)
Mock.mock(/\/audit\/selectOperRecord/, 'post', audit.selectOperRecord)
Mock.mock(/\/audit\/operRelateTarTel/, 'post', audit.operRelateTarTel)

// 区域管理
Mock.mock(/\/goalArea\/sysAreaLoad/, 'post', goalArea.sysAreaLoad)
Mock.mock(/\/goalArea\/upService/, 'post', goalArea.upService)
Mock.mock(/\/goalArea\/selectedAreaDelete/, 'post', goalArea.selectedAreaDelete)
Mock.mock(/\/common\/dictionary\/ispType/, 'get', goalArea.ispType)
// SJSZ
import szsj from './szsj'
Mock.mock(/\/szsj\/query/, 'post', szsj.query)
Mock.mock(/\/szsj\/szselect/, 'post', szsj.szselect)
Mock.mock(/\/situation\/select/, 'post', situation.select)

// 任务配置-告警配置
Mock.mock(/\/alarm\/alarmTaskListInit/, 'post', alarmInfo.alarmTaskListInit)
Mock.mock(/\/alarm\/alarmType/, 'post', alarmInfo.alarmType)
Mock.mock(/\/alarm\/alarmModel/, 'post', alarmInfo.alarmModel)
Mock.mock(/\/alarm\/alarmTaskAdd/, 'post', alarmInfo.alarmTaskAdd)
Mock.mock(/\/alarm\/alarmTaskQuery/, 'post', alarmInfo.alarmTaskQuery)
Mock.mock(/\/alarm\/alarmMsisdnQuery/, 'post', alarmInfo.alarmMsisdnQuery)
Mock.mock(/\/alarm\/alarmTaskUpdate/, 'post', alarmInfo.alarmTaskUpdate)
Mock.mock(/\/alarm\/alarmTaskDelete/, 'post', alarmInfo.alarmTaskDelete)

// 告警类型接口
Mock.mock(/\/common\/dictionary\/alarmType/, 'get', alarmInfo.alarmType)
// // 目标进入告警
Mock.mock(/\/alarmInArea\/tarInAreaResLoad/, 'post', alarmInfo.tarInAreaResLoad)
Mock.mock(/\/alarmInArea\/tarInAreaAlaDetail/, 'post', alarmInfo.tarInAreaAlaDetail)
Mock.mock(/\/alarmInArea\/tarInAreaAlaDispose/, 'post', alarmInfo.tarInAreaAlaDispose)
Mock.mock(/\/export\/getAlarmTask/, 'post', alarmInfo.getAlarmTask)
// // 目标进入离开告警
// Mock.mock(/\/tarInOutResLoad/, 'post', alarmInfo.tarInOutResLoad)
// Mock.mock(/\/tarInOutAlaDetail/, 'post', alarmInfo.tarInOutAlaDetail)
// Mock.mock(/\/tarInOutAlaDispose/, 'post', alarmInfo.tarInOutAlaDispose)
// // 目标关机告警
// Mock.mock(/\/tarOffResLoad/, 'post', alarmInfo.tarOffResLoad)
// Mock.mock(/\/tarOffAlaDetail/, 'post', alarmInfo.tarOffAlaDetail)
// Mock.mock(/\/tarOffAlaDispose/, 'post', alarmInfo.tarOffAlaDispose)
// // 目标漫入告警
// Mock.mock(/\/tarFlowResLoad/, 'post', alarmInfo.tarFlowResLoad)
// Mock.mock(/\/tarFlowAlaDetail/, 'post', alarmInfo.tarFlowAlaDetail)
// Mock.mock(/\/tarFlowAlaDispose/, 'post', alarmInfo.tarFlowAlaDispose)
// // 目标消失告警
// Mock.mock(/\/tarDisResLoad/, 'post', alarmInfo.tarDisResLoad)
// Mock.mock(/\/tarDisAlaDetail/, 'post', alarmInfo.tarDisAlaDetail)
// Mock.mock(/\/tarDisAlaDispose/, 'post', alarmInfo.tarDisAlaDispose)
// // 目标接头告警
// Mock.mock(/\/tarJoinResLoad/, 'post', alarmInfo.tarJoinResLoad)
// Mock.mock(/\/tarJoinAlaDetail/, 'post', alarmInfo.tarJoinAlaDetail)
// Mock.mock(/\/tarJoinAlaDispose/, 'post', alarmInfo.tarJoinAlaDispose)
// // 目标实时跟踪告警
// Mock.mock(/\/tarTraResLoad/, 'post', alarmInfo.tarTraResLoad)
// Mock.mock(/\/tarTraAlaDetail/, 'post', alarmInfo.tarTraAlaDetail)
// Mock.mock(/\/tarTraAlaDispose/, 'post', alarmInfo.tarTraAlaDispose)
// // 目标省内漫出告警
// Mock.mock(/\/tarFlowInAreaResLoad/, 'post', alarmInfo.tarFlowInAreaResLoad)
// Mock.mock(/\/tarFlowInAreaAlaDetail/, 'post', alarmInfo.tarFlowInAreaAlaDetail)
// Mock.mock(/\/tarFlowInAreaAlaDispose/, 'post', alarmInfo.tarFlowInAreaAlaDispose)
// // 目标省际漫出告警
// Mock.mock(/\/tarFlowNationResLoad/, 'post', alarmInfo.tarFlowNationResLoad)
// Mock.mock(/\/tarFlowNationAlaDetail/, 'post', alarmInfo.tarFlowNationAlaDetail)
// Mock.mock(/\/tarFlowNationAlaDispose/, 'post', alarmInfo.tarFlowNationAlaDispose)

// 626中非论坛专题
import chinaAfrica from './chinaAfrica'
Mock.mock(/\/chinaAfrica\/getTotalData/, 'post', chinaAfrica.getTotalData)
Mock.mock(/\/chinaAfrica\/getPersonDisData/, 'post', chinaAfrica.getPersonDisData)
Mock.mock(/\/chinaAfrica\/getPointData/, 'post', chinaAfrica.getPointData)
Mock.mock(/\/chinaAfrica\/getLineData/, 'post', chinaAfrica.getLineData)
Mock.mock(/\/chinaAfrica\/getGisMapData/, 'post', chinaAfrica.getGisMapData)

export default Mock;
