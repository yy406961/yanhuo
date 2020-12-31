/**
 * Created by user on 2017/8/1.
 */
import { ajax } from 'common'

const OUT = 'outContacts';

// 外部重要联系人分析
// 获取目标号码列表
export function targetList (payload) {
    return ajax.post(`targetNumberManage/tarNumQuery`, payload)
}

// 左侧：目标号码通联信息列表
export function contactInfoList (payload) {
    return ajax.post(`${OUT}/contactInfoList`, payload)
}

// 右侧：目标号码通联关系图
export function contactInfoChart (payload) {
    return ajax.post(`${OUT}/contactInfoChart`, payload)
}

// 右侧上方表格和小表格：获取外部与内部通联列表
export function outInContactsList (payload) {
    return ajax.post(`${OUT}/outInContactsList`, payload)
}

// 右侧下方表格：获取外部与内部通联详情
// export function outInContactsInfo (payload) {
//     return ajax.post(`${OUT}/outInContactsInfo`, payload)
// }
