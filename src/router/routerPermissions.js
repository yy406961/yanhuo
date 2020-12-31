/**
 * Created by zhao on 2017/7/6.
 */
import { setCookies, getCookies } from 'utils/cookiesUtil'
import { storage } from 'common'
// import { routerMenuConfig } from 'router.config'

const ls = storage.local();

// 从后台获取数据的api
import { getMenuList } from 'api/login'
import store from '../store';

/**
 * [addRouter 添加路由和菜单到全局]
 * @param {[type]}   menuData
 * @param {[type]}   to
 * @param {Function} next
 * @param {[type]}   router
 */
// const addRouter = (menuData, to, next, router) => {
//     const routerArr = routerData.concat(cArr).map(item => {
//         let obj = {
//             name: item.name,
//             path: item.url
//         }
//         if (item.param) Object.assign(obj, { param: item.param })
//         return obj
//     })
//
//     store.dispatch('global/loadMenuData', menuData).then(() => {
//         const routerArr = store.getters['global/routerData'].map(item => item.name)
//         router.addRoutes(routerMenuConfig.filter(item => {
//             return routerArr.indexOf(item.name) >= 0
//         }))
//         store.dispatch('global/saveMenuShowData')
//         next(to.path);
//     })
// }

// 判断userId以及登录时间是否过期
const userTime = () => {
    let userId = getCookies('GA_TOKEN')
    let cookieDate = ls.get('userPrivilegeTime')
    let effective = false
    if (cookieDate && new Date().getTime() - cookieDate <= 10800000) effective = true
    return typeof userId === 'string' && Object.keys(userId).length > 0 && effective
}

// 前后登录userId是否相同
const altogetherUserId = () => {
    return getCookies('GA_TOKEN') === ls.get('userToken')
}

// routerData是否已加载
const hasRouterData = () => {
    return store.getters['global/routerData'].length === 0
}

// 是否刷新后从缓存里加载数据
const refreshLoadData = () => {
    return altogetherUserId() && getCookies('menu-initData')
}

/**
 * [mountRouter 根据router做拦截器处理 ]
 * @param  {[type]} router
 * @return {[type]}
 */
export const mountRouter = router => {
    if (router.beforeEach) {
        router.beforeEach((to, from, next) => {
            if (to.path === '/login') {
                next()
            } else {
                const userId = getCookies('GA_TOKEN')
                // 前后登录userId是否相同
                if (!altogetherUserId()) store.dispatch('global/saveRouterData', [])
                // 判断userId以及登录时间是否过期
                if (userTime()) {
                    // routerData是否已加载
                    if (hasRouterData()) {
                        // 是否刷新后从缓存里加载数据
                        if (refreshLoadData()) {
                            // addRouter(JSON.parse(getCookies('menu-initData')), to, next, router)
                        } else {
                            ls.set('userToken', userId)
                            /*
                             * 从后台请求数据
                             * */
                            getMenuList().then(res => {
                                setCookies({ 'menu-initData': res })
                                // addRouter(res, to, next, router)
                            }).catch(() => {
                                next({ path: '/login' })
                            })
                        }
                    } else {
                        next()
                    }
                } else {
                    next({ path: '/login' })
                }
            }
        })
    }
}
