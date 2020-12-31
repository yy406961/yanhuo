<template lang="html">
    <div class="heatContent" :style="mainStyle">
         <div id="map2d" ref="map" :style="mainStyle"></div>
    </div>
</template>

<script>
import coords from 'utils/coord'
import { mapGetters } from 'vuex'
export default {
    name: 'map2d',
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
        max: {
            type: Number
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
            originData: [],
            mainStyle: {
                width: '100%',
                height: 500 + 'px'
            }
        }
    },
    created() {
        // 设置默认地图类型、经纬度数据
        this.curMapType = this.mapType
        this.curCoords = coords[this.curMapType]
        this.mainStyle.width = this.size.width
        this.mainStyle.height = this.size.height
    },
    mounted() {
        this.EC = echarts.init(this.$refs.map)
        this.EC.on('click', params => {
            this.$emit('heatAreaClick', params)
        })
    },
    computed: {
        ...mapGetters({
            globalKeys: 'global/globalKeys'
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
                this.curCoords = coords[newval]
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
            this.renderHeatMap()
            this.createMap()
        },

        // 渲染海量热点图
        renderHeatMap() {
            let data = _.cloneDeep(this.originData)
            // 按3份创建多组series对象
            let seriesObjs = data.map(it => {
                return [it.lon, it.lat, it.count]
            })
            this.seriesObj = [
                {
                    type: 'heatmap',
                    z: 0,
                    coordinateSystem: 'geo',
                    pointSize: this.globalKeys.gheatMapPointSize || 3,
                    blurSize: 1,
                    data: seriesObjs
                }
            ]
        },

        //            getPointSizeByMapType () {
        //                let point = 3
        //                if (this.curMapType === 'qinghai') {
        //                    point = 2
        //                }
        //                return point
        //            },
        resize() {
            this.EC.resize()
        },

        createMap() {
            let vMax = this.max.toString()
            var rMax = vMax[0] - 0 + 1
            for (var i = 0; i < vMax.length - 1; i++) {
                rMax += '0'
            }
            let option = {
                backgroundColor: 'transparent',
                tooltip: {},
                geo: {
                    map: this.curMapType,
                    // silent: true,
                    label: {
                        normal: {
                            show: true,
                            z: 10,
                            color: '#eee'
                        },
                        emphasis: {
                            show: true,
                            color: '#eee'
                        }
                    },
                    zoom: 1.2,
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#0072a6',
                            borderWidth: 0.3,
                            borderColor: 'rgba(0,0,0,.5)'
                        },
                        emphasis: {
                            areaColor: 'rgba(0, 114, 166, .6)'
                            // areaColor: 'rgba(48, 171, 228, .6)'
                        }
                    },
                    // left: '32%',
                    layoutCenter: ['54%', '60%'],
                    layoutSize: this.mapType === 'qinghai' ? '76%' : '60%'
                },
                visualMap: {
                    type: 'piecewise',
                    show: true,
                    left: '8%',
                    bottom: '10%',
                    min: 0,
                    max: Number(rMax) < 10 ? 10 : Number(rMax),
                    // max: this.max || 3000,
                    // splitNumber: 2,
                    seriesIndex: 0,
                    calculable: true,
                    textStyle: {
                        color: '#eee'
                    },
                    inRange: {
                        color: ['#3cf887', '#eac736', '#d94e5d']
                    }
                },
                series: this.seriesObj
            }
            // this.max 为 1 是后端写死的数字 1，为 1 时代表加载的热力图为境外热力图，由于境外人口较少，所以特殊配置图例
            if (this.max < 6) {
                option.visualMap.pieces = [
                    // {
                    //     min: 0, max: 0
                    // },
                    {
                        min: 0,
                        max: 2
                    },
                    {
                        min: 2,
                        max: 6
                    },
                    {
                        min: 6,
                        max: 8,
                        label: '6 - 10'
                    },
                    {
                        min: 8,
                        max: 10,
                        label: '>= 10'
                    }
                ]
            } else {
                let itemMax = rMax / 4
                option.visualMap.pieces = [
                    // {
                    //     min: 0, max: 1
                    // },
                    {
                        min: 0,
                        max: itemMax
                    },
                    {
                        min: itemMax,
                        max: itemMax * 2
                    },
                    {
                        min: itemMax * 2,
                        max: itemMax * 3,
                        label: itemMax * 2 + ' - ' + itemMax * 4
                    },
                    {
                        min: itemMax * 3,
                        label: '>= ' + itemMax * 4
                    }
                ]
            }
            if (this.EC) {
                this.EC.clear()
            }
            this.EC.setOption(option)
        }
    }
}
</script>

<style scoped>
/*.heatContent {*/
/*width: 100%;*/
/*height: 100%;*/
/*}*/

/*#map2d {*/
/*width: 100%;*/
/*height: 100%;*/
/*}*/
</style>
