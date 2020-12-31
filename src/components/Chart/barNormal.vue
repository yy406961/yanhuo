<template lang="html">
    <div :style="chartStyle" ref="bar"> </div>
</template>

<script>
    const buildLevelData = (data, props) => {
        let { xName, yName } = props
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
            barWidth: '24',
            label: {
                normal: {
                    show: true,
//                    position: 'insideRight',
                    textStyle: {
                        color: '#000' // color of value
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#00ccff'
                }
            }
        }
        seriesObj.data = datas;
        let nameColor = '#00d8f1'
        let option = {
            series: [seriesObj],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: '{b}:{c}'
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '10%',
                top: '20%',
                containLabel: true
            },
            xAxis: [
                {
                    name: xName,
                    nameTextStyle: {
                        color: nameColor
                    },
                    axisLine: {
                        show: true
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 0
                    },
                    data: categories
                }
            ],
            yAxis: [
                {
                    name: yName,
                    type: 'value',
                    nameTextStyle: {
                        color: nameColor
                    },
                    axisLabel: {
                        show: true
                    },
                    axisLine: {
                        show: true
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: false,
                    boundaryGap: ['0%', '5%']
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
        name: 'bar',
        props: [
            'option',
            'renderData'
        ],
        data () {
            return {
                width: 500,
                height: 400
            }
        },
        computed: {
            chartStyle () {
                return {
                    width: this.width + 'px',
                    height: this.height + 'px'
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
        },
        methods: {
            initChart () {
                this.EC = echarts.init(this.$el)
            },
            loadData (data) {
                let op = buildLevelData(data, this.option.props || {});
                this.EC.setOption(op)
                let me = this;
                this.EC.on('click', function (params) {
                    me.$emit('barToSelect', params.dataIndex)
                })
            },
            resize () {
                this.EC.resize()
            }
        }
    }
</script>

<style lang="css">
</style>
