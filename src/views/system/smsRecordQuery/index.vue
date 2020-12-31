<template>
    <div class="smsPlatform">
        <formComp :option="smsForm" ref="smsForm"></formComp>
        <tableComp
            :option="smsTable"
            :comSize="tableHeight"
            @handleCurrentPageChange="currentPage"
            @handleSizePageChange="sizePage">
        </tableComp>
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
                smsTable: {
                    listLoading: false,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '接收短信号码', value: 'userPhone', width: 150, align: 'center' },
                        { name: '接收人', value: 'userName', width: 120, align: 'center' },
                        { name: '发送时间', value: 'smsSendTime', width: 140, align: 'center' },
                        { name: '任务名称', value: 'taskBaseInfoName', width: 150, align: 'center' },
                        { name: '告警名称', value: 'alarmName', width: 100, align: 'center' },
                        { name: '告警类型', value: 'alarmTypeName', width: 180, align: 'center' },
                        { name: '短信内容', value: 'smsContent', tooltip: true, align: 'center' }
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
                    labelWidth: 105,
                    btnPos: 'right',
                    items: [
                        {
                            label: '接收人',
                            type: 'text',
                            comOpt: {
                                id: 'userName',
                                width: 180,
                                value: ''
                            }
                        },
                        {
                            label: '接收短信号码',
                            type: 'text',
                            comOpt: {
                                id: 'userPhone',
                                width: 180,
                                value: ''
                            }
                        },
                        {
                            label: '任务名称',
                            type: 'text',
                            comOpt: {
                                id: 'taskBaseInfoName',
                                width: 180,
                                value: ''
                            }
                        },
                        {
                            label: '告警类型',
                            type: 'select',
                            comOpt: {
                                id: 'alarmTypeName',
                                width: 180,
                                value: '',
                                data: []
                            }
                        },
                        {
                            label: '起止时间',
                            type: 'date',
                            comOpt: {
                                id: 'queryStartTime',
                                width: 180,
                                value: new Date(),
                                type: 'datetime',
                                pickOptions: {
                                }
                            }
                        },
                        {
                            label: '至',
                            type: 'date',
                            comOpt: {
                                id: 'queryEndTime',
                                width: 180,
                                value: new Date() - 0 + (1000 * 60 * 60 * 24 * 1),
                                type: 'datetime',
                                pickOptions: {
                                }
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
                                    this.user = this.$refs.smsForm.getValue().userName
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
            }
        },
        mounted () {
            this.getAlarmType();
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
            // 请求下拉框数据
            getAlarmType () {
                ajax.get('common/dictionary/alarmType')
                    .then(resp => {
                        let arr = [];
                        let obj = {};
                        obj.name = '请选择';
                        obj.value = '';
                        arr.push(obj)
                        resp.rows.forEach(item => {
                            let obj = {};
                            obj.name = item.compValue;
                            obj.value = item.compValue;
                            arr.push(obj)
                        })
                        this.smsForm.items[3].comOpt.data = arr
                    })
                    .catch(err => console.log(err))
            },
            // 请求列表
            getSmsList (page, rows) {
                this.smsTable.pageOpt.pageSize = rows
                this.smsTable.pageOpt.currentPage = page
                let obj = this.$refs.smsForm.getValue();
                this.smsTable.data = [];
                if (!obj.queryStartTime) {
                    this.$alert('请输入开始时间')
                    return
                }
                this.smsTable.listLoading = true
                ajax.post('smsPlatformConf/selectContentByPage', {
                    page,
                    rows,
                    userName: obj.userName,
                    userPhone: obj.userPhone,
                    taskBaseInfoName: obj.taskBaseInfoName,
                    alarmTypeName: obj.alarmTypeName,
                    queryStartTime: obj.queryStartTime,
                    queryEndTime: obj.queryEndTime
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