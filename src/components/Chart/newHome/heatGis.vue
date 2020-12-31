<template>
    <div id="map"></div>
</template>

<script>
    import BMap from 'BMap'
    import BMapLib from 'BMapLib'
    import { isPoint, getBoundary } from 'utils/index.js'
    import { mapGetters } from 'vuex'
    const RED = './static/vendor/newGis/baidumapv2/images/red.png'
    const BLUE = './static/vendor/newGis/baidumapv2/images/blue.png'
    // const DEEPBLUE = './static/vendor/newGis/baidumapv2/images/deepblue.png'
    // const GREEN = './static/vendor/newGis/baidumapv2/images/green.png'
    const BROWN = './static/vendor/newGis/baidumapv2/images/brown.png'

    export default {
        data () {
            return {
                map: null,
                zoom: 10,
                center: [],
                color: ['rgb(0, 4, 253)', 'rgb(255, 0, 0)', 'rgb(0, 158, 215)', 'rgb(59, 0, 0)', 'rgb(30, 101, 19)'],
                icon: [BLUE, RED, BROWN],
                // 存放每个点的信息
                // hotRadius: 25,
                heatmapOverlay: '',
                heatIndex: [5, 6, 9],
                size: [
                    { lev1: 35, lev2: 40 },
                    { lev1: 30, lev2: 35 },
                    { lev1: 25, lev2: 30 },
                    { lev1: 20, lev2: 25 },
                    { lev1: 15, lev2: 20 }
                ]
            }
        },
        props: ['renderData', 'dataType', 'type'],
        mounted () {
            this.createMap()
        },
        computed: {
            ...mapGetters({
                'isPhoneJM': 'global/isPhoneJM',
                'gMapMaxZoom': 'global/gMapMaxZoom',
                'globalKeys': 'global/globalKeys'
            }),
            // 计算热力点动态半径
            hotRadius () {
                let radius = 30;
                let zoom = this.map.getZoom();  // 4 - 19
                switch (zoom) {
                    case 19:
                    case 18:
                        radius = 40;
                        break;
                        // radius = 30;
                        // break;
                    case 17:
                        radius = 30;
                        break;
                    case 16:
                        radius = 22;
                        break;
                    case 15:
                        radius = 16;
                        break;
                    // case 14:
                    //     radius = 12;
                    //     break;
                    case 14:
                    case 13:
                    case 12:
                        radius = 8;
                        break;
                    default:
                        radius = 4;
                        break;
                }
                return radius
            }
        },
        watch: {
            renderData (newVal) {
                this.map.clearOverlays()
                if (!this.heatIndex.includes(this.type)) {
                    this.renderGPSheat(newVal)
                } else {
                    this.creatPoint(newVal)
                }
            }
        },
        methods: {
            // 画地图
            createMap () {
                let { gMapCenter } = this.globalKeys
                let map = new BMap.Map('map', { minZoom: 6, maxZoom: this.gMapMaxZoom })
                this.map = map
                let point = new BMap.Point(gMapCenter[0], gMapCenter[1])
                getBoundary(map)
                let topRightNavigation = new BMap.NavigationControl({
                    anchor: 0,  // 控件位置，左 0，右 1
                    type: 1 // 控件类型
                });
                this.map.addControl(topRightNavigation)
                map.centerAndZoom(point, this.zoom)
                map.enableScrollWheelZoom();
            },
            creatPoint(data) {
                // let IconUrl = 'path://M293.9,377.8c-1.9,0-3.4,1.6-3.4,3.6c0,2,1.5,3.6,3.4,3.6c1.9,0,3.4-1.6,3.4-3.6\n' +
                //     '\t\t\tC297.3,379.5,295.8,377.8,293.9,377.8z M290.3,396.9v10h2.5l1-6.3l1,6.3h2.7v-10c1.1-0.5,1.8-1.6,1.8-2.9v-5.1\n' +
                //     '\t\t\tc0-1.8-1.5-3.3-3.3-3.3h-4.1c-1.8,0-3.3,1.5-3.3,3.3v5.1C288.5,395.3,289.2,396.4,290.3,396.9z M293.9,420.9\n' +
                //     '\t\t\tc0,0-19.4-18.3-19.4-29.1c0-10.8,6.5-20.5,19.4-20.5c12.9,0,19.4,9.7,19.4,20.5C313.3,402.6,293.9,420.9,293.9,420.9z'
                if (data && data.length) {
                    let iconCur = this.icon[0]
                    this.heatIndex.forEach((it, index) => {
                        if (this.type === it) {
                            iconCur = this.icon[index]
                        }
                    })
                    data.forEach((item, index) => {
                        let curSize = {}
                        if (index < this.size.length - 1) {
                            curSize = this.size[index]
                        } else {
                            curSize = this.size[this.size.length - 1]
                        }
                        let { lat, lon, lng } = item
                        if (!lng) {
                            lng = lon
                        }
                        if (isPoint(lng, lat)) {
                            let point = new BMap.Point(lng, lat);
                            let myIcon = new BMap.Icon(iconCur,
                                new BMap.Size(curSize.lev1, curSize.lev2),
                                { imageSize: new BMap.Size(curSize.lev1, curSize.lev2) })
                            let marker = new BMap.Marker(point, { icon: myIcon })
                            this.mapMarker = marker
                            this.map.addOverlay(marker)
                        }
                    })
                    // this.map.setViewport(allPoints, {
                    //     margins: [20, 0, 50, 0]
                    // })
                }
            },
            //  渲染GPS热力图方法
            renderGPSheat (data) {
                this.GPSHeatOverlay = new BMapLib.HeatmapOverlay({
                    'radius': this.hotRadius, // 设置半径大小
                    'gradient': {
                        0.3: 'rgb(0,42, 255)', // lan
                        0.5: 'rgb(123, 240, 123)', // lv
                        0.6: 'rgb(242, 248, 90)', // huang
                        0.8: 'rgb(247, 73, 66)' // hong
                    }
                });
                this.map.addOverlay(this.GPSHeatOverlay);
                let sun = 0
                data.forEach(item => {
                    if (!item.lng) {
                        item.lng = item.lon
                    }
                    sun += item.count
                    return item
                })
                let max = (sun / data.length) * 10
                try {
                    this.GPSHeatOverlay.setDataSet({
                        data: data,
                        // max: data[this.maxIndex].count < relMax ? relMax : data[this.maxIndex].count
                        max: max
                    });
                } catch (error) {
                    console.log('热力图组件未检测到符合标准的热力数据，请检查数据是否正常')
                }
            }
        }
    }
</script>

<style scoped>
    #map {
        width: 100%;
        height: 100%;
        position: absolute;
    }
</style>
