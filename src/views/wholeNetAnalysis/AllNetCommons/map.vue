<template>
    <div>
        <div id="map"></div>
        <!--<div class="ga-popover" v-show="popover" ref="popover">-->
            <!--<el-row>-->
                <!--<el-col :span="23">-->
                    <!--{{perMsg.name + ' ' + perMsg.phone}}-->
                <!--</el-col>-->
                <!--<el-col :span="1" style="height: 22px;">-->
                    <!--<span class="ga-popover__close" @click="close">&#10005</span>-->
                <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row>-->
                <!--<div class="ga-popover__content">-->
                    <!--<div>-->
                        <!--<span class="ga-popover__content&#45;&#45;title" @click="changeShow(0)">位置信息</span>-->
                        <!--<span class="ga-popover__content&#45;&#45;title" @click="changeShow(1)">轨迹</span>-->
                    <!--</div>-->
                    <!--<div v-show="popoverContent === 0" class="ga-popover__content&#45;&#45;show">-->
                        <!--<tableComp :option="tableOpt" :comSize="{height: 140}"></tableComp>-->
                    <!--</div>-->
                    <!--<div id="smallMap" v-show="popoverContent === 1"></div>-->
                <!--</div>-->
            <!--</el-row>-->
        <!--</div>-->
    </div>
</template>

