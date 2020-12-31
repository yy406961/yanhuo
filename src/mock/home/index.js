import Mock from 'mockjs';
// 模拟登录
let selectHome = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': null,
    'rows': [{
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70001,
        'parentId': null,
        'name': '综合态势分析',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    // {
    //     'page': 1,
    //     'rows': 100000000,
    //     'start': 0,
    //     'offset': 0,
    //     'sort': '',
    //     'order': 'desc',
    //     'queryStartTime': '',
    //     'queryEndTime': '',
    //     'ids': '',
    //     'id': 70002,
    //     'parentId': null,
    //     'name': '省内实时态势分析',
    //     'userId': 0,
    //     'oldpwd': null,
    //     'newpwd': null,
    //     'yespwd': null,
    //     'status': 1,
    //     'orgId': null,
    //     'menus': null
    // },
    // {
    //     'page': 1,
    //     'rows': 100000000,
    //     'start': 0,
    //     'offset': 0,
    //     'sort': '',
    //     'order': 'desc',
    //     'queryStartTime': '',
    //     'queryEndTime': '',
    //     'ids': '',
    //     'id': 70003,
    //     'parentId': null,
    //     'name': '省外实时态势分析',
    //     'userId': 0,
    //     'oldpwd': null,
    //     'newpwd': null,
    //     'yespwd': null,
    //     'status': 1,
    //     'orgId': null,
    //     'menus': null
    // },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70010,
        'parentId': null,
        'name': '橘子洲头实时监测',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70011,
        'parentId': null,
        'name': '五一广场实时监测',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70012,
        'parentId': null,
        'name': '岳麓山实时监测',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70013,
        'parentId': null,
        'name': '一山一洲实时监测',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70022,
        'parentId': null,
        'name': '铜向广场',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70023,
        'parentId': null,
        'name': '橘子洲实时监测',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70014,
        'parentId': null,
        'name': '分流管控区域实时监测',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70016,
        'parentId': null,
        'name': '铜像广场实时监测',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70017,
        'parentId': null,
        'name': '韶山景区实时监测',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70018,
        'parentId': null,
        'name': '142实时监测',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70019,
        'parentId': null,
        'name': '143实时监测',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70015,
        'parentId': null,
        'name': '626中非论坛专题',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70020,
        'parentId': null,
        'name': '态势与告警',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70021,
        'parentId': null,
        'name': '信访综合态势',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70024,
        'parentId': null,
        'name': '重点群体',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70025,
        'parentId': null,
        'name': '新增区域',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70026,
        'parentId': null,
        'name': '新增区域',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70027,
        'parentId': null,
        'name': '新增区域',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70028,
        'parentId': null,
        'name': '新增区域',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70029,
        'parentId': null,
        'name': '新增区域',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70030,
        'parentId': null,
        'name': '唐兴寺社区实时态势',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    },
    {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'id': 70031,
        'parentId': null,
        'name': '五爱村实时态势',
        'userId': 0,
        'oldpwd': null,
        'newpwd': null,
        'yespwd': null,
        'status': 1,
        'orgId': null,
        'menus': null
    }],
    'total': 5,
    'api_name': null
});
let moveUserData = Mock.mock({
    'data': {
        'out': 198997,
        'in': 292939,
        'detail': [
        ]
    }
})
let residenceUserData = Mock.mock({
    'rows': [
        { 'name': '浏阳县', 'value': 1278900 },
        { 'name': '宁乡县', 'value': 1168100 },
        { 'name': '长沙县', 'value': 979700 },
        { 'name': '岳麓区', 'value': 801900 },
        { 'name': '雨花区', 'value': 725400 },
        { 'name': '开福区', 'value': 567400 },
        { 'name': '芙蓉区', 'value': 523700 },
        { 'name': '望城县', 'value': 523500 },
        { 'name': '天心区', 'value': 475700 }
    ]
})
let userLineData = Mock.mock({
    'rows': [
        { 'type': 1, 'value': 71829937, 'time': '2019-3-1' },
        { 'type': 2, 'value': 51829937, 'time': '2019-3-1' },
        { 'type': 3, 'value': 21829937, 'time': '2019-3-1' },
        { 'type': 1, 'value': 71829937, 'time': '2019-3-2' },
        { 'type': 2, 'value': 51829937, 'time': '2019-3-2' },
        { 'type': 3, 'value': 21829937, 'time': '2019-3-2' },
        { 'type': 1, 'value': 71829937, 'time': '2019-3-3' },
        { 'type': 2, 'value': 51829937, 'time': '2019-3-3' },
        { 'type': 3, 'value': 21829937, 'time': '2019-3-3' }
    ]
})
let tourUserData = Mock.mock({
    'rows': [
        { 'name': '橘子洲', 'count': 95999, 'type': 0 },
        { 'name': '岳麓山', 'count': 85777, 'type': 0 },
        { 'name': '五一广场', 'count': 765, 'type': 0 },
        { 'name': '天心阁', 'count': 655, 'type': 0 },
        { 'name': '长沙世界之窗', 'count': 55, 'type': 0 },
        { 'name': '海港一', 'count': 950080, 'type': 1 },
        { 'name': '海港二', 'count': 8507, 'type': 1 },
        { 'name': '海港三', 'count': 750, 'type': 1 },
        { 'name': '海港四', 'count': 650, 'type': 1 },
        { 'name': '海港五', 'count': 55, 'type': 1 }
    ]
})

