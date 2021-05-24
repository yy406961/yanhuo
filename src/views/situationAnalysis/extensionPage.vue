<!--
 * @Author: your name
 * @Date: 2021-03-10 09:37:24
 * @LastEditTime: 2021-03-31 15:01:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yanhuo\src\views\situationAnalysis\extensionPage.vue
-->
<template>
    <div class="ga-extensionPage__container">
        <div class="ga-extensionPage__sidePart">
            <div class="ga-extensionPage__topPart">
                <containerBorder title="用户数统计">
                    <div class="ga-extensionPage__totalNum">
                        <p class="ga-extensionPage__totalNum--number">{{ totalUser }}</p>
                        <p class="ga-extensionPage__totalNum--name">{{ dataTypeStr }}</p>
                    </div>
                    <div class="ga-extensionPage__numList">
                        <div v-for="(item, index) in userStatistics" :key="index + 'number'"
                          class="ga-extensionPage__numList--numItem">
                            <div class="ga-extensionPage__numList--name">
                                <img :src="require('assets/images/extension/phone'+ index + '.png')" alt="">
                                <span>{{ item.name }}</span>
                                <span v-if="item.tip" class="ga-extensionPage__numList--tip"> &nbsp;({{ item.tip }})</span>
                            </div>
                            <div class="ga-extensionPage__numList--value" :style="'color: '+ colors[index]">{{ item.value }}</div>
                        </div>
                    </div>
                </containerBorder>
            </div>
            <div class="ga-extensionPage__bottomPart">
                <containerBorder title="用户数构成">
                    <div class="ga-extensionPage__tabCard">
                        <div class="ga-extensionPage__tabCard--tab" :class="{ On:curTab === 0 }" 
                          @click="getUserConstituteData(0)">省内</div>
                        <div class="ga-extensionPage__tabCard--tab" :class="{ On:curTab === 1 }" 
                          @click="getUserConstituteData(1)">省外</div>
                        <div class="ga-extensionPage__tabCard--tab" :class="{ On:curTab === 2 }" 
                          @click="getUserConstituteData(2)">境外</div>
                    </div>
                    <div class="ga-extensionPage__userBar">
                      <userBar :option='userBarData'></userBar>
                    </div>
                </containerBorder>
            </div>
        </div>
        <div class="ga-extensionPage__middlePart">
            <middleBorder>
                <div class="ga-extensionPage__totalCard">
                    <div class="ga-extensionPage__totalCard--tab" :class="{ On:activeIndex === 0 }" >
                        <p>实时手机用户数</p>
                        <p>{{ sssj }}</p>
                    </div>
                    <div class="ga-extensionPage__totalCard--tab" :class="{ On:activeIndex === 1 }" >
                        <p>常驻手机用户数</p>
                        <p>{{ czsj }}</p>
                    </div>
                    <div class="ga-extensionPage__totalCard--tab" :class="{ On:activeIndex === 2 }" >
                        <p>实时常驻手机用户数</p>
                        <p>{{ ssczsj }}</p>
                    </div>
                    <div class="ga-extensionPage__totalCard--tab" :class="{ On:activeIndex === 3 }" >
                        <p>流动手机用户数</p>
                        <p>{{ ldsj }}</p>
                    </div>
                </div>
                <img class="ga-extensionPage__mainBg" src="~@/assets/images/extension/manBg.png" alt="">
                <mapChart :option="mapOpt" :renderData="mapData" @areaClick="areaClick"></mapChart>
            </middleBorder>
        </div>
        <div class="ga-extensionPage__sidePart">
            <div class="ga-extensionPage__topPart">
                <containerBorder title="用户数据曲线">
                    <userLineChart ref="userLineChart" :option="lineOpt" :renderData="userLineData"></userLineChart>
                </containerBorder>
            </div>
            <div class="ga-extensionPage__bottomPart">
                <containerBorder title="手机用户流入流出对比（近7日）">
                    <phoneBarChart ref="phoneBarChart" :option="barOpt" :renderData="phoneBarData"></phoneBarChart>
                </containerBorder>
            </div>
        </div>
    </div>
</template>

