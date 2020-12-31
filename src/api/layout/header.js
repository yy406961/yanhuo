/**
 * Created by 1024 on 2017/9/13.
 */
import { ajax } from 'common'

// 修改密码
export function updatePwd (payload) {
    return ajax.post(`/home/updatePwd`, payload)
}

// 首页设置
export function updateHomePage (payload) {
    return ajax.post(`/home/updateHomePage`, payload)
}

// 首页配置/
export function selectHome (payload) {
    return ajax.get(`/home/selectHome`, payload)
}

// 获取下拉菜单列表
export function getMenuList () {
    return ajax.get(`/menu/getMenuInfo`)
}

// 获取getGlobalKeys
export function getGlobalKeys () {
    return ajax.get(`/login/getProvinceConfig`)
}

// 是否开启ukey
export const isNeedUkey = () => {
    return ajax.get('/login/isNeedUkey')
}
