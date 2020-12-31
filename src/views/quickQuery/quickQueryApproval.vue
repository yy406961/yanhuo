<template>
    <div id="quickQueryApproval">
        <formComp
            :option="myForm"
            ref="myform">
        </formComp>
        <TableComp
            :option="myTable"
            :comSize="tableHeight"
            @handleCurrentPageChange="currentPageChange"
            @handleSizePageChange = "pageSizeChange">
        </TableComp>
        <sysDialog
            size="large"
            title="快捷查询补录手续"
            @change="dialogChange"
            :dialogVisible="dialogShow"
            :okFn="changeSure"
            :showCancel="true"
            :showConfirm="true">
            <ul class="queryUl">
                <li v-for="item in queryUl">
                    <p>{{item.name}}</p>
                    <p>{{item.value}}</p>
                </li>
            </ul>
            <formComp
                :option="licenseForm"
                ref="mylicense">
            </formComp>
        </sysDialog>
    </div>
</template>

<script>
import formComp from 'components/Form'
import TableComp from 'components/Table'
import sysDialog from 'components/common/dialog'
import { mapGetters } from 'vuex'
import { forbiddenDate, getIntervalDate } from 'utils'
import { queryApproval, changeApproval } from 'api/quickQuery/quickQueryApproval.js'
import { getTime } from 'api/relationAnalysis/inImportantContact'
export default {
    data () {
        return {
            dialogShow: false,
            currentPage: 0,
            pageSize: 0,
            // 保存每一行的主键
            saveId: 0,
            // 保存修改时要传递的对象
            saveObj: {},
            myForm: {
                inline: true,
                btnPos: 'right',
                labelPos: 'right',
                labelWidth: '120',
                items: [
                    {
                        label: '开始时间',
                        type: 'date',
                        comOpt: {
                            id: 'queryStartTime',
                            type: 'datetime',
                            width: 180,
                            value: '',
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time, undefined, 90)
                                }
                            }
                        }
                    },
                    {
                        label: '截止时间',
                        type: 'date',
                        comOpt: {
                            id: 'queryEndTime',
                            type: 'datetime',
                            width: 180,
                            value: getIntervalDate(),
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time, undefined, 90)
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
                            value: ''
                        }
                    },
                    {
                        label: '目标号码',
                        type: 'text',
                        comOpt: {
                            id: 'msisdn',
                            width: 180,
                            value: ''
                        }
                    },
                    {
                        label: '绿色通道',
                        type: 'select',
                        comOpt: {
                            id: 'greenChannel',
                            width: 180,
                            value: '1',
                            data: [
                                { name: '全部', value: '' },
                                { name: '是', value: '1' },
                                { name: '否', value: '0' }
                            ],
                            change: function () {}
                        }
                    }
                ],
                btns: [
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            id: 'search',
                            value: '查询',
                            disabled: false,
                            click: () => {
                                let obj = this.$refs.myform.getValue()
                                this.saveObj = obj
                                this.queryApprovalFun(1, 10, obj)
                            }
                        }
                    }
                ]
            },
            myTable: {
                listLoading: false,
                stripe: false,
                highlightRow: true,
                column: [
                    { name: '序号', value: 'index', align: 'center', width: 60 },
                    // { name: '序号', value: 'multipleIndex', align: 'center', width: 60 },
                    { name: '号码类型', value: 'numType', align: 'center', width: 100 },
                    { name: '目标号码', value: 'msisdn', align: 'center', width: 100 },
                    { name: '姓名', value: 'name', align: 'center', width: 100, tooltip: true },
                    { name: '有效期', value: 'expiryDate', align: 'center', width: 140 },
                    { name: '查询申请人', value: 'applicant', align: 'center', width: 100, tooltip: true },
                    { name: '申请时间', value: 'applyTime', align: 'center', width: 140 },
                    { name: '绿色通道', value: 'greenChannel', align: 'center', width: 80 },
                    { name: '批准文号', value: 'fileNo', align: 'center', width: 100 },
                    { name: '批准人/单位', value: 'approvalUnit', align: 'center', width: 150 },
                    { name: '批准时间', value: 'approvalTime', align: 'center', width: 140 },
                    {
                        name: '操作',
                        value: '',
                        align: 'center',
                        // width: 80,
                        operations: [
                            {
                                label: '补录手续',
                                type: 'label',
                                callback: function (row) {
                                    // row
                                    if (row.greenChannel === '是') {
                                        this.disabled = false;
                                    } else {
                                        this.disabled = true;
                                    }
                                },
                                click: e => {
                                    this.dialogShow = true
                                    this.saveId = e.id
                                    this.$nextTick(() => {
                                        let arr = []
                                        for (let item in e) {
                                            let obj = {}
                                            obj.id = item
                                            obj.value = e[item]
                                            arr.push(obj)
                                        }
                                        this.queryUl.forEach(item => {
                                            item.value = e[item.id];
                                            if (item.id === 'ispCode') {
                                                if (+item.value === 1) {
                                                    item.value = '境内';
                                                } else if (+item.value === 2) {
                                                    item.value = '境外';
                                                }
                                            }
                                            return item;
                                        })
                                        this.$refs.mylicense.setValue(arr)
                                    })
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
            },
            queryUl: [
                { name: '号码类型:', value: '', id: 'numType' },
                { name: '手机属地:', value: '', id: 'ispCode' },
                { name: '目标号码:', value: '', id: 'msisdn' },
                { name: '目标姓名:', value: '', id: 'name' },
                { name: '有效时间:', value: '', id: 'expiryDate' },
                { name: '申请人:', value: '', id: 'applicant' },
                { name: '申请时间:', value: '', id: 'applyTime' }
            ],
            licenseForm: {
                inline: true,
                labelWidth: 90,
                items: [
                    {
                        label: '批准文号',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'fileNo',
                            value: ''
                        }
                    },
                    {
                        label: '批准人/单位',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'approvalUnit',
                            value: ''
                        }
                    },
                    {
                        label: '批准时间',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'approvalTime',
                            type: 'datetime',
                            value: '',
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time, undefined, 90)
                                }
                            }
                        }
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters({
            vsHeight: 'global/visualHeight'
        }),
        tableHeight () {
            return { height: this.vsHeight - 130 }
        }
    },
    mounted () {
        // 页面初始化，要有数据
        this.getTimeFun()
        let obj = this.$refs.myform.getValue()
        this.saveObj = obj
        this.queryApprovalFun(1, 10, obj)
    },
    methods: {
        // 获取服务器时间
        async getTimeFun () {
            let resp = await getTime();
            if (resp.data) {
                let time2 = moment(resp.data).format('YYYY-MM-DD HH:mm:ss');
                this.myForm.items[1].comOpt.value = time2;
                return resp.data;
            }
        },
        dialogChange (val) {
            this.dialogShow = val
        },
        // 确认修改提交
        changeSure () {
            let obj = {}
            let queryObj = {}
            this.queryUl.forEach(item => {
                queryObj[item.id] = item.value;
            })
            obj = _.assign(queryObj, this.$refs.mylicense.getValue())
            obj.id = this.saveId
            // 必填项为空是提示
            if (obj.fileNo === '' || obj.approvalUnit === '' || obj.approvalTime === '') {
                this.$alert('请填写必填项')
                return
            }
            // 修改对应的值
            if (obj.numType === '手机号') {
                obj.numType = 1
            } else if (obj.numType === 'IMEI') {
                obj.numType = 2
            } else if (obj.numType === 'IMSI') {
                obj.numType = 3
            }
            obj.ispCode = obj.ispCode === '境内' ? '1' : '2';
            this.changeApprovalFun(obj)
            this.dialogShow = false
        },
        // 修改接口
        async changeApprovalFun (obj) {
            let resp = await changeApproval(obj)
            if (resp.status) {
                // 重新请求表格数据
                this.queryApprovalFun(1, 10, this.saveObj)
            }
            this.$message(resp.message)
        },
        // 查询接口分页
        currentPageChange (val) {
            if (!this.myTable.data) {
                return
            }
            this.queryApprovalFun(val, this.pageSize, this.saveObj)
        },
        pageSizeChange (val) {
            if (!this.myTable.data) {
                return
            }
            this.queryApprovalFun(1, val, this.saveObj)
        },
        // 查询接口
        async queryApprovalFun (page, rows, obj) {
            // 取消前后空格
            obj.applicant = obj.applicant.replace(/(^\s*)|(\s*$)/g, '');
            obj.msisdn = obj.msisdn.replace(/(^\s*)|(\s*$)/g, '');
            // 查询验证
            if (obj.queryEndTime === '') {
                this.$alert('截止时间不能为空')
                return
            }
            if (obj.queryStartTime >= obj.queryEndTime) {
                this.$alert('开始时间必须小于截止时间！')
                return
            }
            if (obj.applicant !== '') {
                // 只有字母或者汉字
                // 验证汉字
                let reg1 = /^[\u4e00-\u9fa5]+$/
                // 验证字母
                let reg2 = /^[A-Za-z]+$/
                if (reg1.test(obj.applicant) && obj.applicant.toString().length <= 10) {
                } else if (reg2.test(obj.applicant) && obj.applicant.toString().length <= 20) {
                } else {
                    this.$alert('请输入正确的查询申请人')
                    return
                }
            }
            if (obj.msisdn !== '') {
                // 只有数字不大于20位
                let reg = /^[0-9]\d{0,19}$/
                if (!reg.test(obj.msisdn)) {
                    this.$alert('请输入正确的手机号码')
                    return
                }
            }
            this.myTable.data = [];
            this.myTable.listLoading = true;
            this.pageSize = rows;
            this.myTable.pageOpt.currentPage = page;
            obj.page = page;
            obj.rows = rows;
            let resp = await queryApproval(obj);
            if (resp && resp.rows) {
                this.myTable.data = resp.rows
                // 前端显示处理
                this.myTable.data.forEach(item => {
                    if (item.numType - 0 === 2) {
                        item.numType = 'IMEI'
                    } else if (item.numType - 0 === 3) {
                        item.numType = 'IMSI'
                    } else if (item.numType - 0 === 1) {
                        item.numType = '手机号'
                    }
                    if (item.greenChannel - 0 === 0) {
                        item.greenChannel = '否'
                    } else if (item.greenChannel - 0 === 1) {
                        item.greenChannel = '是'
                    }
                    return item
                })
                this.myTable.pageOpt.total = resp.total
            }
            this.myTable.listLoading = false
        }
    },
    components: {
        formComp,
        TableComp,
        sysDialog
    }
}
</script>

<style scoped>
.el-form--inline .el-form-item {
    margin-left: 10px;
}
.queryUl {
    width: 100%;
    height: auto;
    list-style: none;
    overflow: hidden;
}
.queryUl li {
    width: 20%;
    height: 30px;
    float: left;
}
.queryUl li p {
    float: left;
    line-height: 30px;
}
.queryUl li p:nth-child(1) {
    text-align: right;
    width: 35%;
}
.queryUl li p:nth-child(2) {
    margin-left: 5%;
    width: 60%;
}
</style>
