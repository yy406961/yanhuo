import { ajax } from 'common'

// 目标号码选择
export function getImportantMsisdn (payload) {
    return ajax.post(`/figurePortrait/getMobiles`, payload)
}

// 人物画像基本属性查询
export function getBaseInfo (payload) {
    return ajax.post(`/figurePortrait/getInfo`, payload)
}

// 通联区域统计
export function getAreaCount (payload) {
    return ajax.post(`/figurePortrait/getAreaCount`, payload)
}

// 通联区域时段统计
export function getAreaTime (payload) {
    return ajax.post(`/figurePortrait/getAreaPeriodCount`, payload)
}

// 本段区域统计
export function getAreaLocal (payload) {
    return ajax.post(`/figurePortrait/getAreaOneselfCount`, payload)
}

// 对端区域统计
export function getAreaOppose (payload) {
    return ajax.post(`/figurePortrait/getAreaOppositeCount`, payload)
}

// 订票查询
export function getBooking (payload) {
    return ajax.post(`/figurePortrait/getBooking`, payload)
}

//  区域活动top5
export function getAreaFive (payload) {
    return ajax.post(`/figurePortrait/getActionZone`, payload)
}

//  活动区域
export function getActiveArea (payload) {
    return ajax.post(`/figurePortrait/getActiveArea`, payload)
}

//  活动区域 点击详情

export function getActiveAreaDetail (payload) {
    return ajax.post(`/figurePortrait/getActiveAreaDetails`, payload)
}

//  通联
export function getContactInfo (payload) {
    return ajax.post(`/figurePortrait/getContactInformation`, payload)
}
