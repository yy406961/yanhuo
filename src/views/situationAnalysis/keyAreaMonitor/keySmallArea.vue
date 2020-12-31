<template>
    <div class="ga-smallArea">
            <!-- 中间地图 -->
        <div class="ga-smallArea__mainWrap">
            <div class="ga-smallArea__mapWrap" v-for="(item, index) in mapOpt" :key="index">
                <p class="ga-smallArea__containerTitle">
                    <b></b>
                    {{item.name}}
                    <i v-if="crowd[index] >= 60" :class="warnStyle(index)"></i>
                    <span @click="dialogClick(item, index)"></span>
                </p>
                <p class="ga-smallArea__containerColor">
                    <span class="ga-smallArea__containerSpan">当前用户：{{mapData[index]}}</span>
                    <span class="ga-smallArea__containerSpan">容量：{{item.rong}}</span>
                    <span class="ga-smallArea__containerSpan">拥挤：{{crowd[index]}}%</span>
                </p>
                <div class="ga-smallArea__containerMap">
                    <areaJZ :options="item" :titleShow="titleShow" :curData="mapData[index]"></areaJZ>
                </div>
            </div>
        </div>
        <sysDialog size="small"
                    :title="dialogTitle"
                    @change="dialogChange"
                    v-if="dialogVisible"
                    :dialogVisible="dialogVisible"
                    :showConfirm="false"
                    :showCancel='false'>
            <div class="ga-smallArea__dialogMap">
                <p class="ga-smallArea__dialogPTitle">
                    <span>当前用户：{{pCur}}</span>
                    <span>容量：{{pRong}}</span>
                    <span>拥挤：{{pCrow}}%</span>
                </p>
                <div class="ga-smallArea__dialogMain">
                    <dialogMap :mapId="mapId" :heatData="heatData" :gpsMax="gpsMax"></dialogMap>
                </div>
            </div>
        </sysDialog>
    </div>
</template>

<script>
import areaJZ from './compontents/areaJZ'
import sysDialog from 'components/common/dialog'
import dialogMap from './compontents/dialogMap'
import { mapGetters } from 'vuex'
import { ajax } from 'common'

