import { ajax } from 'common'

// 目标号码选择
export function getImportantMsisdn (payload) {
    return ajax.post(`/msisdn/getMsisdn`, payload)
}

// 人物画像基本属性查询
export function getBaseInfo (payload) {
    return ajax.post(`/baseInfo/getBaseInfo`, payload)
}

// 通联区域统计
export function getAreaCount (payload) {
    return ajax.post(`/figurePortraitNew/getAreaCount`, payload)
}

// 通联区域时段统计
export function getAreaTime (payload) {
    return ajax.post(`/baseInfo/getCommunicationsCount`, payload)
}

// 本段区域统计
export function getAreaLocal (payload) {
    return ajax.post(`/figurePortraitNew/getAreaOneselfCount`, payload)
}

// 对端区域统计
export function getAreaOppose (payload) {
    return ajax.post(`/figurePortraitNew/getAreaOppositeCount1`, payload)
}

// 订票查询
export function getBooking (payload) {
    return ajax.post(`/figurePortraitNew/getBooking`, payload)
}

//  区域活动top5
export function getAreaFive (payload) {
    return ajax.post(`/baseInfo/getActiveCountyTop5`, payload)
}

//  活动区域
export function getActiveArea (payload) {
    return ajax.post(`/baseInfo/getWorkHomeArea`, payload)
}

//  活动区域 点击详情

export function getActiveAreaDetail (payload) {
    return ajax.post(`/figurePortraitNew/getActiveAreaDetails`, payload)
}

//  通联
export function getContactInfo (payload) {
    return ajax.post(`/figurePortrait/getNewContactInformation`, payload)
}

// 上网时段统计
export function internetTimeCount (payload) {
    return ajax.post(`/baseInfo/getNetPlayCount`, payload)
}

// 敏感app
export function getSensitiveApp (payload) {
    return ajax.post(`/figurePortraitNew/getSensitiveApp`, payload)
}

// app详情
export function getAppDetailData (payload) {
    return ajax.post(`/figurePortraitNew/getAppDetailData`, payload)
}

// 按月选择
export function getMonthArr () {
    return ajax.get(`/figurePortraitNew/monthArr`)
}

// 获取机身码 关联的手机号
export function getImei (payload) {
    return ajax.post(`/baseInfo/getFuselageCode`, payload)
}

// 获取历史机身码
export function getHisimei (payload) {
    return ajax.post(`/baseInfo/getHisFuselageCode`, payload)
}

// 获取虚拟信息
export function getVirtualInfo (payload) {
    return ajax.post(`/baseInfo/getInfos`, payload)
}

// 通联详情 对端号码 获取
export function getOpposeNum (payload) {
    return ajax.post(`/figurePortraitNew/getOpposeNum`, payload)
}

// 通联详情 查询 获取 数据
export function getCommunicationDetail (payload) {
    return ajax.post(`/figurePortraitNew/getCommunicationDetail`, payload)
}

// app详情 app分类
export function getAppType (payload) {
    return ajax.post(`/figurePortraitNew/getAppType`, payload)
}
// app详情 app活动
export function getAppActive (payload) {
    return ajax.post(`/figurePortraitNew/getAppActive`, payload)
}

// app使用
export function getAppUseData (payload) {
    return ajax.post(`/baseInfo/getUseApp`, payload)
}

// app使用 时段分布 舍弃
export function getAppUseTime (payload) {
    return ajax.post(`/figurePortraitNew/getAppUseTime`, payload)
}

//  关系人信息左侧数据
export function getRelatedInfo (payload) {
    return ajax.post(`/figurePortraitNew/getNewContactInformation`, payload)
}

//  关联人信息详情
export function relatedCertain (payload) {
    return ajax.post(`/figurePortraitNew/relatedCertainNew`, payload)
}

//  关联人信息短信/通话时间详情
export function relatedDetail (payload) {
    return ajax.post(`/figurePortrait/relatedDetail`, payload)
}

// 上网情况
export function getInternetUseData (payload) {
    return ajax.post(`/baseInfo/getInternetDetails`, payload)
}

// 上网时段分布 舍弃
export function getInternetUseTime (payload) {
    return ajax.post(`/figurePortraitNew/getInternetUseTime`, payload)
}
