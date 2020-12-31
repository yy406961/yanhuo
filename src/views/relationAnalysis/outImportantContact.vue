<template>
    <div>
        <div class="up">
            <el-row>
                <el-col>
                    <div class="ga-outImportantContact__button">
                        <el-button type="primary" @click="addSeachTask" :disabled="canChange">添加查询任务</el-button>
                        &nbsp;
                        <el-button type="primary" @click="taskResult">查看查询结果</el-button>
                        <el-button type="primary"
                                   class="exportBtn"
                                   @click="handleDownload"
                                   :disabled="download">导 出</el-button>
                        <a id="screenshot" class="down" href="" download="downImg" style="display: none;">截图下载</a>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <div id="leftTable">
                        <frameComp :normal="true">
                            <tableComp :option = "tableOptResult" :comSize="comSizeComm" ref="tableResult">
                            </tableComp>
                        </frameComp>
                    </div>
                </el-col>
                <el-col :span="17">
                    <div class="ga-outImportantContact" :style="rightStyle">
                        <div class="ga-outImportantContact__chart" id="graphBox">
                            <div :style="rightStyle">
                                <graphComp  :options="opts" @graphClick="clickHandler" :size="rightStyle" ref="chart" @contanctCount='contanctCount'></graphComp>
                            </div>
                        </div>
                        <!--内部号码，展示用-->
                        <transition name="fade">
                            <div class="ga-outImportantContact__minTable" v-show="minTableShowInside" ref="minTableInside">
                                <div class="ga-outImportantContact__msg">
                                    <i class="ga-outImportantContact__msg--bar"></i>
                                    <span>内部重点人号码</span>
                                    <i class="el-icon-close" @click="closeMinTableInside"></i>
                                </div>
                                <div class="ga-outImportantContact__tableContent">
                                    <frameComp :normal="true">
                                        <tableComp :option = "tableOptMinInside" :comSize="comSizeComm">
                                        </tableComp>
                                    </frameComp>
                                </div>
                            </div>
                        </transition>

                        <transition name="fade">
                            <div class="ga-outImportantContact__minTable" v-show="minTableShow" ref="minTable">
                                <div class="ga-outImportantContact__msg">
                                    <i class="ga-outImportantContact__msg--bar"></i>
                                    <span>{{ minMsg }}</span>
                                    <i class="el-icon-close" @click="closeMinTable"></i>
                                </div>
                                <div class="ga-outImportantContact__tableContent">
                                    <frameComp :normal="true">
                                        <tableComp :option = "tableOptMin" :comSize="comSizeComm">
                                        </tableComp>
                                    </frameComp>
                                </div>
                            </div>
                        </transition>
                        <transition name="fade">
                            <div class="ga-outImportantContact__table" v-show="tableShow" ref="detailTable">
                                <div class="ga-outImportantContact__msg">
                                    <i class="ga-outImportantContact__msg--bar"></i>
                                    <span>{{ commDetailMsg }}</span>
                                    <i class="el-icon-close" @click="closeTable"></i>
                                </div>
                                <div class="ga-outImportantContact__tableContent">
                                    <frameComp :normal="true">
                                        <tableComp :option = "tableOptCommDetail" :comSize="comSizeComm"
                                                   @handleCurrentPageChange="commDetailCurrentPage"
                                                   @handleSizePageChange="commDetailPage">
                                        </tableComp>
                                    </frameComp>
                                </div>
                            </div>
                        </transition>
                    </div>
                </el-col>
            </el-row>
            <sysDialog size="small"
                       title="添加查询任务"
                       v-if="dialogVisibleTarget"
                       @change="dialogChangeTarget"
                       @openCallback="dialogOpendCallbackTarget"
                       :dialogVisible="dialogVisibleTarget"
                       :okFn="okFnTarget">
                <FormComp :option="formOptTarget" ref="formTarget"></FormComp>
                <!--目标选择穿梭框-->
                <!-- <el-transfer
                    v-model="value3"
                    filterable
                    :filter-method="filterMethod"
                    :render-content="renderFunc"
                    :right-default-checked = "value3"
                    :titles="['目标号码', '已选目标']"
                    @change="handleChange"
                    :data="transferData">
                    <span style="margin-left: 30px" slot="left-footer">搜索结果：{{filterArrLengthLeft}} 项</span>
                    <span style="margin-left: 30px" slot="right-footer">搜索结果：{{filterArrLengthRight}} 项</span>
                </el-transfer> -->
                <TransFer :option="transferData"></TransFer>
                <!--<tableComp :option = "tableOptTarget" :comSize="comSizeTarget"-->
                           <!--@handleSelectionChange="targetHandleSelectionChange">-->
                <!--</tableComp>-->
            </sysDialog>
            <sysDialog size="large"
                       title="查询结果"
                       @change="dialogChangeResult"
                       @openCallback="dialogOpendCallbackResult"
                       :dialogVisible="dialogVisibleResult"
                       :showCancel='false'
                       :showConfirm="false">
                <p style="width: 100%; text-align: right; padding: 0 20px 0 0;">
                    <el-button type="text" @click="dialogOpendCallbackResult">
                        <i class="fa fa-refresh"></i>
                        刷新
                    </el-button>
                </p>
                <tableComp :option = "tableOptQueryResult" :comSize="comSizeQueryResult"
                           @handleCurrentPageChange="taskHandleCurrentPageChange"
                           @handleSizePageChange = "taskHandleSizePageChange">
                </tableComp>
            </sysDialog>
            <sysDialog size="small"
                       title="时长/内容详情"
                       @change="dialogChangeContent"
                       :dialogVisible="contentDetailVisible"
                       :showCancel='false'
                       :showConfirm="false">
                <ul class="ga-outImportantContact__contentDetail">
                    <li class="ga-outImportantContact__li">{{contentTag}}</li>
                    <li class="ga-outImportantContact__message">{{contentDetail}}</li>
                    <li class="ga-outImportantContact__li">{{contentA}}</li>
                    <li class="ga-outImportantContact__message">{{uAddress}}</li>
                    <li class="ga-outImportantContact__li">{{contentB}}</li>
                    <li class="ga-outImportantContact__message">{{rAddress}}</li>
                </ul>
            </sysDialog>
        </div>
    </div>
