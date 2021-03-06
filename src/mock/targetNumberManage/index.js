import Mock from 'mockjs'
let tarNumQuery = Mock.mock({
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
export default {
    tarNumQuery: () => tarNumQuery
}
