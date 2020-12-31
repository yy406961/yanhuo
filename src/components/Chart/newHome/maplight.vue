<template lang="html">
    <div class="mapLight" :style="mainStyle">
        <div id="newHomeMap" ref="map" :style="mainStyle"></div>
    </div>
</template>

<script>
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
                    areaColor: 'rgba(30,47,107,1)',
                    borderColor: '#508aa0'
                },
                emphasis: {
                    // areaColor: 'rgba(30,47,107,1)',
                    areaColor: 'rgba(30,47,130,1)',
                    borderColor: '#508aa0'
                    // borderWidth: 3,
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
        // mapType(newval) {
        //     if (newval) {
        //         this.curMapType = newval
        //         if (newval === 'qinghai') {
        //             this.layoutCenter = ['50%', '55%']
        //             this.layoutSize = '100%'
        //         }
        //     }
        // },
        mapType(newval) {
            if (newval !== '') {
                if (newval === 'qinghai') {
                    this.layoutCenter = ['50%', '55%']
                    this.layoutSize = '100%'
                }
                this.curMapType = newval
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
            if (this.originData && this.originData.length) {
                this.renderGeoScatter()
                this.createMap()
            }
        },

        getGeoConfig() {
            let geo = [
                {
                    map: this.curMapType,
                    zoom: this.zoomEch,
                    roam: false,
                    label: this.labelBottom,
                    itemStyle: this.itemStyleBottom,
                    layoutCenter: this.layoutCenter,
                    layoutSize: this.layoutSize,
                    silent: true
                },
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

        // 渲染海量热点图
        renderGeoScatter() {
            // 分类控制
            // const scatterCategory = [
            //     {
            //         color: 'rgba(37, 140, 249, 1)',
            //         name: '弱',
            //         size: 2
            //     },
            //     {
            //         color: 'rgba(14, 241, 242, 1)',
            //         name: '中',
            //         size: 2
            //     },
            //     {
            //         color: 'rgba(255, 255, 255, 1)',
            //         name: '强',
            //         size: 3
            //     }
            // ]
            // const scatterCategory = [
            //     {
            //         color: 'rgba(20，96，151, 1)',
            //         name: '弱',
            //         size: 2
            //     },
            //     {
            //         color: 'rgba(12，145，195, 1)',
            //         name: '中',
            //         size: 2
            //     },
            //     {
            //         color: 'rgba(0，212，255, 1)',
            //         name: '强',
            //         size: 3
            //     }
            // ]
            const scatterCategory = [
                {
                    color: 'rgba(211,201,90,0.8)',
                    name: '弱',
                    size: 1
                },
                {
                    color: 'rgba(236, 172, 89, 0.8)',
                    name: '中',
                    size: 2
                },
                {
                    color: '#f4e925',
                    name: '强',
                    size: 3
                }
            ]
            let data = _.cloneDeep(this.originData)
                // 数据按rank分组
            let ds = _.groupBy(data, it => {
                return it.rank
            })

                // 按3份创建多组series对象
            let seriesObjs = scatterCategory.map(({ name, size, color }, i) => {
                let index = i + 1
                let curArr = ds[index]
                let data = curArr.map(it => {
                    return [Number(it.lon), Number(it.lat), 0, it.count]
                })
                return {
                    name,
                    type: 'scatterGL',
                    coordinateSystem: 'geo',
                    symbolSize: size,
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: color,
                        color
                    },
                    progressive: 1e6,
                    blendMode: 'light',
                    data
                }
            })
            this.seriesObj = seriesObjs
        },

        createMap() {
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