</template>

<script>
import graphComp from 'components/Chart/graph'
import FormComp from 'components/Form/index'
import TransFer from 'components/transfer/index'
import sysDialog from 'components/common/dialog'
import tableComp from 'components/Table/'
import frameComp from 'components/monitor/frame'
import { mapGetters } from 'vuex'
import { phoneNumChange } from 'utils/index.js'
import moment from 'moment'
import { forbiddenDate, startDrag } from 'utils'
//    import { targetList, contactInfoList, contactInfoChart, outInContactsList } from 'api/relationAnalysis/outImportantContact'
//    import { addTask, taskList, outInContactsInfo } from 'api/relationAnalysis/inImportantContact'
import {
    targetList,
    addTask,
    taskList,
    contactInfoList,
    contactInfoChart,
    outInContactsList,
    outInContactsInfo,
    getTime,
    deleteTask
} from 'api/relationAnalysis/inImportantContact'
const INDEX = 2
export default {
    name: 'outImportantContact',
    data() {
        let me = this
        return {
            // 导出
            download: true,
            saveCurrentPage: 1,
            filterArrLengthLeft: '',
            filterArrLengthRight: '',
            canChange: false,
            uAddress: '',
            rAddress: '',
            sendPhones: [],
            //                穿梭框
            peopleCount: 2,
            // transferData: [],
            transferData: {
                data: [],
                title: ['目标号码', '已选目标'],
                handleChange: me.handleChange
            },
            value3: [],
            tableData: [],
            //              -----
            contentTag: '',
            contentA: '',
            contentB: '',
            tableShow: false,
            minTableShow: false,
            minTableShowInside: false,
            contentDetailVisible: false,
            contentDetail: '',
            commDetailMsg: '',
            minMsg: '',
            outNumber: '',
            numType: 0,
            numDetail: '',
            // 当前正在查询的任务的ID，开始时间和结束时间
            taskID: '',
            taskStartTime: '',
            taskEndTime: '',
            // 添加查询任务
            dialogVisibleTarget: false,
            targetChose: [],
            targetChoseStr: '',
            yesterDay: '',
            formOptTarget: {
                inline: true,
                labelWidth: '105',
                // 表单项
                items: [
                    {
                        label: '查询任务名称',
                        type: 'text',
                        wrap: true,
                        required: true,
                        comOpt: {
                            id: 'taskName',
                            width: 180,
                            value: ''
                        }
                    },
                    {
                        label: '开始时间',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'startTime',
                            width: 180,
                            value: '',
                            disabled: false,
                            type: 'datetime',
                            pickOptions: {
                                disabledDate(time) {
                                    return forbiddenDate(time, me.yesterDay)
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
                            width: 180,
                            value: '',
                            disabled: false,
                            type: 'datetime',
                            pickOptions: {
                                disabledDate(time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    }
                ]
            },
            tableOptTarget: {
                listLoading: false,
                column: [
                    // 首列是否显示序号、复选框、下沉展开 index/selection
                    { name: '序号', value: 'index', width: 65, align: 'center' },
                    { name: '姓名', value: 'name', align: 'center' },
                    { name: '手机号', value: 'msisdn', width: 140, align: 'center' },
                    { name: '卡号', value: 'imsi', align: 'center' },
                    { name: '机身码', value: 'imei', align: 'center' },
                    { name: '操作', value: 'selection', width: 65, align: 'center' }
                ],
                data: []
            },
            comSizeTarget: {
                height: 300
            },
            // 查看查询任务列表
            dialogVisibleResult: false,
            tableOptQueryResult: {
                listLoading: false,
                column: [
                    // 首列是否显示序号、复选框、下沉展开 index/selection
                    { name: '序号', value: 'index', width: 50, align: 'center' },
                    { name: '任务名称', value: 'taskName', align: 'center' },
                    { name: '创建时间', value: 'createTime', width: 175, align: 'center' },
                    { name: '目标号码数量', value: 'mcount', align: 'center' },
                    { name: '开始时间', value: 'startTime', width: 175, align: 'center' },
                    { name: '结束时间', value: 'endTime', width: 175, align: 'center' },
                    { name: '状态', value: 'status', width: 80, align: 'center' },
                    {
                        name: '操作',
                        value: '',
                        width: 80,
                        type: 'icon',
                        align: 'center',
                        operations: [
                            {
                                label: '查看',
                                type: 'label',
                                callback: e => {
                                    if (e.status !== '已完成') {
                                        return 'is-disabled'
                                    }
                                },
                                click: e => {
                                    if (e.status === '已完成') {
                                        this.dialogVisibleResult = false
                                        this.taskStartTime = e.startTime
                                        this.taskEndTime = e.endTime
                                        this.taskID = e.taskId
                                        this.contactInfoList(me.taskID)
                                        this.contactInfoChart(me.taskID)
                                        this.minTableShowInside = true
                                        this.download = false
                                    }
                                }
                            },
                            {
                                label: '删除',
                                type: 'label',
                                callback: e => {
                                    if (e.status === '查询中') {
                                        return 'is-disabled'
                                    }
                                },
                                click: e => {
                                    if (e.status !== '查询中') {
                                        this.$confirm('是否确认删除？', '删除提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消'
                                        })
                                            .then(() => {
                                                this.deleteTaskFun(e.taskId)
                                            })
                                            .catch(() => {})
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
            },
            comSizeQueryResult: {
                height: 300
            },
            // 左侧数组的储存
            leftTableData: [],
            // 左侧：目标号码通联信息列表
            tableOptResult: {
                listLoading: false,
                stripe: true,
                highlightRow: true,
                column: [
                    // 首列是否显示序号、复选框、下沉展开 index/selection
                    { name: '序号', value: 'index', width: 40, align: 'center' },
                    { name: '外部号码', value: 'relateNum', width: 120, align: 'center' },
                    { name: '归属地', value: 'homeName', align: 'center' },
                    { name: '通联人数', value: 'connPersonCount', width: 65, align: 'center' },
                    { name: '通联次数', value: 'amount', width: 60, align: 'center' }
                    //                        { name: '权重', value: 'weight', width: 52, align: 'center' }
                ],
                data: [],
                rowClick: function(row) {
                    me.minTableShowInside = false
                    me.numType = row.type
                    me.tableShow = false
                    me.tableOptCommDetail.listLoading = false
                    me.outNumber = row.relateNum
                    let minMsgPass
                    if (me.isPhoneJM) {
                        minMsgPass = phoneNumChange(me.outNumber)
                    } else {
                        minMsgPass = me.outNumber
                    }
                    me.minMsg = `${minMsgPass}与内部人员通联分析`
                    me.showMinTable()
                    me.outInContactsList(me.outNumber, me.taskID)
                    me.$refs.chart.setNodeFocus(row.relateNum)
                }
            },
            // 右侧：通联关系图
            opts: {
                // 重点人信息列表 (号码 , 通联人数, 类型)
                phoneData: [],
                // 重点人关系列表
                relData: []
            },
            relationList: [], // 临时存储通联关系
            // 右侧显示内部号码的表格
            tableOptMinInside: {
                listLoading: false,
                stripe: true,
                highlightRow: true,
                column: [
                    // 首列是否显示序号、复选框、下沉展开 index/selection
                    { name: '序号', value: 'index', width: 40, align: 'center' },
                    { name: '内部号码', value: 'relateNum', align: 'center' },
                    { name: '归属地', value: 'homeName', width: 60, align: 'center' },
                    { name: '通联人数', value: 'connPersonCount', width: 60, align: 'center' },
                    { name: '通联次数', value: 'amount', width: 60, align: 'center' }
                ],
                data: [],
                rowClick: function() {
                }
            },
            // 右侧表格
            tableOptMin: {
                listLoading: false,
                stripe: true,
                highlightRow: true,
                column: [
                    // 首列是否显示序号、复选框、下沉展开 index/selection
                    // { name: '序号', value: 'index', width: 40, align: 'center' },
                    { name: '序号', value: 'inNumber', width: 40, align: 'center' },
                    { name: '姓名', value: 'cname', width: 61, align: 'center', tooltip: true },
                    { name: '号码', value: 'innerMsisdn', width: 120, align: 'center' },
                    { name: '通联次数', value: 'amount', align: 'center' },
                    { name: '归属地', value: 'homeName', width: 60, align: 'center' }
                ],
                data: [],
                rowClick: function(row) {
                    me.showDetailTable()
                    me.numDetail = row.innerMsisdn
                    let outNumPass, numDetailPass
                    if (me.isPhoneJM) {
                        outNumPass = phoneNumChange(me.outNumber)
                        numDetailPass = phoneNumChange(me.numDetail)
                    } else {
                        outNumPass = me.outNumber
                        numDetailPass = me.numDetail
                    }
                    me.commDetailMsg = outNumPass + '/' + numDetailPass + ' 通联详情'
                    me.tableOptCommDetail.pageOpt.currentPage = 1
                    me.tableOptCommDetail.pageOpt.pageSize = me.pageArr
                    if (me.numType === 1) {
                        me.outInContactsInfo(me.outNumber, me.numDetail, 1, me.pageArr)
                    } else {
                        me.outInContactsInfo(me.numDetail, me.outNumber, 1, me.pageArr)
                    }
                }
            },
            // 中间表格：通联详情
            pageArr: 10,
            tableOptCommDetail: {
                stripe: true,
                listLoading: false,
                column: [
                    // 首列是否显示序号、复选框、下沉展开 index/selection
                    // tooltip 在值为字符串时才会显示
                    { name: '序号', value: 'index', width: 40, align: 'center' },
                    { name: '主叫/发送', value: 'sendMsisdn', width: 120, align: 'center' },
                    { name: '被叫/接收', value: 'receiveMsisdn', width: 120, align: 'center' },
                    { name: '时间', value: 'beginTime', width: 140, align: 'center' },
                    {
                        name: '时长/内容',
                        value: 'talkTimeOrContent',
                        align: 'center',
                        tooltip: true
                    }
                ],
                data: [],
                pagination: true,
                pageOpt: {
                    layout: 'total, sizes, prev, slot, next, jumper',
                    total: 0,
                    currentPage: 1,
                    pageSize: 10,
                    pageSizes: [10, 20, 30, 40, 50]
                },
                rowClick: function(row) {
                    if (row.type === 1) {
                        me.contentTag = '通话时长：'
                        me.contentA = '主叫位置：'
                        me.contentB = '被叫位置：'
                        // 在是通话时长的时候才显示
                        me.contentDetail = row.talkTimeOrContent
                    } else if (row.type === 2) {
                        // me.contentTag = '短信内容：'
                        me.contentTag = ''
                        me.contentDetail = ''
                        me.contentA = '发送方位置：'
                        me.contentB = '接收方位置：'
                    }
                    me.uAddress = row.uAddress
                    me.rAddress = row.rAddress
                    me.contentDetailVisible = true
                }
            },
            // echarts图表中的点的合集
            pointAll: []
        }
    },
    components: {
        graphComp,
        FormComp,
        sysDialog,
        TransFer,
        tableComp,
        frameComp
    },
    mounted() {
        this.getTimeFun()
        this.opts = {
            type: 2,
            relData: [],
            phoneData: []
        }
    },
    created() {
        this.targetList(this.ID)
        if (localStorage.getItem('taskStatus1')) {
            if (localStorage.getItem('taskStatus1') - 0 === 1) {
                this.canChange = false
            } else {
                this.canChange = true
            }
        }
    },
    computed: {
        // 隐藏的两个联动表格高度
        comSizeComm() {
            return { height: this.vsHeight - 63 }
        },
        // 右边图表高度
        rightStyle() {
            return {
                width: '100%',
                height: this.vsHeight - 63 + 20 + 'px'
            }
        },
        ...mapGetters({
            vsHeight: 'global/visualHeight',
            owner: 'global/userName',
            isPhoneJM: 'global/isPhoneJM'
        }),
        ID() {
            return this.missionId ? this.missionId : this.owner
        },
        missionId() {
            return localStorage.getItem('taskId')
        }
    },
    methods: {
        // 导出
        handleDownload () {
            this.download = true
            let name = '外部重点人挖掘'
            let outHeader = ['序号', '外部号码', '归属地', '通联人数', '通联次数']
            let outFilterVal = ['index', 'relateNum', 'homeName', 'connPersonCount', 'amount']
            let inHeader = ['序号', '内部号码', '归属地', '通联人数', '通联次数']
            let contactHeader = ['序号', '姓名', '号码', '通联次数', '归属地']
            let contactFilterVal = ['inNumber', 'cname', 'innerMsisdn', 'amount', 'homeName']
            if (this.minTableShowInside) {
                let data = []
                data.push(this.tableOptResult.data)
                data.push(this.tableOptMinInside.data)
                this.exportExcel(
                    [outHeader, inHeader],
                    [outFilterVal, outFilterVal],
                    data,
                    ['外部号码', '内部号码'],
                    name
                )
            } else if (this.minTableShow) {
                let data = []
                data.push(this.tableOptResult.data)
                data.push(this.tableOptMin.data)
                this.exportExcel(
                    [outHeader, contactHeader],
                    [outFilterVal, contactFilterVal],
                    data,
                    ['外部号码', this.outNumber + '通联分析'],
                    name
                )
            } else {
                let data = []
                data.push(this.tableOptResult.data)
                this.exportExcel(
                    [outHeader],
                    [outFilterVal],
                    data,
                    ['外部号码'],
                    name
                )
            }
            this.imgScreenshot()
        },
        exportExcel (header, filterVal, data, title, name) {
            import('common/export2excel').then(excel => {
                let xlxData = []
                for (let i = 0; i < header.length; i++) {
                    let list = data[i]
                    xlxData.push(excel.formatJson(filterVal[i], list))
                }
                excel.export_json_to_excel(
                    header,
                    xlxData,
                    title,
                    name
                )
            })
        },
        // 截图
        imgScreenshot () {
            html2canvas(document.getElementById('graphBox'), {
                allowTaint: true,
                taintTest: false,
                background: '#000',
                onrendered: function(canvas) {
                    canvas.id = 'canvas';
                    // let timestamp = Date.parse(new Date());
                    // 把截取到的图片替换到a标签的路径下载
                    $('#screenshot').attr('href', canvas.toDataURL());
                    // 下载下来的图片名字
                    $('#screenshot').attr('download', '外部重点人关系图.jpg');
                    let link = document.getElementById('screenshot');
                    link.click();
                }
            })
            this.download = false
        },
        // 删除某条任务
        async deleteTaskFun(ids) {
            let resp = await deleteTask({
                taskId: ids,
                index: 2
            })
            if (resp.status === 200) {
                this.$message(resp.message)
                // 判断返回数据
                if (this.tableOptQueryResult.data.length === 1) {
                    if (this.saveCurrentPage > 1) {
                        this.saveCurrentPage -= 1
                    }
                }
                // 刷新数据
                this.tableOptQueryResult.data = []
                // this.tableOptQueryResult.listLoading = true
                window.GALoading.open('任务删除中, 请耐心等会儿……')
                this.tableOptQueryResult.pageOpt.currentPage = this.saveCurrentPage
                let pageSize = this.tableOptQueryResult.pageOpt.pageSize
                this.taskList(pageSize, this.saveCurrentPage)
            } else {
                this.$message(resp.message)
            }
        },
        // 获取服务器时间
        async getTimeFun() {
            let resp = await getTime()
            if (resp.data) {
                let time1 = moment(moment(resp.data) - 0 - 24 * 3600 * 1000).format(
                    'YYYY-MM-DD HH:mm:ss'
                )
                let time2 = moment(resp.data).format('YYYY-MM-DD HH:mm:ss')
                this.yesterDay = new Date(resp.data).getTime() - 0 - 24 * 3600 * 1000
                this.formOptTarget.items[1].comOpt.value = time1
                this.formOptTarget.items[2].comOpt.value = time2
                return resp.data
            }
        },
        dialogChangeContent(val) {
            this.contentDetailVisible = val
        },
        contanctCount(val) {
            this.peopleCount = val
            this.tableOptResult.data = []
            let arr = this.leftTableData.filter(item => {
                if (item.connPersonCount < val) {
                    item = null
                }
                return item
            })
            this.tableOptResult.data = arr
        },
        // 中间表格分页
        commDetailCurrentPage(val) {
            if (this.numType === 1) {
                this.outInContactsInfo(this.outNumber, this.numDetail, val, this.pageArr)
            } else {
                this.outInContactsInfo(this.numDetail, this.outNumber, val, this.pageArr)
            }
        },
        commDetailPage(val) {
            this.tableOptCommDetail.pageOpt.currentPage = 1
            this.pageArr = val
            if (this.numType === 1) {
                this.outInContactsInfo(this.outNumber, this.numDetail, 1, val)
            } else {
                this.outInContactsInfo(this.numDetail, this.outNumber, 1, val)
            }
        },
        // 添加查询任务dialog显示回调
        dialogOpendCallbackTarget() {
            this.tableOptTarget.data = []
            this.tableOptTarget.listLoading = true
            this.targetList(this.ID)
        },
        // 查看查询结果dialog显示回调
        dialogOpendCallbackResult() {
            this.tableOptQueryResult.data = []
            // this.tableOptQueryResult.listLoading = true
            window.GALoading.open('任务查询中, 请耐心等会儿……')
            this.tableOptQueryResult.pageOpt.currentPage = 1
            let pageSize = this.tableOptQueryResult.pageOpt.pageSize
            this.taskList(pageSize, 1)
        },
        // 获取目标号码列表
        async targetList(owner) {
            let resp = await targetList({
                owner: owner,
                approverStatus: 3 // 查询目标号码的状态码
            })
            let { rows } = resp
            if (rows && _.isArray(rows)) {
                this.tableOptTarget.data = rows
                this.tableOptTarget.listLoading = false
            } else {
                this.tableOptTarget.listLoading = false
            }
            let data = []
            // this.tableOptTarget.data.forEach((item, index) => {
            //     data.push({
            //         label: `${item.name} - ${item.msisdn}`,
            //         key: index + 1
            //     })
            // });
            this.tableOptTarget.data.forEach((item, index) => {
                data.push({
                    name: item.name,
                    msisdn: item.msisdn,
                    label: `${item.name} - ${item.msisdn}`,
                    key: index + 1
                })
            })
            this.transferData.data = data
        },
        // 添加查询任务
        async addTask(obj) {
            await addTask({
                taskName: obj.taskName,
                startTime: obj.startTime,
                endTime: obj.endTime,
                msisdn: obj.msisdn,
                taskIndex: obj.taskIndex,
                owner: obj.owner
            })
            this.$refs.formTarget.clearValue()
            this.getTimeFun().then(times => {
                this.$refs.formTarget.setValue([
                    {
                        id: 'startTime',
                        value: new Date(new Date(times).getTime() - 24 * 60 * 60 * 1000)
                    },
                    { id: 'endTime', value: new Date(times) }
                ])
                this.dialogVisibleTarget = false
                this.value3 = []
            })
        },
        // 查看查询任务列表
        async taskList(pagerows, page) {
            let resp = await taskList({
                owner: this.ID,
                taskIndex: INDEX,
                rows: pagerows,
                page: page
            })
            let { rows, total } = resp
            if (rows && total) {
                this.tableOptQueryResult.data = rows
                this.tableOptQueryResult.pageOpt.total = total
                // this.tableOptQueryResult.listLoading = false
                window.GALoading.close()
            } else {
                // this.tableOptQueryResult.listLoading = false
                window.GALoading.close()
            }
        },
        // 左侧：目标号码通联信息列表
        async contactInfoList(taskID) {
            this.tableOptResult.data = []
            this.tableOptResult.listLoading = true
            this.tableOptMinInside.data = []
            this.tableOptMinInside.listLoading = true
            this.tableOptMin.emptyText = ' '
            let resp = await contactInfoList({ taskId: taskID })
            let { rows } = resp
            if (rows) {
                let rowsFilter = rows.filter(item => {
                    return item.type === 2
                })
                this.tableOptResult.data = rowsFilter
                // 除去外部号码剩下的号码
                let inFilter = rows.filter(item => {
                    return item.type === 1
                })
                let arrIn = inFilter.filter(item => {
                    if (item.connPersonCount < 2) {
                        item = null
                    }
                    return item
                })
                this.tableOptMinInside.data = arrIn
                // 直接过滤2人以下的
                let arr = this.tableOptResult.data.filter(item => {
                    if (item.connPersonCount < 2) {
                        item = null
                    }
                    return item
                })
                this.tableOptResult.data = arr
                this.leftTableData = this.tableOptResult.data
                this.tableOptResult.listLoading = false
                this.tableOptMinInside.listLoading = false
                let point = []
                rows.forEach(item => {
                    if (item.connPersonCount > 1) {
                        point.push({
                            cname: item.cname,
                            name: item.relateNum + '',
                            count: item.connPersonCount,
                            type: item.type
                        })
                    }
                })
                // 给右边图表中的点加上编号，同左边表格相匹配
                arr.forEach((item, index) => {
                    let NUM = item.relateNum.toString()
                    point.forEach((it, ind) => {
                        if (it.name === NUM) {
                            point[ind].number = index + 1
                        }
                    })
                })
                // 给右边图表中左边表格里没有的号码加编号
                arrIn.forEach((item, index) => {
                    let NUM = item.relateNum.toString()
                    point.forEach((it, ind) => {
                        if (it.name === NUM) {
                            point[ind].inNumber = index + 1
                        }
                    })
                })
                this.opts.phoneData = point
                this.pointAll = point
            } else {
                this.tableOptResult.listLoading = false
                this.tableOptMinInside.listLoading = false
            }
        },
        // 右侧：目标号码通联关系图
        async contactInfoChart(taskID) {
            let resp = await contactInfoChart({ taskId: taskID })
            let { rows } = resp
            if (rows) {
                let line = []
                rows.forEach(item => {
                    line.push({
                        name: item.relateNum + '',
                        targetName: item.innerMsisdn + '',
                        count: item.amount
                    })
                })
                this.opts.relData = line
                this.relationList = rows
            }
        },
        // 右侧表格：获取外部与内部通联列表
        async outInContactsList(num, taskId, type = -1) {
            this.tableOptMin.data = []
            this.tableOptMin.listLoading = true
            this.tableOptMin.emptyText = ' '
            let resp = await outInContactsList({
                relateNum: num,
                taskId: taskId,
                type: type,
                amount: this.peopleCount
            })
            let { rows } = resp
            if (rows && _.isArray(rows)) {
                // 给右侧表格号码添上对应的序列号
                this.pointAll.forEach((item, index) => {
                    rows.forEach((it, ind) => {
                        let num = it.innerMsisdn.toString()
                        if (item.name === num) {
                            if (this.pointAll[index].number) {
                                rows[ind].inNumber = this.pointAll[index].number
                            } else {
                                rows[ind].inNumber = this.pointAll[index].inNumber
                            }
                        }
                    })
                })
                this.tableOptMin.data = rows
                //                    this.tableOptComm.data = rows;
                this.tableOptMin.listLoading = false
            } else {
                this.tableOptMin.listLoading = false
            }
        },
        // 中间表格：获取外部与内部通联详情
        async outInContactsInfo(num1, num2, page, row) {
            this.tableOptCommDetail.data = []
            this.tableOptCommDetail.listLoading = true
            this.tableOptCommDetail.emptyText = ' '
            let resp = await outInContactsInfo({
                startTime: this.taskStartTime,
                endTime: this.taskEndTime,
                relateNum: num1,
                innerMsisdn: num2,
                index: 2,
                page: page,
                row: row
            })
            let { rows } = resp
            if (rows && _.isArray(rows)) {
                rows.forEach(item => {
                    item.beginTime = moment(new Date(item.beginTime * 1000)).format(
                        'YYYY-MM-DD HH:mm:ss'
                    )
                })
                this.tableOptCommDetail.data = rows
                // 取消短信内容的显示
                this.tableOptCommDetail.data.forEach(item => {
                    if (item.type === 2) {
                        item.talkTimeOrContent = ''
                    }
                    return item
                })
                this.tableOptCommDetail.pageOpt.total = resp.total
                this.tableOptCommDetail.listLoading = false
            } else {
                this.tableOptCommDetail.listLoading = false
            }
        },
        // 添加查询任务
        addSeachTask() {
            this.minTableShow = false
            this.tableShow = false
            this.dialogVisibleTarget = true
            this.tableOptMin.listLoading = false
            this.tableOptCommDetail.listLoading = false
        },
        dialogChangeTarget(val) {
            this.$refs.formTarget.clearValue()
            this.getTimeFun().then(times => {
                this.$refs.formTarget.setValue([
                    {
                        id: 'startTime',
                        value: new Date(new Date(times).getTime() - 24 * 60 * 60 * 1000)
                    },
                    { id: 'endTime', value: new Date(times) }
                ])
                this.dialogVisibleTarget = val
                this.value3 = []
            })
        },
        okFnTarget() {
            let list = this.$refs.formTarget.getValue()
            let startTime = Date.parse(new Date(list.startTime))
            startTime = startTime / 1000
            let endTime = Date.parse(new Date(list.endTime))
            endTime = endTime / 1000
            list.taskName = list.taskName.replace(/(^\s*)|(\s*$)/g, '')
            if (list.taskName === '') {
                this.$alert('请输入任务名称！', {
                    confirmButtonText: '确定'
                })
            } else if (list.taskName.length > 30) {
                this.$alert('任务名称长度不应超过30个字符', {
                    confirmButtonText: '确定'
                })
            } else if (startTime >= endTime || list.startTime === '' || list.endTime === '') {
                this.$alert('请输入正确的时间！', {
                    confirmButtonText: '确定'
                })
                //                } else if (this.targetChose.length === 0) {
                //                    this.$alert('请选择目标号码！', {
                //                        confirmButtonText: '确定'
                //                    });
                //                } else if (this.targetChose.length === 1) {
                //                    this.$alert('请选择2个或以上的目标号码！', {
                //                        confirmButtonText: '确定'
                //                    });
                //                } else {
                //                    let targetNum = [];
                //                    this.targetChose.forEach((item) => {
                //                        targetNum.push(item.msisdn)
                //                    })
                //                    this.targetChoseStr = targetNum.join(',');
            } else if (this.sendPhones.length === 0) {
                this.$alert('请选择目标号码！', {
                    confirmButtonText: '确定'
                })
            } else if (this.sendPhones.length === 1) {
                this.$alert('请选择2个或以上的目标号码！', {
                    confirmButtonText: '确定'
                })
            } else {
                let targetNum = []
                this.sendPhones.forEach(item => {
                    targetNum.push(item.msisdn)
                })
                list.msisdn = this.sendPhones.join(',')
                list.taskIndex = INDEX
                list.owner = this.ID
                this.addTask(list)
            }
        },
        targetHandleSelectionChange(val) {
            this.targetChose = val
        },
        // 查看查询任务列表
        taskResult() {
            this.minTableShow = false
            this.tableShow = false
            this.dialogVisibleResult = true
            this.tableOptMin.listLoading = false
            this.tableOptCommDetail.listLoading = false
        },
        dialogChangeResult(val) {
            this.dialogVisibleResult = val
        },
        taskHandleCurrentPageChange(val) {
            // 保存当前第几页
            this.saveCurrentPage = val
            this.tableOptQueryResult.pageOpt.currentPage = val
            let pageSize = this.tableOptQueryResult.pageOpt.pageSize
            this.taskList(pageSize, val)
        },
        taskHandleSizePageChange(val) {
            this.tableOptQueryResult.pageOpt.currentPage = 1
            this.tableOptQueryResult.pageOpt.pageSize = val
            if (this.tableOptQueryResult.data.length !== 0) {
                this.taskList(val, 1)
            }
        },
        // 点击图表
        clickHandler(arg) {
            if (arg) {
                this.minTableShowInside = false
                this.$refs.chart.setNodeFocus(arg.name)
                if (arg.type === 2) {
                    let a = 0
                    this.tableOptResult.data.forEach((item, index) => {
                        if (String(item.relateNum) === arg.name) {
                            a = index
                        }
                    })
                    let jump = a * 30
                    $('#leftTable .el-table__body-wrapper').animate({ scrollTop: jump }, 1000)
                    this.$refs.tableResult.setRow(this.$refs.tableResult.tableListData[a])
                }
                this.outNumber = arg.name
                this.numType = arg.type
                let outNumberPass
                if (this.isPhoneJM) {
                    outNumberPass = phoneNumChange(this.outNumber)
                } else {
                    outNumberPass = this.outNumber
                }
                if (arg.type === 1) {
                    this.minMsg = `${outNumberPass}与外部人员通联分析`
                } else {
                    this.minMsg = `${outNumberPass}与内部人员通联分析`
                }
                this.showMinTable()
                this.outInContactsList(this.outNumber, this.taskID, arg.type === 1 ? arg.type : -1)
            }
        },
        // 浮动在图表上的小表格
        showMinTable() {
            this.minTableShow = true
            this.$nextTick(() => {
                let bar = this.$refs.minTable
                startDrag(bar, bar)
            })
        },
        closeMinTable() {
            this.minTableShow = false
            this.tableShow = false
            this.tableOptMin.listLoading = false
            this.tableOptMinInside.listLoading = false
            this.tableOptCommDetail.listLoading = false
        },
        closeMinTableInside () {
            this.minTableShowInside = false
            this.tableOptMinInside.listLoading = false
        },
        // 与内部人员通联分析结果
        showDetailTable() {
            this.tableShow = true
            this.$nextTick(() => {
                let bar = this.$refs.detailTable
                startDrag(bar, bar)
            })
        },
        closeTable() {
            this.tableShow = false
            this.tableOptCommDetail.listLoading = false
        },
        //            穿梭框的方法
        handleChange(data) {
            this.sendPhones = []
            let orgData = this.tableOptTarget.data
            for (let j = 0; j < data.length; j++) {
                this.sendPhones.push(orgData[data[j] - 1].msisdn)
            }
        },
        renderFunc(h, option) {
            return (
                <span>
                    {option.key} - {option.label}
                </span>
            )
        },
        filterMethod(query, item) {
            this.$nextTick(() => {
                this.filterArrLengthLeft = $(
                    '.el-transfer-panel:first .el-transfer-panel__item'
                ).length
            })
            this.$nextTick(() => {
                this.filterArrLengthRight = $(
                    '.el-transfer-panel:last .el-transfer-panel__item'
                ).length
            })
            return item.label.indexOf(query) > -1
        }
    }
}
</script>

<style scoped>
    #leftTable {
        background: rgba(0,0,0,0.9);
    }
.exportBtn {
    position: relative;
    top: 0px;
    left: 63px;
}
.up {
    position: relative;
    top: -17px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.el-icon-close {
    float: right;
    position: relative;
    top: 1px;
    cursor: pointer;
    color: #bfcbd9;
}
.el-icon-close:hover {
    color: #006aa4;
}
.el-tooltip div {
    overflow: hidden;
    text-overflow: ellipsis;
}
@component-namespace ga {
    @b outImportantContact {
        position: relative;
        @e button {
            margin: 20px 0 15px 0;
        }
        @e msg {
            margin: 5px 0;
            display: block;
            height: 16px;
            line-height: 16px;
            font-size: 14px;
            color: #9af5f6;
            cursor: pointer;
            @m bar {
                display: inline-block;
                width: 5px;
                height: 12px;
                background: #4f8ee5;
            }
        }
        @e tableContent {
            width: 100%;
            height: calc(100% - 16px);
            background: rgba(0,0,0,0.9);
        }
        @e chart {
            position: absolute;
            width: 100%;
        }
        @e minTable {
            position: absolute;
            width: 40%;
            height: 100%;
            top: -26px;
            right: 0;
            /*transform: translate(0, -100%);*/
            /*background-color: #03121F;*/
        }
        @e table {
            position: absolute;
            left: 5px;
            top: -26px;
            width: 58%;
            height: 100%;
            /*background-color: #03121F;*/
        }
        @e contentDetail {
            color: #fff;
            font-size: 14px;
            overflow: hidden;
        }
        @e li {
            width: 100%;
            height: 30px;
            line-height: 30px;
        }
        @e message {
            padding: 6px 10px;
        }
    }
}
</style>
