/**
 * Created by user on 2017/7/15.
 */
import { ajax } from 'common'
const moduleKey = '/msgGroup'

// 创建群发任务
export function createGroupTask (payload) {
    return ajax.post(`${moduleKey}/createGroupTask`, payload)
}

// 群发任务列表
export function groupTaskList (payload) {
    return ajax.post(`${moduleKey}/groupTaskList`, payload)
}

// 群发短信查询列表
export function msgGroupQuery (payload) {
    return ajax.post(`${moduleKey}/msgGroupQuery`, payload)
}

// 群发短信查询详情列表
export function msgGroupDetails (payload) {
    return ajax.post(`${moduleKey}/msgGroupDetails`, payload)
}
