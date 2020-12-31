<template>
    <div :style="chartStyle" ref="stacked"></div>
</template>

<script>
    import coords from 'utils/coord'
    const buildData = (data, props, mini) => {
        let { gridLeft, gridRight, gridTop, gridBottom, mapType } = props
        let curCoords = coords['world']
        let seriesData = data.map(it => {
            let sourceArr = curCoords[it.area || it.source] || []
            if (it.count !== 0) {
                return {
                    name: it.area || it.source,
                    value: [sourceArr[0], sourceArr[1], it.count]
                }
            }
        })
        seriesData = seriesData.filter(item => item)
        let max = seriesData.length ? seriesData[0].value[2] : 0
        let itemStyle = {
            normal: {
                areaColor: '#162849',
                borderWidth: 2,
                borderColor: '#3A6386',
                shadowColor: 'rgba(0, 0, 0, 0.7)',
                shadowBlur: 10
            }
        }
        let miniItemStyle = {
            normal: {
                areaColor: '#162849',
                borderWidth: 0
            }
        }
        let option = {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            tooltip: {
                show: true,
                formatter: function (params) {
                    if (params.seriesType !== 'map') {
                        let res = `${params.name}：${params.value[2]}人`
                        if (params.data.time) {
                            res += `</br>时间：${params.data.time}`
                        }
                        return ` <div style="font-size: 12px;margin:0 5px">${res}</div>`
                    }
                }
            },
            legend: {
                show: false
            },
            geo: {
                map: mapType,
                zoom: 1.2,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false,
                aspectScale: 0.9, // 长宽比
                center: [16.740534, 0.81514], // 非洲的中心点
                itemStyle: mini ? miniItemStyle : itemStyle
            },
            series: [
                {
                    name: 'point',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: seriesData,
                    // symbolSize: mini ? 3 : 10,
                    symbolSize: function (val) {
                        let s = val[2] / max * 30
                        s = s > 6 ? s : 6
                        return mini ? 3 : s
                    },
                    roam: false,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,255,191,0.8)'
                        }
                    }
                },
                {
                    type: 'map',
                    map: mapType,
                    zoom: 1.2,
                    center: [16.740534, 0.81514], // 非洲的中心点
                    geoIndex: 1,
                    aspectScale: 0.9, // 长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    roam: false,
                    itemStyle: {
                        normal: {
                            areaColor: '#1E375F',
                            // borderColor: '#3B5077',
                            // borderWidth: mini ? 0.1 : 1
                            borderColor: mini ? 'rgba(59,80,119,0.2)' : 'rgba(59,80,119,1)',
                            borderWidth: 1
                        },
                        emphasis: {
                            areaColor: '#162849' // 地图区域划过时的颜色
                        }
                    }
                }
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
        name: 'pointMap',
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
            'renderData' (newVal) {
                if (newVal && newVal.length) {
                    this.loadData(newVal)
                }
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
                let op = buildData(data || [], this.option.props, this.mini || false);
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
