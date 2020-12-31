/**
 * Created by user on 2017/9/12.
 */
import { ajax } from 'common'

const SIT = 'zdqy';
const PATH_ONE = 'keyArea';
// 数字面板  实时 累积在线用户数
export function numFlip (payload) {
    return ajax.post(`${PATH_ONE}/getKeyAreaAccumulativeUser`, payload)
}
// 折线图
export function polyline (payload) {
    return ajax.post(`${PATH_ONE}/getLineChart`, payload)
}
// 实时在线人数
export function overall (payload) {
    return ajax.post(`${SIT}/overall`, payload)
}
// 左侧下方省外号码柱图数据
export function cylinderInner (payload) {
    return ajax.post(`${SIT}/cylinderInner`, payload)
}

// 左侧下方省外号码柱图数据
export function cylinderOuter (payload) {
    return ajax.post(`${SIT}/cylinderOuter`, payload)
}

// 左侧下方境外号码柱图数据
export function cylinderOverseas (payload) {
    return ajax.post(`${SIT}/cylinderOverseas`, payload)
}

// 重点人列表
export function persons (payload) {
    return ajax.post(`${SIT}/persons`, payload)
}

// 右侧折线图数据
export function snap (payload) {
    return ajax.post(`${SIT}/snap`, payload)
}

// 获取热力图数据
export function heat (payload) {
    return ajax.post(`${SIT}/heat`, payload)
}

// 获取来源图数据
export function source (payload) {
    return ajax.post(`${SIT}/source`, payload)
}

// 查询基站列表
export function getCellInfoList (payload) {
    return ajax.post(`/goalArea/cellCoordinatesQuery`, payload)
}

// 查询GSP列表
export function gpsHot (payload) {
    return ajax.post(`/zdqy/gpshot`, payload)
}

// 查询涉疆/涉藏/重点人人员位置信息列表
export function locationMsg (payload) {
    return ajax.post(`/zdqy/personHot`, payload)
}

// 查询涉疆人员位置信息列表
export function SJLocationMsg (payload) {
    return ajax.post(`/zdqy/SJLocation`, payload)
}

// 查询涉藏人员位置信息列表
export function SZLocationMsg (payload) {
    return ajax.post(`/zdqy/SZLocation`, payload)
}

// 查询重点人人员位置信息列表
export function keyPeopleLocationMsg (payload) {
    return ajax.post(`/zdqy/keyPeopleLocation`, payload)
}
// 添加累积人数查询任务
export function createAccumulateUser (payload) {
    return ajax.post(`/zdqy/addcumulation`, payload)
}
//  累积人数查询
export function accumulateUserTaskList (payload) {
    return ajax.post(`/zdqy/listcumulation`, payload)
}
