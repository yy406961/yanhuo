<template>
    <div class='ga-SWOTANLS__content' ref="abc">
        <div class='ga-SWOTANLS__map'>
            <!-- <originMap></originMap> -->
            <el-row type="flex">
                <el-col :span="6" style="textAlign:right;" class="ga-SWOTANLS__toolBar">
                    <el-button type="primary"
                        @click="loadMap('2')"
                        class='ga-button__realTime' :class="{'actived': mapType !== 'world'}">
                        热点图
                    </el-button><el-button type="primary" 
                        @click="loadMap('1')"
                        class='ga-button__startBtn' :class="{'actived': mapType === 'world'}" 
                        :disabled="orgClick">来源分布</el-button>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg ga-SWOTANLS__mapWrap"
                    justify="center">
                <!--<originMap v-if='mapType === "world"' ref="map"-->
                            <!--:mapType="mapType"-->
                           <!--:renderData="originMapData"-->
                           <!--:renderType="renderType"-->
                            <!--@areaClick="areaClick"-->
                           <!--:size="mapStyle"></originMap>-->
                <pointMap v-if='mapType === "world"'  ref="chinaRef" :option="worldMapOpt"
                          :renderData="originMapData"
                          @areaClick="areaClick"></pointMap>
                <!--<heatMap v-if='mapType !== "world"' ref="map"-->
                         <!--:mapType="mapType"-->
                         <!--:renderData="heatMapData"-->
                         <!--:max='heatMax'-->
                         <!--@heatAreaClick="heatAreaClick"-->
                         <!--:size="mapStyle"></heatMap>-->
                <mapLight v-if='mapType !== "world"'
                          ref="map"
                          :mapType="mapType"
                          :renderData="heatMapData"
                          @areaClick="heatAreaClick"
                          :size="mapStyle"
                ></mapLight>
            </el-row>
        </div>
        <!--数字牌-->
        <div class='ga-SWOTANLS__count'>
            <p class='ga-SWOTANLS__titleWrap'>{{actualTitle}}</p>
            <div class='ga-SWOTANLS__numWrap' @click='numClick($event)'>
                <numberFlip :options="opt" :renderData="numFlipData" class='ga-SWOTANLS__number'></numberFlip>
            </div>
            <!--<p v-if="globalKeys.gMapKey === 'ningxia'" class='ga-SWOTANLS__dayNum'>近24小时到达用户-->
                <!--<span>{{dayNum}}</span>-->
            <!--</p>-->
        </div>
        <!--第一个柱图-->
        <div id='ga-SWOTANLS__bars' class="ga-SWOTANLS__barsChange">
            <!--<div class="ga-SWOTANLS__barTabs">-->
                <!--<div class="ga-SWOTANLS__barTabs&#45;&#45;header">-->
                    <!--<span :class="['ga-SWOTANLS__tabs', tabSwitch == 'line' ? 'bottomLine' : '']" @click="allBars()">所有国家（或地区）</span>-->
                    <!--<span style="margin-left: 50px" :class="['ga-SWOTANLS__tabs', tabSwitch == 'table' ? 'bottomLine' : '']" @click="importBars()">重点国家（或地区）</span>-->
                <!--</div>-->
                <!--<div class="ga-SWOTANLS__barTabs&#45;&#45;contents">-->
                    <!--<areaBars :option='areaOpt' :areaIndex="areaIndex"></areaBars>-->
                <!--</div>-->
                <!--<span class="ga-SWOTANLS__barTabs&#45;&#45;leftTop"></span>-->
                <!--<span class="ga-SWOTANLS__barTabs&#45;&#45;rightTop"></span>-->
                <!--<span class="ga-SWOTANLS__barTabs&#45;&#45;leftBottom"></span>-->
                <!--<span class="ga-SWOTANLS__barTabs&#45;&#45;rightBottom"></span>-->
                <!--<span class="ga-SWOTANLS__barTabs&#45;&#45;left"></span>-->
                <!--<span class="ga-SWOTANLS__barTabs&#45;&#45;right"></span>-->
                <!--<span class="ga-SWOTANLS__barTabs&#45;&#45;top"></span>-->
                <!--<span class="ga-SWOTANLS__barTabs&#45;&#45;bottom"></span>-->
            <!--</div>-->
            <frameCom>
                <div class="ga-SWOTANLS__barTabs--header">
                    <span :class="['ga-SWOTANLS__tabs', tabSwitch == 'line' ? 'bottomLine' : '']" @click="allBars()">所有国家（或地区）</span>
                    <span style="margin-left: 50px" :class="['ga-SWOTANLS__tabs', tabSwitch == 'table' ? 'bottomLine' : '']" @click="importBars()">重点国家（或地区）</span>
                </div>
                <div class="ga-SWOTANLS__barTabs--contents">
                    <areaBars :option='areaOpt' :areaIndex="areaIndex"></areaBars>
                </div>
            </frameCom>
        </div>
        <!--第二个柱图-->
        <div class='ga-SWOTANLS__popWrap' ref='pop'>
            <frameCom :title='secBarsTitle'>
                <div class='ga-SWOTANLS__popHide' @click='popHide'> </div>
                <curveBars :option="popOpt"></curveBars>
            </frameCom>
        </div>
        <!--右侧柱图-->
        <div :class='[{"ga-SWOTANLS__lines--show": ifRShow}, "ga-SWOTANLS__lines"]'
             ref='lines'>
            <!-- <tabsCom :option="tableOpt" :lineTitle="triBarsTitle" :tableTitle="peopleList" :renderData="lineData" :area="area1" @closeTabs="RHide"></tabsCom> -->
            <div class="ga-SWOTANLS__rightTabs">
                <!--<div class="ga-SWOTANLS__rightTabs&#45;&#45;header">-->
                    <!--<div class='ga-SWOTANLS__rightTabs&#45;&#45;popHide' @click='RHide'> </div>-->
                    <!--<span v-for="(item, index) in rightTitleData"-->
                          <!--:class="rightTabsFlag === index ? 'ga-SWOTANLS__rightTabs&#45;&#45;bottomLine' : ''"-->
                          <!--:key="item.id"-->
                          <!--@click="rightTitleClick(index)">{{item}}</span>-->
                <!--</div>-->
                <!--&lt;!&ndash;<span class='ga-SWOTANLS__rightTabs&#45;&#45;title'>{{area1}}在线用户在{{areaName}}总体变化趋势</span>&ndash;&gt;-->
                <!--<span class='ga-SWOTANLS__rightTabs&#45;&#45;title'>{{area1}}在线用户总体变化趋势</span>-->
                <!--<histogram :option="histogramOpt" :renderData="histogramData"></histogram>-->
                <!--<span class="ga-SWOTANLS__rightTabs&#45;&#45;leftTop"></span>-->
                <!--<span class="ga-SWOTANLS__rightTabs&#45;&#45;rightTop"></span>-->
                <!--<span class="ga-SWOTANLS__rightTabs&#45;&#45;leftBottom"></span>-->
                <!--<span class="ga-SWOTANLS__rightTabs&#45;&#45;rightBottom"></span>-->
                <!--<span class="ga-SWOTANLS__rightTabs&#45;&#45;left"></span>-->
                <!--<span class="ga-SWOTANLS__rightTabs&#45;&#45;right"></span>-->
                <!--<span class="ga-SWOTANLS__rightTabs&#45;&#45;top"></span>-->
                <!--<span class="ga-SWOTANLS__rightTabs&#45;&#45;bottom"></span>-->

                <frameCom>
                    <div class="ga-SWOTANLS__rightTabs--header">
                        <div class='ga-SWOTANLS__rightTabs--popHide' @click='RHide'> </div>
                        <span v-for="(item, index) in rightTitleData"
                              :class="rightTabsFlag === index ? 'ga-SWOTANLS__rightTabs--bottomLine' : ''"
                              :key="item.id"
                              @click="rightTitleClick(index)">{{item}}</span>
                    </div>
                    <!--<span class='ga-SWOTANLS__rightTabs&#45;&#45;title'>{{area1}}在线用户在{{areaName}}总体变化趋势</span>-->
                    <div class='ga-SWOTANLS__rightTabs--title'>{{area1}}在线用户总体变化趋势</div>
                    <histogram class='ga-SWOTANLS__rightTabs--line' :option="histogramOpt" :renderData="histogramData"></histogram>
                </frameCom>
            </div>
        </div>
        <!--时间轴-->
        <div class='ga-SWOTANLS__timeline'>
            <el-button :type="realType" @click="clearHandler" class='ga-button__realTime' :class="{'actived': btnSts === 'real'}">实 时</el-button>
            <el-button type="primary" @click="startHandler" class='ga-button__startBtn' :class="{'actived': btnSts === 'playback'}">{{startBtn}}</el-button>
            <timeLines :options="timeLineOpt" @change="changeTimeline" ref="time"></timeLines>
        </div>
    </div>
