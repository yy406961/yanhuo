import { ajax } from 'common'

// 区内重点人列表获取
export function getPartAreaImportant (payload) {
    return ajax.post(`/goalHistoryOrbitLocal/tarNumQuery`, payload)
}

// 区内重点人传输
export function getPartAreaLocusData (payload) {
    return ajax.post(`/goalHistoryOrbitLocal/goalHistoryOrbitQuery`, payload)
}

// 全国重点人列表获取
export function getNationImportant (payload) {
    return ajax.post(`/nationGoalHistoryOrbitLocal/tarNumQuery`, payload)
    //  rap:
    // return ajax.get(`/goalHistoryOrbitNation/tarNumQuery/2`, payload)
}

// 全国重点人传输
export function getNationLocusData (payload) {
    return ajax.post(`/nationGoalHistoryOrbitLocal/goalHistoryOrbitQuery`, payload)
}

// 全国重点人历史轨迹数据获取
// export function sendNationImportant () {
//     return ajax.get(`/goalHistoryOrbitNation/transferData`)
// }

// 区内重点人历史轨迹数据获取
// export function sendPartAreaImportant () {
//     return ajax.get(`/goalHistoryOrbitLocal/transferData`)
// }
