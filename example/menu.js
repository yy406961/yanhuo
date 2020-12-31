export const menuData = [
    {
        name: '图表',
        current: true,
        children: [
            { name: '柱图', path: '/barDemo' },
            { name: 'webgl关系图', path: '/graphDemo' },
            { name: '组织关系图', path: '/treeOrg' },
            { name: '3D中国', path: '/map3dChina' },
            { name: '重源网站图表', path: '/isChart' },
            { name: '新政区GIS图', path: '/echartsBaidu' },
            { name: '政区图', path: '/mapAreaMap' }
        ]
    },
    {
        name: '态势感知-重点区域组件',
        current: true,
        children: [
            { name: '热力图', path: '/heatMap' },
            { name: '来源分布地图', path: '/originMap' },
            { name: '数字翻盘', path: 'numberFlip' },
            { name: '趋势折线图', path: 'linesTrend' },
            { name: '地域分布水平柱图', path: 'areaBars' },
            { name: '曲线柱形图', path: 'curveBars' },
            { name: '覆盖柱形图', path: 'stackedBar' },
            { name: '时间轴播放', path: 'timeLines' },
            { name: '人员类型切换', path: 'categoryTabs' }
        ]
    },
    {
        name: '表单',
        current: true,
        children: [{ name: '表单测试', path: '/formDemo' }]
    },
    {
        name: '地图',
        current: true,
        children: [
            { name: '地图区域框选', path: '/mapArea' },
            { name: '海量打点测试', path: '/massPoint' },
            { name: '热力地图', path: '/thermodynamicChart' },
            { name: 'gis时间轴', path: '/historyTimeLine' },
            { name: '测试地图缩放偏移', path: '/mapAreaTest' }
        ]
    },
    {
        name: '表格',
        current: true,
        children: [
            { name: '表格', path: '/tableDemo' },
            { name: '目标号码表格测试', path: '/userNumberManager' }
        ]
    }
]
