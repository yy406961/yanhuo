import { ajax } from 'common'

// 获取列表
export function getAllList (payload) {
    return ajax.post(`approval/getAllList`, payload)
}

// 提交接口
export function setStatus (payload) {
    return ajax.post(`approval/setStatus`, payload)
}

// 删除接口
export function delApp (payload) {
    return ajax.post(`approval/delApp`, payload)
}

// 撤回接口
export function withdraw (payload) {
    return ajax.post(`approval/setStatus`, payload)
}

// 完成接口
export function finnishTask (payload) {
    return ajax.post(`task/finnishTask`, payload)
}

// 追加任务时判断是否有此任务有未审批的记录
export function taskAddState (payload) {
    return ajax.post(`task/taskAddState`, payload)
}
