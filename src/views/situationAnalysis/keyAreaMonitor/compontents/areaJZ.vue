<template>
    <div class="ga-JZMap" >
        <div :id='mapId' class="ga-JZMap__container"></div>
        <div class="ga-JZMap__dectxt" v-if="titleShow">
            <p class="ga-JZMap__decname">
                {{descInfo.Name}}
                <i v-if="crowd >= 60" :class="warnStyle"></i>
            </p>
        </div>
        <div class="ga-JZMap__descWrap" v-if="titleShow">
            <p>当前用户：{{curData}}</p>
            <p>容量：{{capacity[mapId]}}</p>
            <p>拥挤：{{crowd}}%</p>
        </div>
    </div>
</template>

<script>
    import BMap from 'BMap'
    import { mapGetters } from 'vuex'
    import { areaData } from './data.js'
    import BMapLib from 'BMapLib'
    import { ajax } from 'common'
    export default {
        data () {
            return {
                dataUrl: '',
                mapMaxZoom: 18,
                map: '', // 地图元素
                viewPoints: [],
                areaDetails: {},
                borderPoint: [],
                yellowBorder: [],
                descInfo: {},
                mapOpt: [
                    { mapId: 'one', areaId: '1', name: '核心区', rong: '8000', value: 10000 },
                    { mapId: 'two', areaId: '2', name: '管控区', rong: '7.2万', value: 72000 },
                    { mapId: 'three', areaId: '3', name: '河东中心区', rong: '11万(+8)万', value: 160000 },
                    { mapId: 'four', areaId: '4', name: '河西中心区', rong: '16万', value: 150000 },
                    { mapId: 'five', areaId: '5', name: '橘子洲景区', rong: '9万', value: 90000 },
                    { mapId: 'six', areaId: '6', name: '岳麓山景区', rong: '8万', value: 80000 },
                    { mapId: 'seven', areaId: '7', name: '解放西路蔡锷路口至湘江中路', rong: '4.8万', value: 48000 },
                    { mapId: 'eight', areaId: '8', name: '黄兴中路中山亭至南门口', rong: '7.2万', value: 72000 }
                ],
                capacity: {
                    one: '8000',
                    two: '7.2万',
                    three: '11万(+8)万',
                    four: '16万',
                    five: '9万',
                    six: '8万',
                    seven: '4.8万',
                    eight: '7.2万'
                },
                capacityNumber: {
                    one: 10000,
                    two: 72000,
                    three: 160000,
                    four: 150000,
                    five: 90000,
                    six: 80000,
                    seven: 48000,
                    eight: 72000
                },
                curNum: 0,
                heatData: []
            }
        },
        // 传入参数为点集，以及区域边界点数组
        props: ['options', 'curData', 'titleShow'],
        computed: {
            // 取得地市关键字，用于获取地市坐标
            ...mapGetters({
                'globalKeys': 'global/globalKeys',
                'isPhoneJM': 'global/isPhoneJM',
                'dataType': 'global/dataType'
            }),
            mapId() {
                return this.options.mapId
            },
            crowd() {
                let num = (this.curData * 100 / this.capacityNumber[this.mapId]).toFixed(2)
                return Number(num)
            },
            markStyle() {
                let color = 'rgba(0,0,255,0.3)'
                if (this.crowd >= 90) {
                    color = 'rgba(255,0,0,0.3)'
                } else if (this.crowd >= 80) {
                    color = 'rgba(	255,140,0,0.3)'
                } else if (this.crowd >= 70) {
                    color = 'rgba(255,255,0,0.3)'
                }
                return {
                    'background': color
                }
            },
            warnStyle() {
                let warnClass = 'ga-JZMap__normal'
                if (this.crowd >= 90) {
                    warnClass = 'ga-JZMap__danger'
                } else if (this.crowd >= 80) {
                    warnClass = 'ga-JZMap__orange'
                } else if (this.crowd >= 70) {
                    warnClass = 'ga-JZMap__warn'
                }
                return warnClass
            },
            // 处理重点区域范围边界点
            areaArray () {
                let result = []
                // 将边界点坐标转化为地图上的点，并组成数组
                this.borderPoint.map(v => {
                    result.push(new BMap.Point(v[0], v[1]))
                })
                return result
            },
            // 处理黄色重点区域范围边界点
            areaYellowArray () {
                let result = []
                // 将边界点坐标转化为地图上的点，并组成数组
                this.yellowBorder.map(v => {
                    result.push(new BMap.Point(v[0], v[1]))
                })
                return result
            },
            // gps热力图图例系数
            legend () {
                let max = this.gpsMax;
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
                return radius
            }
        },
        mounted () {
            console.log(this.mapId);
            this.getDetailsData(this.mapId)
            this.$nextTick(() => {
                this.createMap()
                this.drawArea()
                this.drawYellowArea()
            })
        },
        methods: {
            getCround() {
                let num = (this.curData * 100 / this.capacityNumber[this.mapId]).toFixed(4)
                this.crowd = Number(num)
            },
            // 创建地图
            createMap () {
                // 在id为container的div中画地图
                this.map = new BMap.Map(this.mapId, { enableMapClick: false, minZoom: 4, maxZoom: this.mapMaxZoom })
                let point = new BMap.Point(this.globalKeys.gMapCenter[0], this.globalKeys.gMapCenter[1])
                // 设置地图中心点以及缩放zoom
                this.map.centerAndZoom(point, 17)
                this.map.onzoomend = () => {
                    this.renderGPSheat(this.heatData);
                }
                // 允许地图进行滚轮缩放
                this.map.enableScrollWheelZoom();
            },
            //  渲染GPS热力图方法
            renderGPSheat (data) {
                this.map.removeOverlay(this.GPSHeatOverlay);
                this.GPSHeatOverlay = new BMapLib.HeatmapOverlay({
                    'radius': this.heatRadius, // 设置半径大小
                    'gradient': {
                        0.1: '#307BFF',
                        0.3: '#12D1C6',
                        0.4: '#75D258',
                        0.6: '#FFEA00',
                        0.8: '#FF9E46',
                        0.9: '#E91011'
                    }
                });
                this.map.addOverlay(this.GPSHeatOverlay);
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
            // 热地图接口
            // 热地图相关
            getHeat(id) {
                this.heatData = []
                this.dataUrl = this.dataType ? 'focus/getHot2' : 'focus/getHot'
                ajax.post(this.dataUrl, { areaId: id }).then(resp => {
                    let { gps, xishu } = resp.data;
                    if (xishu && xishu.length) {
                        this.gpsMax = xishu[0];
                    }
                    if (gps) {
                        gps.forEach(item => {
                            this.heatData.push({
                                lng: item.lon,
                                lat: item.lat,
                                count: item.counts
                            })
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 画区域
            drawArea() {
                this.borderPoint = this.areaDetails.geometry.coordinates[0]
                if (this.borderPoint === undefined) {
                    return;
                }
                this.map.setViewport(this.areaArray)
                let ply = new BMap.Polygon(this.areaArray,
                    {
                        strokeColor: '#0072ff',
                        strokeWeight: 3,
                        strokeOpacity: 0.7,
                        fillColor: '#0072ff',
                        fillOpacity: 0.001
                    }); // 建立多边形覆盖物
                this.map.addOverlay(ply);
            },
            // 画黄色区域
            drawYellowArea() {
                this.yellowBorder = this.areaDetails.geometry.coordinates[1]
                if (this.yellowBorder !== undefined) {
                    this.map.setViewport(this.areaYellowArray)
                    let ply = new BMap.Polygon(this.areaYellowArray,
                        {
                            strokeColor: '#CDC807',
                            strokeWeight: 3,
                            strokeOpacity: 0.7,
                            fillColor: '#CDC807',
                            fillOpacity: 0.001
                        }); // 建立多边形覆盖物
                    this.map.addOverlay(ply);
                }
            },
            getDetailsData(val) {
                let result = areaData().features
                result.forEach(item => {
                    if (item.type === val) {
                        this.areaDetails = item
                    }
                })
                this.descInfo = this.areaDetails.properties
            }
        },
        watch: {
            heatData(newVal) {
                this.renderGPSheat(newVal)
            }
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b JZMap {
            height:100%;
            width:100%;
            position: relative;
            @e container{
                height:100%;
                width:100%;
            }
            @e dectxt{
                width:100%;
                position: absolute;
                left:0;
                top:0;
                background: rgba(0,0,0,0.6);
            }
            @e decname{
                height: 26px;
                line-height: 26px;
                font-weight: bold;
                text-align: center;
                i{
                    position: absolute;
                    top: 0px;
                    right: 4px;
                    height: 23px;
                    width: 22px;
                }
            }
            @e descWrap{
                position: absolute;
                left: 0;
                bottom: 0;
                padding: 4px 12px;
                background: rgba(0,0,0,0.6);
            }
            @e maskWrap{
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
            }
            @e normal{
                background:url("~assets/images/warning/3.png") no-repeat 0 center;
            }
            @e warn{
                background:url("~assets/images/warning/2.png") no-repeat 0 center;
                background-size: contain;
            }
            @e danger{
                background:url("~assets/images/warning/1.png") no-repeat 0 center;
            }
            @e orange{
                background:url("~assets/images/warning/4.png") no-repeat 0 center;
            }
        }
    }
</style>
