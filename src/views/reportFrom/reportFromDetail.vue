<template>
    <div style="width: 100%;height: 100%">
        <div class="ga-reportFromDel" ref="content">
            <div class="ga-reportFromDel__firstPag">
                <div class="ga-reportFromDel__firstPag--title">日志分析系统日报</div>
                <!--<div class="ga-reportFromDel__firstPag&#45;&#45;titleSmall">第（1）期</div>-->
                <div class="ga-reportFromDel__firstPag--titleDate">
                    <p class="firstChild">厅技术侦查总队</p>
                    <p class="lastChild">{{ makeDate }}</p>
                </div>
                <div class="ga-reportFromDel__firstPag--content">
                    <p class="ga-reportFromDel__text">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        根据日志分析系统每日对我省境内手机用户、涉藏、涉疆涉恐、重大警情态势进行分析，现将有关情况汇报如下：
                    </p>
                    <p class="ga-reportFromDel__titleFirst">
                        &nbsp;&nbsp;&nbsp;&nbsp;一、省内总体态势分析
                    </p>
                    <p class="ga-reportFromDel__text">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        截止{{ makeTime }}，我省境内实时在线手机数共计{{ situationTotal }}部,其中省内手机用户{{ situationSn }}部,
                        省外手机用户{{ situationSw }}部,境外手机用户{{ situationJw }}部。
                    </p>
                    <p class="ga-reportFromDel__titleSecond">
                        &nbsp;&nbsp;&nbsp;&nbsp;（一）省外手机用户归属地分析（只列前10个省份）：
                    </p>
                </div>
            </div>
            <div class="ga-reportFromDel__firstPag">
                <div class="ga-reportFromDel__firstPag--content">
                    <p class="ga-reportFromDel__pia">
                        <pieComp :option="circleOpt" :renderData="SNUserLocalData"></pieComp>
                    </p>
                    <p class="ga-reportFromDel__titleSecond">
                        &nbsp;&nbsp;&nbsp;&nbsp;（二）境外重点国家手机用户态势分析（只列前5个国家）：
                    </p>
                    <p class="ga-reportFromDel__column">
                        <doubleBar :option="switchBarOpt" :renderData="JWSituationData"></doubleBar>
                    </p>
                    <p class="ga-reportFromDel__titleFirst">
                        &nbsp;&nbsp;&nbsp;&nbsp;二、涉疆类态势分析
                    </p>
                </div>
            </div>
            <div class="ga-reportFromDel__firstPag">
                <div class="ga-reportFromDel__firstPag--content">
                    <p class="ga-reportFromDel__text">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        截止{{ makeTime }}漫游至青海境内新疆归属地号码总量为{{ total }}部，
                        其中:
                        <span v-for="(item, index) in SJColumnData">
                            {{ item.name }}{{ item.value }}
                            <i v-if="index === SJColumnData.length - 1">。</i>
                            <i v-else>，</i>
                        </span>
                    </p>
                    <p class="ga-reportFromDel__column">
                        <barLevel :option="switchBarOpt" :renderData="SJColumnData"></barLevel>
                    </p>
                    <p class="ga-reportFromDel__titleFirst">新疆热点地区号码归属地态势图</p>
                    <p class="ga-reportFromDel__titleThired">新疆热点地区号码在青分布图</p>
                    <p class="ga-reportFromDel__pia">
                        <pieComp :option="circleOpt" :renderData="SZPieData"></pieComp>
                    </p>
                </div>
            </div>
            <div class="ga-reportFromDel__firstPag">
                <div class="ga-reportFromDel__firstPag--content">
                    <p class="ga-reportFromDel__titleFirst">&nbsp;&nbsp;&nbsp;&nbsp;三、涉藏类态势分析</p>
                    <p class="ga-reportFromDel__text">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        (一)四省藏区在我省手机用户数量:
                        <span v-for="(item, index) in szData">
                            {{ item.name }}<span v-if="item.name !== '西藏'">藏区</span>在线手机数{{ item.value }}部
                            <i v-if="index === szData.length - 1">。</i>
                            <i v-else>；</i>
                        </span>
                    </p>
                    <!--<p class="ga-reportFromDel__text">-->
                        <!--&nbsp;&nbsp;&nbsp;&nbsp;-->
                        <!--（二）布控涉藏重点人员共计 2188人。其中在我省境内活动有601部,消失15天以上有 235部。-->
                    <!--</p>-->
                    <p class="ga-reportFromDel__text">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        （二）对全省{{ nowTempleBarData.length }}所重点寺院部署了区域实时监测。其中：
                        <span v-for="(item, index) in nowTempleBarData">
                            {{ item.name }}{{ item.value }}部
                            <span v-if="index === nowTempleBarData.length - 1">。</span>
                            <span v-else>；</span>
                        </span>
                    </p>
                    <p class="ga-reportFromDel__pia">
                        <lineComp :option="doubleLineOpt" :renderData="templeBarData"></lineComp>
                    </p>
                    <p class="ga-reportFromDel__text">
                        &nbsp;&nbsp;&nbsp;&nbsp;（三）
                        <span v-for="(item, index) in areasnsw">
                            {{ item.name }}在线手机用户{{ item.intraProCount + item.outProCount }}部，其中：
                            省内{{ item.intraProCount }}部，省外{{ item.outProCount }}部
                            <span v-if="index === areasnsw.length - 1">。</span>
                            <span v-else>；</span>
                        </span>
                    </p>
                    <!--<p class="ga-reportFromDel__titleFirst">-->
                        <!--&nbsp;&nbsp;&nbsp;&nbsp;四、其它重大警情-->
                    <!--</p>-->
                    <!--<p class="ga-reportFromDel__text">-->
                        <!--&nbsp;&nbsp;&nbsp;&nbsp;1、涉访重点人员XXXX活动轨迹实时监控中，未发现不稳定因素。-->
                    <!--</p>-->
                    <!--<p class="ga-reportFromDel__text">-->
                        <!--&nbsp;&nbsp;&nbsp;&nbsp;2、环保重点监控人员 XXXX活动轨迹正常。-->
                    <!--</p>-->
                </div>
            </div>
            <div class="ga-reportFromDel__firstPag">
                <div class="ga-reportFromDel__firstPag--content">
                    <!--<p class="ga-reportFromDel__text">-->
                        <!--&nbsp;&nbsp;&nbsp;&nbsp;3、维保汇重点人员XXX省内活动轨迹查询异常。-->
                    <!--</p>-->
                    <div class="ga-reportFromDel__firstPag--pageBottom">
                        <p class="ga-reportFromDel__text">
                            &nbsp;&nbsp;&nbsp;&nbsp;报：厅党委成员
                        </p>
                        <p class="ga-reportFromDel__text">
                            &nbsp;&nbsp;&nbsp;&nbsp;送：厅属有关部门（警令部、国保总队、网安总队、技侦总队、反恐总队、反邪总队）
                        </p>
                        <p class="ga-reportFromDel__text">
                            &nbsp;&nbsp;&nbsp;&nbsp;发：市、州公安局
                        </p>
                        <div class="ga-reportFromDel__firstPag--bottomText">
                            <p class="firstChild">编辑：</p>
                            <p class="lastChild">审签：</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import pieComp from 'components/chart/pieMapDot'
    import barLevel from 'components/Chart/barNormal'
    import doubleBar from 'components/Chart/doubleBar'
    import lineComp from 'components/Chart/linesTrend'
    import { exportFromDetail } from 'api/reportForm/index'
    export default {
        name: 'reportFrom',
        data () {
            return {
                total: 0,
                makeDate: '',
                makeTime: '',
                situationTotal: '',
                situationSn: '',
                situationSw: '',
                situationJw: '',
                SNUserLocalData: [],
                JWSituationData: [],
                SJColumnData: [],
                SZPieData: [],
                szData: [],
                templeBarData: [],
                nowTempleBarData: [],
                areasnsw: [],
                id: '',
                circleOpt: {},
                circleDataChart: [],
                doubleBarData: [],
                switchBarOpt: {
                    width: '70%',
                    height: '300',
                    props: {
                        xName: '',
                        yName: ''
                    }
                },
                doubleLineOpt: {
                    width: '700',
                    height: '300',
                    props: {
                        xName: '',
                        yName: '',
                        tName: '寺庙寺庙寺庙'
                    }
                },
                switchBarOpt1: {
                    width: '700',
                    height: '300',
                    props: {
                        xName: '',
                        yName: ''
                    }
                },
                switchBarData: [],
                switchBarData1: []
            }
        },
        props: ['detailId'],
        created () {
            this.circleOpt = {
                width: 480,
                height: 340
            }
        },
        mounted () {
            this.exportFromDetail()
            console.log(this.detailId)
        },
        watch: {
            SNUserLocalData (val) {
                console.log(val);
            }
        },
        methods: {
//            报表查看
            async  exportFromDetail () {
//                this.tableOptResult.listLoading = true;
                let resp = await exportFromDetail({
                    'id': this.detailId
                });
                console.log(resp);
                if (resp) {
//                    let { makeDate, makeTime, situationTotal, situationSn, situationSw, situationJw, pie, jwZhu, sjZhu, sjPie,
//                        szData, areatotal } = resp
                    let { makeDate, makeTime, situationTotal, situationSn, situationSw, situationJw, pie, jwZhu, sjZhu, sjPie,
                        szData, areatotal, areasnsw } = resp.data
                    this.makeDate = makeDate
                    this.makeTime = makeTime
                    this.situationTotal = situationTotal
                    this.situationSn = situationSn
                    this.situationSw = situationSw
                    this.situationJw = situationJw
                    pie.forEach((item) => {
                        let { value } = item
                        item.count = value
                    })
                    this.SNUserLocalData = pie
                    if (jwZhu) {
                        let dataOne = []
                        let dataTwo = []
                        jwZhu.forEach(item => {
                            dataOne.push({
                                name: item.name,
                                value: item.oldcount,
                                type: '昨天'
                            })
                            dataTwo.push({
                                name: item.name,
                                value: item.nowcount,
                                type: '今天'
                            })
                        })
                        this.JWSituationData = dataOne.concat(dataTwo);
                    }
                    this.SJColumnData = sjZhu
                    this.total = 0;
                    if (this.SJColumnData.length) {
                        this.SJColumnData.forEach(item => {
                            this.total += +item.value
                        })
                    }
                    sjPie.forEach((item) => {
                        let { value } = item
                        item.count = value
                    })
                    this.SZPieData = sjPie
                    this.szData = szData
                    if (areatotal) {
                        let dataPartOne = []
                        let dataPartTwo = []
                        areatotal.forEach(item => {
                            dataPartOne.push({
                                name: item.name,
                                value: item.oldcount,
                                type: '昨天'
                            })
                            dataPartTwo.push({
                                name: item.name,
                                value: item.nowcount,
                                type: '今天'
                            })
                        })
                        this.nowTempleBarData = dataPartTwo;
                        console.log(this.nowTempleBarData);
                        this.templeBarData = dataPartOne.concat(dataPartTwo);
                    }
                    this.areasnsw = areasnsw
                }
            }
        },
        components: {
            pieComp,
            barLevel,
            doubleBar,
            lineComp
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        /*上方选择框*/
        @b reportFromDel {
            width: 75%;
            height: 100%;
            margin: 0 auto;
            background: #fff;
            overflow: auto;
            color: black;
            @e text {
                font-size: 22px;
                font-family: FangSong;
            }
            @e pia {
                width: 100%;
                height: 340px;
                border: 1px solid black;
                margin-top: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                /*padding-left: 100px;*/
                margin-bottom: 30px;
            }
            @e column {
                width: 100%;
                height: 300px;
                border: 1px solid black;
                margin-top: 20px;
                padding-top: 10px;
            }
            @e titleFirst {
                font-size: 22px;
                font-family: 黑体;
                font-weight: bold;
                margin: 16px 0;
            }
            @e titleSecond {
                font-size: 22px;
                font-family: 楷体;
                font-weight: bold;
                margin: 16px 0;
            }
            @e titleThired {
                font-size: 22px;
                font-family: 楷体;
                margin: 16px 0;
                text-align: center;
            }
            @e firstPag {
                width: 100%;
                height: 880px;
                border-bottom: 2px solid #C6C6C6;
                margin-bottom: 80px;
                @m title {
                    text-align: center;
                    margin-top: 260px;
                    margin-bottom: 200px;
                    color: red;
                    font-size: 64px;
                    font-family: SimSun;
                    font-weight: bold;
                }
                @m titleSmall {
                    text-align: center;
                    color: red;
                    margin-bottom: 50px;
                    font-size: 22px;
                    font-family: FangSong;
                    font-weight: bold;
                }
                @m titleDate {
                    width: 70%;
                    height: 30px;
                    margin: 0 auto;
                    border-bottom: 2px solid red;
                    color: red;
                    margin-bottom: 50px;
                    font-size: 22px;
                    font-family: FangSong;
                    font-weight: bold;
                    .firstChild {
                        float: left;
                    }
                    .lastChild {
                        float: right;
                    }
                }
                @m content {
                    width: 70%;
                    margin: 0 auto;
                    margin-bottom: 50px;
                    text-align:justify;
                }
                @m pageBottom {
                    margin-top: 500px;
                    line-height: 50px;
                    border-top: 2px solid #000;
                }
                @m bottomText {
                    border-top: 2px solid #000;
                    height: 24px;
                    margin: 0 auto;
                    font-size: 18px;
                    .firstChild {
                        float: left;
                        width: 100px;
                    }
                    .lastChild {
                        float: right;
                        width: 100px;
                    }
                }
            }
        }
    }
</style>

