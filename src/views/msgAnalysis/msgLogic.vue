<template>
    <div class="ga-msgLogic">
        <FormComp :option="formOpt" ref="form"></FormComp>
        <div class="ga-msgLogic__msg">{{ taskDetailMsg }}</div>
        <div class="ga-msgLogic__table">
            <el-row style='margin-bottom: 10px;'>
                <el-col :span="24" >
                    <el-tooltip  class="item" effect="dark" :content="textTooltip" placement="top" :disabled="showTooltip">
                        <p class="textOver">
                            <span class="textTop" v-if="textTopShow" v-html="textTopMsg"></span>
                        </p>
                    </el-tooltip>
                </el-col>
            </el-row>
            <tableComp :option = "tableOpt" :comSize="comSize1" ref="table"
                       @handleCurrentPageChange="handleCurrentPageChange"
                       @handleSizePageChange = "handleSizePageChange">
            </tableComp>
        </div>
        <sysDialog size="small"
                   title="添加查询任务"
                   @change="dialogFormChange"
                   :dialogVisible="dialogFormVisible"
                   :okFn="okFormFn">
            <FormComp :option="formOptDialog" ref="formDialog"></FormComp>
        </sysDialog>
        <sysDialog size="mini"
                   title="任务删除确认"
                   @change="dialogConfirmChange"
                   :dialogVisible="dialogConfirmVisible"
                   :okFn="okConfirmFn">
            是否确认删除任务{{ deleteTaskName }}？
        </sysDialog>
        <sysDialog size="large"
                   title="查看查询结果"
                   @change="dialogTableChange"
                   @openCallback="dialogOpendCallback"
                   :dialogVisible="dialogTableVisible"
                   :showCancel='false'
                   :showConfirm="false">
            <FormComp :option="taskFormOpt" ref="taskForm"></FormComp>
            <tableComp :option = "taskOpt" :comSize="comSize2" ref="taskTable"
                       @handleCurrentPageChange="taskhandleCurrentPageChange"
                       @handleSizePageChange = "taskhandleSizePageChange">
            </tableComp>
        </sysDialog>

    </div>
</template>

<script>
    import FormComp from 'components/Form/index'
    import tableComp from 'components/Table/'
    import sysDialog from 'components/common/dialog'
    import { msgContLogicCreate, msgContLogicResult, msgContLogicTaskList,
        msgContLogicTaskdelete, keyWordSelect } from 'api/msgAnalysis/msg'
    import { mapGetters } from 'vuex'
    import { forbiddenDate, getIntervalDate, getStrLenght } from 'utils'

    // 任务状态
    const TASK_STATUS = {
        OK: 0,     // 已完成
        ERROR: 2,  // 查询失败
        SEARCH: 1  // 查询中
    }
    export default {
        name: 'msgLogic',
        data () {
            const me = this;
            // let yesterday = new Date() - 24 * 3600 * 1000;
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogConfirmVisible: false,
                deleteTaskName: '',
                deleteResourceId: '',
                highlightWord: '',
                message: '',
                alertMsg: '',
                taskDetailMsg: '',
                queryStartTime: '',
                queryEndTime: '',
                textTopMsg: '',
                textTopShow: false,
                textTooltip: '',
                showTooltip: false,
                taskID: '',
                h: 0,
                msgHeight: 0,
                type: '',
                keywords: [],
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    // 表单项
                    items: [{
                        label: '',
                        type: 'button',
                        comOpt: {
                            id: 'btn1',
                            value: '添加任务',
                            disabled: false,
                            click: function () {
                                me.dialogFormVisible = true
                            }
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            id: 'btn2',
                            value: '查看任务',
                            disabled: false,
                            click: function () {
                                me.dialogTableVisible = true;
                            }
                        }
                    }]
                },
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
                                        me.taskOpt.data = []
                                        me.taskOpt.listLoading = true;
                                        me.taskOpt.pageOpt.currentPage = 1;
                                        me.taskOpt.pageOpt.pageSize = 10;
                                        me.getTaskList(me.ID, 10, 1, str);
                                    }
                                }
                            }
                        }
                    ]
                },
                formOptDialog: {
                    // form 表单true横排，false竖排
                    inline: true,
                    labelWidth: '105',
                    // 表单项
                    items: [{
                        label: '查询任务名称',
                        type: 'text',
                        wrap: true,
                        required: true,
                        comOpt: {
                            id: 'taskName',
                            width: 474,
                            value: ''
                        }
                    }, {
                        label: '开始时间',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'queryStartTime',
                            width: 180,
                            value: getIntervalDate(1),
                            disabled: false,
                            type: 'datetime',
                            pickOptions: {
                                disabledDate (time) {
                                    let maxDay = getIntervalDate(1)
                                    return forbiddenDate(time, maxDay)
                                }
                            }
                        }
                    },
                    {
                        label: '结束时间',
                        type: 'date',
                        wrap: true,
                        required: true,
                        comOpt: {
                            id: 'queryEndTime',
                            width: 180,
                            value: getIntervalDate(),
                            disabled: false,
                            type: 'datetime',
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    },
                    {
                        label: '关键词',
                        // type: 'keyWordAuto',
                        type: 'keyWordSelect',
                        // required: true,
                        comOpt: {
                            width: 180,
                            id: 'keyword',
                            data: []
                        }
                    }]
                },
                tableOpt: {
                    listLoading: false,
                    rowHeight: 15,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 55, align: 'center' },
                        // { name: '短信内容', value: 'content', align: 'left', tooltip: true },
                        {
                            name: '短信内容',
                            value: 'content',
                            align: 'left',
                            highlightKey: true,
                            keys: [],
                            tooltip: true
                        },
