<template>
    <div class="ga-configWarn">
        <el-button type="primary" @click="addBtn" :disabled="taskStatus === '2' || taskStatus === '3'">新增</el-button>
        <sysTable class="ga-configWarn__marginTop10" :option="tableWarn" :comSize="comSize" @handleCurrentPageChange="warnCurrentPageChange" @handleSizePageChange = "warnSizePageChange"></sysTable>
        <sysDialog :dialogVisible="showAdd" :okFn="addWarnConfig" size="large" title="告警配置" @change="diaChange" :cancleFn="clearParm">
            <el-form :inline="true" class="dialogForm">
                <el-form-item label="告警名称">
                    <el-input v-model="formData.alarmTaskName" placeholder="请输入告警名称"></el-input>
                </el-form-item>
                <el-form-item label="告警类型">
                    <el-select placeholder="请选择" v-model="formData.alarmTypeId" @change="selWarnModel">
                        <el-option v-for="item in alaList" :value="item.alarmTypeId" :key="item.alarmTypeId" :label="item.alarmTypeName">
                            {{ item.alarmTypeName }}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="告警模型">
                    <el-select placeholder="请选择" v-model="formData.alarmModelId">
                        <el-option v-for="item in warnModelSelect" :value="item.alarmModelId" :key="item.alarmModelId" :label="item.alarmModelName">
                            {{ item.alarmModelName }}
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-row v-if="formData.alarmModelId === 11" style="color: red">
                *提示：以下号码列表，仅显示拥有全国监控权限的重点人
            </el-row>
            <div class="ga-configWarn__marginTop10">
                <el-row>
                    <el-col v-if="showTable">
                        <!-- <sysSquare title="告警人员" :minHeight="SquareHeight" v-if="showTable"> -->
                            <!-- 目标号码表格 -->
                        <p class="ga-configWarn__dialogTitle"><i></i>告警人员</p>
                        <sysTable :option="tableOpt" :comSize="warnTableHeight" ref="targetNumTable"
                                    @handleCurrentPageChange="warnPersonCurrentPageChange"
                                    @handleSizePageChange = "warnPersonSizePageChange"
                                    @handleSelectionChange="warnPersonSelectionChange"></sysTable>
                        <!-- </sysSquare> -->
                    </el-col>
                </el-row>
                <!-- 底部动态参数 -->
                <el-row>
                    <el-form>
                        <el-col :span="24">
                            <el-row class="ga-configWarn__marginTop10">
                                <div style="display: inline-block" v-if="formData.alarmTypeId === 1 || formData.alarmModelId === 2 || formData.alarmTypeId === 2 || formData.alarmTypeId === 4 || formData.alarmTypeId === 8 || formData.alarmTypeId === 9">
                                    告警区域&nbsp;
                                    <el-select style="width: 200px" placeholder="请选择" v-model="taskParm.areaId">
                                        <el-option v-for="item in  warnAreaSelect" :value="item.resourceId" :key="item.resourceId" :label="item.areaName">{{ item.areaName }}</el-option>
                                    </el-select>
                                </div>
                                <!-- 目标进入区域告警 -->
                                <div style="display: inline-block" v-if="formData.alarmTypeId == 1">
                                    &nbsp;&nbsp;&nbsp;同时进入区域告警人数&nbsp;
                                    <el-input style="width: 200px" placeholder="请输入告警人数" v-model="taskParm.alarmPersonNum"></el-input>
                                </div>
                                <!-- 目标关机告警 -->
                                <div style="display: inline-block" v-if="formData.alarmTypeId == 3">
                                    &nbsp;&nbsp;&nbsp;告警人数&nbsp;
                                    <el-input style="width: 200px" placeholder="请输入告警人数" v-model="taskParm.alarmPersonNum"></el-input>
                                </div>
                            </el-row>
                            <el-row class="ga-configWarn__marginTop10">
                                <div style="display: inline-block" v-if="formData.alarmTypeId == 1">
                                    重复告警周期&nbsp;
                                    <el-input style="width: 200px" placeholder="" v-model="taskParm.repeatCyc"></el-input>
                                    分
                                    &nbsp;备注：最小为30分钟，最大为1440分钟（在设置的重复告警周期内不再告警）
                                </div>
                            </el-row>
                        </el-col>
                        <!--新增告警-->
                        <el-row v-if="formData.alarmTypeId == 11">
                            <el-row class="ga-configWarn__marginTop10">
                                <el-row>
                                    告警区域&nbsp;
                                    <el-select style="width: 200px" placeholder="请选择" v-model="taskParm.areaCode">
                                        <el-option v-for="item in  warnAreaSelect" :value="item.resourceId" :key="item.resourceId" :label="item.areaName">{{ item.areaName }}</el-option>
                                    </el-select>
                                    &nbsp; &nbsp;二级告警区域&nbsp;
                                    <el-select style="width: 200px" placeholder="请选择" v-model="taskParm.areaId">
                                        <el-option v-for="item in  warnAreaSelect2" :value="item.resourceId" :key="item.resourceId" :label="item.areaName">{{ item.areaName }}</el-option>
                                    </el-select>
                                </el-row>
                                <el-row style="margin-top: 5px">
                                    <el-col :span="2">目标消失时长</el-col>
                                    <el-col :span="3">
                                        <el-input placeholder="请输入时长" v-model="taskParm.disapperInterval"></el-input>
                                    </el-col>
                                    <el-col :span="16">
                                        (小时)备注：目标消失达到设置的时长，如再次出现，则视为新一次的出现。
                                    </el-col>
                                </el-row>
                            </el-row>
                        </el-row>
                        <!--目标关机告警-->
                        <el-col :span="24" v-if="formData.alarmTypeId == 3">
                            <el-row class="ga-configWarn__marginTop10">
                                <el-col :span="2">告警时间段</el-col>
                                <el-col :span="2">起始时间：</el-col>
                                <el-col :span="4">
                                    <el-select v-model="taskParm.beginTime" placeholder="起始时间">
                                        <el-option
                                            v-for="item in timeOption"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!--<el-time-picker placeholder="起始时间" v-model="taskParm.beginTime" :clearable=false></el-time-picker>-->
                                </el-col>
                                <el-col :span="2" :offset="1">结束时间：</el-col>
                                <el-col :span="4">
                                    <el-select v-model="taskParm.endTime" placeholder="结束时间">
                                        <el-option
                                            v-for="item in timeOption"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!--<el-time-picker placeholder="结束时间" v-model="taskParm.endTime" :clearable=false></el-time-picker>-->
                                </el-col>
                            </el-row>
                            <el-row class="ga-configWarn__marginTop10">
                                <div style="display: inline-block" v-if="formData.alarmTypeId == 3">
                                    重复告警周期&nbsp;
                                    <el-input style="width: 200px" placeholder="" v-model="taskParm.repeatCyc"></el-input>
                                    分
                                    &nbsp;备注：最小为30分钟，最大为1440分钟（在设置的重复告警周期内不再告警）
                                </div>
                            </el-row>
                        </el-col>
                        <!-- 目标漫入告警 -->
                        <el-col :span="24" v-if="formData.alarmTypeId == 4">
                            <el-row class="ga-configWarn__marginTop10">
                                <el-col :span="2">目标消失时长</el-col>
                                <el-col :span="3">
                                    <el-input placeholder="请输入时长" v-model="taskParm.disapperInterval"></el-input>
                                </el-col>
                                <el-col :span="16">
                                    (小时)备注：目标消失达到设置的时长，如再次出现，则视为新一次的出现。
                                </el-col>
                            </el-row>
                        </el-col>
                        <!-- 目标进入离开告警 -->
                        <el-col :span="24" v-if="formData.alarmTypeId == 2">
                           <!--  <el-radio class="radio" v-model="taskParm.alarmTimeType" label="全天">全天告警</el-radio>
                            <el-radio class="radio" v-model="taskParm.alarmTimeType" label="时间段">在以下时段告警</el-radio>
                            <el-row class="ga-configWarn__marginTop10" v-if="taskParm.alarmTimeType == '时间段'">
                                <el-col :span="2">
                                    <el-checkbox v-model="taskParm.timeStageOne">时间段1</el-checkbox>
                                </el-col>
                                <el-col :span="2">起始时间：</el-col>
                                <el-col :span="4">
                                    <el-time-picker placeholder="开始时间" v-model="taskParm.oneBeginTime" :clearable="false"></el-time-picker>
                                </el-col>
                                <el-col :span="2">结束时间：</el-col>
                                <el-col :span="4">
                                    <el-time-picker placeholder="结束时间" v-model="taskParm.oneEndTime" :clearable="false"></el-time-picker>
                                </el-col>
                            </el-row>
                            <el-row class="ga-configWarn__marginTop10" v-if="taskParm.alarmTimeType == '时间段'">
                                <el-col :span="2">
                                    <el-checkbox v-model="taskParm.timeStageTwo">时间段2</el-checkbox>
                                </el-col>
                                <el-col :span="2">起始时间：</el-col>
                                <el-col :span="4">
                                    <el-time-picker placeholder="开始时间" v-model="taskParm.twoBeginTime" :clearable="false"></el-time-picker>
                                </el-col>
                                <el-col :span="2">结束时间：</el-col>
                                <el-col :span="4">
                                    <el-time-picker placeholder="结束时间" v-model="taskParm.twoEndTime" :clearable="false"></el-time-picker>
                                </el-col>
                            </el-row> -->
                            <el-row class="ga-configWarn__marginTop10">
                                <div style="display: inline-block" v-if="formData.alarmTypeId == 2">
                                    重复告警周期&nbsp;
                                    <el-input style="width: 200px" placeholder="" v-model="taskParm.repeatCyc"></el-input>
                                    分
                                    &nbsp;备注：最小为30分钟，最大为1440分钟（在设置的重复告警周期内不再告警）
                                </div>
                            </el-row>
                        </el-col>
                        <!-- 目标接头告警 -->
                        <el-col :span="22" v-if="formData.alarmTypeId == 6">
                            <el-row class="ga-configWarn__marginTop10">
                                触发告警人数：
                                <el-input style="width: 200px" placeholder="请输入内容" v-model="taskParm.alarmPersonNum"></el-input>
                                &nbsp;&nbsp;&nbsp;安全距离：
                                <el-input style="width: 200px" placeholder="请输入内容" v-model="taskParm.safetyDistance">(米)</el-input>
                                &nbsp;&nbsp;&nbsp;备注：小于安全距离告警。不小于200m。
                            </el-row>
                        </el-col>
                        <!-- 目标实时跟跟踪告警 -->
                        <el-col :span="24" v-if="formData.alarmTypeId == 7">
                            <el-row class="ga-configWarn__marginTop10">
                                开始时间：
                                <el-date-picker style="width: 250px" type="datetime" placeholder="开始日期" v-model="taskParm.beginTime"></el-date-picker>
                                &nbsp;&nbsp;&nbsp;结束时间：
                                <el-date-picker style="width: 250px" type="datetime" placeholder="结束日期" v-model="taskParm.endTime"></el-date-picker>
                            </el-row>
                        </el-col>
                        <!-- 目标消失告警 -->
                        <el-col :span="24" v-if="formData.alarmTypeId == 5">
                            <el-row class="ga-configWarn__marginTop10">
                                <el-col :span="3">白天告警时间段：</el-col>
                                <el-col :span="1">起始</el-col>
                                <el-col :span="3">
                                    <el-time-select v-model="taskParm.dayBeginTime"
                                                    :picker-options="{
                                                        start: '00:00',
                                                        step: '01:00',
                                                        end: '23:00'
                                                    }"
                                                    :clearable="false"></el-time-select>
                                </el-col>
                                <el-col :span="1">结束</el-col>
                                <el-col :span="3">
                                    <el-time-select v-model="taskParm.dayEndTime"
                                                    :picker-options="{
                                                        start: dynamicStart,
                                                        step: '01:00',
                                                        end: dynamicEnd
                                                    }"
                                                    :clearable="false"></el-time-select>
                                </el-col>
                                <el-col :span="3">白天消失时间阈值</el-col>
                                <el-col :span="2">
                                    <el-input v-model="taskParm.dayDisappearTime"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    (小时)
                                </el-col>
                            </el-row>
                            <el-row class="ga-configWarn__marginTop10">
                                <el-col :span="3">晚上告警时间段：</el-col>
                                <el-col :span="1">起始</el-col>
                                <el-col :span="3">
                                    <el-time-select disabled v-model="taskParm.nightBeginTime" :clearable="false"></el-time-select>
                                </el-col>
                                <el-col :span="1">结束</el-col>
                                <el-col :span="3">
                                    <el-time-select disabled v-model="taskParm.nightEndTime" :clearable="false"></el-time-select>
                                </el-col>
                                <el-col :span="3">晚上消失时间阈值</el-col>
                                <el-col :span="2">
                                    <el-input v-model="taskParm.nightDisappearTime"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    (小时)
                                </el-col>
                                <el-col :span="6" style="color: red">
                                    * 需先配置白天时间段，晚上时间段自动补全
                                </el-col>
                            </el-row>
                            <!-- <el-row class="ga-configWarn__marginTop10">
                                <el-col :span="2">目标消失后于</el-col>
                                <el-col :span="2"><el-input v-model="taskParm.reappear"></el-input></el-col>
                                <el-col :span="5">小时重新出现，自动取消告警</el-col>
                            </el-row> -->
                        </el-col>
                        <!--区域人群异常-->
                        <el-col :span="24" v-if="formData.alarmTypeId === 9">
                            <el-row class="ga-configWarn__marginTop10">
                                超出基线值告警阈值&nbsp;
                                <el-input style="width: 100px" v-model="taskParm.threshold"></el-input>
                                &nbsp;% (请输入大于100的阈值，例如：110)
                            </el-row>
                        </el-col>
                    </el-form>
                </el-row>
            </div>
        </sysDialog>
    </div>
