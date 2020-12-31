
import { ajax } from 'common'

// 查询获取重点区域
export function getImportantArea () {
    return ajax.get(`/importArea/areaQueryByUser`)
    // rap
    // return ajax.post(`/importArea/areaQueryByUser`, { userId: '111' })
}
