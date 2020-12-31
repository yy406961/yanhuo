import { ajax } from 'common'

// 即时通讯类APP应用分析

// 获取目标号码列表
export function getSelectTableData (payload) {
    return ajax.post(`/appAnalysis/targetList`, payload)
}

// app安装情况
export function getAppInstall (payload) {
    return ajax.post(`/appAnalysis/appInstall`, payload)
}

// app使用占比
export function getUseLevel (payload) {
    return ajax.post(`/appAnalysis/appUseProportion`, payload)
}
// app安装详情
export function getInstallDetail (payload) {
    return ajax.post(`/appAnalysis/appInstallDetail`, payload)
}

