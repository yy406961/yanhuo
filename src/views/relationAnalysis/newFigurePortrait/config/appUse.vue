<template>
    <div style="width: 100%;height: 100%">
        <el-row class="figurePortrait-baseData__base--title smallNotLong">
            <b class="icon"></b>
            <span v-if="renderData">{{renderData.name}} （{{isMsisdnJM}}）</span>
            <span class="basetitle">APP使用</span>
            <!-- <span v-if="renderData">{{renderData.name}} （{{renderData.msisdn}}）</span>APP使用 -->
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
        <!-- <el-row style="height: calc(100% - 29px);">
            <el-row style="height: 50%;padding-top:5px;">
                <el-col :span="12" style="padding:0 0 0 15px;height: 100%">
                    <frameComp>
                        <div class="figurePortrait-baseData__frame--title">
                            <span>敏感APP</span>
                        </div>
                        <div class="figurePortrait-baseData__frame--content headerTrans">
                            <tableComp :option="sensitiveOpt"
                                       :comSize="tableHeight">
                            </tableComp>
                        </div>
                    </frameComp>
                </el-col>
                <el-col :span="12" style="padding:0 0 0 15px;height: 100%">
                    <frameComp>
                        <div class="figurePortrait-baseData__frame--title">
                            <span>APP使用占比</span>
                        </div>
                        <div class="figurePortrait-baseData__frame--content">
                            <div>
                                <div v-loading="treeMapLoading" style="position: absolute;left:50%;top:50%">
                                    <div class="figurePortrait-baseData__frame--empty" v-show="!treeMapLoading && !treeMapShow">暂无数据</div>
                                </div>
                                <appTreeMap v-show="treeMapShow"
                                            :renderData="treeData"
                                            :option="treeOpt"
                                            ref="treeRef"
                                            @treeMapToAppTime="treeMapToAppTime"></appTreeMap>
                            </div>
                        </div>
                    </frameComp>
                </el-col>
            </el-row>
            <el-row style="height: 50%;padding-top:5px;">
                <el-col :span="12" style="padding:0 0 0 15px;height: 100%">
                    <frameComp>
                        <div class="figurePortrait-baseData__frame--title">
                            <span>其他APP</span>
                        </div>
                        <div class="figurePortrait-baseData__frame--content headerTrans">
                            <tableComp :option="usualOpt"
                                       :comSize="tableHeight">
                            </tableComp>
                        </div>
                    </frameComp>
                </el-col>
                <el-col :span="12" style="padding:0 0 0 15px;height: 100%">
                    <frameComp>
                        <div class="figurePortrait-baseData__frame--title">
                            <span>APP使用时段分布</span>
                        </div>
                        <div class="figurePortrait-baseData__frame--content">
                            <div>
                                <div v-loading="barLoading" style="position: absolute;left:50%;top:50%">
                                    <div class="figurePortrait-baseData__frame--empty" v-show="!barLoading && !barShow">暂无数据</div>
                                </div>
                                <barComp v-show="barShow"
                                         :option="barOpt"
                                         ref="barRef"
                                         :renderData="barData"></barComp>
                            </div>
                        </div>
                    </frameComp>
                </el-col>
            </el-row>
        </el-row> -->
        <el-row class="figurePortrait-baseData__base--content">
            <el-row class="figurePortrait-sty__height--hundred">
                <el-col :span="12" class="figurePortrait-sty__height--hundred" style="padding: 0">
                    <el-row class="figurePortrait-sty__height--sixty">
                        <frameComp>
                            <div class="figurePortrait-baseData__frame--title">
                                <span>敏感APP</span>
                            </div>
                            <div class="figurePortrait-baseData__frame--content headerTrans">
                                <tableComp :option="sensitiveOpt"
                                        :comSize="tableHeight">
                                </tableComp>
                            </div>
                        </frameComp>
                    </el-row>
                    <el-row style="height: 40%;padding: 5px 0 0 0">
                        <frameComp class="frameCover">
                            <div class="figurePortrait-baseData__frame--title" style="padding: 0px">
                                <span>其他APP</span>
                            </div>
                            <div class="figurePortrait-baseData__frame--content headerTrans">
                                <tableComp :option="usualOpt"
                                        :comSize="tableHeightOther">
                                </tableComp>
                            </div>
                        </frameComp>
                    </el-row>
                </el-col>
                <el-col :span="12" style="height: 100%;padding: 0 0 0 5px">
                    <el-row style="height:40%;padding: 0">
                        <frameComp>
                            <div class="figurePortrait-baseData__frame--title">
                                <span>APP使用占比</span>
                            </div>
                            <div class="figurePortrait-baseData__frame--content">
                                <div>
                                    <div v-loading="treeMapLoading" style="position: absolute;left:50%;top:50%">
                                        <div class="figurePortrait-baseData__frame--empty" v-show="!treeMapLoading && !treeMapShow">暂无数据</div>
                                    </div>
                                    <appTreeMap v-show="treeMapShow"
                                                :renderData="treeData"
                                                :option="treeOpt"
                                                ref="treeRef"
                                                @treeMapToAppTime="treeMapToAppTime"></appTreeMap>
                                </div>
                            </div>
                        </frameComp>
                    </el-row>
                    <el-row style="height: 60%;padding: 5px 0 0 0">
                        <frameComp>
                            <div class="figurePortrait-baseData__frame--title">
                                <span>APP使用时段分布</span>
                            </div>
                            <div class="figurePortrait-baseData__frame--content">
                                <div>
                                    <div v-loading="barLoading" style="position: absolute;left:50%;top:50%">
                                        <div class="figurePortrait-baseData__frame--empty" v-show="!barLoading && !barShow">暂无数据</div>
                                    </div>
                                    <barComp v-show="barShow"
                                            :option="barOpt"
                                            ref="barRef"
                                            :renderData="barData"></barComp>
                                </div>
                            </div>
                        </frameComp>
                    </el-row>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    import frameComp from 'components/monitor/frameborder'
    import tableComp from 'components/Table'
    import { mapGetters } from 'vuex'
    import { phoneNumChange } from 'utils/index'
    // import appTreeMap from './treemap'
    import appTreeMap from 'components/Chart/figurePortrait/newTreemap'
    // import barComp from './barPeriod'
    import barComp from 'components/Chart/figurePortrait/newLinePeriod'
    import { getAppUseData } from 'api/relationAnalysis/newFigurePortrait/index'
    export default {
        name: 'appUse',
        props: ['option', 'renderData', 'showIndexChange'],
        data () {
            return {
                isMsisdnJM: '',
                // 请求是否完成
                reqFinish: true,
                chooseMonthCount: -1,
                // 按月选择 默认禁止选择
                chooseMonthDisabled: true,
//                treeOpt: {
//                    width: '',
//                    height: ''
//                },
                treeOpt: {
                    width: '100%'
                },
                treeData: [],
//                barOpt: {
//                    props: {
//                        titleName: 'app使用时段'
//                    },
//                    width: '',
//                    height: ''
//                },
                barOpt: {
                    props: {
                        titleName: 'app使用时段'
                    },
                    width: '98%'
                },
                barData: [],
                formObj: {
                    msisdn: '',
                    type: 0,
                    time: 'null'
                },
                appUseTimeObj: {
                    msisdn: '',
                    type: 0,
                    time: 'null',
                    code: ''
                },
                chooseMonth: '',
                monthArr: [
                ],
                treeMapLoading: false,
                treeMapShow: false,
                barLoading: false,
                barShow: false,
                radioVal: 0,
                sensitiveOpt: {
                    listLoading: false,
                    stripe: false,
                    highlightRow: true,
                    isborder: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '敏感APP名称', value: 'name', align: 'center' },
                        { name: '使用次数', value: 'count', width: 100, align: 'center' },
                        { name: '第一次使用时间', value: 'firstTime', width: 150, align: 'center' },
                        { name: '最后一次使用时间', value: 'lastTime', width: 150, align: 'center' }
                    ],
                    data: []
                },
                usualOpt: {
                    listLoading: false,
                    stripe: false,
                    highlightRow: true,
                    isborder: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: 'APP名称', value: 'name', align: 'center' },
                        { name: '使用次数', value: 'count', width: 100, align: 'center' },
                        { name: '第一次使用时间', value: 'firstTime', width: 150, align: 'center' },
                        { name: '最后一次使用时间', value: 'lastTime', width: 150, align: 'center' }
                    ],
                    data: []
                },
                tableHeight: {
                    height: ''
                },
                tableHeightOther: {
                    height: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                'isPhoneJM': 'global/isPhoneJM'
            })
        },
        watch: {
            'showIndexChange' (val) {
                if (val !== 3) {
                    this.sensitiveOpt.listLoading = false
                    this.usualOpt.listLoading = false
                } else {
                    if (this.sensitiveOpt.data.length) {
                        this.sensitiveOpt.listLoading = false
                    } else {
                        if (!this.reqFinish) {
                            this.sensitiveOpt.listLoading = true
                        }
                    }
                    if (this.usualOpt.data.length) {
                        this.usualOpt.listLoading = false
                    } else {
                        if (!this.reqFinish) {
                            this.usualOpt.listLoading = true
                        }
                    }
                }
            },
//            'treeMapShow' () {
//                this.treeOpt = {
//                    width: '100%',
//                    height: this.frameHeight + 'px'
//                }
//            },
//            'barShow' () {
//                this.barOpt = {
//                    props: {
//                        titleName: 'app使用时段'
//                    },
//                    width: '98%',
//                    height: this.frameHeight + 'px'
//                }
//            },
            'renderData' (val) {
                this.isMsisdnJM = this.isPhoneJM ? phoneNumChange(val.msisdn) : val.msisdn
                this.reqFinish = false
                this.getMonthArrFun(val.time)
                this.formObj.msisdn = val.msisdn
                this.appUseTimeObj.msisdn = val.msisdn
                if (this.radioVal === 0) {
                    this.getAppUseDataFun()
                } else {
                    this.radioVal = 0
                }
                // this.getAppUseTimeFun();
            },
            'radioVal' (val) {
                if (val === 3) {
                    this.chooseMonthDisabled = false
                    if (this.chooseMonth === '') {
                        this.chooseMonth = this.renderData.time[0].name
                    }
                } else {
                    this.chooseMonthDisabled = true
                }
                if (this.renderData) {
                    this.formObj.type = val;
                    this.appUseTimeObj.type = val;
                    //  按月选择
                    if (val === 3) {
                        if (!this.chooseMonth) {
                            this.$message({
                                type: 'info',
                                message: '请选择具体月份'
                            })
                            return;
                        }
                        let monthVal = this.findMonthValue(this.chooseMonth)
                        this.formObj.time = monthVal
                        this.appUseTimeObj.time = monthVal
                    } else {
                        this.formObj.time = 'null'
                        this.appUseTimeObj.time = 'null'
                    }
                    this.getAppUseDataFun()
                    // this.getAppUseTimeFun()
                }
            },
            'chooseMonth' (val) {
                this.chooseMonthCount++
                if (val) {
                    if (this.chooseMonthCount && this.renderData) {
                        this.formObj.time = this.chooseMonth
                        this.appUseTimeObj.time = this.chooseMonth
                        this.getAppUseDataFun();
                        // this.getAppUseTimeFun()
                    }
                }
            },
            'option.height' (val) {
                // (val + 200 - 40) / 2 - 5 - 12 - 26 - 6
                // let height = (val + 200 - 40) / 2 - 49
                this.frameHeight = (val + 200 - 67 - 41)
                this.tableHeight.height = this.frameHeight * 0.6 - 6
                this.tableHeightOther.height = this.frameHeight * 0.4 - 11
                // 图表高度自适应
                let echaresWidth = ($(window).width() - 40) / 2 - 50 + 'px'
                let sizeObjTree = {
                    width: echaresWidth,
                    height: this.frameHeight * 0.4 - 20 + 'px'
                }
                let sizeObjBar = {
                    width: echaresWidth,
                    height: this.frameHeight * 0.6 - 20 + 'px'
                }
                this.$refs.treeRef.resizeComp(sizeObjTree)
                this.$refs.barRef.resizeComp(sizeObjBar)
            }
        },
        created () {
            // this.frameHeight = this.option.height / 2
            // this.tableHeight.height = this.frameHeight - 5
            // this.tableHeightOther.height = this.frameHeight - 5
            // this.getMonthArrFun()
        },
        beforeMount () {
            this.treeOpt.height = this.frameHeight + 'px'
            this.barOpt.height = this.frameHeight + 'px'
        },
        methods: {
            //  按月选择
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
            getAppUseDataFun () {
                this.loadLoading(0, this.sensitiveOpt);
                this.loadLoading(0, this.usualOpt);
                this.loadLoading(1, ['treeData', 'treeMapLoading', 'treeMapShow'])
                this.loadLoading(1, ['barData', 'barLoading', 'barShow'])
                getAppUseData(this.formObj).then(resp => {
                    if (resp && resp.data) {
                        this.reqFinish = true
                        this.sensitiveOpt.data = resp.data.sensitive
                        this.usualOpt.data = resp.data.other
                        this.treeData = resp.data.percent
                        this.getAppUseTimeFun(true, this.treeData)
                        this.cancelLoading(0, this.sensitiveOpt, resp.data.sensitive)
                        this.cancelLoading(0, this.usualOpt, resp.data.other)
                        this.cancelLoading(1, ['treeData', resp.data.percent, 'treeMapLoading', 'treeMapShow'])
                    }
                }).catch(e => {
                    if (e.status === 300) {
                        this.cancelLoading(0, this.sensitiveOpt, [])
                        this.cancelLoading(0, this.usualOpt, [])
                        this.cancelLoading(1, ['treeData', [], 'treeMapLoading', 'treeMapShow'])
                        this.cancelLoading(1, ['barData', [], 'barLoading', 'barShow'])
                    }
                })
            },
            // async getAppUseTimeFun () {
            //     this.loadLoading(1, ['barData', 'barLoading', 'barShow'])
            //     let resp = await getAppUseTime(this.appUseTimeObj)
            //     if (resp && resp.data) {
            //         this.barData = resp.data
            //         this.cancelLoading(1, ['barData', resp.data, 'barLoading', 'barShow'])
            //     }
            // },
            getAppUseTimeFun (isAll, data) {
                let arr = []
                if (data) {
                    if (isAll) {
                        arr = data
                    } else {
                        arr.push({
                            name: data.name,
                            data: data.sub
                        })
                    }
                }
                setTimeout(() => {
                    this.barData = arr
                    this.cancelLoading(1, ['barData', arr, 'barLoading', 'barShow'])
                }, 200)
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
            treeMapToAppTime (val) {
                if (val) {
                    this.getAppUseTimeFun(false, val)
                }
            },
            // type 0 表格 type 1 echart
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
            }
        },
        components: {
            frameComp,
            appTreeMap,
            barComp,
            tableComp
        }
    }
</script>

<style lang="postcss" scoped>
</style>