<script>
    import middleBorder from './components/middleBorder'
    import containerBorder from './components/extensionBorder'
    import userLineChart from './components/userLineChart'
    import userBar from './components/userBar'
    import phoneBarChart from './components/phoneBarChart'
    import mapChart from './components/mapChart'
    import { mapGetters } from 'vuex'
    import { ajax } from 'common'
    export default {
        name: 'home',
        data() {
            return {
                // 用户数统计
                totalUser: 0,
                dataTypeStr: '实时手机用户数',
                userStatistics: [
                    { name: '长沙', value: 0 },
                    { name: '境外', value: 0 },
                    { name: '疆藏', value: 0 },
                    { name: '省内', tip: '除长沙', value: 0 },
                    { name: '省外', tip: '除湖南', value: 0 }
                ],
                colors: ['#73EAFF', '#F588FF', '#FF8168', '#62FFB7', '#E5AF16'],
                // 用户数构成
                curTab: 0,
                userBarData: [],
                // 中间部分
                activeIndex: 0,
                sssj: 0,
                czsj: 0,
                ssczsj: 0,
                ldsj: 0,
                mapOpt: {
                    width: '100%',
                    height: '400px'
                },
                mapData: [],
                // 用户数据曲线
                lineOpt: {
                    width: '100%',
                    height: '100px'
                },
                userLineData: [],
                // 手机用户流入流出对比（近7日）
                barOpt: {
                    width: '100%',
                    height: '100px'
                },
                phoneBarData: [],
                // 轮询
                timer: null
            }
        },
        created () {
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'globalKeys': 'global/globalKeys'
            }),
            contentHeight() {
                // this.vsHeight * 0.064 底部序列的高度
                return this.vsHeight - 30 - this.vsHeight * 0.064
            }
        },
        watch: {
            vsHeight (newVal) {
                if (newVal) {
                    this.chartsHeight()
                }
            },
            activeIndex (val) {
                switch (val) {
                    case 0:
                        this.dataTypeStr = '实时手机用户数'
                        this.totalUser = this.sssj
                        break;
                    case 1:
                        this.dataTypeStr = '常驻手机用户数'
                        this.totalUser = this.czsj
                        break;
                    case 2:
                        this.dataTypeStr = '实时常驻手机用户数'
                        this.totalUser = this.ssczsj
                        break;
                    case 3:
                        this.dataTypeStr = '流动手机用户数'
                        this.totalUser = this.ldsj
                        break;
                }
                this.init()
            }
        },
        mounted () {
            this.chartsHeight()
            this.getBaseData()
            this.getPhoneBarData()
            this.init()
            // 轮询
            this.rollPoling()
        },
        destroyed () {
            clearInterval(this.timer)
        },
        methods: {
            // 轮询，2分钟一次
            rollPoling() {
                this.timer = setInterval(() => {
                    if (this.activeIndex > 2) {
                        this.activeIndex = 0
                    } else {
                        this.activeIndex++
                    }
                }, 10000)
            },
            // 初始高度
            chartsHeight() {
                this.lineOpt.height = this.contentHeight * 0.52 - 38 + 'px'
                this.barOpt.height = this.contentHeight * 0.47 - 38 + 'px'
                this.mapOpt.height = this.contentHeight - 160 + 'px'
            },
            // 页面数据
            init() {
                this.getUserStatisticsData()
                this.getUserLineData()
                this.getUserConstituteData(0)
                this.getMapData()
            },
            // 获取基础数据
            getBaseData() {
                // this.sssj = 235680
                // this.czsj = 235681
                // this.ssczsj = 235682
                // this.ldsj = 235683
                // // 页面第一次进入左上角显示实时用户数
                // this.totalUser = this.sssj

                ajax.post(`api/phone/basisData/basisAll`)
                    .then(resp => {
                        if (resp) {
                            let { data } = resp;
                            this.sssj = data.sssj
                            this.czsj = data.czsj
                            this.ssczsj = data.ssczsj
                            this.ldsj = data.ldsj
                            // 页面第一次进入左上角显示实时用户数
                            this.totalUser = this.sssj
                        }
                    })
                    .catch(error => {
                        console.log('请求接口错误信息：', error)
                    })
            },
            // 获取用户数统计
            getUserStatisticsData() {
                // let data = {
                //     cs: 28441,
                //     jw: 28442,
                //     jz: 28443,
                //     sn: 28444,
                //     sw: 28445
                // }
                // this.userStatistics[0].value = data.cs
                // this.userStatistics[1].value = data.jw
                // this.userStatistics[2].value = data.jz
                // this.userStatistics[3].value = data.sn
                // this.userStatistics[4].value = data.sw

                ajax.post(`api/phone/basisData/userCount`, {
                    type: this.activeIndex
                })
                    .then(resp => {
                        if (resp) {
                            let { data } = resp;
                            this.userStatistics[0].value = data.cs
                            this.userStatistics[1].value = data.jw
                            this.userStatistics[2].value = data.jz
                            this.userStatistics[3].value = data.sn
                            this.userStatistics[4].value = data.sw
                        }
                    })
                    .catch(error => {
                        console.log('请求接口错误信息：', error)
                    })
            },
            // 用户数构成数据
            getUserConstituteData(type) {
                // let data = [
                //     { area: '长沙市', count: 123 },
                //     { area: '长沙市', count: 113 },
                //     { area: '长沙市', count: 103 },
                //     { area: '长沙市', count: 103 },
                //     { area: '长沙市', count: 103 },
                //     { area: '长沙市', count: 103 },
                //     { area: '长沙市', count: 103 },
                //     { area: '长沙市', count: 103 },
                //     { area: '长沙市', count: 103 },
                //     { area: '长沙市', count: 103 },
                //     { area: '长沙市', count: 103 },
                //     { area: '长沙市', count: 103 },
                //     { area: '长沙市', count: 103 },
                //     { area: '长沙市', count: 103 }
                // ]
                // this.userBarData = data

                this.curTab = type
                ajax.post(`api/phone/basisData/userConstitute`, {
                    sort: this.curTab,
                    type: this.activeIndex
                })
                    .then(resp => {
                        if (resp) {
                            let { data } = resp;
                            this.userBarData = data
                        }
                    })
                    .catch(error => {
                        console.log('请求接口错误信息：', error)
                    })
            },
            // 获取用户曲线数据
            getUserLineData() {
                // let data = [
                //     { name: '实时', value: [100, 200, 100, 100, 100, 100, 100], time: ['3/1', '3/2', '3/3', '3/4', '3/5', '3/6', '3/7'] },
                //     { name: '长沙', value: [200, 200, 300, 200, 200, 200, 200], time: ['3/1', '3/2', '3/3', '3/4', '3/5', '3/6', '3/7'] },
                //     { name: '境外', value: [300, 100, 300, 300, 300, 300, 300], time: ['3/1', '3/2', '3/3', '3/4', '3/5', '3/6', '3/7'] },
                //     { name: '疆藏', value: [400, 300, 400, 400, 400, 400, 400], time: ['3/1', '3/2', '3/3', '3/4', '3/5', '3/6', '3/7'] },
                //     { name: '省内', value: [500, 400, 500, 500, 500, 500, 500], time: ['3/1', '3/2', '3/3', '3/4', '3/5', '3/6', '3/7'] },
                //     { name: '省外', value: [600, 500, 600, 600, 600, 600, 600], time: ['3/1', '3/2', '3/3', '3/4', '3/5', '3/6', '3/7'] }
                // ]
                // this.userLineData = data

                ajax.post(`api/phone/basisData/userCurve`, {
                    type: this.activeIndex
                })
                    .then(resp => {
                        if (resp) {
                            let { data } = resp;
                            this.userLineData = data
                        }
                    })
                    .catch(error => {
                        console.log('请求接口错误信息：', error)
                    })
            },
            // 获取手机用户流入流出对比（近7日）
            getPhoneBarData() {
                // let data = [
                //   { name: '流入', value: [19.7, 34.7, 17.6, 8.1, 19.9, 30, 28], time: ['3/1', '3/2', '3/3', '3/4', '3/5', '3/6', '3/7'] },
                //   { name: '流出', value: [37.6, 31.9, 11.4, 6.6, 12.9, 30, 20], time: ['3/1', '3/2', '3/3', '3/4', '3/5', '3/6', '3/7'] }
                // ]
                // this.phoneBarData = data

                ajax.post(`api/phone/basisData/userFlow`, {
                    type: this.activeIndex
                })
                    .then(resp => {
                        if (resp) {
                            let { data } = resp;
                            this.phoneBarData = data
                        }
                    })
                    .catch(error => {
                        console.log('请求接口错误信息：', error)
                    })
            },
            // 获取地图数据
            getMapData() {
                // let data = [
                //     { name: '岳麓区', value: 25301 },
                //     { name: '天心区', value: 68501 },
                //     { name: '芙蓉区', value: 58963 },
                //     { name: '开福区', value: 43658 },
                //     { name: '雨花区', value: 654850 },
                //     { name: '望城区', value: 56920 },
                //     { name: '长沙县', value: 36520 },
                //     { name: '宁乡县', value: 45682 },
                //     { name: '浏阳市', value: 52104 }
                // ]
                // this.mapData = data
                ajax.post(`api/phone/basisData/mapDate`, {
                    type: this.activeIndex
                })
                    .then(resp => {
                        if (resp) {
                            let { data } = resp;
                            this.mapData = data
                        }
                    })
                    .catch(error => {
                        console.log('请求接口错误信息：', error)
                    })
            },
            // 长沙地图点击事件
            areaClick(params) {
                if (params.seriesType === 'scatter') {
                    console.log('params.value', params)
                }
            }
        },
        components: {
            middleBorder,
            containerBorder,
            userLineChart,
            userBar,
            phoneBarChart,
            mapChart
        }
    }
