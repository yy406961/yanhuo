import Mock from 'mockjs'
let getYbrz = Mock.mock({
    'status': 200,
    'message': '获取本省和各地市名称成功',
    'data': {
        'appTop': [{
            'ordernum': 1.0,
            'value': 156681634,
            'name': 'HTTP上网',
            'date': '2019-03-07 11:00:00',
            'tipsText': 'app名称：HTTP上网</br>时间：2019-03-07 11:00:00</br>访问量：156681634'
        },
        {
            'ordernum': 2.0,
            'value': 60370512,
            'name': '微信',
            'date': '2019-03-07 11:00:00',
            'tipsText': 'app名称：微信</br>时间：2019-03-07 11:00:00</br>访问量：60370512'
        },
        {
            'ordernum': 3.0,
            'value': 31581848,
            'name': 'QQ',
            'date': '2019-03-07 11:00:00',
            'tipsText': 'app名称：QQ</br>时间：2019-03-07 11:00:00</br>访问量：31581848'
        },
        {
            'ordernum': 4.0,
            'value': 10248363,
            'name': '旺信',
            'date': '2019-03-07 11:00:00',
            'tipsText': 'app名称：旺信</br>时间：2019-03-07 11:00:00</br>访问量：10248363'
        },
        {
            'ordernum': 5.0,
            'value': 3176792,
            'name': '高德地图',
            'date': '2019-03-07 11:00:00',
            'tipsText': 'app名称：高德地图</br>时间：2019-03-07 11:00:00</br>访问量：3176792'
        },
        {
            'ordernum': 6.0,
            'value': 2936843,
            'name': '百度地图',
            'date': '2019-03-07 11:00:00',
            'tipsText': 'app名称：百度地图</br>时间：2019-03-07 11:00:00</br>访问量：2936843'
        },
        {
            'ordernum': 7.0,
            'value': 2868001,
            'name': '百度搜索',
            'date': '2019-03-07 11:00:00',
            'tipsText': 'app名称：百度搜索</br>时间：2019-03-07 11:00:00</br>访问量：2868001'
        },
        {
            'ordernum': 8.0,
            'value': 2110476,
            'name': '联合早报',
            'date': '2019-03-07 11:00:00',
            'tipsText': 'app名称：联合早报</br>时间：2019-03-07 11:00:00</br>访问量：2110476'
        },
        {
            'ordernum': 9.0,
            'value': 2014393,
            'name': '今日头条',
            'date': '2019-03-07 11:00:00',
            'tipsText': 'app名称：今日头条</br>时间：2019-03-07 11:00:00</br>访问量：2014393'
        },
        {
            'ordernum': 10.0,
            'value': 1881331,
            'name': '酷狗音乐',
            'date': '2019-03-07 11:00:00',
            'tipsText': 'app名称：酷狗音乐</br>时间：2019-03-07 11:00:00</br>访问量：1881331'
        }],
        'internetHotWord': [{
            'ordernum': 1.0,
            'value': 126,
            'name': '太原市途岳报价',
            'date': '2019-03-07 11:00:00',
            'tipsText': '热搜词名称：太原市途岳报价</br>时间：2019-03-07 11:00:00</br>访问量：126'
        },
        {
            'ordernum': 2.0,
            'value': 89,
            'name': '平法识图',
            'date': '2019-03-07 11:00:00',
            'tipsText': '热搜词名称：平法识图</br>时间：2019-03-07 11:00:00</br>访问量：89'
        },
        {
            'ordernum': 3.0,
            'value': 88,
            'name': '专科提前批需要什么条件',
            'date': '2019-03-07 11:00:00',
            'tipsText': '热搜词名称：专科提前批需要什么条件</br>时间：2019-03-07 11:00:00</br>访问量：88'
        },
        {
            'ordernum': 4.0,
            'value': 75,
            'name': '电气接线要求',
            'date': '2019-03-07 11:00:00',
            'tipsText': '热搜词名称：电气接线要求</br>时间：2019-03-07 11:00:00</br>访问量：75'
        },
        {
            'ordernum': 5.0,
            'value': 70,
            'name': '仙武帝尊',
            'date': '2019-03-07 11:00:00',
            'tipsText': '热搜词名称：仙武帝尊</br>时间：2019-03-07 11:00:00</br>访问量：70'
        },
        {
            'ordernum': 6.0,
            'value': 69,
            'name': '西宁网管局电话',
            'date': '2019-03-07 11:00:00',
            'tipsText': '热搜词名称：西宁网管局电话</br>时间：2019-03-07 11:00:00</br>访问量：69'
        },
        {
            'ordernum': 7.0,
            'value': 67,
            'name': '中国人会几个字',
            'date': '2019-03-07 11:00:00',
            'tipsText': '热搜词名称：中国人会几个字</br>时间：2019-03-07 11:00:00</br>访问量：67'
        },
        {
            'ordernum': 8.0,
            'value': 67,
            'name': '妈妈给同院混混操了小说',
            'date': '2019-03-07 11:00:00',
            'tipsText': '热搜词名称：妈妈给同院混混操了小说</br>时间：2019-03-07 11:00:00</br>访问量：67'
        },
        {
            'ordernum': 9.0,
            'value': 58,
            'name': '旅舍和宾馆的区别',
            'date': '2019-03-07 11:00:00',
            'tipsText': '热搜词名称：旅舍和宾馆的区别</br>时间：2019-03-07 11:00:00</br>访问量：58'
        },
        {
            'ordernum': 10.0,
            'value': 57,
            'name': '小动物图片',
            'date': '2019-03-07 11:00:00',
            'tipsText': '热搜词名称：小动物图片</br>时间：2019-03-07 11:00:00</br>访问量：57'
        }],
        'wallTop': [{
            'ordernum': 1.0,
            'value': 3409,
            'name': '世纪焦点',
            'date': '2019-03-07 11:00:00',
            'tipsText': '翻墙软件名称：世纪焦点</br>时间：2019-03-07 11:00:00</br>访问量：3409'
        },
        {
            'ordernum': 2.0,
            'value': 2703,
            'name': '德国之声',
            'date': '2019-03-07 11:00:00',
            'tipsText': '翻墙软件名称：德国之声</br>时间：2019-03-07 11:00:00</br>访问量：2703'
        },
        {
            'ordernum': 3.0,
            'value': 656,
            'name': '联合新闻网',
            'date': '2019-03-07 11:00:00',
            'tipsText': '翻墙软件名称：联合新闻网</br>时间：2019-03-07 11:00:00</br>访问量：656'
        },
        {
            'ordernum': 4.0,
            'value': 656,
            'name': '台湾联合新闻网',
            'date': '2019-03-07 11:00:00',
            'tipsText': '翻墙软件名称：台湾联合新闻网</br>时间：2019-03-07 11:00:00</br>访问量：656'
        },
        {
            'ordernum': 5.0,
            'value': 9,
            'name': '自由亚洲电台',
            'date': '2019-03-07 11:00:00',
            'tipsText': '翻墙软件名称：自由亚洲电台</br>时间：2019-03-07 11:00:00</br>访问量：9'
        },
        {
            'ordernum': 6.0,
            'value': 9,
            'name': 'BBC中文网',
            'date': '2019-03-07 11:00:00',
            'tipsText': '翻墙软件名称：BBC中文网</br>时间：2019-03-07 11:00:00</br>访问量：9'
        },
        {
            'ordernum': 7.0,
            'value': 6,
            'name': '看中国',
            'date': '2019-03-07 11:00:00',
            'tipsText': '翻墙软件名称：看中国</br>时间：2019-03-07 11:00:00</br>访问量：6'
        },
        {
            'ordernum': 8.0,
            'value': 6,
            'name': '中时电子报',
            'date': '2019-03-07 11:00:00',
            'tipsText': '翻墙软件名称：中时电子报</br>时间：2019-03-07 11:00:00</br>访问量：6'
        },
        {
            'ordernum': 9.0,
            'value': 3,
            'name': '华尔街日报',
            'date': '2019-03-07 11:00:00',
            'tipsText': '翻墙软件名称：华尔街日报</br>时间：2019-03-07 11:00:00</br>访问量：3'
        },
        {
            'ordernum': 10.0,
            'value': 3,
            'name': '路透中文网',
            'date': '2019-03-07 11:00:00',
            'tipsText': '翻墙软件名称：路透中文网</br>时间：2019-03-07 11:00:00</br>访问量：3'
        }],
        'internetRegion': [{
            'ordernum': 1.0,
            'value': 355140058,
            'name': '西宁市',
            'date': '2019-03-07 11:00:00',
            'tipsText': '地域名称：西宁市</br>时间：2019-03-07 11:00:00</br>访问量：355140058'
        },
        {
            'ordernum': 2.0,
            'value': 131317468,
            'name': '海东市',
            'date': '2019-03-07 11:00:00',
            'tipsText': '地域名称：海东市</br>时间：2019-03-07 11:00:00</br>访问量：131317468'
        },
        {
            'ordernum': 3.0,
            'value': 98102151,
            'name': '海西蒙古族藏族自治州',
            'date': '2019-03-07 11:00:00',
            'tipsText': '地域名称：海西蒙古族藏族自治州</br>时间：2019-03-07 11:00:00</br>访问量：98102151'
        },
        {
            'ordernum': 4.0,
            'value': 64078014,
            'name': '海南藏族自治州',
            'date': '2019-03-07 11:00:00',
            'tipsText': '地域名称：海南藏族自治州</br>时间：2019-03-07 11:00:00</br>访问量：64078014'
        },
        {
            'ordernum': 5.0,
            'value': 37491364,
            'name': '玉树藏族自治州',
            'date': '2019-03-07 11:00:00',
            'tipsText': '地域名称：玉树藏族自治州</br>时间：2019-03-07 11:00:00</br>访问量：37491364'
        },
        {
            'ordernum': 6.0,
            'value': 31692141,
            'name': '海北藏族自治州',
            'date': '2019-03-07 11:00:00',
            'tipsText': '地域名称：海北藏族自治州</br>时间：2019-03-07 11:00:00</br>访问量：31692141'
        },
        {
            'ordernum': 7.0,
            'value': 30660207,
            'name': '黄南藏族自治州',
            'date': '2019-03-07 11:00:00',
            'tipsText': '地域名称：黄南藏族自治州</br>时间：2019-03-07 11:00:00</br>访问量：30660207'
        },
        {
            'ordernum': 8.0,
            'value': 21993350,
            'name': '果洛藏族自治州',
            'date': '2019-03-07 11:00:00',
            'tipsText': '地域名称：果洛藏族自治州</br>时间：2019-03-07 11:00:00</br>访问量：21993350'
        }],
        'internetTrend': [{
            'value': 786414681,
            'name': '06日16时',
            'tipsText': '时间：2019-03-06 16:00:00</br>访问量：786414681'
        },
        {
            'value': 850006193,
            'name': '06日19时',
            'tipsText': '时间：2019-03-06 19:00:00</br>访问量：850006193'
        },
        {
            'value': 677129899,
            'name': '06日23时',
            'tipsText': '时间：2019-03-06 23:00:00</br>访问量：677129899'
        },
        {
            'value': 481770062,
            'name': '07日00时',
            'tipsText': '时间：2019-03-07 00:00:00</br>访问量：481770062'
        },
        {
            'value': 146434996,
            'name': '07日05时',
            'tipsText': '时间：2019-03-07 05:00:00</br>访问量：146434996'
        },
        {
            'value': 570901431,
            'name': '07日08时',
            'tipsText': '时间：2019-03-07 08:00:00</br>访问量：570901431'
        },
        {
            'value': 772501743,
            'name': '07日11时',
            'tipsText': '时间：2019-03-07 11:00:00</br>访问量：772501743'
        }],
        'websiteTop': [{
            'ordernum': 1.0,
            'value': 16950638,
            'name': 'txdwk.a.yximgs.com',
            'date': '2019-03-07 11:00:00',
            'tipsText': '网站名称：txdwk.a.yximgs.com</br>时间：2019-03-07 11:00:00</br>访问量：16950638'
        },
        {
            'ordernum': 2.0,
            'value': 13130186,
            'name': 'short.weixin.qq.com',
            'date': '2019-03-07 11:00:00',
            'tipsText': '网站名称：short.weixin.qq.com</br>时间：2019-03-07 11:00:00</br>访问量：13130186'
        },
        {
            'ordernum': 3.0,
            'value': 12645808,
            'name': 'umc.danuoyi.alicdn.com',
            'date': '2019-03-07 11:00:00',
            'tipsText': '网站名称：umc.danuoyi.alicdn.com</br>时间：2019-03-07 11:00:00</br>访问量：12645808'
        },
        {
            'ordernum': 4.0,
            'value': 11750308,
            'name': 'mtrace.qq.com',
            'date': '2019-03-07 11:00:00',
            'tipsText': '网站名称：mtrace.qq.com</br>时间：2019-03-07 11:00:00</br>访问量：11750308'
        },
        {
            'ordernum': 5.0,
            'value': 10717931,
            'name': 'szextshort.weixin.qq.com',
            'date': '2019-03-07 11:00:00',
            'tipsText': '网站名称：szextshort.weixin.qq.com</br>时间：2019-03-07 11:00:00</br>访问量：10717931'
        },
        {
            'ordernum': 6.0,
            'value': 9914787,
            'name': 'aliimg.a.yximgs.com',
            'date': '2019-03-07 11:00:00',
            'tipsText': '网站名称：aliimg.a.yximgs.com</br>时间：2019-03-07 11:00:00</br>访问量：9914787'
        },
        {
            'ordernum': 7.0,
            'value': 8060746,
            'name': 'dns.weixin.qq.com',
            'date': '2019-03-07 11:00:00',
            'tipsText': '网站名称：dns.weixin.qq.com</br>时间：2019-03-07 11:00:00</br>访问量：8060746'
        },
        {
            'ordernum': 8.0,
            'value': 7501208,
            'name': 'oth.eve.mdt.qq.com',
            'date': '2019-03-07 11:00:00',
            'tipsText': '网站名称：oth.eve.mdt.qq.com</br>时间：2019-03-07 11:00:00</br>访问量：7501208'
        },
        {
            'ordernum': 9.0,
            'value': 6789214,
            'name': 'ali2.a.yximgs.com',
            'date': '2019-03-07 11:00:00',
            'tipsText': '网站名称：ali2.a.yximgs.com</br>时间：2019-03-07 11:00:00</br>访问量：6789214'
        },
        {
            'ordernum': 10.0,
            'value': 6279402,
            'name': 'api.gifshow.com',
            'date': '2019-03-07 11:00:00',
            'tipsText': '网站名称：api.gifshow.com</br>时间：2019-03-07 11:00:00</br>访问量：6279402'
        }],
        'internetTime': [{
            'value': 146396730,
            'name': '03',
            'tipsText': '时间：2019-03-06 03:00:00</br>访问量：146396730'
        },
        {
            'value': 122466301,
            'name': '04',
            'tipsText': '时间：2019-03-06 04:00:00</br>访问量：122466301'
        },
        {
            'value': 310848463,
            'name': '07',
            'tipsText': '时间：2019-03-06 07:00:00</br>访问量：310848463'
        },
        {
            'value': 796280146,
            'name': '12',
            'tipsText': '时间：2019-03-06 12:00:00</br>访问量：796280146'
        },
        {
            'value': 760233519,
            'name': '14',
            'tipsText': '时间：2019-03-06 14:00:00</br>访问量：760233519'
        },
        {
            'value': 786414681,
            'name': '16',
            'tipsText': '时间：2019-03-06 16:00:00</br>访问量：786414681'
        },
        {
            'value': 850006193,
            'name': '19',
            'tipsText': '时间：2019-03-06 19:00:00</br>访问量：850006193'
        },
        {
            'value': 677129899,
            'name': '23',
            'tipsText': '时间：2019-03-06 23:00:00</br>访问量：677129899'
        }]
    },
    'rows': null,
    'total': null,
    'api_name': null
})
let getCityCode = Mock.mock({
    'status': 200,
    'message': '获取本省和各地市名称成功',
    'data': [{
        'name': '西宁市',
        'code': '630100'
    },
    {
        'name': '海东市',
        'code': '630200'
    },
    {
        'name': '海北藏族自治州',
        'code': '632200'
    },
    {
        'name': '黄南藏族自治州',
        'code': '632300'
    },
    {
        'name': '海南藏族自治州',
        'code': '632500'
    },
    {
        'name': '果洛藏族自治州',
        'code': '632600'
    },
    {
        'name': '玉树藏族自治州',
        'code': '632700'
    },
    {
        'name': '海西蒙古族藏族自治州',
        'code': '632800'
    }],
    'rows': null,
    'total': null,
    'api_name': null
})
export default {
    getYbrz: () => getYbrz,
    getCityCode: () => getCityCode
}