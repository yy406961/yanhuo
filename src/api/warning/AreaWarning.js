import { ajax } from 'common'

// 目标进入区域告警结果列表--->告警处置---->告警明细
export function tarInAreaResLoad (payload) {
    return ajax.post(`/alarmInArea/tarInAreaResLoad`, payload)
}
export function tarInAreaAlaDispose (payload) {
    return ajax.post(`/alarmInArea/tarInAreaAlaDispose`, payload)
}
export function tarInAreaAlaDetail (payload) {
    return ajax.post(`/alarmInArea/tarInAreaAlaDetail`, payload)
}

// 目标进入离开告警结果列表--->告警处置---->告警明细
export function tarInOutResLoad (payload) {
    return ajax.post(`/alarmInOut/tarInOutResLoad`, payload)
}
export function tarInOutAlaDispose (payload) {
    return ajax.post(`/alarmInOut/tarInOutAlaDispose`, payload)
}
export function tarInOutAlaDetail (payload) {
    return ajax.post(`/alarmInOut/tarInOutAlaDetail`, payload)
}

// 目标关机告警结果列表--->告警处置---->告警明细
export function tarOffResLoad (payload) {
    return ajax.post(`/alarmTarOff/tarOffResLoad`, payload)
}
export function tarOffAlaDispose (payload) {
    return ajax.post(`/alarmTarOff/tarOffAlaDispose`, payload)
}
export function tarOffAlaDetail (payload) {
    return ajax.post(`/alarmTarOff/tarOffAlaDetail`, payload)
}

// 目标漫入告警结果列表--->告警处置---->告警明细
export function tarFlowResLoad (payload) {
    return ajax.post(`alarmFlowOut/alarmListLoad`, payload)
}
export function tarFlowAlaDispose (payload) {
    return ajax.post(`alarmFlowOut/alarmHandle`, payload)
}
export function tarFlowAlaDetail (payload) {
    return ajax.post(`alarmFlowOut/alarmDetail`, payload)
}

// 目标消失告警结果列表--->告警处置---->告警明细
export function tarDisResLoad (payload) {
    return ajax.post(`/alarmDisappear/alarmResList`, payload)
}
export function tarDisAlaDispose (payload) {
    return ajax.post(`/alarmDisappear/disappearDispose`, payload)
}
export function tarDisAlaDetail (payload) {
    return ajax.post(`/alarmDisappear/disappearLocDetail`, payload)
}

// 目标接头告警结果列表
export function tarJoinResLoad (payload) {
    return ajax.post(`/alarmtarjoin/tarJoinResLoad`, payload)
}
export function tarJoinAlaDispose (payload) {
    return ajax.post(`/alarmtarjoin/tarJoinAlaDispose`, payload)
}
export function tarJoinAlaDetail (payload) {
    return ajax.post(`/alarmtarjoin/tarJoinAlaDetail`, payload)
}

// 目标实时跟踪告警结果列表--->告警处置---->告警明细
export function tarTraResLoad (payload) {
    return ajax.post(`/alarmMove/alarmResList`, payload)
}
export function tarTraAlaDispose (payload) {
    return ajax.post(`/alarmMove/alarmMoveDispose`, payload)
}
export function tarTraAlaDetail (payload) {
    return ajax.post(`/alarmMove/alarmMoveDetail`, payload)
}

// 目标省内漫出告警结果列表--->告警处置---->告警明细
export function tarFlowInAreaResLoad (payload) {
    return ajax.post(`/alarmInProvFlow/alarmResList`, payload)
}
export function tarFlowInAreaAlaDispose (payload) {
    return ajax.post(`/alarmInProvFlow/inProvFlowDispose`, payload)
}
export function tarFlowInAreaAlaDetail (payload) {
    return ajax.post(`/alarmInProvFlow/inProvFlowDetail`, payload)
}
// 区域人群异常告警结果列表--->告警处置---->告警明细
export function tarFlowNationResLoad (payload) {
    return ajax.post(`/personnelAreaException/areaPersonExceptionLists`, payload)
}
export function tarFlowNationAlaDispose (payload) {
    return ajax.post(`/personnelAreaException/personExceptionDispose`, payload)
}
export function tarFlowNationAlaDetail (payload) {
    return ajax.post(`/personnelAreaException/personExceptionEnergetics`, payload)
}

// 目标省际漫出告警结果列表--->告警处置---->告警明细
export function tarFlowOutProvResLoad (payload) {
    return ajax.post(`/alarmOutProvFlow/alarmResList`, payload)
}
export function tarFlowInProvAlaDispose (payload) {
    return ajax.post(`/alarmOutProvFlow/outProvFlowDispose`, payload)
}
export function tarFlowInProvAlaDetail (payload) {
    return ajax.post(`/alarmOutProvFlow/outProvFlowDetail`, payload)
}

// 目标深度漫入/出现告警结果列表--->告警处置---->告警明细
export function tarCityAreaResLoad (payload) {
    return ajax.post(`/alarmCityArea/tarCityAreaResLoad`, payload)
}
export function tarCityAreaAlaDispose (payload) {
    return ajax.post(`/alarmCityArea/tarCityAreaAlaDispose`, payload)
}
export function tarCityAreaDetail (payload) {
    return ajax.post(`/alarmCityArea/tarCityAreaDetail`, payload)
}

// 弹窗 --- 告警导出
export function warmExport (payload) {
    return ajax.post(`/export/getAlarmTask`, payload)
}
