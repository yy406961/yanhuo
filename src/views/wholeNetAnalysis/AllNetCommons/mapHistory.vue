<template>
    <div>
        <div id="map"></div>
        <div class="ga-popover" id="pop"  v-show="popover" ref="popover">
            <el-row style="background-color: #1C74C8;padding: 0px 5px;">
                <el-col :span="22">
                    {{perMsg.name + ' ' + perMsg.phone}}
                </el-col>
                <el-col :span="2" style="height: 22px;">
                    <p class="ga-popover__close" @click="close">&#10005</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" :offset="1" class="ga-title">
                    <el-row>
                        <span></span>位置信息
                    </el-row>
                </el-col>
                <div v-if="part == 'nation'">
                    <div class="ga-popover__content">
                        <div v-for="item in tableDataNation">
                            <div>
                                {{item.name}}
                            </div>
                            <div>
                                {{item.value}}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="ga-popover__content">
                        <div v-for="item in tableData">
                            <div>
                                {{item.name}}
                            </div>
                            <div>
                                {{item.value}}
                            </div>
                        </div>
                    </div>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
    import BMap from 'BMap'
    import tableComp from 'components/Table'
    import { startDrag, pointRandom } from 'utils'
    import { mapGetters } from 'vuex'
    import { phoneNumChange } from 'utils/index'
    const PINK = './static/vendor/gis/baidumapv2/images/usualPoint.png'
    const M0 = './static/vendor/gis/baidumapv2/images/startPoint.png'
    const M1 = './static/vendor/gis/baidumapv2/images/endPoint.png'
    const RED = './static/vendor/gis/baidumapv2/images/red.png'
    const BLUE = './static/vendor/gis/baidumapv2/images/blue.png'
    const DEEPBLUE = './static/vendor/gis/baidumapv2/images/deepblue.png'
    const GREEN = './static/vendor/gis/baidumapv2/images/green.png'
    const BROWN = './static/vendor/gis/baidumapv2/images/brown.png'
    const BMAP_ANIMATION_BOUNCE	 = 2
    export default {
        data () {
            return {
                playMinTime: 5,
                playMaxTime: 5,
                choseNum: null,
                lastPointArrKey: null,
                lastMarkerIndex: null,
                mapData: [],
                mArr: [M0, M1],
                showData: [],
                smallMapCenter: {},
                map: null,
                zoom: 5,
                center: [],
                popover: false,
                perMsg: {},
                pointArr: [],
                pointNumArr: [],
                //  画点的时候  保存点数据
                pointDataArr: [],
                pointLocDataArr: [],
                startPoint: {
                    lng: null,
                    lat: null
                },
                endPoint: {
                    lng: null,
                    lat: null
                },
                lineArr: [],
                color: ['rgb(255, 0, 0)', 'rgb(0, 4, 253)', 'rgb(0, 158, 215)', 'rgb(59, 0, 0)', 'rgb(30, 101, 19)'],
                shortColor: ['#378bff', '#3c87f8', '#4483ee', '#4c7de4', '#5676d8',
                    '#6070cb', '#6b68be', '#765fae', '#82579f', '#8e4e90',
                    '#9b467f', '#a83d70', '#b43460', '#c02c50', '#cb2542',
                    '#d71c34', '#e01627', '#ea0f1b', '#f20910', '#f90407 '],
                icon: [RED, BLUE, DEEPBLUE, GREEN, BROWN, PINK],
                tableData: [
                    { name: '到达时间', value: ' ' },
                    { name: 'LAC', value: ' ' },
                    { name: 'CI', value: ' ' },
                    { name: '经纬度', value: ' ' },
                    { name: '停留时长', value: ' ' },
                    { name: '位置描述', value: ' ' }
                ],
                tableDataNation: [
                    { name: '到达时间', value: ' ' },
                    { name: '经纬度', value: ' ' },
                    { name: '停留时长', value: ' ' },
                    { name: '位置描述', value: ' ' }
                ],
                mapMarker: [],
                timer: 0,
                isStop: false,
                timeNum: null,
                copyMarker: [],
                stopLength: 0,
                lastMarkerEventType: null
            }
        },
        props: ['part', 'option', 'chooseNum', 'closeMapDialog', 'locus', 'playBack', 'dragVal'],
        mounted () {
            this.createMap()
        },
        components: {
            tableComp
        },
        watch: {
            dragVal (val) {
                if (!this.playBack) {
                    this.dealDragVal(val);
                    if (val === 0) {
                        this.stopLength = 0
                    } else {
                        this.stopLength = val * 2 + 1
                    }
                }
            },
            option (val) {
                this.mapData = val.info;
            },
            'closeMapDialog' () {
                this.close();
            },
            chooseNum (val) {
                if (val) {
                    this.choseNum = val;
                    this.createPoint(val)
                    this.mapMarker = this.map.getOverlays();
                    this.stopLength = 0;
                    this.lastMarkerIndex = null;
                    this.$emit('numChanged', this.mapMarker)
                } else {
//                    console.log('为null')
                }
//                this.createPoint(val);
//                this.flicker()
            },
            locus (val) {
                this.highlight(val)
            },
            playBack (val) {
                if (val) {
                    this.reorder();
                    let timeNum = this.timeNum = 0;
                    let max = this.copyMarker.length - 1
                    let speedTime = this.playTime(20, max, this.playMinTime, this.playMaxTime)
                    // if (this.copyMarker.length === this.map.getOverlays().length) {
                    if (!(this.copyMarker.length > this.map.getOverlays().length)) {
                        this.map.clearOverlays();
                        this.isStop = false;
                        this.stopLength = 0;
                    }
                    if (this.isStop) {
                        //  暂停 再开始
                        this.map.addOverlay(this.copyMarker[this.stopLength]);
                        this.timer = setInterval(() => {
                            timeNum++
                            this.timeNum = timeNum;
                        }, speedTime)
                        this.isStop = false;
                    } else {
                        //  不暂停
                        this.timer = setInterval(() => {
                            timeNum++
                            this.timeNum = timeNum;
                        }, speedTime)
                    }
                } else {
                    this.isStop = true;
                    this.stopLength = this.map.getOverlays().length;
                }
            },
            isStop (val) {
                if (val) {
                    clearInterval(this.timer)
                }
            },
            timeNum (val) {
                this.map.addOverlay(this.copyMarker[this.stopLength + val]);
                if (this.copyMarker.length === this.map.getOverlays().length) {
                    clearInterval(this.timer)
                    this.stopLength = 0;
                    this.timeNum = -1;
                    this.isStop = false;
                    this.$emit('alreadyDraw')
                }
            }
        },
        computed: {
            ...mapGetters({
                'isPhoneJM': 'global/isPhoneJM',
                'mapCenter': 'global/globalKeys'
            })
        },
        methods: {
            playTime (num, total, minTime, maxTime) {
                let speedTime = 1000
                let n = +(total / num).toFixed(2)
                let subtract = maxTime - minTime
                if (n > 1 && n < subtract) {
                    speedTime = ((minTime + n - 1) * 1000) / (total)
                } else if (n <= 1) {
                    speedTime = (minTime * 1000) / (total)
                } else if (n >= subtract) {
                    speedTime = ((maxTime) * 1000) / (total)
                }
                return speedTime
            },
            //  重排 markerArr
            reorder () {
                let markerArr = this.mapMarker;
                let markerLength = markerArr.length;
                let pointLength = this.pointNumArr[this.choseNum].length;
                let copyMarker = markerArr.slice(0, pointLength)
                let j = 0;
                for (let i = 0; i < pointLength - 1; i++) {
                    copyMarker.splice(i + j + 1, 0, markerArr[markerLength - 1 - i])
                    j++;
                }
                copyMarker = copyMarker.reverse();
                this.copyMarker = copyMarker;
            },
            //  轴拖动
            dealDragVal (val) {
                let data = this.copyMarker
                let dataLength = data.length
                let delMarkerLength = data.length - val * 2 - 1;
                for (let i = 0; i < delMarkerLength; i++) {
                    this.map.removeOverlay(this.copyMarker[dataLength - 1 - i]);
                }
                for (let i = 0; i < val * 2 + 1; i++) {
                    this.map.addOverlay(this.copyMarker[i]);
                }
            },
            //  显示名字和号码信息label
            mapLabelShow (marker, val, index) {
                let labelName = val.name;
                let labelMsisdn = this.isPhoneJM ? phoneNumChange(val.msisdn) : val.msisdn;
                let label = new BMap.Label(labelName + ' ' + labelMsisdn,
                    { offset: new BMap.Size(20, -10) })
                label.setStyle({
                    backgroundColor: this.color[index],
                    color: '#fff',
                    fontSize: '12px',
                    height: '20px',
                    lineHeight: '20px',
                    opacity: 0.9,
                    border: this.color[index]
                });
                marker.setLabel(label)
            },
            //  移除名字和号码信息label
            removeMapLable () {
                let markerArr = this.map.getOverlays();
                for (let i in markerArr) {
                    this.map.removeOverlay(markerArr[i].getLabel());
                }
            },
            //  切换显示 位置信息和轨迹
            //  创建地图
            createMap () {
                let map = new BMap.Map('map', { minZoom: 3, maxZoom: 18 })
                this.map = map
                this.zoom = this.part === 'nation' ? this.zoom : 10
                let point = new BMap.Point(this.mapCenter.gMapCenter[0], this.mapCenter.gMapCenter[1])
                map.centerAndZoom(point, this.zoom)
                map.enableScrollWheelZoom();
            },
            //  画点
            createPoint (val) {
                let map = this.map
                map.clearOverlays();
                let pointArr = [];
                let pointNumArr = [];
                let lineArr = [];
                let pointDataArr = [];
                let pointLocDataArr = [];
                let colorIndex = 0
                let shortColorIndex = 0;
                if (this.mapData[val].points.length) {
                    let points = this.mapData[val].points
                    let baseData = this.mapData[val].baseData[0]
                    let lineLength = points.length - 1;
                    let consult = Math.floor(lineLength / 20)
                    let remainder = lineLength % 20
                    let differ = 20 - remainder
                    //  点成线
                    let pointLine = []
                    pointNumArr[baseData.msisdn] = [];

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
                            pointArr[points[j].index] = [];
                            pointDataArr[points[j].index] = [];
                            pointLocDataArr[points[j].index] = [];
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
                                if (points[j].eventType !== 0) {
                                    myIcon = new BMap.Icon(this.icon[1], new BMap.Size(22, 20))
                                }
                                myIcon.setAnchor(new BMap.Size(10, 19))
                            }
                            let marker = new BMap.Marker(point, { icon: myIcon })
                            map.addOverlay(marker)
                            //  以手机号 为索引 将marker保存进 数组 闪烁用
                            pointArr[points[j].index].push(marker, points[j].eventType)
                            pointNumArr[baseData.msisdn].push(marker)
                            pointDataArr[points[j].index].push(baseData)
                            pointLocDataArr[points[j].index].push(points[j])
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
                        //  将长线分成两两一组的短线 渐变色
                        if (pointLine.length > 1) {
                            //  存放短线 数组 两两（now, next）一组
                            let shortLine = [];
                            for (let i = 0; i < pointLine.length - 1; i++) {
                                if (i !== pointLine.length - 1) {
                                    shortLine.push([pointLine[i], pointLine[i + 1]]);
                                }
                            }
                            //  颜色数组 长度20的二维数组 一维代颜色 二维代该颜色个数
                            let arr = [];
                            //  前differ个
                            for (let i = 0; i < differ; i++) {
                                let arr1 = [];
                                for (let j = 0; j < consult; j++) {
                                    arr1.push(shortLine[i * consult + j])
                                }
                                arr.push(arr1)
                            }
                            let it = differ * consult;
                            //  后remainder个
                            for (let i = 0; i < remainder; i++) {
                                let arr1 = [];
                                for (let j = 0; j < consult + 1; j++) {
                                    arr1.push(shortLine[it + j])
                                }
                                it += consult + 1;
                                arr.push(arr1);
                            }
                            //  给线段添加颜色
                            for (let i in arr) {
                                shortColorIndex = shortColorIndex === 20 ? 0 : shortColorIndex
                                for (let j in arr[i]) {
                                    let polyline = new BMap.Polyline(arr[i][j], { strokeColor: this.shortColor[shortColorIndex],
                                        strokeWeight: 2, strokeOpacity: 1 })
                                    map.addOverlay(polyline)
                                }
                                shortColorIndex++;
                            }
                        }
                        colorIndex++
                    }
                } else {
//                    console.log('抓到了')
                }
                this.pointArr = pointArr
                this.pointNumArr = pointNumArr
                this.lineArr = lineArr
                this.pointDataArr = pointDataArr
                this.pointLocDataArr = pointLocDataArr
            },
            //  小弹框 显示位置
            locationPosition (x, y) {
                let mapWidth = $('#map').width();
                let mapHeight = $('#map').height();
                let popWidth = $('#pop').width();
                let popHeight = $('#pop').height();
                if (x < mapWidth - popWidth) {
                    if (y > 125 + popHeight) {
                        x -= 25
                        y -= popHeight + 125
                    } else if (y < 125 + mapHeight - popHeight) {
                        x -= 25
                        y -= 125
                    }
                } else {
                    if (y > 125 + popHeight) {
                        x -= popWidth + 25
                        y -= popHeight + 125
                    } else if (y < 125 + mapHeight - popHeight) {
                        x -= popWidth + 25
                        y -= 125
                    }
                }
                return { x, y }
            },
            drawLineDirection (weight, index) {
//                M0 -5 L-5 -2 M0 -5 L5 -2 Z
                let icons = new BMap.IconSequence(
                    new BMap.Symbol(6, {
                        scale: weight / 5,
                        strokeWeight: 1,
                        rotation: 0,
                        fillColor: this.color[index],
                        fillOpacity: 1,
                        strokeColor: this.color[index]
                    }), '100%', '30', false);
                return icons;
            },
            //  位置信息加载
            loadLocation () {
                let me = this;
                let data = this.showData;
                if (this.part === 'nation') {
                    let tableData = me.tableDataNation;
                    tableData[0].value = data.arriveTime;
                    tableData[1].value = '(' + Math.floor(data.longtitude * 100000) / 100000 + ',' +
                        Math.floor(data.latitude * 100000) / 100000 + ')'
                    tableData[2].value = data.stayTime;
                    tableData[3].value = data.placeCname;
                    me.tableData = tableData;
                } else {
                    let tableData = me.tableData;
                    tableData[0].value = data.arriveTime;
                    tableData[1].value = data.lac;
                    tableData[2].value = data.ci;
                    tableData[3].value = '(' + Math.floor(data.longtitude * 100000) / 100000 + ',' +
                        Math.floor(data.latitude * 100000) / 100000 + ')'
                    tableData[4].value = data.stayTime;
                    tableData[5].value = data.placeCname;
                    me.tableData = tableData;
                }
            },
            //  关闭详情框
            close () {
                this.popover = false
            },
            //  详情框 显示位置 加 可拖动
            location (nowX, nowY) {
                this.$nextTick(() => {
                    this.$refs.popover.style.left = nowX + 'px'
                    this.$refs.popover.style.top = nowY + 'px'
                })
                this.$nextTick(() => {
                    let bar = this.$refs.popover;
                    startDrag(bar, bar)
                })
            },
            //  闪烁
            highlight (val) {
//                if (timer) {
//                    clearInterval(timer)
//                }
//                let point = []
//                let line = null
//                for (let key in this.pointArr) {
//                    if (parseInt(key) === parseInt(this.chooseNum)) {
//                        point = this.pointArr[key]
//                        line = this.lineArr[key]
//                    }
//                }
//                let display = true
//                let i = 0
//                var timer = setInterval(function () {
//                    if (display) {
//                        for (let i = 0; i < point.length; i++) {
//                            point[i].hide()
//                        }
//                        if (line) {
//                            line.hide()
//                        }
//                        display = false
//                    } else {
//                        for (let i = 0; i < point.length; i++) {
//                            point[i].show()
//                        }
//                        if (line) {
//                            line.show()
//                        }
//                        i++
//                        display = true
//                    }
//                    if (i === 5) {
//                        clearInterval(timer)
//                    }
//                }, 500)
                let point = []
                //  还原 上次替换的点
                if (this.lastMarkerIndex) {
                    let marker = this.map.getOverlays()
                    let lastMarker = marker[this.lastMarkerIndex]
                    this.map.removeOverlay(lastMarker);
                    let points = new BMap.Point(lastMarker.point.lng, lastMarker.point.lat)
                    let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(22, 20))
                    if (this.lastMarkerEventType !== 0) {
                        myIcon = new BMap.Icon(this.icon[1], new BMap.Size(22, 20))
                    }
                    myIcon.setAnchor(new BMap.Size(10, 19))
                    if (this.endPoint.lng === lastMarker.point.lng && this.endPoint.lat === lastMarker.point.lat) {
                        myIcon = new BMap.Icon(this.mArr[1], new BMap.Size(22, 26))
                    }
                    if (this.startPoint.lng === lastMarker.point.lng && this.startPoint.lat === lastMarker.point.lat) {
                        myIcon = new BMap.Icon(this.mArr[0], new BMap.Size(22, 26))
                    }
                    let newMarker = new BMap.Marker(points, { icon: myIcon })
                    this.map.addOverlay(newMarker)
                    marker = this.map.getOverlays()
                    let key = this.lastPointArrKey
                    this.addMarkerEvent(newMarker, this.pointDataArr[key][0], this.pointLocDataArr[key][0])
                    if (key) {
                        this.pointArr[key] = [];
                        this.pointArr[key].push(newMarker, this.lastMarkerEventType)
                    }
                }
                //  替换 点击的点
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
                                let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(22, 20))
                                this.lastMarkerEventType = 0
                                if (point[1] !== 0) {
                                    myIcon = new BMap.Icon(this.icon[1], new BMap.Size(22, 20))
                                    this.lastMarkerEventType = point[1]
                                }
                                myIcon.setImageSize(new BMap.Size(33, 30))
                                myIcon.setSize(new BMap.Size(33, 30))
                                myIcon.setAnchor(new BMap.Size(15, 19))
                                let newMarker = new BMap.Marker(points, { icon: myIcon })
                                this.map.addOverlay(newMarker)
                                newMarker.setAnimation(BMAP_ANIMATION_BOUNCE)
                                setTimeout(() => {
                                    newMarker.setAnimation(null)
                                }, 3000)
                                this.addMarkerEvent(newMarker, this.pointDataArr[key][0], this.pointLocDataArr[key][0])
                                this.pointArr[key] = [];
                                this.pointArr[key].push(newMarker, point[1])
                            }
                        }
                    }
                }
            },
            addMarkerEvent (marker, baseData, points) {
                let me = this;
                marker.addEventListener('click', function (e) {
                    let perMsg = {
                        name: baseData.name,
                        phone: baseData.msisdn
                    }
                    me.showData = points
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
    @component-namespace ga {
        @b title {
            & div {
                color: #fff;
            }
            & span {
                display: inline-block;
                width: 5px;
                height: 13px;
                background-color: #268CC6;
                margin-right: 10px;
            }
        }
        @b popover {
            position: absolute;
            width: 375px;
            /*height: 190px;*/
            background-color: rgba(0,0,0,0.7);
            color: #ffffff;
            font-size: 10px;
            z-index: 666;
            border-bottom-right-radius: 15px;
            @e close {
                font-size: 10px;
                color: #ffffff;
                padding: 0px 0px 1px 6px;
                cursor: pointer;
                &:hover {
                    /*color: #20a0ff;*/
                }
            }
            @e title {
                display: inline-block;
                text-align: left;
                padding: 5px 10px;
                color: #fff;
                /*background-color: #268CC6;*/
            }
            @e content {
                padding: 5px 10px;
                /*height: 160px;*/
                text-align: center;
                div > div:first-child {
                    display: inline-block;
                    float: left;
                    width: 30%;
                    line-height: 30px;
                    min-height: 30px;
                }
                div > div:last-child {
                    display: inline-block;
                    float: left;
                    width: 70%;
                    line-height: 30px;
                    min-height: 30px;
                    /*width: 250px;*/
                    /*overflow: auto;*/
                }
            }
        }
    }
</style>
