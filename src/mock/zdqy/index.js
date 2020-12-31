import Mock from 'mockjs'
let overall = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        'snCount': 3655410,
        'zdCount': 56,
        'szCount': 0,
        'swCount': 3652145,
        'sjCount': 0,
        'jwCount': 1170,
        'allCount': 5632586
    },
    'rows': null,
    'total': null,
    'api_name': null
})
let cylinderInner = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'rows': [{
        'timestamp': null,
        'area': '西宁市',
        'areacode': '630100',
        'count': 40770,
        'type': 0
    }, {
        'timestamp': null,
        'area': '海东市',
        'areacode': '630200',
        'count': 34445,
        'type': 0
    }, {
        'timestamp': null,
        'area': '海西蒙古族藏族自治州',
        'areacode': '632800',
        'count': 33345,
        'type': 0
    }, {
        'timestamp': null,
        'area': '海南藏族自治州',
        'areacode': '632500',
        'count': 32245,
        'type': 0
    }, {
        'timestamp': null,
        'area': '玉树藏族自治州',
        'areacode': '632700',
        'count': 31145,
        'type': 0
    }, {
        'timestamp': null,
        'area': '海北藏族自治州',
        'areacode': '632200',
        'count': 24445,
        'type': 0
    }, {
        'timestamp': null,
        'area': '黄南藏族自治州',
        'areacode': '632300',
        'count': 17258,
        'type': 0
    }, {
        'timestamp': null,
        'area': '果洛藏族自治州',
        'areacode': '632600',
        'count': 17105,
        'type': 0
    }],
    'total': 0,
    'api_name': null
})
let cylinderOuter = Mock.mock({
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
        'area': '甘肃',
        'areaCode': '620000',
        'count': '25',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '兰州市',
            'areaCode': '620100',
            'count': '15',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '620000',
            'provCode': null,
            'pop': []
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
            'area': '临夏回族自治州',
            'areaCode': '622900',
            'count': '6',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '620000',
            'provCode': null,
            'pop': []
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
            'area': '金昌市',
            'areaCode': '620300',
            'count': '2',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '620000',
            'provCode': null,
            'pop': []
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
            'area': '定西市',
            'areaCode': '621100',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '620000',
            'provCode': null,
            'pop': []
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
            'area': '天水市',
            'areaCode': '620500',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '620000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '江苏',
        'areaCode': '320000',
        'count': '14',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '南京',
            'areaCode': '320100',
            'count': '8',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '320000',
            'provCode': null,
            'pop': []
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
            'area': '苏州市',
            'areaCode': '320500',
            'count': '3',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '320000',
            'provCode': null,
            'pop': []
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
            'area': '扬州市',
            'areaCode': '321000',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '320000',
            'provCode': null,
            'pop': []
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
            'area': '宿迁市',
            'areaCode': '321300',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '320000',
            'provCode': null,
            'pop': []
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
            'area': '盐城市',
            'areaCode': '320900',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '320000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '陕西',
        'areaCode': '610000',
        'count': '11',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '咸阳市',
            'areaCode': '610400',
            'count': '9',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '610000',
            'provCode': null,
            'pop': []
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
            'area': '西安',
            'areaCode': '610100',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '610000',
            'provCode': null,
            'pop': []
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
            'area': '宝鸡市',
            'areaCode': '610300',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '610000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '四川',
        'areaCode': '510000',
        'count': '9',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '遂宁市',
            'areaCode': '510900',
            'count': '3',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '510000',
            'provCode': null,
            'pop': []
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
            'area': '资阳市',
            'areaCode': '512000',
            'count': '2',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '510000',
            'provCode': null,
            'pop': []
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
            'area': '南充市',
            'areaCode': '511300',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '510000',
            'provCode': null,
            'pop': []
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
            'area': '宜宾市',
            'areaCode': '511500',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '510000',
            'provCode': null,
            'pop': []
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
            'area': '广元市',
            'areaCode': '510800',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '510000',
            'provCode': null,
            'pop': []
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
            'area': '自贡市',
            'areaCode': '510300',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '510000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '湖北',
        'areaCode': '420000',
        'count': '8',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '黄石市',
            'areaCode': '420200',
            'count': '5',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '420000',
            'provCode': null,
            'pop': []
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
            'area': '恩施土家族苗族自治州',
            'areaCode': '422800',
            'count': '2',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '420000',
            'provCode': null,
            'pop': []
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
            'area': '荆州市',
            'areaCode': '421000',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '420000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '河南',
        'areaCode': '410000',
        'count': '8',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '新乡市',
            'areaCode': '410700',
            'count': '3',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '410000',
            'provCode': null,
            'pop': []
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
            'area': '驻马店市',
            'areaCode': '411700',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '410000',
            'provCode': null,
            'pop': []
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
            'area': '焦作市',
            'areaCode': '410800',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '410000',
            'provCode': null,
            'pop': []
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
            'area': '商丘市',
            'areaCode': '411400',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '410000',
            'provCode': null,
            'pop': []
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
            'area': '周口市',
            'areaCode': '411600',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '410000',
            'provCode': null,
            'pop': []
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
            'area': '开封市',
            'areaCode': '410200',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '410000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '广东',
        'areaCode': '440000',
        'count': '7',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '东莞',
            'areaCode': '441900',
            'count': '2',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '440000',
            'provCode': null,
            'pop': []
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
            'area': '深圳市',
            'areaCode': '440300',
            'count': '2',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '440000',
            'provCode': null,
            'pop': []
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
            'area': '韶关市',
            'areaCode': '440200',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '440000',
            'provCode': null,
            'pop': []
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
            'area': '湛江市',
            'areaCode': '440800',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '440000',
            'provCode': null,
            'pop': []
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
            'area': '佛山市',
            'areaCode': '440600',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '440000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '上海',
        'areaCode': '310000',
        'count': '6',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '上海市',
            'areaCode': '310000',
            'count': '6',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '310000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '宁夏',
        'areaCode': '640000',
        'count': '6',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '银川市',
            'areaCode': '640100',
            'count': '5',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '640000',
            'provCode': null,
            'pop': []
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
            'area': '石嘴山市',
            'areaCode': '640200',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '640000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '山西',
        'areaCode': '140000',
        'count': '5',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '吕梁市',
            'areaCode': '141100',
            'count': '4',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '140000',
            'provCode': null,
            'pop': []
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
            'area': '太原市',
            'areaCode': '140100',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '140000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '山东',
        'areaCode': '370000',
        'count': '5',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '青岛市',
            'areaCode': '370200',
            'count': '3',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '370000',
            'provCode': null,
            'pop': []
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
            'area': '菏泽市',
            'areaCode': '371700',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '370000',
            'provCode': null,
            'pop': []
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
            'area': '济南市',
            'areaCode': '370100',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '370000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '浙江',
        'areaCode': '330000',
        'count': '5',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '金华市',
            'areaCode': '330700',
            'count': '3',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '330000',
            'provCode': null,
            'pop': []
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
            'area': '杭州市',
            'areaCode': '330100',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '330000',
            'provCode': null,
            'pop': []
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
            'area': '嘉兴市',
            'areaCode': '330400',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '330000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '安徽',
        'areaCode': '340000',
        'count': '4',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '阜阳市',
            'areaCode': '341200',
            'count': '2',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '340000',
            'provCode': null,
            'pop': []
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
            'area': '滁州市',
            'areaCode': '341100',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '340000',
            'provCode': null,
            'pop': []
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
            'area': '安庆市',
            'areaCode': '340800',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '340000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '西藏',
        'areaCode': '540000',
        'count': '4',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '拉萨市',
            'areaCode': '540100',
            'count': '4',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '540000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '北京',
        'areaCode': '110000',
        'count': '3',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '北京市',
            'areaCode': '110000',
            'count': '3',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '110000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '新疆',
        'areaCode': '650000',
        'count': '3',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '乌鲁木齐市',
            'areaCode': '650100',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '650000',
            'provCode': null,
            'pop': []
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
            'area': '阿勒泰地区',
            'areaCode': '654300',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '650000',
            'provCode': null,
            'pop': []
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
            'area': '伊犁哈萨克自治州',
            'areaCode': '654000',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '650000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '天津',
        'areaCode': '120000',
        'count': '2',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '天津市',
            'areaCode': '120000',
            'count': '2',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '120000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '内蒙古',
        'areaCode': '150000',
        'count': '2',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '临河区',
            'areaCode': '150802',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '150000',
            'provCode': null,
            'pop': []
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
            'area': '呼和浩特市',
            'areaCode': '150100',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '150000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '湖南',
        'areaCode': '430000',
        'count': '2',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '常德市',
            'areaCode': '430700',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '430000',
            'provCode': null,
            'pop': []
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
            'area': '株洲市',
            'areaCode': '430200',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '430000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '重庆',
        'areaCode': '500000',
        'count': '1',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '涪陵区',
            'areaCode': '500102',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '500000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '黑龙江',
        'areaCode': '230000',
        'count': '1',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '哈尔滨市',
            'areaCode': '230100',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '230000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '江西',
        'areaCode': '360000',
        'count': '1',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '宜春市',
            'areaCode': '360900',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '360000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '贵州',
        'areaCode': '520000',
        'count': '1',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '兴义市',
            'areaCode': '522301',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '520000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '广西',
        'areaCode': '450000',
        'count': '1',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '崇左市',
            'areaCode': '451400',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '450000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '河北',
        'areaCode': '130000',
        'count': '1',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '保定市',
            'areaCode': '130600',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '130000',
            'provCode': null,
            'pop': []
        }]
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
        'area': '云南',
        'areaCode': '530000',
        'count': '1',
        'taskId': null,
        'areaId': null,
        'timestamp': null,
        'swProvincename': null,
        'provCode': null,
        'pop': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'area': '昆明市',
            'areaCode': '530100',
            'count': '1',
            'taskId': null,
            'areaId': null,
            'timestamp': null,
            'swProvincename': '530000',
            'provCode': null,
            'pop': []
        }]
    }],
    'total': 64,
    'api_name': null
})
let cylinderOverseas = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': null,
    'rows': [
        {
            'timestamp': null,
            'area': '美国',
            'areacode': '630100',
            'count': 40770,
            'type': 0
        }, {
            'timestamp': null,
            'area': '俄罗斯',
            'areacode': '630200',
            'count': 34445,
            'type': 0
        }
    ],
    'total': 0,
    'api_name': null
})
let cellCoordinatesQuery = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'resourceId': 641334,
        'areaName': '11111',
        'owner': 'T316',
        'areaSourceType': '3',
        'systemId': null,
        'taskBaseId': null,
        'resourceIds': null,
        'acreage': 6.020146,
        'orgId': '0002',
        'operateTime': '2017-11-07 14:40:28.0',
        'batch': null,
        'areaBorderInfoVO': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'resourceId': 2541,
            'areaBaseInfoId': 641334,
            'longtitude': '106.407360',
            'latitude': '38.346725',
            'radius': null,
            'batch': null
        }, {
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'resourceId': 2542,
            'areaBaseInfoId': 641334,
            'longtitude': '106.339620',
            'latitude': '38.333330',
            'radius': null,
            'batch': null
        }, {
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'resourceId': 2543,
            'areaBaseInfoId': 641334,
            'longtitude': '106.368440',
            'latitude': '38.320747',
            'radius': null,
            'batch': null
        }],
        'areaIncludeCellVO': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'resourceId': 41576,
            'areaBaseInfoId': 641334,
            'ispCode': '03',
            'lac': '48410',
            'ci': '199056434',
            'uli': '460-03-777564-50',
            'longtitude': '106.407360',
            'latitude': '38.346725',
            'address': 'ZF_H_B_银川_灵武石坝清真寺_0',
            'batch': null
        }, {
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'resourceId': 41577,
            'areaBaseInfoId': 641334,
            'ispCode': '03',
            'lac': '48410',
            'ci': '199056435',
            'uli': '460-03-777564-51',
            'longtitude': '106.407360',
            'latitude': '38.346725',
            'address': 'ZF_H_B_银川_灵武石坝清真寺_1',
            'batch': null
        }, {
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'resourceId': 41578,
            'areaBaseInfoId': 641334,
            'ispCode': '03',
            'lac': '48474',
            'ci': '198964018',
            'uli': '460-03-777203-50',
            'longtitude': '106.339620',
            'latitude': '38.333330',
            'address': 'ZF_H_B_银川_永宁政权新村_0',
            'batch': null
        }, {
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'resourceId': 41579,
            'areaBaseInfoId': 641334,
            'ispCode': '03',
            'lac': '48384',
            'ci': '199051058',
            'uli': '460-03-777543-50',
            'longtitude': '106.368440',
            'latitude': '38.320747',
            'address': 'ZF_H_B_银川_灵武临河镇政府基站_0',
            'batch': null
        }],
        'cellInfo': null,
        'cellUnUse': null,
        'status': 0,
        'approverStatus': 3,
        'flag': 0
    },
    'rows': null,
    'total': null,
    'api_name': null
})
let gpshot = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        'xishu': [41, 9, 8, 1, 1, 1],
        'gps': [
            {
                'counts': 1192,
                'lon': '112.979079',
                'lat': '28.239219'
            },
            {
                'counts': 8,
                'lon': '112.954549',
                'lat': '28.177489'
            },
            {
                'counts': 29,
                'lon': '112.95722',
                'lat': '28.198619'
            },
            {
                'counts': 1,
                'lon': '112.951004',
                'lat': '28.19954'
            },
            {
                'counts': 291,
                'lon': '112.96517',
                'lat': '28.18708'
            },
            {
                'counts': 9,
                'lon': '112.955479',
                'lat': '28.190149'
            },
            {
                'counts': 1,
                'lon': '112.950928',
                'lat': '28.199276'
            },
            {
                'counts': 115,
                'lon': '112.96584',
                'lat': '28.187919'
            },
            {
                'counts': 5,
                'lon': '112.955479',
                'lat': '28.190049'
            },
            {
                'counts': 124,
                'lon': '112.94973',
                'lat': '28.19357'
            },
            {
                'counts': 39,
                'lon': '112.959069',
                'lat': '28.20848'
            },
            {
                'counts': 725,
                'lon': '112.95475',
                'lat': '28.17192'
            },
            {
                'counts': 20,
                'lon': '112.957286',
                'lat': '28.197161'
            },
            {
                'counts': 83,
                'lon': '112.896889',
                'lat': '28.21007'
            },
            {
                'counts': 9,
                'lon': '112.95627',
                'lat': '28.179279'
            },
            {
                'counts': 62,
                'lon': '112.959689',
                'lat': '28.206589'
            },
            {
                'counts': 567,
                'lon': '112.94838',
                'lat': '28.18721'
            },
            {
                'counts': 15,
                'lon': '112.961241',
                'lat': '28.199235'
            },
            {
                'counts': 40,
                'lon': '112.95631',
                'lat': '28.19181'
            },
            {
                'counts': 36,
                'lon': '112.95681',
                'lat': '28.19731'
            },
            {
                'counts': 1192,
                'lon': '112.962999',
                'lat': '28.195399'
            },
            {
                'counts': 61,
                'lon': '112.94789',
                'lat': '28.18136'
            },
            {
                'counts': 81,
                'lon': '112.963599',
                'lat': '28.185269'
            },
            {
                'counts': 1543,
                'lon': '112.95617',
                'lat': '28.197759'
            },
            {
                'counts': 134,
                'lon': '112.950429',
                'lat': '28.20016'
            },
            {
                'counts': 118,
                'lon': '112.951509',
                'lat': '28.201709'
            },
            {
                'counts': 367,
                'lon': '112.950429',
                'lat': '28.19969'
            },
            {
                'counts': 2,
                'lon': '112.949608',
                'lat': '28.198942'
            },
            {
                'counts': 3,
                'lon': '112.95525',
                'lat': '28.18477'
            },
            {
                'counts': 1,
                'lon': '112.958669',
                'lat': '28.203209'
            },
            {
                'counts': 370,
                'lon': '112.963399',
                'lat': '28.194099'
            },
            {
                'counts': 190,
                'lon': '112.96389',
                'lat': '28.18333'
            },
            {
                'counts': 32,
                'lon': '112.95438',
                'lat': '28.199465'
            },
            {
                'counts': 59,
                'lon': '112.956175',
                'lat': '28.186612'
            },
            {
                'counts': 18,
                'lon': '112.957296',
                'lat': '28.197161'
            },
            {
                'counts': 44,
                'lon': '112.957229',
                'lat': '28.198609'
            },
            {
                'counts': 333,
                'lon': '112.964439',
                'lat': '28.10375'
            },
            {
                'counts': 15,
                'lon': '112.95425',
                'lat': '28.17284'
            },
            {
                'counts': 364,
                'lon': '112.959249',
                'lat': '28.208469'
            },
            {
                'counts': 75,
                'lon': '112.948359',
                'lat': '28.184909'
            },
            {
                'counts': 256,
                'lon': '112.963579',
                'lat': '28.189129'
            },
            {
                'counts': 220,
                'lon': '112.96375',
                'lat': '28.198619'
            },
            {
                'counts': 48,
                'lon': '112.954284',
                'lat': '28.199003'
            },
            {
                'counts': 22,
                'lon': '112.955449',
                'lat': '28.17076'
            },
            {
                'counts': 131,
                'lon': '112.95631',
                'lat': '28.19872'
            },
            {
                'counts': 82,
                'lon': '112.96396',
                'lat': '28.196269'
            },
            {
                'counts': 269,
                'lon': '112.957679',
                'lat': '28.20119'
            },
            {
                'counts': 69,
                'lon': '112.957629',
                'lat': '28.204129'
            },
            {
                'counts': 56,
                'lon': '112.95698',
                'lat': '28.194769'
            },
            {
                'counts': 247,
                'lon': '112.948759',
                'lat': '28.19902'
            },
            {
                'counts': 24,
                'lon': '112.96407',
                'lat': '28.19506'
            },
            {
                'counts': 1603,
                'lon': '112.96576',
                'lat': '28.19844'
            },
            {
                'counts': 41,
                'lon': '112.956198',
                'lat': '28.18265'
            },
            {
                'counts': 301,
                'lon': '112.95552',
                'lat': '28.19602'
            },
            {
                'counts': 677,
                'lon': '112.96302',
                'lat': '28.184719'
            },
            {
                'counts': 945,
                'lon': '112.96361',
                'lat': '28.19941'
            },
            {
                'counts': 861,
                'lon': '112.96321',
                'lat': '28.19705'
            },
            {
                'counts': 64,
                'lon': '112.963409',
                'lat': '28.19462'
            },
            {
                'counts': 63,
                'lon': '112.963409',
                'lat': '28.18739'
            },
            {
                'counts': 931,
                'lon': '112.963579',
                'lat': '28.182459'
            },
            {
                'counts': 31,
                'lon': '112.956059',
                'lat': '28.18261'
            },
            {
                'counts': 949,
                'lon': '112.94889',
                'lat': '28.199059'
            },
            {
                'counts': 302,
                'lon': '112.94252',
                'lat': '28.16873'
            },
            {
                'counts': 123,
                'lon': '112.960369',
                'lat': '28.210349'
            },
            {
                'counts': 226,
                'lon': '112.950659',
                'lat': '28.19602'
            },
            {
                'counts': 131,
                'lon': '112.966309',
                'lat': '28.18831'
            },
            {
                'counts': 145,
                'lon': '112.94871',
                'lat': '28.188849'
            },
            {
                'counts': 70,
                'lon': '112.948779',
                'lat': '28.199239'
            },
            {
                'counts': 71,
                'lon': '112.95475',
                'lat': '28.17961'
            },
            {
                'counts': 99,
                'lon': '112.963759',
                'lat': '28.197569'
            },
            {
                'counts': 88,
                'lon': '112.960369',
                'lat': '28.21048'
            },
            {
                'counts': 611,
                'lon': '112.948667',
                'lat': '28.189194'
            },
            {
                'counts': 440,
                'lon': '112.94856',
                'lat': '28.199059'
            },
            {
                'counts': 303,
                'lon': '112.948109',
                'lat': '28.182919'
            },
            {
                'counts': 116,
                'lon': '112.9629',
                'lat': '28.183309'
            },
            {
                'counts': 210,
                'lon': '112.957567',
                'lat': '28.204063'
            },
            {
                'counts': 11,
                'lon': '112.956113',
                'lat': '28.191494'
            },
            {
                'counts': 203,
                'lon': '112.954446',
                'lat': '28.169052'
            },
            {
                'counts': 2172,
                'lon': '112.96285',
                'lat': '28.183351'
            },
            {
                'counts': 161,
                'lon': '112.949709',
                'lat': '28.193639'
            },
            {
                'counts': 150,
                'lon': '112.96361',
                'lat': '28.19191'
            },
            {
                'counts': 211,
                'lon': '112.956159',
                'lat': '28.18691'
            },
            {
                'counts': 13,
                'lon': '112.956923',
                'lat': '28.194539'
            },
            {
                'counts': 86,
                'lon': '112.96415',
                'lat': '28.198689'
            },
            {
                'counts': 32,
                'lon': '112.956453',
                'lat': '28.188862'
            },
            {
                'counts': 849,
                'lon': '112.95013',
                'lat': '28.191919'
            },
            {
                'counts': 83,
                'lon': '112.963696',
                'lat': '28.199484'
            },
            {
                'counts': 157,
                'lon': '112.9577',
                'lat': '28.20006'
            },
            {
                'counts': 25,
                'lon': '112.954449',
                'lat': '28.169109'
            },
            {
                'counts': 546,
                'lon': '112.94956',
                'lat': '28.193394'
            },
            {
                'counts': 615,
                'lon': '112.96343',
                'lat': '28.191839'
            },
            {
                'counts': 755,
                'lon': '112.965829',
                'lat': '28.200279'
            },
            {
                'counts': 219,
                'lon': '112.95716',
                'lat': '28.19875'
            },
            {
                'counts': 249,
                'lon': '112.962779',
                'lat': '28.195'
            },
            {
                'counts': 6,
                'lon': '112.95541',
                'lat': '28.18727'
            },
            {
                'counts': 214,
                'lon': '112.964169',
                'lat': '28.19583'
            },
            {
                'counts': 219,
                'lon': '112.963629',
                'lat': '28.196349'
            },
            {
                'counts': 574,
                'lon': '112.963629',
                'lat': '28.199519'
            },
            {
                'counts': 31,
                'lon': '112.96419',
                'lat': '28.187509'
            },
            {
                'counts': 7,
                'lon': '112.954989',
                'lat': '28.181629'
            },
            {
                'counts': 103,
                'lon': '112.962869',
                'lat': '28.19847'
            },
            {
                'counts': 234,
                'lon': '112.94991',
                'lat': '28.197279'
            },
            {
                'counts': 131,
                'lon': '112.95583',
                'lat': '28.17583'
            },
            {
                'counts': 38,
                'lon': '112.955879',
                'lat': '28.178719'
            },
            {
                'counts': 2,
                'lon': '112.957222',
                'lat': '28.19861'
            },
            {
                'counts': 121,
                'lon': '112.95595',
                'lat': '28.176159'
            },
            {
                'counts': 163,
                'lon': '112.948689',
                'lat': '28.189879'
            },
            {
                'counts': 1010,
                'lon': '112.96553',
                'lat': '28.1994'
            },
            {
                'counts': 136,
                'lon': '112.95147',
                'lat': '28.201609'
            },
            {
                'counts': 1326,
                'lon': '112.962999',
                'lat': '28.195119'
            },
            {
                'counts': 69,
                'lon': '112.965608',
                'lat': '28.200632'
            }
        ]
    },
    'rows': null,
    'total': null,
    'api_name': null
})
let listcumulation = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': null,
    'rows': [],
    'total': 0,
    'api_name': null
})
let persons = Mock.mock({
    'status': 200,
    'message': '未查出数据',
    'data': [
        { 'name': '张丹', 'msisdn': '15896584754', 'arrivetime': '2018-12-12 12:12:12', 'addressName': '西宁盐业大厦',
            'latitude': '36.64097190603312', 'longtitude': '101.78699657865911', 'flag': '标签一' },
        { 'name': '张三', 'msisdn': '8618329583392', 'arrivetime': '2018-01-12 12:12:12', 'addressName': '西宁盐业大厦',
            'latitude': '36.25639997944072', 'longtitude': '103.02263962841036', 'flag': '标签二' },
        { 'name': '李斯', 'msisdn': '8617691170548', 'arrivetime': '2018-10-12 12:12:12', 'addressName': '西宁盐业大厦',
            'latitude': '36.25082379845231', 'longtitude': '103.02375036978384', 'flag': '标签三' },
        { 'name': '王二', 'msisdn': '13685654789', 'arrivetime': '2018-11-23 12:12:12', 'addressName': '西宁盐业大厦',
            'latitude': '36.78699657865911', 'longtitude': '103.64097190603312', 'flag': '标签四' }
    ],
    'rows': null,
    'total': null,
    'api_name': null
})
let snap = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        'datahour': [
            {
                'value': 1778,
                'type': '1',
                'flag': 0,
                'time': '2019-03-07 10:26:26'
            },
            {
                'value': 1774,
                'type': '1',
                'flag': 0,
                'time': '2019-03-07 10:28:26'
            },
            {
                'value': 1748,
                'type': '1',
                'flag': 0,
                'time': '2019-03-07 10:30:26'
            },
            {
                'value': 1782,
                'type': '1',
                'time': '2019-03-07 10:32:26'
            },
            {
                'value': 1758,
                'type': '1',
                'time': '2019-03-07 10:34:26'
            },
            {
                'value': 1742,
                'type': '1',
                'time': '2019-03-07 10:36:26'
            },
            {
                'value': 1757,
                'type': '1',
                'time': '2019-03-07 10:38:26'
            },
            {
                'value': 1764,
                'type': '1',
                'time': '2019-03-07 10:40:26'
            },
            {
                'value': 1759,
                'type': '1',
                'time': '2019-03-07 10:42:26'
            },
            {
                'value': 1773,
                'type': '1',
                'time': '2019-03-07 10:44:26'
            },
            {
                'value': 1755,
                'type': '1',
                'time': '2019-03-07 10:48:26'
            },
            {
                'value': 1763,
                'type': '1',
                'time': '2019-03-07 10:50:26'
            },
            {
                'value': 1743,
                'type': '1',
                'time': '2019-03-07 10:52:26'
            },
            {
                'value': 1738,
                'type': '1',
                'time': '2019-03-07 10:54:26'
            },
            {
                'value': 1731,
                'type': '1',
                'time': '2019-03-07 10:56:26'
            },
            {
                'value': 1723,
                'type': '1',
                'time': '2019-03-07 10:58:26'
            },
            {
                'value': 1747,
                'type': '1',
                'time': '2019-03-07 11:00:26'
            },
            {
                'value': 1759,
                'type': '1',
                'time': '2019-03-07 11:02:26'
            },
            {
                'value': 1750,
                'type': '1',
                'time': '2019-03-07 11:04:26'
            },
            {
                'value': 1755,
                'type': '1',
                'time': '2019-03-07 11:06:26'
            },
            {
                'value': 1752,
                'type': '1',
                'time': '2019-03-07 11:08:26'
            },
            {
                'value': 1727,
                'type': '1',
                'time': '2019-03-07 11:10:26'
            },
            {
                'value': 1771,
                'type': '1',
                'time': '2019-03-07 11:12:26'
            },
            {
                'value': 1749,
                'type': '1',
                'time': '2019-03-07 11:14:26'
            },
            {
                'value': 1730,
                'type': '1',
                'time': '2019-03-07 11:16:26'
            },
            {
                'value': 1712,
                'type': '1',
                'time': '2019-03-07 11:18:26'
            }
        ],
        'dataday': [
            {
                'name': 1,
                'value': 1880,
                'type': '全部',
                'time': '2019-03-06 12:00:07'
            },
            {
                'name': 2,
                'value': 1845,
                'type': '全部',
                'time': '2019-03-06 13:00:07'
            },
            {
                'name': 3,
                'value': 1789,
                'type': '全部',
                'time': '2019-03-06 14:00:07'
            },
            {
                'name': 4,
                'value': 1828,
                'type': '全部',
                'time': '2019-03-06 15:00:07'
            },
            {
                'name': 5,
                'value': 1738,
                'type': '全部',
                'time': '2019-03-06 16:00:07'
            },
            {
                'name': 6,
                'value': 1826,
                'type': '全部',
                'time': '2019-03-06 17:00:07'
            },
            {
                'name': 7,
                'value': 1896,
                'type': '全部',
                'time': '2019-03-06 18:00:07'
            },
            {
                'name': 8,
                'value': 1801,
                'type': '全部',
                'time': '2019-03-06 19:00:07'
            },
            {
                'name': 9,
                'value': 1902,
                'type': '全部',
                'time': '2019-03-06 20:00:07'
            },
            {
                'name': 10,
                'value': 1714,
                'type': '全部',
                'time': '2019-03-06 21:00:07'
            },
            {
                'name': 11,
                'value': 723,
                'type': '全部',
                'time': '2019-03-06 22:00:26'
            },
            {
                'name': 12,
                'value': 1270,
                'type': '全部',
                'time': '2019-03-06 23:00:26'
            },
            {
                'name': 13,
                'value': 1293,
                'type': '全部',
                'time': '2019-03-07 00:00:26'
            },
            {
                'name': 14,
                'value': 1283,
                'type': '全部',
                'time': '2019-03-07 01:00:26'
            },
            {
                'name': 15,
                'value': 1217,
                'type': '全部',
                'time': '2019-03-07 02:00:26'
            },
            {
                'name': 16,
                'value': 1172,
                'type': '全部',
                'time': '2019-03-07 03:00:26'
            },
            {
                'name': 17,
                'value': 1150,
                'type': '全部',
                'time': '2019-03-07 04:00:26'
            },
            {
                'name': 18,
                'value': 1141,
                'type': '全部',
                'time': '2019-03-07 05:00:26'
            },
            {
                'name': 19,
                'value': 1197,
                'type': '全部',
                'time': '2019-03-07 06:00:26'
            },
            {
                'name': 20,
                'value': 1311,
                'type': '全部',
                'time': '2019-03-07 07:00:26'
            },
            {
                'name': 21,
                'value': 1479,
                'type': '全部',
                'time': '2019-03-07 08:00:26'
            },
            {
                'name': 22,
                'value': 1706,
                'type': '全部',
                'time': '2019-03-07 09:00:26'
            },
            {
                'name': 23,
                'value': 1891,
                'type': '全部',
                'time': '2019-03-07 10:00:26'
            },
            {
                'name': 24,
                'value': 1747,
                'type': '全部',
                'time': '2019-03-07 11:00:26'
            },
            {
                'name': 1,
                'value': 1733,
                'type': '省内',
                'time': '2019-03-06 12:00:07'
            },
            {
                'name': 2,
                'value': 1696,
                'type': '省内',
                'time': '2019-03-06 13:00:07'
            },
            {
                'name': 3,
                'value': 1649,
                'type': '省内',
                'time': '2019-03-06 14:00:07'
            },
            {
                'name': 4,
                'value': 1684,
                'type': '省内',
                'time': '2019-03-06 15:00:07'
            },
            {
                'name': 5,
                'value': 1609,
                'type': '省内',
                'time': '2019-03-06 16:00:07'
            },
            {
                'name': 6,
                'value': 1689,
                'type': '省内',
                'time': '2019-03-06 17:00:07'
            },
            {
                'name': 7,
                'value': 1767,
                'type': '省内',
                'time': '2019-03-06 18:00:07'
            },
            {
                'name': 8,
                'value': 1669,
                'type': '省内',
                'time': '2019-03-06 19:00:07'
            },
            {
                'name': 9,
                'value': 1772,
                'type': '省内',
                'time': '2019-03-06 20:00:07'
            },
            {
                'name': 10,
                'value': 1588,
                'type': '省内',
                'time': '2019-03-06 21:00:07'
            },
            {
                'name': 11,
                'value': 661,
                'type': '省内',
                'time': '2019-03-06 22:00:26'
            },
            {
                'name': 12,
                'value': 1169,
                'type': '省内',
                'time': '2019-03-06 23:00:26'
            },
            {
                'name': 13,
                'value': 1189,
                'type': '省内',
                'time': '2019-03-07 00:00:26'
            },
            {
                'name': 14,
                'value': 1188,
                'type': '省内',
                'time': '2019-03-07 01:00:26'
            },
            {
                'name': 15,
                'value': 1123,
                'type': '省内',
                'time': '2019-03-07 02:00:26'
            },
            {
                'name': 16,
                'value': 1073,
                'type': '省内',
                'time': '2019-03-07 03:00:26'
            },
            {
                'name': 17,
                'value': 1056,
                'type': '省内',
                'time': '2019-03-07 04:00:26'
            },
            {
                'name': 18,
                'value': 1046,
                'type': '省内',
                'time': '2019-03-07 05:00:26'
            },
            {
                'name': 19,
                'value': 1103,
                'type': '省内',
                'time': '2019-03-07 06:00:26'
            },
            {
                'name': 20,
                'value': 1214,
                'type': '省内',
                'time': '2019-03-07 07:00:26'
            },
            {
                'name': 21,
                'value': 1367,
                'type': '省内',
                'time': '2019-03-07 08:00:26'
            },
            {
                'name': 22,
                'value': 1579,
                'type': '省内',
                'time': '2019-03-07 09:00:26'
            },
            {
                'name': 23,
                'value': 1758,
                'type': '省内',
                'time': '2019-03-07 10:00:26'
            },
            {
                'name': 24,
                'value': 1608,
                'type': '省内',
                'time': '2019-03-07 11:00:26'
            }
        ],
        'dataweek': [
            {
                'insertTime': '2019-04-01',
                'maxCount': 13741,
                'maxTime': '2018-04-01 23:30',
                'minCount': 100,
                'minTime': '2018-04-01 00:00',
                'avgCount': 5600,
                'type': 'max',
                'value': 13741,
                'time': '2019-04-01'
            },
            {
                'insertTime': '2019-04-01',
                'maxCount': 13741,
                'maxTime': '2018-04-01 23:30',
                'minCount': 100,
                'minTime': '2018-04-01 00:00',
                'avgCount': 5600,
                'type': 'min',
                'value': 100,
                'time': '2019-04-01'
            },
            {
                'insertTime': '2019-04-01',
                'maxCount': 13741,
                'maxTime': '2018-04-01 23:30',
                'minCount': 100,
                'minTime': '2018-04-01 00:00',
                'avgCount': 5600,
                'type': 'avg',
                'value': 5600,
                'time': '2019-04-01'
            },
            {
                'insertTime': '2019-04-02',
                'maxCount': 43741,
                'maxTime': '2018-04-02 23:30',
                'minCount': 1200,
                'minTime': '2018-04-02 00:00',
                'avgCount': 25600,
                'type': 'max',
                'value': 43741,
                'time': '2019-04-02'
            },
            {
                'insertTime': '2019-04-02',
                'maxCount': 43741,
                'maxTime': '2018-04-02 23:30',
                'minCount': 1200,
                'minTime': '2018-04-02 00:00',
                'avgCount': 25600,
                'type': 'min',
                'value': 1200,
                'time': '2019-04-02'
            },
            {
                'insertTime': '2019-04-02',
                'maxCount': 43741,
                'maxTime': '2018-04-02 23:30',
                'minCount': 1200,
                'minTime': '2018-04-02 00:00',
                'avgCount': 25600,
                'type': 'avg',
                'value': 25600,
                'time': '2019-04-02'
            },
            {
                'insertTime': '2019-04-03',
                'maxCount': 15741,
                'maxTime': '2018-04-03 23:30',
                'minCount': 0,
                'minTime': '2018-04-03 00:00',
                'avgCount': 9869,
                'type': 'max',
                'value': 15741,
                'time': '2019-04-03'
            },
            {
                'insertTime': '2019-04-03',
                'maxCount': 15741,
                'maxTime': '2018-04-03 23:30',
                'minCount': 1235,
                'minTime': '2018-04-03 00:00',
                'avgCount': 9869,
                'type': 'min',
                'value': 1235,
                'time': '2019-04-03'
            },
            {
                'insertTime': '2019-04-03',
                'maxCount': 15741,
                'maxTime': '2018-04-03 23:30',
                'minCount': 0,
                'minTime': '2018-04-03 00:00',
                'avgCount': 9869,
                'type': 'avg',
                'value': 9869,
                'time': '2019-04-03'
            }
        ]
    },
    'rows': null,
    'total': null,
    'api_name': null
})
let keyAreaRank = Mock.mock({
    'data': {
        'scenic': [
            { 'areaName': '万绿园', 'areaValue': 87324, areaId: 'a1', 'type': 1, 'taskId': 1 },
            { 'areaName': '世纪公园', 'areaValue': 86373, areaId: 'a2', 'type': 1, 'taskId': 1 },
            { 'areaName': '金牛岭', 'areaValue': 57732, areaId: 'a3', 'type': 1, 'taskId': 1 },
            { 'areaName': '白沙门', 'areaValue': 55290, areaId: 'a4', 'type': 1, 'taskId': 1 },
            { 'areaName': '假日海滩', 'areaValue': 37980, areaId: 'a5', 'type': 1, 'taskId': 1 }
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
let getLineChart = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        'dataHour': [
            {
                'value': 1778,
                'time': '2019-03-07 10:26:26'
            },
            {
                'value': 1774,
                'time': '2019-03-07 10:28:26'
            },
            {
                'value': 1748,
                'time': '2019-03-07 10:30:26'
            },
            {
                'value': 170082,
                'time': '2019-03-07 10:32:26'
            },
            {
                'value': 1758,
                'time': '2019-03-07 10:34:26'
            },
            {
                'value': 1742,
                'time': '2019-03-07 10:36:26'
            },
            {
                'value': 1757,
                'time': '2019-03-07 10:38:26'
            },
            {
                'value': 1764,
                'time': '2019-03-07 10:40:26'
            },
            {
                'value': 1759,
                'time': '2019-03-07 10:42:26'
            },
            {
                'value': 1773,
                'time': '2019-03-07 10:44:26'
            },
            {
                'value': 1755,
                'time': '2019-03-07 10:48:26'
            },
            {
                'value': 1763,
                'time': '2019-03-07 10:50:26'
            },
            {
                'value': 1743,
                'time': '2019-03-07 10:52:26'
            },
            {
                'value': 1738,
                'time': '2019-03-07 10:54:26'
            },
            {
                'value': 1731,
                'time': '2019-03-07 10:56:26'
            },
            {
                'value': 1723,
                'time': '2019-03-07 10:58:26'
            },
            {
                'value': 1747,
                'time': '2019-03-07 11:00:26'
            },
            {
                'value': 1759,
                'time': '2019-03-07 11:02:26'
            },
            {
                'value': 1750,
                'time': '2019-03-07 11:04:26'
            },
            {
                'value': 1755,
                'time': '2019-03-07 11:06:26'
            },
            {
                'value': 1752,
                'time': '2019-03-07 11:08:26'
            },
            {
                'value': 1727,
                'time': '2019-03-07 11:10:26'
            },
            {
                'value': 1771,
                'time': '2019-03-07 11:12:26'
            },
            {
                'value': 1749,
                'time': '2019-03-07 11:14:26'
            },
            {
                'value': 1730,
                'time': '2019-03-07 11:16:26'
            },
            {
                'value': 1712,
                'time': '2019-03-07 11:18:26'
            }
        ],
        'dataDay': [
            {
                'value': 1880,
                'time': '2019-03-06 12:00:07'
            },
            {
                'value': 1845,
                'time': '2019-03-06 13:00:07'
            },
            {
                'value': 1789,
                'time': '2019-03-06 14:00:07'
            },
            {
                'value': 1828,
                'time': '2019-03-06 15:00:07'
            },
            {
                'value': 1738,
                'time': '2019-03-06 16:00:07'
            },
            {
                'value': 1826,
                'time': '2019-03-06 17:00:07'
            },
            {
                'value': 1896,
                'time': '2019-03-06 18:00:07'
            },
            {
                'value': 1801,
                'time': '2019-03-06 19:00:07'
            },
            {
                'value': 1902,
                'time': '2019-03-06 20:00:07'
            },
            {
                'value': 1714,
                'time': '2019-03-06 21:00:07'
            },
            {
                'value': 723,
                'time': '2019-03-06 22:00:26'
            },
            {
                'value': 1270,
                'time': '2019-03-06 23:00:26'
            },
            {
                'value': 1293,
                'time': '2019-03-07 00:00:26'
            },
            {
                'value': 1283,
                'time': '2019-03-07 01:00:26'
            },
            {
                'value': 1217,
                'time': '2019-03-07 02:00:26'
            },
            {
                'value': 1172,
                'time': '2019-03-07 03:00:26'
            },
            {
                'value': 1150,
                'time': '2019-03-07 04:00:26'
            },
            {
                'value': 1141,
                'time': '2019-03-07 05:00:26'
            },
            {
                'value': 1197,
                'time': '2019-03-07 06:00:26'
            },
            {
                'value': 1311,
                'time': '2019-03-07 07:00:26'
            },
            {
                'value': 1479,
                'time': '2019-03-07 08:00:26'
            },
            {
                'value': 1706,
                'time': '2019-03-07 09:00:26'
            },
            {
                'value': 1891,
                'time': '2019-03-07 10:00:26'
            }
        ],
        'dataWeek': [
            {
                'value': 1046,
                'time': '2019-03-01 05:00:26'
            },
            {
                'value': 1103,
                'time': '2019-03-02 06:00:26'
            },
            {
                'value': 1214,
                'time': '2019-03-03 07:00:26'
            },
            {
                'value': 1367,
                'time': '2019-03-04 08:00:26'
            },
            {
                'value': 1579,
                'time': '2019-03-05 09:00:26'
            },
            {
                'value': 1758,
                'time': '2019-03-06 10:00:26'
            },
            {
                'value': 1608,
                'time': '2019-03-07 11:00:26'
            }
        ]
    },
    'rows': null,
    'total': null,
    'api_name': null
})
let getDataOneDay = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        'oneDay': [
            {
                'insertTime': '2019-04-03 03:25',
                'maxCount': 13741,
                'maxTime': '2019-04-03 03:25:16',
                'minCount': 100,
                'minTime': '2019-04-03 03:25:35',
                'avgCount': 5600,
                'type': 'max',
                'value': 13741,
                'time': '2019-04-03 03:25'
            },
            {
                'insertTime': '2019-04-03 03:25',
                'maxCount': 13741,
                'maxTime': '2019-04-03 03:25:16',
                'minCount': 100,
                'minTime': '2019-04-03 03:25:35',
                'avgCount': 5600,
                'type': 'min',
                'value': 100,
                'time': '2019-04-03 03:25'
            },
            {
                'insertTime': '2019-04-03 03:25',
                'maxCount': 13741,
                'maxTime': '2019-04-03 03:25:16',
                'minCount': 100,
                'minTime': '2019-04-03 03:25:35',
                'avgCount': 5600,
                'type': 'avg',
                'value': 5600,
                'time': '2019-04-03 03:25'
            },
            {
                'insertTime': '2019-04-03 12:12',
                'maxCount': 43741,
                'maxTime': '2019-04-03 12:12:56',
                'minCount': 1200,
                'minTime': '2019-04-03 12:12:32',
                'avgCount': 25600,
                'type': 'max',
                'value': 43741,
                'time': '2019-04-03'
            },
            {
                'insertTime': '2019-04-03 12:12',
                'maxCount': 43741,
                'maxTime': '2019-04-03 12:12:56',
                'minCount': 1200,
                'minTime': '2019-04-03 12:12:32',
                'avgCount': 25600,
                'type': 'min',
                'value': 1200,
                'time': '2019-04-03'
            },
            {
                'insertTime': '2019-04-03 12:12',
                'maxCount': 43741,
                'maxTime': '2019-04-03 12:12:56',
                'minCount': 1200,
                'minTime': '2019-04-03 12:12:32',
                'avgCount': 25600,
                'type': 'avg',
                'value': 25600,
                'time': '2019-04-03'
            },
            {
                'insertTime': '2019-04-03 23:30',
                'maxCount': 15741,
                'maxTime': '2019-04-01 23:30:30',
                'minCount': 0,
                'minTime': '2019-04-01 23:30:56',
                'avgCount': 9869,
                'type': 'max',
                'value': 15741,
                'time': '2019-04-03'
            },
            {
                'insertTime': '2019-04-03 23:30',
                'maxCount': 15741,
                'maxTime': '2019-04-01 23:30:30',
                'minCount': 1235,
                'minTime': '2019-04-001 23:30:56',
                'avgCount': 9869,
                'type': 'min',
                'value': 1235,
                'time': '2019-04-03'
            },
            {
                'insertTime': '2019-04-03 23:30',
                'maxCount': 15741,
                'maxTime': '2019-04-03 23:30:30',
                'minCount': 0,
                'minTime': '2019-04-03 23:30:56',
                'avgCount': 9869,
                'type': 'avg',
                'value': 9869,
                'time': '2019-04-03'
            }
        ]
    }
})
let getTimeInterval = Mock.mock({
    'data': {
        'beginTime': '2019-05-01',
        'endTime': '2019-08-08'
    }
})
export default {
    overall: () => overall,
    cylinderInner: () => cylinderInner,
    cylinderOuter: () => cylinderOuter,
    cylinderOverseas: () => cylinderOverseas,
    cellCoordinatesQuery: () => cellCoordinatesQuery,
    gpshot: () => gpshot,
    listcumulation: () => listcumulation,
    persons: () => persons,
    snap: () => snap,
    keyAreaRank: () => keyAreaRank,
    getLineChart: () => getLineChart,
    getDataOneDay: () => getDataOneDay,
    getTimeInterval: () => getTimeInterval
}
