import { ajax } from 'common'

// 组织（机构）管理

// 获取机构列表
export function baseStationSearch (payload) {
    return ajax.post(`goalArea/baseStationSearch`, payload)
}

