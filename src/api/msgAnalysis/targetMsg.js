/**
 * Created by user on 2017/7/15.
 */
import { ajax } from 'common'
import { addMarkId } from 'utils'

// const moduleKey = '/goalMessage';
const moduleKey = '/goalSmsQuery'
// 查询目标短信
export function tarMsgQuery (payload) {
    return ajax.post(`${moduleKey}/selectTaskResultById`, addMarkId(payload))
}

// 目标任务列表
export function targetTaskList (payload) {
    return ajax.post(`${moduleKey}/selectTaskList`, payload)
}

// 创建目标短信任务
export function createTargetMsgTask (payload) {
    return ajax.post(`${moduleKey}/addGoalSmsQueryTask`, payload)
}
// 查看任务--之---删除任务deleteTaskById
export function deleteTask (payload) {
    return ajax.post(`${moduleKey}/deleteTaskById`, payload)
}
// --------------------------------------创建任务下拉接口--联调---------------------------------
// 目标所在地/对方所在地
export function defaultProvCities (payload) {
    return ajax.get(`/alarm/alarmAreaInit`, payload)
}
// 目标号码自动补全
export function autoMatch (payload) {
    return ajax.post(`/goalNumber/entities`, payload)
}

// 对方号码归属地
export function autoMatchPlaceName (payload) {
    return ajax.post(`/homeCode/entities`, payload)
}

// 对方号码归属地 -- 获取省份
export function provinceName (payload) {
    return ajax.get(`${moduleKey}/selectGoalHomeInfo`, payload)
}

// 对方号码归属地 -- 获取地市
export function getCityName (payload) {
    return ajax.post(`${moduleKey}/selectCityInfo`, payload)
}

// 手机属性下拉

