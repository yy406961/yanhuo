<template>
    <div>
        <div id="map"></div>
        <div class="animated ga-popovers" v-show="popover" ref="popover">
            <div class="ga-map" v-show="showTable">
                <p class="topP">
                    <span class="ga-close" @click="close">×</span>
                </p>
                <table>
                    <tbody>
                    <tr v-for="(item, index) in tableInfo" :key="index">
                        <td v-for="j in item" :key="j"><p>{{j}}</p></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import BMap from 'BMap'
    import BMapLib from 'BMapLib'
    import { phoneNumChange } from 'utils/index.js'
    import { mapGetters } from 'vuex'
    const RED = './static/vendor/gis/baidumapv2/images/circle.png'

    export default {
        data () {
            return {
                map: null,
                zoom: 7,
                maxCount: 0,
                center: [],
                popover: false,
                showTable: true,
                tableList: ['姓名', '手机号', '卡号', '机身码', 'lac', 'ci'],
                timeList: ['离开时间', '到达时间'],
                areaList: ['离开位置', '到达位置'],
                tableInfo: [],
                content: [],
                pointArr: [],
                lineArr: [],
                color: ['rgb(0, 4, 253)', 'rgb(255, 0, 0)', 'rgb(0, 158, 215)', 'rgb(59, 0, 0)', 'rgb(30, 101, 19)'],
                icon: [RED, RED, RED, RED, RED],
                // 存放每个点的信息
                labelData: [],
                // hotRadius: 25,
                heatmapOverlay: ''
            }
        },
        props: ['option', 'chooseNum', 'warnmoDelId', 'mapCenter', 'labelShow'],
        mounted () {
            this.createMap()
        },
        computed: {
            ...mapGetters({
                'isPhoneJM': 'global/isPhoneJM',
                'gMapMaxZoom': 'global/gMapMaxZoom'
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
            option () {
                // 为什么有个popoverHide……
                // if (this.option.popoverHide) {
                //     this.popover = false
                // }
                this.popover = false
                // 地图加载太慢，会遮挡弧线，暂时用setTimeout来模拟实现
                // setTimeout(() => this.createPoint(), 400)
                this.createPoint()
            },
            chooseNum () {
                this.flicker()
            },
            'labelShow': {
                deep: true,
                handler: function () {
                    this.drawLabel()
                }
            }
        },
        methods: {
            // 画地图
            createMap () {
                let { gMapCenter } = this.mapCenter
                let map = new BMap.Map('map', { minZoom: 3, maxZoom: this.gMapMaxZoom })
                this.map = map
                if (this.warnmoDelId === 10 || this.warnmoDelId === 8) {
                    let point = new BMap.Point(gMapCenter[0], gMapCenter[1])
                    map.centerAndZoom(point, this.zoom)
                    map.enableScrollWheelZoom()
                } else {
                    map.centerAndZoom(new BMap.Point(gMapCenter[0], gMapCenter[1]), 13)
                    map.enableScrollWheelZoom()
                }
            },
            // 生成地图中的点和线
            createPoint () {
                let map = this.map
                map.clearOverlays()
                /**
                 * 当warnmoDelId为9时，画热力图
                 * 对两部分点坐标数据进行处理，alarmMsisdn ---> 区域的点坐标
                 *                             this.option.center --> 热力显示点坐标
                 * 绘制成功后 return 退出此函数
                 */
                let { alarmArea } = this.option;
                let pointNineArr = [];
                // point 为地图中心点
                let point;
                let points;
                let pointsArr = [];
                if (this.warnmoDelId === 9) {
                    // 判断画 圆 或 不规则区域
                    if (alarmArea.length === 1) {
                        let pointCircle = {
                            lng: alarmArea[0].longtitude,
                            lat: alarmArea[0].latitude
                        }
                        point = new BMap.Point(pointCircle.lng, pointCircle.lat);
                        let circle = new BMap.Circle(pointCircle, alarmArea[0].radius,
                            { strokeColor: 'blue',
                                strokeWeight: 3, strokeOpacity: 0.5, fillOpacity: 0.01 })
                        map.addOverlay(circle)
                    } else {
                        // 求边界坐标的中心点 ---> 横纵坐标的平均值
                        let num1 = 0;
                        let num2 = 0;
                        alarmArea.forEach((item) => {
                            num1 += item.longtitude - 0;
                            num2 += item.latitude - 0;
                        })
                        num1 /= alarmArea.length;
                        num2 /= alarmArea.length;
                        point = new BMap.Point(num1.toFixed(6), num2.toFixed(6));
                        // 绘制区域边线
                        for (let i in alarmArea) {
                            let pointw = new BMap.Point(alarmArea[i].longtitude, alarmArea[i].latitude)
                            pointNineArr.push(pointw)
                        }
                        let curves = new BMap.Polygon(pointNineArr, { strokeColor: 'blue', strokeWeight: 3, strokeOpacity: 0.5, fillOpacity: 0.01 })
                        map.addOverlay(curves)
                    }
                    // 画热力图
                    const drawHot = (radius) => {
                        let arr = [];
                        this.option.center.forEach((item) => {
                            arr.push(item.count)
                        })
                        this.maxCount = Math.max.apply(Math, arr) * 0.9;
                        this.heatmapOverlay = new BMapLib.HeatmapOverlay(
                            { 'radius': radius, 'visible': true, 'opacity': 70 }
                        );

                        map.addOverlay(this.heatmapOverlay);
                        this.heatmapOverlay.setDataSet({ data: this.option.center, max: this.maxCount });
                        // heatmapOverlay.show();
                    }
                    // 地图移动到中心点位 --- 开启缩放
                    map.panTo(point)
                    map.enableScrollWheelZoom()
                    drawHot(this.hotRadius);
                    let timer;
                    window.addEventListener('mousewheel', () => {
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            // let zoom = map.getZoom()
                            // 清除一次热力图
                            map.removeOverlay(this.heatmapOverlay)
                            drawHot(this.hotRadius);
                            // if (zoom <= 11) {
                            //     this.hotRadius = zoom - 3 > 0 ? zoom - 3 : 3;
                            //     drawHot(this.hotRadius);
                            // } else {
                            //     this.hotRadius = zoom * 2;
                            //     drawHot(this.hotRadius);
                            // }
                        }, 500)
                    })
                    return
                }
                let leavePoint, arrivePoint, leavePosition, arrivePosition;
                for (let i = 0; i < this.option.info.goalLocations.length; i++) {
                    pointsArr.push({
                        lng: this.option.info.goalLocations[i].longtitude,
                        lat: this.option.info.goalLocations[i].latitude
                    })
                }
                // 只有一个点时显示到达
                if (this.option.info.goalLocations.length === 1) {
                    arrivePoint = [this.option.info.goalLocations[0].longtitude, this.option.info.goalLocations[0].latitude]
                    arrivePosition = new BMap.Point(arrivePoint[0], arrivePoint[1])
                    points = [arrivePosition]
                } else if (this.option.info.goalLocations.length > 1) {
                    leavePoint = [this.option.info.goalLocations[0].longtitude, this.option.info.goalLocations[0].latitude]
                    arrivePoint = [this.option.info.goalLocations[1].longtitude, this.option.info.goalLocations[1].latitude]
                    leavePosition = new BMap.Point(leavePoint[0], leavePoint[1])
                    arrivePosition = new BMap.Point(arrivePoint[0], arrivePoint[1])
                    points = [leavePosition, arrivePosition]
                }
                let curve = new BMapLib.CurveLine(points, { strokeColor: 'blue', strokeWeight: 3, strokeOpacity: 0.5 })
                map.addOverlay(curve)
                let view = map.getViewport(pointsArr);
                map.centerAndZoom(view.center, view.zoom);
                let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(25, 29))
                for (let i = 0; i < points.length; i++) {
                    let marker = new BMap.Marker(points[i], { icon: myIcon })
                    map.addOverlay(marker)
                    let content = this.option.info
                    let me = this
                    marker.addEventListener('click', function (e) {
                        if (me.warnmoDelId === 9) {
                            return false
                        }
                        me.openInfo(content, i)
                        e = e || window.event
                        let nowX = e.clientX - 20
                        let nowY = e.clientY - 130
                        me.location(nowX, nowY)
                    })
                    // 添加label，文字标注
                    let label = new BMap.Label(' ', { offset: new BMap.Size(30, -20) })
                    label.setStyle({
                        // backgroundColor: this.color[colorIndex],
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        color: '#fff',
                        borderRadius: '6px',
                        fontSize: '14px',
                        padding: '4px 8px',
                        // opacity: 0.9,
                        border: '1px solid #fff',
                        display: 'none',
                        boxShadow: '0 2px 4px 0'
                    });
                    marker.setLabel(label)
                    this.labelData.push({
                        name: this.option.info.name,
                        msisdn: this.option.info.msisdn,
                        time: this.option.info.goalLocations[i].goalArriveTime,
                        label: label
                    })
                }
                this.drawLabel()
            },
            // 对弹出表格信息赋值
            openInfo (content, j) {
                this.popover = true
                // this.curTitle = this.title[0]
                this.content = content
                let locationInfo = content
                let popover = this.$refs.popover
                if (locationInfo.length === 0) {
                    this.showTable = false
                    $(popover).css({ 'height': '28px', 'width': '160px' })
                } else {
                    this.showTable = true
                    let info = []
                    // let point = content.curLng + ',' + content.curLat
                    let state = []
                    let location = []
                    if (locationInfo.goalLocations.length === 1) {
                        locationInfo.goalLocations.unshift('')
                        j = 1;
                    }
                    if (j === 0) {
                        state = ['离开时间', locationInfo.goalLocations[0].goalArriveTime]
                        location = ['离开位置', locationInfo.goalLocations[0].locationCname]
                    } else if (j === 1) {
                        state = ['到达时间', locationInfo.goalLocations[1].goalArriveTime]
                        location = ['到达位置', locationInfo.goalLocations[1].locationCname]
                    }
                    if (this.isPhoneJM) {
                        locationInfo.msisdn = phoneNumChange(locationInfo.msisdn)
                    }
                    info.push(['姓名', locationInfo.name], ['手机号', locationInfo.msisdn],
                        ['卡号', locationInfo.imsi], ['机身码', locationInfo.imei],
                        ['LAC', locationInfo.goalLocations[j].lac],
                        ['CI', locationInfo.goalLocations[j].ci],
                        state, location)
                    $('.ga-popovers').css({ 'height': 'auto' })
                    $('.ga-map').css({ 'height': 'auto' })
                    this.tableInfo = info
                }
            },
            // 关闭弹出表格函数
            close () {
                this.popover = false
            },
            // 给弹出表格进行定位
            location (nowX, nowY) {
                let width = $('#map').width();
                let height = $('#map').height();
                this.$nextTick(() => {
                    let tableWidth = $('.ga-map').width()
                    if (nowX + tableWidth > width) {
                        nowX = nowX - tableWidth - 60
                    } else if (nowY + 180 > height) {
                        nowY = nowY - 180
                    }
                    this.$refs.popover.style.left = nowX + 'px'
                    this.$refs.popover.style.top = nowY + 'px'
                })
            },
            // 为宁夏回族自治区画行政区域
            getBoundary () {
                let map = this.map
                let bdary = new BMap.Boundary()
                let ctiys = ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市']
                for (let i = 0; i < ctiys.length; i++) {
                    bdary.get(ctiys[i], function (rs) {
                        let count = rs.boundaries.length
                        if (count === 0) {
                            alert('未能获取当前输入行政区域');
                            return
                        }
                        for (let j = 0; j < count; j++) {
                            let ply = new BMap.Polygon(rs.boundaries[j],
                                { strokeWeight: 1, strokeColor: '#389BB7', fillColor: (i === 0 ? '#389BB7' : '#fff'), fillOpacity: 1 })
                            ply.disableMassClear()
                            map.addOverlay(ply)
                        }
                    })
                }
                let point = new BMap.Point(106.26667, 38.46667);
                let opts = {
                    position: point,    // 指定文本标注所在的地理位置
                    offset: new BMap.Size(-30, -20)    // 设置文本偏移量
                }
                let label = new BMap.Label('银川市', opts);  // 创建文本标注对象
                label.setStyle({
                    color: '#fff',
                    fontSize: '14px',
                    height: '20px',
                    lineHeight: '20px',
                    fontFamily: '微软雅黑',
                    backgroundColor: 'transparent',
                    border: 'none'
                });
                label.disableMassClear();
                map.addOverlay(label);
            },
            // 控制label的显示内容
            drawLabel () {
                for (let i = 0; i < this.labelData.length; i++) {
                    let name = this.labelShow.name ? this.labelData[i].name : ''
                    let msisdn = this.labelShow.msisdn ? this.labelData[i].msisdn : ''
                    if (this.isPhoneJM) {
                        msisdn = phoneNumChange(msisdn)
                    }
                    let time = this.labelShow.time ? this.labelData[i].time : ''
                    if (!this.labelShow.name && !this.labelShow.msisdn && this.labelShow.time) {
                        this.labelData[i].label.setContent(time)
                    } else {
                        this.labelData[i].label.setContent(name + ' ' + msisdn + '<br>' + time)
                    }
                    if (!this.labelShow.name && !this.labelShow.msisdn && !this.labelShow.time) {
                        this.labelData[i].label.setStyle({
                            display: 'none'
                        })
                    } else {
                        this.labelData[i].label.setStyle({
                            display: 'block'
                        })
                    }
                }
            },
            // 以下函数本页面暂时没用
            drawLineDirection (weight, index) {
                let icons = new BMap.IconSequence(
                    new BMap.Symbol('M0 -5 L-5 -2 M0 -5 L5 -2 Z', {
                        scale: weight / 5,
                        strokeWeight: 1,
                        rotation: 0,
                        fillColor: this.color[index],
                        fillOpacity: 1,
                        strokeColor: this.color[index]
                    }), '100%', '10', false);
                return icons;
            },
            cutTabs (index) {
                switch (index) {
                    case 0:
                        let locationInfo = this.content.info.locationInfo
                        let info = []
                        let point = this.content.curLng + ',' + this.content.curLat
                        info.push([locationInfo[0].arrivalTime.slice(5, 16), point, locationInfo[0].curPlaceName, locationInfo[0].stayTime])
                        this.tableInfo = info
                        break
                    case 1:
                        let contactInfo = this.content.info.contactInfo
                        let info1 = []
                        for (let i = 0; i < contactInfo.length; i++) {
                            info1.push([contactInfo[i].time, contactInfo[i].event, contactInfo[i].receivemsisdn])
                        }
                        this.tableInfo = info1
                        break
                    case 2:
                        let eventInfo = this.content.info.eventInfo
                        let info2 = []
                        for (let i = 0; i < eventInfo.length; i++) {
                            info2.push([eventInfo[i].time, eventInfo[i].eventType])
                        }
                        this.tableInfo = info2
                }
                // this.curTitle = this.title[index]
            },
            flicker () {
                if (timer) {
                    clearInterval(timer)
                }
                let point = []
                let line = null
                for (let key in this.pointArr) {
                    if (parseInt(key) === parseInt(this.chooseNum)) {
                        point = this.pointArr[key]
                        line = this.lineArr[key]
                    }
                }
                let display = true
                let i = 0
                var timer = setInterval(function () {
                    if (display) {
                        for (let i = 0; i < point.length; i++) {
                            point[i].hide()
                        }
                        if (line) {
                            line.hide()
                        }
                        display = false
                    } else {
                        for (let i = 0; i < point.length; i++) {
                            point[i].show()
                        }
                        if (line) {
                            line.show()
                        }
                        i++
                        display = true
                    }
                    if (i === 5) {
                        clearInterval(timer)
                    }
                }, 500)
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
    .topP{
        width: 18px;
        height: 18px;
        text-align: right;
        font-size:27px;
        line-height: 22px;
        padding-right:6px;
        position: absolute;
        right: 0px;
        top: 0px;
    }
    .ga-popovers {
        position: absolute;
        /* height: 140px;
        padding: 7px 5px; */
        /* background-color: #243966; */
        /* opacity: .9; */
        color: #ffffff;
        font-size: 12px;
        overflow:hidden;
        z-index: 1000;
    }
    .ga-popovers tr{
        width: 160px;
        line-height: 18px;
    }
    .ga-map {
        height:162px;
        background: rgba(0,0,0,0.8);
        border-radius: 5px;
        padding: 5px 5px;
    }
    .ga-map table tr td:last-child{
        max-width: 200px;
        line-height: 18px;
        height: auto;
        word-wrap: break-word;
        padding-left: 10px;
        padding-right: 40px; 
    }
    .ga-map table tr td:first-child{
        width: 65px;
    }
    .ga-map table tr td:first-child p{
        width: 60px;
        line-height: 0px;
        height: auto;
        padding: 10px 1px 2px 4px;
        text-align: justify;
        display: inline-block;
        color: #ccc;
    }
    /*对于单行首尾对齐不起作用进行处理*/
    .ga-map table tr td:first-child p:after {
        content: "";
        display: inline-block;
        width: 100%;
        height: 0;
    }
    /*添加冒号*/
    .ga-map table tr td:first-child:after {
        content: ":";
        display: inline-block;
        width: 4px;
        height: auto;
        color: #ccc;
    }
    /* LAC, CI右对齐*/
    .ga-map table tr:nth-child(5) td:first-child p {
        text-align: right;
        letter-spacing: 2px;
    }
    .ga-map table tr:nth-child(6) td:first-child p {
        letter-spacing: 2px;
        text-align: right;
    }
    .ga-tabs {
        margin-top: 5px;
    }
    .ga-tabs span{
        display: inline-block;
        font-size: 12px;
        color: #ffffff;
        padding: 2px 5px;
        margin-left: 1px;
        background-color: rgb(39, 141 ,227);
        cursor: pointer;
    }
    .ga-map table td:first-child{
        text-align: right;
    }
    .ga-map table td:last-child{
        text-align: left;
    }
    .ga-close {
        float:right;
        width: 18px;
        text-align:center;
        cursor: pointer;
        /* display: inline-block;
        height: 16px;
        cursor: pointer;
        float:right;
        width: 18px;
        text-align:center; */
    }
    .ga-close:hover{
        transform:rotateZ(360deg);
        -moz-transform:rotateZ(360deg); 
        -webkit-transform:rotateZ(360deg);
        -o-transform:rotateZ(360deg);
    }
    .ga-map table {
        width: 100%;
        padding: 5px 0 4px 0;
    }
    .anchorBL{display:none;}
</style>
