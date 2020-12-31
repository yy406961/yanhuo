import { ajax } from 'common'

// 组织（机构）管理

// 获取机构列表
export function getOrganizationList (payload) {
    // return ajax.post(`orgInfoQuery`, payload)
    return ajax.post(`org/selectOrg`, payload)
}

// 保存机构
export function saveOrganization (payload) {
    // return ajax.post(`orgSave`, payload)
    return ajax.post(`org/addOrg`, payload)
}

// 删除机构
export function deleteOrganization (payload) {
    // return ajax.post(`orgDelete`, payload)
    return ajax.post(`org/deleteOrg`, payload)
}

// 重置密码
export function resetKeys (payload) {
    // return ajax.post(`resetKeys`, payload)
    return ajax.post(`org/resetPwd`, payload)
}

// 获取功能权限
export function getFunTree () {
    // return ajax.post(`resetKeys`, payload)
    return ajax.get(`org/addAuthorityTree`)
}

export function getCity (payload) {
    return ajax.get(`common/provToCity/${payload}`)
}

export function getProvince () {
    return ajax.get(`common/prov/provinces`)
}
