import { ajax } from 'common'

const SIT = 'situation';  // 右侧
const SITI = 'szsj';  // 左侧

// 判断是宁夏还是青海
export function areaType (payload) {
    return ajax.get(`${SIT}/judgment`, payload)
}

// 左上总查询条件
export function searchAll (payload) {
    return ajax.post(`${SITI}/szselect`, payload)
}

// 左上总查询条件弹窗多选框
export function searchDialog (payload) {
    return ajax.post(`${SITI}/query`, payload)
}

// 导入文件查询后的分页
export function upLoadPage (payload) {
    return ajax.post(`${SITI}/impPagination`, payload)
}

// 请求右侧表格数据
export function personData (payload) {
    return ajax.post(`${SIT}/select/`, payload)
}

// 右上角特征
export function frequency (payload) {
    return ajax.post(`${SIT}/Frequency`, payload)
}

// 请求右侧表格数据 -- 短信弹窗
export function MessageWindows (payload) {
    return ajax.post(`${SIT}/MessageWindows/`, payload)
}

// 请求右侧表格数据 -- 通联弹窗
export function CommunicationRelationshipWindows (payload) {
    return ajax.post(`${SIT}/CommunicationRelationshipWindows/`, payload)
}

// 请求右侧表格数据 -- 基站弹窗
export function BasestationWindows (payload) {
    return ajax.post(`${SIT}/BasestationWindows/`, payload)
}

// 请求右侧表格数据 -- 活动区域弹窗
export function BasestationWindowsById (payload) {
    return ajax.post(`${SIT}/BasestationWindowsById/`, payload)
}

// 请求右侧研判按钮
export function Judgment (payload) {
    return ajax.post(`${SIT}/Judgment/`, payload)
}
