<template>
    <div :style="chartStyle">
        <div :style="chartStyle" ref="annular" v-show="!isEmptyStatus"></div>
        <div class='emptydata' v-show="isEmptyStatus" :style="chartStyle">
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
const buildData = (data, opt) => {
    let seriesObjs = []
    let legendData = []
    let r = 0
    let h = 0
    if (opt.width < opt.height) {
        r = opt.width / 2 * 0.9
        h = opt.width / 2 * 0.1 - 10
    } else {
        r = opt.height / 2 * 0.9
        h = opt.height / 2 * 0.1 - 10
    }
    let color = ['#6A5DF8', '#5783F0', '#60A4FB', '#59A6FC', '#55F2FC']
    let placeHolderStyle = {
        normal: {
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                show: false
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0
        }
    }
    for (let i = 0; i < data.length; i++) {
        legendData.push(data[i].name)
        let seriesObj = {
            name: data[i].name,
            type: 'pie',
            clockWise: false,
            radius: [r - 1 - i * 23, r - i * 23],
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    borderWidth: 5,
                    shadowBlur: 50,
                    borderColor: color[i],
                    shadowColor: 'rgba(142,152,241, 0.6)'
                }
            },
            hoverAnimation: false,
            data: [
                {
                    value: data[i].value
                },
                {
                    value: data[0].value * 4 / 3 - data[i].value,
                    name: 'invisible',
                    itemStyle: placeHolderStyle
                }
            ]
        }
        seriesObjs.push(seriesObj)
    }
    let option = {
        backgroundColor: 'transparent',
        tooltip: {
            show: false,
            formatter: '{a} : {c}'
        },
        color: ['#6A5DF8', '#5783F0', '#60A4FB', '#59A6FC', '#55F2FC'],
        legend: {
            show: true,
            orient: 'vertical',
            itemGap: 11,
            icon: 'circle',
            itemWidth: 8,
            itemHeight: 8,
            top: h,
            left: '48%',
            textStyle: {
                color: '#fff'
            },
            data: legendData
        },
        toolbox: {
            show: false
        },
        series: seriesObjs
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
        },
        loadData(data) {
            if (data.length === 0) {
                this.isEmptyStatus = true
            } else {
                this.isEmptyStatus = false
            }
            let op = buildData(data, this.option)
            this.EC.setOption(op)
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
        }
    }
}
</script>
