<template>
    <div>
        <div id="realTimeSmallMap" @click="showMiddleMap()"></div>
    </div>
</template>

<script>
    import BMap from 'BMap'
    import { pointRandom } from 'utils'
    import { mapGetters } from 'vuex'
    import tableComp from 'components/Table'
    import { nationClickDetailQuery, partClickDetailQuery } from 'api/allNetAnalyze/newestLocationQuery'
    const RED = './static/vendor/gis/baidumapv2/images/red.png'
//    const BLUE = './static/vendor/gis/baidumapv2/images/blue.png'
//    const DEEPBLUE = './static/vendor/gis/baidumapv2/images/deepblue.png'
//    const GREEN = './static/vendor/gis/baidumapv2/images/green.png'
//    const BROWN = './static/vendor/gis/baidumapv2/images/brown.png'
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
                perMsg: {},
                pointArr: [],
                lineArr: [],
//                rgb(0, 4, 253)
                color: ['rgb(255, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 158, 215)', 'rgb(59, 0, 0)', 'rgb(30, 101, 19)'],
                icon: [RED, RED, RED, RED, RED]
            }
        },
        props: ['option', 'part'],
        mounted () {
            this.createMap()
        },
        destroyed () {
            this.map = null;
        },
        components: {
            tableComp
        },
        watch: {
            option () {
                setTimeout(() => {
                    this.createPoint()
                }, 500)
            }
        },
        computed: {
            ...mapGetters({
                'mapCenter': 'global/globalKeys'
            })
        },
        methods: {
            setLabelShow (marker, message, colorIndex) {
                let label = new BMap.Label(message,
                    { offset: new BMap.Size(6, 0) })
                label.setStyle({
                    backgroundColor: 'transparent',
                    color: '#fff',
                    fontSize: '12px',
                    height: '20px',
                    lineHeight: '20px',
                    opacity: 0.9,
                    border: this.color[colorIndex]
                });
                marker.setLabel(label)
            },
            showMiddleMap () {
                this.$emit('openMiddleMap', this.option.center, this.option.info, this.option.detail)
            },
            //  点击详情
            async clickDetail (val) {
                let resp;
                if (this.part === 'nation') {
                    resp = await nationClickDetailQuery(val)
                } else {
                    resp = await partClickDetailQuery(val)
                }
                let pointData = [];
                for (let i in resp.rows) {
                    let { longtitude, latitude } = resp.rows[i]
                    pointData.push({ longtitude, latitude })
                }
                this.showData = resp.rows;
                this.pointArr = pointData;
                this.loadLocation();
            },
            //  显示名字和号码信息label
            mapLabelShow (marker, val) {
                let labelName = '';
                let labelMsisdn = '';
                let labelShow = this.labelShow;
                if (labelShow.showName) {
                    labelName = val.name;
                }
                if (labelShow.showNum) {
                    labelMsisdn = val.msisdn;
                }
                let label = new BMap.Label(labelName + ' ' + labelMsisdn,
                    { offset: new BMap.Size(20, -10) })
                label.setStyle({
                    backgroundColor: this.color[0],
                    color: '#fff',
                    fontSize: '12px',
                    height: '20px',
                    lineHeight: '20px',
                    opacity: 0.9,
                    border: this.color[0]
                });
                marker.setLabel(label)
                if (!labelShow.showName && !labelShow.showNum) {
                    this.removeMapLable();
                }
            },
            //  移除名字和号码信息label
            removeMapLable () {
                let markerArr = this.map.getOverlays();
                for (let i in markerArr) {
                    this.map.removeOverlay(markerArr[i].getLabel());
                }
            },
            //  切换显示 位置信息和轨迹
            changeShow (val) {
                this.popoverContent = val;
                if (val === 1) {
                    this.loadSmallMap(this.smallMapCenter);
                }
            },
            //  创建地图
            createMap () {
                let map = new BMap.Map('realTimeSmallMap', { minZoom: 3, maxZoom: 18 })
                this.map = map
                this.zoom = this.part === 'nation' ? 3 : 10
                let point = new BMap.Point(this.mapCenter.gMapCenter[0], this.mapCenter.gMapCenter[1])
                map.centerAndZoom(point, this.zoom)
                map.enableScrollWheelZoom();
            },
            // 画箭头
            drawLineDirection (weight, index) {
                let icons = new BMap.IconSequence(
                    new BMap.Symbol(7, {
                        // new BMap.Symbol('M0 -5 L-5 -2 M0 -5 L5 -2 Z', {
                        scale: weight / 15,
                        strokeWeight: 1,
                        rotation: 0,
                        fillColor: this.color[index],
                        fillOpacity: 1,
                        strokeColor: this.color[index]
                    }), '100%', '10', false);
                return icons;
            },
            //  画点
            createPoint () {
                let map = this.map
                map.clearOverlays();
                if (this.option.info[0] && this.option.info[0]) {
//                    for (let i in this.option.info[0].length) {
//                        if (this.option.info[i].longtitude && this.option.info[i].latitude) {
//                            let point = new BMap.Point(this.option.info[0].longtitude, this.option.info[0].latitude)
//                            map.centerAndZoom(point, this.zoom)
//                            break;
//                        }
//                    }
                    let lineArr = [];
                    let pointArr = this.option.info

                    let pointsArr = [];
                    for (let i in pointArr) {
                        if (pointArr[i].longtitude && pointArr[i].latitude) {
                            pointsArr.push({
                                lng: pointArr[i].longtitude,
                                lat: pointArr[i].latitude
                            })
                        }
                    }
                    let view = map.getViewport(pointsArr);
                    map.centerAndZoom(view.center, view.zoom);

                    for (let i = this.option.info.length - 1; i >= 0; i--) {
                        if (pointArr[i].longtitude && pointArr[i].latitude) {
                            let point = new BMap.Point(pointRandom(pointArr[i].longtitude), pointRandom(pointArr[i].latitude))
                            let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(22, 20))
                            let marker = new BMap.Marker(point, { icon: myIcon })
                            myIcon.setAnchor(new BMap.Size(10, 19))
                            map.addOverlay(marker)
                            this.setLabelShow(marker, this.option.info.length - i, 1)
                            lineArr.push(point)
                        }
                    }
                    let polyline = new BMap.Polyline(lineArr,
                        {
                            strokeColor: 'transparent',
                            strokeWeight: 2,
                            strokeOpacity: 0.9,
                            icons: [this.drawLineDirection(3, 0)]
                        })
                    map.addOverlay(polyline)
                }
            }
        }
    }
</script>

<style scoped lang="postcss">
    .ga-mainContent__right--map1 .ga-gis #realTimeSmallMap {
        height: 80%
    }
    #realTimeSmallMap {
        width: 95%;
        height: 88%;
        position: absolute;
    }
    /*#smallMap {*/
        /*width: 100%;*/
        /*height: 350px;*/
    /*}*/
    @component-namespace ga {
        @b popover {
            position: absolute;
            width: 610px;
            height: 190px;
            padding: 0px 5px;
            background-color: #243966;
            /*opacity: .9;*/
            color: #ffffff;
            font-size: 10px;
            z-index: 666;
            @e close {
                font-size: 10px;
                color: #ffffff;
                padding: 0px 0px 1px 6px;
                cursor: pointer;
                &:hover {
                    color: #20a0ff;
                }
            }
            @e content {
                height: 160px;
                overflow-y: auto;
                /*text-align: center;*/
                @m title {
                    display: inline-block;
                    font-size: 10px;
                    color: #ffffff;
                    padding: 2px 5px;
                    margin-left: 1px;
                    background-color: rgb(39, 141 ,227);
                    cursor: pointer;
                }
                @m show {
                    margin-top: 5px;
                    height: 130px;
                }
            }
        }
    }
</style>
