import { global } from '../mutation-types'
// import axios from 'axios'
// import { initFunInfoList, initAlaInfoList } from 'api/platform/common'
// import { getGlobalKeys } from 'api/layout/header'
import { storage } from 'common'
import router from 'router'

/**
 * 初始化数据
 */
const state = {
    // userName 对应后台返回值中 userName 字段，此字段为登录用户的用户名
    // userId 对应后台返回值中 userId 字段，此字段为登录用户的用户ID
    userId: storage.session.storage.userId,
    userName: storage.session.storage.userName,
    userNick: storage.session.storage.userNick,
    taskId: storage.local.storage.taskId,
    visualHeight: 500,
    dataType: '',
    menuList: [],
    routerData: [],
    // 警告列表
    alaInfoList: [],
    // 功能列表
    funInfoList: [],
    // 是否电话加密
    isPhoneJM: false,

    // 系统是否显示警徽图标
    isPoliceBadge: true,

    // 地图默认最大层级
    gMapMaxZoom: 17,
    // 全局key
    globalKeys: storage.session.get('globalKeys') || {
        gTitle: '',
        gMapKey: '',
        homeInfo: '',
        gMapCenter: [],
        gMapCenterRvrovice: [],
        gheatMapPointSize: 1
    },
    // 是否显示左边菜单
    menuState: false,
    // 首页轮播状态
    rollState: true
    // globalKeys: {
    //     gTitle: '宁夏',
    //     gMapKey: 'ningxia',
    //     gMapCenter: [106.27, 38.47], 101.777263,36.629476/112.946895,28.221139
    //     gMapCenterRvrovice: [105.941, 37.391],96.621996,35.658604
    //     gheatMapPointSize: 1
    // }
}

/**
 * commit 同步突变
 */
const mutations = {
    [global.SAVE_GLOBAL_MENULIST](state, data) {
        state.menuList = data
    },
    [global.SAVE_GLOBAL_ALAINFOLIST](state, data) {
        state.alaInfoList = data
    },
    [global.SAVE_GLOBAL_FUNINFOLIST](state, data) {
        state.funInfoList = data
    },
    [global.SAVE_GLOBAL_ROUTERDATA](state, data) {
        state.routerData = data
    },
    [global.SAVE_GLOBAL_VISUALHEIGHT](state, height) {
        state.visualHeight = height
    },
    [global.SAVE_GLOBAL_DATATYPE](state, data) {
        state.dataType = data
    },
    [global.SAVE_GLOBAL_USERNAME](state, data) {
        state.userName = data
    },
    [global.SAVE_GLOBAL_USERNICK](state, data) {
        state.userNick = data
    },
    [global.SAVE_GLOBAL_USERID](state, data) {
        state.userId = data
    },
    // 设置全局业务KEY 针对不同省份进行切换的变量
    [global.SAVE_GLOBAL_GK](state, payload) {
        if (payload.gTitle) {
            state.globalKeys.gTitle = payload.gTitle
        }
        if (payload.gMapKey) {
            state.globalKeys.gMapKey = payload.gMapKey
            // 依据省市改变地图默认最大层级
            if (payload.gMapKey === 'ningxia') {
                state.gMapMaxZoom = 17
            } else {
                state.gMapMaxZoom = 18
            }
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
        if (payload.homeInfo) {
            state.globalKeys.homeInfo = payload.homeInfo
        }
    },
    [global.UPDATE_GLOBAL_MENUSTATE](state, val) {
        state.menuState = val
    },
    [global.UPDATE_GLOBAL_ROLLSTATE](state, val) {
        state.rollState = val
    }
}

/**
 * 用于更新 view 的 getters
 */
const getters = {
    menuList: state => state.menuList,
    visualHeight: state => state.visualHeight,
    dataType: state => state.dataType,
    alaInfoList: state => state.alaInfoList,
    funInfoList: state => state.funInfoList,
    getAllModuleList: state => {
        return state.alaInfoList.concat(state.funInfoList)
    },
    userName: state => state.userName,
    userNick: state => state.userNick,
    userId: state => state.userId,
    taskId: state => state.taskId,
    globalKeys: state => state.globalKeys,
    isPhoneJM: state => state.isPhoneJM,
    gMapMaxZoom: state => state.gMapMaxZoom,
    isPoliceBadge: state => state.isPoliceBadge,
    menuState: state => state.menuState,
    rollState: state => state.rollState
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
        // getGlobalKeys().then(resp => {
        //     commit(global.SAVE_GLOBAL_GK, resp.data)
        //     if (!storage.session.get('globalKeys')) {
        //         storage.session.set('globalKeys', resp.data)
        //     }
        // })
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
    changeDataType: ({ commit }, payload) => {
        commit(global.SAVE_GLOBAL_DATATYPE, payload)
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
    saveUserNick: ({ commit }, payload) => {
        commit(global.SAVE_GLOBAL_USERNICK, payload)
    },
    saveUserId: ({ commit }, payload) => {
        commit(global.SAVE_GLOBAL_USERID, payload)
    },
    changeMenuState: ({ commit }, payload) => {
        commit(global.UPDATE_GLOBAL_MENUSTATE, payload)
    },
    changeRollState: ({ commit }, payload) => {
        commit(global.UPDATE_GLOBAL_ROLLSTATE, payload)
    },
    disposeExitLoginService: () => {
        localStorage.clear()
        sessionStorage.clear()
        // 触发登录状态
        // commit('changeLoginState', false)
        // 跳转到登陆页
        router.push({ path: '/login' })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
