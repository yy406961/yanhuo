<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
const buildData = data => {
    let colors = ['#0CE3F0', '#62FFB7', '#F588FF',
        '#FF8168', '#E5AF16', '#D7FF82']
    let Xdata = []
    let seriesData = []
    if (data.length) {
        Xdata = data[0].time
        data.forEach((item, index) => {
            seriesData.push({
                name: item.name,
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    normal: {
                        width: 2,
                        color: colors[index]
                    }
                },
                itemStyle: {
                    color: colors[index],
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: item.value
            })
        })
    }
    let option = {
        tooltip: {
            trigger: 'axis',
            show: true
        },
        legend: {
            show: true,
            icon: 'circle',
            top: 0,
            textStyle: {
                fontSize: 12,
                color: '#fff'
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            top: '20%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#fff'
                }
            },
            data: Xdata
        },
        yAxis: {
            axisLine: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(62, 118, 140, 0.5)',
                    width: 1
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#fff'
                }
            }
        },
        series: seriesData
    }
    return option
}
export default {
    name: 'barCharts',
    data () {
        return {
            width: 100,
            height: 100
        }
    },
    props: [
        'option',
        'renderData'
    ],
    computed: {
        chartStyle () {
            return {
                width: this.width,
                height: this.height
            }
        }
    },
    watch: {
        'renderData' (newVal) {
            this.loadData(newVal)
        },
        'option': {
            deep: true,
            handler (newval) {
                if (newval.width && newval.height) {
                    this.width = newval.width;
                    this.height = newval.height;
                    this.$nextTick(() => {
                        this.resize()
                    })
                }
            }
        }
    },
    created () {
        this.width = this.option.width
        this.height = this.option.height
    },
    mounted () {
        this.initChart()
        this.loadData(this.renderData)
    },
    methods: {
        initChart () {
            this.EC = echarts.init(this.$el)
        },
        loadData (data) {
            if (data && data.length) {
                let op = buildData(data || [], this.option.props);
                this.EC.setOption(op)
            }
        },
        resize () {
            this.EC.resize()
        },
        resizeComp (newVal) {
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
