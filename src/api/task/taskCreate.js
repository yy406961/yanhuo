/**
 * Created by MARY on 2017/9/17.
 */

import { ajax } from 'common'
// 任务使用人
export function userQuery (payload) {
    return ajax.post(`task/userQuery`, payload)
}
// 基础信息修改
export function taskUpdate (payload) {
    return ajax.post(`task/taskUpdate`, payload)
}
// 基础信息查询
export function taskBaseQuery (payload) {
    return ajax.post(`task/taskBaseQuery`, payload)
}
