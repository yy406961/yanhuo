import { ajax } from 'common'

// 业务审计
export function businessAudit (payload) {
    return ajax.post(`/audit_qh/auditList_qh`, payload)
}

// 业务审计 任务使用人查询
export function businessAuditGetUser () {
    return ajax.get('/audit_qh/userQuery')
}
// 业务审计 基本信息
export function taskBaseInfo (payload) {
    return ajax.post(`/goalHistoryOrbitLocal/tarNumQuery`, payload)
}
// 业务审计 基本信息 任务功能
export function taskFun (payload) {
    return ajax.post(`task/taskBaseInfoQuery`, payload)
}
// 业务审计 基本信息 审批信息
export function approvalInfo (payload) {
    return ajax.post(`audit_qh/audit_fileInfo_qh`, payload)
}
// 业务审计 目标号码 接口复用 api/baseData/getTargetTelList

// 业务审计 目标区域 接口复用 api/task/taskArea/  goalArea/selectedAreaInfoQuery
// 区内重点人历史轨迹数据获取
// export function sendPartAreaImportant () {
//     return ajax.get(`/goalHistoryOrbitLocal/transferData`)
// }
