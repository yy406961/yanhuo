<template>
    <div>
        <div class="ga-showPerson">
            <div class="ga-showPerson__introduce">
                <p><span>任务名称：</span>{{propData.taskName}}</p>
                <p><span>起止日期：</span>{{propData.startTime}}——{{propData.endTime}}</p>
                <p><span>信源个数：</span>{{ propData.inforsourceNum }}个</p>
                <p><span>用户号码：</span>{{ phoneNumMsd }}</p>
            </div>
            <div class="ga-showPerson__subTitle" v-if="propData.inforsourceNum == 1">
                <p>信源访问情况 </p>
                <span>信源：</span>{{ detailInfo.name }} <b></b>
                <span>访问量：</span>{{ detailInfo.value }}次
            </div>
        </div>
        <el-row :gutter="20" v-if="propData.inforsourceNum == 1">
        <!-- <el-row :gutter="20" v-if="false"> -->
            <el-col :span="12">
                <titleCom title="信源访问趋势"></titleCom>
                <linesArea ref="trend" :option="echartsSize[0]"></linesArea>
            </el-col>
            <el-col :span="12">
                <titleCom title="访问时段分布"></titleCom>
                <BarChart ref="bar" :option="echartsSize[1]"></BarChart>
            </el-col>
        </el-row>
        <template v-if="propData.inforsourceNum > 1 && propData.inforsourceNum < 6">
        <!-- <template v-if="false"> -->
            <el-row>
                <el-col :span="8">
                    <titleCom title="信源访问情况"></titleCom>
                    <pieChart ref="pie" :option="echartsSize[2]"></pieChart>
                </el-col>
                <el-col :span="8">
                    <titleCom title="信源访问趋势" :option="titleOp"></titleCom>
                    <linesArea ref="line" :option="echartsSize[3]"></linesArea>
                </el-col>
                <el-col :span="8">
                    <titleCom title="访问时段分布" :option="titleOp"></titleCom>
                    <BarChart ref="bar" :option="echartsSize[4]"></BarChart>
                </el-col>
            </el-row>
        </template>
        <template v-if="propData.inforsourceNum > 5">
        <!-- <template v-if="true"> -->
            <el-row>
                <el-col :span="8">
                    <titleCom title="信源访问情况"></titleCom>
                    <levelBarComp ref="levelObj" :option="echartsSize[5]"></levelBarComp>
                </el-col>
                <el-col :span="8">
                    <titleCom title="信源访问趋势" :option="titleOp"></titleCom>
                    <linesArea ref="line" :option="echartsSize[6]"></linesArea>
                </el-col>
                <el-col :span="8">
                    <titleCom title="访问时段分布" :option="titleOp"></titleCom>
                    <BarChart ref="bar" :option="echartsSize[7]"></BarChart>
                </el-col>
            </el-row>
        </template>
    </div>
</template>

