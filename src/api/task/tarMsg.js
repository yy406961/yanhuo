/**
 * @type {[type]}
 */
import { ajax } from 'common'

// 查询目标短信
export function tarMsgQuery (payload) {
    return ajax.post(`tarMsgQuery`, payload)
}

// 初始化主叫地址
// export function tarPlaceInit (payload) {
//     return ajax.get(`tarPlaceInit`, payload)
// }

// 审计结果查询
export function userAuditQuery (payload) {
    return ajax.post(`userAuditQuery`, payload)
}

// 审计结果查询操作关联目标人
export function operRelateTar (payload) {
    return ajax.post(`operRelateTar`, payload)
}
