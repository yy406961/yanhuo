/**
 * Created by user on 2017/8/1.
 */
import { ajax } from 'common'

const IN = 'inContacts';

// 三个通联关系中 创建查询任务
export function addTask (payload) {
    return ajax.post(`${IN}/addTask`, payload)
}

// 三个通联关系中 获取查询结果
export function taskList (payload) {
    return ajax.post(`${IN}/taskList`, payload)
}

// 删除查询结果中的某条信息
export function deleteTask (payload) {
    return ajax.post(`${IN}/deleteTask`, payload)
}

// 内部重要联系人分析
// 获取服务器时间
export function getTime (payload) {
    return ajax.get(`${IN}/serverTime`, payload)
}
// 获取目标号码列表
export function targetList (payload) {
    return ajax.post(`targetNumberManage/tarNumQuery`, payload)
}

// 左侧：目标号码通联信息列表
export function contactInfoList (payload) {
    return ajax.post(`${IN}/contactInfoList`, payload)
}

// 右侧：目标号码通联关系图
export function contactInfoChart (payload) {
    return ajax.post(`${IN}/contactInfoChart`, payload)
}

// 右侧上方表格和小表格：获取内部与内部通联列表
export function outInContactsList (payload) {
    return ajax.post(`${IN}/outInContactsList`, payload)
}

// 三个通联关系中右侧下方表格：获取内部与内部通联详情
export function outInContactsInfo (payload) {
    return ajax.post(`${IN}/outInContactsInfo`, payload)
}
