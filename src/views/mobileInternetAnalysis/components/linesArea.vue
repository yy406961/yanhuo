<template>
    <div :style="chartStyle">
        <div :style="chartStyle" ref="line"  v-if="!isEmptyStatus"></div>
        <div class='emptydata' v-if="isEmptyStatus" :style="chartStyle">
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
const buildData = (scaleData, props) => {
    let { smooth, border, area } = props
    let borderColor = border || ['rgba(247,138,28,1)', 'rgba(255,97,97,1)']
    let areaColor = area || ['rgba(250,121,57,0.4)', 'rgba(251,118,62,0.1)']
    let isSmooth = smooth
    let data = []
    let yAxis = []
    if (scaleData) {
        data = scaleData.map(item => {
            yAxis.push({
                value: item.name
            })
            return {
                name: item.name,
                value: item.value,
                dataObj: item
            }
        })
    }
    // let key = false
    // let yMargin = 8
    // yAxis.map(item => {
    //     if (item.toString().length > 1) {
    //         key = true
    //         return
    //     }
    // })
    // if (!key) {
    //     yMargin = 14
    // }
    let itemColor = borderColor
    if (borderColor.length > 1) {
        itemColor = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                {
                    offset: 0,
                    color: borderColor[0] // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: borderColor[1] // 100% 处的颜色
                }
            ],
            globalCoord: false // 缺省为 false
        }
    }
    let option = {
        grid: {
            containLabel: true,
            left: '10',
            top: '10',
            right: '30',
            bottom: '10'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    // RGBA(26, 188, 196,.5)
                    color: 'rgba(60,164,255,0.2)'
                }
            },
            textStyle: {
                fontSize: 12,
                fontFamily: 'Microsoft YaHei'
            },
            formatter(params) {
                let compType
                let d = ''
                if (_.isArray(params)) {
                    for (let i = 0; i <= params.length; i++) {
                        let it = params[i]
                        if (_.isObject(it.data.dataObj)) {
                            d = it.data
                        } else if (_.isString(it.data.dataObj)) {
                            d = it.data
                        }
                        break
                    }
                    compType = params[0].componentSubType
                } else {
                    d = params.data
                    compType = params.componentSubType
                }

                if (compType === 'line') {
                    let lineData = {}
                    if (_.isObject(d)) {
                        lineData = { value: d.value, name: d.name, data: { dataObj: d.dataObj }}
                        if (d.xAxis) {
                            lineData.xAxis = true
                        }
                    } else {
                        lineData = { value: d, name: params.name, data: { dataObj: {}}}
                    }
                    window['__ECHART_LINE_HOVERDATA_X_'] = lineData
                }

                if (d.dataObj) {
                    let { tipsText } = d.dataObj
                    return tipsText || d.value
                }
            }
        },
        xAxis: [
            {
                axisLabel: {
                    interval: 'auto',
                    // rotate: 20,
                    textStyle: {
                        color: 'rgba(162,238,255,0.75)',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 12
                    }
                },
                data: yAxis,
                axisLine: {
                    show: false
                },
                splitLine: false,
                axisTick: {
                    show: false
                },
                boundaryGap: false,
                // boundaryGap: ['0%', '5%'],
                name: '',
                nameTextStyle: { color: '' }
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.5)',
                        width: 0.3
                    }
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: function(value) {
                        let str = value
                        if (value > 10000 && value < 10000000) {
                            str = value / 10000 + '万'
                        } else if (value >= 10000000) {
                            str = value / 100000000 + '亿'
                        }
                        return str
                    },
                    // margin: yMargin,
                    textStyle: {
                        color: 'rgba(162,238,255,0.75)',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 12
                    }
                }
            }
        ],
        series: [
            {
                type: 'line',
                smooth: isSmooth,
                data: data,
                symbol: 'circle',
                //                    symbol: 'circle',
                sampling: 'average',
                itemStyle: {
                    color: itemColor
                },
                lineStyle: {
                    width: 4
                },
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: areaColor[0] // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: areaColor[1] // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    },
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 5
                }
            }
        ]
    }
    return option
}
export default {
    name: 'is-linesArea',
    props: ['option'],
    data() {
        return {
            width: '100',
            height: '300',
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
        'option.renderData'(newVal) {
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
            if (data.length === 0) {
                this.isEmptyStatus = true
            } else {
                this.isEmptyStatus = false
            }
            let op = buildData(data, this.option)
            if (this.EC) {
                this.EC.clear()
            }
            this.EC.setOption(op)
        },
        resizeComp(newVal) {
            if (newVal) {
                this.width = newVal.width
                this.height = newVal.height
                this.$nextTick(() => {
                    this.EC.resize()
                })
            }
        },
        startLoading() {
            if (this.EC) {
                this.EC.showLoading('', {
                    text: 'loading',
                    color: '#00ccff',
                    textColor: '#fff',
                    maskColor: 'rgba(0, 0, 0, 0.3)',
                    zlevel: 0
                })
            }
        },
        endLoading() {
            if (this.EC) this.EC.hideLoading()
        }
    }
}
</script>
