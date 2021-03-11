<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
const buildData = data => {
    let option = {
        color: ['#FEFB00'],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        tooltip: {
            show: true,
            formatter: function(params) {
                return `<div>
                    <span>${params.name}</span>:
                    <span style="color: #0CE3F0">${params.value}</span>
                    </div>`
            }
        },
        legend: {
            show: false
        },
        geo: [
            {
                map: 'changshaDetail',
                aspectScale: 0.75, // 长宽比
                zoom: 1.1,
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: '#09132c' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#274d68'  // 100% 处的颜色
                            }],
                            globalCoord: true // 缺省为 false
                        },
                        shadowColor: '#3184D5',
                        shadowOffsetX: 10,
                        shadowOffsetY: 11
                        // shadowBlur: 40
                    },
                    emphasis: {
                        areaColor: '#2AB8FF',
                        borderWidth: 0,
                        color: 'green',
                        label: {
                            show: false
                        }
                    }
                }
            },
            {
                map: 'changshaDetail',
                aspectScale: 0.75, // 长宽比
                zoom: 1.1,
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: '#09132c' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#274d68'  // 100% 处的颜色
                            }],
                            globalCoord: true // 缺省为 false
                        },
                        shadowColor: '#90DDDC',
                        shadowOffsetX: 10,
                        shadowOffsetY: 11,
                        shadowBlur: 20
                    },
                    emphasis: {
                        areaColor: '#2AB8FF',
                        borderWidth: 0,
                        color: 'green',
                        label: {
                            show: false
                        }
                    }
                }
            }
        ],
        visualMap: [{
            min: 0,
            max: 100000,
            show: false,
            realtime: false,
            calculable: false,
            seriesIndex: [0],
            inRange: {
                color: ['#44CEF6', '#35E8E2', '#5FCA5A', '#2187FF', '#177CB0', '#10AAB4', '#2C5392']
            }
        }],
        series: [
            {
                type: 'map',
                roam: false,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        },
                        formatter: function(params) {
                            return params.name + ' ' + params.value
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#1FF3F5'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#247ED4',
                        borderWidth: 0
                    },
                    emphasis: {
                        areaColor: '#054494',
                        borderWidth: 0.1
                    }
                },
                zoom: 1.1,
                map: 'changshaDetail',
                data: data
            }
        ]
    }
    option.textStyle = {
        fontFamily: 'Microsoft YaHei',
        fontSize: '12'
    }
    return option
}
export default {
    name: 'mapCharts',
    data () {
        return {
            width: 100,
            height: 100
        }
    },
    props: [
        'option',
        'renderData'
    ],
    computed: {
        chartStyle () {
            return {
                width: this.width,
                height: this.height
            }
        }
    },
    watch: {
        'renderData' (newVal) {
            this.loadData(newVal)
        },
        'option': {
            deep: true,
            handler (newval) {
                if (newval.width && newval.height) {
                    this.width = newval.width;
                    this.height = newval.height;
                    this.$nextTick(() => {
                        this.resize()
                    })
                }
            }
        }
    },
    created () {
        this.width = this.option.width
        this.height = this.option.height
    },
    mounted () {
        this.initChart()
        this.loadData(this.renderData)
    },
    methods: {
        initChart () {
            this.EC = echarts.init(this.$el)
            this.EC.on('click', (params) => {
                this.$emit('areaClick', params)
            })
        },
        loadData (data) {
            if (data && data.length) {
                let op = buildData(data || [], this.option.props);
                this.EC.setOption(op)
            }
        },
        resize () {
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

<style scoped>
</style>
