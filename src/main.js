import Vue from 'vue'
import App from './App'
import router from 'router'
import store from 'store'
import { sync } from 'vuex-router-sync'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/css/index.css'
import 'font-awesome/css/font-awesome.css'

if (process.env.NODE_ENV !== 'production') {
    require('./mock/index')
}
window.$VUEStore = store
Vue.use(elementUI)
sync(store, router)
Vue.config.productionTip = false
import Loading from './utils/loading'
window.GALoading = new Loading({})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})
