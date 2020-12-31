<template>
    <div>
        <div class="patch-left"></div>
        <div class="patch-right"></div>
        <div id="bigMap"></div>
    </div>
</template>

<script>
    import BMap from 'BMap'
    import { mapGetters } from 'vuex'
    import { areaMap, provinceMap } from 'common/areaMap'

    export default {
        data () {
            return {
                showData: [],
                smallMapCenter: {},
                popoverContent: 0,
                smallMap: null,
                map: null,
                zoom: 5,
                center: [],
                popover: false,
                tableData: [
                    { name: '到达时间', value: ' ' },
                    { name: 'LAC', value: ' ' },
                    { name: 'CI', value: ' ' },
                    { name: '经纬度', value: ' ' },
                    { name: '停留时长', value: ' ' },
                    { name: '位置描述', value: ' ' }
                ]
            }
        },
        props: ['option'],
        mounted () {
            this.createMap()
        },
        components: {
        },
        watch: {
        },
        computed: {
            ...mapGetters({
                'globalKeys': 'global/globalKeys'
            })
        },
        methods: {
            //  创建地图
            createMap () {
                let map = new BMap.Map('bigMap');
                this.map = map
//                let zoom = 14
//                let point = new BMap.Point(this.globalKeys.gMapCenter[0], this.globalKeys.gMapCenter[1])
//                map.centerAndZoom(point, zoom)
                map.disableDragging()
                map.disableDoubleClickZoom()
                map.disableScrollWheelZoom();
                let pArr = [
                    {
                        lat: 59.0,
                        lng: 73.0
                    },
                    {
                        lat: 59.0,
                        lng: 136.0
                    },
                    {
                        lat: 3.0,
                        lng: 136.0
                    },
                    {
                        lat: 3.0,
                        lng: 73.0
                    },
                    {
                        lat: 59.0,
                        lng: 73.0
                    }
                ]
                // 限定区域点数组
                let pointArr = []
                let gMapKey = this.globalKeys.gMapKey
                provinceMap[gMapKey].forEach(item => {
                    let pbArr = item
                    let ply = new BMap.Polygon(pbArr, {
                        strokeWeight: 5,
                        strokeColor: '#527DB5',
                        fillOpacity: 0.05,
                        fillColor: '#091C3D'
                    });
                    ply.disableMassClear()
                    map.addOverlay(ply);
                    let path = ply.getPath();
                    pointArr = pointArr.concat(path);
                    pArr = pArr.concat(path);
                    pArr.push(pArr[0]);
                })
                map.setViewport(pointArr, {
                    zoomFactor: 1
                });
                let inverse = new BMap.Polygon(pArr, {
                    strokeOpacity: 0.0000001,
                    strokeColor: '',
                    strokeWeight: 0.00001,
                    fillColor: '#03121F',
                    fillOpacity: 1
                });
                inverse.disableMassClear()
                map.addOverlay(inverse);
                this.getBoundary(this.option)
            },
            getBoundary (data) {
                this.map.clearOverlays();
                // 取mapKey(ningxia、qinghai)
                let gMapKey = this.globalKeys.gMapKey
                if (data && data.length) {
                    this.map.clearOverlays()
                    data.forEach(item => {
                        let areacode = areaMap[gMapKey][item.areaCode][0]
                        let ply = new BMap.Polygon(areacode, {
                            strokeWeight: 2,
                            strokeColor: '#ff0000',
                            fillColor: '#ff0000',
                            fillOpacity: 0.5
                        });
                        this.map.addOverlay(ply);
                    })
                }
//                for (let i in areaMap['qinghai']) {
//                    try {
//                        let ply = new BMap.Polygon(areaMap['qinghai'][i][0], { strokeWeight: 2, strokeColor: '#ff0000',
//                            fillColor: '#ff0000', fillOpacity: 0.5 });
//                        map.addOverlay(ply);
//                    } catch (e) {
//                        this.$alert(`区县${i}与库表区域码不匹配`, {
//                            confirmButtonText: '确定'
//                        })
//                    }
//                }
            }
        }
    }
</script>

<style scoped lang="postcss">
    #bigMap {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .patch-left {
        position: absolute;
        left: -1px;
        width: 2px;
        height: 100%;
        background: #03121F;
        z-index: 2;
    }
    .patch-right {
        position: absolute;
        right: -1px;
        width: 2px;
        height: 100%;
        background: #03121F;
        z-index: 2;
    }
</style>
