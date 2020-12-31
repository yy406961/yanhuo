<template>
    <div class="ga-dialogMap" >
        <div id='map' class="ga-dialogMap__container"></div>
        <div class="ga-dialogMap__legend">
            <p v-for="(item, index) in legend" :key="index">
                <i :style="{backgroundColor: item.color}"></i>
                <span>{{ item.range }}</span>
            </p>
        </div>
    </div>
</template>

<script>
    import BMap from 'BMap'
    import BMapLib from 'BMapLib'
    import { mapGetters } from 'vuex'
    import { areaData } from './data.js'
    const CAR = './static/vendor/gis/baidumapv2/images/car.png'
    import { ajax } from 'common'
    export default {
        data () {
            return {
                mapMaxZoom: 18,
                ply: '',
                yellowPly: '',
                map: '', // 地图元素
                viewPoints: [],
                areaDetails: {},
                borderPoint: [],
                yellowBorder: [],
                GPSHeatOverlay: '',
                // 基站车
                carLONPoint: [
                    { name: '移动-国家开发银行', value: 1265, lon: '112.97715889465972', lat: '28.190032624159155' },
                    { name: '移动-杜甫江阁', value: 5860, lon: '112.97618715938054', lat: '28.190032624159155' },
                    { name: '联通-芒果馆', value: 3685, lon: '113.05719392098773', lat: '28.24103216285621' },
                    { name: '联通-杜甫江阁', value: 2605, lon: '112.97543563126169', lat: '28.19009492478831' },
                    { name: '电信', value: 3685, lon: '112.9765950689', lat: '28.1901297496' },
                    { name: '电信-3：', value: 3685, lon: '113.057079', lat: '28.241741' }
                ],
                carData: [],
                carOverlays: [],
                carIcon: CAR,
                timer: null
            }
        },
        // 传入参数为点集，以及区域边界点数组
        props: ['mapId', 'heatData', 'gpsMax'],
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
                    range: `>= ${max}`
                }, {
                    color: '#FF9E46',
                    range: `${Math.floor(max * 0.9)} - ${Math.floor(max * 1)}`
                }, {
                    color: '#FFEA00',
                    range: `${Math.floor(max * 0.6)} - ${Math.floor(max * 0.9)}`
                }, {
                    color: '#75D258',
                    range: `${Math.floor(max * 0.5)} - ${Math.floor(max * 0.6)}`
                }, {
                    color: '#12D1C6',
                    range: `${Math.floor(max * 0.2)} - ${Math.floor(max * 0.5)}`
                }, {
                    color: '#307BFF',
                    range: `0 - ${Math.floor(max * 0.2)}`
                }];
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
            this.createMap()
            this.getDetailsData(this.mapId)
            if (this.mapId === 'two') {
                this.getCarPoint(this.carLONPoint)
                // this.getcarData()
                // this.rollPoling(true)
            }
        },
        methods: {
            // 创建地图
            createMap () {
                // 在id为container的div中画地图
                this.map = new BMap.Map('map', { enableMapClick: false, minZoom: 4, maxZoom: this.mapMaxZoom })
                let point = new BMap.Point(this.globalKeys.gMapCenter[0], this.globalKeys.gMapCenter[1])
                // 设置地图中心点以及缩放zoom
                this.map.centerAndZoom(point, 17)
                this.map.onzoomend = () => {
                    if (this.heatData && this.heatData.length) this.renderGPSheat(this.heatData);
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
                        0: '#307BFF',
                        0.2: '#12D1C6',
                        0.5: '#75D258',
                        0.6: '#FFEA00',
                        0.9: '#FF9E46',
                        1: '#E91011'
                    }
                });
                this.map.addOverlay(this.GPSHeatOverlay);
                // let max = this.gpsMax > 100 ? this.gpsMax : 100
                try {
                    this.GPSHeatOverlay.setDataSet({
                        data: data,
                        max: data[0].count * 1.8
                    });
                } catch (error) {
                    console.log('热力图组件未检测到符合标准的热力数据，请检查数据是否正常')
                }
            },
            // 画区域
            drawArea() {
                if (this.ply) this.map.removeOverlay(this.ply)
                this.borderPoint = []
                let pointArr = []
                this.borderPoint = this.areaDetails.geometry.coordinates[0]
                pointArr = this.areaArray(this.borderPoint)
                this.map.setViewport(pointArr)
                this.ply = new BMap.Polygon(pointArr,
                    {
                        strokeColor: '#0072ff',
                        strokeWeight: 3,
                        strokeOpacity: 0.7,
                        fillColor: '#0072ff',
                        fillOpacity: 0.001
                    }); // 建立多边形覆盖物
                this.map.addOverlay(this.ply);
            },
            // 画黄色区域
            drawYellowArea() {
                if (this.yellowPly) this.map.removeOverlay(this.yellowPly)
                this.yellowBorder = []
                let pointArr = []
                this.yellowBorder = this.areaDetails.geometry.coordinates[1]
                pointArr = this.areaYellowArray(this.yellowBorder)
                this.map.setViewport(pointArr)
                this.yellowPly = new BMap.Polygon(pointArr,
                    {
                        strokeColor: '#CDC807',
                        strokeWeight: 3,
                        strokeOpacity: 0.7,
                        fillColor: '#CDC807',
                        fillOpacity: 0.001
                    }); // 建立多边形覆盖物
                this.map.addOverlay(this.yellowPly);
            },
            getDetailsData(val) {
                let result = areaData().features
                result.forEach(item => {
                    if (item.type === val) {
                        this.areaDetails = item
                        this.drawArea()
                        this.drawYellowArea()
                    }
                })
            },
            // 处理重点区域范围边界点
            areaArray (data) {
                let result = []
                // 将边界点坐标转化为地图上的点，并组成数组
                data.map(v => {
                    result.push(new BMap.Point(v[0], v[1]))
                })
                return result
            },
            // 处理黄色重点区域范围边界点
            areaYellowArray (data) {
                let result = []
                // 将边界点坐标转化为地图上的点，并组成数组
                data.map(v => {
                    result.push(new BMap.Point(v[0], v[1]))
                })
                return result
            },
            // 基站车数据
            getcarData() {
                this.carData = []
                ajax.post('focus/getUliCarCount').then(resp => {
                    let { data } = resp
                    this.carData = data
                })
            },
            // 基站车相关
            getCarPoint(data = []) {
                this.removeOverlays(this.carOverlays)
                data.forEach(item => {
                    let { lon, lat } = item
                    let point = new BMap.Point(lon, lat);
                    let myIcon = new BMap.Icon(this.carIcon, new BMap.Size(25, 29), {
                        imageSize: new BMap.Size(20, 27)
                    })
                    let marker = new BMap.Marker(point, { icon: myIcon })
                    // let str = name + '：' + value
                    // let label = new BMap.Label(str, { offset: new BMap.Size(20, 30) })
                    // label.setStyle({
                    //     color: '#fff',
                    //     fontSize: '12px',
                    //     fontFamily: '微软雅黑',
                    //     border: 'none',
                    //     backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    //     padding: '3px 6px',
                    //     borderRadius: '5px'
                    // });
                    // marker.setLabel(label);
                    this.map.addOverlay(marker)
                    this.carOverlays.push(marker)
                    // new BMapLib.MarkerClusterer(this.map, { markers: this.carOverlays });
                })
            },
            // 清除指定覆盖物组
            removeOverlays(name) {
                for (let i = 0; i < name.length; i++) {
                    this.map.removeOverlay(name[i]);
                }
            },
            rollPoling (isTurnOn) {
                if (isTurnOn) {
                    this.timer = setInterval(() => {
                        this.getcarData()
                    }, 300000)
                } else {
                    clearInterval(this.timer)
                }
            }
        },
        watch: {
            heatData(newVal) {
                if (newVal && newVal.length) this.renderGPSheat(newVal)
            },
            carData(newVal) {
                if (newVal && newVal.length) this.getCarPoint(newVal)
            }
        },
        beforeDestroy () {
            // 关闭轮询
            this.rollPoling(false)
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b dialogMap {
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
                    height: 22px;
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
            @e normal{
                background:url("~assets/images/warning/3.png") no-repeat 0 center;
            }
            @e warn{
                background:url("~assets/images/warning/2.png") no-repeat 0 center;
            }
            @e danger{
                background:url("~assets/images/warning/1.png") no-repeat 0 center;
            }
            @e legend {
                position: absolute;
                left: 0;
                bottom: 4px;
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
