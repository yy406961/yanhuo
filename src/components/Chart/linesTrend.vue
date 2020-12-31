<template>
    <div :style="chartStyle" ref="line"></div>
</template>

<script>
//    import { buildData } from './lineTrendUtil'
const buildData = (data, props) => {
    let __chartName__ = 'line'
    let { tName, gridLeft, gridRight, gridTop, gridBottom } = props
    let seriesObjs = []
    let categories = []
    let dataOne = []
    let dataTwo = []
    let typeOne = ''
    let typeTwo = ''
    let color = ['#3cf887', '#36befc']
    if (data.length) {
        typeOne = data[0].type
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === typeOne) {
            dataOne.push(data[i])
        } else {
            dataTwo.push(data[i])
        }
    }
    if (dataTwo.length) {
        typeTwo = dataTwo[0].type
    }
    dataOne.forEach(item => {
        categories.push(item.name)
    })
    let dataAll = [dataOne, dataTwo]
    let typeAll = [typeOne, typeTwo]
    for (let i = 0; i < dataAll.length; i++) {
        let datas = []
        if (dataAll[i]) {
            dataAll[i].forEach(item => {
                datas.push({
                    name: item.name,
                    value: item.value,
                    dataObj: item
                })
            })
        }
        let seriesObj = {
            type: __chartName__,
            symbol: 'circle',
            name: typeAll[i],
            data: datas.map(function(item) {
                return item.value
            }),
            symbolSize: 7,
            smooth: !0,
            markPoint: {
                symbol: 'circle',
                symbolSize: 10,
                silent: !0,
                label: {
                    normal: {
                        show: !1
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 15,
                        borderColor: color[i]
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: color[i]
                }
            },
            lineStyle: {
                normal: {
                    color: color[i]
                }
            }
        }
        seriesObjs.push(seriesObj)
    }
    let option = {
        series: seriesObjs,
        title: {
            show: true,
            text: tName,
            left: 'left',
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        legend: {
            data: categories
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line',
                lineStyle: {
                    opacity: 0.7,
                    color: '#ccc'
                }
            }
        },
        grid: {
            // 是否显示网格
            show: false,
            left: gridLeft || '20%',
            right: gridRight || '20%',
            bottom: gridBottom || '20%',
            top: gridTop || '20%'
        },
        xAxis: [
            {
                type: 'category',
                symbol: 'circle',
                data: categories,
                boundaryGap: !1,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#3c414f'
                    }
                },
                axisTick: {
                    show: true
                },
                axisLabel: {
                    show: true
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: !0,
                    lineStyle: {
                        color: '#3c414f'
                    }
                },
                axisTick: {
                    show: !1
                },
                splitLine: {
                    show: false
                }
            }
        ],
        dataZoom: {
            type: 'inside'
        }
    }
    option.textStyle = {
        fontFamily: 'Microsoft YaHei',
        fontSize: '12'
    }
    return option
}
export default {
    name: 'lineTrend',
    props: ['option', 'renderData', 'flag'],
    data() {
        return {
            width: 1000,
            height: 400
        }
    },
    computed: {
        chartStyle() {
            return {
                width: this.width + 'px',
                height: this.height + 'px'
            }
        }
    },
    watch: {
        renderData(newVal) {
            if (newVal && newVal.length) {
                this.loadData(newVal)
            }
        }
    },
    created() {
        this.width = this.option.width
        this.height = this.option.height
    },
    mounted() {
        this.initChart()
    },
    methods: {
        initChart() {
            this.EC = echarts.init(this.$el)
        },
        loadData(data) {
            let op = buildData(data, this.option.props || {}, this.flag)
            this.EC.setOption(op)
        },
        resize() {
            this.EC.resize()
        }
    }
}
</script>

<style scoped>
</style>
