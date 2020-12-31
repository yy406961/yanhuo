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
                <dataPart  class="ga-keyAreaMonitor__flipWrap"
                    :taskTime="taskTime"
                    :flipType="flipLJType"
                    :flipValueData="flipLJData"
                    :tabPropsData="tabLJData"
                    :flipFontObj="flipLJFontObj">
                </dataPart>
                <dataPart class="ga-keyAreaMonitor__flipWrap"
                    :taskTime="taskTime"
                    :flipType="flipRealType"
                    :flipValueData="flipRealData"
                    :tabPropsData="tabRealData"
                    @numClick="numClick"
                    @tabClick="tabClick">
                </dataPart>
                <!-- 左侧柱图/表格改变 -->
                <div class="ga-keyAreaMonitor__leftBar" id="leftBar">
                    <frameCom :title='firBarsTitle'>
                        <div v-if='tabType === 13' class="ga-keyAreaMonitor__expBtn">
                        <!-- <div class="ga-keyAreaMonitor__expBtn"> -->
                                <span @click="exportExl">导出</span>
                        </div>
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
                <frameCom :title='secBarsTitle'>
                    <div class='ga-keyAreaMonitor__popHide' @click='popHide'> </div>
                    <curveBars :option="popOpt"></curveBars>
                </frameCom>
            </div>
            <!-- 中间地图 -->
            <div class="ga-keyAreaMonitor__middleWrap">
                <heatMap ref="map"
                    :heatPoint="dotData"
                    :areaBorder="areaBorder"
                    :gpsMax="gpsMax">
                </heatMap>
            </div>
            <!-- 地图上的累计用户数 -->
            <!-- <div class="ga-keyAreaMonitor__LjWrap">
                <dataPart :taskTime="taskTime"
                    :flipType="flipLJType"
                    :flipValueData="flipLJData"
                    :tabPropsData="tabLJData"
                    :flipFontObj="flipLJFontObj">
                </dataPart>
            </div> -->
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
        </div>
    </div>
</template>

<script>
import { ajax } from 'common'
import { mapGetters } from 'vuex'
import dataPart from './compontents/dataPart'
import numberFlip from 'components/monitor/numberFlip'
import frameCom from 'components/monitor/frame'
import areaBars from 'components/monitor/areaBars'
import tableCom from 'components/Table'
import curveBars from 'components/monitor/curveBars'
import FormComp from 'components/Form/index'
import heatMap from './compontents/heatMap'
import tabsCom from './compontents/tabsKeyArea'
import LJDialog from './compontents/LJDialog'
// import { appData } from './compontents/data.js'
const exportUrl = process.env.NODE_ENV === 'production'
        ? '/policeBusiness' : 'http://192.168.3.183:8080/policeBusiness'
