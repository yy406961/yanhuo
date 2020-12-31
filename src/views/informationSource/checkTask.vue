<template lang="html">
      <!-- 查看任务弹框 -->
      <div class="ga-checkTask">
          <sysDialog size="large" class="ga-informationSource__dialog"
                   title="查看信源挖掘任务"
                   @change="dialogResultChange"
                   @openCallback="taskResultOpenCallBack"
                   :dialogVisible="show"
                   :okFn="okFn"
                   :cancleFn="cancleFn">
            <FormComp :option="taskformOptDialog" ref="taskForm"></FormComp>
            <tableComp :option = "tableOptTaskResult" :comSize="dailogTableHeight" class="ga-msgover__dialog--table"
                @handleCurrentPageChange="taskResultCurrentPageChange"
                @handleSizePageChange="taskResultSizePageChange">
            </tableComp>
        </sysDialog>
      </div>
</template>

<script>
import TableComp from 'components/Table'
import FormComp from 'components/Form'
import sysDialog from 'components/common/dialog'
import { ajax } from 'common'
import { mapGetters } from 'vuex'

// 任务状态
const TASK_STATUS = {
    OK: 2,
    ERROR: 1,
    SEARCH: 0
}

export default {
    data() {
        const me = this
        return {
            // 传给父组件的数据
            parentData: {
                show: false,
                taskId: '',
                startTime: '',
                endTime: '',
                inforsourceNum: 0
            },
            // 接口参数
            formObj: {
                taskName: '',
                rows: 10,
                page: 1,
                parentTaskId: ''
            },
            taskId: '',
            // 弹框相关
            show: false,
            taskformOptDialog: {
                inline: true,
                labelPos: 'right',
                labelWidth: '100',
                btnPos: 'right',
                items: [
                    {
                        label: '任务名称',
                        type: 'text',
                        comOpt: {
                            id: 'taskName',
                            value: '',
                            width: 400,
                            disabled: false
                        }
                    }
                ],
                btns: [
                    {
                        comOpt: {
                            id: 'query',
                            value: '查询',
                            width: 200,
                            disabled: false,
                            click: function() {
                                let str = me.$refs.taskForm.getValue().taskName
                                let recx = /^[0-9A-Za-z\u4e00-\u9fa5]{0,20}$/
                                // if (str.length > 20) {
                                //     me.$alert('录入字符最大长度不能超过20位！', {
                                //         confirmButtonText: '确定'
                                //     })
                                // }
                                if (!recx.test(str)) {
                                    me.$alert('请输入由0~20位汉字、字母、数字组成的的任务名称', {
                                        confirmButtonText: '确定'
                                    })
                                } else {
                                    // me.tableOptTaskResult.data = []
                                    me.tableOptTaskResult.data = []
                                    me.tableOptTaskResult.pageOpt.total = 0
                                    me.tableOptTaskResult.pageOpt.pageSize = 10
                                    me.tableOptTaskResult.pageOpt.currentPage = 1
                                    me.formObj.page = 1
                                    me.formObj.rows = 10
                                    me.formObj.taskName = str
                                    me.taskList()
                                }
                            }
                        }
                    }
                ]
            },
            tableOptTaskResult: {
                listLoading: false,
                stripe: false,
                highlightRow: true,
                column: [
                    { name: '序号', value: 'index', align: 'center', width: 60 },
                    { name: '任务名称', value: 'taskName', align: 'center' },
                    { name: '创建时间', value: 'createTime', align: 'center', width: 160 },
                    { name: '开始日期', value: 'startTime', align: 'center', width: 160 },
                    { name: '截止日期', value: 'endTime', align: 'center', width: 160 },
                    { name: '信源个数', value: 'inforsourceNum', align: 'center', width: 160 },
                    { name: '状态', value: 'statusStr', align: 'center', width: 100 },
                    {
                        name: '操作',
                        value: '',
                        align: 'center',
                        width: 100,
                        operations: [
                            {
                                label: '查看',
                                type: 'label',
                                callback: e => {
                                    if (e.status !== TASK_STATUS.OK) {
                                        return 'is-disabled'
                                    }
                                },
                                click: e => {
                                    if (e.status === TASK_STATUS.OK) {
                                        me.parentData.taskId = e.taskId
                                        me.parentData.startTime = e.startTime
                                        me.parentData.endTime = e.endTime
                                        me.parentData.taskName = e.taskName
                                        me.parentData.inforsourceNum = e.inforsourceNum
                                        me.parentData.taskName = e.taskName
                                        me.show = false
                                        me.$emit('closeDialog', me.parentData)
                                    }
                                }
                            },
                            {
                                label: '删除',
                                type: 'label',
                                text: '是否删除此任务？',
                                callback: e => {
                                    if (e.status === TASK_STATUS.SEARCH) {
                                        return 'is-disabled'
                                    }
                                },
                                click: e => {
                                    if (e.status !== TASK_STATUS.SEARCH) {
                                        this.taskId = e.taskId
                                        this.deleteTask()
                                    }
                                }
                            }
                        ]
                    }
                ],
                data: [],
                pagination: true,
                pageOpt: {
                    currentPage: 1,
                    pageSize: 10,
                    pageSizes: [10, 20, 30, 40, 50],
                    total: 0
                }
            }
        }
    },
    mounted() {},
    props: ['option'],
    computed: {
        ...mapGetters({
            visualHeight: 'global/visualHeight'
        }),
        dailogTableHeight() {
            return {
                // height: 380
                height: this.visualHeight * 0.8 - 130
            }
        },
        // 模块任务ID
        taskMainId() {
            return localStorage.getItem('taskId') || ''
        }
    },
    methods: {
        // 查看任务列表
        taskList() {
            this.tableOptTaskResult.data = []
            this.tableOptTaskResult.listLoading = true
            this.formObj.parentTaskId = this.taskMainId
            ajax.post(`/informationSource/selectSourceTaskList`, this.formObj).then(resp => {
                let { rows, total } = resp
                if (rows && rows.length) {
                    rows.map(item => {
                        if (item.status === TASK_STATUS.SEARCH) {
                            item.statusStr = '查询中'
                        } else if (item.status === TASK_STATUS.OK) {
                            item.statusStr = '已完成'
                        } else if (item.status === TASK_STATUS.ERROR) {
                            item.statusStr = '查询失败'
                        }
                        return item
                    })
                    this.tableOptTaskResult.data = rows
                    this.tableOptTaskResult.pageOpt.total = total
                }
                this.tableOptTaskResult.listLoading = false
            })
            .catch(error => {
                console.log(error)
                this.tableOptTaskResult.listLoading = false
            })
        },
        // shanchu删除
        deleteTask() {
            ajax.post(`/informationSource/deleteTaskById`, { taskId: this.taskId }).then(resp => {
                if (resp) {
                    this.$message.success('删除成功！')
                    this.taskList()
                } else {
                    this.$message.error('删除失败！')
                }
            })
        },
        dialogResultChange(val) {
            this.show = val
            this.tableOptTaskResult.listLoading = false
        },
        taskResultOpenCallBack() {
            // this.tableOptTaskResult.data = []
            // this.tableOptTaskResult.pageOpt.total = 0
            // this.tableOptTaskResult.pageOpt.currentPage = 1
            // this.formObj.page = 1
            // this.formObj.rows = this.tableOptTaskResult.pageOpt.pageSize
            this.taskList()
        },
        taskResultCurrentPageChange(val) {
            this.tableOptTaskResult.pageOpt.currentPage = val
            this.formObj.page = this.tableOptTaskResult.pageOpt.currentPage
            if (this.tableOptTaskResult.data.length !== 0) {
                this.taskList()
            }
        },
        taskResultSizePageChange(val) {
            this.tableOptTaskResult.pageOpt.pageSize = val
            this.formObj.rows = this.tableOptTaskResult.pageOpt.pageSize
            this.tableOptTaskResult.pageOpt.currentPage = 1
            this.formObj.page = this.tableOptTaskResult.pageOpt.currentPage
            if (this.tableOptTaskResult.data.length !== 0) {
                this.taskList()
            }
        },
        okFn() {
            this.initData()
        },
        cancleFn() {
            this.initData()
        },
        initData() {
            this.$refs.taskForm.clearValue()
            this.formObj.taskName = ''
            this.tableOptTaskResult.data = []
            this.tableOptTaskResult.pageOpt.total = 0
            this.tableOptTaskResult.pageOpt.pageSize = 10
            this.tableOptTaskResult.pageOpt.currentPage = 1
            this.formObj.page = 1
            this.formObj.rows = 10
            this.show = false
        }
    },
    watch: {
        option() {
            this.show = true
        }
    },
    components: {
        TableComp,
        FormComp,
        sysDialog
    }
}
</script>

<style >
</style>
