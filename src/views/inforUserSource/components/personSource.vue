<template>
    <div>
        <div class="ga-showPerson">
            <div class="ga-showPerson__introduce">
                <p><span>任务名称：</span>{{propData.taskName}}</p>
                <p><span>起止日期：</span>{{propData.startTime}}——{{propData.endTime}}</p>
                <!-- <p><span>信源名称：</span>{{ propData.siteName }}</p> -->
                <p><span>访问用户数：</span>{{ propData.userNum }}个</p>
            </div>
        </div>
        <el-row>
            <el-col :span="8">
                <titleCom title="用户访问次数排行TOP20"></titleCom>
                <levelBarComp ref="levelObj" :option="echartsSize[0]"></levelBarComp>
            </el-col>
            <el-col :span="8">
                <titleCom title="信源访问趋势" :option="titleOp"></titleCom>
                <linesArea ref="line" :option="echartsSize[1]"></linesArea>
            </el-col>
            <el-col :span="8">
                <titleCom title="访问时段分布" :option="titleOp"></titleCom>
                <BarChart ref="bar" :option="echartsSize[2]"></BarChart>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { phoneNumChange } from 'utils/index'
import BarChart from '../../informationSource/charts/barChart'
import linesArea from '../../informationSource/charts/linesArea'
import levelBarComp from '../../informationSource/charts/levelBar' // 柱图
import titleCom from '../../informationSource/components/titleCom'
import { ajax } from 'common'
import { mapGetters } from 'vuex'
export default {
    name: 'showPerson',
    data() {
        let me = this
        return {
            titleOp: {
                domain: ''
            },
            detailInfo: '',
            msisdn: '',
            phoneNum: '',
            singlesSartTime: '',
            echartsSize: [
                {
                    width: 400,
                    height: 300,
                    onClick(o) {
                        let { data } = o
                        if (data && data.dataObj) {
                            me.msisdn = data.dataObj.name
                            if (me.isPhoneJM) {
                                me.titleOp.domain = phoneNumChange(data.dataObj.name)
                            } else {
                                me.titleOp.domain = data.dataObj.name
                            }
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
    props: ['propData'],
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
        this.singlesSartTime = this.propData.startTime
        this.loadData()
        this.chartsHeight()
    },
    watch: {},
    methods: {
        // 根据信源个数加载图表
        loadData() {
            this.tenData()
        },
        tenData(val) {
            let formData = {
                msisdn: this.msisdn,
                siteDomain: this.propData.siteDomain,
                taskId: this.propData.taskId
            }
            if (val !== 'bar') {
                this.$refs.levelObj.startLoading()
            }
            this.$refs.line.startLoading()
            this.$refs.bar.startLoading()
            ajax.post('keyPersonInforSource/selectByMsisdn', formData).then(resp => {
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
            // this.dialogWidth = $(window).width() * 0.9 - 40 - 12 * 3
            this.dialogWidth = $(window).width() * 0.9
            let dialogHeight = $(window).height() * 0.85 - 25
            // 高度
            let Height = dialogHeight - 28 - 53 - 70
            // 宽度
            let threeWidth = this.dialogWidth / 3 - 30
            // let threeWidth = this.dialogWidth / 3 - 30
            this.echartsSize.map((item) => {
                item.width = threeWidth
                item.height = Height
            })
        },
        chartsHeight() {
            // this.dialogWidth = $(window).width() * 0.9 - 40 - 12 * 3
            this.dialogWidth = $(window).width() * 0.9
            let dialogHeight = $(window).height() * 0.85 - 25
            let onHeight = dialogHeight - 28 - 53 - 70
            // 三等列宽度
            let threeWidth = this.dialogWidth / 3 - 30
            let sizeObj = {
                width: threeWidth,
                height: onHeight
            }
            this.$refs.line.resizeComp(sizeObj)
            this.$refs.bar.resizeComp(sizeObj)
            this.$refs.levelObj.resizeComp(sizeObj)
        }
    },
    components: {
        linesArea,
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
            margin: 6px 0 12px 0;
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
