<template lang="html">
    <div id='ex-htl'>
        <!-- <gisTimeLine :points="points"></gisTimeLine>
        <div>
            <p>hello d3!</p>
            <p>hello d3!</p>
        </div>
        <div>
            <router-link to="/r1">r1</router-link>
            <router-link to="/r2">r2</router-link>
        </div> -->
        <!-- <div id="stackDemo">
            <ul class="stack">
                <li class="stack-item" 
                    v-for="(item, index) in pages"
                    :style="[transformIndex(index), transform(index)]"
                    @touchstart.stop.capture="touchstart"
                    @touchmove.stop.capture="touchmove"
                    @touchend.stop.capture="touchend"
                    @mousedown.stop.capture="touchstart"
                    @mousemove.stop.capture="touchmove"
                    @mouseup.stop.capture="touchend"
                    @webkit-transition-end="onTransitionEnd"
                    @transitionend="onTransitionEnd">
                    <div :style="{background: item.bgColor}"></div>
                </li>
            </ul>
        </div> -->
        <div style='width: 600px; height:400px;'>
            <heatMap ref="map" :option='heatMapOption'>
            </heatMap>
        </div>
        <ul>
            <li v-for="(item, index) in sortName">
                <h3>{{index + 1 + '、' + item.name }}</h3>
                <div>
                    <p>oldArr: {{ item.oldArr }}</p>
                    <p>newArr: {{ item.getNewArr(item.oldArr) }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import Mock from 'mockjs'
    import axios from 'axios'
    import heatMap from 'views/situationAnalysis/heatMap'
    import gisTimeLine from 'components/common/gisTimeLine'
    import { gpsHot } from 'api/situationAnalysis/keyAreaPage'
    export default {
        name: 'historyTimeline',
        data () {
            return {
                heatMapOption: {
                    points: [], // 热力点数据 [{ lng: number, lat: number, count: number }]，按count降序
                    center: '银川', // 地图默认 center 【Array: [lng, lat] || String 省市中文名】
                    // zoom: 13, // 地图默认 zoom
                    // 热力图配置
                    heatMapOptions: {
                        'radius': 30, // 设置半径大小
                        'opacity': 70, // 透明度 1 - 100
                        // 颜色渐变
                        'gradient': {
                            0.2: 'rgb(0,42, 255)', // 蓝
                            0.5: 'rgb(123, 240, 123)', // 绿
                            0.6: 'rgb(242, 248, 90)', // 黄
                            0.8: 'rgb(247, 73, 66)' // 红
                        }
                    },
                    // 是否开启动态热力点半径
                    enableRadiusChange: true
                },
                points: [],
                pages: [
                    {
                        bgColor: '#ff0303'
                    }, {
                        bgColor: '#ff9103'
                    }, {
                        bgColor: '#f9ff03'
                    }, {
                        bgColor: '#4bff03'
                    }, {
                        bgColor: '#03fff5'
                    }
                ],
                // basicdata数据包含组件基本数据
                basicdata: {
                    start: {}, // 记录起始位置
                    end: {}, // 记录终点位置
                    currentPage: 0 // 默认首图的序列
                },
                // temporaryData数据包含组件临时数据
                temporaryData: {
                    poswidth: '', //记录位移
                    posheight: '', // 记录位移
                    lastPosWidth: '', // 记录上次最终位移
                    lastPosHeight: '', // 记录上次最终位移
                    tracking: false, // 是否在滑动，防止多次操作，影响体验
                    animation: false, // 首图是否启用动画，默认否
                    swipe: false, // onTransition 判定条件
                    opacity: 1, // 记录opacity
                    zIndex: 10, //记录 zIndex
                    visible: 3 // 记录默认显示堆叠数visible
                },
                // 排序算法名称
                sortName: [
                    {
                        name: '冒泡排序',
                        oldArr: [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48],
                        getNewArr: function (arr) {
                            console.time('执行时间为：')
                            // 算法 1
                            // let len = arr.length;
                            // for ( let i = 0; i < len; i++ ) {
                            //     for ( let j = 0; j < len - 1 - i; j++ ) {
                            //         if (arr[j] > arr[j + 1]) {
                            //             let temp = arr[j]
                            //             arr[j] = arr[j + 1]
                            //             arr[j + 1] = temp
                            //         }
                            //     }
                            // }
                            // 算法 2
                            let i = arr.length - 1;
                            while (i > 0) {
                                let pos = 0;
                                for (let j = 0; j < i; j++) {
                                    if (arr[j] > arr[j + 1]) {
                                        pos = j
                                        let temp = arr[j]
                                        arr[j] = arr[j + 1]
                                        arr[j + 1] = temp
                                    }
                                }
                                i = pos
                            }
                            console.timeEnd('执行时间为：')
                            return arr;
                        }
                    }, {
                        name: '选择排序',
                        oldArr: [3, 44, 38, 5, 47, 15, 36, 26, 44, 2, 46, 4, 19, 50, 48],
                        getNewArr: function (arr) {
                            console.time('执行时间为：')
                            let len = arr.length;
                            let minIndex;
                            let temp;
                            for (let i = 0; i < len - 1; i++) {
                                minIndex = i;
                                for (let j = i + 1; j < len; j++) {
                                    if (arr[j] < arr[minIndex]) {
                                        minIndex = j;
                                    }
                                }
                                temp = arr[i];
                                arr[i] = arr[minIndex];
                                arr[minIndex] = temp;
                            }
                            console.timeEnd('执行时间为：')
                            return arr;
                        }
                    }, {
                        name: '插入排序',
                        oldArr: [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48],
                        getNewArr: function (arr) {
                            console.time('执行时间为：')
                            let len = arr.length;
                            for (let i = 1;  i < len; i++) {
                                let key = arr[i]
                                let j = i - 1;
                                while (j >= 0 && arr[j] > key) {
                                    arr[j + 1] = arr[j];
                                    j--;
                                }
                                arr[j + 1] = key;
                            }
                            console.timeEnd('执行时间为：')
                            return arr;
                        }
                    }
                ]
            }
        },
        computed: {},
        created () {
            // const data = Mock.mock({
            //     'points|12': [
            //         '@datetime'
            //     ]
            // })
            // this.points = data.points
        },
        mounted () {
            // this.textSth();
            // this.drawSVG();
            // this.drawBar();
            this.getHeatData();
        },
        methods: {
            touchstart (e) {
                if (this.temporaryData.tracking) {
                    return
                }
                // 是否为touch
                if (e.type === 'touchstart') {
                    if (e.touches.length) {
                        this.temporaryData.tracking = false
                    } else {
                        // 记录起始位置
                        this.basicdata.start.t = new Date().getTime()
                        this.basicdata.start.x = e.targetTouches[0].clientX
                        this.basicdata.start.y = e.targetTouches[0].clientY
                        this.basicdata.end.x = e.targetTouches[0].clientX
                        this.basicdata.end.y = e.targetTouches[0].clientY
                    }
                } else {
                    // PC 操作
                    // 记录起始位置
                    this.basicdata.start.t = new Date().getTime()
                    this.basicdata.start.x = e.clientX
                    this.basicdata.start.y = e.clientY
                    this.basicdata.end.x = e.clientX
                    this.basicdata.end.y = e.clientY
                }
                this.temporaryData.tracking = true
                this.temporaryData.animation = false
            },
            touchmove (e) {
                // 记录滑动位置
                if (this.temporaryData.tracking && !this.temporaryData.animation) {
                    if (e.type === 'touchmove') {
                        this.basicdata.end.x = e.targetTouches[0].clientX
                        this.basicdata.end.y = e.targetTouches[0].clientY
                    } else {
                        this.basicdata.end.x = e.clientX
                        this.basicdata.end.y = e.clientY
                    }
                    // 计算滑动值
                    this.temporaryData.poswidth = this.basicdata.end.x - this.basicdata.start.x
                    this.temporaryData.posheight = this.basicdata.end.y - this.basicdata.start.y
                }
            },
            touchend (e) {
                this.temporaryData.tracking = false
                this.temporaryData.animation = true
                // 滑动结束
                // 简单判断滑动宽度超出100像素时触发滑出
                if (Math.abs(this.temporaryData.poswidth) >= 100) {
                    // 最终位移简单设定为 x 轴200px的偏移
                    let ratio = Math.abs(this.temporaryData.posheight / this.temporaryData.poswidth)
                    this.temporaryData.poswidth = this.temporaryData.poswidth >= 0 ? this.temporaryData.poswidth + 200 : this.temporaryData.poswidth - 200
                    this.temporaryData.posheight = this.temporaryData.posheight >= 0 ? Math.abs(this.temporaryData.poswidth * ratio) : -Math.abs(this.temporaryData.poswidth * ratio)
                    this.temporaryData.opacity = 0
                    this.temporaryData.swipe = true
                    // 记录最终滑动距离
                    this.temporaryData.lastPosWidth = this.temporaryData.poswidth
                    this.temporaryData.lastPosHeight = this.temporaryData.posheight
                    // currentPage + 1 引发排序变化
                    this.basicdata.currentPage += 1
                    // currentPage 切换，整体 dom 进行变化，把第一层滑动置零
                    this.$nextTick(() => {
                        this.temporaryData.poswidth = 0
                        this.temporaryData.posheight = 0
                        this.temporaryData.opacity = 1
                    })
                } else {
                    this.temporaryData.poswidth = 0
                    this.temporaryData.posheight = 0
                    this.temporaryData.swipe = false
                }
            },
            onTransitionEnd (index) {
                // dom 发生变化后，正在执行的动画滑动序列已经变为上一层
                if (this.temporaryData.swipe && index === this.basicdata.currentPage - 1) {
                    this.temporaryData.animation = true
                    this.temporaryData.lastPosWidth = 0
                    this.temporaryData.lastPosHeight = 0
                    this.temporaryData.swipe = false
                }
            },
            // 非首页样式切换
            transform (index) {
                if (index > this.basicdata.currentPage) {
                    let style = {}
                    let visible = 3
                    let perIndex = index - this.basicdata.currentPage
                    // visible 可见数量前滑块的样式
                    if (index <= this.basicdata.currentPage + visible - 1) {
                        style['opacity'] = '1'
                        style['transform'] = 'translate3D(0, 0,' + -1 * perIndex * 60 + 'px' + ')'
                        style['zIndex'] = visible - index + this.basicdata.currentPage
                        style['transitionTimingFunction'] = 'ease'
                        style['transitionDuration'] = 300 + 'ms'
                    } else {
                        style['zIndex'] = '-1'
                        style['transform'] = 'translate3D(0, 0,' + -1 * visible * 60 + 'px' + ')'
                    }
                    return style
                } else if (index === this.basicdata.currentPage - 1) {
                    let style = {}
                    style['transform'] = 'translate3D(' + this.temporaryData.lastPosWidth + 'px' + ',' + this.temporaryData.lastPosHeight + 'px' + ',0px)'
                    style['opacity'] = '0'
                    style['zIndex'] = '-1'
                    style['transitionTimingFunction'] = 'ease'
                    style['transitionDuration'] = 300 + 'ms'
                    return style
                }
            },
            // 首页样式切换
            transformIndex (index) {
                // 处理3D效果
                if (index === this.basicdata.currentPage) {
                    let style = {}
                    style['transform'] = 'translate3D(' + this.temporaryData.poswidth + 'px' + ',' + this.temporaryData.posheight + 'px' + ', 0px)'
                    style['opacity'] = 1
                    style['zIndex'] = 10
                    if (this.temporaryData.animation) {
                        style['transitionTimingFunction'] = 'ease'
                        style['transitionDuration'] = 300 + 'ms'
                    }
                    return style
                }
            },
            textSth () {
                let body = d3.select('#ex-htl');
                //选择<body>中所有的<p>，选择集保存在变量 p 中
                let p = body.selectAll("p");
                let str = ['hello apple', 'hello orange'];
                p.data(str);
                p.text((d, i) => {
                    return "第 "+ i + " 个元素绑定的数据是 " + d;
                })
            },
            drawSVG () {
                let body = d3.select('#ex-htl');
                let dataset = [ 250 , 210 , 170 , 130 , 90 ];  //数据（表示矩形的宽度）
                let width = 300;
                let height = 300;
                body.append("svg")          //添加一个svg元素
                    .attr("width", width)       //设定宽度
                    .attr("height", height)    //设定高度
                    .attr("id", "ex-barChart");    //设定高度
            },
            drawBar () {
                let body = d3.select('#ex-htl');
                let dataset = [ 250 , 210 , 170 , 130 , 90 ];  //数据（表示矩形的宽度）
                let svg = body.select('#ex-barChart');
                let rectHeight = 25;   //每个矩形所占的像素高度(包括空白)
                // console.log(svg)
                // console.log(svg.selectAll("rect"))
                svg.selectAll("rect")   //选择svg内所有的矩形
                    .data(dataset)  //绑定数组
                    .enter()        //指定选择集的enter部分
                    .append("rect") //添加足够数量的矩形元素
                    .attr("x",20)
                    .attr("y",function(d,i){
                        // console.log(i)
                        return i * rectHeight;
                    })
                    .attr("width",function(d){
                        return d;
                    })
                    .attr("height",rectHeight-2)
                    .attr("fill","steelblue");
            },
            // 加载GPS人员位置信息接口
            async getHeatData () {
                const resp = await Mock.mock({
                    "data|400": [
                        {
                            "count|10-100": 1,
                            "lat": "@float(40, 40, 5, 5)",
                            "lng": "@float(116, 116, 5, 5)"
                        }
                    ]
                })
                // console.log(JSON.stringify(resp))
                if (resp.data) {
                    this.heatMapOption.points = resp.data;
                }
            }
        },
        watch: {},
        components: {
            gisTimeLine,
            heatMap
        }
    }
</script>

<style lang="postcss">
    #ex-htl {
        width: 100%;
        height: 1000px;
    }
    #stackDemo {
        width: 300px;
        height: 300px;
    }
    .stack {
        width: 100%;
        height: 100%;
        position: relative;
        perspective: 1000px; //子元素视距
        perspective-origin: 50% 150%; //子元素透视位置
        -webkit-perspective: 1000px;
        -webkit-perspective-origin: 50% 150%;
        margin: 0;
        padding: 0;
    }
    .stack-item{
        position: absolute;
        background: #fff;
        height: 100%;
        width: 100%;
        border-radius: 4px;
        text-align: center;
        overflow: hidden;
    }
    .stack-item > div {
        width: 100%;
        height: 100%;
        display: block;
        pointer-events: none;
    }
</style>
