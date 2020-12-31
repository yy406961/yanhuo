import {
    global
} from '../mutation-types'
// import axios from 'axios'
// import { initFunInfoList, initAlaInfoList } from 'api/platform/common'
import { storage } from 'common'

/**
 * 初始化数据
 */
const state = {
    // userName 对应后台返回值中 userName 字段，此字段为登录用户的用户名
    userId: storage.session.storage.userId,
    userName: storage.session.storage.userName,
    taskId: storage.local.storage.taskId,
    visualHeight: 500,
    menuList: [],
    routerData: [],
    // 警告列表
    alaInfoList: [],
    // 功能列表
    funInfoList: [],

    // 全局key
    globalKeys: {
        gTitle: '宁夏',
        gMapKey: 'ningxia',
        gMapCenter: [106.27, 38.47],
        gMapCenterRvrovice: [105.941, 37.391],
        gheatMapPointSize: 1
    }
}

/**
 * commit 同步突变
 */
const mutations = {
    [global.SAVE_GLOBAL_MENULIST] (state, data) {
        state.menuList = data;
    },
    [global.SAVE_GLOBAL_ALAINFOLIST] (state, data) {
        state.alaInfoList = data
    },
    [global.SAVE_GLOBAL_FUNINFOLIST] (state, data) {
        state.funInfoList = data
    },
    [global.SAVE_GLOBAL_ROUTERDATA] (state, data) {
        state.routerData = data
    },
    [global.SAVE_GLOBAL_VISUALHEIGHT] (state, height) {
        state.visualHeight = height
    },
    [global.SAVE_GLOBAL_USERNAME] (state, data) {
        state.userName = data
    },
    [global.SAVE_GLOBAL_USERID] (state, data) {
        state.userId = data
    },
    // 设置全局业务KEY 针对不同省份进行切换的变量
    [global.SAVE_GLOBAL_GK] (state, payload) {
        if (payload.gTitle) {
            state.globalKeys.gTitle = payload.gTitle
        }
        if (payload.gMapKey) {
            state.globalKeys.gMapKey = payload.gMapKey
        }
        if (payload.gMapCenter) {
            state.globalKeys.gMapCenter = payload.gMapCenter
        }
        if (payload.gMapCenterRvrovice) {
            state.globalKeys.gMapCenterRvrovice = payload.gMapCenterRvrovice
        }
        if (payload.gheatMapPointSize) {
            state.globalKeys.gheatMapPointSize = payload.gheatMapPointSize
        }
    }
}

/**
 * 用于更新 view 的 getters
 */
const getters = {
    menuList: state => state.menuList,
    visualHeight: state => state.visualHeight,
    alaInfoList: state => state.alaInfoList,
    funInfoList: state => state.funInfoList,
    getAllModuleList: state => {
        return state.alaInfoList.concat(state.funInfoList)
    },
    userName: state => state.userName,
    userId: state => state.userId,
    taskId: state => state.taskId,
    globalKeys: state => state.globalKeys
}

/**
 */
const actions = {

    /**
     * [saveGlobalKeys 设置全局key]
     * @param  {[type]} commit  [description]
     * @param  {[type]} payload [description]
     * @return {[type]}         [description]
     */
    saveGlobalKeys: ({ commit }, payload) => {
        commit(global.SAVE_GLOBAL_GK, payload)
    },
    /**
     * [syncVisualHeight 设置当前可视区 二级模块内的高度]
     * @param  {[type]} commit  [description]
     * @param  {[type]} payload [description]
     * @return {[type]}         [description]
     */
    syncVisualHeight: ({ commit }, payload) => {
        commit(global.SAVE_GLOBAL_VISUALHEIGHT, payload)
    },

    saveRouterData: ({ commit }, payload) => {
        commit(global.SAVE_GLOBAL_ROUTERDATA, payload)
    },

    fetchMenuList: ({ commit }, payload) => {
        commit(global.SAVE_GLOBAL_MENULIST, payload)
    },
    // fetchInitList: ({ commit }) => {
    //     // 请求功能列表
    //     initFunInfoList().then(resp => {
    //         commit(global.SAVE_GLOBAL_FUNINFOLIST, resp.rows)
    //     })
    //     // 请求告警列表
    //     initAlaInfoList().then(resp => {
    //         commit(global.SAVE_GLOBAL_ALAINFOLIST, resp.rows)
    //     })
    // },
    saveUserName: ({ commit }, payload) => {
        commit(global.SAVE_GLOBAL_USERNAME, payload)
    },
    saveUserId: ({ commit }, payload) => {
        commit(global.SAVE_GLOBAL_USERID, payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
