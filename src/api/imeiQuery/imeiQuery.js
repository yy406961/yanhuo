import { ajax } from 'common'

// 查询接口
export function imeiQuery (payload) {
    return ajax.post(`/fuselageCode/getFuselageCode`, payload)
}

