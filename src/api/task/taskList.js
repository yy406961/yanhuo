/**
 * @type {[type]}
 */
import { ajax } from 'common'

// 任务列表初始化接口
export function taskListInit (payload) {
    return ajax.post(`task/taskListInit`, payload)
}
