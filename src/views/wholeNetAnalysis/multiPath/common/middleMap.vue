<template>
    <div>
        <div id="middleMap">
        </div>
    </div>
</template>

<script>
import BMap from 'BMap'
import { mapGetters } from 'vuex'
import { pointRandom, phoneNumChange } from 'utils'

export default {
    name: 'multiPathSmallMap',
    data () {
        return {
            map: null,
            // 地图所有点 marker 索引为目标人号码  值为每个轨迹点对应的marker
            markerArr: [],
            // 微观 闪烁  索引为轨迹点数组index 值为每个轨迹点对应的marker
            blinkArr: [],
            // 所选目标人 基本信息
            // baseInfo: {},
            // 所选目标人 轨迹点数组 索引为迹点数组的index  值为对应index的点信息
            locus: []
        }
    },
    mounted () {
        this.createMap()
    },
    computed: {
        ...mapGetters({
            'isPhoneJM': 'global/isPhoneJM',
            'mapCenter': 'global/globalKeys'
        })
    },
    methods: {
        createMap () {
            let map = new BMap.Map('middleMap', { minZoom: 3, maxZoom: 18 })
            this.map = map
            let point = new BMap.Point(this.mapCenter.gMapCenter[0], this.mapCenter.gMapCenter[1])
            map.centerAndZoom(point, 10)
            map.enableScrollWheelZoom();
        },
        createPoint (val) {
            let map = this.map
            map.clearOverlays();
            let markerArr = [];
            let blinkArr = [];
            let locus = [];
            let colorIndex = 0
            if (this.mapData[val].points.length) {
                let points = this.mapData[val].points
                let baseData = this.mapData[val].baseData[0]
                    //  点成线
                let pointLine = []
                    //  自适应 zoom point
                let pointsArr = [];
                for (let i in points) {
                    pointsArr.push({
                        lng: points[i].longtitude,
                        lat: points[i].latitude
                    })
                }
                let view = map.getViewport(pointsArr);
                map.centerAndZoom(view.center, view.zoom);
                    //  打点
                if (points.length > 500) {
                    this.$message({
                        type: 'warning',
                        message: '返回的轨迹点大于500，请重新选择'
                    })
                } else {
                        //  少于 500个 正常打点
                    for (let j = 0; j < points.length; j++) {
                        let point = ''
                        let myIcon = ''
                        let lng = pointRandom(points[j].longtitude)
                        let lat = pointRandom(points[j].latitude)
                        markerArr[baseData.msisdn] = [];
                        locus[points[j].index] = [];
                            // 起点 终点 与其他轨迹点 图标( marker )不一样
                        if (j === 0) {
                            point = new BMap.Point(lng, lat)
                            myIcon = new BMap.Icon(this.mArr[1], new BMap.Size(25, 25))
                            this.endPoint = {
                                lng: lng,
                                lat: lat
                            }
                        } else if (j === points.length - 1) {
                            point = new BMap.Point(lng, lat)
                            myIcon = new BMap.Icon(this.mArr[0], new BMap.Size(25, 25))
                            this.startPoint = {
                                lng: lng,
                                lat: lat
                            }
                        } else {
                            point = new BMap.Point(lng, lat)
                            myIcon = new BMap.Icon(this.icon[colorIndex], new BMap.Size(22, 20))
                            myIcon.setAnchor(new BMap.Size(10, 19))
                        }
                        let marker = new BMap.Marker(point, { icon: myIcon })
                        map.addOverlay(marker)
                        markerArr[baseData.msisdn].push(marker)
                        blinkArr[points[j].index].push(marker)
                        locus[points[j].index].push(points[j])
                            //  后端 所给数组顺序: 最新位置为数组第一项 这里把数组顺序改为 最初---最后（新）
                        pointLine.unshift(point)
                        if (j === 0 || j === points.length - 1) {
                            this.mapLabelShow(marker, baseData, colorIndex)
                        }
                        let me = this;
                            //  添加 地图点 点击监听事件
                        marker.addEventListener('click', function (e) {
                            let perMsg = {
                                name: baseData.name,
                                phone: me.isPhoneJM ? phoneNumChange(baseData.msisdn) : baseData.msisdn
                            }
                            me.showData = points[j]
                            me.perMsg = perMsg
                                //  位置信息显示
                            me.loadLocation();
                            me.popover = true
                                //  获取 鼠标点击位置的x,y
                            e = e || window.event
                            let x = e.clientX;
                            let y = e.clientY;
                            let xy = me.locationPosition(x, y)
                            me.location(xy.x, xy.y)
                        })
                    }
                    let polyline = new BMap.Polyline(pointLine, { strokeColor: this.shortColor[colorIndex],
                        strokeWeight: 2, strokeOpacity: 1 })
                    map.addOverlay(polyline)
                    colorIndex++
                }
            } else {
            }
            this.markerArr = markerArr
            this.blinkArr = blinkArr
            this.locus = locus
        }
    }
}
</script>

<style <style lang="postcss" scoped>
#middleMap {
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>

