import Vue from 'vue';
import App from './example.vue';
import router from './router.config';
import store from 'store'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'assets/css/index.css';
import 'font-awesome/css/font-awesome.css'
import '../src/mock/index'
// register globally
Vue.use(ElementUI);
sync(store, router)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
