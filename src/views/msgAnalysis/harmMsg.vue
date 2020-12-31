<template>
    <div class="ga-harmMsg">
        <FormComp :option="formOpt" ref="form"></FormComp>
        <el-row style='margin-bottom: 10px;'>
            <el-col :span="24" >
                <p class="textTop" v-if="textTopShow" v-html="taskDetailMsg"></p>
            </el-col>
        </el-row>
        <div class="ga-harmMsg__table">
            <tableComp :option = "tableOptResult" :comSize="comSize"
                       @handleCurrentPageChange="handleCurrentPageChange"
                       @handleSizePageChange = "handleSizePageChange">
            </tableComp>
        </div>
        <div class="ga-harmMsg__msg">{{ numDetailMsg }}</div>
        <div class="ga-harmMsg__table">
            <tableComp :option = "tableOptDetail" :comSize="comSize" ref="detailTable"
                       @handleCurrentPageChange="detailHandleCurrentPageChange"
                       @handleSizePageChange = "detailHandleSizePageChange">
            </tableComp>
        </div>
        <sysDialog size="small"
                   title="添加查询任务"
                   @change="dialogFormChange"
                   :dialogVisible="dialogFormVisible"
                   :okFn="okFormFn">
            <FormComp :option="formOptDialog" ref="formDialog"></FormComp>
        </sysDialog>
        <sysDialog size="large"
                   title="查询结果"
                   @change="dialogTableChange"
                   @openCallback="dialogOpendCallback"
                   :dialogVisible="dialogTableVisible"
                   :showCancel='false'
                   :showConfirm="false">
            <FormComp :option="taskFormOpt" ref="taskForm"></FormComp>
            <tableComp :option = "tableOptTask" :comSize="comSize2" ref="taskTable"
                       @handleCurrentPageChange="taskHandleCurrentPageChange"
                       @handleSizePageChange = "taskHandleSizePageChange">
            </tableComp>
        </sysDialog>
        <sysDialog size="mini"
                   title="任务删除确认"
                   @change="dialogConfirmChange"
                   :dialogVisible="dialogConfirmVisible"
                   :okFn="okConfirmFn">
            是否确认删除任务{{ deleteTaskName }}？
        </sysDialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import tableComp from 'components/Table/';
    import FormComp from 'components/Form/index';
    import sysDialog from 'components/common/dialog';
    import { harmMsgTaskCreate, harmMsgTaskList, harmMsgTaskResult,
        harmMsgDetQueryByTel, keyWordSelect, harmMsgTaskdelete } from 'api/msgAnalysis/msg';
    import { mapGetters } from 'vuex';
    export default {
        name: 'harmMsg',
        data () {
            let me = this;
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogConfirmVisible: false,
                deleteTaskName: '',
                deleteResourceId: null,
                numDetail: '',
                numResourceId: '',
                numDetailMsg: '',
                taskDetailMsg: '',
                textTopShow: false,
                alertMsg: '',
                taskID: '',
                h: 0,
                msgHeight: 0,
                highlightWord: '',
                keyWords: [],
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    // 表单项
                    items: [{
                        label: '',
                        type: 'button',
                        comOpt: {
                            id: 'btn1',
                            value: '添加查询任务',
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
                            value: '查看查询结果',
                            disabled: false,
                            click: function () {
                                me.dialogTableVisible = true;
                            }
                        }
                    }]
                },
                // 创建有害短信溯源查询任务
                formOptDialog: {
                    // form 表单true横排，false竖排
                    inline: true,
                    labelWidth: 200,
                    // 表单项
                    items: [
                        {
                            label: '查询任务名称',
                            type: 'text',
                            wrap: true,
                            required: true,
                            comOpt: {
                                id: 'queryTaskName',
                                width: 500,
                                value: ''
                            }
                        },
                        {
                            label: '有害短信样本',
                            type: 'select',
                            required: true,
                            comOpt: {
                                id: 'queryCondition',
                                value: '',
                                width: 500,
                                data: [],
                                change: function () {
                                }
                            }
                        }
                        // {
                        //     label: '有害短信样本',
                        //     type: 'autoCompletet',
                        //     // type: 'text',
                        //     // wrap: true,
                        //     required: true,
                        //     comOpt: {
                        //         id: 'queryCondition',
                        //         // iptType: 'textarea',
                        //         width: 500,
                        //         // rows: 10,
                        //         value: '',
                        //         data: []
                        //     }
                        // }
                    ]
                },
                // 结果列表
                tableOptResult: {
                    listLoading: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 55, align: 'center' },
                        { name: '手机号', value: 'msisdn', width: 130, align: 'center' },
                        { name: '第一次发送时间', value: 'firstSendTime', align: 'center' },
                        { name: '第一次接收时间', value: 'firstReceiveTime', align: 'center' },
                        { name: '最后一次发送时间', value: 'lastSendTime', align: 'center' },
                        { name: '发送次数', value: 'sendCount', width: 130, align: 'center' },
                        { name: '归属地', value: 'homeName', width: 125, align: 'center' }
                    ],
                    data: [],
                    // 是否分页
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    },
                    rowClick: function (row) {
                        // console.log(row);
                        me.numResourceId = row.taskId
                        me.numDetail = row.msisdn;
                        me.numDetailMsg = me.numDetail + ' 发送短信';
                        let pageSize = me.tableOptDetail.pageOpt.pageSize;
                        me.tableOptDetail.pageOpt.currentPage = 1;
                        me.harmMsgDetQueryByTel(me.numResourceId, me.numDetail, pageSize, 1);
                    },
                    rowStyle (row) {
                        let firstSendTime = Date.parse(new Date(row.firstSendTime));
                        firstSendTime = firstSendTime / 1000;
                        let firstReceiveTime = Date.parse(new Date(row.firstReceiveTime));
                        firstReceiveTime = firstReceiveTime / 1000;
                        if ((firstSendTime < firstReceiveTime) || row.firstReceiveTime === '') {
                            return { color: '#efb414' };
                        }
                    }
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
                                    let taskName = me.$refs.taskForm.getValue().taskName
                                    let recx = /^[0-9A-Za-z\u4e00-\u9fa5]{0,30}$/
                                    if (!recx.test(taskName)) {
                                        me.$alert('请输入由0~30位汉字、字母、数字组成的的任务名称', {
                                            confirmButtonText: '确定'
                                        })
                                    } else {
                                        // me.tableOptTaskResult.data = []
                                        me.tableOptTask.data = []
                                        me.tableOptTask.pageOpt.total = 0
                                        me.tableOptTask.pageOpt.pageSize = 10
                                        me.tableOptTask.pageOpt.currentPage = 1
                                        me.harmMsgTaskList(me.ID, 10, 1, taskName);
                                    }
                                }
                            }
                        }
                    ]
                },
                // 结果详情列表
                tableOptDetail: {
                    listLoading: false,
                    rowHeight: 15,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 55, align: 'center' },
                        { name: '时间', value: 'sendTime', width: 175, align: 'center' },
                        { name: '对方手机号', value: 'receiveNum', width: 130, align: 'center' },
                        { name: '短信内容', value: 'content', highlightKey: true, keys: [], align: 'left', tooltip: true },
                        { name: '对方归属地', value: 'receiveHomeName', align: 'center', width: 130 }
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
                // 查询任务列表
                tableOptTask: {
                    listLoading: false,
                    rowHeight: 15,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '查询任务名称', value: 'taskName', align: 'center' },
                        { name: '创建时间', value: 'queryTime', width: 175, align: 'center' },
                        { name: '条件', value: 'queryCondition', align: 'center' },
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
                                            me.highlightWord = me.changeKey(e.queryCondition);
