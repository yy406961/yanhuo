/**
 * Created by zl on 2018/1/8.
 */
/**
 * Created by MARY on 2017/7/22.
 */
import { ajax } from 'common'
const moduleKey = '/msisdnFlag'
// 标签名称
export function getFlagList (payload) {
    return ajax.post(`${moduleKey}/flagList`, payload)
}

// 新增标签
export function addFlag (payload) {
    return ajax.post(`${moduleKey}/flagAdd`, payload)
}

// 修改标签
export function updateFlag (payload) {
    return ajax.post(`${moduleKey}/updateFlag`, payload)
}

// 新增标签
export function deleteFlag (payload) {
    return ajax.post(`${moduleKey}/flagDelete`, payload)
}
