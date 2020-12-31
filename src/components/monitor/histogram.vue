<template>
    <div :style="chartStyle" ref="line"></div>
</template>

<script>
    //    import { buildData } from './lineTrendUtil'
    const buildData = (data, props, timeType) => {
        let __chartName__ = 'line'
        let color = ['#3cf887', '#36befc']
        let seriesObj = {
            type: __chartName__,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0.3,
                        color: 'rgba(0, 170, 255, 1)'
                    }, {
                        offset: 1,
                        color: 'rgba(24, 117, 240, 0.1)'
                    }], false)
                }
            },
            itemStyle: {
                normal: {
                    color: color[1]
                },
                emphasis: {
                    color: color[0]
                }
            },
            smooth: true,
            barCategoryGap: 0,
            data: data
        }
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line',
                    lineStyle: {
                        opacity: 0.7,
                        color: '#ccc'
                    }
                }
            },
            grid: { // 是否显示网格
                show: false,
                left: props.gridLeft || '20%',
                right: props.gridRight || '20%',
                bottom: props.gridBottom || '20%',
                top: props.gridTop || '20%'
            },
            xAxis: {
                boundaryGap: false,
                data: data.map(item => {
                    if (timeType === 0 || timeType === 1) {
                        return item.time.slice(-8)
                    } else {
                        return item.time
                    }
                }),
                axisLabel: {
                    show: false,
                    textStyle: {
                        color: '#A2EEFF'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#878787',
                        width: 2
                    }
                },
                axisTick: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#878787',
                        width: 2
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#A2EEFF',
                        fontSize: 11
                    }
                },
                splitNumber: 5,
                splitLine: {
                    show: false
                }
            },
            dataZoom: {
                type: 'inside'
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
        name: 'historgram',
        props: [
            'option',
            'renderData'
        ],
        data () {
            return {
                width: '100%',
                height: '300px'
            }
        },
        computed: {
            chartStyle () {
                return {
                    width: this.width,
                    height: this.option.height
                }
            }
        },
        watch: {
            'renderData' (newVal) {
                if (newVal && newVal.length) {
                    this.loadData(newVal)
                }
            }
        },
        created () {
            this.width = this.option.width
            this.height = this.option.height
        },
        mounted () {
            this.initChart()
            this.loadData(this.renderData, this.option.props || {}, this.option.timeType)
        },
        methods: {
            initChart () {
                this.EC = echarts.init(this.$el)
            },
            loadData (data) {
                let op = buildData(data, this.option.props || {}, this.option.timeType);
                this.EC.setOption(op)
            },
            resize () {
                this.EC.resize()
            }
        }
    }
</script>

<style scoped>
</style>
