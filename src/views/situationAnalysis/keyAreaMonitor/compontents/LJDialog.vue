<template>
    <div class="ga-rightConfig">
        <sysDialog size="small"
                       title="累计用户数统计"
                       @change="dialogChange"
                       @openCallback="dialogOpendCallback"
                       :dialogVisible="dialogVisible"
                       :showConfirm="false"
                       :showCancel='false'>
                <p class="ga-rightConfig__title">添加查询任务</p>
                <FormComp :option="formOptDialog" ref="formDialog"></FormComp>
                <div class="ga-rightConfig__operateWrap">
                    <el-button type="primary"
                               @click="buttonSearch">添加</el-button>
                    <el-button type="primary"
                               @click="buttonClear">清空</el-button>
                </div>
                <div class="ga-rightConfig__buttonWrap">
                    <p>查询结果</p>
                    <p>
                        <el-button type="text" @click="refeshedFunc">
                            <i class="fa fa-refresh"></i>
                            刷新
                        </el-button>
                        <el-button type="text" @click="deleteFunc()">
                            <i class="fa el-icon-delete"></i>
                            删除
                        </el-button>
                    </p>
                </div>
                <div class="ga-rightConfig__tableWrap">
                    <tableCom :option = "tableOptTask" :comSize="comSize" ref="taskTable"
                               @handleCurrentPageChange="taskHandleCurrentPageChange"
                               @handleSizePageChange = "taskHandleSizePageChange">
                    </tableCom>
                </div>
            </sysDialog>
    </div>
