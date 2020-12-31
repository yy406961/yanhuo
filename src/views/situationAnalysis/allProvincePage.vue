<template>
    <div class='ga-allProvince__content' ref="abc">
        <!--<el-button class='ga-allProvince__backBtn' v-if='backAllMap' @click='backMap'>返回</el-button>-->
        <!-- 地图引入 -->
        <div class='ga-allProvince__map'>
            <el-row type="flex" class="row-bg ga-allProvince__mapWrap" justify="center">
                <!--<heatMap @heatAreaClick="heatAreaClick" :size="mapStyle" ref="map" :mapType="mapType" :renderData="heatMapData" :max='heatMax'></heatMap>-->
                <mapLight @areaClick="heatAreaClick" :size="mapStyle" ref="map" :mapType="mapType" :renderData="heatMapData"></mapLight>
            </el-row>
        </div>
        <!-- 左侧上半部分导航 -->
        <div class='ga-allProvince__count'>
            <!-- 数字牌 -->
            <p class='ga-allProvince__titleWrap'>{{actualTitle}}</p>
                <div class='ga-allProvince__numWrap' @click='numClick($event)'>
                <numberFlip :options="opt" :renderData="numFlipData" class='ga-allProvince__number'></numberFlip>
            </div>
            <!-- 饼图、tab切换 -->
            <p class='ga-allProvince__titleWrap'>{{tabsTitle}}</p>
            <p class='ga-allProvince__dayNum'>
                <categoryTabs :act="currentView" :panes="panesData" :option="tabsOpt">
                </categoryTabs>
            </p>
        </div>
        <!-- 左侧下半部分柱形图展示 -->
        <div class='ga-allProvince__bars' id='ga-allProvince__bars'>
            <frameCom :title='firBarsTitle'>
                <areaBars :option='areaOpt' :areaIndex='areaIndex'></areaBars>
            </frameCom>
        </div>
        <!-- 柱形图点击事件弹出框 -->
        <div class='ga-allProvince__popWrap' ref='pop'>
            <frameCom :title='secBarsTitle'>
                <span class='ga-allProvince__popHide' @click='popHide'></span>
                <curveBars :option="popOpt"></curveBars>
            </frameCom>
        </div>
        <!-- 右侧折线图 -->
        <div :class='[{"ga-allProvince__lines--show": ifRShow}, "ga-allProvince__lines"]' ref='lines'>
            <frameCom>
                <div class="ga-allFrame__header">
                    <span :class="['ga-allFrame__tabs', activeIndex == index ? 'bottomLine' : '']"
                          v-for="(item, index) in TArray"
                          @click="rightTimeTabs(index)">
                        {{item}}
                    </span>
                </div>
                <div class="ga-allFrame__content" ref="content">
                    <div class='ga-SWOTANLS__popHide' @click='RHide'></div>
                    <div class="ga-SWOTANLS__title">{{triBarsTitle}}</div>
                    <stackedChart :option="stackedOpt" :renderData="stackedData"></stackedChart>
                </div>
            </frameCom>
        </div>
        <!-- 时间轴组件 -->
        <div class='ga-allProvince__timeline'>
            <!-- <el-button type="text" @click="pauseHandler">暂停</el-button> -->
            <el-button :type="realType"
                       @click="clearHandler"
                       class='ga-button__realTime'
                       :class="{'actived': btnSts === 'real'}">实 时</el-button>
            <el-button type="primary"
                       @click="startHandler"
                       class='ga-button__startBtn'
                       :class="{'actived': btnSts === 'playback'}">{{startBtn}}</el-button>
            <timeLines :options="timeLineOpt" @change="changeTimeline" ref="time"></timeLines>
        </div>
    </div>
</template>

<script>
    import tableCom from 'components/Table'
