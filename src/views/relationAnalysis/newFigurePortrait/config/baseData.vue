<template lang="html">
    <div class="figurePortrait-baseData smallNotLong">
        <el-row class="figurePortrait-baseData__base--title">
            <b class="icon"></b>
            <span v-if="renderData">{{renderData.name}} （{{isMsisdnJM}}）</span>
            <span class="basetitle">基本信息</span>
            <el-radio-group v-model="radioVal">
                <el-radio :label=0>近一天</el-radio>
                <el-radio :label=1>近一周</el-radio>
                <el-radio :label=2>近一月</el-radio>
                <el-radio :label=3>按月
                    <el-select v-model="chooseMonth"
                                style="width: 120px"
                                :disabled="chooseMonthDisabled"
                               placeholder="请选择">
                         <el-option
                              v-for="item in monthArr"
                              :key="item.name"
                              :label="item.name"
                              :value="item.value">
                         </el-option>
                    </el-select>
                </el-radio>
                <el-radio :label=4>全部</el-radio>
            </el-radio-group>
        </el-row>
        <el-row class="figurePortrait-baseData__base--content">
            <el-row class="figurePortrait-sty__height--hundred">
                <el-col :span="10" class="figurePortrait-sty__height--hundred" style="padding: 0">
                    <el-row class="figurePortrait-sty__height--sixty">
                        <frameComp>
                            <div class="figurePortrait-baseData__frame--title">
                                <span>基本信息</span>
                            </div>
                            <el-row class="contentLeft-basis figurePortrait-baseData__frame--content">
                                <el-col :span="12" class="figurePortrait-baseData__base--message dashedBorder">
                                    <div class="figurePortrait-baseData__frame--flexBox">
                                            <ul>
                                                <li v-for="item in baseDataShow" :style="liHeight">
                                                    {{item.name}}
                                                </li>
                                            </ul>
                                            <ul>
                                                <li v-for="item in baseDataShow" :style="liHeight">
                                                    <div>
                                                        <span v-if="item.name === '机身码'" @click="getMoreMsg(0, item.val)" class="figurePortrait-baseData__base--span">
                                                            {{item.val}}
                                                        </span>
                                                        <span v-else-if="item.name === '历史机身码'" @click="getMoreMsg(1, item.val)" class="figurePortrait-baseData__base--span">
                                                            {{item.val}}
                                                        </span>
                                                        <span v-else>
                                                            {{item.val}}
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                    </div>
                                </el-col>
                                <el-col :span="12"
                                        class="figurePortrait-baseData__base--message" style="padding: 0 0 0 5px">
                                        <!--虚拟身份-->
                                        <!--<div class="figurePortrait-baseData__information" v-for="item in virtualData">-->
                                        <!--<ul class="figurePortrait-baseData__information&#45;&#45;label">-->
                                                <!--<li>{{item.name}}</li>-->
                                                <!--<div  v-if="item.value.length > 1">-->
                                                    <!--<li v-for="items in item.value.length - 1">&nbsp;</li>-->
                                                <!--</div>-->
                                            <!--</ul>-->
                                            <!--<ul class="figurePortrait-baseData__information&#45;&#45;content">-->
                                                <!--<div v-if="item.value.length > 0">-->
                                                    <!--<li v-for="items in item.value">{{items}}</li>-->
                                                <!--</div>-->
                                                <!--<li v-else>&nbsp;</li>-->
                                            <!--</ul>-->
                                        <!--</div>-->
                                        <div v-for="item in identityData">
                                            <p class="colorWhite">
                                                <span class="iconTitle"></span>{{item.name}}
                                            </p>
                                            <p class="figurePortrait-baseData__information" :title="item.val" v-if="item.name!=='银行账号'">
                                                {{item.val}}
                                            </p>
                                            <div class="figurePortrait-baseData__information figurePortrait-baseData__frame--flexBox" v-else>
                                                <ul class="figurePortrait-baseData__information--label1">
                                                    <li v-for="it in item.val">{{it.bank}}</li>
                                                </ul>
                                                <ul class="figurePortrait-baseData__information--content1">
                                                    <li v-for="it in item.val">{{it.bankNumber}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!--实名制信息-->
                                        <!--<div class="figurePortrait-baseData__information" v-for="item in realTimeInfo">-->
                                            <!--<ul class="figurePortrait-baseData__information&#45;&#45;label1">-->
                                                <!--<li>{{item.name}}</li>-->
                                            <!--</ul>-->
                                            <!--<ul class="figurePortrait-baseData__information&#45;&#45;content1">-->
                                                <!--<li>{{item.num}}</li>-->
                                            <!--</ul>-->
                                        <!--</div>-->
                                </el-col>
                            </el-row>
                        </frameComp>
                    </el-row>
                    <el-row style="height: 40%;padding: 5px 0 0 0">
                        <frameComp class="frameCover">
                            <div class="figurePortrait-baseData__frame--title" style="padding: 0px">
                                <span>敏感APP名称</span>
                            </div>
                            <div class="figurePortrait-baseData__frame--content headerTrans">
                                <tableComp :option="appOpt"
                                            :comSize="tableHeight">
                                </tableComp>
                            </div>
                        </frameComp>
                    </el-row>
                </el-col>
                <el-col :span="14" style="height: 100%;padding: 0 0 0 5px">
                    <el-row style="height:40%;padding: 0">
                        <el-col :span="12" style="height:100%;padding: 0px">
                            <frameComp>
                                <div class="figurePortrait-baseData__frame--title">
                                    <span>通联时段统计</span>
                                </div>
                                <div class="figurePortrait-baseData__frame--content" style="overflow: hidden">
                                    <div v-loading="areaTimeLoading" style="position: absolute;left:45%;top:50%">
                                        <div class="figurePortrait-baseData__frame--empty" v-show="!areaTimeLoading && !stackLineShow">暂无数据</div>
                                    </div>
                                    <stackLine v-show="stackLineShow" ref="stackLineRef" :option="stackLineOpt" :renderData="stackLineChart"></stackLine>
                                </div>
                            </frameComp>
                        </el-col>
                         <el-col :span="12" style="height: 100%;padding: 0 0 0 5px">
                            <frameComp>
                                <div class="figurePortrait-baseData__frame--title">
                                    <span>上网时段统计</span>
                                </div>
                                <div class="figurePortrait-baseData__frame--content" style="overflow: hidden">
                                     <div v-loading="internetTimeLoading" style="position: absolute;left:45%;top:50%">
                                        <div class="figurePortrait-baseData__frame--empty" v-show="!internetTimeLoading && !barShow">暂无数据</div>
                                     </div>
                                     <barComp1 v-show="barShow" ref="barRef" :option="barOpt" :renderData="barChart"></barComp1>
                                </div>
                            </frameComp>
                        </el-col>
                    </el-row>
                    <el-row style="height: 60%;padding: 5px 0 0 0">
                        <frameComp class="frameCover">
                            <div class="figurePortrait-baseData__frame--title" style="padding: 0px">
                                <span>活动区县</span>
                            </div>
                            <div class="figurePortrait-baseData__frame--content" :style="mapHeight">
                                <el-row style="height: 100%">
                                    <el-col :span="15" class="dashedBorder figurePortrait-sty__height--hundred" style="padding: 0">
                                        <div style="position: relative;height: 100%">
                                            <div id="map"></div>
                                            <span class="figurePortrait-baseData__icon"  @click="showBigMap"></span>
                                        </div>
                                    </el-col>
                                    <el-col :span="9" style="padding: 0px">
                                        <div style="padding: 5px">
                                            <span>活动区县TOP5</span>
                                            <tableComp class="headerTrans gutterNone" :option="activeAreaTop5"
                                                :comSize="activeAreaTable">
                                            </tableComp>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </frameComp>
                    </el-row>
                </el-col>
            </el-row>
        </el-row>
        <div class="figurePortrait-popover" id="pop"  v-show="popover" ref="popover">
            <el-row style="background-color: #1C74C8;padding: 0px 5px;">
                <el-col :span="22">
                    <span v-if="popoverInex === 0">{{imeiTitle}}关联的手机号</span>
                    <span v-else>{{isMsisdnJM}}的历史机身码</span>
                </el-col>
                <el-col :span="2" style="height: 22px;">
                    <p class="figurePortrait-popover__close" @click="close">&#10005</p>
                </el-col>
            </el-row>
            <el-row v-loading="popverLoading" style="min-height: 80px">
                <div style="width: 100%;text-align: center;">
                    <div style="padding: 10px">
                        <ul style="display: inline-block;width: 20%">
                            <li>序号</li>
                        </ul>
                        <ul style="display: inline-block;width: 70%">
                            <li v-if="popoverInex === 0" >手机号</li>
                            <li v-else>机身码</li>
                        </ul>
                    </div>
                    <div v-if="popverData.length === 0 && !popverLoading">
                        暂无数据
                    </div>
                    <div style="padding: 5px" v-else v-for="(item, index) in popverData">
                        <ul style="display: inline-block;width: 20%">
                            {{index+1}}
                        </ul>
                        <ul style="display: inline-block;width: 70%">
                            {{item}}
                        </ul>
                    </div>
                </div>
            </el-row>
        </div>
        <sysDialog size="large"
                    class="figurePortrait"
                   :dialogVisible="bigMapShow"
                   title="活动区县"
                   :showCancel="false"
                   :showConfirm="false"
                   style="martop: 0px"
                   @change="dialogChange">
            <div :style="bigMapDialogHeight"
                 v-if="bigMapShow">
                <bigMap :option="bigMapData" style="height: 100%;width: 100%;position: relative">
                </bigMap>
            </div>
        </sysDialog>
    </div>
</template>

<script>
    import bigMap from './bigMap.vue'
    import sysDialog from 'components/common/dialog'
    import formSelect from 'components/Form'
    import frameComp from 'components/monitor/frameborder'
    import tableComp from 'components/Table'
    import { mapGetters } from 'vuex'
    import { phoneNumChange } from 'utils/index'
    import pieComp from 'components/chart/pieMap'
    // import stackLine from 'components/chart/stackAndLineChart'
    import stackLine from 'components/chart/figurePortrait/newStackAndLineChart'
    import barComp from 'components/chart/figurePortrait/barApp'
    // import barComp1 from 'components/chart/figurePortrait/barApp1'
    import barComp1 from 'components/chart/figurePortrait/newLineAreaChart'
    import { getBaseInfo, getAreaTime, getImei, getHisimei, getVirtualInfo,
        getAreaOppose, getAppUseData, getAreaFive, internetTimeCount } from 'api/relationAnalysis/newFigurePortrait/index'
    import BMap from 'BMap'
    import { areaMap, provinceMap } from 'common/areaMap'

    export default {
        name: 'figurePortrait',
        data () {
            let me = this;
            return {
                isMsisdnJM: '',
                bigMapData: [],
                bigMapShow: false,
                // 敏感app请求是否完成
                reqFinishApp: true,
                // top5请求是否完成
                reqFinishTop5: true,
                chooseMonthCount: -1,
                // 按月选择 默认禁止选择
                chooseMonthDisabled: true,
                map: null,
                radioArea: 0,
                radioCount: 0,
                popover: false,
                popverLoading: false,
                popoverInex: 0,
                popverData: [],
                virtualData: [
                    {
                        name: 'QQ号',
                        value: []
                    },
                    {
                        name: '微信ID',
                        value: []
                    },
                    {
                        name: '邮箱',
                        value: []
                    }
                ],
                homeArea: '',
                workArea: '',
                bankData: [
                ],
                realTimeInfo: [],
                monthArr: [
                ],
                chooseMonth: '',
                frameHeight: '',
                activeCommunication: 0,
                radioVal: 0,
//                barOpt: {
//                    width: '',
//                    height: '',
//                    props: {
//                        gridBottom: 0,
//                        gridTop: 0,
//                        gridLeft: '1%',
//                        gridRight: 0
//                    }
//                },
                barOpt: {
                    width: '100%',
                    props: {
                        gridBottom: 0,
                        gridTop: 0,
                        gridLeft: '1%',
                        gridRight: 0
                    }
                },
                barData: [],
                barChart: [],
                barOptT: {
                    width: '',
                    height: ''
                },
                barDataT: [],
                barChartT: [],
                tableHeight: {
                    height: ''
                },
//                stackLineOpt: {
//                    width: '',
//                    height: '',
//                    props: {
//                        gridBottom: 0,
//                        gridTop: 0,
//                        gridLeft: '1%',
//                        gridRight: 0
//                    },
//                    timeType: 1
//                },
                stackLineOpt: {
                    width: '100%',
                    props: {
                        gridBottom: 0,
                        gridTop: 0,
                        gridLeft: '1%',
                        gridRight: 0
                    },
                    timeType: 1
                },
                stackLineData: [],
                stackLineChart: [],
                choice: {
                    items: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '目标选择',
                                disabled: false,
                                btnType: 'rightTop',
                                click: function () {
                                    me.showPopTable()
                                }
                            }
                        }
                    ]
                },
                baseDataName: '',
                baseDataShow: [
                    { name: '人物标签', val: '' },
                    { name: '手机号', val: '' },
                    { name: '卡号', val: '' },
                    { name: '机身码', val: '' },
                    { name: '历史机身码', val: '' },
                    { name: '所属运营商', val: '' },
                    { name: '手机归属地', val: '' },
                    { name: '手机型号', val: '' },
                    { name: '操作系统', val: '' }
                ],
                baseInfoObj: [
                    { name: '人物标签', val: '', mark: 'mark' },
                    { name: '手机号', val: '', mark: 'msisdn' },
                    { name: '卡号', val: '', mark: 'imsi' },
                    { name: '机身码', val: '', mark: 'imei' },
                    { name: '历史机身码', val: '', mark: 'hisimei' },
                    { name: '所属运营商', val: '', mark: 'spcode' },
                    { name: '手机归属地', val: '', mark: 'homeCode' },
                    { name: '手机型号', val: '', mark: 'pModel' },
                    { name: '操作系统', val: '', mark: 'os' }
                ],
                identityData: [
                    { name: '居住地', val: '' },
                    { name: '工作地', val: '' },
                    { name: '银行账号', val: [] }
                ],
                otherDataShow: [],
                appOpt: {
                    // width: 555,
                    listLoading: false,
                    stripe: false,
                    highlightRow: true,
                    isborder: false,
                    column: [
                        { name: '序号', value: 'index', width: 50, align: 'center' },
                        { name: '敏感APP名称', value: 'name', tooltip: true, align: 'center' },
                        { name: '使用次数', value: 'count', width: 70, align: 'center' },
                        { name: '第一次使用时间', value: 'firstTime', width: 135, align: 'center' },
                        { name: '最后一次使用时间', value: 'lastTime', width: 135, align: 'center' }
                    ],
                    data: []
                },
                activeAreaTop5: {
                    listLoading: false,
                    stripe: false,
                    highlightRow: true,
                    isborder: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '区县名称', value: 'loc', align: 'center', tooltip: true }
                    ],
                    data: []
                },
                internetTimeLoading: false,
                areaTimeLoading: false,
                areaLocalLoading: false,
                areaOpposeLoading: false,
                stackLineShow: false,
                barShow: false,
                barTShow: false,
                // 通联时段 上网时段 敏感app 活动区域
                queryObj: {
                    msisdn: '',
                    type: 0,
                    time: 'null',
                    imei: ''
                },
                //  对端区域
                opposeObj: {
                    msisdn: '',
                    type: 0,
                    time: 'null',
                    areaId: 0,
                    dimId: 0
                },
                // 点击 机身码 历史机身码
                imeiObj: {
                    type: 0,
                    time: 'null',
                    imei: ''
                },
                loading1: true,
                imeiTitle: ''
            }
        },
        created () {
            this.frameHeight = (this.option.height + 200 - 67 - 41)
            // this.frameHeight = this.option.height / 2
            // this.stackLineOpt.height = this.frameHeight - 25 + 'px'
            // this.tableHeight.height = this.frameHeight * 0.4 - 66
            // console.log(this.tableHeight.height)
        },
        beforeMount () {
            this.barOpt.height = this.frameHeight + 'px'
            this.stackLineOpt.height = this.frameHeight + 'px'
        },
        mounted () {
            this.createMap()
        },
        destroyed () {
            this.map = null;
        },
        props: [
            'option',
            'showIndexChange',
            'renderData'
        ],
        watch: {
            'showIndexChange' (val) {
                if (val !== 0) {
                    this.appOpt.listLoading = false
                    this.activeAreaTop5.listLoading = false
                } else {
                    // .el-table__body-wrapper
                    $('.figurePortrait-baseData__frame--title').css({
                        'padding-left': '0.8px'
                    })
                    setTimeout(() => {
                        $('.figurePortrait-baseData__frame--title').css({
                            'padding-left': '0px'
                        })
                    })
                    if (this.activeAreaTop5.data.length) {
                        this.activeAreaTop5.listLoading = false
                    } else {
                        if (!this.reqFinishTop5) {
                            this.activeAreaTop5.listLoading = true
                        }
                    }
                    if (this.appOpt.data.length) {
                        this.appOpt.listLoading = false
                    } else {
                        if (!this.reqFinishApp) {
                            this.appOpt.listLoading = true
                        }
                    }
                }
            },
//            'barShow' () {
//                this.barOpt = {
//                    width: '100%',
//                    height: this.frameHeight + 'px',
//                    props: {
//                        gridBottom: 0,
//                        gridTop: 0,
//                        gridLeft: '1%',
//                        gridRight: 0
//                    }
//                }
//            },
            'barTShow' () {
                this.barOptT = {
                    width: '100%',
                    height: this.frameHeight + 'px'
                }
            },
//            'stackLineShow' () {
//                this.stackLineOpt = {
//                    width: '100%',
//                    height: this.frameHeight + 'px',
//                    props: {
//                        gridBottom: 0,
//                        gridTop: 0,
//                        gridLeft: '1%',
//                        gridRight: 0
//                    },
//                    timeType: 1
//                }
//            },
            'renderData' (val) {
                this.isMsisdnJM = this.isPhoneJM ? phoneNumChange(val.msisdn) : val.msisdn
                this.reqFinishApp = false
                this.reqFinishTop5 = false
                this.popover = false;
                this.getMonthArrFun(val.time)
                this.queryObj.msisdn = val.msisdn
                this.opposeObj.msisdn = val.msisdn
                this.imeiObj.imei = val.imei
                this.opposeObj.areaId = this.radioArea
                this.opposeObj.dimId = this.radioCount
                if (this.radioVal === 0) {
                    this.queryIng()
                } else {
                    this.radioVal = 0
                }
            },
            'radioVal' (val) {
                this.popover = false;
                if (val === 3) {
                    this.chooseMonthDisabled = false
                    if (this.chooseMonth === '') {
                        this.chooseMonth = this.renderData.time[0].name
                    }
                } else {
                    this.chooseMonthDisabled = true
                }
                if (this.renderData) {
                    this.queryObj.type = val;
                    this.opposeObj.type = val;
                    this.imeiObj.imei = val;
                    this.opposeObj.areaId = this.radioArea
                    this.opposeObj.dimId = this.radioCount
                    if (val === 3) {
                        if (!this.chooseMonth) {
                            this.$message({
                                type: 'info',
                                message: '请选择具体月份'
                            })
                            return;
                        }
                        let monthVal = this.findMonthValue(this.chooseMonth)
                        this.queryObj.time = monthVal
                        this.opposeObj.time = monthVal
                        this.imeiObj.time = monthVal
                        this.opposeObj.areaId = this.radioArea
                        this.opposeObj.dimId = this.radioCount
                    } else {
                        this.queryObj.time = 'null'
                        this.opposeObj.time = 'null'
                        this.imeiObj.time = 'null'
                        this.opposeObj.areaId = this.radioArea
                        this.opposeObj.dimId = this.radioCount
                    }
                    this.queryIng();
                }
            },
            'chooseMonth' (val) {
                this.popover = false;
                this.chooseMonthCount++
                if (val) {
                    if (this.chooseMonthCount && this.renderData) {
                        this.queryObj.time = val
                        this.opposeObj.time = val
                        this.imeiObj.time = val
                        this.opposeObj.areaId = this.radioArea
                        this.opposeObj.dimId = this.radioCount
                        this.queryIng();
                    }
                }
            },
            'radioArea' (val) {
                this.opposeObj.areaId = val
                // this.opposeArea();
            },
            'radioCount' (val) {
                this.opposeObj.dimId = val
                // this.opposeArea();
            },
            'radioCommunicationT' () {
                this.cutAreaTime();
            },
            // 'radioArea' () {
            //     this.cutLocalArea()
            // },
            'radioAreaT' () {
                this.cutOpposeArea()
            },
            'option.height'(val) {
                // let height = (val + 200 - 40) / 2 - 49
                // let height = (val + 200 - 67 - 41)
                this.frameHeight = (val + 200 - 67 - 41)
                this.tableHeight.height = this.frameHeight * 0.4 - 10
                // 图表高度自适应
                // 右侧col-14的宽度
                let col14 = ($(window).width() - 40) * 7 / 12 - 15
                let echartsWidth = col14 / 2 - 12 - 25 + 'px'
                // let echartsHeight = val / 2 + 40 + 'px'
                let sizeObj = {
                    width: echartsWidth,
                    height: this.frameHeight * 0.34 + 'px'
                }
                this.$refs.stackLineRef.resizeComp(sizeObj)
                this.$refs.barRef.resizeComp(sizeObj)
            }
        },
        methods: {
            //  基本信息
            async getBaseInfoFun () {
                let baseData = this.baseDataShow
                for (let i in baseData) {
                    baseData[i].val = ''
                }
                let resp = await getBaseInfo({
                    msisdn: this.renderData.msisdn,
                    name: this.renderData.name,
                    mark: this.renderData.flagNames,
                    imsi: this.renderData.imsi,
                    imei: this.renderData.imei,
                    time: this.queryObj.time,
                    type: this.queryObj.type
                });
                if (resp && resp.data) {
                    let data = resp.data
                    this.baseDataName = data.name
                    this.baseDataShow = []
                    let { entries } = Object
                    this.baseInfoObj.map(item => {
                        for (let [key, value] of entries(data)) {
                            if (value && value !== 'null') {
                                if (item.mark === key) {
                                    if (item.mark === 'msisdn' && this.isPhoneJM) {
                                        data[key] = phoneNumChange(data[key])
                                    }
                                    this.baseDataShow.push({
                                        name: item.name,
                                        val: data[key]
                                    })
                                }
                            }
                        }
                    })
                    // if (data.type - 0 === 0) {
                    //     this.baseDataShow[5].val = '涉藏'
                    // } else if (data.type - 0 === 1) {
                    //     this.baseDataShow[5].val = '涉疆'
                    // } else if (data.type - 0 === 2) {
                    //     this.baseDataShow[5].val = '重点人'
                    // }
                }
            },
            getAreaTimeFun () {
                this.loadLoading(1, ['stackLineChart', 'areaTimeLoading', 'stackLineShow'])
                getAreaTime(this.queryObj).then((resp) => {
                    if (resp && resp.data) {
                        this.stackLineChart = resp.data
                        this.cancelLoading(1, ['stackLineChart', resp.data, 'areaTimeLoading', 'stackLineShow'])
                        setTimeout(() => {
                            this.cutAreaTime();
                        })
                    }
                }).catch((e) => {
                    if (e.status === 300) {
                        this.cancelLoading(1, ['stackLineChart', [], 'areaTimeLoading', 'stackLineShow'])
                    }
                })
            },
            getAreaOpposeFun () {
                this.loadLoading(1, ['barChartT', 'areaOpposeLoading', 'barTShow'])
                getAreaOppose(this.opposeObj).then(resp => {
                    if (resp && resp.data) {
                        this.barChartT = resp.data
                        this.cancelLoading(1, ['barChartT', resp.data, 'areaOpposeLoading', 'barTShow'])
                        setTimeout(() => {
                            this.cutOpposeArea();
                        })
                    }
                }).catch(e => {
                    if (e.status === 300) {
                        this.cancelLoading(1, ['barChartT', [], 'areaOpposeLoading', 'barTShow'])
                    }
                })
            },
            //  敏感APP
            getSensitiveAppFun () {
                this.loadLoading(0, this.appOpt);
                getAppUseData(this.queryObj).then(resp => {
                    if (resp && resp.data) {
                        this.reqFinishApp = true
                        this.appOpt.data = resp.data.sensitive
                        this.cancelLoading(0, this.appOpt, resp.data.sensitive)
                    }
                }).catch(e => {
                    if (e.status === 300) {
                        this.cancelLoading(0, this.appOpt, [])
                    }
                })
            },
            getAreaFiveFun () {
                this.loadLoading(0, this.activeAreaTop5);
                getAreaFive(this.queryObj).then(resp => {
                    if (resp && resp.rows) {
                        let tableData = []
                        resp.rows.map(item => {
                            if (item.loc) {
                                tableData.push(item)
                            }
                        })
                        this.reqFinishTop5 = true
                        this.activeAreaTop5.data = tableData
                        this.activeAreaTop5.listLoading = false
                        // this.activeAreaTop5.lo = false
                        this.getBoundary(this.activeAreaTop5.data)
                        this.cancelLoading(0, this.activeAreaTop5, resp.rows)
                    }
                }).catch(e => {
                    if (e.status === 300) {
                        this.cancelLoading(0, this.activeAreaTop5, [])
                    }
                })
            },
            internetTimeFun () {
                this.loadLoading(1, ['barChart', 'internetTimeLoading', 'barShow'])
                internetTimeCount(this.queryObj).then(resp => {
                    if (resp && resp.data) {
                        this.barChart = resp.data
                        setTimeout(() => {
                            this.cancelLoading(1, ['barChart', resp.data, 'internetTimeLoading', 'barShow'])
                        }, 500)
                    // setTimeout(() => {
                    //     this.cutOpposeArea();
                    // })
                    }
                }).catch(e => {
                    if (e.status === 300) {
                        this.cancelLoading(1, ['barChart', [], 'internetTimeLoading', 'barShow'])
                    }
                })
            },
            // 按月选择
            // async getMonthArrFun () {
            //     let resp = await getMonthArr()
            //     if (resp && resp.data) {
            //         this.monthArr = resp.data
            //         this.chooseMonth = this.monthArr[0].name
            //     }
            // },
            getMonthArrFun (data) {
                this.monthArr = data
                // this.chooseMonth = data[0].name
            },
            // 获取 机身码关联的手机号
            getImeiFun () {
                getImei(this.queryObj).then(resp => {
                    if (resp && resp.data) {
                        this.popverData = resp.data
                        this.popverLoading = false;
                    }
                }).catch(e => {
                    if (e.status === 300) {
                        this.popverLoading = false;
                    }
                })
            },
            getHisimeiFun () {
                getHisimei(this.queryObj).then(resp => {
                    if (resp && resp.data) {
                        this.popverData = resp.data
                        this.popverLoading = false;
                    }
                }).catch(e => {
                    if (e.status === 300) {
                        this.popverLoading = false;
                    }
                })
            },
            async getVirtualInfoFun () {
                this.identityData.map(item => {
                    item.val = ''
                })
                let resp = await getVirtualInfo(this.queryObj)
                if (resp && resp.data) {
                    // this.popverData = resp.data
                    this.popverLoading = false;
                    this.virtualData[0].value = resp.data.qq
                    this.virtualData[1].value = resp.data.weChat
                    this.virtualData[2].value = resp.data.email
                    this.identityData = []
                    this.identityData = this.handleBankData(resp.data)
                    this.realTimeInfo = resp.data.realTimeInfo;
                }
            },
            //  创建地图
            createMap () {
                let map = new BMap.Map('map');
                this.map = map
                // let zoom = 14
                // let point = new BMap.Point(this.globalKeys.gMapCenter[0], this.globalKeys.gMapCenter[1])
                // map.centerAndZoom(point, zoom)
                map.disableDragging()
                map.disableDoubleClickZoom()
                map.disableScrollWheelZoom();
                let pArr = [
                    {
                        lat: 59.0,
                        lng: 73.0
                    },
                    {
                        lat: 59.0,
                        lng: 136.0
                    },
                    {
                        lat: 3.0,
                        lng: 136.0
                    },
                    {
                        lat: 3.0,
                        lng: 73.0
                    },
                    {
                        lat: 59.0,
                        lng: 73.0
                    }
                ]
                // 限定区域点数组
                let pointArr = []
                let gMapKey = this.globalKeys.gMapKey
                // gMapKey = 'changping'
                provinceMap[gMapKey].forEach(item => {
                    let pbArr = item
                    let ply = new BMap.Polygon(pbArr, {
                        strokeWeight: 5,
                        strokeColor: '#101c32',
                        fillOpacity: 0.05,
                        fillColor: '#101c32'
                    });
                    ply.disableMassClear()
                    map.addOverlay(ply);
                    let path = ply.getPath();
                    pointArr = pointArr.concat(path);
                    pArr = pArr.concat(path);
                    pArr.push(pArr[0]);
                })
                map.setViewport(pointArr, {
                    zoomFactor: 0
                });
                let inverse = new BMap.Polygon(pArr, {
                    strokeOpacity: 0.0000001,
                    strokeColor: '',
                    strokeWeight: 0.00001,
                    fillColor: '#101c32',
                    fillOpacity: 1
                });
                inverse.disableMassClear()
                map.addOverlay(inverse);
            },
            getBoundary (data) {
                // 取mapKey(ningxia、qinghai)
                this.map.clearOverlays();
                let gMapKey = this.globalKeys.gMapKey
                if (data && data.length) {
                    data.forEach(item => {
                        let areacode = areaMap[gMapKey][item.areaCode][0]
                        // console.log(areacode)
                        let ply = new BMap.Polygon(areacode, {
                            strokeWeight: 2,
                            strokeColor: '#ff0000',
                            fillColor: '#ff0000',
                            fillOpacity: 0.5
                        });
                        this.map.addOverlay(ply);
                    })
                }
                // for (let i in areaMap['qinghai']) {
                //     try {
                //         let ply = new BMap.Polygon(areaMap['qinghai'][i][0], { strokeWeight: 2, strokeColor: '#ff0000',
                //             fillColor: '#ff0000', fillOpacity: 0.5 });
                //         map.addOverlay(ply);
                //     } catch (e) {
                //         this.$alert(`区县${i}与库表区域码不匹配`, {
                //             confirmButtonText: '确定'
                //         })
                //     }
                // }
            },
            showBigMap () {
                this.bigMapShow = true
                this.bigMapData = this.activeAreaTop5.data
            },
            findMonthValue (val) {
                let value = val
                this.monthArr.forEach((item) => {
                    if (val === item.name) {
                        value = item.value
                    }
                })
                return value
            },
            // 进行查询
            queryIng () {
                this.getBaseInfoFun();
                this.getVirtualInfoFun();
                this.communicationPeriod();
                this.communicationQuanity();
                // this.opposeArea();
                this.getSensitiveAppFun();
                this.getAreaFiveFun();
            },
            //  加载loading 0 表格 1 echart图
            //  opt[0] 清空数据 opt[1] 当前加载动画 opt[2] 切换前的动画 取消
            loadLoading (type, opt) {
                switch (type) {
                    case 0:
                        opt.data = [];
                        opt.listLoading = true;
                        break;
                    case 1:
                        this[opt[0]] = [];
                        this[opt[1]] = true;
                        this[opt[2]] = false;
                        break;
                }
            },
            //  取消loading
            cancelLoading (type, opt, resp) {
                switch (type) {
                    case 0:
                        if (opt.data.length) {
                            opt.listLoading = false;
                        }
                        if (resp.length === 0) {
                            setTimeout(() => {
                                opt.listLoading = false;
                            }, 200)
                        }
                        break;
                    case 1:
                        if (this[opt[0]].length) {
                            this[opt[2]] = false;
                            this[opt[3]] = true;
                        } else {
                            setTimeout(() => {
                                this[opt[2]] = false;
                            }, 200)
                        }
                        if (opt[1].length === 0) {
                            setTimeout(() => {
                                this[opt[2]] = false;
                            }, 200)
                        }
                        break;
                }
            },
            //  切换条件 通联时段
            cutAreaTime () {
                // if (!this.stackLineData[this.radioCommunicationT]) {
                //     return;
                // }
                // if (!this.stackLineData[this.radioCommunicationT].length) {
                //     this.stackLineChart = []
                //     this.stackLineShow = false;
                //     return;
                // }
                this.stackLineShow = true;
                // this.stackLineChart = this.stackLineData[this.radioCommunicationT];
            },
            cutOpposeArea () {
                if (!this.barDataT[this.radioAreaT]) {
                    return;
                }
                if (!this.barDataT[this.radioAreaT].length) {
                    this.barChartT = []
                    this.barTShow = false;
                    return;
                }
                this.barTShow = true;
                this.barChartT = this.barDataT[this.radioAreaT];
            },
            //  点击 通联时段统计
            communicationPeriod () {
                // this.activeCommunication = 0;
                if (!this.renderData) return
                this.getAreaTimeFun()
            },
            //  点击 上网时段统计
            communicationQuanity () {
                // this.activeCommunication = 1;
                if (!this.renderData) return
                this.internetTimeFun();
            },
            //  点击 对端区域统计
            opposeArea () {
                if (!this.renderData) return
                this.getAreaOpposeFun()
            },
            //  获取 机身码关联的手机号 或者 它的历史机身码
            getMoreMsg (val, imei) {
                this.imeiTitle = imei
                this.popoverInex = val;
                let e = window.event
                let x = e.clientX;
                let y = e.clientY;
                this.location(x, y)
                this.popover = true;
                this.popverLoading = true;
                this.popverData = []
                this.queryObj.imei = imei
                if (this.popoverInex === 0) {
                    this.getImeiFun()
                } else {
                    this.getHisimeiFun()
                }
                // setTimeout(() => {
                //     this.popverLoading = false
                // }, 1500)
            },
            location (nowX, nowY) {
                this.$nextTick(() => {
                    this.$refs.popover.style.left = nowX + 'px'
                    this.$refs.popover.style.top = nowY - 80 + 'px'
                })
                // this.$nextTick(() => {
                //     let bar = this.$refs.popover;
                //     startDrag(bar, bar)
                // })
            },
            close () {
                this.popover = false
                this.popverLoading = false;
            },
            dialogChange (val) {
                this.bigMapShow = val;
            },
            // 判断虚拟身份银行信息是否为null及相关处理
            handleBankData(obj) {
                let mediaArr = []
                if (obj.home !== null && obj.home !== 'null') {
                    mediaArr.push({
                        name: '居住地', val: obj.home
                    })
                }
                if (obj.work !== null && obj.work !== 'null') {
                    mediaArr.push({
                        name: '工作地', val: obj.work
                    })
                }
                if (obj.bankCard !== null && obj.bankCard !== 'null') {
                    if ($.isArray(obj.bankCard)) {
                        let bankCardArr = []
                        obj.bankCard.map(item => {
                            let { bank, bankNumber } = item
                            let bankBool = bank && bank !== null && bank !== 'null'
                            let bankNumBool = bankNumber && bankNumber !== null && bankNumber !== 'null'
                            if (bankBool && bankNumBool) {
                                bankCardArr.push({
                                    bank: item.bank, bankNumber: item.bankNumber
                                })
                            } else if (bankBool || bankNumBool) {
                                if (bankBool) {
                                    bankCardArr.push({
                                        bank: item.bank, bankNumber: '----'
                                    })
                                } else {
                                    bankCardArr.push({
                                        bank: '----', bankNumber: item.bankNumber
                                    })
                                }
                            }
                        })
                        if (bankCardArr.length !== 0) {
                            mediaArr.push({
                                name: '银行账号', val: bankCardArr
                            })
                        }
                    }
                }
                return mediaArr
            }
        },
        computed: {
            liHeight () {
                return {
                    height: parseInt(100 / this.baseDataShow.length) + '%'
                }
            },
            bigMapDialogHeight () {
                return {
                    height: window.screen.height * 0.65 + 'px'
                    // height: this.frameHeight * 1.1 + 'px'
                }
            },
            ...mapGetters({
                'isPhoneJM': 'global/isPhoneJM',
                'globalKeys': 'global/globalKeys'
            }),
            'mapHeight' () {
                return {
                    height: (this.frameHeight - 36) * 0.6 + 12 + 'px'
                }
            },
            'activeAreaTable' () {
                return {
                    height: (this.frameHeight - 36) * 0.6 - 15
                }
            },
            'dynamicFrameContentHeight' () {
                return {
                    height: this.option.height / 2 - 5 + 'px',
                    display: 'flex',
                    alignItems: 'center'
                }
            }
        },
        components: {
            bigMap,
            sysDialog,
            formSelect,
            frameComp,
            tableComp,
            pieComp,
            stackLine,
            barComp1,
            barComp
        }
    }
