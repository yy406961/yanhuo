<template>
    <div class="chartsBox" :style="chartStyle">
        <div :style="chartStyle" ref="levelBar" v-if="!isEmptyStatus"></div>
        <div class='emptydata' v-if="isEmptyStatus" :style="chartStyle">
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
const buildData = data => {
    let originData = data.map(item => {
        return {
            name: item.name,
            value: item.value || 0,
            dataObj: item
        }
    })

    let dataArr = _.sortBy(originData, function(o) {
        return o.ordernum
    })

    let yData = dataArr.map(it => {
        return it.name
    })

    let option = {
        grid: {
            containLabel: true,
            left: '3%',
            top: '10',
            right: '10',
            bottom: '10'
        },
        tooltip: {
            textStyle: {
                fontSize: 12,
                fontFamily: 'Microsoft YaHei'
            },
            formatter(source) {
                if (source.data.dataObj) {
                    let { tipsText } = source.data.dataObj
                    // let arr = tipsText.split(',')
                    // let tooltipStr = ''
                    // arr.map((item, index) => {
                    //     if (index !== arr.length - 1) {
                    //         tooltipStr += item + '<br />'
                    //     } else {
                    //         tooltipStr += item
                    //     }
                    // })
                    // return tooltipStr
                    return tipsText || source.data.value
                }
            }
        },
        textStyle: {
            fontFamily: 'Microsoft YaHei',
            fontSize: '12'
        },
        series: [
            {
                type: 'bar',
                data: dataArr,
                barWidth: 10,
                itemStyle: {
                    // barBorderRadius: 20,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'RGBA(121, 70, 227,1)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'RGBA(76, 241, 246,1)' // 100% 处的颜色
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    }
                }
            }
        ],
        xAxis: [
            {
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    textStyle: {
                        color: 'rgba(255,255,255,.7)',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 12
                    }
                },
                data: yData,
                axisLine: false,
                splitLine: false,
                axisTick: { show: false },
                boundaryGap: ['0%', '5%'],
                name: '',
                nameTextStyle: { color: '' }
            }
        ],
        yAxis: [
            {
                axisLabel: {
                    interval: 'auto',
                    textStyle: {
                        color: 'rgba(255,255,255,.7)',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 12
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.5)',
                        width: 0.3
                    }
                },
                type: 'value',
                axisLine: false,
                axisTick: { show: false },
                boundaryGap: ['0%', '5%'],
                name: '',
                nameTextStyle: { color: '' }
            }
        ]
    }

    return option
}
export default {
    name: 'lr-Bar',
    props: ['option'],
    data() {
        return {
            width: 600,
            height: 400,
            isEmptyStatus: false
        }
    },
    computed: {
        chartStyle() {
            return {
                width: this.width + 'px',
                height: this.height + 'px'
            }
        }
    },
    watch: {
        renderData(newVal) {
            if (newVal && newVal.length) {
                this.loadData(newVal)
            }
        }
    },
    created() {
        this.width = this.option.width
        this.height = this.option.height
    },
    mounted() {
        this.initChart()
    },
    methods: {
        initChart() {
            this.EC = echarts.init(this.$el)
            this.EC.on('click', (...args) => {
                this.clickHandler(...args)
            })
        },
        loadData(data) {
            // 设置为true， 清空数据缓存
            let op = buildData(data)
            if (this.EC) {
                this.EC.clear()
            }
            this.EC.setOption(op)
            if (data && data.length) {
                this.isEmptyStatus = false
            } else {
                this.isEmptyStatus = true
            }
        },
        clickHandler(...arg) {
            if (_.isFunction(this.option.onClick)) this.option.onClick(...arg)
        },
        resize() {
            this.EC.resize()
        },
        resizeComp(newVal) {
            if (newVal) {
                this.width = newVal.width
                this.height = newVal.height
                this.$nextTick(() => {
                    this.EC.resize()
                })
            }
        },
        startLoading() {
            if (this.EC) {
                this.EC.showLoading('', {
                    text: 'loading',
                    color: '#00ccff',
                    textColor: '#fff',
                    maskColor: 'rgba(0, 0, 0, 0.3)',
                    zlevel: 0
                })
            }
        },
        endLoading() {
            if (this.EC) this.EC.hideLoading()
        }
    }
}
</script>
<style scoped>
    /* .chartsBox{
        overflow:hidden;
    } */
</style>
