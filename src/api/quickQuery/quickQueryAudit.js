/**
 * Created by MARY on 2017/7/26.
 */
import { ajax } from 'common'

const moduleKey = '/quickactions';

// 人物画像短信查询
export function quickQueryAudit (payload) {
    return ajax.post(`${moduleKey}/findQuickQueryAudit`, payload)
}
// 操作人
// 人物画像短信查询
export function quickQueryOperator (payload) {
    return ajax.get(`${moduleKey}/selectEntityOperator`, payload)
}
