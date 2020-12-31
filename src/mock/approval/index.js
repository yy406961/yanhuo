import Mock from 'mockjs'
let getAllList = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': null,
    'rows': [
        {
            'greenChannel': 0,
            'taskBaseId': '256',
            'owner': 'owner',
            'approvalId': 'approvalId',
            'approverStatus': 0
        },
        {
            'greenChannel': 0,
            'taskBaseId': '257',
            'owner': 'owner',
            'approvalId': 'approvalId',
            'approverStatus': 1
        }
    ],
    'total': 1,
    'api_name': null
})
let getApproverInfo = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': null,
    'rows': [
        {
            'approver': '张三',
            'approverTime': '2019-04-17',
            'approverStatus': 2
        }
    ],
    'total': 1,
    'api_name': null
})
let setStatus = Mock.mock({
    'message': '审批通过！'
})
let getApprovalStaff = Mock.mock({
    'status': 200,
    'message': '查询成功',
    'data': {
        'first': [
            {
                'orgName': '机构一',
                'orgId': 123,
                'approval': [
                    { 'userName': '机构一一级a', 'userId': 101 },
                    { 'userName': '机构一一级b', 'userId': 102 }
                ]
            },
            {
                'orgName': '机构二',
                'orgId': 124,
                'approval': [
                    { 'userName': '机构二一级1', 'userId': 201 },
                    { 'userName': '机构二一级12', 'userId': 202 }
                ]
            }
        ],
        'second': [
            {
                'orgName': '机构一',
                'orgId': 123,
                'approval': [
                    { 'userName': '机构一二级a', 'userId': 103 },
                    { 'userName': '机构一二级b', 'userId': 104 }
                ]
            },
            {
                'orgName': '机构二',
                'orgId': 124,
                'approval': [
                    { 'userName': '机构二二级1', 'userId': 203 },
                    { 'userName': '机构二二级12', 'userId': 204 }
                ]
            }
        ]
    },
    'total': 1,
    'api_name': null
})
export default {
    getAllList: () => getAllList,
    getApproverInfo: () => getApproverInfo,
    setStatus: () => setStatus,
    getApprovalStaff: () => getApprovalStaff
}