//  import moment from 'moment'
//     import heatMap from 'components/monitor/heatMap'
    import mapLight from 'components/Chart/newHome/maplight'
    import allAreaTitles from 'utils/areaTitles'
    import { mapGetters } from 'vuex'
    import numberFlip from 'components/monitor/numberFlip'
    import areaBars from 'components/monitor/areaBars'
    import curveBars from 'components/monitor/curveBars'
    import frameCom from 'components/monitor/frame'
    import categoryTabs from 'components/monitor/categoryTabs'
    import stackedChart from 'components/monitor/stackedChart'
    import timeLines from 'components/monitor/timeLines'
    import Io from 'utils/websocket'
    import { overall, snap, zhutu, heat } from 'api/situationAnalysis/allProvincePage'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '' : 'ws://192.168.3.183:8080/policeBusiness'
    const HISLABEL = '回 放'
    const CONLABEL = '继 续'
    const PAUSELABEL = '暂 停'
    const TYPE = 1
    export default {
        data () {
            let me = this
            return {
                // 实时按钮的type
                realType: 'primary',
                ifRShow: false, // 右侧线图弹窗是否显示
                disClick: false, // 当开始回放时，不允许点击tabs，不允许弹窗
                backAllMap: false, // 返回全省地图
                activeIndex: 1, // 右侧当前tab页签索引
                areaIndex: -1, // 左侧柱图当前点击柱条索引
                areacode: '',
                type: 1, // 区分省级市级区级类型, 默认为省级
                tabsTitle: '在线用户构成（按手机归属地统计）',
                actualTitle: '实时在线用户',
                // firBarsTitle: '市内在线用户分布',
                area1: '',
                area2: '',
                dayNum: 0,
                index: '',
                start: '',
                end: '',
//                地图数据
                heatMapData: [],
                heatMax: 0,
//                地图类型
                mapType: '',
                socket: new Io(),
                TArray: ['1小时', '24小时', '7天', '一个月'],
//                柱状图配置
                areaOpt: {
                    data: [],
                    secondShow: true,
                    click: true, // 能否点击展开，TRUE为能，FALSE不能
                    barClick (item, index) {
                        me.mapType = null
                        me.type = 2
                        me.areacode = item.areacode
                        me.backAllMap = true
                        me.$nextTick(() => {
                            if (!me.areaTitles) {
                                me.mapType = me.globalKeys.gMapKey;
                            } else {
                                me.mapType = me.areaTitles[item.area]
                            }
                        })
                        me.area1 = item.area
                        me.area2 = item.area
                        let jump = index * 30;
                        me.changBarScorll(jump)
                        me.RShow()
                        me.popShow()
                        if (me.areaTitles) {
                            me.loadHeatJson(item.area)
                        }
                        me.loadLinesJson(2, me.activeIndex + 1, item.areacode)
                        me.loadBarsJson(2, item.areacode)
                    }
                },
//                弹出框中的柱状图配置
                popOpt: {
                    data: [],
                    barClick (item) {
                        me.type = 3
                        me.areacode = item.areacode
                        me.RShow();
                        me.area1 = item.area;
                        me.loadLinesJson(3, me.activeIndex + 1, item.areacode)
                    }
                },
//                数字翻牌组件配置
                opt: {
                    height: 40
                },
//                数字翻牌组件数据
                numFlipData: [
                    { value: 16857222 }
                ],
//                tab切换数据
                panesData: [],
//                tab切换样式
                tabsOpt: {
                    panes: {
                        width: $(window).width() * 0.25 - 40,
                        height: ($(window).height() - 150) * 0.5 - 30 * 2 - 50
                    }
                },
//                tab切换需要显示的子组件的类型
                currentView: 0,
                // stackedOpt: {
                //     width: '100%',
                //     height: '90%',
                //     props: {
                //         gridBottom: 30,
                //         gridTop: 15,
                //         gridLeft: 70,
                //         gridRight: 50
                //     },
                //     timeType: 1
                // },
                stackedData: [],
//                时间轴数据配置
                // 时间轴
                startBtn: HISLABEL,
                btnSts: 'real',
                timeLineOpt: {
                    click: false, // 能否拖动时间轴，TRUE为能，FALSE不能
                    width: ($(window).width() - 180),
                    type: 'halfhour'
                },
                lastHeadMapName: ''
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'globalKeys': 'global/globalKeys'
            }),
            stackedOpt() {
                return {
                    width: '100%',
                    height: this.vsHeight * 0.92 * 0.8 - 60 + 'px',
                    props: {
                        gridBottom: 30,
                        gridTop: 15,
                        gridLeft: 70,
                        gridRight: 50
                    },
                    timeType: 1
                }
            },
            areaTitles () {
                return allAreaTitles[this.globalKeys['gMapKey']]
            },
            firBarsTitle() {
                let name = '省内'
                if (this.globalKeys.gMapKey === 'haikou') {
                    name = '市内'
                }
                return `${name}在线用户分布`
            },
            secBarsTitle () {
                return `${this.area2}在线用户分布`
            },
            triBarsTitle () {
                return `${this.area1}在线用户总体变化趋势`
            },
            postTime () {
                // 当状态为暂停态，即开始按钮变为继续的时候，或者是回放态，即禁止点击的时候，返回时间轴的时间，否则返回当前时间
                if (this.startBtn === CONLABEL || this.disClick === true) {
                    return this.start
                } else {
//                    return moment().format('YYYY-MM-DD HH:mm:ss')
                    return 'now'
                }
            },
            mapStyle () {
                return {
                    width: '100%',
                    height: this.vsHeight - this.vsHeight * 0.07 - 40 + 'px'
                }
            }
        },
        mounted () {
            this.socketFun();
        },
        beforeDestroy () {
            // 关闭socket连接
            this.socket.disconnect();
        },
        methods: {
            // 地图点击事件
            heatAreaClick (params) {
                if (!this.areaTitles) {
                    return
                }
                if (this.lastHeadMapName === '' || this.lastHeadMapName !== params.name) {
                    if (this.btnSts === 'playback') {
                        return
                    }
                    this.mapType = null
                    this.backAllMap = true
                    let areaData = this.areaOpt.data
                    this.$nextTick(() => {
                        this.mapType = this.areaTitles[params.name];
                    })
                    for (let i = 0; i < areaData.length; i++) {
                        if (areaData[i].area === params.name + '' || areaData[i].area + '市' === params.name + '') {
                            this.areaIndex = i
                        }
                    }
                    this.lastHeadMapName = params.name
                } else {
                    this.backMap();
                    this.lastHeadMapName = ''
                }
            },
            // 返回全省地图
            backMap () {
                this.type = 1
                this.mapType = null
                this.$nextTick(() => {
                    this.mapType = this.globalKeys.gMapKey;
                })
                this.area1 = this.globalKeys.gTitle;
                this.backAllMap = false
                this.areaOpt.secondShow = false
                this.areaIndex = -1
                this.popHide()
                this.loadLinesJson(1, this.activeIndex + 1, '');
                this.loadHeatJson(null)
            },
//            右侧折线图隐藏
            RHide () {
                this.ifRShow = false
            },
//            右侧折线图显示
            RShow () {
                this.ifRShow = true
            },
//            弹出三级柱图显示
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
//            弹出三级柱图隐藏
            popHide () {
                this.$refs.pop.style.width = '0'
                this.oneTimer = setTimeout(() => {
                    this.$refs.pop.style.display = 'none'
                }, 500)
            },
//            总人数面板点击事件
            numClick () {
                if (!this.disClick) {
                    this.type = 1
                    this.mapType = null
                    this.areaOpt.secondShow = false
                    this.backAllMap = false
                    this.$nextTick(() => {
                        this.mapType = this.globalKeys.gMapKey;
                    })
                    this.area1 = this.globalKeys.gTitle;
                    this.loadLinesJson(1, this.activeIndex + 1, '')
                    this.loadHeatJson(null)
                    this.RShow()
                    this.popHide()
                }
            },
            // 修改柱图滚动条
            changBarScorll (height) {
                $('#ga-allProvince__bars .ga-frame__content').animate({ scrollTop: height }, 500);
            },
//            时间轴开始跳动修改时间，接口请求数据
            changeTimeline (val) {
                // Bar回弹到顶部
                this.changBarScorll(0)
                this.start = val.startTime
                this.end = val.endTime
                // 总人数面板数据
                this.loadActualNum()
                // 柱图数据
                this.loadBarsJson(1, '')
                // 热力图
                this.loadMap();
            },
//             暂停键
            pauseHandler () {
//                this.$refs.time.pause()
            },
            socketFun () {
                this.socket.connect(`${apiUrl}/websocket/situation/1`);
                this.socket.on('open', () => {
//                    console.log('SOCKET连接成功', e)
                })
                this.socket.on('message', () => {
                    // let data = this.socket.JSONparse(resp.data);
                    this.backAllMap = false
                    this.loadActualNum()
                    this.RHide()
                    this.popHide()
                    this.loadBarsJson(1, '')
                    this.loadMap()
//                    this.numFlipData = [{ value: data.allcount || 0 }]
//                    let panesData = [];
//                    panesData.push({ 'name': '境外', 'value': data.jwcount || 0 });
//                    panesData.push({ 'name': '省内', 'value': data.sncount || 0 });
//                    panesData.push({ 'name': '省外', 'value': data.swcount || 0 });
//                    this.panesData = panesData;
                    // 热点图数据
//                    let heatData = _.cloneDeep(data.hot);
//                    this.heatMapData = heatData
//                    this.heatMax = data.max
//                    this.areaOpt.data = data.data;
                });
            },
//             清除键（实时键）
            clearHandler () {
                this.realType = 'primary'
                this.btnSts = 'real'
                this.startBtn = HISLABEL
                this.disClick = false
                this.areaOpt.click = true
                this.timeLineOpt.click = false
                this.start = ''
                this.changBarScorll(0)
                this.$refs.time.clear()
                // 重新请求数据
                this.loadActualNum()
                this.loadBarsJson(1, '')
                this.loadMap()
                // 重新连接websocket
                this.socketFun()
                this.RHide()
                this.popHide()
            },
//             回放键
            startHandler () {
                // 停止websocket
                this.backAllMap = false
                this.socket.disconnect();
                this.timeLineOpt.click = true;
                if (this.disClick) {
                    this.btnSts = 'playback'
                    this.realType = 'primary'
                    this.startBtn = CONLABEL
                    this.disClick = false;
                    this.areaOpt.click = true
                    this.$refs.time.pause()
                } else {
                    this.btnSts = 'playback'
                    this.realType = 'default'
                    this.startBtn = PAUSELABEL
                    this.disClick = true
                    this.areaOpt.click = false
                    this.RHide()
                    this.popHide()
                    this.$refs.time.start()
                }
            },
//            实时在线人数请求
            async loadActualNum () {
                this.numFlipData = [];
                this.panesData = [];
                let resp = await overall({
                    timestamp: this.postTime === 'now' ? null : this.postTime,
                    type: TYPE
                });
                if (resp) {
                    this.numFlipData = [{ value: resp.data.allcount || 0 }]
//                tab切换数据赋值
                    let panesData = []
                    panesData.push({ 'name': '省内', 'value': resp.data.sncount || 0 })
                    panesData.push({ 'name': '省外', 'value': resp.data.swcount || 0 })
                    panesData.push({ 'name': '境外', 'value': resp.data.jwcount || 0 })
//                  panesData.push({ 'name': '涉疆', 'value': resp.data.sjcount || 0 });
//                  panesData.push({ 'name': '涉藏', 'value': resp.data.szcount || 0 });
                    this.panesData = panesData
                }
            },
//            左侧下方柱图数据
            async loadBarsJson (type, areacode) {
                this.popOpt.data = []
                let resp = await zhutu({
                    timestamp: this.postTime === 'now' ? null : this.postTime,
                    type: type,
                    areacode: areacode
                });
                let { data } = resp;
                if (data) {
                    if (type === 1) {
                        this.areaOpt.data = data;
                    } else {
                        this.popOpt.data = data;
                    }
                }
            },
//            右侧堆叠折线图数据
            async loadLinesJson (type, timeType, areacode) {
                let resp = await snap({
                    type: type,
                    timeType: timeType,
                    areacode: areacode
                })
                let { data } = resp;
                if (data) {
                    this.stackedData = []
                    this.stackedData = data
                }
            },
            loadMap () {
                //  如果是第一次点击回放
                this.$nextTick(() => {
                    this.mapType = this.globalKeys.gMapKey;
                    this.loadHeatJson(null)
                })
            },
            async loadHeatJson (cityname) {
                this.heatMapData = []
                let resp = await heat({
                    timestamp: this.postTime === 'now' ? null : this.postTime,
                    type: TYPE,
                    cityname: cityname
                });
                let { data } = resp;
                // if (data) {
                //     this.heatMax = data.max
                //     setTimeout(() => {
                //         this.heatMapData = data.data
                //     }, 300)
                //
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
            rightTimeTabs (index) {
                this.stackedOpt.timeType = index
                this.activeIndex = index
                this.loadLinesJson(this.type, index + 1, this.areacode)
            }
        },
        components: {
            numberFlip,
            areaBars,
            curveBars,
            categoryTabs,
            // heatMap,
            mapLight,
            timeLines,
            frameCom,
            tableCom,
            stackedChart
        }
    }
