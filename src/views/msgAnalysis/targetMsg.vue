<template>
    <div class="ga-tarMsg">
        <!-- 任务添加/查看任务按钮 -->
        <el-row style='margin-bottom: 10px;'>
             <ButtonComp :option="buttonAddTask"></ButtonComp>
             <ButtonComp :option="buttonSearchTask"></ButtonComp>
        </el-row>
        <!-- <FormComp :option="btnFormOpt" ref="btnForm"></FormComp> -->
        <el-row style='margin-bottom: 10px;'>
            <el-col :span="24" >
                <el-tooltip  class="item" effect="dark" :content="textTooltip" placement="top" :disabled="showTooltip">
                    <p class="textOver">
                        <span class="textTop" v-if="textTopShow" v-html="textTopMsg"></span>
                    </p>
                </el-tooltip>
            </el-col>
        </el-row>
            <!-- <span>任务名称：</span>{{taskName}} &nbsp;&nbsp;
            <span>起止日期：</span>{{taskTime}} &nbsp;&nbsp; -->
       <!--检索查询结果--Table表格-->
       <tableCopm :option = "tableOptList" ref="table"  :comSize="tableHeight"
        @handleCurrentPageChange="handleCurrentPageChange"
        @handleSizePageChange = "handleSizePageChange">
       </tableCopm>
        <!-- 任务添加弹出框 -->
        <sysDialog size="middle"
                   title="添加目标短信查询任务"
                   @change="dialogFormChange"
                   @openCallback="creatOpendCallback"
                   :dialogVisible="dialogFormVisible"
                   :okFn="okFormFn"
                   :cancleFn="cancleFn">
            <!--检索查询结果条件--Form表单-->
            <FormComp :option="formOpt" ref="form"></FormComp>
        </sysDialog>
        <!-- 查看任务弹框 -->
        <sysDialog size="large"
                   title="查看目标短信查询任务"
                   @change="dialogTableChange"
                   @openCallback="dialogOpendCallback"
                   :dialogVisible="dialogTableVisible"
                   :showCancel='false'
                   :showConfirm="false">
            <FormComp :option="taskFormOpt" ref="taskForm"></FormComp>
            <tableCopm :option = "tableOptTask" :comSize="comSize2" ref="taskTable"
                       @handleCurrentPageChange="taskHandleCurrentPageChange"
                       @handleSizePageChange = "taskHandleSizePageChange">
            </tableCopm>
        </sysDialog>
   </div>
</template>

<script  >
import FormComp from 'components/Form/index'
import ButtonComp from 'components/Form/button'
import tableCopm from 'components/Table'
import sysDialog from 'components/common/dialog'
import { forbiddenDate, getIntervalDate, getStrLenght } from 'utils'
import { getDictionary } from 'api/platform/dictionary'
import {
    tarMsgQuery,
    autoMatch,
    targetTaskList,
    deleteTask
} from 'api/msgAnalysis/targetMsg'
// import { keyWordSelect } from 'api/msgAnalysis/msg.js'
import { mapGetters } from 'vuex'
import { ajax } from 'common'

// 任务状态
const TASK_STATUS = {
    OK: 2,
    ERROR: 1,
    SEARCH: 0
}

