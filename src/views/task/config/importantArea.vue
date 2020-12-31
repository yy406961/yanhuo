<template>
    <div class="ga-configArea">
        <el-button type="primary" @click="addBtn" :disabled="taskStatus === '2' || taskStatus === '3'">新增</el-button>
        <tableComp class="ga-configArea__marginTop10" :option="importantAreaOpt" :comSize="tableSize"
                   @handleCurrentPageChange="handleCurrentPageChange"
                   @handleSizePageChange = "handleSizePageChange"></tableComp>
        <div>
            <!--<buttonComp :option="importantAreaSaveBtn"></buttonComp>-->
        </div>
        <sysDialog size="small" title="重点区域"
            v-if="dialogVisible"
            :dialogVisible="dialogVisible"
            :okFn="dialogOkFn"
            @change="dialogChange">
            <div class="ga-configArea__dialogFormWrap">
                <!-- <el-row class="ga-warnConfigBox">
                    <el-col :span="4">重点区域监测名称</el-col>
                    <el-col :span="18">
                        <el-input placeholder="请输入重点区域监测名称" v-model="taskParm.importAreaName"></el-input>
                    </el-col>
                </el-row>
                <el-row class="ga-warnConfigPer" style="margin-bottom: 10px">
                    <section>
                        <el-col :span="3">监测区域</el-col>
                        <el-col :span="4">
                            <el-select placeholder="请选择" v-model="taskParm.areaId">
                                <el-option v-for="item in warnAreaSelect" :value="item.resourceId" :key="item.resourceId" :label="item.areaName">{{ item.areaName }}</el-option>
                            </el-select>
                        </el-col>
                    </section>
                </el-row> -->
                <formComp :option="formOpt" ref="form"></formComp>
                <!--<square title="告警人员" minHeight="300">-->
                    <!--<tableComp :option="warnPerson" :comSize="warTableSize" ref="targetNumTable"-->
                               <!--@handleSelectionChange="warnHandleSelectionChange"></tableComp>-->
                <!--</square>-->
            </div>
        </sysDialog>
    </div>
