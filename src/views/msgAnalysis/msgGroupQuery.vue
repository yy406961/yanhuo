<template>
    <div class="ga-msgover">
        <!--表单-->
        <div class="ga-msgover__form" style="width:100%;">
            <FormComp :option="formOpt" ref="form"></FormComp>
        </div>
        <p class="ga-msgover__msg">{{ taskDescription }}</p>
        <!--审计结果查询表格-->
        <div class="ga-msgover__table" style="width:100%;">
            <tableComp :option="msgGroupQueryTableOpt" :comSize="tableHeight"
                       @handleCurrentPageChange="ResultCurrentPageChange"
                       @handleSizePageChange="ResultSizePageChange">
            </tableComp>
        </div>
        <p class="ga-msgover__msg">{{ targetTelMessage }}</p>
        <div class="ga-msgover__table" style="width:100%;">
            <tableComp :option="msgGroupDetailTableOpt" :comSize="tableHeight"
                       @handleCurrentPageChange="detailsCurrentPageChange"
                       @handleSizePageChange="detailsSizePageChange">
            </tableComp>
        </div>
        <!--创建群发任务Dialog-->
        <sysDialog size="small" class="createDialog"
                   title="添加查询任务"
                   :dialogVisible="dialogCreateShow"
                   :okFn="okFormFn"
                   :cancleFn="cancleFn">
            <FormComp :option="creatformOptDialog" ref="creatForm"></FormComp>
        </sysDialog>
        <!--查看任务列表Dialog-->
        <sysDialog size="large" class="ga-msgover__dialog"
                   title="查看查询结果"
                   @change="dialogResultChange"
                   @openCallback="taskResultOpenCallBack"
                   :dialogVisible="dialogResultShow"
                   :showCancel='false'>
            <tableComp :option = "tableOptTaskResult" :comSize="dailogTableHeight" class="ga-msgover__dialog--table"
                @handleCurrentPageChange="taskResultCurrentPageChange"
                @handleSizePageChange="taskResultSizePageChange">
            </tableComp>
        </sysDialog>
    </div>
</template>

<script>
import FormComp from 'components/Form'
import tableComp from 'components/Table'
import sysDialog from 'components/common/dialog'
import { getDictionary } from 'api/platform/dictionary'
import { createGroupTask, groupTaskList, msgGroupQuery, msgGroupDetails } from 'api/msgAnalysis/msgGroup'
import { forbiddenDate } from 'utils'
import { mapGetters } from 'vuex'

