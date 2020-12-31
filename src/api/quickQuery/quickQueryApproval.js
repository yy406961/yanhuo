import { ajax } from 'common'

// 查询接口
export function queryApproval (paylod) {
    return ajax.post(`/quickactions/findQuickQueryApproval`, paylod)
}

// 修改接口
export function changeApproval (paylod) {
    return ajax.post(`/quickactions/updateQuickQuery`, paylod)
}
