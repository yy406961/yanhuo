<template>
    <div :style="chartStyle">
        <div :style="chartStyle" ref="line" v-if="!isEmptyStatus"></div>
        <div class='emptydata' v-if="isEmptyStatus" :style="chartStyle">
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
const buildData = (data, props, index = 0) => {
    let { gridLeft, gridRight, gridTop, gridBottom } = props
    let color = ['#3cf887', '#3cf887', '#36befc']

    let resultData = []
    let typeAll = []
    data.forEach(item => {
        let { type } = item
        if (!typeAll.includes(type)) {
            typeAll.push(type)
            resultData.push([])
        }
    })
    data.forEach(item => {
        typeAll.forEach((it, index) => {
            if (item.type === it) {
                resultData[index].push(item)
            }
        })
    })

    let categories = []
    resultData[0].forEach(item => {
        let time = index === 1 ? item.time.substr(11, 2) : item.time.substr(11, 5)
        categories.push(time || '')
    })

    let seriesObjs = []
    resultData.forEach((item, index) => {
        let seriesData = []
        item.forEach(it => {
            seriesData.push({
                name: it.time,
                value: it.value,
                dataObj: it
            })
        })
        seriesObjs.push({
            type: 'line',
            symbol: 'circle',
            data: seriesData,
            symbolSize: 6,
            smooth: true,
            markPoint: {
                // symbol: 'rect',
                symbolSize: [60, 50],
                // silent: true,
                data: [
                    { type: 'max', name: '最大值' }
                ],
                animationDelay: 2000,
                animationDuration: 1000,
                label: {
                    normal: {
                        fontSize: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#DC143C'
                        // color: '#11365D'
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: color[index]
                }
            },
            lineStyle: {
                normal: {
                    color: color[index]
                }
            }
        })
    })
    let option = {
        series: seriesObjs,
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
            position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                let obj = { top: 0 }
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
                return obj
            },
            formatter: function (params) {
                let label = ''
                let coutName = index === 0 ? '用户数' : '平均用户数'
                let { time, value, insertTime, maxCount, maxTime, minCount, minTime, avgCount } = params[0].data.dataObj
                if (params.length === 1) {
                    label += `<span style="font-size:12px">统计时间：</span>${time}</br>
                        <span style="font-size:12px">${coutName}：</span>${value}`
                } else {
                    label += `统计区间：${insertTime}</br>
                        最大用户数：${maxCount}</br>
                        产生时间：${maxTime}</br>
                        最小用户数：${minCount}</br>
                        产生时间：${minTime}</br>
                        平均用户数：${avgCount}
                    `
                }
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
                    show: true,
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
    props: ['option', 'renderData', 'index'],
    data() {
        return {
            width: 1000,
            height: 400,
            isEmptyStatus: false
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
            if (this.EC) {
                this.EC.clear()
            }
            if (!newVal || !newVal.length) {
                this.isEmptyStatus = true
            } else {
                this.isEmptyStatus = false
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
            let op = buildData(data, this.option.props || {}, this.index)
            this.EC.setOption(op)
            this.EC.off('click')
            let me = this
            this.EC.on('click', function (params) {
                if (params.componentType === 'series') {
                    me.$emit('showDialog', params.data.dataObj.time)
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
.emptydata{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #51858b;
    position: absolute;
    top: 0;
    width: 100%;
    font-size: 14px;
}
</style>
