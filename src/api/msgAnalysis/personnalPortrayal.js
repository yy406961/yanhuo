/**
 * Created by MARY on 2017/7/26.
 */
import { ajax } from 'common'

const moduleKey = '/messagePersonPicture';

// 人物画像短信查询
export function personnalPortrayal (payload) {
    return ajax.post(`${moduleKey}/perMsgStatueQuery`, payload)
}

// 目标号码自动补全接口
export function targetNumAll (payload) {
    return ajax.get('/goalNumber/entities', payload)
}
