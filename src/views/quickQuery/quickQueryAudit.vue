<template>
    <div class="ga-tarMsg">
        <!-- 任务添加/查看任务按钮 -->
        <FormComp :option="formOpt" ref="form"></FormComp>
       <!--检索查询结果--Table表格-->
       <tableCopm :option = "tableOpt" ref="table"  :comSize="tableHeight"
        @handleCurrentPageChange="handleCurrentPageChange"
        @handleSizePageChange = "handleSizePageChange">
       </tableCopm>
   </div>
</template>

<script  >
import FormComp from 'components/Form/index'
import tableCopm from 'components/Table'
import { forbiddenDate } from 'utils'
import { quickQueryOperator, quickQueryAudit } from 'api/quickQuery/quickQueryAudit'
import { mapGetters } from 'vuex'

export default {
    name: 'quickQueryAudit',
    data () {
        const me = this;
//        let yesterday = new Date() - 24 * 3600 * 1000;
        return {
            // 绿色通道类型
            greenTypes: [
                { name: '否', value: '0' },
                { name: '是', value: '1' },
                { name: '全部', value: '' }
            ],
            // 查询参数列表
            formObj: {},
            // 表单高度
            formHeight: 0,
            // 表单数据
            formOpt: {
                // form 表单true横排，false竖排
                inline: true,
                labelPos: 'right',
                labelWidth: '120',
                btnPos: 'right',
//                canSlider: true,
                // 表单项
                items: [{
                    label: '开始时间',
                    type: 'date',
                    comOpt: {
                        id: 'queryStartTime',
                        value: '',
                        type: 'datetime',
                        disabled: false,
                        width: '180',
                        pickOptions: {
                            disabledDate (time) {
                                return forbiddenDate(time)
                            }
                        }
                    }
                },
                {
                    label: '截止时间',
                    type: 'date',
                    required: true,
                    comOpt: {
                        id: 'queryEndTime',
                        value: new Date(),
                        disabled: false,
                        type: 'datetime',
                        width: '180',
                        pickOptions: {
                            disabledDate (time) {
                                return forbiddenDate(time)
                            }
                        }
                    }
                },
                {
                    label: '查询申请人',
                    type: 'text',
                    comOpt: {
                        id: 'applicant',
                        width: 180,
//                        required: true,
                        value: ''
                    }
                },
                {
                    label: '批准人/单位',
                    type: 'text',
                    comOpt: {
                        id: 'approvalUnit',
                        width: 180,
                        value: ''
                    }
                },
                {
                    label: '操作人',
                    type: 'select',
                    required: true,
                    comOpt: {
                        id: 'operator',
                        width: 180,
                        data: [],
                        value: '全部'
                    }
                },
                {
                    label: '目标号码',
                    type: 'text',
                    comOpt: {
                        id: 'msisdn',
                        value: '',
                        width: 180,
                        data: [],
                        disabled: false
                    }
                },
                {
                    label: '绿色通道',
                    type: 'select',
                    required: true,
                    comOpt: {
                        id: 'greenChannel',
                        value: '',
                        disabled: false,
                        width: 180,
                        data: [
                            { name: '全部', value: '' },
                            { name: '是', value: '1' },
                            { name: '否', value: '0' }
                        ],
                        change: function () {
                        }
                    }
                }],
                btns: [
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            // id: 'yq12',
                            value: '查询',
                            disabled: false,
                            click: function () {
                                me.tableOpt.data = [];
                                me.validation();
                            }
                        }
                    }
                ]
            },
            // 表格数据
            tableOpt: {
                listLoading: false,
                stripe: false,
                // rowHeight: 36,
                emptyText: '',
                column: [
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    { name: '号码类型', value: 'numType', width: 100, align: 'center', tooltip: true },
                    { name: '目标号码', value: 'msisdn', width: 120, align: 'center', tooltip: true },
                    { name: '姓名', value: 'name', width: 100, align: 'center', tooltip: true },
                    { name: '有效期', value: 'expiryDate', width: 130, align: 'center', tooltip: true },
                    { name: '查询申请人', value: 'applicant', width: 100, align: 'center', tooltip: true },
                    { name: '申请时间', value: 'applyTime', width: 130, align: 'center', tooltip: true },
                    { name: '绿色通道', value: 'greenChannel', width: 60, align: 'center', tooltip: true },
                    { name: '批准文号', value: 'fileNo', width: 100, align: 'center', tooltip: true },
                    { name: '批准人/单位', value: 'approvalUnit', width: 100, align: 'center', tooltip: true },
                    { name: '批准时间', value: 'approvalTime', width: 130, align: 'center', tooltip: true },
                    { name: '操作人', value: 'operator', align: 'center', tooltip: true }
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
                height: this.visualHeight - this.formHeight - 130
            }
        }
    },
    mounted () {
        // 初始化短信类型
        // this.$refs.form.setItemData('greenChannel', this.greenTypes);
        this.quickQueryOperator();
    },
    methods: {
        // 表单验证
        validation () {
            let queryList = this.$refs.form.getValue();
//            console.log(queryList);
            let phoneReg = /^[0-9]\d{0,19}$/;
            let reg1 = /^[\u4e00-\u9fa5]+$/;
            let reg2 = /^[A-Za-z]+$/;
//            let userNumber = '86' + queryList.goalMsisdn
//            let isKeyNum = this.numberAutos.includes(userNumber)
            if (queryList.queryEndTime === '') {
                // this.$message({
                //     type: 'warning',
                //     message: '截止时间不能为空'
                // });
                this.$alert('截止时间不能为空')
                return
            } else if (queryList.queryStartTime > queryList.queryEndTime || queryList.queryStartTime === queryList.queryEndTime) {
            //     this.$message({
            //         type: 'warning',
            //         message: '开始时间必须小于截止时间！'
            //     });
                this.$alert('开始时间必须小于截止时间！')
                return
            } else if (queryList.applicant !== '' && !((reg1.test(queryList.applicant) && queryList.applicant.toString().length <= 10) ||
                (reg2.test(queryList.applicant) && queryList.applicant.toString().length <= 20))) {
                // this.$message({
                //     type: 'warning',
                //     message: '请输入正确格式申请人！'
                // });
                this.$alert('请输入正确格式申请人！')
                return
            } else if (queryList.msisdn !== '' && !phoneReg.test(queryList.msisdn)) {
                // this.$message({
                //     type: 'warning',
                //     message: '请输入正确格式的目标号码！'
                // });
                this.$alert('请输入正确格式的目标号码！')
                return
            } else if (queryList.operator === '') {
                // this.$message({
                //     type: 'warning',
                //     message: '请选择操作人！'
                // });
                this.$alert('请选择操作人！')
                return
            } else {
                if (queryList.operator === '全部') {
                    queryList.operator = ''
                }
                queryList.approvalUnit = queryList.approvalUnit.replace(/(^\s*)|(\s*$)/g, '');
                this.formObj = queryList
                this.tableOpt.pageOpt.currentPage = 1
                let pageSize = this.tableOpt.pageOpt.pageSize;
                this.quickQueryAudit(this.ownerId, pageSize, 1)
            }
        },
        // 表格页码
        handleCurrentPageChange (val) {
            this.tableOpt.pageOpt.currentPage = val;
            let pageSize = this.tableOpt.pageOpt.pageSize;
            if (this.tableOpt.data.length !== 0) {
                this.quickQueryAudit(this.ownerId, pageSize, val)
            }
        },
        handleSizePageChange (val) {
            this.tableOpt.pageOpt.currentPage = 1;
            this.tableOpt.pageOpt.pageSize = val;
            if (this.tableOpt.data.length !== 0) {
                this.quickQueryAudit(this.ownerId, val, 1);
            }
        },
        // 操作人下拉列表
        async quickQueryOperator () {
            let resp = await quickQueryOperator();
            let { data, status } = resp;
            let operators = [];
            operators.push({ 'name': '全部' });
            if (resp && status === 200 && _.isArray(data.name)) {
                for (let i = 0; i <= data.name.length - 1; i++) {
                    operators.push({ 'name': data.name[i], 'value': data.name[i] })
                }
            }
//            operators.push({ 'name': '全部' });
            this.$nextTick(() => {
                this.$refs.form.setItemData('operator', operators)
            })
        },
        // 查询结果列表接口
        async quickQueryAudit (id, pageSize, page) {
            this.tableOpt.data = [];
            this.tableOpt.listLoading = true;
            this.formObj.resourceId = id;
            this.formObj.page = page
            this.formObj.rows = pageSize
            let resp = await quickQueryAudit(this.formObj)
            let { rows, total } = resp
            if (resp && _.isArray(rows)) {
                if (rows.length === 0) {
                    this.$alert('未找到与查询条件相符的结果', {
                        confirmButtonText: '确定'
                    })
                } else {
                    // this.interfaceShow = true
                    rows.filter((item) => {
                        if (item.numType === 1) {
                            item.numType = '手机号'
                        } else if (item.numType === 2) {
                            item.numType = 'IMEI'
                        } else if (item.numType === 3) {
                            item.numType = 'IMSI'
                        }
                        if (item.greenChannel === '0') {
                            item.greenChannel = '否'
                        } else if (item.greenChannel === '1') {
                            item.greenChannel = '是'
                        }
                        return item
                    })
                    this.tableOpt.data = rows;
                }
                this.tableOpt.pageOpt.total = total;
            }
            this.tableOpt.listLoading = false;
        }
    },
    components: {
        FormComp, tableCopm
    },
    watch: {
    }
}
</script>

<style scoped>
    .el-table__empty-text {
        color:#f00 !important;
    }
</style>

