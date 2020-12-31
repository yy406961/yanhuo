<template>
    <div style="width: 100%;height: 100%">
        <div class='ga-select'>
            <buttonComp :option="btnOpt"></buttonComp>
        </div>
        <!--目标选择弹出框-->
        <bookSMSQueryDialog size="small" title="目标选择"
                            :okFn="okFn" :cancleFn="cancleFn"
                            :dialogVisible="popShow"
                            @openCallback="dialogOpendCallback">
            <el-row>
                <el-col :span="24">
                    <bookSMSQueryForm :option="formOpt" ref="form"></bookSMSQueryForm>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <bookSMSQueryTable :option="tableOptTarget"
                                       :comSize="tableTargetSize"
                                       ref="tableTarget"
                                       @handleSelectionChange="handleSelectionChange"></bookSMSQueryTable>
                </el-col>
            </el-row>
        </bookSMSQueryDialog>
        <!--主要内容-->
        <div class='ga-mainContent'>
            <bookSMSQueryTable :option="tableOptResult"
                               :comSize="tableSize"
                               @handleCurrentPageChange="handleCurrentPageChange"
                               @handleSizePageChange="handleSizePageChange"></bookSMSQueryTable>
        </div>
    </div>
</template>

<script>
import bookSMSQueryForm from 'components/Form'
import bookSMSQueryTable from 'components/Table'
import bookSMSQueryDialog from 'components/common/dialog'
import buttonComp from 'components/Form/button'
import { getBookTargetist, getBookSMSList } from 'api/msgAnalysis/bookSMSQuery'
import { mapGetters } from 'vuex'
import { forbiddenDate } from 'utils'
export default {
    name: 'targetMsgSeach',
    data() {
        let yesterday = new Date().getTime() - 24 * 60 * 60 * 1000
        let me = this
        return {
            //                向后台传输目标信息
            sendPhones: [],
            //                分页所用数据
            formObj: {
                msisdn: '',
                queryBeginTime: '',
                queryEndTime: '',
                rows: 10,
                page: 1
            },
            formBookObj: {
                owner: ''
            },
            // contentShow: false,
            //                控制弹框是否显示
            popShow: false,
            tableTargetSize: {
                height: 350
            },
            formOpt: {
                // form 表单true横排，false竖排
                inline: true,
                labelWidth: '80',
                // 表单项
                items: [
                    {
                        label: '开始时间',
                        type: 'date',
                        required: true,
                        editable: false,
                        comOpt: {
                            id: 'queryBeginTime',
                            value: yesterday,
                            disabled: false,
                            type: 'date',
                            width: 180,
                            pickOptions: {
                                disabledDate(time) {
                                    return forbiddenDate(time, yesterday)
                                }
                            }
                        }
                    },
                    {
                        label: '结束时间',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'queryEndTime',
                            value: yesterday,
                            disabled: false,
                            type: 'date',
                            width: 180,
                            pickOptions: {
                                disabledDate(time) {
                                    return forbiddenDate(time, yesterday)
                                }
                            }
                        }
                    }
                ]
            },
            tableOptResult: {
                listLoading: false,
                stripe: false,
                column: [
                    { name: '序号', value: 'index', width: 80, align: 'center' },
                    { name: '手机号码', value: 'msisdn', width: 160, align: 'center' },
                    { name: '订票平台', value: 'platform', align: 'center' },
                    { name: '出发时间', value: 'startTime', width: 180, align: 'center' },
                    //                        { name: '到达时间', value: 'endTime', width: 180, align: 'center' },
                    { name: '出发地', value: 'origin', align: 'center' },
                    { name: '目的地', value: 'dest', align: 'center' },
                    { name: '订票时间', value: 'traveTime', width: 180, align: 'center' },
                    { name: '短信内容', value: 'smsContent', tooltip: true }
                ],
                data: [],
                pagination: true,
                pageOpt: {
                    currentPage: 1,
                    total: 0,
                    pageSizes: [10, 20, 30, 40, 50],
                    pageSize: 10
                }
            },
            tableOptTarget: {
                listLoading: false,
                stripe: false,
                column: [
                    { name: '序号', value: 'index', width: 80, align: 'center' },
                    { name: '手机号', value: 'msisdn', width: 180, align: 'center' },
                    { name: '卡号', value: 'imsi', width: 180, align: 'center' },
                    { name: '机身码', value: 'imei', width: 180, align: 'center' },
                    { name: '用户名', value: 'name', align: 'center' },
                    { name: '', value: 'selection', align: 'center' }
                ],
                data: []
            },
            btnOpt: {
                id: 'btn1',
                value: '目标选择',
                disabled: false,
                click: function() {
                    me.popShow = !me.popShow
                }
            }
        }
    },
    methods: {
        // 目标选择勾选框
        handleSelectionChange(val) {
            let phoneMap = this.$refs.tableTarget.phoneMap
            this.sendPhones = []
            if (this.isPhoneJM) {
                let keys = Object.keys(phoneMap)
                keys.forEach(key => {
                    val.forEach(item => {
                        if (key === item.msisdn) {
                            this.sendPhones.push(phoneMap[key])
                        }
                    })
                })
            } else {
                for (let i = 0; i < val.length; i++) {
                    this.sendPhones.push(val[i].msisdn)
                }
            }
        },
        //            确认函数
        okFn() {
            let formValueList = this.$refs.form.getValue()
            if (!formValueList.queryBeginTime) {
                this.$alert('请输开始时间', {
                    confirmButtonText: '确定'
                })
            } else if (!formValueList.queryEndTime) {
                this.$alert('请输结束时间', {
                    confirmButtonText: '确定'
                })
            } else if (formValueList.queryBeginTime > formValueList.queryEndTime) {
                this.$alert('请输入正确的起止日期', {
                    confirmButtonText: '确定'
                })
            } else if (!this.sendPhones.length) {
                this.$alert('请选择目标人', {
                    confirmButtonText: '确定'
                })
            } else {
                this.tableOptResult.pageOpt.currentPage = 1
                this.tableOptResult.pageOpt.total = 0
                this.popShow = false
                this.getList()
                // this.contentShow = true
                this.timeLimit()
            }
        },
        cancleFn() {
            this.popShow = false
            this.timeLimit()
        },
        // 添加查询任务开始时间和结束时间的限制
        timeLimit() {
            let yesterDay = new Date().getTime() - 24 * 60 * 60 * 1000
            this.$refs.form.setValue([
                { id: 'queryBeginTime', value: yesterDay },
                { id: 'queryEndTime', value: yesterDay }
            ])
        },
        //            dialog显示回调
        dialogOpendCallback() {
            this.tableOptTarget.data = []
            this.tableOptTarget.listLoading = true
            this.getBookTargetContent()
        },
        //            获取订票短信检测目标列表
        async getBookTargetContent() {
            this.formBookObj.owner = this.ownerId
            //  测试代码
            //                this.formBookObj.owner = 'T341'
            this.formBookObj.approverStatus = 3
            let resp = await getBookTargetist(this.formBookObj)
            if (resp) {
                this.tableOptTarget.listLoading = false
                this.tableOptTarget.data = resp.rows
            }
        },
        //          获取订票信息列表
        async getBookSMSContent() {
            this.tableOptResult.data = []
            this.tableOptResult.listLoading = true
            let resp = await getBookSMSList(this.formObj)
            let { rows, total } = resp
            if (resp && _.isArray(rows)) {
                //                    this.tableOptResult.pageOpt.currentPage = 1;
                this.tableOptResult.listLoading = false
                this.tableOptResult.data = rows
            }
            this.tableOptResult.listLoading = false
            this.tableOptResult.data = rows
            //                    给分页的总条数赋值
            this.tableOptResult.pageOpt.total = total
        },
        handleCurrentPageChange(val) {
            this.tableOptResult.pageOpt.currentPage = val
            this.formObj.page = this.tableOptResult.pageOpt.currentPage
            if (this.tableOptResult.data.length) {
                this.getBookSMSContent()
            }
        },
        handleSizePageChange(val) {
            this.tableOptResult.pageOpt.currentPage = 1
            this.tableOptResult.pageOpt.pageSize = val
            this.formObj.rows = val
            this.formObj.page = 1
            if (this.tableOptResult.data.length) {
                this.getBookSMSContent()
            }
        },
        getList() {
            this.formObj = Object.assign(this.formObj, this.$refs.form.getValue())
            this.formObj.msisdn = this.sendPhones.join(',')
            this.getBookSMSContent()
        }
    },
    components: {
        bookSMSQueryForm,
        bookSMSQueryTable,
        bookSMSQueryDialog,
        buttonComp
    },
    computed: {
        ...mapGetters({
            vsHeight: 'global/visualHeight',
            userName: 'global/userName',
            isPhoneJM: 'global/isPhoneJM'
        }),
        taskId() {
            return localStorage.getItem('taskId')
        },
        ownerId() {
            return this.taskId ? this.taskId : this.userName
        },
        tableSize() {
            return {
                height: this.vsHeight - 90
            }
        }
    }
}
</script>

<style scoped>
@component-namespace ga {
    /*上方选择框*/
    @b select {
        padding-top: 5px;
        margin-bottom: 15px;
        /*目标选择*/
        @e targetSelect {
            width: 81px;
            height: 38px;
            background-color: rgb(39, 141, 227);
            border: none;
            color: #fff;
            border-radius: 4px;
        }
        @e targetSelect:hover {
            cursor: pointer;
        }
    }
}
</style>
