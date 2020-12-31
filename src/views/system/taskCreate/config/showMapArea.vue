<template>
    <div class="ga-mapArea" >
        <div id="mapArea" class="ga-mapArea__container"></div>
    </div>
</template>
<script>
    const CIRCLE = './static/vendor/newGis/baidumapv2/images/red.png'
    import { mapGetters } from 'vuex'
    import { getCellInfoDetail } from 'api/task/taskArea'
    export default {
        name: 'mapArea',
        data () {
            return {
                isModify: false,
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
                },
                icon: [CIRCLE],
                opts: {
                    width: 250,     // 信息窗口宽度
                    height: 0,     // 信息窗口高度
                    enableMessage: true// 设置允许信息窗发送短息
                },
                content: '',
                marker: ''
            }
        },
        props: ['option'],
        mounted () {
            this.$nextTick(() => {
                this.createMap()
                this.createPolygon(this.option)
            })
            // setTimeout(() => {
            //     console.log('sss300')
            // }, 600);
        },
        methods: {
            // 获取基站点的详细信息
            async getCellInfoDetail (obj, e) {
                let resp = await getCellInfoDetail(obj)
                if (resp) {
                    resp.rows.forEach((item) => {
                        if (item.ispCode === '00') {
                            item.ispCode = '移动';
                        } else if (item.ispCode === '01') {
                            item.ispCode = '联通';
                        } else if (item.ispCode === '03') {
                            item.ispCode = '电信'
                        }
                    })
                    let content = `<div>
                        <div>地址:${resp.rows[0].address}</div>
                        <span>运营商:${resp.rows[0].ispCode}</span>
                        <span>lac:${resp.rows[0].lac}</span>
                        <span>ci:${resp.rows[0].ci}</span>
                        <div>
                            <span>经度:${resp.rows[0].longtitude}</span>
                            <span>纬度:${resp.rows[0].latitude}</span>
                        </div>
                    </div>`
                    this.openInfo(content, e)
                }
            },
            // 画地图
            createMap () {
                this.map = new BMap.Map('mapArea', { minZoom: 3, maxZoom: 18 });
                this.map.clearOverlays();
                const poi = new BMap.Point(this.mapCenter.gMapCenter[0], this.mapCenter.gMapCenter[1]);
                this.map.centerAndZoom(poi, 16);
                this.map.enableScrollWheelZoom();
                // this.styleOptions;
            },
            // 画区域
            createPolygon (option) {
                this.map.clearOverlays();
                if (option) {
                    let markData = [];
                    // 取基站点信息
                    option.cellInfo.map(item => {
                        markData.push(item)
                    })
                    let mapData = [];
                    if (option.areaBorder) {
                        // 取边界点信息
                        option.areaBorder.map(item => {
                            mapData.push(item)
                        })
                    }
                    if (markData.length) {
                        this.map.enableScrollWheelZoom();
                        for (let i = 0; i < markData.length; i++) {
                            let itemPoint = JSON.parse(markData[i])
                            if (itemPoint) {
                                let { latitude, longtitude, areaBaseInfoId } = itemPoint
                                let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(25, 29))
                                let point = new BMap.Point(Number(longtitude), Number(latitude))
                                let marker = new BMap.Marker(point, { icon: myIcon })
                                this.map.addOverlay(marker)
                                let me = this;
                                marker.addEventListener('click', function (e) {
                                    let cellCoordinate = {
                                        longtitude: Number(longtitude),
                                        latitude: Number(latitude),
                                        areaBaseInfoId: areaBaseInfoId
                                    }
                                    // 获取点击点弹出弹框内的内容
                                    me.getCellInfoDetail(cellCoordinate, e.target)
                                })
                            }
                        }
                    }
                    if (mapData.length) {
                        // 画圆形区域
                        if (mapData.length === 1) {
                            let borderData = JSON.parse(mapData[0]);
                            if (borderData) {
                                let point = new BMap.Point(Number(borderData.longtitude), Number(borderData.latitude))
                                this.map.panTo(point);
                                this.map.enableScrollWheelZoom();
                                let pointCircle = {
                                    lng: Number(borderData.longtitude),
                                    lat: Number(borderData.latitude)
                                }
//                                console.log(pointCircle, borderData.radius)
                                this.circle = new BMap.Circle(pointCircle, borderData.radius, this.styleOptions)
                                this.map.addOverlay(this.circle);
                            }
                            // 画多边形区域
                        } else {
                            let borderData = JSON.parse(mapData[0]);
                            if (borderData) {
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
                    }
                }
            },
            openInfo (content, e) {
                let p = e;
                let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                let infoWindow = new BMap.InfoWindow(content, this.opts);  // 创建信息窗口对象
                this.map.openInfoWindow(infoWindow, point); // 开启信息窗口
            }
        },
        watch: {
            option (val) {
                setTimeout(() => {
                    if (val && val.areaBorder.length) {
                        this.createPolygon(val)
                    }
                }, 400);
            }
        },
        computed: {
            ...mapGetters({
                'mapCenter': 'global/globalKeys'
            })
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

