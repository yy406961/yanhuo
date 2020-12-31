/**
 * Created by ZL on 2017/7/29.
 */
import { ajax } from 'common'

// 获取订票检测目标查询列表
export function getBookTargetist (payload) {
    return ajax.post(`/targetNumberManage/tarNumQuery`, payload)
}
// 获取订票信息查询列表
export function getBookSMSList (payload) {
    return ajax.post(`/msgGroup/bookSMSQuery`, payload)
}
