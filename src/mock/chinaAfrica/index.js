import Mock from 'mockjs'
let getTotalData = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        dayAllCount: 26400,
        dayCountryCount: 25,
        monthAllCount: 37087,
        monthCountryCount: 34,
        residentCount: 8733,
        newaddCount: 23354
    },
    'rows': [],
    'total': null,
    'api_name': null
})
let getPersonDisData = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        'monthData': [
            { 'area': '尼日利亚', 'count': 305, 'type': 2 },
            { 'area': '肯尼亚', 'count': 247, 'type': 2 },
            { 'area': '埃及', 'count': 160, 'type': 2 },
            { 'area': '南非', 'count': 79, 'type': 2 },
            { 'area': '阿尔及利亚', 'count': 78, 'type': 2 },
            { 'area': '刚果民主共和国', 'count': 77, 'type': 2 },
            { 'area': '乌干达', 'count': 72, 'type': 2 },
            { 'area': '加纳', 'count': 70, 'type': 2 },
            { 'area': '坦桑尼亚联合共和国', 'count': 54, 'type': 2 },
            { 'area': '赞比亚', 'count': 46, 'type': 2 },
            { 'area': '马里', 'count': 39, 'type': 2 },
            { 'area': '科特迪瓦', 'count': 33, 'type': 2 },
            { 'area': '摩洛哥', 'count': 28, 'type': 2 },
            { 'area': '布基纳法索', 'count': 27, 'type': 2 },
            { 'area': '几内亚', 'count': 25, 'type': 2 },
            { 'area': '刚果共和国', 'count': 24, 'type': 2 },
            { 'area': '突尼斯', 'count': 23, 'type': 2 },
            { 'area': '塞内加尔', 'count': 22, 'type': 2 },
            { 'area': '赤道几内亚', 'count': 14, 'type': 2 },
            { 'area': '毛里求斯', 'count': 13, 'type': 2 },
            { 'area': '利比里亚', 'count': 13, 'type': 2 },
            { 'area': '莫桑比克', 'count': 11, 'type': 2 },
            { 'area': '喀麦隆', 'count': 11, 'type': 2 },
            { 'area': '苏丹', 'count': 10, 'type': 2 },
            { 'area': '马达加斯加', 'count': 10, 'type': 2 },
            { 'area': '加蓬', 'count': 9, 'type': 2 },
            { 'area': '津巴布韦', 'count': 9, 'type': 2 },
            { 'area': '查德', 'count': 7, 'type': 2 },
            { 'area': '多哥', 'count': 6, 'type': 2 },
            { 'area': '博茨瓦纳', 'count': 6, 'type': 2 },
            { 'area': '纳米比亚', 'count': 5, 'type': 2 },
            { 'area': '贝宁', 'count': 4, 'type': 2 },
            { 'area': '尼日尔', 'count': 4, 'type': 2 },
            { 'area': '莱索托', 'count': 3, 'type': 2 },
            { 'area': '狮子山共和国', 'count': 2, 'type': 2 },
            { 'area': '卢旺达', 'count': 2, 'type': 2 },
            { 'area': '埃塞俄比亚', 'count': 2, 'type': 2 },
            { 'area': '几内亚比绍', 'count': 2, 'type': 2 },
            { 'area': '塞舌尔', 'count': 2, 'type': 2 },
            { 'area': '吉布提', 'count': 2, 'type': 2 },
            { 'area': '马拉维', 'count': 1, 'type': 2 },
            { 'area': '佛得角', 'count': 1, 'type': 2 },
            { 'area': '厄立特里亚', 'count': 1, 'type': 2 },
            { 'area': '毛里塔尼亚', 'count': 1, 'type': 2 },
            { 'area': '南苏丹', 'count': 1, 'type': 2 },
            { 'area': '利比亚', 'count': 1, 'type': 2 },
            { 'area': '圣多美普林西比', 'count': 1, 'type': 2 },
            { 'area': '科摩罗', 'count': 1, 'type': 2 },
            { 'area': '安哥拉', 'count': 1, 'type': 2 },
            { 'area': '冈比亚', 'count': 1, 'type': 2 },
            { 'area': '索马里', 'count': 1, 'type': 2 },
            { 'area': '斯威士兰', 'count': 1, 'type': 2 },
            { 'area': '布隆迪', 'count': 1, 'type': 2 },
            { 'count': 1, 'type': 2 }
        ],
        'dayData': [
            { 'area': '尼日利亚', 'count': 188, 'type': 1 },
            { 'area': '乌干达', 'count': 152, 'type': 1 },
            { 'area': '肯尼亚', 'count': 124, 'type': 1 },
            { 'area': '加纳', 'count': 91, 'type': 1 },
            { 'area': '埃及', 'count': 65, 'type': 1 },
            { 'area': '科特迪瓦', 'count': 46, 'type': 1 },
            { 'area': '南非', 'count': 41, 'type': 1 },
            { 'area': '布基纳法索', 'count': 37, 'type': 1 },
            { 'area': '阿尔及利亚', 'count': 33, 'type': 1 },
            { 'area': '坦桑尼亚联合共和国', 'count': 29, 'type': 1 },
            { 'area': '刚果民主共和国', 'count': 29, 'type': 1 },
            { 'area': '赞比亚', 'count': 28, 'type': 1 },
            { 'area': '塞内加尔', 'count': 25, 'type': 1 },
            { 'area': '马里', 'count': 23, 'type': 1 },
            { 'area': '马达加斯加', 'count': 21, 'type': 1 },
            { 'area': '几内亚', 'count': 20, 'type': 1 },
            { 'area': '贝宁', 'count': 19, 'type': 1 },
            { 'area': '安哥拉', 'count': 19, 'type': 1 },
            { 'area': '赤道几内亚', 'count': 15, 'type': 1 },
            { 'area': '喀麦隆', 'count': 15, 'type': 1 },
            { 'area': '摩洛哥', 'count': 13, 'type': 1 },
            { 'area': '苏丹', 'count': 9, 'type': 1 },
            { 'area': '卢旺达', 'count': 9, 'type': 1 },
            { 'area': '突尼斯', 'count': 8, 'type': 1 },
            { 'area': '多哥', 'count': 8, 'type': 1 },
            { 'area': '莱索托', 'count': 8, 'type': 1 },
            { 'area': '博茨瓦纳', 'count': 8, 'type': 1 },
            { 'area': '毛里求斯', 'count': 7, 'type': 1 },
            { 'area': '利比里亚', 'count': 7, 'type': 1 },
            { 'area': '纳米比亚', 'count': 7, 'type': 1 },
            { 'area': '加蓬', 'count': 6, 'type': 1 },
            { 'area': '刚果共和国', 'count': 6, 'type': 1 },
            { 'area': '吉布提', 'count': 5, 'type': 1 },
            { 'area': '塞舌尔', 'count': 3, 'type': 1 },
            { 'area': '莫桑比克', 'count': 3, 'type': 1 },
            { 'area': '尼日尔', 'count': 2, 'type': 1 },
            { 'area': '津巴布韦', 'count': 2, 'type': 1 },
            { 'area': '几内亚比绍', 'count': 1, 'type': 1 },
            { 'area': '埃塞俄比亚', 'count': 1, 'type': 1 },
            { 'area': '查德', 'count': 1, 'type': 1 },
            { 'area': '冈比亚', 'count': 1, 'type': 1 }
        ],
        'newadd': [],
        'resident': []
    },
    'rows': null,
    'total': null,
    'api_name': null
})
let getPointData = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': null,
    'rows': [
        { area: '埃及', count: 993 },
        { area: '南非', count: 800 },
        { area: '坦桑尼亚联合共和国', count: 700 },
        { area: '埃塞俄比亚', count: 600 },
        { area: '苏丹', count: 1 }
    ],
    'total': 1,
    'api_name': null
})
let getLineData = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        'dayData': [
            {
                'value': 5000,
                'time': '2019-06-09 17:00:13'
            },
            {
                'value': 4500,
                'time': '2019-06-11 17:00:13'
            },
            {
                'value': 4900,
                'time': '2019-06-12 17:00:13'
            },
            {
                'value': 5100,
                'time': '2019-06-13 17:00:13'
            },
            {
                'value': 5500,
                'time': '2019-06-14 17:00:13'
            },
            {
                'value': 6000,
                'time': '2019-06-15 17:00:13'
            },
            {
                'value': 5800,
                'time': '2019-06-16 17:00:13'
            }
        ],
        'monthData': [
            {
                'value': 5000,
                'time': '2019-06-09 17:00:13'
            },
            {
                'value': 4500,
                'time': '2019-06-11 17:00:13'
            },
            {
                'value': 4900,
                'time': '2019-06-12 17:00:13'
            },
            {
                'value': 5100,
                'time': '2019-06-13 17:00:13'
            },
            {
                'value': 5500,
                'time': '2019-06-14 17:00:13'
            },
            {
                'value': 6000,
                'time': '2019-06-15 17:00:13'
            },
            {
                'value': 5800,
                'time': '2019-06-16 17:00:13'
            }
        ]
    },
    'total': 1,
    'api_name': null
})
let getGisMapData = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': [
        { lon: '113.007839', lat: '28.22063', count: 992, time: '36h' },
        { lon: '112.983046', lat: '28.201149', count: 785, time: '24h' }
    ],
    'total': 1,
    'api_name': null
})
export default {
    getTotalData: () => getTotalData,
    getPersonDisData: () => getPersonDisData,
    getPointData: () => getPointData,
    getLineData: () => getLineData,
    getGisMapData: () => getGisMapData
}