export default {
    name: 'auditManage',
    created () {
    },
    data () {
        const me = this;
        return {
            tsakIdShow: '',
            // 界面中MSG
            taskDescription: '',
            targetTelMessage: '',
            msgHeight: 0,
            // Dialog显示与否(创建查询任务/查看任务结果)
            dialogCreateShow: false,
            dialogResultShow: false,
            // 页码查询是否调用接口
            // interfaceQueryShow: false,
            // interfaceDetailsShow: false,
            // form表单高度
            formHeight: 0,
            // -----------------------------请求参数列表------------------
            createFormObj: {},
            taskResultFormObj: {},
            formObj: {},
            formObjSec: {
                sendMsisdn: 0,
                page: 1,
                rows: 0
            },
            // ------------------------------form表单--------------------
            // formOpt
            formOpt: {
                inline: true,
                items: [{
                    label: '',
                    type: 'button',
                    comOpt: {
                        id: 'createBtn',
                        value: '添加查询任务',
                        disabled: false,
                        click: function () {
                            me.dialogCreateShow = true
                            // 开始时间和结束时间
                            me.$nextTick(() => {
                                me.timeLimit()
                            })
                            // 初始化发送短信地址
                            getDictionary('defaultProvCities').then((resp) => {
                                let { rows } = resp
                                rows.forEach((item) => {
                                    let { compKey, compValue } = item
                                    item.value = compKey
                                    item.name = compValue
                                    if (item.name === '银川') {
                                        me.$refs.creatForm.setValue([{ id: 'areaCode', value: item.value }])
                                    }
                                })
                                me.$refs.creatForm.setItemData('areaCode', rows)
                            })
                        }
                    }
                }, {
                    label: '',
                    type: 'button',
                    comOpt: {
                        id: 'resultBtn',
                        value: '查看查询结果',
                        disabled: false,
                        click: function () {
                            me.dialogResultShow = true;
                            // me.tableOptTaskResult.data = [];
                            // me.tableOptTaskResult.pageOpt.total = 0;
                            // me.tableOptTaskResult.pageOpt.currentPage = 1
                            // me.taskResultFormObj.owner = me.ownerId
                            // me.taskResultFormObj.page = 1
                            // me.taskResultFormObj.rows = me.tableOptTaskResult.pageOpt.pageSize
                            // me.groupTaskList();
                        }
                    }
                }]
            },
            // 添加查询任务
            creatformOptDialog: {
                inline: true,
                labelWidth: '150',
                labelPos: 'right',
                // 表单项
                items: [
                    {
                        label: '查询任务名称',
                        type: 'text',
                        required: true,
                        wrap: true,
                        comOpt: {
                            id: 'taskName',
                            value: '',
                            placeholder: '请输入任务名称',
                            disabled: false,
                            width: 520
                        }
                    },
                    {
                        label: '开始时间',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'startTime',
                            value: '',
                            disabled: false,
                            type: 'datetime',
                            width: 180,
                            pickOptions: {
                                disabledDate (time) {
                                    let yesterDay = new Date().getTime() - 24 * 60 * 60 * 1000
                                    return forbiddenDate(time, yesterDay)
                                }
                            }
                        }
                    },
                    {
                        label: '结束时间',
                        type: 'date',
                        required: true,
                        wrap: true,
                        comOpt: {
                            id: 'endTime',
                            value: '',
                            disabled: false,
                            type: 'datetime',
                            width: 180,
                            pickOptions: {
                                disabledDate (time) {
                                    let yesterDay = new Date().getTime() - 24 * 60 * 60 * 1000
                                    return forbiddenDate(time, yesterDay)
                                }
                            }
                        }
                    },
                    {
                        label: '发送短信次数不小于',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'messageLimit',
                            value: '',
                            placeholder: '次数',
                            disabled: false,
                            width: 180
                        }
                    },
                    {
                        label: '短信发送地',
                        type: 'select',
                        required: true,
                        wrap: true,
                        comOpt: {
                            id: 'areaCode',
                            value: '',
                            width: 180,
                            disabled: false,
                            data: [],
                            change: function () {
                            }
                        }
                    },
                    {
                        label: 'LAC',
                        type: 'text',
                        comOpt: {
                            id: 'lac',
                            value: '',
                            placeholder: 'LAC',
                            disabled: false,
                            width: 180
                        }
                    },
                    {
                        label: 'CI',
                        type: 'text',
                        comOpt: {
                            id: 'ci',
                            value: '',
                            placeholder: 'CI',
                            disabled: false,
                            width: 180
                        }
                    }]
            },
            // ------------------------------table表格-------------------
            // 群发短信查询
            msgGroupQueryTableOpt: {
                listLoading: false,
                stripe: false,
                // rowHeight: 20,
                column: [
                    // 首列是否显示序号、复选框index/selection
                    { name: '序号', value: 'index', width: 70, align: 'center' },
                    { name: '手机号码', value: 'sendMsisdn', width: 150, align: 'center' },
                    { name: '归属地', value: 'sendHomeName', width: 120, align: 'center' },
                    { name: '发送次数', value: 'sendCount', width: 100, align: 'center' },
                    { name: '第一次发送时间', value: 'sendFirstTime', width: 180, align: 'center' },
                    { name: '第一次发送位置', value: 'sendFirstPlaceName', width: 200, align: 'center' },
                    { name: '最后一次发送时间', value: 'sendLastTime', width: 180, align: 'center' },
                    { name: '最后一次发送位置', value: 'sendLastPlaceName', align: 'center' }
                ],
                data: [],
                pagination: true,
                pageOpt: {
                    currentPage: 1,
                    total: 0,
                    pageSizes: [5, 10, 15, 20],
                    pageSize: 5
                },
                // 行点击事件
                rowClick: function (row) {
                    // 群发短信详情表格初始化
                    me.msgGroupDetailTableOpt.data = [];
                    me.msgGroupDetailTableOpt.pageOpt.total = 0;
                    me.msgGroupDetailTableOpt.pageOpt.currentPage = 1
                    // 群发短信详情请求的数据
                    me.targetTelMessage = row.sendMsisdn + ' 群发短信详情'
                    me.formObjSec.sendMsisdn = row.sendMsisdn
                    me.formObjSec.page = 1
                    me.formObjSec.rows = me.msgGroupDetailTableOpt.pageOpt.pageSize
                    // me.interfaceDetailsShow = false
                    me.msgGroupDetails()
                }
            },
            // 群发短信详情
            msgGroupDetailTableOpt: {
                listLoading: false,
                stripe: false,
                // rowHeight: 20,
                column: [
                    // 首列是否显示序号、复选框index/selection
                    { name: '序号', value: 'index', width: 70, align: 'center' },
                    { name: '对方号码', value: 'receiveMsisdn', width: 150, align: 'center' },
                    { name: '归属地', value: 'receiveHomeName', width: 120, align: 'center' },
                    { name: '发送时间', value: 'sendFirstTime', width: 180, align: 'center' },
                    { name: '发送位置', value: 'sendFirstPlaceName', width: 260, align: 'center' },
                    { name: '短信内容', value: 'content', align: 'left', tooltip: true }
                ],
                data: [],
                pagination: true,
                pageOpt: {
                    currentPage: 1,
                    total: 0,
                    pageSizes: [5, 10, 15, 20],
                    pageSize: 5
                }
            },
            // 群发任务列表
            tableOptTaskResult: {
                listLoading: false,
                column: [
                    // 首列是否显示序号、复选框、下沉展开 index/selection
                    { name: '序号', value: 'index', width: 65, align: 'center' },
                    { name: '查询任务名称', value: 'taskName', widthType: true, align: 'center' },
                    { name: '查询条件', value: 'condition', width: 550, align: 'center' },
                    { name: '创建时间', value: 'createTime', width: 150, align: 'center' },
                    { name: '状态', value: 'queryStatus', width: 100, align: 'center' },
                    { name: '操作', value: '', width: 80, type: 'icon', callback: function (row) {
                        if (row.queryStatus === '已完成') {
                            return 'fa fa-search'
                        } else {
                            return 'fa fa-ban'
                        }
                    }, clickFn: function (row) {
                        if (row.queryStatus === '已完成') {
                            me.taskDescription = ''
                            me.msgGroupQueryTableOpt.data = []
                            me.msgGroupQueryTableOpt.pageOpt.total = 0
                            me.taskDescription = `
                                任务名称：${row.taskName}
                                ${row.condition} `
                            me.msgHeight = 20
                            me.msgGroupQueryTableOpt.pageOpt.currentPage = 1
                            me.formObj.page = 1
                            me.formObj.rows = me.msgGroupQueryTableOpt.pageOpt.pageSize
                            me.formObj.messageTaskId = row.resourceId;
                            me.formObj.sendCount = row.messageLimit;
                            me.dialogResultShow = false
                            // me.interfaceQueryShow = false
                            me.msgGroupQuery();
                        }
                    } }
                ],
                data: [],
                pagination: true,
                pageOpt: {
                    currentPage: 1,
                    total: 0,
                    pageSizes: [10, 20, 30],
                    pageSize: 10
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            'visualHeight': 'global/visualHeight',
            'owner': 'global/userName'
        }),
        taskId () {
            return localStorage.getItem('taskId');
        },
        ownerId () {
            return this.taskId ? this.taskId : this.owner;
        },
        tableHeight () {
            return {
                height: (this.visualHeight - this.formHeight - 2 * this.msgHeight - 20) / 2
            }
        },
        dailogTableHeight () {
            return {
                height: 376
            }
        }
    },
    mounted () {
        // 表单的高度--Height
        this.formHeight = this.$refs.form.getContainerHeight();
    },
    methods: {
        // --------------------------------请求接口-----------------------------
        // 添加查询任务
        async createGroupTask () {
            let resp = await createGroupTask(this.createFormObj)
            // let { status } = resp
            if (resp) {
                this.dialogCreateShow = false
            }
        },
        // 查看查询结果
        async groupTaskList () {
            let resp = await groupTaskList(this.taskResultFormObj)
            let { rows, total } = resp
            if (resp && _.isArray(rows)) {
                if (rows.length === 0) {
                    this.tableOptTaskResult.data = []
                    this.$alert('任务结果列表为空', {
                        confirmButtonText: '确定'
                    })
                } else {
                    rows.filter((item) => {
                        if (item.queryStatus === '1') {
                            item.queryStatus = '已完成'
                        } else if (item.queryStatus === '2') {
                            item.queryStatus = '已失败'
                        } else if (item.queryStatus === '0') {
                            item.queryStatus = '查询中'
                        }
                        item.condition = `
                        任务时间：${item.startTime.slice(0, -3)} -- ${item.endTime.slice(0, -3)}，
                        发送次数大于：${item.messageLimit} `
                        item.createTime = item.createTime.slice(0, -3)
                        return item
                    })
                    this.tableOptTaskResult.data = rows;
                    this.tableOptTaskResult.pageOpt.total = total;
                }
            }
            this.tableOptTaskResult.listLoading = false;
        },
        // 群发短信查询列表
        async msgGroupQuery () {
            this.msgGroupQueryTableOpt.listLoading = true;
            let resp = await msgGroupQuery(this.formObj)
            let { rows, total } = resp
            if (resp && _.isArray(rows)) {
                if (rows.length === 0) {
                    this.msgGroupQueryTableOpt.data = []
                    this.$alert('未找到与查询条件相符的结果', {
                        confirmButtonText: '确定'
                    })
                    this.msgGroupQueryTableOpt.listLoading = false
                } else {
                    // this.interfaceQueryShow = true
                    rows.map((item) => {
                        item.sendFirstTime = item.sendFirstTime.slice(0, -3)
                        item.sendLastTime = item.sendLastTime.slice(0, -3)
                        return item
                    })
                    this.msgGroupQueryTableOpt.data = rows;
                    this.msgGroupQueryTableOpt.listLoading = false;
                    this.msgGroupQueryTableOpt.pageOpt.total = total;
                    // 查询成功详情表格显示第一个sendMsisdn的群发短信详情列表
                    // 群发短信详情表格初始化
                    this.msgGroupDetailTableOpt.data = [];
                    this.msgGroupDetailTableOpt.pageOpt.total = 0;
                    this.msgGroupDetailTableOpt.pageOpt.currentPage = 1
                    // 群发短信详情列表默认显示群发短信查询列表中第一个手机号
                    let phoneDetails = rows[0].sendMsisdn
                    this.targetTelMessage = phoneDetails + ' 群发短信详情'
                    this.formObjSec.sendMsisdn = phoneDetails
                    this.formObjSec.page = 1
                    this.formObjSec.rows = this.msgGroupDetailTableOpt.pageOpt.pageSize
                    // this.interfaceDetailsShow = false
                    this.msgGroupDetails()
                }
            }
        },
        // 群发短信详情列表
        async msgGroupDetails () {
            this.msgGroupDetailTableOpt.listLoading = true;
            let resp = await msgGroupDetails(this.formObjSec)
            let { rows, total } = resp
            if (resp && _.isArray(rows)) {
                // this.interfaceDetailsShow = true
                this.msgGroupDetailTableOpt.data = rows;
                this.msgGroupDetailTableOpt.pageOpt.total = total;
            }
            this.msgGroupDetailTableOpt.listLoading = false;
        },
        // ----------------------------------页码相关---------------------------
        // 群发任务列表
        taskResultCurrentPageChange (val) {
            this.tableOptTaskResult.pageOpt.currentPage = val
            this.taskResultFormObj.page = this.tableOptTaskResult.pageOpt.currentPage
            if (this.tableOptTaskResult.data.length !== 0) {
                this.groupTaskList()
            }
        },
        taskResultSizePageChange (val) {
            this.tableOptTaskResult.pageOpt.pageSize = val
            this.taskResultFormObj.rows = this.tableOptTaskResult.pageOpt.pageSize
            this.tableOptTaskResult.pageOpt.currentPage = 1
            this.taskResultFormObj.page = this.tableOptTaskResult.pageOpt.currentPage
            if (this.tableOptTaskResult.data.length !== 0) {
                this.groupTaskList()
            }
        },
        // 群发短信查询
        ResultCurrentPageChange (val) {
            this.msgGroupQueryTableOpt.pageOpt.currentPage = val
            this.formObj.page = this.msgGroupQueryTableOpt.pageOpt.currentPage
            if (this.msgGroupQueryTableOpt.data.length !== 0) {
                this.msgGroupQuery()
            }
        },
        ResultSizePageChange (val) {
            this.msgGroupQueryTableOpt.pageOpt.pageSize = val
            this.formObj.rows = this.msgGroupQueryTableOpt.pageOpt.pageSize
            this.msgGroupQueryTableOpt.pageOpt.currentPage = 1
            this.formObj.page = this.msgGroupQueryTableOpt.pageOpt.currentPage
            if (this.msgGroupQueryTableOpt.data.length !== 0) {
                this.msgGroupQuery()
            }
        },
        // 群发短信详情
        detailsCurrentPageChange (val) {
            this.msgGroupDetailTableOpt.pageOpt.currentPage = val
            this.formObjSec.page = this.msgGroupDetailTableOpt.pageOpt.currentPage
            if (this.msgGroupDetailTableOpt.data.length !== 0) {
                this.msgGroupDetails()
            }
        },
        detailsSizePageChange (val) {
            this.msgGroupDetailTableOpt.pageOpt.pageSize = val
            this.formObjSec.rows = this.msgGroupDetailTableOpt.pageOpt.pageSize
            this.msgGroupDetailTableOpt.pageOpt.currentPage = 1
            this.formObjSec.page = this.msgGroupDetailTableOpt.pageOpt.currentPage
            if (this.msgGroupDetailTableOpt.data.length !== 0) {
                this.msgGroupDetails()
            }
        },
        // ---------------------------------Dialog相关------------------------
        dialogCreateChange (val) {
            this.dialogCreateShow = val
        },
        dialogResultChange (val) {
            this.dialogResultShow = val
        },
        taskResultOpenCallBack () {
            this.tableOptTaskResult.data = [];
            this.tableOptTaskResult.listLoading = true;
            this.tableOptTaskResult.pageOpt.total = 0;
            this.tableOptTaskResult.pageOpt.currentPage = 1
            this.taskResultFormObj.owner = this.ownerId
            // this.taskResultFormObj.owner = 'asd'
            this.taskResultFormObj.page = 1
            this.taskResultFormObj.rows = this.tableOptTaskResult.pageOpt.pageSize
            this.groupTaskList();
        },
        okFormFn () {
            let createList = this.$refs.creatForm.getValue()
            let yesterDayStart = new Date(createList.startTime).getTime()
            let yesterDayEnd = new Date(createList.endTime).getTime()
            if (createList.taskName === '') {
                this.$alert('任务名称不能为空', {
                    confirmButtonText: '确定'
                });
            } else if (createList.startTime === '' || createList.endTime === '') {
                this.$alert('起止时间不能为空', {
                    confirmButtonText: '确定'
                });
            } else if (yesterDayStart >= yesterDayEnd) {
                this.$alert('开始时间必须小于结束时间', {
                    confirmButtonText: '确定'
                });
            } else if (yesterDayEnd - yesterDayStart > 3600 * 1000) {
                this.$alert('只支持一个小时内的查询', {
                    confirmButtonText: '确定'
                });
            } else if (createList.messageLimit === '') {
                this.$alert('短信发送次数不能为空', {
                    confirmButtonText: '确定'
                });
            } else if (!(createList.messageLimit >= 50)) {
                this.$alert('短信发送次数不能小于50', {
                    confirmButtonText: '确定'
                });
            } else {
                this.createFormObj = createList;
                this.createFormObj.owner = this.ownerId
                // this.createFormObj.owner = 'asd'
                this.createGroupTask()
                this.dialogCreateShow = false
                this.$refs.creatForm.clearValue()
            }
        },
        cancleFn () {
            this.dialogCreateShow = false
            this.$refs.creatForm.clearValue()
        },
        // 添加查询任务开始时间和结束时间的限制
        timeLimit () {
            let yesterDay = new Date().getTime() - 24 * 60 * 60 * 1000
            this.$refs.creatForm.setValue([
                { id: 'startTime', value: yesterDay - 3600 * 1000 },
                { id: 'endTime', value: yesterDay },
                { id: 'messageLimit', value: 50 }
            ])
        }
    },
    components: {
        FormComp, tableComp, sysDialog
    }
}
</script>

<style>
@component-namespace ga {
    @b msgover {
        @e msg{
            margin-bottom: 5px;
            font-size: 14px;
            color: #9af5f6;
        }
    }
}
</style>