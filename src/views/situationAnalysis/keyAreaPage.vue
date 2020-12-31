<template>
    <div style="height: 100%;">
        <!-- 标题  -->
        <div class="ga-layout__bodyTitle">
            <span class="ga-layout__titleTopLeft"></span>
            <span class="ga-layout__titleLeft"></span>
            <span class="ga-layout__titleCenter">{{ areaName + '实时监测' }}</span>
            <span class="ga-layout__titleRight"></span>
            <span class="ga-layout__titleRightLeft"></span>
        </div>
        <!--  内容 -->
        <div class='ga-keyArea__content' ref="abc">
            <!-- 地图相关 -->
            <div class='ga-keyArea__map'>
                <!-- 图例 -->
                <div class="ga-keyArea__legend">
                    <p v-for="(item, index) in legend"><i :style="{backgroundColor: item.color}"></i><span>{{ item.range }}</span></p>
                </div>
                <!-- 地图 -->
                <el-row type="flex" class="row-bg ga-keyArea__mapWrap" justify="center">
                    <heatGISMap ref="map"
                                :legendRatio="legendRatio"
                                :marker="dotData"
                                :point="point"
                                :area="areaBorder"
                                :max="heatMax"
                                :showMarker="markerType" @switchAble="val => isSwitchAbled = val ">
                    </heatGISMap>
                </el-row>
                <!-- 时间轴 -->
                <!-- <div class='ga-keyArea__timeline'>
                    <el-button type="text"
                               @click="clearHandler"
                               class='ga-keyArea__clearBtn'
                               :class="{'active': btnSts === 'real'}">实时</el-button>
                    <el-button type="text"
                               @click="startHandler"
                               class='ga-keyArea__startBtn'
                               :class="{'active': btnSts === 'playback'}">{{startBtn}}</el-button>
                    <timeLines :options="timeLineOpt" @change="changeTimeline" ref="time"></timeLines>
                </div> -->
            </div>
            <!-- 左侧数据 -->
            <div class='ga-keyArea__count'>
                <!-- 数字翻牌 -->
                <p class='ga-keyArea__titleWrap'>{{actualTitle}}</p>
                <p class='ga-keyArea__allUserWrap' @click="allUserClick">累积用户数</p>
                <div class='ga-keyArea__numWrap' @click='numClick($event)'>
                    <numberFlip :options="numberOpt" :renderData="numFlipData" class='ga-keyArea__number'></numberFlip>
                </div>
                <!-- tab切换 -->
                <p class='ga-keyArea__titleWrap'>{{tabsTitle}}</p>
                <div class='ga-keyArea__tabsWrap'>
                    <div class='ga-keyArea__tab' v-for='(item, index) in tabsData' v-if='item !== undefined' @click='tabClick(index)'>
                        <div class="ga-keyArea__tabFrame" :class="tabFrame(index)">
                            <!--<p :class='[`ga-keyArea__tabNum&#45;&#45;show${index}`, "ga-keyArea__tabNum"]'>{{item}}</p>-->
                            <p class='ga-keyArea__tabName'>{{tabsName[index]}}</p>
                            <p :class='[`ga-keyArea__tabNum--show`, "ga-keyArea__tabNum"]'>{{item}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 左侧柱图/表格改变 -->
            <div class='ga-keyArea__bars' id='ga-keyArea__bars'>
                <!-- 境外 -->
                <frameCom :title='firBarsTitle' v-if="tabType === 2">
                    <div class="ga-keyArea__expBtn">
                        <!--<a :href="peopleExportUrl">导出</a>-->
                    </div>
                    <div class="ga-keyArea__tabsTitle">
                        <!-- <span @click="outBarShow">构成</span>
                        <span @click="outListShow">列表</span> -->
                        <!-- <a :href="peopleExportUrl">导出</a> -->
                    </div>
                    <div style="margin-top: 10px">
                        <tableCom v-if='isOutListShow' :option="tableOpt" :comSize="tableSize" @handleCurrentPageChange="changeLeftPage" @handleSizePageChange="changeLeftRows"></tableCom>
                        <areaBars v-show='!isOutListShow' :option='areaOpt'></areaBars>
                    </div>
                </frameCom>
                <!-- 非境外 -->
                <frameCom :title='firBarsTitle' v-else>
                    <div class="ga-keyArea__expBtn">
                        <a :href="peopleExportUrl">导出</a>
                    </div>
                    <div style="margin-top: 10px">
                        <tableCom v-if='isPeopleListShow' :option="tableOpt" :comSize="tableSize" @handleCurrentPageChange="changeLeftPage" @handleSizePageChange="changeLeftRows"></tableCom>
                        <areaBars v-show='!isPeopleListShow' :option='areaOpt'></areaBars>
                    </div>
                </frameCom>
            </div>
            <!-- 左侧下三级柱图内容 -->
            <div class='ga-keyArea__popWrap' ref='pop'>
                <frameCom :title='secBarsTitle'>
                    <div class='ga-keyArea__popHide' @click='popHide'> </div>
                    <curveBars :option="popOpt"></curveBars>
                </frameCom>
            </div>
            <!-- 右侧弹框 -->
            <div :class='[{"ga-keyArea__lines--show": ifRShow}, "ga-keyArea__lines"]' ref='lines'>
                <!-- SJ/SZ/重点人 右侧弹框 -->
                <template v-if="tabsType">
                    <div :style="mainStyle">
                        <frameCom>
                            <div class='ga-frame__popHide' @click='RHide'></div>
                            <div class="ga-frame__tabsTitle">
                                <span :class="['ga-frame__tabs']">变化趋势</span>
                                <!--<span :class="['ga-frame__tabs', isTrendLine ? 'bottomLine' : '']" @click="trendChange">变化趋势</span>-->
                                <!--<span :class="['ga-frame__tabs', isTrendLine ? '' : 'bottomLine']" @click="peopExport">人员导出</span>-->
                            </div>
                            <div class="ga-frame__content" ref="content">
                                <!-- 右侧变化趋势折线图 -->
                                <div v-show="isTrendLine">
                                    <div class="ga-frame__Title">{{triBarsTitle}}</div>
                                    <el-row :span='8' class='ga-sxtabs__linesWrap' v-for='(item, index) in TArray' :key='item'>
                                        <span class='ga-frame__lineTitle'>{{TArray[index]}}在线用户变化情况</span>
                                        <linesTrend :option="lineOpt" :renderData="lineData[index]" :flag='index'></linesTrend>
                                    </el-row>
                                </div>
                                <!-- 人员导出界面 -->
                                <div v-if="!isTrendLine">
                                    <!--<div class="ga-frame__Title">{{ exportPeopTitle }}</div>-->
                                    <div class="ga-frame__Title">重点区域人员导出</div>
                                    <el-row class="ga-frame__expContent">
                                        <el-col :span="8"><span>导出内容：</span></el-col>
                                        <el-col :span="16">
                                            <el-checkbox-group v-model="exFromSlects">
                                                <el-checkbox v-for="(item, index) in exFromData" :label="index" :key="index">{{item}}</el-checkbox>
                                            </el-checkbox-group>
                                        </el-col>
                                    </el-row>
                                    <!--<exportListFrom :option="exportFromOpt" ref="exportFrom"></exportListFrom>-->
                                    <el-row type="flex" justify="center" class="ga-sxtabs__content--button">
                                        <el-button @click="exportData" type="text" class="ga-frame__sureBtn"
                                                   :class="{'active': btnSts === 'export'}" >导出</el-button>
                                        <el-button type="text" class="ga-frame__clearBtn"
                                                   @click="cancleExport"
                                                   :class="{'active': btnSts === 'cancle'}">取消</el-button>
                                    </el-row>
                                </div>
                            </div>
                        </frameCom>
                        <!--<div class="ga-frame">-->
                            <!--<div class='ga-frame__popHide' @click='RHide'></div>-->
                            <!--<div class="ga-frame__tabsTitle">-->
                                <!--<span :class="['ga-frame__tabs']">变化趋势</span>-->
                                <!--&lt;!&ndash;<span :class="['ga-frame__tabs', isTrendLine ? 'bottomLine' : '']" @click="trendChange">变化趋势</span>&ndash;&gt;-->
                                <!--&lt;!&ndash;<span :class="['ga-frame__tabs', isTrendLine ? '' : 'bottomLine']" @click="peopExport">人员导出</span>&ndash;&gt;-->
                            <!--</div>-->
                            <!--<div class="ga-frame__content" ref="content">-->
                                <!--&lt;!&ndash; 右侧变化趋势折线图 &ndash;&gt;-->
                                <!--<div v-show="isTrendLine">-->
                                    <!--<div class="ga-frame__Title">{{triBarsTitle}}</div>-->
                                    <!--<el-row :span='8' class='ga-sxtabs__linesWrap' v-for='(item, index) in TArray' :key='item'>-->
                                        <!--<span class='ga-frame__lineTitle'>{{TArray[index]}}在线用户变化情况</span>-->
                                        <!--<linesTrend :option="lineOpt" :renderData="lineData[index]" :flag='index'></linesTrend>-->
                                    <!--</el-row>-->
                                <!--</div>-->
                                <!--&lt;!&ndash; 人员导出界面 &ndash;&gt;-->
                                <!--<div v-if="!isTrendLine">-->
                                    <!--&lt;!&ndash;<div class="ga-frame__Title">{{ exportPeopTitle }}</div>&ndash;&gt;-->
                                    <!--<div class="ga-frame__Title">重点区域人员导出</div>-->
                                    <!--<el-row class="ga-frame__expContent">-->
                                        <!--<el-col :span="8"><span>导出内容：</span></el-col>-->
                                        <!--<el-col :span="16">-->
                                            <!--<el-checkbox-group v-model="exFromSlects">-->
                                                <!--<el-checkbox v-for="(item, index) in exFromData" :label="index" :key="index">{{item}}</el-checkbox>-->
                                            <!--</el-checkbox-group>-->
                                        <!--</el-col>-->
                                    <!--</el-row>-->
                                        <!--&lt;!&ndash;<exportListFrom :option="exportFromOpt" ref="exportFrom"></exportListFrom>&ndash;&gt;-->
                                    <!--<el-row type="flex" justify="center" class="ga-sxtabs__content&#45;&#45;button">-->
                                        <!--<el-button @click="exportData" type="text" class="ga-frame__sureBtn"-->
                                                   <!--:class="{'active': btnSts === 'export'}" >导出</el-button>-->
                                        <!--<el-button type="text" class="ga-frame__clearBtn"-->
                                                   <!--@click="cancleExport"-->
                                                   <!--:class="{'active': btnSts === 'cancle'}">取消</el-button>-->
                                    <!--</el-row>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<span class="ga-frame__leftTop"></span>-->
                            <!--<span class="ga-frame__rightTop"></span>-->
                            <!--<span class="ga-frame__leftBottom"></span>-->
                            <!--<span class="ga-frame__rightBottom"></span>-->
                            <!--<span class="ga-frame__left"></span>-->
                            <!--<span class="ga-frame__right"></span>-->
                            <!--<span class="ga-frame__top"></span>-->
                            <!--<span class="ga-frame__bottom"></span>-->
                        <!--</div>-->
                    </div>
                </template>
                <!-- 省内/省外/境外 右侧弹框 -->
                <template v-else>
                    <tabsCom :isAllTab="isAll"
                             :tabChange="isTabChange"
                             :tableData="tabsOpt.tableOpt.data"
                             :renderData="lineData"
                             :lineTitle="triBarsTitle"
                             :tableTitle="peopleListTitle"
                             @closeTabs="RHide"
                             @handleCurrentPageChange="changeRightPage"
                             @handleSizePageChange="changeRightRows">
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
                <FormComp :option="formOptDialog" ref="formDialog"></FormComp>
                <div style="width: 100%; display: flex; justify-content:center ">
                    <el-button type="primary"
                               @click="accumulateUserSearch">添加</el-button>
                    <el-button type="primary"
                               @click="accumulateUserClear">清空</el-button>
                </div>
                <p style="display: flex; justify-content: space-between; padding-right: 6%;">
                    <span>各任务累积用户数</span>
                    <el-button type="text" @click="accumulateUserTaskListRefeshed">
                        <i class="fa fa-refresh"></i>
                        刷新
                    </el-button>
                </p>
                <div style="margin: 0 42px">
                    <tableCom :option = "tableOptTask" :comSize="comSize2" ref="taskTable"
                               @handleCurrentPageChange="taskHandleCurrentPageChange"
                               @handleSizePageChange = "taskHandleSizePageChange">
                    </tableCom>
                </div>
            </sysDialog>
        </div>
    </div>
</template>

<script>
    // import moment from 'moment'
    import tableCom from 'components/Table'
    import FormComp from 'components/Form/index'
    import exportListFrom from 'components/Form/index'
    import numberFlip from 'components/monitor/numberFlip'
    import areaBars from 'components/monitor/areaBars'
    import curveBars from 'components/monitor/curveBars'
    import frameCom from 'components/monitor/frame'
    import sysDialog from 'components/common/dialog'
    import linesTrend from 'components/monitor/linesTrend'
    import timeLines from 'components/monitor/timeLines'
    import heatGISMap from './heatGISMap'
    import tabsCom from 'components/monitor/tabsKeyArea'
    import Io from 'utils/websocket'
    import { mapGetters } from 'vuex'
    import { forbiddenDate, getIntervalDate } from 'utils'
    import { overall, cylinderInner, cylinderOuter, cylinderOverseas, persons, snap, heat,
        locationMsg, gpsHot, createAccumulateUser, accumulateUserTaskList } from 'api/situationAnalysis/keyAreaPage'
    import { getCellCoordinate } from 'api/task/taskArea'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '' : 'ws://10.8.0.14:8080/policeBusiness'
    const exportUrl = process.env.NODE_ENV === 'production'
        ? '/policeBusiness' : 'http://192.168.3.183:8080/policeBusiness'
    const ALLLABEL = '全体'
    const HISLABEL = '回放'
    const CONLABEL = '继续'
    const PAUSELABEL = '暂停'
    export default {
        data () {
            let me = this
            return {
                isSwitchAbled: true,
                areaName: '',
                ifRShow: false, // 右侧线图弹窗是否显示
                disClick: false, // 当开始回放时，不允许点击tabs，不允许弹窗
                startBtn: HISLABEL, // 回放或者暂停按钮label
                actualTitle: '实时在线用户数', // 左一title
                tabsTitle: '在线用户构成（按手机归属地统计）', // 左中title
                firBarsTitle: '省内在线用户数排行', // 柱状图title，根据tabs修改
                area1: '', // 弹出柱状图以及右侧线图title的第一个区域
                area2: '', // 弹出柱状图title的第二个区域
                area3: '', // 右侧线图title的第二个区域
                start: '', // 回放开始时间
                end: '', // 回放结束时间
                TArray: ['近1小时', '近24小时', '近7天'], // 右侧弹出线图title变量
                tabType: 0, // 当前已选中的tab的index, 人员类型 省内 0、省外 1、境外 2、SJ 3、SZ 4、重点人 5
                tabsType: false,  // 右侧弹窗类型，true 为 SJSZ
                point: [], // 热力图点集
                areaBorder: {}, // 热力图边界
                isTrendLine: true,  //  涉疆涉藏右侧弹出框的标签切换， true 为折线图
                GPSStation: false, // GPS打点开关开关
                baseStation: false, //  基站打点开关开关
                involveXZ: false, //  涉藏打点开关
                involveXJ: false, //  涉疆打点开关
                keyPerson: false, //  重点人打点开关
                dotData: [], //  基站/涉疆/涉藏/重点人打点数据
                markerType: [], //  覆盖物类型
                exFromSlects: [], // 导出选项
                exFromData: ['重点人', '涉疆', '涉藏'], // 导出项
                isAll: false, // 是否是总在线人数面板
                isTabChange: false, //  人员类型 tab 是否切换
                isPeopleListShow: false, //  左侧下方是否是涉疆/涉藏/重点人人员列表
                isOutListShow: false, //  左侧下方是否是境外人人员列表
                dialogVisible: false, //  累积用户数弹窗是否显示
                //            accumulateNumber: '', //  累积用户数
                socket: new Io(),
                taskId: '',
                areaId: '',
                heatMax: 0,
                peopleExportUrl: '',
                JWBarShow: true, // tab切换到境外时，柱图点击事件禁止
                columnName: '',
                // 左侧一二级柱状图配置
                areaOpt: {
                    data: [],
                    click: true, // 能否点击展开，TRUE为能，FALSE不能
                    // 一级柱图点击事件
                    barClick (item, index) {
                        // console.log(item);
                        // 修改三级弹出柱图和右侧线图的title
                        me.area1 = item.area
                        me.area2 = me.globalKeys.gTitle
                        me.area3 = '';
                        me.isTabChange = !me.isTabChange;
                        // 动画效果，有滚动条时，点击柱图使该柱在视图第一位
                        let jump = index * 30;
                        me.changBarScorll(jump)
                        // 右侧线图div弹出
                        if (me.JWBarShow) {
                            me.RShow()
                        }
                        // 根据当前的tab类型请求相应的线图参数
                        switch (me.tabType) {
                            case 0:
                                me.loadLinesJson(3, item.areaCode)
                                break
                            case 1:
                                me.loadLinesJson(5, item.areaCode)
                                break
                            // case 2:
                            //     me.loadLinesJson(8, item.areaCode)
                            //     break
                        }
                        // 如果点击柱图存在三级弹出柱图数据，则赋值并弹出，否则隐藏
                        if (item.pop) {
                            me.popOpt.data = item.pop
                            me.popShow()
                        } else {
                            me.popHide()
                        }
                    }
                },
                // 左侧三级柱状图配置
                popOpt: {
                    // 弹出柱图配置
                    data: [],
                    barClick (item) {
                        me.RShow();
                        // 修改右侧线图title并请求数据
                        me.area3 = item.area
                        me.loadLinesJson(6, item.areaCode)
                    }
                },
                // 左侧人员列表配置
                tableOpt: {
                    listLoading: true,
                    //  是否为斑马纹 table
                    stripe: false,
                    highlightRow: true,
                    column: [
                        // 首列是否显示序号、复选框index/selection
                        { name: '序号', value: 'index', width: 40, align: 'center' },
                        { name: '姓名', value: 'temp', width: 50, align: 'center', tooltip: true },
                        { name: '电话号码', value: 'msisdn', width: 148, align: 'center', tooltip: true }
                        //                    { name: '迁入时间', value: 'arrivetime', align: 'center', tooltip: true },
                        //                    { name: '停留时间', value: 'staytime', align: 'center', tooltip: true }
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
                        me.$refs.map.createOneMarker(row)
                    }
                },
                // 查询任务列表
                tableOptTask: {
                    listLoading: false,
                    rowHeight: 15,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '创建时间', value: 'createTime', align: 'center', tooltip: true },
                        { name: '开始时间', value: 'startTime', align: 'center', tooltip: true },
                        { name: '结束时间', value: 'endTime', align: 'center', tooltip: true },
                        { name: '状态', value: 'status', width: 80, align: 'center' },
                        { name: '用户数', value: 'counts', align: 'center', tooltip: true }
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
                comSize2: {
                    height: 200
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
                btnSts: 'real',
                timeLineOpt: { // 时间线配置
                    click: false, // 能否拖动时间轴，TRUE为能，FALSE不能
                    width: ($(window).width() - 370),
                    type: 'halfhour'
                },
                numberOpt: { // 实时人数牌配置
                    height: 60
                },
                numFlipData: [ // 实时人数数据
                    { value: 0 }
                ],
                tabsData: [], // tabs数据
                tabsName: ['省内', '省外', '境外', '涉疆', '涉藏', '重点人'], // tabs名称
                lineOpt: { // 弹出线图配置
                    width: '100%',
                    props: {
                        gridBottom: 50,
                        gridTop: 15,
                        gridLeft: 80,
                        gridRight: 20
                    }
                },
                lineData: [], // 右侧弹出折线图数据
                mainStyle: {
                    width: '100%',
                    height: '100%'
                },
                gpsMax: 0,
                allGPSPointCounts: 0,
                legendRatio: 0,
                poling: null,
                poling1: null
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight', // 取到可用视窗高
                'globalKeys': 'global/globalKeys' // 全局省份关键字
            }),
            // 弹出柱图title
            secBarsTitle () {
                return `${this.area1}在线用户在重点区域分布`
                // return `${this.area1}在线用户在${this.area2}区域分布`
            },
            // 弹出线图title
            triBarsTitle () {
                if (this.area3) {
                    return `${this.area3}在线用户在重点区域总体变化趋势`
                } else {
                    return `${this.area1}在线用户在重点区域总体变化趋势`
                }
            },
            // 弹出人员导出title
            exportPeopTitle () {
                return `${this.area1}在线用户在${this.area3}人员导出`
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
            // 计算gps热力图图例最大值 算法为：gps人数最大值 * （总在线人数 / 总gps人数）* （100 / 121）
            legendMax () {
                let max = 0;
                if (this.gpsMax) {
                    console.log('gps人数最大值：', this.gpsMax)
                    console.log('总在线人数：', this.numFlipData[0].value)
                    console.log('总gps人数：', this.allGPSPointCounts)
                    this.legendRatio = (this.numFlipData[0].value / this.allGPSPointCounts) * (100 / 121)
                    max = this.gpsMax * this.legendRatio
                }
                return max;
            },
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
            // 左下角列表 size
            tableSize () {
                return { 'height': (this.vsHeight - 255) }
            }
        },
        beforeMount () {
            // 计算线图高度
            this.setLinesHeight()
        },
        mounted () {
            // 缓存路由传过来的参数
            this.dataStorage(['taskId', 'areaId', 'areaName'], false);
            // 处理 taskId 是 T 开头
            if (this.taskId) {
                let firstNum = this.taskId.slice(0, 1);
                if (firstNum === 'T') {
                    this.taskId = this.taskId.slice(1);
                }
            }
            // 左侧数据-------------------------------------------------
            // 总人数面板数据
            this.loadActualNum().then(() => {
                // 加载GPS人员位置
                this.GPSLocation()
            })
            // 柱图数据
            this.getBarsAndLine(false)
            // 柱图回弹到顶部
            this.changBarScorll(0)
            // ----------------------------------------------------------
            // 加载边界及区域内的基站信息
            this.loadAreaBorderJson()
            // 加载GPS人员位置
            // this.GPSLocation()
            // 加载非GPS人员位置
            // this.notGPSLocation('SJ')
            // this.notGPSLocation('SZ')
            // this.notGPSLocation('keyperson')
            // 启用socket服务
            // this.socketFun()
            // 加载基站热力图
            // this.loadPointJson()
            // 启用轮询
            this.rollPoling(true)
        },
        // 销毁之前先清空本地存储的taskId和areaId,并断开socket连接
        beforeDestroy () {
            // 清空 Storage
            // this.dataStorage(['taskId', 'areaId', 'areaName'], true)
            // 关闭socket连接
            // this.socket.disconnect();
            // 关闭轮询
            this.rollPoling(false)
        },
        methods: {
        // -----------------------------------操作方法start-----------------------------------
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
            // 总人数面板点击事件
            numClick () {
                this.isAll = true;
                this.isTabChange = !this.isTabChange;
                this.$refs.map.createOneMarker() // 清空单独人员位置及信息
                // 非回放时执行
                if (!this.disClick) {
                    this.area1 = ALLLABEL
                    this.tabsType = false // 非SJSZ
                    this.loadLinesJson(1, '') // 加载右侧弹窗折线图数据
                    this.RShow()
                    this.popHide()
                }
            },
            // 累积用户数按钮点击
            allUserClick () {
                this.dialogVisible = true
                this.formOptDialog.items[0].comOpt.value = getIntervalDate(1)
                this.formOptDialog.items[1].comOpt.value = getIntervalDate()
            },
            /**
             * tab切换面板点击事件
             * @param {val} tabs索引 [省内 0、省外 1、境外 2、SJ 3、SZ 4、重点人 5]
             **/
            tabClick (val) {
                if (!this.disClick) {
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
                        if (!this.tableOpt.data.length) {
                            this.tableOpt.listLoading = true;
                            this.tableOpt.emptyText = ' '
                        }
                    }
                    // 省内、省外 显示右侧弹窗
                    if (val === 0 || val === 1) {
                        this.RShow()
                    } else {
                        this.RHide()
                    }
                    if (this.tabType === 2) {
                        this.JWBarShow = false
                        this.tableOpt.column[1].name = '国家'
                        this.peopleExportUrl = `${exportUrl}/zdqy/daochu/5/${this.taskId}/${this.areaId}`
                    } else if (this.tabType === 3) {
                        this.tableOpt.column[1].name = '归属地'
                        this.peopleExportUrl = `${exportUrl}/zdqy/daochu/1/${this.taskId}/${this.areaId}`
                    } else if (this.tabType === 4) {
                        this.tableOpt.column[1].name = '归属地'
                        this.peopleExportUrl = `${exportUrl}/zdqy/daochu/2/${this.taskId}/${this.areaId}`
                    } else if (this.tabType === 5) {
                        this.tableOpt.column[1].name = '姓名'
                        this.peopleExportUrl = `${exportUrl}/zdqy/daochu/0/${this.taskId}/${this.areaId}`
                    }

                    this.getBarsAndLine(true)
                    $('#ga-keyArea__bars .ga-frame__content').animate({ scrollTop: 0 }, 500);
                }
            },
            // 右侧线图弹窗隐藏
            RHide () {
                this.ifRShow = false
            },
            // 右侧线图弹窗显示
            RShow () {
                this.ifRShow = true
            },
            //  境外tab显示柱状图事件
            outBarShow () {
                this.$refs.map.createOneMarker() // 清空单独人员位置及信息
                this.isOutListShow = false
            },
            //  境外tab显示人员列表事件
            outListShow () {
                this.isOutListShow = true
                this.tableOpt.listLoading = true;
                this.tableOpt.emptyText = ' '
                this.loadPersonsJson(2)
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
            // 修改左边表格当前页
            changeLeftPage (val) {
                this.tableOpt.pageOpt.currentPage = val
                this.loadPersonsJson(this.tabType)
            },
            // 修改左边表格行数
            changeLeftRows (val) {
                this.tableOpt.pageOpt.pageSize = val
                this.loadPersonsJson(this.tabType)
            },
            // 修改右边表格当前页
            changeRightPage (val) {
                this.tabsOpt.tableOpt.pageOpt.currentPage = val
                this.tableOpt.pageOpt.currentPage = val
                this.loadPersonsJson(this.tabType)
            },
            // 修改右边表格行数
            changeRightRows (val) {
                this.tabsOpt.tableOpt.pageOpt.pageSize = val
                this.tableOpt.pageOpt.pageSize = val
                this.loadPersonsJson(this.tabType)
            },
            /**
             * 修改柱图滚动条高度
             * @param {height} 滚动条距容器顶部高度
             */
            changBarScorll (height) {
                $('#ga-keyArea__bars .ga-frame__content').animate({ scrollTop: height }, 500);
            },
            // 设置折线图高度
            setLinesHeight () {
                this.lineOpt.height = (this.vsHeight - 31 - 47) / 3 - 20
            },
            // socket连接并监听数据
            socketFun () {
                // 连接socket
                this.socket.connect(`${apiUrl}/websocket/zdqy/${this.taskId}/${this.areaId}`);
                this.socket.on('open', () => { })
                this.socket.on('message', resp => {
                    this.RHide()
                    this.popHide()
                    // socket中不含柱状图参数，所以需要请求
                    let data = this.socket.JSONparse(resp.data);
                    //              console.log(data);
                    if (data === 1) {
                        this.getBarsAndLine(true)
                        this.loadActualNum()
                    //    if (this.baseStation) {
                    //        this.spliceArr(this.dotData, 'JZ')
                    //        this.loadPointJson()
                    //    }
                    //    if (this.involveXJ) {
                    //        this.spliceArr(this.dotData, 'SJ')
                    //        this.notGPSLocation()
                    //    }
                    //    if (this.involveXZ) {
                    //        this.spliceArr(this.dotData, 'SZ')
                    //        this.notGPSLocation()
                    //    }
                    //    if (this.keyPerson) {
                    //        this.spliceArr(this.dotData, 'keyPerson')
                    //        this.notGPSLocation()
                    //    }
                    } else if (data === 2) {
                        this.spliceArr(this.dotData, 'GPS')
                        this.GPSLocation()
                    }
                });
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
                        this.loadActualNum()
                        this.getBarsAndLine(false)
                    }, 60000)
                    this.poling1 = setInterval(() => {
                        this.RHide()
                        this.popHide()
                        this.spliceArr(this.dotData, 'GPS')
                        this.GPSLocation()
                    }, 300000)
                } else {
                    console.log('close query')
                    clearInterval(this.poling)
                    clearInterval(this.poling1)
                }
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
            // 人员构成边框
            tabFrame (index) {
                if (index === 0 || index === 3) {
                    return `ga-keyArea__tabFrameLeft`
                } else if (index === 2 || index === 5) {
                    return `ga-keyArea__tabFrameRight`
                } else {
                    return ''
                }
            },
            // 时间轴开始跳动修改时间，接口请求数据
            changeTimeline (val) {
                //            this.markerType = [];
                this.start = val.startTime
                this.end = val.endTime
                if (this.btnSts === 'playback') {
                    // this.baseStation = true
                    // this.markerType.push('基站');
                    // this.markerType.push('GPS');
                }
                // this.GPSStation = false
                // this.involveXJ = false
                // this.involveXZ = false
                // this.keyPerson = false
                // 总人数面板数据
                this.loadActualNum()
                // 3级柱图数据
                this.getBarsAndLine(false)
                // 基站热力图
                // this.loadMap()
                // 加载非GPS人员位置
                this.notGPSLocation('SJ')
                this.notGPSLocation('SZ')
                this.notGPSLocation('keyperson')
                // Bar回弹到顶部
                this.changBarScorll(0)
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
                this.isSwitchAbled = false;
                // 重新请求数据
                this.loadActualNum()
                // 根据当前的tab类型请求相应的柱图或人员列表
                if ([0, 1, 2].indexOf(this.tabType) > -1) {
                    this.loadBarsJson(this.tabType)
                } else {
                    this.loadPersonsJson(this.tabType)
                }
                //            this.loadMap()
                this.changBarScorll(0)
                // this.socketFun()
            },
            // 回放键
            startHandler () {
                this.socket.disconnect();
                this.btnSts = 'playback'
                this.timeLineOpt.click = true;
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
            loadMap () {
                this.$nextTick(() => {
                    // 加载点
                    setTimeout(() => {
                        this.loadPointJson()
                    }, 300);
                })
            },
            /**
             * 获取左下柱图数据和右侧弹窗折线图数据
             * @param {hasLine} 判断是否需要请求折线图数据  [Boolean]
             * */
            getBarsAndLine (hasLine) {
                // console.log(this.tabType)
                switch (this.tabType) {
                    case 0:
                        if (hasLine) {
                            this.loadLinesJson(2, '')
                        }
                        this.firBarsTitle = '省内在线用户数排行'
                        this.isPeopleListShow = false
                        this.loadBarsJson(0)
                        break
                    case 1:
                        if (hasLine) {
                            this.loadLinesJson(4, '')
                        }
                        this.firBarsTitle = '省外在线用户数排行'
                        this.isPeopleListShow = false
                        this.loadBarsJson(1)
                        break
                    case 2:
                        this.firBarsTitle = '境外在线用户'
                        // this.isPeopleListShow = false
                        this.isOutListShow = false
                        this.loadBarsJson(2)
                        break
                    case 3:
                        this.firBarsTitle = '涉疆在线用户'
                        this.isPeopleListShow = true
                        this.loadPersonsJson(3)
                        break
                    case 4:
                        this.firBarsTitle = '涉藏在线用户'
                        this.isPeopleListShow = true
                        this.loadPersonsJson(4)
                        break
                    case 5:
                        this.firBarsTitle = '重点人在线用户'
                        this.isPeopleListShow = true
                        this.loadPersonsJson(5)
                        break
                }
            },
            trendChange () {
                this.isTrendLine = true
            },
            peopExport () {
                this.isTrendLine = false
            },
            //  点击地图上的基站开关在地图上打点
            baseStationChange (val) {
                this.markerType = [];
                if (val) {
                    this.GPSStation = false
                    this.involveXJ = false
                    this.involveXZ = false
                    this.keyPerson = false
                    this.markerType.push('基站');
                }
            },
            //  点击地图上的GPS开关在地图上打点
            GPSStationChange (val) {
                this.markerType = [];
                if (val) {
                    this.baseStation = false
                    this.involveXJ = false
                    this.involveXZ = false
                    this.keyPerson = false
                    this.markerType.push('GPS');
                }
            },
            //  点击地图上的涉疆/涉藏/重点人开关在地图上打点
            peopleChange () {
                this.baseStation = false
                this.GPSStation = false
                this.markerType = [];
                if (this.involveXJ) {
                    this.markerType.push('涉疆')
                }
                if (this.involveXZ) {
                    this.markerType.push('涉藏')
                }
                if (this.keyPerson) {
                    this.markerType.push('重点人')
                }
            },
            //  人员导出界面的‘导出’按钮函数
            exportData () {
                //  获取导出表单的表单项
                let type = '';
                if (this.exFromSlects.length) {
                    type = this.exFromSlects.join(',')
                }
                //            let exportDataOne = `${exportUrl}/zdqy/daochu/${type}/111/222`;
                let exportDataOne = `${exportUrl}/zdqy/daochu/${type}/${this.taskId}/${this.areaId}`;
                location.href = exportDataOne
                this.exFromSlects = []
                //            this.exportDataOnE += '#/task/index'
            },
            //  人员导出界面的‘取消’按钮函数
            cancleExport () {
                this.isTrendLine = true;
                this.exFromSlects = []
            },
            //  累积用户数弹窗改变
            dialogChange (val) {
                this.dialogVisible = val;
                this.$refs.formDialog.clearValue();
            },
            // 累积用户数弹窗的查询按钮
            accumulateUserSearch () {
                let list = this.$refs.formDialog.getValue();
                //            console.log(list)
                let { queryBeginTime, queryEndTime } = list;
                let yesterDayStart = new Date(queryBeginTime).getTime()
                let yesterDayEnd = new Date(queryEndTime).getTime()
                if (!queryBeginTime) {
                    this.$message({
                        type: 'warning',
                        message: '开始时间不能为空'
                    });
                } else if (!queryEndTime) {
                    this.$message({
                        type: 'warning',
                        message: '结束时间不能为空'
                    });
                } else if (queryBeginTime >= queryEndTime) {
                    this.$message({
                        type: 'warning',
                        message: '开始时间必须小于结束时间'
                    });
                } else if (yesterDayEnd - yesterDayStart > 24 * 3600 * 1000) {
                    this.$message({
                        type: 'warning',
                        message: '只支持24小时内的查询'
                    });
                } else {
                    this.createAccumulateUser(queryBeginTime, queryEndTime)
                }
            },
            //  累积用户数清空按钮
            accumulateUserClear () {
                this.$refs.formDialog.clearValue();
                //            this.accumulateNumber = ''
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
            // dialog显示回调
            dialogOpendCallback () {
                this.tableOptTask.pageOpt.data = [];
                this.tableOptTask.pageOpt.currentPage = 1;
                let pageSize = this.tableOptTask.pageOpt.pageSize;
                this.accumulateUserTaskList(pageSize, 1);
            },
            // 刷新累计用户数列表
            accumulateUserTaskListRefeshed () {
                this.tableOptTask.data = [];
                this.tableOptTask.listLoading = true
                this.tableOptTask.emptyText = ' '
                this.accumulateUserTaskList(this.tableOptTask.pageOpt.pageSize, this.tableOptTask.pageOpt.currentPage);
            },
        // -----------------------------------操作方法end-----------------------------------
        // -----------------------------------接口方法start-----------------------------------
            // 加载实时在线人数以及tabs中各个分类人数
            async loadActualNum () {
                let resp = await overall({
                    taskId: this.taskId,
                    areaId: this.areaId,
                    // timestamp: this.postTime === 'now' ? moment().format('YYYY-MM-DD HH:mm:ss') : this.postTime
                    timestamp: this.postTime === 'now' ? sessionStorage.gTime : this.postTime
                })
                if (resp.data) {
                    this.numFlipData = [{ value: resp.data.allCount || 0 }] // 实时在线人数数据
                    this.tableOpt.pageOpt.total = resp.data.zdCount
                    // 各人员分类数据
                    this.tabsData = [
                        resp.data.snCount,
                        resp.data.swCount,
                        resp.data.jwCount,
                        undefined,
                        undefined,
                        resp.data.zdCount
                    ]
                }
            },
            /**
             * 加载左下柱图数据
             * @param {personType} 人员类型 [省内 0，省外 1，境外 2、SJ：3、SZ：4、重点人：5]
             */
            async loadBarsJson (personType) {
                let payload = {
                    taskId: this.taskId,
                    areaId: this.areaId,
                    timestamp: this.postTime === 'now' ? sessionStorage.gTime : this.postTime
                }
                let resp = {
                    rows: []
                };
                if (personType === 0) {
                    resp = await cylinderInner(payload)
                } else if (personType === 1) {
                    resp = await cylinderOuter(payload)
                } else if (personType === 2) {
                    resp = await cylinderOverseas(payload)
                }
                this.areaOpt.data = resp.rows;
            },
            /**
             * 加载左下人员列表数据
             * @param {personType} 人员类型  [省内 0，省外 1，境外 2、SJ：3、SZ：4、重点人：5]
             */
            async loadPersonsJson (personType) {
                let currentPage = this.tableOpt.pageOpt.currentPage;
                let pageSize = this.tableOpt.pageOpt.pageSize;
                let type;

                if (personType === 0) {
                    type = 3
                } else if (personType === 1) {
                    type = 4
                } else if (personType === 2) {
                    type = 5
                } else if (personType === 3) {
                    type = 1
                } else if (personType === 4) {
                    type = 2
                } else if (personType === 5) {
                    type = 0
                }
                let resp = await persons({
                    taskId: this.taskId,
                    areaId: this.areaId,
                    timestamp: this.postTime === 'now' ? sessionStorage.gTime : this.postTime,
                    page: currentPage,
                    rows: pageSize,
                    type: type
                })
                //            console.log(resp.data);
                if (resp.data) {
                    this.tableOpt.listLoading = false
                    this.tableOpt.data = resp.data;
                }
            },
            // 加载基站热力图点集接口
            async loadPointJson () {
                let resp = await heat({
                    taskId: this.taskId,
                    areaId: this.areaId,
                    //                测试
                    //                taskId: 316,
                    //                areaId: 641323,
                    timestamp: this.postTime === 'now' ? null : this.postTime
                })
                let { data } = resp;
                if (data) {
                    if (!data.data.length) {
                        return 0
                    } else {
                        //  基站打点
                        let JZpoint = data.data.map(v => {
                            let { lon, lat, count, type, ispCode } = v;
                            return { longtitude: lon, latitude: lat, count, type, ispCode }
                        })
                        this.dotData.push({ type: 'JZ', value: JZpoint });
                        // this.dotData.forEach((item) => {
                        //     console.log(item);
                        //     if (['JZ', 'GPS', 'SJ', 'SZ', 'keyPerson'].includes(item.type)) {
                        //         console.log(['JZ', 'GPS', 'SJ', 'SZ', 'keyPerson'].includes(item.type))
                        //         return (item.value = JZpoint)
                        //     } else {
                        //         console.log('cccccccccc');
                        //         this.dotData.push({ type: 'JZ', value: JZpoint });
                        //     }
                        // })
                        // this.dotData.push({ type: 'JZ', value: JZpoint });
                        setTimeout(() => {
                            this.point = data.data.map(v => {
                                let { lon, lat, count } = v;
                                return { lng: lon, lat, count }
                            })
                        }, 300);
                        this.heatMax = data.max
                    }
                }
            },
            // 加载热力图重点区域边界接口
            async loadAreaBorderJson () {
                let resp = await getCellCoordinate({ resourceId: this.areaId })
                          // console.log(resp);
                if (!resp.data.areaBorderInfoVO) {
                    return 0
                }
                let border = []
                let radius = null
                // 转成地图所需要的数据结构
                resp.data.areaBorderInfoVO.map(v => {
                    border.push([v.longtitude, v.latitude])
                })
                // 如果只有一个点的话，表示为圆形界面
                if (resp.data.areaBorderInfoVO.length === 1) {
                    radius = resp.data.areaBorderInfoVO[0].radius
                    border = [resp.data.areaBorderInfoVO[0].longtitude, resp.data.areaBorderInfoVO[0].latitude]
                }
                this.areaBorder = { border: border, radius: radius }
                // 取出基站点位置信息
                // if (resp.data.areaIncludeCellVO) {
                //     let cellVOArray = resp.data.areaIncludeCellVO.map((item) => {
                //         item.type = 4
                //         return item
                //     })
                //     this.dotData.push({ type: '基站', value: cellVOArray })
                // }
            },
            // 加载GPS人员位置信息接口
            async GPSLocation () {
                let resp = await gpsHot({
                    taskId: this.taskId,
                    areaId: this.areaId
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
            /**
             * 加载涉疆涉藏重点人位置信息
             * @param {personType} 人员类型  [对应传参：SJ 1、SZ 2、重点人 0]
             */
            async notGPSLocation (personType) {
                let type;
                if (personType === 'keyPerson') {
                    type = 0
                } else if (personType === 'SJ') {
                    type = 1
                } else if (personType === 'SZ') {
                    type = 2
                }
                let resp = await locationMsg({
                    taskId: this.taskId,
                    areaId: this.areaId,
                    type: type
                });
                if (resp.data) {
                    this.dotData.push({ type: personType, value: resp.data })
                } else {
                    return 0
                }
            },
            /**
             * 加载右侧折线图数据
             * @param {type} 左侧点击的人员类型 [1：总在线人数、2、3、4、5]
             * @param {homeCode} 归属地编码
             **/
            async loadLinesJson (type, homeCode) {
                let resp = await snap({
                    taskId: this.taskId,
                    areaId: this.areaId,
                    type: type,
                    homeCode: homeCode
                })
                // console.log(resp)
                if (resp.data) {
                    this.lineData = []
                    this.lineData.push(resp.data.datahour)
                    this.lineData.push(resp.data.dataday)
                    this.lineData.push(resp.data.dataweek)
                }
            },
            //  添加查询累积人数任务
            async createAccumulateUser (startTime, endTime) {
                let resp = await createAccumulateUser({
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
                    'taskId': this.taskId,
                    'areaId': this.areaId,
                    'rows': pageSize,
                    'page': page
                });
                let { rows, total } = resp;
                if (rows && _.isArray(rows)) {
                    if (rows.length === 0) {
                        this.tableOptTask.data = []
                    } else {
                        rows.filter((item) => {
                            if (item.status === 0) {
                                item.status = '已完成'
                            } else if (item.status === 2) {
                                item.status = '已失败'
                            } else if (item.status === 1) {
                                item.status = '查询中'
                            }
                            //                        item.createTime = item.createTime.slice(0, -3)
                            return item
                        })
                    }
                    this.tableOptTask.data = rows;
                    this.tableOptTask.pageOpt.total = total;
                    this.tableOptTask.listLoading = false;
                } else {
                    this.tableOptTask.listLoading = false;
                }
            }
        // -----------------------------------接口方法end-----------------------------------
        },
        components: {
            numberFlip,
            areaBars,
            curveBars,
            linesTrend,
            sysDialog,
            timeLines,
            frameCom,
            tableCom,
            FormComp,
            heatGISMap,
            tabsCom,
            exportListFrom
        },
        watch: {
            // gps 开关是否打开
            isSwitchAbled (newval) {
                // console.log(newval)
                if (!newval) {
                    this.markerType = [];
                    this.markerType.push('GPS');
                    this.GPSStation = true;
                }
            }
        }
    }
</script>

<style lang="postcss" scoped>
    ::-webkit-scrollbar {
      width: 0px;
    }

    :root {
      --timeline: 40px;
      --titleHeigth: 16px;
      --countMargin: 10px;
      /*--leftWidth: 35%;*/
      --leftWidth: 20%;
      --barTop: 40%;
    }
    .bottomLine::after {
      content: "";
      width: 100px;
      height: 2px;
      display: block;
      background: #4aa6dc;
      position: absolute;
      top: 28px;
    }
    .ga-keyArea__clearBtn.active:before,
    .ga-sxtabs__sureBtn.active:before {
      background: #1a498a;
    }
    .ga-keyArea__clearBtn.active:after,
    .ga-sxtabs__sureBtn.active:after {
      background: #1a498a;
    }
    .ga-keyArea__startBtn.active:before,
    .ga-sxtabs__clearBtn.active:before {
      background: #1a498a;
    }
    .ga-keyArea__startBtn.active:after,
    .ga-sxtabs__clearBtn.active:after {
      background: #1a498a;
    }
    @component-namespace ga {
      button.tarExport {
        position: absolute;
        top: -2px;
        right: 14%;
        color: #fff;
        font-size: 13px;
      }
      @b keyArea {
        @e content {
          width: 100%;
          height: calc(100% - 50px);
          /*position: absolute;*/
          /*top: 6px;*/
            position: relative;
          overflow: hidden;
          font-size: 12px;
          color: #fff;
        }
        @e map {
          width: calc(100% - var(--leftWidth));
          right: 0;
          height: calc(100%);
          padding-left: 10px;
          position: absolute;
        }
        @e dotSwitch {
          /*border:1px solid red;*/
          /*position: relative;*/
          /*z-index: -100;*/
          margin-bottom: 4px;
          font-size: 17px;
          font-weight: bold;
          color: red;
          @m type {
            display: inline-block;
            width: 60px;
            text-align: center;
            color: #fff;
          }
        }
        @e mapWrap {
          width: 100%;
          height: 100%;
        }
        @e leftWrap {
          width: var(--leftWidth);
          height: calc(100% - var(--timeline));
          position: absolute;
        }
        @e titleWrap {
          width: 100%;
          height: var(--titleHeigth);
          line-height: var(--titleHeigth);
          position: relative;
          font-size: 14px;
          box-sizing: border-box;
          padding-left: 10px;
          white-space: nowrap;
        }
        @e allUserWrap {
          height: var(--titleHeigth);
          line-height: var(--titleHeigth);
          font-size: 14px;
          cursor: pointer;
          position: absolute;
          /*top: 4px;*/
          right: 20px;
        }
        @e count {
          width: var(--leftWidth);
          /*height: calc(40% - var(--titleHeigth) - var(--countMargin));*/
          margin: var(--countMargin);
          position: absolute;
          display: flex;
          flex-direction: column;
          /*background: rgba(11, 37, 85, 0.2);*/
          border-radius: 5px;
        }
        @e legend {
          position: absolute;
          bottom: 2%;
          left: 1%;
          /*width: 100%;*/
          z-index: 1;
          /*display: -webkit-flex; !* Safari *!*/
          /*display: flex;*/
          /*justify-content: center;*/
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
            /*border: 1px solid red;*/
            border-radius: 3px;
            margin-left: 10px;
            margin-right: 4px;
            margin-top: 3px;
          }
          span {
            /*color: #515151;*/
            color: black;
          }
        }
        @e tabFrame {
          width: 100%;
          text-align: center;
          pointer-events: none;
          /* border-top: 1px solid #4f8ee5; */
          /* border-bottom: 1px solid #4f8ee5; */
          margin-top: 10px;
        }
        @e tabFrameLeft {
          /* border-left: 1px solid #4f8ee5; */
          pointer-events: none;
        }
        @e tabFrameRight {
          /* border-right: 1px solid #4f8ee5; */
          pointer-events: none;
        }

        @e number {
          width: 100%;
          height: 50px;
          position: relative;
        }
        @e numWrap {
          cursor: pointer;
          margin: 10px 0;
        }
        @e tabsWrap {
          width: 92%;
          height: 50%;
          position: relative;
          /*display: flex;*/
          /*flex: 1;*/
          justify-content: space-between;
          /*border-left: 1px solid red;*/
        }
        @e tab {
          /*display: -webkit-flex;*/
          /*display: flex;*/
          /*flex: 1;*/
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          -moz-user-select: none;
          -webkit-user-select: none;
          user-select: none;
          width: 25%;
          display: inline-block;
        }
        @e tabNum {
          font-size: 16px;
          height: 50%;
          /*margin: 4px 0;*/
          @m show {
            color: #fff;
          }
          @m show0 {
            color: #36befc;
          }
          @m show1 {
            color: #3cf887;
          }
          @m show2 {
            color: #fbd13d;
          }
          @m show3 {
            color: #e3292e;
          }
          @m show4 {
            color: #15f503;
          }
          @m show5 {
            color: #ff03f0;
          }
        }
        @e tabName {
          height: 50%;
          font-size: 16px;
          margin-bottom: 8px;
        }
        @e bars {
          position: absolute;
          top: 200px;
          /*bottom: 0;*/
          width: var(--leftWidth);
          height: calc(100% - 212px);
            margin-left: 5px;
          /*height: calc(50% - 30px - 20px);*/
        }
        @e lines {
          width: 30%;
          height: 100%;
          right: -30%;
          top: 0;
          -webkit-transition: all 0.5s ease-in-out 0s;
          -o-transition: all 0.5s ease-in-out 0s;
          transition: all 0.5s ease-in-out 0s;
          position: absolute;
          z-index: 1000;
          /*background: rgba(0, 0, 0, 0.8);*/
          @m show {
            right: 0;
            -webkit-transition: all 0.5s ease-in-out 0s;
            -o-transition: all 0.5s ease-in-out 0s;
            transition: all 0.5s ease-in-out 0s;
          }
        }
        @e linesWrap {
          margin-top: 10px;
          height: calc(33.3% - 20px);
        }
        @e mapTitle {
          left: 15px;
          position: absolute;
          &:before {
            content: "";
            width: 5px;
            height: 16px;
            background: #4aa6dc;
            position: absolute;
            left: -10px;
          }
        }
        @e active {
          height: 18px;
          -webkit-transition: all 0.5s ease-in-out 0s;
          -o-transition: all 0.5s ease-in-out 0s;
          transition: all 0.5s ease-in-out 0s;
          overflow: hidden;
          @m show {
            height: 100px;
            -webkit-transition: all 0.5s ease-in-out 0s;
            -o-transition: all 0.5s ease-in-out 0s;
            transition: all 0.5s ease-in-out 0s;
          }
        }
        @e popWrap {
          position: absolute;
          /*top: var(--barTop);*/
          z-index: 1;
          bottom: 0;
          width: var(--leftWidth);
          display: none;
          overflow: hidden;
            top: 200px;
            /*bottom: 0;*/
            height: calc(100% - 212px);
          /*height: calc(50% - 30px - 20px);*/
          /*height: calc(100% - var(--barTop));*/
          /*height: calc(100% - var(--barTop) - var(--timeline) - 20px);*/
          left: var(--leftWidth);
          margin-left: 10px;
          transition: width 0.5s;
        }
        @e tabsTitle {
          /*cursor: pointer;*/
          position: absolute;
          top: 4px;
          right: 20px;
          font-size: 13px;
          span {
            cursor: pointer;
            margin-right: 6px;
          }
        }
        @e expBtn {
          /*float: right;*/
          /*width: 10px;*/
          /*height: 10px;*/
          cursor: pointer;
          position: absolute;
          top: 4px;
          right: 20px;
          /*background: url("~assets/images/common/close.png") no-repeat 0 center;*/
        }
        @e popHide {
          float: right;
          width: 10px;
          height: 10px;
          cursor: pointer;
          position: absolute;
          top: 11px;
          right: 20px;
          background: url("~assets/images/common/close.png") no-repeat 0 center;
        }
        @e timeline {
          width: 98.5%;
          height: var(--timeline);
          position: absolute;
          padding-left: 50px;
          bottom: -6px;
          right: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #0c0c0c;
        }
        @e lineTitle {
          font-size: 12px;
          line-height: 16px;
          margin-left: 10px;
          &:before {
            content: "";
            width: 5px;
            height: 16px;
            background: #4aa6dc;
            position: absolute;
            margin-left: -10px;
          }
        }
        @e clearBtn {
          font-size: 12px;
          position: relative;
          margin-right: 25px;
          /*margin-bottom: 10px;*/
          z-index: 1;
          &:before {
            content: "";
            z-index: -1;
            top: 3px;
            bottom: 3px;
            right: 5px;
            left: -17px;
            background: var(--bg-color);
            position: absolute;
            border: 1px solid #4081dc;
          }
          &:after {
            content: "";
            position: absolute;
            top: 3px;
            bottom: 3px;
            left: 0px;
            right: -18px;
            z-index: -1;
            background: var(--bg-color);
            -webkit-transform: skew(-25deg);
            transform: skew(-25deg);
            border: 1px solid #4081dc;
            border-left: none;
          }
        }
        @e startBtn {
          font-size: 12px;
          position: relative;
          /*margin-bottom: 10px;*/
          z-index: 1;
          &:before {
            content: "";
            z-index: -1;
            top: 3px;
            bottom: 3px;
            right: 5px;
            left: -15px;
            background: var(--bg-color);
            position: absolute;
            -webkit-transform: skew(-25deg);
            transform: skew(-25deg);
            border: 1px solid #4081dc;
            border-right: none;
          }
          &:after {
            content: "";
            position: absolute;
            top: 3px;
            bottom: 3px;
            left: 8px;
            right: -15px;
            z-index: -1;
            background: var(--bg-color);
            border: 1px solid #4081dc;
            border-left: none;
          }
        }
      }
      @b sxtabs {
        position: relative;
        color: #ffffff;
        font-size: 12px;
        width: 100%;
        height: 100%;
        border: 1px solid transparent;
        padding: 0 6px 10px 6px;
        @e content {
          overflow-y: auto;
          /*padding: 8px 5px;*/
          width: 100%;
          height: 101%;
          background: linear-gradient(
            -45deg,
            transparent 9px,
            rgba(0, 0, 0, 0.7) 0
          );
          padding-top: 6px;
        }
        @e tabsTitle {
          position: relative;
          /*overflow: hidden;*/
          white-space: nowrap;
          font-size: 13px;
          color: #fff;
          height: 28px;
          background: linear-gradient(135deg, transparent 9px, #0b245f 0);
        }
        @e Title {
          margin: 5px 0;
        }
        @e button {
          /*display: block;*/
          /*position: absolute;*/
          /*top: 38px;*/
          /*margin-left: 10px;*/
          padding-left: 10px;
          /*color: #fff;*/
          font-size: 1px;
        }
        @e popHide {
          /*float: right;*/
          width: 10px;
          height: 10px;
          cursor: pointer;
          position: absolute;
          top: 10px;
          right: 20px;
          background: url("~assets/images/common/close.png") no-repeat 0 center;
        }
        @e tabs {
          display: inline-block;
          width: 100px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          cursor: pointer;
        }
        @e lineTitle {
          font-size: 12px;
          line-height: 16px;
          margin-left: 10px;
          &:before {
            content: "";
            width: 5px;
            height: 16px;
            background: #4aa6dc;
            position: absolute;
            margin-left: -10px;
          }
        }
        @e leftTop {
          position: absolute;
          left: -1px;
          top: -2px;
          width: 22px;
          height: 22px;
          background: url("~@/assets/images/monitor/frameComp.png") no-repeat 0 0;
        }
        @e rightTop {
          position: absolute;
          right: -1px;
          top: -2px;
          width: 22px;
          height: 22px;
          background: url("~@/assets/images/monitor/frameComp.png") no-repeat -25px 0;
        }
        @e leftBottom {
          position: absolute;
          left: -1px;
          bottom: -1px;
          width: 22px;
          height: 22px;
          background: url("~@/assets/images/monitor/frameComp.png") no-repeat 0 -25px;
        }
        @e rightBottom {
          position: absolute;
          right: -1px;
          bottom: -1px;
          width: 22px;
          height: 22px;
          background: url("~@/assets/images/monitor/frameComp.png") no-repeat -25px -25px;
        }
        @e left {
          position: absolute;
          left: -1px;
          bottom: 20px;
          width: 1px;
          height: calc(100% - 40px);
          background: #4f8ee5;
        }
        @e right {
          position: absolute;
          right: -1px;
          bottom: 20px;
          width: 1px;
          height: calc(100% - 40px);
          background: #4f8ee5;
        }
        @e top {
          position: absolute;
          left: 20px;
          top: -1px;
          width: calc(100% - 40px);
          height: 1px;
          background: #4f8ee5;
        }
        @e bottom {
          position: absolute;
          left: 20px;
          bottom: -1px;
          width: calc(100% - 40px);
          height: 1px;
          background: #4f8ee5;
        }
        @e sureBtn {
          font-size: 12px;
          position: relative;
          margin-right: 25px;
          margin-bottom: 10px;
          z-index: 1;
          &:before {
            content: "";
            z-index: -1;
            top: 3px;
            bottom: 3px;
            right: 5px;
            left: -17px;
            background: var(--bg-color);
            position: absolute;
            border: 1px solid #4081dc;
          }
          &:after {
            content: "";
            position: absolute;
            top: 3px;
            bottom: 3px;
            left: 0px;
            right: -18px;
            z-index: -1;
            background: var(--bg-color);
            -webkit-transform: skew(-25deg);
            transform: skew(-25deg);
            border: 1px solid #4081dc;
            border-left: none;
          }
        }
        @e clearBtn {
          font-size: 12px;
          position: relative;
          margin-bottom: 10px;
          z-index: 1;
          &:before {
            content: "";
            z-index: -1;
            top: 3px;
            bottom: 3px;
            right: 5px;
            left: -15px;
            background: var(--bg-color);
            position: absolute;
            -webkit-transform: skew(-25deg);
            transform: skew(-25deg);
            border: 1px solid #4081dc;
            border-right: none;
          }
          &:after {
            content: "";
            position: absolute;
            top: 3px;
            bottom: 3px;
            left: 8px;
            right: -15px;
            z-index: -1;
            background: var(--bg-color);
            border: 1px solid #4081dc;
            border-left: none;
          }
        }
      }
      @b frame {
        position: relative;
        color: #ffffff;
        font-size: 12px;
        width: 100%;
        height: 100%;
        border: 1px solid transparent;
        padding: 0 6px 10px 6px;
        @e Title {
          margin: 10px 0;
        }
        @e expContent {
          /*color: #00ffff;*/
          display: flex;
          justify-content: center;
          margin: 20px auto;
          span {
            font-size: 16px;
            color: #9af5f6;
          }
          div {
            margin: 4px 0;
          }
        }
        @e button {
          /*display: block;*/
          /*position: absolute;*/
          /*top: 38px;*/
          /*margin-left: 10px;*/
          padding-left: 10px;
          /*color: #fff;*/
          font-size: 1px;
        }
        @e lineTitle {
          font-size: 12px;
          line-height: 16px;
          margin-left: 10px;
          &:before {
            content: "";
            width: 5px;
            height: 16px;
            background: #4aa6dc;
            position: absolute;
            margin-left: -10px;
          }
        }
        @e sureBtn {
          font-size: 12px;
          position: relative;
          margin-right: 25px;
          margin-bottom: 10px;
          z-index: 1;
          &:before {
            content: "";
            z-index: -1;
            top: 3px;
            bottom: 3px;
            right: 5px;
            left: -17px;
            background: var(--bg-color);
            position: absolute;
            border: 1px solid #4081dc;
          }
          &:after {
            content: "";
            position: absolute;
            top: 3px;
            bottom: 3px;
            left: 0px;
            right: -18px;
            z-index: -1;
            background: var(--bg-color);
            -webkit-transform: skew(-25deg);
            transform: skew(-25deg);
            border: 1px solid #4081dc;
            border-left: none;
          }
        }
        @e clearBtn {
          font-size: 12px;
          position: relative;
          margin-bottom: 10px;
          z-index: 1;
          &:before {
            content: "";
            z-index: -1;
            top: 3px;
            bottom: 3px;
            right: 5px;
            left: -15px;
            background: var(--bg-color);
            position: absolute;
            -webkit-transform: skew(-25deg);
            transform: skew(-25deg);
            border: 1px solid #4081dc;
            border-right: none;
          }
          &:after {
            content: "";
            position: absolute;
            top: 3px;
            bottom: 3px;
            left: 8px;
            right: -15px;
            z-index: -1;
            background: var(--bg-color);
            border: 1px solid #4081dc;
            border-left: none;
          }
        }
        @e content {
          overflow-y: scroll;
          overflow-x: hidden;
          /*padding: 8px 5px;*/
          width: 100%;
          /*height: calc(100% - 35px);*/
          background: linear-gradient(
            -45deg,
            transparent 9px,
            rgba(0, 0, 0, 0.7) 0
          );
        }
        @e tabsTitle {
          position: relative;
          /*overflow: hidden;*/
          white-space: nowrap;
          font-size: 13px;
          color: #fff;
          height: 28px;
          background: linear-gradient(135deg, transparent 9px, #0b245f 0);
        }
        @e tabs {
          display: inline-block;
          width: 100px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          cursor: pointer;
        }
        @e leftTop {
          position: absolute;
          left: -1px;
          top: -2px;
          width: 22px;
          height: 22px;
          background: url("~@/assets/images/monitor/frameComp.png") no-repeat 0 0;
        }
        @e rightTop {
          position: absolute;
          right: -1px;
          top: -2px;
          width: 22px;
          height: 22px;
          background: url("~@/assets/images/monitor/frameComp.png") no-repeat -25px 0;
        }
        @e leftBottom {
          position: absolute;
          left: -1px;
          bottom: -1px;
          width: 22px;
          height: 22px;
          background: url("~@/assets/images/monitor/frameComp.png") no-repeat 0 -25px;
        }
        @e rightBottom {
          position: absolute;
          right: -1px;
          bottom: -1px;
          width: 22px;
          height: 22px;
          background: url("~@/assets/images/monitor/frameComp.png") no-repeat -25px -25px;
        }
        @e left {
          position: absolute;
          left: -1px;
          bottom: 20px;
          width: 1px;
          height: calc(100% - 40px);
          background: #4f8ee5;
        }
        @e right {
          position: absolute;
          right: -1px;
          bottom: 20px;
          width: 1px;
          height: calc(100% - 40px);
          background: #4f8ee5;
        }
        @e top {
          position: absolute;
          left: 20px;
          top: -1px;
          width: calc(100% - 40px);
          height: 1px;
          background: #4f8ee5;
        }
        @e bottom {
          position: absolute;
          left: 20px;
          bottom: -1px;
          width: calc(100% - 40px);
          height: 1px;
          background: #4f8ee5;
        }
        @e popHide {
          /*float: right;*/
          z-index: 10000;
          width: 10px;
          height: 10px;
          cursor: pointer;
          position: absolute;
          top: 10px;
          right: 20px;
          background: url("~assets/images/common/close.png") no-repeat 0 center;
        }
      }
    }
</style>
