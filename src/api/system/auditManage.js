/**
 * @type {[type]}
 */
import { ajax } from 'common'
const moduleKey = '/audit';
// const moduleKey = '';
// 审计结果查询
export function userAuditQuery (payload) {
    return ajax.post(`${moduleKey}/userAuditQuery`, payload)
}

// 查看操作记录
export function selectOperRecord (payload) {
    return ajax.post(`${moduleKey}/selectOperRecord`, payload)
}

// 审计结果操作关联的目标号码
export function operRelateTarTel (payload) {
    return ajax.post(`${moduleKey}/operRelateTarTel`, payload)
}

/* 审计保存接口
 * 参数
 * owner：任务ID或者功能ID
 * userBeha：模块行为（增删改查等操作）
 * visitModule：系统模块（该模块的标题名称）this.$route.name
 * msisdn：手机号（以数组的形式）
 * content：操作内容（对象的形式）
 * userIp：本地IP地址
 */
// export function generateOperRecord (payload) {
//     let getContent = ''
//     let { entries } = Object;
//     // console.log(Object.keys(queryList))
//     for (let [key, value] of entries(payload.content)) {
//         if (value !== '' && value !== undefined && value !== null) {
//             getContent += `${key}: ${value}; `
//         }
//     }
//     payload.content = getContent
//     return ajax.post(`${moduleKey}/generateOperRecord`, payload)
// }