</template>
<script>
    // import moment from 'moment'
    import formComp from 'components/Form'
    import tableComp from 'components/Table/'
    import buttonComp from 'components/Form/button'
    import square from 'components/common/square'
    import sysDialog from 'components/common/dialog'
    import { forbiddenDate, getIntervalDate } from 'utils'
    import { selectedAreaInfoQuery } from 'api/task/taskArea'
    import { getTargetTelList } from 'api/baseData'
    import { taskBaseQuery } from 'api/task/taskConfig'
    import { importantAreaQuery, importantAreaAdd, importantAreaUpdate } from 'api/task/importantArea'
    import { importantAreaList, importantAreaDelete, importMsisdnQuery } from 'api/task/importantArea'
    import { mapGetters } from 'vuex'
    export default {
        name: 'importantArea',
        data () {
            let me = this
            return {
                importantAreaOpt: {
                    listLoading: false,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '重点区域监测名称', value: 'importAreaName', align: 'center' },
                        // { name: '重点人数', value: 'importCount', align: 'center' },
                        { name: '监测区域', value: 'areaName', align: 'center' },
                        { name: '有效期', value: 'effectiveTime', align: 'center' },
                        { name: '操作', value: '', width: 120, align: 'center', operations: [
                            { label: '编辑', type: 'label', callback: function (row) {
                                if (me.taskStatus === '2' || me.taskStatus === '3' || +row.isOver === 1) {
                                    this.disabled = true;
                                    return 'is-disabled'
                                } else {
                                    this.disabled = false;
                                }
                            }, click: me.editClick },
                            { label: '删除', type: 'label', isConfirm: true, text: '确认删除此数据？',
                                callback: function () {
                                    if (me.taskStatus === '2' || me.taskStatus === '3') {
                                        this.disabled = true;
                                        return 'is-disabled'
                                    } else {
                                        this.disabled = false;
                                    }
                                }, click: me.deleteClick }] }
                    ],
                    data: [],
                    // 是否分页
                    pagination: true,
                    pageOpt: {
                        total: 0,
                        page: 1,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
                // importantAreaSaveBtn: {
                //     id: 'btn1',
                //     value: '确定',
                //     disabled: false,
                //     click: function () {}
                // },
                dialogVisible: false,
                warnAreaSelect: [],
                warnPerson: {
                    listLoading: false,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '姓名', value: 'name', align: 'center' },
                        { name: '手机号', value: 'msisdn', align: 'center' },
                        { name: '卡号', value: 'imsi', align: 'center' },
                        { name: '机身码', value: 'imei', align: 'center' },
                        { name: '', value: 'selection', width: 80, align: 'center' }
                    ],
                    data: []
                },
                taskParm: {
                    importAreaName: '',
                    areaId: '',
                    effectiveTime: ''
                },
                taskId: '',
                updataAreaObj: {
                    taskBaseId: '',
                    importAreaId: '',
                    importAreaName: '',
                    effectiveTime: '',
                    areaId: ''
                },
                addAreaObj: {
                    taskBaseId: ''
                },
                importAreaId: '',
                selectedWarnPer: [],
                warnTableData: [],
                taskBaseId: '',
                impAreaListOpt: {
                    page: 1,
                    rows: 10,
                    taskBaseId: ''
                },
                taskEndTime: '',
                formOpt: {
                    inline: true, // form 表单true横排，false竖排
                    labelWidth: '120',
                    labelPos: 'left',
                    // 表单项
                    items: [
                        {
                            label: '重点区域监测名称',
                            type: 'text',
                            warp: true,
                            comOpt: {
                                id: 'importAreaName',
                                width: 280,
                                value: '',
                                disabled: false
                            }
                        },
                        {
                            label: '监测区域',
                            type: 'select',
                            wrap: true,
                            comOpt: {
                                id: 'areaId',
                                width: 280,
                                value: '',
                                disabled: false,
                                data: []
                            }
                        },
                        {
                            label: '有效时间',
                            type: 'date',
                            required: true,
                            comOpt: {
                                id: 'effectiveTime',
                                width: 280,
                                value: getIntervalDate(-7),
                                disabled: false,
                                type: 'date',
                                pickOptions: {
                                    disabledDate (time) {
                                        return forbiddenDate(time, getIntervalDate(-15))
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        },
        props: {
            taskIdProp: {
                type: String
            },
            taskStatus: {
                type: String
            }
        },
        created () {
        },
        mounted () {
            this.taskId = this.taskIdProp
            // 在配置任务中刷新界面
            if (localStorage.getItem('SFtaskId')) {
                this.taskId = localStorage.getItem('SFtaskId')
            }
            if (localStorage.getItem('taskStatus')) {
                this.taskStatus = localStorage.getItem('taskStatus')
            }
            if (this.taskId.charAt(0) === 'T') {
                this.taskBaseId = this.taskId.substr(1)
            } else {
                this.taskBaseId = this.taskId
            }
            this.getTaskBaseQuery()
            this.selectedAreaInfoQuery()
            this.getWarnPersonNum()
            this.getImportantAreaList()
            // 使禁用图表不能点击
            // setTimeout(() => {
            //     $('.fa-ban').each(function () {
            //         $(this).attr('disabled', true)
            //     })
            // }, 400)
        },
        methods: {
            addBtn () {
                this.taskParm = {
                    importAreaName: '',
                    areaId: '',
                    effectiveTime: ''
                }
                this.formOpt.items[2].comOpt.value = getIntervalDate(-7)
                this.dialogVisible = true
                this.getWarnPersonNum()
            },
            dialogOkFn () {
                if (this.importAreaId) {
                    this.getImportantAreaUpdate()
                } else {
                    this.getImportantAreaAdd()
                }
            },
            dialogChange (val) {
                this.dialogVisible = val
                this.importAreaId = ''
            },
            handleCurrentPageChange (val) {
                this.impAreaListOpt.page = val
                this.getImportantAreaList()
            },
            handleSizePageChange (val) {
                this.impAreaListOpt.rows = val
                this.getImportantAreaList()
            },
            warnHandleSelectionChange (val) {
                this.selectedWarnPer = val
            },
            // 清空内容
            clearParm () {
                this.importAreaId = ''
                this.taskParm = {
                    importAreaName: '',
                    areaId: '',
                    effectiveTime: ''
                }
                this.selectedWarnPer = []
                this.warnTableData = []
            },
            // 基础信息查询
            async getTaskBaseQuery () {
                let resp = await taskBaseQuery({ taskBaseId: this.taskBaseId, approverStatus: '3' })
                if (resp && resp.data.endTime) {
                    let val = resp.data.endTime
                    this.taskEndTime = val
                    // let dif = moment(val).diff(moment(this.formOpt.items[0].comOpt.value))
                    // if (dif < 0) {
                    //     this.$nextTick(() => {
                    //         this.formOpt.items[0].comOpt.value = val
                    //         this.formOpt.items[0].comOpt.pickOptions = {
                    //             disabledDate (time) {
                    //                 return forbiddenDate(time, val)
                    //             }
                    //         }
                    //     })
                    // }
                }
            },
            // 查询已选区域信息
            async selectedAreaInfoQuery () {
                let resp = await selectedAreaInfoQuery({ owner: this.taskId, approverStatus: '3' });
                if (resp) {
                    let { rows } = resp;
                    if (rows) {
                        // this.warnAreaSelect = rows;
                        this.formOpt.items[1].comOpt.data = rows.map(item => {
                            item.name = item.areaName
                            item.value = item.resourceId
                            return item
                        })
                    }
                }
            },
            // 获取目标号码列表
            async getWarnPersonNum () {
                let resp = await getTargetTelList({ owner: this.taskId, approverStatus: '3' })
                this.warnPerson.data = resp.rows
            },
            // 查询已选重点区域列表
            async getImportantAreaList () {
                this.impAreaListOpt.taskBaseId = this.taskBaseId
                // this.impAreaListOpt.rows = this.importantAreaOpt.pageOpt.pageSize
                let resp = await importantAreaList(this.impAreaListOpt)
                if (resp) {
                    let { rows, total } = resp
                    this.importantAreaOpt.data = rows
                    this.importantAreaOpt.pageOpt.total = total
                }
            },
            // 修改重点区域初始化
            async getReviseImAreaList () {
                let resp = await importantAreaQuery({ importAreaId: this.importAreaId })
                if (resp) {
                    let { data } = resp
                    this.taskParm = data
                    let { importAreaName, areaId, effectiveTime } = data
                    this.$refs.form.setValue([
                        { id: 'importAreaName', value: importAreaName },
                        { id: 'areaId', value: areaId },
                        { id: 'effectiveTime', value: effectiveTime }
                    ])
                    this.$nextTick(() => {
                        this.importMsisdnQuery()
                    })
                }
            },
            // 新增重点区域保存
            async getImportantAreaAdd () {
                let apiObj = this.$refs.form.getValue()
                let { importAreaName, areaId, effectiveTime } = apiObj
                if (!importAreaName) {
                    this.$message.warning('请输入重点区域监测名称')
                } else if (!areaId) {
                    this.$message.warning('请选择区域')
                } else if (!effectiveTime) {
                    this.$message.warning('请选择有效期')
                } else {
                    apiObj.taskBaseId = this.taskBaseId
                    let resp = await importantAreaAdd(apiObj)
                    if (resp) {
                        this.$message.success('新增成功')
                        this.dialogVisible = false
                        this.importAreaId = ''
                        this.getImportantAreaList()
                        // this.clearParm()
                    }
                    // if (!this.taskParm.msisdn) {
                    //     this.$message.warning('请选择目标号码')
                    // } else {
                    //     this.addAreaObj.taskBaseId = this.taskBaseId
                    //     this.addAreaObj = Object.assign(this.addAreaObj, this.taskParm)
                    //     let resp = await importantAreaAdd(this.addAreaObj)
                    //     if (resp) {
                    //         this.$message.success('新增成功')
                    //         this.dialogVisible = false
                    //         this.getImportantAreaList()
                    //         this.clearParm()
                    //     }
                    // }
                }
            },
            // 重点区域修改
            async getImportantAreaUpdate () {
                let apiObj = this.$refs.form.getValue()
                let { importAreaName, areaId, effectiveTime } = apiObj
                if (!importAreaName) {
                    this.$message.warning('请输入重点区域监测名称')
                } else if (!areaId) {
                    this.$message.warning('请选择区域')
                } else if (!effectiveTime) {
                    this.$message.warning('请选择有效期')
                } else {
                    apiObj.taskBaseId = this.taskBaseId
                    apiObj.importAreaId = this.importAreaId
                    let resp = await importantAreaUpdate(apiObj)
                    if (resp) {
                        this.$message.success('修改成功')
                        this.dialogVisible = false
                        this.importAreaId = ''
                        this.getImportantAreaList()
                        // this.clearParm()
                    }
                }
            },
            // 重点区域删除
            deleteClick (row) {
                this.$confirm('是否确认删除？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    importantAreaDelete({
                        importAreaId: row.importAreaId,
                        taskBaseId: row.taskBaseId
                    }).then((resp) => {
                        if (resp) {
                            this.$message.success('删除成功')
                            this.getImportantAreaList()
                        }
                    })
                })
            },
            editClick (row) {
                this.getWarnPersonNum()
                this.importAreaId = row.importAreaId
                this.updataAreaObj.importAreaId = row.importAreaId
                this.dialogVisible = true
                this.getReviseImAreaList()
            },
            // 获取已选择的目标号码
            getSelectedTarNum () {
                this.selectedWarnPer.forEach(item => {
                    let personInfo = item.msisdn + ':' + item.name
                    this.warnTableData.push(personInfo)
                })
                // this.taskParm.msisdn = this.warnTableData.join(',')
            },
            // 修改重点区域告警任务获取目标号码
            async importMsisdnQuery () {
                let resp = await importMsisdnQuery({
                    importAreaId: this.importAreaId,
                    owner: this.taskId
                })
                if (resp) {
                    let { rows } = resp
                    let arr = [];
                    if (resp) {
                        rows.forEach((item, index) => {
                            if (item.status === '1') {
                                arr.push(index)
                            }
                        })
                        // let getTarNumArr = []
                        // arr.forEach(item => {
                        //     getTarNumArr.push(this.warnPerson.data[item])
                        // })
                        this.$refs.targetNumTable.handleToggleRowSelection(arr, true);
                    }
                }
            }
        },
        computed: {
            tableSize () {
                return {
                    'height': this.vsHeight - 146
                }
            },
            warTableSize () {
                return {
                    'height': this.vsHeight - 340
                }
            },
            comSize () {
                return { 'height': this.vsHeight - 298 }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
        watch: {},
        components: {
            formComp,
            tableComp,
            buttonComp,
            square,
            sysDialog
        }
    }
</script>
<style scoped>
@component-namespace ga {
    @b configArea{
        padding:0 12px;
        @e marginTop10 {
            margin-top: 10px;
        }
        @e dialogFormWrap{
            width: 430px;
            margin: 0 auto;
        }
    }
}
</style>
