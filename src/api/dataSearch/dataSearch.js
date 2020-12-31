import { ajax } from 'common'

// 目标号码自动补全
export function autoMatch (payload) {
    return ajax.post(`/appAnalysis/targetList`, payload)
}
// 目标所在地/对方所在地
export function defaultProvCities (payload) {
    return ajax.get(`/alarm/alarmAreaInit`, payload)
}
// 对方号码归属地
export function autoMatchPlaceName (payload) {
    return ajax.post(`/goalMessage/HomeCode`, payload)
}

// 创建目标话单查询任务
export function tarTeleTickectCreat (payload) {
    return ajax.post(`/cdrInfo/tarTeleCreateTask`, payload)
}
// 目标任务列表
export function tarTeleTaskList (payload) {
    return ajax.post(`/cdrInfo/tarTeleTaskQuery`, payload)
}

// 目标话单查询
export function tarTeleTickectQuery (payload) {
    return ajax.post(`/cdrInfo/tarTeleTickectQuery`, payload)
}

// 目标话单任务删除
export function deleteTaskById (payload) {
    return ajax.post(`/cdrInfo/deleteTask`, payload)
}

//  目标事件查询
//      呼损事件
export function callLostEventQuery (payload) {
    return ajax.post(`/lostEvent/callLostEventQuery`, payload)
}
//      开关机事件
//          开关机事件查询列表
export function onOffEventQuery (payload) {
    return ajax.post(`/onOffEvent/onOffEventQuery`, payload)
}
//          24小时开关机图表查询
export function getFullDayEventList (payload) {
    return ajax.post(`/onOffEvent/onOffEvent`, payload)
}
//          开机事件图表查询
export function getOpenEventList (payload) {
    return ajax.post(`/onOffEvent/onNum`, payload)
}
//         关机事件图表查询
export function getCloseEventList (payload) {
    return ajax.post(`/onOffEvent/offNum`, payload)
}
//      换机事件
export function changePhoneEventQuery (payload) {
    return ajax.post(`/changMobileEvent/changePhoneEventQuery`, payload)
}
//      换卡事件
export function changeCardEventQuery (payload) {
    return ajax.post(`/changeCardEvent/changeCardEventQuery`, payload)
}

//  测试
export function onOffEvent (payload) {
    return ajax.post(`/onOffEvent/onNum`, payload)
}
