<template>
    <div width="100%" class="ga-targetTicket">
        <!-- 任务添加/查看任务按钮 -->
        <targetTicketQueryForm :option="btnFormOpt" ref="btnForm"></targetTicketQueryForm>
        <!--检索查询结果--Table表格-->
        <div id="queryTable">
            <targetTicketQueryTable :option="tableOpt" :comSize="comSize" @handleCurrentPageChange="handleCurrentPageChange"
                                    @handleSizePageChange = "handleSizePageChange"></targetTicketQueryTable>
        </div>
        <!-- 任务添加弹出框 -->
        <sysDialog size="small"
                   title="添加查询任务"
                   @change="dialogFormChange"
                   @openCallback="creatOpendCallback"
                   :dialogVisible="dialogFormVisible"
                   :okFn="okFormFn">
            <!--检索查询结果条件--Form表单-->
            <targetTicketQueryForm :option="formOpt" ref="form"></targetTicketQueryForm>
        </sysDialog>
        <!-- 查看任务弹框 -->
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
            <targetTicketQueryTable :option = "tableOptTask" :comSize="comSize2" ref="taskTable"
                                    @handleCurrentPageChange="taskHandleCurrentPageChange"
                                    @handleSizePageChange = "taskHandleSizePageChange"
                                    class="gutterNone">
            </targetTicketQueryTable>
        </sysDialog>
    </div>
</template>

<script>
    import targetTicketQueryForm from 'components/Form/index'
    import targetTicketQueryTable from 'components/Table'
    import sysDialog from 'components/common/dialog';
    // import { tarTeleTickectCreat, tarTeleTickectQuery, tarTeleTaskList, autoMatch, defaultProvCities,
    //     autoMatchPlaceName, deleteTaskById } from 'api/dataSearch/dataSearch'
    import { tarTeleTickectCreat, tarTeleTickectQuery,
        tarTeleTaskList, autoMatch, deleteTaskById } from 'api/dataSearch/dataSearch'
    // import { getDictionary } from 'api/platform/dictionary'
    import { mapGetters } from 'vuex'
    import { forbiddenDate, getIntervalDate } from 'utils'
    export default {
        name: 'targetMsgSeach',
        data () {
            // let nowDate = new Date().getTime();
            const me = this;
            return {
                // 任务表格页面
                saveCurrentPage: 1,
                dialogTableVisible: false,
                dialogFormVisible: false,
                areaCodeNames: [],
                typeNames: [],
                homeNameCode: [],
                numberAutos: [],
                taskID: '',
                //  任务添加/查看任务按钮
                btnFormOpt: {
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
                                // ----------------------------------目标号码自动补全-----------------------------------
                                autoMatch({ owner: me.ownerId, approverStatus: 3 }).then(resp => {
                                    let { rows, status } = resp
                                    let goalNumberAuto = []
                                    if (resp && status === 200 && _.isArray(rows)) {
                                        rows.forEach((item, index) => {
                                            let { msisdn } = item
                                            me.numberAutos.push(msisdn);
                                            goalNumberAuto[index] = { value: msisdn }
                                        })
                                        me.$refs.form.setItemData('goalMsisdn', goalNumberAuto)
                                        goalNumberAuto = []
                                    }
                                })
                                // 初始化目标、对方所在地类型
                                // defaultProvCities().then((resp) => {
                                //     let { rows, status } = resp
                                //     if (resp && status === 200 && _.isArray(rows)) {
                                //         rows.forEach((item) => {
                                //             let { areaName, resourceId } = item
                                //             item.value = resourceId
                                //             item.name = areaName
                                //         })
                                //         me.areaCodeNames = rows
                                //         me.$refs.form.setItemData('goalAreaCode', rows)
                                //         me.$refs.form.setItemData('receiveAreaCode', rows)
                                //     }
                                // })
                                // 初始化短信类型
                                // getDictionary('callType').then(resp => {
                                //     let { rows, status } = resp
                                //     if (resp && status === 200 && _.isArray(rows)) {
                                //         rows.forEach((item) => {
                                //             let { compKey, compValue } = item
                                //             item.value = compKey
                                //             item.name = compValue
                                //         })
                                //         me.typeNames = rows;
                                //         me.$refs.form.setItemData('type', rows)
                                //     }
                                // })
                                // ----------------------------------对方号码归属地自动补全----------------------------------
                                // autoMatchPlaceName().then(resp => {
                                //     let homeNameAuto = []
                                //     let { rows, status } = resp
                                //     me.homeNameCode = rows
                                //     if (resp && status === 200 && _.isArray(rows)) {
                                //         rows.forEach((item, index) => {
                                //             let { provinceName } = item
                                //             homeNameAuto[index] = { value: provinceName }
                                //         })
                                //         me.$refs.form.setItemData('goalProvinceName', homeNameAuto)
                                //         me.$refs.form.setItemData('receiveProvinceName', homeNameAuto)
                                //     }
                                // })
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
//                表单高度
                formHeight: '',
                // 查询任务列表
                tableOptTask: {
                    listLoading: false,
                    rowHeight: 15,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 65, align: 'center' },
                        { name: '查询任务名称', value: 'queryTaskName', align: 'center', tooltip: true },
                        { name: '查询条件', value: 'queryCondition', width: 500, align: 'center', tooltip: true },
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
                                            $('.ga-targetTicket .el-table__body-wrapper').css('overflow', 'auto')
                                            me.dialogTableVisible = false;
                                            $('#queryTable .el-table__body-wrapper').scrollLeft(0)
                                            let pageSize = me.tableOpt.pageOpt.pageSize;
                                            me.tableOpt.pageOpt.currentPage = 1;
                                            me.tableOpt.pageOpt.total = 0;
                                            me.taskID = e.resourceId;
                                            me.getTicketContent(me.taskID, pageSize, 1);
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
                                            })
                                            .catch(() => {
                                            })
                                        }
                                    }
                                }
                            ]
                        }
                        //     callback: function (row) {
                        //     if (row.queryStatus === '已完成') {
                        //         return 'fa fa-search'
                        //     } else {
                        //         return 'fa fa-ban'
                        //     }
                        // }, clickFn: function (row) {
                        //     if (row.queryStatus === '已完成') {
                        //         // console.log(row);
                        //         me.dialogTableVisible = false;
                        //         let pageSize = me.tableOpt.pageOpt.pageSize;
                        //         me.tableOpt.pageOpt.currentPage = 1;
                        //         me.tableOpt.pageOpt.total = 0;
                        //         me.taskID = row.resourceId;
                        //         me.getTicketContent(me.taskID, pageSize, 1);
                        //     }
                        // } }
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
//                用户id
                numId: 3,
