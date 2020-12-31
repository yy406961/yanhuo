/**
 * Created by MARY on 2017/7/22.
 */
import { ajax } from 'common'

// 查询已选区域信息
export function getSelectedArea (payload) {
    return ajax.post(`selectedAreaInfoQuery`, payload)
}

// 系统内置重点区域初始化
export function sysBuiltInAreaScope (payload) {
    return ajax.post(`sysBuiltInAreaScope`, payload)
}

// 系统内置区域保存
export function sysBuiltInAreaScopeSave (payload) {
    return ajax.post(`sysBuiltInAreaScopeSave`, payload)
}

// 地图框选区域范围保存
export function mapSelectAreaRangeSave (payload) {
    return ajax.post(`goalArea/mapSelectAreaRangeSave`, payload)
}

// 修改已选区域信息（地图框选、录入）
export function reviseArea (payload) {
    return ajax.post(`goalArea/tarAreaModify`, payload)
}

// 修改已选区域信息（导入）
export function reviseImportArea (payload) {
    return ajax.post(`goalArea/updateFile`, payload)
}
