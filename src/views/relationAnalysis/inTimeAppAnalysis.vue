<template lang="html">
      <div class="ga-inTimeAppAnalysis">
            <el-row :style="chartHeight">
                <!-- 目标选择按钮 -->
                <el-row class="ga-inTimeAppAnalysis__menu">
                    <buttonComp :option="buttonOpt"></buttonComp>
                </el-row>
                <!-- 表格区域 -->
                <el-row class="ga-inTimeAppAnalysis__chart">
                    <!-- 左侧横向柱状图 -->
                    <el-col :span="12">
                        <p class="ga-inTimeAppAnalysis__p">APP安装情况</p>
                            <el-row>
                                <el-col :span="20" :offset="2" id="leftChart">
                                    <appBar :option="barOpt" :renderData="barData" @barToAppShow="barDialogShow"></appBar>
                                </el-col>
                            </el-row>
                    </el-col>
                    <!-- 右侧树 状图 -->
                    <el-col :span="12" style="position: relative">
                         <p class="ga-inTimeAppAnalysis__p">APP使用占比TOP10</p>
                         <el-row>
                            <el-col :span="20" :offset="2" id="rightChart">
                                <appTreeMap :renderData="treeData" :option="treeOpt" @treeMapToAppShow="treeMapDialogShow"></appTreeMap>
                            </el-col>
                         </el-row>
                    </el-col>
                </el-row>
            </el-row>
          <!-- 下方表格展示 -->
            <el-row class="ga-inTimeAppAnalysis__table">
                <div class="ga-inTimeAppAnalysis__p">
                    <span>APP安装详情</span>
                    <!--<span class="ga-inTimeAppAnalysis__p&#45;&#45;install"></span> <span>安装</span>-->
                    <!--<span class="ga-inTimeAppAnalysis__p&#45;&#45;noInstall"></span> <span>未安装</span>-->
                </div>
                <tableComp style="margin-top: 5px" v-if="tableShow" :option="tableOpt" :comSize="comSize" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange = "handleSizePageChange"></tableComp>
            </el-row>
          <!-- 目标选择弹出框 -->
            <sysDialog size="small"
                    :dialogVisible="selectShow"
                    title="目标选择"
                    :okFn="commitSelect"
                    @change="dialogChange"
                    @openCallback="dialogOpendCallback">
                <!--<div>即时通讯类APP应用分析.姓名 ，手机号</div>-->
                <el-row>
                    <formComp :option="formSelectOpt" ref="formSelectOpt"></formComp>
                </el-row>
                <el-row class="ga-inTimeAppAnalysis__dialog--title">
                    <!--<p>请选择XXX群体性事件任务手机APP应用分析需要监测的目标</p>-->
                </el-row>
                <el-row class="ga-inTimeAppAnalysis__dialog--table">
                    <tableComp :option="tableSelectOpt" :comSize="{height: 270}" @handleSelectionChange ="handleSelectionChange"></tableComp>
                </el-row>
            </sysDialog>
          <!-- 遮罩层（点击遮罩层，弹框消失） -->
            <div v-if="cover" @click="cancelDialog" style="position: fixed;top: 0; right: 0; bottom: 0;left: 0;opacity: 1">
            </div>
          <!-- 树状图点击事件弹出框 -->
            <div v-show="treeMapDialog" id="treeMapDialog" class="ga-inTimeAppAnalysis__appDialog">
                   <el-row class="ga-inTimeAppAnalysis__appDialog--title">
                        <el-col :span="23">
                            {{treeMapTitle}}使用详情（共使用{{treeMapUsageCounter}}次）
                        </el-col>
                        <el-col :span="1">
                            <button class="ga-inTimeAppAnalysis__appDialog--close" @click="closeDialog">&#10005</button>
                        </el-col>
                    </el-row>

                   <el-row class="ga-inTimeAppAnalysis__appDialog--table">
                        <tableComp :option="treeMapTableOpt" :comSize="{height: 120}"></tableComp>
                   </el-row>
             </div>
          <!-- 左侧柱状图点击事件弹出框 -->
             <div v-show="barDialog" id="barDialog" class="ga-inTimeAppAnalysis__appDialogBar">
                   <el-row class="ga-inTimeAppAnalysis__appDialogBar--title">
                        <el-col :span="23">
                            安装{{barTitle}}手机详情（共{{barTableOpt.data.length}}个设备安装）
                        </el-col>
                        <el-col :span="1">
                            <button class="ga-inTimeAppAnalysis__appDialogBar--close" @click="closeDialog">&#10005</button>
                        </el-col>
                    </el-row>
                   <el-row class="ga-inTimeAppAnalysis__appDialogBar--table">
                        <tableComp :option="barTableOpt" :comSize="{height: 120}"></tableComp>
                   </el-row>
             </div>
      </div>
