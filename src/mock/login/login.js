import Mock from 'mockjs';

// 模拟登录
let userLogin = Mock.mock({
    status: 200,
    message: '登录成功',
    data: {
        deptName: '宁夏公安aaaa',
        gTitle: '海南',
        roleId: '58,60',
        gTime: '2019-03-22 16:39:02',
        userName: 'U123',
        homeInfo: '青海社会安全实验平台',
        userId: 72,
        orgId: '0002',
        gMapCenter: [110.262173, 19.9146],
        gMapCenterRvrovice: [110.432173, 19.914],
        home: '',
        gheatMapPointSize: 3,
        userNick: '测试1',
        gMapKey: 'haikou'
    },
    rows: null,
    total: null
});

export default {
    userLogin: () => userLogin
};
