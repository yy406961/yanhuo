/**
 * @type {[type]}
 */
import { ajax } from 'common'

export function search (payload) {
    return ajax.get(`search`, payload)
}

/**
 * [getUserNumberList 查询目标号码列表 ]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
export function getUserNumber (payload) {
    return ajax.post(`getUserNumberList`, payload)
}
// 全国历史查询
export function nationHistorySearch (payload) {
    return ajax.get(`nationHistoryLineSearch`, payload)
}
