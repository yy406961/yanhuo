import { ajax } from 'common'

// 初始化功能菜单
export function initFunInfoList (payload) {
    return ajax.get(`/common/dictionary/funType`, payload)
}

// 初始化告警菜单
export function initAlaInfoList (payload) {
    return ajax.get(`/common/dictionary/alarmType`, payload)
}

// 初始化获取菜单 根据userId
export function getMenuList (payload) {
    return ajax.get(`menu/getMenuInfo/${payload}`)
}
