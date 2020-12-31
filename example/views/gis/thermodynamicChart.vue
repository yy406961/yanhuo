<template lang="html">
    <div>
        <el-button type="primary" @click="showHeatMap(index)">热力图</el-button>
        <el-button type="primary" icon="arrow-left" @click="prev(index)"></el-button>
        <el-button type="primary" icon="arrow-right" @click="next(index)"></el-button>
        <el-button type="primary" @click="save">save</el-button>
        <a :href="ahref" download="aaa.png">download</a>
        <img :src="ahref"/>
        <div id='heatMap' :style="chartStyle" ref="bar"></div>
    </div>
</template>

<script>
    import Mock from 'mockjs'
    import axios from 'axios'
    export default {
        name: 'thermody',
        data () {
            return {
                EC: null,
                ahref: '',
                width: 800,
                height: 460,
                geoCoordMap: {
                    "银川": [106.27, 38.47],
                    "石嘴山": [106.39, 39.04],
                    "吴忠": [106.21, 37.99],
                    "中卫": [105.18, 37.51],
                    "固原": [106.28, 36.01]
                },
                data: [],
                mapData: [],
                citys: [
                    {
                        title: 'ningxia',
                        name: '宁夏'
                    },{
                        title: 'beijing',
                        name: '北京'
                    },{
                        title: 'qinghai',
                        name: '青海'
                    },{
                        title: 'china',
                        name: '中国'
                    },{
                        title: 'changping',
                        name: '昌平'
                    },{
                        title: 'yinchuan',
                        name: '银川'
                    }
                ],
                index: 0,
                props: {
                    zoom: 1
                }
            }
        },
        computed: {
            chartStyle () {
                return {
                    width: this.width + 'px',
                    height: this.height + 'px'
                }
            }
        },
        mounted () {
            this.mapData = Mock.mock({
                'arr|10': [
                    [
                        '@float(105, 106, 3, 3)',
                        '@float(36, 38, 3, 3)',
                        '@integer(10, 300)'
                    ]
                ]
            });
            this.data = this.mapData;
            this.loadMap(this.citys[0], this.props);
            // var chart = echarts.init($(this.$el).find('#heatMap')[0]);
            // chart.setOption({
            //     series: [{
            //         type: 'map',
            //         map: '青海'
            //     }]
            // });
        },
        methods: {
            save () {
                let canv = $('canvas')[0];
                console.log(canv)
                this.ahref = canv.toDataURL("image/png");
            },
            loadMap (obj, props) {
                this.initChart();
                this.loadData(obj, props);
            },
            initChart () {
                this.EC = echarts.init($(this.$el).find('#heatMap')[0])
            },
            loadData (data, props) {
                let op = this.buildData(data, props);
                this.EC.setOption(op)
            },
            showHeatMap () {
                this.data = this.data.arr.length ? { arr: [] } : this.mapData;
                this.loadData(this.citys[this.index], this.props);
            },
            resize () {
                this.EC.resize()
            },
            buildData (data, props) {
                let option = {
                    title: {
                        text: '政区图测试\n' + data.name,
                        left: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    backgroundColor: '#404a59',
                    visualMap: {
                        type: 'continuous',
                        calculable: true,
                        min: 0,
                        max: 300,
                        // splitNumber: 5,
                        inRange: {
                            color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
                        },
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: {
                        map: data.title,
                        label: {
                            normal: {
                                show: true,
                                color: '#fff'
                            },
                            emphasis: {
                                show: false,
                                color: '#fff'
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#111'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        },
                        zoom: props.zoom
                    },
                    series: [{
                        name: 'AQI',
                        type: 'heatmap',
                        coordinateSystem: 'geo',
                        // data: this.convertData([
                        //     { name: "银川", value: 390 },
                        //     { name: "石嘴山", value: 220 },
                        //     { name: "吴忠", value: 212 },
                        //     { name: "中卫", value: 212 },
                        //     { name: "固原", value: 140 }
                        // ])
                        data: this.data.arr
                    }]
                };
                return option;
            },
            convertData (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = this.geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push(geoCoord.concat(data[i].value));
                    }
                }
                return res;
            },
            next (n) {
                this.index = n < 5 ? this.index + 1 : 0;
                this.loadMap(this.citys[this.index], this.props);
            },
            prev (n) {
                this.index = n > 0 ? this.index - 1 : 5;
                this.loadMap(this.citys[this.index], this.props);
            }
        },
        watch: {
            'props' (newVal) {
                console.log(newVal)
            }
        }
    }
</script>

<style lang="css">
 #heatMap {
     margin: 10px 0;
 }
</style>
