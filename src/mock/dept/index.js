import Mock from 'mockjs'
let addDeptTree = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': [{
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'deptId': '0001',
        'deptName': '宁夏公安aaaa',
        'deptSupId': '0000',
        'deptSupname': null,
        'deptSupRank': null,
        'deptRank': 0,
        'orgId': null,
        'description': null,
        'deptTreeId': null,
        'type': 0,
        'disabled': false,
        'depts': null
    }],
    'rows': null,
    'total': null,
    'api_name': null
})
let selectDept = Mock.mock({
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
        'deptId': '0001',
        'deptName': '宁夏公安aaaa',
        'deptSupId': '0000',
        'deptSupname': null,
        'deptSupRank': null,
        'deptRank': 0,
        'orgId': null,
        'description': '',
        'deptTreeId': null,
        'type': 0,
        'disabled': false,
        'depts': null
    }, {
        'page': 1,
        'rows': 100000000,
        'start': 0,
        'offset': 0,
        'sort': '',
        'order': 'desc',
        'queryStartTime': '',
        'queryEndTime': '',
        'ids': '',
        'deptId': '00010001',
        'deptName': '0002',
        'deptSupId': '0001',
        'deptSupname': '宁夏公安aaaa',
        'deptSupRank': 0,
        'deptRank': 1,
        'orgId': null,
        'description': '机动部门',
        'deptTreeId': null,
        'type': 0,
        'disabled': false,
        'depts': null
    }],
    'total': 2,
    'api_name': null
})
let addDept = Mock.mock({
    'status': 201,
    'Fmessage': '添加成功',
    'data': null,
    'rows': null,
    'total': null,
    'api_name': null
})
let deleteDept = Mock.mock({
    'status': 201,
    'message': '删除成功',
    'data': null,
    'rows': null,
    'total': null,
    'api_name': null
})
export default {
    addDeptTree: () => addDeptTree,
    selectDept: () => selectDept,
    addDept: () => addDept,
    deleteDept: () => deleteDept
}
