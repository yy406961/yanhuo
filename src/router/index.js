/**
 * Created by ylf on 2017/4/11.
 */
import Vue from 'vue'
import Router from 'vue-router'
import { routerMenuConfig } from './router.config'
// import { storage } from 'common'
Vue.use(Router)

// const routerLogs = l => {
//     return l.map(it => {
//         return { name: it.name, path: it.path }
//     })
// }

// if (process.env.NODE_ENV === 'development') {
//     console.table(routerLogs(routerMenuConfig))
// }

const routes = routerMenuConfig.map(function (item) {
    return item
})

routes.push({
    path: '*',
    redirect: '/'
})

const router = new Router({
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    linkActiveClass: 'active',
    routes
})

export default router
