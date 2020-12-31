<template>
    <div class='ga-allProvince__content' ref="abc">
        <!-- 地图引入 -->
        <div class='ga-allProvince__map'>
            <el-row type="flex" class="row-bg ga-allProvince__mapWrap" justify="center">
                <heatMap :size="mapStyle" ref="map" :mapType="mapType" :renderData="heatMapData" :max='heatMax'></heatMap>
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
            <div class='ga-allProvince__dayNum'>
                <div class='ga-allProvince__tab' v-for='(item, index) in panesData'>
                    <p :class='[`ga-allProvince__tabNum--show${index}`, "ga-keyArea__tabNum"]'>{{item.value}}</p>
                    <p class='ga-allProvince__tabName'>{{item.name}}</p>
                </div>
            </div>
        </div>
        <!-- 左侧下半部分柱形图展示 -->
        <div class='ga-allProvince__bars' id='ga-allProvince__bars'>
            <frameCom :title='firBarsTitle'>
                <stackedBar :option='areaOpt'></stackedBar>
            </frameCom>
        </div>
        <!-- 柱形图点击事件弹出框 -->
        <div class='ga-allProvince__popWrap' ref='pop'>
            <frameCom :title='secBarsTitle'>
                <span class='ga-allProvince__popHide' @click='popHide'></span>
                <stackedBar1 :option="popOpt"></stackedBar1>
            </frameCom>
        </div>
        <!-- 右侧折线图 -->
        <div :class='[{"ga-allProvince__lines--show": ifRShow}, "ga-allProvince__lines"]' ref='lines'>
            <frameCom :title='triBarsTitle'>
                <span class='ga-allProvince__popHide' @click='RHide'></span>
                <el-row :span='8' class='ga-allProvince__linesWrap' v-for='(item, index) in items' :key='item'>
                    <span class='ga-allProvince__lineTitle'>{{TArray[index]}}人员变化情况</span>
                    <linesTrend :option="lineOpt" :renderData="lineData[index]" :flag="index"></linesTrend>
                </el-row>
            </frameCom>
        </div>
        <!-- 时间轴组件 -->
        <div class='ga-allProvince__timeline'>
            <!-- <el-button type="text" @click="pauseHandler">暂停</el-button> -->
            <el-button type="text"
                       @click="clearHandler"
                       class='ga-allProvince__clearBtn'
                       :class="{'active': btnSts === 'real'}">实时</el-button>
            <el-button type="text"
                       @click="startHandler"
                       class='ga-allProvince__startBtn'
                       :class="{'active': btnSts === 'playback'}">{{startBtn}}</el-button>
            <timeLines :options="timeLineOpt" @change="changeTimeline" ref="time"></timeLines>
        </div>
    </div>
</template>

