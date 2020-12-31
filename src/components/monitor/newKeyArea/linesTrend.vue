<template>
    <div :style="chartStyle" ref="line"></div>
</template>

<script>
//    import { buildData } from './lineTrendUtil'
const buildData = (data, props, flag, last) => {
    // console.log(data)
    let __chartName__ = 'line'
    let { tName, gridLeft, gridRight, gridTop, gridBottom } = props
    let seriesObjs = []
    let categories = []
    let dataOne = []
    let dataTwo = []
    let typeOne = ''
    let typeTwo = ''
    let color = ['#3cf887', '#36befc']
    let dataAll = []

    if (flag === 0 && last === 2) {
        // 一条折线
        typeOne = '在线用户数'
        dataAll = [data]
    } else {
        // 两天折线
        for (let i = 0; i < data.length; i++) {
            if (data[i].type) {
                if (data[i].type === 'max') {
                    dataOne.push(data[i])
                    typeOne = '最大用户数'
                } else {
                    dataTwo.push(data[i])
                    typeTwo = '最小用户数'
                }
            }
        }
        dataAll = [dataOne, dataTwo]
    }
    dataAll[0].forEach(item => {
        if (item.time !== '暂无数据') {
            categories.push(item.time.slice(0, -3) || '')
        } else {
            categories.push(item.time || '')
        }
    })
    let typeAll = [typeOne, typeTwo]
    for (let i = 0; i < dataAll.length; i++) {
        let datas = []
        if (dataAll[i]) {
            dataAll[i].forEach(item => {
                datas.push({
                    value: item.value,
                    dataObj: item
                })
            })
        }
        let seriesObj = {
            type: __chartName__,
            symbol: 'circle',
            name: typeAll[i],
            data: datas,
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
            textStyle: {
                fontSize: 13
            },
            position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                let obj = { top: 0 }
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
                return obj
            },
            formatter: function (params) {
                let label = ''
                let count = ['maxCount', 'minCount']
                let time = ['maxTime', 'minTime']
                params.forEach((item, index) => {
                    // flag === 0 && last === 1 : `时间：${}` '统计区间：</br>'
                    // label = '<span style="margin-right:4px;display:inline-block;width:10px; height:10px;border-radius: 50%; background: ' +
                    // color[index] +
                    '"></span>'
                    if (flag === 0 && last !== 1) {
                        label += `时间：${item.data.dataObj.time}</br>${typeAll[index]}${item.data.value}`
                    } else {
                        let url = index === 0 ? `统计区间：${item.data.dataObj.insertTime}</br>` : ''
                        label += `${url}
                        ${typeAll[index]}：${item.data.dataObj[count[index]]}</br>
                        时间：${item.data.dataObj[time[index]]}</br></span>
                        `
                    }
                })
                return label
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
    props: ['option', 'renderData', 'flag', 'last'],
    data() {
        return {
            width: 1000,
            height: 400
        }
    },
    computed: {
        chartStyle() {
            return {
                width: this.width,
                height: this.height
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
            let op = buildData(data, this.option.props || {}, this.flag, this.last)
            this.EC.setOption(op)
            if (+this.flag !== this.last) {
                return
            }
            let _ = this;
            this.EC.off('click')
            this.EC.on('click', function (params) {
                // let x = event.clientX;
                // let y = event.clientY;
                if (params.componentType === 'series') {
                    console.log(params)
                    _.$emit('showDialog', true, params.data.dataObj.time)
                }
            })
        },
        resize() {
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

<style scoped>
</style>