</template>

<script>
    import buttonComp from 'components/Form/button'
    import sysDialog from 'components/common/dialog'
    import formComp from 'components/Form'
    import tableComp from 'components/Table'
    import { forbiddenDate } from 'utils'
    import { mapGetters } from 'vuex'
    import appBar from 'components/Chart/barApp'
    import appTreeMap from 'components/Chart/treemap'
    import { getTargetTelList } from 'api/baseData'
    import { getAppInstall, getUseLevel, getInstallDetail } from 'api/relationAnalysis/inTimeAppAnalysis'
    export default {
        name: 'inTimeAppAnalysis',
        data () {
            let me = this;
            let yesterday = new Date();
            yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000);
            return {
//                owner: '',
                barTitle: '',
                treeMapTitle: '',
                treeMapUsageCounter: 0,
                tableShow: false,
                cover: false,
                treeMapDialog: false,
                barDialog: false,
                selectShow: false,
                formHeight: '',
                tableSelections: [],
                tableObj: {
                    page: 1,
                    rows: 10,
                    owner: '',
                    queryStartTime: '',
                    queryEndTime: '',
                    msisdn: []
                },
                selectObj: {
                    msisdn: '',
                    owner: ''
                },
                chartObj: {

                },
                formSelectOpt: {
                    inline: true,
                    labelPos: 'center',
                    labelWidth: '80',
                    items: [{
                        label: '开始时间',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'selectBeginTime',
                            value: yesterday,
                            disabled: false,
                            width: '180',
                            type: 'date',
                            placeholder: '请选择开始时间',
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    }, {
                        label: '结束时间',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'selectEndTime',
                            value: yesterday,
                            disabled: false,
                            width: '180',
                            type: 'date',
                            placeholder: '请选择开始时间',
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    }]
                },
                buttonOpt: {
                    id: 'btn1',
                    value: '目标选择',
                    disabled: false,
                    // btnType: 'rightTop',
                    click: function () {
                        me.selectClick()
                    }
                },
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center', fixed: 'left' },
                        { name: '手机号', value: 'msisdn', width: 135, align: 'center', fixed: 'left' }
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
                tableSelectOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '手机号', value: 'msisdn', align: 'center' },
                        { name: '卡号', value: 'imsi', align: 'center' },
                        { name: '机身码', value: 'imei', align: 'center' },
                        { name: '用户名', value: 'name', align: 'center' },
                        { name: '', value: 'selection', align: 'center' }
                    ],
                    data: [],
                    pagination: false
                },
                treeMapTableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '手机号', value: 'msisdn', width: 135, align: 'center' },
                        { name: '姓名', value: 'name', align: 'center' },
                        { name: '使用次数', value: 'count', width: 80, align: 'center' }
                    ],
                    data: [],
                    pagination: false
                },
                barTableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '手机号', value: 'msisdn', width: 135, align: 'center' },
                        { name: '姓名', value: 'name', width: 100, align: 'center' }
                    ],
                    data: [],
                    pagination: false
                },
                barOpt: {
                    width: '',
                    height: '',
                    props: {
                        xName: '安装数',
                        yName: '',
                        dataZoomHeight: ''
                    }
                },
                barData: [],
                treeOpt: {
                    width: '',
                    height: '200'
                },
                treeData: [],
                taskIdInit: this.taskId
            }
        },
        props: {
            taskId: {
                default: ''
            }
        },
        components: {
            formComp,
            tableComp,
            sysDialog,
            appBar,
            appTreeMap,
            buttonComp
        },
        created () {
            //  测试代码
            this.selectObj.owner = 'T318';
//            this.selectObj.owner = this.userName;
            if (localStorage.getItem('taskId')) {
                this.taskIdInit = localStorage.getItem('taskId')
            }
            if (this.taskIdInit !== '' && this.taskIdInit !== null) {
                this.selectObj.owner = this.taskIdInit
            }
            this.barOpt.height = this.vsHeight / 2 - 108;
            this.barOpt.props.dataZoomHeight = this.barOpt.height - 50;
            this.treeOpt.height = this.vsHeight / 2 - 118;
//            this.fetchSelectData();
        },
        mounted () {
        },
        computed: {
            comSize () {
                return {
                    height: this.vsHeight / 2 - 5
                }
            },
            chartHeight () {
                return {
                    height: this.vsHeight / 2 - 40 + 'px'
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'userName': 'global/userName'
            })
        },
        methods: {
            closeDialog () {
                this.barDialog = false;
                this.treeMapDialog = false;
            },
            cancelDialog () {
                this.cover = false;
                this.barDialog = false;
                this.treeMapDialog = false;
            },
            treeMapDialogShow (val, x, y, treeMapDialogData) {
                this.barDialog = false;
                this.treeMapTitle = treeMapDialogData.name;
                this.treeMapDialog = treeMapDialogData.name;
                this.treeMapUsageCounter = 0;
                for (let i in treeMapDialogData.rows) {
                    this.treeMapUsageCounter += treeMapDialogData.rows[i].count
                }
                this.treeMapTableOpt.data = treeMapDialogData.rows;
                this.treeMapDialog = val;
                this.cover = val;
                $('#treeMapDialog').css(
                    {
                        'left': x - 325, 'top': y - 75
                    }
                )
            },
            barDialogShow (val, x, y, barDialogData) {
                this.barTitle = barDialogData.name;
                this.barTableOpt.data = barDialogData.rows;
                this.treeMapDialog = false;
                this.barDialog = val;
                this.cover = val;
                $('#barDialog').css(
                    {
                        'left': x, 'top': y - 75
                    }
                )
            },
            commitSelect () {
                let { selectBeginTime: queryStartTime, selectEndTime: queryEndTime } = this.$refs.formSelectOpt.getValue()
                let arr = [];
                for (let i in this.tableSelections) {
                    if (this.tableSelections[i].name) {
                        arr[i] = this.tableSelections[i].name + '||' + this.tableSelections[i].msisdn;
                    } else {
                        arr[i] = null + '||' + this.tableSelections[i].msisdn;
                    }
                }
                if (queryStartTime === '' || null) {
//                    this.$message({
//                        type: 'warning',
//                        message: '开始时间不能为空'
//                    });
                    this.$alert('开始时间不能为空', {
                        confirmButtonText: '确定'
                    });
                } else if (queryEndTime === '' || null) {
//                    this.$message({
//                        type: 'warning',
//                        message: '结束时间不能为空'
//                    });
                    this.$alert('结束时间不能为空', {
                        confirmButtonText: '确定'
                    });
                } else if (queryStartTime > queryEndTime) {
                    this.$alert('请输入正确的起止时间', {
                        confirmButtonText: '确定'
                    });
                } else if (arr.length === 0) {
//                    this.$message({
//                        type: 'warning',
//                        message: '请选择目标人'
//                    });
                    this.$alert('请选择目标人', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.tableObj.queryStartTime = queryStartTime;
                    this.tableObj.queryEndTime = queryEndTime;
                    this.tableObj.msisdn = arr.join(',');
                    this.chartObj.queryStartTime = queryStartTime;
                    this.chartObj.queryEndTime = queryEndTime;
                    this.chartObj.msisdn = arr.join(',');
                    this.fetchTaskData();
                    this.dialogChange(false);
                }
            },
//            dialog显示回调
            dialogOpendCallback () {
                this.tableSelectOpt.data = [];
                this.tableSelectOpt.listLoading = true;
                this.fetchSelectData()
            },
//            select列表加载事件
            async fetchSelectData () {
                this.selectObj.approverStatus = 3;
                let resp = await getTargetTelList(this.selectObj);
                this.tableSelectOpt.listLoading = false;
                if (resp) {
                    this.tableSelectOpt.data = resp.rows;
                }
            },
            fetchTaskData () {
                this.fetchAppInstallData();
                this.fetchAppUseLevel();
//                测试代码
                this.tableObj.owner = 'T381';
//                this.tableObj.owner = this.selectObj.owner;
                this.fetchTableData();
            },
            async fetchAppUseLevel () {
                let respUseLevel = await getUseLevel(this.chartObj);
                if (respUseLevel && respUseLevel.status === 200) {
                    this.treeData = respUseLevel.rows;
                }
            },
            async fetchAppInstallData () {
                let respInstall = await getAppInstall(this.chartObj);
                if (respInstall && respInstall.status === 200) {
                    respInstall.rows.sort(function (a, b) {
                        return a.value - b.value;
                    })
                    this.barData = respInstall.rows;
                }
            },
            async fetchTableData () {
                let valueArr = [];
                let respInstallDetail = await getInstallDetail(this.tableObj);
                if (respInstallDetail && respInstallDetail.status === 200) {
                    this.tableShow = true;
                    this.tableOpt.listLoading = true;
                    this.dynamicColumnInit(respInstallDetail.rows[0].rows);
                    valueArr = this.dynamicColumnValue(respInstallDetail.rows);
                    this.$nextTick(() => {
                        this.tableOpt.data = valueArr;
                    })
                    this.tableOpt.listLoading = false;
//                    this.tableOpt.pageOpt.currentPage = val || 1;
                    this.tableOpt.pageOpt.total = respInstallDetail.total;
                }
            },
            selectClick () {
                this.tableSelections = [];
                this.selectShow = true;
            },
            dialogChange (val) {
                this.selectShow = val;
            },
//            表头初始化
            dynamicColumnInit (rows) {
                this.tableOpt.column = [
                    { name: '序号', value: 'index', width: 60, align: 'center', fixed: 'left' },
                    { name: '手机号', value: 'msisdn', width: 135, align: 'center', fixed: 'left' }
                ];
                let nameArr = [];
                for (let i in rows) {
                    nameArr.push({ name: rows[i].appName })
                }
                for (let i in nameArr) {
                    this.tableOpt.column.push(nameArr[i])
                }
                for (let i in this.tableOpt.column) {
                    if (i > 1) {
                        this.tableOpt.column[i].align = 'center'
                        let t = i - 2;
                        this.tableOpt.column[i].value = 'v' + t + '';
                        this.tableOpt.column[i].color = '1';
                    }
                }
            },
//            表格初始化
            dynamicColumnValue (rows) {
                let valueArr = [];
                _.times(rows.length, function () {
                    valueArr.push([])
                })
                for (let i in rows) {
                    valueArr[i] = _.pick(rows[i], ['msisdn']);
                }
                for (let i in rows) {
                    for (let j in rows[i].rows) {
                        valueArr[i]['v' + j + ''] = rows[i].rows[j].value;
                    }
                }
                return valueArr;
            },
            handleSelectionChange (val) {
                this.tableSelections = val;
            },
            handleCurrentPageChange (val) {
                this.tableObj.page = val;
                this.fetchTableData();
            },
            handleSizePageChange (val) {
                this.tableObj.rows = val;
//                备注：是否跳回第一页
                this.tableObj.page = 1;
                this.tableOpt.pageOpt.currentPage = 1;
                this.fetchTableData();
            }
        },
        watch: {
            taskId (val) {
                this.taskIdInit = val;
            }
        }
    }
