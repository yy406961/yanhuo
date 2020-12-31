/**
 * Created by user on 2017/10/12.
 */
import { ajax } from 'common'

const SIT = 'situation';

// 请求右侧表格数据
export function rightData (payload) {
    return ajax.post(`${SIT}/rightData`, payload)
}

// 请求条件数据数据 0 -- 涉藏 1 -- 涉疆
export function termData0 (payload) {
    return ajax.get(`${SIT}/SJselect/0`, payload)
}
export function termData1 (payload) {
    return ajax.get(`${SIT}/SJselect/1`, payload)
}

// 条件查询接口
export function termSearch (payload) {
    return ajax.post(`${SIT}/JZDetailedInfo`, payload)
}

// 右下角表格 --- n 个标签
//  通联关系
export function relationShip (arg, payload) {
    return ajax.post(`${SIT}/CommunicationRelationship/${arg}`, payload)
}
// 疑似短信
export function messageCon (arg, payload) {
    return ajax.post(`${SIT}/Message/${arg}`, payload)
}

// 目标位置
export function targetLocation (arg, payload) {
    return ajax.post(`${SIT}/TargetLocation/${arg}`, payload)
}

// 右上角特征
export function frequency (payload) {
    return ajax.post(`${SIT}/Frequency`, payload)
}

// 请求查询条件
// export function reqTerm () {
    // return ajax.post('../../../example/static/term.json', payload)
// }
