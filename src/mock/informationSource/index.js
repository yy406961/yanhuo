import Mock from 'mockjs'
let selectSourceTaskList = Mock.mock({
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
        'taskId': 187,
        'taskName': 'ceshi',
        'inforsourceNum': 1,
        'startTime': '2019-03-05',
        'endTime': '2019-03-06',
        'status': 0,
        'createTime': '2019-03-06 17:15:48',
        'createUserId': null,
        'createUserName': 'admin-任务使用人',
        'dayNum': null,
        'site': null,
        'inforsourceName': null,
        'inforsourceDomain': null,
        'parentTaskId': null,
        'detailVOList': null
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
        'taskId': 184,
        'taskName': 'test',
        'inforsourceNum': 1,
        'startTime': '2019-02-24',
        'endTime': '2019-02-25',
        'status': 2,
        'createTime': '2019-02-25 16:01:25',
        'createUserId': null,
        'createUserName': 'admin-任务使用人',
        'dayNum': null,
        'site': null,
        'inforsourceName': null,
        'inforsourceDomain': null,
        'parentTaskId': null,
        'detailVOList': null
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
        'taskId': 170,
        'taskName': 'test2',
        'inforsourceNum': 1,
        'startTime': '2019-01-24',
        'endTime': '2019-01-26',
        'status': 2,
        'createTime': '2019-01-26 19:30:44',
        'createUserId': null,
        'createUserName': 'admin-任务使用人',
        'dayNum': null,
        'site': null,
        'inforsourceName': null,
        'inforsourceDomain': null,
        'parentTaskId': null,
        'detailVOList': null
    }],
    'total': 3,
    'api_name': null
})
let selectSourceTaskById = Mock.mock({
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
        'taskId': 170,
        'phoneNum': '8618997138132',
        'imsi': '460110621134494',
        'imei': '86721603106169',
        'homeCode': '西宁市',
        'isp': '中国移动',
        'visitNum': 1,
        'visitTime': 1,
        'inforsource_ids': null
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
        'taskId': 170,
        'phoneNum': '8613389744687',
        'imsi': '460110622091056',
        'imei': '86066504992582',
        'homeCode': '海南',
        'isp': '中国移动',
        'visitNum': 1,
        'visitTime': 1,
        'inforsource_ids': null
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
        'taskId': 170,
        'phoneNum': '8618609781051',
        'imsi': '460019780623171',
        'imei': '35209907838390',
        'homeCode': '西宁市',
        'isp': '中国移动',
        'visitNum': 1,
        'visitTime': 3,
        'inforsource_ids': null
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
        'taskId': 170,
        'phoneNum': '8618194578082',
        'imsi': '460110620936217',
        'imei': '86433903565801',
        'homeCode': '西宁市',
        'isp': '中国移动',
        'visitNum': 1,
        'visitTime': 1,
        'inforsource_ids': null
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
        'taskId': 170,
        'phoneNum': '8618194705566',
        'imsi': '460110622320748',
        'imei': '35695806760141',
        'homeCode': '黄南',
        'isp': '中国移动',
        'visitNum': 1,
        'visitTime': 1,
        'inforsource_ids': null
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
        'taskId': 170,
        'phoneNum': '8618001248360',
        'imsi': '460110020383446',
        'imei': '35947808960615',
        'homeCode': '北京市',
        'isp': '中国移动',
        'visitNum': 1,
        'visitTime': 30,
        'inforsource_ids': null
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
        'taskId': 170,
        'phoneNum': '8617709723604',
        'imsi': '460110623670216',
        'imei': '86885602390211',
        'homeCode': '海东地区',
        'isp': '中国移动',
        'visitNum': 1,
        'visitTime': 1,
        'inforsource_ids': null
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
        'taskId': 170,
        'phoneNum': '8615509763135',
        'imsi': '460019760428377',
        'imei': '86335903853335',
        'homeCode': '玉树',
        'isp': '中国移动',
        'visitNum': 1,
        'visitTime': 1,
        'inforsource_ids': null
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
        'taskId': 170,
        'phoneNum': '8618997096788',
        'imsi': '460110620776646',
        'imei': '35917407904125',
        'homeCode': '西宁市',
        'isp': '中国移动',
        'visitNum': 1,
        'visitTime': 1,
        'inforsource_ids': null
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
        'taskId': 170,
        'phoneNum': '8613369742686',
        'imsi': '460110622073776',
        'imei': '86951503105075',
        'homeCode': '海南',
        'isp': '中国移动',
        'visitNum': 1,
        'visitTime': 1,
        'inforsource_ids': null
    }],
    'total': 123,
    'api_name': null
})
let selectPhoneStatOne = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'barData': [{
        'value': '2',
        'name': '08',
        'tipsText': '信源名称：FT中文网</br>时间：08</br>访问量：2'
    },
    {
        'value': '4',
        'name': '11',
        'tipsText': '信源名称：FT中文网</br>时间：11</br>访问量：4'
    }],
    'sourceLevel': [{
        'site': 'www.ftchinese.com',
        'name': 'FT中文网',
        'value': 9
    }],
    'lineData': [{
        'name': '2019-01-24',
        'value': '6',
        'site': 'www.ftchinese.com',
        'inforsource_name': 'FT中文网',
        'tipsText': '信源名称：FT中文网</br>时间：2019-01-24</br>访问量：6'
    },
    {
        'name': '2019-01-25',
        'value': '3',
        'site': 'www.ftchinese.com',
        'inforsource_name': 'FT中文网',
        'tipsText': '信源名称：FT中文网</br>时间：2019-01-25</br>访问量：3'
    },
    {
        'site': 'www.ftchinese.com',
        'tipsText': '信源名称：FT中文网</br>时间：2019-01-26</br>访问量：0',
        'name': '2019-01-26',
        'value': 0
    }]
})
let selectInforSourceStatOne = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'barData': [{
        'tipsText': '信源名称：FT中文网</br>时间：00</br>访问量：13',
        'name': '00',
        'value': '13'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：01</br>访问量：2',
        'name': '01',
        'value': '2'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：03</br>访问量：13',
        'name': '03',
        'value': '13'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：06</br>访问量：7',
        'name': '06',
        'value': '7'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：07</br>访问量：17',
        'name': '07',
        'value': '17'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：08</br>访问量：14',
        'name': '08',
        'value': '14'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：09</br>访问量：7',
        'name': '09',
        'value': '7'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：10</br>访问量：10',
        'name': '10',
        'value': '10'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：11</br>访问量：16',
        'name': '11',
        'value': '16'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：12</br>访问量：9',
        'name': '12',
        'value': '9'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：13</br>访问量：20',
        'name': '13',
        'value': '20'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：14</br>访问量：8',
        'name': '14',
        'value': '8'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：16</br>访问量：3',
        'name': '16',
        'value': '3'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：17</br>访问量：1',
        'name': '17',
        'value': '1'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：18</br>访问量：5',
        'name': '18',
        'value': '5'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：19</br>访问量：6',
        'name': '19',
        'value': '6'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：20</br>访问量：4',
        'name': '20',
        'value': '4'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：21</br>访问量：8',
        'name': '21',
        'value': '8'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：22</br>访问量：2',
        'name': '22',
        'value': '2'
    },
    {
        'tipsText': '信源名称：FT中文网</br>时间：23</br>访问量：5',
        'name': '23',
        'value': '5'
    }],
    'timeTop10': [{
        'name': '8615801002663',
        'ordernum': 1.0,
        'value': 39
    },
    {
        'name': '8618001248360',
        'ordernum': 2.0,
        'value': 30
    },
    {
        'name': '8619997295464',
        'ordernum': 3.0,
        'value': 28
    },
    {
        'name': '8613175450111',
        'ordernum': 4.0,
        'value': 26
    },
    {
        'name': '8618997453856',
        'ordernum': 5.0,
        'value': 15
    },
    {
        'name': '8613826564839',
        'ordernum': 6.0,
        'value': 15
    },
    {
        'name': '8615297014465',
        'ordernum': 7.0,
        'value': 14
    },
    {
        'name': '8618017100115',
        'ordernum': 8.0,
        'value': 13
    },
    {
        'name': '8618801289928',
        'ordernum': 9.0,
        'value': 11
    },
    {
        'name': '8615500758189',
        'ordernum': 10.0,
        'value': 9
    }],
    'lineData': [{
        'name': '2019-01-24',
        'value': 170,
        'site': 'www.ftchinese.com',
        'inforsourceName': 'FT中文网',
        'tipsText': '信源名称：FT中文网</br>时间：2019-01-24</br>访问量：170'
    },
    {
        'name': '2019-01-25',
        'value': 225,
        'site': 'www.ftchinese.com',
        'inforsourceName': 'FT中文网',
        'tipsText': '信源名称：FT中文网</br>时间：2019-01-25</br>访问量：225'
    },
    {
        'site': 'www.ftchinese.com',
        'tipsText': '信源名称：FT中文网</br>时间：2019-01-26</br>访问量：0',
        'name': '2019-01-26',
        'value': 0
    }]
})
export default {
    selectSourceTaskList: () => selectSourceTaskList,
    selectSourceTaskById: () => selectSourceTaskById,
    selectPhoneStatOne: () => selectPhoneStatOne,
    selectInforSourceStatOne: () => selectInforSourceStatOne
}
