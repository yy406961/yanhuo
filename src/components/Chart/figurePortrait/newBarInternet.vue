<!--人物画像 上网情况 上网次数-->
<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
    let activateBar
    const buildData = (data) => {
        let __chartName__ = 'bar'
        let categories = []
        let datas = []
        if (data) {
            data.forEach(item => {
                categories.push(item.name || '')
                datas.push({
                    name: item.name,
                    value: item.value || 0,
                    info: item.info,
                    dataObj: item,
                    group: 'noGroup'
                })
            })
        }
        let seriesObj = {
            type: __chartName__,
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    textStyle: {
                        color: function (params) {
                            let key = params.dataIndex
                            if (key === activateBar) {
                                return 'rgba(0,255,191,1)'
                            } else {
                                return 'rgba(162,238,255,1)'
                            }
                        }
//                        color: 'rgba(162,238,255,1)'
                    },
                    formatter: '{b} ({c})'
                }
            },
            itemStyle: {
                normal: {
                    color: function (params) {
                        let key = params.dataIndex
                        if (key === activateBar) {
                            return 'rgba(0,255,191,1)';
                        } else {
                            return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 0,
                                color: 'rgba(0,196,255,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,118,255,1)'
                            }], false)
                        }
                    },
                    barBorderRadius: 15
                }
            },
            barWidth: '50%',
            z: 3,
            zlevel: 3
        }
        seriesObj.data = datas.reverse();
        let nameColor = '#00d8f1'
        let option = {
            series: seriesObj,
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: '{b}:{c}'
            },
            grid: {
                left: '1%',
                right: '0%',
                bottom: '0%',
                top: '0%',
                width: '90%',
                height: '85%',
                containLabel: false
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
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
                splitLine: false,
                boundaryGap: ['0%', '5%']
            },
            yAxis: [
                {
                    nameTextStyle: {
                        color: nameColor
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
                    axisLabel: {
                        interval: 0,
                        show: false,
                        textStyle: {
                            color: '#344755'
                        }
                    },
                    data: categories.reverse()
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
                let op = buildData(data || [], this.option.props);
                this.EC.setOption(op)
                let me = this;
                this.EC.off('click')
                this.EC.on('click', function (params) {
                    activateBar = params.dataIndex
                    this.resize()
                    activateBar = null
                    if (params.componentType === 'series') {
                        me.$emit('barToInternetShow', params.data.dataObj)
                    }
                })
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
