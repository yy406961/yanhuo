<template>
    <div class="ga-audit">
        <!--表单-->
        <div class="ga-audit__form"
             style="width:100%;">
            <FormComp :option="formOpt" ref="form"></FormComp>
        </div>
        <!--审计结果查询表格-->
        <div class="ga-audit__table"
             style="width:100%;">
            <tableComp :option="auditResultTableOpt"
                       :comSize="auditResultTableHeight"
                       @handleCurrentPageChange="auditResultCurrentPageChange"
                       @handleSizePageChange="auditResultSizePageChange">
            </tableComp>
        </div>
        <!--操作目标号码弹框-->
        <auditDialog size="large"
                     title="审计结果查看"
                     class="ga-audit__dialog"
                     :dialogVisible="auditDialog"
                     :showConfirm="true"
                     :showCancel="false"
                     :okFn="okFnAuditDialog"
                     @change="auditDialogChange"
                     @openCallback="auditOpenCallBack">
            <div class="ga-audit__dialog--operRecordTable">
                <tableComp :option="operRecordTableOpt"
                           :comSize="operRecordComSize"></tableComp>
            </div>
            <p class="ga-audit__dialog--p">用户监测目标手机号码和区域详情</p>
            <tableComp :option="tarTelTableOpt"
                       :comSize="tarTelComSize">
            </tableComp>
        </auditDialog>
    </div>
</template>

