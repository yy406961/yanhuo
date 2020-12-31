<template lang="html">
    <div class="mapLight" :style="mainStyle">
        <div id="newHomeMap" ref="map" :style="mainStyle"></div>
    </div>
</template>

<script>
import { NEW_HOME_GISMAP_SYMBOL_PATH } from 'constant/BizServiceConfig'
export default {
    name: 'newHomeMap',
    props: {
        // 数据
        renderData: {
            type: Array,
            default() {
                return []
            }
        },
        // 地图类型
        mapType: {
            type: String,
            default() {
                return 'china'
            }
        },
        // 尺寸
        size: {
            type: Object,
            default() {
                return {}
            }
        },
        // 数据类型
        dataType: {
            type: Number,
            default() {
                return 0
            }
        }
    },
    data() {
        return {
            curMapType: '',
            mainStyle: {
                width: '100%',
                height: 500 + 'px'
            },
            zoomEch: 1.2,
            labelBottom: {
                normal: {
                    show: false,
                    z: 10,
                    color: '#eee'
                },
                emphasis: {
                    show: false,
                    color: '#eee'
                }
            },
            labelTop: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true,
                    color: '#fff'
                }
            },
            itemStyleBottom: {
                normal: {
                    // areaColor: 'transparent',
                    borderColor: '#87D2FF',
                    borderWidth: 3,
                    shadowColor: 'rgba(47, 163, 184, 0.75)',
                    shadowBlur: 40
                },
                emphasis: {
                    borderWidth: 1,
                    areaColor: 'transparent'
                }
            },
            itemStyleTop: {
                normal: {
                    areaColor: 'rgba(0, 197, 255, 0.35)',
                    borderColor: '#122750',
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: 'rgba(0, 197, 255, 0.55)',
                    borderColor: '#122750',
                    borderWidth: 1
                    // shadowColor: 'rgba(47, 163, 184, 0.75)',
                    // shadowBlur: 40
                }
            },
            layoutCenter: ['50%', '50%'],
            layoutSize: '80%'
        }
    },
    created() {
        // 设置默认地图类型、经纬度数据
        this.curMapType = this.mapType
        this.originData = this.renderData
        this.mainStyle.width = this.size.width
        this.mainStyle.height = this.size.height
    },
    mounted() {
        /* eslint-disable no-undef */
        this.EC = echarts.init(this.$refs.map)
        this.EC.on('click', params => {
            this.$emit('areaClick', params)
        })
    },
    watch: {
        renderData(newval) {
            if (newval) {
                this.$nextTick(() => {
                    this.originData = newval
                    this.loadMap()
                })
            }
        },
        mapType(newval) {
            if (newval !== '') {
                this.curMapType = newval
                // this.curCoords = coords[newval]
                this.loadMap()
            }
        },
        dataType(newval) {
            if (newval !== '') {
                // this.dataType = newval
                // this.curCoords = coords[newval]
                this.loadMap()
            }
        },
        size: {
            deep: true,
            handler(newval) {
                if (newval.width && newval.height) {
                    this.mainStyle.width = newval.width
                    this.mainStyle.height = newval.height
                    this.$nextTick(() => {
                        this.resize()
                    })
                }
            }
        }
    },
    methods: {
        loadMap() {
            this.createMap()
            this.renderGeoScatter()
            this.createMap()
            // if (this.originData && this.originData.length) {
            //     this.renderGeoScatter()
            //     this.createMap()
            // }
        },
        getGeoConfig() {
            let geo = [
                // {
                //     map: this.curMapType,
                //     zoom: this.zoomEch,
                //     roam: false,
                //     label: this.labelBottom,
                //     itemStyle: this.itemStyleBottom,
                //     layoutCenter: this.layoutCenter,
                //     layoutSize: this.layoutSize,
                //     silent: true
                // },
                {
                    map: this.curMapType,
                    zoom: this.zoomEch,
                    roam: false,
                    label: this.labelTop,
                    itemStyle: this.itemStyleTop,
                    layoutCenter: this.layoutCenter,
                    layoutSize: this.layoutSize
                    // silent: true
                }
            ]
            return geo
        },

        // 渲染点
        renderGeoScatter() {
            let data = _.cloneDeep(this.originData)
            let index = 0
            if (this.dataType === -1) {
                index = 0
            } else {
                index = this.dataType
            }
            let max = data.length ? data[0].count : 0
            let pointMax = 15
            let pointMin = 2
            let colors = ['rgba(0,255,191,0.6)', 'rgba(229,193,0,0.6)', 'rgba(255,157,107,0.6)',
                'rgba(167,140,255,0.6)', 'rgba(0,197,255,0.6)', 'rgba(215,114,114,0.6)']
            let point = `path://${NEW_HOME_GISMAP_SYMBOL_PATH}`
            let seriesData = []
            data.map(item => {
                if (index === 3 || index === 4 || index === 5) {
                    // pointMax = 30
                    // pointMin = 10
                    pointMax = 20
                    pointMin = 10
                    seriesData.push({
                        value: [item.lon, item.lat, item.count],
                        symbol: point,
                        symbolKeepAspect: true
                    })
                } else {
                    seriesData.push({
                        value: [item.lon, item.lat, item.count]
                    })
                }
            })
            let seriesObjs = [
                {
                    name: 'point',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: seriesData,
                    symbolSize: function (val) {
                        let s = val[2] / max * pointMax
                        s = s > pointMin ? s : pointMin
                        return s
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
                            color: colors[index]
                        }
                    },
                    silent: true
                }
            ]
            this.seriesObj = seriesObjs
        },

        createMap() {
            this.EC = echarts.init(this.$refs.map)
            this.EC.on('click', params => {
                this.$emit('areaClick', params)
            })
            let option = {
                tooltip: {
                    show: false
                },
                geo: this.getGeoConfig(),
                series: this.seriesObj
            }

            if (this.EC) {
                this.EC.clear()
            }
            this.EC.setOption(option)
        },

        resize() {
            this.EC.resize()
        }
    }
}
</script>

<style scoped>
.mapLight {
    width: 100%;
    height: 100%;
}
#newHomeMap {
    width: 100%;
    height: 100%;
}
</style>
