import Mock from 'mockjs'
let getPortraitDict = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': [{
        'id': 1,
        'keyId': 0,
        'name': '金融类',
        'flag': null,
        'type': 0,
        'msisdn': null,
        'startTime': null,
        'endTime': null,
        'pageNum': null,
        'pageSize': null
    },
    {
        'id': 2,
        'keyId': 1,
        'name': '理财类',
        'flag': null,
        'type': 0,
        'msisdn': null,
        'startTime': null,
        'endTime': null,
        'pageNum': null,
        'pageSize': null
    },
    {
        'id': 3,
        'keyId': 2,
        'name': '保险类',
        'flag': null,
        'type': 0,
        'msisdn': null,
        'startTime': null,
        'endTime': null,
        'pageNum': null,
        'pageSize': null
    },
    {
        'id': 4,
        'keyId': 3,
        'name': '借贷类',
        'flag': null,
        'type': 0,
        'msisdn': null,
        'startTime': null,
        'endTime': null,
        'pageNum': null,
        'pageSize': null
    }],
    'rows': null,
    'total': null,
    'api_name': null
})
let getAccountMovementMSG = Mock.mock({
    'status': 200,
    'message': '信息查询成功',
    'data': null,
    'rows': [{
        'dateTime': '2019-02-22 09:38:4609:38:45',
        'accountnumber': '----',
        'rltmsisdn': '95599',
        'source': '直提',
        'message': '这是第#2#条短信，发送时间是#2019-02-2209:38:45',
        'url': '----',
        'tradetype': 'unknown',
        'bank': 'IBANK',
        'amounts': '----',
        'balance': '----',
        'tradechannel': '----',
        'currency': '人民币',
        'timestamp': '1550799526'
    }],
    'total': 1,
    'api_name': null
})
export default {
    getPortraitDict: () => getPortraitDict,
    getAccountMovementMSG: () => getAccountMovementMSG
}
