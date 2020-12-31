<template>
    <div class="smsPlatform">
        <formComp :option="smsForm" ref="smsForm"></formComp>
        <tableComp
            :option="smsTable"
            :comSize="tableHeight"
            @handleCurrentPageChange="currentPage"
            @handleSizePageChange="sizePage">
        </tableComp>
        <sysDialog
            v-if="dialogVisible"
            :title="dialogTitle"
            size="large"
            :dialogVisible="dialogVisible"
            @change="dialogChange"
            :showCancel="false"
            :okFn="comfirmFun"
        >
            <p>用户{{userName}}发送短信{{suffix}}</p>
            <p v-if="!showSpan" class="sapnP">
                <span>手机号码：</span>
                <span class="sapnContent">{{phoneNumber}}</span>
                <span>短信停止发送时间：</span>
                <span class="sapnContent">{{stopTime}}</span>
            </p>
            <formComp :option="dialogForm" ref="dialogForm" v-else></formComp>
            <tableComp :option="dialogTable" :comSize="dialogHeight" ref="dialogTable"
                       @handleSelectionChange="selectionChange"></tableComp>
        </sysDialog>
    </div>
</template>

<script>
    import tableComp from 'components/Table'
    import formComp from 'components/Form'
    import { mapGetters } from 'vuex'
    import sysDialog from 'components/common/dialog'
    import { ajax } from 'common'
    export default {
        data () {
            return {
                user: '',
                // 弹窗内容相关
                dialogTitle: '',
                userName: '',
                userId: '',
                suffix: '',
                dialogVisible: false,
                phoneNumber: '',
                stopTime: '',
                showSpan: false,
                // 勾选的数据集合
                selectArr: [],
                // 弹窗表格
                dialogTable: {
                    listLoading: false,
                    columnView: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '告警名称', value: 'alarmName', width: 200, align: 'center' },
                        { name: '告警类型', value: 'alarmTypeName', width: 240, align: 'center' },
                        { name: '告警任务到期时间', value: 'taskEndTime', width: 280, align: 'center' },
                        { name: '告警所属任务', value: 'taskBaseInfoName', width: 200, align: 'center' },
                        { name: '是否发送短信', value: 'isSend', width: 175, align: 'center' }
                    ],
                    columnConfig: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '告警名称', value: 'alarmName', width: 200, align: 'center' },
                        { name: '告警类型', value: 'alarmTypeName', width: 240, align: 'center' },
                        { name: '告警任务到期时间', value: 'taskEndTime', width: 280, align: 'center' },
                        { name: '告警所属任务', value: 'taskBaseInfoName', width: 200, align: 'center' },
                        { name: '', value: 'selection', width: 175, align: 'center' }
                    ],
                    column: [],
                    data: []
                },
                dialogForm: {
                    inline: true,
                    items: [
                        {
                            label: '手机号码：',
                            type: 'text',
                            comOpt: {
                                value: '',
                                width: 180,
                                id: 'userPhone'
                            }
                        },
                        {
                            label: '短信停止发送时间：',
                            type: 'date',
                            comOpt: {
                                id: 'smsSendEndtime',
                                width: 180,
                                value: new Date() - 0 + (1000 * 60 * 60 * 24 * 7),
                                type: 'datetime',
                                pickOptions: {
                                }
                            }
                        }
                    ]
                },
                smsTable: {
                    listLoading: false,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '用户名', value: 'userName', width: 150, align: 'center' },
                        { name: '角色', value: 'userRoleName', width: 120, align: 'center' },
                        { name: '所属机构部门', value: 'userDeptName', align: 'center' },
                        { name: '警号或编号', value: 'userNum', width: 150, align: 'center' },
                        { name: '告警任务数', value: 'alarmTaskNum', width: 100, align: 'center' },
                        // { name: '生效日期', value: 'effectiveDate', width: 180, align: 'center' },
                        { name: '累计发送短信条数', value: 'sendSmsNum', width: 120, align: 'center' },
                        { name: '操作', value: '', width: 150, align: 'center', operations: [
                            {
                                label: '查看',
                                type: 'label',
                                click: (e) => {
                                    this.dialogVisible = true
                                    this.userName = e.userName
                                    this.userId = e.userId
                                    this.suffix = '查看'
                                    this.dialogTitle = '短信发送信息查看'
                                    // this.phoneNumber = e.userPhone
                                    this.showSpan = false
                                    this.dialogTable.column = this.dialogTable.columnView
                                    this.dialogTable.data = [];
                                    this.examineSms(e.userId);
                                }
                            },
                            {
                                label: '配置',
                                type: 'label',
                                click: (e) => {
                                    this.dialogVisible = true
                                    this.userName = e.userName
                                    this.userId = e.userId
                                    this.suffix = '配置'
                                    this.dialogTitle = '短信发送配置'
                                    this.showSpan = true
                                    this.dialogTable.column = this.dialogTable.columnConfig
                                    this.dialogTable.data = [];
                                    this.configSms(e.userId);
                                }
                            }
                        ] }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10,
                        currentPage: 1,
                        total: 0
                    }
                },
                smsForm: {
                    inline: true,
                    // labelWidth: 105,
                    labelPos: 'left',
                    items: [
                        {
                            label: '用户名或警号',
                            type: 'text',
                            comOpt: {
                                id: 'userName',
                                width: 160,
                                value: '',
                                placeholder: '请输入用户名或警号'
                            }
                        }
                    ],
                    btns: [
                        {
                            comOpt: {
                                type: 'button',
                                value: '查询',
                                width: 100,
                                click: () => {
                                    let userValue = this.$refs.smsForm.getValue().userName;
                                    userValue = userValue.replace(/(^\s*)|(\s*$)/g, '');
                                    if (!/^[A-Za-z0-9\u4e00-\u9fa5-_]+$/.test(userValue) && userValue.length !== 0) {
                                        this.$alert('请输入数字,字母或汉字')
                                        return
                                    } else if (userValue.length > 20) {
                                        this.$alert('输入内容过长')
                                        return
                                    } else {
                                        this.user = userValue
                                    }
                                    this.getSmsList(1, 10)
                                }
                            }
                        }
                    ]
                }
            }
        },
        computed: {
            ...mapGetters({
                visualHeight: 'global/visualHeight'
            }),
            tableHeight () {
                return {
                    height: this.visualHeight - 70
                }
            },
            dialogHeight () {
                return {
                    height: this.visualHeight - 310
                }
            }
        },
        mounted () {
            this.getSmsList(1, 10)
        },
        methods: {
            dialogChange (val) {
                this.dialogVisible = val;
            },
            // 分页
            currentPage (val) {
                this.getSmsList(val, this.smsTable.pageOpt.pageSize)
            },
            sizePage (val) {
                this.getSmsList(1, val)
            },
            // 请求列表
            getSmsList (page, rows) {
                this.smsTable.pageOpt.pageSize = rows
                this.smsTable.pageOpt.currentPage = page
                this.smsTable.data = [];
                this.smsTable.listLoading = true
                ajax.post('smsPlatformConf/selectUserByPage', {
                    page,
                    rows,
                    userName: this.user
                })
                    .then(resp => {
                        this.smsTable.listLoading = false
                        this.smsTable.data = resp.rows
                        this.smsTable.pageOpt.total = resp.total
                    })

                    .catch(err => {
                        console.log(err)
                        this.smsTable.listLoading = false
                    })
            },
            // 查看按钮
            examineSms (userId) {
                this.stopTime = '';
                this.phoneNumber = '';
                ajax.post('smsPlatformConf/selectConfInfoByUser', {
                    userId
                })
                    .then(resp => {
                        if (resp.data && resp.data.length) {
                            resp.data.forEach(item => {
                                if (Number(item.isSend) === 1) {
                                    item.isSend = '是'
                                } else {
                                    item.isSend = '否'
                                }
                                return item
                            })
                            this.stopTime = resp.data[0].smsSendEndtime;
                            this.phoneNumber = resp.data[0].userPhone;
                        }
                        this.dialogTable.data = resp.data
                    })
                    .catch(err => console.log(err))
            },
            // 配置按钮
            configSms (userId) {
                ajax.get('smsPlatformConf/selectConfByUser?userId=' + userId)
                    .then(resp => {
                        let dataArr = [];
                        // 添加indexs参数，匹配勾选的数据 - isSend
                        if (resp.data && resp.data.confData.length) {
                            dataArr = resp.data.confData.map((item, index) => {
                                item.indexs = index
                                return item
                            })
                        }
                        this.dialogTable.data = dataArr
                        let row = []
                        dataArr.forEach((item, index) => {
                            if (item.isSend === 1) {
                                row.push(index)
                            }
                        })
                        this.$nextTick(() => {
                            this.$refs.dialogTable.handleToggleRowSelection(row, true)
                            this.dialogForm.items[1].comOpt.value = resp.data.smsSendEndtime;
                            this.$refs.dialogForm.setValue([
                                { id: 'userPhone', value: resp.data.userPhone }
                            ]);
                        })
                    })
                    .catch(err => console.log(err))
            },
            // 确认按钮 - 回调
            comfirmFun () {
                if (!this.showSpan) {
                    this.dialogVisible = false
                } else {
                    // 配置时发生请求
                    this.configSmsSure();
                }
            },
            // 勾选状态变化
            selectionChange (val) {
                this.selectArr = [];
                this.selectArr = val;
            },
            // 配置弹窗确定按钮
            configSmsSure () {
                // 进行参数处理 - isSend赋值
                let arr = [];
                let json = [];
                let userId = this.userId;
                let userName = this.userName;
                let userPhone = this.$refs.dialogForm.getValue().userPhone;
                // 去除手机号的前后空格
                userPhone = userPhone.replace(/(^\s*)|(\s*$)/g, '')
                // 验证手机号
                // if (!/^[1][3,4,7,8][0-9]{9}$/.test(userPhone)) {
                if (!/^(1[3,8][0-9]|14[4-9]|15[0-3,5-9]|166|17[0-8]|19[8-9])[0-9]{8}$/.test(userPhone)) {
                    this.$alert('请输入正确手机号')
                    return;
                }
                // 验证无误-关闭弹窗
                this.dialogVisible = false
                let smsSendEndtime = this.$refs.dialogForm.getValue().smsSendEndtime
                this.selectArr.forEach(item => {
                    arr.push(item.indexs)
                })
                json = this.dialogTable.data.map(item => {
                    item.isSend = arr.includes(item.indexs) ? 1 : 0
                    return item
                })
                // 转化为字符串
                json = JSON.stringify(json);
                ajax.post('smsPlatformConf/insertConfBatch', {
                    userId,
                    userName,
                    userPhone,
                    smsSendEndtime,
                    json
                })
                    .then(resp => {
                        if (resp.data && resp.data.length) {
                        }
                        this.dialogTable.data = resp.data
                        // 刷新列表
                        // this.user = '';
                        // this.getSmsList(1, 10)
                    })
                    .catch(err => console.log(err))
            }
        },
        components: {
            tableComp,
            formComp,
            sysDialog
        }
    }
</script>

<style>
    .smsPlatform {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
    }
    .sapnP {
        margin: 10px 0 10px 0;
    }
    .sapnContent {
        padding: 0 40px 0 20px;
    }
    .inputCon {
        width: 160px;
        margin-right: 20px;
        display: inline-block;
    }
</style>