import Mock from 'mockjs'
let entities = Mock.mock({
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
        'resourceId': 82421,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': '测试金融',
        'endTime': '2019-03-01 15:31:57',
        'msisdn': '8613997246600',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-03-01 15:36:22',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82375,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': '订票',
        'endTime': '2019-02-24 11:23:58',
        'msisdn': '8617691170548',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-24 11:27:29',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82374,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': 'c',
        'endTime': '2019-02-23 17:42:55',
        'msisdn': '8615201499650',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-23 17:46:54',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82366,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': 'cesshi2',
        'endTime': '2019-02-21 14:23:46',
        'msisdn': '8613919910484',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-21 14:26:43',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82365,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': 'ceshi1',
        'endTime': '2019-02-21 14:23:46',
        'msisdn': '8613919930945',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-21 14:26:16',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82363,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': 'hou',
        'endTime': '2019-02-20 18:45:59',
        'msisdn': '8618329583392',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-20 18:50:30',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82362,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': 'zhu',
        'endTime': '2019-02-20 18:45:59',
        'msisdn': '8613119132705',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-20 18:49:37',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82361,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': 'ge',
        'endTime': '2019-02-20 18:45:59',
        'msisdn': '8615600160838',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-20 18:47:57',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82360,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': 'yan',
        'endTime': '2019-02-20 18:45:59',
        'msisdn': '8618810354011',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-20 18:47:09',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82359,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': 'fn',
        'endTime': '2019-02-20 18:45:59',
        'msisdn': '8618792763085',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-20 18:46:46',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82358,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': '境外7',
        'endTime': '2019-07-26 12:00:00',
        'msisdn': '85256246493',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-20 01:57:13',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82357,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': '境外6',
        'endTime': '2019-07-26 12:00:00',
        'msisdn': '60163285766',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-20 01:57:13',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82356,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': '境外5',
        'endTime': '2019-07-26 12:00:00',
        'msisdn': '85293018306',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-20 01:57:13',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82355,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': '境外4',
        'endTime': '2019-07-26 12:00:00',
        'msisdn': '886919060367',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-20 01:57:13',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82354,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': '境外3',
        'endTime': '2019-07-26 12:00:00',
        'msisdn': '886919059165',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-20 01:57:13',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82353,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': '境外2',
        'endTime': '2019-07-26 12:00:00',
        'msisdn': '85256259851',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-20 01:57:13',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 82352,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': '境外1',
        'endTime': '2019-07-26 12:00:00',
        'msisdn': '886932596788',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2019-02-20 01:57:13',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 77612,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': '移动测试号码',
        'endTime': '2020-12-31 15:05:41',
        'msisdn': '8618297177354',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2018-12-28 15:07:39',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 77611,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': '联通测试号码',
        'endTime': '2020-12-31 15:05:41',
        'msisdn': '8618697151349',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2018-12-28 15:06:24',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
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
        'resourceId': 77610,
        'lbs': 0,
        'imei': '',
        'imsi': '',
        'name': '电信测试号码',
        'endTime': '2020-12-31 15:05:41',
        'msisdn': '8617794740171',
        'lbsName': '不监控',
        'status': 1,
        'createTime': '2018-12-28 15:05:55',
        'owner': 'T661',
        'batch': null,
        'approverStatus': 3,
        'orgId': '0001',
        'numType': null,
        'flag': [],
        'flagIds': '',
        'flagNames': ''
    }],
    'total': 20,
    'api_name': null
})
let getAllData = Mock.mock({
    'status': 200,
    'message': null,
    'data': {
        'inProvince': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'name': '测试金融',
            'msisdn': '8613997246600',
            'imei': '86075003902141',
            'imsi': '460027973624976',
            'homeCode': '西宁',
            'spCode': '中国移动',
            'presentTime': '2019-03-06 16:43:17',
            'placeCname': '西宁盐业大厦',
            'stayTime': null,
            'stayTimes': '',
            'longtitude': '101.78699657865911',
            'latitude': '36.64097190603312',
            'stayTimeNationwide': '',
            'eventType': '通话被叫开始',
            'eventTypeTime': '2019-03-06 16:43:17',
            'lastUpdateTime': 1551861797000,
            'lastLocTime': '',
            'sysnTime': 0,
            'newInfo': '测试金融(8613997246600) 最后触网时间：2019-03-06 16:43:17',
            'lac': '38686',
            'ci': '55142',
            'stationLocation': '',
            'timeFlag': 1,
            'cdr': []
        }],
        'locationUnknown': [],
        'disappear': [{
            'page': 1,
            'rows': 100000000,
            'start': 0,
            'offset': 0,
            'sort': '',
            'order': 'desc',
            'queryStartTime': '',
            'queryEndTime': '',
            'ids': '',
            'name': 'hou',
            'msisdn': '8618329583392',
            'imei': '8688210316143916',
            'imsi': '460026200439505',
            'homeCode': '咸阳',
            'spCode': '中国移动',
            'presentTime': '2019-02-25 16:17:40',
            'placeCname': '海东民和下川口',
            'stayTime': null,
            'stayTimes': '',
            'longtitude': '103.02263962841036',
            'latitude': '36.25639997944072',
            'stayTimeNationwide': '',
            'eventType': null,
            'eventTypeTime': '2019-02-25 16:17:40',
            'lastUpdateTime': 1551082660000,
            'lastLocTime': '',
            'sysnTime': 0,
            'newInfo': 'hou(8618329583392) 最后触网时间：2019-02-25 16:17:40',
            'lac': '38691',
            'ci': '162319362',
            'stationLocation': '',
            'timeFlag': 3,
            'cdr': []
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
            'name': '订票',
            'msisdn': '8617691170548',
            'imei': '86246803501950',
            'imsi': '460011179110314',
            'homeCode': '西安',
            'spCode': '中国联通',
            'presentTime': '2019-02-26 09:03:12',
            'placeCname': '海东民和下川口高铁站',
            'stayTime': null,
            'stayTimes': '',
            'longtitude': '103.02375036978384',
            'latitude': '36.25082379845231',
            'stayTimeNationwide': '',
            'eventType': null,
            'eventTypeTime': '2019-02-26 09:03:12',
            'lastUpdateTime': 1551142992000,
            'lastLocTime': '',
            'sysnTime': 0,
            'newInfo': '订票(8617691170548) 最后触网时间：2019-02-26 09:03:12',
            'lac': '38871',
            'ci': '148544769',
            'stationLocation': '',
            'timeFlag': 3,
            'cdr': []
        }],
        'pie': [{
            'name': '省内',
            'value': 1
        },
        {
            'name': '消失',
            'value': 2
        },
        {
            'name': '位置不明',
            'value': 0
        }]
    },
    'rows': null,
    'total': null,
    'api_name': null
})
export default {
    entities: () => entities,
    getAllData: () => getAllData
}
