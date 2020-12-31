<template>
    <div class="ga-heatMap">
        <div id='container' class="ga-heatMap__container"></div>
        <div class="ga-heatMap__legend">
            <p v-for="(item, index) in legend" :key="index">
                <i :style="{backgroundColor: item.color}"></i>
                <span>{{ item.range }}</span>
            </p>
        </div>
        <div class="ga-heatMap__JZWrap">
            <div v-show="item" v-for="(item, index) in showInner" :key="index"
                class="ga-heatMap__ItemWrap">
                <Block ref="Block"
                :isWarn="isWarnProps(index)"
                :areaName="pointsJizhan[index].name"
                :IsShow="item"
                :showIndex="index"
                :zdrType="pointsJizhan[index].type" @innerClick="innerClick"></Block>
            </div>
        </div>
        <!-- <div class="animated ga-heatMap__popovers" v-show="popShow" ref="popover">
            <p class="ga-heatMap__topP">
                <span class="ga-heatMap__close" @click="close">×</span>
            </p>
            <div class="ga-heatMap__popContent">
                <p v-for="(item, index) in tableInfo" :key="index">
                    <span>{{item.name}}：</span><span>{{item.value}}</span>
                </p>
            </div>
        </div> -->
    </div>
</template>

<script>
    const RED = './static/vendor/gis/baidumapv2/images/red.png'
    const BLUE = './static/vendor/gis/baidumapv2/images/blue.png'
    const QUANJING = './static/vendor/gis/baidumapv2/images/quanjing.png'
    // const GREEN = './static/vendor/gis/baidumapv2/images/green.png'
    // const DEEPBLUE = './static/vendor/gis/baidumapv2/images/deepblue.png'
    // const BROWN = './static/vendor/gis/baidumapv2/images/brown.png'
    import BMap from 'BMap'
    import BMapLib from 'BMapLib'
    import { mapGetters } from 'vuex'
    import { isPoint, phoneNumChange } from 'utils/index.js'
    import Block from './block.vue'
    import { borderData } from './data'
    export default {
        data () {
            return {
                jzShow: true,
                mapMaxZoom: 18,
                map: '', // 地图元素
                GPSHeatOverlay: '', //  GPS热力图
                radius: 50, // 默认热力图点大小
                areaInner: '', // 边界元素,
                areaOut: '',
                icon: [RED, BLUE],
                viewPoints: [],
                opts: {
                    width: 250,     // 信息窗口宽度
                    height: 0,     // 信息窗口高度
                    enableCloseOnClick: true // 是否开启点击地图关闭信息窗口
                },
                pointMarker: null,
                zdr: '',
                tableInfo: [],
                popShow: true,
                showInner: [false, false, false, false],
                pointsJizhan: [
                    { name: '解放路西海信广场', id: 0, type: '01', lon: '112.9752979916', lat: '28.1966187183' },
                    { name: '西湖路杜甫江阁', id: 1, type: '02', lon: '112.9758976946', lat: '28.1905884006' },
                    { name: '人民路与湘江路交叉口', id: 2, type: '03', lon: '112.9760114592', lat: '28.1943492137' },
                    { name: '橘子洲南侧出入口', id: 3, type: '04', lon: '112.9695145665', lat: '28.2002861900' }
                ],
                heatLend: [0, 0.1, 0.15, 0.25, 0.4, 1],
                heatgrent: {
                    0: '#307BFF',
                    0.1: '#12D1C6',
                    0.15: '#75D258',
                    0.25: '#FFEA00',
                    0.4: '#FF9E46',
                    1: '#E91011'
                },
                carOverlays: [],
                carIcon: QUANJING,
                carPoint: [
                    // { name: 'CARS2', count: 102, lon: '112.9758976946', lat: '28.3905884006' },
                    // { name: 'CARS3', count: 182, lon: '112.5695145665', lat: '28.6002861900' },
                    { name: 'CARS1', count: 12, lon: '112.9774050961', lat: '28.1900162686' }
                ],
                pointArr: [],
                pointNormalArr: [],
                tanData: [0, 1, 2, 3],
                point0: '',
                point2: '',
                point1: '',
                point3: '',
                timer1: null,
                timer2: null,
                timer3: null,
                timer0: null
            }
        },
        // 传入参数为点集，以及区域边界点数组
        props: [
            'Interface', 'heatPoint', 'areaBorder', 'gpsMax', 'carData',
            'isWarn0', 'isWarn1', 'isWarn2', 'isWarn3'
        ],
        computed: {
            // 取得地市关键字，用于获取地市坐标
            ...mapGetters({
                'globalKeys': 'global/globalKeys',
                'isPhoneJM': 'global/isPhoneJM'
            }),
            // gps热力图图例系数
            legend () {
                let max = this.gpsMax * 0.9 > 100 ? this.gpsMax : 100
                return [{
                    color: '#E91011',
                    range: `>= ${max * this.heatLend[5]}`
                }, {
                    color: '#FF9E46',
                    range: `${Math.floor(max * this.heatLend[4])} - ${Math.floor(max * this.heatLend[5])}`
                }, {
                    color: '#FFEA00',
                    range: `${Math.floor(max * this.heatLend[3])} - ${Math.floor(max * this.heatLend[4])}`
                }, {
                    color: '#75D258',
                    range: `${Math.floor(max * this.heatLend[2])} - ${Math.floor(max * this.heatLend[3])}`
                }, {
                    color: '#12D1C6',
                    range: `${Math.floor(max * this.heatLend[1])} - ${Math.floor(max * this.heatLend[2])}`
                }, {
                    color: '#307BFF',
                    range: `0 - ${Math.floor(max * this.heatLend[1])}`
                }];
            },
            // 计算热力点动态半径
            heatRadius () {
                let radius = 30;
                let zoom = this.map.getZoom();  // 4 - 19
                // switch (zoom) {
                //     case 19:
                //         radius = 20;
                //         break;
                //     case 18:
                //         radius = 12;
                //         break;
                //     case 17:
                //         radius = 8;
                //         break;
                //     case 16:
                //         radius = 6;
                //         break;
                //     case 15:
                //         radius = 4;
                //         break;
                //     default:
                //         radius = 2;
                //         break;
                // }
                switch (zoom) {
                    case 18:
                        radius = 22;
                        break;
                    case 17:
                        radius = 20;
                        break;
                    case 16:
                        radius = 18;
                        break;
                    case 15:
                        radius = 16;
                        break;
                    case 14:
                        radius = 14;
                        break;
                    case 13:
                        radius = 12;
                        break;
                    case 12:
                        radius = 10;
                        break;
                    case 11:
                        radius = 8;
                        break;
                    default:
                        radius = 4;
                        break;
                }
                // switch (zoom) {
                //     case 19:
                //         radius = 45;
                //         break;
                //     case 18:
                //         radius = 40;
                //         break;
                //     case 17:
                //         radius = 35;
                //         break;
                //     case 16:
                //         radius = 30;
                //         break;
                //     case 15:
                //         radius = 25;
                //         break;
                //     default:
                //         radius = 20;
                //         break;
                // }
                return radius
            }
        },
        mounted () {
            this.jzShow = this.Interface ? this.Interface === 70010 : true
        },
        methods: {
            blockRefs(index) {
                return 'Block' + index
            },
            isWarnProps(index) {
                return this['isWarn' + index]
            },
            // 创建地图
            createMap () {
                // 在id为container的div中画地图
                this.map = new BMap.Map('container', { enableMapClick: false, minZoom: 4, maxZoom: this.mapMaxZoom })
                this.getmapCenter()
                let topRightNavigation = new BMap.NavigationControl({
                    anchor: 0,  // 控件位置，左 0，右 1
                    type: 0 // 控件类型
                });
                this.map.addControl(topRightNavigation)
                if (this.jzShow) this.initPoint()
                this.map.onzoomend = () => {
                    this.renderGPSheat(this.heatPoint);
                }
                // 允许地图进行滚轮缩放
                this.map.enableScrollWheelZoom();
            },
            //  渲染GPS热力图方法
            renderGPSheat (data) {
                this.map.removeOverlay(this.GPSHeatOverlay);
                this.GPSHeatOverlay = new BMapLib.HeatmapOverlay({
                    'radius': this.heatRadius, // 设置半径大小
                    'gradient': this.heatgrent
                });
                this.map.addOverlay(this.GPSHeatOverlay);
                // let max = data.length ? data[0].count : 150
                let max = this.gpsMax > 100 ? this.gpsMax : 100
                try {
                    this.GPSHeatOverlay.setDataSet({
                        data: data,
                        max: max
                    });
                } catch (error) {
                    console.log('热力图组件未检测到符合标准的热力数据，请检查数据是否正常')
                }
            },
            // 画区域
            drawArea(newval) {
                let { border, radius } = newval
                // 如果边界存在时，清除边界覆盖物，避免叠加
                if (this.areaInner) this.map.removeOverlay(this.areaInner)
                if (this.areaOut) this.map.removeOverlay(this.areaOut)
                this.viewPoints = this.areaArray(border, radius);
                let outPointArr = this.handelOutArea(border)
                // 根据半径的有无判断画多边形还是圆形
                if (radius === null) {
                    // 建立多边形覆盖物
                    this.areaInner = new BMap.Polygon(this.viewPoints, {
                        strokeColor: '#0072ff',
                        strokeWeight: 3,
                        strokeOpacity: 0.7,
                        fillColor: '#0072ff',
                        fillOpacity: 0.001
                    })
                    this.areaOut = new BMap.Polygon(outPointArr, {
                        strokeColor: '#0072ff',
                        strokeWeight: 4,
                        strokeStyle: 'dashed',
                        strokeOpacity: 0.7,
                        fillColor: '#0072ff',
                        fillOpacity: 0.001
                    });
                } else {
                    // 建立圆形覆盖物
                    this.areaInner = new BMap.Circle(new BMap.Point(border[0], border[1]), radius, {
                        strokeColor: '#0072ff',
                        strokeWeight: 3,
                        strokeOpacity: 0.7,
                        fillColor: '#37baff',
                        fillOpacity: 0.001
                    })
                    // 外圈区域
                    let zoom = this.map.getZoom()
                    this.areaOut = new BMap.Circle(new BMap.Point(border[0], border[1]), radius + Math.pow(zoom, 2), {
                        strokeColor: '#0072ff',
                        strokeWeight: 3,
                        strokeStyle: 'dashed',
                        strokeOpacity: 0.7,
                        fillColor: '#0072ff',
                        fillOpacity: 0.001
                    });
                }
                // 添加覆盖物
                this.map.addOverlay(this.areaInner)
                this.map.addOverlay(this.areaOut)
            },
            initPoint() {
                let typeArr = ['01', '02', '03', '04']
                typeArr.forEach(item => {
                    this.getPoint(item, false)
                })
            },
            // 基站车相关
            getCarPoint(data = []) {
                this.removeOverlays(this.carOverlays)
                this.carPoint.forEach(item => {
                    let { lon, lat } = item
                    let point = new BMap.Point(lon, lat);
                    let myIcon = new BMap.Icon(this.carIcon, new BMap.Size(25, 29), {
                        imageSize: new BMap.Size(25, 35)
                    })
                    let marker = new BMap.Marker(point, { icon: myIcon })
                    let str = ''
                    data.forEach(it => {
                        str += it.name + '：' + it.value + '人<br/>'
                    })
                    let label = new BMap.Label(str, { offset: new BMap.Size(20, 30) })
                    label.setStyle({
                        color: '#fff',
                        fontSize: '12px',
                        fontFamily: '微软雅黑',
                        border: 'none',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        padding: '3px 6px',
                        borderRadius: '5px'
                    });
                    marker.setLabel(label);
                    this.map.addOverlay(marker)
                    this.carOverlays.push(marker)
                })
            },
            // 清除指定覆盖物组
            removeOverlays(name) {
                for (let i = 0; i < name.length; i++) {
                    this.map.removeOverlay(name[i]);
                }
            },
            innerClick(index, bool = false) {
                this.pointShow(index, bool)
            },
            // 处理四个点显示隐藏
            pointShow(val, bool) {
                let arr = _.cloneDeep(this.showInner)
                this.showInner = []
                arr.forEach((item, index) => {
                    this.showInner[index] = val === index ? bool : arr[index]
                })
            },
            // 重新定位地图中心点
            getmapCenter(data = []) {
                if (data.length > 1) {
                    // 有区域
                    let view = this.map.getViewport(data);
                    // 设置地图中心点以及缩放zoom
                    this.map.centerAndZoom(view.center, view.zoom)
                } else if (data.length === 0) {
                    let point = new BMap.Point(this.globalKeys.gMapCenter[0], this.globalKeys.gMapCenter[1])
                    // 设置地图中心点以及缩放zoom
                    this.map.centerAndZoom(point, 17)
                }
            },
            // 点击右边表格的某一行，该行某人位置点、线、提示性信息闪烁
            flicker (index) {
                let point = this['point' + index]
                let time = this['timer' + index]
                if (time) {
                    clearInterval(time)
                    if (point) point.show()
                }
                let display = true
                let i = 0
                let me = this
                let timer = setInterval(function () {
                    if (display) {
                        if (point) point.hide()
                        display = false
                    } else {
                        if (point) point.show()
                        i++
                        display = true
                    }
                    if (i === 5) {
                        clearInterval(me['timer' + index])
                    }
                }, 500)
                this['timer' + index] = timer
            },
            // 基站打点
            getPoint(type, bool) {
                if (!this.jzShow) {
                    return
                }
                let index = 0
                let obj = {}
                this.pointsJizhan.forEach((item, lh) => {
                    if (item.type === type) {
                        index = lh
                        obj = item
                    }
                })
                if (this['point' + index]) this.map.removeOverlay(this['point' + index])
                let iconType = bool ? this.icon[0] : this.icon[1]
                let point = new BMap.Point(obj.lon, obj.lat);
                let myIcon = new BMap.Icon(iconType, new BMap.Size(25, 29), {
                    imageSize: new BMap.Size(25, 35)
                })
                this['point' + index] = new BMap.Marker(point, { icon: myIcon })
                let label = new BMap.Label(obj.id + obj.name, { offset: new BMap.Size(20, 0) })
                label.setStyle({ display: 'none' })
                this['point' + index].setLabel(label);
                this.map.addOverlay(this['point' + index])

                if (bool) this.flicker(index)
    
                let me = this
                this['point' + index].addEventListener('click', function (e) {
                    let num = e.target.getLabel().content.substr(0, 1)
                    // label.setStyle({ display: 'block' })
                    me.pointShow(Number(num), true)
                })
            },
            destroyFlicker() {
                clearInterval(this.timer1)
                clearInterval(this.timer2)
                clearInterval(this.timer3)
                clearInterval(this.timer0)
            },
            clearOverlays() {
                this.map.clearOverlays()
            },
            handelOutArea(data) {
                let standard = Math.pow(this.map.getZoom(), 2) / 100000
                // let standard = (1 / this.map.getZoom()) / 5000
                let { length } = data
                let lngSum = 0
                let latSum = 0
                let munData = []
                if (this.jzShow) {
                    // 橘子洲区域外虚线边框写死
                    munData = borderData
                } else {
                    data.forEach(item => {
                        lngSum += Number(item[0])
                        latSum += Number(item[1])
                        munData.push([Number(item[0]), Number(item[1])])
                    })
                    let lat = latSum / length
                    let lng = lngSum / length
                    munData.forEach(item => {
                        if (item[0] < lng) {
                            item[0] = item[0] - standard
                        } else if (item[0] > lng) {
                            item[0] = item[0] + standard
                        }
                        if (item[1] < lat) {
                            item[1] = item[1] - standard
                        } else if (item[1] > lat) {
                            item[1] = item[1] + standard
                        }
                        return item
                    })
                }
                let result = []
                munData.map(v => {
                    result.push(new BMap.Point(v[0], v[1]))
                })
                return result
            },
            // 处理重点区域范围边界点
            areaArray (data, radius = null) {
                let result = []
                let resArr = []
                if (data.length === 2) {
                    let lon = Number(data[0]);
                    let lat = Number(data[1]);
                    let filter = radius / 100000;
                    resArr = [
                        [lon, lat + filter],
                        [lon + filter, lat],
                        [lon, lat - filter],
                        [lon - filter, lat]
                    ]
                } else {
                    resArr = _.cloneDeep(data)
                }
                // 将边界点坐标转化为地图上的点，并组成数组
                resArr.map(v => {
                    result.push(new BMap.Point(v[0], v[1]))
                })
                this.getmapCenter(result)
                return result
            },
            // --------------------------------------无用代码---------------------------
            close() {
                this.popShow = false
            },
            //  特定人位置打点
            createOneMarker (data, bool = false) {
                if (this.pointMarker) {
                    this.map.removeOverlay(this.pointMarker);
                    this.pointMarker = []
                    this.map.closeInfoWindow();
                }
                if (bool) {
                    this.getmapCenter(this.viewPoints)
                }
                if (data) {
                    let { latitude, longtitude } = data
                    if (isPoint(longtitude, latitude)) {
                        let point = new BMap.Point(Number(longtitude), Number(latitude))
                        this.map.centerAndZoom(point, 12)
                        this.pointMarker = new BMap.Marker(point);
                        this.map.addOverlay(this.pointMarker);
                        this.tableInfo = this.handelZdr(data)
                        let content = '<div>';
                        this.handelZdr(data).map(item => {
                            content += '<p>' + item.name + '：' + item.value + '</p>'
                        })
                        content += '</div>'
                        let infoWindow = new BMap.InfoWindow(content, this.opts);
                        this.map.openInfoWindow(infoWindow, point); //  开启信息窗口
                        // this.location(window.event.clientX + 120, window.event.clientY + 40)
                        let me = this
                        this.pointMarker.addEventListener('click', function (e) {
                            //  获取点击事件弹出框的内容
                            me.openInfo(content, e.target)
                            // e = e || window.event
                            // let nowX = e.clientX - 300
                            // let nowY = e.clientY - 100
                            // me.location(nowX, nowY)
                            // me.popShow = true
                        })
                    }
                }
            },
            // 点击特定人 marker 显示其信息
            openInfo (content, e) {
                let p = e;
                let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                let infoWindow = new BMap.InfoWindow(content, this.opts);
                this.map.openInfoWindow(infoWindow, point); //  开启信息窗口
            },
            // 处理重点人数据
            handelZdr(obj) {
                let { latitude, longtitude, msisdn, name, homeCode, imei, imsi, lac, ci, address, ispCode } = obj
                let personPoint = [
                    { name: '姓名', value: name },
                    { name: '手机号', value: msisdn },
                    // { name: '标签：', value: flag },
                    { name: '归属地', value: homeCode },
                    { name: 'IMEI', value: imei },
                    { name: 'IMSI', value: imsi },
                    { name: '运营商', value: ispCode },
                    { name: '经度', value: longtitude },
                    { name: '纬度', value: latitude },
                    { name: '基站名称', value: address },
                    { name: 'LAC', value: lac },
                    { name: 'CI', value: ci }
                    // { name: '到达时间：', value: arrivetime }
                ]
                let pointInfor = this.notNull(personPoint)
                return pointInfor
            },
            // 判断数据是否为空
            notNull(arr) {
                let newArr = []
                arr.map(item => {
                    let { name, value } = item
                    if (!value || value === null || value === 'null') {
                    } else {
                        let result = value
                        if (this.isPhoneJM && name === '手机号') {
                            result = phoneNumChange(value)
                        }
                        newArr.push({ name: name, value: result })
                    }
                })
                return newArr
            },
            // 为弹出表格定位
            location (nowX, nowY) {
                let width = $('#container').width();
                let height = $('#container').height();
                this.$nextTick(() => {
                    let tableWidth = $('.ga-heatMap__popovers').width()
                    let tableHeight = $('.ga-heatMap__popovers').height()
                    console.log(tableWidth, tableHeight, nowX, nowY)
                    console.log(width, height)
                    if (nowX + tableWidth > width) {
                        nowX = nowX - tableWidth - 70
                    }
                    if (nowY + tableHeight > height) {
                        nowY = nowY - 250
                    }
                    if (nowY < 0) {
                        nowY = 30
                    }
                    this.$refs.popover.style.left = nowX + 'px'
                    this.$refs.popover.style.top = nowY + 'px'
                })
            },
            // 基站打点
            drawPoint() {
                this.pointNormalArr = []
                this.pointArr = []
                this.pointsJizhan.map(item => {
                    let point = new BMap.Point(item.lon, item.lat);
                    let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(25, 29), {
                        imageSize: new BMap.Size(25, 35)
                    })
                    let marker = new BMap.Marker(point, { icon: myIcon })
                    let label = new BMap.Label(item.id, { offset: new BMap.Size(20, 0) })
                    label.setStyle({ display: 'none' })
                    marker.setLabel(label);
                    this.map.addOverlay(marker)
                    this.pointArr.push(marker)

                    let norIcon = new BMap.Icon(this.icon[1], new BMap.Size(25, 29), {
                        imageSize: new BMap.Size(25, 35)
                    })
                    let normMarker = new BMap.Marker(point, { icon: norIcon })
                    this.pointNormalArr.push(normMarker)
                    let labelT = new BMap.Label(item.id, { offset: new BMap.Size(20, 0) })
                    labelT.setStyle({ display: 'none' })
                    normMarker.setLabel(labelT);
                    this.map.addOverlay(normMarker)
    
                    let me = this
                    marker.addEventListener('click', function (e) {
                        let num = e.target.getLabel().content
                        me.pointShow(num, true)
                    })
                    normMarker.addEventListener('click', function (e) {
                        let num = e.target.getLabel().content
                        me.pointShow(num, true)
                    })
                })
            },
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
            }
        },
        beforeDestroy () {
            this.destroyFlicker()
        },
        watch: {
            carData(newVal) {
                console.log('11111111111111111', newVal)
                // 基站车画点
                // if (this.jzShow) this.getCarPoint(newVal)
            },
            Interface(newVal) {
                let gradiJZ = {
                    0: '#307BFF',
                    0.1: '#12D1C6',
                    0.15: '#75D258',
                    0.25: '#FFEA00',
                    0.4: '#FF9E46',
                    1: '#E91011'
                }
                let gradiWY = {
                    0: '#307BFF',
                    0.1: '#12D1C6',
                    0.15: '#75D258',
                    0.25: '#FFEA00',
                    0.5: '#FF9E46',
                    1: '#E91011'
                }
                let gradiYL = {
                    0: '#307BFF',
                    0.125: '#12D1C6',
                    0.25: '#75D258',
                    0.375: '#FFEA00',
                    0.625: '#FF9E46',
                    1: '#E91011'
                }
                this.heatgrent = newVal === 70010 ? gradiJZ : (newVal === 70011 ? gradiWY : gradiYL)
                let legJZ = [0, 0.1, 0.15, 0.25, 0.4, 1]
                let legWY = [0, 0.1, 0.15, 0.25, 0.5, 1]
                let legYL = [0, 0.125, 0.25, 0.375, 0.625, 1]
                this.heatLend = newVal === 70010 ? legJZ : (newVal === 70011 ? legWY : legYL)

                this.renderGPSheat(this.heatPoint)
                this.jzShow = newVal === 70010
                this.showInner = [false, false, false, false]
                this.clearOverlays()
                this.destroyFlicker()
            },
            jzShow(val) {
                if (val) this.initPoint()
            },
            isWarn0: {
                deep: true,
                handler(newVal) {
                    let bool = !(newVal === '0')
                    let typeId = '01'
                    this.getPoint(typeId, bool)
                }
            },
            isWarn1: {
                deep: true,
                handler(newVal) {
                    let bool = !(newVal === '0')
                    let typeId = '02'
                    this.getPoint(typeId, bool)
                }
            },
            isWarn2: {
                deep: true,
                handler(newVal) {
                    let bool = !(newVal === '0')
                    let typeId = '03'
                    this.getPoint(typeId, bool)
                }
            },
            isWarn3: {
                deep: true,
                handler(newVal) {
                    let bool = !(newVal === '0')
                    let typeId = '04'
                    this.getPoint(typeId, bool)
                }
            },
            // 检测区域变化
            areaBorder: {
                handler (newval) {
                    this.drawArea(newval)
                },
                deep: true
            },
            // 热地图数据
            heatPoint: {
                deep: true,
                handler (newValue) {
                    // this.renderGPSheat([])
                    if (newValue && newValue.length) this.renderGPSheat(newValue)
                }
            }
        },
        components: {
            Block
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b heatMap {
            height:100%;
            width:100%;
            @e container {
                width: 100%;
                height: 100%;
                /* position: relative; */
            }
            @e JZWrap{
                /* width:300px; */
                position: absolute;
                right:0;
                top:0;
                height: 95%;
                overflow-y: auto;
            }
            @e ItemWrap{
                position: relative;
                width:100%;
                margin-bottom: 6px;
            }
            @e innerClose{
                position: absolute;
                right: 2px;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                font-style: normal;
                cursor: pointer;
                border-radius: 50%;
                font-size: 20px;
                border: 1px solid #f00;
            }
            @e legend {
                position: absolute;
                left: 0;
                bottom: 36px;
                color: #000;
                font-size: 12px;
                p {
                    height: 16px;
                    line-height: 16px;
                    display: flex;
                    align-content: center;
                    margin-bottom: 4px;
                }
                i {
                    display: inline-block;
                    width: 25px;
                    height: 13px;
                    border-radius: 3px;
                    margin-left: 4px;
                    margin-right: 4px;
                    margin-top: 3px;
                }
                span {
                    color: black;
                }
            }
            @e popovers {
                width:200px;
                position: absolute;
                color: #fff;
                font-size: 12px;
                z-index: 0;
                overflow:hidden;
            }
            @e popContent{
                padding: 8px;
                border-radius: 0 0 4px 4px;
                background: rgba(0,0,0,0.8);
                p{
                    line-height: 20px;
                    >span{
                        display: inline-block;
                        &:first-child{
                            width:60px;
                            text-align:right;
                        }
                        &:last-child{
                            width:calc(100% - 60px);
                            text-align:left;
                        }
                    }
                }
            }
            @e topP{
                height:20px;
                width: 100%;
                background:rgb(24, 117, 194);
                position: relative;
            }
            @e close{
                position: absolute;
                top:-4px;
                right:4px;
                color:#eee;
                font-size: 20px;
                cursor: pointer;
            }
        }
    }
</style>
