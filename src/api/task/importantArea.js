/**
 * Created by MARY on 2017/9/17.
 */

import { ajax } from 'common'

// 修改重点区域查询
export function importantAreaQuery (payload) {
    return ajax.post(`importArea/importAreaQuery`, payload)
}
// 新增告警区域
export function importantAreaAdd (payload) {
    return ajax.post(`importArea/areaAdd`, payload)
}
// 修改告警区域
export function importantAreaUpdate (payload) {
    return ajax.post(`importArea/areaUpdate`, payload)
}
// 重点区域查询
export function importantAreaList (payload) {
    return ajax.post(`importArea/areaListQuery`, payload)
}
// 重点区域删除
export function importantAreaDelete (payload) {
    return ajax.post(`importArea/areadelete`, payload)
}
// 重点区域目标号码修改查询
export function importMsisdnQuery (payload) {
    return ajax.post(`importArea/importMsisdnQuery`, payload)
}
