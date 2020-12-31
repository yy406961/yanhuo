<template>
    <div class="ga-keyAreaMonitor__contentWrap">
        <!-- 标题  -->
        <div class="ga-layout__bodyTitle" v-if="showTitle">
            <span class="ga-layout__titleTopLeft"></span>
            <span class="ga-layout__titleLeft"></span>
            <span class="ga-layout__titleCenter">{{ areaName + '实时监测' }}</span>
            <span class="ga-layout__titleRight"></span>
            <span class="ga-layout__titleRightLeft"></span>
        </div>
        <div class="ga-keyAreaMonitor" :style="mainStyle">
            <div class="ga-keyAreaMonitor__leftWrap">
                <containerBorder class="ga-keyAreaMonitor__leftTopWrap">
                    <dataPart class="ga-keyAreaMonitor__flipWrap"
                        :taskTime="taskTime"
                        :flipType="flipRealType"
                        :flipValueData="flipRealData"
                        :tabPropsData="tabRealData"
                        @tabClick="tabClick"
                        @numClick="numClick">
                    </dataPart>
                </containerBorder>
                <!-- 左侧柱图/表格改变 -->
                <div class="ga-keyAreaMonitor__leftBar" id="leftBar">
                    <frameCom :title='firBarsTitle' :normal="false">
                        <!-- <div v-if='tabType === 13' class="ga-keyAreaMonitor__expBtn">
                                <span @click="exportExl">导出</span>
                        </div> -->
                        <tableCom v-if='iskeyPerson' :option="tableOpt" :comSize="tableSize"
                            class="ga-keyAreaMonitor__zdrTable"
                            @handleCurrentPageChange="changeLeftPage"
                            @handleSizePageChange="changeLeftRows"></tableCom>
                        <areaBars v-show='!iskeyPerson' :option='areaOpt'></areaBars>
                    </frameCom>
                </div>
            </div>
            <!-- 左侧下三级柱图内容 -->
            <div class='ga-keyAreaMonitor__popWrap' ref='pop'>
                <frameCom :title='secBarsTitle' :normal="true">
                    <div class='ga-keyAreaMonitor__popHide' @click='popHide'> </div>
                    <curveBars :option="popOpt"></curveBars>
                </frameCom>
            </div>
            <!-- 中间地图 -->
            <div class="ga-keyAreaMonitor__middleWrap">
                <heatMap ref="map"
                    :Interface="Interface"
                    :heatPoint="dotData"
                    :areaBorder="areaBorder"
                    :warnBool="warnBool"
                    :isWarn0="isWarn0"
                    :isWarn1="isWarn1"
                    :isWarn2="isWarn2"
                    :isWarn3="isWarn3"
                    :gpsMax="gpsMax"
                    :areaId="areaId">
                </heatMap>
            </div>
            <!-- 右侧弹出折线图 -->
            <div :class='["ga-keyAreaMonitor__rightWrap", {"ga-keyAreaMonitor__rightWrap--show": ifRShow}]'>
                <tabsCom ref="lineDialog"
                    :showTitle="showTitle"
                    :tabTitle="tabTitle"
                    :renderData="lineData"
                    :barData="barData"
                    :lineTitle="triBarsTitle"
                    :areaId="areaId"
                    :TArray='tArray' :obj="lineReqObj"
                    @closeTabs="RHide">
                </tabsCom>
            </div>
            <!-- 时间轴 -->
            <div class='ga-keyAreaMonitor__timelineWrap'>
                <el-button type="primary"
                            @click="clearHandler"
                            class='ga-button__realTime'
                            :class="{'actived': btnSts === 'real'}">实时</el-button>
                <el-button type="primary"
                            @click="startHandler"
                            class='ga-button__startBtn'
                            :class="{'actived': btnSts === 'playback'}">{{startBtn}}</el-button>
                <timeLines :options="timeLineOpt" @change="changeTimeline" ref="time"></timeLines>
            </div>
        </div>
    </div>
</template>

