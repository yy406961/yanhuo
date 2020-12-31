<template>
    <div class="ga-SWOTANLS__content ga-Letters" id = 'wrap'>
        <div class = 'ga-Letters__left'>
            <div class = 'ga-containerBorder__leftTop'></div>
            <div class = 'ga-containerBorder__leftBot'></div>
            <div class = 'ga-containerBorder__rightTop'></div>
            <div class = 'ga-containerBorder__rightBot'></div>
            <template v-for="items in Letters_list_left">
                <div class = 'ga-Letters__tablist'>
                    <p>{{items.title}}</p>
                    <div class = 'ga-Letters__keyperson'>
                        <ul>
                            <li v-for="item in items.infoList">
                                <div class = 'ga-containerBorder__leftTop ga-Letters__opc'></div>
                                <div class = 'ga-containerBorder__leftBot ga-Letters__opc'></div>
                                <div class = 'ga-containerBorder__rightTop ga-Letters__opc'></div>
                                <div class = 'ga-containerBorder__rightBot ga-Letters__opc'></div>
                                <p>{{item.title}}</p>
                                <p class = 'ga-Letters__lineClassB'></p>
                                <p class="ga-Letters__number" :class="item.classname">{{item.value}}</p>
                            </li>
                        </ul>
                    </div>
                    <p class="right-p">
                        <router-link :to="{name:items.url}">查看详情</router-link>
                    </p>
                    <p class = 'ga-Letters__lineClassB'></p>
                </div>
            </template>
        </div>
        <div class = 'ga-Letters__map'>
            <div class = 'ga-Letters__mapGis' id = 'geoMap'></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data: function () {
            return {
                // eslint-disable-next-line camelcase
                Letters_list_left: [
                    { title: '关注对象',
                        url: '',
                        infoList: [
                         { title: '关注', value: 1502 },
                         { title: '在网', classname: 'ga-Letters__num__zw', value: 1502 },
                         { title: '异常', classname: 'ga-Letters__num__yc', value: 0 }] },
                    { title: '关注区域',
                        url: '',
                        infoList: [
                         { title: '关注', value: 2 },
                         { title: '异常', classname: 'ga-Letters__num__yc', value: 0 }] },
                    { title: '关注群体',
                        url: '',
                        infoList: [
                         { title: '关注', value: 18 },
                         { title: '活跃', classname: 'ga-Letters__num__hy', value: 5 },
                         { title: '异常', classname: 'ga-Letters__num__yc', value: 0 }] }
                ],
                watchArr: [{ wrapHeight: 0 }, { wrapWidth: 0 }],
                chinaGeoCoordMap: {
                    '长沙': [113.0823, 28.2568],
                    '北京': [116.4551, 40.2539]
                },
                geoMap: null,
                routeLine: [['长沙', [[{ name: '长沙' }, { name: '北京', value: 166 }]]]],
                series: [{
                    type: 'map',
                    map: 'china',
                    zoom: 1.2,
                    showLegendSymbol: true,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: true
                            },
                            areaStyle: {
                                textColor: '#fff'
                            },
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: false,
                    itemStyle: {
                        normal: {
                            areaColor: '#1E375F',
                            borderColor: 'rgba(59,80,119,1)',
                            borderWidth: 1
                        },
                        emphasis: {
                            areaColor: '#162849',
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    data: [
                        { name: '湖南', selected: true },
                        { name: '湖北', selected: true },
                        { name: '河南', selected: true },
                        { name: '河北', selected: true },
                        { name: '北京', selected: true }
                    ]
                }]
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initMap();
            })
        },
        created() {
            var _this = this;
            window.addEventListener('resize', function () {
                _this.$set(_this.watchArr, 0, document.getElementById('wrap').offsetHeight);
                _this.$set(_this.watchArr, 1, document.getElementById('wrap').offsetWidth);
            });
        },
        watch: {
            watchArr: { handler() { this.init() }, deep: true }
        },
        methods: {
            init() {
                let EchartsList = ['geoMap'];
                for (let item of EchartsList) {
                    let exist = document.getElementById(item);
                    if (exist) {
                        echarts.init(exist).resize();
                    }
                }
            },
            initMap() {
                var _this = this;
                this.geoMap = echarts.init(document.getElementById('geoMap'));
                let color = ['#a6c84c', '#ffa022', '#46bee9'];
                // eslint-disable-next-line max-len
                let planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
                this.routeLine.forEach(function (item, i) {
                    _this.series.push({
                        name: item[0] + ' Top3',
                        type: 'lines',
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0.7,
                            color: '#ffa022',
                            symbolSize: 3
                        },
                        lineStyle: {
                            normal: {
                                color: color[i],
                                width: 0,
                                curveness: 0.2
                            }
                        },
                        data: _this.convertData(item[1])
                    },
                        {
                            name: item[0] + ' Top3',
                            type: 'lines',
                            zlevel: 2,
                            symbol: ['none', 'arrow'],
                            symbolSize: 10,
                            effect: {
                                show: true,
                                period: 6,
                                trailLength: 0,
                                symbol: planePath,
                                symbolSize: 15
                            },
                            lineStyle: {
                                normal: {
                                    color: color[i],
                                    width: 1,
                                    opacity: 0.6,
                                    curveness: 0.2
                                }
                            },
                            data: _this.convertData(item[1])
                        },
                        {
                            name: item[0] + ' Top3',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{b}',
                                    color: color[i]
                                }
                            },
                            symbolSize: function (val) {
                                return val[2] / 8;
                            },
                            itemStyle: {
                                normal: {
                                    color: '#ddb926',
                                    areaColor: '#1E375F',
                                    borderColor: 'rgba(59,80,119,1)',
                                    borderWidth: 1
                                },
                                emphasis: {
                                    areaColor: '#162849' // 地图区域划过时的颜色
                                }
                            },
                            data: item[1].map(function (dataItem) {
                                return {
                                    name: dataItem[1].name,
                                    value: _this.chinaGeoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                                };
                            })
                        },
                        );
                });
                let option = {
                    tooltip: {
                        show: false
                    },
                    geo: {
                        map: 'china',
                        zoom: 1.2,
                        roam: false,
                        show: true,
                        geoIndex: 1,
                        aspectScale: 0.75,
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#091632',
                                borderColor: '#1773c3',
                                shadowColor: 'rgba(0, 0, 0, 0.7)',
                                shadowBlur: 30
                            }
                        }
                    },
                    series: this.series
                };
                this.geoMap.setOption(option, true);
            },
            convertData(data) {
                var _this = this;
                let res = [];
                for (let i = 0; i < data.length; i++) {
                    let dataItem = data[i];
                    let fromCoord = _this.chinaGeoCoordMap[dataItem[0].name];
                    let toCoord = _this.chinaGeoCoordMap[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[0].name,
                            toName: dataItem[1].name,
                            coords: [fromCoord, toCoord],
                            value: dataItem[1].value
                        });
                    }
                }
                return res;
            }
        }
    }
