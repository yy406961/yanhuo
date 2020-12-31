<template>
    <div class="ga-mapArea" >
        <div id="mapArea" class="ga-mapArea__container"></div>
    </div>
</template>
<script>
    export default {
        name: 'mapArea',
        data () {
            return {
                map: '',
                mapData: null,
                overlays: [],
                getOverlay: null,
                drawingManager: {},
                polygon: '',
                circle: '',
                clearOption: false,
                styleOptions: {
                    strokeColor: 'red',    // 边线颜色。
                    fillColor: 'red',      // 填充颜色。当参数为空时，圆形将没有填充效果。
                    strokeWeight: 1,       // 边线的宽度，以像素为单位。
                    strokeOpacity: 0.8,	   // 边线透明度，取值范围0 - 1。
                    fillOpacity: 0.4,      // 填充的透明度，取值范围0 - 1。
                    strokeStyle: 'solid' // 边线的样式，solid或dashed。
                }
            }
        },
        props: ['option'],
        methods: {
            createMap () {
                this.map = new BMap.Map('mapArea', { minZoom: 3, maxZoom: 18 });
                this.map.clearOverlays();
                const poi = new BMap.Point(106.26667, 38.46667);
                this.map.centerAndZoom(poi, 14);
                this.map.enableScrollWheelZoom();
                this.styleOptions;
                // 实例化鼠标绘制工具
                this.drawingManager = new window.BMapLib.DrawingManager(this.map, {
                    isOpen: false, // 是否开启绘制模式
                    enableDrawingTool: false, // 是否显示工具栏
                    circleOptions: this.styleOptions, // 圆的样式
                    polylineOptions: this.styleOptions, // 线的样式
                    polygonOptions: this.styleOptions, // 多边形的样式
                    rectangleOptions: this.styleOptions // 矩形的样式
                })
                this.drawingManager.addEventListener('overlaycomplete', this.overlaycomplete);
            },
            createPolygon (option) {
                // console.log(option)
                let mapData = [];
                option.map(item => {
                    mapData.push(item)
                })
                this.map.clearOverlays();
                // console.log(mapData)
                if (mapData.length) {
                    if (mapData.length === 1) {
                        // console.log(mapData)
                        let borderData = JSON.parse(mapData[0]);
                        let point = new BMap.Point(borderData.longtitude, borderData.latitude)
                        this.map.panTo(point);
                        this.map.enableScrollWheelZoom();
                        let pointCircle = {
                            lng: borderData.longtitude,
                            lat: borderData.latitude
                        }
                        this.circle = new BMap.Circle(pointCircle, borderData.radius, this.styleOptions)
                        this.map.addOverlay(this.circle);
                    } else {
                        let borderData = JSON.parse(mapData[0]);
                        let center = new BMap.Point(borderData.longtitude, borderData.latitude)
                        this.map.panTo(center);
                        this.map.enableScrollWheelZoom();
                        let points = []
                        for (var i = 0; i < mapData.length; i++) {
                            points.push(new BMap.Point(JSON.parse(mapData[i]).longtitude, JSON.parse(mapData[i]).latitude));
                        }
                        this.polygon = new BMap.Polygon(points, this.styleOptions);  // 创建多边形
                        this.map.addOverlay(this.polygon);
                        this.overlays.push(this.polygon)
                    }
                }
            },
            overlaycomplete (e) {
                this.overlays.push(e.overlay)
                this.getOverlay = e.overlay
                this.drawingManager.close()
                this.getOverlay.enableEditing()
            },
            getOverLayData () {
                if (this.getOverlay.__proto__.wQ === 'Circle') {
                    let radius = this.getOverlay.getRadius()
                    let lng = this.getOverlay.getCenter().lng
                    let lat = this.getOverlay.getCenter().lat
                    let map = ['circle', radius, lng, lat]
                    this.$emit('mapCoordinate', map)
                } else {
                    let path = this.getOverlay.getPath()
                    this.$emit('mapCoordinate', path)
                    // console.log(path)
                }
            },
            getOptionData () {
                let radius = this.circle.getRadius()
                let lng = this.circle.getCenter().lng
                let lat = this.circle.getCenter().lat
                let map = ['circle', radius, lng, lat]
                // console.log(map)
                this.$emit('mapCoordinate', map)
            }
        },
        mounted () {
            this.createMap()
            this.createPolygon(this.option)
        },
        watch: {
            option () {
                if (this.option) {
                    this.createPolygon(this.option)
                }
            }
        }
    }
</script>
<style scoped>
    @component-namespace ga {
        @b mapArea {
            width : 1500px;
            height : 600px;
            margin:0 auto;

            @e container{
                width: 100%;
                height : 95%;
                margin: 10px 0 10px 0;
                box-sizing: border-box;
            }
        }
    }
</style>