</template>
<script>
    import { alaTypeLoad, alaModelLoad, alaConfAdd, alaTaskList, alaConfDelete, alaConfModify } from 'api/task/taskConfig'
    import { reviseTarNum, alaConfUpdate, alarmArea, alarmArea1, alarmCity } from 'api/task/taskConfig'
    import { getTargetTelList } from 'api/baseData'
    import { selectedAreaInfoQuery } from 'api/task/taskArea'
    import { mapGetters } from 'vuex'
    import sysDialog from 'components/common/dialog'
    import sysSquare from 'components/common/square'
    import sysTable from 'components/Table/'
    export default {
        name: 'warnConfig',
        data () {
            let me = this
            return {
                isEditChange: false,
                isEdit: false,
                dynamicStart: '',
                dynamicEnd: '00:00',
                timeOption: [{
                    value: '0',
                    label: '0'
                }, {
                    value: '1',
                    label: '1'
                }, {
                    value: '2',
                    label: '2'
                }, {
                    value: '3',
                    label: '3'
                }, {
                    value: '4',
                    label: '4'
                }, {
                    value: '5',
                    label: '5'
                }, {
                    value: '6',
                    label: '6'
                }, {
                    value: '7',
                    label: '7'
                }, {
                    value: '8',
                    label: '8'
                }, {
                    value: '9',
                    label: '9'
                }, {
                    value: '10',
                    label: '10'
                }, {
                    value: '11',
                    label: '11'
                }, {
                    value: '12',
                    label: '12'
                }, {
                    value: '13',
                    label: '13'
                }, {
                    value: '14',
                    label: '14'
                }, {
                    value: '15',
                    label: '15'
                }, {
                    value: '16',
                    label: '16'
                }, {
                    value: '17',
                    label: '17'
                }, {
                    value: '18',
                    label: '18'
                }, {
                    value: '19',
                    label: '19'
                }, {
                    value: '20',
                    label: '20'
                }, {
                    value: '21',
                    label: '21'
                }, {
                    value: '22',
                    label: '22'
                }, {
                    value: '23',
                    label: '23'
                }],
                alarmTaskId: '',
                showAdd: false,
                formData: {
                    alarmTypeId: '',
                    alarmModelId: '',
                    alarmModelName: '',
                    alarmTaskName: '',
                    msisdn: '',
                    taskBaseId: ''
                },
                // formData.taskParm分别从taskParm取数据
                taskParm: {
                    repeatCyc: 120,
                    areaId: '',
                    areaCode: '',
                    disapperInterval: 12,
                    alarmTimeType: '',
                    timeStageOne: false,
                    timeStageTwo: false,
                    oneBeginTime: '',
                    oneEndTime: '',
                    twoBeginTime: '',
                    twoEndTime: '',
                    alarmPersonNum: '',
                    safetyDistance: '',
                    beginTime: '',
                    endTime: '',
                    dayBeginTime: '06:00',
                    dayEndTime: '18:00',
                    dayDisappearTime: '2',
                    nightBeginTime: '18:00',
                    nightEndTime: '06:00',
                    nightDisappearTime: '4',
                    // reappear: '',
                    threshold: ''
                },
                alaList: [],       // 告警列表
                warnModelSelect: [],    // 告警模型渲染数据
                warnAreaSelect: [],     // 已选区域列表
                warnAreaSelect2: [],   // 二级区域（框选）
                showTable: false,
                // 目标号码表格数据
                tableOpt: {
                    listLoading: false,
                    stripe: true,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '姓名', value: 'name', align: 'center' },
                        { name: '手机号', value: 'msisdn', align: 'center' },
                        { name: '卡号', value: 'imsi', align: 'center' },
                        { name: '机身码', value: 'imei', align: 'center' },
                        { name: '选择', value: 'selection', width: 80, align: 'center' }
                    ],
                    data: [],
                    pagination: false,
                    pageOpt: {
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10,
                        currentPage: 1
                    }
                },
                // 告警列表
                tableWarn: {
                    listLoading: false,
                    stripe: true,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '告警名称', value: 'alarmTaskName', width: 220, align: 'center' },
                        { name: '告警类型', value: 'alarmTypeName', width: 170, align: 'center' },
                        { name: '告警模型', value: 'alarmModelName', width: 170, align: 'center' },
                        { name: '告警区域', value: 'areaName', width: 200, align: 'center' },
                        { name: '触发告警人数', value: 'alarmPersonNum', width: 180, align: 'center' },
                        { name: '参数', value: 'parm', width: 300, align: 'center', widthType: true },
                        { name: '操作', value: '', width: 80, align: 'center', fixed: 'right', operations: [
                            { label: '编辑', type: 'label', callback: function () {
                                if (me.taskStatus === '2' || me.taskStatus === '3') {
                                    this.disabled = true;
                                    return 'is-disabled'
                                } else {
                                    this.disabled = false;
                                }
                            }, click: me.editWarn },
                            { label: '删除', type: 'label', isConfirm: true, text: '确认删除此数据？',
                                callback: function () {
                                    if (me.taskStatus === '2' || me.taskStatus === '3') {
                                        this.disabled = true;
                                        return 'is-disabled'
                                    } else {
                                        this.disabled = false;
                                    }
                                }, click: me.deleteWarn }]
                        }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10,
                        currentPage: 1
                    }
                },
                warnTableData: [],
                selectedWarnPer: [],
                reviseTarNumObj: {
                    owner: '',
                    alarmTaskId: ''
                },
                warnTarNum: '',
                isModify: false,
                taskBaseId: ''
            }
        },
        props: {
            taskIdProp: {
                type: String
            },
            isLoad: {
                default: true
            },
            taskStatus: {
                type: String
            }
        },
        created () {
            // 获取任务id
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
        },
        mounted () {
            // 获取目标号码
//            this.getWarnPersonNum()
            // 获取告警类型
            this.getAlarmType()
            if (this.taskId) {
                this.getTaskList()
            }
            // 使禁用图表不能点击
//            setTimeout(() => {
//                $('.fa-ban').each(function () {
//                    $(this).attr('disabled', true)
//                })
//            }, 400)
        },
        methods: {
            // 获取告警类型
            async getAlarmType () {
//                if (this.taskId) {
//                    this.alaTaskId = this.taskId.substr(1)
//                }
                let resp = await alaTypeLoad({ taskBaseId: this.taskBaseId })
                let { rows } = resp
                if (resp && _.isArray(rows)) {
                    this.alaList = rows
                }
            },
            // 模态框
            diaChange (val) {
                this.showAdd = val
                this.isEdit = false;
                this.isEditChange = false;
                setTimeout(() => {
                    this.dynamicEnd = '00:00'
                }, 100)
            },
            // 加载告警模型（告警模块下拉框）
            selWarnModel () {
                if (+this.taskParm.areaId === 0) {
                    this.taskParm.areaId = ''
                }
                if (!this.isEdit) {
                    // 公共的
                    this.taskParm.areaId = ''
                    this.taskParm.areaCode = ''
//                    this.formData.alarmTaskName = ''
                    // 关机清空
                    this.taskParm.beginTime = ''
                    this.taskParm.endTime = ''
                    this.taskParm.alarmPersonNum = ''
                    // 目标进入离开告警
                    this.taskParm.repeatCyc = 120
                    this.taskParm.alarmTimeType = ''
                    this.taskParm.timeStageOne = false
                    this.taskParm.timeStageTwo = false
                    this.taskParm.oneBeginTime = ''
                    this.taskParm.oneEndTime = ''
                    this.taskParm.twoBeginTime = ''
                    this.taskParm.twoEndTime = ''
                    // 目标漫入出现
                    this.taskParm.disapperInterval = 12
                    // 特定人群聚集预警
                    this.taskParm.safetyDistance = ''
                    // 人群异常预警
                    this.taskParm.threshold = ''
                    // 目标消失告警
                    // this.taskParm.reappear = ''
//                    this.formData.alarmTaskName = ''
//                    dayBeginTime: '06:00',
                    this.taskParm.dayBeginTime = '06:00'
                    this.taskParm.dayEndTime = '18:00'
                    this.taskParm.nightBeginTime = '18:00'
                    this.taskParm.nightEndTime = '06:00'
                    this.taskParm.dayDisappearTime = '2'
                    this.taskParm.nightDisappearTime = '4'
                }
                // 列表选择值动态变化
                if (this.formData.alarmTypeId) {
                    alaModelLoad({ alarmTypeId: this.formData.alarmTypeId }).then((resp) => {
                        if (resp) {
                            this.warnModelSelect = resp.rows// 告警模型的数组
                            // 如果是新增告警配置，告警模型默认显示第一个，如果是修改显示返回数据
                            if (!this.alarmTaskId) {
                                this.formData.alarmModelId = resp.rows[0].alarmModelId
                            }
//                            if (this.warnModelSelect.length > 1) {
//                                this.formData.alarmModelId = ''
//                            }
                        }
                    })
                }
            },
            // 加载告警任务列表
            async getTaskList () {
//                let taskBaseId = this.taskId.substr(1)
                let resp = await alaTaskList({
                    taskBaseId: this.taskBaseId,
                    rows: this.tableWarn.pageOpt.pageSize,
                    page: this.tableWarn.pageOpt.currentPage
                })
                if (resp.status === 200) {
                    this.tableWarn.data = resp.rows
                    this.tableWarn.pageOpt.total = resp.total
                }
            },
            // 获取目标号码列表
            async getWarnPersonNum () {
                let resp = await getTargetTelList({ owner: this.taskId, approverStatus: 3 })
                if (resp) {
                    if (this.formData.alarmTypeId === 10) {
                        let arr = [];
                        resp.rows.forEach((item) => {
                            if (+item.lbs === 1) {
                                arr.push(item)
                            }
                        })
                        this.tableOpt.data = arr
                    } else {
                        this.tableOpt.data = resp.rows
                        this.tableOpt.pageOpt.total = resp.total
                        this.warnTarNum = resp.total
                    }
                }
                if (this.isModify) {
                    this.reviseTarNumObj.alarmTaskId = this.alarmTaskId
                    this.getReviseTarNum()
                    this.isModify = false
                }
            },
            // 修改告警任务获取目标号码(打钩)
            async getReviseTarNum () {
                this.reviseTarNumObj.owner = this.taskId
                let resp = await reviseTarNum(this.reviseTarNumObj)
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
                    //     getTarNumArr.push(this.tableOpt.data[item])
                    // })
                    if (this.$refs.targetNumTable) {
                        this.$refs.targetNumTable.handleToggleRowSelection(arr, true);
                    }
                }
            },
            // 添加告警配置（参数配置）确定按钮
            addWarnConfig () {
                // 动态渲染formData.taskParm内部参数
                if (this.formData.alarmTypeId) {
                    let changeData = this.formData.alarmTypeId
                    let changeAlarmModel = this.formData.alarmModelId
                    // 返回后台taskParm的暂存变量
                    let backData = {}
                    // 目标进入区域告警&目标关机告警
                    if (changeData === 1) {
                        backData.areaId = this.taskParm.areaId
                        backData.alarmPersonNum = this.taskParm.alarmPersonNum
                        backData.repeatCyc = this.taskParm.repeatCyc
                        // 目标关机告警
                    } else if (changeData === 3) {
                        backData.alarmPersonNum = this.taskParm.alarmPersonNum
                        backData.beginTime = this.taskParm.beginTime
                        backData.endTime = this.taskParm.endTime
                        backData.repeatCyc = this.taskParm.repeatCyc
                        if (changeAlarmModel === 2) {
                            backData.areaId = this.taskParm.areaId
                        }
                    } else if (changeData === 4) {
                        backData.areaId = this.taskParm.areaId
                        backData.disapperInterval = this.taskParm.disapperInterval
                        // 目标进入离开告警
                    } else if (changeData === 11) {
                        backData.areaId = this.taskParm.areaId
                        backData.areaCode = this.taskParm.areaCode
//                        backData.disapperInterval = this.taskParm.disapperInterval
                    } else if (changeData === 2) {
                        backData.repeatCyc = this.taskParm.repeatCyc
                        backData.areaId = this.taskParm.areaId
                        backData.alarmTimeType = this.taskParm.alarmTimeType
                        // 分时报警时添加报警时段
                        // if (backData.alarmTimeType === '时间段') {
                        //     if (this.taskParm.timeStageOne) {
                        //         backData.timeStageOne = true
                        //         backData.oneBeginTime = moment(this.taskParm.oneBeginTime).format('HH:mm:ss')
                        //         backData.oneEndTime = moment(this.taskParm.oneEndTime).format('HH:mm:ss')
                        //     } else {
                        //         backData.timeStageOne = false
                        //     }
                        //     if (this.taskParm.timeStageTwo) {
                        //         backData.timeStageTwo = true
                        //         backData.twoBeginTime = moment(this.taskParm.twoBeginTime).format('HH:mm:ss')
                        //         backData.twoEndTime = moment(this.taskParm.twoEndTime).format('HH:mm:ss')
                        //     } else {
                        //         backData.timeStageTwo = false
                        //     }
                        // }
                        // 目标接头告警
                    } else if (changeData === 6) {
                        backData.alarmPersonNum = this.taskParm.alarmPersonNum
                        backData.safetyDistance = this.taskParm.safetyDistance
                        // 目标实时跟踪告警
                    } else if (changeData === 7) {
                        if (this.taskParm.beginTime) {
                            backData.beginTime = moment(this.taskParm.beginTime).format('YYYY-MM-DD HH:mm')
                        } else {
                            backData.beginTime = ''
                        }
                        if (this.taskParm.endTime) {
                            backData.endTime = moment(this.taskParm.endTime).format('YYYY-MM-DD HH:mm')
                        } else {
                            backData.endTime = ''
                        }
                        // 目标消失告警
                    } else if (changeData === 5) {
                        backData.dayBeginTime = `${this.taskParm.dayBeginTime}:00`
                        backData.dayEndTime = `${this.taskParm.dayEndTime}:00`
                        backData.dayDisappearTime = this.taskParm.dayDisappearTime
                        backData.nightBeginTime = `${this.taskParm.nightBeginTime}:00`
                        backData.nightEndTime = `${this.taskParm.nightEndTime}:00`
                        backData.nightDisappearTime = this.taskParm.nightDisappearTime
                        // backData.reappear = this.taskParm.reappear
                        // 目标省内漫出告警
                    } else if (changeData === 8) {
                        backData.areaId = this.taskParm.areaId
                    } else if (changeData === 9) {
                        backData.areaId = this.taskParm.areaId
                        backData.threshold = this.taskParm.threshold
                    }
                    this.formData.taskBaseId = this.taskBaseId
                    this.formData.alarmTaskName = this.formData.alarmTaskName.trim()
                    this.formData = Object.assign(this.formData, backData)
                }
                this.confirmWarnTask()
            },
            // 编辑告警配置
            editWarn (row) {
                this.warnModelSelect = []
                this.alarmTaskId = row.alarmTaskId
                this.isEdit = true;
                this.showAdd = true
                // 获取告警模型
                this.getAlarmType()
                // 告警配置修改获取告警任务信息
                alaConfModify({ alarmTaskId: row.alarmTaskId }).then((resp) => {
                    if (resp) {
                        let { data } = resp
                        if (data.alarmTypeId !== 9) {
                            this.isModify = true
                        } else {
                            this.isModify = false
                        }
                        if (data.alarmTypeId === 1) {
                            // 目标进入区域告警
                            this.formData.alarmTypeId = 1
                        } else if (data.alarmTypeId === 2) {
                            // 目标进入离开告警
                            this.formData.alarmTypeId = 2
                        } else if (data.alarmTypeId === 3) {
                            // 目标关机告警
                            this.formData.alarmTypeId = 3
                        } else if (data.alarmTypeId === 4) {
                            // 目标漫入告警
                            this.formData.alarmTypeId = 4
                        } else if (data.alarmTypeId === 5) {
                            // 目标消失告警
                            this.formData.alarmTypeId = 5
                        } else if (data.alarmTypeId === 6) {
                            // 目标接头区域告警
                            this.formData.alarmTypeId = 6
                        } else if (data.alarmTypeId === 7) {
                            // 目标实时追踪告警
                            this.formData.alarmTypeId = 7
                        } else if (data.alarmTypeId === 9) {
                            // 区域人群异常告警
                            this.formData.alarmTypeId = 9
                        }
                        this.formData.alarmModelId = data.alarmModelId
                        this.formData.alarmTypeId = data.alarmTypeId
                        this.formData.alarmTaskName = data.alarmTaskName.trim()
                        // 各类型字段分别渲染
//                        this.taskParm = Object.assign(this.taskParm, resp.data)
                        this.taskParm = data
                        this.taskParm.dayBeginTime = this.taskParm.dayBeginTime.substr(0, 5)
                        this.taskParm.dayEndTime = this.taskParm.dayEndTime.substr(0, 5)
                        this.taskParm.nightBeginTime = this.taskParm.nightBeginTime.substr(0, 5)
                        this.taskParm.nightEndTime = this.taskParm.nightEndTime.substr(0, 5)
                        if (this.taskParm.oneBeginTime) {
                            this.taskParm.oneBeginTime = `2017-04-22 ${this.taskParm.oneBeginTime}`;
                            this.taskParm.oneEndTime = `2017-04-22 ${this.taskParm.oneEndTime}`;
                            this.taskParm.timeStageOne = true
                        }
                        if (this.taskParm.twoBeginTime) {
                            this.taskParm.twoBeginTime = `2017-04-22 ${this.taskParm.twoBeginTime}`;
                            this.taskParm.twoEndTime = `2017-04-22 ${this.taskParm.twoEndTime}`;
                            this.taskParm.timeStageTwo = true
                        }
                        if (resp.data.alarmModelId !== '9' && resp.data.alarmTypeId) {
                            this.showTable = true
                            // this.getWarnPersonNum()
                        } else {
                            this.showTable = false
                        }
                    }
                    // let me = this;
                    // this.$nextTick(() => {
                    //     me.reviseTarNumObj.alarmTaskId = row.alarmTaskId
                    //     me.getReviseTarNum()
                    // })
                })
            },
            // 删除告警配置
            deleteWarn (row) {
                this.$confirm('是否确认删除？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    alaConfDelete({
                        alarmTaskId: row.alarmTaskId,
                        taskBaseId: row.taskBaseId,
                        alarmTypeId: row.alarmTypeId
                    }).then((resp) => {
                        if (resp) {
                            this.$message.success('删除成功')
                            this.getTaskList()
                        }
                    })
                })
            },
            // 告警table分页
            warnCurrentPageChange (val) {
                this.tableWarn.pageOpt.currentPage = val
                // this.tableData.currentPage = val
                this.getTaskList()
            },
            warnSizePageChange (val) {
                this.tableWarn.pageOpt.pageSize = val
                this.getTaskList()
            },
            // 告警人员号码分页
            warnPersonCurrentPageChange (val) {
                this.tableData.page = val
                this.getWarnPersonNum()
            },
            warnPersonSizePageChange (val) {
                this.tableOpt.pageOpt.pageSize = val
                this.getWarnPersonNum()
            },
            // 选择表格返回的数据
            warnPersonSelectionChange (val) {
                this.selectedWarnPer = val
            },
            // 新增按钮点击
            addBtn () {
                this.warnModelSelect = []
                this.showAdd = true
                this.showTable = false
                // this.getWarnPersonNum()
                // 获取告警类型
                this.getAlarmType()
            },
            // 清空输入框的内容
            clearParm () {
                this.alarmTaskId = ''
                this.formData = {
                    alarmTypeId: '',
                    alarmModelId: '',
                    alarmTaskName: '',
                    msisdn: '',
                    taskBaseId: ''
                };
                this.taskParm = {
                    areaId: '',
                    areaCode: '',
                    repeatCyc: 120,
                    disapperInterval: 12,
                    alarmTimeType: '',
                    timeStageOne: false,
                    timeStageTwo: false,
                    oneBeginTime: '',
                    oneEndTime: '',
                    twoBeginTime: '',
                    twoEndTime: '',
                    alarmPersonNum: '',
                    safetyDistance: '',
                    beginTime: '',
                    endTime: '',
                    dayBeginTime: '06:00',
                    dayEndTime: '18:00',
                    dayDisappearTime: '2',
                    nightBeginTime: '18:00',
                    nightEndTime: '06:00',
                    nightDisappearTime: '4'
                    // reappear: ''
                };
                this.warnTableData = []
            },
            // 修改告警任务
            async alaConfUpdate (obj) {
                let resp = await alaConfUpdate(obj)
                if (resp) {
                    this.$message.success('修改成功')
                    this.showAdd = false
                    this.getTaskList()
                    this.clearParm()
                }
            },
            // 告警配置保存和修改接口
            saveWarnConfig () {
                this.getSelectedTarNum()
                if (!this.formData.msisdn) {
                    this.$message.warning('请选择目标号码')
                } else {
                    if (this.formData.alarmTypeId === 6 && this.formData.msisdn.split(',').length < 2) {
                        this.$message.warning('特定人群聚集预警，至少需要两人才有效')
                    } else {
                        if (this.alarmTaskId) {
                            // 修改告警
                            this.formData.alarmTaskId = this.alarmTaskId
                            this.alaConfUpdate(this.formData)
                        } else {
                            // 保存告警配置
                            this.alaConfAdd(this.formData)
                        }
                    }
                }
            },
            // 告警任务配置修改或保存（条件判断）
            confirmWarnTask () {
                let reg = /^[1-9]\d*$/
                let percent = /[1-9][1-9][0-9]|[1-9][0-9][1-9]|[1-9]\d{3,}/
                let distancee = /^[1-9]\d{3,}|^[2-9]\d{2,}(\.\d+)?$/
                let nameRule = /^[0-9a-zA-Z\u4E00-\u9FA5][0-9a-zA-Z\u4E00-\u9FA5-_]*$/g
                this.getSelectedTarNum()
                // let percent2 = /100%$/
                if (!nameRule.test(this.formData.alarmTaskName)) {
                    this.$message.warning('请正确输入告警名称')
                } else if (this.formData.alarmTaskName.length > 18) {
                    this.$message.warning('告警名称不能超过18个字符，请重新输入')
                } else if (!this.formData.alarmTypeId) {
                    this.$message.warning('请选择告警类型')
                } else if (!this.formData.alarmModelId) {
                    this.$message.warning('请选择告警模型')
                } else if (this.formData.alarmTypeId === 1) {
                    if (!this.formData.areaId) {
                        this.$message.warning('请选择告警区域')
                    } else if (!this.formData.alarmPersonNum) {
                        this.$message.warning('请输入告警人数')
                    } else if (!reg.test(this.formData.alarmPersonNum)) {
                        this.$message.warning('请输入正确的告警人数')
                    } else if (Number(this.formData.alarmPersonNum) > Number(this.warnTarNum)) {
                        this.$message.warning('告警人数不能大于目标总数')
                    } else if (this.formData.msisdn.split(',').length < Number(this.formData.alarmPersonNum)) {
                        this.$message.warning('告警人数不能大于勾选总数')
                    } else if (!reg.test(this.formData.repeatCyc)) {
                        this.$message.warning('请输入正确的重复告警周期')
                    } else if (this.formData.repeatCyc < 30 || this.formData.repeatCyc > 1440) {
                        this.$message.warning('重复告警周期最小为30分钟，最大为1440分钟')
                    } else {
                        this.saveWarnConfig()
                    }
                } else if (this.formData.alarmTypeId === 3) {
                    let { beginTime, endTime } = this.formData
                    if (!this.formData.alarmPersonNum) {
                        this.$message.warning('请输入告警人数')
                    } else if (!reg.test(this.formData.alarmPersonNum)) {
                        this.$message.warning('请输入正确的告警人数')
                    } else if (Number(this.formData.alarmPersonNum) > Number(this.warnTarNum)) {
                        this.$message('告警人数不能大于目标总数')
                    } else if (this.formData.msisdn.split(',').length < Number(this.formData.alarmPersonNum)) {
                        this.$message.warning('告警人数不能大于勾选总数')
                    } else if (!this.formData.beginTime) {
                        this.$message.warning('请选择告警开始时间')
                    } else if (!this.formData.endTime) {
                        this.$message.warning('请选择告警结束时间')
                    } else if (Number(beginTime) > Number(endTime) || Number(beginTime) === Number(endTime)) {
                        this.$message.warning('开始时间必须小于结束时间')
                    } else if (this.formData.alarmModelId === 2) {
                        if (!this.formData.areaId) {
                            this.$message.warning('请选择告警区域')
                        } else {
                            this.saveWarnConfig()
                        }
                    } else if (!reg.test(this.formData.repeatCyc)) {
                        this.$message.warning('请输入正确的重复告警周期')
                    } else if (this.formData.repeatCyc < 30 || this.formData.repeatCyc > 1440) {
                        this.$message.warning('重复告警周期最小为30分钟，最大为1440分钟')
                    } else {
                        this.saveWarnConfig()
                    }
                } else if (this.formData.alarmTypeId === 4) {
                    if (!this.formData.areaId) {
                        this.$message.warning('请选择告警区域')
                    } else if (!this.formData.disapperInterval) {
                        this.$message.warning('请选择目标消失间隔时间')
                    } else if (!reg.test(this.formData.disapperInterval)) {
                        this.$message.warning('请输入正确的目标消失间隔时间')
                    } else if (this.formData.disapperInterval < 1 || this.formData.disapperInterval > 24) {
                        this.$message.warning('消失时长最小为1小时，最大为24小时')
                    } else {
                        this.saveWarnConfig()
                    }
                } else if (this.formData.alarmTypeId === 11) {
                    if (!this.formData.areaCode) {
                        this.$message.warning('请选择告警区域')
                    } else if (!this.formData.areaId) {
                        this.$message.warning('请选择二级告警区域')
                    } else if (!this.formData.disapperInterval) {
                        this.$message.warning('请选择目标消失间隔时间')
                    } else if (!reg.test(this.formData.disapperInterval)) {
                        this.$message.warning('请输入正确的目标消失间隔时间')
                    } else {
                        this.saveWarnConfig()
                    }
                } else if (this.formData.alarmTypeId === 2) {
                    if (!this.formData.areaId) {
                        this.$message.warning('请选择告警区域')
                    } else if (!reg.test(this.formData.repeatCyc)) {
                        this.$message.warning('请输入正确的重复告警周期')
                    } else if (this.formData.repeatCyc < 30 || this.formData.repeatCyc > 1440) {
                        this.$message.warning('重复告警周期最小为30分钟，最大为1440分钟')
                    } else {
                        this.saveWarnConfig()
                    }
                    // else if (this.formData.alarmTimeType === '') {
                        // this.$message.warning('请选择告警时间')
                    // }
                    // else if (this.formData.alarmTimeType) {
                    //     if (this.formData.alarmTimeType === '时间段') {
                    //         if (!this.formData.timeStageOne && !this.formData.timeStageTwo) {
                    //             this.$message.warning('请告警选择时间段')
                    //         } else if (this.formData.timeStageOne) {
                    //             if (this.formData.oneBeginTime === 'Invalid date') {
                    //                 this.$message.warning('请选择时间段一的开始时间')
                    //             } else if (this.formData.oneEndTime === 'Invalid date') {
                    //                 this.$message.warning('请选择时间段一的结束时间')
                    //             } else if (this.formData.timeStageTwo) {
                    //                 if (this.formData.twoBeginTime === 'Invalid date') {
                    //                     this.$message.warning('请选择时间段二的开始时间')
                    //                 } else if (this.formData.twoEndTime === 'Invalid date') {
                    //                     this.$message.warning('请选择时间段二的结束时间')
                    //                 } else {
                    //                     this.saveWarnConfig()
                    //                 }
                    //             } else {
                    //                 this.saveWarnConfig()
                    //             }
                    //         } else if (this.formData.timeStageTwo) {
                    //             if (this.formData.twoBeginTime === 'Invalid date') {
                    //                 this.$message.warning('请选择时间段二的开始时间')
                    //             } else if (this.formData.twoEndTime === 'Invalid date') {
                    //                 this.$message.warning('请选择时间段二的结束时间')
                    //             } else {
                    //                 this.saveWarnConfig()
                    //             }
                    //         }
                    //     }
                    // }
                } else if (this.formData.alarmTypeId === 6) {
                    if (!this.formData.alarmPersonNum) {
                        this.$message.warning('请输入告警人数')
                    } else if (!reg.test(this.formData.alarmPersonNum)) {
                        this.$message.warning('请输入正确的告警人数')
                    } else if (Number(this.formData.alarmPersonNum) > Number(this.warnTarNum)) {
                        this.$message.warning('告警人数不能超过目标总数')
                    } else if (this.formData.msisdn.split(',').length < Number(this.formData.alarmPersonNum)) {
                        this.$message.warning('告警人数不能大于勾选总数')
                    } else if (!this.formData.safetyDistance) {
                        this.$message.warning('请输入安全距离')
                    } else if (!distancee.test(this.formData.safetyDistance)) {
                        this.$message.warning('请输入正确的安全距离')
                    } else {
                        this.saveWarnConfig()
                    }
                } else if (this.formData.alarmTypeId === 7) {
                    let timeRange = (new Date(this.formData.beginTime).getTime() - new Date(this.formData.endTime).getTime()) / 1000;
                    if (!this.formData.beginTime) {
                        this.$message.warning('请选择开始时间')
                    } else if (!this.formData.endTime) {
                        this.$message('请选择结束时间')
                    } else if (timeRange > 0) {
                        this.$message.warning('开始时间不能大于结束时间')
                    } else {
                        this.saveWarnConfig()
                    }
                } else if (this.formData.alarmTypeId === 5) {
                    if (!this.formData.dayBeginTime || this.formData.dayBeginTime === ':00') {
                        this.$message.warning('请选择白天告警开始时间')
                    } else if (!this.formData.dayEndTime || this.formData.dayEndTime === ':00') {
                        this.$message.warning('请选择白天告警结束时间')
                    } else if (!this.formData.dayDisappearTime) {
                        this.$message.warning('请输入目标白天消失阈值')
                    } else if (!reg.test(this.formData.dayDisappearTime)) {
                        this.$message.warning('请输入正确的目标白天消失阈值')
                    } else if (this.formData.dayDisappearTime > 12) {
                        this.$message.warning('白天消失阈值时间不能超过12个小时')
                    } else if (!this.formData.nightBeginTime || this.formData.nightBeginTime === ':00') {
                        this.$message.warning('请选择晚上告警开始时间')
                    } else if (!this.formData.nightEndTime || this.formData.nightEndTime === ':00') {
                        this.$message.warning('请选择晚上告警结束时间')
                    } else if (!this.formData.nightDisappearTime) {
                        this.$message.warning('请输入目标晚上消失阈值')
                    } else if (!reg.test(this.formData.nightDisappearTime)) {
                        this.$message.warning('请输入正确的目标晚上消失阈值')
                    } else if (this.formData.nightDisappearTime > 12) {
                        this.$message.warning('白天消失阈值时间不能超过12个小时')
                    } else {
                        this.saveWarnConfig()
                    }
                    // else if (!this.formData.reappear) {
                    //     this.$message.warning('请输入目标消失重现时间')
                    // } else if (!reg.test(this.formData.reappear)) {
                    //     this.$message.warning('请输入正确的目标消失重现时间')
                    // }
                } else if (this.formData.alarmTypeId === 8) {
                    if (!this.formData.areaId) {
                        this.$message.warning('请选择告警区域')
                    } else {
                        this.saveWarnConfig()
                    }
                } else if (this.formData.alarmTypeId === 9) {
                    if (!this.formData.areaId) {
                        this.$message.warning('请选择告警区域')
                    } else if (!this.formData.threshold) {
                        this.$message.warning('请输入目标基线值告警阈值')
                    } else if (!percent.test(this.formData.threshold)) {
                        this.$message.warning('请输入正确的目标基线值告警阈值')
                    } else {
                        this.formData.threshold = this.formData.threshold + '%'
                        if (this.alarmTaskId) {
                            // 修改告警
                            this.formData.alarmTaskId = this.alarmTaskId
                            this.alaConfUpdate(this.formData)
                            // this.isModify = false
                        } else {
                            // 保存告警配置
                            this.alaConfAdd(this.formData)
                        }
                    }
                } else if (this.formData.alarmTypeId === 10) {
                    this.saveWarnConfig();
                }
            },
            // 新增告警任务
            async alaConfAdd (obj) {
                let resp = await alaConfAdd(obj)
                if (resp) {
                    this.$message.success('保存成功')
                    this.showAdd = false
                    this.getTaskList()
                    this.clearParm()
                }
            },
            // 获取已选择的目标号码
            getSelectedTarNum () {
                this.warnTableData = []
                this.selectedWarnPer.forEach(item => {
                    let personInfo = item.msisdn + ':' + item.name
                    this.warnTableData.push(personInfo)
                })
                this.formData.msisdn = this.warnTableData.join(',')
            },
            // 获取已选告警区域列表
            async getselectedArea () {
                let resp = await selectedAreaInfoQuery({ owner: this.taskId, approverStatus: 3 })
                if (resp) {
                    this.warnAreaSelect = resp.rows
                }
            },
            // 新增告警 11 获取已选告警区域列表
            async getNewWarningingArea2 () {
                let resp = await selectedAreaInfoQuery({ owner: this.taskId, approverStatus: 3 })
                if (resp) {
                    this.warnAreaSelect2 = resp.rows
                    // this.warnAreaSelect2 = [
                    //     {
                    //         areaName: '二级区域a',
                    //         resourceId: '2a'
                    //     },
                    //     {
                    //         areaName: '二级区域b',
                    //         resourceId: '1b'
                    //     },
                    //     {
                    //         areaName: '二级区域c',
                    //         resourceId: '2c'
                    //     }
                    // ]
                }
            },
            async getNewWarningingArea1 () {
                let resp = await alarmArea1()
                if (resp) {
                    this.warnAreaSelect = resp.rows
                    // this.warnAreaSelect = [
                    //     {
                    //         areaName: '一级区域a',
                    //         resourceId: '1a'
                    //     },
                    //     {
                    //         areaName: '一级区域b',
                    //         resourceId: '1b'
                    //     },
                    //     {
                    //         areaName: '一级区域c',
                    //         resourceId: '1c'
                    //     }
                    // ]
                }
            },
            // 获取数据字典的已选告警区域
            async getDictionaryArea () {
                let resp = await alarmArea()
                if (resp) {
                    this.warnAreaSelect = resp.rows
                }
            },
            // 省内漫出
            async getDictionaryArea1 () {
                let resp = await alarmCity()
                if (resp) {
                    this.warnAreaSelect = resp.rows
                }
            }
        },
        computed: {
            comSize () {
                return {
                    height: this.vsHeight - 160
                }
            },
            warnTableHeight () {
                return {
                    height: this.vsHeight - 360
                }
            },
            SquareHeight () {
                return this.vsHeight - 360
            },
            ...mapGetters({
                'alaInfoList': 'global/alaInfoList',
                'vsHeight': 'global/visualHeight'
            })
        },
        watch: {
            'taskParm.dayBeginTime' (val) {
                let endLng = (+val.split(':')[0] / 10) < 1 ? 1 : 2
                this.dynamicEnd = '24:00'
                if (endLng === 1) {
                    this.dynamicStart = +val.split(':')[0] === 9 ? `${+val.split(':')[0] + 1}:00`
                        : `0${+val.split(':')[0] + 1}:00`
                } else if (endLng === 2) {
                    this.dynamicStart = `${+val.split(':')[0] + 1}:00`
                }
                if (!this.isEdit && this.taskParm.dayEndTime) {
                    this.taskParm.dayEndTime = ''
                    this.taskParm.nightBeginTime = ''
                    this.taskParm.nightEndTime = ''
                } else if (this.isEditChange) {
                    this.taskParm.dayEndTime = ''
                    this.taskParm.nightBeginTime = ''
                    this.taskParm.nightEndTime = ''
                }
                if (this.isEdit) {
                    this.isEditChange = true;
                }
            },
            'taskParm.dayEndTime' (val) {
                if (val) {
                    this.taskParm.nightBeginTime = val
                    this.taskParm.nightEndTime = this.taskParm.dayBeginTime
                }
            },
            'formData.alarmTypeId' (val) {
                this.selWarnModel()
                if (Number(val) !== 9) {
                    this.showTable = true
                    this.getWarnPersonNum()
                } else {
                    this.showTable = false
                }
                if (Number(val) === 4) {
                    this.getDictionaryArea()
                } else if (Number(val) === 11) {
                    this.getNewWarningingArea1()
                    this.getNewWarningingArea2()
                } else if (Number(val) === 8) {
                    this.getDictionaryArea1()
                } else {
                    this.getselectedArea()
                }
            }
        },
        components: {
            sysDialog,
            sysSquare,
            sysTable
        }
    }
</script>
<style scoped>
    @component-namespace ga {
        @b configWarn{
            padding:0 12px;
            @e marginTop10{
                margin-top:10px;
            }
            @e dialogTitle{
                height:30px;
                line-height:30px;
                i{
                    display:inline-block;
                    width:4px;
                    height:16px;
                    margin-right: 6px;
                    position: relative;
                    top: 3px;
                    background:rgba(0,170,255,1);
                }
            }
        }
    }
    .dialogForm {
        margin-bottom: 16px;
    }
</style>
