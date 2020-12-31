<template>
    <div class="ga-rightConfig">
        <sysDialog
                title="累计用户数配置"
                @change="dialogConfigChange"
                @openCallback="dialogConfigOpendCallback"
                :dialogVisible="configDiaShow"
                :showConfirm="false"
                :showCancel='false'>
        <p style="margin-bottom: 10px">累计用户数统计时间配置</p>
        <FormComp :option="formConfigOpt" ref="configDiaRef"></FormComp>
        <div style="margin: 0 42px">
            <tableCom :option = "tableConfigOpt" :comSize="comSize" ref="configTable"
                        @handleCurrentPageChange="configHandleCurrentPageChange"
                        @handleSizePageChange = "configHandleSizePageChange">
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
            configDiaShow: false,
            timeRang: 1,
            formConfigOpt: {
                inline: true, // form 表单true横排，false竖排
                labelWidth: '120',
                btnPos: 'right',
                // 表单项
                items: [
                    {
                        label: '开始时间',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'startTime',
                            width: 210,
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
                            id: 'endTime',
                            width: 210,
                            value: '',
                            disabled: false,
                            type: 'datetime',
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time, me.taskTime.end, me.timeRang)
                                }
                            }
                        }
                    }
                ],
                btns: [
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            id: 'configBtn',
                            value: '配置',
                            disabled: false,
                            click: function () {
                                me.configVer()
                            }
                        }
                    }
                ]
            },
            comSize: {
                height: 200
            },
            tableConfigOpt: {
                listLoading: false,
                rowHeight: 15,
                column: [
                    // 首列是否显示序号、复选框、下沉展开 index/selection
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    { name: '任务创建时间', value: 'createTime', align: 'center', width: 136 },
                    { name: '统计开始时间', value: 'startTime', align: 'center', width: 136 },
                    { name: '统计结束时间', value: 'endTime', align: 'center' },
                    { name: '状态', value: 'status', width: 80, align: 'center' },
                    {
                        name: '操作',
                        value: '',
                        align: 'center',
                        width: 100,
                        operations: [
                            {
                                label: '删除',
                                type: 'label',
                                callback: e => {
                                    if (e.state === '0') {
                                        return 'is-disabled'
                                    }
                                },
                                click: e => {
                                    if (e.state !== '0') {
                                        me.configDelete(e)
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
            this.configDiaShow = true
        },
        // 累计用户数配置
        dialogConfigChange() {
            this.configDiaShow = false
        },
        dialogConfigOpendCallback() {
            this.timeRang = moment(this.taskTime.end).diff(this.taskTime.start, 'days') + 1
            if (moment(this.taskTime.end).diff(moment(getIntervalDate())) < 0) {
                this.formConfigOpt.btns[0].comOpt.disabled = true
            }
            this.configQuery()
            this.$refs.configDiaRef.clearValue();
        },
        // 查询接口
        configQuery(e = { page: 1, rows: 10 }) {
            let obj = {
                taskId: this.taskId,
                areaId: this.areaId,
                pageNum: e.page,
                pageSize: e.rows
            }
            let bool = false
            this.tableConfigOpt.data = []
            this.tableConfigOpt.listLoading = true
            ajax.post('keyAreaConfig/getKeyAreaConfig', obj).then(resp => {
                let { rows, total } = resp
                if (rows) {
                    let data = []
                    data = rows.map(item => {
                        if (item.state === '0') {
                            item.status = '执行中'
                            bool = true
                        } else {
                            item.status = '已完成'
                        }
                        return item
                    })
                    this.tableConfigOpt.listLoading = false
                    this.tableConfigOpt.data = data
                    this.tableConfigOpt.pageOpt.total = total
                    this.formConfigOpt.btns[0].comOpt.disabled = bool
                }
            })
            .catch(error => {
                console.log(error)
                this.tableConfigOpt.listLoading = false
            })
        },
        // 新增接口
        configAdd(obj) {
            ajax.post('keyAreaConfig/insertKeyAreaConfig', obj).then(resp => {
                if (resp) {
                    this.$message.success(resp.message)
                    this.configQuery()
                }
            })
        },
        // 删除接口
        configDelete(rows) {
            this.$confirm('是否确认删除？', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                ajax.post('keyAreaConfig/delKeyAreaConfig', { uuid: rows.uuid }).then(resp => {
                    if (resp) {
                        this.$message.success(resp.message)
                        this.configQuery()
                    }
                })
            })
        },
        configHandleCurrentPageChange(val) {
            this.tableConfigOpt.pageOpt.currentPage = val
            if (this.tableConfigOpt.data.length) {
                this.configQuery({ page: val, rows: this.tableConfigOpt.pageOpt.pageSize })
            }
        },
        configHandleSizePageChange(val) {
            this.tableConfigOpt.pageOpt.currentPage = 1
            this.tableConfigOpt.pageOpt.pageSize = val
            if (this.tableConfigOpt.data.length) {
                this.configQuery({ page: 1, rows: val })
            }
        },
        // 验证
        configVer() {
            let formObj = this.$refs.configDiaRef.getValue()
            let { startTime, endTime } = formObj
            // 获取时间戳(以秒为单位)
            // moment().format('X') // 返回值为字符串类型
            // moment().unix() // 返回值为数值型
            // 获取时间戳(以毫秒为单位)
            // moment().format('x') // 返回值为字符串类型
            // moment().valueOf() // 返回值为数值型
            if (startTime === '' || endTime === '') {
                this.$message.warning('开始时间和结束时间不能为空！')
                return
            }
            let end1W24 = moment(endTime).diff(moment(startTime), 'hours')
            let end1W24Bool = end1W24 >= 2 && end1W24 <= 12
            if (!end1W24Bool) {
                this.$message.warning('开始时间和结束时间最大时间间隔为12小时，最小时间间隔为2小时！')
                return
            }
            // 开始执行时间前24小时
            let timeStart = new Date(startTime).getTime()
            let startRange2 = moment(this.taskTime.start).format('x')
            if (timeStart < startRange2) {
                this.$message.warning('开始时间必须大于等于该重点区域实时监测开始执行时间!')
                return
            }
            // 开始时间必须大于等于系统当前时间30分钟
            // let timeBe30 = moment(getIntervalDate()).format('X') + 30 * 60 * 1000
            // if (timeStart < timeBe30) {
            //     this.$message.warning('开始时间必须大于等于系统当前时间30分钟!')
            //     return
            // }
            // 结束时间早于监测结束时间
            let endRange = moment(this.taskTime.end).diff(moment(endTime))
            if (endRange < 0) {
                this.$message({
                    type: 'warning',
                    message: '结束时间必须早于该重点区域实时监测所在任务结束时间结束时间！'
                });
                return
            }
            let obj = {
                taskId: this.taskId,
                areaId: this.areaId,
                startTime: startTime,
                endTime: endTime
            }
            this.configAdd(obj)
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

      }
}
</style>


