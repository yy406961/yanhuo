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
import { phoneNumChange } from 'utils/index'
const createLabelTextYAxis = (data, position = 'left') => {
    return {
        name: '',
        nameLocation: 'start',
        nameTextStyle: {
            fontWeight: 'bold'
        },
        position,
        offset: 5,
        axisLine: {
            onZero: false,
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: true,
            color: '#fff'
        },
        inverse: true,
        data
    }
}

// 针对横向排名图 特殊处理文本提示
const buildlevelBarOption = opt => {
    // 右侧数据列表列
    let yRightData = []
    opt.series[0].data.forEach(it => {
        yRightData.push(it.dataObj.value || it.value)
    })
    // 设置value列 、 居右
    let yAxisVaue = createLabelTextYAxis(yRightData, 0, 'right')
    yAxisVaue.inverse = false
    opt.yAxis.push(yAxisVaue)
    return opt
}

import { mapGetters } from 'vuex'
export default {
    name: 'lr-evelBar',
    props: ['option', 'renderData'],
    data() {
        return {
            width: 600,
            height: 400,
            isEmptyStatus: false
        }
    },
    computed: {
        ...mapGetters({
            isPhoneJM: 'global/isPhoneJM'
        }),
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
            let yData = dataArr.map(it => {
                return this.isPhoneJM ? phoneNumChange(it.name) : it.name
            })
            let option = {
                grid: {
                    top: '10',
                    left: '120',
                    right: '80',
                    bottom: '10'
                },
                tooltip: {
                    show: false,
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft YaHei'
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
                        barWidth: 10,
                        itemStyle: {
                            barBorderRadius: 20,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 1,
                                x2: 1,
                                y2: 0,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'RGBA(121, 70, 227,1)' // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'RGBA(76, 241, 246,1)' // 100% 处的颜色
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
                        splitLine: false,
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
                            align: 'left',
                            textStyle: {
                                color: 'rgba(255,255,255,.7)',
                                fontFamily: 'Microsoft YaHei',
                                fontSize: 12
                            }
                        },
                        position: 'left',
                        offset: 100,
                        data: yData,
                        axisLine: false,
                        splitLine: false,
                        axisTick: { show: false },
                        boundaryGap: ['0%', '5%'],
                        name: '',
                        nameTextStyle: { color: '' }
                    }
                ]
            }
            option = buildlevelBarOption(option)
            return option
        }
    }
}
</script>
