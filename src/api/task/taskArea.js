/**
 * Created by user on 2017/7/19.
 */
import { ajax } from 'common'

// 查询已选区域信息
export function selectedAreaInfoQuery (payload) {
    return ajax.post(`goalArea/selectedAreaInfoQuery`, payload)
}

// 系统内置重点区域
export function sysBuiltInAreaScope (payload) {
    return ajax.post(`goalArea/sysAreaLoad`, payload)
}

// 系统内置重点区域选择，保存
export function sysBuiltInAreaScopeSave (payload) {
    return ajax.post(`goalArea/sysAreaAdd`, payload)
}

// （区域范围）地图框选区域范围保存
export function mapSelectAreaRangeSave (payload) {
    return ajax.post(`goalArea/mapSelectAreaRangeSave`, payload)
}

// 区域范围（导入）保存
export function importAreaRangeSave (payload) {
    return ajax.post(`goalArea/importSave`, payload)
}

// 区域范围（录入）添加
export function recordAreaRangeSave (payload) {
    return ajax.post(`goalArea/recordAreaRangeSave`, payload)
}

// 已选区域删除
export function selectedAreaDelete (payload) {
    return ajax.post(`goalArea/selectedAreaDelete`, payload)
}

// 修改已选区域信息（地图框选、录入）
export function reviseArea (payload) {
    return ajax.post(`goalArea/tarAreaModify`, payload)
}

// 修改已选区域信息（导入）
export function reviseImportArea (payload) {
    return ajax.post(`goalArea/updateFile`, payload)
}

// 基站点信息查询
export function getCellCoordinate (payload) {
    return ajax.post(`goalArea/cellCoordinatesQuery`, payload)
}

// 获取关键词列表
export function getKeywordList (payload) {
    return ajax.post(`/keywords/keywordsQuery`, payload)
}

// 获取目标号码列表
export function tarNumQuery (payload) {
    return ajax.post(`/targetNumberManage/tarNumQuery`, payload)
}

// 获取已选重点区域
export function getSysSelArea (payload) {
    return ajax.post(`/goalArea/selectedSystemIds`, payload)
}

// 查询基站列表
export function getCellInfoList (payload) {
    return ajax.post(`/goalArea/cellListQuery`, payload)
}

// 根据经纬度查询某个基站点的详细信息
export function getCellInfoDetail (payload) {
    return ajax.post(`/goalArea/cellDetailsQuery`, payload)
}

// 上传到服务器
export function upService (payload) {
    return ajax.post(`/goalArea/upService`, payload)
}
