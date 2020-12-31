import { ajax } from 'common'

const SIT = '/configObject'

// 初始化任务名称数据加载
export function taskLoad (payload) {
    return ajax.post(`${SIT}/taskList`, payload)
}

// 初始化人物标签数据加载
export function personFlagLoad (payload) {
    return ajax.post(`/msisdnFlag/flagList`, payload)
}

// 目标号码查询
export function tagNum (payload) {
    return ajax.post(`${SIT}/goalMsisdn`, payload)
}

// 重点区域查询
export function importArea (payload) {
    return ajax.post(`${SIT}/importantArea`, payload)
}
// 查看重点区域
export function mapArea (payload) {
    return ajax.post(`${SIT}/AreaInfo`, payload)
}

// 关键词查询
export function keyWords (payload) {
    return ajax.post(`${SIT}/keyWords`, payload)
}
