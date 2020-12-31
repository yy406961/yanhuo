import { ajax } from 'common'

// 树形图加载
export function deptOrgTreeLoad (payload) {
    return ajax.get(`/dept/addDeptTree`, payload)
}

// 人员管理--查询
export function userInfoQuery (payload) {
    return ajax.post(`/users/selectUsers`, payload)
}

// 人员管理--保存
export function userSave (payload) {
    return ajax.post(`/users/addUsers`, payload)
}

// 人员管理--删除
export function userDelete (payload) {
    return ajax.post(`/users/deleteUsers`, payload)
}

// 人员管理--重置密码
export function userPwdUpdate (payload) {
    return ajax.post(`/users/resetPwd`, payload)
}

// 人员管理--获取机构全部角色列表
export function rolesList (payload) {
    return ajax.get(`/role/addRoleTree`, payload)
}

// 根据id查询详细信息
export function usersById (payload) {
    return ajax.get(`/users/usersById/${payload}`)
}

