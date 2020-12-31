<template lang="html">
      <div class="ga-targetNumberManage">
            <el-row class="ga-targetNumberManage__form">
                <formComp :option="formOpt" ref="form"></formComp>
            </el-row>
            <el-row class="ga-targetNumberManage__table">
                <tableDemo :option="tableOpt"
                            :comSize="comSize"
                            @handleCurrentPageChange="handleCurrentPageChange"
                            @handleSizePageChange = "handleSizePageChange"></tableDemo>
            </el-row>
      </div>
</template>

<script>
//    import { forbiddenDate } from 'utils'
    import textComp from 'components/Form/text'
    import buttonComp from 'components/Form/button'
    import formComp from 'components/Form'
    import tableDemo from 'components/Table'
    import { businessAudit, businessAuditGetUser } from 'api/businessAudit'
    import { mapGetters } from 'vuex'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '/policeBusiness' : 'http://10.8.0.23:8080/policeBusiness'
    export default {
        name: 'targetNumberManage',
        data () {
            let me = this;
            return {
                owner: {
                    owner: ''
                },
                formHeight: '',
                formObj: {
                    page: 1,
                    rows: 10,
//                    owner: '',
                    taskUser: '',
                    queryStartTime: '',
                    queryEndTime: ''
                },
                formOpt: {
                    inline: true,
                    labelPos: 'left',
                    labelWidth: '80',
                    items: [
                        {
                            label: '开始时间',
                            type: 'date',
                            comOpt: {
                                id: 'start',
                                value: '',
                                disabled: false,
                                type: 'datetime'
                            }
                        },
                        {
                            label: '结束时间',
                            type: 'date',
                            comOpt: {
                                id: 'end',
                                value: '',
                                disabled: false,
                                type: 'datetime'
                            }
                        },
                        {
                            label: '任务使用人',
                            type: 'select',
                            comOpt: {
                                id: 'user',
                                value: '',
                                placeholder: '请选择任务使用人',
                                data: []
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '查询',
                                disabled: false,
                                click: me.fetchClick
                            }
                        }
                    ]
                },
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '任务名称', value: 'taskName', align: 'center', tooltip: true },
                        { name: '开始时间', value: 'beginTime', align: 'center', width: 150 },
                        { name: '结束时间', value: 'endTime', width: 150, align: 'center' },
                        { name: '任务状态', value: 'taskStatus', width: 100, align: 'center' },
                        { name: '目标号码数', value: 'taskTargetCount', width: 100, align: 'center' },
                        { name: '目标区域数', value: 'taskAreaCount', width: 100, align: 'center' },
                        { name: '绿色通道', value: 'green', width: 80, align: 'center' },
                        { name: '审批状态', value: 'approvelStatus', width: 100, align: 'center' },
                        { name: '使用人', value: 'taskUser', tooltip: true, align: 'center' },
                        {
                            name: '操作', value: '', width: 100, align: 'center', operations: [
                                { label: '查看', type: 'label', click: me.checkClick },
                                { label: '导出', type: 'label', click: me.exportData }]
                        }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                }
            }
        },
        props: {
            targetNumberHeight: {
                default: this.vsHeight
            }
        },
        components: {
            formComp,
            buttonComp,
            textComp,
            tableDemo
        },
        created () {
//            this.formObj.owner = this.userName;
//            this.owner.owner = this.userName;
        },
        mounted () {
            this.formHeight = this.$refs.form.getContainerHeight();
            this.getUser()
            this.fetchData();
        },
        computed: {
            comSize () {
                let a = this.targetNumberHeight
                if (typeof this.targetNumberHeight === 'undefined') {
                    return {
                        height: this.vsHeight - this.formHeight - 20
                    }
                } else {
                    return {
                        height: a - this.formHeight - 20
                    }
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'userName': 'global/userName'
            })
        },
        methods: {
            checkClick (row) {
                localStorage.setItem('businessAudit', JSON.stringify(row))
                localStorage.setItem('taskId', `T${row.taskBaseId}`)
                this.$router.push({
                    name: '审计查看',
                    params: {
                        taskId: `T${row.taskBaseId}`
                    }
                })
            },
            fetchClick () {
                let time = this.$refs.form.getValue();
                let timeRange = (new Date(time.end).getTime() - new Date(time.start).getTime()) / 1000;
//                let timeRange1 = Date.now() - new Date(time.end).getTime();
                if (time.end && !time.start) {
                    this.$alert('请选择开始时间', {
                        confirmButtonText: '确定'
                    });
                    return
                } else if (time.start && !time.end) {
                    this.$alert('请选择结束时间', {
                        confirmButtonText: '确定'
                    });
                    return
                } else if (timeRange < 0) {
                    this.$alert('开始时间不能大于结束时间', {
                        confirmButtonText: '确定'
                    });
                    return
                }
                this.formObj.queryStartTime = time.start
                this.formObj.queryEndTime = time.end
                this.formObj.taskUser = this.$refs.form.getValue().user
                this.formObj.page = 1;
                this.tableOpt.pageOpt.currentPage = 1;
                this.fetchData();
            },
            // 导出
            exportData (row) {
                let url = null;
                url = `audit_qh/audit_export_qh/${row.taskBaseId}`
                window.location = `${apiUrl}/${url}`
            },
            async fetchData () {
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                let resp = await businessAudit(this.formObj);
                if (resp && resp.rows) {
                    resp.rows.forEach((item) => {
                        if (+item.taskStatus === 1) {
                            item.taskStatus = '在控'
                            if (+item.isAdd === 0 && +item.approverStatus !== 3) {
                                item.taskStatus = '未生效'
                            }
                        } else if (+item.taskStatus === 2) {
                            item.taskStatus = '中止'
                        } else if (+item.taskStatus === 3) {
                            item.taskStatus = '过期'
                        }
                        item.approvelStatus = ''
                        item.green = ''
//                        function judgeStauts (a, b) {
//                            if (a === 0 && b === 0) {
//                                item.approvelStatus = ''
//                            }
//                        }
                        if (+item.greenChannel === 0) {
                            item.green = '否'
                        } else if (+item.greenChannel === 1) {
                            item.green = '是'
                        }
                        if (+item.isAdd === 0) {
                            if (+item.approverStatus === 0) {
                                item.approvelStatus = '未提交'
                            } else if (+item.approverStatus === 1) {
                                item.approvelStatus = '已提交'
                            } else if (+item.approverStatus === 2) {
                                item.approvelStatus = '未通过'
                            } else if (+item.approverStatus === 3) {
                                item.approvelStatus = '已通过'
                            }
                        }
                        if (+item.isAdd === 1) {
                            if (+item.approverStatus === 0) {
                                item.approvelStatus = '追加未提交'
                            } else if (+item.approverStatus === 1) {
                                item.approvelStatus = '追加已提交'
                            } else if (+item.approverStatus === 2) {
                                item.approvelStatus = '追加未通过'
                            } else if (+item.approverStatus === 3) {
                                item.approvelStatus = '追加已通过'
                            }
                        }
                    })
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total;
                    if (this.tableOpt.data.length) {
                        this.tableOpt.listLoading = false;
                    }
                    let me = this;
                    if (resp.rows.length === 0) {
                        setTimeout(() => {
                            me.tableOpt.listLoading = false;
                        }, 200)
                    }
                }
            },
            async getUser () {
                let resp = await businessAuditGetUser()
                if (resp && resp.rows) {
                    resp.rows.forEach((item) => {
                        item.value = item.userNick
                        item.name = item.userName + '-' + item.userNick
                    })
                    resp.rows.unshift({
                        name: '请选择',
                        value: ''
                    })
                    this.$nextTick(() => {
                        this.$refs.form.setItemData('user', resp.rows);
                    })
                }
            },
            handleCurrentPageChange (val) {
                this.formObj.page = val;
                this.fetchData();
            },
            handleSizePageChange (val) {
                this.formObj.rows = val;
                this.formObj.page = 1;
                this.tableOpt.pageOpt.currentPage = 1;
                this.fetchData();
            }
        }
    }
</script>

<style lang="postcss">
    .el-upload-list {
        /*background: red;*/
        height: 80px;
        overflow: auto !important;
    }

    .el-icon-document,
    .el-upload-list__item-name {
        color: #9AF5F6 !important;
    }

    .el-upload-list__item:hover {
        color: #9AF5F6 !important;
        background: #186986 !important;
    }

    .el-icon-close {
        color: #ffffff !important;
    }
    @component-namespace ga {
        @b targetNumberManage {
            @e form {}
            @e table {}
            @e dialog {
                margin-top: 5px;
            }
            @e addShow {
                @m active {
                    border: 1px solid #4081dc;
                }
                span {
                    display: inline-block;
                    padding: 5px 20px;
                    cursor: pointer;
                    /*border: 1px solid red;*/
                }
            }
        }
    }
</style>
