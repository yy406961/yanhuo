import { ajax } from 'common'

// 目标号码自动补全接口
export function bankTypeAll (payload) {
    return ajax.get('/bankCount/entities', payload)
}

// 获取账动信息查询列表
export function countMsgList (payload) {
    return ajax.post('/figurePortraitNew/countMsg', payload)
}

//  获取短信类型
export function getMsgType (payload) {
    return ajax.post('/message/getPortraitDict', payload)
}

//  获取生活信息查询列表

export function lifeMsgList (payload) {
    return ajax.post('/message/getAccountMovementMSG', payload)
}
