<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
const buildData = data => {
    let lowdata = []
    if (data[1].value) {
        data[1].value.forEach(item => {
            lowdata.push(item * -1)
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
            data: ['流入', '流出'],
            textStyle: {
                fontSize: 12,
                color: '#fff'
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            top: '12%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: 'rgba(127, 214, 255, 0.5)',
                    type: 'dashed'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false
            },
            data: data[0].time
        }],
        yAxis: [{
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: 'rgba(127, 214, 255, 0.5)',
                    type: 'dashed'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff'
                },
                formatter: function(params) {
                    if (params < 0) {
                        return params * -1
                    } else {
                        return params
                    }
                }
            }
        }],
        series: [
            {
                name: '流入',
                type: 'bar',
                stack: '总量',
                barWidth: '40%',
                itemStyle: {
                    normal: {
                        color: function () {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#0895E0'
                            }, {
                                offset: 1,
                                color: '#2CDEDD'
                            }], false)
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        fontSize: 12,
                        color: '#29D9DD', // 柱状图上的数字颜色
                        position: 'top'
                    }
                },
                data: data[0].value
            },
            {
                name: '流出',
                type: 'bar',
                stack: '总量',
                barWidth: '40%',
                label: {
                    normal: {
                        show: true,
                        fontSize: 12,
                        color: '#FA685A',
                        position: 'bottom',
                        formatter: function(params) {
                            return params.value * -1
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: function () {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#FF6D5F'
                            }, {
                                offset: 1,
                                color: '#CA3728'
                            }], false)
                        }
                    }
                },
                data: lowdata
            }
        ]
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
