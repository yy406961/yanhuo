<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
let activateBar
const buildData = data => {
    let titleName = [];
    let valdata = [];
    let backData = [];
    if (data) {
        data.forEach(item => {
            titleName.push(item.name);
            valdata.push(item.ordernum);
            backData.push({ name: item.name, value: data[0].value });
        });
    }
    let seriesObj = [
        {
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: backData,
            barWidth: 10,
            barCategoryGap: 10,
            z: 1,
            itemStyle: {
                normal: {
                    color: 'rgba(60,181,255,0.18)',
                    borderWidth: 1,
                    barBorderRadius: 15
                }
            }
        },
        {
            type: 'bar',
            yAxisIndex: 0,
            data: data,
            barWidth: 10,
            barCategoryGap: 10,
            itemStyle: {
                normal: {
                    color: function (params) {
                        let key = params.dataIndex
                        if (key === activateBar) {
                            return '#00FFBF';
                        } else {
                            return '#3CB5FF'
                        }
                    },
                    barBorderRadius: 15
                }
            },
            z: 3,
            zlevel: 3
        }
    ]
    let option = {
        grid: {
            top: '2',
            left: '60',
            right: '10',
            bottom: '2'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(param) {
                // param.seriesIndex 0 底下那层 1上面那层
                if (param.seriesIndex) {
                    let { name, value } = param.data
                    let str = name + '<br />' + value + '人'
                    return str
                }
                return ''
            },
            textStyle: {
                fontSize: 12
            }
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#A2EEFF'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#344755',
                    width: 2
                }
            },
            axisTick: {
                show: false
            },
            splitLine: false
            // boundaryGap: ['0%', '1%']
        },
        yAxis: [
            {
                show: true,
                inverse: true,
                data: titleName,
                // interval: 0,
                axisLabel: {
                    interval: 0,
                    margin: 60,
                    align: 'left',
                    formatter: function(value) {
                        let str = value.length > 3 ? value.substring(0, 3) + '...' : value
                        return str
                    },
                    textStyle: {
                        color: '#A2EEFF',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 12
                    }
                },
                position: 'left',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#344755',
                        width: 2
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
                data: valdata,
                nameLocation: 'start',
                nameTextStyle: {
                    fontWeight: 'bold'
                },
                position: 'right',
                offset: 5,
                inverse: true,
                axisLine: {
                    onZero: false,
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            }
        ],
        series: seriesObj
    };
    return option
}
export default {
    name: 'barCharts',
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
        },
        loadData (data) {
            if (data && data.length) {
                let op = buildData(data || [], this.option.props);
                this.EC.setOption(op)
                let me = this;
                this.EC.off('click')
                this.EC.on('click', function (params) {
                    activateBar = params.dataIndex
                    this.resize()
                    activateBar = null

                    if (params.componentType === 'series' && params.seriesIndex) {
                        me.$emit('BarClick', params.data)
                    }
                })
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
