import Vue from 'vue';
import Vuex from 'vuex';
import { global, task } from './modules';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        global,
        task
    }
});

export default store
