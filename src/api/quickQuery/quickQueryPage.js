import { ajax } from 'common'

// 查询接口
export function queryInterface (payload) {
    return ajax.post(`/quickactions/findQuickQuery`, payload)
}
// 审批录入接口
export function approveInterface (payload) {
    return ajax.post(`/quickactions/addQuickQuery`, payload)
}

// 目标号码话单查询，任务结果列表
export function taskQueryResult (payload) {
    return ajax.post(`/quickQueryCdr/tarTeleTaskQuery`, payload)
}

// 目标号码话单查询
export function targetNumQuery (payload) {
    // return ajax.post(`/quick/goalCallList`, payload)
    return ajax.post(`/quickQueryCdr/tarTeleTickectQuery`, payload)
}

// 最新位置
export function partClickDetailQuery (payload) {
    return ajax.get(`/quickTrajectory/morePoint/${payload}`)
}
// 历史轨迹
export function getQuickData (payload) {
    return ajax.post(`/quickHistoryTrajectory/goalHistoryOrbitQuery`, payload)
}