<script>
    import BMap from 'BMap'
    import { pointRandom } from 'utils'
    import { mapGetters } from 'vuex'
    import { phoneNumChange } from 'utils/index'
    import tableComp from 'components/Table'
    import { nationClickDetailQuery, partClickDetailQuery } from 'api/allNetAnalyze/newestLocationQuery'
    const RED = './static/vendor/gis/baidumapv2/images/red.png'
    const BLUE = './static/vendor/gis/baidumapv2/images/blue.png'
    // const DEEPBLUE = './static/vendor/gis/baidumapv2/images/deepblue.png'
    // const GREEN = './static/vendor/gis/baidumapv2/images/green.png'
    // const BROWN = './static/vendor/gis/baidumapv2/images/brown.png'
    export default {
        data () {
            return {
                labelArr: [],
                lastPointArrKey: null,
                lastMarkerIndex: null,
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
                color: ['rgb(255, 0, 0)', 'rgb(0, 4, 253)', 'rgb(0, 158, 215)', 'rgb(59, 0, 0)', 'rgb(30, 101, 19)'],
                icon: [RED, BLUE],
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '到达时间', value: 'presentTime', width: 150, align: 'center' },
                        { name: '位置坐标', value: 'coordinate', width: 170, align: 'center' },
                        { name: '停留时长', value: 'stayTimes', width: 150, align: 'center' },
                        { name: '位置描述', value: 'placeCname', align: 'center', tooltip: true }
                    ],
                    data: [],
                    pagination: false
                }
            }
        },
        props: ['option', 'labelShow', 'part', 'mapFlicker', 'chooseNum'],
        mounted () {
            this.createMap()
        },
        created () {
        },
        destroyed () {
            this.map = null;
        },
        components: {
            tableComp
        },
        watch: {
            option () {
                this.createPoint()
            },
            'chooseNum' (val) {
                this.highlight(val);
            },
            'labelShow.showName' () {
                this.removeMapLable();
                this.mapLabelShow()
            },
            'labelShow.showNum' () {
                this.removeMapLable();
                this.mapLabelShow()
            }
        },
        computed: {
            ...mapGetters({
                'isPhoneJM': 'global/isPhoneJM',
                'mapCenter': 'global/globalKeys'
            })
        },
        methods: {
            setLabelShow (marker, message, colorIndex) {
                let label = new BMap.Label(message,
                    { offset: new BMap.Size(20, -10) })
                label.setStyle({
                    backgroundColor: this.color[colorIndex],
                    color: '#fff',
                    fontSize: '12px',
                    height: '20px',
                    lineHeight: '20px',
                    opacity: 0.9,
                    border: this.color[colorIndex]
                });
                marker.setLabel(label)
            },
//            点击详情
            async clickDetail (val, baseData) {
                let resp;
                if (this.part === 'nation') {
                    resp = await nationClickDetailQuery(val)
                } else {
                    resp = await partClickDetailQuery(val)
                }
                let pointData = [];
                for (let i in resp.rows) {
                    if (!resp.rows[i].longtitude) {
                        resp.rows[i].longtitude = '';
                    }
                    if (!resp.rows[i].latitude) {
                        resp.rows[i].latitude = '';
                    }
                    let { longtitude, latitude } = resp.rows[i]
                    pointData.push({ longtitude, latitude })
                }
                this.showData = resp.rows;
//                this.pointArr = pointData;
                this.$emit('bigToSmall', this.smallMapCenter, pointData, resp.rows, baseData)
            },
//            显示名字和号码信息label
            mapLabelShow () {
                let pointArr = this.pointArr;
                let labelArr = this.labelArr;
                let labelShow = this.labelShow;
                for (let i in pointArr) {
                    let marker = pointArr[i][0]
                    let val = labelArr[i]
                    let labelName = '';
                    let labelMsisdn = '';
                    if (labelShow.showName) {
                        labelName = val.name;
                    }
                    if (labelShow.showNum) {
                        labelMsisdn = this.isPhoneJM ? phoneNumChange(val.msisdn) : val.msisdn;
                    }
                    if (i - 0 === this.chooseNum - 0) {
                        this.setLabelShow(marker, labelName + ' ' + labelMsisdn, 2)
                    } else {
                        this.setLabelShow(marker, labelName + ' ' + labelMsisdn, 0)
                    }
                }
                if (!labelShow.showName && !labelShow.showNum) {
                    this.removeMapLable();
                }
            },
//            移除名字和号码信息label
            removeMapLable () {
                let markerArr = this.map.getOverlays();
                for (let i in markerArr) {
                    if (markerArr[i].getLabel) this.map.removeOverlay(markerArr[i].getLabel());
                }
            },
//            切换显示 位置信息和轨迹
            changeShow (val) {
                this.popoverContent = val;
                if (val === 1) {
                    this.loadSmallMap(this.smallMapCenter);
                }
            },
//            创建地图
            createMap () {
                let map = new BMap.Map('map', { minZoom: 3, maxZoom: 18 })
                this.map = map
                this.zoom = this.part === 'nation' ? this.zoom : 10
                let point = new BMap.Point(this.mapCenter.gMapCenter[0], this.mapCenter.gMapCenter[1])
                map.centerAndZoom(point, this.zoom)
                map.enableScrollWheelZoom();
            },
            //  画点
            createPoint () {
                let map = this.map
                map.clearOverlays();
                this.lastMarkerIndex = null;
                // 初始化数据
                for (let i = 0; i < this.option.info.length; i++) {
                    if (!this.option.info[i].point) {
                        this.zoom = this.option.zoom ? this.option.zoom : 11
                        this.center = this.option.center ? this.option.center : [this.option.info[i].point.longtitude,
                            this.option.info[i].point.latitude]
                        // 初始化地图
                        let point = new BMap.Point(this.center[0], this.center[1])
                        map.panTo(point);
                        map.enableScrollWheelZoom();
                        break
                    }
                }
                // 每个手机号对应的点和线push进数组，手机号作为唯一标识
                // 每个手机号对应的点和线push进数组，手机号作为唯一标识
                if (this.option.info.length < 500) {
                    let pointArr = []
                    let lineArr = []
                    let labelArr = []
                    let markerArr = []
                    let colorIndex = 0
                    for (let i = 0; i < this.option.info.length; i++) {
                        colorIndex = colorIndex === 5 ? 0 : colorIndex
                        let points = this.option.info[i].point
                        //  找到号码 如果坐标点为空 不进行打点
                        if (points.longtitude && points.latitude) {
                            pointArr[this.option.info[i].msisdn] = []
                            lineArr[this.option.info[i].msisdn] = []
                            labelArr[this.option.info[i].msisdn] = []
                            let point = new BMap.Point(pointRandom(points.longtitude), pointRandom(points.latitude))
                            let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(25, 29))
                            if (this.chooseNum === this.option.info[i].msisdn) {
                                myIcon = new BMap.Icon(this.icon[1], new BMap.Size(25, 29))
                            }
                            let marker = new BMap.Marker(point, { icon: myIcon })
                            map.addOverlay(marker)
                            markerArr.push(markerArr)
                            pointArr[this.option.info[i].msisdn].push(marker)
                            labelArr[this.option.info[i].msisdn] = this.option.info[i]
                            if (this.labelShow.showName || this.labelShow.showNum) {
                                this.removeMapLable()
                                this.mapLabelShow()
                            }
                            this.addMarkerEvent(marker, labelArr[this.option.info[i].msisdn], point)
                        }
                        colorIndex++
                        this.pointArr = pointArr
                        this.labelArr = labelArr
                        this.markerArr = markerArr
                    }
                } else {
                    //  添加海量点数据
                    var points = [];
                    for (var i = 0; i < this.option.info.length; i++) {
                        let point = this.option.info[i].point
                        points.push(new BMap.Point(point.longtitude, point.latitude))
                    }
                    const BMAP_POINT_SIZE_SMALL = BMAP_POINT_SIZE_SMALL;
                    const BMAP_POINT_SHAPE_STAR = BMAP_POINT_SHAPE_STAR;
                    var options = {
                        size: BMAP_POINT_SIZE_SMALL,
                        shape: BMAP_POINT_SHAPE_STAR,
                        color: '#d340c3'
                    }
                    var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
                    pointCollection.addEventListener('click', function (e) {
                        alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
                    });
                    map.addOverlay(pointCollection);
                }
            },
            //  轨迹地图加载
            loadSmallMap (center) {
                this.$nextTick(() => {
                    let map = new BMap.Map('smallMap', { minZoom: 3, maxZoom: 18 })
                    map.centerAndZoom(center, 9)
                    map.enableScrollWheelZoom();
                    let lineArr = [];
                    for (let i in this.pointArr) {
                        let point = new BMap.Point(this.pointArr[i].longtitude, this.pointArr[i].latitude)
                        let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(25, 29))
                        let marker = new BMap.Marker(point, { icon: myIcon })
                        map.addOverlay(marker)
                        lineArr.push(point)
                    }
                    let polyline = new BMap.Polyline(lineArr, { strokeColor: this.color[0], strokeWeight: 2, strokeOpacity: 0.9 })
                    map.addOverlay(polyline)
                })
            },
            //  关闭详情框
            close () {
                this.popover = false
                this.popoverContent = 0
            },
            highlight (val) {
                // if (timer) {
                //     clearInterval(timer)
                // }
                let point = []
                if (this.lastMarkerIndex) {
                    let marker = this.map.getOverlays()
                    let lastMarker = marker[this.lastMarkerIndex]
                    this.map.removeOverlay(lastMarker);
                    let points = new BMap.Point(lastMarker.point.lng, lastMarker.point.lat)
                    let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(25, 29))
                    let newMarker = new BMap.Marker(points, { icon: myIcon })
                    this.map.addOverlay(newMarker)
                    marker = this.map.getOverlays()
                    let key = this.lastPointArrKey
                    this.addMarkerEvent(newMarker, this.labelArr[key])
                    if (key) {
                        this.pointArr[key] = [];
                        this.pointArr[key].push(newMarker)
                    }
                }
                for (let key in this.pointArr) {
                    if (parseInt(key) === parseInt(val)) {
                        point = this.pointArr[key]
                        let marker = this.map.getOverlays()
                        for (let i in marker) {
                            if (point[0].ba === marker[i].ba) {
                                this.lastPointArrKey = key;
                                this.lastMarkerIndex = marker.length - 1;
                                this.map.removeOverlay(marker[i]);
                                let points = new BMap.Point(point[0].point.lng, point[0].point.lat)
                                let myIcon = new BMap.Icon(this.icon[1], new BMap.Size(25, 29))
                                let newMarker = new BMap.Marker(points, { icon: myIcon })
                                this.map.addOverlay(newMarker)
                                this.addMarkerEvent(newMarker, this.labelArr[key])
                                this.pointArr[key] = [];
                                this.pointArr[key].push(newMarker)
                            }
                        }
                    } else {
                        // console.log('没有')
                    }
                }
                this.removeMapLable();
                this.mapLabelShow();
                // let display = true
                // let i = 0
                // var timer = setInterval(function () {
                //     if (display) {
                //         for (let i = 0; i < point.length; i++) {
                //             point[i].hide()
                //         }
                //         display = false
                //     } else {
                //         for (let i = 0; i < point.length; i++) {
                //             point[i].show()
                //         }
                //         i++
                //         display = true
                //     }
                //     if (i === 5) {
                //         clearInterval(timer)
                //     }
                // }, 500)
            },
            addMarkerEvent (marker, markerMessage, smallMapCenter = null) {
                let me = this;
                marker.addEventListener('mouseover', function () {
                    me.map.removeOverlay(marker.getLabel());
                    let labelMsisdn = me.isPhoneJM ? phoneNumChange(markerMessage.msisdn) : markerMessage.msisdn;
                    me.setLabelShow(marker, markerMessage.name + ' ' + labelMsisdn, 1)
                })
                marker.addEventListener('mouseout', function () {
                    me.map.removeOverlay(marker.getLabel());
                    if (me.labelShow.showName || me.labelShow.showNum) {
                        let labelName = '';
                        let labelMsisdn = '';
                        if (me.labelShow.showName) {
                            labelName = markerMessage.name;
                        }
                        if (me.labelShow.showNum) {
                            labelMsisdn = me.isPhoneJM ? phoneNumChange(markerMessage.msisdn) : markerMessage.msisdn;
                        }
                        if (markerMessage.msisdn - 0 === me.chooseNum - 0) {
                            me.setLabelShow(marker, labelName + ' ' + labelMsisdn, 2)
                        } else {
                            me.setLabelShow(marker, labelName + ' ' + labelMsisdn, 0)
                        }
                    }
                })
                marker.addEventListener('click', function () {
                    let perMsg = {
                        name: markerMessage.name,
                        phone: markerMessage.msisdn
                    }
                    me.perMsg = perMsg
                    if (smallMapCenter) {
                        me.smallMapCenter = smallMapCenter;
                    }
                    //  位置信息显示
                    me.clickDetail(markerMessage.msisdn + '&' + markerMessage.name + '$', markerMessage);
                    //  rap用
                    // me.clickDetail(111, markerMessage);
                })
            }
        }
    }
</script>

<style scoped lang="postcss">
    #map {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
    }
    #smallMap {
        width: 100%;
        height: 350px;
    }
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
