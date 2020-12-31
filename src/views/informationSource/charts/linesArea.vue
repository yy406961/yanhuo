<template>
    <div :style="chartStyle" @click="lineClick">
        <div :style="chartStyle" ref="line"  v-if="!isEmptyStatus"></div>
        <div class='emptydata' v-if="isEmptyStatus" :style="chartStyle">
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
const buildData = scaleData => {
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
    let intervalData
    if (yAxis.length > 3) {
        intervalData = index => {
            if (index === 0 || index === yAxis.length - 1) {
                return true
            } else {
                return false
            }
        }
    } else {
        intervalData = 'auto'
    }
    let key = false
    let yMargin = 0
    yAxis.map(item => {
        if (item.toString().length > 1) {
            key = true
            return
        }
    })
    if (key) {
        yMargin = 14
    }
    let option = {
        grid: {
            containLabel: true,
            left: '3%',
            top: '10',
            right: '10%',
            bottom: '5%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'RGBA(26, 188, 196,.5)'
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
                    interval: intervalData,
                    // interval: 'auto',
                    textStyle: {
                        color: 'rgba(255,255,255,.7)',
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
                    margin: yMargin,
                    textStyle: {
                        color: 'rgba(255,255,255,.7)'
                    }
                }
            }
        ],
        series: [
            {
                type: 'line',
                smooth: true,
                data: data,
                symbol: 'circle',
                //                    symbol: 'circle',
                sampling: 'average',
                itemStyle: {
                    color: 'RGBA(26, 188, 196,1)'
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
                                    color: 'RGBA(76, 241, 246,.8)' // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'RGBA(121, 70, 227,.3)' // 100% 处的颜色
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
            // this.EC.on('click', (...args) => {
            //     this.clickHandler(...args)
            // })
        },
        loadData(data) {
            if (data.length === 0) {
                this.isEmptyStatus = true
            } else {
                this.isEmptyStatus = false
            }
            let op = buildData(data)
            if (this.EC) {
                this.EC.clear()
            }
            this.EC.setOption(op)
        },
        clickHandler(...arg) {
            if (_.isFunction(this.option.onClick)) this.option.onClick(...arg)
        },
        resize() {
            this.EC.resize()
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
        },
        lineClick() {
            let obj = window['__ECHART_LINE_HOVERDATA_X_']
            console.log(obj)
            if (obj && obj.data && obj.data.dataObj) {
                if (_.isFunction(this.option.onClick)) this.option.onClick(obj)
            }
        }
    }
}
</script>
