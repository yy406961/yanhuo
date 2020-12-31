<template>
    <div style="height:100%;position: relative;">
        <div :id="mapid"
             class="ga-taskMap"
             ref="mapDom"></div>
    </div>
</template>

<script>
    import BMap from 'BMap'
    import BMapLib from 'BMapLib'
    import { mapGetters } from 'vuex'
    import { isPoint } from 'utils'
    import {
        partAreaImpPerList,
        getPartData
    } from 'api/allNetAnalyze/newestLocationQuery'

    const RED = './static/vendor/gis/baidumapv2/images/red.png'
    const BLUE = './static/vendor/gis/baidumapv2/images/blue.png'
    const DEEPBLUE = './static/vendor/gis/baidumapv2/images/deepblue.png'
    const GREEN = './static/vendor/gis/baidumapv2/images/green.png'
    const BROWN = './static/vendor/gis/baidumapv2/images/brown.png'

    export default {
        data () {
            return {
                map: null,
                mapData: null,
                zoom: 8,
                center: [],
                color: ['rgb(255, 0, 0)', 'rgb(0, 4, 253)', 'rgb(0, 158, 215)', 'rgb(59, 0, 0)', 'rgb(30, 101, 19)'],
                icon: [RED, DEEPBLUE, BLUE, BROWN, GREEN]
            }
        },
        props: ['type', 'menuId', 'owner', 'alarmMapData'],
        mounted () {
            if (this.type === 'funType') {
            // 位置查询
                this.$nextTick(() => {
                    this.createMap();
                    // if (this.menuId === '1') {
                    //     // 省内最新位置查询
                    //     this.initPartData();
                    // } else if (this.menuId === '2') {
                    //     // 省内历史位置查询
                    // }
                })
            } else if (this.type === 'alarmType') {
            // 告警
                this.$nextTick(() => {
                    this.createMap();
                    if (this.alarmMapData) {
                        this.initAlarmData(this.menuId, this.alarmMapData);
                    }
                })
            } else if (this.type === 'importantArea') {
            // 重点区域检测
                this.$nextTick(() => {
                    this.createImportantMap(10, this.alarmMapData);
                    if (this.alarmMapData) {
                        this.tarInAreaAlarm(this.menuId, this.alarmMapData)
                    }
                })
            }
        },
        computed: {
            mapid () {
                if (this.type === 'funType') {
                    return 'funMap' + this.menuId;
                } else if (this.type === 'alarmType') {
                    return 'alarmMap' + this.menuId;
                } else if (this.type === 'importantArea') {
                    return 'areaMap' + this.menuId;
                }
            },
            gMapCenter () {
                return {
                    longtitude: this.globalKeys['gMapCenter'][0],
                    latitude: this.globalKeys['gMapCenter'][1]
                }
            },
            ...mapGetters({
                'globalKeys': 'global/globalKeys'
            })
        },
        methods: {
            // 创建查询及告警地图
            createMap (zoom) {
                let map = new BMap.Map(this.mapid, { minZoom: 4, maxZoom: 16 })
                this.map = map
                let point = new BMap.Point(this.gMapCenter.longtitude, this.gMapCenter.latitude)
                map.centerAndZoom(point, zoom || this.zoom)
                map.enableScrollWheelZoom();
            },
            // 创建重点区域监测地图
            createImportantMap (zoom, data) {
                let points = [];
                // console.log(data)
                if (data.alarmArea.length === 1) {
                    let lon = Number(data.alarmArea[0].longtitude);
                    let lat = Number(data.alarmArea[0].latitude);
                    let radius = data.alarmArea[0].radius;
                    let filter = radius / 100000;
                    // console.log(lonFilter, latFilter)
                    let point1 = new BMap.Point(lon, lat + filter);
                    let point2 = new BMap.Point(lon + filter, lat);
                    let point3 = new BMap.Point(lon, lat - filter);
                    let point4 = new BMap.Point(lon - filter, lat);
                    points.push(point1);
                    points.push(point2);
                    points.push(point3);
                    points.push(point4);
                } else {
                    data.alarmArea.forEach(item => {
                        let point = new BMap.Point(item.longtitude, item.latitude);
                        points.push(point);
                    })
                }
                // console.log(points)
                let map = new BMap.Map(this.mapid, { minZoom: 4, maxZoom: 16 })
                this.map = map
                if (points.length > 1) {
                    let view = map.getViewport(points);
                    // console.log(view)
                    map.centerAndZoom(view.center, view.zoom)
                } else if (points.length === 0) {
                    let point = new BMap.Point(this.gMapCenter.longtitude, this.gMapCenter.latitude)
                    map.centerAndZoom(point, zoom)
                }
                map.enableScrollWheelZoom();
            },
            //  省内最新位置查询：请求重点人信息数据、打点
            async initPartData () {
                let resp = await partAreaImpPerList(this.owner);
                if (resp.rows.length) {
                    let personList = [];
                    for (let i = 0; i < resp.rows.length; i++) {
                        personList.push(resp.rows[i].msisdn + '&' + resp.rows[i].name + '&' + resp.rows[i].imei + '$')
                    }
                    // await partSendImportantPerson(personList[0]);
                    let resp1 = await getPartData(personList.join(','));
                    if (resp1.data) {
                        this.mapData = this.dealTableData(resp1.data.inProvince).mapData;
                        this.createPoint(this.mapData);
                    }
                }
            },
            //  省内最新位置查询 地图页处理重点人信息数据
            dealTableData (data) {
                let tableData = [];
                for (let i in data) {
                    let val = data[i].timeFlag
                    if (val === 1) {
                        tableData.push(data[i]);
                    }
                }
                let mapData = [];
                for (let i in tableData) {
                    let { name, msisdn, longtitude, latitude } = tableData[i]
                    let point = { longtitude, latitude }
                    mapData.push({ name, msisdn, point })
                }
                return { mapData };
            },
            // 省内最新位置查询画点
            createPoint (data) {
                let map = this.map;
                map.clearOverlays();

                for (let i = 0; i < data.length; i++) {
                    let points = data[i].point
                    let point = new BMap.Point(points.longtitude, points.latitude)
                    let myIcon = new BMap.Icon(RED, new BMap.Size(25, 29))
                    let marker = new BMap.Marker(point, { icon: myIcon })
                    map.addOverlay(marker)
                }
            },
            // 加载告警地图数据
            initAlarmData (menuId, data) {
                if (!(data.alarmMsisdn instanceof Array)) {
                    let aramMsisdnTest = data.alarmMsisdn
                    data.alarmMsisdn = []
                    data.alarmMsisdn.push(aramMsisdnTest)
                }
                if (menuId < 8) {
                    this.tarInAreaAlarm(menuId, data)
                } else if (menuId === '9') {
                    this.initHeatMap(data);
                }
            },
            /**
             * 1目标进入区域告警、2目标进入离开告警、3目标关机告警
             * 4目标漫入告警、5目标消失告警、6目标接头告警、7目标实时追踪告警
            */
            tarInAreaAlarm (menuId, data) {
                // console.log(data)
                // debugger
                let map = this.map
                map.clearOverlays();
                let { alarmArea, alarmMsisdn } = data;
                /** 画区域
                    1、判断是圆形区域还是不规则区域
                    2、若是圆形区域直接画，不规则区域循环点画图
                    3、点数《3，不能画出封闭区域
                **/
                // 如果是不规则图形,info表示一条告警的详细信息，alarmArea--告警区域对象
                if (alarmArea) {
                    let { length } = alarmArea
                    // let colorAreaIndex = Math.floor(Math.random() * 5)
                    let colorAreaIndex = 1;
                    if (length === 1) {
                        let { radius } = alarmArea[0]
                        if (radius) {
                            let pointCircle = {
                                lng: alarmArea[0].longtitude,
                                lat: alarmArea[0].latitude
                            }
                            let circle = new BMap.Circle(pointCircle, radius,
                                {
                                    strokeColor: this.color[colorAreaIndex],
                                    strokeWeight: 3, strokeOpacity: 0.5, fillColor: 'blue', fillOpacity: 0.2
                                })
                            map.addOverlay(circle)
                        }
                    } else if (length > 2) {
                        let alarmAreaPointArr = []
                        alarmArea.forEach((item, index) => {
                            let { longtitude, latitude } = item
                            alarmAreaPointArr[index] = new BMap.Point(longtitude, latitude)
                        })
                        let Polygon = new BMap.Polygon(alarmAreaPointArr, {
                            strokeColor: this.color[colorAreaIndex],
                            strokeWeight: 3,
                            strokeOpacity: 0.5,
                            fillColor: 'blue',
                            fillOpacity: 0.2
                        })
                        // 添加折线
                        map.addOverlay(Polygon)
                    }
                }
                // ============================= 画点和线=======================
                // 生成点和线(字段改完后放入到createPoint中)
                // 告警目标对象--alarmMsisdn(一条告警结果中可能有多个告警目标对象，每个告警目标对象至少有一个点)
                let pointArr = []
                let lineArr = []
                // 表示每个目标人的基本信息
                // 生成1~5的自然数
                let colorIndex = 0
                if (alarmMsisdn.length) {
                    let allPoints = []
                    alarmMsisdn.forEach((itemgoals) => {
                        if (itemgoals) {
                            colorIndex = colorIndex === 5 ? 0 : colorIndex
                            let { goalLocations } = itemgoals
                            let pointLine = []
                            pointArr[itemgoals.msisdn] = []
                            // 表示每个目标人的每个点的信息
                            if (goalLocations) {
                                goalLocations.forEach((item) => {
                                    let { latitude, longtitude } = item
                                    if (isPoint(latitude, longtitude)) {
                                        let point = new BMap.Point(Number(longtitude), Number(latitude))
                                        let myIcon = new BMap.Icon(this.icon[colorIndex], new BMap.Size(25, 29))
                                        let marker = new BMap.Marker(point, { icon: myIcon })
                                        map.addOverlay(marker)
                                        pointArr[itemgoals.msisdn].push(marker)
                                        pointLine.push(point)
                                        allPoints.push(point)
                                    }
                                })
                            } else {
                                let { latitude, longtitude } = itemgoals
                                if (isPoint(latitude, longtitude)) {
                                    let point = new BMap.Point(Number(longtitude), Number(latitude))
                                    let myIcon = new BMap.Icon(this.icon[colorIndex], new BMap.Size(25, 29))
                                    let marker = new BMap.Marker(point, { icon: myIcon })
                                    map.addOverlay(marker)
                                    pointArr[itemgoals.msisdn].push(marker)
                                    pointLine.push(point)
                                    allPoints.push(point)
                                }
                            }
                            // 画一个目标对象的轨迹（一条直线）
                            if (pointLine.length > 1) {
                                let polyline = new BMap.Polyline(pointLine, {
                                    strokeColor: this.color[colorIndex],
                                    strokeWeight: 2,
                                    strokeOpacity: 0.9
                                // ,icons: [this.drawLineDirection(3, colorIndex)]
                                })
                                map.addOverlay(polyline)
                                lineArr[itemgoals.msisdn] = polyline
                            }
                            colorIndex++
                        }
                    })
                    map.setViewport(allPoints, {
                        margins: [20, 0, 50, 0]
                    })
                }
                this.pointArr = pointArr
                this.lineArr = lineArr
            },
            // 画箭头
            drawLineDirection (weight, index) {
                let icons = new BMap.IconSequence(
                    new BMap.Symbol(7, {
                        // new BMap.Symbol('M0 -5 L-5 -2 M0 -5 L5 -2 Z', {
                        scale: weight / 5,
                        strokeWeight: 1,
                        rotation: 0,
                        fillColor: this.color[index],
                        fillOpacity: 1,
                        strokeColor: this.color[index]
                    }), '100%', '10', false);
                return icons;
            },
            // 9目标区域人群异常告警 热力图
            initHeatMap (data) {
                // debugger
                let map = this.map
                map.clearOverlays();
                let alarmArea = []
                let center = []
                let pointNineArr = []
                let goalLocationsData = data.alarmMsisdn[0].goalLocations

                // 获取区域点位  圆 或 不规则图形
                if (data.alarmArea.length === 1) {
                    alarmArea = data.alarmArea
                } else {
                    for (let i in data.alarmArea) {
                        alarmArea.push({
                            latitude: data.alarmArea[i].latitude,
                            longtitude: data.alarmArea[i].longtitude
                        })
                    }
                }
                // 更改属性名 -- 存热力图点位
                for (let i in goalLocationsData) {
                    center.push({
                        lat: goalLocationsData[i].latitude,
                        lng: goalLocationsData[i].longtitude,
                        count: goalLocationsData[i].count
                    })
                }
                // 判断画 圆 或 不规则区域
                if (alarmArea.length === 1) {
                    let pointCircle = {
                        lng: alarmArea[0].longtitude,
                        lat: alarmArea[0].latitude
                    }
                    let circle = new BMap.Circle(pointCircle, alarmArea[0].radius,
                        {
                            strokeColor: 'blue',
                            strokeWeight: 3, strokeOpacity: 0.5, fillColor: 'blue', fillOpacity: 0.2
                        })
                    map.addOverlay(circle)
                } else {
                    for (let i in alarmArea) {
                        let pointw = new BMap.Point(alarmArea[i].longtitude, alarmArea[i].latitude)
                        pointNineArr.push(pointw)
                    }
                    let curves = new BMap.Polygon(pointNineArr, {
                        strokeColor: 'blue',
                        strokeWeight: 3,
                        strokeOpacity: 0.5,
                        fillColor: 'blue',
                        fillOpacity: 0.2
                    })
                    map.addOverlay(curves)
                }
                // // 画热力图
                var heatmapOverlay = new BMapLib.HeatmapOverlay({ 'radius': 20 });
                map.addOverlay(heatmapOverlay);
                heatmapOverlay.setDataSet({ data: center, max: 100 });
                heatmapOverlay.show();
            }
        },
        watch: {
            alarmMapData (newVal) {
                if (this.type === 'funType') {
                // 位置查询
                    this.$nextTick(() => {
                        this.createMap();
                        // if (this.menuId === '1') {
                        //     // 省内最新位置查询
                        //     this.initPartData();
                        // } else if (this.menuId === '2') {
                        //     // 省内历史位置查询
                        // }
                    })
                } else if (this.type === 'alarmType') {
                // 告警
                    this.$nextTick(() => {
                        this.createMap();
                        if (newVal) {
                            this.initAlarmData(this.menuId, newVal);
                        }
                    })
                } else if (this.type === 'importantArea') {
                // 重点区域检测
                    this.$nextTick(() => {
                        this.createImportantMap(10, newVal);
                        if (newVal) {
                            this.tarInAreaAlarm(this.menuId, newVal)
                        }
                    })
                }
            }
        }
    }
</script>

<style>
    .ga-taskMap {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .anchorBL {
        display: none;
    }
</style>
