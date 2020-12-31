import Mock from 'mockjs'
let getNewContactInformation = Mock.mock({
    'status': 200,
    'message': '关系人统计信息查询成功',
    'data': null,
    'rows': [{
        'center': [{
            'msgAmount': '1',
            'callAmount': '0',
            'count': '1',
            'msisdn': '8615003679027'
        }],
        'msisdn': '8615297079826',
        'homecode': '',
        'ispcode': '中国移动',
        'count': 33,
        'userName': '',
        'flag': 0,
        'msgOut': 0,
        'msgIn': 0,
        'callOut': 18,
        'callIn': 15,
        'callAmount': 33,
        'msgAmount': 0
    },
    {
        'center': [{
            'msgAmount': '2',
            'callAmount': '0',
            'count': '2',
            'msisdn': '8615297079826'
        }],
        'msisdn': '8615003679027',
        'homecode': '',
        'ispcode': '中国移动',
        'count': 22,
        'userName': '',
        'flag': 0,
        'msgOut': 0,
        'msgIn': 0,
        'callOut': 7,
        'callIn': 15,
        'callAmount': 22,
        'msgAmount': 0
    },
    {
        'center': [],
        'msisdn': '8613299107825',
        'homecode': '陕西西安',
        'ispcode': '中国联通',
        'count': 20,
        'userName': '',
        'flag': 0,
        'msgOut': 0,
        'msgIn': 0,
        'callOut': 14,
        'callIn': 6,
        'callAmount': 20,
        'msgAmount': 0
    },
    {
        'center': [],
        'msisdn': '8617609776824',
        'homecode': '青海海西蒙古族藏族自治州',
        'ispcode': '中国联通',
        'count': 12,
        'userName': '',
        'flag': 0,
        'msgOut': 0,
        'msgIn': 0,
        'callOut': 6,
        'callIn': 6,
        'callAmount': 12,
        'msgAmount': 0
    },
    {
        'center': [],
        'msisdn': '8617697664208',
        'homecode': '青海海西蒙古族藏族自治州',
        'ispcode': '中国联通',
        'count': 6,
        'userName': '',
        'flag': 0,
        'msgOut': 0,
        'msgIn': 0,
        'callOut': 2,
        'callIn': 4,
        'callAmount': 6,
        'msgAmount': 0
    },
    {
        'center': [],
        'msisdn': '8617309777436',
        'homecode': '青海海西蒙古族藏族自治州',
        'ispcode': '中国电信',
        'count': 2,
        'userName': '',
        'flag': 0,
        'msgOut': 0,
        'msgIn': 0,
        'callOut': 0,
        'callIn': 2,
        'callAmount': 2,
        'msgAmount': 0
    },
    {
        'center': [{
            'msgAmount': '1',
            'callAmount': '0',
            'count': '1',
            'msisdn': '8615003679027'
        }],
        'msisdn': '8615597509012',
        'homecode': '青海海东',
        'ispcode': '中国联通',
        'count': 2,
        'userName': '',
        'flag': 0,
        'msgOut': 0,
        'msgIn': 0,
        'callOut': 0,
        'callIn': 2,
        'callAmount': 2,
        'msgAmount': 0
    },
    {
        'center': [],
        'msisdn': '8619829390381',
        'homecode': '陕西西安',
        'ispcode': '中国移动',
        'count': 1,
        'userName': '',
        'flag': 0,
        'msgOut': 0,
        'msgIn': 0,
        'callOut': 1,
        'callIn': 0,
        'callAmount': 1,
        'msgAmount': 0
    },
    {
        'center': [],
        'msisdn': '8618691856402',
        'homecode': '陕西西安',
        'ispcode': '中国联通',
        'count': 1,
        'userName': '',
        'flag': 0,
        'msgOut': 0,
        'msgIn': 0,
        'callOut': 1,
        'callIn': 0,
        'callAmount': 1,
        'msgAmount': 0
    },
    {
        'center': [],
        'msisdn': '8613714121224',
        'homecode': '广东深圳',
        'ispcode': '中国移动',
        'count': 1,
        'userName': '',
        'flag': 0,
        'msgOut': 0,
        'msgIn': 0,
        'callOut': 0,
        'callIn': 1,
        'callAmount': 1,
        'msgAmount': 0
    }],
    'total': null,
    'api_name': null
})
let relatedCertainNew = Mock.mock({
    'status': 200,
    'message': '关系人详情信息查询成功',
    'data': {
        'imei': '86863203510779',
        'cardNumber': '460019769249934',
        'homecode': '青海西宁',
        'ispcode': '中国联通',
        'msisdn': '8613299769715',
        'optSystem': '--',
        'phoneType': '--',
        'personLabel': '--'
    },
    'rows': [{
        'occurTime': '2019-03-07 15:38:00',
        'content': '这是18297177354在2019年03月07日 15点37分 59秒发来的测试短信',
        'type': '0',
        'contentType': '0'
    },
    {
        'occurTime': '2019-03-07 15:37:58',
        'content': '这是18297177354在2019年03月07日 15点37分 59秒发来的测试短信',
        'type': '0',
        'contentType': '0'
    },
    {
        'occurTime': '2019-03-07 15:37:05',
        'content': '这是18297177354在2019年03月07日 15点37分 03秒发来的测试短信',
        'type': '0',
        'contentType': '0'
    },
    {
        'occurTime': '2019-03-07 15:37:03',
        'content': '这是18297177354在2019年03月07日 15点37分 03秒发来的测试短信',
        'type': '0',
        'contentType': '0'
    },
    {
        'occurTime': '2019-03-07 15:36:10',
        'content': '这是18297177354在2019年03月07日 15点36分 08秒发来的测试短信',
        'type': '0',
        'contentType': '0'
    },
    {
        'occurTime': '2019-03-07 15:36:08',
        'content': '这是18297177354在2019年03月07日 15点36分 08秒发来的测试短信',
        'type': '0',
        'contentType': '0'
    },
    {
        'occurTime': '2019-03-07 15:35:16',
        'content': '这是18297177354在2019年03月07日 15点35分 14秒发来的测试短信',
        'type': '0',
        'contentType': '0'
    },
    {
        'occurTime': '2019-03-07 15:35:14',
        'content': '这是18297177354在2019年03月07日 15点35分 14秒发来的测试短信',
        'type': '0',
        'contentType': '0'
    },
    {
        'occurTime': '2019-03-07 15:34:22',
        'content': '这是18297177354在2019年03月07日 15点34分 20秒发来的测试短信',
        'type': '0',
        'contentType': '0'
    },
    {
        'occurTime': '2019-03-07 15:34:20',
        'content': '这是18297177354在2019年03月07日 15点34分 20秒发来的测试短信',
        'type': '0',
        'contentType': '0'
    }],
    'total': 20,
    'api_name': null
})
export default {
    getNewContactInformation: () => getNewContactInformation,
    relatedCertainNew: () => relatedCertainNew
}
