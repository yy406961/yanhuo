<template lang="html">
    <div>
        <el-row  type="flex">
            <el-col :span="6" style="textAlign:right;">
                <el-button type="primary" @click="switchMap('ningxia')">切换地图</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg heatMap" justify="center" >
            <heatMap ref="map" :mapType="mapType" :renderData="mapData" ></heatMap>
        </el-row>
    </div>
</template>

<script>
import heatMap from 'components/monitor/heatMap'
// import { ajax } from 'common'
export default {
    name: 'mapDemo',
    data() {
        return {
            mapData: [],
            mapType: 'ningxia'
        }
    },
    components: {
        heatMap
    },
    mounted() {
        this.loadMap()
    },
    methods: {
        loadMap() {
            this.$nextTick(() => {
                // this.loadWeiboJson('/situation/heat')
                this.testJson()
            })
        },
        switchMap(map) {
            this.mapType = map
        },
        testJson() {
            $.getJSON('example/static/uli_user_count.json').then(resp => {
                this.mapData = resp.RECORDS
            })
        }
    }
}
</script>

<style lang="css">
    .heatMap {
        position: relative;
        width: 500px;
        height: 500px;
    }
</style>
