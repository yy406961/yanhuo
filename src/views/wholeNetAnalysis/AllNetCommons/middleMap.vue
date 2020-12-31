<template>
    <div>
        <div id="realTimeMiddleMap"></div>
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
                <div style="padding: 5px 10px">
                    位置信息
                </div>
                <div >
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
    import { startDrag, pointRandom } from 'utils'
    import { mapGetters } from 'vuex'
    import { phoneNumChange } from 'utils/index'
    import tableComp from 'components/Table'
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
                color: ['rgb(255, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 158, 215)', 'rgb(59, 0, 0)', 'rgb(30, 101, 19)'],
                icon: [RED, RED, RED, RED, RED],
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
        props: ['option', 'part'],
        mounted () {
            this.createMap()
        },
        components: {
            tableComp
        },
        watch: {
            option () {
                this.createPoint()
            }
        },
        computed: {
            ...mapGetters({
                'isPhoneJM': 'global/isPhoneJM',
                'mapCenter': 'global/globalKeys'
            })
        },
        methods: {
//            showMiddleMap () {
//                this.$emit('openMiddleMap', this.option.center, this.option.info)
//            },
            setLabelShow (marker, message, colorIndex) {
                let label = new BMap.Label(message,
                    { offset: new BMap.Size(5, 0) })
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
                let map = new BMap.Map('realTimeMiddleMap', { minZoom: 3, maxZoom: 18 })
                this.map = map
                this.zoom = this.part === 'nation' ? this.zoom : 10
                let point = new BMap.Point(this.mapCenter.gMapCenter[0], this.mapCenter.gMapCenter[1])
                map.centerAndZoom(point, this.zoom)
                map.enableScrollWheelZoom();
                this.createPoint()
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
//                map.centerAndZoom(this.option.center, 9)
                map.clearOverlays();
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

                for (let i = pointArr.length - 1; i >= 0; i--) {
                    if (pointArr[i].longtitude && pointArr[i].latitude) {
                        let point = new BMap.Point(pointRandom(pointArr[i].longtitude), pointRandom(pointArr[i].latitude))
                        let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(25, 29))
                        let marker = new BMap.Marker(point, { icon: myIcon })
                        myIcon.setAnchor(new BMap.Size(10, 19))
                        map.addOverlay(marker)
                        this.setLabelShow(marker, pointArr.length - i, 1)
                        lineArr.push(point)
                        let me = this;
                        marker.addEventListener('click', function (e) {
                            let perMsg = {
                                name: me.option.detail[i].name,
                                phone: me.isPhoneJM ? phoneNumChange(me.option.detail[i].msisdn)
                                    : me.option.detail[i].msisdn
                            }
                            me.showData = me.option.detail[i]
                            me.perMsg = perMsg
                            //  位置信息显示
                            me.loadLocation();
                            me.popover = true
                            e = e || window.event
                            let x = e.clientX;
                            let y = e.clientY;
                            let xy = me.locationPosition(x, y)
                            me.location(xy.x, xy.y)
                        })
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
            },
            //  位置信息
            loadLocation () {
                let me = this;
                let data = this.showData;
                let tableData = me.tableData;
                tableData[0].value = data.presentTime;
                tableData[1].value = data.lac;
                tableData[2].value = data.ci;
                tableData[3].value = '(' + Math.floor(data.longtitude * 100000) / 100000 + ',' +
                    Math.floor(data.latitude * 100000) / 100000 + ')'
                tableData[4].value = data.stayTimes;
                tableData[5].value = data.placeCname;
                me.tableData = tableData;
            },
            //  详情框 显示位置
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
            //  小弹框 显示位置
            locationPosition (x, y) {
                let mapWidth = $('#realTimeMiddleMap').width();
                let mapHeight = $('#realTimeMiddleMap').height();
                let popWidth = $('#pop').width();
                let popHeight = $('#pop').height();
                if (x < 58 + mapWidth - popWidth) {
                    x -= 58
                    if (y > 125 + mapHeight - popHeight) {
                        y -= popHeight + 39
                    } else {
                        y = 0
                    }
                } else {
                    x -= popWidth + 58
                    if (y > 125 + mapHeight - popHeight) {
                        y -= popHeight + 39
                    } else {
                        y = 0
                    }
                }
                return { x, y }
            },
            //  关闭详情框
            close () {
                this.popover = false
            }
        }
    }
</script>

<style scoped lang="postcss">
    #realTimeMiddleMap {
        width: 95%;
        height: 90%;
        /*margin-top: 5%;*/
        position: absolute;
    }
    @component-namespace ga {
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