//                                            me.taskDetailMsg = `任务名称：${e.taskName}；有害短信样本：${e.queryCondition}`;
                                            me.textTopShow = true
                                            me.taskDetailMsg = `
                                            <span style="color:#fff;">任务名称：</span>${
                                                e.taskName
                                                } &nbsp;&nbsp;
                                            <span style="color:#fff;">有害短信样本：</span>${
                                                e.queryCondition}
                                            &nbsp;&nbsp;
                                        `
                                            me.msgHeight = 20;
                                            let pageSize = me.tableOptResult.pageOpt.pageSize;
                                            me.tableOptResult.pageOpt.currentPage = 1;
                                            me.tableOptResult.pageOpt.total = 0;
                                            me.tableOptDetail.pageOpt.total = 0;
                                            me.taskID = e.resourceId;
                                            me.harmMsgTaskResult(me.taskID, pageSize, 1);
                                        }
                                    }
                                },
                                {
                                    label: '删除',
                                    type: 'label',
                                    click: e => {
//                                        console.log(e)
                                        me.dialogConfirmVisible = true
                                        me.deleteResourceId = e.resourceId;
                                        me.deleteTaskName = e.taskName;
                                        me.resourceId = e.resourceId
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
        components: {
            tableComp,
            FormComp,
            sysDialog
        },
        mounted () {
            this.h = this.$refs.form.getContainerHeight();
            this.keyWordSelectFun()
        },
        computed: {
            ID () {
                return this.missionId ? this.missionId : this.owner;
            },
            missionId () {
                return localStorage.getItem('taskId');
            },
            comSize () {
                return { 'height': ((this.vsHeight - this.h - 76) / 2) }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'owner': 'global/userName'
            })
        },
        methods: {
            // 添加任务提示框状态改变
            dialogFormChange (val) {
                this.dialogFormVisible = val
            },
            //  添加任务弹框确认按钮
            okFormFn () {
                let list = this.$refs.formDialog.getValue();
                // let type = list.queryCondition;
                // let recxType = /^[0-9A-Za-z\u4e00-\u9fa5]{15,}$/
                let str = list.queryTaskName
                let recxStr = /^[0-9A-Za-z\u4e00-\u9fa5]{1,30}$/
                if (!recxStr.test(str)) {
                    this.$alert('请输入由1~30位汉字、字母、数字组成的的任务名称', {
                        confirmButtonText: '确定'
                    })
                } else if (list.queryCondition === '') {
                    this.$alert('请选择短信样本', {
                        confirmButtonText: '确定'
                    })
                } else {
                    this.harmMsgTaskCreate(this.ID, list);
                }
            },
            // 任务列表弹框状态改变函数
            dialogTableChange (val) {
                this.dialogTableVisible = val
                this.tableOptTask.listLoading = false;
            },
            // 任务查询结果列表dialog显示回调
            dialogOpendCallback () {
                this.tableOptTask.pageOpt.data = [];
                this.tableOptTask.pageOpt.currentPage = 1;
                let pageSize = this.tableOptTask.pageOpt.pageSize;
                this.harmMsgTaskList(this.ID, pageSize, 1, '');
            },
            // 任务列表分页
            taskHandleCurrentPageChange (val) {
                let taskName = this.$refs.taskForm.getValue().taskName
                let pageSize = this.tableOptTask.pageOpt.pageSize;
                if (this.tableOptTask.data.length) {
                    this.harmMsgTaskList(this.ID, pageSize, val, taskName);
                }
            },
            taskHandleSizePageChange (val) {
                this.tableOptTask.pageOpt.pageSize = val;
                let taskName = this.$refs.taskForm.getValue().taskName
                if (this.tableOptTask.data.length !== 0) {
                    this.harmMsgTaskList(this.ID, val, 1, taskName);
                }
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
            // 结果列表分页
            handleCurrentPageChange (val) {
                this.tableOptResult.pageOpt.currentPage = val;
                let pageSize = this.tableOptResult.pageOpt.pageSize;
                if (this.tableOptResult.data.length) {
                    this.harmMsgTaskResult(this.taskID, pageSize, val);
                }
            },
            handleSizePageChange (val) {
                this.tableOptResult.pageOpt.currentPage = 1;
                this.tableOptResult.pageOpt.pageSize = val;
                if (this.tableOptResult.data.length !== 0) {
                    this.harmMsgTaskResult(this.taskID, val, 1);
                }
            },
            // 具体短信详情列表分页
            detailHandleCurrentPageChange (val) {
                this.tableOptDetail.pageOpt.currentPage = val;
                let pageSize = this.tableOptDetail.pageOpt.pageSize;
                if (this.tableOptDetail.data.length) {
                    this.harmMsgDetQueryByTel(this.numResourceId, this.numDetail, pageSize, val);
                }
            },
            detailHandleSizePageChange (val) {
                this.tableOptDetail.pageOpt.currentPage = 1;
                this.tableOptDetail.pageOpt.pageSize = val;
                if (this.tableOptDetail.data.length !== 0) {
                    this.harmMsgDetQueryByTel(this.numResourceId, this.numDetail, val, 1);
                }
            },
            // 字符串拆数组关键词
            changeKey (str) {
                str = str.replace(/\s(and|or)\s/g, ',');
                str = str.replace(/(\(|\))/g, '');
                return str.split(',')
            },
            // 加载关键词下拉框数据
            async keyWordSelectFun () {
                let resp = await keyWordSelect({
                    'owner': this.ID,
                    'approverStatus': 3
                })
                let keys = []
                resp.rows.forEach(item => {
                    let obj = {};
                    obj.name = item.words;
                    obj.value = item.words;
                    this.formOptDialog.items[1].comOpt.data.push(obj)
                    keys.push(item.words)
                })
                this.keywords = keys
            },
            // 创建有害短信溯源查询任务
            async harmMsgTaskCreate (owner, obj) {
//                let word = obj.keyword.words;
//                let str = word.join(',');
                let resp = await harmMsgTaskCreate({
                    'owner': owner,
                    'taskName': obj.queryTaskName,
                    'queryCondition': obj.queryCondition
//                    'wordsType': obj.keyword.wordsType,
//                    'words': str
                });
                if (resp) {
                    this.dialogFormVisible = false;
                    this.$refs.formDialog.clearValue()
                }
            },
            // 获取查询任务列表
            async harmMsgTaskList (owner, pageSize, page, str) {
                this.tableOptTask.data = [];
                this.tableOptTask.listLoading = true;
                let resp = await harmMsgTaskList({
                    'owner': owner,
                    'rows': pageSize,
                    'page': page,
                    'taskName': str
                });
                let { rows, total } = resp;
                if (rows && _.isArray(rows)) {
                    rows.filter((item) => {
                        if (item.queryStatus === 0) {
                            item.queryStatus = '已完成'
                        } else if (item.queryStatus === 2) {
                            item.queryStatus = '已失败'
                        } else if (item.queryStatus === 1) {
                            item.queryStatus = '查询中'
                        }
//                        item.createTime = item.createTime.slice(0, -3)
                        return item
                    })
                    this.tableOptTask.data = rows;
                    this.tableOptTask.pageOpt.total = total;
                    this.tableOptTask.listLoading = false;
                } else {
                    this.tableOptTask.listLoading = false;
                }
            },
            //  删除有害短线溯源查询任务
            async msgDeleteTask (id) {
                let resp = await harmMsgTaskdelete({
                    'resourceId': id
                });
                if (resp) {
                    this.$message.success('删除成功！')
                    this.tableOptTask.data = []
                    this.tableOptTask.pageOpt.total = 0
                    this.tableOptTask.pageOpt.pageSize = 10
                    this.tableOptTask.pageOpt.currentPage = 1
                    let taskName = this.$refs.taskForm.getValue().taskName
                    this.harmMsgTaskList(this.ID, 10, 1, taskName);
                } else {
                    this.$message.error('删除失败！')
                }
            },
            // 获取有害短信溯源分析查询结果列表
            async harmMsgTaskResult (id, pageSize, page) {
                this.tableOptResult.data = [];
                this.tableOptResult.listLoading = true;
                let resp = await harmMsgTaskResult({
                    'resourceId': id,
                    'rows': pageSize,
                    'page': page
                });
                let { rows, total } = resp;
                if (rows) {
                    this.tableOptResult.data = rows;
                    this.tableOptResult.pageOpt.total = total;
                    this.tableOptResult.listLoading = false;
                    if (rows.length !== 0) {
                        this.numResourceId = this.tableOptResult.data[0].taskId
                        this.numDetail = this.tableOptResult.data[0].msisdn;
                        this.numDetailMsg = this.numDetail + ' 发送短信';
                        let pageSize = this.tableOptDetail.pageOpt.pageSize;
                        this.tableOptDetail.pageOpt.currentPage = 1;
                        this.harmMsgDetQueryByTel(this.numResourceId, this.numDetail, pageSize, 1);
                    } else {
                        this.tableOptDetail.data = [];
                        this.numDetailMsg = ''
                    }
                } else {
                    this.tableOptResult.listLoading = false;
                }
            },
            // 获取查询结果详情列表
            async harmMsgDetQueryByTel (id, num, pageSize, page) {
                this.tableOptDetail.data = [];
                this.tableOptDetail.listLoading = true;
                let resp = await harmMsgDetQueryByTel({
                    'resourceId': id,
                    'msisdn': num,
                    'rows': pageSize,
                    'page': page
                });
                if (resp) {
                    this.tableOptDetail.data = resp.rows;
                    this.tableOptDetail.pageOpt.total = resp.total;
                    this.$refs.detailTable.setColumnKeys('content', this.highlightWord);
                    this.tableOptDetail.listLoading = false;
                } else {
                    this.tableOptDetail.listLoading = false;
                }
            }
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b harmMsg {
            @e msg {
                margin-bottom: 5px;
                font-size: 14px;
                color: #9af5f6;
            }
        }
    }
</style>
