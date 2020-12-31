<template>
    <div style="width: 100%;height: 100%" class="ga-targetNumSingleQuery">
        <!-- 任务添加/查看任务按钮 -->
        <formSelect :option='queryTaskOpt'></formSelect>
        <!--<formSelect :option='queryOpt'-->
                    <!--ref="query">-->
        <!--</formSelect>-->
        <div id="queryTable">
            <tableComp :option="tableOpt" :comSize="comSize"
                       @handleCurrentPageChange="handleCurrentPageChange"
                       @handleSizePageChange = "handleSizePageChange"></tableComp>
        </div>
        <!--添加查询任务对话框-->
        <sysDialog size="small"
                    title="添加查询任务"
                    @openCallback="creatOpendCallback"
                    @change="dialogFormChange"
                    :dialogVisible="dialogFormVisible"
                    :okFn="okFormFn">
            <formSelect :option='queryOpt'
                        ref="query">
            </formSelect>
        </sysDialog>
        <!--查看任务结果对话框-->
        <sysDialog size="large"
                    title="查询结果"
                    @change="dialogTableChange"
                    @openCallback="dialogOpendCallback"
                    :dialogVisible="dialogTableVisible"
                    :showCancel='false'
                    :showConfirm="false">
            <p style="width: 100%; text-align: right; padding: 0 20px 0 0;">
                <el-button type="text" @click="dialogOpendCallbackResult">
                    <i class="fa fa-refresh"></i>
                    刷新
                </el-button>
            </p>
            <tableComp :option = "tableOptTask" :comSize="comSize2" ref="taskTable"
                    @handleCurrentPageChange="taskHandleCurrentPageChange"
                    @handleSizePageChange = "taskHandleSizePageChange"
                    class="gutterNone">
            </tableComp>
        </sysDialog>
    </div>
</template>

