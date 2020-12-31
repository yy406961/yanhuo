<template lang="html">
      <div class="ga-mapArea" >
          <div id="map_demo" class="ga-mapArea__container"></div>
      </div>
</template>

<script>
import Mock from 'mockjs'
export default {
    name: 'mapMassPoint',
    data () {
        return {
            overlays: []
        }
    },
    methods: {
        addMarker (point) {
            var marker = new BMap.Marker(point);
            this.map.addOverlay(marker);
        }
    },
    mounted () {
        const data = Mock.mock({
            'data|2000': [
                [
                    {
                        'number|106.3': 1
                    },
                    {
                        'number|38.3': 1
                    }
                ]
            ]
        })
        // console.log(data)
        // const BMAP_POINT_SHAPE_STAR = 1,      // 五角星
        //     BMAP_POINT_SHAPE_WATERDROP = 2,   // 水滴状
        //     BMAP_POINT_SHAPE_CIRCLE = 3,      // 圆形  默认
        //     BMAP_POINT_SHAPE_SQUARE = 4,      // 方形
        //     BMAP_POINT_SHAPE_RHOMBUS = 5      // 菱形
        // const BMAP_POINT_SIZE_TINY = 1,     // 定义点的尺寸为超小，宽高为2px*2px
        //     BMAP_POINT_SIZE_SMALLER = 2,    // 4px*4px
        //     BMAP_POINT_SIZE_SMALL = 3,      // 8px*8px
        //     BMAP_POINT_SIZE_NORMAL = 4,     // 10px*10px，为海量点默认尺寸
        //     BMAP_POINT_SIZE_BIG = 5,        // 16px*16px
        //     BMAP_POINT_SIZE_BIGGER = 6,     // 20px*20px
        //     BMAP_POINT_SIZE_HUGE = 7        // 30px*30px
        this.map = new BMap.Map('map_demo');
        this.map.centerAndZoom(new BMap.Point(106.505, 38.523), 9);     // 初始化地图,设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom();                        // 启用滚轮放大缩小
        if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
            var points = [];  // 添加海量点数据
            for (var i = 0; i < data.data.length; i++) {
                points.push(new BMap.Point(data.data[i][0].number, data.data[i][1].number));
            }
            // var myIcon = new BMap.Icon("pink.png");
            var options = {
                size: 3,
                shape: 3,
                color: '#f00'
                // icon: myIcon
            }
            var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
            pointCollection.addEventListener('click', function (e) {
                alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
            });
            this.map.addOverlay(pointCollection);  // 添加Overlay
            // for (var j = 0; j < 20; j++) {
            //     var point = new BMap.Point(data.data[j][0].number, data.data[j][1].number);
            //     this.addMarker(point);
            // }
        } else {
            alert('请在chrome、safari、IE8+以上浏览器查看本示例');
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
            height : 100%;
        }
    }
}
</style>
