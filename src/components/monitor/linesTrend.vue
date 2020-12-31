<template>
    <div :style="chartStyle" ref="line"></div>
</template>

<script>
//    import { buildData } from './lineTrendUtil'
const buildData = (data, props) => {
    // console.log(data)
    let __chartName__ = 'line'
    let { tName, gridLeft, gridRight, gridTop, gridBottom } = props
    let seriesObjs = []
    let categories = []
    let dataOne = []
    let dataTwo = []
    let typeOne = ''
    let typeTwo = ''
    let dataLabel = '{b0}<br/>'
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
    //        if (flag === 0 || flag === 1) {
    //            dataOne.forEach(item => {
    //                categories.push(item.time.slice(-8) || '')
    //            })
    //        } else {
    //            dataOne.forEach(item => {
    //                categories.push(item.time || '')
    //            })
    //        }
    dataOne.forEach(item => {
        if (item.time !== '暂无数据') {
            categories.push(item.time.slice(0, -3) || '')
        } else {
            categories.push(item.time || '')
        }
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
        if (dataAll[i].length) {
            let label =
                '<span style="margin-right:4px;display:inline-block;width:10px; height:10px;border-radius: 50%; background: ' +
                color[i] +
                '"></span>' +
                '{a' +
                i +
                '}：{c' +
                i +
                '}<br />'
            dataLabel += label
        }
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
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line',
                lineStyle: {
                    opacity: 0.7,
                    color: '#ccc'
                }
            },
            formatter: dataLabel
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
                    show: !0,
                    lineStyle: {
                        color: '#3c414f'
                    }
                },
                axisTick: {
                    show: !1
                },
                axisLabel: {
                    show: false,
                    textStyle: {
                        color: '#fff',
                        fontSize: 11
                    }
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
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 11
                    }
                },
                splitNumber: 2,
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
    name: 'mlineTrend',
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
