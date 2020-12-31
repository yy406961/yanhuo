<template>
    <div class="ga-mapArea" >
        <el-button type="primary" @click.native="editMap">编辑已选区域</el-button>
        <el-button type="primary" @click.native="finishMap">完成编辑</el-button>
        <div id="mapArea_demo" class="ga-mapArea__container" ></div>
    </div>
</template>
<script>
    export default {
        name: 'reviseMapRange',
        data () {
            return {
                polyline: '',
                polygon: ''
            }
        },
        methods: {
            editMap () {
                this.polyline.enableEditing();
                this.polygon.enableEditing();
            },
            finishMap () {
                this.polyline.disableEditing();
                this.polygon.disableEditing();
                this.overlaycomplete()
            },
            overlaycomplete () {
//                console.log()
                let path = this.polyline.getPath();
                this.$emit('mapCoordinate', path)
                console.log(path)
            }
        },
        mounted () {
            this.map = new BMap.Map('mapArea_demo');
            this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
            this.map.enableScrollWheelZoom();
            this.polyline = new BMap.Polyline([
                new BMap.Point(116.399, 39.910),
                new BMap.Point(116.405, 39.920),
                new BMap.Point(116.423493, 39.907445)
            ], { strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5 });   // 创建折线
            this.map.addOverlay(this.polyline);   // 增加折线

            this.polygon = new BMap.Polygon([
                new BMap.Point(116.387112, 39.920977),
                new BMap.Point(116.385243, 39.913063),
                new BMap.Point(116.394226, 39.917988),
                new BMap.Point(116.401772, 39.921364),
                new BMap.Point(116.41248, 39.927893)
            ], { strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5 });  // 创建多边形
            this.map.addOverlay(this.polygon);   // 增加多边形
        },
        components: {}
    }
</script>
<style>
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