<script>
import polarBar from '../charts/polarBar'
import BarChart from '../charts/barChart'
import linesArea from '../charts/linesArea'
import pieChart from '../charts/annularMap'
import levelBarComp from '../charts/levelBar' // 柱图
import linesTrend from 'components/monitor/lines'
import titleCom from './titleCom'
import { ajax } from 'common'
import { mapGetters } from 'vuex'
import { phoneNumChange } from 'utils/index'
export default {
    name: 'showPerson',
    data() {
        let me = this
        return {
            titleOp: {
                domain: ''
            },
            detailInfo: '',
            inforsourceDomain: '', // 域名
            phoneNum: '',
            phoneNumMsd: '',
            singlesSartTime: '',
            lineOpt: {
                width: '600',
                height: '300',
                props: {
                    xName: '日期',
                    yName: '数量',
                    tName: '信源访问趋势'
                }
            },
            echartsSize: [
                {
                    width: 600,
                    height: 300,
                    onClick(o) {
                        let { data } = o
                        if (data && data.dataObj) {
                            me.inforsourceDomain = data.dataObj.site
                            me.titleOp.domain = data.dataObj.site
                            me.singlesSartTime = data.dataObj.name
                            me.singleData('line')
                        }
                    }
                },
                { width: 600, height: 300 },
                {
                    width: 400,
                    height: 300,
                    onClick(o) {
                        let { data } = o
                        if (data && data.dataObj) {
                            me.inforsourceDomain = data.dataObj.site
                            me.titleOp.domain = data.dataObj.site
                            me.fiveData('pie')
                        }
                    }
                },
                { width: 600, height: 300 },
                { width: 600, height: 300 },
                {
                    width: 400,
                    height: 300,
                    onClick(o) {
                        let { data } = o
                        if (data && data.dataObj) {
                            me.inforsourceDomain = data.dataObj.site
                            me.titleOp.domain = data.dataObj.site
                            me.tenData('bar')
                        }
                    }
                },
                { width: 600, height: 300 },
                { width: 600, height: 300 }
            ],
            lineData: []
        }
    },
    props: ['propData', 'taskId'],
    created() {
        this.initChartsHeight()
    },
    computed: {
        ...mapGetters({
            isPhoneJM: 'global/isPhoneJM'
        })
    },
    mounted() {
        this.phoneNum = this.propData.phoneNum
        this.phoneNumMsd = this.isPhoneJM ? phoneNumChange(this.propData.phoneNum) : this.propData.phoneNum
        this.singlesSartTime = this.propData.startTime
        this.loadData()
        this.chartsHeight()
    },
    watch: {},
    methods: {
        // 根据信源个数加载图表
        loadData() {
            if (this.propData.inforsourceNum === 1) {
                this.singleData()
            }
            if (this.propData.inforsourceNum > 1 && this.propData.inforsourceNum < 6) {
                this.fiveData()
            }
            if (this.propData.inforsourceNum > 5) {
                this.tenData()
            }
        },
        singleData(key) {
            let formData = {
                inforsourceDomain: this.inforsourceDomain,
                insourceNum: this.propData.visitNum,
                // insourceNum: this.propData.inforsourceNum,
                phoneNum: this.phoneNum,
                statTime: this.singlesSartTime,
                taskId: this.taskId
            }
            this.$refs.bar.startLoading()
            if (key !== 'line') {
                this.$refs.trend.startLoading()
            }
            ajax.post('/informationSource/selectPhoneStatOne', formData).then(resp => {
                let { barData, lineData } = resp
                this.detailInfo = resp.sourceLevel[0]
                if (barData) {
                    this.$refs.bar.loadData(barData)
                    this.$refs.bar.endLoading()
                }
                if (key !== 'line' && lineData) {
                    this.$refs.trend.loadData(lineData)
                    this.$refs.trend.endLoading()
                }
            })
        },
        fiveData(val) {
            let formData = {
                inforsourceDomain: this.inforsourceDomain,
                insourceNum: this.propData.visitNum,
                // insourceNum: this.propData.inforsourceNum,
                phoneNum: this.phoneNum,
                taskId: this.taskId
            }
            this.$refs.line.startLoading()
            this.$refs.bar.startLoading()
            if (val !== 'pie') {
                this.$refs.pie.startLoading()
            }
            ajax.post('/informationSource/selectPhoneStat', formData).then(resp => {
                let { pieData, lineData, barData } = resp
                if (val !== 'pie' && pieData) {
                    this.$refs.pie.loadData(pieData)
                    this.$refs.pie.endLoading()
                }
                this.$refs.line.loadData(lineData)
                this.$refs.bar.loadData(barData)
                this.$refs.line.endLoading()
                this.$refs.bar.endLoading()
            })
        },
        tenData(val) {
            let formData = {
                inforsourceDomain: this.inforsourceDomain,
                insourceNum: this.propData.visitNum,
                // insourceNum: this.propData.inforsourceNum,
                phoneNum: this.phoneNum,
                taskId: this.taskId
            }
            if (val !== 'bar') {
                this.$refs.levelObj.startLoading()
            }
            this.$refs.line.startLoading()
            this.$refs.bar.startLoading()
            ajax.post('/informationSource/selectPhoneStat', formData).then(resp => {
                let { sourceLevel, lineData, barData } = resp
                if (val !== 'bar' && sourceLevel) {
                    this.$refs.levelObj.loadData(sourceLevel)
                }
                this.$refs.line.loadData(lineData)
                this.$refs.bar.loadData(barData)
                this.$refs.levelObj.endLoading()
                this.$refs.line.endLoading()
                this.$refs.bar.endLoading()
            })
        },
        initChartsHeight() {
            // 1364
            this.dialogWidth = $(window).width() * 0.9
            let dialogHeight = $(window).height() * 0.85 - 25
            // 高度
            let Height = dialogHeight - 28 - 53 - 166
            let pieHeight = dialogHeight * 0.9 - 28 - 53 - 166
            let oneHeight = dialogHeight - 28 - 53 - 140
            // 宽度
            let threeWidth = this.dialogWidth / 3 - 30
            let pieWidth = this.dialogWidth / 2.5 - 30
            let twoWidth = this.dialogWidth / 2 - 40
            this.echartsSize.map((item, index) => {
                if (index < 2) {
                    item.width = twoWidth
                    item.height = oneHeight
                } else if (index === 2) {
                    item.width = pieWidth
                    item.height = pieHeight
                } else {
                    item.width = threeWidth
                    item.height = Height
                }
            })
        },
        chartsHeight() {
            this.dialogWidth = $(window).width() * 0.9
            let dialogHeight = $(window).height() * 0.85 - 25
            let onHeight = dialogHeight - 28 - 53 - 166
            // 饼图宽
            let pieHeight = dialogHeight * 0.9 - 28 - 53 - 166
            let pieWidth = this.dialogWidth / 2.5 - 30
            // 三等列宽度
            let threeWidth = this.dialogWidth / 3 - 30
            let sizeObj = {
                width: threeWidth,
                height: onHeight
            }
            if (this.propData.inforsourceNum === 1) {
                let twoWidth = this.dialogWidth / 2 - 40
                let oneHeight = dialogHeight - 28 - 53 - 140
                let sizeOneObj = {
                    width: twoWidth,
                    height: oneHeight
                }
                this.$refs.trend.resizeComp(sizeOneObj)
                this.$refs.bar.resizeComp(sizeOneObj)
            }
            if (this.propData.inforsourceNum > 1) {
                let pieSize = {
                    width: pieWidth,
                    height: pieHeight
                }
                this.$refs.line.resizeComp(sizeObj)
                this.$refs.bar.resizeComp(sizeObj)
                if (this.propData.inforsourceNum > 5) {
                    this.$refs.levelObj.resizeComp(sizeObj)
                }
                if (this.propData.inforsourceNum < 6) {
                    this.$refs.pie.resizeComp(pieSize)
                }
            }
        }
    },
    components: {
        polarBar,
        linesArea,
        pieChart,
        linesTrend,
        levelBarComp,
        BarChart,
        titleCom
    }
}
</script>
<style>
@component-namespace ga {
    @b showPerson {
        font-size: 14px;
        @e introduce {
            margin: 20px 0;
            p {
                margin-right: 20px;
                display: inline-block;
                span {
                    color: #fff;
                }
            }
        }
        @e subTitle {
            margin: 15px 0px 25px 0px;
            span {
                color: #fff;
                /* margin-right: 20px; */
            }
            p {
                color: #fff;
                font-size: 16px;
                margin-right: 30px;
                display: inline-block;
            }
            b {
                width: 10px;
                display: inline-block;
            }
        }
    }
    & .el-row {
        margin-bottom: 0 !important;
    }
}
</style>
