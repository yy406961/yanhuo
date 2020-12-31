<!--人物画像 APP使用 APP使用时段分布-->
<!--AND-->
<!--人物画像 上网情况 上网时段分布-->
<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
    const buildData = (data, props) => {
        let { xName, yName, titleName } = props
        let __chartName__ = 'line'
        let categories = []
        let dataArr = []
        for (let i = 0; i < 24; i++) {
            categories.push(i)
        }
        let color1 = ['rgba(239,157,51,0.7)', 'rgba(0, 170, 255, 0.6)', 'rgba(255,103,103,0.6)'];
        let color2 = ['rgba(239,157,51,0.1)', 'rgba(24, 117, 240, 0.1)', 'rgba(255,103,103,0.1)'];
        let color3 = ['rgba(239,157,51,1)', 'rgba(0,179,134,1)', 'rgba(255,103,103,1)'];
        let n = 0;
        if (data) {
            data.forEach(item => {
                if (n < 2) {
                    n++
                } else {
                    n = 0
                }
                dataArr.push({
                    type: __chartName__,
                    showSymbol: false,
//                    stack: '统计',
                    name: item.name,
                    data: item.data || item.sub,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: color1[n]
                            }, {
                                offset: 1,
                                color: color2[n]
                            }], false)
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: color3[n]
                        }
                    }
                })
            })
        }
        let nameColor = '#00d8f1'
        let option = {
            series: dataArr,
            tooltip: {
                show: true,
                trigger: 'axis',
//                position: function (pos, params, dom, rect, size) {
//                    // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
//                    let obj = { top: 0 }
//                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
//                    return obj
//                },
                formatter: function (params) {
                    let axisName = titleName + '：' + params[0].dataIndex + '点-' + (params[0].dataIndex + 1) + '点'
                    let nameVal = ''
                    params.forEach((item) => {
                        let span = `<div style="width: 8px;height: 8px;display: inline-block;
                          background: ${item.color};margin-right: 5px"></div>`
                        nameVal += span + item.seriesName + '：' + item.data + '次<br/>'
                    })
                    return `${axisName} <br/> ${nameVal}`
                }
            },
            grid: {
                left: '0%',
                right: '1%',
                bottom: '0%',
                top: '14%',
//                width: '100%',
//                height: '86%',
                containLabel: true
            },
            xAxis: [
                {
                    name: xName,
                    type: 'category',
                    boundaryGap: false,
                    data: categories,
                    // 坐标轴名称的文字样式
                    nameTextStyle: {
                        color: nameColor
                    },
                    // 坐标轴在 grid 区域中的分隔线
                    splitLine: {
                        show: false
                    },
                    // 坐标轴刻度标签
                    axisLabel: {
                        interval: 0,
                        show: true,
                        textStyle: {
                            color: '#EEE'
                        }
                    },
                    // 坐标轴轴线
                    axisLine: {
                        lineStyle: {
                            color: '#344755',
                            width: 2
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
                    name: yName,
                    nameLocation: 'end',
                    nameTextStyle: {
                        color: nameColor
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#344755',
                            width: 2
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        show: true,
                        textStyle: {
                            color: '#EEE'
                        }
                    }
                }
            ]
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
                let op = buildData(data, this.option.props || {});
                this.EC.clear()
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
