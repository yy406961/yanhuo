import Mock from 'mockjs'
let taskConfInitList = Mock.mock({
    'data': {
        'alaInfoList|9': [
            {}
        ],
        'funInfoList|12': [
            {}
        ],
        'sysInArea': [
            {
                'areaName': '',
                'baseId': ''
            }
        ]
    },
    'message': '查询成功！',
    'status': '200'
})
let taskListInitList = Mock.mock({
    'message': '查询成功！',
    'rows|6-20': [
        {
            'beginTime': '@date',
            'count|1-10': 27543,
            'endTime': '@date',
            'owner': '@name()',
            'stopTime': '@datetime',
            'sts|0-2': 65610,
            'taskAreaCount|1-6': 88306,
            'taskBaseId': '@id()',
            'taskName|1': [
                'xxx维稳事件',
                'xxx群体性事件',
                'xxx盗窃案',
                'xxx抢劫案'
            ],
            'taskTargetCount|2-20': 36584
        }
    ],
    'status': 200
})

let taskFunListInitList = Mock.mock({
    'status': 200,
    'total': 29,
    'rows|20': [
        {
            'alarmCount|1-10': 1,
            'alarmStatus|+1': [
                '1', '1', '1',
                '1', '1', '1', '1', '1', '1', '1',
                '1', '1', '1', '1', '0', '0', '0',
                '0', '0', '0', '0', '0', '0', '0',
                '0', '0', '0', '0', '0', '0', '0', '0'
            ],
            'alarmTaskIdLis': [60, 80, 100],
            'alarmTaskIds': '10101,10102,10103',
            'alarmTime': '@date',
            'approverStatus|+1': ['0', '3'],
            'dictType|+1': [
                'funType', 'funType', 'funType',
                'funType', 'funType', 'alarmType', 'alarmType', 'alarmType',
                'alarmType', 'alarmType', 'alarmType', 'alarmType', 'alarmType',
                'alarmType', 'funType', 'funType', 'funType', 'funType', 'funType',
                'importantArea', 'funType', 'funType', 'funType', 'funType',
                'funType', 'funType', 'funType', 'funType', 'funType', 'funType'
            ],
            'funStatus|+1': [
                '1', '1', '1',
                '1', '1', '0', '0', '0', '0', '0', '0', '0',
                '0', '0', '1', '1', '1', '1', '1', '1', '1',
                '1', '1', '1', '1', '1', '1', '0', '1', '0',
                '1', '0', '0', '1'
            ],
            'location': {
                'alarmArea': [
                    {
                        'latitude|38.8': 1,
                        'longtitude|106.8': 1,
                        'radius': 10000
                    }
                ],
                'alarmMsisdn|2': [
                    {
                        'goalLocations|3': [
                            {
                                'count|1-100': 1,
                                'goalArriveTime': '@date',
                                'latitude|38.8': 1,
                                'locationCname|+1': ['火车站', '飞机场', '公交站'],
                                'longtitude|106.8': 1
                            }
                        ],
                        'msisdn|+1': 8615000000001
                    }
                ],
                'location|2': [
                    {
                        'areaId|+1': 20,
                        'importAreaId|+1': 1,
                        'importAreaName|+1': ['某区域A', '某区域B'],
                        'location|6': [
                            {
                                'latitude|38.8': 1,
                                'longtitude|106.8': 1,
                                'radius': 10000
                            }
                        ],
                        'taskBaseId|+1': [29, 30]
                    }
                ]
            },
            'menuId|+1': [
                '80006', '111111111', '55555555555',
                '80004', '80005', '1', '3', '4', '6', '9', '2', '7', '8', '5',
                '90001', '90002', '90003', '90004', '90005', '90006', '80001',
                '80002', '80003', '70004', '30001', '30002', '30003', '30004',
                '30005', '60006', '60007', '60008', '60009', '80004'
            ],
            'menuName|+1': [
                '人物画像', '小众信源用户挖掘', '重点人小众信源挖掘',
                '涉藏人员分析', '涉疆人员分析', '特定人群进入重点区域预警',
                '特定人群集体关机预警', '重点人漫入/出现预警', '特定人群聚集预警',
                '重点区域人群异常预警', '重点人进入离开预警', '重点人实时跟踪预警',
                '重点人省内漫出预警', '重点人消失预警', '省内最新位置查询',
                '省内历史轨迹查询', '全国最新位置查询', '全国历史轨迹查询',
                '省内机身码查询', '全国机身码查询', '外部重点人挖掘',
                '内部重点人分析', '组间联系人挖掘', '重点区域实时监测',
                '目标话单查询', '目标事件查询', '人物画像短信查询',
                '短信内容逻辑查询', '目标短信查询', '群发短信查询',
                '有害短信溯源分析', '订票短信查询', '即时通讯类APP应用分析',
                '涉疆涉藏人员分析'
            ],
            'overStatus': 1,
            'path|+1': [
                '/relationAnalysis/newFigurePortrait', '/informationSource', '/inforUserSource',
                '/situationAnalysis/minoritySZPage', '/situationAnalysis/minoritySJPage',
                '', '', '', '', '', '', '', '', '', '/wholeNetAnalysis/partRealTimeSearch',
                '/wholeNetAnalysis/partHistorySearch', '/wholeNetAnalysis/nationRealTimeSearch',
                '/wholeNetAnalysis/nationHistorySearch', '/wholeNetAnalysis/partPsNumSearch',
                '/wholeNetAnalysis/nationPsNumSearch', '/relationAnalysis/outImportantContact',
                '/relationAnalysis/insideImportantContact', '/relationAnalysis/interblockContact',
                '', '/dataSearch/targetTicketQuery', '/dataSearch/targetEventQuery',
                '/msgAnalysis/personnalPortrayal', '/msgAnalysis/msgLogic', '/msgAnalysis/targetMsg',
                '/msgAnalysis/msgGroupQuery', '/msgAnalysis/harmMsg', '/msgAnalysis/bookSMSQuery',
                '/relationAnalysis/inTimeAppAnalysis', '/situationAnalysis/minorityStatePage'
            ],
            'queryEndTime': '@date',
            'queryStartTime': '@date',
            'sort': '',
            'rows': 10,
            'taskBaseId|100-1000': 1
        }
    ],
    'message': '\u67e5\u8be2\u6210\u529f\uff01'
})
export default {
    taskConfInit: () => taskConfInitList,
    taskListInit: () => taskListInitList,
    taskFunListInit: () => taskFunListInitList
}
