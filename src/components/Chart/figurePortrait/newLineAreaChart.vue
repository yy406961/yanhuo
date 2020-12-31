<!--人物画像 基本信息 上网时段统计-->
<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
    const buildData = (data, props) => {
        let categories = []
        let seriesData = data
        for (let i = 0; i < 24; i++) {
            categories.push(i)
        }
        let { gridLeft, gridRight, gridTop, gridBottom } = props
        let option = {
            grid: {
                // 是否显示网格
                show: false,
                width: '97%',
                left: gridLeft || '20%',
                right: gridRight || '20%',
                bottom: gridBottom || '15%',
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
                },
                formatter: function (params) {
                    let axisName = '上网时段：' + params[0].dataIndex + '点-' + (params[0].dataIndex + 1) + '点'
                    let span = `<div style="width: 8px;height: 8px;display: inline-block;
                          background: ${params[0].color};margin-right: 5px;border-radius: 50%"></div>
                          ${params[0].seriesName}：${params[0].data}次<br/>`
                    return `${axisName} <br/> ${span}`
                }
            },
            xAxis: {
                type: 'category',
                data: categories,
                boundaryGap: false,
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#344755',
                        width: 2
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#fff'
                }
            },
            yAxis: {
                type: 'value',
                name: '次数',
                nameTextStyle: {
                    color: '#9af5f6',
                    padding: [0, 0, 0, 20]
                },
                axisLabel: {
                    show: false,
                    color: '#fff'
                },
                splitNumber: 2,
                axisLine: {
                    lineStyle: {
                        color: '#344755',
                        width: 2
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            series: [{
                name: '上网次数',
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: seriesData,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 170, 255, 0.7)'
                        }, {
                            offset: 1,
                            color: 'rgba(24, 117, 240, 0.1)'
                        }], false)
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(0,170,255,1)'
                    }
                }
            }]
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
                let op = buildData(data || [], this.option.props);
                this.EC.setOption(op)
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
            }
        }
    }
</script>

<style>
</style>
