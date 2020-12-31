<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
    const buildData = (data, props) => {
        let seriesObjs = []
        let categories = []
        for (let i = 0; i < 25; i++) {
            categories.push(i)
        }
        let color = ['#FF0000', '#0000FF', '#FFFFFF', '#F2F203'];
        let { gridLeft, gridRight, gridTop, gridBottom } = props
        seriesObjs = [
            {
                name: '主叫',
                type: 'bar',
                stack: 'count',
                itemStyle: {
                    normal: {
                        color: color[1]
                    }
                },
                data: [],
                barGap: 0,
                barCategoryGap: 0
            },
            {
                name: '被叫',
                type: 'bar',
                stack: 'count',
                itemStyle: {
                    normal: {
                        color: color[0]
                    }
                },
                data: [],
                barGap: 0,
                barCategoryGap: 0
            },
            {
                name: '主短',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: color[2]
                    }
                },
                symbol: 'circle',
                symbolSize: 7,
                smooth: !0,
                data: []
            },
            {
                name: '被短',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: color[3]
                    }
                },
                symbol: 'circle',
                symbolSize: 7,
                smooth: !0,
                data: []
            }
        ]
        data.forEach(item => {
            if (item.name === '主叫次数') {
                item.countArray.forEach(items => {
                    seriesObjs[0].data.push(items)
                })
            } else if (item.name === '被叫次数') {
                item.countArray.forEach(items => {
                    seriesObjs[1].data.push(items)
                })
            } else if (item.name === '主短次数') {
                item.countArray.forEach(items => {
                    seriesObjs[2].data.push(items)
                })
            } else if (item.name === '被短次数') {
                item.countArray.forEach(items => {
                    seriesObjs[3].data.push(items)
                })
            }
        })
        let legend = {
            x: 'left',
            textStyle: {
                color: '#fff'
            },
            data: ['主叫', '被叫', '主短', '被短']
        }
        let option = {
            grid: { // 是否显示网格
                show: false,
                width: '100%',
                left: gridLeft || '20%',
                right: gridRight || '20%',
                bottom: gridBottom || '20%',
                top: gridTop || '20%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                },
                position: function (pos, params, dom, rect, size) {
                    // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                    let obj = { top: 0 }
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
                    return obj
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: categories,
                    axisLabel: {
                        interval: 0,
//                        rotate: -30,
                        show: true,
                        color: '#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        color: '#fff'
                    },
                    splitNumber: 2,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                {
                    type: 'value',
                    axisLabel: {
                        show: false,
                        color: '#fff'
                    },
                    splitNumber: 2,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            dataZoom: {
                type: 'inside'
            },
            series: seriesObjs,
            legend: legend
        }
        option.textStyle = {
            fontFamily: 'Microsoft YaHei',
            fontSize: '12'
        }
        return option
    }
    export default {
        name: 'stacked',
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
                if (newVal && newVal.length) {
                    this.loadData(newVal)
                }
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
                let op = buildData(data || [], this.option.props, this.option.timeType);
                this.EC.setOption(op)
            },
            resize () {
                this.EC.resize()
            }
        }
    }
</script>

<style>
</style>