<script>
    import heatMap from 'components/monitor/heatMap'
    import { mapGetters } from 'vuex'
    import numberFlip from 'components/monitor/numberFlip'
    import tabsCom from 'components/monitor/tabs'
    import stackedBar from 'components/monitor/stackedBar'
    import stackedBar1 from 'components/monitor/stackedBar'
    import frameCom from 'components/monitor/frame'
    import categoryTabs from 'components/monitor/categoryTabs'
    import linesTrend from 'components/monitor/linesTrend'
    import timeLines from 'components/monitor/timeLines'
    import moment from 'moment'
    import Io from 'utils/websocket'
    import { overall, snap, cylinderInner, heat } from 'api/situationAnalysis/allProvincePage'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '' : 'ws://192.168.3.183:8080/policeBusiness'
    const ALLLABEL = '全体'
    const HISLABEL = '回放'
    const CONLABEL = '继续'
    const PAUSELABEL = '暂停'
    const TYPE = 4
    export default {
        data () {
            let me = this
            return {
                ifRShow: false, // 右侧线图弹窗是否显示
                disClick: false, // 当开始回放时，不允许点击tabs，不允许弹窗
                tabsTitle: '人员构成（按手机归属地统计）',
                actualTitle: '实时在线人数',
                firBarsTitle: '各地市人员分布',
                area1: '',
                area2: '',
                area3: '',
                dayNum: 0,
                homecode: '',
                index: '',
                start: '',
                end: '',
//                地图数据
                heatMapData: [],
                heatMax: 0,
//                地图类型
                mapType: '',
                socket: new Io(),
                TArray: ['近1小时', '近24小时', '近7天'],
//                柱状图配置
                areaOpt: {
                    data: [],
                    type: 'area',
                    click: true, // 能否点击展开，TRUE为能，FALSE不能
                    barClick (item, index) {
                        let jump = index * 30
                        me.changBarScorll(jump)
                        me.RShow()
                        me.area1 = item.area
                        me.area2 = me.globalKeys.gTitle
                        me.area3 = me.globalKeys.gTitle
                        me.loadLinesJson(14, item.areacode, '')
                        if (item.pop) {
                            me.popOpt.data = item.pop
                            me.popShow()
                        } else {
                            me.popHide()
                        }
                    }
                },
//                弹出框中的柱状图配置
                popOpt: {
                    data: [],
                    type: 'pop',
                    barClick (item) {
//                        console.log(item);
                        me.RShow()
                        me.area3 = item.area
                        me.loadLinesJson(15, item.areacode, '')
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
//                tab切换需要显示的子组件的类型
                currentView: 0,
// //                折线图配置
                lineOpt: {
                    width: '100%',
                    props: {
                        gridBottom: 50,
                        gridTop: 15,
                        gridLeft: 80,
                        gridRight: 20
                    }
                },
                items: [1, 2, 3],
//                折线图数据
                lineData: [],
//                时间轴数据配置
                // 时间轴
                startBtn: HISLABEL,
                btnSts: 'real',
                timeLineOpt: {
                    click: false, // 能否拖动时间轴，TRUE为能，FALSE不能
                    width: ($(window).width() - 180),
                    type: 'halfhour'
                }
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'globalKeys': 'global/globalKeys'
            }),
            secBarsTitle () {
                return `${this.area1}人员在${this.area2}区域分布`
            },
            triBarsTitle () {
                return `${this.area1}人员在${this.area3}总体变化趋势`
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
                    height: this.vsHeight - 70 + 'px'
                }
            }
        },
        beforeMount () {
            this.setLinesHeight()
        },
        mounted () {
            this.socketFun()
        },
        beforeDestroy () {
            // 关闭socket连接
            this.socket.disconnect()
        },
        methods: {
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
                if (this.ifRShow) {
                    this.oneTimer = setTimeout(() => {
                        this.$refs.pop.style.width = '25%'
                    }, 100)
                }
            },
//            设置折线图高度
            setLinesHeight () {
                this.lineOpt.height = (this.vsHeight - 20 - 48) / 3
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
                    this.area1 = ALLLABEL;
                    this.area3 = this.globalKeys.gTitle;
                    this.loadLinesJson(13, '', '');
                    this.RShow()
                    this.popHide()
                }
            },
            // 修改柱图滚动条
            changBarScorll (height) {
                $('#ga-SWOTANLS__bars .ga-frame__content').animate({ scrollTop: height }, 500);
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
                this.loadBarsJson()
                // this.actualTitle = val.startTime + '在线人数'
                // 热力图
                this.loadMap();
            },
//             暂停键
            pauseHandler () {
//                this.$refs.time.pause()
            },
            socketFun () {
                this.socket.connect(`${apiUrl}/websocket/situation/4`);
                this.socket.on('open', () => {
//                    console.log('SOCKET连接成功', e)
                })
                this.socket.on('message', () => {
                    // let data = this.socket.JSONparse(resp.data);
                    // console.log(data);
                    this.loadActualNum()
                    this.loadBarsJson()
                    this.loadMap()
//                    this.numFlipData = [{ value: data.allcount || 0 }]
//                    let panesData = [];
//                    panesData.push({ 'name': '境外', 'value': data.jwcount || 0 });
//                    panesData.push({ 'name': '省内', 'value': data.sncount || 0 });
//                    panesData.push({ 'name': '省外', 'value': data.swcount || 0 });
//                    this.panesData = panesData;
                    // 热点图数据
//                    let heatData = _.cloneDeep(data.hot);
//                    console.log(heatData);
//                    this.heatMapData = heatData
//                    this.heatMax = data.max
//                    this.areaOpt.data = data.data;
                });
//                console.log(this.socket)
            },
//             清除键（实时键）
            clearHandler () {
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
                this.loadBarsJson()
                this.loadMap()
                // 重新连接websocket
                this.socketFun()
            },