</script>

<style scoped>
    .ga-Letters__number{
        color:#D6FF1F ;
        font-size: 16px;
    }
    .ga-Letters__keyperson ul>li p{
        text-align: center;
    }
    .ga-Letters__keyperson ul>li{
        margin-left: 15px;
        position: relative;
        width: 25%;
        background-image: linear-gradient(-270deg, rgba(0,197,255,0.05) 0%, rgba(0,197,255,0.10) 49%, rgba(0,197,255,0.05) 100%);

    }
    .ga-Letters__keyperson ul>li:first-child{
        padding-left: 0;
    }
    .ga-Letters__keyperson{
        height: calc(100% - 60px);
        width: 100%;
    }
    .ga-Letters__keyperson ul{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .ga-dataPart__userTabColor{
        border: 1px solid;
        /*border-left: 0;*/
        -o-border-image: linear-gradient(rgba(0,197,255,0.10), rgba(0,197,255,0.49), rgba(0,197,255,0.10)) 0 1;
        border-image: linear-gradient(rgba(0,197,255,0.10), rgba(0,197,255,0.49), rgba(0,197,255,0.10)) 0 1;
    }
    .ga-Letters__tablist{
       height: 33.3333333333333%;
       width: 100%;
    }
    .ga-Letters__tablist p{
      padding: 5px;
    }
    .ga-Letters__lineClassB{
        padding: 0 !important;
        height: 1px;
        width: 100%;
        background-image: linear-gradient(-270deg, rgba(0,197,255,0.10) 0%, rgba(0,197,255,0.49) 49%, rgba(0,197,255,0.10) 100%);
    }
    .right-p{
        cursor: pointer;
        text-align: right;
        color:rgba(60,210,208,1);
    }
    #geoMap{
        width: 100%;
        height: 100%;
    }
    .ga-Letters{
        width: 100%;
        height: 100%;
    }
    .ga-Letters__left{
        position: relative;
        color: #ffffff;
        font-size: 12px;
        /* z-index: 0; */
        border: 1px solid rgba(60,164,255,1);
        background: rgba(16,42,74,1);
        float: left;
        width: 30%;
        padding: 30px 15px;
        height: 100%;
    }
    .ga-Letters__map{
        position: relative;
        color: #ffffff;
        font-size: 12px;
        /* z-index: 0; */
        border: 1px solid rgba(60,164,255,1);
        padding-bottom: 12px;
        background: rgba(16,42,74,1);
        float: left;
        width: calc(70% - 12px);
        height: 100%;
        margin-left: 10px;
    }
    .ga-SWOTANLS__clearBtn.active:before {
        background: #1A498A;
    }

    .ga-SWOTANLS__clearBtn.active:after {
        background: #1A498A;
    }

    .ga-SWOTANLS__startBtn.active:before {
        background: #1A498A;
    }

    .ga-SWOTANLS__startBtn.active:after {
        background: #1A498A;
    }
    .ga-Letters__opc{
        opacity: 0.5;
    }
    .ga-Letters__num__yc{
        color: #FD3A5D;
    }
    .ga-Letters__num__zw{
        color: #FFC31F;
    }
    .ga-Letters__num__hy{
        color: #00FFBF;
    }
</style>
