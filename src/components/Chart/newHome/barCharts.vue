<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
const buildData = data => {
    let color = ['#3CB5FF', '#00FFBF']
    let legendData = []
    let yData = data[0].name
    let seriesData = []
    let result = data.map(item => {
        item.value = item.value.map(it => {
            it.data = it.value
            it.value = Math.pow(it.value, 1 / 3)
            return it
        })
        return item
    })
    result.forEach((item, index) => {
        legendData.push(item.type)
        seriesData.push({
            type: 'bar',
            name: item.type,
            stack: '2',
            legendHoverLink: false,
            barWidth: 10,
            itemStyle: {
                normal: {
                    color: color[index],
                    barBorderRadius: 50
                },
                emphasis: {
                    color: color[index]
                }
            },
            data: item.value
        })
    })
    let option = {
        legend: {
            data: legendData,
            icon: 'roundRect',
            itemWidth: 12,
            itemHeight: 8,
            selectedMode: false,
            textStyle: {
                fontSize: 10,
                color: '#9af5f6'
            }
        },
        grid: {
            left: 60,
            right: 30,
            bottom: 10,
            top: 30
        },
        tooltip: {
            textStyle: {
                color: '#fff',
                fontSize: 10
            },
            formatter(source) {
                let { data, name } = source.data
                if (data) {
                    return source.seriesName + '<br>' + name + '：' + data
                }
            }
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                show: false,
                color: '#A2EEFF',
                max: 364373,
                formatter: function(value) {
                    let str = value
                    if (value > 10000 && value <= 100000000) {
                        str = value / 10000 + '万'
                    } else if (value > 100000000) {
                        str = value / 100000000 + '亿'
                    }
                    return str
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#344755',
                    width: 2
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255,255,255,0.3)'
                }
            }

        },
        yAxis: [{
            data: yData,
            axisLabel: {
                fontSize: 12,
                color: '#A2EEFF',
                formatter(value) {
                    let maxLength = 8
                    let strlenght = 0
                    let length = 0
                    for (let i = 0; i < value.length; i++) {
                        if (strlenght < maxLength) {
                            length++
                            if (value.charCodeAt(i) > 128) {
                                strlenght += 2
                            } else {
                                strlenght += 1
                            }
                        }
                    }
                    let str = value.length > length ? value.substring(0, length) + '...' : value
                    return str
                }

            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#344755',
                    width: 2
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        }],
        series: seriesData
    };
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
