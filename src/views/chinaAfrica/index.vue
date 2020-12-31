<template>
    <div class="ga-chinaAfrica">
        <div class="ga-chinaAfrica__leftWrap">
            <div class="ga-chinaAfrica__leftLJDay">
                <containerBorder>
                    <colorText :title="dayTitle" :allCount="dayAllCount" :countryCount="dayCountryCount"></colorText>
                </containerBorder>
            </div>
            <div class="ga-chinaAfrica__leftLJMonth">
                <containerBorder>
                    <colorText :title="weekTitle" :allCount="weekAllCount" :countryCount="weekCountryCount"></colorText>
                    <!-- <p><i class="ga-chinaAfrica__homeIcon"></i>市内常驻：<span v-text="residentCount"></span>人</p>
                    <p><i class="ga-chinaAfrica__planeIcon"></i>近7日新增：<span v-text="newaddCount"></span>人</p> -->
                </containerBorder>
            </div>
            <!-- <div class="ga-chinaAfrica__leftSN">
                <containerBorder title="市内常驻人员国家分布">
                    <areaBars :option='residentPersonOpt'></areaBars>
                </containerBorder>
            </div> -->
            <div class="ga-chinaAfrica__leftPerson">
                <containerBorder title="当日累计用户国家分布">
                    <areaBars :option='totalPersonOpt'></areaBars>
                </containerBorder>
            </div>
        </div>
        <div class="ga-chinaAfrica__MidWrap">
            <p v-text="midTitle"></p>
            <p v-text="midSubtitle"></p>
            <div class="ga-chinaAfrica__MidBtn">
                <el-button type="primary"
                    @click="getPointData(0)"
                    class='ga-button__realTime'
                    :class="{'actived': mapDataType === 'day'}">当 日
                </el-button><el-button type="primary"
                    @click="getPointData(1)"
                    class='ga-button__startBtn'
                    :class="{'actived': mapDataType === 'total'}">累 计
                </el-button>
            </div>
            <pointMap :option="mapStyle" ref="map" :renderData="mapData"></pointMap>
        </div>
        <div class="ga-chinaAfrica__rightWrap">
            <div class="ga-chinaAfrica__rightDay">
                <containerBorder title="近7日用户变化趋势">
                    <lineAreaChart ref="dayLine" :option="lineOpt" :renderData="dayData"></lineAreaChart>
                </containerBorder>
            </div>
            <!-- <div class="ga-chinaAfrica__rightMonth">
                <containerBorder title="近一个月人员变化趋势">
                    <lineAreaChart ref="monthLine" :option="lineOpt" :renderData="monthData"></lineAreaChart>
                </containerBorder>
            </div> -->
            <div class="ga-chinaAfrica__rightPerson">
                <containerBorder title="用户活跃区域">
                    <gisMap class="ga-chinaAfrica__gismap"
                            :renderData="gisMaptData"
                            :dataType="dataType"
                            :showControl="false"
                            ref="gismap"></gisMap>
                </containerBorder>
            </div>
        </div>
    </div>
</template>