let allUserCount = Mock.mock({
    'rows': [
        { 'name': '实时总人数', 'value': 13459087, type: 1 },
        { 'name': '常驻人数', 'value': 2389412, type: 2 },
        { 'name': '流动人数', 'value': 485641, type: 3 },
        { 'name': '过境人数', 'value': 94023, type: 9 },
        { 'name': '旅游人数', 'value': 196966, type: 4 },
        { 'name': '特定少数名族人数', 'value': 4549, type: 6 },
        { 'name': '境外人数', 'value': 3049, type: 5 }
    ]
})
let userSourceData = Mock.mock({
    'rows': [
        { 'name': '广东', 'count': 95, 'type': 0 },
        { 'name': '江西', 'count': 85, 'type': 0 },
        { 'name': '黑龙江', 'count': 75, 'type': 0 },
        { 'name': '广西', 'count': 65, 'type': 0 },
        { 'name': '贵州', 'count': 55, 'type': 0 },
        { 'name': '湖北', 'count': 45, 'type': 0 },
        { 'name': '日本', 'count': 95, 'type': 1 },
        { 'name': '美国', 'count': 85, 'type': 1 },
        { 'name': '加拿大', 'count': 75, 'type': 1 },
        { 'name': '英国', 'count': 65, 'type': 1 },
        { 'name': '俄罗斯', 'count': 55, 'type': 1 },
        { 'name': '印度', 'count': 45, 'type': 1 }
    ]
})
let populationMinutes = Mock.mock({
    'rows': [
        { 'lon': 110.432173, 'lat': 27.914, 'count': 300, 'type': 0 },
        { 'lon': 110.452173, 'lat': 26.954, 'count': 50, 'type': 0 },
        { 'lon': 110.502173, 'lat': 25.954, 'count': 1, 'type': 0 }
    ]
})
let populationDay = Mock.mock({
    'rows': [
        { 'type': 2, 'lat': '28.179667', 'lon': '112.885864', 'count': 300 }, {
            'type': 2,
            'lat': '28.083263',
            'lon': '112.859909',
            'count': 152
        }, { 'type': 2, 'lat': '28.218896', 'lon': '113.028835', 'count': 264 }, {
            'type': 2,
            'lat': '28.325057',
            'lon': '113.053068',
            'count': 243
        }, { 'type': 2, 'lat': '28.236864', 'lon': '113.028259', 'count': 39 }, {
            'type': 2,
            'lat': '28.278516',
            'lon': '113.138068',
            'count': 150
        }, { 'type': 2, 'lat': '28.09139', 'lon': '113.037397', 'count': 291 }, {
            'type': 2,
            'lat': '28.310774',
            'lon': '113.097906',
            'count': 264
        }, { 'type': 2, 'lat': '28.085459', 'lon': '113.119871', 'count': 275 }, {
            'type': 2,
            'lat': '28.089595',
            'lon': '113.013772',
            'count': 82
        }, { 'type': 2, 'lat': '28.272100000000002', 'lon': '113.044942', 'count': 220 }, {
            'type': 2,
            'lat': '28.149367',
            'lon': '113.12248',
            'count': 30
        }, { 'type': 2, 'lat': '28.229404', 'lon': '113.124743', 'count': 99 }, {
            'type': 2,
            'lat': '28.249229',
            'lon': '113.108898',
            'count': 276
        }, { 'type': 2, 'lat': '28.31272', 'lon': '113.116885', 'count': 116 }, {
            'type': 2,
            'lat': '28.16579',
            'lon': '113.028465',
            'count': 125
        }, { 'type': 2, 'lat': '28.243181', 'lon': '113.045079', 'count': 199 }, {
            'type': 2,
            'lat': '28.17542',
            'lon': '113.082045',
            'count': 197
        }, { 'type': 2, 'lat': '28.304582', 'lon': '113.027605', 'count': 11 }, {
            'type': 2,
            'lat': '28.173252',
            'lon': '113.110707',
            'count': 138
        }, { 'type': 2, 'lat': '28.265282', 'lon': '113.020731', 'count': 104 }, {
            'type': 2,
            'lat': '28.227403',
            'lon': '113.00435',
            'count': 245
        }, { 'type': 2, 'lat': '28.161513', 'lon': '113.103222', 'count': 159 }, {
            'type': 2,
            'lat': '28.142429',
            'lon': '113.067376',
            'count': 52
        }, { 'type': 2, 'lat': '28.204444', 'lon': '113.095302', 'count': 242 }, {
            'type': 2,
            'lat': '28.134022',
            'lon': '113.08952',
            'count': 102
        }, { 'type': 2, 'lat': '28.270111', 'lon': '113.001252', 'count': 137 }, {
            'type': 2,
            'lat': '28.189718',
            'lon': '113.079491',
            'count': 151
        }, { 'type': 2, 'lat': '28.337627', 'lon': '113.128683', 'count': 30 }, {
            'type': 2,
            'lat': '28.167737',
            'lon': '113.088901',
            'count': 115
        }, { 'type': 2, 'lat': '28.318605', 'lon': '113.039209', 'count': 289 }, {
            'type': 2,
            'lat': '28.269901',
            'lon': '113.040687',
            'count': 189
        }, { 'type': 2, 'lat': '28.288956', 'lon': '113.014274', 'count': 293 }, {
            'type': 2,
            'lat': '28.147092',
            'lon': '113.098107',
            'count': 210
        }, { 'type': 2, 'lat': '28.18358', 'lon': '113.053034', 'count': 231 }, {
            'type': 2,
            'lat': '28.200327',
            'lon': '113.073617',
            'count': 40
        }, { 'type': 2, 'lat': '28.190328', 'lon': '113.1235', 'count': 168 }, {
            'type': 2,
            'lat': '28.111477',
            'lon': '113.082298',
            'count': 280
        }, { 'type': 2, 'lat': '28.11894', 'lon': '113.140588', 'count': 74 }, {
            'type': 2,
            'lat': '28.152153',
            'lon': '113.099064',
            'count': 251
        }, { 'type': 2, 'lat': '28.257536', 'lon': '113.085799', 'count': 169 }, {
            'type': 2,
            'lat': '28.106312',
            'lon': '113.026028',
            'count': 42
        }, { 'type': 2, 'lat': '28.317893', 'lon': '113.033713', 'count': 206 }, {
            'type': 2,
            'lat': '28.173119',
            'lon': '113.052025',
            'count': 34
        }, { 'type': 2, 'lat': '28.223989', 'lon': '113.011283', 'count': 158 }, {
            'type': 2,
            'lat': '28.098952',
            'lon': '113.082713',
            'count': 142
        }, { 'type': 2, 'lat': '28.153959', 'lon': '113.033415', 'count': 11 }, {
            'type': 2,
            'lat': '28.272412',
            'lon': '113.00112',
            'count': 188
        }, { 'type': 2, 'lat': '28.132653', 'lon': '113.080925', 'count': 43 }, {
            'type': 2,
            'lat': '28.137617',
            'lon': '113.048222',
            'count': 270
        }, { 'type': 2, 'lat': '28.309795', 'lon': '113.008948', 'count': 112 }, {
            'type': 2,
            'lat': '28.237679',
            'lon': '113.04951',
            'count': 146
        }, { 'type': 2, 'lat': '28.270398', 'lon': '113.082562', 'count': 80 }, {
            'type': 2,
            'lat': '28.17694',
            'lon': '113.009344',
            'count': 104
        }, { 'type': 2, 'lat': '28.160135', 'lon': '113.090793', 'count': 37 }, {
            'type': 2,
            'lat': '28.246433',
            'lon': '113.084428',
            'count': 192
        }, { 'type': 2, 'lat': '28.333564', 'lon': '113.014351', 'count': 159 }, {
            'type': 2,
            'lat': '28.282818',
            'lon': '113.07922',
            'count': 23
        }, { 'type': 2, 'lat': '28.202684', 'lon': '113.051624', 'count': 202 }, {
            'type': 2,
            'lat': '28.330951',
            'lon': '113.109216',
            'count': 41
        }, { 'type': 2, 'lat': '28.251464', 'lon': '113.041801', 'count': 53 }, {
            'type': 2,
            'lat': '28.12747',
            'lon': '113.051957',
            'count': 32
        }, { 'type': 2, 'lat': '28.231924', 'lon': '113.031597', 'count': 146 }, {
            'type': 2,
            'lat': '28.322729',
            'lon': '113.07129',
            'count': 89
        }, { 'type': 2, 'lat': '28.160769', 'lon': '113.010461', 'count': 223 }, {
            'type': 2,
            'lat': '28.280753',
            'lon': '113.001143',
            'count': 131
        }, { 'type': 2, 'lat': '28.15127', 'lon': '113.017756', 'count': 6 }, {
            'type': 2,
            'lat': '28.209334',
            'lon': '113.046157',
            'count': 289
        }, { 'type': 2, 'lat': '28.173862', 'lon': '113.104993', 'count': 188 }, {
            'type': 2,
            'lat': '28.097876',
            'lon': '113.125072',
            'count': 172
        }, { 'type': 2, 'lat': '28.133677', 'lon': '113.051039', 'count': 118 }, {
            'type': 2,
            'lat': '28.338729',
            'lon': '113.026602',
            'count': 121
        }, { 'type': 2, 'lat': '28.084956', 'lon': '113.04422', 'count': 54 }, {
            'type': 2,
            'lat': '28.159878',
            'lon': '113.136393',
            'count': 287
        }, { 'type': 2, 'lat': '28.28296', 'lon': '113.047922', 'count': 83 }, {
            'type': 2,
            'lat': '28.335206',
            'lon': '113.077439',
            'count': 129
        }, { 'type': 2, 'lat': '28.155639', 'lon': '113.099295', 'count': 190 }, {
            'type': 2,
            'lat': '28.215931',
            'lon': '113.069616',
            'count': 91
        }, { 'type': 2, 'lat': '28.231902', 'lon': '113.104062', 'count': 46 }, {
            'type': 2,
            'lat': '28.113071',
            'lon': '113.054115',
            'count': 5
        }, { 'type': 2, 'lat': '28.327736', 'lon': '113.105913', 'count': 205 }, {
            'type': 2,
            'lat': '28.138118',
            'lon': '113.072108',
            'count': 38
        }, { 'type': 2, 'lat': '28.186621', 'lon': '113.040953', 'count': 174 }, {
            'type': 2,
            'lat': '28.18977',
            'lon': '113.02403',
            'count': 273
        }, { 'type': 2, 'lat': '28.291205', 'lon': '113.036027', 'count': 160 }, {
            'type': 2,
            'lat': '28.281354',
            'lon': '113.107922',
            'count': 41
        }, { 'type': 2, 'lat': '28.307158', 'lon': '113.055025', 'count': 243 }, {
            'type': 2,
            'lat': '28.33495',
            'lon': '113.125607',
            'count': 127
        }, { 'type': 2, 'lat': '28.259349', 'lon': '113.095498', 'count': 104 }, {
            'type': 2,
            'lat': '28.248045',
            'lon': '113.08353',
            'count': 261
        }, { 'type': 2, 'lat': '28.103141', 'lon': '113.025205', 'count': 284 }, {
            'type': 2,
            'lat': '28.240458',
            'lon': '113.047895',
            'count': 282
        }, { 'type': 2, 'lat': '28.315556', 'lon': '113.036844', 'count': 18 }, {
            'type': 2,
            'lat': '28.15774',
            'lon': '113.038197',
            'count': 275
        }, { 'type': 2, 'lat': '28.091786', 'lon': '113.025527', 'count': 298 }, {
            'type': 2,
            'lat': '28.182327',
            'lon': '113.034715',
            'count': 188
        }, { 'type': 2, 'lat': '28.098575', 'lon': '113.09739', 'count': 226 }, {
            'type': 2,
            'lat': '28.322418',
            'lon': '113.019698',
            'count': 98
        }, { 'type': 2, 'lat': '28.193594', 'lon': '113.004189', 'count': 164 }, {
            'type': 2,
            'lat': '28.192284',
            'lon': '113.067416',
            'count': 289
        }, { 'type': 2, 'lat': '28.284521', 'lon': '113.120708', 'count': 241 }, {
            'type': 2,
            'lat': '28.163914',
            'lon': '113.099718',
            'count': 44
        }, { 'type': 2, 'lat': '28.133807', 'lon': '113.020737', 'count': 40 }, {
            'type': 2,
            'lat': '28.122664',
            'lon': '113.03058',
            'count': 289
        }, { 'type': 2, 'lat': '28.141154', 'lon': '113.108059', 'count': 253 }, {
            'type': 2,
            'lat': '28.242752',
            'lon': '113.001273',
            'count': 38
        }, { 'type': 2, 'lat': '28.156137', 'lon': '113.045375', 'count': 40 }, {
            'type': 2,
            'lat': '28.094439',
            'lon': '113.103637',
            'count': 144
        }, { 'type': 2, 'lat': '28.116372', 'lon': '113.121046', 'count': 58 }, {
            'type': 2,
            'lat': '28.213744',
            'lon': '113.133668',
            'count': 112
        }, { 'type': 2, 'lat': '28.138971', 'lon': '113.020383', 'count': 212 }, {
            'type': 2,
            'lat': '28.212894',
            'lon': '113.093741',
            'count': 272
        }, { 'type': 2, 'lat': '28.117768', 'lon': '113.109033', 'count': 238 }, {
            'type': 2,
            'lat': '28.312534',
            'lon': '113.029073',
            'count': 292
        }, { 'type': 2, 'lat': '28.310309', 'lon': '113.051764', 'count': 194 }, {
            'type': 2,
            'lat': '28.260907',
            'lon': '113.022587',
            'count': 28
        }, { 'type': 2, 'lat': '28.271381', 'lon': '113.140116', 'count': 121 }, {
            'type': 2,
            'lat': '28.312008',
            'lon': '113.091145',
            'count': 212
        }, { 'type': 2, 'lat': '28.191352', 'lon': '113.077445', 'count': 99 }, {
            'type': 2,
            'lat': '28.088004',
            'lon': '113.132457',
            'count': 239
        }, { 'type': 2, 'lat': '28.228211', 'lon': '113.132598', 'count': 16 }, {
            'type': 2,
            'lat': '28.269579',
            'lon': '113.030802',
            'count': 276
        }, { 'type': 2, 'lat': '28.305871', 'lon': '113.015894', 'count': 124 }, {
            'type': 2,
            'lat': '28.306061',
            'lon': '113.08186',
            'count': 31
        }, { 'type': 2, 'lat': '28.098112', 'lon': '113.089719', 'count': 164 }, {
            'type': 2,
            'lat': '28.122058',
            'lon': '113.101618',
            'count': 150
        }, { 'type': 2, 'lat': '28.127986', 'lon': '113.106393', 'count': 186 }, {
            'type': 2,
            'lat': '28.231178',
            'lon': '113.014007',
            'count': 265
        }, { 'type': 2, 'lat': '28.220834', 'lon': '113.016649', 'count': 119 }, {
            'type': 2,
            'lat': '28.15865',
            'lon': '113.100767',
            'count': 34
        }, { 'type': 2, 'lat': '28.248359', 'lon': '113.138534', 'count': 187 }, {
            'type': 2,
            'lat': '28.191824',
            'lon': '113.128462',
            'count': 226
        }, { 'type': 2, 'lat': '28.100982', 'lon': '113.076145', 'count': 34 }, {
            'type': 2,
            'lat': '28.256838',
            'lon': '113.071546',
            'count': 122
        }, { 'type': 2, 'lat': '28.14016', 'lon': '113.079222', 'count': 263 }, {
            'type': 2,
            'lat': '28.318227',
            'lon': '113.040295',
            'count': 144
        }, { 'type': 2, 'lat': '28.186946', 'lon': '113.042977', 'count': 232 }, {
            'type': 2,
            'lat': '28.319943',
            'lon': '113.09523',
            'count': 291
        }, { 'type': 2, 'lat': '28.338827', 'lon': '113.081723', 'count': 194 }, {
            'type': 2,
            'lat': '28.109047',
            'lon': '113.040487',
            'count': 11
        }, { 'type': 2, 'lat': '28.131402', 'lon': '113.10203', 'count': 45 }, {
            'type': 2,
            'lat': '28.332629',
            'lon': '113.097928',
            'count': 50
        }, { 'type': 2, 'lat': '28.134464', 'lon': '113.077556', 'count': 71 }, {
            'type': 2,
            'lat': '28.114682',
            'lon': '113.0396',
            'count': 4
        }, { 'type': 2, 'lat': '28.247525', 'lon': '113.066679', 'count': 45 }, {
            'type': 2,
            'lat': '28.179195',
            'lon': '113.106489',
            'count': 284
        }, { 'type': 2, 'lat': '28.286694', 'lon': '113.004648', 'count': 115 }, {
            'type': 2,
            'lat': '28.333956',
            'lon': '113.104857',
            'count': 3
        }, { 'type': 2, 'lat': '28.325108', 'lon': '113.066964', 'count': 158 }, {
            'type': 2,
            'lat': '28.271443',
            'lon': '113.117641',
            'count': 74
        }, { 'type': 2, 'lat': '28.292842', 'lon': '113.141483', 'count': 285 }, {
            'type': 2,
            'lat': '28.110213',
            'lon': '113.000503',
            'count': 207
        }, { 'type': 2, 'lat': '28.30356', 'lon': '113.033868', 'count': 50 }, {
            'type': 2,
            'lat': '28.197117',
            'lon': '113.053787',
            'count': 30
        }, { 'type': 2, 'lat': '28.094227', 'lon': '113.103566', 'count': 1 }, {
            'type': 2,
            'lat': '28.244111',
            'lon': '113.120065',
            'count': 143
        }, { 'type': 2, 'lat': '28.103968', 'lon': '113.032421', 'count': 299 }, {
            'type': 2,
            'lat': '28.192063',
            'lon': '113.065185',
            'count': 247
        }, { 'type': 2, 'lat': '28.215023', 'lon': '113.113602', 'count': 72 }, {
            'type': 2,
            'lat': '28.251942',
            'lon': '113.082346',
            'count': 251
        }, { 'type': 2, 'lat': '28.149683', 'lon': '113.120494', 'count': 279 }, {
            'type': 2,
            'lat': '28.22258',
            'lon': '113.130768',
            'count': 187
        }, { 'type': 2, 'lat': '28.333845', 'lon': '113.022145', 'count': 210 }, {
            'type': 2,
            'lat': '28.191993',
            'lon': '113.030674',
            'count': 16
        }, { 'type': 2, 'lat': '28.157732', 'lon': '113.131229', 'count': 83 }, {
            'type': 2,
            'lat': '28.134135',
            'lon': '113.043136',
            'count': 162
        }, { 'type': 2, 'lat': '28.285573', 'lon': '113.135587', 'count': 159 }, {
            'type': 2,
            'lat': '28.250861',
            'lon': '113.038037',
            'count': 210
        }, { 'type': 2, 'lat': '28.284529', 'lon': '113.008513', 'count': 167 }, {
            'type': 2,
            'lat': '28.166927',
            'lon': '113.001085',
            'count': 251
        }, { 'type': 2, 'lat': '28.17155', 'lon': '113.110097', 'count': 82 }, {
            'type': 2,
            'lat': '28.218064',
            'lon': '113.097605',
            'count': 298
        }, { 'type': 2, 'lat': '28.289312', 'lon': '113.092358', 'count': 2 }, {
            'type': 2,
            'lat': '28.27617',
            'lon': '113.14212',
            'count': 201
        }, { 'type': 2, 'lat': '28.183563', 'lon': '113.000565', 'count': 120 }, {
            'type': 2,
            'lat': '28.274944',
            'lon': '113.119883',
            'count': 116
        }, { 'type': 2, 'lat': '28.201169', 'lon': '113.10307', 'count': 255 }, {
            'type': 2,
            'lat': '28.124006',
            'lon': '113.07814',
            'count': 62
        }, { 'type': 2, 'lat': '28.262302', 'lon': '113.004074', 'count': 44 }, {
            'type': 2,
            'lat': '28.090464',
            'lon': '113.138279',
            'count': 250
        }, { 'type': 2, 'lat': '28.226716', 'lon': '113.079406', 'count': 82 }, {
            'type': 2,
            'lat': '28.088798',
            'lon': '113.107828',
            'count': 200
        }, { 'type': 2, 'lat': '28.106873', 'lon': '113.076575', 'count': 256 }, {
            'type': 2,
            'lat': '28.117651',
            'lon': '113.085622',
            'count': 298
        }, { 'type': 2, 'lat': '28.277819', 'lon': '113.139433', 'count': 224 }, {
            'type': 2,
            'lat': '28.265239',
            'lon': '113.083848',
            'count': 280
        }, { 'type': 2, 'lat': '28.265897', 'lon': '113.101382', 'count': 58 }, {
            'type': 2,
            'lat': '28.262462',
            'lon': '113.01801',
            'count': 267
        }, { 'type': 2, 'lat': '28.247142', 'lon': '113.00798', 'count': 262 }, {
            'type': 2,
            'lat': '28.162272',
            'lon': '113.132241',
            'count': 15
        }, { 'type': 2, 'lat': '28.104969', 'lon': '113.106956', 'count': 299 }, {
            'type': 2,
            'lat': '28.328405',
            'lon': '113.129504',
            'count': 274
        }, { 'type': 2, 'lat': '28.260616', 'lon': '113.141721', 'count': 85 }, {
            'type': 2,
            'lat': '28.303984',
            'lon': '113.048765',
            'count': 296
        }, { 'type': 2, 'lat': '28.245083', 'lon': '113.061023', 'count': 127 }, {
            'type': 2,
            'lat': '28.275113',
            'lon': '113.037928',
            'count': 25
        }, { 'type': 2, 'lat': '28.30185', 'lon': '113.078486', 'count': 213 }, {
            'type': 2,
            'lat': '28.113127',
            'lon': '113.103808',
            'count': 124
        }, { 'type': 2, 'lat': '28.259995', 'lon': '113.0638', 'count': 256 }, {
            'type': 2,
            'lat': '28.160113',
            'lon': '113.096464',
            'count': 277
        }, { 'type': 2, 'lat': '28.206035', 'lon': '113.035205', 'count': 173 }, {
            'type': 2,
            'lat': '28.30257',
            'lon': '113.011152',
            'count': 64
        }, { 'type': 2, 'lat': '28.086786', 'lon': '112.949112', 'count': 163 }, {
            'type': 2,
            'lat': '28.2825',
            'lon': '112.942508',
            'count': 165
        }, { 'type': 2, 'lat': '28.227191', 'lon': '112.852734', 'count': 288 }, {
            'type': 2,
            'lat': '28.154988',
            'lon': '112.953847',
            'count': 205
        }, { 'type': 2, 'lat': '28.220763', 'lon': '112.851963', 'count': 168 }, {
            'type': 2,
            'lat': '28.206524',
            'lon': '112.943576',
            'count': 257
        }, { 'type': 2, 'lat': '28.227065', 'lon': '112.95825', 'count': 148 }, {
            'type': 2,
            'lat': '28.196025',
            'lon': '112.947519',
            'count': 239
        }, { 'type': 2, 'lat': '28.208461', 'lon': '112.830489', 'count': 239 }, {
            'type': 2,
            'lat': '28.226069',
            'lon': '112.923047',
            'count': 186
        }, { 'type': 2, 'lat': '28.338145', 'lon': '112.829856', 'count': 145 }, {
            'type': 2,
            'lat': '28.179296',
            'lon': '112.88578',
            'count': 178
        }, { 'type': 2, 'lat': '28.220322', 'lon': '112.851142', 'count': 166 }, {
            'type': 2,
            'lat': '28.153487',
            'lon': '112.960414',
            'count': 111
        }, { 'type': 2, 'lat': '28.118984', 'lon': '112.84188', 'count': 252 }, {
            'type': 2,
            'lat': '28.215805',
            'lon': '112.956809',
            'count': 165
        }, { 'type': 2, 'lat': '28.173464', 'lon': '112.951104', 'count': 169 }, {
            'type': 2,
            'lat': '28.330249',
            'lon': '112.823295',
            'count': 231
        }, { 'type': 2, 'lat': '28.291727', 'lon': '112.977552', 'count': 195 }, {
            'type': 2,
            'lat': '28.133903',
            'lon': '112.87085',
            'count': 159
        }, { 'type': 2, 'lat': '28.105364', 'lon': '112.849741', 'count': 237 }, {
            'type': 2,
            'lat': '28.217781',
            'lon': '112.863802',
            'count': 188
        }, { 'type': 2, 'lat': '28.251473', 'lon': '112.858492', 'count': 293 }, {
            'type': 2,
            'lat': '28.256597',
            'lon': '112.877234',
            'count': 180
        }, { 'type': 2, 'lat': '28.152104', 'lon': '112.865442', 'count': 291 }, {
            'type': 2,
            'lat': '28.285526',
            'lon': '112.992808',
            'count': 109
        }, { 'type': 2, 'lat': '28.084582', 'lon': '112.86091', 'count': 104 }, {
            'type': 2,
            'lat': '28.313431',
            'lon': '112.858093',
            'count': 259
        }, { 'type': 2, 'lat': '28.109491', 'lon': '112.936077', 'count': 204 }, {
            'type': 2,
            'lat': '28.141118',
            'lon': '112.852423',
            'count': 284
        }, { 'type': 2, 'lat': '28.250323', 'lon': '112.952405', 'count': 213 }, {
            'type': 2,
            'lat': '28.250778',
            'lon': '112.948277',
            'count': 161
        }, { 'type': 2, 'lat': '28.092885', 'lon': '112.894304', 'count': 279 }, {
            'type': 2,
            'lat': '28.18826',
            'lon': '112.981892',
            'count': 280
        }, { 'type': 2, 'lat': '28.148389', 'lon': '112.850899', 'count': 119 }, {
            'type': 2,
            'lat': '28.139122',
            'lon': '112.86575500000001',
            'count': 288
        }, { 'type': 2, 'lat': '28.258918', 'lon': '112.993314', 'count': 248 }, {
            'type': 2,
            'lat': '28.129232000000002',
            'lon': '112.870624',
            'count': 285
        }, { 'type': 2, 'lat': '28.121491', 'lon': '112.870429', 'count': 177 }, {
            'type': 2,
            'lat': '28.223209',
            'lon': '112.814801',
            'count': 218
        }, { 'type': 2, 'lat': '28.27588', 'lon': '112.881413', 'count': 145 }, {
            'type': 2,
            'lat': '28.129157',
            'lon': '112.948744',
            'count': 189
        }, { 'type': 2, 'lat': '28.115655', 'lon': '112.820628', 'count': 258 }, {
            'type': 2,
            'lat': '28.317386',
            'lon': '112.945826',
            'count': 178
        }, { 'type': 2, 'lat': '28.278551', 'lon': '112.922846', 'count': 200 }, {
            'type': 2,
            'lat': '28.226812',
            'lon': '112.84882',
            'count': 236
        }, { 'type': 2, 'lat': '28.159227', 'lon': '112.990767', 'count': 250 }, {
            'type': 2,
            'lat': '28.338985',
            'lon': '112.907107',
            'count': 166
        }, { 'type': 2, 'lat': '28.299046', 'lon': '112.836871', 'count': 241 }, {
            'type': 2,
            'lat': '28.083857',
            'lon': '112.988406',
            'count': 114
        }, { 'type': 2, 'lat': '28.277405', 'lon': '112.978221', 'count': 283 }, {
            'type': 2,
            'lat': '28.122624',
            'lon': '112.976543',
            'count': 207
        }, { 'type': 2, 'lat': '28.293329', 'lon': '112.871118', 'count': 240 }, {
            'type': 2,
            'lat': '28.228484',
            'lon': '112.873312',
            'count': 180
        }, { 'type': 2, 'lat': '28.137395', 'lon': '112.818293', 'count': 227 }, {
            'type': 2,
            'lat': '28.166017',
            'lon': '112.868063',
            'count': 229
        }, { 'type': 2, 'lat': '28.105291', 'lon': '112.92971', 'count': 193 }, {
            'type': 2,
            'lat': '28.131722',
            'lon': '112.880924',
            'count': 217
        }, { 'type': 2, 'lat': '28.242948', 'lon': '112.862396', 'count': 222 }, {
            'type': 2,
            'lat': '28.161106',
            'lon': '112.812093',
            'count': 213
        }, { 'type': 2, 'lat': '28.222066', 'lon': '112.879542', 'count': 204 }, {
            'type': 2,
            'lat': '28.238979',
            'lon': '112.908853',
            'count': 230
        }, { 'type': 2, 'lat': '28.222304', 'lon': '112.937204', 'count': 134 }, {
            'type': 2,
            'lat': '28.236976',
            'lon': '112.868757',
            'count': 190
        }, { 'type': 2, 'lat': '28.214366', 'lon': '112.941527', 'count': 195 }, {
            'type': 2,
            'lat': '28.13319',
            'lon': '112.938053',
            'count': 117
        }, { 'type': 2, 'lat': '28.301766', 'lon': '112.868942', 'count': 243 }, {
            'type': 2,
            'lat': '28.090198',
            'lon': '112.862636',
            'count': 158
        }, { 'type': 2, 'lat': '28.110891', 'lon': '112.896367', 'count': 284 }, {
            'type': 2,
            'lat': '28.215662',
            'lon': '112.90784',
            'count': 191
        }, { 'type': 2, 'lat': '28.141691', 'lon': '112.991587', 'count': 149 }, {
            'type': 2,
            'lat': '28.218438',
            'lon': '112.963817',
            'count': 236
        }, { 'type': 2, 'lat': '28.241133', 'lon': '112.849134', 'count': 280 }, {
            'type': 2,
            'lat': '28.276834',
            'lon': '112.931778',
            'count': 233
        }, { 'type': 2, 'lat': '28.297074', 'lon': '112.884521', 'count': 230 }, {
            'type': 2,
            'lat': '28.086252',
            'lon': '112.927942',
            'count': 110
        }, { 'type': 2, 'lat': '28.273111', 'lon': '112.923618', 'count': 232 }, {
            'type': 2,
            'lat': '28.229663',
            'lon': '112.963262',
            'count': 200
        }, { 'type': 2, 'lat': '28.246505', 'lon': '112.954644', 'count': 124 }, {
            'type': 2,
            'lat': '28.0846',
            'lon': '112.884115',
            'count': 252
        }, { 'type': 2, 'lat': '28.281141', 'lon': '112.971346', 'count': 263 }, {
            'type': 2,
            'lat': '28.250578',
            'lon': '112.886238',
            'count': 100
        }, { 'type': 2, 'lat': '28.164617', 'lon': '112.837965', 'count': 103 }, {
            'type': 2,
            'lat': '28.188323',
            'lon': '112.994086',
            'count': 194
        }, { 'type': 2, 'lat': '28.106109', 'lon': '112.889767', 'count': 133 }, {
            'type': 2,
            'lat': '28.236812',
            'lon': '112.837477',
            'count': 280
        }, { 'type': 2, 'lat': '28.233466', 'lon': '112.899273', 'count': 180 }, {
            'type': 2,
            'lat': '28.193567',
            'lon': '112.888078',
            'count': 246
        }, { 'type': 2, 'lat': '28.199128', 'lon': '112.925478', 'count': 128 }, {
            'type': 2,
            'lat': '28.194466',
            'lon': '112.876403',
            'count': 219
        }, { 'type': 2, 'lat': '28.177755', 'lon': '112.878087', 'count': 218 }, {
            'type': 2,
            'lat': '28.108449',
            'lon': '112.853406',
            'count': 116
        }, { 'type': 2, 'lat': '28.324745', 'lon': '112.993307', 'count': 164 }, {
            'type': 2,
            'lat': '28.279275',
            'lon': '112.949634',
            'count': 271
        }, { 'type': 2, 'lat': '28.251325', 'lon': '112.815543', 'count': 256 }, {
            'type': 2,
            'lat': '28.18812',
            'lon': '112.82218',
            'count': 105
        }, { 'type': 2, 'lat': '28.161235', 'lon': '112.994533', 'count': 282 }, {
            'type': 2,
            'lat': '28.099832',
            'lon': '112.921438',
            'count': 105
        }, { 'type': 2, 'lat': '28.192766', 'lon': '112.855112', 'count': 100 }, {
            'type': 2,
            'lat': '28.194341',
            'lon': '112.901649',
            'count': 87
        }, { 'type': 2, 'lat': '28.198814', 'lon': '112.969022', 'count': 32 }, {
            'type': 2,
            'lat': '28.272569',
            'lon': '112.85392',
            'count': 77
        }, { 'type': 2, 'lat': '28.243463', 'lon': '112.860018', 'count': 27 }, {
            'type': 2,
            'lat': '28.197003',
            'lon': '112.962667',
            'count': 96
        }, { 'type': 2, 'lat': '28.19347', 'lon': '112.913451', 'count': 41 }, {
            'type': 2,
            'lat': '28.139998',
            'lon': '112.866297',
            'count': 42
        }, { 'type': 2, 'lat': '28.259307', 'lon': '112.84706', 'count': 42 }, {
            'type': 2,
            'lat': '28.157705',
            'lon': '112.899631',
            'count': 45
        }, { 'type': 2, 'lat': '28.278158', 'lon': '112.945133', 'count': 81 }, {
            'type': 2,
            'lat': '28.180574',
            'lon': '112.904228',
            'count': 49
        }, { 'type': 2, 'lat': '28.260362', 'lon': '112.927786', 'count': 92 }, {
            'type': 2,
            'lat': '28.277994',
            'lon': '112.94036',
            'count': 51
        }, { 'type': 2, 'lat': '28.232281', 'lon': '112.934265', 'count': 86 }, {
            'type': 2,
            'lat': '28.102659',
            'lon': '112.982204',
            'count': 95
        }, { 'type': 2, 'lat': '28.107617', 'lon': '112.870965', 'count': 19 }, {
            'type': 2,
            'lat': '28.217431',
            'lon': '112.92556',
            'count': 55
        }, { 'type': 2, 'lat': '28.309115', 'lon': '112.900446', 'count': 62 }, {
            'type': 2,
            'lat': '28.326973',
            'lon': '112.843287',
            'count': 56
        }, { 'type': 2, 'lat': '28.28531', 'lon': '112.842692', 'count': 67 }, {
            'type': 2,
            'lat': '28.236649',
            'lon': '112.907942',
            'count': 40
        }, { 'type': 2, 'lat': '28.251851', 'lon': '112.926868', 'count': 35 }, {
            'type': 2,
            'lat': '28.112546',
            'lon': '112.912557',
            'count': 54
        }, { 'type': 2, 'lat': '28.268179', 'lon': '112.936971', 'count': 60 }, {
            'type': 2,
            'lat': '28.160566',
            'lon': '112.827223',
            'count': 14
        }, { 'type': 2, 'lat': '28.331303', 'lon': '112.905025', 'count': 23 }, {
            'type': 2,
            'lat': '28.106928',
            'lon': '112.846347',
            'count': 25
        }, { 'type': 2, 'lat': '28.270924', 'lon': '112.836825', 'count': 56 }, {
            'type': 2,
            'lat': '28.164459',
            'lon': '112.837277',
            'count': 81
        }, { 'type': 2, 'lat': '28.330035', 'lon': '112.999592', 'count': 99 }, {
            'type': 2,
            'lat': '28.325765',
            'lon': '112.848068',
            'count': 47
        }, { 'type': 2, 'lat': '28.127228', 'lon': '112.847808', 'count': 97 }, {
            'type': 2,
            'lat': '28.294136',
            'lon': '112.845907',
            'count': 21
        }, { 'type': 2, 'lat': '28.14073', 'lon': '112.877527', 'count': 42 }, {
            'type': 2,
            'lat': '28.225296',
            'lon': '112.816942',
            'count': 62
        }, { 'type': 2, 'lat': '28.256466', 'lon': '112.923498', 'count': 27 }, {
            'type': 2,
            'lat': '28.178957',
            'lon': '112.847482',
            'count': 86
        }, { 'type': 2, 'lat': '28.130202', 'lon': '112.969843', 'count': 14 }, {
            'type': 2,
            'lat': '28.269909',
            'lon': '112.974104',
            'count': 58
        }, { 'type': 2, 'lat': '28.157696', 'lon': '112.934576', 'count': 30 }, {
            'type': 2,
            'lat': '28.290399',
            'lon': '112.920603',
            'count': 44
        }, { 'type': 2, 'lat': '28.26614', 'lon': '112.879758', 'count': 33 }, {
            'type': 2,
            'lat': '28.087973',
            'lon': '112.832363',
            'count': 44
        }, { 'type': 2, 'lat': '28.27138', 'lon': '112.815917', 'count': 3 }, {
            'type': 2,
            'lat': '28.302861',
            'lon': '112.874623',
            'count': 90
        }, { 'type': 2, 'lat': '28.299914', 'lon': '112.835628', 'count': 68 }, {
            'type': 2,
            'lat': '28.165377',
            'lon': '112.885868',
            'count': 53
        }, { 'type': 2, 'lat': '28.311093', 'lon': '112.848699', 'count': 95 }, {
            'type': 2,
            'lat': '28.285089',
            'lon': '112.959112',
            'count': 56
        }, { 'type': 2, 'lat': '28.138987', 'lon': '112.911128', 'count': 39 }, {
            'type': 2,
            'lat': '28.324149',
            'lon': '112.887326',
            'count': 20
        }, { 'type': 2, 'lat': '28.337597', 'lon': '112.958083', 'count': 48 }, {
            'type': 2,
            'lat': '28.276581',
            'lon': '112.835673',
            'count': 16
        }, { 'type': 2, 'lat': '28.144629', 'lon': '112.884338', 'count': 53 }, {
            'type': 2,
            'lat': '28.199437',
            'lon': '112.9019',
            'count': 48
        }, { 'type': 2, 'lat': '28.107693', 'lon': '112.995817', 'count': 18 }, {
            'type': 2,
            'lat': '28.126547',
            'lon': '112.952106',
            'count': 12
        }, { 'type': 2, 'lat': '28.281525', 'lon': '112.8965', 'count': 4 }, {
            'type': 2,
            'lat': '28.279508',
            'lon': '112.839275',
            'count': 12
        }, { 'type': 2, 'lat': '28.101504', 'lon': '112.949283', 'count': 17 }, {
            'type': 2,
            'lat': '28.295613',
            'lon': '112.9248',
            'count': 3
        }, { 'type': 2, 'lat': '28.232547', 'lon': '112.89335', 'count': 25 }, {
            'type': 2,
            'lat': '28.176521',
            'lon': '112.947697',
            'count': 51
        }, { 'type': 2, 'lat': '28.112378', 'lon': '112.941793', 'count': 2 }, {
            'type': 2,
            'lat': '28.303154',
            'lon': '112.964041',
            'count': 88
        }, { 'type': 2, 'lat': '28.203745', 'lon': '112.976919', 'count': 2 }, {
            'type': 2,
            'lat': '28.139638',
            'lon': '112.928342',
            'count': 18
        }, { 'type': 2, 'lat': '28.242562', 'lon': '112.854826', 'count': 26 }, {
            'type': 2,
            'lat': '28.138838',
            'lon': '112.887234',
            'count': 33
        }, { 'type': 2, 'lat': '28.296359', 'lon': '112.940222', 'count': 15 }, {
            'type': 2,
            'lat': '28.252968',
            'lon': '112.88421',
            'count': 53
        }, { 'type': 2, 'lat': '28.231891', 'lon': '112.914986', 'count': 90 }, {
            'type': 2,
            'lat': '28.236977',
            'lon': '112.90333',
            'count': 73
        }, { 'type': 2, 'lat': '28.31915', 'lon': '112.834432', 'count': 63 }, {
            'type': 2,
            'lat': '28.106221',
            'lon': '112.883396',
            'count': 29
        }, { 'type': 2, 'lat': '28.226159', 'lon': '112.997004', 'count': 66 }, {
            'type': 2,
            'lat': '28.178832',
            'lon': '112.828784',
            'count': 2
        }, { 'type': 2, 'lat': '28.222267', 'lon': '112.895267', 'count': 72 }, {
            'type': 2,
            'lat': '28.274116',
            'lon': '112.832718',
            'count': 86
        }, { 'type': 2, 'lat': '28.313275', 'lon': '112.955692', 'count': 46 }, {
            'type': 2,
            'lat': '28.192089',
            'lon': '112.886437',
            'count': 4
        }, { 'type': 2, 'lat': '28.090986', 'lon': '112.858773', 'count': 2 }, {
            'type': 2,
            'lat': '28.247233',
            'lon': '112.90721',
            'count': 95
        }, { 'type': 2, 'lat': '28.316143', 'lon': '112.990307', 'count': 71 }, {
            'type': 2,
            'lat': '28.113297',
            'lon': '112.977499',
            'count': 15
        }, { 'type': 2, 'lat': '28.320693', 'lon': '112.917737', 'count': 3 }, {
            'type': 2,
            'lat': '28.157294',
            'lon': '112.922683',
            'count': 7
        }, { 'type': 2, 'lat': '28.298903', 'lon': '112.927416', 'count': 5 }, {
            'type': 2,
            'lat': '28.195445',
            'lon': '112.913753',
            'count': 8
        }, { 'type': 2, 'lat': '28.303899', 'lon': '112.933239', 'count': 7 }, {
            'type': 2,
            'lat': '28.175707',
            'lon': '112.939944',
            'count': 33
        }, { 'type': 2, 'lat': '28.250626', 'lon': '112.86313', 'count': 94 }, {
            'type': 2,
            'lat': '28.338095',
            'lon': '112.91728',
            'count': 92
        }, { 'type': 2, 'lat': '28.315747', 'lon': '112.990828', 'count': 8 }, {
            'type': 2,
            'lat': '28.326104',
            'lon': '112.927908',
            'count': 37
        }, { 'type': 2, 'lat': '28.138267', 'lon': '112.903391', 'count': 3 }, {
            'type': 2,
            'lat': '28.214169',
            'lon': '112.886855',
            'count': 33
        }, { 'type': 2, 'lat': '28.236428', 'lon': '112.838929', 'count': 71 }, {
            'type': 2,
            'lat': '28.185048',
            'lon': '112.906798',
            'count': 49
        }, { 'type': 3, 'lat': '28.253866', 'lon': '113.117528', 'count': 3000 }, {
            'type': 3,
            'lat': '28.318156',
            'lon': '113.056594',
            'count': 804
        }, { 'type': 3, 'lat': '28.275934', 'lon': '113.015906', 'count': 2859 }, {
            'type': 3,
            'lat': '28.178912',
            'lon': '113.13164',
            'count': 1052
        }, { 'type': 3, 'lat': '28.255875', 'lon': '113.083792', 'count': 49 }, {
            'type': 3,
            'lat': '28.242193',
            'lon': '113.111394',
            'count': 16
        }, { 'type': 3, 'lat': '28.286363', 'lon': '113.02279', 'count': 2657 }, {
            'type': 3,
            'lat': '28.113176',
            'lon': '113.046763',
            'count': 745
        }, { 'type': 3, 'lat': '28.143853', 'lon': '113.139137', 'count': 1126 }, {
            'type': 3,
            'lat': '28.195119',
            'lon': '113.096012',
            'count': 704
        }, { 'type': 3, 'lat': '28.266034', 'lon': '113.001378', 'count': 911 }, {
            'type': 3,
            'lat': '28.281568',
            'lon': '113.096617',
            'count': 115
        }, { 'type': 3, 'lat': '28.163504', 'lon': '113.139932', 'count': 515 }, {
            'type': 3,
            'lat': '28.128529',
            'lon': '113.06194',
            'count': 1363
        }, { 'type': 3, 'lat': '28.263991', 'lon': '113.017067', 'count': 148 }, {
            'type': 3,
            'lat': '28.277659',
            'lon': '113.084001',
            'count': 2017
        }, { 'type': 3, 'lat': '28.085628', 'lon': '113.010945', 'count': 555 }, {
            'type': 3,
            'lat': '28.219804',
            'lon': '113.061887',
            'count': 2695
        }, { 'type': 3, 'lat': '28.157259', 'lon': '113.04498', 'count': 2432 }, {
            'type': 3,
            'lat': '28.146359',
            'lon': '113.050873',
            'count': 2695
        }, { 'type': 3, 'lat': '28.099389', 'lon': '113.11462', 'count': 1698 }, {
            'type': 3,
            'lat': '28.123609',
            'lon': '113.073019',
            'count': 820
        }, { 'type': 3, 'lat': '28.3187', 'lon': '113.011263', 'count': 2253 }, {
            'type': 3,
            'lat': '28.227754',
            'lon': '113.039169',
            'count': 1051
        }, { 'type': 3, 'lat': '28.135012', 'lon': '113.040857', 'count': 2217 }, {
            'type': 3,
            'lat': '28.221164',
            'lon': '113.14056',
            'count': 620
        }, { 'type': 3, 'lat': '28.204282', 'lon': '113.122768', 'count': 2799 }, {
            'type': 3,
            'lat': '28.270937',
            'lon': '113.035279',
            'count': 999
        }, { 'type': 3, 'lat': '28.262745', 'lon': '113.065921', 'count': 2989 }, {
            'type': 3,
            'lat': '28.329363999999998',
            'lon': '113.063933',
            'count': 226
        }, { 'type': 3, 'lat': '28.221072', 'lon': '113.035405', 'count': 1661 }, {
            'type': 3,
            'lat': '28.092318',
            'lon': '113.125611',
            'count': 136
        }, { 'type': 3, 'lat': '28.288211', 'lon': '113.078463', 'count': 1468 }, {
            'type': 3,
            'lat': '28.330102',
            'lon': '113.036681',
            'count': 2244
        }, { 'type': 3, 'lat': '28.275914', 'lon': '113.025782', 'count': 2339 }, {
            'type': 3,
            'lat': '28.301241',
            'lon': '113.025168',
            'count': 791
        }, { 'type': 3, 'lat': '28.164961', 'lon': '113.099898', 'count': 1117 }, {
            'type': 3,
            'lat': '28.082466',
            'lon': '113.004538',
            'count': 1899
        }, { 'type': 3, 'lat': '28.286896', 'lon': '113.116029', 'count': 1476 }, {
            'type': 3,
            'lat': '28.143073',
            'lon': '113.118373',
            'count': 1047
        }, { 'type': 3, 'lat': '28.135955', 'lon': '113.108818', 'count': 1020 }, {
            'type': 3,
            'lat': '28.23694',
            'lon': '113.047583',
            'count': 1023
        }, { 'type': 3, 'lat': '28.098174', 'lon': '113.012258', 'count': 1440 }, {
            'type': 3,
            'lat': '28.318824',
            'lon': '113.009106',
            'count': 2735
        }, { 'type': 3, 'lat': '28.10926', 'lon': '113.010587', 'count': 1718 }, {
            'type': 3,
            'lat': '28.28412',
            'lon': '113.025764',
            'count': 2844
        }, { 'type': 3, 'lat': '28.083433', 'lon': '113.06188', 'count': 1089 }, {
            'type': 3,
            'lat': '28.134156',
            'lon': '113.005589',
            'count': 1991
        }, { 'type': 3, 'lat': '28.141462', 'lon': '113.066835', 'count': 1188 }, {
            'type': 3,
            'lat': '28.211909',
            'lon': '113.005783',
            'count': 2736
        }, { 'type': 3, 'lat': '28.217784', 'lon': '113.126688', 'count': 2109 }, {
            'type': 3,
            'lat': '28.198063',
            'lon': '113.105861',
            'count': 2092
        }, { 'type': 3, 'lat': '28.283706', 'lon': '113.040234', 'count': 2568 }, {
            'type': 3,
            'lat': '28.173285',
            'lon': '113.126021',
            'count': 141
        }, { 'type': 3, 'lat': '28.139919', 'lon': '113.109083', 'count': 1442 }, {
            'type': 3,
            'lat': '28.166348',
            'lon': '113.122886',
            'count': 2524
        }, { 'type': 3, 'lat': '28.100965', 'lon': '113.069213', 'count': 1789 }, {
            'type': 3,
            'lat': '28.103706',
            'lon': '113.052371',
            'count': 100
        }, { 'type': 3, 'lat': '28.325553', 'lon': '113.025133', 'count': 1150 }, {
            'type': 3,
            'lat': '28.26669',
            'lon': '113.110394',
            'count': 2327
        }, { 'type': 3, 'lat': '28.2701', 'lon': '113.137057', 'count': 258 }, {
            'type': 3,
            'lat': '28.149755',
            'lon': '113.063487',
            'count': 670
        }, { 'type': 3, 'lat': '28.274734', 'lon': '113.111492', 'count': 2012 }, {
            'type': 3,
            'lat': '28.084567',
            'lon': '113.009718',
            'count': 148
        }, { 'type': 3, 'lat': '28.15265', 'lon': '113.058285', 'count': 69 }, {
            'type': 3,
            'lat': '28.227019',
            'lon': '113.137043',
            'count': 2492
        }, { 'type': 3, 'lat': '28.291269', 'lon': '113.049087', 'count': 1578 }, {
            'type': 3,
            'lat': '28.31446',
            'lon': '113.037545',
            'count': 584
        }, { 'type': 3, 'lat': '28.092966', 'lon': '113.092564', 'count': 1224 }, {
            'type': 3,
            'lat': '28.169103',
            'lon': '113.020474',
            'count': 1252
        }, { 'type': 3, 'lat': '28.203214', 'lon': '113.012488', 'count': 2826 }, {
            'type': 3,
            'lat': '28.162806',
            'lon': '113.102757',
            'count': 1163
        }, { 'type': 3, 'lat': '28.130573', 'lon': '113.12581', 'count': 1067 }, {
            'type': 3,
            'lat': '28.306654',
            'lon': '113.074888',
            'count': 1981
        }, { 'type': 3, 'lat': '28.301487', 'lon': '113.060129', 'count': 2804 }, {
            'type': 3,
            'lat': '28.129012',
            'lon': '113.016156',
            'count': 1454
        }, { 'type': 3, 'lat': '28.122333', 'lon': '113.061244', 'count': 2740 }, {
            'type': 3,
            'lat': '28.141299',
            'lon': '113.054404',
            'count': 1785
        }, { 'type': 3, 'lat': '28.315124', 'lon': '113.048649', 'count': 2747 }, {
            'type': 3,
            'lat': '28.286206',
            'lon': '113.002549',
            'count': 2255
        }, { 'type': 3, 'lat': '28.092102', 'lon': '113.13234', 'count': 398 }, {
            'type': 3,
            'lat': '28.261579',
            'lon': '113.125531',
            'count': 1087
        }, { 'type': 3, 'lat': '28.293273', 'lon': '113.097228', 'count': 420 }, {
            'type': 3,
            'lat': '28.138072',
            'lon': '113.024946',
            'count': 2373
        }, { 'type': 3, 'lat': '28.126515', 'lon': '113.018187', 'count': 1151 }, {
            'type': 3,
            'lat': '28.088801',
            'lon': '113.091425',
            'count': 2187
        }, { 'type': 3, 'lat': '28.117913', 'lon': '113.013131', 'count': 1756 }, {
            'type': 3,
            'lat': '28.138449',
            'lon': '113.123921',
            'count': 2026
        }, { 'type': 3, 'lat': '28.27794', 'lon': '113.014672', 'count': 2702 }, {
            'type': 3,
            'lat': '28.128061',
            'lon': '113.099262',
            'count': 1836
        }, { 'type': 3, 'lat': '28.121851', 'lon': '113.106666', 'count': 1544 }, {
            'type': 3,
            'lat': '28.084295',
            'lon': '113.081921',
            'count': 77
        }, { 'type': 3, 'lat': '28.093477', 'lon': '113.069412', 'count': 801 }, {
            'type': 3,
            'lat': '28.325378',
            'lon': '113.126582',
            'count': 2040
        }, { 'type': 3, 'lat': '28.17249', 'lon': '113.112913', 'count': 216 }, {
            'type': 3,
            'lat': '28.108208',
            'lon': '113.137349',
            'count': 1612
        }, { 'type': 3, 'lat': '28.32383', 'lon': '113.025046', 'count': 1002 }, {
            'type': 3,
            'lat': '28.19402',
            'lon': '113.043911',
            'count': 1814
        }, { 'type': 3, 'lat': '28.126773', 'lon': '113.062452', 'count': 1550 }, {
            'type': 3,
            'lat': '28.213736',
            'lon': '113.13565',
            'count': 2133
        }, { 'type': 3, 'lat': '28.277458', 'lon': '113.106909', 'count': 1517 }, {
            'type': 3,
            'lat': '28.1658',
            'lon': '113.004608',
            'count': 742
        }, { 'type': 3, 'lat': '28.127272', 'lon': '113.001367', 'count': 1348 }, {
            'type': 3,
            'lat': '28.30173',
            'lon': '113.096822',
            'count': 866
        }, { 'type': 3, 'lat': '28.256504', 'lon': '113.040936', 'count': 590 }, {
            'type': 3,
            'lat': '28.278884',
            'lon': '113.088279',
            'count': 1772
        }, { 'type': 3, 'lat': '28.31261', 'lon': '113.043332', 'count': 2969 }, {
            'type': 3,
            'lat': '28.328886',
            'lon': '113.128813',
            'count': 2983
        }, { 'type': 3, 'lat': '28.253848', 'lon': '113.12891', 'count': 1924 }, {
            'type': 3,
            'lat': '28.226806',
            'lon': '113.062946',
            'count': 193
        }, { 'type': 3, 'lat': '28.313092', 'lon': '113.111648', 'count': 1846 }, {
            'type': 3,
            'lat': '28.13908',
            'lon': '113.139252',
            'count': 517
        }, { 'type': 3, 'lat': '28.168823', 'lon': '113.030015', 'count': 143 }, {
            'type': 3,
            'lat': '28.168864',
            'lon': '113.107435',
            'count': 1873
        }, { 'type': 3, 'lat': '28.265998', 'lon': '113.069853', 'count': 2564 }, {
            'type': 3,
            'lat': '28.203226',
            'lon': '113.045142',
            'count': 2244
        }, { 'type': 3, 'lat': '28.269859', 'lon': '113.074629', 'count': 1681 }, {
            'type': 3,
            'lat': '28.247474',
            'lon': '113.009418',
            'count': 1350
        }, { 'type': 3, 'lat': '28.12626', 'lon': '113.004687', 'count': 1811 }, {
            'type': 3,
            'lat': '28.16812',
            'lon': '113.104',
            'count': 902
        }, { 'type': 3, 'lat': '28.201752', 'lon': '113.115415', 'count': 244 }, {
            'type': 3,
            'lat': '28.13189',
            'lon': '113.044743',
            'count': 1247
        }, { 'type': 3, 'lat': '28.135114', 'lon': '113.03952', 'count': 1864 }, {
            'type': 3,
            'lat': '28.179231',
            'lon': '113.102112',
            'count': 730
        }, { 'type': 3, 'lat': '28.275155', 'lon': '113.081389', 'count': 1478 }, {
            'type': 3,
            'lat': '28.271339',
            'lon': '113.141234',
            'count': 2997
        }, { 'type': 3, 'lat': '28.136129', 'lon': '113.002024', 'count': 2962 }, {
            'type': 3,
            'lat': '28.303054',
            'lon': '113.08578',
            'count': 2798
        }, { 'type': 3, 'lat': '28.307573', 'lon': '113.138112', 'count': 2886 }, {
            'type': 3,
            'lat': '28.157754',
            'lon': '113.117937',
            'count': 255
        }, { 'type': 3, 'lat': '28.212558', 'lon': '113.118561', 'count': 501 }, {
            'type': 3,
            'lat': '28.32141',
            'lon': '113.079178',
            'count': 493
        }, { 'type': 3, 'lat': '28.329924', 'lon': '113.036339', 'count': 417 }, {
            'type': 3,
            'lat': '28.12454',
            'lon': '113.03174',
            'count': 1260
        }, { 'type': 3, 'lat': '28.316568', 'lon': '113.011115', 'count': 2919 }, {
            'type': 3,
            'lat': '28.158302',
            'lon': '113.109139',
            'count': 1608
        }, { 'type': 3, 'lat': '28.095744', 'lon': '113.125617', 'count': 2913 }, {
            'type': 3,
            'lat': '28.183348',
            'lon': '113.14167',
            'count': 644
        }, { 'type': 3, 'lat': '28.182912', 'lon': '113.030444', 'count': 2951 }, {
            'type': 3,
            'lat': '28.116393',
            'lon': '113.064271',
            'count': 684
        }, { 'type': 3, 'lat': '28.195258', 'lon': '113.032546', 'count': 1044 }, {
            'type': 3,
            'lat': '28.329476',
            'lon': '113.098395',
            'count': 2180
        }, { 'type': 3, 'lat': '28.184463', 'lon': '113.02451', 'count': 193 }, {
            'type': 3,
            'lat': '28.164986',
            'lon': '113.10312',
            'count': 365
        }, { 'type': 3, 'lat': '28.092956', 'lon': '113.049464', 'count': 1375 }, {
            'type': 3,
            'lat': '28.224923',
            'lon': '113.113146',
            'count': 2882
        }, { 'type': 3, 'lat': '28.267001', 'lon': '113.093271', 'count': 659 }, {
            'type': 3,
            'lat': '28.137533',
            'lon': '113.109991',
            'count': 2553
        }, { 'type': 3, 'lat': '28.303778', 'lon': '113.109795', 'count': 2549 }, {
            'type': 3,
            'lat': '28.096431',
            'lon': '113.056493',
            'count': 111
        }, { 'type': 3, 'lat': '28.103172', 'lon': '113.027889', 'count': 2436 }, {
            'type': 3,
            'lat': '28.135552',
            'lon': '113.091797',
            'count': 2217
        }, { 'type': 3, 'lat': '28.253972', 'lon': '113.076404', 'count': 2105 }, {
            'type': 3,
            'lat': '28.26837',
            'lon': '113.119521',
            'count': 2068
        }, { 'type': 3, 'lat': '28.228073', 'lon': '113.098124', 'count': 2792 }, {
            'type': 3,
            'lat': '28.304359',
            'lon': '113.125725',
            'count': 1435
        }, { 'type': 3, 'lat': '28.162405', 'lon': '113.086769', 'count': 1013 }, {
            'type': 3,
            'lat': '28.303472',
            'lon': '113.110211',
            'count': 2711
        }, { 'type': 3, 'lat': '28.151259', 'lon': '113.110535', 'count': 1464 }, {
            'type': 3,
            'lat': '28.098614',
            'lon': '113.07344',
            'count': 372
        }, { 'type': 3, 'lat': '28.226887', 'lon': '113.066799', 'count': 408 }, {
            'type': 3,
            'lat': '28.093787',
            'lon': '113.132727',
            'count': 78
        }, { 'type': 3, 'lat': '28.268113', 'lon': '113.059992', 'count': 273 }, {
            'type': 3,
            'lat': '28.240828',
            'lon': '113.086996',
            'count': 660
        }, { 'type': 3, 'lat': '28.093913', 'lon': '113.016018', 'count': 2196 }, {
            'type': 3,
            'lat': '28.221958',
            'lon': '113.138883',
            'count': 1505
        }, { 'type': 3, 'lat': '28.218119', 'lon': '113.111913', 'count': 2347 }, {
            'type': 3,
            'lat': '28.272726',
            'lon': '113.140621',
            'count': 2945
        }, { 'type': 3, 'lat': '28.301324', 'lon': '113.020996', 'count': 1108 }, {
            'type': 3,
            'lat': '28.225944',
            'lon': '113.011366',
            'count': 2209
        }, { 'type': 3, 'lat': '28.13728', 'lon': '113.122878', 'count': 1856 }, {
            'type': 3,
            'lat': '28.183747',
            'lon': '113.066835',
            'count': 2153
        }, { 'type': 3, 'lat': '28.141627', 'lon': '113.024703', 'count': 1635 }, {
            'type': 3,
            'lat': '28.084769',
            'lon': '113.133884',
            'count': 2803
        }, { 'type': 3, 'lat': '28.083723', 'lon': '113.136295', 'count': 330 }, {
            'type': 3,
            'lat': '28.167045',
            'lon': '113.092081',
            'count': 1314
        }, { 'type': 3, 'lat': '28.110147', 'lon': '113.058533', 'count': 2488 }, {
            'type': 3,
            'lat': '28.088327',
            'lon': '113.140018',
            'count': 1536
        }, { 'type': 3, 'lat': '28.230294', 'lon': '113.093758', 'count': 473 }, {
            'type': 3,
            'lat': '28.316425',
            'lon': '113.096819',
            'count': 979
        }, { 'type': 3, 'lat': '28.148989', 'lon': '113.05683', 'count': 2536 }, {
            'type': 3,
            'lat': '28.277117',
            'lon': '113.019832',
            'count': 2945
        }, { 'type': 3, 'lat': '28.257892', 'lon': '113.121896', 'count': 1959 }, {
            'type': 3,
            'lat': '28.116191',
            'lon': '113.10399',
            'count': 182
        }, { 'type': 3, 'lat': '28.128555', 'lon': '113.110071', 'count': 1548 }, {
            'type': 3,
            'lat': '28.177274',
            'lon': '113.049629',
            'count': 492
        }, { 'type': 3, 'lat': '28.272402', 'lon': '113.096674', 'count': 676 }, {
            'type': 3,
            'lat': '28.190018',
            'lon': '113.124789',
            'count': 945
        }, { 'type': 3, 'lat': '28.116937', 'lon': '113.096146', 'count': 1314 }, {
            'type': 3,
            'lat': '28.321472',
            'lon': '113.010626',
            'count': 1292
        }, { 'type': 3, 'lat': '28.197974', 'lon': '113.096134', 'count': 2000 }, {
            'type': 3,
            'lat': '28.239461',
            'lon': '113.064379',
            'count': 2968
        }, { 'type': 3, 'lat': '28.196728', 'lon': '113.124886', 'count': 1609 }, {
            'type': 3,
            'lat': '28.291898',
            'lon': '113.114738',
            'count': 1082
        }, { 'type': 3, 'lat': '28.212775', 'lon': '113.139901', 'count': 195 }, {
            'type': 3,
            'lat': '28.173623',
            'lon': '113.05582',
            'count': 2171
        }, { 'type': 3, 'lat': '28.209176', 'lon': '113.118876', 'count': 867 }, {
            'type': 3,
            'lat': '28.137393',
            'lon': '113.033911',
            'count': 2256
        }, { 'type': 3, 'lat': '28.212754', 'lon': '113.026007', 'count': 1147 }, {
            'type': 3,
            'lat': '28.171617',
            'lon': '113.027971',
            'count': 5
        }, { 'type': 4, 'lat': '28.152621', 'lon': '113.103285', 'count': 3000 }, {
            'type': 4,
            'lat': '28.145245',
            'lon': '113.006498',
            'count': 813
        }, { 'type': 4, 'lat': '28.090335', 'lon': '113.108568', 'count': 598 }, {
            'type': 4,
            'lat': '28.246358',
            'lon': '113.0043',
            'count': 511
        }, { 'type': 4, 'lat': '28.231549', 'lon': '113.095303', 'count': 567 }, {
            'type': 4,
            'lat': '28.164966',
            'lon': '113.06321',
            'count': 871
        }, { 'type': 4, 'lat': '28.317379', 'lon': '113.141222', 'count': 2027 }, {
            'type': 4,
            'lat': '28.134396',
            'lon': '113.126165',
            'count': 1597
        }, { 'type': 4, 'lat': '28.1476', 'lon': '113.133534', 'count': 1088 }, {
            'type': 4,
            'lat': '28.160233',
            'lon': '113.075697',
            'count': 707
        }, { 'type': 4, 'lat': '28.105659', 'lon': '113.042631', 'count': 1843 }, {
            'type': 4,
            'lat': '28.090468',
            'lon': '113.081026',
            'count': 1327
        }, { 'type': 4, 'lat': '28.160295', 'lon': '113.013003', 'count': 1221 }, {
            'type': 4,
            'lat': '28.118164',
            'lon': '113.114236',
            'count': 695
        }, { 'type': 4, 'lat': '28.266713', 'lon': '113.079715', 'count': 629 }, {
            'type': 4,
            'lat': '28.115057',
            'lon': '113.0395',
            'count': 1788
        }, { 'type': 4, 'lat': '28.19964', 'lon': '113.100706', 'count': 1165 }, {
            'type': 4,
            'lat': '28.257498',
            'lon': '113.109178',
            'count': 101
        }, { 'type': 4, 'lat': '28.205782', 'lon': '113.007289', 'count': 1011 }, {
            'type': 4,
            'lat': '28.107198',
            'lon': '113.03577',
            'count': 1214
        }, { 'type': 4, 'lat': '28.142068', 'lon': '113.122187', 'count': 1450 }, {
            'type': 4,
            'lat': '28.201134',
            'lon': '113.007616',
            'count': 1723
        }, { 'type': 4, 'lat': '28.17006', 'lon': '113.056495', 'count': 2269 }, {
            'type': 4,
            'lat': '28.21655',
            'lon': '113.133935',
            'count': 1455
        }, { 'type': 4, 'lat': '28.137564', 'lon': '113.062903', 'count': 1019 }, {
            'type': 4,
            'lat': '28.106397',
            'lon': '113.037112',
            'count': 2833
        }, { 'type': 4, 'lat': '28.247331', 'lon': '113.061191', 'count': 2842 }, {
            'type': 4,
            'lat': '28.334304',
            'lon': '113.087451',
            'count': 1138
        }, { 'type': 4, 'lat': '28.225778', 'lon': '113.037644', 'count': 697 }, {
            'type': 4,
            'lat': '28.191172',
            'lon': '113.103299',
            'count': 2958
        }, { 'type': 4, 'lat': '28.276526', 'lon': '113.042344', 'count': 2058 }, {
            'type': 4,
            'lat': '28.089721',
            'lon': '113.026177',
            'count': 1400
        }, { 'type': 4, 'lat': '28.243771', 'lon': '113.119125', 'count': 952 }, {
            'type': 4,
            'lat': '28.32109',
            'lon': '113.053462',
            'count': 1918
        }, { 'type': 4, 'lat': '28.124211', 'lon': '113.044706', 'count': 1285 }, {
            'type': 4,
            'lat': '28.251983',
            'lon': '113.065969',
            'count': 1135
        }, { 'type': 4, 'lat': '28.228506', 'lon': '113.121827', 'count': 385 }, {
            'type': 4,
            'lat': '28.298573',
            'lon': '113.09991',
            'count': 2244
        }, { 'type': 4, 'lat': '28.173129', 'lon': '113.138209', 'count': 2321 }, {
            'type': 4,
            'lat': '28.167642',
            'lon': '113.111921',
            'count': 779
        }, { 'type': 4, 'lat': '28.261147', 'lon': '113.067045', 'count': 2984 }, {
            'type': 4,
            'lat': '28.198211',
            'lon': '113.096463',
            'count': 612
        }, { 'type': 4, 'lat': '28.324051', 'lon': '113.094812', 'count': 2810 }, {
            'type': 4,
            'lat': '28.098247',
            'lon': '113.103823',
            'count': 821
        }, { 'type': 4, 'lat': '28.171777', 'lon': '113.092007', 'count': 1818 }, {
            'type': 4,
            'lat': '28.265051',
            'lon': '113.106446',
            'count': 327
        }, { 'type': 4, 'lat': '28.261659', 'lon': '113.054007', 'count': 2749 }, {
            'type': 4,
            'lat': '28.09001',
            'lon': '113.077926',
            'count': 660
        }, { 'type': 4, 'lat': '28.177538', 'lon': '113.139599', 'count': 207 }, {
            'type': 4,
            'lat': '28.14747',
            'lon': '113.088248',
            'count': 463
        }, { 'type': 4, 'lat': '28.08697', 'lon': '113.126837', 'count': 2555 }, {
            'type': 4,
            'lat': '28.325777',
            'lon': '113.021613',
            'count': 2734
        }, { 'type': 4, 'lat': '28.314148', 'lon': '113.142264', 'count': 2432 }, {
            'type': 4,
            'lat': '28.1406',
            'lon': '113.127361',
            'count': 1049
        }, { 'type': 4, 'lat': '28.30695', 'lon': '113.049224', 'count': 2908 }, {
            'type': 4,
            'lat': '28.120584',
            'lon': '113.047096',
            'count': 1495
        }, { 'type': 4, 'lat': '28.092949', 'lon': '113.058874', 'count': 9 }, {
            'type': 4,
            'lat': '28.280345',
            'lon': '113.075445',
            'count': 283
        }, { 'type': 4, 'lat': '28.295529', 'lon': '113.013682', 'count': 1944 }, {
            'type': 4,
            'lat': '28.237453',
            'lon': '113.057383',
            'count': 1634
        }, { 'type': 4, 'lat': '28.094917', 'lon': '113.097868', 'count': 257 }, {
            'type': 4,
            'lat': '28.09378',
            'lon': '113.046945',
            'count': 2536
        }, { 'type': 4, 'lat': '28.172112', 'lon': '113.1352', 'count': 2866 }, {
            'type': 4,
            'lat': '28.17849',
            'lon': '113.067063',
            'count': 469
        }, { 'type': 4, 'lat': '28.173841', 'lon': '113.102547', 'count': 1297 }, {
            'type': 4,
            'lat': '28.256054',
            'lon': '113.004242',
            'count': 2273
        }, { 'type': 4, 'lat': '28.125529', 'lon': '113.043566', 'count': 2079 }, {
            'type': 4,
            'lat': '28.180692',
            'lon': '113.133756',
            'count': 1224
        }, { 'type': 4, 'lat': '28.189303', 'lon': '113.133624', 'count': 2203 }, {
            'type': 4,
            'lat': '28.294513',
            'lon': '113.056171',
            'count': 362
        }, { 'type': 4, 'lat': '28.101065', 'lon': '113.009854', 'count': 865 }, {
            'type': 4,
            'lat': '28.200552',
            'lon': '113.025045',
            'count': 2986
        }, { 'type': 4, 'lat': '28.240737', 'lon': '113.039738', 'count': 335 }, {
            'type': 4,
            'lat': '28.268477',
            'lon': '113.0035',
            'count': 2481
        }, { 'type': 4, 'lat': '28.332329', 'lon': '113.016016', 'count': 2597 }, {
            'type': 4,
            'lat': '28.181506',
            'lon': '113.022206',
            'count': 1327
        }, { 'type': 4, 'lat': '28.227839', 'lon': '113.052491', 'count': 430 }, {
            'type': 4,
            'lat': '28.15654',
            'lon': '113.123783',
            'count': 1149
        }, { 'type': 4, 'lat': '28.26116', 'lon': '113.069328', 'count': 2010 }, {
            'type': 4,
            'lat': '28.109855',
            'lon': '113.077949',
            'count': 1760
        }, { 'type': 4, 'lat': '28.129739', 'lon': '113.084807', 'count': 2687 }, {
            'type': 4,
            'lat': '28.103862',
            'lon': '113.066291',
            'count': 1831
        }, { 'type': 4, 'lat': '28.12096', 'lon': '113.018797', 'count': 167 }, {
            'type': 4,
            'lat': '28.205352',
            'lon': '113.024444',
            'count': 65
        }, { 'type': 4, 'lat': '28.084464', 'lon': '113.106829', 'count': 1359 }, {
            'type': 4,
            'lat': '28.283227',
            'lon': '113.016044',
            'count': 1546
        }, { 'type': 4, 'lat': '28.210828', 'lon': '113.003767', 'count': 1992 }, {
            'type': 4,
            'lat': '28.170638',
            'lon': '113.011786',
            'count': 2413
        }, { 'type': 4, 'lat': '28.110725', 'lon': '113.034406', 'count': 2891 }, {
            'type': 4,
            'lat': '28.098426',
            'lon': '113.035495',
            'count': 697
        }, { 'type': 4, 'lat': '28.177145', 'lon': '113.020808', 'count': 2043 }, {
            'type': 4,
            'lat': '28.315813',
            'lon': '113.043702',
            'count': 669
        }, { 'type': 4, 'lat': '28.187665', 'lon': '113.11961', 'count': 160 }, {
            'type': 4,
            'lat': '28.339007',
            'lon': '113.022003',
            'count': 2518
        }, { 'type': 4, 'lat': '28.203091', 'lon': '113.07458', 'count': 1882 }, {
            'type': 4,
            'lat': '28.214783',
            'lon': '113.035836',
            'count': 240
        }, { 'type': 4, 'lat': '28.09805', 'lon': '113.123401', 'count': 132 }, {
            'type': 4,
            'lat': '28.131619',
            'lon': '113.140047',
            'count': 1173
        }, { 'type': 4, 'lat': '28.298493', 'lon': '113.076598', 'count': 152 }, {
            'type': 4,
            'lat': '28.245477',
            'lon': '113.031699',
            'count': 2422
        }, { 'type': 4, 'lat': '28.119868', 'lon': '113.12579', 'count': 1893 }, {
            'type': 4,
            'lat': '28.319928',
            'lon': '113.053768',
            'count': 1213
        }, { 'type': 4, 'lat': '28.202654', 'lon': '113.112714', 'count': 811 }, {
            'type': 4,
            'lat': '28.176455',
            'lon': '113.140009',
            'count': 2013
        }, { 'type': 4, 'lat': '28.154773', 'lon': '113.061139', 'count': 1254 }, {
            'type': 4,
            'lat': '28.109805',
            'lon': '113.0322',
            'count': 2657
        }, { 'type': 4, 'lat': '28.103629', 'lon': '113.137518', 'count': 1095 }, {
            'type': 4,
            'lat': '28.167651',
            'lon': '113.023028',
            'count': 1494
        }, { 'type': 4, 'lat': '28.092493', 'lon': '113.024064', 'count': 411 }, {
            'type': 4,
            'lat': '28.233501',
            'lon': '113.062651',
            'count': 1635
        }, { 'type': 4, 'lat': '28.09405', 'lon': '113.008013', 'count': 2960 }, {
            'type': 4,
            'lat': '28.284459',
            'lon': '113.048458',
            'count': 1545
        }, { 'type': 4, 'lat': '28.261925', 'lon': '113.024031', 'count': 2519 }, {
            'type': 4,
            'lat': '28.163969',
            'lon': '113.071407',
            'count': 1864
        }, { 'type': 4, 'lat': '28.11296', 'lon': '113.043547', 'count': 2159 }, {
            'type': 4,
            'lat': '28.204357',
            'lon': '113.020383',
            'count': 748
        }, { 'type': 4, 'lat': '28.240027', 'lon': '113.008855', 'count': 1217 }, {
            'type': 4,
            'lat': '28.233372',
            'lon': '113.072144',
            'count': 2535
        }, { 'type': 4, 'lat': '28.287602', 'lon': '113.056457', 'count': 1236 }, {
            'type': 4,
            'lat': '28.1748',
            'lon': '113.084861',
            'count': 2781
        }, { 'type': 4, 'lat': '28.168315', 'lon': '113.013314', 'count': 302 }, {
            'type': 4,
            'lat': '28.339529',
            'lon': '113.061306',
            'count': 2216
        }, { 'type': 4, 'lat': '28.154977', 'lon': '113.140388', 'count': 1078 }, {
            'type': 4,
            'lat': '28.20592',
            'lon': '113.099527',
            'count': 579
        }, { 'type': 4, 'lat': '28.169174', 'lon': '113.092541', 'count': 1086 }, {
            'type': 4,
            'lat': '28.305058',
            'lon': '113.076413',
            'count': 1503
        }, { 'type': 4, 'lat': '28.268551', 'lon': '113.027571', 'count': 1556 }, {
            'type': 4,
            'lat': '28.179543',
            'lon': '113.088275',
            'count': 1856
        }, { 'type': 4, 'lat': '28.327994', 'lon': '113.080448', 'count': 1421 }, {
            'type': 4,
            'lat': '28.103261',
            'lon': '113.104429',
            'count': 1025
        }, { 'type': 4, 'lat': '28.29754', 'lon': '113.10211', 'count': 1031 }, {
            'type': 4,
            'lat': '28.148897',
            'lon': '113.001201',
            'count': 2026
        }, { 'type': 4, 'lat': '28.156668', 'lon': '113.122907', 'count': 349 }, {
            'type': 4,
            'lat': '28.26287',
            'lon': '113.050222',
            'count': 1800
        }, { 'type': 4, 'lat': '28.318686', 'lon': '113.019587', 'count': 1229 }, {
            'type': 4,
            'lat': '28.119281',
            'lon': '113.023785',
            'count': 1950
        }, { 'type': 4, 'lat': '28.201453', 'lon': '113.002179', 'count': 1804 }, {
            'type': 4,
            'lat': '28.101564',
            'lon': '113.13955',
            'count': 1386
        }, { 'type': 4, 'lat': '28.088125', 'lon': '113.078902', 'count': 811 }, {
            'type': 4,
            'lat': '28.208878',
            'lon': '113.129787',
            'count': 1049
        }, { 'type': 4, 'lat': '28.18609', 'lon': '113.03661', 'count': 1588 }, {
            'type': 4,
            'lat': '28.14885',
            'lon': '113.139535',
            'count': 416
        }, { 'type': 4, 'lat': '28.153642', 'lon': '113.111772', 'count': 2161 }, {
            'type': 4,
            'lat': '28.265707',
            'lon': '113.024378',
            'count': 2654
        }, { 'type': 4, 'lat': '28.203511', 'lon': '113.118656', 'count': 1591 }, {
            'type': 4,
            'lat': '28.277944',
            'lon': '113.08818',
            'count': 1976
        }, { 'type': 4, 'lat': '28.281213', 'lon': '113.021946', 'count': 1580 }, {
            'type': 4,
            'lat': '28.19453',
            'lon': '113.108358',
            'count': 1997
        }, { 'type': 4, 'lat': '28.082945', 'lon': '113.134019', 'count': 127 }, {
            'type': 4,
            'lat': '28.195595',
            'lon': '113.075826',
            'count': 2830
        }, { 'type': 4, 'lat': '28.096731', 'lon': '113.106863', 'count': 1695 }, {
            'type': 4,
            'lat': '28.141445',
            'lon': '113.024317',
            'count': 1908
        }, { 'type': 4, 'lat': '28.29238', 'lon': '113.093717', 'count': 2073 }, {
            'type': 4,
            'lat': '28.310458',
            'lon': '113.065656',
            'count': 1876
        }, { 'type': 4, 'lat': '28.287872', 'lon': '113.116824', 'count': 259 }, {
            'type': 4,
            'lat': '28.21661',
            'lon': '113.119097',
            'count': 2736
        }, { 'type': 4, 'lat': '28.258335', 'lon': '113.138618', 'count': 1279 }, {
            'type': 4,
            'lat': '28.334971',
            'lon': '113.138948',
            'count': 507
        }, { 'type': 4, 'lat': '28.172564', 'lon': '113.060098', 'count': 954 }, {
            'type': 4,
            'lat': '28.276618',
            'lon': '113.100282',
            'count': 894
        }, { 'type': 4, 'lat': '28.26766', 'lon': '113.119877', 'count': 1252 }, {
            'type': 4,
            'lat': '28.104472',
            'lon': '113.104566',
            'count': 1779
        }, { 'type': 4, 'lat': '28.326482', 'lon': '113.002536', 'count': 555 }, {
            'type': 4,
            'lat': '28.172801',
            'lon': '113.11269',
            'count': 1592
        }, { 'type': 4, 'lat': '28.303324', 'lon': '113.043933', 'count': 222 }, {
            'type': 4,
            'lat': '28.305323',
            'lon': '113.038818',
            'count': 2592
        }, { 'type': 4, 'lat': '28.296142', 'lon': '113.064515', 'count': 2612 }, {
            'type': 4,
            'lat': '28.157752',
            'lon': '113.067638',
            'count': 738
        }, { 'type': 4, 'lat': '28.206112', 'lon': '113.100737', 'count': 749 }, {
            'type': 4,
            'lat': '28.086947',
            'lon': '113.126723',
            'count': 116
        }, { 'type': 4, 'lat': '28.232701', 'lon': '113.125376', 'count': 265 }, {
            'type': 4,
            'lat': '28.094285',
            'lon': '113.06847',
            'count': 867
        }, { 'type': 4, 'lat': '28.181465', 'lon': '113.0953', 'count': 114 }, {
            'type': 4,
            'lat': '28.266743',
            'lon': '113.037701',
            'count': 2990
        }, { 'type': 4, 'lat': '28.22467', 'lon': '113.032699', 'count': 1575 }, {
            'type': 4,
            'lat': '28.116343',
            'lon': '113.055829',
            'count': 353
        }, { 'type': 4, 'lat': '28.127324', 'lon': '113.102208', 'count': 1721 }, {
            'type': 4,
            'lat': '28.253312',
            'lon': '113.138584',
            'count': 1306
        }, { 'type': 4, 'lat': '28.132762', 'lon': '113.122522', 'count': 1566 }, {
            'type': 4,
            'lat': '28.182335',
            'lon': '113.054721',
            'count': 1880
        }, { 'type': 4, 'lat': '28.193244', 'lon': '113.134925', 'count': 2188 }, {
            'type': 4,
            'lat': '28.13791',
            'lon': '113.123217',
            'count': 379
        }, { 'type': 4, 'lat': '28.192113', 'lon': '113.021208', 'count': 879 }, {
            'type': 4,
            'lat': '28.139689',
            'lon': '113.121754',
            'count': 2865
        }, { 'type': 4, 'lat': '28.082617', 'lon': '113.049783', 'count': 1861 }, {
            'type': 4,
            'lat': '28.292704',
            'lon': '113.051594',
            'count': 447
        }, { 'type': 4, 'lat': '28.167101', 'lon': '113.053702', 'count': 1514 }, {
            'type': 4,
            'lat': '28.325755',
            'lon': '113.116404',
            'count': 316
        }, { 'type': 4, 'lat': '28.244078', 'lon': '113.046459', 'count': 2938 }, {
            'type': 4,
            'lat': '28.337427',
            'lon': '113.132186',
            'count': 2839
        }, { 'type': 4, 'lat': '28.194443', 'lon': '113.118933', 'count': 2457 }, {
            'type': 4,
            'lat': '28.13183',
            'lon': '113.04775',
            'count': 457
        }, { 'type': 4, 'lat': '28.177604', 'lon': '113.024983', 'count': 2191 }, {
            'type': 4,
            'lat': '28.139672',
            'lon': '113.092264',
            'count': 1687
        }, { 'type': 4, 'lat': '28.176632', 'lon': '113.136049', 'count': 2262 }, {
            'type': 4,
            'lat': '28.128142',
            'lon': '113.096779',
            'count': 1084
        }, { 'type': 4, 'lat': '28.263116', 'lon': '113.041182', 'count': 1596 }, {
            'type': 4,
            'lat': '28.299953',
            'lon': '113.102701',
            'count': 1568
        }, { 'type': 4, 'lat': '28.247496', 'lon': '113.019508', 'count': 329 }, {
            'type': 4,
            'lat': '28.199158',
            'lon': '113.081782',
            'count': 2646
        }, { 'type': 9, 'lat': '28.325746', 'lon': '113.081122', 'count': 4000 }, {
            'type': 9,
            'lat': '28.284174',
            'lon': '113.023018',
            'count': 656
        }, { 'type': 9, 'lat': '28.334618', 'lon': '113.129519', 'count': 613 }, {
            'type': 9,
            'lat': '28.319034',
            'lon': '113.112144',
            'count': 267
        }, { 'type': 9, 'lat': '28.308339', 'lon': '113.069556', 'count': 1046 }, {
            'type': 9,
            'lat': '28.32036',
            'lon': '113.006381',
            'count': 1387
        }, { 'type': 9, 'lat': '28.336624', 'lon': '113.091709', 'count': 2242 }, {
            'type': 9,
            'lat': '28.33455',
            'lon': '113.008102',
            'count': 2339
        }, { 'type': 9, 'lat': '28.297383', 'lon': '113.04834', 'count': 452 }, {
            'type': 9,
            'lat': '28.30252',
            'lon': '113.054452',
            'count': 1902
        }, { 'type': 9, 'lat': '28.315117', 'lon': '113.087419', 'count': 2397 }, {
            'type': 9,
            'lat': '28.283342',
            'lon': '113.062198',
            'count': 1075
        }, { 'type': 9, 'lat': '28.301504', 'lon': '113.068739', 'count': 2593 }, {
            'type': 9,
            'lat': '28.28262',
            'lon': '113.06002',
            'count': 2513
        }, { 'type': 9, 'lat': '28.337174', 'lon': '113.05102', 'count': 665 }, {
            'type': 9,
            'lat': '28.3166',
            'lon': '113.012593',
            'count': 2187
        }, { 'type': 9, 'lat': '28.288275', 'lon': '113.137898', 'count': 179 }, {
            'type': 9,
            'lat': '28.282884',
            'lon': '113.043231',
            'count': 1750
        }, { 'type': 9, 'lat': '28.286742', 'lon': '113.116061', 'count': 1602 }, {
            'type': 9,
            'lat': '28.331512',
            'lon': '113.085688',
            'count': 568
        }, { 'type': 9, 'lat': '28.338193', 'lon': '113.029567', 'count': 2417 }, {
            'type': 9,
            'lat': '28.327397',
            'lon': '113.097074',
            'count': 2142
        }, { 'type': 9, 'lat': '28.299586', 'lon': '113.07659', 'count': 700 }, {
            'type': 9,
            'lat': '28.315404',
            'lon': '113.019776',
            'count': 954
        }, { 'type': 9, 'lat': '28.307235', 'lon': '113.107102', 'count': 1626 }, {
            'type': 9,
            'lat': '28.298846',
            'lon': '113.091852',
            'count': 2202
        }, { 'type': 9, 'lat': '28.291588', 'lon': '113.136876', 'count': 276 }, {
            'type': 9,
            'lat': '28.333851',
            'lon': '113.071364',
            'count': 2397
        }, { 'type': 9, 'lat': '28.327681', 'lon': '113.017874', 'count': 1254 }, {
            'type': 9,
            'lat': '28.316508',
            'lon': '113.005953',
            'count': 1876
        }, { 'type': 9, 'lat': '28.308614', 'lon': '113.082829', 'count': 1784 }, {
            'type': 9,
            'lat': '28.299607',
            'lon': '113.059364',
            'count': 2118
        }, { 'type': 9, 'lat': '28.286586', 'lon': '113.024737', 'count': 2999 }, {
            'type': 9,
            'lat': '28.3343',
            'lon': '113.047711',
            'count': 371
        }, { 'type': 9, 'lat': '28.294574', 'lon': '113.062925', 'count': 2035 }, {
            'type': 9,
            'lat': '28.308132',
            'lon': '113.057798',
            'count': 1459
        }, { 'type': 9, 'lat': '28.299018', 'lon': '113.000321', 'count': 1755 }, {
            'type': 9,
            'lat': '28.338487',
            'lon': '113.043798',
            'count': 2814
        }, { 'type': 9, 'lat': '28.293866', 'lon': '113.091473', 'count': 288 }, {
            'type': 9,
            'lat': '28.318342',
            'lon': '113.108073',
            'count': 1738
        }, { 'type': 9, 'lat': '28.316795', 'lon': '113.10248', 'count': 2515 }, {
            'type': 9,
            'lat': '28.317443',
            'lon': '113.035863',
            'count': 2818
        }, { 'type': 9, 'lat': '28.291209', 'lon': '113.053488', 'count': 2278 }, {
            'type': 9,
            'lat': '28.293556',
            'lon': '113.142422',
            'count': 2303
        }, { 'type': 9, 'lat': '28.296339', 'lon': '113.023021', 'count': 1304 }, {
            'type': 9,
            'lat': '28.302995',
            'lon': '113.002601',
            'count': 168
        }, { 'type': 9, 'lat': '28.310164', 'lon': '113.045478', 'count': 2387 }, {
            'type': 9,
            'lat': '28.289355',
            'lon': '113.07453',
            'count': 1944
        }, { 'type': 9, 'lat': '28.328118', 'lon': '113.029885', 'count': 1600 }, {
            'type': 9,
            'lat': '28.298493',
            'lon': '113.077471',
            'count': 1451
        }, { 'type': 9, 'lat': '28.293748', 'lon': '113.10812', 'count': 2910 }, {
            'type': 9,
            'lat': '28.32656',
            'lon': '113.014299',
            'count': 2461
        }, { 'type': 9, 'lat': '28.316471', 'lon': '113.060039', 'count': 2340 }, {
            'type': 9,
            'lat': '28.326041',
            'lon': '113.008352',
            'count': 576
        }, { 'type': 9, 'lat': '28.285296', 'lon': '113.114157', 'count': 2220 }, {
            'type': 9,
            'lat': '28.301944',
            'lon': '113.0464',
            'count': 85
        }, { 'type': 9, 'lat': '28.337413', 'lon': '113.016875', 'count': 1813 }, {
            'type': 9,
            'lat': '28.288417',
            'lon': '113.018692',
            'count': 157
        }, { 'type': 9, 'lat': '28.305078', 'lon': '113.050382', 'count': 2710 }, {
            'type': 9,
            'lat': '28.316124',
            'lon': '113.124566',
            'count': 2952
        }, { 'type': 9, 'lat': '28.286544', 'lon': '113.119512', 'count': 1652 }, {
            'type': 9,
            'lat': '28.314837',
            'lon': '113.139125',
            'count': 1044
        }, { 'type': 9, 'lat': '28.313625', 'lon': '113.013359', 'count': 1112 }, {
            'type': 9,
            'lat': '28.319958',
            'lon': '113.075255',
            'count': 80
        }, { 'type': 9, 'lat': '28.311927', 'lon': '113.084487', 'count': 73 }, {
            'type': 9,
            'lat': '28.338525',
            'lon': '113.054545',
            'count': 2672
        }, { 'type': 9, 'lat': '28.336203', 'lon': '113.122416', 'count': 629 }, {
            'type': 9,
            'lat': '28.322824',
            'lon': '113.074854',
            'count': 1557
        }, { 'type': 9, 'lat': '28.292868', 'lon': '113.024557', 'count': 927 }, {
            'type': 9,
            'lat': '28.303863',
            'lon': '113.010004',
            'count': 2263
        }, { 'type': 9, 'lat': '28.289948', 'lon': '113.107301', 'count': 1243 }, {
            'type': 9,
            'lat': '28.314879',
            'lon': '113.012055',
            'count': 2624
        }, { 'type': 9, 'lat': '28.291832', 'lon': '113.068778', 'count': 1400 }, {
            'type': 9,
            'lat': '28.285459',
            'lon': '113.118741',
            'count': 455
        }, { 'type': 9, 'lat': '28.335885', 'lon': '113.12804', 'count': 2162 }, {
            'type': 9,
            'lat': '28.296299',
            'lon': '113.084183',
            'count': 2265
        }, { 'type': 9, 'lat': '28.325017', 'lon': '113.050029', 'count': 2157 }, {
            'type': 9,
            'lat': '28.292525',
            'lon': '113.024411',
            'count': 1649
        }, { 'type': 9, 'lat': '28.335617', 'lon': '113.019042', 'count': 2560 }, {
            'type': 9,
            'lat': '28.293613',
            'lon': '113.105508',
            'count': 1758
        }, { 'type': 9, 'lat': '28.328969999999998', 'lon': '113.078455', 'count': 2701 }, {
            'type': 9,
            'lat': '28.337545',
            'lon': '113.009563',
            'count': 818
        }, { 'type': 9, 'lat': '28.326141', 'lon': '113.005813', 'count': 1468 }, {
            'type': 9,
            'lat': '28.335208',
            'lon': '113.05611',
            'count': 2122
        }, { 'type': 9, 'lat': '28.321424', 'lon': '113.044627', 'count': 1720 }, {
            'type': 9,
            'lat': '28.299381',
            'lon': '113.137722',
            'count': 180
        }, { 'type': 9, 'lat': '28.297494', 'lon': '113.021352', 'count': 623 }, {
            'type': 9,
            'lat': '28.32963',
            'lon': '113.006863',
            'count': 1663
        }, { 'type': 9, 'lat': '28.334324', 'lon': '113.025518', 'count': 850 }, {
            'type': 9,
            'lat': '28.307416',
            'lon': '113.131896',
            'count': 1013
        }, { 'type': 9, 'lat': '28.325357', 'lon': '113.092551', 'count': 1938 }, {
            'type': 9,
            'lat': '28.315726',
            'lon': '113.098201',
            'count': 388
        }, { 'type': 9, 'lat': '28.295657', 'lon': '113.033138', 'count': 1575 }, {
            'type': 9,
            'lat': '28.309177',
            'lon': '113.117223',
            'count': 2527
        }, { 'type': 9, 'lat': '28.287412', 'lon': '113.075248', 'count': 2546 }, {
            'type': 9,
            'lat': '28.284921',
            'lon': '113.101982',
            'count': 2155
        }, { 'type': 9, 'lat': '28.309294', 'lon': '113.00232', 'count': 2968 }, {
            'type': 9,
            'lat': '28.285875',
            'lon': '113.064006',
            'count': 2540
        }, { 'type': 9, 'lat': '28.326875', 'lon': '113.065557', 'count': 2787 }, {
            'type': 9,
            'lat': '28.291006',
            'lon': '113.015263',
            'count': 1490
        }, { 'type': 9, 'lat': '28.320023', 'lon': '113.098941', 'count': 2828 }, {
            'type': 9,
            'lat': '28.315244',
            'lon': '113.063541',
            'count': 683
        }, { 'type': 9, 'lat': '28.310169', 'lon': '113.107184', 'count': 892 }, {
            'type': 9,
            'lat': '28.319833',
            'lon': '113.045768',
            'count': 630
        }, { 'type': 9, 'lat': '28.301726', 'lon': '113.046488', 'count': 1667 }, {
            'type': 9,
            'lat': '28.32705',
            'lon': '113.044235',
            'count': 1604
        }, { 'type': 9, 'lat': '28.333434', 'lon': '113.00634', 'count': 166 }, {
            'type': 9,
            'lat': '28.286876',
            'lon': '113.086595',
            'count': 2902
        }, { 'type': 9, 'lat': '28.336808', 'lon': '113.086039', 'count': 691 }, {
            'type': 9,
            'lat': '28.329169',
            'lon': '113.126063',
            'count': 2993
        }, { 'type': 9, 'lat': '28.319897', 'lon': '113.061873', 'count': 107 }, {
            'type': 9,
            'lat': '28.327829',
            'lon': '113.05978',
            'count': 651
        }, { 'type': 9, 'lat': '28.333548', 'lon': '113.062285', 'count': 2037 }, {
            'type': 9,
            'lat': '28.31779',
            'lon': '113.03445',
            'count': 747
        }, { 'type': 9, 'lat': '28.325981', 'lon': '113.084766', 'count': 708 }, {
            'type': 9,
            'lat': '28.338652',
            'lon': '113.068669',
            'count': 2934
        }, { 'type': 9, 'lat': '28.294267', 'lon': '113.10697', 'count': 1865 }, {
            'type': 9,
            'lat': '28.285444',
            'lon': '113.028799',
            'count': 703
        }, { 'type': 9, 'lat': '28.297499', 'lon': '113.093903', 'count': 2437 }, {
            'type': 9,
            'lat': '28.304462',
            'lon': '113.015261',
            'count': 2764
        }, { 'type': 9, 'lat': '28.332958', 'lon': '113.105383', 'count': 1100 }, {
            'type': 9,
            'lat': '28.322116',
            'lon': '113.041934',
            'count': 810
        }, { 'type': 9, 'lat': '28.290615', 'lon': '113.101023', 'count': 996 }, {
            'type': 9,
            'lat': '28.336746',
            'lon': '113.061477',
            'count': 1637
        }, { 'type': 9, 'lat': '28.338261', 'lon': '113.068753', 'count': 184 }, {
            'type': 9,
            'lat': '28.294526',
            'lon': '113.040298',
            'count': 1300
        }, { 'type': 9, 'lat': '28.33875', 'lon': '113.121339', 'count': 1162 }, {
            'type': 9,
            'lat': '28.316955',
            'lon': '113.123821',
            'count': 627
        }, { 'type': 9, 'lat': '28.287398', 'lon': '113.030449', 'count': 1513 }, {
            'type': 9,
            'lat': '28.292093',
            'lon': '113.009489',
            'count': 2684
        }, { 'type': 9, 'lat': '28.312724', 'lon': '113.053963', 'count': 331 }, {
            'type': 9,
            'lat': '28.29305',
            'lon': '113.004836',
            'count': 2628
        }, { 'type': 9, 'lat': '28.315529', 'lon': '113.077025', 'count': 1444 }, {
            'type': 9,
            'lat': '28.331216',
            'lon': '113.140996',
            'count': 2668
        }, { 'type': 9, 'lat': '28.316163', 'lon': '113.046768', 'count': 31 }, {
            'type': 9,
            'lat': '28.336744',
            'lon': '113.035381',
            'count': 1463
        }, { 'type': 9, 'lat': '28.33409', 'lon': '113.070407', 'count': 1479 }, {
            'type': 9,
            'lat': '28.323694',
            'lon': '113.131893',
            'count': 6
        }, { 'type': 9, 'lat': '28.320971', 'lon': '113.057694', 'count': 1400 }, {
            'type': 9,
            'lat': '28.28691',
            'lon': '113.110653',
            'count': 1909
        }, { 'type': 9, 'lat': '28.328305', 'lon': '113.106185', 'count': 2472 }, {
            'type': 9,
            'lat': '28.32677',
            'lon': '113.142402',
            'count': 108
        }, { 'type': 9, 'lat': '28.308281', 'lon': '113.022409', 'count': 1148 }, {
            'type': 9,
            'lat': '28.32692',
            'lon': '113.111993',
            'count': 2155
        }, { 'type': 9, 'lat': '28.316876', 'lon': '113.119788', 'count': 2050 }, {
            'type': 9,
            'lat': '28.290749',
            'lon': '113.117492',
            'count': 2012
        }, { 'type': 9, 'lat': '28.30235', 'lon': '113.080859', 'count': 1703 }, {
            'type': 9,
            'lat': '28.294824',
            'lon': '113.08109',
            'count': 1235
        }, { 'type': 9, 'lat': '28.307584', 'lon': '113.111673', 'count': 2698 }, {
            'type': 9,
            'lat': '28.314156',
            'lon': '113.092869',
            'count': 529
        }, { 'type': 9, 'lat': '28.30691', 'lon': '113.011114', 'count': 2768 }, {
            'type': 9,
            'lat': '28.320631',
            'lon': '113.046029',
            'count': 1297
        }, { 'type': 9, 'lat': '28.291024', 'lon': '113.02365', 'count': 1507 }, {
            'type': 9,
            'lat': '28.321897',
            'lon': '113.05015',
            'count': 930
        }, { 'type': 9, 'lat': '28.3309', 'lon': '113.131708', 'count': 622 }, {
            'type': 9,
            'lat': '28.30024',
            'lon': '113.112583',
            'count': 982
        }, { 'type': 9, 'lat': '28.300667', 'lon': '113.06087', 'count': 2695 }, {
            'type': 9,
            'lat': '28.324897',
            'lon': '113.030738',
            'count': 1429
        }, { 'type': 9, 'lat': '28.287864', 'lon': '113.119979', 'count': 884 }, {
            'type': 9,
            'lat': '28.292281',
            'lon': '113.118161',
            'count': 1186
        }, { 'type': 9, 'lat': '28.322184', 'lon': '113.006904', 'count': 2171 }, {
            'type': 9,
            'lat': '28.33686',
            'lon': '113.044596',
            'count': 912
        }, { 'type': 9, 'lat': '28.287302', 'lon': '113.018865', 'count': 1304 }, {
            'type': 9,
            'lat': '28.307882',
            'lon': '113.003326',
            'count': 2439
        }, { 'type': 9, 'lat': '28.318145', 'lon': '113.04701', 'count': 2441 }, {
            'type': 9,
            'lat': '28.306022',
            'lon': '113.082058',
            'count': 2391
        }, { 'type': 9, 'lat': '28.336848', 'lon': '113.114405', 'count': 1623 }, {
            'type': 9,
            'lat': '28.301762',
            'lon': '113.036769',
            'count': 2241
        }, { 'type': 9, 'lat': '28.297482', 'lon': '113.009609', 'count': 896 }, {
            'type': 9,
            'lat': '28.318362',
            'lon': '113.005501',
            'count': 851
        }, { 'type': 9, 'lat': '28.292331', 'lon': '113.01717', 'count': 1310 }, {
            'type': 9,
            'lat': '28.305362',
            'lon': '113.138062',
            'count': 911
        }, { 'type': 9, 'lat': '28.284622', 'lon': '113.003386', 'count': 2917 }, {
            'type': 9,
            'lat': '28.297296',
            'lon': '113.045969',
            'count': 410
        }, { 'type': 9, 'lat': '28.294208', 'lon': '113.071639', 'count': 483 }, {
            'type': 9,
            'lat': '28.333569',
            'lon': '113.083065',
            'count': 917
        }, { 'type': 9, 'lat': '28.337777', 'lon': '113.018211', 'count': 2638 }, {
            'type': 9,
            'lat': '28.324984',
            'lon': '113.007518',
            'count': 1403
        }, { 'type': 9, 'lat': '28.338303', 'lon': '113.04914', 'count': 1056 }, {
            'type': 9,
            'lat': '28.299321',
            'lon': '113.008194',
            'count': 513
        }, { 'type': 9, 'lat': '28.299177', 'lon': '113.060338', 'count': 1615 }, {
            'type': 9,
            'lat': '28.321478',
            'lon': '113.04272',
            'count': 464
        }, { 'type': 9, 'lat': '28.324286999999998', 'lon': '113.117834', 'count': 2990 }, {
            'type': 9,
            'lat': '28.310162',
            'lon': '113.101172',
            'count': 1402
        }, { 'type': 9, 'lat': '28.338814', 'lon': '113.067272', 'count': 1089 }, {
            'type': 9,
            'lat': '28.309972',
            'lon': '113.071425',
            'count': 998
        }, { 'type': 9, 'lat': '28.314902', 'lon': '113.139351', 'count': 2391 }, {
            'type': 9,
            'lat': '28.283828',
            'lon': '113.034188',
            'count': 98
        }, { 'type': 9, 'lat': '28.285708', 'lon': '113.101749', 'count': 1149 }, {
            'type': 9,
            'lat': '28.318861',
            'lon': '113.0826',
            'count': 820
        }, { 'type': 9, 'lat': '28.29096', 'lon': '113.103015', 'count': 334 }, {
            'type': 9,
            'lat': '28.315075',
            'lon': '113.047193',
            'count': 360
        }, { 'type': 9, 'lat': '28.311096', 'lon': '113.107507', 'count': 2335 }, {
            'type': 9,
            'lat': '28.323186',
            'lon': '113.135362',
            'count': 2806
        }, { 'type': 9, 'lat': '28.298223', 'lon': '113.037713', 'count': 181 }, {
            'type': 9,
            'lat': '28.289388',
            'lon': '113.009366',
            'count': 2646
        }, { 'type': 9, 'lat': '28.292792', 'lon': '113.100463', 'count': 2332 }, {
            'type': 9,
            'lat': '28.304354',
            'lon': '113.093015',
            'count': 2335
        }, { 'type': 9, 'lat': '28.290755', 'lon': '113.074318', 'count': 642 }, {
            'type': 9,
            'lat': '28.290498',
            'lon': '113.09549',
            'count': 2871
        }
    ]
})
let populationHour = Mock.mock({
    'rows': [
        { 'type': 1, 'lat': '28.192183', 'lon': '113.135477', 'count': 3000 }, {
            'type': 1,
            'lat': '28.184919',
            'lon': '113.015928',
            'count': 2035
        }, { 'type': 1, 'lat': '28.184837', 'lon': '112.846403', 'count': 1088 }, {
            'type': 1,
            'lat': '28.275818',
            'lon': '112.949265',
            'count': 1955
        }, { 'type': 1, 'lat': '28.308826', 'lon': '112.866801', 'count': 1074 }, {
            'type': 1,
            'lat': '28.146654',
            'lon': '112.838977',
            'count': 1894
        }, { 'type': 1, 'lat': '28.195202', 'lon': '112.873468', 'count': 1440 }, {
            'type': 1,
            'lat': '28.294546',
            'lon': '112.874848',
            'count': 1695
        }, { 'type': 1, 'lat': '28.249476', 'lon': '112.910136', 'count': 1310 }, {
            'type': 1,
            'lat': '28.121452',
            'lon': '112.873814',
            'count': 1166
        }, { 'type': 1, 'lat': '28.257269', 'lon': '112.962443', 'count': 1070 }, {
            'type': 1,
            'lat': '28.223857',
            'lon': '112.817994',
            'count': 1182
        }, { 'type': 1, 'lat': '28.096263', 'lon': '112.887234', 'count': 1237 }, {
            'type': 1,
            'lat': '28.201988',
            'lon': '112.964552',
            'count': 1831
        }, { 'type': 1, 'lat': '28.316746', 'lon': '112.842508', 'count': 1499 }, {
            'type': 1,
            'lat': '28.12769',
            'lon': '112.922746',
            'count': 1234
        }, { 'type': 1, 'lat': '28.19858', 'lon': '112.887939', 'count': 1397 }, {
            'type': 1,
            'lat': '28.118752',
            'lon': '112.928992',
            'count': 1882
        }, { 'type': 1, 'lat': '28.191868', 'lon': '112.867034', 'count': 1663 }, {
            'type': 1,
            'lat': '28.297328',
            'lon': '112.973265',
            'count': 1918
        }, { 'type': 1, 'lat': '28.241518', 'lon': '112.94629', 'count': 1474 }, {
            'type': 1,
            'lat': '28.187828',
            'lon': '112.897366',
            'count': 1813
        }, { 'type': 1, 'lat': '28.270915', 'lon': '112.900448', 'count': 1705 }, {
            'type': 1,
            'lat': '28.121069',
            'lon': '112.923948',
            'count': 1663
        }, { 'type': 1, 'lat': '28.301321', 'lon': '112.91508', 'count': 1439 }, {
            'type': 1,
            'lat': '28.19971',
            'lon': '112.834503',
            'count': 1467
        }, { 'type': 1, 'lat': '28.091068', 'lon': '112.93528', 'count': 1451 }, {
            'type': 1,
            'lat': '28.106347',
            'lon': '112.836948',
            'count': 1279
        }, { 'type': 1, 'lat': '28.247784', 'lon': '112.877352', 'count': 1146 }, {
            'type': 1,
            'lat': '28.182904',
            'lon': '112.856371',
            'count': 1174
        }, { 'type': 1, 'lat': '28.312001', 'lon': '112.828675', 'count': 1386 }, {
            'type': 1,
            'lat': '28.230037',
            'lon': '112.833894',
            'count': 1943
        }, { 'type': 1, 'lat': '28.100641', 'lon': '112.837911', 'count': 1415 }, {
            'type': 1,
            'lat': '28.246832',
            'lon': '112.904596',
            'count': 1455
        }, { 'type': 1, 'lat': '28.263604', 'lon': '112.990663', 'count': 1730 }, {
            'type': 1,
            'lat': '28.186501',
            'lon': '112.865578',
            'count': 1002
        }, { 'type': 1, 'lat': '28.114524', 'lon': '112.936705', 'count': 1790 }, {
            'type': 1,
            'lat': '28.161694',
            'lon': '112.885549',
            'count': 1772
        }, { 'type': 1, 'lat': '28.254034', 'lon': '112.98842', 'count': 1410 }, {
            'type': 1,
            'lat': '28.281205',
            'lon': '112.930751',
            'count': 1684
        }, { 'type': 1, 'lat': '28.274179', 'lon': '112.930008', 'count': 1576 }, {
            'type': 1,
            'lat': '28.135895',
            'lon': '112.826042',
            'count': 1600
        }, { 'type': 1, 'lat': '28.307295', 'lon': '112.839957', 'count': 1723 }, {
            'type': 1,
            'lat': '28.125447',
            'lon': '112.91047',
            'count': 1924
        }, { 'type': 1, 'lat': '28.306991', 'lon': '112.970876', 'count': 1195 }, {
            'type': 1,
            'lat': '28.188488',
            'lon': '112.826618',
            'count': 1192
        }, { 'type': 1, 'lat': '28.105889', 'lon': '112.937549', 'count': 1720 }, {
            'type': 1,
            'lat': '28.302723',
            'lon': '112.939958',
            'count': 1493
        }, { 'type': 1, 'lat': '28.153604', 'lon': '112.927907', 'count': 1201 }, {
            'type': 1,
            'lat': '28.288713',
            'lon': '112.836198',
            'count': 1167
        }, { 'type': 1, 'lat': '28.247447', 'lon': '112.86042', 'count': 1331 }, {
            'type': 1,
            'lat': '28.271167',
            'lon': '112.969521',
            'count': 1969
        }, { 'type': 1, 'lat': '28.146174', 'lon': '112.970772', 'count': 1491 }, {
            'type': 1,
            'lat': '28.194388',
            'lon': '112.956374',
            'count': 1485
        }, { 'type': 1, 'lat': '28.094067', 'lon': '112.850552', 'count': 1198 }, {
            'type': 1,
            'lat': '28.090956',
            'lon': '112.97091',
            'count': 1781
        }, { 'type': 1, 'lat': '28.126529', 'lon': '112.819206', 'count': 1998 }, {
            'type': 1,
            'lat': '28.214378',
            'lon': '112.865933',
            'count': 1442
        }, { 'type': 1, 'lat': '28.2125', 'lon': '112.835851', 'count': 1273 }, {
            'type': 1,
            'lat': '28.16004',
            'lon': '112.931015',
            'count': 1780
        }, { 'type': 1, 'lat': '28.182571', 'lon': '112.848235', 'count': 1884 }, {
            'type': 1,
            'lat': '28.162332',
            'lon': '112.863834',
            'count': 1602
        }, { 'type': 1, 'lat': '28.2433', 'lon': '112.846464', 'count': 1737 }, {
            'type': 1,
            'lat': '28.276157',
            'lon': '112.960487',
            'count': 1339
        }, { 'type': 1, 'lat': '28.165035', 'lon': '112.966649', 'count': 1593 }, {
            'type': 1,
            'lat': '28.20473',
            'lon': '112.967626',
            'count': 1680
        }, { 'type': 1, 'lat': '28.135882', 'lon': '112.90998', 'count': 1835 }, {
            'type': 1,
            'lat': '28.328675',
            'lon': '112.976808',
            'count': 1939
        }, { 'type': 1, 'lat': '28.099407', 'lon': '112.903362', 'count': 1879 }, {
            'type': 1,
            'lat': '28.135982',
            'lon': '112.928242',
            'count': 1866
        }, { 'type': 1, 'lat': '28.235392', 'lon': '112.957578', 'count': 1158 }, {
            'type': 1,
            'lat': '28.139077',
            'lon': '112.890108',
            'count': 1759
        }, { 'type': 1, 'lat': '28.268551', 'lon': '112.817363', 'count': 1673 }, {
            'type': 1,
            'lat': '28.183208',
            'lon': '112.981393',
            'count': 1252
        }, { 'type': 1, 'lat': '28.291791', 'lon': '112.906061', 'count': 1648 }, {
            'type': 1,
            'lat': '28.156384',
            'lon': '112.941056',
            'count': 1625
        }, { 'type': 1, 'lat': '28.178018', 'lon': '112.898979', 'count': 1815 }, {
            'type': 1,
            'lat': '28.101036',
            'lon': '112.862737',
            'count': 1206
        }, { 'type': 1, 'lat': '28.338073', 'lon': '112.859572', 'count': 1843 }, {
            'type': 1,
            'lat': '28.189095000000002',
            'lon': '112.981819',
            'count': 1895
        }, { 'type': 1, 'lat': '28.129603', 'lon': '112.876081', 'count': 1863 }, {
            'type': 1,
            'lat': '28.172328',
            'lon': '112.841982',
            'count': 1200
        }, { 'type': 1, 'lat': '28.320538', 'lon': '112.965243', 'count': 1207 }, {
            'type': 1,
            'lat': '28.307238',
            'lon': '112.886068',
            'count': 1160
        }, { 'type': 1, 'lat': '28.193653', 'lon': '112.877021', 'count': 1465 }, {
            'type': 1,
            'lat': '28.334069',
            'lon': '112.97103',
            'count': 1036
        }, { 'type': 1, 'lat': '28.324447', 'lon': '112.963977', 'count': 1647 }, {
            'type': 1,
            'lat': '28.098709',
            'lon': '112.906243',
            'count': 1798
        }, { 'type': 1, 'lat': '28.250917', 'lon': '112.908085', 'count': 1960 }, {
            'type': 1,
            'lat': '28.224082',
            'lon': '112.901624',
            'count': 1316
        }, { 'type': 1, 'lat': '28.275971', 'lon': '112.949695', 'count': 1577 }, {
            'type': 1,
            'lat': '28.234641',
            'lon': '112.965014',
            'count': 1279
        }, { 'type': 1, 'lat': '28.120321', 'lon': '112.897068', 'count': 1059 }, {
            'type': 1,
            'lat': '28.326271',
            'lon': '112.980773',
            'count': 1295
        }, { 'type': 1, 'lat': '28.293477', 'lon': '112.970906', 'count': 1566 }, {
            'type': 1,
            'lat': '28.267933',
            'lon': '112.836315',
            'count': 1518
        }, { 'type': 1, 'lat': '28.117234', 'lon': '112.890377', 'count': 1137 }, {
            'type': 1,
            'lat': '28.131781',
            'lon': '112.814714',
            'count': 1469
        }, { 'type': 1, 'lat': '28.210739', 'lon': '112.894379', 'count': 1727 }, {
            'type': 1,
            'lat': '28.258209',
            'lon': '112.886624',
            'count': 1923
        }, { 'type': 1, 'lat': '28.1302', 'lon': '112.941553', 'count': 1029 }, {
            'type': 1,
            'lat': '28.196816',
            'lon': '112.985345',
            'count': 1356
        }, { 'type': 1, 'lat': '28.143819', 'lon': '112.908737', 'count': 1444 }, {
            'type': 1,
            'lat': '28.117961',
            'lon': '112.918149',
            'count': 1464
        }, { 'type': 1, 'lat': '28.264443', 'lon': '112.867292', 'count': 1200 }, {
            'type': 1,
            'lat': '28.181582',
            'lon': '112.813604',
            'count': 1947
        }, { 'type': 1, 'lat': '28.322563', 'lon': '112.835985', 'count': 1649 }, {
            'type': 1,
            'lat': '28.092202',
            'lon': '112.919811',
            'count': 1851
        }, { 'type': 1, 'lat': '28.218546', 'lon': '112.887568', 'count': 1838 }, {
            'type': 1,
            'lat': '28.264475',
            'lon': '112.924452',
            'count': 1823
        }, { 'type': 1, 'lat': '28.268057', 'lon': '112.935158', 'count': 1474 }, {
            'type': 1,
            'lat': '28.15462',
            'lon': '112.847191',
            'count': 1958
        }, { 'type': 1, 'lat': '28.306333', 'lon': '112.988152', 'count': 1270 }, {
            'type': 1,
            'lat': '28.255597',
            'lon': '112.872626',
            'count': 1582
        }, { 'type': 1, 'lat': '28.235486', 'lon': '112.837979', 'count': 1816 }, {
            'type': 1,
            'lat': '28.123786',
            'lon': '112.928537',
            'count': 1113
        }, { 'type': 1, 'lat': '28.141469', 'lon': '112.893323', 'count': 1181 }, {
            'type': 1,
            'lat': '28.215825',
            'lon': '112.957399',
            'count': 1347
        }, { 'type': 1, 'lat': '28.239989', 'lon': '112.860856', 'count': 1334 }, {
            'type': 1,
            'lat': '28.20217',
            'lon': '112.889684',
            'count': 1053
        }, { 'type': 1, 'lat': '28.176336', 'lon': '112.826807', 'count': 1657 }, {
            'type': 1,
            'lat': '28.292976',
            'lon': '112.821383',
            'count': 1027
        }, { 'type': 1, 'lat': '28.116438', 'lon': '112.935558', 'count': 1103 }, {
            'type': 1,
            'lat': '28.293346',
            'lon': '112.907479',
            'count': 1458
        }, { 'type': 1, 'lat': '28.322713', 'lon': '112.893271', 'count': 1755 }, {
            'type': 1,
            'lat': '28.325196',
            'lon': '112.880489',
            'count': 1442
        }, { 'type': 1, 'lat': '28.300448', 'lon': '112.873674', 'count': 1312 }, {
            'type': 1,
            'lat': '28.177508',
            'lon': '112.889461',
            'count': 1706
        }, { 'type': 1, 'lat': '28.333263', 'lon': '112.862821', 'count': 1734 }, {
            'type': 1,
            'lat': '28.117444',
            'lon': '112.873208',
            'count': 1980
        }, { 'type': 1, 'lat': '28.089271', 'lon': '112.879833', 'count': 1204 }, {
            'type': 1,
            'lat': '28.098646',
            'lon': '112.890144',
            'count': 1593
        }, { 'type': 1, 'lat': '28.220165', 'lon': '112.920471', 'count': 1927 }, {
            'type': 1,
            'lat': '28.232545000000002',
            'lon': '112.876629',
            'count': 1744
        }, { 'type': 1, 'lat': '28.326436', 'lon': '112.928754', 'count': 1624 }, {
            'type': 1,
            'lat': '28.332694',
            'lon': '112.96939',
            'count': 1309
        }, { 'type': 1, 'lat': '28.108112', 'lon': '112.95717', 'count': 1129 }, {
            'type': 1,
            'lat': '28.177105',
            'lon': '112.915882',
            'count': 1585
        }, { 'type': 1, 'lat': '28.268226', 'lon': '112.977251', 'count': 1889 }, {
            'type': 1,
            'lat': '28.103972',
            'lon': '112.932485',
            'count': 1073
        }, { 'type': 1, 'lat': '28.312058', 'lon': '112.85838', 'count': 1096 }, {
            'type': 1,
            'lat': '28.16085',
            'lon': '112.896258',
            'count': 1066
        }, { 'type': 1, 'lat': '28.100786', 'lon': '112.833445', 'count': 1422 }, {
            'type': 1,
            'lat': '28.098219',
            'lon': '112.860837',
            'count': 1919
        }, { 'type': 1, 'lat': '28.224808', 'lon': '112.897862', 'count': 1321 }, {
            'type': 1,
            'lat': '28.240172',
            'lon': '112.940539',
            'count': 1118
        }, { 'type': 1, 'lat': '28.220714', 'lon': '112.840233', 'count': 1220 }, {
            'type': 1,
            'lat': '28.238307',
            'lon': '112.852609',
            'count': 1207
        }, { 'type': 1, 'lat': '28.275096', 'lon': '112.846319', 'count': 1422 }, {
            'type': 1,
            'lat': '28.182871',
            'lon': '112.987305',
            'count': 1448
        }, { 'type': 1, 'lat': '28.320589', 'lon': '112.927697', 'count': 1295 }, {
            'type': 1,
            'lat': '28.33782',
            'lon': '112.90845',
            'count': 1781
        }, { 'type': 1, 'lat': '28.131373', 'lon': '112.947074', 'count': 1402 }, {
            'type': 1,
            'lat': '28.18539',
            'lon': '112.866919',
            'count': 1310
        }, { 'type': 1, 'lat': '28.326245', 'lon': '112.975608', 'count': 1723 }, {
            'type': 1,
            'lat': '28.100088',
            'lon': '112.957231',
            'count': 1635
        }, { 'type': 1, 'lat': '28.155198', 'lon': '112.896277', 'count': 1905 }, {
            'type': 1,
            'lat': '28.163658',
            'lon': '112.98467',
            'count': 1632
        }, { 'type': 1, 'lat': '28.169196', 'lon': '112.893188', 'count': 1762 }, {
            'type': 1,
            'lat': '28.290035',
            'lon': '112.868767',
            'count': 1958
        }, { 'type': 1, 'lat': '28.243622', 'lon': '112.868454', 'count': 1908 }, {
            'type': 1,
            'lat': '28.151307',
            'lon': '112.962562',
            'count': 1662
        }, { 'type': 1, 'lat': '28.311828', 'lon': '112.964524', 'count': 1962 }, {
            'type': 1,
            'lat': '28.218842',
            'lon': '112.989071',
            'count': 1662
        }, { 'type': 1, 'lat': '28.250688', 'lon': '112.844384', 'count': 1505 }, {
            'type': 1,
            'lat': '28.258368',
            'lon': '112.862062',
            'count': 1400
        }, { 'type': 1, 'lat': '28.096956', 'lon': '112.969922', 'count': 1964 }, {
            'type': 1,
            'lat': '28.338488',
            'lon': '112.902666',
            'count': 1513
        }, { 'type': 1, 'lat': '28.224182', 'lon': '112.8284', 'count': 1582 }, {
            'type': 1,
            'lat': '28.236232',
            'lon': '112.896092',
            'count': 1246
        }, { 'type': 1, 'lat': '28.126575', 'lon': '112.889378', 'count': 1899 }, {
            'type': 1,
            'lat': '28.264299',
            'lon': '112.821925',
            'count': 1750
        }, { 'type': 1, 'lat': '28.320983', 'lon': '112.913196', 'count': 1785 }, {
            'type': 1,
            'lat': '28.259374',
            'lon': '112.975993',
            'count': 1171
        }, { 'type': 1, 'lat': '28.286861', 'lon': '112.877465', 'count': 1806 }, {
            'type': 1,
            'lat': '28.102062',
            'lon': '112.912021',
            'count': 1113
        }, { 'type': 1, 'lat': '28.28566', 'lon': '112.980241', 'count': 1061 }, {
            'type': 1,
            'lat': '28.150675',
            'lon': '112.94652',
            'count': 1429
        }, { 'type': 1, 'lat': '28.116202', 'lon': '112.895759', 'count': 1824 }, {
            'type': 1,
            'lat': '28.204375',
            'lon': '112.891652',
            'count': 1710
        }, { 'type': 1, 'lat': '28.271766', 'lon': '112.873987', 'count': 1133 }, {
            'type': 1,
            'lat': '28.10757',
            'lon': '112.913268',
            'count': 1310
        }, { 'type': 1, 'lat': '28.250118', 'lon': '112.957811', 'count': 1662 }, {
            'type': 1,
            'lat': '28.22537',
            'lon': '112.927311',
            'count': 1063
        }, { 'type': 1, 'lat': '28.259471', 'lon': '112.941284', 'count': 1161 }, {
            'type': 1,
            'lat': '28.297517',
            'lon': '112.85457099999999',
            'count': 1645
        }, { 'type': 1, 'lat': '28.230822', 'lon': '112.909253', 'count': 1019 }, {
            'type': 1,
            'lat': '28.31145',
            'lon': '112.971216',
            'count': 1771
        }, { 'type': 1, 'lat': '28.265829', 'lon': '112.911519', 'count': 1582 }, {
            'type': 1,
            'lat': '28.311965',
            'lon': '112.982634',
            'count': 1686
        }, { 'type': 1, 'lat': '28.204037', 'lon': '112.965364', 'count': 1370 }, {
            'type': 1,
            'lat': '28.242582',
            'lon': '112.913642',
            'count': 1230
        }, { 'type': 1, 'lat': '28.13003', 'lon': '112.904966', 'count': 1823 }, {
            'type': 1,
            'lat': '28.204886',
            'lon': '112.833287',
            'count': 1840
        }, { 'type': 1, 'lat': '28.183982', 'lon': '112.938377', 'count': 1350 }, {
            'type': 1,
            'lat': '28.277983',
            'lon': '112.97306',
            'count': 1913
        }, { 'type': 1, 'lat': '28.116255', 'lon': '112.878235', 'count': 1541 }, {
            'type': 1,
            'lat': '28.098645',
            'lon': '112.827358',
            'count': 1375
        }, { 'type': 1, 'lat': '28.090341', 'lon': '112.948018', 'count': 1692 }, {
            'type': 1,
            'lat': '28.229407',
            'lon': '112.955187',
            'count': 1915
        }, { 'type': 1, 'lat': '28.322837', 'lon': '112.820248', 'count': 1889 }, {
            'type': 1,
            'lat': '28.129977',
            'lon': '112.9848',
            'count': 1056
        }, { 'type': 1, 'lat': '28.186015', 'lon': '113.044357', 'count': 642 }, {
            'type': 1,
            'lat': '28.325863',
            'lon': '113.049851',
            'count': 2617
        }, { 'type': 1, 'lat': '28.224308', 'lon': '113.067533', 'count': 2936 }, {
            'type': 1,
            'lat': '28.241234',
            'lon': '113.055866',
            'count': 41
        }, { 'type': 1, 'lat': '28.338539', 'lon': '113.133021', 'count': 1315 }, {
            'type': 1,
            'lat': '28.18923',
            'lon': '113.108196',
            'count': 176
        }, { 'type': 1, 'lat': '28.276568', 'lon': '113.058928', 'count': 2614 }, {
            'type': 1,
            'lat': '28.276749',
            'lon': '113.06676',
            'count': 2753
        }, { 'type': 1, 'lat': '28.113885', 'lon': '113.06646', 'count': 2390 }, {
            'type': 1,
            'lat': '28.300342',
            'lon': '113.069401',
            'count': 949
        }, { 'type': 1, 'lat': '28.223774', 'lon': '113.019523', 'count': 1069 }, {
            'type': 1,
            'lat': '28.315236',
            'lon': '113.035138',
            'count': 716
        }, { 'type': 1, 'lat': '28.202766', 'lon': '113.128527', 'count': 1534 }, {
            'type': 1,
            'lat': '28.200585',
            'lon': '113.035612',
            'count': 1904
        }, { 'type': 1, 'lat': '28.31316', 'lon': '113.129523', 'count': 340 }, {
            'type': 1,
            'lat': '28.313017',
            'lon': '113.088422',
            'count': 2432
        }, { 'type': 1, 'lat': '28.165465', 'lon': '113.09387', 'count': 2394 }, {
            'type': 1,
            'lat': '28.112255',
            'lon': '113.046829',
            'count': 792
        }, { 'type': 1, 'lat': '28.112046', 'lon': '113.010175', 'count': 2395 }, {
            'type': 1,
            'lat': '28.085964',
            'lon': '113.077125',
            'count': 1650
        }, { 'type': 1, 'lat': '28.290025', 'lon': '113.019834', 'count': 2436 }, {
            'type': 1,
            'lat': '28.279274',
            'lon': '113.017324',
            'count': 1526
        }, { 'type': 1, 'lat': '28.180287', 'lon': '113.109556', 'count': 1239 }, {
            'type': 1,
            'lat': '28.103764',
            'lon': '113.019881',
            'count': 2606
        }, { 'type': 1, 'lat': '28.19929', 'lon': '113.074555', 'count': 2166 }, {
            'type': 1,
            'lat': '28.195948',
            'lon': '113.132381',
            'count': 2641
        }, { 'type': 1, 'lat': '28.211185', 'lon': '113.084019', 'count': 2316 }, {
            'type': 1,
            'lat': '28.192149',
            'lon': '113.030352',
            'count': 187
        }, { 'type': 1, 'lat': '28.147179', 'lon': '113.058045', 'count': 2046 }, {
            'type': 1,
            'lat': '28.303944',
            'lon': '113.136698',
            'count': 2232
        }, { 'type': 1, 'lat': '28.129293', 'lon': '113.007884', 'count': 1069 }, {
            'type': 1,
            'lat': '28.27908',
            'lon': '113.047168',
            'count': 2418
        }, { 'type': 1, 'lat': '28.239115', 'lon': '113.014719', 'count': 2348 }, {
            'type': 1,
            'lat': '28.19939',
            'lon': '113.013039',
            'count': 258
        }, { 'type': 1, 'lat': '28.18022', 'lon': '113.069686', 'count': 1025 }, {
            'type': 1,
            'lat': '28.303993',
            'lon': '113.066833',
            'count': 821
        }, { 'type': 1, 'lat': '28.251593', 'lon': '113.095108', 'count': 2690 }, {
            'type': 1,
            'lat': '28.270658',
            'lon': '113.045345',
            'count': 2432
        }, { 'type': 1, 'lat': '28.097926', 'lon': '113.090251', 'count': 2188 }, {
            'type': 1,
            'lat': '28.084333',
            'lon': '113.055715',
            'count': 1275
        }, { 'type': 1, 'lat': '28.286515', 'lon': '113.087013', 'count': 2310 }, {
            'type': 1,
            'lat': '28.322486',
            'lon': '113.138701',
            'count': 1607
        }, { 'type': 1, 'lat': '28.29842', 'lon': '113.071103', 'count': 684 }, {
            'type': 1,
            'lat': '28.298421',
            'lon': '113.053268',
            'count': 2010
        }, { 'type': 1, 'lat': '28.141019', 'lon': '113.13295', 'count': 720 }, {
            'type': 1,
            'lat': '28.2104',
            'lon': '113.120259',
            'count': 77
        }, { 'type': 1, 'lat': '28.339039', 'lon': '113.065074', 'count': 711 }, {
            'type': 1,
            'lat': '28.292448',
            'lon': '113.030016',
            'count': 2610
        }, { 'type': 1, 'lat': '28.191524', 'lon': '113.056325', 'count': 805 }, {
            'type': 1,
            'lat': '28.227827',
            'lon': '113.09536',
            'count': 2543
        }, { 'type': 1, 'lat': '28.165888', 'lon': '113.119005', 'count': 1362 }, {
            'type': 1,
            'lat': '28.163206',
            'lon': '113.103449',
            'count': 158
        }, { 'type': 1, 'lat': '28.106249', 'lon': '113.018213', 'count': 1592 }, {
            'type': 1,
            'lat': '28.212399',
            'lon': '113.085601',
            'count': 183
        }, { 'type': 1, 'lat': '28.313706', 'lon': '113.018855', 'count': 2325 }, {
            'type': 1,
            'lat': '28.271518',
            'lon': '113.082415',
            'count': 2730
        }, { 'type': 1, 'lat': '28.142838', 'lon': '113.028911', 'count': 1883 }, {
            'type': 1,
            'lat': '28.312445',
            'lon': '113.117869',
            'count': 1183
        }, { 'type': 1, 'lat': '28.172487', 'lon': '113.067218', 'count': 2318 }, {
            'type': 1,
            'lat': '28.136796',
            'lon': '113.074197',
            'count': 2175
        }, { 'type': 1, 'lat': '28.150125', 'lon': '113.068173', 'count': 2779 }, {
            'type': 1,
            'lat': '28.192431',
            'lon': '113.032012',
            'count': 156
        }, { 'type': 1, 'lat': '28.252118', 'lon': '113.066046', 'count': 22 }, {
            'type': 1,
            'lat': '28.335872',
            'lon': '113.006323',
            'count': 70
        }, { 'type': 1, 'lat': '28.303547000000002', 'lon': '113.107301', 'count': 926 }, {
            'type': 1,
            'lat': '28.175195',
            'lon': '113.024432',
            'count': 1210
        }, { 'type': 1, 'lat': '28.163568', 'lon': '113.074223', 'count': 741 }, {
            'type': 1,
            'lat': '28.274703',
            'lon': '113.023608',
            'count': 405
        }, { 'type': 1, 'lat': '28.283067', 'lon': '113.120121', 'count': 1462 }, {
            'type': 1,
            'lat': '28.338207',
            'lon': '113.09939',
            'count': 1279
        }, { 'type': 1, 'lat': '28.272777', 'lon': '113.111227', 'count': 189 }, {
            'type': 1,
            'lat': '28.293743',
            'lon': '113.09028',
            'count': 2371
        }, { 'type': 1, 'lat': '28.219719', 'lon': '113.015173', 'count': 1562 }, {
            'type': 1,
            'lat': '28.160689',
            'lon': '113.067007',
            'count': 1571
        }, { 'type': 1, 'lat': '28.266938', 'lon': '113.118612', 'count': 1564 }, {
            'type': 1,
            'lat': '28.172191',
            'lon': '113.102246',
            'count': 2481
        }, { 'type': 1, 'lat': '28.213679', 'lon': '113.119818', 'count': 1334 }, {
            'type': 1,
            'lat': '28.164757',
            'lon': '113.110293',
            'count': 1930
        }, { 'type': 1, 'lat': '28.12709', 'lon': '113.099174', 'count': 2977 }, {
            'type': 1,
            'lat': '28.122173',
            'lon': '113.010131',
            'count': 94
        }, { 'type': 1, 'lat': '28.113647', 'lon': '113.120514', 'count': 2968 }, {
            'type': 1,
            'lat': '28.249144',
            'lon': '113.133211',
            'count': 1984
        }, { 'type': 1, 'lat': '28.288087', 'lon': '113.117208', 'count': 1775 }, {
            'type': 1,
            'lat': '28.253431',
            'lon': '113.065079',
            'count': 2515
        }, { 'type': 1, 'lat': '28.280736', 'lon': '113.075544', 'count': 1723 }, {
            'type': 1,
            'lat': '28.315437',
            'lon': '113.047119',
            'count': 1385
        }, { 'type': 1, 'lat': '28.18874', 'lon': '113.075588', 'count': 733 }, {
            'type': 1,
            'lat': '28.180747',
            'lon': '113.032264',
            'count': 197
        }, { 'type': 1, 'lat': '28.33758', 'lon': '113.141408', 'count': 1800 }, {
            'type': 1,
            'lat': '28.273549',
            'lon': '113.076494',
            'count': 862
        }, { 'type': 1, 'lat': '28.205291', 'lon': '113.056299', 'count': 2759 }, {
            'type': 1,
            'lat': '28.222844',
            'lon': '113.015192',
            'count': 940
        }, { 'type': 1, 'lat': '28.191864', 'lon': '113.069234', 'count': 550 }, {
            'type': 1,
            'lat': '28.326185',
            'lon': '113.033895',
            'count': 2189
        }, { 'type': 1, 'lat': '28.087815', 'lon': '113.050095', 'count': 2034 }, {
            'type': 1,
            'lat': '28.220528',
            'lon': '113.124059',
            'count': 2366
        }, { 'type': 1, 'lat': '28.235173', 'lon': '113.012454', 'count': 1762 }, {
            'type': 1,
            'lat': '28.214934',
            'lon': '113.054892',
            'count': 1304
        }, { 'type': 1, 'lat': '28.13115', 'lon': '113.136399', 'count': 554 }, {
            'type': 1,
            'lat': '28.204176',
            'lon': '113.063862',
            'count': 2801
        }, { 'type': 1, 'lat': '28.337367', 'lon': '113.089297', 'count': 670 }, {
            'type': 1,
            'lat': '28.243353',
            'lon': '113.06655',
            'count': 1522
        }, { 'type': 1, 'lat': '28.094599', 'lon': '113.066281', 'count': 1117 }, {
            'type': 1,
            'lat': '28.090663',
            'lon': '113.109004',
            'count': 1668
        }, { 'type': 1, 'lat': '28.221182', 'lon': '113.133601', 'count': 2254 }, {
            'type': 1,
            'lat': '28.252919',
            'lon': '113.080425',
            'count': 1255
        }, { 'type': 1, 'lat': '28.218252', 'lon': '113.029357', 'count': 1858 }, {
            'type': 1,
            'lat': '28.141237',
            'lon': '113.022796',
            'count': 638
        }, { 'type': 1, 'lat': '28.291062', 'lon': '113.036833', 'count': 2224 }, {
            'type': 1,
            'lat': '28.196416',
            'lon': '113.015536',
            'count': 580
        }, { 'type': 1, 'lat': '28.195061', 'lon': '113.037376', 'count': 629 }, {
            'type': 1,
            'lat': '28.297323',
            'lon': '113.064591',
            'count': 2622
        }, { 'type': 1, 'lat': '28.213468', 'lon': '113.10145', 'count': 1454 }, {
            'type': 1,
            'lat': '28.094352',
            'lon': '113.108702',
            'count': 1044
        }, { 'type': 1, 'lat': '28.1981', 'lon': '113.076568', 'count': 151 }, {
            'type': 1,
            'lat': '28.31125',
            'lon': '113.11269',
            'count': 2543
        }, { 'type': 1, 'lat': '28.333375', 'lon': '113.037137', 'count': 2423 }, {
            'type': 1,
            'lat': '28.314109',
            'lon': '113.070945',
            'count': 2880
        }, { 'type': 1, 'lat': '28.153056', 'lon': '113.123746', 'count': 1640 }, {
            'type': 1,
            'lat': '28.329738',
            'lon': '113.016622',
            'count': 1444
        }, { 'type': 1, 'lat': '28.126179', 'lon': '113.085071', 'count': 1 }, {
            'type': 1,
            'lat': '28.143435',
            'lon': '113.063653',
            'count': 2828
        }, { 'type': 1, 'lat': '28.142569', 'lon': '113.110741', 'count': 1096 }, {
            'type': 1,
            'lat': '28.165249',
            'lon': '113.096324',
            'count': 2376
        }, { 'type': 1, 'lat': '28.308855', 'lon': '113.014396', 'count': 2655 }, {
            'type': 1,
            'lat': '28.117612',
            'lon': '113.080034',
            'count': 1255
        }, { 'type': 1, 'lat': '28.245897', 'lon': '113.005299', 'count': 417 }, {
            'type': 1,
            'lat': '28.28512',
            'lon': '113.003214',
            'count': 1945
        }, { 'type': 1, 'lat': '28.266863', 'lon': '113.000865', 'count': 2552 }, {
            'type': 1,
            'lat': '28.138786',
            'lon': '113.132764',
            'count': 2561
        }, { 'type': 1, 'lat': '28.26575', 'lon': '113.052195', 'count': 681 }, {
            'type': 1,
            'lat': '28.227279',
            'lon': '113.118479',
            'count': 323
        }, { 'type': 1, 'lat': '28.292413', 'lon': '113.022308', 'count': 451 }, {
            'type': 1,
            'lat': '28.113171',
            'lon': '113.074439',
            'count': 1391
        }, { 'type': 1, 'lat': '28.2167', 'lon': '113.116605', 'count': 808 }, {
            'type': 1,
            'lat': '28.176512',
            'lon': '113.017236',
            'count': 1834
        }, { 'type': 1, 'lat': '28.200649', 'lon': '113.06847', 'count': 79 }, {
            'type': 1,
            'lat': '28.14577',
            'lon': '113.005173',
            'count': 1636
        }, { 'type': 1, 'lat': '28.235053', 'lon': '113.007941', 'count': 566 }, {
            'type': 1,
            'lat': '28.089938',
            'lon': '113.073305',
            'count': 2317
        }, { 'type': 1, 'lat': '28.083779', 'lon': '113.126747', 'count': 1585 }, {
            'type': 1,
            'lat': '28.113507',
            'lon': '113.139196',
            'count': 2637
        }, { 'type': 1, 'lat': '28.236602', 'lon': '113.116671', 'count': 2041 }, {
            'type': 1,
            'lat': '28.112171',
            'lon': '113.005409',
            'count': 1634
        }, { 'type': 1, 'lat': '28.233621', 'lon': '113.074794', 'count': 1008 }, {
            'type': 1,
            'lat': '28.273951',
            'lon': '113.00566',
            'count': 1889
        }, { 'type': 1, 'lat': '28.083168', 'lon': '113.065561', 'count': 1654 }, {
            'type': 1,
            'lat': '28.168307',
            'lon': '113.08215',
            'count': 320
        }, { 'type': 1, 'lat': '28.337955', 'lon': '113.086559', 'count': 785 }, {
            'type': 1,
            'lat': '28.304109',
            'lon': '113.033067',
            'count': 481
        }, { 'type': 1, 'lat': '28.252777', 'lon': '113.134131', 'count': 1178 }, {
            'type': 1,
            'lat': '28.252175',
            'lon': '113.071578',
            'count': 1219
        }, { 'type': 1, 'lat': '28.312388', 'lon': '113.031792', 'count': 332 }, {
            'type': 1,
            'lat': '28.1124',
            'lon': '113.07784',
            'count': 660
        }, { 'type': 1, 'lat': '28.330631', 'lon': '113.124551', 'count': 1326 }, {
            'type': 1,
            'lat': '28.332074',
            'lon': '113.046405',
            'count': 922
        }, { 'type': 1, 'lat': '28.134017', 'lon': '113.125649', 'count': 2890 }, {
            'type': 1,
            'lat': '28.112888',
            'lon': '113.026442',
            'count': 2106
        }, { 'type': 1, 'lat': '28.273953', 'lon': '113.037311', 'count': 2088 }, {
            'type': 1,
            'lat': '28.318466',
            'lon': '113.037485',
            'count': 2283
        }, { 'type': 1, 'lat': '28.203184', 'lon': '113.053014', 'count': 616 }, {
            'type': 1,
            'lat': '28.137309',
            'lon': '113.085558',
            'count': 583
        }, { 'type': 1, 'lat': '28.177736', 'lon': '113.023008', 'count': 1925 }, {
            'type': 1,
            'lat': '28.206603',
            'lon': '113.130841',
            'count': 1569
        }, { 'type': 1, 'lat': '28.17564', 'lon': '113.109542', 'count': 2517 }, {
            'type': 1,
            'lat': '28.290502',
            'lon': '113.018905',
            'count': 2922
        }, { 'type': 1, 'lat': '28.111934', 'lon': '113.031975', 'count': 370 }, {
            'type': 1,
            'lat': '28.102892',
            'lon': '113.139404',
            'count': 2814
        }, { 'type': 1, 'lat': '28.110454', 'lon': '113.110475', 'count': 1844 }, {
            'type': 1,
            'lat': '28.153502',
            'lon': '113.096386',
            'count': 1439
        }, { 'type': 1, 'lat': '28.230636', 'lon': '113.037034', 'count': 649 }, {
            'type': 1,
            'lat': '28.20946',
            'lon': '113.114342',
            'count': 1933
        }, { 'type': 1, 'lat': '28.265668', 'lon': '113.070801', 'count': 239 }, {
            'type': 1,
            'lat': '28.288515',
            'lon': '113.022761',
            'count': 870
        }, { 'type': 1, 'lat': '28.283891', 'lon': '113.097208', 'count': 2097 }, {
            'type': 1,
            'lat': '28.247996',
            'lon': '113.01196',
            'count': 1725
        }, { 'type': 1, 'lat': '28.199276', 'lon': '113.075143', 'count': 2384 }, {
            'type': 1,
            'lat': '28.182654',
            'lon': '113.059753',
            'count': 2495
        }, { 'type': 1, 'lat': '28.177803', 'lon': '113.010715', 'count': 175 }, {
            'type': 1,
            'lat': '28.23195',
            'lon': '113.050196',
            'count': 1570
        }, { 'type': 1, 'lat': '28.275565', 'lon': '113.066287', 'count': 1099 }, {
            'type': 1,
            'lat': '28.187365',
            'lon': '113.082868',
            'count': 627
        }, { 'type': 1, 'lat': '28.122044', 'lon': '113.12165', 'count': 1877 }, {
            'type': 1,
            'lat': '28.296274',
            'lon': '113.070321',
            'count': 992
        }, { 'type': 1, 'lat': '28.156789', 'lon': '113.000876', 'count': 2786 }, {
            'type': 1,
            'lat': '28.15013',
            'lon': '113.121024',
            'count': 1493
        }, { 'type': 1, 'lat': '28.317326', 'lon': '113.006839', 'count': 2680 }, {
            'type': 1,
            'lat': '28.131869',
            'lon': '113.000291',
            'count': 1072
        }, { 'type': 1, 'lat': '28.242166', 'lon': '113.017663', 'count': 389 }, {
            'type': 1,
            'lat': '28.256717',
            'lon': '113.025242',
            'count': 20
        }, { 'type': 1, 'lat': '28.097048', 'lon': '113.010505', 'count': 597 }, {
            'type': 1,
            'lat': '28.160802',
            'lon': '113.025828',
            'count': 603
        }, { 'type': 1, 'lat': '28.266245', 'lon': '113.087035', 'count': 2928 }, {
            'type': 1,
            'lat': '28.134772',
            'lon': '113.029041',
            'count': 479
        }, { 'type': 1, 'lat': '28.161881', 'lon': '113.10676', 'count': 524 }, {
            'type': 1,
            'lat': '28.154352',
            'lon': '113.094705',
            'count': 1813
        }, { 'type': 1, 'lat': '28.218485', 'lon': '113.09593', 'count': 140 }, {
            'type': 1,
            'lat': '28.128883',
            'lon': '113.052808',
            'count': 2419
        }, { 'type': 1, 'lat': '28.313912', 'lon': '113.028745', 'count': 3000 }, {
            'type': 1,
            'lat': '28.317857',
            'lon': '113.057341',
            'count': 2037
        }, { 'type': 1, 'lat': '28.317993', 'lon': '113.073387', 'count': 905 }, {
            'type': 1,
            'lat': '28.303575',
            'lon': '113.135938',
            'count': 532
        }, { 'type': 1, 'lat': '28.314532', 'lon': '113.132782', 'count': 1102 }, {
            'type': 1,
            'lat': '28.286446',
            'lon': '113.02907',
            'count': 162
        }, { 'type': 1, 'lat': '28.313295', 'lon': '113.093841', 'count': 1781 }, {
            'type': 1,
            'lat': '28.31984',
            'lon': '113.133565',
            'count': 306
        }, { 'type': 1, 'lat': '28.302362', 'lon': '113.066808', 'count': 688 }, {
            'type': 1,
            'lat': '28.325568',
            'lon': '113.036346',
            'count': 1043
        }, { 'type': 1, 'lat': '28.333635', 'lon': '113.075504', 'count': 617 }, {
            'type': 1,
            'lat': '28.293672',
            'lon': '113.116142',
            'count': 2985
        }, { 'type': 1, 'lat': '28.283469', 'lon': '113.015059', 'count': 1903 }, {
            'type': 1,
            'lat': '28.339325',
            'lon': '113.115112',
            'count': 2545
        }, { 'type': 1, 'lat': '28.289533', 'lon': '113.008004', 'count': 1045 }, {
            'type': 1,
            'lat': '28.332765',
            'lon': '113.139063',
            'count': 1577
        }, { 'type': 1, 'lat': '28.285828', 'lon': '113.122372', 'count': 2896 }, {
            'type': 1,
            'lat': '28.322477',
            'lon': '113.014896',
            'count': 1404
        }, { 'type': 1, 'lat': '28.327612', 'lon': '113.041719', 'count': 2791 }, {
            'type': 1,
            'lat': '28.305738',
            'lon': '113.084911',
            'count': 1226
        }, { 'type': 1, 'lat': '28.320603', 'lon': '113.054186', 'count': 2939 }, {
            'type': 1,
            'lat': '28.291599',
            'lon': '113.079948',
            'count': 10
        }, { 'type': 1, 'lat': '28.324499', 'lon': '113.070281', 'count': 2407 }, {
            'type': 1,
            'lat': '28.313808',
            'lon': '113.056937',
            'count': 2378
        }, { 'type': 1, 'lat': '28.338397', 'lon': '113.079535', 'count': 2494 }, {
            'type': 1,
            'lat': '28.287586',
            'lon': '113.13838200000001',
            'count': 703
        }, { 'type': 1, 'lat': '28.300115', 'lon': '113.081807', 'count': 1599 }, {
            'type': 1,
            'lat': '28.313317',
            'lon': '113.047474',
            'count': 1386
        }, { 'type': 1, 'lat': '28.310714', 'lon': '113.058011', 'count': 499 }, {
            'type': 1,
            'lat': '28.290404',
            'lon': '113.113767',
            'count': 192
        }, { 'type': 1, 'lat': '28.306799', 'lon': '113.021301', 'count': 391 }, {
            'type': 1,
            'lat': '28.283368',
            'lon': '113.070194',
            'count': 1792
        }, { 'type': 1, 'lat': '28.321389', 'lon': '113.048842', 'count': 2597 }, {
            'type': 1,
            'lat': '28.292723',
            'lon': '113.042123',
            'count': 1940
        }, { 'type': 1, 'lat': '28.297606', 'lon': '113.045759', 'count': 2291 }, {
            'type': 1,
            'lat': '28.337839',
            'lon': '113.021159',
            'count': 557
        }, { 'type': 1, 'lat': '28.327372', 'lon': '113.053355', 'count': 1733 }, {
            'type': 1,
            'lat': '28.318639',
            'lon': '113.11536',
            'count': 2778
        }, { 'type': 1, 'lat': '28.289916', 'lon': '113.026101', 'count': 1206 }, {
            'type': 1,
            'lat': '28.296912',
            'lon': '113.084291',
            'count': 1614
        }, { 'type': 1, 'lat': '28.325432', 'lon': '113.055641', 'count': 1168 }, {
            'type': 1,
            'lat': '28.316601',
            'lon': '113.070983',
            'count': 2215
        }, { 'type': 1, 'lat': '28.282869', 'lon': '113.012532', 'count': 2101 }, {
            'type': 1,
            'lat': '28.282723',
            'lon': '113.112072',
            'count': 1744
        }, { 'type': 1, 'lat': '28.31371', 'lon': '113.071161', 'count': 2435 }, {
            'type': 1,
            'lat': '28.306445',
            'lon': '113.010099',
            'count': 637
        }, { 'type': 1, 'lat': '28.337093', 'lon': '113.054478', 'count': 2316 }, {
            'type': 1,
            'lat': '28.283157',
            'lon': '113.125447',
            'count': 1589
        }, { 'type': 1, 'lat': '28.336421', 'lon': '113.087114', 'count': 40 }, {
            'type': 1,
            'lat': '28.305422',
            'lon': '113.107395',
            'count': 2984
        }, { 'type': 1, 'lat': '28.301545', 'lon': '113.082143', 'count': 775 }, {
            'type': 1,
            'lat': '28.330637',
            'lon': '113.101816',
            'count': 547
        }, { 'type': 1, 'lat': '28.301154', 'lon': '113.121994', 'count': 1618 }, {
            'type': 1,
            'lat': '28.324907',
            'lon': '113.078592',
            'count': 1578
        }, { 'type': 1, 'lat': '28.299663', 'lon': '113.022402', 'count': 569 }, {
            'type': 1,
            'lat': '28.331097',
            'lon': '113.010128',
            'count': 2106
        }, { 'type': 1, 'lat': '28.298212', 'lon': '113.052789', 'count': 1719 }, {
            'type': 1,
            'lat': '28.321473',
            'lon': '113.089977',
            'count': 318
        }, { 'type': 1, 'lat': '28.28577', 'lon': '113.105791', 'count': 339 }, {
            'type': 1,
            'lat': '28.29867',
            'lon': '113.103346',
            'count': 287
        }, { 'type': 1, 'lat': '28.32878', 'lon': '113.004091', 'count': 798 }, {
            'type': 1,
            'lat': '28.285664',
            'lon': '113.092445',
            'count': 2218
        }, { 'type': 1, 'lat': '28.310745', 'lon': '113.122454', 'count': 2973 }, {
            'type': 1,
            'lat': '28.335784',
            'lon': '113.140493',
            'count': 1154
        }, { 'type': 1, 'lat': '28.291416', 'lon': '113.014431', 'count': 1981 }, {
            'type': 1,
            'lat': '28.311778',
            'lon': '113.045179',
            'count': 1627
        }, { 'type': 1, 'lat': '28.30537', 'lon': '113.061294', 'count': 679 }, {
            'type': 1,
            'lat': '28.290015',
            'lon': '113.086274',
            'count': 1822
        }, { 'type': 1, 'lat': '28.313045', 'lon': '113.076154', 'count': 1908 }, {
            'type': 1,
            'lat': '28.312904',
            'lon': '113.034704',
            'count': 664
        }, { 'type': 1, 'lat': '28.298313', 'lon': '113.013975', 'count': 2208 }, {
            'type': 1,
            'lat': '28.305394',
            'lon': '113.126776',
            'count': 927
        }, { 'type': 1, 'lat': '28.285324', 'lon': '113.027307', 'count': 667 }, {
            'type': 1,
            'lat': '28.333506',
            'lon': '113.033062',
            'count': 69
        }, { 'type': 1, 'lat': '28.290078', 'lon': '113.140413', 'count': 1237 }, {
            'type': 1,
            'lat': '28.305229',
            'lon': '113.070309',
            'count': 2978
        }, { 'type': 1, 'lat': '28.338321', 'lon': '113.020185', 'count': 1851 }, {
            'type': 1,
            'lat': '28.336026',
            'lon': '113.000634',
            'count': 2111
        }, { 'type': 1, 'lat': '28.282818', 'lon': '113.105321', 'count': 2195 }, {
            'type': 1,
            'lat': '28.287728',
            'lon': '113.073109',
            'count': 2136
        }, { 'type': 1, 'lat': '28.291495', 'lon': '113.037242', 'count': 1961 }, {
            'type': 1,
            'lat': '28.316818',
            'lon': '113.055539',
            'count': 1917
        }, { 'type': 1, 'lat': '28.291747', 'lon': '113.064181', 'count': 585 }, {
            'type': 1,
            'lat': '28.318147',
            'lon': '113.085186',
            'count': 2255
        }, { 'type': 1, 'lat': '28.330811', 'lon': '113.108074', 'count': 200 }, {
            'type': 1,
            'lat': '28.30253',
            'lon': '113.046369',
            'count': 2422
        }, { 'type': 1, 'lat': '28.288505', 'lon': '113.099302', 'count': 758 }, {
            'type': 1,
            'lat': '28.33963',
            'lon': '113.006389',
            'count': 2014
        }, { 'type': 1, 'lat': '28.286418', 'lon': '113.119693', 'count': 356 }, {
            'type': 1,
            'lat': '28.314214',
            'lon': '113.022184',
            'count': 74
        }, { 'type': 1, 'lat': '28.308619', 'lon': '113.1348', 'count': 720 }, {
            'type': 1,
            'lat': '28.322147',
            'lon': '113.011264',
            'count': 262
        }, { 'type': 1, 'lat': '28.326556', 'lon': '113.116484', 'count': 929 }, {
            'type': 1,
            'lat': '28.301621',
            'lon': '113.064439',
            'count': 1546
        }, { 'type': 1, 'lat': '28.323445', 'lon': '113.111149', 'count': 899 }, {
            'type': 1,
            'lat': '28.296116',
            'lon': '113.009709',
            'count': 1435
        }, { 'type': 1, 'lat': '28.328007', 'lon': '113.010054', 'count': 785 }, {
            'type': 1,
            'lat': '28.310713',
            'lon': '113.069758',
            'count': 984
        }, { 'type': 1, 'lat': '28.327399', 'lon': '113.064609', 'count': 1269 }, {
            'type': 1,
            'lat': '28.319186',
            'lon': '113.118906',
            'count': 606
        }, { 'type': 1, 'lat': '28.306831', 'lon': '113.025154', 'count': 2356 }, {
            'type': 1,
            'lat': '28.32446',
            'lon': '113.038883',
            'count': 999
        }, { 'type': 1, 'lat': '28.33414', 'lon': '113.082728', 'count': 2415 }, {
            'type': 1,
            'lat': '28.319948',
            'lon': '113.070866',
            'count': 1977
        }, { 'type': 1, 'lat': '28.302191', 'lon': '113.095832', 'count': 908 }, {
            'type': 1,
            'lat': '28.31375',
            'lon': '113.12241',
            'count': 2852
        }, { 'type': 1, 'lat': '28.31969', 'lon': '113.07491', 'count': 1298 }, {
            'type': 1,
            'lat': '28.319236',
            'lon': '113.052663',
            'count': 501
        }, { 'type': 1, 'lat': '28.326274', 'lon': '113.025639', 'count': 1228 }, {
            'type': 1,
            'lat': '28.284993',
            'lon': '113.014253',
            'count': 1322
        }, { 'type': 1, 'lat': '28.337638', 'lon': '113.052977', 'count': 1357 }, {
            'type': 1,
            'lat': '28.295906',
            'lon': '113.126566',
            'count': 767
        }, { 'type': 1, 'lat': '28.292372', 'lon': '113.020659', 'count': 2634 }, {
            'type': 1,
            'lat': '28.303607',
            'lon': '113.042725',
            'count': 2890
        }, { 'type': 1, 'lat': '28.300022', 'lon': '113.059063', 'count': 2161 }, {
            'type': 1,
            'lat': '28.289665',
            'lon': '113.069497',
            'count': 1703
        }, { 'type': 1, 'lat': '28.33906', 'lon': '113.019367', 'count': 2504 }, {
            'type': 1,
            'lat': '28.297268',
            'lon': '113.001175',
            'count': 455
        }, { 'type': 1, 'lat': '28.283918', 'lon': '113.007381', 'count': 345 }, {
            'type': 1,
            'lat': '28.291839',
            'lon': '113.118415',
            'count': 437
        }, { 'type': 1, 'lat': '28.326285', 'lon': '113.022909', 'count': 1821 }, {
            'type': 1,
            'lat': '28.319541',
            'lon': '113.037232',
            'count': 1342
        }, { 'type': 1, 'lat': '28.311073', 'lon': '113.09141', 'count': 436 }, {
            'type': 1,
            'lat': '28.319903',
            'lon': '113.008785',
            'count': 374
        }, { 'type': 1, 'lat': '28.335568', 'lon': '113.053754', 'count': 51 }, {
            'type': 1,
            'lat': '28.286707',
            'lon': '113.120716',
            'count': 260
        }, { 'type': 1, 'lat': '28.309384', 'lon': '113.141176', 'count': 1418 }, {
            'type': 1,
            'lat': '28.295019',
            'lon': '113.115094',
            'count': 49
        }, { 'type': 1, 'lat': '28.28456', 'lon': '113.063908', 'count': 544 }, {
            'type': 1,
            'lat': '28.313637',
            'lon': '113.035531',
            'count': 923
        }, { 'type': 1, 'lat': '28.294802', 'lon': '113.002999', 'count': 1254 }, {
            'type': 1,
            'lat': '28.302087',
            'lon': '113.056382',
            'count': 2973
        }, { 'type': 1, 'lat': '28.316161', 'lon': '113.036672', 'count': 2509 }, {
            'type': 1,
            'lat': '28.28955',
            'lon': '113.097276',
            'count': 218
        }, { 'type': 1, 'lat': '28.331378', 'lon': '113.02021', 'count': 2511 }, {
            'type': 1,
            'lat': '28.28348',
            'lon': '113.077284',
            'count': 1870
        }, { 'type': 1, 'lat': '28.338599', 'lon': '113.113843', 'count': 1250 }, {
            'type': 1,
            'lat': '28.336464',
            'lon': '113.07301',
            'count': 1196
        }, { 'type': 1, 'lat': '28.33933', 'lon': '113.101049', 'count': 954 }, {
            'type': 1,
            'lat': '28.31369',
            'lon': '113.008924',
            'count': 285
        }, { 'type': 1, 'lat': '28.286003', 'lon': '113.052455', 'count': 2388 }, {
            'type': 1,
            'lat': '28.322071',
            'lon': '113.044333',
            'count': 2055
        }, { 'type': 1, 'lat': '28.334145', 'lon': '113.133085', 'count': 1377 }, {
            'type': 1,
            'lat': '28.308632',
            'lon': '113.055173',
            'count': 2864
        }, { 'type': 1, 'lat': '28.290881', 'lon': '113.01763', 'count': 2161 }, {
            'type': 1,
            'lat': '28.32461',
            'lon': '113.069761',
            'count': 989
        }, { 'type': 1, 'lat': '28.32106', 'lon': '113.018159', 'count': 1880 }, {
            'type': 1,
            'lat': '28.327025',
            'lon': '113.039682',
            'count': 2778
        }, { 'type': 1, 'lat': '28.303414', 'lon': '113.003928', 'count': 2986 }, {
            'type': 1,
            'lat': '28.315261',
            'lon': '113.015413',
            'count': 1769
        }, { 'type': 1, 'lat': '28.328393', 'lon': '113.087128', 'count': 2536 }, {
            'type': 1,
            'lat': '28.29962',
            'lon': '113.026772',
            'count': 2123
        }, { 'type': 1, 'lat': '28.311034', 'lon': '113.067484', 'count': 2894 }, {
            'type': 1,
            'lat': '28.294035',
            'lon': '113.057276',
            'count': 941
        }, { 'type': 1, 'lat': '28.319721', 'lon': '113.043448', 'count': 1385 }, {
            'type': 1,
            'lat': '28.316193',
            'lon': '113.056708',
            'count': 441
        }, { 'type': 1, 'lat': '28.28693', 'lon': '113.050595', 'count': 120 }, {
            'type': 1,
            'lat': '28.323189',
            'lon': '113.036508',
            'count': 2070
        }, { 'type': 1, 'lat': '28.326849', 'lon': '113.108672', 'count': 951 }, {
            'type': 1,
            'lat': '28.308697',
            'lon': '113.078218',
            'count': 1535
        }, { 'type': 1, 'lat': '28.299396', 'lon': '113.07272', 'count': 765 }, {
            'type': 1,
            'lat': '28.337944',
            'lon': '113.023527',
            'count': 1675
        }, { 'type': 1, 'lat': '28.315128', 'lon': '113.139335', 'count': 874 }, {
            'type': 1,
            'lat': '28.308194',
            'lon': '113.122722',
            'count': 1184
        }, { 'type': 1, 'lat': '28.323991', 'lon': '113.019524', 'count': 1474 }, {
            'type': 1,
            'lat': '28.292596',
            'lon': '113.064267',
            'count': 638
        }, { 'type': 1, 'lat': '28.311265', 'lon': '113.045864', 'count': 2019 }, {
            'type': 1,
            'lat': '28.2833',
            'lon': '113.112368',
            'count': 1849
        }, { 'type': 1, 'lat': '28.29462', 'lon': '113.048984', 'count': 692 }, {
            'type': 1,
            'lat': '28.333377',
            'lon': '113.044084',
            'count': 1162
        }, { 'type': 1, 'lat': '28.29316', 'lon': '113.102079', 'count': 1033 }, {
            'type': 1,
            'lat': '28.302567',
            'lon': '113.112',
            'count': 1617
        }, { 'type': 1, 'lat': '28.322764', 'lon': '113.037602', 'count': 2206 }, {
            'type': 1,
            'lat': '28.333534',
            'lon': '113.091276',
            'count': 824
        }, { 'type': 1, 'lat': '28.314516', 'lon': '113.006592', 'count': 1865 }, {
            'type': 1,
            'lat': '28.321134',
            'lon': '113.065674',
            'count': 673
        }, { 'type': 1, 'lat': '28.330831', 'lon': '113.087973', 'count': 643 }, {
            'type': 1,
            'lat': '28.292114',
            'lon': '113.060843',
            'count': 283
        }, { 'type': 1, 'lat': '28.291482', 'lon': '113.076087', 'count': 1248 }, {
            'type': 1,
            'lat': '28.292489',
            'lon': '113.133572',
            'count': 2789
        }, { 'type': 1, 'lat': '28.314537', 'lon': '113.12305', 'count': 2519 }, {
            'type': 1,
            'lat': '28.321784',
            'lon': '113.0233',
            'count': 1230
        }, { 'type': 1, 'lat': '28.291612', 'lon': '113.070305', 'count': 2081 }, {
            'type': 1,
            'lat': '28.313809',
            'lon': '113.00228',
            'count': 363
        }, { 'type': 1, 'lat': '28.307464', 'lon': '113.03334', 'count': 1446 }, {
            'type': 1,
            'lat': '28.337741',
            'lon': '113.141359',
            'count': 1848
        }, { 'type': 1, 'lat': '28.335578', 'lon': '113.1295', 'count': 2803 }, {
            'type': 1,
            'lat': '28.286893',
            'lon': '113.02967',
            'count': 632
        }, { 'type': 1, 'lat': '28.289026', 'lon': '113.008937', 'count': 2994 }, {
            'type': 1,
            'lat': '28.311712',
            'lon': '113.062811',
            'count': 2249
        }, { 'type': 1, 'lat': '28.338435', 'lon': '113.010342', 'count': 294 }, {
            'type': 1,
            'lat': '28.289327',
            'lon': '113.02254',
            'count': 1279
        }, { 'type': 1, 'lat': '28.301814', 'lon': '113.022331', 'count': 1145 }, {
            'type': 1,
            'lat': '28.299555',
            'lon': '113.075476',
            'count': 2476
        }, { 'type': 1, 'lat': '28.289017', 'lon': '113.124123', 'count': 877 }, {
            'type': 1,
            'lat': '28.310855',
            'lon': '113.110735',
            'count': 315
        }, { 'type': 1, 'lat': '28.285006', 'lon': '113.107393', 'count': 2680 }, {
            'type': 1,
            'lat': '28.325175',
            'lon': '113.065759',
            'count': 1611
        }, { 'type': 1, 'lat': '28.291103', 'lon': '113.112086', 'count': 697 }, {
            'type': 1,
            'lat': '28.331071',
            'lon': '113.013207',
            'count': 2281
        }, { 'type': 1, 'lat': '28.286722', 'lon': '112.963867', 'count': 131 }, {
            'type': 1,
            'lat': '28.297017',
            'lon': '112.938329',
            'count': 811
        }, { 'type': 1, 'lat': '28.285987', 'lon': '112.891021', 'count': 290 }, {
            'type': 1,
            'lat': '28.339498',
            'lon': '112.885958',
            'count': 766
        }, { 'type': 1, 'lat': '28.315302', 'lon': '112.914507', 'count': 717 }, {
            'type': 1,
            'lat': '28.325356',
            'lon': '112.863676',
            'count': 728
        }, { 'type': 1, 'lat': '28.320692', 'lon': '112.976386', 'count': 880 }, {
            'type': 1,
            'lat': '28.298755',
            'lon': '112.89887',
            'count': 907
        }, { 'type': 1, 'lat': '28.291018', 'lon': '112.979847', 'count': 202 }, {
            'type': 1,
            'lat': '28.306896',
            'lon': '112.932072',
            'count': 392
        }, { 'type': 1, 'lat': '28.302648', 'lon': '112.935113', 'count': 129 }, {
            'type': 1,
            'lat': '28.301906',
            'lon': '112.981612',
            'count': 230
        }, { 'type': 1, 'lat': '28.294529', 'lon': '112.96562', 'count': 378 }, {
            'type': 1,
            'lat': '28.287084',
            'lon': '112.895781',
            'count': 633
        }, { 'type': 1, 'lat': '28.314705', 'lon': '112.914578', 'count': 384 }, {
            'type': 1,
            'lat': '28.306397',
            'lon': '112.963867',
            'count': 734
        }, { 'type': 1, 'lat': '28.309934', 'lon': '112.818012', 'count': 879 }, {
            'type': 1,
            'lat': '28.313564',
            'lon': '112.821235',
            'count': 904
        }, { 'type': 1, 'lat': '28.308236', 'lon': '112.84544', 'count': 321 }, {
            'type': 1,
            'lat': '28.334808',
            'lon': '112.985612',
            'count': 482
        }, { 'type': 1, 'lat': '28.313124', 'lon': '112.899547', 'count': 128 }, {
            'type': 1,
            'lat': '28.319073',
            'lon': '112.931911',
            'count': 544
        }, { 'type': 1, 'lat': '28.304982', 'lon': '112.920049', 'count': 659 }, {
            'type': 1,
            'lat': '28.312219',
            'lon': '112.898912',
            'count': 124
        }, { 'type': 1, 'lat': '28.301002', 'lon': '112.954091', 'count': 512 }, {
            'type': 1,
            'lat': '28.326416',
            'lon': '112.978352',
            'count': 810
        }, { 'type': 1, 'lat': '28.305806', 'lon': '112.848795', 'count': 101 }, {
            'type': 1,
            'lat': '28.323996',
            'lon': '112.984027',
            'count': 723
        }, { 'type': 1, 'lat': '28.309994', 'lon': '112.93954', 'count': 176 }, {
            'type': 1,
            'lat': '28.322273',
            'lon': '112.922834',
            'count': 558
        }, { 'type': 1, 'lat': '28.335393', 'lon': '112.887908', 'count': 214 }, {
            'type': 1,
            'lat': '28.314696',
            'lon': '112.984827',
            'count': 253
        }, { 'type': 1, 'lat': '28.288729', 'lon': '112.845632', 'count': 6 }, {
            'type': 1,
            'lat': '28.335582',
            'lon': '112.941931',
            'count': 789
        }, { 'type': 1, 'lat': '28.33944', 'lon': '112.852054', 'count': 888 }, {
            'type': 1,
            'lat': '28.295597',
            'lon': '112.86007',
            'count': 392
        }, { 'type': 1, 'lat': '28.299831', 'lon': '112.944535', 'count': 785 }, {
            'type': 1,
            'lat': '28.328905',
            'lon': '112.889056',
            'count': 744
        }, { 'type': 1, 'lat': '28.296661', 'lon': '112.852112', 'count': 557 }, {
            'type': 1,
            'lat': '28.313367',
            'lon': '112.988189',
            'count': 509
        }, { 'type': 1, 'lat': '28.286313', 'lon': '112.924126', 'count': 217 }, {
            'type': 1,
            'lat': '28.305304',
            'lon': '112.904757',
            'count': 941
        }, { 'type': 1, 'lat': '28.326931', 'lon': '112.862148', 'count': 703 }, {
            'type': 1,
            'lat': '28.293606',
            'lon': '112.873558',
            'count': 739
        }, { 'type': 1, 'lat': '28.334862', 'lon': '112.921082', 'count': 48 }, {
            'type': 1,
            'lat': '28.310854',
            'lon': '112.914976',
            'count': 380
        }, { 'type': 1, 'lat': '28.30206', 'lon': '112.880632', 'count': 421 }, {
            'type': 1,
            'lat': '28.289498',
            'lon': '112.894593',
            'count': 977
        }, { 'type': 1, 'lat': '28.339496', 'lon': '112.986211', 'count': 366 }, {
            'type': 1,
            'lat': '28.302903',
            'lon': '112.973398',
            'count': 899
        }, { 'type': 1, 'lat': '28.30725', 'lon': '112.902978', 'count': 934 }, {
            'type': 1,
            'lat': '28.333564',
            'lon': '112.879872',
            'count': 336
        }, { 'type': 1, 'lat': '28.288185', 'lon': '112.856137', 'count': 915 }, {
            'type': 1,
            'lat': '28.290332',
            'lon': '112.884775',
            'count': 913
        }, { 'type': 1, 'lat': '28.291193', 'lon': '112.91066000000001', 'count': 930 }, {
            'type': 1,
            'lat': '28.293592',
            'lon': '112.988647',
            'count': 69
        }, { 'type': 1, 'lat': '28.321442', 'lon': '112.847978', 'count': 978 }, {
            'type': 1,
            'lat': '28.294397',
            'lon': '112.86485',
            'count': 393
        }, { 'type': 1, 'lat': '28.300235', 'lon': '112.939697', 'count': 626 }, {
            'type': 1,
            'lat': '28.323213',
            'lon': '112.813687',
            'count': 956
        }, { 'type': 1, 'lat': '28.331128', 'lon': '112.859475', 'count': 550 }, {
            'type': 1,
            'lat': '28.335673',
            'lon': '112.900622',
            'count': 804
        }, { 'type': 1, 'lat': '28.292082', 'lon': '112.875695', 'count': 580 }, {
            'type': 1,
            'lat': '28.294836',
            'lon': '112.904176',
            'count': 948
        }, { 'type': 1, 'lat': '28.30732', 'lon': '112.872333', 'count': 469 }, {
            'type': 1,
            'lat': '28.324647',
            'lon': '112.89558099999999',
            'count': 935
        }, { 'type': 1, 'lat': '28.303647', 'lon': '112.816962', 'count': 19 }, {
            'type': 1,
            'lat': '28.320329',
            'lon': '112.8622',
            'count': 752
        }, { 'type': 1, 'lat': '28.292834', 'lon': '112.958814', 'count': 802 }, {
            'type': 1,
            'lat': '28.329357',
            'lon': '112.977849',
            'count': 735
        }, { 'type': 1, 'lat': '28.298181', 'lon': '112.824196', 'count': 968 }, {
            'type': 1,
            'lat': '28.290045',
            'lon': '112.976451',
            'count': 115
        }, { 'type': 1, 'lat': '28.313106', 'lon': '112.964903', 'count': 606 }, {
            'type': 1,
            'lat': '28.315095',
            'lon': '112.835938',
            'count': 734
        }, { 'type': 1, 'lat': '28.315624', 'lon': '112.93225', 'count': 62 }, {
            'type': 1,
            'lat': '28.304926',
            'lon': '112.990366',
            'count': 860
        }, { 'type': 1, 'lat': '28.285727', 'lon': '112.882674', 'count': 49 }, {
            'type': 1,
            'lat': '28.317049',
            'lon': '112.862832',
            'count': 101
        }, { 'type': 1, 'lat': '28.3379', 'lon': '112.961443', 'count': 955 }, {
            'type': 1,
            'lat': '28.315658',
            'lon': '112.971981',
            'count': 679
        }, { 'type': 1, 'lat': '28.31218', 'lon': '112.897823', 'count': 384 }, {
            'type': 1,
            'lat': '28.336201',
            'lon': '112.814165',
            'count': 957
        }, { 'type': 1, 'lat': '28.313103', 'lon': '112.871284', 'count': 76 }, {
            'type': 1,
            'lat': '28.299974',
            'lon': '112.863185',
            'count': 603
        }, { 'type': 1, 'lat': '28.325314', 'lon': '112.964363', 'count': 127 }, {
            'type': 1,
            'lat': '28.313298',
            'lon': '112.958748',
            'count': 127
        }, { 'type': 1, 'lat': '28.29593', 'lon': '112.839954', 'count': 47 }, {
            'type': 1,
            'lat': '28.336342',
            'lon': '112.934995',
            'count': 839
        }, { 'type': 1, 'lat': '28.327599', 'lon': '112.857741', 'count': 70 }, {
            'type': 1,
            'lat': '28.302207',
            'lon': '112.910389',
            'count': 973
        }, { 'type': 1, 'lat': '28.313569', 'lon': '112.815871', 'count': 455 }, {
            'type': 1,
            'lat': '28.317063',
            'lon': '112.974639',
            'count': 538
        }, { 'type': 1, 'lat': '28.297026', 'lon': '112.830479', 'count': 842 }, {
            'type': 1,
            'lat': '28.329069',
            'lon': '112.918741',
            'count': 897
        }, { 'type': 1, 'lat': '28.292384', 'lon': '112.900298', 'count': 399 }, {
            'type': 1,
            'lat': '28.339143',
            'lon': '112.90648',
            'count': 753
        }, { 'type': 1, 'lat': '28.335876', 'lon': '112.877429', 'count': 688 }, {
            'type': 1,
            'lat': '28.304127',
            'lon': '112.948665',
            'count': 60
        }, { 'type': 1, 'lat': '28.29896', 'lon': '112.945698', 'count': 408 }, {
            'type': 1,
            'lat': '28.324622',
            'lon': '112.989598',
            'count': 448
        }, { 'type': 1, 'lat': '28.286378', 'lon': '112.974545', 'count': 592 }, {
            'type': 1,
            'lat': '28.313735',
            'lon': '112.97405',
            'count': 61
        }, { 'type': 1, 'lat': '28.284126', 'lon': '112.901977', 'count': 269 }, {
            'type': 1,
            'lat': '28.320703',
            'lon': '112.962346',
            'count': 20
        }, { 'type': 1, 'lat': '28.287958', 'lon': '112.934885', 'count': 29 }, {
            'type': 1,
            'lat': '28.28768',
            'lon': '112.915773',
            'count': 992
        }, { 'type': 1, 'lat': '28.295578', 'lon': '112.856705', 'count': 9 }, {
            'type': 1,
            'lat': '28.319965',
            'lon': '112.986416',
            'count': 101
        }, { 'type': 1, 'lat': '28.31308', 'lon': '112.959913', 'count': 570 }, {
            'type': 1,
            'lat': '28.314736',
            'lon': '112.863611',
            'count': 644
        }, { 'type': 1, 'lat': '28.320006', 'lon': '112.880292', 'count': 358 }, {
            'type': 1,
            'lat': '28.325237',
            'lon': '112.861154',
            'count': 310
        }, { 'type': 1, 'lat': '28.312207', 'lon': '112.838026', 'count': 489 }, {
            'type': 1,
            'lat': '28.292716',
            'lon': '112.972541',
            'count': 480
        }, { 'type': 1, 'lat': '28.300671', 'lon': '112.907719', 'count': 356 }, {
            'type': 1,
            'lat': '28.315129',
            'lon': '112.930585',
            'count': 464
        }, { 'type': 1, 'lat': '28.331861', 'lon': '112.863657', 'count': 984 }, {
            'type': 1,
            'lat': '28.285007',
            'lon': '112.915088',
            'count': 838
        }, { 'type': 1, 'lat': '28.283653', 'lon': '112.963323', 'count': 243 }, {
            'type': 1,
            'lat': '28.293505',
            'lon': '112.894352',
            'count': 179
        }, { 'type': 1, 'lat': '28.285943', 'lon': '112.820323', 'count': 58 }, {
            'type': 1,
            'lat': '28.330972',
            'lon': '112.901109',
            'count': 770
        }, { 'type': 1, 'lat': '28.320063', 'lon': '112.92015', 'count': 473 }, {
            'type': 1,
            'lat': '28.31095',
            'lon': '112.975819',
            'count': 493
        }, { 'type': 1, 'lat': '28.334733', 'lon': '112.891454', 'count': 287 }, {
            'type': 1,
            'lat': '28.296487',
            'lon': '112.845073',
            'count': 858
        }, { 'type': 1, 'lat': '28.317179', 'lon': '112.935635', 'count': 818 }, {
            'type': 1,
            'lat': '28.329659',
            'lon': '112.834642',
            'count': 563
        }, { 'type': 1, 'lat': '28.317284', 'lon': '112.89992', 'count': 296 }, {
            'type': 1,
            'lat': '28.285612',
            'lon': '112.901023',
            'count': 496
        }, { 'type': 1, 'lat': '28.302113', 'lon': '112.958098', 'count': 987 }, {
            'type': 1,
            'lat': '28.320882',
            'lon': '112.864539',
            'count': 174
        }, { 'type': 1, 'lat': '28.339231', 'lon': '112.904889', 'count': 28 }, {
            'type': 1,
            'lat': '28.297922',
            'lon': '112.932966',
            'count': 913
        }, { 'type': 1, 'lat': '28.311391', 'lon': '112.97215', 'count': 445 }, {
            'type': 1,
            'lat': '28.314368',
            'lon': '112.836462',
            'count': 291
        }, { 'type': 1, 'lat': '28.300844', 'lon': '112.957245', 'count': 313 }, {
            'type': 1,
            'lat': '28.331536',
            'lon': '112.955852',
            'count': 746
        }, { 'type': 1, 'lat': '28.334199', 'lon': '112.817479', 'count': 112 }, {
            'type': 1,
            'lat': '28.320262',
            'lon': '112.907769',
            'count': 111
        }, { 'type': 1, 'lat': '28.282473', 'lon': '112.846165', 'count': 678 }, {
            'type': 1,
            'lat': '28.31341',
            'lon': '112.885206',
            'count': 547
        }, { 'type': 1, 'lat': '28.288341', 'lon': '112.918032', 'count': 260 }, {
            'type': 1,
            'lat': '28.302296',
            'lon': '112.898442',
            'count': 582
        }, { 'type': 1, 'lat': '28.322125', 'lon': '112.856861', 'count': 847 }, {
            'type': 1,
            'lat': '28.284801',
            'lon': '112.987921',
            'count': 802
        }, { 'type': 1, 'lat': '28.31594', 'lon': '112.884396', 'count': 303 }, {
            'type': 1,
            'lat': '28.319974',
            'lon': '112.963772',
            'count': 389
        }, { 'type': 1, 'lat': '28.314456', 'lon': '112.840985', 'count': 921 }, {
            'type': 1,
            'lat': '28.290632',
            'lon': '112.944923',
            'count': 148
        }, { 'type': 1, 'lat': '28.338953', 'lon': '112.841652', 'count': 793 }, {
            'type': 1,
            'lat': '28.288192',
            'lon': '112.890068',
            'count': 319
        }, { 'type': 1, 'lat': '28.305337', 'lon': '112.869127', 'count': 870 }, {
            'type': 1,
            'lat': '28.295614',
            'lon': '112.870103',
            'count': 507
        }, { 'type': 1, 'lat': '28.338837', 'lon': '112.850993', 'count': 382 }, {
            'type': 1,
            'lat': '28.297314',
            'lon': '112.870932',
            'count': 265
        }, { 'type': 1, 'lat': '28.336801', 'lon': '112.94', 'count': 7 }, {
            'type': 1,
            'lat': '28.320664999999998',
            'lon': '112.90218',
            'count': 621
        }, { 'type': 1, 'lat': '28.325635', 'lon': '112.989762', 'count': 493 }, {
            'type': 1,
            'lat': '28.339188',
            'lon': '112.859683',
            'count': 189
        }, { 'type': 1, 'lat': '28.29206', 'lon': '112.968803', 'count': 82 }, {
            'type': 1,
            'lat': '28.291046',
            'lon': '112.91055',
            'count': 500
        }, { 'type': 1, 'lat': '28.285997', 'lon': '112.974435', 'count': 177 }, {
            'type': 1,
            'lat': '28.293838',
            'lon': '112.818725',
            'count': 996
        }, { 'type': 1, 'lat': '28.317027', 'lon': '112.840785', 'count': 166 }, {
            'type': 1,
            'lat': '28.297012',
            'lon': '112.935232',
            'count': 893
        }, { 'type': 1, 'lat': '28.332557', 'lon': '112.975714', 'count': 888 }, {
            'type': 1,
            'lat': '28.291666',
            'lon': '112.881582',
            'count': 986
        }, { 'type': 1, 'lat': '28.322349', 'lon': '112.881988', 'count': 367 }, {
            'type': 1,
            'lat': '28.290981',
            'lon': '112.871987',
            'count': 120
        }, { 'type': 1, 'lat': '28.315344', 'lon': '112.932356', 'count': 472 }, {
            'type': 1,
            'lat': '28.32636',
            'lon': '112.82642',
            'count': 31
        }, { 'type': 1, 'lat': '28.331586', 'lon': '112.87936', 'count': 686 }, {
            'type': 1,
            'lat': '28.297522999999998',
            'lon': '112.814682',
            'count': 933
        }, { 'type': 1, 'lat': '28.311321', 'lon': '112.990436', 'count': 634 }, {
            'type': 1,
            'lat': '28.292555',
            'lon': '112.920893',
            'count': 554
        }, { 'type': 1, 'lat': '28.306085', 'lon': '112.952518', 'count': 972 }, {
            'type': 1,
            'lat': '28.335959',
            'lon': '112.898359',
            'count': 252
        }, { 'type': 1, 'lat': '28.321075', 'lon': '112.867863', 'count': 303 }, {
            'type': 1,
            'lat': '28.315415',
            'lon': '112.979011',
            'count': 608
        }, { 'type': 1, 'lat': '28.301973', 'lon': '112.951128', 'count': 351 }, {
            'type': 1,
            'lat': '28.305254',
            'lon': '112.969355',
            'count': 325
        }, { 'type': 1, 'lat': '28.293656', 'lon': '112.844792', 'count': 638 }, {
            'type': 1,
            'lat': '28.306862',
            'lon': '112.892721',
            'count': 380
        }, { 'type': 1, 'lat': '28.328543', 'lon': '112.880262', 'count': 112 }, {
            'type': 1,
            'lat': '28.309258',
            'lon': '112.842148',
            'count': 896
        }, { 'type': 1, 'lat': '28.334281', 'lon': '112.939344', 'count': 130 }, {
            'type': 1,
            'lat': '28.289819',
            'lon': '112.941037',
            'count': 949
        }, { 'type': 1, 'lat': '28.329357', 'lon': '112.852678', 'count': 316 }, {
            'type': 1,
            'lat': '28.309355',
            'lon': '112.895329',
            'count': 859
        }, { 'type': 1, 'lat': '28.30821', 'lon': '112.989197', 'count': 501 }, {
            'type': 1,
            'lat': '28.331363',
            'lon': '112.898447',
            'count': 795
        }, { 'type': 1, 'lat': '28.320281', 'lon': '112.877715', 'count': 585 }, {
            'type': 1,
            'lat': '28.338593',
            'lon': '112.832919',
            'count': 560
        }, { 'type': 1, 'lat': '28.337027', 'lon': '112.862359', 'count': 162 }, {
            'type': 1,
            'lat': '28.329393',
            'lon': '112.827997',
            'count': 831
        }, { 'type': 1, 'lat': '28.313356', 'lon': '112.843066', 'count': 953 }, {
            'type': 1,
            'lat': '28.321994',
            'lon': '112.937381',
            'count': 675
        }, { 'type': 1, 'lat': '28.288303', 'lon': '112.836274', 'count': 541 }, {
            'type': 1,
            'lat': '28.323703',
            'lon': '112.90715',
            'count': 189
        },
        {
            'type': 5,
            'count': 324,
            'lon': '113.4620361328125',
            'lat': '28.24293212890625'
        },
        {
            'type': 5,
            'count': 200,
            'lon': '113.1620361328125',
            'lat': '28.33743896484375'
        },
        {
            'type': 5,
            'count': 100,
            'lon': '112.8510498046875',
            'lat': '28.04293212890625'
        },
        {
            'type': 5,
            'count': 90,
            'lon': '112.9972412109375',
            'lat': '28.12532958984375'
        },
        {
            'type': 5,
            'count': 80,
            'lon': '113.4620361328125',
            'lat': '28.24293212890625'
        },
        {
            'type': 5,
            'count': 70,
            'lon': '',
            'lat': ''
        },
        {
            'type': 5,
            'count': 60,
            'lon': '',
            'lat': ''
        },
        {
            'type': 5,
            'count': 50,
            'lon': '',
            'lat': ''
        },
        {
            'type': 5,
            'count': 40,
            'lon': '',
            'lat': ''
        },
        {
            'type': 6,
            'count': 150,
            'lon': '112.8510498046875',
            'lat': '28.24293212890625'
        },
        {
            'type': 6,
            'count': 148,
            'lon': '112.9840087890625',
            'lat': '28.36490478515625'
        },
        {
            'type': 6,
            'count': 130,
            'lon': '113.0620361328125',
            'lat': '28.04293212890625'
        },
        {
            'type': 6,
            'count': 120,
            'lon': '113.1411865234375',
            'lat': '28.12095947265625'
        },
        {
            'type': 6,
            'count': 110,
            'lon': '',
            'lat': ''
        },
        {
            'type': 6,
            'count': 90,
            'lon': '',
            'lat': ''
        },
        {
            'type': 6,
            'count': 80,
            'lon': '',
            'lat': ''
        },
        {
            'type': 6,
            'count': 70,
            'lon': '',
            'lat': ''
        },
        {
            'type': 6,
            'count': 60,
            'lon': '',
            'lat': ''
        },
        {
            'type': 6,
            'count': 50,
            'lon': '',
            'lat': ''
        }
    ]
})
let userCountTop5 = Mock.mock({
    'status': 200,
    'message': '',
    'data': {
        'scenic': [
            { 'areaName': '橘子洲', 'areaValue': 87324, areaId: 'a1', 'type': 1, 'taskId': 1 },
            { 'areaName': '岳麓山', 'areaValue': 86373, areaId: 'a2', 'type': 1, 'taskId': 1 },
            { 'areaName': '五一广场', 'areaValue': 57732, areaId: 'a3', 'type': 1, 'taskId': 1 },
            { 'areaName': '天心阁', 'areaValue': 55290, areaId: 'a4', 'type': 1, 'taskId': 1 },
            { 'areaName': '长沙世界之窗', 'areaValue': 37980, areaId: 'a5', 'type': 1, 'taskId': 1 }
        ],
        'transportation': [
            { 'areaName': '海港一', 'areaValue': 87324, 'areaId': 'b1', 'type': 2, 'taskId': 2 },
            { 'areaName': '海港二', 'areaValue': 8673, 'areaId': 'b2', 'type': 2, 'taskId': 2 },
            { 'areaName': '海港三', 'areaValue': 572, 'areaId': 'b3', 'type': 2, 'taskId': 2 },
            { 'areaName': '海港四', 'areaValue': 520, 'areaId': 'b4', 'type': 2, 'taskId': 2 },
            { 'areaName': '海港五', 'areaValue': 30, 'areaId': 'b5', 'type': 2, 'taskId': 2 }
        ],
        'others': [
            { 'areaName': '区域一', 'areaValue': 8700324, 'areaId': 'c1', 'type': 3, 'taskId': 3 },
            { 'areaName': '区域二', 'areaValue': 86373, 'areaId': 'c2', 'type': 3, 'taskId': 3 },
            { 'areaName': '区域三', 'areaValue': 57732, 'areaId': 'c3', 'type': 3, 'taskId': 3 },
            { 'areaName': '区域四', 'areaValue': 55290, 'areaId': 'c4', 'type': 3, 'taskId': 3 },
            { 'areaName': '区域五', 'areaValue': 37, 'areaId': 'c5', 'type': 3, 'taskId': 3 }
        ]
    }
})
export default {
    selectHome: () => selectHome,
    moveUserData: () => moveUserData,
    residenceUserData: () => residenceUserData,
    userLineData: () => userLineData,
    tourUserData: () => tourUserData,
    userSourceData: () => userSourceData,
    allUserCount: () => allUserCount,
    populationMinutes: () => populationMinutes,
    populationDay: () => populationDay,
    populationHour: () => populationHour,
    userCountTop5: () => userCountTop5
};
