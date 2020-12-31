<template lang="html">
        <div id="mapArea_demo" class="demo-mapArea__container" ></div>
</template>

<script>
const CIRCLE = './static/vendor/gis/baidumapv2/images/red.png'
import BMapLib from 'BMapLib'
import { mapGetters } from 'vuex'
export default {
    name: 'mapArea',
    data() {
        return {
            map: '',
            overlays: [],
            getOverlay: null,
            drawingManager: {},
            polygon: '',
            circle: '',
            clearOption: false,
            styleOptions: {
                strokeColor: 'red', // 边线颜色。
                fillColor: 'red', // 填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 1, // 边线的宽度，以像素为单位。
                strokeOpacity: 0.8, // 边线透明度，取值范围0 - 1。
                fillOpacity: 0.4, // 填充的透明度，取值范围0 - 1。
                strokeStyle: 'solid' // 边线的样式，solid或dashed。
            },
            mapLength: null,
            drawingMode: '',
            icon: [CIRCLE],
            opts: {
                width: 250, // 信息窗口宽度
                height: 0, // 信息窗口高度
                enableMessage: true // 设置允许信息窗发送短息
            },
            content: '',
            marker: ''
        }
    },
    props: ['option', 'mapTool'],
    methods: {
        // 创建地图
        createMap() {
            this.map = new BMap.Map('mapArea_demo', { minZoom: 3, maxZoom: 18 })
            // 清除所有覆盖物
            this.map.clearOverlays()
            // 找中心点坐标
            const poi = new BMap.Point(116.373778, 40.104674)
            this.map.centerAndZoom(poi, 16)
            this.map.enableScrollWheelZoom()
            // 实例化鼠标绘制工具
            this.drawingManager = new window.BMapLib.DrawingManager(this.map, {
                isOpen: false, // 是否开启绘制模式
                enableDrawingTool: true, // 是否显示工具栏
                drawingToolOptions: {
                    anchor: window.BMAP_ANCHOR_TOP_RIGHT, // 位置
                    offset: new BMap.Size(5, 5), // 偏离值
                    // 鼠标绘制工具
                    drawingModes: [
                        window.BMAP_DRAWING_POLYGON,
                        window.BMAP_DRAWING_CIRCLE,
                        window.BMAP_DRAWING_RECTANGLE
                    ]
                },
                circleOptions: this.styleOptions, // 圆的样式
                polylineOptions: this.styleOptions, // 线的样式
                polygonOptions: this.styleOptions, // 多边形的样式
                rectangleOptions: this.styleOptions // 矩形的样式
            })
            this.drawingManager.addEventListener('overlaycomplete', this.overlaycomplete)
        },
        // 画多边形
        createPolygon(option) {
            // 清除所有覆盖物
            this.map.clearOverlays()
            let { areaBorder } = option
            let markData = []
            // 取基站点信息
            option.cellInfo.map(item => {
                markData.push(item)
            })
            // 打点
            if (markData.length) {
                this.map.enableScrollWheelZoom()
                for (let i = 0; i < markData.length; i++) {
                    let itemPoint = markData[i]
                    if (itemPoint) {
                        let { latitude, longtitude, areaBaseInfoId } = itemPoint
                        let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(25, 29))
                        let point = new BMap.Point(Number(longtitude), Number(latitude))
                        let marker = new BMap.Marker(point, { icon: myIcon })
                        this.map.addOverlay(marker)
                        let me = this
                        marker.addEventListener('click', function(e) {
                            let cellCoordinate = {
                                longtitude: Number(longtitude),
                                latitude: Number(latitude),
                                areaBaseInfoId: areaBaseInfoId
                            }
                            me.getCellInfoDetail(cellCoordinate, e.target)
                        })
                    }
                }
            }
            let mapData = []
            // 画区域边界
            areaBorder.map(item => {
                mapData.push(item)
            })
            if (mapData.length) {
                // 画圆形区域
                if (mapData.length === 1) {
                    let borderData = JSON.parse(mapData[0])
                    let point = new BMap.Point(borderData.longtitude, borderData.latitude)
                    // 根据接收的坐标重新找地图中心点
                    this.map.panTo(point)
                    this.map.enableScrollWheelZoom()
                    let pointCircle = {
                        lng: borderData.longtitude,
                        lat: borderData.latitude
                    }
                    // 创建圆形
                    this.circle = new BMap.Circle(pointCircle, borderData.radius, this.styleOptions)
                    // 添加圆形覆盖物
                    this.map.addOverlay(this.circle)
                    // 使覆盖物处于可编辑状态
                    this.circle.enableEditing()
                    // 将覆盖物push到overlays里面（判断覆盖物的个数）
                    this.overlays.push(this.circle)
                } else {
                    // 画多边形区域
                    let borderData = mapData[0]
                    if (borderData) {
                        let center = new BMap.Point(borderData.longtitude, borderData.latitude)
                        this.map.panTo(center)
                        this.map.enableScrollWheelZoom()
                        let points = []
                        for (var i = 0; i < mapData.length; i++) {
                            points.push(new BMap.Point(mapData[i].longtitude, mapData[i].latitude))
                        }
                        this.polygon = new BMap.Polygon(points, this.styleOptions) // 创建多边形
                        this.map.addOverlay(this.polygon)
                        this.overlays.push(this.polygon)
                    }
                    // 使多边形处于可编辑状态
                    this.polygon.enableEditing()
                }
            }
        },
        // 鼠标画图时触发的方法
        overlaycomplete(e) {
            // 获取鼠标画图工具（圆形、多边形）
            this.drawingMode = e.drawingMode
            this.overlays.push(e.overlay)
            this.mapLength = this.overlays.length
            this.getOverlay = e.overlay
            this.getOverlay.enableEditing()
            // 关闭画图工具(关闭之后才可以进行编辑图形操作)
            this.drawingManager.close()
            if (this.overlays.length > 1) {
                this.$message('每次只能框选一个区域,请重新框选')
                this.getOverlay = e.overlay
                let path = this.getOverlay.getPath()
                let pathObj = {
                    mapLength: this.mapLength,
                    path: path
                }
                this.$emit('mapCoordinate', pathObj)
                //                    this.drawingManager.open()
            }
            //                else {
            //                    this.getOverlay = e.overlay
            //                    this.getOverlay.enableEditing()
            //                    // 关闭画图工具(关闭之后才可以进行编辑图形操作)
            //                    this.drawingManager.close()
            //                }
        },
        // 清除已框选的区域
        clearAll() {
            for (var i = 0; i < this.overlays.length; i++) {
                this.map.removeOverlay(this.overlays[i])
            }
            this.overlays.length = 0
            this.clearOption = true
            this.getOverlay = null
            this.map.clearOverlays()
        },
        editMap() {
            this.drawingManager.close()
            this.getOverlay.enableEditing()
        },
        // 获取鼠标框选区域的信息
        getOverLayData() {
            if (this.getOverlay) {
                this.getOverlay.disableEditing()
                // 框选圆形区域
                if (this.drawingMode === 'circle') {
                    // 获取圆的中心点和半径
                    let radius = this.getOverlay.getRadius()
                    let lng = this.getOverlay.getCenter().lng
                    let lat = this.getOverlay.getCenter().lat
                    let area = 3.1415926 * radius * radius / 1000000
                    let map = ['circle', radius, lng, lat, area]
                    this.$emit('mapCoordinate', map)
                    // 框选多边形区域
                } else {
                    // 获取多边形顶点的坐标
                    let path = this.getOverlay.getPath()
                    // 获取多边形的面积
                    let ply = new BMap.Polygon(path)
                    let area = BMapLib.GeoUtils.getPolygonArea(ply) / 1000000
                    let pathObj = {
                        mapLength: this.mapLength,
                        path: path,
                        acreage: area
                    }
                    let latstr = pathObj.path
                        .map(it => {
                            return `new BMap.Point(${it.lng}, ${it.lat})`
                        })
                        .join(',')
                    console.log('point Code--->', latstr)
                    this.$emit('mapCoordinate', pathObj)
                }
            }
        },
        // 地图框选完成后获取坐标传给父组件
        finishMap() {
            // 接收父组件option传过来的区域坐标信息（已选区域修改点击小图出现大图）
            if (this.option.areaBorder.length) {
                // 如果修改已选区域时，删除重新框选
                if (this.clearOption) {
                    this.getOverLayData()
                } else {
                    if (this.option.areaBorder.length === 1) {
                        this.circle.disableEditing()
                        let radius = this.circle.getRadius()
                        let lng = this.circle.getCenter().lng
                        let lat = this.circle.getCenter().lat
                        let area = 3.1415926 * radius * radius / 1000000
                        let map = ['circle', radius, lng, lat, area]
                        this.$emit('mapCoordinate', map)
                    } else {
                        this.polygon.disableEditing()
                        let path = this.polygon.getPath()
                        let ply = new BMap.Polygon(path)
                        let area = BMapLib.GeoUtils.getPolygonArea(ply) / 1000000
                        let pathObj = {
                            mapLength: 1,
                            path: path,
                            acreage: area
                        }
                        this.$emit('mapCoordinate', pathObj)
                    }
                }
                // 重新框选地图获取坐标
            } else if (this.getOverlay) {
                this.getOverLayData()
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.createMap()
            this.createPolygon(this.option)
        })
    },
    watch: {
        option(val) {
            this.$nextTick(() => {
                if (val) {
                    this.createPolygon(val)
                }
            })
        }
    },
    beforeDestory() {
        this.map = null
        this.overlays = []
        this.drawingManager = null
    },
    computed: {
        ...mapGetters({
            mapCenter: 'global/globalKeys'
        })
    }
}
</script>

<style scoped>
@component-namespace demo {
    @b mapArea {
        @e container {
            width: 100%;
            height: 100%;
            margin: 0;
        }
    }
}
</style>