//                传递参数
                passData: {},
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    labelWidth: 150,
                    btnPos: 'right',
                    // 表单项
                    items: [
                        {
                            label: '查询任务名称：',
                            type: 'text',
                            required: true,
                            comOpt: {
                                id: 'queryTaskName',
                                width: 217,
                                required: true,
                                value: ''
                            }
                        },
                        {
                            label: '目标号码：',
                            type: 'autoCompletet',
                            required: true,
                            comOpt: {
                                id: 'goalMsisdn',
                                value: '',
                                disabled: false,
                                width: 217,
                                data: []
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
                        // {
                        //     label: '通话时长 ：>=',
                        //     type: 'text',
                        //     comOpt: {
                        //         id: 'minTime',
                        //         value: '',
                        //         disabled: false,
                        //         placeholder: '(单位/秒)',
                        //         width: '200'
                        //     }
                        // },
                        // {
                        //     label: '  <=',
                        //     type: 'text',
                        //     comOpt: {
                        //         id: 'maxTime',
                        //         value: '',
                        //         disabled: false,
                        //         placeholder: '(单位/秒)',
                        //         width: '200'
                        //     }
                        // },
                        // {
                        //     label: '类型',
                        //     type: 'select',
                        //     comOpt: {
                        //         id: 'type',
                        //         value: '',
                        //         disabled: false,
                        //         width: '200',
                        //         data: [],
                        //         change: function () {
                        //         }
                        //     }
                        // },
                        // {
                        //     label: '目标所在地',
                        //     type: 'select',
                        //     comOpt: {
                        //         id: 'goalAreaCode',
                        //         value: '',
                        //         disabled: false,
                        //         width: '200',
                        //         data: [],
                        //         change: function () {
                        //         }
                        //     }
                        // },
                        // {
                        //     label: '目标号码归属地：(省)',
                        //     type: 'select',
                        //     comOpt: {
                        //         id: 'goalProvinceName',
                        //         value: '',
                        //         width: 200,
                        //         data: [],
                        //         change: function (val) {
                        //             autoMatchPlaceName({ 'provinceName': val }).then(resp => {
                        //                 // console.log(resp);
                        //                 let homeNameAuto = []
                        //                 let { rows, status } = resp
                        //                 me.homeNameCode = rows
                        //                 if (resp && status === 200 && _.isArray(rows)) {
                        //                     rows.forEach((item, index) => {
                        //                         let { cityName } = item
                        //                         homeNameAuto[index] = { value: cityName }
                        //                     })
                        //                     me.$refs.form.setItemData('goalCityName', homeNameAuto)
                        //                 }
                        //             })
                        //         },
                        //         disabled: false
                        //     }
                        // },
                        // {
                        //     label: '（市）',
                        //     type: 'select',
                        //     wrap: true,
                        //     comOpt: {
                        //         id: 'goalCityName',
                        //         value: '',
                        //         width: 200,
                        //         disabled: false,
                        //         data: me.selectArr2,
                        //         change: function () {
                        //         }
                        //     }
                        // },
                        // {
                        //     label: '对方号码',
                        //     type: 'text',
                        //     comOpt: {
                        //         id: 'receiveMsisdn',
                        //         value: '',
                        //         disabled: false,
                        //         width: '200'
                        //     }
                        // },
                        // {
                        //     label: '对方所在地',
                        //     type: 'select',
                        //     comOpt: {
                        //         id: 'receiveAreaCode',
                        //         value: '',
                        //         disabled: false,
                        //         width: '200',
                        //         data: [],
                        //         change: function () {
                        //         }
                        //     }
                        // },
                        // {
                        //     label: '对方号码归属地：(省)',
                        //     type: 'select',
                        //     comOpt: {
                        //         id: 'receiveProvinceName',
                        //         value: '',
                        //         width: 200,
                        //         data: [],
                        //         change: function (val) {
                        //             autoMatchPlaceName({ 'provinceName': val }).then(resp => {
                        //                 // console.log(resp);
                        //                 let homeNameAuto = []
                        //                 let { rows, status } = resp
                        //                 me.homeNameCode = rows
                        //                 if (resp && status === 200 && _.isArray(rows)) {
                        //                     rows.forEach((item, index) => {
                        //                         let { cityName } = item
                        //                         homeNameAuto[index] = { value: cityName }
                        //                     })
                        //                     me.$refs.form.setItemData('receiveCityName', homeNameAuto)
                        //                 }
                        //             })
                        //         },
                        //         disabled: false
                        //     }
                        // },
                        // {
                        //     label: '（市）',
                        //     type: 'select',
                        //     wrap: true,
                        //     comOpt: {
                        //         id: 'receiveCityName',
                        //         value: '',
                        //         width: 200,
                        //         disabled: false,
                        //         data: me.selectArr2,
                        //         change: function () {
                        //         }
                        //     }
                        // }
                    ]
                },
                tableOpt: {
                    // 不设置width ，默认自适应
                    listLoading: false,
                    // 	是否为斑马纹 table
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
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
                        { name: '短信内容', value: 'smsContent', width: 140, align: 'center' }
                    ],
                    data: [],
                    // 是否分页
                    pagination: true,
                    pageOpt: {
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                }
            }
        },
        methods: {
            // 删除任务
            async deleteTaskFun (val) {
                let resp = await deleteTaskById({
                    resourceId: val
                })
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
                    this.tarTeleTaskList(this.ownerId, pageSize, this.saveCurrentPage)
                } else {
                    this.$message(resp.message)
                }
            },
            // 添加查询任务
            creatOpendCallback() {
                // 设置默认值
                this.$refs.form.setValue([
                    { id: 'queryTaskName', value: '' },
                    { id: 'goalMsisdn', value: '' },
                    { id: 'queryStartTime', value: getIntervalDate(1) },
                    { id: 'queryEndTime', value: getIntervalDate() }
                ])
            },
            okFormFn () {
                this.formValidation()
            },
            // 表单验证函数
            formValidation () {
                let queryList = this.$refs.form.getValue();
                let type = queryList.type
                let goalAreaCode = queryList.goalAreaCode
                let receiveAreaCode = queryList.receiveAreaCode
                let phoneReg = /^1[3,4,5,7,8]\d{9}$/;
                // let numReg = /^[0-9]*$/
                let userNumber = '86' + queryList.goalMsisdn
                let isKeyNum = this.numberAutos.includes(userNumber)
                if (!queryList.queryTaskName) {
                    this.$alert('请输入任务名称', {
                        confirmButtonText: '确定'
                    });
                } else if (!queryList.queryStartTime) {
                    this.$alert('请输入起始时间', {
                        confirmButtonText: '确定'
                    });
                } else if (!queryList.queryEndTime) {
                    this.$alert('请输入结束时间', {
                        confirmButtonText: '确定'
                    });
                } else if (queryList.queryStartTime >= queryList.queryEndTime) {
                    this.$alert('请输入正确的起止时间', {
                        confirmButtonText: '确定'
                    });
                } else if (!queryList.goalMsisdn) {
                    this.$alert('请输入目标号码', {
                        confirmButtonText: '确定'
                    });
                } else if (!phoneReg.test(queryList.goalMsisdn)) {
                    this.$alert('请输入正确的目标号码', {
                        confirmButtonText: '确定'
                    });
                } else if (!isKeyNum) {
                    this.$alert('目标号码不是重点人号码', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.passData = queryList
                    let receiveHomeName = queryList.receiveHomeName
                    if (this.homeNameCode) {
                        this.homeNameCode.map((item) => {
                            if ((receiveHomeName !== '') && (item.cityName === receiveHomeName)) {
                                this.receiveHomeCode = item.homeCode
                            }
                        })
                    }
                    this.areaCodeNames.forEach((item) => {
                        if (item.value === goalAreaCode) {
                            this.passData.goalAreaName = item.name
                        }
                        if (item.value === receiveAreaCode) {
                            this.passData.receiveAreaName = item.name
                        }
                    })
                    this.typeNames.forEach((item) => {
                        if (item.value === type) {
                            this.passData.typeName = item.name
                        }
                    })
                    this.passData.receiveHomeCode = this.receiveHomeCode
                    this.passData.owner = this.ownerId
                    this.tableOpt.pageOpt.currentPage = 1
                    this.passData.page = 1
                    this.passData.rows = this.tableOpt.pageOpt.pageSize
                    this.passData.owner = this.ownerId;
                    this.tarTeleTaskCreate();
                    this.$refs.form.clearValue()
                    this.dialogFormVisible = false
                }
                // if (!numReg.test(queryList.maxTime) || !numReg.test(queryList.minTime)) {
                //     this.$alert('通话时长只允许输入数字', {
                //         confirmButtonText: '确定'
                //     });
                // } else if (!numReg.test(queryList.receiveMsisdn)) {
                //     this.$alert('对方号码只允许输入数字', {
                //         confirmButtonText: '确定'
                //     });
                // } else
            },
            // 创建任务弹框状态改变函数
            dialogFormChange (val) {
                this.dialogFormVisible = val
                this.$refs.form.clearValue()
            },
            dialogTableChange (val) {
                this.dialogTableVisible = val
            },
            // dialog显示回调
            dialogOpendCallback () {
                this.tableOptTask.data = [];
                this.tableOptTask.pageOpt.currentPage = 1;
                let pageSize = this.tableOptTask.pageOpt.pageSize;
                this.tarTeleTaskList(this.ownerId, pageSize, 1);
                //  测试
                // this.tarTeleTaskList('T316', pageSize, 1);
            },
            // 任务列表刷新
            dialogOpendCallbackResult () {
                this.tableOptTask.data = []
                this.tableOptTask.listLoading = true
                this.tableOptTask.pageOpt.currentPage = 1
                let pageSize = this.tableOptTask.pageOpt.pageSize
                this.tarTeleTaskList(this.ownerId, pageSize, 1);
            },
            // 任务列表分页
            taskHandleCurrentPageChange (val) {
                this.saveCurrentPage = val
                let pageSize = this.tableOptTask.pageOpt.pageSize;
                if (this.tableOptTask.data.length) {
                    this.tarTeleTaskList(this.ownerId, pageSize, val);
                    // 测试
                    // this.tarTeleTaskList('T316', pageSize, val);
                }
            },
            taskHandleSizePageChange (val) {
                this.tableOptTask.pageOpt.pageSize = val;
                if (this.tableOptTask.data.length !== 0) {
                    this.tarTeleTaskList(this.ownerId, val, 1);
                    // 测试
                    // this.tarTeleTaskList('T316', val, 1);
                }
            },
            // 表格页码
            handleCurrentPageChange (val) {
                this.tableOpt.pageOpt.currentPage = val;
                let pageSize = this.tableOpt.pageOpt.pageSize;
                if (this.tableOpt.data.length !== 0) {
                    this.getTicketContent(this.taskID, pageSize, val)
                }
            },
            handleSizePageChange (val) {
                this.tableOpt.pageOpt.currentPage = 1;
                this.tableOpt.pageOpt.pageSize = val;
                if (this.tableOpt.data.length !== 0) {
                    this.getTicketContent(this.taskID, val, 1);
                }
            },
            // 创建目标话单查询查询任务
            async tarTeleTaskCreate () {
                let resp = await tarTeleTickectCreat(this.passData)
                // let { status } = resp
                if (resp) {
                    this.dialogFormVisible = false
                }
            },
            // 获取查询任务列表
            async tarTeleTaskList (owner, pageSize, page) {
                this.tableOptTask.data = []
                this.tableOptTask.listLoading = true;
                let resp = await tarTeleTaskList({
                    'owner': owner,
                    'rows': pageSize,
                    'page': page
                });
                let { rows, total } = resp;
                if (rows && _.isArray(rows)) {
                    if (rows.length === 0) {
                        this.tableOptTask.data = []
                        this.$alert('任务结果列表为空', {
                            confirmButtonText: '确定'
                        })
                    } else {
                        rows.filter((item) => {
                            if (item.queryStatus === 0) {
                                item.queryStatus = '已完成'
                            } else if (item.queryStatus === 2) {
                                item.queryStatus = '已失败'
                            } else if (item.queryStatus === 1) {
                                item.queryStatus = '查询中'
                            }
                            // item.createTime = item.createTime.slice(0, -3)
                            return item
                        })
                    }
                    this.tableOptTask.data = rows;
                    // console.log(this.tableOptTask.data)
                    this.tableOptTask.pageOpt.total = total;
                    this.tableOptTask.listLoading = false;
                } else {
                    this.tableOptTask.listLoading = false;
                }
            },
            // 获取目标目标话单查询列表
            async getTicketContent (id, pageSize, page) {
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                let resp = await tarTeleTickectQuery({
                    'resourceId': id,
                    'rows': pageSize,
                    'page': page
                })
                let { rows, total } = resp
                if (resp && _.isArray(rows)) {
                    if (rows.length === 0) {
                        this.$alert('未找到与查询条件相符的结果', {
                            confirmButtonText: '确定'
                        })
                    } else {
                        // this.interfaceShow = true
                        this.tableOpt.data = rows;
                        this.tableOpt.pageOpt.total = total;
                    }
                }
                this.tableOpt.listLoading = false;
            }
        },
        mounted () {
            let pageWidth = document.body.clientWidth
            $('.ga-targetTicket .el-table__body-wrapper').css('overflow', 'hidden')
            $('#queryTable .el-table__empty-text').css('left', pageWidth / 2)
        },
        computed: {
            comSize () {
                return {
                    height: this.vsHeight - this.formHeight - 90
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'userName': 'global/userName'
            }),
            taskId () {
                return localStorage.getItem('taskId');
            },
            ownerId () {
                return this.taskId ? this.taskId : this.userName;
            }
        },
        components: {
            targetTicketQueryForm,
            targetTicketQueryTable,
            sysDialog
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b targetTicket {
            @e search {
                @m btSearch {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
            }
            @e showBox {
            }
        }
    }
</style>
