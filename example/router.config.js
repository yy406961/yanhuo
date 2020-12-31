import Vue from 'vue'
import Router from 'vue-router'
/* 业务模块*/
import formDemoPage from './views/form'
import tableDemo from './views/table/tableDemo'
import userNumberManager from './views/table/userNumberManager'
import BarDemoPage from './views/home'
import mapAreaPage from './views/gis/mapAreaUtil'
import massPoint from './views/gis/massPointTest'
import historyTimeLine from './views/gis/historyTimeLine'
import thermodynamicChart from './views/gis/thermodynamicChart'
import r1 from './views/gis/r1'
import r2 from './views/gis/r2'
import graphDemo from './views/gl/graph'
import treeOrgComp from './views/gl/treeOrg'
import map3dChina from './views/gl/map3dChina'
import timelines from './views/monitor/timeLines'
import areaBars from './views/monitor/areaBars'
import curveBars from './views/monitor/curveBars'
import stackedBar from './views/monitor/stackedBar'
import linesTrend from './views/monitor/linesTrend'
import numberFlip from './views/monitor/numberFlip'
import originMap from './views/monitor/originMap'
import categoryTabs from './views/monitor/categoryTabs'
import heatMapComp from './views/monitor/heatMap'

import isChart from './views/informationSource/chart'
import echartsBaidu from './views/gis/echartsBaidu'
import mapAreaMap from './views/gis/mapAreaMap.vue'
import mapAreaTest from './views/gis/mapAreaTest'

Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/formDemo',
        component: formDemoPage,
        name: '表单demo'
    },
    {
        path: '/massPoint',
        component: massPoint,
        name: '海量打点测试'
    },
    {
        path: '/mapArea',
        component: mapAreaPage,
        name: '地图框选'
    },
    {
        path: '/tableDemo',
        component: tableDemo,
        name: '表格'
    },
    {
        path: '/graphDemo',
        component: graphDemo,
        name: '关系图'
    },
    {
        path: '/userNumberManager',
        component: userNumberManager,
        name: '目标号码测试表格'
    },
    {
        path: '/barDemo',
        component: BarDemoPage,
        name: '图表测试'
    },
    {
        path: '/treeOrg',
        component: treeOrgComp,
        name: 'treeOrg'
    },
    {
        path: '/thermodynamicChart',
        component: thermodynamicChart,
        name: '热力地图'
    },
    {
        path: '/map3dChina',
        component: map3dChina,
        name: '3D中国'
    },
    {
        path: '/timelines',
        component: timelines,
        name: '时间轴'
    },
    {
        path: '/areaBars',
        component: areaBars,
        name: '区域分布柱图'
    },
    {
        path: '/curveBars',
        component: curveBars,
        name: '曲线柱图'
    },
    {
        path: '/stackedBar',
        component: stackedBar,
        name: '覆盖柱图'
    },
    {
        path: '/linesTrend',
        component: linesTrend,
        name: '线图趋势图'
    },
    {
        path: '/numberFlip',
        component: numberFlip,
        name: '数字翻盘'
    },
    {
        path: '/originMap',
        component: originMap,
        name: '地域来源图'
    },
    {
        path: '/categoryTabs',
        component: categoryTabs,
        name: '人员类型切换'
    },
    {
        path: '/heatMap',
        component: heatMapComp,
        name: '热力图'
    },
    {
        path: '/historyTimeLine',
        component: historyTimeLine,
        name: 'gis时间轴'
    },
    {
        path: '/r1',
        component: r1,
        name: 'r1'
    },
    {
        path: '/r2',
        component: r2,
        name: 'r2'
    },
    {
        path: '/isChart',
        component: isChart,
        name: 'isChart'
    },
    {
        path: '/echartsBaidu',
        component: echartsBaidu,
        name: 'echartsBaidu'
    },
    {
        path: '/mapAreaMap',
        component: mapAreaMap,
        name: 'mapAreaMap'
    },
    {
        path: '/mapAreaTest',
        component: mapAreaTest,
        name: 'mapAreaTest'
    }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = [{ path: '*', redirect: '/404', hidden: true }]
