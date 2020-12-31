<template lang="html">
    <div style="width: 100%;height:100%;">
        <el-row>
            <el-col :span="9" class="ga-baseData__base" style="padding: 0px">
                <el-row>
                    <el-col :span="10" class="ga-baseData__base--headImg">
                    </el-col>
                    <el-col :span="14"
                            class="ga-baseData__base--message"
                            style="padding: 0 0 0 5px;">
                        <div class="ga-baseData__base--message1">
                            名字&nbsp;&nbsp;&nbsp;{{baseDataName}}
                        </div>
                        <div class="ga-baseData__base--message2">
                            <div style="width:100%;height: 180px;">
                                <div v-for="item in baseDataShow">
                                    <span style="display: inline-block;width: 45%">{{item.name}}</span>
                                    <span style="display: inline-block;width: 50%">{{item.val}}</span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="15" style="padding:0 0 0 15px">
                <el-row>
                    <el-col :span="12">
                        <frameComp>
                            <div class="ga-baseData__frame--title">
                                <span @click="communicationQuanity" :class="[{activeCommunication:activeCommunication === 0}]">通联量统计</span>
                                <span @click="communicationPeriod" :class="[{activeCommunication:activeCommunication === 1}]">通联时段统计</span>
                            </div>
                            <div class="ga-baseData__frame--content" style="overflow: hidden">
                                <div v-show="!activeCommunication">
                                    <div v-loading="areaCountLoading" style="position: absolute;left:50%;top:50%">
                                        <div class="ga-baseData__frame--empty" v-show="!areaCountLoading && !pieCompShow">暂无数据</div>
                                    </div>
                                    <el-row style="text-align: right">
                                        <el-radio-group v-model="radioCommunication">
                                            <el-radio :label="day">近一天</el-radio>
                                            <el-radio :label="week">近一周</el-radio>
                                            <el-radio :label="month">近一月</el-radio>
                                        </el-radio-group>
                                    </el-row>
                                    <el-row :style="dynamicFrameContentHeight">
                                        <el-col :span="8">
                                            <ul>
                                                <li v-for="item in communicationQuanityData">
                                                     {{item.name}}&nbsp;&nbsp;{{item.val}}
                                                </li>
                                            </ul>
                                        </el-col>
                                        <el-col :span="16" style="display: inline-block;" class="pieCompWidth">
                                            <pieComp v-show="pieCompShow" :option="circleOpt" :renderData="circleDataChart"></pieComp>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div v-show="activeCommunication">
                                    <div v-loading="areaTimeLoading" style="position: absolute;left:50%;top:50%">
                                        <div class="ga-baseData__frame--empty" v-show="!areaTimeLoading && !stackLineShow">暂无数据</div>
                                    </div>
                                    <el-row style="text-align: right">
                                        <el-radio-group v-model="radioCommunicationT">
                                            <el-radio :label="day">近一天</el-radio>
                                            <el-radio :label="week">近一周</el-radio>
                                            <el-radio :label="month">近一月</el-radio>
                                        </el-radio-group>
                                    </el-row>
                                    <stackLine v-show="stackLineShow" :option="stackLineOpt" :renderData="stackLineChart"></stackLine>
                                </div>
                            </div>
                        </frameComp>
                    </el-col>
                     <el-col :span="12">
                        <frameComp>
                            <div class="ga-baseData__frame--title">
                                <span @click="localArea" :class="[{activeArea:activeArea === 0}]">本端区域统计</span>
                                <span @click="opposeArea" :class="[{activeArea:activeArea === 1}]">对端区域统计</span>
                            </div>
                            <div class="ga-baseData__frame--content">
                                <div v-show="!activeArea">
                                    <div v-loading="areaLocalLoading" style="position: absolute;left:50%;top:50%">
                                        <div class="ga-baseData__frame--empty" v-show="!areaLocalLoading && !barShow">暂无数据</div>
                                    </div>
                                    <el-row style="text-align: right">
                                        <el-radio-group v-model="radioArea">
                                            <el-radio :label="day">24小时</el-radio>
                                            <el-radio :label="week">近一周</el-radio>
                                            <el-radio :label="month">近一月</el-radio>
                                        </el-radio-group>
                                    </el-row>
                                    <barComp v-show="barShow" :option="barOpt" :renderData="barChart"></barComp>
                                </div>
                                <div v-show="activeArea">
                                    <div v-loading="areaOpposeLoading" style="position: absolute;left:50%;top:50%">
                                        <div class="ga-baseData__frame--empty" v-show="!areaOpposeLoading && !barTShow">暂无数据</div>
                                    </div>
                                    <el-row style="text-align: right">
                                        <el-radio-group v-model="radioAreaT">
                                            <el-radio :label="day">24小时</el-radio>
                                            <el-radio :label="week">近一周</el-radio>
                                            <el-radio :label="month">近一月</el-radio>
                                        </el-radio-group>
                                    </el-row>
                                    <barComp v-show="barTShow" :option="barOptT" :renderData="barChartT"></barComp>
                                </div>
                            </div>
                        </frameComp>
                    </el-col>
                </el-row>
                <el-row>
                    活动区域Top5
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" style="padding: 0px">
                 <frameComp>
                    <div class="ga-baseData__frame--title" style="padding: 0px">
                        <tableComp :option="bookMessage"
                                    :comSize="tableHeight">
                        </tableComp>
                    </div>
                    <div class="ga-baseData__frame--content"></div>
                 </frameComp>
            </el-col>
            <el-col :span="15" style="padding:0 0 0 15px">
                <frameComp>
                    <div class="ga-baseData__frame--title" style="padding: 0px">
                        <tableComp :option="topFiveMessage"
                                   :comSize="tableHeight">
                        </tableComp>
                    </div>
                    <div class="ga-baseData__frame--content"></div>
                 </frameComp>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import formSelect from 'components/Form'
    import frameComp from 'components/monitor/frame'
    import tableComp from 'components/Table'
    import pieComp from 'components/chart/pieMap'
    import stackLine from 'components/chart/stackAndLineChart'
    import barComp from 'components/chart/figurePortrait/barApp'
    import { getBaseInfo, getAreaCount, getAreaTime, getAreaLocal,
        getAreaOppose, getBooking, getAreaFive } from 'api/relationAnalysis/figurePortrait/index'

    export default {
        name: 'figurePortrait',
        data () {
            let me = this;
            return {
                day: 'day',
                week: 'week',
                month: 'month',
                frameHeight: '',
                activeCommunication: 0,
                activeArea: 0,
                radioCommunication: 'day',
                radioCommunicationT: 'day',
                radioArea: 'day',
                radioAreaT: 'day',
                circleOpt: {
                    width: 230,
                    height: ''
                },
                circleData: [],
                circleDataChart: [],
                barOpt: {
                    width: 350,
                    height: ''
                },
                barData: [],
                barChart: [],
                barOptT: {
                    width: 350,
                    height: ''
                },
                barDataT: [],
                barChartT: [],
                tableHeight: {
                    height: ''
                },
                stackLineOpt: {
                    width: '350px',
                    height: '',
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
                communicationQuanityData: [
                    { name: '主叫次数', val: ' ' },
                    { name: '被叫次数', val: ' ' },
                    { name: '主短次数', val: ' ' },
                    { name: '被短次数', val: ' ' },
                    { name: '通联总计', val: ' ' }
                ],
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
                    { name: '手机号', val: ' ' },
                    { name: '卡号', val: ' ' },
                    { name: '机身码', val: ' ' },
                    { name: '所属运营商', val: ' ' },
                    { name: '手机归属地', val: ' ' },
                    { name: '人物标签', val: ' ' }
                ],
                bookMessage: {
//                    width: 555,
                    listLoading: false,
                    stripe: false,
                    highlightRow: true,
                    column: [
                        { name: '序号', value: 'index', width: 55, align: 'center' },
                        { name: '订票平台', value: 'phone', align: 'center' },
                        { name: '出发时间', value: 'starttime', width: 90, align: 'center' },
                        { name: '出发地', value: 'startloc', width: 80, align: 'center' },
                        { name: '目的地', value: 'endloc', align: 'center', tooltip: true },
                        { name: '订票时间', value: 'tickettime', width: 90, align: 'center' }
                    ],
                    data: []
                },
                topFiveMessage: {
                    listLoading: false,
                    stripe: false,
                    highlightRow: true,
                    column: [
                        { name: '排行', value: 'index', width: 60, align: 'center' },
                        { name: '停留总时长', value: 'staytime', width: 100, align: 'center' },
                        { name: '活动次数', value: 'top5count', width: 80, align: 'center' },
                        { name: 'LAC', value: 'lac', width: 100, align: 'center' },
                        { name: 'CI', value: 'ci', width: 100, align: 'center' },
                        { name: '位置描述', value: 'loc', align: 'center', tooltip: true }
                    ],
                    data: []
                },
                areaCountLoading: false,
                areaTimeLoading: false,
                areaLocalLoading: false,
                areaOpposeLoading: false,
                pieCompShow: false,
                stackLineShow: false,
                barShow: false,
                barTShow: false
            }
        },
        created () {
            this.frameHeight = this.option.height / 2
            this.circleOpt.height = this.frameHeight - 46
            this.barOpt.height = this.frameHeight - 46
            this.barOptT.height = this.frameHeight - 46
            this.stackLineOpt.height = this.frameHeight - 35 + 'px'
            this.tableHeight.height = this.frameHeight + 35
        },
        mounted () {
            let frameHeight = $('.ga-baseData__frame--content')
            let baseDataHeight = $('.ga-baseData__base')
            let baseDataImg = $('.ga-baseData__base--headImg')
            let baseDataMsg = $('.ga-baseData__base--message')
            let baseDataMsg2 = $('.ga-baseData__base--message2')
            frameHeight.css({
                height: this.option.height / 2 + 10 + 'px'
            })
            baseDataHeight.css({
                height: this.option.height / 2 + 65 + 'px'
            })
            baseDataImg.css({
                height: this.option.height / 2 + 65 + 'px',
                backgroundSize: '100% 99%'
            })
            baseDataMsg.css({
                height: this.option.height / 2 + 60 - 0.5 + 'px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
            })
            baseDataMsg2.css({
                height: this.option.height / 2 + 60 - 26 + 'px'
            })
        },
        props: [
            'option',
            'showIndexChange',
            'renderData'
        ],
        watch: {
            'showIndexChange' (val) {
                if (val !== 0) {
                    this.bookMessage.listLoading = false
                } else {
//                  .el-table__body-wrapper
                    $('.ga-baseData__frame--title').css({
                        'padding-left': '0.8px'
                    })
                    setTimeout(() => {
                        $('.ga-baseData__frame--title').css({
                            'padding-left': '0px'
                        })
                    })
                    if (this.bookMessage.data.length) {
                        this.bookMessage.listLoading = false
                    } else {
                        let count = 0;
                        if (this.renderData) {
                            if (count > 1) {
                                count++;
                                this.bookMessage.listLoading = true
                            }
                            setTimeout(() => {
                                this.bookMessage.listLoading = false
                            }, 1200)
                        }
                    }
                }
            },
            'renderData' () {
                this.getBaseInfoFun();
                this.communicationQuanity();
                this.localArea();
                this.getBookingFun();
                this.getAreaFiveFun();
            },
            'radioCommunication' () {
                this.cutAreaCount();
            },
            'radioCommunicationT' () {
                this.cutAreaTime();
            },
            'radioArea' () {
                this.cutLocalArea()
            },
            'radioAreaT' () {
                this.cutOpposeArea()
            }
        },
        methods: {
            //  基本信息
            async getBaseInfoFun () {
                let baseData = this.baseDataShow
                for (let i in baseData) {
                    baseData[i].val = ' '
                }
                let resp = await getBaseInfo({
                    msisdn: this.renderData.msisdn,
                    type: this.renderData.type,
                    name: this.renderData.name
                });
                if (resp && resp.data) {
                    let data = resp.data
                    this.baseDataName = data.name
                    this.baseDataShow[0].val = data.msisdn
                    this.baseDataShow[1].val = data.imsi
                    this.baseDataShow[2].val = data.imei
                    this.baseDataShow[3].val = data.spcode
                    this.baseDataShow[4].val = data.homecode
                    if (data.type - 0 === 0) {
                        this.baseDataShow[5].val = '涉藏'
                    } else if (data.type - 0 === 1) {
                        this.baseDataShow[5].val = '涉疆'
                    } else if (data.type - 0 === 2) {
                        this.baseDataShow[5].val = '重点人'
                    }
                }
            },
            // 通联量统计
            async getAreaCountFun () {
                this.loadLoading(1, ['circleDataChart', 'areaCountLoading', 'pieCompShow'])
                let resp = await getAreaCount({
                    msisdn: this.renderData.msisdn
                })
                if (resp && resp.data) {
                    this.circleData = resp.data;
                    this.circleDataChart = resp.data[this.radioCommunication]
                    this.cancelLoading(1, ['circleDataChart', resp.data, 'areaCountLoading', 'pieCompShow'])
                    setTimeout(() => {
                        this.cutAreaCount();
                    })
                }
            },
            //  通联时段统计
            async getAreaTimeFun () {
                this.loadLoading(1, ['stackLineChart', 'areaTimeLoading', 'stackLineShow'])
                let resp = await getAreaTime({
                    msisdn: this.renderData.msisdn
                })
                if (resp && resp.data) {
                    this.stackLineData = resp.data;
                    this.stackLineChart = resp.data[this.radioCommunicationT]
                    this.cancelLoading(1, ['stackLineChart', resp.data, 'areaTimeLoading', 'stackLineShow'])
                    setTimeout(() => {
                        this.cutAreaTime();
                    })
                }
            },
            //  本段区域统计
            async getAreaLocalFun () {
                this.loadLoading(1, ['barChart', 'areaLocalLoading', 'barShow'])
                let resp = await getAreaLocal({
                    msisdn: this.renderData.msisdn
                })
                if (resp && resp.data) {
                    this.barData = resp.data;
                    this.barChart = resp.data[this.radioArea]
                    this.cancelLoading(1, ['barChart', resp.data, 'areaLocalLoading', 'barShow'])
                    setTimeout(() => {
                        this.cutLocalArea();
                    })
                }
            },
            //  对端区域统计
            async getAreaOpposeFun () {
                this.loadLoading(1, ['barChartT', 'areaOpposeLoading', 'barTShow'])
                let resp = await getAreaOppose({
                    msisdn: this.renderData.msisdn
                })
                if (resp && resp.data) {
                    this.barDataT = resp.data;
                    this.barChartT = resp.data[this.radioAreaT]
                    this.cancelLoading(1, ['barChart', resp.data, 'areaOpposeLoading', 'barTShow'])
                    setTimeout(() => {
                        this.cutOpposeArea();
                    })
                }
            },
            //  订票查询
            async getBookingFun () {
                this.loadLoading(0, this.bookMessage);
                let resp = await getBooking({
                    msisdn: this.renderData.msisdn,
                    page: 0,
                    rows: 0
                })
                if (resp && resp.rows) {
                    this.bookMessage.data = resp.rows
                    this.cancelLoading(0, this.bookMessage, resp.rows)
                }
            },
            //  活动top5
            async getAreaFiveFun () {
                this.loadLoading(0, this.topFiveMessage);
                let resp = await getAreaFive({
                    msisdn: this.renderData.msisdn,
                    page: 0,
                    rows: 0
                })
                if (resp && resp.rows) {
                    this.topFiveMessage.data = resp.rows
                    this.cancelLoading(0, this.topFiveMessage, resp.rows)
                }
            },
            //  加载loading
            loadLoading (type, opt) {
                switch (type) {
                    case 0:
                        opt.data = [];
                        opt.listLoading = true;
                        break;
                    case 1:
                        this[opt[2]] = false;
                        this[opt[0]] = [];
                        this[opt[1]] = true;
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
            // 切换条件 通联量
            cutAreaCount () {
                let data = this.communicationQuanityData;
                let circleData = this.circleData[this.radioCommunication];
                if (!this.circleData[this.radioCommunication]) {
                    return;
                }
                if (!this.circleData[this.radioCommunication].length) {
                    this.circleDataChart = []
                    this.pieCompShow = false;
                    for (let i in data) {
                        data[i].val = ''
                    }
                    return;
                }
                this.pieCompShow = true;
                this.circleDataChart = circleData;
                data[4].val = 0;
                for (let i in circleData) {
                    if (circleData[i].type - 0 === 0) {
                        data[0].val = circleData[i].count
                    } else if (circleData[i].type - 0 === 1) {
                        data[1].val = circleData[i].count
                    } else if (circleData[i].type - 0 === 2) {
                        data[2].val = circleData[i].count
                    } else if (circleData[i].type - 0 === 3) {
                        data[3].val = circleData[i].count
                    }
                    data[4].val += circleData[i].count - 0
                }
                this.communicationQuanityData = data;
            },
            //  切换条件 通联时段
            cutAreaTime () {
                if (!this.stackLineData[this.radioCommunicationT]) {
                    return;
                }
                if (!this.stackLineData[this.radioCommunicationT].length) {
                    this.stackLineChart = []
                    this.stackLineShow = false;
                    return;
                }
                this.stackLineShow = true;
                this.stackLineChart = this.stackLineData[this.radioCommunicationT];
            },
            //  切换条件 本端区域
            cutLocalArea () {
                if (!this.barData[this.radioArea]) {
                    return;
                }
                if (!this.barData[this.radioArea].length) {
                    this.barChart = []
                    this.barShow = false;
                    return;
                }
                this.barShow = true;
                this.barChart = this.barData[this.radioArea];
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
            //  点击 通联量统计
            communicationQuanity () {
                this.activeCommunication = 0;
                if (!this.renderData) return
                this.getAreaCountFun();
            },
            //  点击 通联时段
            communicationPeriod () {
                this.activeCommunication = 1;
                if (!this.renderData) return
                this.getAreaTimeFun()
            },
            //  点击 本端区域统计
            localArea () {
                this.activeArea = 0;
                if (!this.renderData) return
                this.getAreaLocalFun()
            },
            //  点击 对端区域统计
            opposeArea () {
                this.activeArea = 1;
                if (!this.renderData) return
                this.getAreaOpposeFun()
            }
        },
        computed: {
            'dynamicFrameContentHeight' () {
                return {
                    height: this.option.height / 2 - 5 + 'px',
                    display: 'flex',
                    alignItems: 'center'
                }
            }
        },
        components: {
            formSelect,
            frameComp,
            tableComp,
            pieComp,
            stackLine,
            barComp
        }
    }
</script>

<style lang="postcss" scoped>
    /*@import '~@/assets/css/common/var.css';*/
    .activeCommunication{
        color: #20a5dc !important;
        border-bottom: 2px solid #20a5dc;
    }
    .activeArea{
        color: #20a5dc !important;
        border-bottom: 2px solid #20a5dc;
    }
    @component-namespace ga {
        @b baseData {
            @e base {
                /*border: 1px solid red;*/
                /*height: 230px;*/
                /*linear-gradient(-45deg, transparent 15px, #58a 0);*/
                @m headImg {
                    width: 100%;
                    height: 100%;
                    /*overflow: hidden;*/
                    /*background-size: cover;*/
                    background: url('~@/assets/images/headImg.png') no-repeat 0px 0px;
                }
                @m message {
                    position: relative;
                    top: 2px;
                    border: 1px solid #0B4973;
                    & div:nth-child(1) {
                        /*padding-left: 5px;*/
                        /*height: 26px;*/
                        /*background: #010C24;*/
                        /*border-bottom: 1px solid #0B2354;*/
                    }
                    & div:nth-child(2) {
                        /*padding: 5px;*/
                        /*background: #000D36;*/
                        /*height: 200px;*/
                        /*text-align: center;*/
                        /*& ul:first-child {*/
                            /*display: inline-block;*/
                            /*width: 40%;*/
                        /*}*/
                        /*& ul:first-child li {*/
                            /*width: 100%;*/
                            /*height: 30px;*/
                            /*line-height: 30px;*/
                        /*}*/
                        /*& ul:last-child {*/
                            /*display: inline-block;*/
                            /*width: 55%;*/
                        /*}*/
                        /*& ul:last-child li {*/
                            /*width: 100%;*/
                            /*height: 30px;*/
                            /*line-height: 30px;*/
                            /*white-space: nowrap;*/
                        /*}*/
                    }
                }
                @m message1 {
                    padding-left: 5px;
                    height: 26px;
                    background: #010C24;
                    border-bottom: 1px solid #0B2354;
                }
                @m message2 {
                    display: flex;
                    align-items: center;
                    padding: 5px;
                    /*background: #000D36;*/
                    /*height: 300px;*/
                    text-align: center;
                }
            }
            @e frame {
                @m title {
                    height: 28px;
                    font-size: 16px;
                    padding: 0 10px;
                    /*padding: 4px 10px 4px 18px;*/
                    background: linear-gradient(135deg, transparent 9px, #0B245F 0);
                    & span {
                        cursor: pointer;
                        margin-left: 10px;
                    }
                }
                @m content {
                    overflow: auto;
                    /*height: 250px;*/
                    padding: 10px;
                    width: 100%;
                    /*height: calc(100% - 35px);*/
                    background: linear-gradient(-45deg, transparent 9px, rgba(0, 0, 0, 0.7) 0);
                    & ul {
                    }
                    & ul li {
                        width: 100%;
                        /*height: 30px;*/
                        line-height: 23px;
                    }
                }
                @m empty {
                    color: #9af5f6;
                    opacity: 0.6;
                    font-size: 14px;
                }
            }
        }
    }
</style>
