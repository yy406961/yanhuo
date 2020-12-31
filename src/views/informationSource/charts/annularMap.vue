<template>
    <div :style="chartStyle">
        <div :style="chartStyle" ref="annular" v-if="!isEmptyStatus"></div>
        <div class='emptydata' v-if="isEmptyStatus" :style="chartStyle">
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
const buildData = (scaleData, opt) => {
    let x = 0 // 圆中心点的横向定位
    let p = 0 // 图例的偏移位置
    x = opt.width / 2 - (opt.height + 150) / 2 + opt.height * 0.9 / 2
    p = x + opt.height / 2
    let color = ['#f3a136', '#01f9d9', '#119ee0', '#7638f3', '#d8fb79'].reverse()
    let legendData = []
    for (let i = 0; i < scaleData.length; i++) {
        legendData.push(scaleData[i].name)
    }

    let seriesData = scaleData.map(item => {
        return {
            name: item.name,
            value: item.value,
            dataObj: item
        }
    })

    let seriesObj = [
        {
            name: '',
            type: 'pie',
            center: [x < 0 ? '40%' : x, '50%'],
            radius: ['55%', '70%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    borderWidth: 0,
                    shadowBlur: 10,
                    borderColor: color,
                    shadowColor: 'rgba(142,152,241, 0.5)'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: seriesData
        },
        {
            name: '白',
            type: 'pie',
            clockWise: false,
            center: [x, '50%'],
            radius: ['45%', '45.7%'],
            hoverAnimation: false,
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: scaleData.length === 0 ? 'transparent' : '#59A6FC'
                }
            },
            data: [
                {
                    value: 1,
                    tooltip: {
                        show: false
                    }
                }
            ]
        }
    ]
    let option = {
        backgroundColor: 'transparent',
        tooltip: {
            textStyle: {
                fontSize: 12,
                fontFamily: 'Microsoft YaHei'
            },
            formatter(source) {
                let { name, value } = source.data
                let { percent } = source
                return `${name}</br>占比：${percent}%</br>访问次数：${value}`
            }
        },
        color: color,
        legend: {
            show: true,
            orient: 'vertical',
            itemGap: 13,
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            left: p,
            top: 'middle',
            textStyle: {
                color: '#fff'
            },
            data: legendData
        },
        series: seriesObj
    }
    return option
}
export default {
    name: 'annular',
    props: ['option'],
    data() {
        return {
            width: 400,
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
        'option.renderData'(newVal) {
            if (newVal && newVal.length) {
                this.loadData(newVal, this.option)
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
            if (data.length === 0) {
                this.isEmptyStatus = true
            } else {
                this.isEmptyStatus = false
            }
            let w = $(this.$el).width()
            let h = $(this.$el).height()
            let op = buildData(data, {
                width: w,
                height: h
            })
            if (this.EC) {
                this.EC.clear()
            }
            this.EC.setOption(op)
        },
        clickHandler(...arg) {
            if (_.isFunction(this.option.onClick)) this.option.onClick(...arg)
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
                    maskColor: 'rgba(0, 0, 0, 0.3)'
                })
            }
        },
        endLoading() {
            if (this.EC) this.EC.hideLoading()
        },
        lineClick() {}
    }
}
</script>
