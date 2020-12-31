/**
 * @type {[type]}
 */
import { ajax } from 'common'

// 任务配置初始化接口
export function taskConfInit (payload) {
    return ajax.get(`taskConfInit`, payload)
    // return ajax.get(`/task/taskBaseInfoQuery`, payload)
}

// 基础信息保存
export function taskBaseInfoSave (payload) {
    // ----------------联调-----------------
    return ajax.post(`task/taskBaseInfoSave`, payload)
    // return ajax.post(`taskBaseInfoSave`, payload)
}
// 基础信息修改
export function taskUpdate (payload) {
    return ajax.post(`task/taskUpdate`, payload)
}

// 告警类型加载
export function alaTypeLoad (payload) {
    return ajax.post(`alarm/alarmType`, payload)
}

// 告警模型加载
export function alaModelLoad (payload) {
    return ajax.post(`alarm/alarmModel`, payload)
}

// 更新告警配置
export function alaConfUpdate (payload) {
    return ajax.post(`alarm/alarmTaskUpdate`, payload)
    // return ajax.post(`alarm/alarmTaskAdd`, payload)
}

// 保存告警配置
export function alaConfAdd (payload) {
    return ajax.post(`alarm/alarmTaskAdd`, payload)
}

// 删除告警配置
export function alaConfDelete (payload) {
    return ajax.post(`alarm/alarmTaskDelete`, payload)
}

// 告警任务列表初始化
export function alaTaskList (payload) {
    // return ajax.get(`loadAlarmModelList` + '/' + payload.taskId)
    return ajax.post(`alarm/alarmTaskListInit`, payload)
}

// 告警配置修改获取告警任务信息
export function alaConfModify (payload) {
    return ajax.post(`alarm/alarmTaskQuery`, payload)
}

// 修改告警任务获取目标号码
export function reviseTarNum (payload) {
    return ajax.post(`alarm/alarmMsisdnQuery`, payload)
}

// 数据字典的告警区域
export function alarmArea (payload) {
    return ajax.get(`alarm/alarmAreaInit`, payload)
}
// 省内漫出
export function alarmCity (payload) {
    return ajax.get(`alarm/alarmAreaCity`, payload)
}

// 任务配置基础信息查询
export function taskBaseQuery (payload) {
    return ajax.post(`task/taskBaseQuery`, payload)
}

// 初始化告警菜单
export function initAlaInfoList (payload) {
    return ajax.get(`task/alarmTree`, payload)
}

// 初始化功能菜单
export function initFunInfoList (payload) {
    return ajax.get(`task/funtionTree`, payload)
}

// 任务延期
export function delayTask (payload) {
    return ajax.post(`task/delayTask`, payload)
}

// 新增的告警 区域接口1
export function alarmArea1 (payload) {
    return ajax.get(`alarm/provCodeToName`, payload)
}
