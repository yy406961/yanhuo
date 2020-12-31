<template>
    <div>
        <div id="map"></div>
        <div class="multiPath-popover" id="pop"  v-show="popover" ref="popover">
            <el-row style="background-color: #1C74C8;padding: 0px 5px;">
                <el-col :span="22">
                    {{perMsg.name + ' ' + perMsg.phone}}
                </el-col>
                <el-col :span="2" style="height: 22px;">
                    <p class="multiPath-popover__close" @click="close">&#10005</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" :offset="1" class="multiPath-title">
                    <el-row>
                        <span></span>位置信息
                    </el-row>
                </el-col>
                <div class="multiPath-popover__content">
                    <div v-for="item in tableData" :key="item.name">
                        <div>
                            {{item.name}}
                        </div>
                        <div>
                            {{item.value}}
                        </div>
                    </div>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
import Bus from './bus.js'
import BMap from 'BMap'
import { mapGetters } from 'vuex'
import { pointRandom, phoneNumChange, startDrag } from 'utils'
const M0 = './static/vendor/gis/baidumapv2/images/startPoint.png'
const M1 = './static/vendor/gis/baidumapv2/images/endPoint.png'
const RED = './static/vendor/gis/baidumapv2/images/red.png'
const ORANGE = './static/vendor/gis/baidumapv2/images/multipath/orange.png'
const CYAN = './static/vendor/gis/baidumapv2/images/multipath/cyan.png'
const GREEN = './static/vendor/gis/baidumapv2/images/multipath/green.png'
const VIOLET = './static/vendor/gis/baidumapv2/images/multipath/violet.png'
const BLUE = './static/vendor/gis/baidumapv2/images/multipath/blue.png'
const YELLOW = './static/vendor/gis/baidumapv2/images/multipath/yellow.png'
const DEEPBLUE = './static/vendor/gis/baidumapv2/images/multipath/deepBlue.png'
const lineColor = ['#FF0000', '#FF7F00', '#EEEE00', '#66CD00', '#00CDCD', '#1E90FF', '#4B0082']
export default {
    name: 'multiPathMap',
    props: ['mapData', 'checkObj', 'type', 'playBackState', 'closeMapDialog'],
    computed: {
        ...mapGetters({
            'isPhoneJM': 'global/isPhoneJM',
            'mapCenter': 'global/globalKeys'
        })
    },
    data () {
        return {
            map: null,
            mArr: [M0, M1],
            icon: [RED, ORANGE, YELLOW, GREEN, CYAN, BLUE, VIOLET, DEEPBLUE],
            // 地图所有点 marker 索引为目标人号码  值为每个轨迹点对应的marker
            pointMarker: [],
            // 微观 闪烁  索引为轨迹点数组index 值为每个轨迹点对应的marker
            blinkArr: [],
            // 所选目标人 基本信息
            // baseInfo: {},
            // 所选目标人 轨迹点数组 索引为迹点数组的index  值为对应index的点信息
            locus: [],
            mapMarker: [],
            copyMarker: [],
            period: [],
            // 时段 地图不打点的时间
            periodNoShowMap: [],
            perMsg: {},
            tableData: [
                { name: '到达时间', value: ' ' },
                { name: 'LAC', value: ' ' },
                { name: 'CI', value: ' ' },
                { name: '经纬度', value: ' ' },
                { name: '停留时长', value: ' ' },
                { name: '位置描述', value: ' ' }
            ],
            playMinTime: 5,
            playMaxTime: 5,
            stopLength: 0,
            isStop: false,
            popover: false,
            timeNum: null
        }
    },
    watch: {
        checkObj: {
            deep: true,
            handler: function (val) {
                this.createLocus(val)
            }
        },
        closeMapDialog () {
            this.close();
        },
        type () {
            this.createLocus()
        },
        playBackState (val) {
            this.reorder();
            if (val) {
                if (this.copyMarker.length === this.map.getOverlays().length) {
                    this.map.clearOverlays();
                    this.map.addOverlay(this.copyMarker[0]);
                    this.isStop = false;
                    this.stopLength = 0;
                }
            } else {
                this.stopLength = this.map.getOverlays().length - 1;
            }
        },
        // playBackState (val) {
        //     console.log('呵呵')
        //     this.reorder();
        //     let max = this.copyMarker.length
        //     let speedTime = this.playTime(20, max, this.playMinTime, this.playMaxTime)
        //     if (val) {
        //         let timeNum = this.timeNum = 0;
        //         if (this.copyMarker.length === this.map.getOverlays().length) {
        //             this.map.clearOverlays();
        //             this.isStop = false;
        //             this.stopLength = 0;
        //         }
        //         if (this.isStop) {
        //                 //  暂停 再开始
        //             this.map.addOverlay(this.copyMarker[this.stopLength]);
        //             this.timer = setInterval(() => {
        //                 timeNum++
        //                 this.timeNum = timeNum;
        //             }, speedTime)
        //             this.isStop = false;
        //         } else {
        //                 //  不暂停
        //             this.timer = setInterval(() => {
        //                 timeNum++
        //                 this.timeNum = timeNum;
        //             }, speedTime)
        //         }
        //     } else {
        //         setTimeout(() => {
        //             this.isStop = true;
        //             this.stopLength = this.map.getOverlays().length;
        //         }, speedTime)
        //     }
        // },
        // timeNum (val) {
        //     console.log(`地图打点${val},地图右${this.map.getOverlays().length}个`)
        //     this.map.addOverlay(this.copyMarker[this.stopLength + val]);
        //     if (this.copyMarker.length === this.map.getOverlays().length) {
        //         clearInterval(this.timer)
        //         clearTimeout(this.timer1)
        //         this.stopLength = 0;
        //         this.timeNum = -1;
        //         this.isStop = false;
        //         this.$emit('alreadyDraw')
        //     }
        // },
        isStop (val) {
            if (val) {
                // clearInterval(this.timer)
            }
        }
    },
    created () {
        Bus.$on('playBackToMap', (val) => {
            this.map.addOverlay(this.copyMarker[this.stopLength + val + 1]);
            if (this.copyMarker.length === this.map.getOverlays().length) {
                // clearInterval(this.timer)
                this.stopLength = 0;
                // this.timeNum = -1;
                // this.isStop = false;
                // this.$emit('alreadyDraw')
            }
        })
    },
    mounted () {
        this.createMap()
    },
    methods: {
        createMap () {
            let map = new BMap.Map('map', { minZoom: 3, maxZoom: 18 })
            this.map = map
            let point = new BMap.Point(this.mapCenter.gMapCenter[0], this.mapCenter.gMapCenter[1])
            map.centerAndZoom(point, 10)
            map.enableScrollWheelZoom();
        },
        createLocus (val) {
            if (!val) {
                val = this.checkObj
            }
            if (!val.leftChecked) {
                return false;
            }
            let map = this.map
            map.clearOverlays();
            let blinkArr = [];
            let locus = [];
            let points = !this.type ? this.mapData.timeSeries : this.mapData.period
            if (!points) {
                return false;
            }
            let baseData = this.mapData.base
            //  打点
            if (!this.type) {
                this.autoCenterZoom(this.map, points)
                this.createPointLine(points, map, baseData, 0);
            } else {
                let pointArr = []
                for (let i = 0; i < this.mapData.days; i++) {
                    pointArr.push([])
                }
                points.forEach((item, index) => {
                    pointArr[index] = item.dataList
                })
                let arr = []
                pointArr.forEach(item => {
                    arr = arr.concat(item)
                })
                this.autoCenterZoom(this.map, arr)
                this.period = []
                this.periodNoShowMap = []
                pointArr.forEach((item, index) => {
                    if (item.length) {
                        this.createPointLine(item, map, baseData, index, true);
                    }
                })
                if (this.periodNoShowMap.length) {
                    let str = this.periodNoShowMap.join('，')
                    this.$message({
                        type: 'warning',
                        message: `第${str}天返回的轨迹点大于500，未进行打点展示`
                    })
                }
            }
            this.mapMarker = this.map.getOverlays();
            this.blinkArr = blinkArr
            this.locus = locus
        },
        createPointLine (points, map, baseData, colorIndex, isPeriod = false) {
             //  点成线
            let pointLine = []
            let pointMarker = []
            if (points.length > 500) {
                if (isPeriod) {
                    this.periodNoShowMap.push(colorIndex + 1)
                } else {
                    this.$message({
                        type: 'warning',
                        message: '返回的轨迹点大于500，请重新选择'
                    })
                }
            } else {
                //  少于 500个 正常打点
                for (let j = 0; j < points.length; j++) {
                    let point = ''
                    let myIcon = ''
                    let lng = pointRandom(points[j].longtitude)
                    let lat = pointRandom(points[j].latitude)
                    // locus[j] = [];
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
                    pointMarker.push(marker)
                    // blinkArr[j].push(marker)
                    // locus[j].push(points[j])
                            //  后端 所给数组顺序: 最新位置为数组第一项 这里把数组顺序改为 最初---最后（新）
                    pointLine.unshift(point)
                    if (j === 0 || j === points.length - 1) {
                        // this.mapLabelShow(marker, baseData, colorIndex)
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
                        if (!isPeriod) {
                            //  位置信息显示
                            me.loadLocation();
                            me.popover = true
                            // 获取 鼠标点击位置的x,y
                            e = e || window.event
                            let x = e.clientX;
                            let y = e.clientY;
                            let xy = me.locationPosition(x, y)
                            me.location(xy.x, xy.y)
                        }
                    })
                }
                if (this.type) {
                    this.period.push(pointMarker)
                }
                this.pointMarker = pointMarker
                let shortLine = [];
                for (let i = 0; i < pointLine.length - 1; i++) {
                    if (i !== pointLine.length - 1) {
                        shortLine.push([pointLine[i], pointLine[i + 1]]);
                    }
                }
                for (let i in shortLine) {
                    let polyline = new BMap.Polyline(shortLine[i], { strokeColor: lineColor[colorIndex],
                        strokeWeight: 2, strokeOpacity: 1 })
                    map.addOverlay(polyline)
                }
                // colorIndex++
            }
        },
        // 自适应 zoom point
        autoCenterZoom (map, points) {
            let pointsArr = [];
            for (let i in points) {
                pointsArr.push({
                    lng: points[i].longtitude,
                    lat: points[i].latitude
                })
            }
            let view = map.getViewport(pointsArr);
            map.centerAndZoom(view.center, view.zoom);
        },
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
        //  重排 pointMarker
        reorder () {
            if (!this.type) {
                let marker = this.mapMarker;
                let markerLength = marker.length;
                let pointLength = this.pointMarker.length;
                let copyMarker = marker.slice(0, pointLength)
                let j = 0;
                for (let i = 0; i < pointLength - 1; i++) {
                    copyMarker.splice(i + j + 1, 0, marker[markerLength - 1 - i])
                    j++;
                }
                copyMarker = copyMarker.reverse();
                this.copyMarker = copyMarker;
            } else {
                let copy = [];
                let start = 0;
                this.period.forEach(item => {
                    let marker = this.mapMarker.slice(start, start + item.length * 2 - 1)
                    let markerLength = marker.length;
                    let pointLength = item.length;
                    let copyMarker = marker.slice(0, pointLength)
                    start = start + item.length * 2 - 1;
                    let j = 0;
                    for (let i = 0; i < pointLength - 1; i++) {
                        copyMarker.splice(i + j + 1, 0, marker[markerLength - 1 - i])
                        j++;
                    }
                    copy = copy.concat(copyMarker)
                })
                this.copyMarker = copy;
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
        //  位置信息加载
        loadLocation () {
            let me = this;
            let data = this.showData;
            let tableData = me.tableData;
            tableData[0].value = data.arriveTime;
            tableData[1].value = data.lac;
            tableData[2].value = data.ci;
            tableData[3].value = '(' + Math.floor(data.longtitude * 100000) / 100000 + ',' +
                Math.floor(data.latitude * 100000) / 100000 + ')'
            tableData[4].value = data.stayTime;
            tableData[5].value = data.placeCname;
            me.tableData = tableData;
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
        }
    }
}
</script>

<style <style lang="postcss" scoped>
#map {
    width: 100%;
    height: 100%;
    position: absolute;
}
@component-namespace multiPath {
    @b popover {
        position: absolute;
        width: 375px;
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
        }
        @e content {
            padding: 5px 10px;
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
            }
        }
    }
}
</style>

