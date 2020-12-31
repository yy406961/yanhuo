<template>
    <div class="ga-taskCreate">
        <el-row>
            <div class="ga-taskCreate__topLeft">
                <buttonComp :option="btnOptAdd"></buttonComp>
            </div>
            <div class="ga-taskCreate__topRight">
                <formComp :option="formOpt" ref="form"></formComp>
            </div>
        </el-row>
        <el-row class="addBtn">
            <!-- <buttonComp :option="btnOptAdd"></buttonComp> -->
        </el-row>
        <el-row>
            <tableComp :option="tableOpt"
                       :comSize="tableSize"
                       @handleCurrentPageChange="handleCurrentPageChange"
                       @handleSizePageChange="handleSizePageChange"></tableComp>
        </el-row>
        <!--提交确认框-->
        <!-- <sysDialog :dialogVisible="commitShow"
                   title="任务提交"
                   size="tiny"
                   @change="dialogChange"
                   :okFn="confirmCommit">
            <span>确认提交该任务？</span>
        </sysDialog> -->
        <!--删除确认框-->
        <!-- <sysDialog :dialogVisible="deleteShow"
                   title="任务删除"
                   size="tiny"
                   @change="dialogChange"
                   :okFn="confirmDelete">
            <span>确认删除该任务？</span>
        </sysDialog> -->
        <!--撤回确认框-->
        <!-- <sysDialog :dialogVisible="withdrawShow"
                   title="任务撤回"
                   size="tiny"
                   @change="dialogChange"
                   :okFn="confirmWithdraw">
            <span>确认撤回该任务？</span>
        </sysDialog> -->
        <!--中止确认框-->
        <!-- <sysDialog :dialogVisible="stopTaskShow"
                   title="中止任务"
                   size="tiny"
                   @change="dialogChange"
                   :okFn="confirmStopTask">
            <span>确认中止该任务？</span>
        </sysDialog> -->
        <!--完成确认框-->
        <!-- <sysDialog :dialogVisible="finishTaskShow"
                   title="完成任务"
                   size="tiny"
                   @change="dialogChange"
                   :okFn="confirmFinishTask">
            <span>确认完成该任务？</span>
        </sysDialog> -->
    </div>
