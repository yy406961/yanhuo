<template>
    <div :style="chartStyle">
        <div :style="chartStyle" v-show="chartView"></div>
        <div class='emptydata' v-show="isEmptyStatus" :style="chartStyle">
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
const buildData = (scaleData, opt) => {
    // let total = 0
    // for (let i = 0; i < scaleData.length; i++) {
    //     total += scaleData[i].value
    // }
    let rich = {
        white: {
            color: '#ddd',
            align: 'center',
            padding: [5, 0]
        }
    }
    //        let seriesObjs = [];
    //        let r = opt.width / 2 - 20;
    //        let color = ['#8F99F0', '#5FC5F5', '#6DE0CF'];
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
    let data = []
    for (let i = 0; i < scaleData.length; i++) {
        if (i === scaleData.length - 1) {
            data.push(
                {
                    value: scaleData[i].value,
                    name: scaleData[i].name,
                    itemStyle: {
                        borderColor: {
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
                        },
                        borderWidth: 5,
                        shadowBlur: 30,
                        shadowColor: 'rgba(142, 152, 241, 0.6)'
                    }
                },
                {
                    value: 4,
                    name: '',
                    itemStyle: placeHolderStyle
                }
            )
        } else {
            data.push(
                {
                    value: scaleData[i].value,
                    name: scaleData[i].name,
                    itemStyle: {
                        borderColor: {
                            type: 'linear',
                            x: 0,
                            y: 1,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#515E71' // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#4F5E71' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        },
                        borderWidth: 5,
                        shadowBlur: 30,
                        shadowColor: 'rgba(0, 0, 0, 0)'
                    }
                },
                {
                    value: 4,
                    name: '',
                    itemStyle: placeHolderStyle
                }
            )
        }
    }
    let seriesObj = [
        {
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [opt.height / 3.5 - 5, opt.height / 3.5],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#ddd',
                        formatter: function(params) {
                            var percent = 0
                            var total = 0
                            for (var i = 0; i < scaleData.length; i++) {
                                total += scaleData[i].value
                            }
                            percent = (params.value / total * 100).toFixed(0)
                            if (params.name !== '') {
                                return params.name + '\n{white|' + '占比' + percent + '%}'
                            } else {
                                return ''
                            }
                        },
                        rich: rich
                    }
                }
            },
            labelLine: {
                show: false
            },
            data: data
        },
        {
            name: '白',
            type: 'pie',
            clockWise: false,
            radius: [opt.height / 5.5 - 1, opt.height / 5.5],
            hoverAnimation: false,
            label: {
                show: false
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                color: 'rgba(255,255,255,.5)',
                borderWidth: 0.5
            },
            data: [
                {
                    value: 1
                }
            ]
        }
    ]
    let option = {
        backgroundColor: 'transparent',
        tooltip: {
            show: false,
            formatter: '{a} : {c}'
        },
        legend: {
            show: false
        },
        toolbox: {
            show: false
        },
        series: seriesObj
    }
    return option
}
export default {
    name: 'is-pieChart',
    props: ['option', 'renderData'],
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
        },
        chartView() {
            return !this.isEmptyStatus
        }
    },
    watch: {
        'renderData'(newVal) {
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
