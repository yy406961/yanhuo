import { ningxia, qinghai, haikou, shanxi, jilin, changsha } from 'baidu-boundarydata'
const areaMap = {
    'ningxia': ningxia.cityCode,
    'qinghai': qinghai.cityCode,
    'shanxi': shanxi.cityCode,
    'changchun': jilin.cityCode,
    'haikou': haikou.cityCode,
    'changsha': changsha.cityCode
}
const provinceMap = {
    'ningxia': ningxia.provinceCode,
    'qinghai': qinghai.provinceCode,
    'shanxi': shanxi.provinceCode,
    'changchun': jilin.provinceCode,
    'haikou': haikou.provinceCode,
    'changsha': changsha.provinceCode
}
export { areaMap, provinceMap }
