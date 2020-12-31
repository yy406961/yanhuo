import { ajax } from 'common'

// 预警桌面

// 右侧预警列表
export function getAllAlarms (payload) {
    return ajax.post(`alarmDesktop/getAlarms`, payload)
}

//  左侧任务条条
export function getTaskAlarms () {
    return ajax.get(`alarmDesktop/getTaskAlarms`)
}

//  左侧任务 一级条 点击事件
export function getFirstList (payload) {
    return ajax.post(`alarmDesktop/getFirstList`, payload)
}

//  左侧任务 二级条 点击事件
export function getSecondList (payload) {
    return ajax.post(`alarmDesktop/getSecondList`, payload)
}
