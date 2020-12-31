import { ajax } from 'common'

const SI = '/export'

// 初始数据加载
export function dataLoad (payload) {
    return ajax.post(`${SI}/dataLoad`, payload)
}

// 请求二级表格数据
export function dataLoadMore (payload) {
    return ajax.post(`${SI}/dataLoadMore`, payload)
}

// 请求表格数据
export function tableLoad (payload) {
    return ajax.post(`${SI}/tableLoad`, payload)
}
