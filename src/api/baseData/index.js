import { ajax } from 'common'

// 目标号码管理

// 获取目标号码列表
export function getTargetTelList (payload) {
    return ajax.post(`/targetNumberManage/tarNumQuery`, payload)
}

// 新增目标号码
export function addTargetTel (payload) {
    return ajax.post(`/targetNumberManage/tarNumAdd`, payload)
}

// 修改目标号码
export function reviseTargetTel (payload) {
    return ajax.post(`/targetNumberManage/tarNumModify`, payload)
}
// 删除目标号码
export function deleteTargetTel (payload) {
    return ajax.delete(`/targetNumberManage/tarNumDelete/${payload}`)
}
// 标签
export function flagList () {
    return ajax.post(`/msisdnFlag/flagList`)
}

// 关键词管理

// 获取关键词列表
export function getKeywordList (payload) {
    return ajax.post(`/keywords/keywordsQuery`, payload)
}
// 新增关键词
export function addKeyword (payload) {
    return ajax.post(`/keywords/keywordsAdd`, payload)
}
// 修改关键词
export function reviseKeyword (payload) {
    return ajax.post(`/keywords/keywordsModify`, payload)
}
// 删除关键词
export function deleteKeyword (payload) {
    return ajax.delete(`/keywords/keywordsDelete/${payload}`)
}
