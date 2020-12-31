/**
 * Created by Administrator on 2017/9/3.
 */
import { ajax } from 'common'

// 获取角色列表
export function roleInfoQuery (payload) {
    return ajax.post(`role/selectRole`, payload)
}
// 获取角色功能授权树
export function authTreeLoad () {
    return ajax.get(`role/addAuthorityTree`)
}
// 角色保存
export function roleSave (payload) {
    return ajax.post(`role/addRole`, payload)
}
// 角色删除
export function roleDelete (payload) {
    return ajax.post(`role/deleteRole`, payload)
}