</script>

<style lang="postcss" >
    /*.el-table td {*/
        /*border: 1px solid red !important;*/
    /*}*/
    @component-namespace ga {
        @b inTimeAppAnalysis {
            @e menu {
                /*padding-top: 5px;*/
                @m btn {
                    padding: 5px 10px;
                    background-color: rgb(39, 141, 227);
                    border: none;
                    color: #fff;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
            @e p {
                color: #9af5f6;
                font-size: 16px;
                @m install {
                    display: inline-block;
                    width: 20px;
                    height: 10px;
                    margin-left: 30px;
                    background-color: #13CE66
                }
                @m noInstall {
                    margin-left: 10px;
                    display: inline-block;
                    width: 20px;
                    height: 10px;
                    background-color: #FF4949
                }
            }
            @e appDialog {
                position: absolute;
                width: 410px;
                height: 165px;
                z-index: 9999;
                color: #ffffff;
                border: 1px solid #4782D1;
                background-color: #03121F;
                @m title {
                    margin-left: 5px;
                    margin-right: 10px;
                    width: 395px;
                    margin-top: 5px;
                }
                @m table {
                    margin-left: 5px;
                    margin-right: 5px;
                    width: 400px;
                    font-size: 14px;
                }
                @m close {
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    border: none;
                    outline: none;
                    color: #fff;
                    cursor: pointer;
                    background-color: transparent;
                }
                @m close:hover {
                    color: #00a2ff;
                }
            }
            @e appDialogBar {
                position: absolute;
                width: 310px;
                height: 165px;
                z-index: 9999;
                color: #ffffff;
                border: 1px solid #4782D1;
                background-color: #03121F;
                @m title {
                    margin-left: 5px;
                    margin-right: 10px;
                    width: 295px;
                    margin-top: 5px;
                }
                @m table {
                    margin-left: 5px;
                    margin-right: 5px;
                    width: 300px;
                    font-size: 14px;
                }
                @m close {
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    border: none;
                    outline: none;
                    color: #fff;
                    cursor: pointer;
                    background-color: transparent;
                }
                @m close:hover {
                    color: #00a2ff;
                }
            }
            @e dialog {
                @m title{
                    margin-bottom: 5px;
                }
                @m table{
                    /*height: 200px;*/
                }
            }
            @e chart {
                margin-top: 5px;
            }
            @e table {
            }
            @e dialog {
                margin-top: 5px;
            }
        }
    }
</style>