</template>

<script>
// import originMap from 'views/situationAnalysis/originMap'
import originMap from 'components/monitor/originMap'
// import heatMap from 'components/monitor/heatMap'
import mapLight from 'components/Chart/newHome/maplight'
import allAreaTitles from 'utils/areaTitles'
import { mapGetters } from 'vuex'
import numberFlip from 'components/monitor/numberFlip'
import areaBars from 'components/monitor/areaBars'
import curveBars from 'components/monitor/curveBars'
import frameCom from 'components/monitor/frame'
import timeLines from 'components/monitor/timeLines'
import histogram from 'components/monitor/histogram'
import pointMap from 'components/Chart/newHome/pointMap'
import Io from 'utils/websocket'
import moment from 'moment'
import { overall, come, snap, heat, source, cylinderOverseas } from 'api/situationAnalysis/outProvincePage'
const URL = process.env.NODE_ENV === 'production'
    ? '' : 'ws://192.168.3.183:8080/policeBusiness'
// const exportUrl = process.env.NODE_ENV === 'production'
//    ? '/policeBusiness' : 'http://192.168.3.183:8080/policeBusiness'
const ALLLABEL = '境外'
const HISLABEL = '回 放'
const CONLABEL = '继 续'
const PAUSELABEL = '暂 停'
const AREATYPE = 3
export default {
    data () {
        let me = this
        return {
            // 实时按钮的type
            realType: 'primary',
            importCode: '',
            importCountry: '',
            barClicked: '',
            rightBarType: '',
            cityname: '', // 热力图下钻请求市名
            rightTabsFlag: 1, // 右侧4个tab  切换
            rightTitleData: ['1小时', '24小时', '7天', '一个月'],
            histogramData: [], // 柱图数据
            areaIndex: '', // 点击世界地图 联动当前地区的序号
            histogramOpt: {
                width: '100%',
                height: '86%',
                timeType: 1,
                props: {
                    gridBottom: 30,
                    gridTop: 15,
                    gridLeft: 40,
                    gridRight: 20
                }
            },
            tabSwitch: 'line', // 第一个柱图 所有、重点国家切换
            ifRShow: false,
            disClick: false,
            firUpdate: true,
            startBtn: HISLABEL,
            orgClick: false, // 来源图按钮是否禁用，true为禁用，false为启用
            actualTitle: '实时在线用户',
            firBarsTitle: '境外人员按国家（地区）排行',
            areacode: '',
            area1: '',
            area2: '',
            area3: '',
            areaName: '',
            homecode: '',
            cityCode: '',
            codeB: '',
            peopleType: '',
            dayNum: 0,
            start: '',
            end: '',
            heatMapData: [],
            heatMax: 0,
            originMapData: [],
            mapType: 'china',
            renderType: '1',
            socket: new Io(),
            // 第一个柱图数据
            areaOpt: {
                secondShow: true,
                data: [],
                click: true, // 能否点击展开，TRUE为能，FALSE不能
                barClick (item, index) {
                    me.barClicked = 1
                    let jump = index * 30;
                    me.changBarScorll(jump)
                    me.RShow()
                    me.popHide()
                    me.area1 = item.area
                    me.areacode = item.area
                    me.area2 = me.globalKeys.gTitle
                    me.area3 = me.globalKeys.gTitle
                    me.loadBarsJson(10, '', me.areacode)
                    me.homecode = item.area
                    this.rightBarType = 12
                    me.loadLinesJson(12, 2, '', me.homecode)
//                    me.loadPeopleList(me.peopleType, me.homecode, '')
//                    me.popHide()
                },
                secondBarClick (item) {
                    me.barClicked = 2
                    me.RShow()
//                    me.area1 = item.area
                    me.area2 = item.area;
                    me.areaName = item.area;
//                    me.area2 = me.globalKeys.gTitle;
//                    me.area3 = me.globalKeys.gTitle;
//                    me.areacode = item.area
                    me.cityCode = item.areacode
//                    me.popOpt.data = item.data
                    me.popShow()
                    me.loadBarsJsonPop(11, me.cityCode, me.areacode)
                    this.rightBarType = 13
                    me.loadLinesJson(13, 2, me.cityCode, me.homecode)
//                    if (item.data) {
//                        me.popOpt.data = item.data
//                        me.popShow()
//                    } else {
//                        me.popHide()
//                    }
                }
            },
            // 第一个柱图右侧柱图数据
            popOpt: {
                secondShow: true,
                data: [],
                barClick (item) {
                    me.RShow();
                    me.area3 = item.area
                    me.areaName = item.area
                    me.codeB = item.areacode
                    this.rightBarType = 14
                    me.loadLinesJson(14, 2, me.codeB, me.areacode)
//                    if (me.barClicked === 1) {
//                        me.loadLinesJson(13, 2, me.cityCode, me.homecode)
//                    } else if (me.barClicked === 2) {
//                        me.loadLinesJson(14, 2, me.codeB, me.areacode)
//                    }
                }
            },
            btnSts: 'real',
            lastHeadMapName: '',
            timeLineOpt: {
                click: false, // 能否拖动时间轴，TRUE为能，FALSE不能
                width: ($(window).width() - 180),
                type: 'halfhour'
            },
            opt: {
                height: 60
            },
            numFlipData: [
                { value: 16857222 }
            ],
            lineData: [],
            panesData: [],
//            tabsOpt: {
//                exportUrl: `${exportUrl}/situation/jwDaochu`,
//                tableOpt: {
//                    column: [
//                        { name: '序号', value: 'index', width: 60, align: 'center' },
//                        { name: '手机号', value: 'msisdn', width: 120, align: 'center' },
//                        { name: '所属国家/区域', value: 'address', width: 100, align: 'center' },
//                        { name: '到达时间', value: 'time', width: 150, align: 'center' },
//                        { name: '所在地', value: 'uli', align: 'center' }
//                    ],
//                    pagination: true,
//                    pageOpt: {
//                        currentPage: 1,
//                        pageSizes: [10, 20, 30],
//                        pageSize: 10
//                    },
//                    data: []
//                },
//                comSize: {
//                    height: 350
//                }
//            },
            currentView: 0
        }
    },
    computed: {
        areaTitles () {
            return allAreaTitles[this.globalKeys['gMapKey']]
        },
        ...mapGetters({
            'vsHeight': 'global/visualHeight',
            'globalKeys': 'global/globalKeys'
        }),
        secBarsTitle () {
            return `${this.area1}用户在${this.area2}区域分布`
        },
        triBarsTitle () {
            return `${this.area1}人员在${this.area3}总体变化趋势`
        },
//        peopleList () {
//            return `${this.area1}人员在${this.area3}人员列表`
//        },
        mapStyle () {
            return {
                width: '100%',
                height: this.vsHeight - this.vsHeight * 0.07 - 87 + 'px'
            }
        },
        worldMapOpt() {
            return {
                width: '100%',
                height: this.vsHeight - this.vsHeight * 0.07 - 87 + 'px',
                props: {
                    gridBottom: 0,
                    gridTop: 0,
                    gridLeft: 0,
                    gridRight: 0,
                    mapType: 'world'
                }
            }
        },
        postTime () {
            // 当状态为暂停态，即开始按钮变为继续的时候，或者是回放态，即禁止点击的时候，返回时间轴的时间，否则返回当前时间
            if (this.startBtn === CONLABEL || this.disClick === true) {
                return this.start
            } else {
//                return moment().format('YYYY-MM-DD HH:mm:ss')
                return 'now'
            }
        }
    },
    // beforeMount () {
    //     this.setLinesHeight()
    // },
    mounted () {
        // 近24小时到达人员数据
//        this.loadComeNum()
        this.socketFun()
//        this.loadBarsJson(9);
    },
    beforeDestroy () {
        this.socket.disconnect();
    },
    methods: {
//        右侧柱图tab切换
        rightTitleClick (index) {
            this.rightTabsFlag = index
//            this.timeType = this.rightTabsFlag + 1
            if (this.barClicked === 1) {
                this.rightBarType = 12
                this.loadLinesJson(12, this.rightBarType, '', this.homecode)
            } else if (this.barClicked === 2) {
                this.rightBarType = 13
                this.loadLinesJson(13, this.rightBarType, this.cityCode, this.homecode)
            } else if (this.barClicked === '') {
                this.rightBarType = 11
                this.loadLinesJson(11)
            }
//            this.histogramData = this.lineData[index]
        },
//        所有国家
        allBars () {
            if (this.disClick) {
                return
            }
            this.importCountry = 1
            this.tabSwitch = 'line';
            this.loadBarsJson(9);
            this.popHide()
//            this.lineShow = true
//            this.$emit('lineClick')
        },
//        重点国家
        importBars () {
            if (this.disClick) {
                return
            }
            this.importCountry = 2
            this.tabSwitch = 'table';
            this.loadBarsJson(12);
            this.popHide()
//            this.lineShow = false
//            this.$emit('tableClick')
        },
//        热力图、地图点击事件
        heatAreaClick (params) {
            if (this.lastHeadMapName === '' || this.lastHeadMapName !== params.name) {
                if (this.btnSts === 'playback') {
                    return
                }
                // this.mapType = null
                // this.$nextTick(() => {
                //     this.mapType = this.areaTitles[params.name]
                // })
//            this.cityname = params.name
                this.loadHeatJson(params.name)
                this.RHide()
                this.popHide()
                this.lastHeadMapName = params.name
            } else {
                this.loadMap('2')
                this.lastHeadMapName = ''
            }
        },
        areaClick (params) {
            for (let i = 0; i < this.areaOpt.data.length; i++) {
                if (this.areaOpt.data[i].area === params.name) {
                    this.areaIndex = i
                    break
                }
            }
//            if (this.importCountry === 2) {
//                this.importCode = params.name
//                this.tabSwitch = 'line';
//                this.loadBarsJson(10, '', this.importCode)
//            }
//            this.RShow()
            this.popHide()
        },
        // websocket
        socketFun () {
            this.socket.connect(`${URL}/websocket/situation/${AREATYPE}`);
            this.socket.on('open', () => {
            })
            this.socket.on('message', () => {
                // let data = this.socket.JSONparse(resp.data);
                // if (data) {
                this.RHide()
                this.popHide()
                this.areaOpt.secondShow = false
//                this.popOpt.secondShow = false
                this.loadActualNum()
                if (this.importCountry === 2) {
                    this.loadBarsJson(12)
                } else {
                    this.loadBarsJson(9)
                }
//                this.loadBarsJson(9)
                if (this.mapType === 'world') {
                    this.loadMap('1')
                } else {
                    this.loadMap('2')
                }
                // }

//                this.numFlipData = [{ value: data.jwcount || 0 }]
//                this.areaOpt.data = data.data
                // 来源图数据
//                let originData = []
//                data.data.forEach(item => {
//                    originData.push({
//                        'source': item.area,
//                        'target': this.globalKeys.gTitle,
//                        'count': item.count
//                    })
//                })
//                this.originMapData = originData
                // 热点图数据
//                let heatData = _.cloneDeep(data.hot)
//                heatData.forEach(item => {
//                    item.count = item.jwcount
//                })
//                this.heatMapData = heatData
//                this.heatMax = data.max
            });
        },
        // 右侧折线图隐藏
        RHide () {
            this.ifRShow = false
        },
        // 右侧折线图显示
        RShow () {
            this.ifRShow = true
        },
        // 弹出三级柱图显示
        popShow () {
            this.$refs.pop.style.display = 'block'
            // this.oneTimer = setTimeout(() => {
            //     this.$refs.pop.style.width = '25%'
            // }, 100)
            if (this.ifRShow) {
                this.oneTimer = setTimeout(() => {
                    this.$refs.pop.style.width = '25%'
                }, 100)
            }
        },
        // 弹出三级柱图隐藏
        popHide () {
            this.$refs.pop.style.width = '0'
            this.oneTimer = setTimeout(() => {
                this.$refs.pop.style.display = 'none'
            }, 500)
        },
        // 修改柱图滚动条
        changBarScorll (height) {
            $('.ga-SWOTANLS__barTabs--contents').animate({ scrollTop: height }, 500);
        },
        // 设置折线图高度
        // setLinesHeight () {
        //     this.lineOpt.height = (this.vsHeight - 31 - 47) / 3 - 10
        // },
        // 总人数面板点击事件
        numClick () {
            if (!this.disClick) {
                this.area1 = ALLLABEL
                this.area3 = this.globalKeys.gTitle
                this.areaName = this.globalKeys.gTitle
                this.mapType = this.globalKeys.gMapKey
                this.barClicked = ''
                this.loadLinesJson(11)
                this.areaOpt.secondShow = false
                this.RShow()
                this.popHide()
                this.loadHeatJson()
            }
        },
        // 时间轴开始跳动修改时间，接口请求数据
        changeTimeline (val) {
            this.start = val.startTime
            this.end = val.endTime
            // 总人数面板数据
            this.loadActualNum()
            // 3级柱图数据
//            this.loadBarsJson(9)
            if (this.importCountry === 2) {
                this.loadBarsJson(12)
            } else {
                this.loadBarsJson(9)
            }
            // 热力图
            if (!this.firUpdate) {
                this.loadMap('2')
            } else {
                this.loadMap('1')
                this.firUpdate = false
            }
            // Bar回弹到顶部
            this.changBarScorll(0)
        },
        // 实时键
        clearHandler () {
            this.realType = 'primary'
            this.btnSts = 'real'
            this.startBtn = HISLABEL
            this.orgClick = false; // 来源图按钮是否禁用，true为禁用，false为启用
            this.disClick = false
            this.areaOpt.click = true
            this.timeLineOpt.click = false
            this.start = ''
            this.$refs.time.clear()
            // 重新请求数据
            this.loadActualNum()
            this.tabSwitch = 'line'
            this.loadBarsJson(9)
            this.loadMap(this.renderType)
            this.changBarScorll(0)
            // 重新连接websocket
            this.socketFun()
        },
        // 回放键
        startHandler () {
            // 停止websocket
            this.socket.disconnect();
//            this.btnSts = 'playback';
            this.timeLineOpt.click = true;
            this.orgClick = true; // 来源图按钮是否禁用，true为禁用，false为启用
//            this.tabSwitch = 'line'
//            this.loadBarsJson(9)
            if (this.disClick) {
                this.realType = 'primary'
                this.btnSts = 'playback'
                // 当前状态为正在回放，显示为暂停键，点击暂停键之后变成继续键
                this.startBtn = CONLABEL
                this.disClick = false
                this.areaOpt.click = true
                this.$refs.time.pause()
            } else {
                // 当前状态为未开始或暂停态，显示为继续键，点击继续键变成暂停键
                this.realType = 'default'
                this.btnSts = 'playback';
                this.startBtn = PAUSELABEL
                this.disClick = true
                this.areaOpt.click = false
                this.RHide()
                this.popHide()
                this.$refs.time.start()
            }
        },
        loadMap (type) {
            this.renderType = type
            this.$nextTick(() => {
                if (type === '1') {
                    this.mapType = 'world'
                    this.loadOriginJson()
                } else if (type === '2') {
                    this.popHide()
                    this.RHide()
                    this.areaOpt.secondShow = false
                    this.mapType = this.globalKeys.gMapKey
                    this.loadHeatJson()
                }
            })
        },
        // 请求人员列表
//        async loadPeopleList (type, codeA, codeB) {
//            let resp = await jwPerson({
//                type: type,
//                codeA: codeA,
//                codeB: codeB,
//                page: this.tabsOpt.tableOpt.pageOpt.currentPage,
//                rows: this.tabsOpt.tableOpt.pageOpt.pageSize
//            })
//            if (resp) {
//                resp.rows.forEach(item => {
//                    item.index += item.index
//                })
//                this.tabsOpt.tableOpt.data = resp.rows
//            }
//        },
        // 世界地图
        async loadOriginJson () {
            let resp = await source({ type: AREATYPE });
            this.originMapData = resp.data
        },
        // 热力图
        async loadHeatJson (cityname) {
            this.heatMapData = []
            let resp = await heat({
                type: AREATYPE,
                timestamp: this.postTime === 'now' ? null : this.postTime,
                cityname: cityname
            });
            let { data } = resp
            // if (data) {
            //     this.heatMax = data.max
            //     setTimeout(() => {
            //         this.heatMapData = data.data
            //     }, 300)
            // }
            if (data.data) {
                this.heatMax = data.max
                let lenght = data.data.length
                data.data.forEach((item, index) => {
                    if (index < lenght * 0.2) {
                        item.rank = 3
                    } else if (index >= lenght * 0.2 && index <= lenght * 0.6) {
                        item.rank = 2
                    } else {
                        item.rank = 1
                    }
                })
                this.heatMapData = data.data
            }
        },
        // 数字牌
        async loadActualNum () {
            let resp = await overall({
                timestamp: this.postTime === 'now' ? moment().format('YYYY-MM-DD HH:mm:ss') : this.postTime
            })
            this.numFlipData = [{ value: resp.data.jwcount || 0 }]
        },
        // 24小时在线人数(没用)
        async loadComeNum () {
            let resp = await come({ type: AREATYPE })
            this.dayNum = resp.count
        },
        // 第一个柱图
        async loadBarsJson (type, area, areacode) {
            let resp = await cylinderOverseas({
                timestamp: this.postTime === 'now' ? moment().format('YYYY-MM-DD HH:mm:ss') : this.postTime,
                type: type,
                areacode: areacode,
                area: area
            })
            let { data } = resp;
            if (type === 9 && data) {
                data.forEach(item => {
                    item.data = []
                })
                this.areaOpt.data = data;
            } else if (type === 12 && data) {
                data.forEach(item => {
                    item.data = []
                })
                this.areaOpt.data = data;
            } else if (data && data.length) {
                this.areaOpt.data.forEach(item => {
                    if (item.area === this.areacode) {
                        item.data = data
                    }
                })
            } else if (data.length === 0) {
                this.popHide()
            }
        },
        // 第一个右侧的柱图
        async loadBarsJsonPop (type, area, areacode) {
            let resp = await cylinderOverseas({
                timestamp: this.postTime === 'now' ? moment().format('YYYY-MM-DD HH:mm:ss') : this.postTime,
                type: type,
                areacode: areacode,
                area: area
            })
            let { data } = resp;
            this.popOpt.data = data
//            if (type === 11 && data) {
//                this.popOpt.data.forEach(item => {
//                    if (item.area === this.areacode) {
//                        item.data = data
//                    }
//                })
//            }
        },
        // 右侧柱图
        async loadLinesJson (type, timeType, homecode, areacode) {
            let resp = await snap({
                type: type,  // 表示境外
                timeType: this.rightTabsFlag + 1,  // 小时 天 周 月
                homecode: homecode,  // 号码归属地
                areacode: areacode   // 号码所在地
            })
            let { data } = resp
            if (data) {
                this.histogramOpt.timeType = this.rightTabsFlag
                this.histogramData = data
//                this.rightTitleClick(this.rightTabsFlag)
            }
        }
    },
    components: {
        numberFlip,
        areaBars,
        curveBars,
        originMap,
        timeLines,
        frameCom,
        // heatMap,
        mapLight,
        histogram,
        pointMap
//        tabsCom,
//        tabsOverseas
    }
}
</script>

