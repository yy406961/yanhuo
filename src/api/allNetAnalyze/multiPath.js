import { ajax } from 'common'

export function getPartAreaImportant (payload) {
    return ajax.post(`/goalHistoryOrbitLocal/tarNumQuery`, payload)
}

export function getMultiPathData (payload) {
    return ajax.post(`/manyDaysHistoryTrajectory/query`, payload)
}
export function queryTimeSeries (payload) {
    return ajax.post('/manyDaysHistoryTrajectory/queryTimeSeries', payload)
}
export function queryTimeInterval (payload) {
    return ajax.post('/manyDaysHistoryTrajectory/queryTimeInterval', payload)
}
