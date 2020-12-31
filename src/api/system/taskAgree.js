import { ajax } from 'common'

// 获取列表
export function getAllList (payload) {
    return ajax.post(`approval/getAllList`, payload)
}
// 审批通过与不通过
export function setStatus (payload) {
    return ajax.post(`approval/setStatus`, payload)
}
// 任务配置基础信息查询
export function taskBaseQuery (payload) {
    return ajax.post(`task/taskBaseQuery`, payload)
}
// 获取审批人数据
export function getApproverInfo (payload) {
    return ajax.post(`approval/getApproverInfo`, payload)
}
