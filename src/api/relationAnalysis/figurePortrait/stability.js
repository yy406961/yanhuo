import { ajax } from 'common'

const IN = 'figurePortraitStability';

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