export default {
    name: 'tarMsg',
    data() {
        const me = this
        return {
            title: this.$route.name,
            dialogTableVisible: false,
            dialogFormVisible: false,
            // typeNames: [],
            // // 页码查询是否调用接口
            // interfaceShow: false,
            // 查询参数列表
            formObj: {},
            // --------------------------------------------主界面
            // top
            textTopShow: false,
            textTopMsg: '',
            textTooltip: '',
            showTooltip: false,
            // taskName: '',
            // taskTime: '',
            formList: {},
            // 排序方式
            order: 'desc',
            // 排序字段
            sort: 'sendTime',
            //  任务添加/查看任务按钮
            buttonAddTask: {
                id: 'btn1',
                value: '添加任务',
                disabled: false,
                click: function() {
                    me.dialogFormVisible = true
                    me.formOpt.items[4].comOpt.data = []
                    me.creatTaskInit()
                }
            },
            buttonSearchTask: {
                id: 'btn2',
                value: '查看任务',
                disabled: false,
                click: function() {
                    me.dialogTableVisible = true
                }
            },
            btnFormOpt: {
                // form 表单true横排，false竖排
                inline: true,
                // 表单项
                items: [
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            id: 'btn1',
                            value: '添加任务',
                            disabled: false,
                            click: function() {
                                me.dialogFormVisible = true
                                me.formOpt.items[4].comOpt.data = []
                                me.creatTaskInit()
                            }
                        }
                    },
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            id: 'btn2',
                            value: '查看任务',
                            disabled: false,
                            click: function() {
                                me.dialogTableVisible = true
                            }
                        }
                    }
                ]
            },
            // table
            // 表单高度
            formHeight: 0,
            tableOptList: {
                listLoading: false,
                stripe: false,
                // rowHeight: 36,
                emptyText: '',
                defaultSort: { prop: 'sendTime', order: 'descending' },
                sortChange(e) {
                    let { prop, order } = e
                    let orderStr
                    ['asc', 'desc'].forEach(it => {
                        if (order.startsWith(it)) orderStr = it
                    })
                    me.formList.sort = prop
                    me.formList.order = orderStr
                    // me.msgTypeOrder(prop, order)
                    if (me.tableOptList.data.length) {
                        me.tarMsgQuery()
                    }
                },
                column: [
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    // { name: '目标号码', value: 'goalMsisdn', width: 150, align: 'center' },
                    { name: '类型', prop: 'smsTypeName', width: 60, align: 'center' },
                    { name: '对方号码', prop: 'receiveMsisdn', width: 120, align: 'center' },
                    {
                        name: '短信内容',
                        value: 'content',
                        align: 'left',
                        highlightKey: true,
                        keys: [],
                        tooltip: true
                    },
                    { name: '时间', prop: 'sendTime', width: 140, align: 'center' },
                    { name: '目标归属地', value: 'goalHomeName', width: 130, align: 'center' },
                    {
                        name: '目标所在位置',
                        value: 'goalPlaceCname',
                        width: 110,
                        align: 'center',
                        tooltip: true
                    },
                    { name: 'LAC', value: 'sendPlaceLac', width: 120, align: 'center' },
                    { name: 'CI', value: 'sendPlaceCi', width: 120, align: 'center' },
                    {
                        name: '对方号码归属地',
                        value: 'receiveHomeName',
                        width: 120,
                        align: 'center'
                    }
                    // { name: '对方位置', value: 'receivePlaceCname', widthType: true, align: 'center' }
                ],
                // 表格加在数据
                data: [],
                // 是否分页
                pagination: true,
                pageOpt: {
                    currentPage: 1,
                    total: 0,
                    pageSizes: [10, 20, 30, 40, 50],
                    pageSize: 10
                }
            },
            // -------------------------------------添加查询任务模态框
            // 添加查询任务Form表单
            // goalAreaName: [],
            // homeNameCode: [],
            numberAutos: [], // 目标号码自动补全
            // areaCodeNames: [],
            // receiveHomeCode: '', 对方号码相关暂时无用
            // 目标号码所在地--地市请求参数
            getCityHomeCode: '',
            formOpt: {
                // form 表单true横排，false竖排
                inline: true,
                labelPos: 'right',
                labelWidth: '200',
                btnPos: 'right',
                // canSlider: true,
                // 表单项
                items: [
                    {
                        label: '任务名称',
                        type: 'text',
                        required: true,
                        wrap: true,
                        comOpt: {
                            id: 'taskName',
                            width: 610,
                            required: true,
                            value: ''
                        }
                    },
                    {
                        label: '开始时间',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'queryStartTime',
                            value: getIntervalDate(1),
                            type: 'datetime',
                            isStart: true,
                            disabled: false,
                            width: '200',
                            pickOptions: {
                                disabledDate(time) {
                                    let maxDay = getIntervalDate(1)
                                    return forbiddenDate(time, maxDay)
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
                            id: 'queryEndTime',
                            value: getIntervalDate(),
                            disabled: false,
                            type: 'datetime',
                            width: '200',
                            pickOptions: {
                                disabledDate(time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    },
                    {
                        label: '目标号码',
                        type: 'autoCompletet',
                        required: true,
                        comOpt: {
                            id: 'goalMsisdn',
                            value: '',
                            width: 200,
                            data: [],
                            disabled: false
                        }
                    },
                    {
                        label: '对方号码',
                        type: 'text',
                        wrap: true,
                        comOpt: {
                            id: 'receiveMsisdn',
                            value: '',
                            width: 200,
                            disabled: false
                            // show: false
                        }
                    },
                    // {
                    //     label: '目标号码所在地',
                    //     type: 'select',
                    //     comOpt: {
                    //         id: 'goalHomeCode',
                    //         placeholder: '请选择省份',
                    //         value: '',
                    //         width: 200,
                    //         data: [],
                    //         change: function(val) {
                    //             if (val === '999') {
                    //                 me.$refs.form.setShow([
                    //                     { id: 'goalAreaCode', value: false }
                    //                 ])
                    //             } else {
                    //                 me.$refs.form.setShow([
                    //                     { id: 'goalAreaCode', value: true }
                    //                 ])
                    //                 me.getCityHomeCode = val
                    //                 me.getCityName()
                    //             }
                    //         },
                    //         disabled: false
                    //     }
                    // },
                    // {
                    //     // label: '（市）',
                    //     type: 'select',
                    //     wrap: true,
                    //     comOpt: {
                    //         id: 'goalAreaCode',
                    //         placeholder: '请选择地市',
                    //         value: '',
                    //         show: false,
                    //         width: 200,
                    //         disabled: false,
                    //         data: [],
                    //         change: function() {}
                    //     }
                    // },
                    {
                        label: '短信类型',
                        type: 'select',
                        required: true,
                        // wrap: true,
                        comOpt: {
                            id: 'smsType',
                            value: '',
                            disabled: false,
                            width: 200,
                            data: [],
                            change: function() {}
                        }
                    },
                    {
                        label: '手机属性',
                        type: 'select',
                        required: true,
                        wrap: true,
                        comOpt: {
                            id: 'phoneProperties',
                            value: '',
                            disabled: false,
                            width: 200,
                            data: [],
                            change: function() {}
                        }
                    },
                    {
                        label: '包含短信平台',
                        type: 'checkbox',
                        required: false,
                        wrap: true,
                        comOpt: {
                            id: 'containPlatformSms',
                            value: false,
                            disabled: false,
                            width: 20,
                            data: ['包含短信平台'],
                            change(val) {
                                console.log('111111', val)
                                // me.$refs.form.setItemShow('receiveMsisdn', val)
                                // setItemShow
                            }
                        }
                    },
                    // {
                    //     label: '对方所在地',
                    //     type: 'select',
                    //     comOpt: {
                    //         id: 'receiveAreaCode',
                    //         value: '',
                    //         width: 200,
                    //         disabled: false,
                    //         data: [],
                    //         change: function () {
                    //         }
                    //     }
                    // },
                    // {
                    //     label: '对方号码归属地',
                    //     type: 'select',
                    //     comOpt: {
                    //         id: 'receiveProvinceName',
                    //         placeholder: '请选择省份',
                    //         value: '',
                    //         width: 200,
                    //         data: [],
                    //         change: function (val) {
                    //             if (val) {
                    //                 me.getCityName(val)
                    //             }
                    //         },
                    //         disabled: false
                    //     }
                    // },
                    {
                        label: '关键词类型',
                        type: 'keyWord',
                        comOpt: {
                            width: 200,
                            // required: true,
                            id: 'words',
                            data: []
                        }
                    }
                ]
            },
            // -------------------------------------查看任务结果模态框
            // 删除任务参数
            resourceId: '',
            formTaskObj: {},
            // 查看任务Form
            taskFormOpt: {
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
                                let recx = /^[0-9A-Za-z\u4e00-\u9fa5]{0,30}$/
                                if (!recx.test(str)) {
                                    me.$alert('请输入由0~30位汉字、字母、数字组成的的任务名称', {
                                        confirmButtonText: '确定'
                                    })
                                } else {
                                    // me.tableOptTaskResult.data = []
                                    me.tableOptTask.data = []
                                    me.tableOptTask.pageOpt.total = 0
                                    me.tableOptTask.pageOpt.pageSize = 10
                                    me.tableOptTask.pageOpt.currentPage = 1
                                    me.formTaskObj.page = 1
                                    me.formTaskObj.rows = 10
                                    me.formTaskObj.taskName = str
                                    me.targetMsgTaskList()
                                }
                            }
                        }
                    }
                ]
            },
            // 查询任务列表Table
            tableOptTask: {
                listLoading: false,
                rowHeight: 15,
                column: [
                    // 首列是否显示序号、复选框、下沉展开 index/selection
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    { name: '任务名称', value: 'taskName', align: 'center' },
                    { name: '创建时间', value: 'createTime', align: 'center', width: 160 },
                    { name: '开始时间', value: 'queryStartTime', align: 'center', width: 160 },
                    { name: '截止时间', value: 'queryEndTime', align: 'center', width: 160 },
                    { name: '目标号码', value: 'goalMsisdn', align: 'center', width: 120 },
                    { name: '状态', value: 'queryStatusStr', width: 100, align: 'center' },
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
                                    if (e.queryStatus !== TASK_STATUS.OK) {
                                        return 'is-disabled'
                                    }
                                },
                                click: e => {
                                    if (e.queryStatus === TASK_STATUS.OK) {
                                        me.dialogTableVisible = false
                                        me.sortStatus()
                                        me.formHeight = 30
                                        me.textTopShow = true
                                        // 关键词相关
                                        let words = e.words.split(',')
                                        let keyWordStr = me.keyWordChange(e.wordsType, words)
                                        me.textTopMsg = `
                                            <span style="color:#fff;">任务名称：</span>${
                                                e.taskName
                                            } &nbsp;&nbsp;
                                            <span style="color:#fff;">起止日期：</span>${
                                                e.queryStartTime
                                            } ——${e.queryEndTime}&nbsp;&nbsp;
                                            <span style="color:#fff;">目标号码：</span>${
                                                e.goalMsisdn
                                            } &nbsp;&nbsp;
                                            <span style="color:#fff;">关键词：</span>
                                             ${keyWordStr}
                                        `
                                        me.textTooltip = keyWordStr
                                        if (me.textTooltip === '') {
                                            me.showTooltip = true
                                        } else {
                                            me.showTooltip = false
                                        }
                                        me.$refs.table.setColumnKeys('content', words)
                                        me.formList.sort = 'sendTime'
                                        me.formList.order = 'desc'
                                        me.$refs.table.sort(me.formList.sort, 'descending')
                                        // table相关设置
                                        me.tableOptList.pageOpt.currentPage = 1
                                        me.tableOptList.pageOpt.pageSize = 10
                                        me.tableOptList.pageOpt.total = 0
                                        // 接口参数
                                        me.formList.rows = 10
                                        me.formList.page = 1
                                        me.formList.resourceId = e.resourceId
                                        me.tarMsgQuery()
                                    }
                                }
                            },
                            {
                                label: '删除',
                                type: 'label',
                                click: e => {
                                    me.resourceId = e.resourceId
                                    me.deleteTask()
                                }
                            }
                        ]
                    }
                ],
                data: [],
                // 是否分页
                pagination: true,
                pageOpt: {
                    currentPage: 1,
                    total: 0,
                    pageSizes: [10, 20, 30, 40, 50],
                    pageSize: 10
                }
            },
            comSize2: {
                height: 500
            }
        }
    },
    computed: {
        ...mapGetters({
            visualHeight: 'global/visualHeight',
            owner: 'global/userName'
        }),
        taskId() {
            return localStorage.getItem('taskId')
        },
        ownerId() {
            return this.taskId ? this.taskId : this.owner
        },
        tableHeight() {
            return {
                height: this.visualHeight - this.formHeight - 76
            }
        }
    },
    mounted() {
        // 表单的高度--Height
        // this.formHeight = this.$refs.form.getContainerHeight();
        // this.timeLimit()
        // this.keyWordSelectFun()
    },
    methods: {
        // 添加查询任务
        async createTargetMsgTask() {
            window.GALoading.open('创建任务中,请耐心等会儿...')
            ajax
                .post(`/goalSmsQuery/addGoalSmsQueryTask`, this.formObj)
                .then(resp => {
                    if (resp) {
                        this.$message.success('创建任务成功！')
                        this.$refs.form.clearValue()
                        window.GALoading.close()
                        this.dialogFormVisible = false
                    }
                })
                .catch(error => {
                    if (error.status === 300) {
                        this.show = true
                    }
                    window.GALoading.close()
                })
        },
        // 获取查询任务列表
        async targetMsgTaskList() {
            this.tableOptTask.data = []
            this.tableOptTask.listLoading = true
            let resp = await targetTaskList(this.formTaskObj)
            let { rows, total } = resp
            if (rows && _.isArray(rows)) {
                if (rows.length === 0) {
                    this.tableOptTask.data = []
                    // this.$alert('任务结果列表为空', {
                    //     confirmButtonText: '确定'
                    // })
                } else {
                    rows.filter(item => {
                        if (item.queryStatus === TASK_STATUS.OK) {
                            item.queryStatusStr = '已完成'
                        } else if (item.queryStatus === TASK_STATUS.ERROR) {
                            item.queryStatusStr = '已失败'
                        } else if (item.queryStatus === TASK_STATUS.SEARCH) {
                            item.queryStatusStr = '查询中'
                        }
                        return item
                    })
                }
                this.tableOptTask.data = rows
                this.tableOptTask.pageOpt.total = total
                this.tableOptTask.listLoading = false
            } else {
                this.tableOptTask.listLoading = false
            }
        },
        // 目标短信查询接口
        async tarMsgQuery() {
            this.tableOptList.data = []
            this.tableOptList.listLoading = true
            let resp = await tarMsgQuery(this.formList)
            let { rows, total } = resp
            if (resp && _.isArray(rows)) {
                if (rows.length === 0) {
                    this.$alert('未找到与查询条件相符的结果', {
                        confirmButtonText: '确定'
                    })
                } else {
                    // this.interfaceShow = true
                    this.tableOptList.data = rows
                    this.tableOptList.pageOpt.total = total
                }
            }
            this.tableOptList.listLoading = false
        },
        // 表格页码
        handleCurrentPageChange(val) {
            this.tableOptList.pageOpt.currentPage = val
            this.formList.page = val
            if (this.tableOptList.data.length !== 0) {
                this.tarMsgQuery()
            }
        },
        handleSizePageChange(val) {
            this.tableOptList.pageOpt.currentPage = 1
            this.tableOptList.pageOpt.pageSize = val
            this.formList.rows = val
            this.formList.page = 1
            if (this.tableOptList.data.length !== 0) {
                this.tarMsgQuery()
            }
        },
        // ------------------------------------主界面排序
        sortStatus() {
            this.tableOptList.column.map(item => {
                if (item.prop) {
                    item.sortable = true
                }
            })
        },
        // 短信类型排序字段
        // msgTypeOrder(sort, order) {
        //     if (sort === 'smsTypeName') {
        //         switch (order) {
        //             case 'ascending':
        //                 this.formList.order = '主短'
        //                 break
        //             case 'descending':
        //                 this.formList.order = '被短'
        //                 break
        //         }
        //     } else {
        //         let orderStr
        //         ['asc', 'desc'].forEach(it => {
        //             if (order.startsWith(it)) orderStr = it
        //         })
        //         this.formList.order = orderStr
        //     }
        // },
        // 关键词变形
        keyWordChange(type, words) {
            let wordsStr = ''
            switch (type) {
                case '1':
                    wordsStr = words[0]
                    break
                case '2':
                    wordsStr = words[0] + ' AND ' + words[1]
                    break
                case '3':
                    wordsStr = words[0] + ' OR ' + words[1]
                    break
                case '4':
                    wordsStr = words[0] + ' AND ' + words[1] + ' AND ' + words[2]
                    break
                case '5':
                    wordsStr = '(' + words[0] + ' AND ' + words[1] + ')' + ' OR ' + words[2]
                    break
                case '6':
                    wordsStr = '(' + words[0] + ' OR ' + words[1] + ')' + ' AND ' + words[2]
                    break
                case '7':
                    wordsStr = words[0] + ' OR ' + words[1] + ' OR ' + words[2]
                    break
            }
            return wordsStr
        },
        // -------------------------------查询任务结果-------------------
        // 任务列表提示框
        dialogTableChange(val) {
            this.dialogTableVisible = val
        },
        // dialog显示回调
        dialogOpendCallback() {
            this.$refs.taskForm.clearValue()
            this.tableOptTask.data = []
            this.tableOptTask.pageOpt.total = 0
            this.tableOptTask.pageOpt.currentPage = 1
            this.tableOptTask.pageOpt.pageSize = 10
            this.formTaskObj.page = 1
            this.formTaskObj.rows = 10
            this.formTaskObj.parentTaskId = this.ownerId
            // this.formTaskObj.owner = this.ownerId
            this.formTaskObj.taskName = ''
            this.targetMsgTaskList()
        },
        // shanchu删除
        async deleteTask() {
            let resp = await deleteTask({ taskId: this.resourceId })
            if (resp) {
                this.$message.success('删除成功！')
                this.targetMsgTaskList()
            } else {
                this.$message.error('删除失败！')
            }
        },
        // 任务列表分页
        taskHandleCurrentPageChange(val) {
            this.tableOptTask.pageOpt.currentPage = val
            this.formTaskObj.page = val
            if (this.tableOptTask.data.length !== 0) {
                this.targetMsgTaskList()
            }
        },
        taskHandleSizePageChange(val) {
            this.tableOptTask.pageOpt.pageSize = val
            this.tableOptTask.pageOpt.currentPage = 1
            this.formTaskObj.page = 1
            this.formTaskObj.rows = val
            if (this.tableOptTask.data.length !== 0) {
                this.targetMsgTaskList()
            }
        },
        // ----------------------------------------创建任务相关----------------
        creatOpendCallback() {
            // 设置默认值
            this.createDefault()
        },
        creatTaskInit() {
            // 初始化目标、对方所在地类型
            // defaultProvCities().then((resp) => {
            //     let { rows } = resp
            //     if (resp && _.isArray(rows)) {
            //         rows.forEach((item) => {
            //             let { areaName, resourceId } = item
            //             item.value = resourceId
            //             item.name = areaName
            //         })
            //         this.areaCodeNames = rows
            //         this.$refs.form.setItemData('goalHomeCode', rows)
            //         this.$refs.form.setItemData('receiveAreaCode', rows)
            //     }
            // })
            // 初始化短信类型
            getDictionary('messageType').then(resp => {
                let { rows } = resp
                if (resp && _.isArray(rows)) {
                    rows.forEach(item => {
                        let { compKey, compValue } = item
                        item.value = compKey
                        item.name = compValue
                    })
                    // this.typeNames = rows;
                    this.$refs.form.setItemData('smsType', rows)
                }
            })
            // --------------------目标号码自动补全-------------
            autoMatch({ owner: this.ownerId, approverStatus: 3 }).then(resp => {
                let { rows } = resp
                let goalNumberAuto = []
                this.numberAutos = []
                if (rows && _.isArray(rows)) {
                    rows.forEach((item, index) => {
                        let { msisdn } = item
                        goalNumberAuto[index] = { value: msisdn }
                        if (msisdn) {
                            msisdn = msisdn.toString()
                        }
                        this.numberAutos.push(msisdn)
                    })
                    // this.formOpt.items[4].comOpt.data = [];
                    this.$refs.form.setItemData('goalMsisdn', goalNumberAuto)
                }
            })
            // ----------------------------------对方号码归属地自——请选选择省份----------------------------------
            // provinceName().then(resp => {
            //     let homeNameAuto = []
            //     this.areaCodeNames = []
            //     let { rows } = resp
            //     this.homeNameCode = rows
            //     if (resp && _.isArray(rows)) {
            //         homeNameAuto = rows
            //         this.areaCodeNames = rows
            //         this.$refs.form.setItemData('goalHomeCode', homeNameAuto)
            //     }
            // })
        },
        // async getCityName() {
        //     let resp = await getCityName({ homeCode: this.getCityHomeCode })
        //     this.goalAreaName = []
        //     let { rows } = resp
        //     let cityNameCreate = []
        //     cityNameCreate = rows
        //     this.goalAreaName = rows
        //     this.$refs.form.setItemData('goalAreaCode', cityNameCreate)
        // },
        // 添加任务提示框
        dialogFormChange(val) {
            this.dialogFormVisible = val
            this.$refs.form.clearValue()
        },
        // 添加任务确认按钮
        okFormFn() {
            this.validation()
        },
        cancleFn() {
            this.$refs.form.clearValue()
        },
        // 表单验证
        validation() {
            let queryList = this.$refs.form.getValue()
            let words = queryList.words.words
            let wordsType = queryList.words.wordsType
            let keyV = this.keywordValidation(words, wordsType)
            if (queryList.taskName === '') {
                this.$alert('任务名称不能为空', {
                    confirmButtonText: '确定'
                })
                return
            }
            let recx = /^[0-9A-Za-z\u4e00-\u9fa5]{1,30}$/
            if (!recx.test(queryList.taskName)) {
                this.$alert('请输入由1~30位汉字、字母、数字组成的的任务名称', {
                    confirmButtonText: '确定'
                })
                return
            }
            let lengthTest = getStrLenght(queryList.taskName, 30)
            if (lengthTest) {
                this.$alert('任务名称最长为15个汉字或30个字母', {
                    confirmButtonText: '确定'
                })
                return
            }
            if (queryList.queryStartTime === '' || queryList.queryEndTime === '') {
                this.$alert('起止时间不能为空', {
                    confirmButtonText: '确定'
                })
                return
            }
            if (queryList.queryStartTime > queryList.queryEndTime) {
                this.$alert('开始时间不能大于结束时间', {
                    confirmButtonText: '确定'
                })
                return
            }
            // 包含短信平台相关转换
            if (queryList.containPlatformSms === true) {
                queryList.containPlatformSms = 1
            } else {
                queryList.containPlatformSms = 0
            }
            // 目标号码和对方号码相关验证
            let phoneReg = /^1[3,4,5,7,8]\d{9,20}$/
            if (queryList.goalMsisdn === '') {
                this.$alert('目标号码不能为空', {
                    confirmButtonText: '确定'
                })
                return
            }
            if (queryList.phoneProperties === '') {
                this.$alert('手机属性不能为空', {
                    confirmButtonText: '确定'
                })
                return
            }
            if (queryList.smsType === '') {
                this.$alert('短信类型不能为空', {
                    confirmButtonText: '确定'
                })
                return
            }
            if (queryList.phoneProperties === '0' && queryList.goalMsisdn !== '' && !phoneReg.test(queryList.goalMsisdn)) {
                this.$alert('请输入正确格式的目标号码', {
                    confirmButtonText: '确定'
                })
                return
            }
            // 境外号码验证，只能验证是否是数字
            let telReg = /^[0-9]*$/
            if (queryList.phoneProperties === '1' && queryList.goalMsisdn !== '' && !telReg.test(queryList.goalMsisdn)) {
                this.$alert('请输入正确格式的目标号码', {
                    confirmButtonText: '确定'
                })
                return
            }
            if (queryList.receiveMsisdn !== '' && !phoneReg.test(queryList.receiveMsisdn)) {
                this.$alert('请输入正确格式的对方号码', {
                    confirmButtonText: '确定'
                })
                return
            }
            // 关键词内容是否为空验证
            if (!keyV) {
                this.$alert('关键词类型下的内容不能有空', {
                    confirmButtonText: '确定'
                })
                return
            }
            // 目标号码是不是重点人号码
            let userNumber
            if (queryList.phoneProperties === '0') {
                userNumber = '86' + queryList.goalMsisdn
            } else {
                userNumber = queryList.goalMsisdn
            }
            let isKeyNum = this.numberAutos.includes(userNumber)
            if (!isKeyNum) {
                this.$alert('目标号码不是重点人号码', {
                    confirmButtonText: '确定'
                })
                return
            }

            this.formObj = queryList
            // let receiveHomeName = queryList.receiveHomeName
            // if (this.homeNameCode) {
            //     this.homeNameCode.map((item) => {
            //         if ((receiveHomeName !== '') && (item.cityName === receiveHomeName)) {
            //             this.receiveHomeCode = item.homeCode
            //         }
            //     })
            // }
            // 目标号码所在地---省
            // let goalHomeCode = queryList.goalHomeCode
            // this.areaCodeNames.forEach(item => {
            //     if (item.value === goalHomeCode) {
            //         this.formObj.goalHomeName = item.name
            //     }
            // })
            // 目标号码所在地---地市
            // let goalAreaCode = queryList.goalAreaCode
            // this.goalAreaName.map(item => {
            //     if (item.value === goalAreaCode) {
            //         this.formObj.goalAreaName = item.name
            //     }
            // })
            this.formObj.parentTaskId = this.ownerId
            // 关键字接口参数设置
            this.formObj.words = words.join(',')
            this.formObj.wordsType = wordsType
            // this.$refs.table.setColumnKeys('content', words)
            this.createTargetMsgTask()
        },
        // 关键词验证
        keywordValidation(words, wordsType) {
            if (wordsType === '' || wordsType === null || wordsType === '-1') {
                return true
            } else {
                if (wordsType === '1' && words.length === 1) {
                    return true
                } else if ((wordsType === '2' || wordsType === '3') && words.length === 2) {
                    return true
                } else if (
                    (wordsType === '4' ||
                        wordsType === '5' ||
                        wordsType === '6' ||
                        wordsType === '7') &&
                    words.length === 3
                ) {
                    return true
                } else {
                    return false
                }
            }
        },
        // 添加查询任务开始时间和结束时间的限制
        createDefault() {
            let phoneTypeData = [{ name: '境内', value: '0' }, { name: '境外', value: '1' }]
            this.$refs.form.setItemData('phoneProperties', phoneTypeData)
            this.$refs.form.setValue([
                { id: 'queryStartTime', value: getIntervalDate(1) },
                { id: 'queryEndTime', value: getIntervalDate() },
                { id: 'smsType', value: '0' },
                { id: 'phoneProperties', value: '0' }
            ])
        }
        // 加载关键词下拉框数据
        // async keyWordSelectFun() {
        //     let resp = await keyWordSelect({
        //         owner: this.ownerId,
        //         approverStatus: 3
        //     })
        //     resp.rows.forEach(item => {
        //         let obj = {}
        //         obj.name = item.words
        //         obj.value = item.words
        //         this.formOpt.items[10].comOpt.data.push(obj)
        //     })
        // },
    },
    components: {
        FormComp,
        ButtonComp,
        tableCopm,
        sysDialog
    },
    watch: {}
}
</script>

<style scoped>
.textOver {
    max-height: 28px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.textTop {
    color: #9af5f6;
    max-height: 28px;
    /* margin-bottom: 10px; */
}
.textTop > span {
    color: #fff;
}
.el-table__empty-text {
    color: #f00 !important;
}
</style>
