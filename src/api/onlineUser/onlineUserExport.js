/**
 * Created by user on 2018/6/13.
 */
import { ajax } from 'common'

const SNJW = 'snjwPersonExport';
// 获取地市
export function getCity (payload) {
    return ajax.get(`${SNJW}/getCityList`, payload)
}

// 获取区县
export function getDistrict (payload) {
    return ajax.post(`${SNJW}/getAreaList`, payload)
}

// 获取省（市、自治区）
export function getProvince (payload) {
    return ajax.get(`${SNJW}/provincesList`, payload)
}

// 获取市（地区、自治州、盟）
export function getRegion (payload) {
    return ajax.post(`${SNJW}/getCitiesByProName`, payload)
}

// 获取国家（或地区）
export function getCountry (payload) {
    return ajax.get(`${SNJW}/nationList`, payload)
}

// 查询结果
export function queryResult (payload) {
    return ajax.post(`${SNJW}/queryResult`, payload)
}

// 导出
// export function exportLink (payload) {
//     let queryTime = payload.queryTime.replace(/-/g, '');
//     let province = payload.province ? payload.province : 0;
//     let region = payload.region ? payload.region : 0;
//     let country = payload.country ? payload.country : 0;
//     return ajax.get(`${SNJW}/export/${payload.city}/${payload.district}` +
//       `/${queryTime}/${payload.area}/${province}/${region}/${country}`)
// }