<script>
    import tableComp from 'components/Table'
    import formSelect from 'components/Form'
    import sysDialog from 'components/common/dialog';
    import { forbiddenDate, getIntervalDate, getStrLenght } from 'utils'
    import { taskQueryResult, targetNumQuery } from 'api/quickQuery/quickQueryPage'
    import { ajax } from 'common'
    import axios from '../../onlineUser/axiosExport'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '/policeBusiness' : 'http://192.168.31.107:8080/policeBusiness'
    export default {
        data () {
            // let yesterDay = new Date().getTime()
            // let yesterDay1 = new Date().getTime() - 24 * 60 * 60 * 1000
            let me = this
            return {
                vsHeight: '',
                formObj: {
                    type: '',
                    goalMsisdn: '',
                    queryStartTime: '',
                    queryEndTime: '',
                    queryTaskName: '',
                    owner: me.baseData.owner
                },
                queryTaskOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    btnPos: 'right',
                    // 表单项
                    items: [
                        {
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
                        },
                        {
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
                        }
                    ],
                    btns: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                id: 'btn2',
                                value: '导出',
                                disabled: true,
                                click: function () {
                                    me.exportDoc()
                                }
                            }
                        }
                    ]
                },
                // 添加查询任务
                dialogFormVisible: false,
                queryOpt: {
                    inline: true,
                    labelWidth: '120',
                    items: [
                        {
                            label: '任务名称：',
                            type: 'text',
                            wrap: true,
                            required: true,
                            comOpt: {
                                id: 'queryTaskName',
                                width: 571,
                                required: true,
                                value: ''
                            }
                        },
                        {
                            label: '开始时间：',
                            type: 'date',
                            comOpt: {
                                id: 'queryStartTime',
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
                            label: '截止时间：',
                            type: 'date',
                            comOpt: {
                                id: 'queryEndTime',
                                value: getIntervalDate(),
                                disabled: false,
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate (time) {
                                        return forbiddenDate(time)
                                    }
                                }
                            }
                        }
                    ]
                },
                // 查看查询任务
                taskID: '',
                saveCurrentPage: 1,
                dialogTableVisible: false,
                tableOptTask: {
                    listLoading: false,
                    rowHeight: 15,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 65, align: 'center' },
                        { name: '任务名称', value: 'queryTaskName', align: 'center', tooltip: true },
                        { name: '查询条件', value: 'queryCondition', align: 'center', tooltip: true },
                        { name: '创建时间', value: 'createTime', width: 170, align: 'center' },
                        { name: '状态', value: 'queryStatus', width: 100, align: 'center' },
                        {
                            name: '操作',
                            value: 'querySts',
                            width: 80,
                            type: 'icon',
                            align: 'center',
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
                                            $('#queryTable .el-table__body-wrapper').css('overflow', 'hidden')
                                            $('#queryTable .el-table__body-wrapper').scrollLeft(0)
                                            // let pageSize = me.tableOpt.pageOpt.pageSize;
                                            me.tableOpt.pageOpt.pageSize = 10
                                            me.tableOpt.pageOpt.currentPage = 1;
                                            me.tableOpt.pageOpt.total = 0;
                                            me.taskID = e.resourceId;
                                            me.fetchData(me.taskID, 10, 1);
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
                                        if (e.queryStatus !== '查询中') {
                                            this.$confirm('是否确认删除？', '删除提示', {
                                                confirmButtonText: '确定',
                                                cancelButtonText: '取消'
                                            }).then(() => {
                                                this.deleteTaskFun(e.resourceId)
                                            }).catch(() => {})
                                        }
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
                },
                // 查询结果
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, fixed: 'left', align: 'center' },
                        { name: '通联类型', value: 'cdrType', width: 70, align: 'center' },
                        { name: '本端号码', value: 'userNum', width: 130, align: 'center' },
                        { name: '对端号码', value: 'relateNum', width: 130, align: 'center' },
                        { name: '通话开始/短信发送时间', value: 'startTime', width: 170, align: 'center' },
                        { name: '通话结束时间', value: 'endTime', width: 170, align: 'center' },
                        { name: '通话时长（秒）', value: 'callTime', width: 110, align: 'center' },
                        { name: '本端号码通联位置', value: 'userAddress', width: 140, align: 'center', tooltip: true },
                        { name: '本端卡号', value: 'userImsi', width: 140, align: 'center' },
                        { name: '本端机身码', value: 'userImei', width: 140, align: 'center' },
                        { name: '本端号码归属地', value: 'userHomeName', width: 140, align: 'center', tooltip: true },
                        { name: '本端运营商', value: 'userSpcode', width: 140, align: 'center' },
                        { name: '本端LAC', value: 'userLac', width: 140, align: 'center' },
                        { name: '本端CI', value: 'userCi', width: 140, align: 'center' },
                        { name: '本端经度', value: 'userLog', width: 140, align: 'center' },
                        { name: '本端纬度', value: 'userLat', width: 140, align: 'center' },
                        { name: '对端号码通联位置', value: 'relateAddress', width: 140, align: 'center', tooltip: true },
                        { name: '对端卡号', value: 'relateImsi', width: 140, align: 'center' },
                        { name: '对端机身码', value: 'relateImei', width: 140, align: 'center' },
                        { name: '对端号码归属地', value: 'relateHomeName', width: 140, align: 'center', tooltip: true },
                        { name: '对端运营商', value: 'relateSpcode', width: 140, align: 'center' },
                        { name: '对端LAC', value: 'relateLac', width: 140, align: 'center' },
                        { name: '对端CI', value: 'relateCi', width: 140, align: 'center' },
                        { name: '对端经度', value: 'relateLog', width: 140, align: 'center' },
                        { name: '对端纬度', value: 'relateLat', width: 140, align: 'center' },
                        { name: '短信内容', value: 'smsContent', width: 140, align: 'center', tooltip: true }
                        // { name: '对端号码归属地', value: 'homeCode', align: 'center', tooltip: true }
                        // { name: '对端IMEI', value: 'rImei', width: 140, align: 'center' },
                        // { name: '对端IMSI', value: 'rImsi', width: 140, align: 'center' }
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
        props: ['baseData'],
        created () {
        },
        mounted () {
            this.vsHeight = $('.ga-targetNumSingleQuery').height()
            // this.fetchData()
            let pageWidth = document.body.clientWidth
            $('#queryTable .el-table__body-wrapper').css('overflow', 'hidden')
            $('#queryTable .el-table__empty-text').css('left', pageWidth / 2)
        },
        computed: {
            comSize () {
                return {
                    height: this.vsHeight - 166
                }
            }
        },
        watch: {
        },
        methods: {
            // 查看
            async fetchData (id, pageSize, page) {
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                let resp = await targetNumQuery({
                    'resourceId': id,
                    'rows': pageSize,
                    'page': page
                });
                let { rows, total } = resp
                if (rows && _.isArray(rows)) {
                    this.tableOpt.data = rows;
                    this.tableOpt.pageOpt.total = total;
                    $('#queryTable .el-table__body-wrapper').css('overflow', 'auto')
                    if (this.tableOpt.data.length) {
                        this.tableOpt.listLoading = false;
                    }
                    let me = this;
                    if (rows.length === 0) {
                        setTimeout(() => {
                            me.tableOpt.listLoading = false;
                            $('#queryTable .el-table__body-wrapper').css('overflow', 'hidden')
                        }, 200)
                    }
                    this.queryTaskOpt.btns[0].comOpt.disabled = false
                } else {
                    this.queryTaskOpt.btns[0].comOpt.disabled = true;
                    this.tableOpt.listLoading = false;
                }
                this.tableOpt.listLoading = false;
            },
            // 导出
            exportDoc () {
                this.queryTaskOpt.btns[0].comOpt.disabled = true;
                let URL = `${apiUrl}/quickQueryCdr/export/${this.taskID}`
                let me = this
                console.log(URL)
                axios.get(URL).then(function (response) {
                    if (response === '200') {
                        me.$message.success('下载成功！')
                    } else {
                        me.$message.warning('下载失败！')
                    }
                    me.queryTaskOpt.btns[0].comOpt.disabled = false;
                }).catch(function () {
                    me.queryTaskOpt.btns[0].comOpt.disabled = false;
                });
            },
            // 添加查询任务
            creatOpendCallback() {
                // 设置默认值
                this.$refs.query.setValue([
                    { id: 'queryStartTime', value: getIntervalDate(1) },
                    { id: 'queryEndTime', value: getIntervalDate() }
                ])
            },
            okFormFn () {
                let list = this.$refs.query.getValue();
                let timeRange = (new Date(list.queryEndTime).getTime() - new Date(list.queryStartTime).getTime()) / 1000;
                let recx = /^[0-9A-Za-z\u4e00-\u9fa5]{1,30}$/
                let lengthTest = getStrLenght(list.queryTaskName, 30)
                if (!list.queryTaskName) {
                    this.$alert('任务名称信息没有录入，请检查后重新录入', {
                        confirmButtonText: '确定'
                    });
                    return
                } else if (!recx.test(list.queryTaskName)) {
                    this.$alert('请输入由1~30位汉字、字母、数字组成的任务名称', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (lengthTest) {
                    this.$alert('任务名称最长为15个汉字或30个字母', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (!list.queryStartTime) {
                    this.$alert('开始时间信息没有录入，请检查后重新录入', {
                        confirmButtonText: '确定'
                    });
                    return
                } else if (!list.queryEndTime) {
                    this.$alert('截止时间信息没有录入，请检查后重新录入', {
                        confirmButtonText: '确定'
                    });
                    return
                } else if (timeRange <= 0) {
                    this.$alert('开始时间必须小于截止时间，请检查后重新录入', {
                        confirmButtonText: '确定'
                    });
                    return
                }
                this.formObj.queryTaskName = list.queryTaskName
                this.formObj.queryStartTime = list.queryStartTime
                this.formObj.queryEndTime = list.queryEndTime
                this.formObj.type = this.baseData.type
                this.formObj.goalMsisdn = this.baseData.msisdn
                this.tarTaskCreate();
            },
            dialogFormChange (val) {
                this.dialogFormVisible = val
                this.$refs.query.clearValue()
            },
            tarTaskCreate () {
                ajax.post('/quickQueryCdr/tarTeleCreateTask', this.formObj).then(resp => {
                    if (resp.status === 201) {
                        this.$message.success('任务添加成功！')
                        this.$refs.query.clearValue()
                        this.dialogFormVisible = false
                    } else {
                        this.$message.error('任务添加失败！')
                    }
                })
            },
            // 任务结果列表回调
            dialogTableChange (val) {
                this.dialogTableVisible = val
            },
            dialogOpendCallback () {
                this.tableOptTask.data = [];
                this.tableOptTask.pageOpt.total = 0;
                this.tableOptTask.pageOpt.currentPage = 1;
                let pageSize = this.tableOptTask.pageOpt.pageSize;
                this.taskQueryResult(pageSize, 1);
            },
            // 任务结果列表
            async taskQueryResult (pageSize, page) {
                this.tableOptTask.data = [];
                this.tableOptTask.listLoading = true
                let resp = await taskQueryResult({
                    'owner': this.baseData.owner,
                    'rows': pageSize,
                    'page': page
                })
                let { rows, total } = resp
                if (rows && _.isArray(rows)) {
                    if (rows.length !== 0) {
                        rows.filter((item) => {
                            if (item.queryStatus === 0) {
                                item.queryStatus = '已完成'
                            } else if (item.queryStatus === 2) {
                                item.queryStatus = '已失败'
                            } else if (item.queryStatus === 1) {
                                item.queryStatus = '查询中'
                            }
                            return item
                        })
                    }
                    this.tableOptTask.data = rows;
                    this.tableOptTask.pageOpt.total = total;
                    this.tableOptTask.listLoading = false;
                } else {
                    this.tableOptTask.listLoading = false;
                }
            },
            // 任务结果列表刷新
            dialogOpendCallbackResult () {
                this.tableOptTask.data = []
                this.tableOptTask.pageOpt.total = 0;
                this.tableOptTask.listLoading = true
                this.tableOptTask.pageOpt.currentPage = 1
                let pageSize = this.tableOptTask.pageOpt.pageSize
                this.taskQueryResult(pageSize, 1);
            },
            // 删除任务
            deleteTaskFun (val) {
                ajax.post('/quickQueryCdr/deleteTask', { resourceId: val }).then(resp => {
                    if (resp.status === 201) {
                        this.$message(resp.message)
                        // 判断返回数据
                        if (this.tableOptTask.data.length === 1) {
                            if (this.saveCurrentPage > 1) {
                                this.saveCurrentPage -= 1
                            }
                        }
                        // 刷新数据
                        this.tableOptTask.pageOpt.currentPage = this.saveCurrentPage
                        let pageSize = this.tableOptTask.pageOpt.pageSize
                        this.taskQueryResult(pageSize, this.saveCurrentPage)
                    } else {
                        this.$message(resp.message)
                    }
                })
            },
            // 任务列表分页
            taskHandleCurrentPageChange (val) {
                this.saveCurrentPage = val
                let pageSize = this.tableOptTask.pageOpt.pageSize;
                if (this.tableOptTask.data.length) {
                    this.taskQueryResult(pageSize, val);
                }
            },
            taskHandleSizePageChange (val) {
                this.tableOptTask.pageOpt.currentPage = 1
                this.tableOptTask.pageOpt.pageSize = val;
                if (this.tableOptTask.data.length !== 0) {
                    this.taskQueryResult(val, 1);
                }
            },
            // 查询结果分页
            handleCurrentPageChange (val) {
                let pageSize = this.tableOpt.pageOpt.pageSize;
                if (this.tableOpt.data.length) {
                    this.fetchData(this.taskID, pageSize, val);
                }
            },
            handleSizePageChange (val) {
                this.tableOpt.pageOpt.currentPage = 1;
                this.tableOpt.pageOpt.pageSize = val;
                if (this.tableOpt.data.length) {
                    this.fetchData(this.taskID, val, 1);
                }
            }
        },
        components: {
            tableComp,
            formSelect,
            sysDialog
        }
    }
</script>

<style scoped lang="postcss">
    /*@component-namespace*/
</style>
