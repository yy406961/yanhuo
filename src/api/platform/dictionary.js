/**
 * 数据字段接口
 */

import { ajax } from 'common'

/**
 * [getDictionary 数据字典方法]
 * @param  {String} type  接口名称
 * @return {data:[{name:xxx,value:xxx}]}
 */
export const getDictionary = (type) => {
    let url = ''
    if (type) {
        url = `common/dictionary/${type}`
    }
    return ajax.get(url)
}
