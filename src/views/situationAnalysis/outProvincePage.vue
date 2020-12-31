<template>
    <div class='ga-SWOTANLS__content'
         ref="abc">
         <!-- 地图 -->
        <div class='ga-SWOTANLS__map'>
            <!-- 地图切换按钮 -->
            <el-row type="flex">
                <el-col :span="6"
                        style="textAlign:right;"
                         class="ga-SWOTANLS__toolBar">
                    <el-button type="primary"
                               @click="loadMap('2', '')"
                               class='ga-button__realTime'
                               :class="{'actived': mapType !== 'china'}">
                        热点图</el-button><el-button type="primary"
                               @click="loadMap('1', '')"
                               class='ga-button__startBtn'
                               :class="{'actived': mapType === 'china'}"
                               :disabled="orgClick">来源分布</el-button>
                </el-col>
            </el-row>
            <el-row type="flex"
                    class="row-bg ga-SWOTANLS__mapWrap"
                    justify="center">
                <!-- 热力图 -->
                <!--<heatMap v-if='mapType !== "china"'-->
                         <!--ref="map"-->
                         <!--:mapType="mapType"-->
                         <!--:renderData="heatMapData"-->
                         <!--:max='heatMax'-->
                        <!--@heatAreaClick="heatAreaClick"-->
                         <!--:size="mapStyle"></heatMap>-->
                <mapLight v-if='mapType !== "china"'
                          ref="map"
                          :mapType="mapType"
                          :renderData="heatMapData"
                          @areaClick="heatAreaClick"
                          :size="mapStyle"
                          ></mapLight>
                         <!-- 海南诸岛 -->
                <template v-if='mapType === "china"'>
                    <pointMap ref="chinaRef" :option="chinaMapOpt"
                              :renderData="originMapData"
                              @areaClick="areaClick"></pointMap>
                    <!--<originMap ref="map"-->
                            <!--:mapType="mapType"-->
                            <!--:renderData="originMapData"-->
                            <!--:renderType="renderType"-->
                            <!--@areaClick="areaClick"-->
                            <!--:size="mapStyle"></originMap>-->
                    <!--<div class='ga-map-nhzd'>南海诸岛</div>-->
                </template>
            </el-row>
        </div>
        <!-- 总面板人数 -->
        <div class='ga-SWOTANLS__count'>
            <p class='ga-SWOTANLS__titleWrap'>{{actualTitle}}</p>
            <div class='ga-SWOTANLS__numWrap'
                 @click='numClick($event)'>
                <numberFlip :options="opt"
                            :renderData="numData"
                            class='ga-SWOTANLS__number'></numberFlip>
            </div>
        </div>
        <!-- 左侧一级柱图 -->
        <div id='ga-SWOTANLS__bars' class="ga-SWOTANLS__barsChange">
            <frameCom :title='firBarsTitle'>
                <areaBars :option='areaOpt' :areaIndex='areaIndex'></areaBars>
            </frameCom>
        </div>
        <!-- 左侧二级柱图 -->
        <div class='ga-SWOTANLS__popWrap'
             ref='pop'>
            <frameCom :title='secBarsTitle'>
                <div class='ga-SWOTANLS__popHide'
                     @click='popHide'></div>
                <areaBars :option='popOpt'></areaBars>
            </frameCom>
        </div>
        <!-- 右侧折线图 -->
        <div :class='[{"ga-SWOTANLS__lines--show": ifRShow}, "ga-SWOTANLS__lines"]'
             ref='lines'>
            <div class="ga-SWOTANLS__rightTabs">
                <!-- 柱状图切换 -->
                <frameCom>
                    <div class="ga-SWOTANLS__rightTabs--header">
                        <div class='ga-SWOTANLS__rightTabs--popHide' @click='RHide'> </div>
                        <span v-for="(item, index) in rightTitleData"
                              :class="rightTabsFlag === index ? 'ga-SWOTANLS__rightTabs--bottomLine' : ''"
                              :key="item.id"
                              @click="rightTitleClick(index)">{{item}}</span>
                    </div>
                    <div class='ga-SWOTANLS__rightTabs--title'>{{ triBarsTitle }}</div>
                    <!-- 柱状图组件 -->
                    <histogram class='ga-SWOTANLS__rightTabs--content'
                               :option="histogramOpt" :renderData="histogramData"></histogram>
                </frameCom>
            </div>
        </div>
        <!-- 下方实时按钮 -->
        <div class='ga-SWOTANLS__timeline'>
            <el-button :type="realType"
                       @click="clearHandler"
                       class='ga-button__realTime'
                       :class="{'actived': btnSts === 'real'}">实 时</el-button>
            <el-button type="primary"
                       @click="startHandler"
                       class='ga-button__startBtn'
                       :class="{'actived': btnSts === 'playback'}">{{startBtn}}</el-button>
            <timeLines :options="timeLineOpt"
                       @change="changeTimeline"
                       ref="time"></timeLines>
        </div>
    </div>