//                        { name: '短信内容', value: 'content', width: 200, highlightKey: true, align: 'center', keys: [], tooltip: true },
                        { name: '时间', value: 'sendTime', width: 175, align: 'center' },
                        { name: '发送方号码', value: 'sendNum', width: 135, align: 'center' },
                        { name: '发送方归属地', value: 'sendHomeCode', width: 110, align: 'center', tooltip: true },
                        { name: '发送方位置', value: 'sendPlaceCnName', width: 188, align: 'center', tooltip: true },
                        { name: 'LAC', value: 'lac', width: 110, align: 'center' },
                        { name: 'CI', value: 'ci', width: 110, align: 'center' },
                        { name: '接收方号码', value: 'receiveNum', width: 135, align: 'center' },
                        { name: '接收方归属地', value: 'receiveHomeCode', width: 110, align: 'center', tooltip: true }
//                        { name: '对方位置', value: 'receivePlaceCnName', width: 188, align: 'center', tooltip: true }
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
                taskOpt: {
                    listLoading: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '任务名称', value: 'taskName', align: 'center' },
                        { name: '创建时间', value: 'createTime', width: 175, align: 'center' },
                        { name: '开始时间', value: 'queryStartTime', width: 175, align: 'center' },
                        { name: '结束时间', value: 'queryEndTime', width: 175, align: 'center' },
