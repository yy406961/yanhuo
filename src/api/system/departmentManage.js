/**
 * Created by Administrator on 2017/9/3.
 */
import { ajax } from 'common'

// 获取部门列表
export function deptInfoQuery (payload) {
    return ajax.post(`dept/selectDept`, payload)
}
// 部门树形图加载
export function deptOrgTreeLoad () {
    return ajax.get(`dept/addDeptTree`)
}
// 新增修改树形图加载
export function deptOrgTreeLoads () {
    return ajax.get(`dept/addDeptTrees`)
}
// 部门新建/修改
export function addDept (payload) {
    return ajax.post(`dept/addDept`, payload)
}

export function deptDelete (payload) {
    return ajax.post(`dept/deleteDept`, payload)
}