</script>

<style>
    @component-namespace ga {
        @b extensionPage {
            @e container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                color: #a2eeff;
                justify-content: space-between;
                background: url('~@/assets/images/extension/bg.png') no-repeat center 0;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
            }
            @e sidePart {
                height: 100%;
                display: flex;
                flex-direction: column;
                width: 25%;
                justify-content: space-between;
            }
            @e middlePart {
                height: 100%;
                display: flex;
                flex-direction: column;
                width: 49%;
                position: relative;
            }
            @e mainBg {
                width: 100%;
                position: absolute;
                bottom: 0;
            }
            @e topPart {
                height: 52%;
                position: relative;
            }
            @e bottomPart {
                height: 47%;
                position: relative;
            }
            @e totalNum {
                height: 50%;
                width: 60%;
                background: url('~@/assets/images/extension/yun.png') no-repeat center 0;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
                margin: 0 auto;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                @m number {
                    font-family: 'lcdD';
                    color: #FEFB00;
                    font-size: 26px;
                    margin-bottom: 8px;
                }
                @m name {
                    color: #fff;
                    margin-bottom: 20px;
                }
            }
            @e numList {
                color: #fff;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 0 10px;
                height: 50%;
                @m numItem {
                    /* background: #02133E; */
                    border: 1px solid #00B4FF;
                    width: 30%;
                    margin-bottom: 10px;
                }
                @m numItem:nth-last-child(2) {
                  width: 46%;
                }
                @m numItem:last-child {
                  width: 46%;
                }
                @m name {
                    display: flex;
                    align-items: center;
                    img {
                      width: 37px;
                      height: 37px;
                    }
                }
                @m tip {
                    font-size: 12px;
                }
                @m value {
                    font-family: 'lcdD';
                    font-size: 20px;
                    padding-left: 10px;
                }
            }
            @e tabCard {
                display: flex;
                @m tab {
                    width: 30%;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    cursor: pointer;
                    background: url('~@/assets/images/extension/card.png') no-repeat center 0;
                    -webkit-background-size: 100% 100%;
                    -o-background-size: 100% 100%;
                    background-size: 100% 100%;
                    &.On {
                        background: url('~@/assets/images/extension/cardOn.png') no-repeat center 0;
                        -webkit-background-size: 100% 100%;
                        -o-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                }
            }
            @e userBar {
              height: calc(100% - 30px);
              overflow: auto;
            }
            @e totalCard {
                width: 100%;
                display: flex;
                justify-content: space-between;
                height: 80px;
                padding: 0 20px;
                margin-top: 15px;
                @m tab {
                    background: url('~@/assets/images/extension/border1.png') no-repeat center 0;
                    -webkit-background-size: 100% 100%;
                    -o-background-size: 100% 100%;
                    background-size: 100% 100%;
                    color: #0CE3F0;
                    text-align: center;
                    padding-top: 12px;
                    width: 24%;
                    p:first-child {
                      color: #fff;
                      font-size: 14px;
                    }
                    p:last-child {
                      font-family: 'lcdD';
                      font-size: 24px;
                      margin-top: 8px;
                    }
                    &.On {
                        background: url('~@/assets/images/extension/border2.png') no-repeat center 0;
                        -webkit-background-size: 100% 100%;
                        -o-background-size: 100% 100%;
                        background-size: 100% 100%;
                        color: #FEFB00;
                    }
                }

            }
        }
    }
</style>
