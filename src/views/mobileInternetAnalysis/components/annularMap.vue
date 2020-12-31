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
    // let p = 0 // 图例的偏移位置
    // p = x + opt.height / 2
    x = opt.width / 2 - (opt.height + 150) / 2 + opt.height * 0.9 / 2 + 24
    let color = ['rgba(255,103,103,1)', 'rgba(255,157,107,1)', 'rgba(211,201,90,1)', 'rgba(85,202,105,1)', 'rgba(22,216,184,1)',
        'rgba(103,204,255,1)', 'rgba(62,120,255,1)', 'rgba(142,103,255,1)', 'rgba(176,70,219,1)', 'rgba(248,79,159,1)']
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
            // center: ['50%', '40%'],
            // radius: ['55%', '70%'],
            radius: ['40%', '55%'],
            avoidLabelOverlap: false,
            // hoverAnimation: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    formatter: function(param) {
                        let name = param.name.length > 8 ? param.name.substring(0, 6) + '...' : param.name
                        return name + '\n' + '{big|' + param.percent.toFixed(0) + '%}';
                    },
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold'
                    },
                    rich: {
                        big: {
                            fontSize: 18
                        }
                    }
                }
            },
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
            type: 'scroll',
            orient: 'vertical',
            itemGap: 13,
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            right: 10,
            top: 20,
            bottom: 20,
            formatter: function (name) {
                return echarts.format.truncateText(name, 60, '12px Microsoft Yahei', '…');
            },
            tooltip: {
                show: true
            },
            textStyle: {
                fontSize: 12,
                color: 'rgba(162,238,255,1)'
            },
            data: legendData
        },
        // legend: {
        //     x: 'center',
        //     top: '80%',
        //     icon: 'circle',
        //     itemWidth: 12,
        //     itemHeight: 12,
        //     data: legendData,
        //     textStyle: {
        //         color: 'rgba(162,238,255,1)'
        //     }
        // },
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
