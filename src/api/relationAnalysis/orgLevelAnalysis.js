/**
 * Created by ZL on 2017/8/6.
 */
import { ajax } from 'common'

// 获取订票检测目标查询列表
export function getTargetist (payload) {
    return ajax.post(`/msgGroup/bookSMSTargetList`, payload)
}