</template>
<script>
import sysDialog from 'components/common/dialog'
import tableCom from 'components/Table'
import FormComp from 'components/Form/index'
import { ajax } from 'common'
import { forbiddenDate, getIntervalDate } from 'utils'
export default {
    props: ['taskTime'],
    data() {
        let me = this
        return {
            areaId: '',
            taskId: '',
            timeRang: 1,
            dialogVisible: false,
            formOptDialog: {
                inline: true, // form 表单true横排，false竖排
                labelWidth: '105',
                // 表单项
                items: [{
                    label: '开始时间',
                    type: 'date',
                    required: true,
                    comOpt: {
                        id: 'queryBeginTime',
                        width: 180,
                        value: '',
                        disabled: false,
                        type: 'datetime',
                        pickOptions: {
                            disabledDate (time) {
                                return forbiddenDate(time, me.taskTime.end, me.timeRang)
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
                        value: '',
                        disabled: false,
                        type: 'datetime',
                        pickOptions: {
                            disabledDate (time) {
                                return forbiddenDate(time, me.taskTime.end, me.timeRang)
                            }
                        }
                    }
                }]
            },
            comSize: {
                height: 200
            },
            // 查询任务列表
            tableOptTask: {
                listLoading: false,
                rowHeight: 15,
                column: [
                    // 首列是否显示序号、复选框、下沉展开 index/selection
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    { name: '任务创建时间', value: 'createTime', align: 'center', width: 136 },
                    { name: '任务开始时间', value: 'startTime', align: 'center', width: 136 },
                    { name: '任务结束时间', value: 'endTime', align: 'center', width: 136 },
                    { name: '状态', value: 'status', width: 70, align: 'center' },
                    { name: '累计用户数', value: 'counts', align: 'center', tooltip: true },
                    {
                        name: '操作',
                        value: '',
                        align: 'center',
                        width: 70,
                        operations: [
                            {
                                label: '删除',
                                type: 'label',
                                callback: e => {
                                    if (e.status === 1) {
                                        return 'is-disabled'
                                    }
                                },
                                click: e => {
                                    if (e.status !== 1) {
                                        me.delStr = e.id
                                        me.deleteFunc()
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
            }
        }
    },
    mounted() {
        this.areaId = localStorage.getItem('areaId')
        let str = localStorage.getItem('taskId')
        if (str) {
            let firstNum = str.slice(0, 1);
            this.taskId = firstNum === 'T' ? str.slice(1) : str
        }
    },
    methods: {
        showDialog() {
            this.dialogVisible = true
        },
        // dialog显示回调
        dialogOpendCallback () {
            this.timeRang = moment(this.taskTime.end).diff(this.taskTime.start, 'days') + 2
            this.tableOptTask.pageOpt.data = [];
            this.tableOptTask.pageOpt.currentPage = 1;
            let pageSize = this.tableOptTask.pageOpt.pageSize;
            this.queryFunc(pageSize, 1);
            this.$refs.formDialog.setValue([
                { id: 'queryBeginTime', value: this.taskTime.start },
                { id: 'queryEndTime', value: this.taskTime.end }
            ])
        },
        //  累积用户数弹窗改变
        dialogChange (val) {
            this.dialogVisible = val;
            this.$refs.formDialog.clearValue();
        },
        //  累积用户数清空按钮
        buttonClear () {
            this.$refs.formDialog.clearValue();
        },
        // 添加查询累积人数任务
        addFunc (startTime, endTime) {
            let obj = {
                taskId: this.taskId,
                areaId: this.areaId,
                startTime: startTime,
                endTime: endTime
            }
            ajax.post('/zdqy/addcumulation', obj).then(resp => {
                if (resp.status === 200) {
                    this.$message({
                        type: 'success',
                        message: '添加任务成功！'
                    });
                    this.tableOptTask.pageOpt.data = [];
                    this.tableOptTask.pageOpt.currentPage = 1;
                    let pageSize = this.tableOptTask.pageOpt.pageSize;
                    this.queryFunc(pageSize, 1);
                }
            })
        },
        deleteFunc() {
            this.$confirm('是否确认删除全部查询结果？', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                ajax.post('keyArea/delZdqyCumulation', { ids: this.delStr }).then(resp => {
                    if (resp) {
                        this.$message.success(resp.message)
                        this.tableOptTask.pageOpt.currentPage = 1
                        this.queryFunc(this.tableOptTask.pageOpt.pageSize, 1)
                    }
                })
            })
        },
        // 刷新累计用户数列表
        refeshedFunc () {
            this.tableOptTask.data = [];
            this.queryFunc(this.tableOptTask.pageOpt.pageSize, this.tableOptTask.pageOpt.currentPage);
        },
        //   获取累积人数任务结果列表
        queryFunc (pageSize = 10, page = 1) {
            let obj = {
                'taskId': this.taskId,
                'areaId': this.areaId,
                'rows': pageSize,
                'page': page
            }
            this.tableOptTask.listLoading = true;
            ajax.post('/zdqy/listcumulation', obj).then(resp => {
                let { rows, total } = resp;
                if (rows && _.isArray(rows)) {
                    if (rows.length === 0) {
                        this.tableOptTask.data = []
                    } else {
                        rows.filter((item) => {
                            if (item.status === 0) {
                                item.statuStr = '已完成'
                            } else if (item.status === 2) {
                                item.statuStr = '已失败'
                            } else if (item.status === 1) {
                                item.statuStr = '查询中'
                            }
                            return item
                        })
                    }
                    this.tableOptTask.data = rows;
                    this.tableOptTask.pageOpt.total = total;
                    this.tableOptTask.listLoading = false;
                    let arr = []
                    rows.forEach(item => {
                        arr.push(item.id)
                    })
                    this.delStr = arr.join(',')
                } else {
                    this.tableOptTask.listLoading = false;
                }
            })
        },
        // 累积用户数任务列表分页
        taskHandleCurrentPageChange (val) {
            let pageSize = this.tableOptTask.pageOpt.pageSize;
            this.queryFunc(pageSize, val);
        },
        taskHandleSizePageChange (val) {
            this.tableOptTask.pageOpt.pageSize = val;
            this.tableOptTask.pageOpt.currentPage = 1
            if (this.tableOptTask.data.length !== 0) {
                this.queryFunc(val, 1);
            }
        },
        // 累积用户数弹窗的查询按钮
        buttonSearch () {
            let list = this.$refs.formDialog.getValue();
            let { queryBeginTime, queryEndTime } = list;
            let timeStart = new Date(queryBeginTime).getTime()
            let timeEnd = new Date(queryEndTime).getTime()
            if (queryBeginTime === '' || queryEndTime === '') {
                this.$message.warning('开始时间和结束时间不能为空！')
                return
            }
            if (queryBeginTime !== '' && queryEndTime !== '' && queryBeginTime > queryEndTime) {
                this.$message.warning('开始时间不能大于结束时间！')
                return
            }
            let timeInterval = timeEnd - timeStart < 5 * 60 * 1000 || timeEnd - timeStart > 7 * 24 * 3600 * 1000
            if (timeInterval) {
                this.$message({
                    type: 'warning',
                    message: '开始时间和结束时间最大时间间隔为7天，最小时间间隔为5分钟！'
                });
                return
            }
            let startRange = moment(getIntervalDate()).subtract(10, 'd').format('x')
            if (timeStart < startRange) {
                this.$message({
                    type: 'warning',
                    message: '开始时间必须小于等于当前系统时间向前10天！'
                })
                return
            }
            let timeRangeEnd = moment(getIntervalDate()).diff(moment(queryEndTime));
            if (timeRangeEnd < 0) {
                this.$message({
                    type: 'warning',
                    message: '结束时间不能超过系统当前时间！'
                })
                return
            }
            // 开始执行时间前24小时
            let startRange2 = moment(this.taskTime.start).subtract(1, 'd').format('x')
            if (timeStart < startRange2) {
                this.$alert('开始时间必须大于等于该重点区域实时监测开始执行时间向前推24小时', {
                    confirmButtonText: '确定'
                })
                return
            }
            // 结束时间早于监测结束时间
            let endRange = moment(this.taskTime.end).diff(moment(queryEndTime))
            if (endRange <= 0) {
                this.$message({
                    type: 'warning',
                    message: '结束时间必须早于该重点区域实时监测所在任务结束时间！'
                });
                return
            }
            this.addFunc(queryBeginTime, queryEndTime)
        }
    },
    components: {
        FormComp,
        tableCom,
        sysDialog
    }
}
</script>
<style scoped>
@component-namespace ga {
      @b rightConfig {
          @e title{
              margin-bottom: 10px
          }
          @e operateWrap{
              width: 100%; 
              display: flex;
              justify-content:center;
          }
          @e buttonWrap{
              display: flex;
              justify-content: space-between;
              padding-right: 42px;
          }
          @e tableWrap{
              margin:0 42px;
          }
      }
}
</style>


