<template>
    <div class="ga-gismap__countent">
        <div class="ga-gismap__map" id="gismap" ref="map"></div>
        <div class="ga-gismap__popover" v-show="popover" ref="popover">
            {{ pointInfo.count }}
            <br>
            {{ pointInfo.time }}
        </div>
        <div class="ga-gismap__legend" v-if="legendShow">
            <p v-for="item in legend"><i :style="{backgroundColor: item.color}"></i><span>{{ item.range }}</span></p>
        </div>
    </div>
</template>

<script>
    import BMap from 'BMap'
    import BMapLib from 'BMapLib'
    import { mapGetters, mapActions } from 'vuex'
    import { isPoint } from 'utils/index.js'
    import { areaMap, provinceMap } from 'common/areaMap'
    import { NEW_HOME_GISMAP_SYMBOL_PATH } from 'constant/BizServiceConfig'
    export default {
        // props: ['renderData', 'dataType', 'areacode', 'showControl'],
        props: {
            renderData: Array,
            dataType: Number,
            areacode: String,
            showControl: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                popover: false,
                pointInfo: {},
                legendShow: true,
                legendMax: 150,
                pointIndex: [5, 6], // dataType 为5或6时，组件gisMap显示打点
                map: null, // 地图元素
                zoom: 10,
                point: null, // 地图中心点
                color: ['#199ED8', '#CC0033'],
                areaOverlay: [], // 各个区边框覆盖物
                heatmapOverlay: '', // 热力图覆盖物
                markerOverlay: [], // 点覆盖物
                labelOverlay: [], // 显示人数的label覆盖物
                radius: 50 // 默认热力图点大小
            }
        },
        mounted () {
            this.createMap()
            // this.createArea('')
        },
        beforeDestory () {
            if (this.map) {
                this.map.removeEventListener('movestart', this.mapHandler);
                this.map.removeEventListener('moveend', this.mapHandler);
                this.map.removeEventListener('zoomstart', this.mapHandler);
                this.map.removeEventListener('zoomend', this.mapHandler);
                this.map = null
            }
        },
        watch: {
            dataType (newval) {
                this.popover = false
                if (!this.pointIndex.includes(newval)) {
                    this.map.centerAndZoom(this.point, 10)
                } else {
                    if (!this.showControl) {
                        // 地图控件不显示时应用于中非页面
                        // 112.983046,28.201149 五一广场的坐标点
                        this.map.centerAndZoom(new BMap.Point(112.983046, 28.201149), 12)
                    }
                }
            },
            areacode() {
                this.remove(this.areaOverlay)
                // this.createArea(newVal)
            }
        },
        computed: {
            ...mapGetters({
                'globalKeys': 'global/globalKeys',
                'gMapMaxZoom': 'global/gMapMaxZoom'
            }),
            // gps热力图图例系数
            legend () {
                let max = this.legendMax;
                if (Math.floor(max * 0.9) > 100) {
                    return [{
                        color: '#E91011',
                        range: `${Math.floor(max * 0.9)} - ${Math.floor(max)}`
                    }, {
                        color: '#FF9E46',
                        range: `${Math.floor(max * 0.8)} - ${Math.floor(max * 0.9)}`
                    }, {
                        color: '#FFEA00',
                        range: `${Math.floor(max * 0.6)} - ${Math.floor(max * 0.8)}`
                    }, {
                        color: '#75D258',
                        range: `${Math.floor(max * 0.4)} - ${Math.floor(max * 0.6)}`
                    }, {
                        color: '#12D1C6',
                        range: `${Math.floor(max * 0.3)} - ${Math.floor(max * 0.4)}`
                    }, {
                        color: '#307BFF',
                        range: `0 - ${Math.floor(max * 0.3)}`
                    }];
                } else {
                    return [{
                        color: '#E91011',
                        range: `90 - 100`
                    }, {
                        color: '#FF9E46',
                        range: `80 - 90`
                    }, {
                        color: '#FFEA00',
                        range: `60 - 80`
                    }, {
                        color: '#75D258',
                        range: `40 - 60`
                    }, {
                        color: '#12D1C6',
                        range: `30 - 40`
                    }, {
                        color: '#307BFF',
                        range: `0 - 30`
                    }];
                }
            },
            // 计算热力点动态半径
            heatRadius () {
                let radius = 30;
                let zoom = this.map.getZoom();  // 4 - 19
                switch (zoom) {
                    case 18:
                        radius = 40;
                        break;
                    case 17:
                        radius = 40;
                        break;
                    case 16:
                        radius = 35;
                        break;
                    case 15:
                        radius = 30;
                        break;
                    case 14:
                        radius = 25;
                        break;
                    case 13:
                        radius = 20;
                        break;
                    case 12:
                        radius = 15;
                        break;
                    case 11:
                        radius = 10;
                        break;
                    default:
                        radius = 5;
                        break;
                }
                return radius
            }
        },
        methods: {
            ...mapActions({
                changeRollState: 'global/changeRollState'
            }),
            // 清除指定覆盖物组
            remove(name) {
                for (let i = 0; i < name.length; i++) {
                    this.map.removeOverlay(name[i]);
                }
            },
            // 加载数据
            loadData(data) {
                this.map.removeOverlay(this.GPSHeatOverlay);
                this.GPSHeatOverlay = ''
                this.remove(this.markerOverlay)
                this.remove(this.labelOverlay)
                // this.renderGPSheat(data)
                if (!this.pointIndex.includes(this.dataType)) {
                    this.legendShow = true
                    this.renderGPSheat(data)
                } else {
                    this.legendShow = false
                    this.creatPoint(data)
                }
            },
            //  创建地图
            createMap () {
                let map = new BMap.Map('gismap', { minZoom: 6, maxZoom: this.gMapMaxZoom })
                this.map = map
                // let { gMapCenter } = this.globalKeys
                let gMapCenter = [113.007839, 28.22063]
                this.point = new BMap.Point(gMapCenter[0], gMapCenter[1])
                if (this.showControl) {
                    let topRightNavigation = new BMap.NavigationControl({
                        anchor: 0,  // 控件位置，左 0，右 1
                        type: 1 // 控件类型
                    });
                    this.map.addControl(topRightNavigation)
                }
                map.centerAndZoom(this.point, this.zoom)
                map.enableScrollWheelZoom();
                this.map.onzoomend = () => {
                    this.loadData(this.renderData);
                }
                // 给地图添加状态监听，并绘制长沙市边框
                this.addEvent()
                let areaCode = provinceMap['changsha'][0]
                this.creatFrame(areaCode)
                // this.setView()
            },
            // 给地图添加状态监听，移动和缩放时停止轮播
            addEvent() {
                let me = this
                this.map.addEventListener('movestart', () => {
                    me.mapHandler(false);
                });
                this.map.addEventListener('moveend', () => {
                    me.mapHandler(true);
                });
                this.map.addEventListener('zoomstart', () => {
                    me.mapHandler(false);
                });
                this.map.addEventListener('zoomend', () => {
                    me.mapHandler(true);
                });
            },
            mapHandler(value) {
                this.changeRollState(value)
            },
            // 长沙市画边框并调整视角
            setView() {
                let gMapKey = this.globalKeys.gMapKey
                let provinceMapPly = new BMap.Polygon(provinceMap[gMapKey][0], {
                    strokeWeight: 1, strokeColor: 'rgba(0,0,0,0)', fillColor: 'rgba(0,0,0,0)'
                });
                this.map.addOverlay(provinceMapPly);
                let pointArray = []
                pointArray = pointArray.concat(provinceMapPly.getPath())
                this.map.setViewport(pointArray);
            },
            // areacode为空时，画海口市各区边框，areacode不为空时，画对应区的边框
            createArea(areacode) {
                let gMapKey = this.globalKeys.gMapKey
                let areas = areaMap[gMapKey]
                let areasKey = Object.keys(areas)
                let areaPoint
                if (areacode !== '') {
                    areaPoint = areas[areacode][0]
                    this.creatFrame(areaPoint)
                } else {
                    areasKey.forEach(item => {
                        areaPoint = areas[item][0]
                        this.creatFrame(areaPoint)
                    })
                }
            },
            // 地图画边框
            creatFrame(areaPoint) {
                let ply = new BMap.Polygon(areaPoint, {
                    strokeWeight: 1.5, strokeColor: '#006AFF', fillColor: 'rgba(0,109,255,0.10)'
                });
                this.map.addOverlay(ply);
                this.areaOverlay.push(ply)
            },
            // 创建点
            creatPoint(data) {
                if (data && data.length) {
                    let max = data[0].count
                    let iconCur = this.color[0]
                    this.pointIndex.forEach((it, index) => {
                        if (this.dataType === it) {
                            iconCur = this.color[index]
                        }
                    })
                    data.forEach(item => {
                        let { lat, lon, lng, count, name, time } = item
                        let curSize = count / max > 0.3 ? count / max : 0.3
                        if (!lng) {
                            lng = lon
                        }
                        if (isPoint(lng, lat)) {
                            let point = new BMap.Point(lng, lat);
                            let marker = new BMap.Marker(point, {
                                // 设置自定义path路径
                                icon: new BMap.Symbol(NEW_HOME_GISMAP_SYMBOL_PATH, {
                                    rotation: 0,
                                    anchor: { width: 20, height: 47 }, // 符号的位置偏移值, width	Number 水平方向的数值, height Number	竖直方向的数值
                                    scale: curSize,
                                    fillColor: iconCur,
                                    fillOpacity: 1,
                                    strokeColor: '#fff',
                                    strokeWeight: 0 // 线宽
                                })
                            });
                            this.map.addOverlay(marker)
                            this.markerOverlay.push(marker)
                            let opts = {
                                position: point,    // 指定文本标注所在的地理位置
                                offset: new BMap.Size(-20, 5)    // 设置文本偏移量
                            }
                            if (this.showControl) {
                                // 地图控件显示时应用于首页
                                let resultLabelStr = name ? `${name}：${count}人` : `${count}人`
                                let label = new BMap.Label(resultLabelStr, opts);  // 创建文本标注对象
                                label.setStyle({
                                    color: '#fff',
                                    fontSize: '12px',
                                    fontFamily: '微软雅黑',
                                    border: 'none',
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    padding: '3px 6px',
                                    borderRadius: '5px'
                                });
                                this.map.addOverlay(label);
                                this.labelOverlay.push(label)
                            } else {
                                // 地图控件不显示时应用于中非页面
                                let me = this
                                marker.addEventListener('click', function (e) {
                                    let nowX = e.pixel.x
                                    let nowY = e.pixel.y
                                    me.location(nowX, nowY)
                                    me.openInfo(count, time)
                                })
                            }
                        }
                    })
                }
            },
            // 为弹出的信息窗定位
            location (nowX, nowY) {
                this.$refs.popover.style.left = nowX - 40 + 'px'
                this.$refs.popover.style.top = nowY + 20 + 'px'
            },
            openInfo (count, time) {
                this.pointInfo = {}
                this.popover = true
                this.pointInfo.count = `累计人员：${count}人`
                this.pointInfo.time = `累计时间：${time}`
            },
            // 关闭信息窗
            colsePopover () {
                this.popover = false
                this.pointInfo = {}
            },
            //  渲染GPS热力图方法
            renderGPSheat (data) {
                this.GPSHeatOverlay = new BMapLib.HeatmapOverlay({
                    'radius': this.heatRadius, // 设置半径大小
                    'gradient': {
                        0.1: '#307BFF',
                        0.3: '#12D1C6',
                        0.4: '#75D258',
                        0.6: '#FFEA00',
                        0.8: '#FF9E46',
                        0.9: '#E91011'
                        // 0.3: 'rgb(0,42, 255)', // lan
                        // 0.5: 'rgb(123, 240, 123)', // lv
                        // 0.6: 'rgb(242, 248, 90)', // huang
                        // // 0.8: 'rgb(247, 73, 66)' // hong
                        // 0.8: 'rgb(255, 0, 0)' // hong
                    }
                });
                this.map.addOverlay(this.GPSHeatOverlay);
                let max = data.length ? data[0].count : 150
                this.legendMax = max
                data.forEach(item => {
                    item.lng = item.lon
                })
                try {
                    this.GPSHeatOverlay.setDataSet({
                        data: data,
                        max: max
                    });
                } catch (error) {
                    console.log('热力图组件未检测到符合标准的热力数据，请检查数据是否正常')
                }
            }
        }
    }
</script>

<style scoped>
    #gismap {
        width: 100%;
        height: 100%;
    }
    @component-namespace ga {
        @b gismap {
            @e countent {
                width: 100%;
                height: 100%;
                position: relative;
            }
            @e map {
                width: 100%;
                height: 100%;
            }
            @e popover {
                position: absolute;
                background: rgba(0, 0, 0, 0.6);
                padding: 5px 10px;
                border-radius: 5px;
                color: #fff;
                font-size: 10px;
                z-index: 1000;
                overflow:hidden;
                line-height: 16px;
            }
            @e legend {
                position: absolute;
                left: 0;
                bottom: 0;
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
        }
    }
</style>
