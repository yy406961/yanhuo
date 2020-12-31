<template>
    <div id='container'>
    </div>
</template>

<script>
    const RED = './static/vendor/gis/baidumapv2/images/red.png'
    const BLUE = './static/vendor/gis/baidumapv2/images/blue.png'
    const GREEN = './static/vendor/gis/baidumapv2/images/green.png'
    const DEEPBLUE = './static/vendor/gis/baidumapv2/images/deepblue.png'
    const BROWN = './static/vendor/gis/baidumapv2/images/brown.png'
    const QUANJING = './static/vendor/gis/baidumapv2/images/quanjing.png'
    import BMap from 'BMap'
    import BMapLib from 'BMapLib'
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                mapMaxZoom: 17,
                map: '', // 地图元素
                GPSHeatOverlay: '', //  GPS热力图
                heatmapOverlay: '', // 热力图覆盖物
                radius: 50, // 默认热力图点大小
                ply: '', // 边界元素,
                icon: [RED, BLUE, GREEN, DEEPBLUE, BROWN, QUANJING, QUANJING],
                viewPoints: [],
                GPSmarkers: [],
                JZmarkers: [],
                SJmarkers: [],
                SZmarkers: [],
                GPSShow: false,
                GPSDatas: [],
                pointCollection: [],
                keyPeopleMarkers: [],
                opts: {
                    width: 250,     // 信息窗口宽度
                    height: 0,     // 信息窗口高度
                    enableCloseOnClick: true // 是否开启点击地图关闭信息窗口
                },
                maxIndex: 0,
                zdr: ''
            }
        },
        // 传入参数为点集，以及区域边界点数组
        props: ['point', 'area', 'max', 'marker', 'showMarker', 'legendRatio'],
        computed: {
            // 取得地市关键字，用于获取地市坐标
            ...mapGetters({
                'globalKeys': 'global/globalKeys'
            }),
            // 处理重点区域范围边界点
            areaArray () {
                let result = []
                // 将边界点坐标转化为地图上的点，并组成数组
                this.area.border.map(v => {
                    result.push(new BMap.Point(v[0], v[1]))
                })
                return result
            },
            // 计算热力点动态半径
            heatRadius () {
                let radius = 30;
                let zoom = this.map.getZoom();  // 4 - 19
                switch (zoom) {
                    case 19:
                        radius = 40;
                        break;
                    case 18:
                        radius = 30;
                        break;
                    case 17:
                        radius = 23;
                        break;
                    case 16:
                        radius = 17;
                        break;
                    case 15:
                        radius = 12;
                        break;
                    default:
                        radius = 10;
                        break;
                }
                return radius
            }
        },
        mounted () {
            this.createMap()
            // if (document.addEventListener) {
            //     document.addEventListener('DOMMouseScroll', this.handleHeatMapEvent, false);
            // }// W3C
            // window.onmousewheel = document.onmousewheel = this.handleHeatMapEvent; // IE/Opera/Chrome
        },
        methods: {
            // 创建地图
            createMap () {
                // 在id为container的div中画地图
                if (this.globalKeys.gMapKey === 'ningxia') {
                    this.mapMaxZoom = 17
                } else {
                    this.mapMaxZoom = 18
                }
                this.map = new BMap.Map('container', { minZoom: 4, maxZoom: this.mapMaxZoom })
                if (this.viewPoints.length > 1) {
                    // 有区域
                    let view = this.map.getViewport(this.viewPoints);
                    // 设置地图中心点以及缩放zoom
                    this.map.centerAndZoom(view.center, view.zoom)
                } else if (this.viewPoints.length === 0) {
                    let point = new BMap.Point(this.globalKeys.gMapCenter[0], this.globalKeys.gMapCenter[1])
                    // 设置地图中心点以及缩放zoom
                    this.map.centerAndZoom(point, 12)
                }
                let topRightNavigation = new BMap.NavigationControl({
                    anchor: 0,  // 控件位置，左 0，右 1
                    type: 0 // 控件类型
                });
                this.map.addControl(topRightNavigation)
                // 允许地图进行滚轮缩放
                this.map.enableScrollWheelZoom();
                this.map.onzoomend = () => {
                    // console.log('当前地图层级：', this.map.getZoom())
                    // console.log('当前半径：', this.heatRadius)
                    this.map.removeOverlay(this.GPSHeatOverlay);
                    this.renderGPSheat(this.GPSmarkers);
                    this.GPSHeatOverlay.show();
                }
            },
            //  渲染GPS热力图方法
            renderGPSheat (data) {
                this.GPSHeatOverlay = new BMapLib.HeatmapOverlay({
                    'radius': this.heatRadius, // 设置半径大小
                    // 'visible': true,
                    // 'opacity': 70,
                    // 'gradient': { // 设置渐变
                    //     0.3: '#00ff9c',
                    //     0.65: '#aaff46',
                    //     0.85: '#fffc00',
                    //     1.0: '#ffcc00'
                    // }
                    'gradient': {
                        0.3: 'rgb(0,42, 255)', // lan
                        0.5: 'rgb(123, 240, 123)', // lv
                        0.6: 'rgb(242, 248, 90)', // huang
                        0.8: 'rgb(247, 73, 66)' // hong
                    }
                });
                this.map.addOverlay(this.GPSHeatOverlay);
                // $('.heatmap-canvas')[0].style.zIndex = -1;
                // let relMax = 100 / this.legendRatio
                let sun = 0
                data.forEach(item => {
                    sun += item.count
                })
                let max = (sun / data.length) * 10
                try {
                    this.GPSHeatOverlay.setDataSet({
                        data: data,
                        // max: data[this.maxIndex].count < relMax ? relMax : data[this.maxIndex].count
                        max: max
                    });
                } catch (error) {
                    console.log('热力图组件未检测到符合标准的热力数据，请检查数据是否正常')
                }
            },
            //  创建GPS热力图（海量打点暂时不用）
            createMassMarker (data) {
                // GPS热力，若热力图已存在，仅控制显示，若不存在，则进行渲染
                if (this.GPSHeatOverlay) {
                    this.GPSHeatOverlay.show()
                } else {
                    if (data.length) {
                        this.maxIndex = Math.floor(data.length * 0.1);
                        let points = [];
                        // 转换数据格式
                        for (let i = 0; i < data.length; i++) {
                            points.push({
                                lng: data[i].lon,
                                lat: data[i].lat,
                                count: data[i].counts
                            })
                        }
                        this.GPSmarkers = points;
                        // console.log('当前地图层级：', this.map.getZoom())
                        // console.log('当前半径：', this.heatRadius)
                        this.renderGPSheat(this.GPSmarkers);
                    }
                }
            },
            // 鼠标滑轮事件回调，控制热力点的半径[废弃，暂时未删]
            handleHeatMapEvent () {
                // e = e || window.event;
                // if (e.wheelDelta > 0) { // 当滑轮向上滚动时
                //     console.log("滑轮向上滚动");
                // }
                // if (e.wheelDelta < 0) { // 当滑轮向下滚动时
                //     console.log("滑轮向下滚动");
                // }
                // setTimeout(() => {
                //     this.map.removeOverlay(this.GPSHeatOverlay);
                //     console.log('当前地图层级：', this.map.getZoom())
                //     console.log('当前半径：', this.heatRadius)
                //     this.renderGPSheat(this.GPSmarkers);
                //     this.GPSHeatOverlay.show();
                // }, 600);
            },
            //  特定人位置打点
            createOneMarker (data) {
                if (data) {
                    // let { latitude, longtitude, arrivetime, msisdn, name, addressName, flag } = data
                    let { latitude, longtitude, spcode, arrivetime, usernum: msisdn, username: name,
                        homeCode, address, flag, imei, imsi, lac, ci } = data
                    if (this.zdr === name && this.pointMarker.point) {
                        this.map.removeOverlay(this.pointMarker);
                        this.pointMarker = []
                        this.map.closeInfoWindow();
                    } else if ((this.zdr === name && !this.pointMarker.point) || this.zdr !== name) {
                        this.map.removeOverlay(this.pointMarker);
                        this.pointMarker = []
                        this.map.closeInfoWindow();
                        if (latitude && longtitude) {
                            let point = new BMap.Point(Number(longtitude), Number(latitude))
                            this.pointMarker = new BMap.Marker(point);
                            this.map.addOverlay(this.pointMarker);
                            setTimeout(() => {
                                this.map.panTo(point);
                            }, 500)
                            let personPoint = [
                                { name: '姓名：', value: name },
                                { name: '手机号：', value: msisdn },
                                { name: '标签：', value: flag },
                                { name: '归属地：', value: homeCode },
                                { name: 'IMEI：', value: imei },
                                { name: 'IMSI：', value: imsi },
                                { name: '运营商：', value: spcode },
                                { name: '经度：', value: latitude },
                                { name: '纬度：', value: longtitude },
                                { name: '基站名称：', value: address },
                                { name: 'LAC：', value: lac },
                                { name: 'CI：', value: ci },
                                { name: '到达时间：', value: arrivetime }
                            ]
                            let pointInfor = this.notNull(personPoint)
                            let content = '<div>';
                            pointInfor.map(item => {
                                content += '<div>' + item.name + item.value + '</div>'
                            })
                            content += '</div>'
                            // content = `<div>
                            //     <div v-for="item in pointInfor">${item.name}${item.value}</div>
                            // </div>`
                            // content = `<div>
                            //     <div>姓名：${name}</div>
                            //     <div>电话：${msisdn}</div>
                            //     <div>标签：${flag}</div>
                            //     <div>到达时间：${arrivetime}</div>
                            //     <div>最新位置：${addressName}</div>
                            // </div>`
                            // content = `<div>
                            //     <div>姓名：${name}</div>
                            //     <div>电话：${msisdn}</div>
                            //     <div>标签：${flag}</div>
                            //     <div>运营商：${operatorName}</div>
                            //     <div>归属地：${homeCodeName}</div>
                            //     <div>到达时间：${arrivetime}</div>
                            //     <div>停留时长：${staytime}</div>
                            //     <div>最新位置：${addressName}</div>
                            //     <div>最新位置时间：${lastUpdateTime}</div>
                            //     <div>最后触网时间：${lastUpdateTime}</div>
                            // </div>`
                            let infoWindow = new BMap.InfoWindow(content, this.opts);
                            this.map.openInfoWindow(infoWindow, point); //  开启信息窗口
                            let me = this
                            this.pointMarker.addEventListener('click', function (e) {
                                //  获取点击事件弹出框的内容
                                me.openInfo(content, e.target)
                            })
                        }
                        this.zdr = name
                    }
                    // setTimeout(() => {
                    //     $('.BMap_pop img').eq(1).click(() => {
                    //         this.map.removeOverlay(this.pointMarker);
                    //         this.pointMarker = []
                    //     })
                    // }, 1000)
                } else {
                    this.map.removeOverlay(this.pointMarker);
                    this.pointMarker = []
                    this.map.closeInfoWindow();
                }
            },
            // 点击特定人 marker 显示其信息
            openInfo (content, e) {
                let p = e;
                let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                let infoWindow = new BMap.InfoWindow(content, this.opts);
                this.map.openInfoWindow(infoWindow, point); //  开启信息窗口
            },
            //  基站打点
            createMarker (data, arr, markerType) {
                let option = data;
                if (option.length) {
                    for (let i = 0; i < option.length; i++) {
                        if (option[i]) {
                            let { latitude, longtitude, ispCode, count, arrivetime, msisdn, name, staytime } = option[i];
                            let myIcon = ''
                            //  基站打点
                            if (ispCode === '00') {
                                myIcon = new BMap.Icon(this.icon[0], new BMap.Size(25, 29))
                            } else if (ispCode === '01') {
                                myIcon = new BMap.Icon(this.icon[1], new BMap.Size(25, 29))
                            } else if (ispCode === '03') {
                                myIcon = new BMap.Icon(this.icon[2], new BMap.Size(25, 29))
                            }
                            //  GPS，涉疆，涉藏，重点人打点
                            if (markerType === 1) {
                                myIcon = new BMap.Icon(this.icon[3], new BMap.Size(25, 29))
                            } else if (markerType === 2) {
                                myIcon = new BMap.Icon(this.icon[4], new BMap.Size(25, 29))
                            } else if (markerType === 0) {
                                myIcon = new BMap.Icon(this.icon[5], new BMap.Size(25, 29))
                            } else if (markerType === 5) {
                                myIcon = new BMap.Icon(this.icon[5], new BMap.Size(25, 29))
                            }
                            let point = new BMap.Point(Number(longtitude), Number(latitude));
                            //  基站点
                            arr[i] = new BMap.Marker(point, { icon: myIcon })
                            this.map.addOverlay(arr[i]);
                            // 除基站外其他覆盖物加载完后直接隐藏
                            // if (markerType !== 5) {
                            //     arr[i].hide();
                            // }
                            let me = this;
                            arr[i].addEventListener('click', function (e) {
                                let cellCoordinate = {
                                    longtitude: Number(longtitude),
                                    latitude: Number(latitude),
                                    count: Number(count),
                                    ispCode: ispCode,
                                    arriveTime: arrivetime,
                                    msisdn: msisdn,
                                    name: name,
                                    stayTime: staytime
                                }
                                //  获取点击事件弹出框的内容
                                me.getCellInfoDetail(cellCoordinate, e.target, markerType)
                            })
                        }
                    }
                }
            },
            //  隐藏点
            hideMarkers (arr) {
                for (let i = 0; i < arr.length; i++) {
                    arr[i].hide();
                }
            },
            //  显示点
            showMarkers (arr) {
                for (let i = 0; i < arr.length; i++) {
                    arr[i].show();
                }
            },
            //  获取基站点的详细信息
            async getCellInfoDetail (obj, e, type) {
                let resp = obj;
                //            console.log(resp);
                if (resp) {
                    if (resp.ispCode === '00') {
                        resp.ispCode = '移动'
                    } else if (resp.ispCode === '01') {
                        resp.ispCode = '联通'
                    } else if (resp.ispCode === '03') {
                        resp.ispCode = '电信'
                    }
                    let content = '';
                    if (type === 4) {
                        content = `<div>
                        <div>运营商:${resp.ispCode}</div>
                        <div>人数:${resp.count}</div>
                    </div>`
                    } else {
                        content = `<div>
                        <div>姓名:${resp.name}</div>
                        <div>电话:${resp.msisdn}</div>
                        <div>到达时间:${resp.arriveTime}</div>
                        <div>停留时长:${resp.stayTime}</div>
                    </div>`
                    }

                    this.openInfo(content, e)
                }
            },
            // 判断数据是否为空
            notNull(arr) {
                let newArr = []
                arr.map(item => {
                    let { name, value } = item
                    if (!value || value === null || value === 'null') {
                    } else {
                        newArr.push({ name: name, value: value })
                    }
                })
                return newArr
            }
        },
        watch: {
            // 检测区域变化
            area: {
                handler (newval) {
                    let { border, radius } = newval
                    // 如果边界存在时，清除边界覆盖物，避免叠加
                    if (this.ply) {
                        this.map.removeOverlay(this.ply)
                    }
                    // 根据半径的有无判断画多边形还是圆形
                    if (newval.radius === null) {
                    // 多边形
                        this.viewPoints = this.areaArray;
                        this.createMap()
                        // 测试
                        // console.log('area---------------------')
                        this.areaArray.map(item => {
                            console.log('lng：', item.lng, 'lat：', item.lat)
                        })
                        this.ply = new BMap.Polygon(this.areaArray,
                            {
                                strokeColor: '#0072ff',
                                strokeWeight: 3,
                                strokeOpacity: 0.7,
                                fillColor: '#0072ff',
                                fillOpacity: 0.2
                            }); // 建立多边形覆盖物
                        this.map.addOverlay(this.ply); // 添加覆盖物
                    } else {
                    // 圆形
                        let lon = Number(border[0]);
                        let lat = Number(border[1]);
                        //                    let radius = radius;
                        let filter = radius / 100000;
                        // console.log('lon', lon)
                        // console.log('lon', lat)
                        // console.log('lon', filter)
                        //                    console.log(lon, lat)
                        let point1 = new BMap.Point(lon, lat + filter);
                        let point2 = new BMap.Point(lon + filter, lat);
                        let point3 = new BMap.Point(lon, lat - filter);
                        let point4 = new BMap.Point(lon - filter, lat);
                        this.viewPoints.push(point1);
                        this.viewPoints.push(point2);
                        this.viewPoints.push(point3);
                        this.viewPoints.push(point4);
                        this.createMap()
                        this.ply = new BMap.Circle(new BMap.Point(border[0], border[1]), radius,
                            {
                                strokeColor: '#0072ff',
                                strokeWeight: 3,
                                strokeOpacity: 0.7,
                                fillColor: '#37baff',
                                fillOpacity: 0.2
                            }); // 建立圆形覆盖物
                        this.map.addOverlay(this.ply); // 添加覆盖物
                    }
                },
                deep: true
            },
            // 检测基站数据
            point: {
                handler () {
                    //                console.log(newval)
                    //                 如果热力点集存在时，清除热力点集覆盖物，避免叠加
                    if (this.heatmapOverlay) {
                        this.heatmapOverlay.hide()
                    }
                    this.heatmapOverlay = new BMapLib.HeatmapOverlay({ 'radius': 25, 'visible': true }); // 设置半径大小
                    //                this.map.setViewport(this.point)
                    //                this.map.setZoom(12)
                    this.map.addOverlay(this.heatmapOverlay);
                    this.heatmapOverlay.setDataSet({ data: this.point, max: this.max || 1000 });
                    this.heatmapOverlay.show();
                },
                deep: true
            },
            // 检测基站/涉疆/涉藏/重点人/GPS的点数据的变化
            marker: {
                handler (newval) {
                    // console.log(newval);
                    if (newval) {
                        for (let i = 0; i < newval.length; i++) {
                            let item = newval[i].value;
                            this.GPSDatas = item
                            if (item[0]) {
                                // 重点人
                                if (item[0].type === 0) {
                                    //                                this.createMarker(item, this.keyPeopleMarkers, 0)
                                }
                                // 涉疆
                                if (item[0].type === 1) {
                                    //                                this.createMarker(item, this.SJmarkers, 1)
                                }
                                // 涉藏
                                if (item[0].type === 2) {
                                    //                                this.createMarker(item, this.SZmarkers, 2)
                                }
                                // 基站
                                if (item[0].type === 4) {
                                    // 由于基站点和热力图在页面初始化时需要同时渲染，为防止多次渲染，先判断基站数据是否已渲染
                                    // if (!this.JZmarkers.length) {
                                    //     this.createMarker(item, this.JZmarkers, 4)
                                    // }
                                }
                                // GPS
                                if (item[0].type === 5) {
                                    // this.GPSDatas = item
                                }
                            }
                        }
                    }
                },
                deep: true
            },
            // 检测开关状态
            showMarker: {
                deep: true,
                handler (newval) {
                    // console.log(newval)
                    // 先隐藏全部覆盖物
                    this.hideMarkers(this.SJmarkers)
                    this.hideMarkers(this.SZmarkers)
                    this.hideMarkers(this.keyPeopleMarkers)
                    this.hideMarkers(this.JZmarkers)
                    if (this.heatmapOverlay) {
                        this.heatmapOverlay.hide()
                    }
                    if (this.GPSHeatOverlay) {
                        this.GPSHeatOverlay.hide()
                    }
                    // 再根据开关类型判断让哪个覆盖物显示
                    setTimeout(() => {
                        if (newval.length) {
                            for (let i = 0; i < newval.length; i++) {
                                if (newval[i] === '基站') {
                                    if (this.heatmapOverlay) {
                                        this.heatmapOverlay.show();
                                    }
                                    this.showMarkers(this.JZmarkers)
                                }
                                if (newval[i] === 'GPS') {
                                    this.createMassMarker(this.GPSDatas)
                                }
                                if (newval[i] === '涉疆') {
                                    this.showMarkers(this.SJmarkers)
                                }
                                if (newval[i] === '涉藏') {
                                    this.showMarkers(this.SZmarkers)
                                }
                                if (newval[i] === '重点人') {
                                    this.showMarkers(this.keyPeopleMarkers)
                                }
                            }
                        }
                    }, 200)
                }
            },
            // 由于GPS数据加载存在延迟，在数据加载完成时取消所有开关的禁用
            GPSDatas: {
                deep: true,
                handler (newv) {
                    // this.$emit('switchAble', false)
                    this.map.removeOverlay(this.GPSHeatOverlay);
                    this.GPSHeatOverlay = ''
                    this.createMassMarker(newv)
                }
            }
        }
    }
</script>

<style scoped>
    #container {
      width: 100%;
      height: 100%;
    }
</style>
