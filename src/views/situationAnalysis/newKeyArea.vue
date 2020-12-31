<template>
    <div class="keyArea-global">
        <!-- 标题  -->
        <div class="ga-mapSty">
            <div class="ga-layout__bodyTitle">
                <span class="ga-layout__titleTopLeft"></span>
                <span class="ga-layout__titleLeft"></span>
                <span class="ga-layout__titleCenter">{{ areaName + '实时监测' }}</span>
                <span class="ga-layout__titleRight"></span>
                <span class="ga-layout__titleRightLeft"></span>
            </div>
            <!-- <div class="ga-bigTitleSty ga-dialogContent ga-layout__body-title">
                <span class="ga-dialogContent__dialogTitleLeft"></span>
                <span class="ga-dialogContent__dialogTitleCenter">{{ areaName + '实时监测' }}</span>
                <span class="ga-dialogContent__dialogTitleRight"></span>
            </div> -->
        </div>
        <div class="keyArea-map">
            <heatGISMap ref="map"
                        :legendRatio="legendRatio"
                        :marker="dotData"
                        :point="point"
                        :area="areaBorder"
                        :max="heatMax"
                        :showMarker="markerType" @switchAble="val => isSwitchAbled = val ">
            </heatGISMap>
            <div class="keyArea-map__legend">
                <p v-for="(item, index) in legend" :key="index">
                    <i :style="{ backgroundColor: item.color }"></i>
                    <span>{{ item.range }}</span></p>
            </div>
            <!-- 时间轴 -->
            <div class="keyArea-timeline">
                <div>
                    <!-- keyArea-timeline__btn clearBtn -->
                    <el-button type="primary"
                        @click="clearHandler"
                        class="keyArea-timeline__btn ga-button__realTime"
                        :class="{'actived': btnSts === 'real'}">实时</el-button>
                    <el-button type="primary"
                        @click="startHandler"
                        class="keyArea-timeline__btn ga-button__startBtn"
                        style="margin-left: -5px"
                        :class="{'actived': btnSts === 'playback'}">{{startBtn}}</el-button>
                </div>
                <div class='keyArea-timeline__line'>
                    <timeLines :options="timeLineOpt" @change="changeTimeline" ref="time"></timeLines>
                </div>
            </div>
        </div>
        <div class="keyArea-left">
            <div class="keyArea-countPanel">
                <div :class="['keyArea-countPanel__title', bannedClick ? 'keyArea-countPanel__title--cursorNot' : 'keyArea-countPanel__title--cursor']"
                @click="titleClick">
                 <!-- :title="bannedClick ? bannedTip : '' " -->
                    <el-tooltip :disabled="!bannedClick" :content='bannedTip' placement="bottom-start">
                        <span>{{ title1 }}</span>
                    </el-tooltip>
                </div>
                <div class="keyArea-countPanel__count" @click='numClick(7, true)'>
                    <numberFlip :options="numberOpt" :renderData="numFlipData1" class='ga-keyArea__number'></numberFlip>
                </div>
            </div>
            <div class="keyArea-countPanel">
                <div class="keyArea-countPanel__title">
                    {{ title2 }}
                </div>
                <div class="keyArea-countPanel__count" @click='numClick(8)'>
                    <numberFlip :options="numberOpt" :renderData="numFlipData" class='ga-keyArea__number'></numberFlip>
                </div>
            </div>
            <div class="keyArea-countPanel">
                <div class="keyArea-countPanel__title">
                    {{ title3 }}
                </div>
                <div class="keyArea-countPanel__tab">
                    <div class='keyArea-countPanel__tab--item'
                        v-for='(item, index) in tabsData'
                        :key='item'
                        v-if='item !== undefined'
                        @click='tabClick(index)'>
                        <div>
                            <p>{{ tabsName[index] }}</p>
                            <p>{{ item }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="keyArea-frame">
                <frameCom :title="firBarsTitle">
                    <!-- v-if='isPeopleListShow'  -->
                    <div class="keyArea-frame__export">
                        <el-button round size="mini">
                            <a :href="peopleExportUrl">导出</a>
                        </el-button>
                    </div>
                    <div style="margin-top: 10px">
                        <div v-loading="loading" style="position: absolute;top: calc(50% - 28px);height: 50px;width: 100%"></div>
                        <tableCom v-if='!loading && isPeopleListShow' :option="tableOpt" :comSize="tableSize" @handleCurrentPageChange="changeLeftPage" @handleSizePageChange="changeLeftRows"></tableCom>
                        <areaBars v-show='!loading &&  !isPeopleListShow' :option='areaOpt'></areaBars>
                    </div>
                </frameCom>
            </div>
        </div>
        <!-- 左侧下三级柱图内容 -->
        <div class='keyArea-frame1' ref='pop'>
            <frameCom :title='barTitle1'>
                <div class='keyArea-frame1__close' @click='popHide'></div>
                <curveBars :option="popOpt"></curveBars>
            </frameCom>
        </div>
        <!-- 右侧弹框 -->
        <div :class='[{"keyArea-lines__show": ifRShow}, "keyArea-lines"]' ref='lines'>
            <!-- 重点人 -->
            <template v-if="tabsType">

            </template>
            <!-- 省内/省外/境外 右侧弹框 -->
            <template v-else>
                <tabsCom :isAllTab="isAll"
                        :tabChange="isTabChange"
                        :tableData="tabsOpt.tableOpt.data"
                        :renderData="lineData"
                        :lineTitle="lineTitleSub"
                        :tableTitle="peopleListTitle"
                        :TArray='tArray'
                        :fn="oneDay"
                        ref="tabsCome"
                        @closeTabs="RHide">
                </tabsCom>
            </template>
        </div>
        <!-- 累积用户数弹窗 -->
        <sysDialog size="middle"
                    title="累积用户数"
                    @change="dialogChange"
                    @openCallback="dialogOpendCallback"
                    :dialogVisible="dialogVisible"
                    :showConfirm="false"
                    :showCancel='false'>
            <p style="margin-bottom: 10px">添加查询任务</p>
            <formComp :option="formOptDialog" ref="formDialog"></formComp>
            <div style="width: 100%; display: flex; justify-content:center ">
                <el-button type="rightBottom"
                            @click="accumulateUserSearch"
                            >添加</el-button>
                <el-button type="leftTop"
                            style="margin-left: 15px"
                            @click="accumulateUserClear"
                            >清空</el-button>
            </div>
            <p style="display: flex; justify-content: space-between; padding-right: 6%;">
                <span>各任务累积用户数</span>
                <el-button type="text" @click="accumulateUserTaskListRefeshed">
                    <i class="fa fa-refresh"></i>
                    刷新
                </el-button>
            </p>
            <div style="margin: 0 42px">
                <tableCom :option="tableOptTask" :comSize="{ height: 200 }"
                            @handleCurrentPageChange="taskHandleCurrentPageChange"
                            @handleSizePageChange = "taskHandleSizePageChange">
                </tableCom>
            </div>
        </sysDialog>
    </div>
</template>

<script>
import moment from 'moment'
import numberFlip from 'components/monitor/numberFlip'
import frameCom from 'components/monitor/frame'
import tableCom from 'components/Table'
import { mapGetters } from 'vuex'
import { forbiddenDate, getIntervalDate } from 'utils'
import { numFlip, getRanking, getPersons, getTaskTime, polyline,
    polylineOne, gpsHot, addTask, accumulateUserTaskList } from 'api/situationAnalysis/newKeyArea'
import heatGISMap from 'components/monitor/newKeyArea/heatGISMap'
// import timeLines from 'components/monitor/timeLines'
import timeLines from 'components/monitor/newKeyArea/timeLines'
import areaBars from 'components/monitor/areaBars'
import curveBars from 'components/monitor/curveBars'
// import tabsCom from 'components/monitor/tabsKeyArea'
import tabsCom from 'components/monitor/newKeyArea/tabsKeyArea'
import sysDialog from 'components/common/dialog'
import formComp from 'components/Form/index'

const HISLABEL = '回放'
const CONLABEL = '继续'
const PAUSELABEL = '暂停'
const exportUrl = process.env.NODE_ENV === 'production'
        ? '/policeBusiness/keyArea/exportExl' : 'http://192.168.3.183:8080/policeBusiness'
export default {
    name: 'keyArea',
    components: {
        numberFlip,
        frameCom,
        tableCom,
        heatGISMap,
        timeLines,
        areaBars,
        curveBars,
        tabsCom,
        sysDialog,
        formComp
    },
    props: [],
    data () {
        let _ = this;
        return {
            bannedTip: '任务监测结束时间已经超过10天，暂时不能操作',
            gpsMax: 0,
            loading: true,
            // 累计在线用户数按是否禁止点击
            bannedClick: false,
            peopleExportUrl: '',
            // 时间轴时间
            start: '',
            // 折线图请求参数
            lineReqObj: {},
            // 监测任务起止时间
            taskTime: {
                start: '',
                end: ''
            },
            // 数据产生时间 由后端返回
            timestamp: '',
            areaName: '',
            taskId: '',
            areaId: '',
            area1: '', // 弹出柱状图以及右侧线图title的第一个区域
            area2: '', // 弹出柱状图title的第二个区域
            area3: '', // 右侧线图title的第二个区域
            maxTimeRange: 7 * 24 * 60 * 60,
            minTimeRange: 5 * 60,
            title1: '累计在线用户数',
            title2: '实时在线用户数',
            title3: '在线用户构成',
            firBarsTitle: '省内在线用户数排行',
            // lineTitle: '变化趋势',
            disClick: false, // 当开始回放时，不允许点击tabs，不允许弹窗
            btnSts: 'real',
            startBtn: HISLABEL, // 回放或者暂停按钮label
            isSwitchAbled: true,
            isOutListShow: false,
            isPeopleListShow: false, //  左侧下方是否是涉疆/涉藏/重点人人员列表
            ifRShow: false, // 右侧线图弹窗是否显示
            tabsType: false,  // 右侧弹窗类型，true 为 SJSZ
            isAll: false, // 是否是总在线人数面板
            isTabChange: false, //  人员类型 tab 是否切换
            JWBarShow: true, // tab切换到境外时，柱图点击事件禁止
            dialogVisible: false, //  累积用户数弹窗
            legendRatio: 0,
            heatMax: 0,
            tabType: 0, // 当前已选中的tab的index, 人员类型 省内 0、省外 1、境外 2、SJ 3、SZ 4、重点人 5
            numberOpt: {
                height: 60
            },
            // 实时在线
            numFlipData: [
                { value: 0 }
            ],
            // 累计用户
            numFlipData1: [
                { value: 0 }
            ],
            timeLineOpt: { // 时间线配置
                click: false, // 能否拖动时间轴，TRUE为能，FALSE不能
                width: ($(window).width() * 0.78 * 0.85),
                type: 'halfhour'
            },
            dotData: [], //  基站/涉疆/涉藏/重点人打点数据
            point: [], // 热力图点集
            markerType: [], //  覆盖物类型
            areaBorder: {}, // 热力图边界
            tabsData: [], // tabs数据
            tabsName: ['省内', '省外', '境外', '重点人'], // tabs名称
            lineData: [], // 右侧弹出折线图数据
            tArray: ['近1小时', '近24小时', '近7天'],
            tableOpt: {
                listLoading: false,
                highlightRow: true,
                column: [
                    { name: '序号', value: 'index', width: 40, align: 'center' },
                    { name: '姓名', value: 'username', width: 60, align: 'center', tooltip: true },
                    { name: '电话号码', value: 'usernum', align: 'center', tooltip: true },
                    { name: '标签', value: 'flag', width: '60', align: 'center', tooltip: true }

                ],
                data: [],
                    // 是否分页
                pagination: true,
                    // 分页参数
                pageOpt: {
                    total: 0,
                    pageSizes: [10, 20, 30, 40, 50],
                    pageSize: 10,
                    currentPage: 1,
                    layout: 'prev, next, jumper'
                },
                rowClick: function (row) {
                        // console.log(row);
                    _.$refs.map.createOneMarker(row)
                }
            },
            areaOpt: {
                data: [],
                click: true, // 能否点击展开，TRUE为能，FALSE不能
                    // 一级柱图点击事件
                barClick (item, index) {
                        // console.log(item);
                        // 修改三级弹出柱图和右侧线图的title
                    _.area1 = item.area
                    _.area2 = _.globalKeys.gTitle
                    _.area3 = '';
                    _.isTabChange = !_.isTabChange;
                        // 动画效果，有滚动条时，点击柱图使该柱在视图第一位
                    let jump = index * 30 + 10;
                    _.changBarScorll(jump)
                        // 右侧线图div弹出
                    if (_.JWBarShow) {
                        _.RShow()
                    }
                    _.tArray = ['近1小时', '近24小时', '近7天']
                        // 根据当前的tab类型请求相应的线图参数
                    switch (_.tabType) {
                        case 0:
                            _.loadLinesJson(0, { cityId: item.areaCode, provinceId: item.provCode })
                            break
                        case 1:
                            _.loadLinesJson(0, { cityId: item.areaCode, provinceId: item.provCode })
                            break
                        case 2:
                            _.loadLinesJson(0, { countyId: item.areaCode })
                            break
                    }
                    // 如果点击柱图存在三级弹出柱图数据，则赋值并弹出，否则隐藏
                    if (item.pop) {
                        _.popOpt.data = item.pop
                        _.popShow()
                    } else {
                        _.popHide()
                    }
                }
            },
            // 左侧三级柱状图配置
            popOpt: {
            // 弹出柱图配置
                data: [],
                barClick (item) {
                    _.RShow();
                        // 修改右侧线图title并请求数据
                    _.area3 = item.area
                    _.loadLinesJson(0, { cityId: item.areaCode, provinceId: item.provCode })
                }
            },
            tabsOpt: {
                exportUrl: '',
                tableOpt: {
                    pageOpt: {
                        currentPage: 1,
                        pageSize: 10
                    },
                    data: []
                }
            },
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
                                return forbiddenDate(time, getIntervalDate(), 30)
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
                                return forbiddenDate(time, getIntervalDate(), 30)
                            }
                        }
                    }
                }]
            },
            // 查询任务列表
            tableOptTask: {
                listLoading: false,
                rowHeight: 15,
                column: [
                    // 首列是否显示序号、复选框、下沉展开 index/selection
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    { name: '创建时间', value: 'createTime', align: 'center', tooltip: true },
                    { name: '开始时间', value: 'beginTime', align: 'center', tooltip: true },
                    { name: '结束时间', value: 'endTime', align: 'center', tooltip: true },
                    { name: '状态', value: 'state', width: 80, align: 'center' },
                    { name: '用户数', value: 'userNum', align: 'center', tooltip: true }
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
    mounted () {
         // 缓存路由传过来的参数
        this.dataStorage(['taskId', 'areaId', 'areaName'], false)
            // 处理 taskId 是 T 开头
        if (this.taskId) {
            let firstNum = this.taskId.slice(0, 1);
            if (firstNum === 'T') {
                this.taskId = this.taskId.slice(1);
            }
        }
        // 人数面板数据
        this.loadActualNum().then(() => {
            // 加载GPS人员位置
            this.GPSLocation()
            // 柱图数据
            this.getBarsAndLine(false)
        })
        // 获取监测任务 起止时间
        this.getTaskTimeFun()
        // 启用轮询
        this.rollPoling(true)
    },
    beforeDestroy () {
        this.rollPoling(false)
    },
    computed: {
        ...mapGetters({
            'vsHeight': 'global/visualHeight', // 取到可用视窗高
            'globalKeys': 'global/globalKeys' // 全局省份关键字
        }),
        // gps热力图图例系数
        legend () {
            let max = this.legendMax;
            if (Math.floor(max * 0.9) > 100) {
                return [{
                    color: 'red',
                    range: `${Math.floor(max * 0.9)} - ${Math.floor(max)}`
                }, {
                    color: 'rgb(242, 248, 90)',
                    range: `${Math.floor(max * 0.6)} - ${Math.floor(max * 0.9)}`
                }, {
                    color: 'rgb(123, 240, 123)',
                    range: `${Math.floor(max * 0.3)} - ${Math.floor(max * 0.6)}`
                }, {
                    color: 'rgb(0,42, 255)',
                    range: `0 - ${Math.floor(max * 0.3)}`
                }];
            } else {
                return [{
                    color: 'red',
                    range: `100 - 150`
                }, {
                    color: 'rgb(242, 248, 90)',
                    range: `60 - 100`
                }, {
                    color: 'rgb(123, 240, 123)',
                    range: `30 - 60`
                }, {
                    color: 'rgb(0,42, 255)',
                    range: `0 - 30`
                }];
            }
        },
        // 计算gps热力图图例最大值 算法为：gps人数最大值 * （总在线人数 / 总gps人数）* （100 / 121）
        legendMax () {
            let max = 0;
            if (this.gpsMax) {
                // console.log('gps人数最大值：', this.gpsMax)
                // console.log('总在线人数：', this.numFlipData[0].value)
                // console.log('总gps人数：', this.allGPSPointCounts)
                this.legendRatio = (this.numFlipData[0].value / this.allGPSPointCounts) * (100 / 121)
                max = this.gpsMax * this.legendRatio
            }
            return max;
        },
        // 弹出柱图title
        barTitle1 () {
            return `${this.area1}在线用户在重点区域分布`
            // return `${this.area1}在线用户在${this.area2}区域分布`
        },
        // 弹出线图title
        lineTitleSub () {
            if (this.area3) {
                return `${this.area3}在线用户在重点区域总体变化趋势`
            } else {
                return `${this.area1}在线用户在重点区域总体变化趋势`
            }
        },
        // 弹出人员列表的title
        peopleListTitle () {
            return `${this.area1}在线用户在${this.area3}`
        },
        postTime () {
            // 当状态为暂停态，即开始按钮变为继续的时候，或者是回放态，即禁止点击的时候，返回时间轴的时间，否则返回当前时间
            if (this.startBtn === CONLABEL || this.disClick === true) {
                return this.start
            } else {
                // return moment().format('YYYY-MM-DD HH:mm:ss')
                return 'now'
            }
        },
        tableSize () {
            return { 'height': (this.vsHeight / 2 + 10) }
        }
    },
    methods: {
        // 获取监测任务起止时间
        async getTaskTimeFun () {
            let resp = await getTaskTime({
                areaId: this.areaId,
                taskBaseId: this.taskId
            })
            if (resp && resp.data) {
                let { beginTime: start, endTime: end } = resp.data
                this.taskTime = { start, end }
                // console.log(this.taskTime)
                let time = moment(this.taskTime.end).subtract(10, 'd')
                if (moment(time).diff(moment(getIntervalDate())) < 0) {
                    // this.bannedClick = true
                }
            }
        },
        // 加载实时在线人数以及tabs中各个分类人数
        async loadActualNum (flag = 0) {
            let resp = await numFlip({
                flag: flag,
                taskId: this.taskId,
                areaId: this.areaId,
                timestamp: this.postTime === 'now' ? sessionStorage.gTime : this.postTime
            })
            if (resp && resp.data) {
                // 在线人数数据 实时 全部
                this.numFlipData = [{ value: resp.data.allCount }]
                // 后端 当是整点或者30分中的时候我会返回累计的数据 其他时间不返回（不返回ljCount字段）
                if (resp.data.ljCount) {
                    this.numFlipData1 = [{ value: resp.data.ljCount }]
                }
                this.timestamp = resp.data.insertTime
                    // 各人员分类数据
                this.tabsData = [
                    resp.data.snCount,
                    resp.data.swCount,
                    resp.data.jwCount,
                    resp.data.zdrCount
                ]
            }
        },
        /**
         * 加载左下柱图数据
         * @param {personType} 人员类型 [省内 0，省外 1，境外 2、重点人：3]
         */
        async loadBarsJson (personType) {
            let payload = {
                type: ++personType,
                taskId: this.taskId,
                areaId: this.areaId,
                timestamp: this.postTime === 'now' ? this.timestamp : this.postTime
            }
            this.areaOpt.data = []
            this.loading = true
            let resp = await getRanking(payload)
            if (resp && resp.rows) {
                this.loading = false
                this.areaOpt.data = resp.rows;
            }
        },
        /**
         * 加载左下人员列表数据
         * @param {personType} 人员类型  [省内 0，省外 1，境外 2、SJ：3、SZ：4、重点人：5]
         */
        async loadPersonsJson () {
            this.tableOpt.data = []
            this.loading = true;
            // this.tableOpt.emptyText = ' '
            let currentPage = this.tableOpt.pageOpt.currentPage;
            let pageSize = this.tableOpt.pageOpt.pageSize;
            // let type = personType
            let resp = await getPersons({
                taskId: this.taskId,
                areaId: this.areaId,
                // timestamp: this.postTime === 'now' ? sessionStorage.gTime : this.postTime,
                page: currentPage,
                rows: pageSize,
                type: 4
            })
            if (resp && resp.rows) {
                this.loading = false;
                // this.tableOpt.listLoading = false
                this.$nextTick(() => {
                    this.tableOpt.data = resp.rows;
                })
            }
        },
        /**
         * 加载右侧折线图数据
         * @param type
         *  0-8 [其他 省内 省外 境外 重点人 累计 实时]
         * @param {code: cityId countyId provinceId}  城市id	国家编码 省id
         **/
        async loadLinesJson (type, code) {
            this.lineData = []
            this.lineReqObj = {
                taskId: this.taskId,
                areaId: this.areaId,
                type: type,
                cityId: code.cityId || '',
                countyId: code.countyId || '',
                provinceId: code.provinceId || ''
            }
            // 测试
            // let resp = await polyline(this.lineReqObj, type === 7 ? 7 : 0)
            // 上线
            let resp = await polyline(this.lineReqObj)
            if (resp && resp.data) {
                // type = 7 【累计】 没有一小时的折线数据
                if (type !== 7) {
                    this.lineData.push(resp.data.datahour)
                }
                this.lineData.push(resp.data.dataday)
                this.lineData.push(resp.data.dataweek)
            }
        },
        async oneDay () {
            return await polylineOne(this.lineReqObj)
        },
        // 加载GPS人员位置信息接口
        async GPSLocation (polling = false) {
            let resp = await gpsHot({
                taskId: this.taskId,
                areaId: this.areaId,
                insertTime: polling ? this.postTime : this.timestamp
            })
                // console.log(resp)
            let { gps, xishu } = resp.data;
                // let { gps, xishu } = resp.data.data;
            if (xishu && xishu.length) {
                this.gpsMax = xishu[0];
            }
            if (gps) {
                if (!gps.length) {
                    this.dotData.push({ type: 'GPS', value: [] });
                    return 0
                } else {
                    //  gps打点
                    let GPSpoint = gps
                    this.allGPSPointCounts = 0;
                    GPSpoint.forEach((item) => {
                        this.allGPSPointCounts += +item.counts;
                    })
                    this.dotData.push({ type: 'GPS', value: GPSpoint });
                }
            }
        },
        //  添加查询累积人数任务
        async createAccumulateUser (startTime, endTime) {
            let resp = await addTask({
                taskId: this.taskId,
                areaId: this.areaId,
                startTime: startTime,
                endTime: endTime
            })
            if (resp.status === 200) {
                this.$message({
                    type: 'success',
                    message: '添加任务成功！'
                });
                this.tableOptTask.pageOpt.data = [];
                this.tableOptTask.pageOpt.currentPage = 1;
                let pageSize = this.tableOptTask.pageOpt.pageSize;
                this.accumulateUserTaskList(pageSize, 1);
            }
        },
        //   获取累积人数任务结果列表
        async accumulateUserTaskList (pageSize, page) {
            this.tableOptTask.listLoading = true;
            this.tableOptTask.emptyText = ' '
            let resp = await accumulateUserTaskList({
                taskId: this.taskId,
                areaId: this.areaId,
                page: page,
                rows: pageSize
            });
            let { rows, total } = resp;
            if (rows && _.isArray(rows)) {
                if (rows.length === 0) {
                    this.tableOptTask.data = []
                } else {
                    rows.filter((item) => {
                        if (item.state === 0) {
                            item.state = '已完成'
                        } else if (item.state === 2) {
                            item.state = '已失败'
                        } else if (item.state === 1) {
                            item.state = '查询中'
                        }
                        // item.createTime = item.createTime.slice(0, -3)
                        return item
                    })
                }
                this.tableOptTask.data = rows;
                this.tableOptTask.pageOpt.total = total;
                this.tableOptTask.listLoading = false;
            } else {
                this.tableOptTask.listLoading = false;
            }
        },
        /**
         * 页面初始化缓存数据
         * 当存在路由传参时，表示第一次进入而不是刷新进入，将参数存入 localStorage
         * @param {keyArray} 键数组 [taskId，areaId，areaName]
         * @param {isRemove} 是否删除 Storage [true 删除，false 添加和获取]
         */
        dataStorage (keyArray, isRemove) {
            if (keyArray) {
                keyArray.forEach((item) => {
                    if (isRemove) {
                        localStorage.removeItem(item)
                    } else {
                        if (this.$route.params[item]) {
                            localStorage.setItem(item, this.$route.params[item])
                            this[item] = localStorage.getItem(item)
                        } else {
                            this[item] = localStorage.getItem(item)
                        }
                    }
                })
            }
        },
        // 人数面板点击事件
        numClick (num, change = false) {
            this.isAll = true;
            this.tArray = change ? ['近24小时', '近7天'] : ['近1小时', '近24小时', '近7天'];
            this.isTabChange = !this.isTabChange;
            this.$refs.map.createOneMarker() // 清空单独人员位置及信息
                // 非回放时执行
            if (!this.disClick) {
                this.area1 = change ? '累计' : '全体'
                this.tabsType = false // 非SJSZ
                this.loadLinesJson(num, '') // 加载右侧弹窗折线图数据
                this.RShow()
                this.popHide()
            }
        },
        // 累积用户数title点击
        titleClick () {
            // let time = moment(this.taskTime.end).subtract(10, 'd')
            // if (moment(time).diff(moment(getIntervalDate())) < 0) {
            //     return
            // }
            if (!this.bannedClick) {
                this.dialogVisible = true
                this.formOptDialog.items[0].comOpt.value = getIntervalDate(1)
                this.formOptDialog.items[1].comOpt.value = getIntervalDate()
            }
        },
        /**
         * tab切换面板点击事件
         * @param {val} tabs索引 [省内 0、省外 1、境外 2、重点人 3]
         **/
        tabClick (val) {
            if (!this.disClick) {
                this.tArray = ['近1小时', '近24小时', '近7天']
                this.tabType = val
                this.JWBarShow = true;
                this.isAll = false;
                this.isTabChange = !this.isTabChange;
                this.isTrendLine = true;
                this.tableOpt.pageOpt.currentPage = 1
                this.area1 = this.tabsName[val];
                this.area3 = '';
                this.$refs.map.createOneMarker() // 清空单独人员位置及信息
                this.areaOpt.data = [] // 每次点击 tabs 先清空柱图数据，避免柱图由于数据延迟而显示上一次的数据
                this.popHide() // 关闭三级柱图
                    // 判断当前 tab 类型, this.tabsType 控制右侧弹窗渲染类型
                if ([0, 1, 2].indexOf(val) > -1) {
                    this.tabsType = false
                } else {
                    this.tabsType = true
                    // if (!this.tableOpt.data.length) {
                    //     this.tableOpt.listLoading = true;
                    //     this.tableOpt.emptyText = ' '
                    // }
                }
                // 省内、省外 、境外显示右侧弹窗
                if (val === 0 || val === 1 || val === 2) {
                    this.RShow()
                } else {
                    this.RHide()
                }
                this.peopleExportUrl = `${exportUrl}/${++val}/${this.taskId}/${this.areaId}`
                this.getBarsAndLine(true)
                $('.keyArea-frame .ga-frame__content').animate({ scrollTop: 0 }, 500);
            }
        },
        /**
        * 轮询左侧人员数据、柱状图数据、折线图数据、gps热力图数据
        * @param {isTurnOn} 表示是否打开定时器 [true 为打开，false 为关闭]
        * */
        rollPoling (isTurnOn) {
            if (isTurnOn) {
                this.poling = setInterval(() => {
                    this.RHide()
                    this.popHide()
                    this.loadActualNum(1)
                    this.getBarsAndLine(false)
                }, 120000)
                this.poling1 = setInterval(() => {
                    this.RHide()
                    this.popHide()
                    this.spliceArr(this.dotData, 'GPS')
                    this.GPSLocation()
                }, 300000)
            } else {
                // console.log('close query')
                clearInterval(this.poling)
                clearInterval(this.poling1)
            }
        },
        /**
         * 获取左下柱图数据和右侧弹窗折线图数据
         * @param {hasLine} 判断是否需要请求折线图数据  [Boolean]
         * */
        getBarsAndLine (hasLine) {
            switch (this.tabType) {
                case 0:
                    if (hasLine) {
                        this.loadLinesJson(1, '')
                    }
                    this.firBarsTitle = '省内在线用户数排行'
                    this.isPeopleListShow = false
                    this.loadBarsJson(0)
                    break
                case 1:
                    if (hasLine) {
                        this.loadLinesJson(2, '')
                    }
                    this.firBarsTitle = '省外在线用户数排行'
                    this.isPeopleListShow = false
                    this.loadBarsJson(1)
                    break
                case 2:
                    if (hasLine) {
                        this.loadLinesJson(3, '')
                    }
                    this.firBarsTitle = '境外在线用户'
                    this.isPeopleListShow = false
                    this.isOutListShow = false
                    this.loadBarsJson(2)
                    break
                case 3:
                    this.firBarsTitle = '重点人在线用户'
                    this.isPeopleListShow = true
                    this.loadPersonsJson()
                    break;
            }
        },
        /**
         * 修改柱图滚动条高度
         * @param {height} 滚动条距容器顶部高度
         */
        changBarScorll (height) {
            $('.keyArea-frame .ga-frame__content').animate({ scrollTop: height }, 500);
        },
        /**
         * 清空数组方法
         * @param {arr} 需要清空的数组
         * @param {type} 需要清空的数组类型
         */
        spliceArr (arr, type) {
            arr.forEach((item, index) => {
                if (item.type === type) {
                    arr.splice(index, 1);
                }
            })
        },
         // 清除键 实时
        clearHandler () {
            this.btnSts = 'real'
            this.startBtn = HISLABEL
            this.disClick = false
            this.areaOpt.click = true
            this.timeLineOpt.click = false
            this.start = ''
            this.$refs.time.clear()
            this.isSwitchAbled = false
            // 实时 开启轮循
            this.rollPoling(true)
            // 重新请求数据
            this.loadActualNum()
                // 根据当前的tab类型请求相应的柱图或人员列表
            if ([0, 1, 2].indexOf(this.tabType) > -1) {
                this.loadBarsJson(this.tabType)
            } else {
                this.loadPersonsJson()
            }
            this.changBarScorll(0)
        },
        // 回放
        startHandler () {
            this.btnSts = 'playback'
            this.timeLineOpt.click = true
            // 停止轮循
            this.rollPoling(false)
            // 切换继续或者暂停
            if (this.disClick) {
                this.startBtn = CONLABEL
                this.disClick = false
                this.areaOpt.click = true
                this.$refs.time.pause()
            } else {
                this.startBtn = PAUSELABEL
                this.disClick = true
                this.areaOpt.click = false
                this.RHide()
                this.popHide()
                this.$refs.time.start()
            }
            this.isSwitchAbled = true;
        },
        // 回放 时间轴开始跳动修改时间，接口请求数据
        changeTimeline (val) {
            this.start = val.startTime
            this.GPSLocation(true)
            this.changBarScorll(0)
        },
        // 修改左边表格当前页
        changeLeftPage (val) {
            this.tableOpt.pageOpt.currentPage = val
            this.loadPersonsJson()
        },
         // 修改左边表格行数
        changeLeftRows (val) {
            this.tableOpt.pageOpt.pageSize = val
            this.loadPersonsJson()
        },
         // 修改右边表格当前页
        changeRightPage (val) {
            this.tabsOpt.tableOpt.pageOpt.currentPage = val
            this.tableOpt.pageOpt.currentPage = val
            this.loadPersonsJson()
        },
        // 修改右边表格行数
        changeRightRows (val) {
            this.tabsOpt.tableOpt.pageOpt.pageSize = val
            this.tableOpt.pageOpt.pageSize = val
            this.loadPersonsJson()
        },
        // 右侧线图弹窗隐藏
        RHide () {
            this.ifRShow = false
            if (this.$refs.tabsCome) {
                this.$refs.tabsCome.frameShow = false
            }
        },
            // 右侧线图弹窗显示
        RShow () {
            this.ifRShow = true
        },
        // 弹出三级柱图显示
        popShow () {
            this.$refs.pop.style.display = 'block'
            if (this.ifRShow) {
                this.oneTimer = setTimeout(() => {
                    this.$refs.pop.style.width = '25%'
                }, 100)
            }
        },
        // 弹出三级柱图隐藏
        popHide () {
            this.$refs.pop.style.width = '0'
                // 动画效果为500ms，所以延迟500ms之后再使其消失
            this.oneTimer = setTimeout(() => {
                this.$refs.pop.style.display = 'none'
            }, 500)
        },
        // 累积用户数弹窗的查询按钮
        accumulateUserSearch () {
            let { queryBeginTime: start, queryEndTime: end } = this.$refs.formDialog.getValue();
            let timeRange = (new Date(end).getTime() - new Date(start).getTime()) / 1000;
            let timeStart = new Date(start).getTime();
            let timeRangeEnd = moment(getIntervalDate()).diff(moment(end));
            let startRange1 = moment(getIntervalDate()).subtract(10, 'd').format('x')
            // 开始执行时间前24小时
            let startRange2 = moment(this.taskTime.start).subtract(1, 'd').format('x')
            // 结束时间早于监测结束时间
            let endRange = moment(this.taskTime.end).diff(moment(end))
            if (!start) {
                this.$message({
                    type: 'warning',
                    message: '开始时间不能为空'
                });
            } else if (!end) {
                this.$message({
                    type: 'warning',
                    message: '结束时间不能为空'
                });
            } else if (timeRange < 0) {
                this.$message({
                    type: 'warning',
                    message: '开始时间必须小于结束时间'
                });
            } else if (timeStart < startRange1) {
                this.$alert('开始时间必须小于等于当前系统时间向前10天', {
                    confirmButtonText: '确定'
                })
                return
            } else if (timeStart < startRange2) {
                this.$alert('开始时间必须大于等于该重点区域实时监测开始执行时间（重点区域实时监测配置完成时间）向前推24小时', {
                    confirmButtonText: '确定'
                })
                return
            } else if (timeRangeEnd < 0) {
                this.$alert('结束时间不能超过当前时间', {
                    confirmButtonText: '确定'
                })
                return
            } else if (endRange < 0) {
                this.$message({
                    type: 'warning',
                    message: '结束时间必须早于该重点区域实时监测所在任务结束时间或该重点区域实时监测结束时间'
                });
            } else if (timeRange > this.maxTimeRange || timeRange < this.minTimeRange) {
                this.$message({
                    type: 'warning',
                    message: '开始时间和结束时间最大时间间隔为7天，最小时间间隔为5分钟'
                });
            } else {
                this.createAccumulateUser(start, end)
            }
        },
        //  累积用户数清空按钮
        accumulateUserClear () {
            this.$refs.formDialog.clearValue();
        },
        // 累积用户数任务列表分页
        taskHandleCurrentPageChange (val) {
            let pageSize = this.tableOptTask.pageOpt.pageSize;
            this.accumulateUserTaskList(pageSize, val);
        },
        taskHandleSizePageChange (val) {
            this.tableOptTask.pageOpt.pageSize = val;
            if (this.tableOptTask.data.length !== 0) {
                this.accumulateUserTaskList(val, 1);
            }
        },
        // 刷新累计用户数列表
        accumulateUserTaskListRefeshed () {
            this.tableOptTask.data = [];
            this.tableOptTask.listLoading = true
            this.tableOptTask.emptyText = ' '
            this.accumulateUserTaskList(this.tableOptTask.pageOpt.pageSize, this.tableOptTask.pageOpt.currentPage);
        },
        // dialog回调
        dialogOpendCallback () {
            this.tableOptTask.pageOpt.data = [];
            this.tableOptTask.pageOpt.currentPage = 1;
            let pageSize = this.tableOptTask.pageOpt.pageSize;
            this.accumulateUserTaskList(pageSize, 1);
        },
        dialogChange (val) {
            this.dialogVisible = val;
            this.$refs.formDialog.clearValue();
        }
    }

}
</script>

<style lang="postcss" scoped>
    .startBtn.active:before,
    .startBtn.active::after,
    .clearBtn.active:before,
    .clearBtn.active:after {
        background: #1A498A;
    }
    @component-namespace keyArea {
        @b global {
            position: relative;
            top: -5px;
            left: -10px;
            width: calc(100% + 20px);
            height: calc(100% + 10px);
        }
        @b left {
            position: absolute;
            top: 50px;
            left: 0;
            width: 22%;
            height: calc(100% - 44px);
            padding: 5px;
            background: rgba(0,0,0,0.75);
        }
        @b lines {
            width: 30%;
            /* height: calc(100% - 100px); */
            /* right: calc(-30% - 21px); */
            right: calc(-30% - 10px);
            top: 55px;
            transition: all 0.5s ease-in-out 0s;
            position: absolute;
            z-index: 1000;
            /* background: rgba(0, 0, 0, 0.8); */
            @e show {
                right: 10px;
                transition: all 0.5s ease-in-out 0s;
            }
            &>div>div {
                width: 100%;
                height: 100%;
            }
        }
        @b map {
            width: 100%;
            height: 100%;
            @e legend {
                position: absolute;
                bottom: 40px;
                left: 22%;
                z-index: 1;
                p {
                    height: 18px;
                    line-height: 18px;
                    display: flex;
                    align-content: center;
                    margin-top: 4px;
                }
                i {
                    display: inline-block;
                    width: 25px;
                    height: 13px;
                    border-radius: 3px;
                    margin-left: 10px;
                    margin-right: 4px;
                    margin-top: 3px;
                }
                span {
                    color: black;
                }
            }
        }
        @b countPanel {
            // padding: 5px;
            margin-bottom: 10px;
            color: #fff;
            text-align: center;
            font-size: 16px;
            @e title {
                font-size: 16px;
                text-align: left;
                padding-left: 10px;
                @m cursor {
                    cursor: pointer;
                }
                @m cursorNot {
                    color: #aaa;
                    cursor: not-allowed;
                }
            }
            @e count {
                margin: 10px 0;
                cursor: pointer;
            }
            @e tab {
                width: 90%;
                height: 72px;
                margin: 10px auto;
                border: 3px solid rgba(102, 204, 255, 1);
                justify-content: space-between;
                @m item {
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;
                    width: 25%;
                    display: inline-block;
                    & div {
                        width: 100%;
                        pointer-events: none;
                        margin-top: 10px;
                        cursor: pointer;
                        & p {
                            margin-bottom: 10px;
                        }
                    }
                }
            }
        }
        @b frame {
            height: calc(100% - 290px);
            width: 95%;
            margin: 0 auto;
            @e export {
                cursor: pointer;
                position: absolute;
                top: 4px;
                right: 20px;
            }
        }
        @b frame1 {
            position: absolute;
            z-index: 1;
            bottom: 0;
            width: 22%;
            display: none;
            overflow: hidden;
            height: calc(100% - 277px);
            left: 22%;
            margin-left: 10px;
            transition: width 0.5s;
            @e close {
                position: absolute;
                z-index: 2;
                width: 10px;
                height: 28px;
                line-height: 28px;
                cursor: pointer;
                top: 0;
                right: 20px;
                &::before {
                    content: '\2716'
                }
            }
        }
        @b timeline {
            position: absolute;
            width: 75%;
            height: 40px;;
            bottom: -6px;
            left: 22%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: rgba(0,0,0,0.75);
            @e btn {
                color: #20a0ff;
                font-size: 12px;
                line-heihgt: 1;
                &:hover {
                    color: #4db3ff;
                }
            }
            @e line {
                width: calc(100% - 120px)
            }
        }
    }
</style>
