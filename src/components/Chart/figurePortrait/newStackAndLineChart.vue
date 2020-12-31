<!--人物画像 基本信息 通联时段统计-->
<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
    const buildData = (data, props) => {
        let seriesObjs = []
        let categories = []
        for (let i = 0; i < 24; i++) {
            categories.push(i)
        }
        let color = ['#00AAFF', '#FF6767', '#EF9D33', '#00B386'];
        let { gridLeft, gridRight, gridTop, gridBottom } = props
        seriesObjs = [
            {
                name: '主叫',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: '被叫',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: '主短',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: '被短',
                type: 'line',
                showSymbol: false,
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
        let option = {
            color: color,
            legend: {
                right: 0,
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: color
                },
                data: ['主叫', '被叫', '主短', '被短']
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
//                    interval: 0,
//                    rotate: -30,
                    show: true,
                    color: '#fff'
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
                data: categories
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
                    let axisName = '通联时段：' + params[0].dataIndex + '点-' + (params[0].dataIndex + 1) + '点'
                    let nameVal = ''
                    params.forEach((item) => {
                        let span = `<div style="width: 8px;height: 8px;display: inline-block;
                          background: ${item.color};margin-right: 5px;border-radius: 50%"></div>`
                        nameVal += span + item.seriesName + '：' + item.data + '次<br/>'
                    })
                    return `${axisName} <br/> ${nameVal}`
                }
            },
            series: seriesObjs
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