<style scoped>
/*::-webkit-scrollbar {*/
    /*width: 0px;*/
/*}*/

.ga-SWOTANLS__clearBtn.active:before {
    background: #1A498A;
}

.ga-SWOTANLS__clearBtn.active:after {
    background: #1A498A;
}

.ga-SWOTANLS__startBtn.active:before {
    background: #1A498A;
}

.ga-SWOTANLS__startBtn.active:after {
    background: #1A498A;
}

:root {
    --timeline: 30px;
    --titleHeigth: 30px;
    --countMargin: 10px;
    --leftWidth: 20%;
    --barTop: 100px;
}

.bottomLine::after {
    content: '';
    width: 110px;
    height: 2px;
    display: block;
    background: #4aa6dc;
    position: absolute;
    top: 28px;
}

@component-namespace ga {
    @b SWOTANLS {
        @e content {
            width: 100%;
            padding-left: 2%;
            /*height: calc(100% - 35px);*/
            height: 100%;
            position: relative;
            overflow: hidden;
            font-size: 12px;
            color: #fff;
        }
        @e toolBar{
            z-index:1;
            margin-top: 20PX;
            padding-right: 80px;
        }
        @e map {
            /* width: 85%; */
            width: calc(100% - var(--leftWidth) - 5%);
            right: 0;
            height: 100%;
            /* background: #fff; */
            position: absolute;
        }
        @e mapWrap {
            width: 100%;
            height: 100%;
            position: relative;
        }
        /*@e mapWrapHeat {*/
            /*position: relative;*/
            /*top: -192px;*/
        /*}*/
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
            /*padding-left: 10px;*/
            white-space: nowrap;
            color: #FF9D6B;
        }
        @e count {
            width: var(--leftWidth);
            height: calc(50% - var(--titleHeigth) - var(--countMargin));
            /*margin: 0 var(--countMargin);*/
            position: absolute;
            /* display: flex;
            flex-direction: column; */
        }
        /*@e dayNum {*/
            /*margin-top: 16px;*/
            /*font-size: 14px;*/
            /*padding-left: 10px;*/
            /*align-items: center;*/
            /*display: flex;*/
            /*!* justify-content: center; *!*/
            /*& span {*/
                /*color: #94c1ff;*/
                /*font-size: 24px;*/
                /*padding-left: 10px;*/
            /*}*/
        /*}*/
        @e number {
            width: 100%;
            height: 50px;
            position: relative;
            /* border-bottom: 1px solid #ccc; */
        }
        @e numWrap {
            cursor: pointer;
        }
        @e tabsTitle {
            position: relative;
            /*overflow: hidden;*/
            white-space: nowrap;
            font-size: 13px;
            color: #fff;
            height: 28px;
            background: linear-gradient(135deg, transparent 9px, #0B245F 0);
        }
        /*@e tabs {*/
            /*display: inline-block;*/
            /*width: 100px;*/
            /*height: 28px;*/
            /*line-height: 28px;*/
            /*text-align: center;*/
            /*cursor: pointer;*/
        /*}*/
        /*@e contents {*/
            /*overflow: auto;*/
            /*!*padding: 8px 5px;*!*/
            /*width: 100%;*/
            /*!*height: 100%;*!*/
            /*height: calc(100% - 35px);*/
            /*background: linear-gradient(-45deg, transparent 9px, rgba(0, 0, 0, 0.7) 0);*/
        /*}*/
        /*@e tabsTitle {
            margin: 10px 0;
        }*/
        @e bars {
            position: absolute;
            top: var(--barTop);
            width: 25%;
            height: calc(100% - var(--barTop) - var(--timeline) - 20px);
            /* font-size: 18px;
            overflow-y: scroll;
            overflow-x: hidden; */
        }
        @e barsChange {
            position: absolute;
            top: 100px;
            width: 25%;
            height: calc(100% - var(--barTop) - var(--timeline) - 20px);
        }
        @e lines {
            width: 30%;
            height: 80%;
            right: -31%;
            top: 0;
            -webkit-transition: all 0.5s ease-in-out 0s;
            -o-transition: all 0.5s ease-in-out 0s;
            transition: all 0.5s ease-in-out 0s;
            position: absolute;
            z-index: 1;
            background: rgba(0, 0, 0, 0.8);
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
            top: 97px;
            width: var(--leftWidth);
            display: none;
            overflow: hidden;
            height: calc(100% - var(--barTop) - var(--timeline) - 16px);
            left: 27%;
            margin-left: 10px;
            transition: width 0.5s;
            padding: 2px;
        }
        @e popHide {
            float: right;
            width: 10px;
            height: 10px;
            cursor: pointer;
            position: absolute;
            top: 10px;
            right: 20px;
            background: url("~assets/images/common/close.png") no-repeat 0 center;
            z-index: 10;
        }
        @e timeline {
            width: 100%;
            height: var(--timeline);
            position: absolute;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        /*@e lineTitle {
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
        }*/
        @e clearBtn {
            font-size: 12px;
            position: relative;
            margin-right: 25px;
            margin-bottom: 10px;
            z-index: 1;
            &:before {
                content: '';
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
                content: '';
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
            margin-bottom: 10px;
            z-index: 1;
            &:before {
                content: '';
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
                content: '';
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
        @e rightTabs {
            position: relative;
            color: #ffffff;
            font-size: 12px;
            width: 100%;
            height: 100%;
            /*border: 1px solid transparent;*/
            /*padding: 0 6px 10px 6px;*/
            @m header {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 13px;
                color: #fff;
                height: 28px;
                padding: 0 10px 0 18px;
                background: #11365D;
                line-height: 28px;
                color: #A2EEFF;
                span {
                    display: inline-block;
                    margin: 0;
                    width: 70px;
                    height: 100%;
                    text-align: center;
                    cursor: pointer;
                }
            }
            @m popHide {
                width: 10px;
                height: 10px;
                cursor: pointer;
                position: absolute;
                top: 10px;
                right: 20px;
                background: url("~assets/images/common/close.png") no-repeat 0 center;
                z-index: 10;
            }
            @m title {
                /*display: inline-block;*/
                padding: 10px 5px;
                color: #A2EEFF;
                background: rgba(16,42,74,0.90);
            }
            @m line {
                /*width: calc(100% -);*/
                padding-left: 5px;
                background: rgba(16,42,74,0.90);
            }
            @m bottomLine::after {
                content: '';
                width: 70px;
                height: 2px;
                display: block;
                background: #4aa6dc;
                position: absolute;
                top: 28px;
            }
            @m leftTop {
                position: absolute;
                left: -1px;
                top: -2px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat 0 0;
            }
            @m rightTop {
                position: absolute;
                right: -1px;
                top: -2px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat -25px 0;
            }
            @m leftBottom {
                position: absolute;
                left: -1px;
                bottom: -1px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat 0 -25px;
            }
            @m rightBottom {
                position: absolute;
                right: -1px;
                bottom: -1px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat -25px -25px;
            }
            @m left {
                position: absolute;
                left: -1px;
                bottom: 20px;
                width: 1px;
                height: calc(100% - 40px);
                background: #4f8ee5;
            }
            @m right {
                position: absolute;
                right: -1px;
                bottom: 20px;
                width: 1px;
                height: calc(100% - 40px);
                background: #4f8ee5;
            }
            @m top {
                position: absolute;
                left: 20px;
                top: -1px;
                width: calc(100% - 40px);
                height: 1px;
                background: #4f8ee5;
            }
            @m bottom {
                position: absolute;
                left: 20px;
                bottom: -1px;
                width: calc(100% - 40px);
                height: 1px;
                background: #4f8ee5;
            }
        }
        @e barTabs {
            position: relative;
            color: #ffffff;
            font-size: 12px;
            width: 100%;
            height: 100%;
            border: 1px solid transparent;
            padding: 0 6px 10px 6px;
            @m header {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 13px;
                color: #fff;
                height: 28px;
                padding: 0 10px 0 18px;
                background: #11365D;
                /*background: linear-gradient(135deg, transparent 9px, #0B245F 0);*/
                line-height: 28px;
                color: #A2EEFF;
                span {
                    display: inline-block;
                    margin: 0;
                    width: 100px;
                    height: 100%;
                    text-align: center;
                    cursor: pointer;
                }
            }
            @m title {
                display: inline-block;
                margin: 10px 0;
            }
            @m contents {
                /*padding: 8px 5px;*/
                width: 100%;
                height: 90%;
                /*height: 20px;*/
                /*overflow: auto;*/
                overflow: auto;
                /*height: calc(100% - 35px);*/
                /*background: linear-gradient(-45deg, transparent 9px, rgba(0, 0, 0, 0.7) 0);*/
            }
            /*@m bottomLine::after {*/
                /*content: '';*/
                /*width: 70px;*/
                /*height: 2px;*/
                /*display: block;*/
                /*background: #4aa6dc;*/
                /*position: absolute;*/
                /*top: 28px;*/
            /*}*/
            @m leftTop {
                position: absolute;
                left: -1px;
                top: -2px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat 0 0;
            }
            @m rightTop {
                position: absolute;
                right: -1px;
                top: -2px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat -25px 0;
            }
            @m leftBottom {
                position: absolute;
                left: -1px;
                bottom: -1px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat 0 -25px;
            }
            @m rightBottom {
                position: absolute;
                right: -1px;
                bottom: -1px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat -25px -25px;
            }
            @m left {
                position: absolute;
                left: -1px;
                bottom: 20px;
                width: 1px;
                height: calc(100% - 40px);
                background: #4f8ee5;
            }
            @m right {
                position: absolute;
                right: -1px;
                bottom: 20px;
                width: 1px;
                height: calc(100% - 40px);
                background: #4f8ee5;
            }
            @m top {
                position: absolute;
                left: 20px;
                top: -1px;
                width: calc(100% - 40px);
                height: 1px;
                background: #4f8ee5;
            }
            @m bottom {
                position: absolute;
                left: 20px;
                bottom: -1px;
                width: calc(100% - 40px);
                height: 1px;
                background: #4f8ee5;
            }
        }
    }
}
</style>
