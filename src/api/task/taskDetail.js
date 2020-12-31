/**
 * @type {[type]}
 */
import { ajax } from 'common'

// 获取任务详情
export function taskBaseInfoQuery (payload) {
    // return ajax.post(`taskFunListInit`, payload)
    // --------------联调---------------------
    return ajax.post(`task/taskBaseInfoQuery`, payload)
}

// 中止任务
export function stopTask (payload) {
    return ajax.post(`task/stopTask`, payload)
}

