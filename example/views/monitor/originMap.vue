<template lang="html">
    <div>
        <el-row  type="flex">
            <el-col :span="6" style="textAlign:right;">
                <el-button type="primary" @click="loadMap('2')">热点图</el-button>
                <el-button type="primary" @click="loadMap('1')">来源分布</el-button>
                <el-button type="primary" @click="switchMap('qinghai')">切换地图</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg mapContent" justify="center">
            <originMap ref="map" :mapType="mapType" :renderData="mapData" :renderType="renderType"></originMap>
        </el-row>
    </div>
</template>

<script>
import originMap from 'components/monitor/originMap'
import { ajax } from 'common'
export default {
    name: 'mapDemo',
    data() {
        return {
            mapData: [],
            mapType: 'china',
            renderType: '1'
        }
    },
    components: {
        originMap
    },
    mounted() {
        this.loadMap('1')
    },
    methods: {
        loadMap(type) {
            this.renderType = type
            this.$nextTick(() => {
                if (type === '1') {
                    this.fetchData('/m/getChinaData')
                } else if (type === '2') {
                    // this.loadWeiboJson('/situation/heat')
                    this.testJson()
                }
            })
        },
        switchMap(map) {
            this.mapType = map
        },
        async fetchData(url) {
            let resp = await ajax.get(url)
            console.log(resp.data)
            this.mapData = resp.data
        },
        async loadWeiboJson(url) {
            let resp = await ajax.get(url)
            this.mapData = resp.data.data
        },

        testJson() {
            $.getJSON('example/static/uli_user_count.json').then(resp => {
                let tempData = resp.RECORDS.map(m => {
                    let rank
                    if (m.count > 1000) {
                        rank = 3
                    } else if (m.count >= 100 && m.count <= 1000) {
                        rank = 2
                    } else {
                        rank = 1
                    }
                    m.rank = rank
                    return m
                })
                this.mapData = tempData
            })
        }
    }
}
</script>

<style scoped>
.mapContent {
    width: 1000px;
    height: 500px;
}
</style>
