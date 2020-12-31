<template>
    <div :style="chartStyle" ref="line"></div>
</template>

<script>
//    import { buildData } from './lineTrendUtil'
const buildData = (data, props) => {
    let __chartName__ = 'bar'
    let { tName, gridLeft, gridRight, gridTop, gridBottom, xName, yName } = props
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
    let dataAll = [dataOne, dataTwo]
    let typeAll = [typeOne, typeTwo]
    dataOne.forEach(item => {
        categories.push(item.name)
    })
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
            barWidth: '16',
            name: typeAll[i],
            data: datas,
            symbolSize: 7,
            itemStyle: {
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
            show: !0,
            text: tName,
            left: 'left',
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        legend: {
            data: typeAll
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            // 是否显示网格
            left: gridLeft || '20%',
            right: gridRight || '20%',
            bottom: gridBottom || '20%',
            top: gridTop || '20%'
        },
        xAxis: [
            {
                name: xName,
                data: categories,
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 0
                }
            }
        ],
        yAxis: [
            {
                name: yName,
                type: 'value',
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true
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
    props: ['option', 'renderData', 'flag'],
    data() {
        return {
            width: 500,
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
