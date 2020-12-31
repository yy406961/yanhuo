import Mock from 'mockjs'
let getBaseInfo = Mock.mock({
    'status': 200,
    'message': '基本信息查询成功',
    'data': {
        'hisimei': 'null',
        'homeCode': '陕西西安',
        'os': 'null',
        'pModel': 'null',
        'name': '',
        'imei': '8624680350195078',
        'imsi': '460011179110314',
        'spcode': '中国联通',
        'msisdn': '8617691170548',
        'mark': 'null'
    },
    'rows': null,
    'total': null,
    'api_name': null
})
let getInfos = Mock.mock({
    'status': 200,
    'message': '虚拟身份码查询成功',
    'data': {
        'bankCard': [],
        'work': '海西德令哈新秀乡',
        'home': '海西德令哈新秀乡'
    },
    'rows': null,
    'total': null,
    'api_name': null
})
let getCommunicationsCount = Mock.mock({
    'status': 200,
    'message': '通联查询成功',
    'data': [{
        'name': '主叫次数',
        'countArray': [0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 10, 2, 7, 5, 2, 1, 10, 2, 0, 0, 2, 0, 2, 0]
    },
    {
        'name': '被叫次数',
        'countArray': [0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 4, 2, 16, 5, 1, 2, 4, 0, 6, 0, 2, 4, 0]
    },
    {
        'name': '主短次数',
        'countArray': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        'name': '被短次数',
        'countArray': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }],
    'rows': null,
    'total': null,
    'api_name': null
})
let getNetPlayCount = Mock.mock({
    'status': 200,
    'message': '上网时段查询成功',
    'data': [11766, 1092, 605, 2849, 3329, 659, 3860, 4460, 13908, 16376, 14010,
        35665, 25463, 32995, 21025, 17233, 10855, 6938, 14764, 20345, 17054, 10404, 7956, 5904],
    'rows': null,
    'total': null,
    'api_name': null
})
let getUseApp = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        'other': [{
            'name': 'QQ',
            'code': '002001',
            'count': 18772,
            'firstTimeLong': 1549324815,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 08:00:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '--',
            'code': '999999',
            'count': 8624,
            'firstTimeLong': 1549324815,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 08:00:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '旺信',
            'code': '002023',
            'count': 7473,
            'firstTimeLong': 1549324815,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 08:00:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '微信',
            'code': '002002',
            'count': 4514,
            'firstTimeLong': 1549324815,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 08:00:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '百度地图',
            'code': '014004',
            'count': 2159,
            'firstTimeLong': 1549324815,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 08:00:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '搜狗搜索',
            'code': '020002',
            'count': 1643,
            'firstTimeLong': 1549343411,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 13:10:11',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '手机淘宝',
            'code': '013001',
            'count': 233,
            'firstTimeLong': 1549430940,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-06 13:29:00',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '联合早报',
            'code': '006011',
            'count': 153,
            'firstTimeLong': 1549324815,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 08:00:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '高德地图',
            'code': '014003',
            'count': 141,
            'firstTimeLong': 1549343411,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 13:10:11',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '今日头条',
            'code': '006006',
            'count': 69,
            'firstTimeLong': 1549324815,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 08:00:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '百度搜索',
            'code': '020001',
            'count': 60,
            'firstTimeLong': 1549324815,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 08:00:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '搜狗输入法',
            'code': '012001',
            'count': 31,
            'firstTimeLong': 1549428495,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-06 12:48:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '酷狗音乐',
            'code': '008001',
            'count': 30,
            'firstTimeLong': 1549343411,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 13:10:11',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '来往',
            'code': '002017',
            'count': 24,
            'firstTimeLong': 1549594394,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-08 10:53:14',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '米聊',
            'code': '002005',
            'count': 21,
            'firstTimeLong': 1549324815,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 08:00:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '腾讯地图',
            'code': '014005',
            'count': 20,
            'firstTimeLong': 1549428495,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-06 12:48:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '百度贴吧',
            'code': '005001',
            'count': 20,
            'firstTimeLong': 1549641707,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-09 00:01:47',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '优酷视频',
            'code': '009003',
            'count': 17,
            'firstTimeLong': 1549343411,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 13:10:11',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': 'DiDi',
            'code': '002014',
            'count': 16,
            'firstTimeLong': 1549599618,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-08 12:20:18',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '91助手',
            'code': '007009',
            'count': 14,
            'firstTimeLong': 1549343411,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 13:10:11',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '一点资讯',
            'code': '006015',
            'count': 14,
            'firstTimeLong': 1549430940,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-06 13:29:00',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': 'QQ空间',
            'code': '003002',
            'count': 12,
            'firstTimeLong': 1549324815,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 08:00:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '美团',
            'code': '013006',
            'count': 11,
            'firstTimeLong': 1549343411,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 13:10:11',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '新浪微博',
            'code': '004001',
            'count': 9,
            'firstTimeLong': 1549904991,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-12 01:09:51',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '支付宝',
            'code': '013003',
            'count': 5,
            'firstTimeLong': 1549678749,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-09 10:19:09',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '腾讯新闻',
            'code': '006001',
            'count': 5,
            'firstTimeLong': 1549428495,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-06 12:48:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '手机京东',
            'code': '013002',
            'count': 3,
            'firstTimeLong': 1549428495,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-06 12:48:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': 'YY',
            'code': '002007',
            'count': 3,
            'firstTimeLong': 1549428495,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-06 12:48:15',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '财富派',
            'code': '017005',
            'count': 3,
            'firstTimeLong': 1549904991,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-12 01:09:51',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '陌陌',
            'code': '003001',
            'count': 3,
            'firstTimeLong': 1549430386,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-06 13:19:46',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': 'Appstore',
            'code': '007002',
            'count': 3,
            'firstTimeLong': 1549641666,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-09 00:01:06',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': 'Android定位服务',
            'code': '014001',
            'count': 2,
            'firstTimeLong': 1550275928,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-16 08:12:08',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '应用宝',
            'code': '007007',
            'count': 1,
            'firstTimeLong': 1549904991,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-12 01:09:51',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': 'KC网络电话',
            'code': '002020',
            'count': 1,
            'firstTimeLong': 1549751151,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-10 06:25:51',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '蜻蜓FM收音机',
            'code': '008007',
            'count': 1,
            'firstTimeLong': 1549343411,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-05 13:10:11',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '百度新闻',
            'code': '006005',
            'count': 1,
            'firstTimeLong': 1551111037,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-26 00:10:37',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '安智市场',
            'code': '007010',
            'count': 1,
            'firstTimeLong': 1551062406,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-25 10:40:06',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '知乎日报',
            'code': '006020',
            'count': 1,
            'firstTimeLong': 1549848079,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-11 09:21:19',
            'lastTime': '2019-02-28 22:30:50'
        },
        {
            'name': '搜狗地图',
            'code': '014007',
            'count': 1,
            'firstTimeLong': 1549751152,
            'lastTimeLong': 1551364250,
            'firstTime': '2019-02-10 06:25:52',
            'lastTime': '2019-02-28 22:30:50'
        }],
        'sensitive': [],
        'percent': [{
            'name': 'QQ',
            'value': 42.55,
            'sub': [101.0, 57.0, 58.0, 31.0, 12.0, 319.0, 441.0, 477.0, 905.0, 1406.0, 851.0, 2150.0, 1639.0, 1673.0, 1008.0,
                1003.0, 594.0, 343.0, 609.0, 1165.0, 1902.0, 1152.0, 614.0, 262.0]
        },
        {
            'name': '',
            'value': 19.55,
            'sub': [61.0, 17.0, 17.0, 32.0, 41.0, 20.0, 79.0, 149.0, 510.0, 258.0, 269.0, 1379.0, 895.0, 897.0, 783.0, 426.0,
                477.0, 103.0, 331.0, 523.0, 412.0, 348.0, 441.0, 156.0]
        },
        {
            'name': '旺信',
            'value': 16.94,
            'sub': [157.0, 13.0, 5.0, 134.0, 107.0, 38.0, 39.0, 88.0, 295.0, 630.0, 340.0, 1004.0, 719.0, 803.0,
                417.0, 407.0, 361.0, 185.0, 302.0, 329.0, 407.0, 167.0, 278.0, 248.0]
        },
        {
            'name': '微信',
            'value': 10.23,
            'sub': [27.0, 3.0, 0.0, 16.0, 36.0, 23.0, 63.0, 108.0, 182.0, 185.0, 241.0, 442.0,
                321.0, 542.0, 287.0, 296.0, 222.0, 100.0, 301.0, 413.0, 235.0, 207.0, 180.0, 84.0]
        },
        {
            'name': '百度地图',
            'value': 4.89,
            'sub': [104.0, 2.0, 3.0, 7.0, 25.0, 0.0, 4.0, 74.0, 119.0, 253.0, 76.0, 169.0,
                87.0, 165.0, 252.0, 153.0, 159.0, 13.0, 41.0, 247.0, 111.0, 28.0, 43.0, 24.0]
        },
        {
            'name': '搜狗搜索',
            'value': 3.72,
            'sub': [125.0, 0.0, 0.0, 0.0, 0.0, 5.0, 0.0, 5.0, 30.0, 17.0, 69.0, 80.0, 23.0,
                139.0, 38.0, 224.0, 9.0, 101.0, 155.0, 361.0, 145.0, 69.0, 7.0, 41.0]
        },
        {
            'name': '手机淘宝',
            'value': 0.53,
            'sub': [2.0, 0.0, 0.0, 3.0, 11.0, 0.0, 0.0, 8.0, 28.0, 14.0, 10.0, 9.0, 4.0, 19.0,
                13.0, 0.0, 0.0, 0.0, 27.0, 13.0, 34.0, 16.0, 19.0, 3.0]
        },
        {
            'name': '联合早报',
            'value': 0.35,
            'sub': [1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 2.0, 1.0, 2.0, 2.0, 1.0, 0.0, 0.0, 40.0, 80.0, 17.0, 2.0, 1.0, 0.0]
        },
        {
            'name': '高德地图',
            'value': 0.32,
            'sub': [1.0, 1.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 37.0, 10.0, 5.0, 10.0, 6.0, 6.0, 20.0, 5.0, 4.0, 1.0, 7.0, 3.0, 4.0, 6.0, 11.0, 2.0]
        },
        {
            'name': '今日头条',
            'value': 0.16,
            'sub': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 1.0, 2.0, 6.0, 2.0, 5.0, 14.0, 5.0, 0.0, 0.0, 18.0, 4.0, 7.0, 0.0, 0.0, 1.0]
        }]
    },
    'rows': null,
    'total': null,
    'api_name': null
})
let getActiveCountyTop5 = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': null,
    'rows': [{
        'loc': '青海省,海西蒙古族藏族自治州,德令哈市',
        'areaCode': '632802',
        'level': '4'
    },
    {
        'loc': '青海省,海东地区,平安县',
        'areaCode': '632121',
        'level': '4'
    },
    {
        'loc': '青海省,海西蒙古族藏族自治州,乌兰县',
        'areaCode': '632821',
        'level': '1'
    },
    {
        'loc': '青海省,海南藏族自治州,共和县',
        'areaCode': '632521',
        'level': '0'
    },
    {
        'loc': '青海省,西宁市,城东区',
        'areaCode': '630102',
        'level': '0'
    }],
    'total': null,
    'api_name': null
})
let getWorkHomeArea = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': null,
    'rows': [{
        'activity': [{
            'localDescripe': '西宁城中群星宾馆',
            'level': '4',
            'ci': '12',
            'latitude': '36.611669',
            'count': '43',
            'longtitude': '101.772779',
            'ids': '460-00-631305-12',
            'uliName': '西宁城中群星宾馆HLF1HZ-12',
            'type': 1,
            'lac': '631305',
            'allTime': '13时25分9秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '4',
            'ci': '3',
            'latitude': '36.60972',
            'count': '5',
            'longtitude': '101.778059',
            'ids': '460-00-631242-3',
            'uliName': '西宁城东通管局HLF1HZ-3',
            'type': 1,
            'lac': '631242',
            'allTime': '4时10分43秒'
        }],
        'pointArr': [{
            'localDescripe': '西宁城中群星宾馆',
            'level': '4',
            'ci': '12',
            'latitude': '36.611669',
            'count': '43',
            'longtitude': '101.772779',
            'ids': '460-00-631305-12',
            'uliName': '西宁城中群星宾馆HLF1HZ-12',
            'type': 1,
            'lac': '631305',
            'allTime': '13时25分9秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '4',
            'ci': '3',
            'latitude': '36.60972',
            'count': '5',
            'longtitude': '101.778059',
            'ids': '460-00-631242-3',
            'uliName': '西宁城东通管局HLF1HZ-3',
            'type': 1,
            'lac': '631242',
            'allTime': '4时10分43秒'
        },
        {
            'localDescripe': '西宁城中群星宾馆',
            'level': '4',
            'ci': '2',
            'latitude': '36.611669',
            'count': '26',
            'longtitude': '101.772779',
            'ids': '460-00-631305-2',
            'uliName': '西宁城中群星宾馆HLF1HZ-2',
            'type': 1,
            'lac': '631305',
            'allTime': '3时3分42秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '4',
            'ci': '23',
            'latitude': '36.60972',
            'count': '33',
            'longtitude': '101.778059',
            'ids': '460-00-631242-23',
            'uliName': '西宁城东通管局HLF1HZ-23',
            'type': 1,
            'lac': '631242',
            'allTime': '2时28分25秒'
        },
        {
            'localDescripe': '西宁城南沈家寨驾校绕城公路',
            'level': '4',
            'ci': '2',
            'latitude': '36.59722',
            'count': '3',
            'longtitude': '101.73833',
            'ids': '460-00-631616-2',
            'uliName': '西宁城南沈家寨驾校绕城公路HLF1HZ-2',
            'type': 1,
            'lac': '631616',
            'allTime': '1时29分59秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '4',
            'ci': '13',
            'latitude': '36.60972',
            'count': '23',
            'longtitude': '101.778059',
            'ids': '460-00-631242-13',
            'uliName': '西宁城东通管局HLF1HZ-13',
            'type': 1,
            'lac': '631242',
            'allTime': '1时17分42秒'
        },
        {
            'localDescripe': '黄南同仁农牧局高层',
            'level': '4',
            'ci': '2',
            'latitude': '35.527589',
            'count': '2',
            'longtitude': '102.024889',
            'ids': '460-00-638052-2',
            'uliName': '黄南同仁农牧局高层1HLD1WF-2',
            'type': 1,
            'lac': '638052',
            'allTime': '1时12分46秒'
        },
        {
            'localDescripe': '海东乐都高店镇小河滩村',
            'level': '3',
            'ci': '130',
            'latitude': '36.49119',
            'count': '1',
            'longtitude': '102.20134',
            'ids': '460-00-333633-130',
            'uliName': '海东乐都高店镇小河滩村ZLF1HZ-2',
            'type': 1,
            'lac': '333633',
            'allTime': '0时27分56秒'
        },
        {
            'localDescripe': '西宁城中小天鹅宾馆',
            'level': '3',
            'ci': '23',
            'latitude': '36.624439',
            'count': '1',
            'longtitude': '101.775279',
            'ids': '460-00-631398-23',
            'uliName': '西宁城中小天鹅宾馆HLF1HZ-23',
            'type': 1,
            'lac': '631398',
            'allTime': '0时15分41秒'
        },
        {
            'localDescripe': '海东平安联通马营砖厂',
            'level': '3',
            'ci': '130',
            'latitude': '35.8928',
            'count': '2',
            'longtitude': '102.84381',
            'ids': '460-00-333414-130',
            'uliName': '海东平安联通马营砖厂ZLF1HZ-2',
            'type': 1,
            'lac': '333414',
            'allTime': '0时14分55秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '2',
            'ci': '1',
            'latitude': '36.60972',
            'count': '9',
            'longtitude': '101.778059',
            'ids': '460-00-631242-1',
            'uliName': '西宁城东通管局HLF1HZ-1',
            'type': 1,
            'lac': '631242',
            'allTime': '0时14分47秒'
        },
        {
            'localDescripe': '海东平安东村高铁基站',
            'level': '2',
            'ci': '1',
            'latitude': '36.50357',
            'count': '2',
            'longtitude': '102.127269',
            'ids': '460-00-637398-1',
            'uliName': '海东平安东村高铁基站ZLF1HZ-11',
            'type': 1,
            'lac': '637398',
            'allTime': '0时14分1秒'
        },
        {
            'localDescripe': '海东平安小峡口',
            'level': '2',
            'ci': '3',
            'latitude': '36.55794',
            'count': '3',
            'longtitude': '101.93061',
            'ids': '460-00-633864-3',
            'uliName': '海东平安小峡口ZLF1HZ-3',
            'type': 1,
            'lac': '633864',
            'allTime': '0时8分30秒'
        },
        {
            'localDescripe': '黄南同仁民师',
            'level': '2',
            'ci': '2',
            'latitude': '35.50547',
            'count': '1',
            'longtitude': '102.006749',
            'ids': '460-00-638386-2',
            'uliName': '黄南同仁民师HLF1HZ-2',
            'type': 1,
            'lac': '638386',
            'allTime': '0时8分10秒'
        },
        {
            'localDescripe': '海东平安圣元山庄',
            'level': '2',
            'ci': '3',
            'latitude': '36.543909',
            'count': '1',
            'longtitude': '101.97356',
            'ids': '460-00-633870-3',
            'uliName': '海东平安圣元山庄ZLF1HZ-3',
            'type': 1,
            'lac': '633870',
            'allTime': '0时7分52秒'
        },
        {
            'localDescripe': '西宁城中瑞源路同安路交汇处',
            'level': '2',
            'ci': '1',
            'latitude': '36.55001',
            'count': '2',
            'longtitude': '101.70417',
            'ids': '460-00-633153-1',
            'uliName': '西宁城中瑞源路同安路交汇处HLF1HZ-1',
            'type': 1,
            'lac': '633153',
            'allTime': '0时7分26秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '1',
            'ci': '11',
            'latitude': '36.60972',
            'count': '1',
            'longtitude': '101.778059',
            'ids': '460-00-631242-11',
            'uliName': '西宁城东通管局HLF1HZ-11',
            'type': 1,
            'lac': '631242',
            'allTime': '0时7分14秒'
        },
        {
            'localDescripe': '海东化隆日兰',
            'level': '1',
            'ci': '1',
            'latitude': '35.98111',
            'count': '1',
            'longtitude': '102.040859',
            'ids': '460-00-634477-1',
            'uliName': '海东化隆日兰ZLF1HZ-1',
            'type': 1,
            'lac': '634477',
            'allTime': '0时7分0秒'
        },
        {
            'localDescripe': '海东平安东村高铁基站',
            'level': '1',
            'ci': '3',
            'latitude': '36.50357',
            'count': '3',
            'longtitude': '102.127269',
            'ids': '460-00-637398-3',
            'uliName': '海东平安东村高铁基站ZLF1HZ-12',
            'type': 1,
            'lac': '637398',
            'allTime': '0时6分45秒'
        },
        {
            'localDescripe': '海东平安经四路',
            'level': '1',
            'ci': '1',
            'latitude': '36.533729',
            'count': '1',
            'longtitude': '101.982169',
            'ids': '460-00-634774-1',
            'uliName': '海东平安经四路ZLF1HZ-1',
            'type': 1,
            'lac': '634774',
            'allTime': '0时6分34秒'
        },
        {
            'localDescripe': '海东化隆阿岱收费站',
            'level': '1',
            'ci': '129',
            'latitude': '36.19686',
            'count': '1',
            'longtitude': '101.998429',
            'ids': '460-00-333618-129',
            'uliName': '海东化隆阿岱收费站ZLF1HZ-1',
            'type': 1,
            'lac': '333618',
            'allTime': '0时6分33秒'
        },
        {
            'localDescripe': '海东平安工行',
            'level': '1',
            'ci': '7',
            'latitude': '36.504179',
            'count': '1',
            'longtitude': '102.10353',
            'ids': '460-00-634407-7',
            'uliName': '海东平安工行ZLF1HZ-21',
            'type': 1,
            'lac': '634407',
            'allTime': '0时6分26秒'
        },
        {
            'localDescripe': '西宁城东东府佳苑38号楼顶',
            'level': '1',
            'ci': '11',
            'latitude': '36.588059',
            'count': '1',
            'longtitude': '101.83861',
            'ids': '460-00-630900-11',
            'uliName': '西宁城东东府佳苑38号楼顶HLF1HZ-11',
            'type': 1,
            'lac': '630900',
            'allTime': '0时6分13秒'
        },
        {
            'localDescripe': '海东平安东村高铁基站',
            'level': '1',
            'ci': '4',
            'latitude': '36.50357',
            'count': '8',
            'longtitude': '102.127269',
            'ids': '460-00-637398-4',
            'uliName': '海东平安东村高铁基站ZLF1HZ-2',
            'type': 1,
            'lac': '637398',
            'allTime': '0时6分3秒'
        },
        {
            'localDescripe': '西宁城东国土花苑3号楼',
            'level': '0',
            'ci': '1',
            'latitude': '36.6075',
            'count': '1',
            'longtitude': '101.805',
            'ids': '460-00-631758-1',
            'uliName': '西宁城东国土花苑3号楼HLF1HZ-1',
            'type': 1,
            'lac': '631758',
            'allTime': '0时5分36秒'
        },
        {
            'localDescripe': '黄南同仁尕沙日',
            'level': '0',
            'ci': '2',
            'latitude': '35.60889',
            'count': '2',
            'longtitude': '102.043059',
            'ids': '460-00-637994-2',
            'uliName': '黄南同仁尕沙日HLF1HZ-2',
            'type': 1,
            'lac': '637994',
            'allTime': '0时5分31秒'
        },
        {
            'localDescripe': '海东乐都高速服务区',
            'level': '0',
            'ci': '2',
            'latitude': '36.47153',
            'count': '1',
            'longtitude': '102.36248',
            'ids': '460-00-634089-2',
            'uliName': '海东乐都高速服务区ZLF1HZ-2',
            'type': 1,
            'lac': '634089',
            'allTime': '0时5分25秒'
        },
        {
            'localDescripe': '黄南同仁州交警队办公楼',
            'level': '0',
            'ci': '2',
            'latitude': '35.529539',
            'count': '1',
            'longtitude': '102.03686',
            'ids': '460-00-638000-2',
            'uliName': '黄南同仁州交警队办公楼HLF1HZ-2',
            'type': 1,
            'lac': '638000',
            'allTime': '0时4分34秒'
        },
        {
            'localDescripe': '西宁城东青藏铁路改造项目部',
            'level': '0',
            'ci': '11',
            'latitude': '36.59056',
            'count': '2',
            'longtitude': '101.84528',
            'ids': '460-00-632805-11',
            'uliName': '西宁城东青藏铁路改造项目部HLF1HZ-11',
            'type': 1,
            'lac': '632805',
            'allTime': '0时4分16秒'
        },
        {
            'localDescripe': '海东平安东头村',
            'level': '0',
            'ci': '130',
            'latitude': '36.49736',
            'count': '1',
            'longtitude': '102.17748',
            'ids': '460-00-333415-130',
            'uliName': '海东平安东头村ZLF1HZ-2',
            'type': 1,
            'lac': '333415',
            'allTime': '0时4分9秒'
        },
        {
            'localDescripe': '黄南同仁吾屯',
            'level': '0',
            'ci': '1',
            'latitude': '35.561109',
            'count': '1',
            'longtitude': '102.048609',
            'ids': '460-00-638164-1',
            'uliName': '黄南同仁吾屯HLF1HZ-1',
            'type': 1,
            'lac': '638164',
            'allTime': '0时4分0秒'
        },
        {
            'localDescripe': '黄南同仁隆务庄',
            'level': '0',
            'ci': '1',
            'latitude': '35.505279',
            'count': '2',
            'longtitude': '102.006669',
            'ids': '460-00-638385-1',
            'uliName': '黄南同仁隆务庄HLF1HZ-1',
            'type': 1,
            'lac': '638385',
            'allTime': '0时3分42秒'
        },
        {
            'localDescripe': '西宁城中群星宾馆',
            'level': '4',
            'ci': '12',
            'latitude': '36.611669',
            'count': '88',
            'longtitude': '101.772779',
            'ids': '460-00-631305-12',
            'uliName': '西宁城中群星宾馆HLF1HZ-12',
            'type': 2,
            'lac': '631305',
            'allTime': '19时15分39秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '3',
            'ci': '1',
            'latitude': '36.60972',
            'count': '2',
            'longtitude': '101.778059',
            'ids': '460-00-632371-1',
            'uliName': '西宁城东通管局HLE1WF-1',
            'type': 2,
            'lac': '632371',
            'allTime': '14时52分37秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '3',
            'ci': '23',
            'latitude': '36.60972',
            'count': '3',
            'longtitude': '101.778059',
            'ids': '460-00-631242-23',
            'uliName': '西宁城东通管局HLF1HZ-23',
            'type': 2,
            'lac': '631242',
            'allTime': '10时9分5秒'
        },
        {
            'localDescripe': '西宁城西海湖1号公寓A区',
            'level': '2',
            'ci': '1',
            'latitude': '36.64833',
            'count': '1',
            'longtitude': '101.728059',
            'ids': '460-00-633182-1',
            'uliName': '西宁城西海湖1号公寓A区HLE7WF-1',
            'type': 2,
            'lac': '633182',
            'allTime': '9时16分30秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '2',
            'ci': '13',
            'latitude': '36.60972',
            'count': '88',
            'longtitude': '101.778059',
            'ids': '460-00-631242-13',
            'uliName': '西宁城东通管局HLF1HZ-13',
            'type': 2,
            'lac': '631242',
            'allTime': '5时14分30秒'
        },
        {
            'localDescripe': '西宁城东二枢纽',
            'level': '1',
            'ci': '3',
            'latitude': '36.571669',
            'count': '2',
            'longtitude': '101.84833',
            'ids': '460-00-630865-3',
            'uliName': '西宁城东二枢纽HLF1HZ-3',
            'type': 2,
            'lac': '630865',
            'allTime': '1时48分20秒'
        },
        {
            'localDescripe': '西宁城中群星宾馆',
            'level': '1',
            'ci': '2',
            'latitude': '36.611669',
            'count': '7',
            'longtitude': '101.772779',
            'ids': '460-00-631305-2',
            'uliName': '西宁城中群星宾馆HLF1HZ-2',
            'type': 2,
            'lac': '631305',
            'allTime': '1时22分41秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '0',
            'ci': '3',
            'latitude': '36.60972',
            'count': '3',
            'longtitude': '101.778059',
            'ids': '460-00-631242-3',
            'uliName': '西宁城东通管局HLF1HZ-3',
            'type': 2,
            'lac': '631242',
            'allTime': '0时47分3秒'
        }],
        'place': [{
            'localDescripe': '西宁城中群星宾馆',
            'level': '4',
            'ci': '12',
            'latitude': '36.611669',
            'count': '88',
            'longtitude': '101.772779',
            'ids': '460-00-631305-12',
            'uliName': '西宁城中群星宾馆HLF1HZ-12',
            'type': 2,
            'lac': '631305',
            'allTime': '19时15分39秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '3',
            'ci': '1',
            'latitude': '36.60972',
            'count': '2',
            'longtitude': '101.778059',
            'ids': '460-00-632371-1',
            'uliName': '西宁城东通管局HLE1WF-1',
            'type': 2,
            'lac': '632371',
            'allTime': '14时52分37秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '3',
            'ci': '23',
            'latitude': '36.60972',
            'count': '3',
            'longtitude': '101.778059',
            'ids': '460-00-631242-23',
            'uliName': '西宁城东通管局HLF1HZ-23',
            'type': 2,
            'lac': '631242',
            'allTime': '10时9分5秒'
        },
        {
            'localDescripe': '西宁城西海湖1号公寓A区',
            'level': '2',
            'ci': '1',
            'latitude': '36.64833',
            'count': '1',
            'longtitude': '101.728059',
            'ids': '460-00-633182-1',
            'uliName': '西宁城西海湖1号公寓A区HLE7WF-1',
            'type': 2,
            'lac': '633182',
            'allTime': '9时16分30秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '2',
            'ci': '13',
            'latitude': '36.60972',
            'count': '88',
            'longtitude': '101.778059',
            'ids': '460-00-631242-13',
            'uliName': '西宁城东通管局HLF1HZ-13',
            'type': 2,
            'lac': '631242',
            'allTime': '5时14分30秒'
        },
        {
            'localDescripe': '西宁城东二枢纽',
            'level': '1',
            'ci': '3',
            'latitude': '36.571669',
            'count': '2',
            'longtitude': '101.84833',
            'ids': '460-00-630865-3',
            'uliName': '西宁城东二枢纽HLF1HZ-3',
            'type': 2,
            'lac': '630865',
            'allTime': '1时48分20秒'
        },
        {
            'localDescripe': '西宁城中群星宾馆',
            'level': '1',
            'ci': '2',
            'latitude': '36.611669',
            'count': '7',
            'longtitude': '101.772779',
            'ids': '460-00-631305-2',
            'uliName': '西宁城中群星宾馆HLF1HZ-2',
            'type': 2,
            'lac': '631305',
            'allTime': '1时22分41秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '0',
            'ci': '3',
            'latitude': '36.60972',
            'count': '3',
            'longtitude': '101.778059',
            'ids': '460-00-631242-3',
            'uliName': '西宁城东通管局HLF1HZ-3',
            'type': 2,
            'lac': '631242',
            'allTime': '0时47分3秒'
        }],
        'residence': [{
            'localDescripe': '西宁城中群星宾馆',
            'level': '4',
            'ci': '12',
            'latitude': '36.611669',
            'count': '43',
            'longtitude': '101.772779',
            'ids': '460-00-631305-12',
            'uliName': '西宁城中群星宾馆HLF1HZ-12',
            'type': 1,
            'lac': '631305',
            'allTime': '13时25分9秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '4',
            'ci': '3',
            'latitude': '36.60972',
            'count': '5',
            'longtitude': '101.778059',
            'ids': '460-00-631242-3',
            'uliName': '西宁城东通管局HLF1HZ-3',
            'type': 1,
            'lac': '631242',
            'allTime': '4时10分43秒'
        },
        {
            'localDescripe': '西宁城中群星宾馆',
            'level': '4',
            'ci': '2',
            'latitude': '36.611669',
            'count': '26',
            'longtitude': '101.772779',
            'ids': '460-00-631305-2',
            'uliName': '西宁城中群星宾馆HLF1HZ-2',
            'type': 1,
            'lac': '631305',
            'allTime': '3时3分42秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '4',
            'ci': '23',
            'latitude': '36.60972',
            'count': '33',
            'longtitude': '101.778059',
            'ids': '460-00-631242-23',
            'uliName': '西宁城东通管局HLF1HZ-23',
            'type': 1,
            'lac': '631242',
            'allTime': '2时28分25秒'
        },
        {
            'localDescripe': '西宁城南沈家寨驾校绕城公路',
            'level': '4',
            'ci': '2',
            'latitude': '36.59722',
            'count': '3',
            'longtitude': '101.73833',
            'ids': '460-00-631616-2',
            'uliName': '西宁城南沈家寨驾校绕城公路HLF1HZ-2',
            'type': 1,
            'lac': '631616',
            'allTime': '1时29分59秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '4',
            'ci': '13',
            'latitude': '36.60972',
            'count': '23',
            'longtitude': '101.778059',
            'ids': '460-00-631242-13',
            'uliName': '西宁城东通管局HLF1HZ-13',
            'type': 1,
            'lac': '631242',
            'allTime': '1时17分42秒'
        },
        {
            'localDescripe': '黄南同仁农牧局高层',
            'level': '4',
            'ci': '2',
            'latitude': '35.527589',
            'count': '2',
            'longtitude': '102.024889',
            'ids': '460-00-638052-2',
            'uliName': '黄南同仁农牧局高层1HLD1WF-2',
            'type': 1,
            'lac': '638052',
            'allTime': '1时12分46秒'
        },
        {
            'localDescripe': '海东乐都高店镇小河滩村',
            'level': '3',
            'ci': '130',
            'latitude': '36.49119',
            'count': '1',
            'longtitude': '102.20134',
            'ids': '460-00-333633-130',
            'uliName': '海东乐都高店镇小河滩村ZLF1HZ-2',
            'type': 1,
            'lac': '333633',
            'allTime': '0时27分56秒'
        },
        {
            'localDescripe': '西宁城中小天鹅宾馆',
            'level': '3',
            'ci': '23',
            'latitude': '36.624439',
            'count': '1',
            'longtitude': '101.775279',
            'ids': '460-00-631398-23',
            'uliName': '西宁城中小天鹅宾馆HLF1HZ-23',
            'type': 1,
            'lac': '631398',
            'allTime': '0时15分41秒'
        },
        {
            'localDescripe': '海东平安联通马营砖厂',
            'level': '3',
            'ci': '130',
            'latitude': '35.8928',
            'count': '2',
            'longtitude': '102.84381',
            'ids': '460-00-333414-130',
            'uliName': '海东平安联通马营砖厂ZLF1HZ-2',
            'type': 1,
            'lac': '333414',
            'allTime': '0时14分55秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '2',
            'ci': '1',
            'latitude': '36.60972',
            'count': '9',
            'longtitude': '101.778059',
            'ids': '460-00-631242-1',
            'uliName': '西宁城东通管局HLF1HZ-1',
            'type': 1,
            'lac': '631242',
            'allTime': '0时14分47秒'
        },
        {
            'localDescripe': '海东平安东村高铁基站',
            'level': '2',
            'ci': '1',
            'latitude': '36.50357',
            'count': '2',
            'longtitude': '102.127269',
            'ids': '460-00-637398-1',
            'uliName': '海东平安东村高铁基站ZLF1HZ-11',
            'type': 1,
            'lac': '637398',
            'allTime': '0时14分1秒'
        },
        {
            'localDescripe': '海东平安小峡口',
            'level': '2',
            'ci': '3',
            'latitude': '36.55794',
            'count': '3',
            'longtitude': '101.93061',
            'ids': '460-00-633864-3',
            'uliName': '海东平安小峡口ZLF1HZ-3',
            'type': 1,
            'lac': '633864',
            'allTime': '0时8分30秒'
        },
        {
            'localDescripe': '黄南同仁民师',
            'level': '2',
            'ci': '2',
            'latitude': '35.50547',
            'count': '1',
            'longtitude': '102.006749',
            'ids': '460-00-638386-2',
            'uliName': '黄南同仁民师HLF1HZ-2',
            'type': 1,
            'lac': '638386',
            'allTime': '0时8分10秒'
        },
        {
            'localDescripe': '海东平安圣元山庄',
            'level': '2',
            'ci': '3',
            'latitude': '36.543909',
            'count': '1',
            'longtitude': '101.97356',
            'ids': '460-00-633870-3',
            'uliName': '海东平安圣元山庄ZLF1HZ-3',
            'type': 1,
            'lac': '633870',
            'allTime': '0时7分52秒'
        },
        {
            'localDescripe': '西宁城中瑞源路同安路交汇处',
            'level': '2',
            'ci': '1',
            'latitude': '36.55001',
            'count': '2',
            'longtitude': '101.70417',
            'ids': '460-00-633153-1',
            'uliName': '西宁城中瑞源路同安路交汇处HLF1HZ-1',
            'type': 1,
            'lac': '633153',
            'allTime': '0时7分26秒'
        },
        {
            'localDescripe': '西宁城东通管局',
            'level': '1',
            'ci': '11',
            'latitude': '36.60972',
            'count': '1',
            'longtitude': '101.778059',
            'ids': '460-00-631242-11',
            'uliName': '西宁城东通管局HLF1HZ-11',
            'type': 1,
            'lac': '631242',
            'allTime': '0时7分14秒'
        },
        {
            'localDescripe': '海东化隆日兰',
            'level': '1',
            'ci': '1',
            'latitude': '35.98111',
            'count': '1',
            'longtitude': '102.040859',
            'ids': '460-00-634477-1',
            'uliName': '海东化隆日兰ZLF1HZ-1',
            'type': 1,
            'lac': '634477',
            'allTime': '0时7分0秒'
        },
        {
            'localDescripe': '海东平安东村高铁基站',
            'level': '1',
            'ci': '3',
            'latitude': '36.50357',
            'count': '3',
            'longtitude': '102.127269',
            'ids': '460-00-637398-3',
            'uliName': '海东平安东村高铁基站ZLF1HZ-12',
            'type': 1,
            'lac': '637398',
            'allTime': '0时6分45秒'
        },
        {
            'localDescripe': '海东平安经四路',
            'level': '1',
            'ci': '1',
            'latitude': '36.533729',
            'count': '1',
            'longtitude': '101.982169',
            'ids': '460-00-634774-1',
            'uliName': '海东平安经四路ZLF1HZ-1',
            'type': 1,
            'lac': '634774',
            'allTime': '0时6分34秒'
        },
        {
            'localDescripe': '海东化隆阿岱收费站',
            'level': '1',
            'ci': '129',
            'latitude': '36.19686',
            'count': '1',
            'longtitude': '101.998429',
            'ids': '460-00-333618-129',
            'uliName': '海东化隆阿岱收费站ZLF1HZ-1',
            'type': 1,
            'lac': '333618',
            'allTime': '0时6分33秒'
        },
        {
            'localDescripe': '海东平安工行',
            'level': '1',
            'ci': '7',
            'latitude': '36.504179',
            'count': '1',
            'longtitude': '102.10353',
            'ids': '460-00-634407-7',
            'uliName': '海东平安工行ZLF1HZ-21',
            'type': 1,
            'lac': '634407',
            'allTime': '0时6分26秒'
        },
        {
            'localDescripe': '西宁城东东府佳苑38号楼顶',
            'level': '1',
            'ci': '11',
            'latitude': '36.588059',
            'count': '1',
            'longtitude': '101.83861',
            'ids': '460-00-630900-11',
            'uliName': '西宁城东东府佳苑38号楼顶HLF1HZ-11',
            'type': 1,
            'lac': '630900',
            'allTime': '0时6分13秒'
        },
        {
            'localDescripe': '海东平安东村高铁基站',
            'level': '1',
            'ci': '4',
            'latitude': '36.50357',
            'count': '8',
            'longtitude': '102.127269',
            'ids': '460-00-637398-4',
            'uliName': '海东平安东村高铁基站ZLF1HZ-2',
            'type': 1,
            'lac': '637398',
            'allTime': '0时6分3秒'
        },
        {
            'localDescripe': '西宁城东国土花苑3号楼',
            'level': '0',
            'ci': '1',
            'latitude': '36.6075',
            'count': '1',
            'longtitude': '101.805',
            'ids': '460-00-631758-1',
            'uliName': '西宁城东国土花苑3号楼HLF1HZ-1',
            'type': 1,
            'lac': '631758',
            'allTime': '0时5分36秒'
        },
        {
            'localDescripe': '黄南同仁尕沙日',
            'level': '0',
            'ci': '2',
            'latitude': '35.60889',
            'count': '2',
            'longtitude': '102.043059',
            'ids': '460-00-637994-2',
            'uliName': '黄南同仁尕沙日HLF1HZ-2',
            'type': 1,
            'lac': '637994',
            'allTime': '0时5分31秒'
        },
        {
            'localDescripe': '海东乐都高速服务区',
            'level': '0',
            'ci': '2',
            'latitude': '36.47153',
            'count': '1',
            'longtitude': '102.36248',
            'ids': '460-00-634089-2',
            'uliName': '海东乐都高速服务区ZLF1HZ-2',
            'type': 1,
            'lac': '634089',
            'allTime': '0时5分25秒'
        },
        {
            'localDescripe': '黄南同仁州交警队办公楼',
            'level': '0',
            'ci': '2',
            'latitude': '35.529539',
            'count': '1',
            'longtitude': '102.03686',
            'ids': '460-00-638000-2',
            'uliName': '黄南同仁州交警队办公楼HLF1HZ-2',
            'type': 1,
            'lac': '638000',
            'allTime': '0时4分34秒'
        },
        {
            'localDescripe': '西宁城东青藏铁路改造项目部',
            'level': '0',
            'ci': '11',
            'latitude': '36.59056',
            'count': '2',
            'longtitude': '101.84528',
            'ids': '460-00-632805-11',
            'uliName': '西宁城东青藏铁路改造项目部HLF1HZ-11',
            'type': 1,
            'lac': '632805',
            'allTime': '0时4分16秒'
        },
        {
            'localDescripe': '海东平安东头村',
            'level': '0',
            'ci': '130',
            'latitude': '36.49736',
            'count': '1',
            'longtitude': '102.17748',
            'ids': '460-00-333415-130',
            'uliName': '海东平安东头村ZLF1HZ-2',
            'type': 1,
            'lac': '333415',
            'allTime': '0时4分9秒'
        },
        {
            'localDescripe': '黄南同仁吾屯',
            'level': '0',
            'ci': '1',
            'latitude': '35.561109',
            'count': '1',
            'longtitude': '102.048609',
            'ids': '460-00-638164-1',
            'uliName': '黄南同仁吾屯HLF1HZ-1',
            'type': 1,
            'lac': '638164',
            'allTime': '0时4分0秒'
        },
        {
            'localDescripe': '黄南同仁隆务庄',
            'level': '0',
            'ci': '1',
            'latitude': '35.505279',
            'count': '2',
            'longtitude': '102.006669',
            'ids': '460-00-638385-1',
            'uliName': '黄南同仁隆务庄HLF1HZ-1',
            'type': 1,
            'lac': '638385',
            'allTime': '0时3分42秒'
        }]
    }],
    'total': null,
    'api_name': null
})
let getFuselageCode = Mock.mock({
    'status': 200,
    'message': '机身码查询成功',
    'data': ['8618297177354'],
    'rows': null,
    'total': null,
    'api_name': null
})
let getInternetDetails = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        'other': [{
            'name': 'pirate-h5v1.hortor002.com',
            'code': 'pirate-h5v1.hortor002.com',
            'count': 62,
            'firstTimeLong': 1550560546,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:15:46',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'dns.xsazz.com',
            'code': 'dns.xsazz.com',
            'count': 56,
            'firstTimeLong': 1550560183,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:09:43',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'qzonestyle.gtimg.cn',
            'code': 'qzonestyle.gtimg.cn',
            'count': 53,
            'firstTimeLong': 1550560020,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:07:00',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'sapi.map.baidu.com',
            'code': 'sapi.map.baidu.com',
            'count': 36,
            'firstTimeLong': 1550560020,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:07:00',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'loc.map.baidu.com',
            'code': 'loc.map.baidu.com',
            'count': 27,
            'firstTimeLong': 1550287742,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-16 11:29:02',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'aeventlog.beacon.qq.com',
            'code': 'aeventlog.beacon.qq.com',
            'count': 26,
            'firstTimeLong': 1550799509,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-22 09:38:29',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'cache.99kgames.com',
            'code': 'cache.99kgames.com',
            'count': 14,
            'firstTimeLong': 1550560183,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:09:43',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'szextshort.weixin.qq.com',
            'code': 'szextshort.weixin.qq.com',
            'count': 14,
            'firstTimeLong': 1551223589,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-27 07:26:29',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'img04.sogoucdn.com',
            'code': 'img04.sogoucdn.com',
            'count': 13,
            'firstTimeLong': 1550560183,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:09:43',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'img1.hudongba.com',
            'code': 'img1.hudongba.com',
            'count': 11,
            'firstTimeLong': 1550560183,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:09:43',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'img03.sogoucdn.com',
            'code': 'img03.sogoucdn.com',
            'count': 11,
            'firstTimeLong': 1550560183,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:09:43',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'img.sogoucdn.com',
            'code': 'img.sogoucdn.com',
            'count': 10,
            'firstTimeLong': 1550560183,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:09:43',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'm.baidu.com',
            'code': 'm.baidu.com',
            'count': 9,
            'firstTimeLong': 1550626944,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-20 09:42:24',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'tc.dl.pinyin.sogoucdn.com',
            'code': 'tc.dl.pinyin.sogoucdn.com',
            'count': 8,
            'firstTimeLong': 1550560020,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:07:00',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'img02.sogoucdn.com',
            'code': 'img02.sogoucdn.com',
            'count': 8,
            'firstTimeLong': 1550560020,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:07:00',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'dns.weixin.qq.com',
            'code': 'dns.weixin.qq.com',
            'count': 6,
            'firstTimeLong': 1550287742,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-16 11:29:02',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'szshort.weixin.qq.com',
            'code': 'szshort.weixin.qq.com',
            'count': 5,
            'firstTimeLong': 1550560183,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:09:43',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'szminorshort.weixin.qq.com',
            'code': 'szminorshort.weixin.qq.com',
            'count': 5,
            'firstTimeLong': 1550287743,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-16 11:29:03',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'dlweb.sogoucdn.com',
            'code': 'dlweb.sogoucdn.com',
            'count': 5,
            'firstTimeLong': 1550560183,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:09:43',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'dns1.synet.edu.cn',
            'code': 'dns1.synet.edu.cn',
            'count': 4,
            'firstTimeLong': 1550560555,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:15:55',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'adstream.123.sogoucdn.com',
            'code': 'adstream.123.sogoucdn.com',
            'count': 4,
            'firstTimeLong': 1550560183,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:09:43',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'theta.sogoucdn.com',
            'code': 'theta.sogoucdn.com',
            'count': 4,
            'firstTimeLong': 1550560183,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:09:43',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'cfg.imtt.qq.com',
            'code': 'cfg.imtt.qq.com',
            'count': 3,
            'firstTimeLong': 1551223589,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-27 07:26:29',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'www.chinaso.com',
            'code': 'www.chinaso.com',
            'count': 3,
            'firstTimeLong': 1550626937,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-20 09:42:17',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'i.easou.com',
            'code': 'i.easou.com',
            'count': 3,
            'firstTimeLong': 1550799509,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-22 09:38:29',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'wap.baidu.com',
            'code': 'wap.baidu.com',
            'count': 3,
            'firstTimeLong': 1550799533,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-22 09:38:53',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'log.tbs.qq.com',
            'code': 'log.tbs.qq.com',
            'count': 3,
            'firstTimeLong': 1551223590,
            'lastTimeLong': 1551257897,
            'firstTime': '2019-02-27 07:26:30',
            'lastTime': '2019-02-27 16:58:17'
        },
        {
            'name': 'a.fxltsbl.com',
            'code': 'a.fxltsbl.com',
            'count': 2,
            'firstTimeLong': 1551223589,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-27 07:26:29',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'sdk.peppermint.samsung.com',
            'code': 'sdk.peppermint.samsung.com',
            'count': 2,
            'firstTimeLong': 1550560183,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:09:43',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'res.wx.qq.com',
            'code': 'res.wx.qq.com',
            'count': 2,
            'firstTimeLong': 1551223589,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-27 07:26:29',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'cn-ms.samsungapps.com',
            'code': 'cn-ms.samsungapps.com',
            'count': 2,
            'firstTimeLong': 1551257897,
            'lastTimeLong': 1551257897,
            'firstTime': '2019-02-27 16:58:17',
            'lastTime': '2019-02-27 16:58:17'
        },
        {
            'name': 'dldir1.qq.com',
            'code': 'dldir1.qq.com',
            'count': 2,
            'firstTimeLong': 1551223589,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-27 07:26:29',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'img01.sogoucdn.com',
            'code': 'img01.sogoucdn.com',
            'count': 2,
            'firstTimeLong': 1550560020,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:07:00',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'puui.qpic.cn',
            'code': 'puui.qpic.cn',
            'count': 1,
            'firstTimeLong': 1550560555,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:15:55',
            'lastTime': '2019-02-27 17:02:14'
        },
        {
            'name': 'resolver.msg.xiaomi.net',
            'code': 'resolver.msg.xiaomi.net',
            'count': 1,
            'firstTimeLong': 1550560020,
            'lastTimeLong': 1551258134,
            'firstTime': '2019-02-19 15:07:00',
            'lastTime': '2019-02-27 17:02:14'
        }],
        'count': [{
            'name': 'pirate-h5v1.hortor002.com',
            'value': 62.0,
            'sub': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 62.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        },
        {
            'name': 'dns.xsazz.com',
            'value': 56.0,
            'sub': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 56.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        },
        {
            'name': 'qzonestyle.gtimg.cn',
            'value': 53.0,
            'sub': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 53.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        },
        {
            'name': 'sapi.map.baidu.com',
            'value': 36.0,
            'sub': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 26.0, 4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        },
        {
            'name': 'loc.map.baidu.com',
            'value': 27.0,
            'sub': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 12.0, 0.0, 0.0, 0.0, 0.0, 0.0, 14.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        },
        {
            'name': 'aeventlog.beacon.qq.com',
            'value': 26.0,
            'sub': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.0, 4.0, 4.0, 0.0, 2.0, 4.0, 0.0, 4.0, 2.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        },
        {
            'name': 'cache.99kgames.com',
            'value': 14.0,
            'sub': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 14.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        },
        {
            'name': 'szextshort.weixin.qq.com',
            'value': 14.0,
            'sub': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 13.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        },
        {
            'name': 'img04.sogoucdn.com',
            'value': 13.0,
            'sub': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 8.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        },
        {
            'name': 'img1.hudongba.com',
            'value': 11.0,
            'sub': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 11.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        }],
        'sensitive': []
    },
    'rows': null,
    'total': null,
    'api_name': null
})
export default {
    getBaseInfo: () => getBaseInfo,
    getInfos: () => getInfos,
    getNetPlayCount: () => getNetPlayCount,
    getActiveCountyTop5: () => getActiveCountyTop5,
    getUseApp: () => getUseApp,
    getWorkHomeArea: () => getWorkHomeArea,
    getFuselageCode: () => getFuselageCode,
    getInternetDetails: () => getInternetDetails,
    getCommunicationsCount: () => getCommunicationsCount
}