<script>
import containerBorder from 'components/common/containerBorder'
import colorText from './componrents/colorText'
import pointMap from './componrents/pointMap'
import areaBars from 'components/monitor/areaBars'
import lineAreaChart from 'components/Chart/newHome/lineArea'
import gisMap from 'components/Chart/newHome/gisMap'
import { mapGetters } from 'vuex'
import { ajax } from 'common'
const apiRoot = 'chinaAfrica'
export default {
    name: 'chinaAfrica',
    data() {
        return {
            // 当日累计在线人数
            dayTitle: '当日累计在线用户数：',
            dayAllCount: 0,
            dayCountryCount: 0,
            // 近一个月累计在线人数
            weekTitle: '近7日累计在线用户数：',
            weekAllCount: 0,
            weekCountryCount: 0,
            residentCount: 0,
            newaddCount: 0,
            // 市内常驻人员国家分布
            residentPersonOpt: {
                data: [],
                secondShow: false,
                click: true // 能否点击展开，TRUE为能，FALSE不能
            },
            // 近7日新增人员国家分布
            totalPersonOpt: {
                data: [],
                secondShow: false,
                click: true // 能否点击展开，TRUE为能，FALSE不能
            },
            // 国家分布情况
            midTitle: '非洲地区到访用户',
            midSubtitle: '国家分布情况：',
            mapDataType: 'day',
            mapData: [],
            dayMapData: [],
            totalMapData: [],
            // 近7天人员变化趋势
            dayData: [],
            // 近一个月人员变化趋势
            monthData: [],
            // 人员活跃区域
            gisMaptData: [],
            dataType: 0 // dataType 为5或6时，组件gisMap显示打点
        }
    },
    computed: {
        ...mapGetters({
            'vsHeight': 'global/visualHeight'
        }),
        mapStyle () {
            return {
                width: '100%',
                height: this.vsHeight - 60 - 50 + 'px',
                props: {
                    gridBottom: 0,
                    gridTop: 0,
                    gridLeft: 0,
                    gridRight: 0,
                    mapType: 'Africa'
                }
            }
        },
        lineOpt() {
            return {
                width: '100%',
                height: this.vsHeight * 0.38 - 60 + 'px',
                props: {
                    gridLeft: 50,
                    gridTop: 15,
                    gridRight: 20,
                    gridBottom: 20,
                    legendShow: false
                }
            }
        }
    },
    mounted() {
        this.initFunc()
    },
    methods: {
        initFunc() {
            this.getTotalData()
            this.getPersonDisData()
            this.getPointData(0)
            this.getLineData()
            this.getGisMapData()
        },
        // 获取当日/累计在线人数数据
        getTotalData() {
            ajax.post(`${apiRoot}/getTotalData`).then(resp => {
                let { data } = resp
                this.dayAllCount = data.dayAllCount
                this.dayCountryCount = data.dayCountryCount
                this.weekAllCount = data.monthAllCount
                this.weekCountryCount = data.monthCountryCount
                this.residentCount = data.residentCount
                this.newaddCount = data.newaddCount
            }).catch(err => {
                console.log(err)
            })
        },
        // 获取市内常驻/近7日新增人员国家分布柱图数据
        getPersonDisData() {
            ajax.post(`${apiRoot}/getPersonDisData`).then(resp => {
                let { data } = resp
                // this.residentPersonOpt.data = data.resident
                this.totalPersonOpt.data = data.dayData
                // 中间地图数据
                this.dayMapData = data.dayData
                this.totalMapData = data.monthData
                this.mapData = this.dayMapData
            }).catch(err => {
                console.log(err)
            })
        },
        // 获取非洲地区到访人员国家分布情况数据
        getPointData(type) {
            // type 0 当日 1 累计
            if (type === 0) {
                this.mapDataType = 'day'
                this.mapData = this.dayMapData
            } else {
                this.mapDataType = 'total'
                this.mapData = this.totalMapData
            }
            // ajax.post(`${apiRoot}/getPointData`, { type: type }).then(resp => {
            //     let { rows } = resp
            //     this.mapData = rows
            // }).catch(err => {
            //     console.log(err)
            // })
        },
        // 获取近7天/近一个月人员变化趋势折线图数据
        getLineData() {
            ajax.post(`${apiRoot}/getLineData`).then(resp => {
                let { data } = resp
                let dayData = [
                    { name: '近7天人员变化趋势', data: [], time: [] }
                ]
                let monthData = [
                    { name: '近一个月人员变化趋势', data: [], time: [] }
                ]
                data.dayData.forEach(item => {
                    dayData[0].data.push(item.value)
                    dayData[0].time.push(item.time)
                })
                data.monthData.forEach(item => {
                    monthData[0].data.push(item.value)
                    monthData[0].time.push(item.time)
                })
                this.dayData = dayData
                this.monthData = monthData
            }).catch(err => {
                console.log(err)
            })
        },
        // 获取人员活跃区域地图数据
        getGisMapData() {
            this.dataType = 5 // dataType 为5或6时，组件gisMap显示打点
            ajax.post(`${apiRoot}/getGisMapData`).then(resp => {
                let { data } = resp
                this.gisMaptData = data
                this.$refs.gismap.loadData(this.gisMaptData)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    components: {
        containerBorder,
        colorText,
        pointMap,
        areaBars,
        lineAreaChart,
        gisMap
    }
}
</script>

<style>
    @component-namespace ga {
        @b chinaAfrica {
            width: 100%;
            height: 100%;
            color:#A2EEFF;
            display: flex;
            justify-content: space-between;
            /*border:1px solid #f00;*/
            @e leftWrap{
                width: 25%;
                >div{
                margin-bottom: 8px;
            }
            }
            @e leftLJDay{
                height: 19%;
            }
            @e leftLJMonth{
                color: #00C5FF;
                height: 19%;
                font-size: 14px;
            }
            @e leftLJMonthHeight {
                height:calc(100% - 44px);
            }
            @e homeIcon {
                display: inline-block;
                width: 15px;
                height: 15px;
                background: url('~@/assets/images/common/sn.png') no-repeat;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
                margin: 0 6px -1px 5px;
            }
            @e planeIcon {
                display: inline-block;
                width: 15px;
                height: 15px;
                background: url('~@/assets/images/common/plane.png') no-repeat;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
                margin: 5px 6px -1px 5px;
            }
            @e leftSN{
                height:30%;
            }
            @e leftPerson{
                height: calc(62% - 16px);
                margin-bottom:0;
            }
            @e MidWrap{
                position: relative;
                background: url('~@/assets/images/common/GroupNew.png') no-repeat center 0;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
                width: calc(50% - 16px);
                padding: 40px 40px 20px 40px;
                /*border:2px solid #0ff;*/
                p:first-child{
                    margin-bottom: 8px;
                    color:#E5C100;
                }
            }
            @e MidBtn {
                position: absolute;
                right: 20px;
                top: 40px;
            }
            @e rightWrap{
                width: 25%;
                /*border:2px solid #0ff;*/
                >div{
                    margin-bottom: 8px;
                }
            }
            @e rightDay{
                height: 38%;
            }
            @e rightMonth{
                height: 27%;
            }
            @e rightPerson{
                margin-bottom: 0;
                height: calc(62% - 8px);
            }
        }
    }
</style>
