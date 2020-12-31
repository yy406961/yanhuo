import Mock from 'mockjs'
let selectKeyPersonTaskList = Mock.mock({
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
        'taskId': 'a7ff8a162f1d461da990d0bc303e1175',
        'taskName': 'test37',
        'personNum': 20,
        'startTime': '2019-03-01',
        'endTime': '2019-03-06',
        'queryStatus': 0,
        'createUserName': 'admin-任务使用人',
        'createTime': '2019-03-07 10:10:51',
        'deleteStatus': null,
        'parentTaskId': null,
        'createUserId': null,
        'dayNum': null,
        'detailList': null
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
        'taskId': 'b5a1ae022d7f4451b9b3fbb1e6edb75d',
        'taskName': 'test1',
        'personNum': 3,
        'startTime': '2019-01-25',
        'endTime': '2019-01-26',
        'queryStatus': 2,
        'createUserName': 'admin-任务使用人',
        'createTime': '2019-01-26 19:19:13',
        'deleteStatus': null,
        'parentTaskId': null,
        'createUserId': null,
        'dayNum': null,
        'detailList': null
    }],
    'total': 2,
    'api_name': null
})
let selectTaskResult = Mock.mock({
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
        'id': null,
        'taskId': 'a7ff8a162f1d461da990d0bc303e1175',
        'siteName': null,
        'siteDomain': 'qq.com',
        'userNum': 4,
        'visitNum': 1653,
        'insertTime': null
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
        'id': null,
        'taskId': 'a7ff8a162f1d461da990d0bc303e1175',
        'siteName': null,
        'siteDomain': 'sogou.com',
        'userNum': 4,
        'visitNum': 745,
        'insertTime': null
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
        'id': null,
        'taskId': 'a7ff8a162f1d461da990d0bc303e1175',
        'siteName': null,
        'siteDomain': 'baidu.com',
        'userNum': 5,
        'visitNum': 545,
        'insertTime': null
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
        'id': null,
        'taskId': 'a7ff8a162f1d461da990d0bc303e1175',
        'siteName': null,
        'siteDomain': '360.cn',
        'userNum': 2,
        'visitNum': 245,
        'insertTime': null
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
        'id': null,
        'taskId': 'a7ff8a162f1d461da990d0bc303e1175',
        'siteName': null,
        'siteDomain': 'google.com',
        'userNum': 3,
        'visitNum': 223,
        'insertTime': null
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
        'id': null,
        'taskId': 'a7ff8a162f1d461da990d0bc303e1175',
        'siteName': null,
        'siteDomain': 'yangkeduo.com',
        'userNum': 3,
        'visitNum': 205,
        'insertTime': null
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
        'id': null,
        'taskId': 'a7ff8a162f1d461da990d0bc303e1175',
        'siteName': null,
        'siteDomain': 'googleapis.com',
        'userNum': 1,
        'visitNum': 204,
        'insertTime': null
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
        'id': null,
        'taskId': 'a7ff8a162f1d461da990d0bc303e1175',
        'siteName': null,
        'siteDomain': 'yundaex.com',
        'userNum': 1,
        'visitNum': 156,
        'insertTime': null
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
        'id': null,
        'taskId': 'a7ff8a162f1d461da990d0bc303e1175',
        'siteName': null,
        'siteDomain': 'hicloud.com',
        'userNum': 2,
        'visitNum': 150,
        'insertTime': null
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
        'id': null,
        'taskId': 'a7ff8a162f1d461da990d0bc303e1175',
        'siteName': null,
        'siteDomain': 'qpic.cn',
        'userNum': 3,
        'visitNum': 113,
        'insertTime': null
    }],
    'total': 277,
    'api_name': null
})
let selectByMsisdn = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'barData': [{
        'value': '1.8',
        'name': '00',
        'tipsText': '用户数：3</br>时间：00</br>访问量：1.8'
    },
    {
        'value': '1.3',
        'name': '01',
        'tipsText': '用户数：3</br>时间：01</br>访问量：1.3'
    },
    {
        'value': '0.7',
        'name': '02',
        'tipsText': '用户数：2</br>时间：02</br>访问量：0.7'
    },
    {
        'value': '1.0',
        'name': '03',
        'tipsText': '用户数：2</br>时间：03</br>访问量：1.0'
    },
    {
        'value': '0.7',
        'name': '04',
        'tipsText': '用户数：2</br>时间：04</br>访问量：0.7'
    },
    {
        'value': '0.5',
        'name': '05',
        'tipsText': '用户数：1</br>时间：05</br>访问量：0.5'
    },
    {
        'value': '1.2',
        'name': '06',
        'tipsText': '用户数：1</br>时间：06</br>访问量：1.2'
    },
    {
        'value': '6.8',
        'name': '07',
        'tipsText': '用户数：4</br>时间：07</br>访问量：6.8'
    },
    {
        'value': '6.3',
        'name': '08',
        'tipsText': '用户数：3</br>时间：08</br>访问量：6.3'
    },
    {
        'value': '3.3',
        'name': '09',
        'tipsText': '用户数：4</br>时间：09</br>访问量：3.3'
    },
    {
        'value': '1.7',
        'name': '10',
        'tipsText': '用户数：2</br>时间：10</br>访问量：1.7'
    },
    {
        'value': '3.8',
        'name': '11',
        'tipsText': '用户数：3</br>时间：11</br>访问量：3.8'
    },
    {
        'value': '3.0',
        'name': '12',
        'tipsText': '用户数：2</br>时间：12</br>访问量：3.0'
    },
    {
        'value': '9.8',
        'name': '13',
        'tipsText': '用户数：6</br>时间：13</br>访问量：9.8'
    },
    {
        'value': '10.3',
        'name': '14',
        'tipsText': '用户数：3</br>时间：14</br>访问量：10.3'
    },
    {
        'value': '6.7',
        'name': '15',
        'tipsText': '用户数：2</br>时间：15</br>访问量：6.7'
    },
    {
        'value': '2.7',
        'name': '16',
        'tipsText': '用户数：3</br>时间：16</br>访问量：2.7'
    },
    {
        'value': '3.5',
        'name': '17',
        'tipsText': '用户数：2</br>时间：17</br>访问量：3.5'
    },
    {
        'value': '5.5',
        'name': '18',
        'tipsText': '用户数：5</br>时间：18</br>访问量：5.5'
    },
    {
        'value': '12.3',
        'name': '19',
        'tipsText': '用户数：3</br>时间：19</br>访问量：12.3'
    },
    {
        'value': '16.3',
        'name': '20',
        'tipsText': '用户数：4</br>时间：20</br>访问量：16.3'
    },
    {
        'value': '9.0',
        'name': '21',
        'tipsText': '用户数：3</br>时间：21</br>访问量：9.0'
    },
    {
        'value': '12.5',
        'name': '22',
        'tipsText': '用户数：3</br>时间：22</br>访问量：12.5'
    },
    {
        'value': '3.3',
        'name': '23',
        'tipsText': '用户数：4</br>时间：23</br>访问量：3.3'
    }],
    'sourceLevel': [{
        'ordernum': 1.0,
        'name': '60163285766',
        'site': 'sogou.com',
        'value': 702
    },
    {
        'ordernum': 2.0,
        'name': '8613997246600',
        'site': 'sogou.com',
        'value': 30
    },
    {
        'ordernum': 3.0,
        'name': '8613919930945',
        'site': 'sogou.com',
        'value': 11
    },
    {
        'ordernum': 4.0,
        'name': '8617794740171',
        'site': 'sogou.com',
        'value': 2
    }],
    'lineData': [{
        'tipsText': '用户数：0</br>时间：2019-03-01</br>访问量：0',
        'name': '2019-03-01',
        'value': 0
    },
    {
        'tipsText': '用户数：0</br>时间：2019-03-02</br>访问量：0',
        'name': '2019-03-02',
        'value': 0
    },
    {
        'tipsText': '用户数：0</br>时间：2019-03-03</br>访问量：0',
        'name': '2019-03-03',
        'value': 0
    },
    {
        'tipsText': '用户数：0</br>时间：2019-03-04</br>访问量：0',
        'name': '2019-03-04',
        'value': 0
    },
    {
        'name': '2019-03-05',
        'value': 285,
        'tipsText': '用户数：4</br>时间：2019-03-05</br>访问量：285'
    },
    {
        'name': '2019-03-06',
        'value': 460,
        'tipsText': '用户数：3</br>时间：2019-03-06</br>访问量：460'
    }]
})
let selectKeyPersonStat = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'barData': [{
        'value': '30.5',
        'name': '00',
        'tipsText': '用户数：7</br>时间：00</br>访问量：30.5'
    },
    {
        'value': '45.7',
        'name': '01',
        'tipsText': '用户数：6</br>时间：01</br>访问量：45.7'
    },
    {
        'value': '13.3',
        'name': '02',
        'tipsText': '用户数：5</br>时间：02</br>访问量：13.3'
    },
    {
        'value': '7.5',
        'name': '03',
        'tipsText': '用户数：7</br>时间：03</br>访问量：7.5'
    },
    {
        'value': '7.5',
        'name': '04',
        'tipsText': '用户数：6</br>时间：04</br>访问量：7.5'
    },
    {
        'value': '5.7',
        'name': '05',
        'tipsText': '用户数：6</br>时间：05</br>访问量：5.7'
    },
    {
        'value': '13.2',
        'name': '06',
        'tipsText': '用户数：6</br>时间：06</br>访问量：13.2'
    },
    {
        'value': '36.5',
        'name': '07',
        'tipsText': '用户数：6</br>时间：07</br>访问量：36.5'
    },
    {
        'value': '70.0',
        'name': '08',
        'tipsText': '用户数：7</br>时间：08</br>访问量：70.0'
    },
    {
        'value': '26.5',
        'name': '09',
        'tipsText': '用户数：9</br>时间：09</br>访问量：26.5'
    },
    {
        'value': '33.3',
        'name': '10',
        'tipsText': '用户数：7</br>时间：10</br>访问量：33.3'
    },
    {
        'value': '50.2',
        'name': '11',
        'tipsText': '用户数：6</br>时间：11</br>访问量：50.2'
    },
    {
        'value': '80.2',
        'name': '12',
        'tipsText': '用户数：7</br>时间：12</br>访问量：80.2'
    },
    {
        'value': '69.8',
        'name': '13',
        'tipsText': '用户数：7</br>时间：13</br>访问量：69.8'
    },
    {
        'value': '42.8',
        'name': '14',
        'tipsText': '用户数：7</br>时间：14</br>访问量：42.8'
    },
    {
        'value': '37.5',
        'name': '15',
        'tipsText': '用户数：7</br>时间：15</br>访问量：37.5'
    },
    {
        'value': '29.8',
        'name': '16',
        'tipsText': '用户数：7</br>时间：16</br>访问量：29.8'
    },
    {
        'value': '32.8',
        'name': '17',
        'tipsText': '用户数：6</br>时间：17</br>访问量：32.8'
    },
    {
        'value': '59.8',
        'name': '18',
        'tipsText': '用户数：7</br>时间：18</br>访问量：59.8'
    },
    {
        'value': '131.2',
        'name': '19',
        'tipsText': '用户数：7</br>时间：19</br>访问量：131.2'
    },
    {
        'value': '81.8',
        'name': '20',
        'tipsText': '用户数：6</br>时间：20</br>访问量：81.8'
    },
    {
        'value': '65.7',
        'name': '21',
        'tipsText': '用户数：6</br>时间：21</br>访问量：65.7'
    },
    {
        'value': '55.0',
        'name': '22',
        'tipsText': '用户数：7</br>时间：22</br>访问量：55.0'
    },
    {
        'value': '26.5',
        'name': '23',
        'tipsText': '用户数：6</br>时间：23</br>访问量：26.5'
    }],
    'tableData': [{
        'visitNum': 1653,
        'siteDomain': 'qq.com'
    },
    {
        'visitNum': 745,
        'siteDomain': 'sogou.com'
    },
    {
        'visitNum': 545,
        'siteDomain': 'baidu.com'
    },
    {
        'visitNum': 245,
        'siteDomain': '360.cn'
    },
    {
        'visitNum': 223,
        'siteDomain': 'google.com'
    },
    {
        'visitNum': 205,
        'siteDomain': 'yangkeduo.com'
    },
    {
        'visitNum': 204,
        'siteDomain': 'googleapis.com'
    },
    {
        'visitNum': 156,
        'siteDomain': 'yundaex.com'
    },
    {
        'visitNum': 150,
        'siteDomain': 'hicloud.com'
    },
    {
        'visitNum': 113,
        'siteDomain': 'qpic.cn'
    },
    {
        'visitNum': 107,
        'siteDomain': 'bdstatic.com'
    },
    {
        'visitNum': 93,
        'siteDomain': 'yundasys.com'
    },
    {
        'visitNum': 90,
        'siteDomain': 'taobao.com'
    },
    {
        'visitNum': 83,
        'siteDomain': 'amap.com'
    },
    {
        'visitNum': 73,
        'siteDomain': 'in-addr.arpa'
    },
    {
        'visitNum': 54,
        'siteDomain': 'gifshow.com'
    },
    {
        'visitNum': 53,
        'siteDomain': 'facebook.com'
    },
    {
        'visitNum': 45,
        'siteDomain': 'oppomobile.com'
    },
    {
        'visitNum': 45,
        'siteDomain': 'whatsapp.net'
    },
    {
        'visitNum': 42,
        'siteDomain': 'bdimg.com'
    },
    {
        'visitNum': 40,
        'siteDomain': 'jpush.cn'
    },
    {
        'visitNum': 37,
        'siteDomain': 'qlogo.cn'
    },
    {
        'visitNum': 36,
        'siteDomain': 'ntp.org'
    },
    {
        'visitNum': 34,
        'siteDomain': 'appjiagu.com'
    },
    {
        'visitNum': 34,
        'siteDomain': 'mob.com'
    },
    {
        'visitNum': 33,
        'siteDomain': 'accuweather.com'
    },
    {
        'visitNum': 32,
        'siteDomain': 'app-measurement.com'
    },
    {
        'visitNum': 32,
        'siteDomain': 'ksapisrv.com'
    },
    {
        'visitNum': 28,
        'siteDomain': 'pstatp.com'
    },
    {
        'visitNum': 28,
        'siteDomain': 'googlezip.net'
    },
    {
        'visitNum': 26,
        'siteDomain': '25pp.com'
    },
    {
        'visitNum': 25,
        'siteDomain': 'glpals.com'
    },
    {
        'visitNum': 24,
        'siteDomain': 'pingan.com'
    },
    {
        'visitNum': 23,
        'siteDomain': 'bcebos.com'
    },
    {
        'visitNum': 23,
        'siteDomain': 'udamall.com'
    },
    {
        'visitNum': 22,
        'siteDomain': 'icbc.com.cn'
    },
    {
        'visitNum': 21,
        'siteDomain': 'spdb.com.cn'
    },
    {
        'visitNum': 20,
        'siteDomain': 'mediav.com'
    },
    {
        'visitNum': 20,
        'siteDomain': 'yximgs.com'
    },
    {
        'visitNum': 20,
        'siteDomain': 'alipay.com'
    },
    {
        'visitNum': 20,
        'siteDomain': 'tenpay.com'
    },
    {
        'visitNum': 19,
        'siteDomain': 'umengcloud.com'
    },
    {
        'visitNum': 18,
        'siteDomain': 'snssdk.com'
    },
    {
        'visitNum': 17,
        'siteDomain': 'meituan.net'
    },
    {
        'visitNum': 16,
        'siteDomain': 'doubleclick.net'
    },
    {
        'visitNum': 15,
        'siteDomain': 'cmpassport.com'
    },
    {
        'visitNum': 15,
        'siteDomain': 'xiaomi.com'
    },
    {
        'visitNum': 14,
        'siteDomain': 'spotify.com'
    },
    {
        'visitNum': 14,
        'siteDomain': 'android.com'
    },
    {
        'visitNum': 14,
        'siteDomain': 'bdurl.net'
    },
    {
        'visitNum': 14,
        'siteDomain': 'igexin.com'
    },
    {
        'visitNum': 14,
        'siteDomain': 'gstatic.com'
    },
    {
        'visitNum': 13,
        'siteDomain': 'sogoucdn.com'
    },
    {
        'visitNum': 13,
        'siteDomain': 'youzan.com'
    },
    {
        'visitNum': 13,
        'siteDomain': 'avast.com'
    },
    {
        'visitNum': 12,
        'siteDomain': 'bytecdn.cn'
    },
    {
        'visitNum': 11,
        'siteDomain': 'qhimg.com'
    },
    {
        'visitNum': 11,
        'siteDomain': 'nearme.com.cn'
    },
    {
        'visitNum': 11,
        'siteDomain': 'meizu.com'
    },
    {
        'visitNum': 11,
        'siteDomain': 'aliyuncs.com'
    },
    {
        'visitNum': 10,
        'siteDomain': 'uc.cn'
    },
    {
        'visitNum': 10,
        'siteDomain': 'etoote.com'
    },
    {
        'visitNum': 10,
        'siteDomain': 'bizport.cn'
    },
    {
        'visitNum': 9,
        'siteDomain': 'teddymobile.cn'
    },
    {
        'visitNum': 9,
        'siteDomain': 'tencent-cloud.net'
    },
    {
        'visitNum': 9,
        'siteDomain': 'gtimg.com'
    },
    {
        'visitNum': 9,
        'siteDomain': 'fbcdn.net'
    },
    {
        'visitNum': 8,
        'siteDomain': 'tuniu.cn'
    },
    {
        'visitNum': 8,
        'siteDomain': 'wuuxiang.com'
    },
    {
        'visitNum': 8,
        'siteDomain': 'edu.cn'
    },
    {
        'visitNum': 8,
        'siteDomain': 'bytedance.com'
    },
    {
        'visitNum': 8,
        'siteDomain': 'gtimg.cn'
    },
    {
        'visitNum': 7,
        'siteDomain': 'ipv4only.arpa'
    },
    {
        'visitNum': 7,
        'siteDomain': 'pp.cn'
    },
    {
        'visitNum': 7,
        'siteDomain': 'getui.com'
    },
    {
        'visitNum': 7,
        'siteDomain': 'crashlytics.com'
    },
    {
        'visitNum': 7,
        'siteDomain': 'fraudmetrix.cn'
    },
    {
        'visitNum': 6,
        'siteDomain': 'kuaishou.com'
    },
    {
        'visitNum': 6,
        'siteDomain': 'host.ykd'
    },
    {
        'visitNum': 6,
        'siteDomain': 'googleadservices.com'
    },
    {
        'visitNum': 6,
        'siteDomain': 'topeffects.cn'
    },
    {
        'visitNum': 6,
        'siteDomain': 'iqiyi.com'
    },
    {
        'visitNum': 6,
        'siteDomain': 'com.hk'
    },
    {
        'visitNum': 6,
        'siteDomain': 'vivo.com.cn'
    },
    {
        'visitNum': 6,
        'siteDomain': 'ctrip.com'
    },
    {
        'visitNum': 5,
        'siteDomain': 'ytimg.com'
    },
    {
        'visitNum': 5,
        'siteDomain': 'xdrig.com'
    },
    {
        'visitNum': 5,
        'siteDomain': 'ampproject.org'
    },
    {
        'visitNum': 5,
        'siteDomain': 'miui.com'
    },
    {
        'visitNum': 5,
        'siteDomain': 'ixigua.com'
    },
    {
        'visitNum': 5,
        'siteDomain': 'booking.com'
    },
    {
        'visitNum': 5,
        'siteDomain': 'mipcdn.com'
    },
    {
        'visitNum': 5,
        'siteDomain': 'googleusercontent.com'
    },
    {
        'visitNum': 5,
        'siteDomain': 'com.my'
    },
    {
        'visitNum': 5,
        'siteDomain': 'shuzilm.cn'
    },
    {
        'visitNum': 5,
        'siteDomain': 'qiniucdn.com'
    },
    {
        'visitNum': 5,
        'siteDomain': 'kuaidi.com'
    },
    {
        'visitNum': 5,
        'siteDomain': 'samsungapps.com'
    },
    {
        'visitNum': 5,
        'siteDomain': 'wandoujia.com'
    },
    {
        'visitNum': 5,
        'siteDomain': 'kuaidi100.com'
    },
    {
        'visitNum': 4,
        'siteDomain': 'youtube.com'
    },
    {
        'visitNum': 4,
        'siteDomain': 'gvt2.com'
    },
    {
        'visitNum': 4,
        'siteDomain': 'currencyrate.today'
    },
    {
        'visitNum': 4,
        'siteDomain': 'weixinbridge.com'
    },
    {
        'visitNum': 4,
        'siteDomain': 'line-scdn.net'
    },
    {
        'visitNum': 4,
        'siteDomain': 'iqiyipic.com'
    },
    {
        'visitNum': 4,
        'siteDomain': 'mmstat.com'
    },
    {
        'visitNum': 4,
        'siteDomain': 'com.au'
    },
    {
        'visitNum': 4,
        'siteDomain': 'jd.com'
    },
    {
        'visitNum': 4,
        'siteDomain': 'startappservice.com'
    },
    {
        'visitNum': 4,
        'siteDomain': 'jiangduoduo.com'
    },
    {
        'visitNum': 4,
        'siteDomain': 'alicdn.com'
    },
    {
        'visitNum': 4,
        'siteDomain': 'go2map.com'
    },
    {
        'visitNum': 4,
        'siteDomain': 'gvt1.com'
    },
    {
        'visitNum': 4,
        'siteDomain': 'omtrdc.net'
    },
    {
        'visitNum': 3,
        'siteDomain': 'd-ctrip.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'abbi.io'
    },
    {
        'visitNum': 3,
        'siteDomain': 'splkmobile.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'touchtype-fluency.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'cjcp.com.cn'
    },
    {
        'visitNum': 3,
        'siteDomain': 'line-apps.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'vmall.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'aicai.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'hotjob.cn'
    },
    {
        'visitNum': 3,
        'siteDomain': 'aiclk.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'swiftkey.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'gmail.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'samsung.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'fb.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'google-analytics.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'ccb.com.cn'
    },
    {
        'visitNum': 3,
        'siteDomain': 'kugou.com'
    },
    {
        'visitNum': 3,
        'siteDomain': 'criteo.net'
    },
    {
        'visitNum': 2,
        'siteDomain': 'flipboard.com'
    },
    {
        'visitNum': 2,
        'siteDomain': '55128.cn'
    },
    {
        'visitNum': 2,
        'siteDomain': 'thefatherofsalmon.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'toutiaocdn.cn'
    },
    {
        'visitNum': 2,
        'siteDomain': 'fyu.se'
    },
    {
        'visitNum': 2,
        'siteDomain': 'midosoo.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'chinanetcenter.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'sutuiapp.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'cnzz.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'vipkid.com.cn'
    },
    {
        'visitNum': 2,
        'siteDomain': 'getperx.net'
    },
    {
        'visitNum': 2,
        'siteDomain': 'googlesyndication.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'co.kr'
    },
    {
        'visitNum': 2,
        'siteDomain': 'adjust.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'sfx.ms'
    },
    {
        'visitNum': 2,
        'siteDomain': 'jpush.io'
    },
    {
        'visitNum': 2,
        'siteDomain': 'so.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'yzcdn.cn'
    },
    {
        'visitNum': 2,
        'siteDomain': 'cp121.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'kgimg.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'myoppo.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'galaxyappstore.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'sm.cn'
    },
    {
        'visitNum': 2,
        'siteDomain': 'naver.jp'
    },
    {
        'visitNum': 2,
        'siteDomain': 'carriersignal.info'
    },
    {
        'visitNum': 2,
        'siteDomain': 'criteo.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'ykimg.com'
    },
    {
        'visitNum': 2,
        'siteDomain': 'mgtv.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'tmall.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'samsungdm.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'wdjimg.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'hao123img.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'rayjump.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'miaopai.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'chinaz.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'zhsho.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'lu.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'cebbank.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'pingan.com.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'samsungosp.com.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'webvisor.org'
    },
    {
        'visitNum': 1,
        'siteDomain': 'hao315.tv'
    },
    {
        'visitNum': 1,
        'siteDomain': 'sanyiwangluo.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'kuwo.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'chrome.com'
    },
    {
        'visitNum': 1,
        'siteDomain': '17zuoye.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'ip6.arpa'
    },
    {
        'visitNum': 1,
        'siteDomain': 'sogouzhuyin.com'
    },
    {
        'visitNum': 1,
        'siteDomain': '720yun.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'haohaoxiu.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'pcauto.com.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'amazonaws.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'pps.tv'
    },
    {
        'visitNum': 1,
        'siteDomain': 'url.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'hudongcdn.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'scdn.co'
    },
    {
        'visitNum': 1,
        'siteDomain': 'fyyy2.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'liebao.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'miibeian.gov.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'aliapp.org'
    },
    {
        'visitNum': 1,
        'siteDomain': 'microfun.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'irs01.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'abchina.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'qianqian.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'demdex.net'
    },
    {
        'visitNum': 1,
        'siteDomain': 'ireader.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'beian.gov.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'scorecardresearch.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'yundaex.us'
    },
    {
        'visitNum': 1,
        'siteDomain': 'miitbeian.gov.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'jiguang.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'sinosig.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'xy1212.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'cmbchina.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'hongfans.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'dianping.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'alipayobjects.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'stackpathcdn.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'googletagservices.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'adobedtm.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'uczzd.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'pubmatic.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'jsdelivr.net'
    },
    {
        'visitNum': 1,
        'siteDomain': 'anquan.org'
    },
    {
        'visitNum': 1,
        'siteDomain': 'ggpht.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'line.me'
    },
    {
        'visitNum': 1,
        'siteDomain': 'bootcss.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'xiangrikui.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'avlyun.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'sgs.gov.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'myapp.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'huilvku.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'qhbtv.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'linecorp.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'xmcdn.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'sinaimg.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'zhulang.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'autohome.com.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'alibaba.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'apple.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'suning.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'umeng.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'dbankcdn.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'xiaomi.net'
    },
    {
        'visitNum': 1,
        'siteDomain': 'eebbk.net'
    },
    {
        'visitNum': 1,
        'siteDomain': 'kinky-mothers.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'cardoor.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'xsme.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': '00bx.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'taihe.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'baidustatic.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'oupeng.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'tanx.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'sznet110.gov.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'game-mode.net'
    },
    {
        'visitNum': 1,
        'siteDomain': 'ilincar.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'yandex.ru'
    },
    {
        'visitNum': 1,
        'siteDomain': 'meitudata.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'yhd.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'kaola.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'easytomessage.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'smardroid.com'
    },
    {
        'visitNum': 1,
        'siteDomain': '163.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'pgzs.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'tclclouds.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'vzhifu.net'
    },
    {
        'visitNum': 1,
        'siteDomain': 'youku.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'gai2789.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': '1sapp.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'boc.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'nuomi.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'aliyun-inc.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'pingan.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'testinsec.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'baifubao.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'tcloudfamily.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'gome.com.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'google.cn'
    },
    {
        'visitNum': 1,
        'siteDomain': 'chinaquest.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'zhcw.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'lfengmobile.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'ccb.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'ippzone.com'
    },
    {
        'visitNum': 1,
        'siteDomain': 'toutiao.com'
    }],
    'sourceLevel': [{
        'msisdn': '60163285766',
        'visitNum': 3322,
        'visitTotal': 175
    },
    {
        'msisdn': '8613919930945',
        'visitNum': 2400,
        'visitTotal': 109
    },
    {
        'msisdn': '8613997246600',
        'visitNum': 550,
        'visitTotal': 57
    },
    {
        'msisdn': '8617794740171',
        'visitNum': 37,
        'visitTotal': 12
    },
    {
        'msisdn': '8618297177354',
        'visitNum': 5,
        'visitTotal': 4
    },
    {
        'msisdn': '8618697151349',
        'visitNum': 3,
        'visitTotal': 2
    }],
    'lineData': [{
        'tipsText': '用户数：0</br>时间：2019-03-01</br>访问量：0',
        'name': '2019-03-01',
        'value': 0
    },
    {
        'tipsText': '用户数：0</br>时间：2019-03-02</br>访问量：0',
        'name': '2019-03-02',
        'value': 0
    },
    {
        'tipsText': '用户数：0</br>时间：2019-03-03</br>访问量：0',
        'name': '2019-03-03',
        'value': 0
    },
    {
        'tipsText': '用户数：0</br>时间：2019-03-04</br>访问量：0',
        'name': '2019-03-04',
        'value': 0
    },
    {
        'name': '2019-03-05',
        'value': 2758,
        'tipsText': '用户数：6</br>时间：2019-03-05</br>访问量：2758'
    },
    {
        'name': '2019-03-06',
        'value': 3559,
        'tipsText': '用户数：3</br>时间：2019-03-06</br>访问量：3559'
    }]
})
export default {
    selectKeyPersonTaskList: () => selectKeyPersonTaskList,
    selectTaskResult: () => selectTaskResult,
    selectByMsisdn: () => selectByMsisdn,
    selectKeyPersonStat: () => selectKeyPersonStat
}
