import { ajax } from 'common'
const moduleKey = '/export'

// 查询报表接口
export function queryExportFrom (payload) {
    return ajax.post(`${moduleKey}/page`, payload)
}

// 生成报表接口
export function createExportFrom (payload) {
    return ajax.post(`${moduleKey}/new`, payload)
}

// 报表查看接口
export function exportFromDetail (payload) {
    return ajax.post(`${moduleKey}/cat`, payload)
}

// 报表下载接口
export function exportFromDown (payload) {
    return ajax.get(`${moduleKey}/down`, payload)
}