</template>

<script>
    // import moment from 'moment'
    import originMap from 'components/monitor/originMap'
    // import heatMap from 'components/monitor/heatMap'
    import mapLight from 'components/Chart/newHome/maplight'
    import histogram from 'components/monitor/histogram'
    import { mapGetters } from 'vuex'
    import numberFlip from 'components/monitor/numberFlip'
    import areaBars from 'components/monitor/areaBars'
    import curveBars from 'components/monitor/curveBars'
    import frameCom from 'components/monitor/frame'
    import categoryTabs from 'components/monitor/categoryTabs'
    import timeLines from 'components/monitor/timeLines'
    import Io from 'utils/websocket'
    import allAreaTitles from 'utils/areaTitles'
    import pointMap from 'components/Chart/newHome/pointMap'
    // import tabsCom from 'components/monitor/tabs'
    import { overall, snap, heat, source, cylinderOuter } from 'api/situationAnalysis/outProvincePage'
    const TYPE = 2
    // const exportUrl = process.env.NODE_ENV === 'production'
    //     ? '/policeBusiness' : 'http://192.168.3.183:8080/policeBusiness'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '' : 'ws://192.168.3.183:8080/policeBusiness'
    export default {
        data () {
            let me = this
            return {
                // 实时按钮的type
                realType: 'primary',
                ifRShow: false,
                // 开始和结束时间
                start: '',
                end: '',
                // 标题相关
                actualTitle: '实时在线用户',
                firBarsTitle: '省外在线用户分布',
                area1: '',  // 保存左侧二级柱图名称
                area3: '',  // 保存左侧一级柱图名称
                // 地图相关
                orgClick: false, // 来源图按钮是否禁用，true为禁用，false为启用
                firUpdate: true, // 时间轴更新切换地图标志
                heatMapData: [],
                heatMax: 0,
                originMapData: [],
                mapType: 'china',
                renderType: '1', // 记录来源图或热力图
                // 实时在线人数
                opt: {
                    height: 60
                },
                numData: [
                    { value: 0 }
                ],
                disClick: false,
                // 左下柱状图
                barClicked: null, // 根据点击左侧柱图的级别（标志）请求右侧柱图数据
                homecode: '', // 外省编码
                citycode: '', // 外省某市编码
                secondHomecode: '', // 弹出框市级编码
                secondCitycode: '', // 弹出框区县级编码
                rightBarType: 4, // 保存左侧柱图当前类型（单省，单市，省对市，省对区，市对市，市对区）
                areaIndex: '',  // 来源图联动保存当前地区的序号
                // popIndex: '',
                rightTitleData: ['1小时', '24小时', '7天', '一个月'],
                rightTabsFlag: 1,  // 切换右侧表格的标志，1为默认24小时（0：1小时，1:24小时....）
                // 右侧柱图配置
                histogramOpt: {
                    width: '100%',
                    height: '86%',
                    timeType: 1,
                    props: {
                        gridBottom: 30,
                        gridTop: 15,
                        gridLeft: 60,
                        gridRight: 20
                    }
                },
                histogramData: [],
                // 左侧一级柱图配置
                areaOpt: {
                    secondShow: true,
                    data: [],
                    click: true, // 能否点击展开，TRUE为能，FALSE不能
                    barClick (item, index) {
                        me.rightBarType = 5
                        me.barClicked = 1
                        let jump = index * 30
                        me.changBarScorllLeft(jump)
                        me.RShow()
                        me.area1 = ''
                        me.area3 = item.area
                        me.homecode = item.areacode
                        me.secondHomecode = item.areacode
                        me.loadLinesJson(5, me.homecode)
                        me.loadBarsJson(4, item.areacode)
                        me.loadPopBarsJson(5, item.areacode)
                    },
                    secondBarClick (item) {
                        me.rightBarType = 8
                        me.barClicked = 2
                        me.RShow()
                        me.area1 = ''
                        me.area3 = item.area
                        me.citycode = item.areacode
                        me.secondHomecode = item.areacode
                        me.loadLinesJson(8, me.citycode)
                        me.loadPopBarsJson(7, item.areacode)
                    }
                },
                // 左侧二级柱图配置
                popOpt: {
                    secondShow: true,
                    data: [],
                    click: true,
                    barClick (item, index) {
                        let jump = index * 30
                        me.changBarScorllRight(jump)
                        me.RShow()
                        me.area1 = item.area
                        me.secondCitycode = item.areacode
                        if (me.barClicked === 1) {
                            me.rightBarType = 6
                            me.loadLinesJson(6, me.homecode, item.areacode)
                            me.loadPopBarsJson(6, me.homecode, item.areacode)
                        } else if (me.barClicked === 2) {
                            me.rightBarType = 9
                            me.loadLinesJson(9, me.citycode, item.areacode)
                            me.loadPopBarsJson(8, me.citycode, item.areacode)
                        }
                    },
                    secondBarClick (item) {
                        me.RShow()
                        me.secondCitycode = item.areacode
                        me.area1 = item.area
                        if (me.barClicked === 1) {
                            me.rightBarType = 7
                            me.loadLinesJson(7, me.homecode, item.areacode)
                        } else if (me.barClicked === 2) {
                            me.rightBarType = 10
                            me.loadLinesJson(10, me.citycode, item.areacode)
                        }
                    }
                },
                lastHeadMapName: '',
                // 时间轴
                startBtn: '回 放',
                btnSts: 'real',
                timeLineOpt: {
                    width: ($(window).width() - 180),
                    type: 'halfhour'
                },
                items: [1, 2, 3],
                TArray: ['近1小时', '近24小时', '近7天'],
                // webscoket相关
                socket: new Io()
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'globalKeys': 'global/globalKeys'
            }),
            secBarsTitle () {
                return `${this.area3}在线用户分布`
            },
            triBarsTitle () {
                if (this.area1) {
                    return `${this.area3}在线用户在${this.area1}总体变化趋势`
                } else {
                    return `${this.area3}在线用户总体变化趋势`
                }
            },
            mapStyle () {
                return {
                    width: '100%',
                    height: this.vsHeight - this.vsHeight * 0.07 - 87 + 'px'
                }
            },
            chinaMapOpt() {
                return {
                    width: '100%',
                    height: this.vsHeight - this.vsHeight * 0.07 - 87 + 'px',
                    props: {
                        gridBottom: 0,
                        gridTop: 0,
                        gridLeft: 0,
                        gridRight: 0,
                        mapType: 'china'
                    }
                }
            },
            postTime () {
                // 当状态为暂停态，即开始按钮变为继续的时候，或者是回放态，即禁止点击的时候，返回时间轴的时间，否则返回当前时间
                if (this.startBtn === '继 续' || this.disClick === true) {
                    return this.start
                } else {
                    return 'now'
                }
            },
            //  热力图上的地区名称
            areaTitles () {
                return allAreaTitles[this.globalKeys['gMapKey']]
            }
        },
        // beforeMount () {
        //     this.setLinesHeight()
        // },
        mounted () {
            // this.loadComeNum()
            // 连接websocket
            this.socketFun()
        },
        beforeDestroy () {
            this.socket.disconnect()
        },
        methods: {
            //  热力图点击下钻事件
            heatAreaClick (params) {
                if (this.lastHeadMapName === '' || this.lastHeadMapName !== params.name) {
                    if (this.btnSts === 'playback') {
                        return
                    }
                    this.mapType = null
                    this.$nextTick(() => {
                        this.mapType = this.areaTitles[params.name]
                    })
                    this.loadHeatJson(params.name)
                    this.lastHeadMapName = params.name
                } else {
                    this.loadMap('2', '')
                    this.lastHeadMapName = ''
                }
            },
            //  来源图点击与右侧柱图联动事件事件
            areaClick (params) {
                for (let i = 0; i < this.areaOpt.data.length; i++) {
                    if (this.areaOpt.data[i].area === params.name) {
                        this.areaIndex = i
                        break
                    }
                }
            },
            //  右侧柱图切换事件
            rightTitleClick (index) {
                this.rightTabsFlag = index
                this.loadLinesJson(this.rightBarType, this.secondHomecode, this.secondCitycode)
            },
            // websocket
            socketFun () {
                this.socket.connect(`${apiUrl}/websocket/situation/2`)
                this.socket.on('open', () => {
                    //                    console.log('SOCKET连接成功', e)
                })
                this.socket.on('message', () => {
                    // let data = this.socket.JSONparse(resp.data)
                    //                    console.log('SOCKET数据。。。↓↓↓')
                    // if (data) {
                    this.RHide()
                    this.popHide()
                    this.areaOpt.secondShow = false
                    this.popOpt.secondShow = false
                    this.loadActualNum()
                    this.loadBarsJson(3)
                    if (this.mapType === 'china') {
                        this.loadMap('1')
                    } else {
                        this.loadMap('2')
                    }
                    // }
                    //                    console.log(data)
                    //                    this.numData = [{ value: data.swcount || 0 }]
                    //                    this.areaOpt.data = data.data
                    // 来源图数据
                    //                    let originData = []
                    //                    data.data.forEach(item => {
                    //                        originData.push({
                    //                            'source': item.area,
                    //                            'target': this.globalKeys.gTitle,
                    //                            'count': item.count
                    //                        })
                    //                    })
                    //                    this.originMapData = originData
                    // 热点图数据
                    //                    let heatData = _.cloneDeep(data.hot)
                    //                    heatData.forEach(item => {
                    //                        item.count = item.swcount
                    //                    })
                    //                    this.heatMapData = heatData
                    //                    this.heatMax = data.max
                })
            },
            // 右侧折线图隐藏
            RHide () {
                this.ifRShow = false
            },
            // 右侧折线图显示
            RShow () {
                this.ifRShow = true
            },
            // 修改左侧柱图滚动条
            changBarScorllLeft (height) {
                $('#ga-SWOTANLS__bars .ga-frame__content').animate({ scrollTop: height }, 500);
            },
            // 修改右侧柱图滚动条
            changBarScorllRight (height) {
                $('.ga-SWOTANLS__popWrap .ga-frame__content').animate({ scrollTop: height }, 500);
            },
            // 弹出二级柱图显示
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
            // 弹出二级柱图隐藏
            popHide () {
                this.popOpt.secondShow = false
                this.$refs.pop.style.width = '0'
                this.oneTimer = setTimeout(() => {
                    this.$refs.pop.style.display = 'none'
                }, 500)
            },
            // 设置柱状图高度
            setLinesHeight () {
                // this.histogramOpt.height = this.vsHeight - 220
            },
            // 总人数面板点击事件
            numClick () {
                if (!this.disClick) {
                    this.area1 = ''
                    this.area3 = '省外'
                    this.areaOpt.secondShow = false
                    this.rightBarType = 4
                    // this.area3 = this.globalKeys.gTitle
                    // 外省态势-点击总人数：type=4，homecode和areacode不填
                    this.loadLinesJson(4)
                    this.RShow()
                    this.popHide()
                    this.mapType = null
                    this.$nextTick(() => {
                        this.mapType = this.globalKeys.gMapKey
                    })
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
                this.loadBarsJson(3)
                // 热力图
                if (!this.firUpdate) {
                    this.loadMap('2')
                } else {
                    this.loadMap('1')
                    this.firUpdate = false
                }
                // Bar回弹到顶部
                this.changBarScorllLeft(0)
                this.changBarScorllRight(0)
            },
            // 暂停键
            pauseHandler () {
            },
            // 实时键
            clearHandler () {
                this.realType = 'primary'
                this.btnSts = 'real'
                this.startBtn = '回 放'
                this.orgClick = false // 来源图按钮是否禁用，true为禁用，false为启用
                this.disClick = false
                this.areaOpt.click = true
                this.start = ''
                this.changBarScorllLeft(0)
                this.changBarScorllRight(0)
                this.$refs.time.clear()
                // 重新请求数据
                this.loadActualNum()
                this.loadBarsJson(3)
                this.loadMap(this.renderType)
                // 重新连接websocket
                this.socketFun()
            },
            // 开始键
            startHandler () {
                // 停止websocket
                this.socket.disconnect()
//                this.btnSts = 'playback'
                this.orgClick = true // 来源图按钮是否禁用，true为禁用，false为启用
                if (this.disClick) {
                    this.realType = 'primary'
                    this.btnSts = 'playback'
                    // 当前状态为正在回放，显示为暂停键，点击暂停键之后变成继续键
                    this.startBtn = '继 续'
                    this.disClick = false
                    this.areaOpt.click = true
                    this.$refs.time.pause()
                } else {
                    this.realType = 'default'
                    this.btnSts = 'playback'
                    // 当前状态为未开始或暂停态，显示为继续键，点击继续键变成暂停键
                    this.startBtn = '暂 停'
                    this.disClick = true
                    this.areaOpt.click = false
                    this.RHide()
                    this.popHide()
                    this.$refs.time.start()
                }
            },
            //  加载地图事件
            loadMap (type) {
                this.renderType = type
                this.$nextTick(() => {
                    if (type === '1') {
                        //  加载来源图数据
                        this.mapType = 'china'
                        this.loadSourceJson()
                    } else if (type === '2') {
                        //  加载热力图数据
                        this.popHide()
                        this.RHide()
                        this.areaOpt.secondShow = false
                        this.mapType = this.globalKeys.gMapKey
                        this.loadHeatJson()
                    }
                })
            },
            // 获取来源图数据
            async loadSourceJson () {
                let resp = await source({ type: TYPE });
                let { data } = resp
                if (data) {
                    this.originMapData = data
                }
            },
            // 获取热力图数据
            async loadHeatJson (cityname = null) {
                this.heatMapData = []
                let resp = await heat({
                    type: TYPE,
                    timestamp: this.postTime === 'now' ? null : this.postTime,
                    cityname: cityname
                })
                let { data } = resp
                // if (data) {
                //     // this.heatMapData = []
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
            // 实时在线人数
            async loadActualNum () {
                let resp = await overall({
                    timestamp: this.postTime === 'now' ? sessionStorage.gTime : this.postTime
                    // timestamp: this.postTime === 'now' ? moment().format('YYYY-MM-DD HH:mm:ss') : this.postTime
                    //                    type: TYPE
                })
                let { data } = resp
                if (data) {
                    this.numData = [{ value: data.swcount || 0 }]
                }
            },
            //  左侧一级柱图请求接口
            async loadBarsJson (type, areacode = '', area = '') {
                let resp = await cylinderOuter({
                    timestamp: this.postTime === 'now' ? sessionStorage.gTime : this.postTime,
                    type: type,
                    areacode: areacode,
                    area: area
                })
                let { data } = resp
                if (type === 3 && data) {
                    data.forEach(item => {
                        item.data = []
                    })
                    this.areaOpt.data = data
                } else if (data) {
                    this.areaOpt.data.forEach(item => {
                        if (item.areacode === this.homecode) {
                            item.data = data
                        }
                    })
                }
            },
            // 左侧二级柱图请求接口
            async loadPopBarsJson (type, areacode = '', area = '') {
                let resp = await cylinderOuter({
                    timestamp: this.postTime === 'now' ? sessionStorage.gTime : this.postTime,
                    type: type,  // 表示查询类型
                    areacode: areacode,  // 省or市的code
                    area: area
                })
                let { data } = resp
                if ((type === 5 || type === 7) && data) {
                    data.forEach(item => {
                        item.data = []
                    })
                    this.popOpt.data = data
                    this.popShow()
                } else if (data) {
                    this.popOpt.data.forEach(item => {
                        if (item.areacode === area) {
                            item.data = data
                        }
                    })
                }
            },
            // 右侧柱状图数据
            async loadLinesJson (type, areacode = '', homecode = '') {
                let resp = await snap({
                    type: type,
                    timeType: this.rightTabsFlag + 1,  // 表示柱状图的类型
                    homecode: homecode,  // 号码归属地
                    areacode: areacode   // 号码所在地
                })
                let { data } = resp
                if (data) {
                    this.histogramOpt.timeType = this.rightTabsFlag
                    this.histogramData = data
                }
            }
        },
        components: {
            numberFlip,
            areaBars,
            curveBars,
            categoryTabs,
            originMap,
            // heatMap,
            mapLight,
            timeLines,
            frameCom,
            histogram,
            pointMap
        }
    }
</script>

<style scoped>
     ::-webkit-scrollbar {
        width: 0;
    }
     :root {
        --timeline: 30px;
        --titleHeigth: 30px;
        --countMargin: 10px;
        --leftWidth: 20%;
        --barTop: 100px;
    }
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
    .ga-map-nhzd {
        width: 90px;
        height: 130px;
        background: url("~assets/images/common/nhzd.png") no-repeat 0 center;
        text-align: center;
        padding-top: 100px;
        position: absolute;
        right: 6%;
        bottom: 10%;
        cursor: default;
    }
    @component-namespace ga {
        /*button.tarExport {
            position: absolute;
            top: 30px;
            right: 14%;
            color: #fff;
            font-size: 13px;
        }*/
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
                /*height: calc(50% - var(--titleHeigth) - var(--countMargin));*/
                /*margin: 0 var(--countMargin);*/
                position: absolute;
                /* display: flex;
                    flex-direction: column; */
            }
            @e dayNum {
                margin-top: 16px;
                font-size: 14px;
                padding-left: 10px;
                align-items: center;
                display: flex;
                /* justify-content: center; */
                & span {
                    color: #94c1ff;
                    font-size: 24px;
                    padding-left: 10px;
                }
            }
            @e number {
                width: 100%;
                height: 50px;
                position: relative;
                /* border-bottom: 1px solid #ccc; */
            }
            @e numWrap {
                cursor: pointer;
            }
            @e tabs {
                width: 100%;
                position: relative;
                display: flex;
                flex: 1;
            }
            /*@e tabsTitle {
                margin: 10px 0;
            }*/
            @e bars {
                position: absolute;
                top: 100px;
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
                top: 11px;
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
                    width: 100%;
                    height: 30px;
                    display: block;
                    line-height: 30px;
                    padding-left: 10px;
                    color: #A2EEFF;
                    background: rgba(16,42,74,0.90);
                }
                @m content {
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
        }
    }
</style>