//             回放键
            startHandler () {
                // 停止websocket
                this.socket.disconnect();
                this.btnSts = 'playback'
                this.timeLineOpt.click = true;
                if (this.disClick) {
                    this.startBtn = CONLABEL
                    this.disClick = false;
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
//            实时在线人数请求
            async loadActualNum () {
                this.numFlipData = [];
                this.panesData = [];
                let resp = await overall({
                    timestamp: this.postTime === 'now' ? moment().format('YYYY-MM-DD HH:mm:ss') : this.postTime,
                    type: TYPE
                });
                // console.log(resp)
                if (resp) {
                    this.numFlipData = [{ value: resp.data.sjcount + resp.data.szcount || 0 }]
//                tab切换数据赋值
                    let panesData = [];
                    panesData.push({ 'name': '涉疆', 'value': resp.data.sjcount || 0 });
                    panesData.push({ 'name': '涉藏', 'value': resp.data.szcount || 0 });
                    this.panesData = panesData;
                }
            },
//            左侧下方境外号码柱图数据
            async loadBarsJson () {
                this.areaOpt.data = []
                let resp = await cylinderInner({
                    timestamp: this.postTime === 'now' ? moment().format('YYYY-MM-DD HH:mm:ss') : this.postTime,
                    type: 1
                });
                this.firBarsTitle = '省内人员按区县（地区）排行'
                let { data } = resp;
                if (data) {
                    this.areaOpt.data = data;
                }
            },
//            右侧折线图数据
            async loadLinesJson (type, homecode, areacode) {
                let resp = await snap({
                    type: type,  // 表示省内
                    homecode: homecode,  // 号码归属地
                    areacode: areacode   // 号码所在地
                })
                let { data } = resp;
                if (data) {
                    this.lineData = []
                    this.lineData.push(data.datahour)
                    this.lineData.push(data.dataday)
                    this.lineData.push(data.dataweek)
                }
            },
//            loadPanesJson () {
//                axios.get('/example/static/panes.json').then(resp => {
//                    this.panesData = resp.data;
//                })
//            },
            loadMap () {
                //  如果是第一次点击回放
                this.$nextTick(() => {
                    this.mapType = this.globalKeys.gMapKey;
                    this.loadHeatJson()
                })
            },
            async loadHeatJson () {
                let resp = await heat({
                    type: TYPE,
                    timestamp: this.postTime === 'now' ? null : this.postTime
                });
                let { data } = resp;
                if (data) {
                    this.heatMapData = data.data
                    this.heatMax = data.max
                }
            }
        },
        components: {
            numberFlip,
            categoryTabs,
            linesTrend,
            heatMap,
            timeLines,
            frameCom,
            stackedBar,
            stackedBar1,
            tabsCom
        }
    }
</script>

<style scoped>
    ::-webkit-scrollbar {
        width: 0px;
    }

    :root {
        --timeline: 30px;
        --titleHeigth: 30px;
        --countMargin: 10px;
        --leftWidth: 20%;
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
                width: calc(100% - var(--leftWidth) - 5%);
                right: 0;
                height: 100%;
                /* background: #fff; */
                position: absolute;
            }
            @e mapWrap {
                width:100%;
                height:100%;
                position: relative;
                top: 8px;
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
                /*padding-top: 10px;*/
                white-space: nowrap;
            }
            @e count {
                width: var(--leftWidth);
                height: calc(50% - var(--titleHeigth) - var(--countMargin));
                margin: 0 var(--countMargin);
                position: absolute;
                /* display: flex;
                flex-direction: column; */
            }
            @e dayNum {
                font-size: 16px;
                padding-left: 10px;
                align-items: center;
                display: flex;
                width: 100%;
                justify-content: center;
                position: relative;
                margin: 10px 0;
            & span {
                  color: #94c1ff;
                  font-size: 24px;
                  padding-left: 10px;
              }
            }
            @e tab {
                display: flex;
                flex: 1;
                flex-direction: column;
                align-items: center;
                /*cursor: pointer;*/
                -moz-user-select: none;
                -webkit-user-select: none;
                user-select: none;
            }
            @e tabNum {
                font-size: 18px;
                margin: 10px 0;
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
                    color: #36befc;
                }
            }
            @e tabName {
                font-size: 18px;
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
                top: calc(var(--barTop) - 40px);
                width: 25%;
                height: calc(100% - var(--barTop) - var(--timeline) + 20px);
                /* font-size: 18px;
                overflow-y: scroll;
                overflow-x: hidden; */
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
                margin-bottom: 5px;
                height: calc(33.3% - 5px);
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
                top: calc(var(--barTop) - 40px);
                width: var(--leftWidth);
                display: none;
                overflow: hidden;
                height: calc(100% - var(--barTop) - var(--timeline) + 20px);
                left: 27%;;
                margin-left: 10px;
                transition: width 0.5s;
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
        }
    }
</style>
