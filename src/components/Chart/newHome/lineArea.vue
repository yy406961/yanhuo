<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
    const buildData = (data, props) => {
        let colors = {
            'green': ['rgba(0, 255, 191, 1)', 'rgba(0, 255, 191, 0.5)'],
            'yellow': ['rgba(229, 193, 0, 1)', 'rgba(229, 193, 0, 0.5)'],
            'blue': ['rgba(0, 170, 255, 1)', 'rgba(0, 170, 255, 0.5)'],
            'orange': ['rgba(255, 157, 107, 1)', 'rgba(255, 157, 107, 0.5)'],
            'red': ['rgba(255, 103, 103, 1)', 'rgba(255, 103, 103, 0.5)']
        }
        let colorsKey = Object.keys(colors)
        let categories = []
        let { gridLeft, gridRight, gridTop, gridBottom, colorStyle, legendShow = true } = props
        let dataArr = []
        let n = 0;
        if (data) {
            data.forEach(item => {
                categories = item.time
                dataArr.push({
                    name: item.name,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    data: item.data,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0.3,
                                color: colors[colorStyle || colorsKey[n]][1]
                            }, {
                                offset: 1,
                                color: 'rgba(24, 117, 240, 0.1)'
                            }], false)
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: colors[colorStyle || colorsKey[n]][0]
                        }
                    }
                })
                if (n < 2) {
                    n++
                } else {
                    n = 0
                }
            })
        }
        let option = {
            legend: {
                show: legendShow,
                top: 0,
                right: 0,
                icon: 'roundRect',
                itemWidth: 12,
                itemHeight: 8,
                textStyle: {
                    color: '#A2EEFF',
                    fontSize: 10
                }
            },
            grid: {
                x: gridLeft || 25,
                y: gridTop || 15,
                x2: gridRight || 15,
                y2: gridBottom || 5
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
                    let res = ''
                    params.forEach(item => {
                        res += `累计：${item.data}人</br>`
                    })
                    res += `时间：${params[0].name}`
                    return `<div style="font-size: 12px;margin:0 5px">${res}</div>`
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
                    show: true,
                    lineStyle: {
                        color: '#344755',
                        width: 2
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#A2EEFF',
                    formatter(value) {
                        let str = value.replace(/-/g, '/').slice(5, 10)
                        return str
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '',
                nameTextStyle: {
                    color: '#9af5f6',
                    padding: [0, 0, 0, 20]
                },
                axisLabel: {
                    show: true,
                    color: 'rgba(162,238,255,1)',
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
                // min: 'dataMin'
            },
            series: dataArr
        }
        option.textStyle = {
            fontFamily: 'Microsoft YaHei',
            fontSize: '12'
        }
        return option
    }
    export default {
        name: 'lineArea',
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

<style>
</style>