</script>

<style lang="postcss">
    /*@import '~@/assets/css/common/var.css';*/
    .contentLeft-basis{
        height: calc(100% - 28px);
        overflow: auto;
        opacity: 0.75;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #A2EEFF;
    }
    .colorWhite{
        color: #A2EEFF;
        font-size: 13px;
    }
    .iconTitle{
        display: inline-block;
        width: 4px;
        height: 14px;
        background: #20a5dc;
        margin: -1px 4px;
    }
    .dashedBorder{
        border-right:1px dashed rgba(255,255,255,0.2);
    }
    .activeCommunication{
        color: #20a5dc !important;
        border-bottom: 2px solid #20a5dc;
    }
    .activeArea{
        color: #20a5dc !important;
        border-bottom: 2px solid #20a5dc;
    }
    #map {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .frameCover .figurePortrait-frame {
        padding-bottom: 0px;
    }
    .frameCover .figurePortrait-baseData__frame--content {
        padding: 0 0 0 0;
    }
    @component-namespace figurePortrait {
        @b baseData {
            width: 100%;
            height:100%;
            font-family: PingFangSC-Regular;
            /* font-size: 14px; */
            @e icon {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 24px;
                height: 24px;
                background: url('~@/assets/images/common/maxView.png');
                cursor: pointer;
            }
            @e base {
                height: 100%;
                /*border: 1px solid red;*/
                /*height: 230px;*/
                /*linear-gradient(-45deg, transparent 15px, #58a 0);*/
                @m title {
                    font-size: 14px;
                    padding: 0 0 5px 10px;
                    // padding-bottom: 5px;
                    color: #9af5f6;
                    .basetitle{
                        padding-right:12px;
                    }
                    .icon{
                        display:inline-block;
                        width:4px;
                        height:16px;
                        margin-right: 6px;
                        background: #20a5dc;
                        vertical-align: top;
                        margin-top: 3px;
                    }
                }
                @m content {
                    height: calc(100% - 29px);
                }
                @m headImg1 {
                    width: 100%;
                    height: 100%;
                    /*overflow: hidden;*/
                    /*background-size: cover;*/
                    /*background: url('~@/assets/images/headImg.png') no-repeat 0px 0px;*/
                }
                @m message {
                    height: 100%;
                    font-size: 13px;
                    // position: relative;
                    // top: 2px;
                    // border: 1px solid #0B4973;
                    // padding: 2px 2px 2px 15px !important;
                    // border-left: 1px dashed rgba(255,255,255,1);
                    // padding: 5px !important;
                    // overflow: hidden;
                    /*text-align: center;*/
                }
                @m message2 {
                    display: flex;
                    align-items: center;
                    padding: 5px;
                    /*background: #000D36;*/
                    /*height: 300px;*/
                }
                @m span {
                    color:rgba(0,197,255,1);
                    // display: inline-block;
                    // height: 10px;
                    // width: 10px;
                    // background: red;
                    cursor: pointer;
                }
            }
            @e frame {
                @m title {
                    height: 36px;
                    line-height: 36px;
                    /* background: linear-gradient(135dedddg, transparent 9px, rgba(27,117,184,0.20) 0); */
                    color: #A2EEFF;
                    font-size: 16px;
                    background: rgba(27,117,184,0.20);
                    box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.10);
                    & span {
                        cursor: pointer;
                        margin-left: 10px;
                    }
                }
                @m content {
                    /*overflow: auto;*/
                    /*height: 250px;*/
                    padding: 10px;
                    padding: 6px 0 0 5px;
                    width: 100%;
                    height: calc(100% - 38px);
                    /* background: linear-gradient(-45deg, transparent 9px, rgba(0, 0, 0, 0.7) 0); */
                    /* background: linear-gradient(-45deg, transparent 9px, #101c32 0); */
                    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
                    & ul {
                        height: 100%;
                    }
                    & ul li {
                        width: 100%;
                        /* color:rgba(162,238,255,1); */
                        line-height: 24px;
                        opacity: 0.75;
                        font-family: PingFangSC-Regular;
                        color: #A2EEFF;
                    }
                    & ul:last-child li {
                        opacity: 1;
                    }
                }
                @m flexBox{
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                }
                @m empty {
                    /* color: #9af5f6; */
                    color: #909399;
                    /* opacity: 0.6; */
                    font-size: 12px;
                }
            }
            @e information {
                // height: 28px;
                font-size: 14px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding-left: 10px;
                padding-right:6px;
                // display: flex;
                @m label {
                    display: inline-block;
                    width: 22%;
                    text-align: center
                }
                @m content {
                    display: inline-block;
                    width: 75%;
                }
                @m label1 {
                    display: inline-block;
                    width: 30%;
                    text-align: center
                }
                @m content1 {
                    /*margin-left: 10px;*/
                    display: inline-block;
                    width: 65%;
                }
            }
        }
        @b popover {
            position: absolute;
            top: 50px;
            width: 250px;
            /*min-height: 100px;*/
            background-color: rgba(0,0,0,0.7);
            color: #ffffff;
            font-size: 10px;
            z-index: 666;
            border: 1px solid #1C74C8;
            border-bottom-right-radius: 15px;
            @e close {
                font-size: 10px;
                color: #ffffff;
                padding: 0px 0px 1px 6px;
                cursor: pointer;
                &:hover {
                    /*color: #20a0ff;*/
                }
            }
            @e title {
                display: inline-block;
                text-align: left;
                padding: 5px 10px;
                color: #fff;
                /*background-color: #268CC6;*/
            }
            @e content {
                padding: 5px 10px;
                height: 160px;
                text-align: center;
            }
        }
        @b sty {
            @e padding {
                @m nil {
                    padding: 0px;
                }
                @m left {
                    padding: 0 0 0 5px;
                }
            }
            @e height {
                @m hundred {
                    height: 100%;
                }
                @m sixty {
                    height: calc(60% - 5px);
                }
                @m forty {
                    height: 40%;
                }
            }
        }
    }
</style>
