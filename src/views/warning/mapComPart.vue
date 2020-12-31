<template>
    <div>
        <div id="map"></div>
        <!--<transition name="popover-animate" tag="div"
                    enter-active-class="fadeInLeft"
                    leave-active-class="fadeOutLeft">
        </transition>-->
        <div class="animated ga-popovers" v-show="popover" ref="popover">
            <div class="ga-map">
                <p class="topP">
                    <span class="ga-close" @click="close">×</span>
                </p>
                <table>
                    <tbody>
                    <tr v-for="(item, index) in tableInfo" :key="index">
                        <td v-for="j in item"  :key="j"><p>{{j}}</p></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import BMap from 'BMap'
    // import 'animate.css'

    const RED = './static/vendor/gis/baidumapv2/images/red.png'
    const BLUE = './static/vendor/gis/baidumapv2/images/blue.png'
    const DEEPBLUE = './static/vendor/gis/baidumapv2/images/deepblue.png'
    const GREEN = './static/vendor/gis/baidumapv2/images/green.png'
    const BROWN = './static/vendor/gis/baidumapv2/images/brown.png'
    import { phoneNumChange, isPoint } from 'utils/index.js'
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                map: null,
                zoom: 13,
                timer: 0,
                tarMsisdn: '',
                msisdnArr: [],
                allInfo: [],
                mapMarker: '',
                popover: false,
                tableList: ['姓名', '手机号', '卡号', '机身码', 'LAC', 'CI'],
                timeList: ['进入时间', '离开时间', '关机时间', '时间', '消失时间', '接头时间', '时间', '离开时间', '离开时间', '离开时间', '时间'],
                areaList: ['进入位置', '离开位置', '关机位置', '位置', '消失位置', '接头位置', '位置', '离开位置', '离开位置', '离开位置', '位置'],
                tableInfo: [],
                content: [],
                pointArr: [],
                lineArr: [],
                currnetPoint: {  // 解决点击闪烁轨迹不出现的Bug
                    point: [],
                    line: ''
                },
                color: ['rgb(247, 106, 62)', 'rgb(139, 41, 247)', 'rgb(41, 206, 247)',
                    'rgb(59, 0, 0)', 'rgb(142, 247, 41)'],
                icon: [RED, DEEPBLUE, BLUE, BROWN, GREEN],
                // 存放每个点的信息
                labelData: []
            }
        },
        props: ['option', 'mapCenter', 'labelShow'],
        mounted () {
            this.createMap()
        },
        computed: {
            ...mapGetters({
                'isPhoneJM': 'global/isPhoneJM',
                'globalKeys': 'global/globalKeys',
                'gMapMaxZoom': 'global/gMapMaxZoom'
            })
        },
        watch: {
            option () {
                this.popover = false
                setTimeout(() => {
                    this.createPoint()
                }, 500)
            },
            'labelShow': {
                deep: true,
                handler: function () {
                    this.drawLabel()
                }
            }
        },
        methods: {
            gettarMsisdn (data) {
                this.tarMsisdn = data
                // 点击右边表格的某一行，该行某人轨迹点跳跃
                // this.pointJump()
                // 点击右边表格的某一行，该行某人位置点、线、提示性信息闪烁
                this.flicker()
            },
            createMap () {
                let { gMapCenter } = this.mapCenter
                let map = new BMap.Map('map', { minZoom: 1, maxZoom: this.gMapMaxZoom })
                this.map = map
                let point = new BMap.Point(gMapCenter[0], gMapCenter[1])
                map.centerAndZoom(point, this.zoom)
                map.enableScrollWheelZoom();
            },
            createPoint () {
                let map = this.map
                map.clearOverlays();
                // 初始化数据
                // alarmArea表示告警区域对象,alarmMsisdn告警目标对象,warnmoDelId告警类型ID
                let { alarmArea, alarmMsisdn } = this.option
                // 初始化地图
                if (alarmMsisdn.length > 0) {
                    let point
                    for (let a = 0; a < alarmMsisdn.length; a++) {
                        let { goalLocations } = alarmMsisdn[a]
                        if (goalLocations) {
                            for (let i = 0; i < goalLocations.length; i++) {
                                let { longtitude, latitude } = goalLocations[i]
                                if (isPoint(longtitude, latitude)) {
                                    let long = goalLocations[i].longtitude
                                    let lat = goalLocations[i].latitude
                                    point = new BMap.Point(long, lat)
                                }
                                break
                            }
                        } else {
                            let { longtitude, latitude } = alarmMsisdn[a]
                            if (isPoint(longtitude, latitude)) {
                                point = new BMap.Point(alarmMsisdn[0].longtitude, alarmMsisdn[0].latitude)
                                break
                            }
                        }
                    }
                    // let { goalLocations } = alarmMsisdn[0]
                    // let point
                    // if (goalLocations) {
                    //     let LocalLen
                    //     LocalLen = alarmMsisdn[0].goalLocations.length
                    //     point = new BMap.Point(alarmMsisdn[0].goalLocations[LocalLen - 1].longtitude,
                    //     alarmMsisdn[0].goalLocations[LocalLen - 1].latitude)
                    // } else {
                    //     point = new BMap.Point(alarmMsisdn[0].longtitude, alarmMsisdn[0].latitude)
                    // }
                    map.panTo(point);
                    map.enableScrollWheelZoom();
                }
                /** 画区域
                    1、判断是圆形区域还是不规则区域
                    2、若是圆形区域直接画，不规则区域循环点画图
                    3、点数《3，不能画出封闭区域
                **/
                // 如果是不规则图形,info表示一条告警的详细信息，alarmArea--告警区域对象
                if (alarmArea) {
                    let { length } = alarmArea
                    let colorAreaIndex = Math.floor(Math.random() * 5)
                    if (length === 1) {
                        let { radius } = alarmArea[0]
                        if (radius) {
                            let pointCircle = {
                                lng: alarmArea[0].longtitude,
                                lat: alarmArea[0].latitude
                            }
                            let circle = new BMap.Circle(pointCircle, radius,
                                { strokeColor: this.color[colorAreaIndex],
                                    strokeWeight: 3, strokeOpacity: 0.5, fillOpacity: 0.01 })
                            map.addOverlay(circle)
                        }
                    } else if (length > 2) {
                        let alarmAreaPointArr = []
                        alarmArea.forEach((item, index) => {
                            let { longtitude, latitude } = item
                            alarmAreaPointArr[index] = new BMap.Point(longtitude, latitude)
                        })
                        let Polygon = new BMap.Polygon(alarmAreaPointArr, { strokeColor: this.color[colorAreaIndex],
                            strokeWeight: 3, strokeOpacity: 0.5, fillOpacity: 0.01 })
                        // 添加折线
                        map.addOverlay(Polygon)
                    }
                }
                // ============================= 画点和线=======================
                // 生成点和线(字段改完后放入到createPoint中)
                // 告警目标对象--alarmMsisdn(一条告警结果中可能有多个告警目标对象，每个告警目标对象至少有一个点)
                let pointArr = []
                let lineArr = []
                // 点聚合
                // let pointToggers = []
                // 表示每个目标人的基本信息
                // 生成1~5的自然数
                let colorIndex = 0
                let offsetY = -20
                alarmMsisdn.forEach((itemgoals) => {
                    colorIndex = colorIndex === 5 ? 0 : colorIndex
                    // let keys = colorIndex
                    let { goalLocations } = itemgoals
                    let pointLine = []
                    pointArr[itemgoals.msisdn] = []
                    // 表示每个目标人的每个点的信息
                    if (goalLocations) {
                        // 对于一组坐标点进行处理，当有点位相同的节点，进行一定的偏移。
                        for (let i = goalLocations.length - 1; i > 0; i--) {
                            for (let j = 0; j < i; j++) {
                                if (goalLocations[j].longtitude === goalLocations[i].longtitude &&
                                    goalLocations[j].latitude === goalLocations[i].latitude) {
                                    goalLocations[j].longtitude = this.pointRandom(goalLocations[j].longtitude)
                                    goalLocations[j].latitude = this.pointRandom(goalLocations[j].latitude)
                                }
                            }
                        }
                        goalLocations.forEach((item, index) => {
                            let { latitude, longtitude } = item
                            // let point = new BMap.Point(this.pointRandom(longtitude), this.pointRandom(latitude))
                            let point = new BMap.Point(longtitude, latitude);
                            let myIcon = new BMap.Icon(this.icon[colorIndex], new BMap.Size(25, 29))
                            let marker = new BMap.Marker(point, { icon: myIcon })
                            this.mapMarker = marker
                            map.addOverlay(marker)
                            pointArr[itemgoals.msisdn].push(marker)
                            pointLine.push(point)
                            // 点聚合
                            // pointToggers.push(new BMap.Marker(point));
                            // 给每条线最后一个点加上文字信息
                            if (index === goalLocations.length - 1) {
                                let label = new BMap.Label(' ', { offset: new BMap.Size(30, offsetY + (colorIndex * 10)) })
                                this.msisdnArr.push(itemgoals.msisdn)
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
                                label.addEventListener('mouseover', function (e) {
                                    $(e.domEvent.target).parent().css({
                                        zIndex: 1
                                    })
                                    // label.setZIndex(10000)
                                })
                                label.addEventListener('mouseout', function (e) {
                                    $(e.domEvent.target).parent().css({
                                        zIndex: -7679000
                                    })
                                })
                                this.labelData.push({
                                    name: itemgoals.name,
                                    msisdn: itemgoals.msisdn,
                                    time: item.goalArriveTime,
                                    label: label
                                })
                            }
                            // 弹出表格
                            let personnalInfor = itemgoals
                            let personPoint = item
                            let me = this
                            marker.addEventListener('click', function (e) {
                                e = e || window.event
                                let nowX = e.clientX - 20
                                let nowY = e.clientY - 120
                                me.location(nowX, nowY)
                                if (index === goalLocations.length - 1) {
                                    me.openInfo(personnalInfor, personPoint)
                                } else {
                                    me.openInfo(personnalInfor, personPoint, 1)
                                }
                            })
                        })
                    }
                    // 画一个目标对象的轨迹（一条直线）
                    let polyline;
                    if (pointLine.length > 1) {
                        if ([2, 7].includes(this.option.warnmoDelId)) {
                            polyline = new BMap.Polyline(pointLine, {
                                strokeColor: this.color[colorIndex],
                                strokeWeight: 2,
                                strokeOpacity: 0.9
                                // icons: [this.drawLineDirection(3, colorIndex)]
                            })
                        } else {
                            polyline = new BMap.Polyline(pointLine, {
                                strokeColor: this.color[colorIndex],
                                strokeWeight: 2,
                                strokeOpacity: 0.9
                            })
                        }
                        map.addOverlay(polyline)
                        lineArr[itemgoals.msisdn] = polyline
                    }
                    colorIndex++
                })
                this.pointArr = pointArr
                this.lineArr = lineArr
                this.drawLabel()
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
            // 画箭头
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
            // 處理經緯度解決坐標點重合問題
            // 给点一个偏移量……直接用不合适。
            pointRandom (point) {
                point = Number(point)
                let ran = (Math.random() * 1.2 + 0.5) * 1e-4
                let ranNumber = Math.floor(Math.random() * 2)
                if (ranNumber === 0) {
                    return point - ran
                } else {
                    return point + ran
                }
            },
            openInfo (content, point, flag) {
                // 显示表格并且求得弹出表格的元素
                this.popover = true
                // 弹出表格信息，locationInfo表示个人基本信息，personPoint表示每个点的到达时间和位置
                // warnmoDelId表示类型ID
                let { warnmoDelId } = this.option
                let { length } = content
                if (length === 0) {
                    this.popover = false
                    $('.ga-popovers').css({ 'height': '28px', 'width': '160px' })
                } else {
                    // this.$nextTick(() => {
                    //     this.popover = true
                    // })
                    this.popover = true
                    let tableData = []
                    if ((warnmoDelId === 5 || warnmoDelId === 2) && flag) {
                        if (this.isPhoneJM) {
                            content.msisdn = phoneNumChange(content.msisdn)
                        }
                        tableData.push(
                        [this.tableList[0], content.name], [this.tableList[1], content.msisdn],
                        [this.tableList[2], content.imsi], [this.tableList[3], content.imei],
                        [this.tableList[4], point.lac], [this.tableList[5], point.ci],
                        ['出现时间', point.goalArriveTime],
                        ['出现位置', point.locationCname])
                    } else {
                        if (this.isPhoneJM) {
                            content.msisdn = phoneNumChange(content.msisdn)
                        }
                        tableData.push(
                        [this.tableList[0], content.name], [this.tableList[1], content.msisdn],
                        [this.tableList[2], content.imsi], [this.tableList[3], content.imei],
                        [this.tableList[4], point.lac], [this.tableList[5], point.ci],
                        [this.timeList[warnmoDelId - 1], point.goalArriveTime],
                        [this.areaList[warnmoDelId - 1], point.locationCname])
                    }
                    $('.ga-popovers').css({ 'height': 'auto' })
                    $('.ga-map').css({ 'height': 'auto' })
                    this.tableInfo = tableData
                }
            },
            close () {
                this.popover = false
            },
            // 为弹出表格定位
            location (nowX, nowY) {
                let width = $('#map').width();
                let height = $('#map').height();
                this.$nextTick(() => {
                    let tableWidth = $('.ga-popovers').width()
                    if (nowX + tableWidth > width && nowY + 180 > height) {
                        nowX = nowX - tableWidth - 20
                        nowY = nowY - 180
                    } else if (nowX + tableWidth > width) {
                        nowX = nowX - tableWidth - 20
                    } else if (nowY + 180 > height) {
                        nowY = nowY - 180
                    }
                    this.$refs.popover.style.left = nowX + 'px'
                    this.$refs.popover.style.top = nowY + 'px'
                })
            },
            // 点击右边表格的某一行，该行某人位置点、线、提示性信息闪烁
            flicker () {
                if (this.timer) {
                    clearInterval(this.timer)
                    this.currnetPoint.point.forEach(item => {
                        item.show()
                    })
                    if (this.currnetPoint.line) {
                        this.currnetPoint.line.show()
                    }
                }
                let point = []
                let line = null
                for (let key in this.pointArr) {
                    if (parseInt(key) === parseInt(this.tarMsisdn)) {
                        point = this.pointArr[key]
                        line = this.lineArr[key]
                    }
                }
                let display = true
                let i = 0
                this.currnetPoint.point = point
                this.currnetPoint.line = line
                let timer = setInterval(function () {
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
                this.timer = timer
            },
            // -----------------------------------------以下代码暂时不用---------------------------------
            // 点击右边表格的某一行，该行某人轨迹点跳跃
            // pointJump () {
            //     let marker = this.mapMarker
            //     let pointJump = this.pointArr[this.tarMsisdn]
            //     let i = 0
            //     let timer = setInterval(function () {
            //         pointJump.forEach(() => {
            //             marker.setAnimation(2)
            //         })
            //         i++
            //         if (i === 5) {
            //             clearInterval(timer)
            //             pointJump.forEach(() => {
            //                 marker.setAnimation(0)
            //             })
            //         }
            //     }, 1200)
            // },
            // 浮动在图表上的小表格
            // 拖拽目标选择框方法
            startDrag (bar, target, callback) {
                let params = {
                    left: 0,
                    top: 0,
                    currentX: 0,
                    currentY: 0,
                    flag: false
                };
                // 获取相关CSS属性
                let getCss = function (o, key) {
                    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
                };
                if (getCss(target, 'left') !== 'auto') {
                    params.left = getCss(target, 'left');
                }
                if (getCss(target, 'top') !== 'auto') {
                    params.top = getCss(target, 'top');
                }
                // o是移动对象
                bar.onmousedown = function (event) {
                    params.flag = true;
                    if (!event) {
                        event = window.event;
                        // 防止IE文字选中
                        bar.onselectstart = function () {
                            return false;
                        }
                    }
                    let e = event;
                    params.currentX = e.clientX;
                    params.currentY = e.clientY;
                };
                document.onmouseup = function () {
                    params.flag = false;
                    if (getCss(target, 'left') !== 'auto') {
                        params.left = getCss(target, 'left');
                    }
                    if (getCss(target, 'top') !== 'auto') {
                        params.top = getCss(target, 'top');
                    }
                };
                document.onmousemove = function (event) {
                    let e = event || window.event;
                    if (params.flag) {
                        var nowX = e.clientX
                        var nowY = e.clientY;
                        var disX = nowX - params.currentX
                        var disY = nowY - params.currentY;
                        target.style.left = parseInt(params.left) + disX + 'px';
                        target.style.top = parseInt(params.top) + disY + 'px';
                        if (event.preventDefault) {
                            event.preventDefault();
                        }
                        return false;
                    }

                    if (typeof callback == 'function') {
                        callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
                    }
                }
            },
            showTable () {
                // this.popover = true;
                this.$nextTick(() => {
                    let bar = this.$refs.popover
                    this.startDrag(bar, bar)
                })
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
    .ga-popovers {
        position: absolute;
        color: #fff;
        font-size: 12px;
        z-index: 1000;
        overflow:hidden;
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
    .ga-popovers tr{
        width: 160px;
        line-height: 18px;
    }
    .ga-map {
        height: auto;
    }
    .ga-map table tr td:last-child{
        max-width: 200px;
        line-height: 18px;
        height: auto;
        word-wrap: break-word;
        padding: 0 40px 0 10px;
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
    .ga-map table td{
        /*padding:2px 5px;*/
    }
    .ga-map table td:first-child{
        text-align: right;
    }
    .ga-map table td:last-child{
        text-align: left;
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
    .ga-close {
        float:right;
        width: 18px;
        text-align:center;
        cursor: pointer;
    }
    .ga-close:hover{
        transform:rotateZ(360deg);
        -moz-transform:rotateZ(360deg); 
        -webkit-transform:rotateZ(360deg);
        -o-transform:rotateZ(360deg);
    }
    .ga-map{
        height:162px;
        background: rgba(0,0,0,0.8);
        border-radius: 5px;
        padding: 5px 5px;
    }
    .ga-map table {
        width: 100%;
        padding: 5px 0 4px 0;
    }
    .anchorBL{display:none;}
</style>
