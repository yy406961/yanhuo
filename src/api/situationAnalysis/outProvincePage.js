/**
 * Created by user on 2017/9/12.
 */
import { ajax } from 'common'

const SIT = 'situation';

// 表格数据
export function jwPerson (payload) {
    return ajax.post(`${SIT}/jwPerson`, payload)
}

// 实时在线人数
export function overall (payload) {
    return ajax.post(`${SIT}/overall`, payload)
}

// 24小时到达人数
export function come (payload) {
    return ajax.post(`${SIT}/come`, payload)
}

// 左侧下方省外号码柱图数据
export function cylinderOuter (payload) {
    return ajax.post(`${SIT}/zhutu`, payload)
}

// 左侧下方省外号码柱图弹出框内数据
export function cylinderOuterCity (payload) {
    return ajax.post(`${SIT}/cylinderOuterCity`, payload)
}

// 左侧下方境外号码柱图数据
export function cylinderOverseas (payload) {
    return ajax.post(`${SIT}/zhutu`, payload)
}
// 左侧下方境外号码柱图数据有层级
export function cylinderOverseasLevel (payload) {
    return ajax.post(`${SIT}/cylinderOverseas`, payload)
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
