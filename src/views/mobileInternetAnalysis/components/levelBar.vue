<template>
    <div :style="chartStyle">
        <div :style="chartStyle" ref="levelBar" v-if="!isEmptyStatus"></div>
        <div class='emptydata' v-if="isEmptyStatus" :style="chartStyle">
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
/**
 * 创建label显示轴 为排名图
 * [getLabelTextYAxis description]
 * @param  {[type]}  data   y轴数据
 * @param  {[type]}  offset 偏移
 * @return {Boolean}        [description]
 */

export default {
    name: 'mobile-evelBar',
    props: ['option', 'renderData'],
    data() {
        return {
            width: 600,
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
            this.EC.on('click', (...args) => {
                this.clickHandler(...args)
            })
        },
        loadData(data) {
            let op = this.buildData(data)
            if (this.EC) {
                this.EC.clear()
            }
            this.EC.setOption(op)
            if (data && data.length) {
                this.isEmptyStatus = false
                let height = $(this.$el).height()
                if (height < 200) {
                    op.series[0].barWidth = 6
                }
            } else {
                this.isEmptyStatus = true
            }
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
        buildData(data) {
            let originData = data.map(item => {
                return {
                    name: item.name,
                    value: item.value || 0,
                    dataObj: item
                }
            })
            let dataArr = _.reverse(
                _.sortBy(originData, function(o) {
                    return o.ordernum
                })
            )
            dataArr.map(item => {
                item.value = Math.sqrt(item.value)
                return item
            })
            let yRightata = []
            let yData = dataArr.map(it => {
                yRightata.push(it.name)
                let { dataObj } = it
                return dataObj.ordernum
            })
            let rich = {
                red: {
                    color: 'rgba(255,80,80,1)',
                    fontSize: 14
                },
                orange: {
                    color: 'rgba(255,157,107,1)',
                    fontSize: 14
                },
                yellow: {
                    color: 'rgba(218,210,106,1)',
                    fontSize: 14
                },
                normal: {
                    color: 'rgba(162,238,255,1)',
                    fontSize: 12
                }
            }
            let option = {
                grid: {
                    top: '10',
                    left: '20',
                    right: '100',
                    bottom: '10'
                },
                tooltip: {
                    show: true,
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft YaHei'
                    },
                    position: function (pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        let obj = { top: 60 }
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
                        return obj
                    },
                    formatter(source) {
                        if (source.data.dataObj) {
                            let { tipsText } = source.data.dataObj
                            return tipsText || source.data.value
                        }
                        return ''
                    }
                },
                textStyle: {
                    fontFamily: 'Microsoft YaHei',
                    fontSize: '12'
                },
                series: [
                    {
                        type: 'bar',
                        data: dataArr,
                        barWidth: 6,
                        itemStyle: {
                            barBorderRadius: [0, 20, 20, 0],
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 1,
                                x2: 1,
                                y2: 0,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(0,118,255,1)' // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0,196,255,1)' // 100% 处的颜色
                                    }
                                ],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textBorderColor: '#fff'
                            }
                        }
                    }
                ],
                xAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            show: false,
                            interval: 'auto',
                            textStyle: { color: '#fff', fontFamily: 'Microsoft YaHei', fontSize: 12 }
                        },
                        axisLine: false,
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.3)',
                                width: 0.3
                            }
                        },
                        axisTick: { show: false },
                        boundaryGap: ['0%', '5%'],
                        name: '',
                        nameTextStyle: { color: '' }
                    }
                ],
                yAxis: [
                    {
                        axisLabel: {
                            interval: 'auto',
                            align: 'right',
                            formatter: function(value) {
                                let str
                                if (value === '1') {
                                    str = '{red|' + value + '}'
                                } else if (value === '2') {
                                    str = '{orange|' + value + '}'
                                } else if (value === '3') {
                                    str = '{yellow|' + value + '}'
                                } else {
                                    str = '{normal|' + value + '}'
                                }
                                // let str = value.length > 6 ? value.substring(0, 6) + '...' : value
                                return str
                            },
                            textStyle: {
                                // color: 'rgba(162,238,255,1)',
                                // fontFamily: 'Microsoft YaHei',
                                // fontSize: 12
                            },
                            rich: rich
                        },
                        position: 'left',
                        offset: 0,
                        data: yData,
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(52,71,85,1)'
                            }
                        },
                        splitLine: false,
                        axisTick: { show: false },
                        boundaryGap: ['0%', '5%'],
                        name: '',
                        nameTextStyle: { color: '' }
                    },
                    {
                        name: '',
                        data: yRightata.reverse(),
                        nameLocation: 'start',
                        nameTextStyle: {
                            fontWeight: 'bold'
                        },
                        position: 'right',
                        offset: 0,
                        inverse: true,
                        axisLine: {
                            onZero: false,
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0,
                            formatter: function(value) {
                                let maxLength = 16
                                let strlenght = 0
                                let length = 0
                                for (let i = 0; i < value.length; i++) {
                                    if (strlenght < maxLength) {
                                        length++
                                        if (value.charCodeAt(i) > 128) {
                                            strlenght = strlenght + 2
                                        } else {
                                            strlenght = strlenght + 1
                                        }
                                    }
                                }
                                let str = value.length > length ? value.substring(0, length) + '...' : value
                                return str
                            },
                            textStyle: {
                                fontSize: 10,
                                color: 'rgba(162,238,255,1)'
                            }
                        }
                    }
                ]
            }
            return option
        }
    }
}
</script>