export default {
    name: 'smallArea',
    data() {
        return {
            dataUrl: '',
            dataUrl2: '',
            mapIndex: 0,
            mapOpt: [
                // { mapId: 'one', areaId: '1', name: '核心区', rong: '8000', value: 10000 },
                { mapId: 'two', areaId: '2', name: '管控区', rong: '7.2万', value: 72000 },
                { mapId: 'three', areaId: '3', name: '河东中心区', rong: '11万(+8)万', value: 160000 },
                { mapId: 'four', areaId: '4', name: '河西中心区', rong: '16万', value: 150000 },
                { mapId: 'five', areaId: '5', name: '橘子洲景区', rong: '9万', value: 90000 },
                // { mapId: 'six', areaId: '6', name: '岳麓山景区', rong: '8万', value: 80000 },
                { mapId: 'seven', areaId: '7', name: '解放西路蔡锷路口至湘江中路', rong: '4.8万', value: 48000 },
                { mapId: 'eight', areaId: '8', name: '黄兴中路中山亭至南门口', rong: '7.2万', value: 72000 }
            ],
            titleShow: false,
            mapData: [0, 0, 0, 0, 0, 0],
            // mapData: [0, 0, 0, 0, 0, 0, 0, 0],
            timer: null,
            // 弹框相关
            dialogVisible: false,
            dialogTitle: '弹框标题',
            mapId: 'one',
            pCur: '',
            pRong: '',
            pCrow: 0,
            gpsMax: 100,
            heatData: []
        }
    },
    computed: {
        ...mapGetters({
            'vsHeight': 'global/visualHeight',
            'dataType': 'global/dataType'
        }),
        crowd() {
            let result = []
            this.mapData.forEach((item, index) => {
                let num = (item * 100 / this.mapOpt[index].value).toFixed(2)
                result.push(Number(num))
            })
            return result
        }
    },
    mounted() {
        this.getCurData()
        this.rollPoling()
    },
    methods: {
        getCurData() {
            this.dataUrl2 = this.dataType ? 'focus/getMinCount2' : 'focus/getMinCount'
            ajax.post(this.dataUrl2).then(resp => {
                resp.data.splice(8, 1);
                resp.data.splice(0, 1);
                resp.data.splice(4, 1);
                // let data = resp.data.splice(0, 8);
                this.mapData = resp.data
            }).catch(err => {
                console.log(err)
            })
        },
        // 弹框相关
        dialogClick(data, index, bool = true) {
            let { name } = data;
            if (bool) {
                this.mapIndex = index;
                this.dialogTitle = name;
                this.pRong = this.mapOpt[index].rong;
                this.mapId = this.mapOpt[this.mapIndex].mapId
            }
            this.pCur = this.mapData[index]
            this.pCrow = Number((this.pCur * 100 / this.mapOpt[index].value).toFixed(2))
            this.getHeat(this.mapOpt[index].areaId)
            this.dialogVisible = bool
        },
        // 热地图相关
        getHeat(id) {
            this.heatData = []
            this.dataUrl = this.dataType ? 'focus/getHot2' : 'focus/getHot'
            ajax.post(this.dataUrl, { areaId: id }).then(resp => {
                let { gps, xishu } = resp.data;
                if (xishu && xishu.length) {
                    this.gpsMax = xishu[0];
                }
                if (gps) {
                    gps.forEach(item => {
                        this.heatData.push({
                            lng: item.lon,
                            lat: item.lat,
                            count: item.counts
                        })
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        dialogChange() {
            this.dialogVisible = false
        },
        rollPoling (isTurnOn = true) {
            if (isTurnOn) {
                this.timer = setInterval(() => {
                    this.getCurData(false)
                }, 300000)
            } else {
                clearInterval(this.timer)
            }
        },
        warnStyle(index) {
            let warnClass = 'ga-smallArea__normal'
            if (this.crowd[index] >= 90) {
                warnClass = 'ga-smallArea__danger'
            } else if (this.crowd[index] >= 80) {
                warnClass = 'ga-smallArea__orange'
            } else if (this.crowd[index] >= 70) {
                warnClass = 'ga-smallArea__warn'
            }
            return warnClass
        }
    },
    watch: {
        mapData() {
            this.dialogClick(this.mapOpt[this.mapIndex], this.mapIndex, false)
        },
        dataType() {
            console.log('smallarea')
            this.getHeat()
        }
    },
    beforeDestroy () {
        // 关闭轮询
        this.rollPoling(false)
    },
    components: { areaJZ, sysDialog, dialogMap }
}
</script>
<style scoped>
@component-namespace ga {
      @b smallArea {
            height:100%;
            @e mainWrap{
                height:100%;
                position: relative;
                overflow: hidden;
                font-size: 12px;
                color: #fff;
                display: flex;
                flex-wrap: wrap;
                padding-top: 20px;
                justify-content: space-between;
            }
            @e mapWrap{
                /*width: 24%;*/
                width: 33%;
                height:calc(50% - 5px);
                margin-bottom: 10px;
                border-radius: 4px;
                border: 1px solid transparent;
                background:rgba(1,6,22,0.30);
                box-shadow: 0 0 20px 0 rgba(0,0,0,0.10);
            }
            @e containerTitle{
                text-align: left;
                font-size: 14px;
                color: #fff;
                height: 40px;
                padding-left:12px;
                line-height: 40px;
                font-weight: bold;
                position: relative;
                b{
                    display: inline-block;
                    width: 16px;
                    height: 20px;
                    vertical-align: middle;
                    margin-right: 12px;
                    background: url('~assets/images/warning/position.png') no-repeat;
                    background-size: cover;
                }
                i{
                    /* position: absolute;
                    top: 10px;
                    right: 12px;
                    height: 22px;
                    width: 22px; */
                    display: inline-block;
                    height: 22px;
                    width: 23px;
                    margin-left: 8px;
                    position: relative;
                    top: 3px;
                }
                span{
                    float:right;
                    margin-right:12px;
                    height:20px;
                    width: 20px;
                    cursor: pointer;
                    background: url('~assets/images/common/fullscreen.png') no-repeat;
                    background-size: cover;
                    position: relative;
                    top: 11px;
                    opacity: 0.4;
                    transition: all 0.5s;
                    &:hover{
                        opacity: 1;
                    }
                }
            }
            @e containerColor{
                display: flex;
                height: 40px;
                line-height: 40px;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                padding: 6px 12px;
                color: #fff;
                background-image: linear-gradient(-90deg, #1ECCEE 2%, #1375D2 93%);
            }
            @e containerSpan{
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: left;
            }
            @e containerMap{
                height: calc(100% - 40px - 70px);
                margin: 10px;
                overflow: hidden;
                border-radius: 6px;
            }
            @e dialogMap{
                height:500px;
                width:100%;
                /* padding: 12px; */
            }
            @e dialogPTitle{
                height:32px;
                >span{
                    display: inline-block;
                    margin-right: 12px;
                }
            }
            @e dialogMain{
                height:calc(100% - 36px);
                width:100%;
            }
            @e normal{
                background:url("~assets/images/warning/3.png") no-repeat 0 center;
            }
            @e warn{
                background:url("~assets/images/warning/2.png") no-repeat 0 center;
                background-size: contain;
            }
            @e danger{
                background:url("~assets/images/warning/1.png") no-repeat 0 center;
            }
            @e orange{
                background:url("~assets/images/warning/4.png") no-repeat 0 center;
            }
      }
}
</style>
