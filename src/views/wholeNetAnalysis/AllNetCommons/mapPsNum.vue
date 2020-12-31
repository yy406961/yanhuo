<template>
    <div>
        <div id="mapPsNum"></div>
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
                        <span></span>基本信息
                    </el-row>
                </el-col>
            </el-row>
            <el-row style="padding: 5px 33px">
                {{baseData[0].name + ':' + baseData[0].value}}&nbsp;&nbsp;
                {{baseData[1].name + ':' + baseData[1].value}}
            </el-row>
            <el-row>
                <el-col :span="22" :offset="1" class="ga-title">
                    <el-row>
                        <span></span>位置信息
                    </el-row>
                </el-col>
                <div class="ga-popover__content">
                    <ul>
                        <template v-for="item in tableData">
                            <li>{{item.name}}</li>
                        </template>
                    </ul>
                    <ul>
                        <template v-for="item in tableData">
                            <div>
                                <li>{{item.value}}</li>
                            </div>
                        </template>
                    </ul>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
    import BMap from 'BMap'
    import { startDrag, pointRandom } from 'utils'
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
                color: ['rgb(255, 0, 0)', 'rgb(0, 4, 253)', 'rgb(0, 158, 215)', 'rgb(59, 0, 0)', 'rgb(30, 101, 19)'],
                icon: [RED, RED, RED, RED, RED],
                tableData: [
                    { name: '使用时间', value: ' ' },
                    { name: '位置坐标', value: ' ' },
                    { name: '最后位置', value: ' ' }
                ],
                baseData: [
                    { name: '机身码', value: '' },
                    { name: '卡号', value: '' }
                ]
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
            'chooseNum' () {
                this.flicker();
            },
            'labelShow.showName' () {
                this.createPoint()
            },
            'labelShow.showNum' () {
                this.createPoint()
            }
        },
        computed: {
            ...mapGetters({
                'mapCenter': 'global/globalKeys'
            })
        },
        methods: {
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
//                console.log(resp.rows)
                this.$emit('bigToSmall', this.smallMapCenter, pointData, resp.rows)
//                this.loadLocation();
            },
            //  显示名字和号码信息label
            mapLabelShow (marker, val) {
                let labelName = '';
                let labelMsisdn = '';
                labelName = val.name;
                labelMsisdn = val.msisdn;
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
//                if (!labelShow.showName && !labelShow.showNum) {
//                    this.removeMapLable();
//                }
            },
            //  移除名字和号码信息label
            removeMapLable () {
                let markerArr = this.map.getOverlays();
                for (let i in markerArr) {
                    this.map.removeOverlay(markerArr[i].getLabel());
                }
            },
            //  创建地图
            createMap () {
                let map = new BMap.Map('mapPsNum', { minZoom: 3, maxZoom: 18 })
                this.map = map
                this.zoom = this.part === 'nation' ? this.zoom : 10
                let point = new BMap.Point(this.mapCenter.gMapCenter[0], this.mapCenter.gMapCenter[1])
                map.centerAndZoom(point, this.zoom)
                map.enableScrollWheelZoom();
            },
            //  画点
            createPoint () {
                console.log(this.option.info)
                let map = this.map
                map.clearOverlays();
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
                if (this.option.info.length < 500) {
                    let pointArr = []
                    let lineArr = []
                    let colorIndex = 0
                    for (let i = 0; i < this.option.info.length; i++) {
                        colorIndex = colorIndex === 5 ? 0 : colorIndex
                        let points = this.option.info[i].point
//                    找到号码 如果坐标点为空 不进行打点
                        if (points.longtitude && points.latitude) {
                            pointArr[this.option.info[i].msisdn] = []
                            lineArr[this.option.info[i].msisdn] = []
                            let point = new BMap.Point(pointRandom(points.longtitude), pointRandom(points.latitude))
                            let myIcon = new BMap.Icon(this.icon[colorIndex], new BMap.Size(25, 29))
                            let marker = new BMap.Marker(point, { icon: myIcon })
                            map.addOverlay(marker)
                            this.mapLabelShow(marker, this.option.info[i])
                            let me = this;
                            marker.addEventListener('click', function (e) {
                                let perMsg = {
                                    name: me.option.info[i].name,
                                    phone: me.option.info[i].msisdn
                                }
                                me.perMsg = perMsg
                                me.smallMapCenter = point;
//                        位置信息显示
                                me.showData = me.option.info[i];
                                me.loadLocation();
                                me.popover = true
                                e = e || window.event
                                let x = e.clientX;
                                let y = e.clientY;
                                let xy = me.locationPosition(x, y)
                                me.location(xy.x, xy.y)
                                console.log(me.showData)
//                                me.clickDetail(me.option.info[i].msisdn + '&' + me.option.info[i].name + '$');
                            })
                            pointArr[this.option.info[i].msisdn].push(marker)
                        }
                        colorIndex++
                        this.pointArr = pointArr
                    }
                }
            },
            //  小弹框 显示位置
            locationPosition (x, y) {
                let mapWidth = $('#mapPsNum').width();
                let mapHeight = $('#mapPsNum').height();
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
            //  位置信息加载
            loadLocation () {
                let me = this;
                let data = this.showData;
                let tableData = this.tableData;
                console.log(data)
                let baseData = this.baseData;
                baseData[0].value = data.imei;
                baseData[1].value = data.imsi;
                tableData[0].value = data.userTime;
                tableData[1].value = '(' + Math.floor(data.point.longtitude * 100000) / 100000 + ',' +
                    Math.floor(data.point.latitude * 100000) / 100000 + ')'
                tableData[2].value = data.lastLocation;
                me.tableData = tableData;
            },
            //  关闭详情框
            close () {
                this.popover = false
                this.popoverContent = 0
            },
            flicker () {
                if (timer) {
                    clearInterval(timer)
                }
                let point = []
                for (let key in this.pointArr) {
                    if (parseInt(key) === parseInt(this.chooseNum)) {
                        point = this.pointArr[key]
                    }
                }
                let display = true
                let i = 0
                var timer = setInterval(function () {
                    if (display) {
                        for (let i = 0; i < point.length; i++) {
                            point[i].hide()
                        }
                        display = false
                    } else {
                        for (let i = 0; i < point.length; i++) {
                            point[i].show()
                        }
                        i++
                        display = true
                    }
                    if (i === 5) {
                        clearInterval(timer)
                    }
                }, 500)
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
            }
        }
    }
</script>

<style scoped lang="postcss">
    #mapPsNum {
        width: 100%;
        height: 100%;
        position: absolute;
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
            height: 200px;
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
                height: 160px;
                text-align: center;
                & ul:first-child {
                    display: inline-block;
                }
                & ul:first-child li {
                    width: 100px;
                    height: 30px;
                    line-height: 30px;
                    /*background-color: #7FC7DE;*/
                    overflow-y: hidden;
                }
                & ul:last-child {
                    display: inline-block;
                    /*width: 250px;*/
                    overflow: auto;
                }
                & ul:last-child li {
                    width: 250px;
                    height: 30px;
                    line-height: 30px;
                    /*background-color: #7FC7DE;*/
                    overflow-y: hidden;
                    white-space: nowrap;
                    & div {
                        min-width: 250px;
                        max-width: 400px;
                    }
                }
                & li:not(last-child) {
                    /*border-top: 1px solid #CCCCCC;*/
                    /*border-left: 1px solid #CCCCCC;*/
                    /*border-right: 1px solid #CCCCCC;*/
                }
                & li:last-child {
                    /*border-bottom: 1px solid #CCCCCC;*/
                }
            }
        }
    }
</style>
