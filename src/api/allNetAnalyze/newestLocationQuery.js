import { ajax } from 'common'

// ---------------全国实时查询

// ---------------获取全国重点人列表
export function nationImpPerList (payload) {
    return ajax.post(`countrywide/entities`, payload)
}
// ---------------全国 获取所有数据
export function getNationData (payload) {
    return ajax.post(`countrywide/getAllData`, payload)
    // rap
    // return ajax.get(`countrywide/getAllData/1`, payload)
}
// ---------------全国点击详情
export function nationClickDetailQuery (payload) {
    // return ajax.get(`/nationNewestLocationQuery/clickDetail/${payload}`)
    return ajax.get(`/countrywide/morePoint/${payload}`)
}

// ---------------全国 导出
export function nationExportImg (payload) {
    return ajax.post(`/countrywide/img`, payload)
}

export function nationExportData (payload) {
    return ajax.get(`/countrywide/outMsisdn/${payload}`)
}

// ---------------省内最新位置查询

// ---------------获取区内重点人列表
export function partAreaImpPerList (payload) {
    return ajax.post(`areaRealTime/entities`, payload)
}
// ---------------省内 获取所有数据
export function getPartData (payload) {
    return ajax.post(`areaRealTime/getAllData`, payload)
    // rap:
    // return ajax.get(`areaRealTime/getAllData/1`, payload)
}

// ---------------区内点击详情
export function partClickDetailQuery (payload) {
    return ajax.get(`/areaRealTime/morePoint/${payload}`)
}

// ---------------区内 导出
export function partExportImg (payload) {
    return ajax.post(`/areaRealTime/img`, payload)
}

export function partExportData (payload) {
    return ajax.get(`/areaRealTime/outMsisdn/${payload}`)
}
