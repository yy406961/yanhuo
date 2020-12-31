/**
 * Created by user on 2017/7/26.
 */

import { ajax } from 'common'

/**
 * [downloadMode 下载模板]
 * @param  {String} type  需求名称
 */
export const downloadModel = (type) => {
    let url = ''
    if (type) {
        url = `${type}/downloadModel`
    }
    return ajax.get(url)
}
