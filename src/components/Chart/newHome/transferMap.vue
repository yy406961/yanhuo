<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
    import coords from 'utils/coord'
    const buildData = (data, props, mini) => {
        let { gridLeft, gridRight, gridTop, gridBottom, mapType } = props
        let curCoords = coords[mapType]

        let linesData = data.map(it => {
            let fromCoord = curCoords[it.source];
            let toCoord = curCoords[it.target];
            if (fromCoord && toCoord) {
                return {
                    fromName: it.source,
                    toName: it.target,
                    coords: [fromCoord, toCoord],
                    value: it.count
                };
            }
        })
        linesData = linesData.filter(item => item)

        // let effectScatterData = data.map(item => {
        //     if (item.count !== 0) {
        //         return {
        //             name: item.source,
        //             value: curCoords[item.source].concat([item.count])
        //         };
        //     }
        // })
        // effectScatterData = effectScatterData.filter(item => item)

        let option = {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            tooltip: {
                show: true,
                position: function (pos, params, dom, rect, size) {
                    // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                    let obj = { top: 0 }
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
                    if (mini) {
                        return obj
                    }
                    return pos
                },
                formatter: function (params) {
                    if (params.seriesType === 'effectScatter') {
                        return params.data.name + ' ' + params.data.value[2] + '人';
                    } else if (params.seriesType === 'lines') {
                        return params.data.fromName + ' - ' + params.data.toName + '<br />' + params.data.value + '人';
                    } else {
                        return params.name;
                    }
                }
            },
            legend: {
                show: false
            },
            geo: {
                map: mapType,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false,
                grid: {
                    right: '0'
                },
                itemStyle: {
                    normal: {
                        areaColor: '#26416B',
                        borderWidth: 0.5,
                        borderColor: '#122750'
                    },
                    emphasis: {
                        areaColor: '#26416B',
                        borderWidth: 0
                    }
                }
            },
            series: [
                {
                    name: 'lines',
                    type: 'lines',
                    zlevel: 2,
                    // symbol: ['none', 'arrow'], // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'线两端的标记类型
                    symbolSize: 5, // 箭头大小
                    lineStyle: {
                        normal: {
                            color: '#00FFBF',
                            width: 0.3,
                            opacity: 0.4,
                            curveness: 0.3
                        }
                    },
                    effect: {
                        show: true, // 是否显示特效
                        period: 4,  // 特效动画的时间，单位为 s
                        symbol: 'pin', // 特效图形的类型
                        // constantSpeed: 100, // 固定速度，大于0的值后会忽略 period 配置项
                        symbolSize: 5,
                        color: '#00FFBF',
                        shadowBlur: 4
                    },
                    data: linesData
                }
                // {
                //     name: 'lines',
                //     type: 'lines',
                //     zlevel: 2,
                //     symbolSize: 1,
                //     left: '300px',
                //     effect: {
                //         show: false,
                //         period: 6,
                //         trailLength: 0.5,
                //         color: '#00FFBF',
                //         shadowBlur: 10,
                //         symbolSize: 1
                //     },
                //     lineStyle: {
                //         normal: {
                //             color: '#ddd',
                //             width: 0.8,
                //             opacity: 0.2,
                //             curveness: 0.4
                //         }
                //     },
                //     data: linesData
                // },
                // {
                //     name: 'point',
                //     type: 'effectScatter',
                //     coordinateSystem: 'geo',
                //     zlevel: 2,
                //     rippleEffect: { // 涟漪特效相关配置
                //         period: '4', // 动画的时间
                //         scale: '5', // 动画中波纹的最大缩放比例
                //         brushType: 'stroke'
                //     },
                //     label: {
                //         normal: {
                //             show: false,
                //             position: 'right',
                //             formatter: '{b}'
                //         }
                //     },
                //     symbolSize: 3,
                //     itemStyle: {
                //         normal: {
                //             color: '#00FFBF'
                //         }
                //     },
                //     data: effectScatterData
                // }
            ],
            grid: {
                x: gridLeft || 0,
                y: gridTop || 0,
                x2: gridRight || 0,
                y2: gridBottom || 0
            }
        }
        option.textStyle = {
            fontFamily: 'Microsoft YaHei',
            fontSize: '12'
        }
        return option
    }
    export default {
        name: 'transferMap',
        data () {
            return {
                width: 100,
                height: 100

            }
        },
        props: [
            'option',
            'renderData',
            'mini'
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
            // this.loadData(this.renderData)
        },
        beforeDestroy() {
            this.EC && this.EC.dispose()
        },
        methods: {
            initChart () {
                this.EC = echarts.init(this.$el)
                this.EC.on('click', (params) => {
                    this.$emit('areaClick', params)
                })
            },
            loadData (data) {
                let op = buildData(data || [], this.option.props, this.mini || false);
                if (this.EC) {
                    this.EC.clear()
                }
                this.EC.setOption(op)
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
            }
        }
    }
</script>

<style>
</style>