//                        { name: '条件', value: 'queryCondition', align: 'center' },
                        { name: '状态', value: 'queryStatus', width: 80, align: 'center' },
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
                                        if (e.queryStatus !== '已完成') {
                                            return 'is-disabled'
                                        }
                                    },
                                    click: e => {
                                        if (e.queryStatus === '已完成') {
                                            me.dialogTableVisible = false;
                                            me.queryStartTime = e.queryStartTime.slice(0, 10);
                                            me.queryEndTime = e.queryEndTime.slice(0, 10);
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
                                            <span style="color:#fff;">关键词：</span>${keyWordStr}
                                        `
                                            me.textTooltip = keyWordStr
                                            if (me.textTooltip === '') {
                                                me.showTooltip = true
                                            } else {
                                                me.showTooltip = false
                                            }
                                            if (e.words) {
                                                me.highlightWord = me.changeKey(e.words)
                                            }
                                            me.msgHeight = 20;
                                            let pageSize = me.tableOpt.pageOpt.pageSize;
                                            me.taskID = e.resourceId
                                            me.tableOpt.pageOpt.currentPage = 1;
                                            me.tableOpt.pageOpt.total = 0;
//                                            me.getMsgLogic(me.taskID, me.queryStartTime, me.queryEndTime, pageSize, 1);
                                            me.getMsgLogic(me.taskID, pageSize, 1);
                                        }
                                    }
                                },
                                {
                                    label: '删除',
                                    type: 'label',
                                    callback: e => {
                                        if (e.queryStatus === '查询中') {
                                            return 'is-disabled'
                                        }
                                    },
                                    click: e => {
                                        me.dialogConfirmVisible = true;
                                        me.deleteTaskName = e.taskName;
                                        me.deleteResourceId = e.resourceId;
//                                        me.resourceId = e.resourceId
//                                        me.deleteTask(e)
                                        // if (e.queryStatus !== TASK_STATUS.SEARCH) {
                                        // }
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
                    height: 300
                }
            }
        },
        mounted () {
            this.h = this.$refs.form.getContainerHeight();
            this.keyWordSelectFun();
        },
        computed: {
            comSize1 () {
                return {
                    height: this.vsHeight - this.h - 76
                }
            },
            ID () {
                return this.missionId ? this.missionId : this.owner;
            },
            missionId () {
                return localStorage.getItem('taskId');
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'owner': 'global/userName'
            })
        },
        components: {
            FormComp,
            tableComp,
            sysDialog
        },
        methods: {
            // 添加查询任务
            dialogFormChange (val) {
                this.dialogFormVisible = val
                this.$refs.formDialog.clearValue();
            },
            //  添加查询任务弹框确认按钮
            okFormFn () {
                let list = this.$refs.formDialog.getValue();
//                let queryBeginTime = Date.parse(new Date(list.queryBeginTime));
//                queryBeginTime = queryBeginTime / 1000;
//                let queryEndTime = Date.parse(new Date(list.queryEndTime));
//                queryEndTime = queryEndTime / 1000;
                let type = list.keyword.wordsType
                let words = list.keyword.words;
                let wordsTest = false;
                let wordsSample = false
                if (type === '1' && words.length === 1) {
                    wordsTest = true
                } else if ((type === '2' || type === '3') && words.length === 2) {
                    wordsTest = true
                } else if ((type === '4' || type === '5' || type === '6' || type === '7') && words.length === 3) {
                    wordsTest = true
                } else {
                    wordsTest = false
                }
                if (words) {
                    for (let i = 0; i < words.length; i++) {
                        if (!this.keywords.includes(words[i])) {
                            wordsSample = false
                            break
                        }
                        wordsSample = true
                    }
                }
                let recx = /^[0-9A-Za-z\u4e00-\u9fa5]{1,30}$/
                let lengthTest = getStrLenght(list.taskName, 30)
                if (list.taskName === '') {
                    this.$alert('任务名称不能为空', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (!recx.test(list.taskName)) {
                    this.$alert('请输入由1~30位汉字、字母、数字组成的的任务名称', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (lengthTest) {
                    this.$alert('任务名称最长为15个汉字或30个字母', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (list.queryStartTime === '' || list.queryEndTime === '') {
                    this.$alert('起止时间不能为空', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (list.queryStartTime >= list.queryEndTime) {
                    this.$alert('开始时间不能大于或等于结束时间', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (!wordsTest) {
                    this.$alert('请输入关键词！', {
                        confirmButtonText: '确定'
                    });
                } else if (!wordsSample) {
                    this.$alert('请输入与模板相匹配的关键词！', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.msgContLogicCreate(this.ID, list)
                }
            },
            handleCurrentPageChange (val) {
                this.tableOpt.pageOpt.currentPage = val;
                let pageSize = this.tableOpt.pageOpt.pageSize;
//                this.getMsgLogic(this.taskID, this.queryStartTime, this.queryEndTime, pageSize, val);
                this.getMsgLogic(this.taskID, pageSize, val);
            },
            handleSizePageChange (val) {
                this.tableOpt.pageOpt.currentPage = 1;
                this.tableOpt.pageOpt.pageSize = val;
                if (this.tableOpt.data.length !== 0) {
//                    this.getMsgLogic(this.taskID, this.queryStartTime, this.queryEndTime, val, 1);
                    this.getMsgLogic(this.taskID, val, 1);
                }
            },
            //  查看任务列表
            dialogTableChange (val) {
                this.$refs.taskForm.clearValue();
                this.dialogTableVisible = val
            },
            taskhandleCurrentPageChange (val) {
                let pageSize = this.taskOpt.pageOpt.pageSize;
                let taskName = this.$refs.taskForm.getValue().taskName
                this.getTaskList(this.ID, pageSize, val, taskName);
            },
            taskhandleSizePageChange (val) {
                this.taskOpt.pageOpt.pageSize = val;
                let taskName = this.$refs.taskForm.getValue().taskName
                if (this.taskOpt.data.length !== 0) {
                    this.getTaskList(this.ID, val, 1, taskName);
                }
            },
            // 任务列表弹框dialog显示回调
            dialogOpendCallback () {
                this.taskOpt.listLoading = true;
                this.taskOpt.pageOpt.currentPage = 1;
                let pageSize = this.taskOpt.pageOpt.pageSize;
                this.getTaskList(this.ID, pageSize, 1, '');
            },
            // 删除任务弹出框回调
            dialogConfirmChange (val) {
                this.dialogConfirmVisible = val
            },
            //  删除任务弹框确认按钮
            okConfirmFn () {
                this.msgDeleteTask(this.deleteResourceId)
                this.dialogConfirmVisible = false
            },
            // 字符串拆数组关键词
            changeKey (str) {
                str = str.replace(/\s(and|or)\s/g, ',');
                str = str.replace(/(\(|\))/g, '');
                return str.split(',')
            },
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
            // 加载关键词下拉框数据
            async keyWordSelectFun () {
                let resp = await keyWordSelect({
                    'owner': this.ID,
                    'approverStatus': 3
                })
                let keys = []
                if (resp.rows) {
                    resp.rows.forEach(item => {
                        let obj = {};
                        obj.name = item.words;
                        obj.value = item.words;
                        this.formOptDialog.items[3].comOpt.data.push(obj)
                        keys.push(item.words)
                    })
                }
                this.keywords = keys
            },
            // 创建短信内容逻辑查询任务
            async msgContLogicCreate (owner, obj) {
                let word = obj.keyword.words;
                let str = word.join(',');
                await msgContLogicCreate({
                    'parentTaskId': owner,
                    'taskName': obj.taskName,
                    'wordsType': obj.keyword.wordsType,
                    'queryStartTime': obj.queryStartTime,
                    'queryEndTime': obj.queryEndTime,
                    'words': str
                });
                this.$refs.formDialog.clearValue();
                this.$refs.formDialog.setValue([
                    { id: 'queryStartTime', value: new Date(new Date().getTime() - 24 * 60 * 60 * 1000) },
                    { id: 'queryEndTime', value: new Date() }
                ])
                this.dialogFormVisible = false;
            },
            // 获取短信内容逻辑查询任务列表
            async getTaskList (owner, pageSize, page, taskName) {
                this.taskOpt.data = [];
                let resp = await msgContLogicTaskList({
                    'parentTaskId': owner,
                    'taskName': taskName,
                    'rows': pageSize,
                    'page': page
                });
                let { rows, total } = resp;
                if (rows && _.isArray(rows)) {
//                    if (rows.length === 0) {
//                        this.taskOpt.data = []
//                        this.$alert('任务结果列表为空', {
//                            confirmButtonText: '确定'
//                        })
//                    } else {
                    rows.filter((item) => {
                        if (item.queryStatus === TASK_STATUS.OK) {
                            item.queryStatus = '已完成'
                        } else if (item.queryStatus === TASK_STATUS.ERROR) {
                            item.queryStatus = '已失败'
                        } else if (item.queryStatus === TASK_STATUS.SEARCH) {
                            item.queryStatus = '查询中'
                        }
                        item.createTime = item.createTime.slice(0, -3)
                        return item
                    })
//                    }
                    this.taskOpt.data = rows;
                    this.taskOpt.pageOpt.total = total;
                    this.taskOpt.listLoading = false;
                } else {
                    this.taskOpt.listLoading = false;
                }
            },
            //  删除短信内容逻辑查询任务
            async msgDeleteTask (id) {
                let resp = await msgContLogicTaskdelete({
                    'resourceId': id
                });
                if (resp) {
                    this.$message.success('删除成功！')
                    this.taskOpt.data = []
                    this.taskOpt.listLoading = true;
                    this.taskOpt.pageOpt.currentPage = 1;
                    this.taskOpt.pageOpt.pageSize = 10;
                    let taskName = this.$refs.taskForm.getValue().taskName
                    this.getTaskList(this.ID, 10, 1, taskName);
                } else {
                    this.$message.error('删除失败！')
                }
            },
            // 获取短信内容逻辑查询结果列表
            async getMsgLogic (id, pageSize, page) {
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                let resp = await msgContLogicResult({
                    'resourceId': id,
//                    'queryStartTime': queryStartTime,
//                    'queryEndTime': queryEndTime,
                    'rows': pageSize,
                    'page': page
                });
                let { rows, total } = resp;
                if (rows && total) {
                    this.tableOpt.data = rows;
                    this.$refs.table.setColumnKeys('content', this.highlightWord);
                    this.tableOpt.pageOpt.total = total;
                    this.tableOpt.listLoading = false;
                } else {
                    this.tableOpt.listLoading = false;
                }
            }
        }
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
    @component-namespace ga {
        @b msgLogic {
            @e msg {
                margin-bottom: 5px;
                font-size: 14px;
                color: #9af5f6;
            }
        }
    }
</style>
