<template>
    <div :style="chartStyle" ref="line"></div>
</template>

<script>
//    import { buildData } from './lineTrendUtil'
const buildData = (data, props) => {
    let __chartName__ = 'line'
    let { xName, yName, tName } = props
    let seriesObjs = []
    let categories = []
    let arr = []
    let arr1 = []
    let color = ['#3cf887', '#36befc', '#fbd13d', '#5d4037']
    let dataAll = []
    // let startValue;
    // if (data.length > 10) {
    //     startValue = data[data.length - 10].name;
    // } else {
    //     startValue = data[0].name
    // }
    data.forEach(item => {
        arr.push(item.type)
        arr1.push(item.name)
    })
    function del(arr) {
        let res = []
        let json = {}
        for (let i = 0; i < arr.length; i++) {
            if (!json[arr[i]]) {
                res.push(arr[i])
                json[arr[i]] = 1
            }
        }
        return res
    }
    let typeAll = del(arr)
    categories = del(arr1)
    for (let i = 0; i < typeAll.length; i++) {
        let obj = []
        data.forEach(item => {
            if (item.type === typeAll[i]) {
                obj.push(item)
            }
        })
        dataAll.push(obj)
    }
    for (let i = 0; i < dataAll.length; i++) {
        let datas = []
        if (dataAll[i]) {
            dataAll[i].forEach(item => {
                datas.push({
                    name: item.name,
                    value: item.value,
                    dataObj: item
                })
            })
        }
        let seriesObj = {
            type: __chartName__,
            symbol: 'circle', // 标志图形类型
            name: typeAll[i],
            data: datas.map(function(item) {
                return item.value
            }),
            symbolSize: 3, // 标志图形大小
            smooth: !0,
            markPoint: {
                symbol: 'circle',
                symbolSize: 5,
                silent: !0,
                data: [
                    {
                        type: 'max',
                        valueIndex: 1,
                        symbolOffset: [0, '10%']
                    }
                ],
                label: {
                    normal: {
                        show: !1
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 7,
                        borderColor: color[i]
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: color[i]
                }
            },
            lineStyle: {
                normal: {
                    color: color[i]
                }
            }
        }
        seriesObjs.push(seriesObj)
    }
    let option = {
        series: seriesObjs,
        title: {
            show: !0,
            text: tName,
            left: 'left',
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        legend: {
            data: typeAll,
            left: 'right',
            textStyle: {
                color: 'auto',
                fontSize: 14,
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line',
                lineStyle: {
                    opacity: 0.7,
                    color: '#ccc'
                }
            }
        },
        grid: {
            show: false
        },
        xAxis: [
            {
                name: xName,
                type: 'category',
                symbol: 'circle',
                data: categories,
                boundaryGap: !1,
                axisLine: {
                    show: !0,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: !1
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 11
                    }
                },
                splitLine: {
                    show: !0,
                    lineStyle: {
                        color: '#3c414f'
                    }
                }
            }
        ],
        yAxis: [
            {
                name: yName,
                type: 'value',
                axisLine: {
                    show: !0,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: !1
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 11
                    }
                },
                splitLine: {
                    show: !0,
                    lineStyle: {
                        color: '#3c414f'
                    }
                }
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
    name: 'lineComp',
    props: ['option', 'renderData'],
    data() {
        return {
            width: 1000,
            height: 400
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
        },
        loadData(data) {
            let op = buildData(data, this.option.props || {})
            // 设置为true， 清空数据缓存
            this.EC.setOption(op, true)
        },
        resize() {
            this.EC.resize()
        }
    }
}
</script>

<style scoped>
</style>
