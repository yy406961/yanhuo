<template lang="html">
      <div :style="chartStyle" ref="bar" style="z-index:2"></div>
</template>

<script>
//  import { buildData } from './pieChartUtil'
    const buildData = (data) => {
        let __chartName__ = 'pie'
        let datas = []
        let dataName = []
        if (data) {
            data.forEach(item => {
                if (+item.count !== 0) {
                    datas.push({
                        name: item.name,
                        value: item.count || 0,
                        dataObj: item
                    })
                }
                dataName.push(item.name)
            })
        }
        let seriesObj = {
            type: __chartName__,
            center: ['30%', '50%'],
            radius: ['25%', '45&'],
            label: {
                normal: {
                    show: false,
                    position: 'inner',
                    formatter: '{b} {d}%'
                }
            },
            minAngle: 3
        }
        seriesObj.data = datas
        let legend = {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            textStyle: {
                color: '#fff'
            }
        }
        legend.data = dataName
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
            color: ['rgba(54,190,252,.9)', 'rgba(60,248,135,.9)', 'rgba(251,209,61,.9)', 'rgba(217,77,93,.9)', 'rgba(0,250,234,.9)'],
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
            series: [seriesObj],
            legend: legend
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
            'option.width' (val) {
                this.width = val;
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