</template>
<script>
import formComp from 'components/Form/index'
import buttonComp from 'components/Form/button'
import tableComp from 'components/Table/'
import {
    setStatus,
    delApp,
    withdraw,
    finnishTask,
    taskAddState
} from 'api/system/taskCreate.js'
import { stopTask } from 'api/task/taskDetail'
import { mapGetters } from 'vuex'
import sysDialog from 'components/common/dialog'
//    新增
import basicInfo from './config/basicInfo'
import areaRange from './config/areaRange'
import keyWord from '../keywordsManage'
import selectFunc from './config/selectFunc'
import targetNum from '../targetNumberManage'
import { ajax } from 'common'
export default {
    name: 'taskCreate',
    data () {
        let me = this
        return {
            taskBaseId: '',
            commitData: {
                taskBaseId: '',
                approvalId: '',
                approverStatus: 0
            },
            withdrawObj: {
                taskBaseId: '',
                approvalId: '',
                approverStatus: 0
            },
            // modifyShow: false,
            // commitShow: false,
            // deleteShow: false,
            // withdrawShow: false,
            // stopTaskShow: false,
            // finishTaskShow: false,
            taskId: '',
            searchOpt: {
                taskName: '',
                owner: '',
                fileNo: '',
                approverStatus: 0,
                greenChannel: '0',
                rows: '',
                page: 1
            },
            formOpt: {
                //                    form 表单true横排，false竖排
                inline: true,
                btnPos: 'right',
                labelWidth: '80',
                // 表单项
                items: [
                    {
                        label: '任务名称',
                        type: 'text',
                        comOpt: {
                            id: 'taskName',
                            value: '',
                            disabled: false,
                            width: '150'
                        }
                    },
                    {
                        label: '任务使用人',
                        type: 'text',
                        comOpt: {
                            id: 'owner',
                            value: '',
                            disabled: false,
                            width: '150'
                        }
                    },
                    {
                        label: '批准文号',
                        type: 'text',
                        comOpt: {
                            id: 'fileNo',
                            value: '',
                            disabled: false,
                            width: '150'
                        }
                    },
                    {
                        label: '绿色通道',
                        type: 'select',
                        comOpt: {
                            id: 'greenChannel',
                            value: '否',
                            disabled: false,
                            width: '90',
                            data: [
                                // {
                                //     name: '全部', value: ''
                                // },
                                {
                                    name: '是',
                                    value: '1'
                                },
                                {
                                    name: '否',
                                    value: '0'
                                }
                            ],
                            change: function () {
                                me.tableOpt.pageOpt.currentPage = 1
                            }
                        }
                    },
                    {
                        label: '审批状态',
                        type: 'select',
                        comOpt: {
                            id: 'approverStatus',
                            value: '0',
                            disabled: false,
                            width: '130',
                            data: [
                                // {
                                //     name: '全部', value: ''
                                // },
                                {
                                    name: '未提交',
                                    value: '0'
                                },
                                {
                                    name: '已提交',
                                    value: '1'
                                },
                                {
                                    name: '审批未通过',
                                    value: '2'
                                },
                                {
                                    name: '审批已通过',
                                    value: '3'
                                }
                            ],
                            change: function () {
                                me.tableOpt.pageOpt.currentPage = 1
                            }
                        }
                    }
                ],
                btns: [
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '查询',
                            disabled: false,
                            click: function () {
                                me.initTable()
                                me.getSearch()
                            }
                        }
                    }
                ]
            },
            btnOptAdd: {
                value: '添加任务',
                disabled: false,
                click: function () {
                    me.$router.push({
                        name: '任务新增',
                        params: {
                            operateStatus: 0
                        }
                    })
                }
            },
            tableOpt: {
                //                    不设置width ，默认自适应
                listLoading: false,
                //                    是否为斑马纹 table
                stripe: false,
                column: [
                    // 首列是否显示序号、复选框、下沉展开 index/selection
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    { name: '任务名称', value: 'taskName', align: 'center', tooltip: true },
                    { name: '开始时间', value: 'beginTime', width: 150, align: 'center' },
                    { name: '结束时间', value: 'endTime', width: 150, align: 'center' },
                    { name: '任务管理员', value: 'taskCreater', width: 100, align: 'center', tooltip: true },
                    { name: '任务使用人', value: 'owner', width: 100, align: 'center', tooltip: true },
                    { name: '任务创建时间', value: 'taskCreateTime', width: 150, align: 'center' },
                    { name: '绿色通道', value: 'greenChannelc', width: 60, align: 'center' },
                    { name: '审批时间', value: 'approverTime', width: 142, align: 'center' },
                    {
                        name: '操作',
                        value: '',
                        align: 'center',
                        width: 260,
                        operations: [
                            {
                                label: '查看',
                                type: 'label',
                                icon: 'edit',
                                click: me.checkClick
                            },
                            {
                                label: '修改',
                                type: 'label',
                                icon: 'edit',
                                click: me.editClick,
                                callback (row) {
                                    // 未提交的或（是绿色通道的且是已审批过的（只能修改批文，添加批文保存后，后面页签不亮））可修改
                                    if (
                                        row.approverStatus === 0 ||
                                        (row.greenChannel === '1' && row.approverStatus === 3)
                                    ) {
                                        this.disabled = false
                                    } else {
                                        this.disabled = true
                                    }
                                }
                            },
                            {
                                label: '删除',
                                type: 'label',
                                icon: 'close',
                                text: '确认删除此任务？',
                                click: me.deleteClick,
                                isConfirm: true,
                                callback (row) {
                                    // 未提交的且不是追加后未提交的可删除
                                    if (row.approverStatus === 0 && row.isAdd !== '1') {
                                        this.disabled = false
                                    } else {
                                        this.disabled = true
                                    }
                                }
                            },
                            {
                                label: '提交',
                                type: 'label',
                                icon: 'check',
                                text: '确认提交此任务？',
                                isConfirm: true,
                                click: me.commitClick,
                                callback (row) {
                                    if (row.approverStatus === 0) {
                                        this.disabled = false
                                    } else {
                                        this.disabled = true
                                    }
                                }
                            },
                            {
                                label: '追加',
                                type: 'label',
                                icon: 'plus',
                                click: me.addClick,
                                callback (row) {
                                    // 已审批过的可追加
                                    if (row.approverStatus === 3) {
                                        // 已审批过且是绿色通道的不能追加 (只能追加一次)
                                        // if (row.greenChannel === '1' || Number(row.approvalNum) >= 2) {
                                        if (
                                            row.greenChannel === '1' ||
                                            row.taskStatus === '2' ||
                                            row.taskStatus === '3'
                                        ) {
                                            this.disabled = true
                                        } else {
                                            this.disabled = false
                                        }
                                    } else {
                                        this.disabled = true
                                    }
                                }
                            },
                            {
                                label: '撤回',
                                type: 'label',
                                icon: 'withdraw',
                                text: '确认撤回此任务？',
                                isConfirm: true,
                                click: me.withdrawClick,
                                callback (row) {
                                    // 已提交未审批的可撤回
                                    if (row.approverStatus === 1) {
                                        this.disabled = false
                                    } else {
                                        this.disabled = true
                                    }
                                }
                            },
                            //  {
                            //  label: '中止', type: 'label', icon: 'withdraw', click: me.stopTaskClick, callback (row) {
                            // 审批已通过（3）且任务状态为在控状态的任务（1）可以终止
                            //  if (row.approverStatus === 3 && row.taskStatus === '1') {
                            //       this.disabled = false
                            //   } else {
                            //        this.disabled = true
                            //  }
                            //   }
                            // },
                            {
                                label: '延期',
                                type: 'label',
                                icon: 'delay',
                                click: me.delayTaskClick,
                                callback (row) {
                                    // 任务状态为在控状态的任务（1）可以延期
                                    if (row.taskStatus === '1' && row.approverStatus === 3) {
                                        this.disabled = false
                                    } else {
                                        this.disabled = true
                                    }
                                }
                            },
                            {
                                label: '完成',
                                type: 'label',
                                icon: 'finish',
                                text: '确认完成此任务？',
                                isConfirm: true,
                                click: me.finishTaskClick,
                                callback (row) {
                                    // 审批已通过（3）且任务状态为在控状态的任务（1）可以完成
                                    if (row.approverStatus === 3 && row.taskStatus === '1') {
                                        this.disabled = false
                                    } else {
                                        this.disabled = true
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
                },
                cellClick: function (row) {
                    // 提交和删除的数据
                    me.commitData.isAdd = row.isAdd
                    me.commitData.taskBaseId = row.taskBaseId
                    me.commitData.approvalId = row.approvalId
                    me.taskBaseId = row.taskBaseId
                }
            },
            activeName: 'first',
            editTargetNum: false,
            editAreaRange: false,
            editKeyWord: false,
            editFun: false,
            isLoadTarNum: false,
            isLoadKeyWords: false,
            isLoadAreaRange: false,
            taskST: '',
            taskET: '',
            taskName: '',
            operateStatus: 0
        }
    },
    computed: {
        ...mapGetters({
            vsHeight: 'global/visualHeight',
            backFuncList: 'global/funInfoList',
            backAlaList: 'global/alaInfoList'
        }),
        tableSize () {
            return {
                height: this.vsHeight - 120
            }
        },
        contentHeight () {
            return {
                height: this.vsHeight - 40 + 'px'
            }
        },
        tableHeight () {
            return this.vsHeight - 140
        }
    },
    mounted () {
        this.getAllList()
    },
    methods: {
        // 默认查找审批状态为0，绿色通道为否的table数据
        getAllList () {
            this.searchOpt.rows = this.tableOpt.pageOpt.pageSize
            this.tableOpt.listLoading = true
            this.tableOpt.data = []
            ajax.post('approval/getAllList', this.searchOpt).then(resp => {
                if (resp) {
                    let { rows } = resp
                    rows.map(item => {
                        if (item.greenChannel === '0') {
                            item.greenChannelc = '否'
                        } else {
                            item.greenChannelc = '是'
                        }
                    })
                    this.tableOpt.listLoading = false
                    this.tableOpt.data = rows
                    this.tableOpt.pageOpt.total = resp.total
                }
            })
            .catch(e => {
                this.tableOpt.listLoading = false
                console.log(e)
            })
        },
        // 分页
        handleCurrentPageChange (val) {
            this.tableOpt.pageOpt.currentPage = val
            this.searchOpt.page = val;
            if (this.tableOpt.data.length !== 0) {
                this.getAllList()
            }
        },
        handleSizePageChange (val) {
            this.tableOpt.pageOpt.pageSize = val
            this.tableOpt.pageOpt.currentPage = 1
            this.searchOpt.rows = val
            this.searchOpt.page = 1
            if (this.tableOpt.data.length !== 0) {
                this.getAllList()
            }
        },
        // 提交接口
        async setStatus () {
            this.commitData.approverStatus = 1
            let resp = await setStatus(this.commitData)
            if (resp) {
                this.$message(resp.message)
            }
            this.getSearch()
        },
        // 删除接口
        async delApp () {
            this.commitData.approverStatus = 0
            let resp = await delApp(this.commitData)
            if (resp) {
                this.$message(resp.message)
            }
            this.getSearch()
        },
        // 撤回接口
        async withdraw () {
            let resp = await withdraw(this.withdrawObj)
            if (resp) {
                this.$message(resp.message)
                //                    this.getAllList();
                this.getSearch()
            }
        },
        // 中止接口
        async stopTask () {
            let resp = await stopTask({ taskBaseId: this.taskBaseId })
            if (resp) {
                this.$message(resp.message)
                //                    this.getAllList();
                this.getSearch()
            }
        },
        // 完成接口
        async finnishTask () {
            let resp = await finnishTask({ taskBaseId: this.taskBaseId })
            if (resp) {
                this.$message(resp.message)
                //                    this.getAllList();
                this.getSearch()
            }
        },
        initTable() {
            this.tableOpt.pageOpt.total = 0
            this.tableOpt.pageOpt.pageSize = 10
            this.tableOpt.pageOpt.currentPage = 1
            this.searchOpt.rows = 10
            this.searchOpt.page = 1
        },
        // 根据具体条件查询
        getSearch () {
            if (this.$refs.form) {
                this.searchOpt = Object.assign(this.searchOpt, this.$refs.form.getValue())
            }
            if (this.searchOpt.greenChannel === '否') {
                this.searchOpt.greenChannel = '0'
            }
            this.getAllList()
        },
        // 查看
        checkClick (row) {
            this.$router.push({
                name: '任务新增',
                params: {
                    title: '任务查看',
                    taskId: `T${row.taskBaseId}`,
                    operateStatus: 3,
                    approverStatus: row.approverStatus,
                    greenChannel: row.greenChannel,
                    isAdd: row.isAdd
                }
            })
        },
        // 修改
        editClick (row) {
            this.$router.push({
                name: '任务新增',
                params: {
                    title: '任务修改',
                    taskId: `T${row.taskBaseId}`,
                    operateStatus: 1,
                    approverStatus: row.approverStatus,
                    greenChannel: row.greenChannel,
                    isAdd: row.isAdd
                }
            })
        },
        // 追加
        addClick (row) {
            taskAddState({ taskBaseId: row.taskBaseId }).then(resp => {
                if (resp) {
                    if (resp.data.addState === 1) {
                        this.$router.push({
                            name: '任务新增',
                            params: {
                                title: '任务追加',
                                taskId: `T${row.taskBaseId}`,
                                operateStatus: 2,
                                approverStatus: row.approverStatus,
                                greenChannel: row.greenChannel
                            }
                        })
                    } else {
                        this.$message(resp.message)
                    }
                }
            })
        },
        // 延期
        delayTaskClick (row) {
            this.$router.push({
                name: '任务新增',
                params: {
                    title: '任务延期',
                    taskId: `T${row.taskBaseId}`,
                    operateStatus: 4,
                    approverStatus: row.approverStatus
                }
            })
        },
        // 提交弹窗
        commitClick () {
            // this.commitShow = true
            this.$confirm('是否确认提交？', '提交提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.setStatus()
            })
        },
        // 确认提交
        // confirmCommit () {
        //     this.setStatus()
        //     this.dialogChange(false)
        // },
        // 删除弹窗
        deleteClick () {
            // this.deleteShow = true
            this.$confirm('是否确认删除？', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.delApp()
            })
        },
        // 确认删除
        // confirmDelete () {
        //     this.delApp()
        //     this.dialogChange(false)
        // },
        // 撤回弹窗
        withdrawClick (row) {
            this.$confirm('是否确认撤回？', '撤回提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.withdrawObj.taskBaseId = row.taskBaseId
                this.withdrawObj.approvalId = row.approvalId
                this.withdrawObj.approverStatus = 0
                this.withdraw()
            })
            // this.withdrawShow = true
        },
        // 确认撤回
        // confirmWithdraw () {
        //     this.withdraw()
        //     this.dialogChange(false)
        // },
        // 中止任务弹窗
        // stopTaskClick () {
        //     this.stopTaskShow = true
        // },
        // 完成任务弹窗
        finishTaskClick () {
            // this.finishTaskShow = true
            this.$confirm('是否确认完成？', '完成提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.finnishTask()
            })
        }
        // confirmFinishTask () {
        //     this.dialogChange(false)
        //     this.finnishTask()
        // },
        // 确认中止
        // confirmStopTask () {
        //     this.dialogChange(false)
        //     this.stopTask()
        // },
        // 确认完成
        // confirmCommitInfo () {},
        // 切换弹窗
        // dialogChange (val) {
        //     this.modifyShow = val
        //     this.commitShow = val
        //     this.deleteShow = val
        //     this.withdrawShow = val
        //     this.stopTaskShow = val
        //     this.finishTaskShow = val
        // },
    },
    components: {
        formComp,
        tableComp,
        buttonComp,
        sysDialog,
        basicInfo,
        areaRange,
        keyWord,
        selectFunc,
        targetNum
    }
}
</script>
<style scoped>
.addBtn {
    margin-bottom: 10px;
}
@component-namespace ga {
    @b taskCreate {
        @e topLeft{
            float:left;
            height: 68px;
            display: flex;
            align-items: center;
        }
        @e topRight{
            padding-left:100px;
        }
    }
}
</style>