</script>

<style scoped>
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .bottomLine::after {
        content: '';
        width: 70px;
        height: 2px;
        display: block;
        background: #4aa6dc;
        position: absolute;
        top: 28px;
    }
    ::-webkit-scrollbar {
        width: 0px;
    }
    :root {
        --timeline: 30px;
        --titleHeigth: 30px;
        --countMargin: 10px;
        --leftWidth: 25%;
        --barTop: 50%;
    }
    .ga-allProvince__clearBtn.active:before {
        background: #1A498A;
    }
    .ga-allProvince__clearBtn.active:after {
        background: #1A498A;
    }
    .ga-allProvince__startBtn.active:before {
        background: #1A498A;
    }
    .ga-allProvince__startBtn.active:after {
        background: #1A498A;
    }
    @component-namespace ga {
        button.tarExport {
            position: absolute;
            top: 30px;
            right: 14%;
            color: #fff;
            font-size: 13px;
        }
        @b SWOTANLS {
            @e title {
                height: 30px;
                line-height: 30px;
                font-size: 13px;
                padding-left: 10px;
                color: #A2EEFF;
            }
            @e tabsTitle {
                margin-bottom: 10px;
                padding-left: 10px;
                height: 28px;
                line-height: 28px;
                white-space: nowrap;
                font-size: 13px;
                color: #fff;
                height: 28px;
                background: linear-gradient(135deg, transparent 9px, #0B245F 0);
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
                z-index: 10;
            }
        }
        @b allProvince {
            @e content {
                width: 100%;
                height: calc(100%);
                position: relative;
                overflow: hidden;
                font-size: 12px;
                color: #fff;
                padding-left: 2%;
            }
            @e map {
                /* width: 85%; */
                width: calc(100% - var(--leftWidth));
                right: 0;
                height: 100%;
                /* background: #fff; */
                position: absolute;
            }
            @e backBtn {
                padding: 7px 10px;
                position: absolute;
                top: 40px;
                left: 32%;
                border: 1px solid #4081dc;
                font-size: 12px;
                color: #4081dc;
                background: none;
                border-radius: 0;
                z-index: 9999;
            }
            @e mapWrap {
                width:100%;
                height:100%;
                position: relative;
                /* top: 8px; */
                /*top:-148px;*/
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
                /*padding-left: 10px;*/
                /*padding-top: 10px;*/
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
            @e dayNum {
                /*margin-top: 10px;*/
                /*overflow: hidden;*/
                font-size: 14px;
                padding-left: 10px;
                align-items: center;
                display: flex;
                width: 100%;
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
            @e bars {
                position: absolute;
                top: calc(var(--barTop) + 20px);
                width: 25%;
                height: calc(100% - var(--barTop) - var(--timeline) - 40px);
                /* font-size: 18px;
                overflow-y: scroll;
                overflow-x: hidden; */
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
            /*@e linesWrap {
                margin-bottom: 5px;
                height: calc(33.3% - 5px);
            }*/
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
                top: calc(var(--barTop) + 17px);
                width: var(--leftWidth);
                display: none;
                overflow: hidden;
                height: calc(100% - var(--barTop) - var(--timeline) - 35px);
                left: 27%;;
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
                 /*position: absolute;*/
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
        }
        @b allFrame {
            position: relative;
            color: #ffffff;
            font-size: 12px;
            width: 100%;
            height: 100%;
            border: 1px solid transparent;
            padding: 0 6px 10px 6px;
            @e header {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 13px;
                color: #fff;
                height: 28px;
                line-height: 28px;
                background: #11365D;
                padding: 0 10px 0 18px;
            }
            @e content {
                overflow: auto;
                width: 100%;
                background: rgba(16,42,74,0.90);
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
            @e tabs {
                display: inline-block;
                width: 70px;
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
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat 0 0;
            }
            @e rightTop {
                position: absolute;
                right: -1px;
                top: -2px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat -25px 0;
            }
            @e leftBottom {
                position: absolute;
                left: -1px;
                bottom: -1px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat 0 -25px;
            }
            @e rightBottom {
                position: absolute;
                right: -1px;
                bottom: -1px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat -25px -25px;
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
        }
    }
</style>
