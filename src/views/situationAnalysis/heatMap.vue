<template>
    <div id='heatMapContainer'>
    </div>
</template>

<script>
    import BMap from 'BMap'
    import BMapLib from 'BMapLib'
    export default {
        data () {
            return {
                map: '', // 地图元素
                heatOverlay: '', //  热力图
                maxIndex: 0, // 热力点最大值索引，默认所有点按count值大小降序排序，即第 0 个为最大值
                enableRadiusChange: false
            }
        },
        props: ['option'],
        mounted () {
            this.createMap(this.option)
        },
        methods: {
            /**
             * 创建地图
             * @param {option} 地图配置
             * */
            createMap (option) {
                // 在id为heatMapContainer的div中画地图
                this.map = new BMap.Map('heatMapContainer', { minZoom: 4, maxZoom: 18 });
                // 设置中心点和初始层级
                try {
                    if (option.points && option.points.length) {
                    // 有热力点数据
                        let view = this.map.getViewport(option.points.map(item => {
                            return new BMap.Point(item.lng, item.lat)
                        }));
                        this.map.centerAndZoom(view.center, view.zoom);
                    } else {
                    // 无热力点数据
                        if (typeof option.center === 'string') {
                            this.map.centerAndZoom(option.center, option.zoom);
                        } else {
                            let point = new BMap.Point(option.center[0], option.center[1]);
                            this.map.centerAndZoom(point, option.zoom || 12);
                        }
                    }
                } catch (error) {
                    console.log('非法的中心点或层级')
                    this.map.centerAndZoom('中国')
                }
                // 添加控件
                let topRightNavigation = new BMap.NavigationControl({
                    anchor: 1,  // 控件位置，左 0，右 1
                    type: 0 // 控件类型
                });
                this.map.addControl(topRightNavigation)
                // 允许地图进行滚轮缩放
                this.map.enableScrollWheelZoom();
            },
            /**
             * 渲染热力图方法
             * @param {userOptions} 热力图用户配置
             * @param {points} 热力点数据 Array[{lng, lat, count}]
             * */
            renderHeatPoints (userOptions, points) {
                let option = Object.assign({
                    'radius': 20 // 默认半径
                }, userOptions)
                // 允许热力点半径动态
                if (this.enableRadiusChange) {
                    option.radius = this.heatRadius()
                }
                this.heatOverlay = new BMapLib.HeatmapOverlay(option);
                this.map.addOverlay(this.heatOverlay);
                $('.heatmap-canvas')[0].style.zIndex = -1;
                // 默认 10% 的点为红色
                let maxIndex = Math.floor(points.length * 0.1);
                try {
                    this.heatOverlay.setDataSet({
                        data: points,
                        max: points[maxIndex].count
                    });
                } catch (error) {
                    console.log('热力图组件未检测到符合标准的热力数据，请检查数据是否正常')
                }
            },
            // 计算热力点动态半径
            heatRadius () {
                let radius;
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
                        radius = 8;
                        break;
                }
                return radius
            }
        },
        watch: {
            'option': {
                handler (newval) {
                    // console.log(newval)
                    this.createMap(newval)
                    // 允许热力点半径动态
                    if (newval.enableRadiusChange === true) {
                        this.enableRadiusChange = true
                        // 绑定层级缩放完成事件
                        this.map.onzoomend = () => {
                            console.log('当前地图层级：', this.map.getZoom())
                            console.log('当前半径：', this.heatRadius)
                            this.map.removeOverlay(this.heatOverlay);
                            this.renderHeatPoints(newval.heatMapOptions, newval.points);
                        }
                    }
                    // this.map.removeOverlay(this.heatOverlay);
                    this.renderHeatPoints(newval.heatMapOptions, newval.points)
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    #heatMapContainer {
      width: 100%;
      height: 100%;
    }
</style>
