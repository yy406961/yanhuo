<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
    const buildData = (renderData, props) => {
        let { gridLeft, gridRight, gridTop, gridBottom, showLabel } = props
        let color = ['#E5C905', '#67CCFF', '#855CFE', '#FE868E', '#4c55b0', '#cf83f4', '#e6af15', '#00e3f3', '#6b81e1', '#00fbae']
        let seriesData = []
        let seriesObj = []
        let center = ['50%', '50%']
        let radius = ['40%', '60%']
        // let H = document.documentElement.clientHeight
        let labelPosition = showLabel ? 'outside' : 'inner'
        if (renderData[0]) {
            seriesData = renderData[0].map((item, index) => {
                let i = index % 10
                return {
                    name: item.name,
                    value: item.value,
                    selected: item.selected,
                    itemStyle: {
                        normal: {
                            color: color[i]
                        }
                    },
                    label: {
                        // show: index < 6 || H > 860,
                        // show: index < 6,
                        show: true,
                        formatter: '{b|{b}}\n{hr|}\n{c|{c}}',
                        position: labelPosition,
                        rich: {
                            b: {
                                fontSize: 12,
                                color: '#A2EEFF',
                                align: 'left',
                                padding: 2
                            },
                            hr: {
                                borderColor: '#12EABE',
                                width: '100%',
                                borderWidth: 2,
                                height: 0
                            },
                            d: {
                                fontSize: 12,
                                color: '#A2EEFF',
                                align: 'left',
                                padding: 2
                            },
                            c: {
                                fontSize: 12,
                                color: '#A2EEFF',
                                align: 'center',
                                padding: 2
                            }
                        },
                        lineHeight: 10
                    },
                    labelLine: {
                        normal: {
                            // show: index < 6 || H > 860,
                            // show: index < 6,
                            show: showLabel,
                            length: 5,
                            length2: 15,
                            lineStyle: {
                                width: 1,
                                color: '#12EABE'
                            }
                        },
                        emphasis: {
                            // show: index < 6 || H > 860
                            show: showLabel
                        }
                    }
                }
            })
        }
        if (renderData.length === 2) {
            // 内环玫瑰型
            radius = [0, '45%']
            center = ['50%', '50%']
        }
        seriesObj = [{
            name: ' ',
            type: 'pie',
            radius: radius,
            center: center,
            hoverOffset: 7,
            data: seriesData
        }]
        let option = {
            grid: {
                x: gridLeft || 15,
                y: gridTop || 15,
                x2: gridRight || 15,
                y2: gridBottom || 5
            },
            tooltip: {
                formatter: function(params) {
                    let str = `${params.name}</br>`
                    str += showLabel ? '' : `用户数：${params.value}</br>百分比：`
                    str += `${params.percent}%`
                    return str
                },
                textStyle: {
                    fontSize: 12
                }
            },
            series: seriesObj
        }
        option.textStyle = {
            fontFamily: 'Microsoft YaHei',
            fontSize: '12'
        }
        return option
    }
    export default {
        name: 'pieChart',
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