export default {
    name: 'keyAreaMonitor',
    data () {
        let me = this
        return {
            showTitle: true,
            taskId: '',
            areaId: '',
            areaName: '重点区域',
            // 左侧上方数据
            flipRealType: 0,
            flipRealData: 0,
            tabRealData: [],
            // 地图上方数据
            flipLJType: 1,
            flipLJData: 0,
            tabLJData: [],
            flipLJFontObj: {
                flipTitleColr: 'rgba(7,223,174,1)',
                tabColor: 'rgba(130,194,213,1)',
                tabFamily: 'lcdd'
            },
            area1: '',
            // 当前已选中的tab的index, 人员类型 实时省外 11、实时境外 12、实时重点人 13
            tabType: 11,
            iskeyPerson: false,
            // 柱状图title，根据tabs修改
            firBarsTitle: '省外在线用户数排行',
            insertTime: '',
            // 左侧一二级柱状图配置
            areaOpt: {
                data: [],
                click: true, // 能否点击展开，TRUE为能，FALSE不能
                // 一级柱图点击事件
                barClick (item, index) {
                    me.tabTitle = '实时用户在线变化趋势'
                    me.firstName = item.area + '在线用户'
                    me.tArray = ['近1小时', '近24小时', '近7天']
                    // 修改三级弹出柱图和右侧线图的title
                    me.area1 = item.area
                    // 动画效果，有滚动条时，点击柱图使该柱在视图第一位
                    let jump = index * 30;
                    me.changBarScorll(jump)
                    // 右侧线图div弹出
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
                    { name: '序号', value: 'index', width: 40, align: 'center' },
                    { name: '姓名', value: 'name', align: 'center', tooltip: true },
                    { name: '电话号码', value: 'iphone', width: 130, align: 'center' }
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
                    me.$refs.map.createOneMarker(row)
                }
            },
            peopleExportUrl: '',
            // 中间地图
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
            'globalKeys': 'global/globalKeys'
        }),
        mainStyle() {
            let height = this.vsHeight - 50
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
            let height = this.showTitle ? 36 : 90
            return { 'height': this.vsHeight - 230 * 2 - height }
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
            this.taskId = 30
            this.areaId = 131
        }
        this.initFunc()
    },
    methods: {
        initFunc() {
            // 总人数面板数据
            this.getNumData()
            // 柱图回弹到顶部
            this.changBarScorll(0)
            // 热地图数据
            this.getMapData()
            // 地图区域边框
            this.getMapBorder()
            // 启用轮询
            this.rollPoling(true)
            // 区域监测任务 起始终止时间
            // this.getTaskTime()
        },
        // -----------------------------------操作方法START-----------------------------------
        // 面板点击事件
        numClick (data) {
            this.tabTitle = data.value === 0 ? '实时用户在线变化趋势' : '累计用户变化趋势'
            this.firstName = data.value === 0 ? '全部实时用户' : '全部累计用户'
            this.$refs.map.createOneMarker(null, true) // 清空单独人员位置及信息
            this.loadLinesJson(data.value) // 加载右侧弹窗折线图数据
            this.RShow()
            this.popHide()
        },
        /**
         * tab切换面板点击事件
         * @param {val} tabs索引 [实时省外 11，实时境外 12，实时重点人 13]
         **/
        tabClick (data) {
            if (![11, 12, 13].includes(data.value)) {
                return
            }
            this.firBarsTitle = data.text
            this.tabType = data.value
            this.tableOpt.pageOpt.currentPage = 1
            this.areaOpt.data = [] // 每次点击 tabs 先清空柱图数据，避免柱图由于数据延迟而显示上一次的数据
            this.popHide() // 关闭三级柱图
            this.RHide()
            // 省内、省外 显示右侧弹窗
            let bool = [11, 12].includes(this.tabType)
            this.firstName = data.name + '在线'
            if (bool) {
                this.RShow()
            } else {
                this.RHide()
            }
            this.$refs.map.createOneMarker(null, bool) // 清空单独人员位置及信息
            this.tabTitle = '实时用户在线变化趋势'
            this.getBarsAndLine(true)
            $('#leftBar .ga-frame__content').animate({ scrollTop: 0 }, 500);
        },
        /**
         * 获取左下柱图数据和右侧弹窗折线图数据
         * @param {hasLine} 判断是否需要请求折线图数据  [Boolean]
         * */
        getBarsAndLine (hasLine = false) {
            // console.log(hasLine)
            let bool = [11, 12].includes(this.tabType)
            this.iskeyPerson = !bool
            // this.loadBarsJson()
            // if (bool) {
            if (hasLine) {
                this.loadLinesJson(this.tabType)
            }
            this.loadBarsJson()
            // }
            // else {
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
        // -----------------------------------操作方法END-----------------------------------
        // -----------------------------------接口方法start-----------------------------------
        // 左侧数字牌接口
        getNumData() {
            let obj = {
                areaId: this.areaId,
                taskId: this.taskId
                // timestamp: sessionStorage.getItem('gTime')
            }
            ajax.post('focus/getNum', obj).then(resp => {
                let { data } = resp
                let { ssAllCount, ssczCount, ssldCount, sstdCount, ssswCount, ssjwCount,
                    sszdrCount, ljAllCount, ljczCount, ljldCount, ljtdCount, ljswCount, ljjwCount, ljzdrCount } = data
                this.flipRealData = ssAllCount
                this.flipLJData = ljAllCount
                // 各人员分类数据
                this.tabRealData = [ssczCount, ssldCount, sstdCount, ssswCount, ssjwCount, sszdrCount]
                this.tabLJData = [ljczCount, ljldCount, ljtdCount, ljswCount, ljjwCount, ljzdrCount]
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
            this.areaOpt.data = []
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
            ajax.post('focus/getRankingList', obj).then(resp => {
                let { rows } = resp
                if (this.tabType === 14) {
                    this.tableOpt.data = rows
                } else {
                    this.areaOpt.data = rows
                }
            })
        },
        // 热力图接口
        getMapData() {
            this.dotData = []
            ajax.post('zdqy/gpshot', { taskId: this.taskId, areaId: this.areaId }).then(resp => {
                let { gps, xishu } = resp.data;
                if (xishu && xishu.length) {
                    this.gpsMax = xishu[0];
                }
                if (gps) {
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
        },
        // 加载右侧APP概述
        // getAppData() {
        //     let data = appData()
        //     this.barData = data
        // },
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
        // -----------------------------------接口方法end-----------------------------------
        numRender(index) {
            return this['numFlipData' + index]
        },
        /**
        * 轮询左侧人员数据、柱状图数据、折线图数据、gps热力图数据
        * @param {isTurnOn} 表示是否打开定时器 [true 为打开，false 为关闭]
        * */
        rollPoling (isTurnOn) {
            if (isTurnOn) {
                this.RHide()
                this.popHide()
                // this.poling = setInterval(() => {
                //     this.getNumData()
                // }, 600000)
                this.poling = setInterval(() => {
                    this.getNumData()
                    this.getMapData()
                }, 300000)
            } else {
                // clearInterval(this.poling)
                clearInterval(this.poling)
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
                    this.$refs.pop.style.width = '23%'
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
        }
    },
    watch: {
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
        LJDialog
    }
}
</script>

<style scoped>
:root {
    --leftWidth: 23%;
    --leftTopHeight: 230px;
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
          @e leftWrap{
                width:var(--leftWidth);
                height:100%;
                font-size:14px;
                padding: 0 12px 0 8px;
                background: rgba(33,54,82,1)
          }
          @e flipWrap{
              height:var(--leftTopHeight)
          }
          @e leftTopWrap{
              height:var(--leftTopHeight);
              /* padding-top:10px; */
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
                height: calc(100% - 2 * var(--leftTopHeight));
          }
          @e popWrap{
                position: absolute;
                left: var(--leftWidth);
                top: calc(2 * var(--leftTopHeight));
                height: calc(100% - 2 * var(--leftTopHeight));
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
