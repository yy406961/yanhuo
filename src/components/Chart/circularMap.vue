<template lang="html">
      <div :style="chartStyle" ref="bar" style="z-index:2"></div>
</template>

<script>
//  import { buildData } from './pieChartUtil'
    const buildData = (data) => {
        // let __chartName__ = 'pie'
        let color = ['rgba(0,170,255,.9)', 'rgba(255,103,103,.9)', 'rgba(239,157,51,.9)', 'rgba(217,77,93,.9)', 'rgba(0,250,234,.9)']
        let datas = []
        if (data) {
            data.forEach((item, index) => {
                datas.push({
                    name: item.name,
                    value: item.value || 0,
                    dataObj: item,
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: color[index]
                        }
                    }
                })
            })
        }
        // let seriesObj = {
        //     type: __chartName__,
        //     radius: ['70%', '80%'],
        //     label: {
        //         normal: {
        //             show: false,
        //             position: 'inner',
        //             formatter: '{b} {d}%'
        //         }
        //     },
        //     minAngle: 3,
        //     data: datas
        // }
        let seriesObj = [
            {
                name: '',
                type: 'gauge',
                radius: '72%',
                startAngle: 0,
                endAngle: 359.9,
                splitNumber: 80,
                hoverAnimation: true,
                axisTick: {
                    show: false
                },
                splitLine: {
                    length: 40,
                    lineStyle: {
                        width: 2,
                        color: '#0F172A'
                    }
                },
                axisLabel: {
                    show: false
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        opacity: 0
                    }
                },
                detail: {
                    show: false
                },
                data: [{
                    value: 0,
                    name: ''
                }]
            },
            {
                name: '',
                type: 'pie',
                radius: ['75%', '80%'],
                z: 0,
                zlevel: 0,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        formatter: '{a}: {b}:{c}',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                data: datas
            },
            {
                name: '',
                type: 'pie',
                radius: ['58%', '72%'],
                silent: true,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                z: 0,
                zlevel: 0,
                data: datas
            },
            {
                name: '',
                type: 'pie',
                radius: ['54%', '56%'],
                silent: true,
                z: 0,
                zlevel: 0,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    }
                },
                data: datas
            }
        ]
        let maxData = function () {
            let sum = 0
            let max = 0
            let flag = false
            data.forEach(item => {
                sum += item.value
                max = max > item.value ? max : item.value
            })
            data.forEach(item => {
                if (item.value / sum < 0.01) {
                    flag = true
                }
            })
            return {
                max: max,
                flag: flag
            }
        }
        let percentData = maxData()
        let option = {
            tooltip: {
                position: function (pos, params, dom, rect, size) {
                    // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                    let obj = { top: 60 }
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
                    return obj
                },
                trigger: 'item',
                formatter: function (params) {
                    if (percentData.flag === true && params.value === percentData.max) {
                        params.percent -= 0.01
                        return `${params.name} : ${params.percent.toFixed(2)}%`
                    } else if (params.percent <= 0.01) {
                        return `${params.name} : ≤0.01%`
                    } else {
                        return `${params.name} : ${params.percent.toFixed(2)}%`
                    }
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
        name: 'pie',
        props: [
            'option',
            'renderData'
        ],
        data () {
            return {
                width: 100,
                height: 100
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
            },
            'option.height' (val) {
                this.height = val;
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
                let op = buildData(data, this.option.props || {});
                this.EC.setOption(op)
                let me = this;
                this.EC.on('click', function (params) {
                    me.$emit('pieToTabs', params.dataIndex)
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
