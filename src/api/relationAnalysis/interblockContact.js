/**
 * Created by user on 2017/8/2.
 */
import { ajax } from 'common'

const GROUP = 'groupContacts';

// 组间联系人分析

// 弹窗：获取目标号码列表
export function targetList (payload) {
    return ajax.post(`targetNumberManage/tarNumQuery`, payload)
}

// 左侧：目标号码通联信息列表
export function contactInfoList (payload) {
    return ajax.post(`${GROUP}/contactInfoList`, payload)
}

// 右侧：目标号码通联关系图
export function contactInfoChart (payload) {
    return ajax.post(`${GROUP}/contactInfoChart`, payload)
}

// 右侧上方表格和小表格：组间联系人通联列表
export function groupContactsList (payload) {
    return ajax.post(`${GROUP}/groupContactsList`, payload)
}

// 右侧下方表格：组间联系人通联详情
// export function groupContactsInfo (payload) {
//     return ajax.post(`${GROUP}/groupContactsInfo`, payload)
// }