</script>
<script>
    import FormComp from 'components/Form'
    import tableComp from 'components/Table'
    import auditDialog from 'components/common/dialog'
    import { getDictionary } from 'api/platform/dictionary'
    import { forbiddenDate } from 'utils'
    import { userAuditQuery, operRelateTarTel, selectOperRecord } from 'api/system/auditManage'
    import { mapGetters } from 'vuex'

    export default {
        name: 'auditManage',
        data () {
            const me = this;
            return {
                title: this.$route.name,
                // 表单的高度--Height, 为求表格高度
                formHeight: '',
                // 弹出表格的确认按钮，点击确认关闭弹框
                dialogConfirm: false,
                tarNumMassage: '',
                changeModuleData: [],
                // FormObj--审计结果/查看操作记录/操作关联目标号码/生成操作记录接口的参数列表
                auditResultFormObj: {
                    page: 1,
                    rows: 10,
                    visitModule: '',
                    userBeha: '',
                    userName: '',
                    deptName: '',
                    userIp: '',
                    content: '',
                    queryBeginTime: '',
                    queryEndTime: ''
                },
                operRecordFormObj: { auditId: '' },
                operRelateFormObj: { auditId: '' },
                // visitModuleData访问模块数据
                visitModuleData: [],
                // userBehaData操作行为数据
                userBehaData: [],
                // 弹框
                auditDialog: false,
                // 表单
                formOpt: {
                    inline: true,
                    labelPos: 'right',
                    labelWidth: '80',
                    btnPos: 'right',
                    // 表单项
                    items: [{
                        label: '用户名',
                        type: 'text',
                        // required: true,
                        comOpt: {
                            id: 'userName',
                            value: '',
                            disabled: false,
                            width: 120
                        }
                    },
                    {
                        label: '姓名',
                        type: 'text',
                        comOpt: {
                            id: 'cname',
                            value: '',
                            disabled: false,
                            width: 120
                        }
                    },
                    {
                        label: '部门',
                        type: 'text',
                        comOpt: {
                            id: 'deptName',
                            value: '',
                            disabled: false,
                            width: 180
                        }
                    },
                    {
                        label: '系统模块',
                        type: 'select',
                        comOpt: {
                            id: 'visitModule',
                            value: '',
                            disabled: false,
                            width: 214,
                            data: [],
                            change: function () {
                            }
                        }
                    },
                    {
                        label: '用户IP',
                        type: 'text',
                        wrap: true,
                        comOpt: {
                            id: 'userIp',
                            value: '',
                            disabled: false,
                            width: 120
                        }
                    },
                    {
                        label: '操作行为',
                        type: 'select',
                        comOpt: {
                            id: 'userBeha',
                            value: '',
                            disabled: false,
                            width: 120,
                            data: [],
                            change: function () {
                            }
                        }
                    },
                    {
                        label: '操作内容',
                        type: 'text',
                        comOpt: {
                            id: 'content',
                            value: '',
                            disabled: false,
                            width: 120
                        }
                    },
                    {
                        label: '开始时间',
                        type: 'date',
                        comOpt: {
                            id: 'queryBeginTime',
                            value: new Date() - 24 * 3600 * 1000,
                            disabled: false,
                            type: 'datetime',
                            width: 180,
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    },
                    {
                        label: '结束时间',
                        type: 'date',
                        comOpt: {
                            id: 'queryEndTime',
                            value: new Date(),
                            disabled: false,
                            type: 'datetime',
                            width: 180,
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    }],
                    btns: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                id: 'btnQuery',
                                value: '查询',
                                disabled: false,
                                click: function () {
                                    // me.interfaceAuditResultShow = false
                                    me.auditResultTableOpt.data = []
                                    me.auditResultTableOpt.pageOpt.total = 0
                                    me.auditResultTableOpt.pageOpt.currentPage = 1
                                    me.validation()
                                }
                            }
                        }
                    ]
                },
                // 审计结果表格
                auditResultTableOpt: {
                    listLoading: false,
                    stripe: false,
                    // rowHeight: 38,
                    column: [
                        // 首列是否显示序号、复选框index/selection
                        { name: '序号', value: 'index', width: 40, align: 'center' },
                        { name: '用户名', value: 'userName', width: 100, align: 'center' },
                        { name: '姓名', value: 'cname', width: 80, align: 'center' },
                        { name: '部门', value: 'deptName', width: 120, align: 'center' },
                        { name: 'IP地址', value: 'userIp', width: 140, align: 'center' },
//                        { name: 'IP地址', value: 'userIp', width: 140, align: 'center' },
                        { name: '访问模块', value: 'visitModule', width: 214, align: 'center' },
                        { name: '行为', value: 'userBeha', width: 120, align: 'center' },
                        { name: '操作内容', value: 'content', align: 'center', className: 'tdNowrap', tooltip: true },
                        { name: '操作时间', value: 'operateTime', width: 200, align: 'center' },
                        { name: '操作', value: '', width: 80, align: 'center', operations: [
                            { label: '查看', type: 'icon', icon: 'search', click: me.lookClick }]
                        }
                    ],
                    // 表格加在数据
                    data: [],
                    // 是否分页
                    pagination: true,
                    // 分页参数
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
                operRecordTableOpt: {
                    listLoading: false,
                    rowHeight: 12,
                    stripe: false,
                    column: [
                        { name: '用户名', value: 'userName', width: 140, align: 'center' },
                        { name: '姓名', value: 'cname', width: 120, align: 'center' },
                        { name: '部门', value: 'deptName', align: 'center' },
                        { name: 'IP地址', value: 'userIp', width: 150, align: 'center' },
                        { name: '访问模块', value: 'visitModule', width: 180, align: 'center' },
                        { name: '行为', value: 'userBeha', width: 180, align: 'center' },
                        { name: '操作时间', value: 'operateTime', width: 220, align: 'center' }
                    ],
                    data: [],
                    pagination: false
                },
                tarTelTableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '手机号', value: 'msisdn', width: 220, align: 'center' },
                        { name: '卡号', value: 'imsi', width: 220, align: 'center' },
                        { name: '机身码', value: 'imei', width: 220, align: 'center' },
                        { name: '用户名', value: 'name', width: 220, align: 'center' },
                        { name: '区域', value: 'areaInfo', align: 'center' }
                    ],
                    data: [],
                    pagination: false
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
            auditResultTableHeight () {
                return {
                    height: this.visualHeight - this.formHeight - 16
                }
            },
            operRecordComSize () {
                return {
                    height: 100
                }
            },
            tarTelComSize () {
                return {
                    height: 256
                }
            }
        },
        created () {
        },
        mounted () {
            // 表单的高度--Height
            this.formHeight = this.$refs.form.getContainerHeight();
            // 初始化审计系统模块auditType
            getDictionary('auditType').then((resp) => {
                let { rows } = resp
                if (rows) {
                    // let lessUse = [0, 1, 2, 3, 4, 5, 6, 8, 9, 19, 20, 21, 23, 24, 25, 26];
                    // for (let i = 0; i < lessUse.length; i++) {
                    //     this.visitModuleData.push({ name: rows[lessUse[i]].compValue, value: i + 1 })
                    // }
                    for (let i = 0; i < rows.length; i++) {
                        this.visitModuleData.push({ name: rows[i].compValue, value: i + 1 })
                    }
                    // rows.map((item, index) => {
                    //     let lessUse = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 19, 20, 21, 22, 23, 24, 25, 26]
                    //     if (lessUse.includes(index)) {
                    //         this.visitModuleData.push({ name: item.compValue, value: item.compKey })
                    //     }
                    // })
                }
                this.visitModuleData.unshift({ name: '-------- 请选择 --------', value: -1 })
                this.$refs.form.setItemData('visitModule', this.visitModuleData)
            })
            // auditHehavior  operationHehavior
            getDictionary('auditHehavior').then((resp) => {
                let { rows } = resp
                if (rows) {
                    rows.map((item, index) => {
                        this.userBehaData[index] = {
                            name: item.compValue, value: item.compKey
                            // name: item.name, value: item.value
                        }
                    })
                    this.userBehaData.unshift({ name: '-- 请选择 --', value: -1 })
                    this.$refs.form.setItemData('userBeha', this.userBehaData)
                }
            })
            // 触发vuex、fetchInitList
            // this.$store.dispatch('global/fetchInitList')
            this.auditResultFormObj.queryBeginTime = this.$refs.form.getValue().queryBeginTime
            this.auditResultFormObj.queryEndTime = this.$refs.form.getValue().queryEndTime
            this.userAuditQuery()
        },
        methods: {
            // 审计结果查询
            async userAuditQuery () {
                this.auditResultTableOpt.listLoading = true;
                // this.interfaceAuditResultShow = true
                let resp = await userAuditQuery(this.auditResultFormObj)
                let { rows, total } = resp
                if (resp && _.isArray(rows)) {
                    let { length } = rows
                    if (length === 0) {
                        this.auditResultTableOpt.data = []
                        this.$alert('未找到与查询条件相符的结果', {
                            confirmButtonText: '确定'
                        })
                    } else {
                        this.auditResultTableOpt.listLoading = true;
                        this.auditResultTableOpt.data = rows;
                        this.auditResultTableOpt.pageOpt.total = total
                    }
                }
                this.auditResultTableOpt.listLoading = false;
            },
            // 审计查询结果表格页码
            auditResultCurrentPageChange (val) {
                this.auditResultTableOpt.pageOpt.currentPage = val
                this.auditResultFormObj.page = val;
                if (this.auditResultTableOpt.data.length !== 0) {
                    this.userAuditQuery()
                }
            },
            auditResultSizePageChange (val) {
                this.auditResultTableOpt.pageOpt.pageSize = val
                this.auditResultFormObj.rows = this.auditResultTableOpt.pageOpt.pageSize
                this.auditResultTableOpt.pageOpt.currentPage = 1
                this.auditResultFormObj.page = this.auditResultTableOpt.pageOpt.currentPage
                if (this.auditResultTableOpt.data.length !== 0) {
                    this.userAuditQuery()
                }
            },
            // 查看操作记录
            async selectOperRecord () {
                let resp = await selectOperRecord(this.operRecordFormObj)
                let { data } = resp
                if (resp) {
                    let { length } = data
                    if (length === 0) {
                        this.operRecordTableOpt.data = []
                    } else {
                        this.operRecordTableOpt.data = data;
                        // data.filter((item) => {
                        //     item.userBeha = this.userBehaChange(item.userBeha)
                        //     item.visitModule = this.moduleChange(item.visitModule)
                        //     return item
                        // })
                    }
                }
                this.operRecordTableOpt.listLoading = false
            },
            // 操作关联目标号码
            async operRelateTarTel () {
                let resp = await operRelateTarTel(this.operRelateFormObj)
                let { rows } = resp
                if (resp && _.isArray(rows)) {
                    let { length } = rows
                    if (length === 0) {
                        this.tarTelTableOpt.data = []
                        this.$alert('未找到与查询条件相符的结果', {
                            confirmButtonText: '确定'
                        })
                    } else {
                        this.tarTelTableOpt.data = rows;
                    }
                    this.tarTelTableOpt.listLoading = false
                }
            },
            lookClick (row) {
                let auditId = row.auditId
                this.auditDialog = true
                // 查看操作记录
                this.operRecordFormObj.auditId = auditId
                // this.selectOperRecord()
                // 显示特定目标人的查询结果
                // this.tarTelTableOpt.data = []
                this.operRelateFormObj.auditId = auditId
                // this.operRelateTarTel()
            },
            // 关闭弹框
            okFnAuditDialog () {
                this.auditDialog = false;
            },
            auditDialogChange (val) {
                this.auditDialog = val
            },
            // 表单验证及审计结果查询参数
            validation () {
                let queryList = this.$refs.form.getValue();
                if (queryList.queryBeginTime > queryList.queryEndTime) {
                    this.$alert('请选择正确的起止时间', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.auditResultTableOpt.pageOpt.currentPage = 1
                    let visitModuleKey = queryList.visitModule
                    let userBehaKey = queryList.userBeha
                    if (visitModuleKey === -1 || visitModuleKey === '') {
                        queryList.visitModule = ''
                    } else {
                        queryList.visitModule = this.visitModuleData[visitModuleKey].name
                    }
                    if (userBehaKey === -1 || userBehaKey === '') {
                        queryList.userBeha = ''
                    } else {
                        queryList.userBeha = this.userBehaData[userBehaKey].name
                    }
                    this.auditResultFormObj = queryList
                    // this.auditResultFormObj.owner = this.ownerId
                    this.auditResultFormObj.page = 1
                    this.auditResultFormObj.rows = this.auditResultTableOpt.pageOpt.pageSize;
                    this.userAuditQuery()
                    // this.$refs.form.clearValue()
                }
            },
            // 解决弹出框出现正在加载的图标和暂无数据共存的问题
            auditOpenCallBack () {
                this.operRecordTableOpt.data = []
                this.tarTelTableOpt.data = [];
                this.operRecordTableOpt.listLoading = true
                this.tarTelTableOpt.listLoading = true;
                // this.tarTelTableOpt.pageOpt.total = 0;
                // this.tarTelTableOpt.pageOpt.currentPage = 1
                // this.operRelateFormObj.userId = userId
                this.selectOperRecord()
                this.operRelateTarTel()
            }
        },
        components: {
            FormComp, tableComp, auditDialog
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b audit {
            @e dialog {
                @m operRecordTable {
                    table {
                        height: 40px;
                    }
                }
                @m p {
                    height: 32px;
                    color: #9af5f6;
                    font-size: 14px;
                }
            }
        }
    }
</style>
