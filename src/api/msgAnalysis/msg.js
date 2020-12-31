/**
 * Created by user on 2017/7/15.
 */
import { ajax } from 'common'

const MSGLOGIC = 'smsContentLogicQuery';
const HARMMSG = 'harmMsg';

// 创建短信内容逻辑查询任务
export function msgContLogicCreate (payload) {
    return ajax.post(`${MSGLOGIC}/addSmsContentLogicQueryTask`, payload)
}
// 关键词下拉列表
export function keyWordSelect (payload) {
    return ajax.post(`keywords/keywordsQuery`, payload)
}
// 短信内容逻辑查询任务列表
export function msgContLogicTaskList (payload) {
    return ajax.post(`${MSGLOGIC}/selectLogicTaskList`, payload)
}

//  短信内容逻辑查询删除任务
export function msgContLogicTaskdelete (payload) {
    return ajax.post(`${MSGLOGIC}/deleteLogicTaskById`, payload)
}

// 短信内容逻辑查询结果列表
export function msgContLogicResult (payload) {
    return ajax.post(`${MSGLOGIC}/selectLogicTaskResultById`, payload)
}

// 创建有害短信溯源查询任务
export function harmMsgTaskCreate (payload) {
    return ajax.post(`${HARMMSG}/harmMsgTaskCreate`, payload)
}

// 获取查询任务列表
export function harmMsgTaskList (payload) {
    return ajax.post(`${HARMMSG}/harmMsgTaskList`, payload)
}

// 获取有害短信溯源分析查询结果列表
export function harmMsgTaskResult (payload) {
    return ajax.post(`${HARMMSG}/harmMsgTaskResult`, payload)
}

//  有害短信溯源分析查询除任务
export function harmMsgTaskdelete (payload) {
    return ajax.post(`${HARMMSG}/deleteHarmTaskById`, payload)
}

// 获取查询结果详情列表
export function harmMsgDetQueryByTel (payload) {
    return ajax.post(`${HARMMSG}/harmMsgDetQueryByTel`, payload)
}
