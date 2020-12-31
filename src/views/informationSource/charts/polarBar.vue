<template lang="html">
    <div :style="chartStyle">
        <div :style="chartStyle" ref="bar" style="z-index:2" v-if="!isEmptyStatus"></div>
        <div class='emptydata' v-if="isEmptyStatus" :style="chartStyle">
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'polarBar',
    props: ['option', 'renderData'],
    data() {
        return {
            width: 500,
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
        },
        buildData(data) {
            let nameArr = []
            let originData = data.map(item => {
                nameArr.push({
                    value: item.name
                })
                return {
                    name: item.name,
                    value: item.value || 0,
                    dataObj: item
                }
            })
            let op = {
                backgroundColor: 'transparent',
                tooltip: {
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft YaHei'
                    },
                    formatter(source) {
                        if (source.data.dataObj) {
                            let { tipsText } = source.data.dataObj
                            return tipsText || source.data.value
                        }
                    }
                },
                angleAxis: {
                    type: 'category',
                    data: nameArr,
                    z: 10,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.7)',
                            width: 0.5
                        }
                    },
                    axisLabel: {
                        color: 'rgba(255,255,255,.7)'
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(153, 153, 153,0.3)',
                            type: 'solid',
                            width: 0.3
                        }
                    }
                },
                radiusAxis: {
                    splitNumber: 1,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(153, 153, 153,0.8)',
                            type: 'solid',
                            width: 0.3
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                polar: {},
                series: [
                    {
                        type: 'bar',
                        data: originData,
                        coordinateSystem: 'polar',
                        name: 'A',
                        barBorderRadius: 20,
                        itemStyle: {
                            color: 'RGBA(76, 241, 246,.8)'
                            // color: {
                            //     type: 'linear',
                            //     x: 0,
                            //     y: 0,
                            //     x2: 0,
                            //     y2: 1,
                            //     colorStops: [
                            //         {
                            //             offset: 0,
                            //             color: 'RGBA(76, 241, 246,.3)' // 0% 处的颜色
                            //         },
                            //         {
                            //             offset: 1,
                            //             color: 'RGBA(121, 70, 227,.8)' // 100% 处的颜色
                            //         }
                            //     ],
                            //     globalCoord: false // 缺省为 false
                            // }
                        }
                    }
                ]
            }
            return op
        },
        loadData(data) {
            if (data.length === 0) {
                this.isEmptyStatus = true
            } else {
                this.isEmptyStatus = false
            }
            let op = this.buildData(data)
            if (this.EC) {
                this.EC.clear()
            }
            this.EC.setOption(op)
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