<script>
import { ajax } from 'common'
import { mapGetters } from 'vuex'
import dataPart from './compontents/dataPart'
import numberFlip from 'components/monitor/numberFlip'
import frameCom from 'components/monitor/frame'
// import areaBars from 'components/monitor/areaBars'
import areaBars from 'components/monitor/areaTestBars'
import tableCom from 'components/Table'
import curveBars from 'components/monitor/curveBars'
import FormComp from 'components/Form/index'
import heatMap from './compontents/heatMap'
import tabsCom from './compontents/tabsKeyArea'
import LJDialog from './compontents/LJDialog'
import timeLines from 'components/monitor/timeLines'
import containerBorder from 'components/common/containerBorder'
// import { appData } from './compontents/data.js'
const exportUrl = process.env.NODE_ENV === 'production'
        ? '/policeBusiness' : 'http://192.168.3.183:8080/policeBusiness'
const HISLABEL = '回放'
const CONLABEL = '继续'
const PAUSELABEL = '暂停'
export default {
    name: 'keyAreaMonitor',
    props: ['Interface'],
    data () {
        let me = this
        return {
            dataUrl: '',
            showTitle: true,
            taskId: '',
            areaId: '',
            areaName: '重点区域',
            // 左侧上方数据
            flipRealType: 0,
            flipRealData: 0,
            tabRealData: [],
            // 地图上方数据
            area1: '',
            // 当前已选中的tab的index, 人员类型 实时省外 11、实时境外 12、实时重点人 13
            tabType: 14,
            category: 0,
            iskeyPerson: false,
            // 柱状图title，根据tabs修改
            firBarsTitle: '省内在线用户数排行',
            insertTime: '',
            // 左侧一二级柱状图配置
            areaOpt: {
                data: [],
                click: true, // 能否点击展开，TRUE为能，FALSE不能
                // 一级柱图点击事件
                barClick (item) {
                    me.tabTitle = '实时用户在线变化趋势'
                    me.firstName = item.area + '在线用户'
                    me.tArray = ['近1小时', '近24小时', '近7天']
                    // 修改三级弹出柱图和右侧线图的title
                    me.area1 = item.area
                    // 右侧线图div弹出
                    if (!me.disClick) {
                        // 动画效果，有滚动条时，点击柱图使该柱在视图第一位
                        // let jump = index * 30;
                        // me.changBarScorll(jump)
                        me.RShow()
                        // 根据当前的tab类型请求相应的线图参数
                        me.loadLinesJson(me.tabType, item)
                        // 如果点击柱图存在三级弹出柱图数据，则赋值并弹出，否则隐藏
                        if (item.pop && item.pop.length) {
                            me.popOpt.data = item.pop
                            me.popShow()
                        } else {
                            me.popHide()
                        }
                    }
                }
            },
            // 左侧三级柱状图配置
            popOpt: {
                // 弹出柱图配置
                data: [],
                barClick (item) {
                    me.firstName = item.area + '在线用户'
                    me.RShow();
                    // 修改右侧线图title并请求数据
                    me.loadLinesJson(me.tabType, item)
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
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    { name: '姓名', value: 'name', width: 60, align: 'center', tooltip: true },
                    { name: '手机号', value: 'iphone', tooltip: true, align: 'center' },
                    { name: '群体', value: 'groupName', width: 60, tooltip: true, align: 'center' }
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
                rowClick: function () {
                    // me.$refs.map.createOneMarker(row)
                }
            },
            peopleExportUrl: '',
            // 中间地图
            jzShow: false,
            warnBool: '0',
            isWarn0: 0,
            isWarn1: 0,
            isWarn2: 0,
            isWarn3: 0,
            dotData: [],
            markerPoint: [],
            areaBorder: [],
            gpsMax: 0,
            // 右侧
            ifRShow: false,
            tabTitle: '变化趋势',
            firstName: '',
            tArray: ['近1小时', '近24小时', '近7天'],
            lineData: [],
            barData: [],
            lineReqObj: {},
            // 时间轴相关
            heatTime: '',
            btnSts: 'real',
            timeLineOpt: { // 时间线配置
                click: true, // 能否拖动时间轴，TRUE为能，FALSE不能
                // time: '2018-12-12 12:12:12',
                width: ($(window).width() * 0.98 - 100),
                type: 'five'
            },
            disClick: false, // 当开始回放时，不允许点击tabs，不允许弹窗
            startBtn: HISLABEL, // 回放或者暂停按钮label
            // 区域监测任务 起始终止时间
            taskTime: { start: '', end: '' },
            poling: null,
            poling1: null,
            poling2: null
        }
    },
    computed: {
        ...mapGetters({
            'vsHeight': 'global/visualHeight',
            'globalKeys': 'global/globalKeys',
            'dataType': 'global/dataType'
        }),
        mainStyle() {
            let height = this.vsHeight - 55
            if (this.showTitle) {
                height = this.vsHeight
            }
            return {
                height: height + 'px'
            }
        },
        // 弹出柱图title
        secBarsTitle () {
            return `${this.area1}在线用户在重点区域分布`
        },
        // 左下角列表 size
        tableSize () {
            let height = this.showTitle ? 36 : 96
            return { 'height': this.vsHeight - 350 - height - 40 }
        },
        // 弹出线图title
        triBarsTitle () {
            if (this.firstName) {
                return `${this.firstName}变化趋势`
            } else {
                return ``
            }
        }
    },
    mounted() {
        this.getData(this.Interface)
        // 启用轮询
        this.rollPoling(true)
    },
    methods: {
        getData(newVal) {
            this.tabType = 14
            this.warnBool = '0'
            this.isWarn0 = 0
            this.isWarn1 = 0
            this.isWarn2 = 0
            this.isWarn3 = 0
            if (localStorage.getItem('taskId')) {
                this.showTitle = true
                // 缓存路由传过来的参数
                this.dataStorage(['taskId', 'areaId', 'areaName'], false)
                // 处理 taskId 是 T 开头
                if (this.taskId) {
                    let firstNum = this.taskId.slice(0, 1);
                    if (firstNum === 'T') {
                        this.taskId = this.taskId.slice(1);
                    }
                }
            } else {
                this.showTitle = false
                let obj = {
                    70010: [30, 131],
                    70011: [30, 138],
                    70012: [30, 139],
                    70016: [30, 140],
                    70017: [30, 141],
                    70018: [30, 142],
                    70019: [30, 143],
                    70022: [30, 144],
                    70023: [30, 145],
                    70024: [30, 146],
                    70025: [30, 147],
                    70026: [30, 148],
                    70027: [30, 149],
                    70028: [30, 150],
                    70029: [30, 151],
                    70030: [30, 152],
                    70031: [30, 153],
                    70036: [30, 160]
                };
                this.jzShow = this.Interface ? this.Interface === 70010 : true
                this.showTitle = false
                this.taskId = obj[newVal][0]
                this.areaId = obj[newVal][1]
            }
            // this.initFunc(true)
            // 地图区域边框
            this.getMapBorder();
            if (this.jzShow) this.warnApi()
        },
        initFunc() {
            // 柱图回弹到顶部
            this.changBarScorll(0)
            // 总人数面板数据
            this.getNumData()
            // 热地图数据
            this.getMapData()
            // 区域监测任务 起始终止时间
            // this.getTaskTime()
        },
        changeTimeline(val) {
            this.heatTime = this.disClick ? val.endTime : ''
            this.initFunc()
        },
        // 清除键 实时
        clearHandler () {
            this.RHide()
            this.popHide()
            this.btnSts = 'real'
            this.startBtn = HISLABEL
            this.disClick = false
            this.$refs.time.clear(true)
            this.changBarScorll(0)
        },
        // 回放键
        startHandler () {
            this.btnSts = 'playback'
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
        },
        // -----------------------------------操作方法START-----------------------------------
        // 面板点击事件
        numClick (data, type) {
            this.category = type
            this.tabTitle = data.value === 0 ? '实时用户在线变化趋势' : '累计用户变化趋势'
            this.firstName = data.value === 0 ? '全部实时用户' : '全部累计用户'
            // this.$refs.map.createOneMarker(null, true) // 清空单独人员位置及信息
            this.loadLinesJson(data.value) // 加载右侧弹窗折线图数据
            this.RShow()
            this.popHide()
        },
        /**
         * tab切换面板点击事件
         * @param {val} tabs索引 [实时省外 11，实时境外 12，实时重点人 13]
         **/
        tabClick (data, type) {
            this.category = type
            this.firBarsTitle = data.text
            this.tabType = data.value
            this.tableOpt.pageOpt.currentPage = 1
            this.popHide() // 关闭三级柱图
            this.RHide()
            // 省内、省外 显示右侧弹窗
            let bool = [14, 11, 12].includes(this.tabType)
            this.firstName = data.name + '在线'
            if (bool) {
                this.RShow()
            } else {
                this.RHide()
            }
            // this.$refs.map.createOneMarker(null, bool) // 清空单独人员位置及信息
            this.tabTitle = '实时用户在线变化趋势'
            this.getBarsAndLine(true)
            $('#leftBar .ga-frame__content').animate({ scrollTop: 0 }, 500);
        },
        /**
         * 获取左下柱图数据和右侧弹窗折线图数据
         * @param {hasLine} 判断是否需要请求折线图数据  [Boolean]
         * */
        getBarsAndLine (hasLine = false) {
            let bool = [14, 11, 12].includes(this.tabType)
            this.iskeyPerson = !bool
            if (hasLine) {
                this.loadLinesJson(this.tabType)
            }
            this.loadBarsJson()
            // if (bool) {
            //     if (hasLine) {
            //         this.loadLinesJson(this.tabType)
            //     }
            //     this.loadBarsJson()
            // } else {
            //     this.loadPersons()
            // }
        },
        // 修改左边表格当前页
        changeLeftPage (val) {
            this.tableOpt.pageOpt.currentPage = val
            this.loadBarsJson()
            // this.loadPersons()
        },
        // 修改左边表格行数
        changeLeftRows (val) {
            this.tableOpt.pageOpt.pageSize = val
            this.loadBarsJson()
            // this.loadPersons()
        },
        // -----------------------------------操作方法END-----------------------------------
        // -----------------------------------接口方法start-----------------------------------
        handelNum(num, val) {
            if (num === val) {
                let random = Math.floor(Math.random() * 100 * (Math.random() > 0.5 ? 1 : -1))
                num += random
                if (num < 0) {
                    num = Math.floor(Math.random() * 100)
                }
            } else {
                num = val
            }
            return num
        },
        // 左侧数字牌接口
        getNumData() {
            // this.flipRealData = 0
            let obj = {
                areaId: this.areaId,
                taskId: this.taskId,
                time: this.heatTime
                // timestamp: sessionStorage.getItem('gTime')
            }
            ajax.post('focus/getNum', obj).then(resp => {
                let { data } = resp
                // 时间轴重新赋值
                let { sszxCount, ssczCount, ssldCount, sssnCount, ssswCount, ssjwCount, sstdCount, sszdrCount, ssczAllCount, sstdAllCount } = data
                this.flipRealData = sszxCount

                // 各人员分类数据
                this.tabRealData = [sssnCount, ssswCount, ssjwCount, ssczCount, ssldCount, sstdCount, sszdrCount, ssczAllCount, sstdAllCount]
                this.insertTime = data.insertTime
                // 柱图数据
                this.getBarsAndLine(false)
            }).catch((err) => {
                console.log(err)
            })
        },
        /**
         * 加载左下柱图数据
         * @param {personType} 人员类型 [实时省外 11，实时境外 12，实时重点人 13]
         */
        loadBarsJson() {
            let time = this.insertTime ? this.insertTime.substr(0, 16) : this.insertTime
            let currentPage = this.tableOpt.pageOpt.currentPage;
            let pageSize = this.tableOpt.pageOpt.pageSize;
            let obj = {
                taskId: this.taskId,
                areaId: this.areaId,
                timestamp: time,
                type: this.tabType,
                page: currentPage,
                rows: pageSize
            }
            this.tableOpt.data = []
            ajax.post('focus/getRankingList', obj).then(resp => {
                this.areaOpt.data = []
                let { rows } = resp
                if (this.tabType === 13) {
                    this.tableOpt.data = rows
                } else {
                    this.areaOpt.data = rows
                }
            })
        },
        /**
         * 加载右侧折线图数据
         * @param {type} 左侧点击的人员类型 [1：总在线人数、2、3、4、5]
         * @param {homeCode} 归属地编码对象
         * @param {popType} 0 非柱图点击，1 一级柱图点击， 2 二级柱图点击
         **/
        loadLinesJson (type, homeCode = {}) {
            let { areaCode, provCode } = homeCode
            let provinceId = provCode
            let cityId = areaCode
            if (this.tabType === 12) {
                provinceId = areaCode
                cityId = ''
            }
            this.lineData = []
            this.lineReqObj = {
                taskId: this.taskId,
                areaId: this.areaId,
                type: type,
                provinceId: provinceId || '',
                cityId: cityId || ''
            }
            ajax.post('focus/getLineChart', this.lineReqObj).then(resp => {
                let { data } = resp
                if (data) {
                    let { length } = this.tArray
                    this.lineData.unshift(data.dataWeek)
                    if (length >= 2) {
                        this.lineData.unshift(data.dataDay)
                        if (length > 2) {
                            this.lineData.unshift(data.dataHour)
                        }
                    }
                }
            })
        },
        // 热力图接口
        getMapData() {
            let obj = {
                taskId: this.taskId,
                areaId: this.areaId,
                time: this.heatTime
            }
            let total = {
                70010: 2000,
                70011: 2000,
                70012: 800
            }
            this.dataUrl = this.dataType ? 'focus/getHot2' : 'focus/getHot'
            ajax.post(this.dataUrl, obj).then(resp => {
                let { gps, xishu } = resp.data;
                if (xishu && xishu.length) {
                    // this.gpsMax = xishu[0];
                    this.gpsMax = this.Interface ? total[this.Interface] : xishu[0]
                }
                if (gps) {
                    this.dotData = []
                    gps.forEach(item => {
                        this.dotData.push({
                            lng: item.lon,
                            lat: item.lat,
                            count: item.counts
                        })
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        // 重点区域边界接口
        getMapBorder() {
            ajax.post('goalArea/cellCoordinatesQuery', { resourceId: this.areaId }).then(resp => {
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
            }).catch(err => {
                console.log(err)
            })
        },
        // 预警接口
        warnApi() {
            // this.isWarn = _.cloneDeep(arr)
            // let n = 0
            // let arr = []
            // ajax.post('keyArea/warn').then(resp => {
            //     let { data } = resp
            //     arr[0] = data
            //     n++
            //     if (n === 4) {
            //         this.warnBool = _.cloneDeep(arr)
            //     }
            // }).catch(err => {
            //     n++
            //     if (n === 4) {
            //         this.warnBool = _.cloneDeep(arr)
            //     }
            //     console.log(err)
            // })
            // ajax.post('keyArea/warn').then(resp => {
            //     let { data } = resp
            //     arr[1] = data
            //     n++
            //     if (n === 4) {
            //         this.warnBool = _.cloneDeep(arr)
            //     }
            // }).catch(err => {
            //     n++
            //     if (n === 4) {
            //         this.warnBool = _.cloneDeep(arr)
            //     }
            //     console.log(err)
            // })
            // ajax.post('keyArea/warn').then(resp => {
            //     let { data } = resp
            //     arr[2] = data
            //     n++
            //     if (n === 4) {
            //         this.warnBool = _.cloneDeep(arr)
            //     }
            // }).catch(err => {
            //     n++
            //     if (n === 4) {
            //         this.warnBool = _.cloneDeep(arr)
            //     }
            //     console.log(err)
            // })
            // ajax.post('keyArea/warn').then(() => {
            //     arr[3] = '0'
            //     n++
            //     if (n === 4) {
            //         this.warnBool = _.cloneDeep(arr)
            //     }
            // }).catch(err => {
            //     n++
            //     if (n === 4) {
            //         this.warnBool = _.cloneDeep(arr)
            //     }
            //     console.log(err)
            // })
            // ajax.post('keyArea/warn').then(() => {
            //     let data = Math.random() > 0.5 ? '0' : '1'
            //     this.isWarn0 = data
            // }).catch(err => {
            //     console.log(err)
            // })
            // ajax.post('keyArea/warn').then(() => {
            //     let data = Math.random() > 0.5 ? '0' : '1'
            //     this.isWarn1 = data
            // }).catch(err => {
            //     console.log(err)
            // })
            // ajax.post('keyArea/warn').then(() => {
            //     let data = Math.random() > 0.5 ? '0' : '1'
            //     this.isWarn2 = data
            // }).catch(err => {
            //     console.log(err)
            // })
            // ajax.post('keyArea/warn').then(() => {
            //     let data = Math.random() > 0.5 ? '0' : '1'
            //     this.isWarn3 = data
            // }).catch(err => {
            //     console.log(err)
            // })

            ajax.post('http://15.15.11.129:8088/DwMan/getAlarmInfo', { 'ZDQYID': '01' }).then(resp => {
                let { data } = resp
                this.isWarn0 = data.ALARMINFO
            }).catch(err => {
                console.log(err)
            })
            ajax.post('http://15.15.11.129:8088/DwMan/getAlarmInfo', { 'ZDQYID': '02' }).then(resp => {
                let { data } = resp
                this.isWarn1 = data.ALARMINFO
            }).catch(err => {
                console.log(err)
            })
            let formdata3 = new FormData();
            formdata3.append('ZDQYID', '03');
            ajax.post('http://15.15.11.129:8088/DwMan/getAlarmInfo', { 'ZDQYID': '03' }).then(resp => {
                let { data } = resp
                this.isWarn2 = data.ALARMINFO
            }).catch(err => {
                console.log(err)
            })
            ajax.post('http://15.15.11.129:8088/DwMan/getAlarmInfo', { 'ZDQYID': '04' }).then(resp => {
                let { data } = resp
                this.isWarn3 = data.ALARMINFO
            }).catch(err => {
                console.log(err)
            })
        },
        // -----------------------------------接口方法end-----------------------------------
        /**
        * 轮询左侧人员数据、柱状图数据、折线图数据、gps热力图数据
        * @param {isTurnOn} 表示是否打开定时器 [true 为打开，false 为关闭]
        * */
        rollPoling (isTurnOn) {
            if (isTurnOn && !this.disClick) {
                this.RHide()
                this.popHide()
                this.poling2 = setInterval(() => {
                    this.getNumData()
                    if (this.jzShow) this.warnApi()
                }, 30000)
                this.poling1 = setInterval(() => {
                    this.getNumData()
                    this.getMapData()
                }, 300000)
            } else {
                // clearInterval(this.poling)
                clearInterval(this.poling1)
                clearInterval(this.poling2)
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
        /**
         * 修改柱图滚动条高度
         * @param {height} 滚动条距容器顶部高度
         */
        changBarScorll (height) {
            $('#leftBar .ga-frame__content').animate({ scrollTop: height }, 500);
        },
        // 弹出三级柱图显示
        popShow () {
            this.$refs.pop.style.display = 'block'
            if (this.ifRShow) {
                setTimeout(() => {
                    this.$refs.pop.style.width = '0'
                }, 100)
            }
        },
        // 弹出三级柱图隐藏
        popHide () {
            this.$refs.pop.style.width = '0'
            // 动画效果为500ms，所以延迟500ms之后再使其消失
            setTimeout(() => {
                this.$refs.pop.style.display = 'none'
            }, 500)
        },
        // 右侧线图弹窗隐藏
        RHide () {
            this.ifRShow = false
            if (this.$refs.lineDialog) {
                this.$refs.lineDialog.closeFrame()
            }
        },
        // 右侧线图弹窗显示
        RShow () {
            this.ifRShow = true
        },
        // ------------------------------------无用代码--------------------------
        exportExl() {
            this.peopleExportUrl = `${exportUrl}/focus/exportExl/${this.taskId}/${this.areaId}/${this.areaName}`
            let iframe = document.createElement('iframe')
            iframe.style.display = 'none'
            iframe.src = this.peopleExportUrl
            iframe.onload = function () {
                document.body.removeChild(iframe)
            }
            document.body.appendChild(iframe)
        },
        /**
         * 加载左下人员列表数据
         * @param {personType} 人员类型 [实时省外 11，实时境外 12，实时重点人 13]
         */
        loadPersons () {
            this.tableOpt.data = []
            this.tableOpt.listLoading = true
            let currentPage = this.tableOpt.pageOpt.currentPage;
            let pageSize = this.tableOpt.pageOpt.pageSize;
            ajax.post('keyArea/getKeyPerson', {
                taskId: this.taskId,
                areaId: this.areaId,
                // timestamp: sessionStorage.getItem('gTime'),
                page: currentPage,
                rows: pageSize
            }).then(resp => {
                if (resp.data) {
                    this.tableOpt.data = resp.data;
                }
                this.tableOpt.listLoading = false
            }).catch(() => {
                this.tableOpt.listLoading = false
            })
        },
        // 获取区域监测任务 起始终止时间
        getTaskTime() {
            ajax.post('keyArea/getTimeInterval', {
                areaId: this.areaId,
                taskId: this.taskId
            }).then(resp => {
                let { data } = resp
                if (data) {
                    let { beginTime, endTime } = data
                    this.taskTime = {
                        start: new Date(beginTime),
                        end: new Date(endTime)
                    }
                }
            })
            .catch(err => {
                console.log('监测任务起止时间获取失败：', err)
            })
        }
    },
    watch: {
        Interface(newVal) {
            this.rollPoling(false)
            // 热地图数据
            this.dotData = []
            this.getData(newVal)
            this.initFunc()
            this.clearHandler()
            this.getMapData()
            this.rollPoling()
        },
        dataType() {
            console.log('index')
            this.getMapData()
        }
    },
    // 销毁之前先清空本地存储的taskId和areaId,并断开socket连接
    beforeDestroy () {
        // 关闭轮询
        this.rollPoling(false)
    },
    components: {
        dataPart,
        numberFlip,
        frameCom,
        areaBars,
        curveBars,
        tableCom,
        heatMap,
        FormComp,
        tabsCom,
        LJDialog,
        timeLines,
        containerBorder
    }
}
</script>

<style scoped>
:root {
    --leftWidth: 23%;
    --leftTopHeight: 350px;
    --leftTopBottom: 12px;
    --timelineHeight: 40px;
}
@component-namespace ga {
      @b keyAreaMonitor {
            /* height: calc(100% - 50px); */
            height:100%;
            position: relative;
            overflow: hidden;
            font-size: 12px;
            color: #fff;
            @e contentWrap{
                height:100%;
            }
            @e timelineWrap{
                width: 100%;
                height: 40px;
                padding-left: 30px;
                position: absolute;
                bottom: -6px;
                right: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(33,54,82,1);
            }
          @e leftWrap{
                width:var(--leftWidth);
                height:100%;
                font-size:14px;
                padding: 0 12px 0 8px;
                margin-top:1px;
                background: rgba(33,54,82,1)
          }
          @e leftTopWrap{
                height: calc(var(--leftTopHeight) - var(--leftTopBottom));
                margin-bottom: var(--leftTopBottom);
            }
          @e flipWrap{
              height: calc(var(--leftTopHeight) - var(--leftTopBottom) - 18px);
              overflow: hidden;
          }
          @e numWrap{
                height: 76px;
          }
          @e numTitle{
                height: 26px;
                line-height: 26px;
                font-weight: bold;
          }
          @e userConstitute{
              margin: 6px 0;
          }
          @e userTabWrap{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
          }
          @e userTab{
                text-align: center;
                width:30%;
                margin: 8px 0;
                p:first-child{
                    margin-bottom:10px;
                }
          }
          @e userPointTab{
              cursor: pointer;
              p:first-child{
                border-bottom: 1px solid #eee;
              }
          }
          @e leftBar{
                height: calc(100% - var(--leftTopHeight) - var(--timelineHeight));
          }
          @e popWrap{
                position: absolute;
                left: var(--leftWidth);
                top: var(--leftTopHeight);
                height: calc(100% - var(--leftTopHeight) - var(--timelineHeight));
                margin-left: 2px;
                display: none;
                overflow: hidden;
                z-index: 2;
                transition: width 0.5s;
          }
          @e zdrTable{
              margin-top:2px;
          }
          @e middleWrap{
                position: absolute;
                right: 0;
                top:0;
                height: 100%;
                width: calc(100% - var(--leftWidth));
          }
          @e LjWrap{
                font-size: 14px;
                padding: 6px 12px;
                border-radius: 4px;
                width:var(--leftWidth);
                position:absolute;
                left: var(--leftWidth);
                top:2px;
                margin-left: 2px;
                background:rgba(33,54,82,1);;
          }
          @e LJTitleColor{
              color:rgba(7,223,174,1);
          }
          @e LHTabColor{
              color: rgba(130,194,213,1);
          }
          @e LHTabLcdd{
              font-size: 20px;
              font-family: 'lcdd';
          }
          @e rightWrap{
                position: absolute;
                top: 0;
                right: -27%;
                width: 26%;
                transition: all 0.5s ease-in-out 0s;
                z-index: 2;
                @m show {
                    right: 0;
                }
          }
          @e expBtn{
                cursor: pointer;
                position: absolute;
                top: 4px;
                right: 20px;
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
            @e lineClass{
                height: 3px;
                margin: 4px 0;
                width:100%;
              background-image: linear-gradient(-270deg, rgba(229, 193, 0,0.1) 0%, rgba(229, 193, 0,0.8) 49%, rgba(229, 193, 0,0.1) 100%);
            }
          @e pointer{
              cursor: pointer;
          }
          @e disabled{
              color: #ccc;
              cursor: not-allowed;
          }
      }
}
</style>
