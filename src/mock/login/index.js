import Mock from 'mockjs';
// 模拟登录
let userLogin = Mock.mock({
    'status': 200,
    'message': '登录成功',
    'data': {
        'deptName': '公安厅',
        'gTitle': '湖南',
        'roleId': '58,60',
        'gTime': '2019-05-24 16:39:02',
        'userName': 'U123',
        'homeInfo': '湖南社会安全实验平台',
        'userId': 29,
        'orgId': '0002',
        'gMapCenter': [112.978, 28.195],
        'gMapCenterRvrovice': [112.913, 28.264],
        'home': '',
        'gheatMapPointSize': 3,
        'userNick': '测试1',
        'gMapKey': 'hunan'
    },
    'rows': null,
    'total': null
});
let getProvinceConfig = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        'now': new Date(),
        'isNeedUkey': null,
        'homeInfo': '湖南社会安全实验平台'
    },
    'rows': null,
    'total': null,
    'api_name': null
})
let userExit = Mock.mock({
    'status': 200,
    'message': '退出成功',
    'data': null,
    'rows': null,
    'total': null,
    'api_name': null
})
export default {
    userLogin: () => userLogin,
    getProvinceConfig: () => getProvinceConfig,
    userExit: () => userExit
};
