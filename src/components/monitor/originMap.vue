<template lang="html">
    <div class="originContent" :style="mainStyle">
         <div id="map3d" ref="map" :style="mainStyle"></div>
    </div>
</template>

<script>
import coords from 'utils/coord'
export default {
    name: 'map3d',
    props: {
        // 数据
        renderData: {
            type: Array,
            default () {
                return []
            }
        },
        // 渲染方式 1 为 来源, 2为热点图
        renderType: {
            type: String,
            default () {
                return '1'
            }
        },
        // 地图类型
        mapType: {
            type: String,
            default () {
                return 'china'
            }
        },
        // 尺寸
        size: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            curMapType: '',
            mainStyle: {
                width: '100%',
                height: 500 + 'px'
            }
        }
    },
    created () {
        // 设置默认地图类型、经纬度数据
        this.curMapType = this.mapType
        this.curCoords = coords[this.curMapType]
        this.mainStyle.width = this.size.width;
        this.mainStyle.height = this.size.height;
    },
    mounted () {
        this.EC = echarts.init(this.$refs.map)
        this.EC.on('click', (params) => {
            this.$emit('areaClick', params)
        })
    },
    watch: {
        renderData (newval) {
            if (newval) {
                this.$nextTick(() => {
                    this.originData = newval
                    this.loadMap()
                })
            }
        },
        mapType (newval) {
            if (newval !== '') {
                this.curMapType = newval
                this.curCoords = coords[newval]
                this.loadMap()
            }
        },
        size: {
            deep: true,
            handler (newval) {
                if (newval.width && newval.height) {
                    this.mainStyle.width = newval.width;
                    this.mainStyle.height = newval.height;
                    this.$nextTick(() => {
                        this.resize()
                    })
                }
            }
        }
    },
    methods: {

        loadMap () {
            if (this.renderType === '1') {
                this.renderGeoBars()
            } else if (this.renderType === '2') {
                this.renderGeoScatter()
            }
            this.createMap()
        },

        // 渲染海量热点图
        renderGeoScatter () {
            // 分类控制
            const scatterCategory = [
                {
                    color: '#fbd13d',
                    name: '弱',
                    size: 1
                },
                {
                    color: 'rgba(14, 241, 242, 0.8)',
                    name: '中',
                    size: 1
                },
                {
                    color: 'rgba(255, 255, 255, 0.8)',
                    name: '强',
                    size: 1
                }];
            let data = _.cloneDeep(this.originData)
            // 数据按rank分组
            let ds = _.groupBy(data, it => {
                return it.rank
            });

            // 按3份创建多组series对象
            let seriesObjs = scatterCategory.map(({ name, size, color }, i) => {
                let index = i + 1;
                let curArr = ds[index];
                let data = curArr.map(it => {
                    return [it.lon, it.lat, 0, it.count]
                })
                return {
                    name,
                    type: 'scatter3D',
                    coordinateSystem: 'geo3D',
                    symbolSize: size,
                    itemStyle: {
                        shadowBlur: 2,
                        shadowColor: color,
                        color
                    },
                    data
                }
            })
            this.seriesObj = seriesObjs
        },

        // 渲染飞线图
        renderGeoLines () {
            let data = _.cloneDeep(this.originData)
            let lineData = data.map(it => {
                let sourceArr = this.curCoords[it.source] || []
                let targetArr = this.curCoords[it.target] || []
                return {
                    coords: [[sourceArr[0], sourceArr[1]], [targetArr[0], targetArr[1]]],
                    value: it.num
                }
            })
            this.seriesObj = this.get3DLinesSeries(lineData)
        },

        // 渲染3D柱图
        renderGeoBars () {
            let data = _.cloneDeep(this.originData)
            if (data.length) {
                this.maxCount = _.maxBy(data, function (it) {
                    return it.count
                }).count
            }
            let barData = data.map(it => {
                let sourceArr = this.curCoords[it.source] || []
                return {
                    name: it.source,
                    value: [sourceArr[0], sourceArr[1], it.count]
                }
            })
            this.seriesObj = this.get3DBarsSeries(barData)
        },

        get3DBarsSeries (data) {
            let series = {
                type: 'bar3D',
                coordinateSystem: 'geo3D',
                shading: 'lambert',
                barSize: 0.3,
                minHeight: 0.2,
                emphasis: {
                    label: {
                        show: false
                    }
                },
                silent: false
            }
            if (data) {
                series.data = data
            }
            return [series]
        },

        get3DLinesSeries (data) {
            let series = {
                type: 'lines3D',
                coordinateSystem: 'geo3D',
                effect: {
                    show: true,
                    trailWidth: 2,
                    trailOpacity: 0.7,
                    trailLength: 0.5
                },
                blendMode: 'lighter',
                lineStyle: {
                    width: 1,
                    color: 'red',
                    opacity: 0.25
                }
            }
            if (data) {
                series.data = data
            }
            return [series]
        },
        createMap () {
            let viewControl = {
                distance: 60,
                alpha: 25,
                beta: 10,
                center: [10, 0, 5],
                maxAlpha: 60,
                minAlpha: 20,
                minBeta: -20,
                maxBeta: 40,
                minDistance: 5
            }
            if (this.renderType === '2') {
                viewControl.distance = 70;
                viewControl.alpha = 40;
            }
            if (this.mapType === 'ningxia') {
                viewControl.distance = 150;
                viewControl.alpha = 45;
                viewControl.center = [0, -35, 6]
            }
            if (this.mapType === 'china') {
                viewControl.distance = 75;
                viewControl.alpha = 40;
                viewControl.center = [10, -10, 0]
            }
            if (this.mapType === 'world') {
                viewControl.distance = 63;
                viewControl.alpha = 45;
                viewControl.center = [12, -5, 0]
            }

            let option = {
                backgroundColor: 'transparent',
                tooltip: {
                    show: true,
                    formatter: (params) => {
                        return `${params.name}：${params.value[2]} 人`
                    }
                },
                geo3D: {
                    map: this.curMapType || 'china',
                    shading: 'lambert',
                    light: {
                        main: {
                            color: '#fff',
                            intensity: this.mapType === 'world' ? 1.5 : 1,
                            shadow: true,
                            shadowQuality: 'high',
                            alpha: this.mapType === 'world' ? 35 : 63
                        },
                        ambient: {
                            intensity: 0.1
                        }
                    },
                    regionHeight: 0.2,
                    'itemStyle': {
                        shadowBlur: 20,
                        shadowColor: 'rgba(255, 255, 255,0.8)',
                        areaColor: '#0072a6',
                        borderWidth: 0.3,
                        borderColor: 'rgba(0,0,0,.5)'
                    },
                    'emphasis': {
                        label: {
                            show: false
                        },
                        itemStyle: {
                            color: '#0072a6'
                        }
                    },
//                    viewControl,
                    viewControl: {
                        minDistance: 60
                    },
                    groundPlane: {
                        show: false,
                        color: 'transparent'
                    }
//                    left: '8%'
                },
                series: this.seriesObj
            }

            if (this.renderType === '1') {
                option.visualMap = {
                    show: false,
                    calculable: false,
                    realtime: false,
                    inRange: {
//                        color: ['#28F816', '#eac736', '#d9415d']
                        color: 'orangered'
//                        color: ['orangered', '#EADC1B', '#EADC1B', '#28F816', '#28F816']
                    },
                    outOfRange: {
                        colorAlpha: 0
                    },
                    min: 1,
                    max: this.maxCount || 3000
                }
            }
            if (this.EC) {
                this.EC.clear()
            }
            // console.log(option)
            this.EC.setOption(option)
        },

        resize () {
            this.EC.resize()
        }
    }
}
</script>

<style scoped>
    .originContent {
        width: 100%;
        height: 100%;
    }
    #map3d{
        width: 100%;
        height: 100%;
    }
</style>
