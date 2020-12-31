import { ajax } from 'common'
// import { inAreaImpInfoInitJson, inAreaImpPerListJson } from './areaHistory.js'

// 区内实时查询
export function inAreaImpPerList (payload) {
    return ajax.get(`/inAreaQuery/inAreaImpPerList/${payload}`)
    // return ajax.post(`/nationRealTimeQuery/nationImpPerList/1`, payload)
}

export function inAreaImpInfoInit (payload) {
    return ajax.post(`/inAreaQuery/inAreaImpInfoInit`, payload)
}

// 区内历史查询（查询信息）
export function inAreaHistTracQuery (payload) {
    return ajax.post(`/inAreaQuery/inAreaHistTracQuery`, payload)
}

// 全国实时查询
export function nationImpPerList (payload) {
    return ajax.get(`/nationRealTimeQuery/nationImpPerList/${payload}`)
    // return ajax.post(`/nationRealTimeQuery/nationImpPerList/1`, payload)
}

export function nationImpInfoInit (payload) {
    return ajax.post(`/nationRealTimeQuery/nationImpInfoInit`, payload)
}
// 全国历史查询（查询信息）
export function nationHistTracQuery (payload) {
    return ajax.post(`/nationRealTimeQuery/nationHistTracQuery`, payload)
}

// 区内轮询
// export function inAreaRealTimePush (payload) {
//     return ajax.post(`/inAreaQuery/inAreaRealTimePush`, payload)
// }
// export function inAreaRealTimePush (payload) {
//     return ajax.post(`inAreaRealTimePush`, payload)
// }

// 全国轮询
// export function nationRealTimePush (payload) {
//     return ajax.post(`nationRealTimePush`, payload)
// }

// 区内机身码查询结果列表
export function inAreaIMEIResult (payload) {
    return ajax.post(`/imeiQuery/nationIMEIResult`, payload)
}

// 区内机身码查询任务列表
export function inAreaIMEITaskList (payload) {
    return ajax.post(`/imeiQuery/nationIMEITaskList`, payload)
}

// 创建区内机身码查询任务
export function inAreaIMEICreate (payload) {
    return ajax.post(`/imeiQuery/nationIMEICreate`, payload)
}
