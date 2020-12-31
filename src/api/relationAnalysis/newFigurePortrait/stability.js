import { ajax } from 'common'
// SZSJ
const IN = 'figurePortraitStability';
// 工作居住地 上网情况 上网详情
const SIN = 'figurePortraitSome';

export function getList (payload) {
    return ajax.post(`${IN}/getStabilityList`, payload)
}

export function getInfo (payload) {
    return ajax.post(`${IN}/getInfo`, payload)
}

// export function getInfo (payload) {
//     return ajax.post(`${IN}/getInfoSJ`, payload)
// }

export function dialogDetail (payload) {
    return ajax.post(`${IN}/getStabilityDetails`, payload)
}

// 工作居住地
export function residencePlace (payload) {
    return ajax.post(`/baseInfo/getWorkHomeArea`, payload)
}

export function placeDialog (payload) {
    return ajax.post(`${SIN}/getPlaceDialog`, payload)
}

// 上网详情请求表格数据
export function internetDetail (payload) {
    return ajax.post(`${SIN}/internetDetail`, payload)
}

// 上网情况数据
export function internetData (payload) {
    return ajax.post(`${SIN}/internetData`, payload)
}
