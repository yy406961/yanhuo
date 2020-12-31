<template lang="html">
      <div class="ga-mapArea" >
          <div id="mapArea_demo" class="ga-mapArea__container"></div>
      </div>
</template>

<script>
export default {
    name: 'mapArea',
    data () {
        return {
            overlays: []
        }
    },
    methods: {
        overlaycomplete (e) {
            this.overlays.push(e.overlay)
        },
        clearAll () {
            for (var i = 0; i < this.overlays.length; i++) {
                this.map.removeOverlay(this.overlays[i]);
            }
            this.overlays.length = 0
        }
    },
    mounted () {
        this.map = new BMap.Map('mapArea_demo');
        const poi = new BMap.Point(106.26667, 38.46667);
        this.map.centerAndZoom(poi, 16);
        this.map.enableScrollWheelZoom();
        var styleOptions = {
            strokeColor: 'red',    // 边线颜色。
            fillColor: 'red',      // 填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       // 边线的宽度，以像素为单位。
            strokeOpacity: 0.8,	   // 边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      // 填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' // 边线的样式，solid或dashed。
        }
        // 实例化鼠标绘制工具
        var drawingManager = new window.BMapLib.DrawingManager(this.map, {
            isOpen: false, // 是否开启绘制模式
            enableDrawingTool: true, // 是否显示工具栏
            drawingToolOptions: {
                anchor: window.BMAP_ANCHOR_TOP_RIGHT, // 位置
                offset: new BMap.Size(5, 5) // 偏离值
            },
            circleOptions: styleOptions, // 圆的样式
            polylineOptions: styleOptions, // 线的样式
            polygonOptions: styleOptions, // 多边形的样式
            rectangleOptions: styleOptions // 矩形的样式
        })
        drawingManager.addEventListener('overlaycomplete', this.overlaycomplete);
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
