<template>
    <div class="ga-newHome__container">
        <div class="ga-newHome__sidePart">
            <div class="ga-newHome__mid">
                <containerBorder title="常住用户统计分布">
                    <pieChart ref="residenceUserPie" :option="residenceUserOpt" :renderData="residenceUserData"></pieChart>
                </containerBorder>
            </div>
            <div class="ga-newHome__mid">
                <containerBorder title="流动用户统计分布">
                    <pieChart ref="moveUserPie" :option="moveUserOpt" :renderData="moveUserData"></pieChart>
                </containerBorder>
            </div>
            <!-- <div class="ga-newHome__min">
                <containerBorder title="移动上网统计">
                    <div class="ga-newHome__touristPart">
                        <touristCom :option="touristProvince" class="ga-newHome__touristLeft"></touristCom>
                        <touristCom :option="touristSpot" class="ga-newHome__touristRight"></touristCom>
                    </div>
                </containerBorder>
            </div> -->
        </div>
        <div class="ga-newHome__middlePart">
            <div class="ga-newHome__middleTop">
                <mainBorder :option="mainOpt" @activeDataType="activeDataType">
                    <!--<populMap :renderData="mapLightData"-->
                              <!--:dataType="dataType"-->
                              <!--:mapType="mapLightType"-->
                              <!--ref="mapLinght"-->
                              <!--:size="mapLightSize" ></populMap>-->
                    <gisMap class="ga-newHome__gismap"
                            :renderData="mapLightData"
                            :dataType="dataType"
                            ref="mapLinght"></gisMap>
                </mainBorder>
            </div>
            <!--<div class="ga-newHome__middleBottm">-->
                <!--<containerBorder title="近7天用户趋势图">-->
                    <!--<lineAreaChart ref="allUserLine" :option="allUserOpt" :renderData="allUserData"></lineAreaChart>-->
                <!--</containerBorder>-->
            <!--</div>-->
        </div>
        <div class="ga-newHome__sidePart">
            <div class="ga-newHome__mid">
                <containerBorder title="外省流动用户统计分布">
                    <transferMap ref="chinaRef" :option="chinaMapOpt" :renderData="chinaMapData"
                              class="ga-newHome__pointMap"></transferMap>
                    <topCom :option="topProvince" class="ga-newHome__top"></topCom>
                </containerBorder>
            </div>
            <div class="ga-newHome__mid">
                <containerBorder title="境外用户统计分布">
                    <transferMap ref="worldRef" :option="worldMapOpt" :renderData="worldMapData"
                                 class="ga-newHome__pointMap"></transferMap>
                    <topCom :option="topCountry"  class="ga-newHome__top"></topCom>
                </containerBorder>
            </div>
            <!-- <div class="ga-newHome__min">
                <containerBorder title="重点区域用户统计">
                    <div class="ga-newHome__touristPart">
                        <userCount :option="scenicOpt" class="ga-newHome__touristLeft"></userCount>
                        <userCount :option="trafficOpt" class="ga-newHome__touristRight"></userCount>
                    </div>
                </containerBorder>
            </div> -->
        </div>
    </div>
</template>

<script>
    // import mainBorder from 'components/common/mainBorder'
    import mainBorder from 'components/common/mainBorderNew'
    import populMap from 'components/Chart/newHome/populMap'
    import gisMap from 'components/Chart/newHome/gisMap'
    import containerBorder from 'components/common/containerBorder'
    import lineAreaChart from 'components/Chart/newHome/lineArea'
    import pieChart from 'components/Chart/newHome/pieChart'
    import pointMap from 'components/Chart/newHome/pointMap'
    import transferMap from 'components/Chart/newHome/transferMap'
    import barChart from 'components/Chart/newHome/barCharts'
    import topCom from 'components/common/topCom'
    import touristCom from 'components/Chart/newHome/touristCom'
    import userCount from 'components/Chart/newHome/userCount'
    import { mapGetters } from 'vuex'
    import { ajax } from 'common'
    const apiRoot = 'population'
    export default {
        name: 'home',
        data() {
            return {
                // 中间用户点图
                mapLightType: '',
                mapLightData: [],
                dataType: -1,
                // 常住用户统计分布
                residenceUserOpt: {
                    width: '100%',
                    height: '100px',
                    props: {
                        showLabel: true,
                        gridLeft: 45,
                        gridTop: 20,
                        gridRight: 10,
                        gridBottom: 8
                    }
                },
                residenceUserData: [],
                // 境外用户来源分布图
                worldMapOpt: {
                    width: '100%',
                    height: '100px',
                    props: {
                        gridBottom: 0,
                        gridTop: 0,
                        gridLeft: 0,
                        gridRight: 5,
                        mapType: 'world'
                    }
                },
                worldMapData: [],
                topCountry: {
                    width: '98%',
                    data: []
                },
                // 实时用户
                mainOpt: {
                    title: '实时总用户数：',
                    tip: '按小时统计长沙市全部手机用户数量',
                    count: 0,
                    data: [
                        {
                            name: '常住',
                            value: 0,
                            type: 2,
                            tip: '最近一个月内，累计在长沙市出现天数大于等于20天的手机用户数量。'
                        },
                        {
                            name: '流动',
                            value: 0,
                            type: 3,
                            tip: '流动用户=当日实有用户-当日过境用户-当日常住用户（交集减）。'
                        },
                        // {
                        //     name: '旅游',
                        //     value: 0,
                        //     type: 4,
                        //     tip: '全市当日实有用户中，排除全市上月稳定用户，当日在监测区域指定景点出现的用户，停留时间超过一定阈值，考虑景区开放时间，去重后汇总计算得到当日旅游用户。'
                        // },
                        {
                            name: '过境',
                            value: 0,
                            type: 9,
                            tip: '当日全用户中，排除全市上月稳定用户，当日在长沙市停留时间小于10小时，且前后24小时连续无信令的手机用户数量。'
                        },
                        {
                            name: '境外',
                            value: 0,
                            type: 5,
                            tip: '通过手机号码归属地、短彩信内容梳理、通联关系，每天更新名单库。'
                        },
                        {
                            name: '疆藏',
                            value: 0,
                            type: 6,
                            tip: '按小时统计来自涉疆涉藏区域的手机用户数量。'
                        }
                    ]
                },
                // 近一周用户趋势图
                allUserOpt: {
                    width: '100%',
                    height: '150px',
                    props: {
                        gridLeft: 50,
                        gridTop: 15,
                        gridRight: 20,
                        gridBottom: 20
                    }
                },
                allUserData: [],
                // 流动用户统计分布
                moveUserOpt: {
                    width: '100%',
                    height: '100px',
                    props: {
                        showLabel: true,
                        gridLeft: 2,
                        gridTop: 40,
                        gridRight: 2,
                        gridBottom: 8
                    }
                },
                moveUserData: [],
                // 外省流动用户统计分布
                chinaMapOpt: {
                    width: '100%',
                    height: '100px',
                    props: {
                        gridBottom: 0,
                        gridTop: 0,
                        gridLeft: 0,
                        gridRight: 0,
                        mapType: 'china'
                    }
                },
                chinaMapData: [],
                topProvince: {
                    width: '98%',
                    data: []
                },
                // 外地旅游用户统计分布
                touristProvince: {
                    type: 0,
                    data: []
                },
                touristSpot: {
                    type: 1,
                    data: []
                },
                scenicOpt: {
                    color: 'rgba(60,181,255, 0.5)',
                    title: '景区总用户数TOP5',
                    data: []
                },
                trafficOpt: {
                    color: 'rgba(0,255,191, 0.5)',
                    title: '重点交通枢纽总用户数TOP5',
                    data: []
                },
                mapPoint: [
                    { name: '雨花区', lng: '113.0437456832', lat: '28.1419733619' },
                    { name: '天心区', lng: '112.9963626534', lat: '28.1198468153' },
                    { name: '望城县', lng: '112.8378230306', lat: '28.3596506745' },
                    { name: '芙蓉区', lng: '113.0389882830', lat: '28.1912724183' },
                    { name: '开福区', lng: '112.9919929616', lat: '28.2627574380' },
                    { name: '岳麓区', lat: '28.2404996218', lng: '112.9365752311' },
                    { name: '长沙县', lat: '28.2524699155', lng: '113.0872039486' },
                    { name: '宁乡县', lat: '28.2831913206', lng: '112.5584174275' },
                    { name: '浏阳县', lat: '28.1701099979', lng: '113.6495706421' }
                ],
                // 特定少数民族用户统计分布
                // speciallyUserOpt: {
                //     width: '100%',
                //     height: '100px'
                // },
                // speciallyUserData: [],
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
            },
            mapLightSize() {
                return {
                    width: '100%',
                    height: this.contentHeight * 0.64 - 40 + 'px'
                }
            }
        },
        watch: {
            vsHeight (newVal) {
                if (newVal) {
                    this.chartsHeight()
                }
            }
        },
        mounted () {
            this.mapLightType = this.globalKeys.gMapKey;
            // this.mapLightType = 'ningxia'
            this.initFunc()
            this.chartsHeight()
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
                    this.getAllUserData()
                }, 300000)
            },
            initFunc() {
                this.getHourHotData(1)
                this.getAllUserData()
                this.getUserSourceData()
                this.getMoveUserData()
                this.getResidenceUserData()
                // this.getUserLineData()
                // this.getTourUserData()
                // this.getUserCount()
            },
            // 初始高度
            chartsHeight() {
                // let basicsHeight = this.contentHeight * 0.33 - 38
                let middleHeight = this.contentHeight * 0.36 - 38
                let leftMidHeight = this.contentHeight * 0.45 - 5
                this.residenceUserOpt.height = leftMidHeight + 'px'
                this.moveUserOpt.height = leftMidHeight + 'px'
                this.allUserOpt.height = middleHeight + 'px'
                // this.speciallyUserOpt.height = basicsHeight + 'px'
                this.chinaMapOpt.height = leftMidHeight + 26 + 'px'
                this.worldMapOpt.height = leftMidHeight + 26 + 'px'
            },
            // 中间地图数据类型切换
            activeDataType (type) {
                switch (type) {
                    case 2:
                    case 3:
                    case 4:
                    case 9:
                        this.getDayHotData(type)
                        break;
                    case 1:
                    case 5:
                    case 6:
                        this.getHourHotData(type)
                        break;
                }
                this.dataType = type
            },
            // 获取中间地图数据 常住用户，流动用户，旅游用户2.常住人口，3.流动人口，4.旅游人口
            getDayHotData(val) {
                let arr = []
                this.mapLightData = []
                ajax.post(`${apiRoot}/populationDay`).then(resp => {
                    let { rows } = resp
                    if (rows && rows.length) {
                        rows.forEach(item => {
                            if (item.type === val) {
                                arr.push(item)
                            }
                        })
                        this.mapLightData = arr
                        this.mapLightData = arr.filter(item => {
                            return item.lat !== '' || item.lon !== ''
                        })
                        this.$refs.mapLinght.loadData(this.mapLightData)
                    } else {
                        this.mapLightData = []
                    }
                }).catch(error => {
                    console.log('请求接口错误信息：', error)
                })
            },
            // 1实有人口,5.境外入口6.特定少数名族人口
            getHourHotData(val) {
                let arr = []
                this.mapLightData = []
                ajax.post(`${apiRoot}/populationHour`).then(resp => {
                    let { rows } = resp
                    if (rows && rows.length) {
                        rows.forEach(item => {
                            if (item.type === val) {
                                arr.push(item)
                            }
                        })
                        this.mapLightData = arr
                        if ([5, 6].includes(val)) {
                            this.mapLightData.map((item, index) => {
                                if ((item.lon === '' || item.lat === '') && index < 9) {
                                    item.lon = this.mapPoint[index].lng
                                    item.lat = this.mapPoint[index].lat
                                    item.name = this.mapPoint[index].name
                                }
                            })
                        }
                        this.mapLightData = arr.filter(item => {
                            return item.lat !== '' || item.lon !== ''
                        })
                        this.$refs.mapLinght.loadData(this.mapLightData)
                    } else {
                        this.mapLightData = []
                    }
                }).catch(error => {
                    console.log('请求接口错误信息：', error)
                })
            },
            // 获取在线用户数据获取
            getAllUserData() {
                // ajax.post(`situation/overall`).then(resp => {
                //     let { data } = resp
                //     if (data) {
                //         this.mainOpt.count = data.allcount
                //     }
                // }).catch(error => {
                //     console.log('请求接口错误信息：', error)
                // })
                ajax.post(`${apiRoot}/allUserCount`)
                    .then(resp => {
                        if (resp) {
                            let { rows } = resp;
                            if (rows) {
                                rows.forEach(item => {
                                    if (item.type === 1) {
                                        this.mainOpt.count = item.value
                                    }
                                })
                                this.mainOpt.data.map(it => {
                                    rows.forEach(item => {
                                        if (it.type === item.type) {
                                            it.value = item.value
                                        }
                                        return item
                                    })
                                })
                            }
                        }
                    })
                    .catch(error => {
                        console.log('请求接口错误信息：', error)
                    })
            },
            // 获取境外、外省用户来源分布图数据
            getUserSourceData() {
                let chinaData = []
                let worldData = []
                ajax.post(`${apiRoot}/externalUserCount`).then(resp => {
                    let { rows } = resp
                    if (rows && rows.length) {
                        rows.forEach(item => {
                            let str = _.cloneDeep(item)
                            str.source = item.name
                            str.target = '湖南'
                            if (str.type === 0) {
                                chinaData.push(str)
                            } else if (str.type === 1) {
                                worldData.push(str)
                            }
                        })
                        this.topProvince.data = chinaData.slice(0, 6)
                        this.topCountry.data = worldData.slice(0, 6)
                        setTimeout(() => {
                            this.$refs.chinaRef.loadData(chinaData)
                            this.$refs.worldRef.loadData(worldData)
                        }, 1000)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 获取流动用户统计分布饼图数据
            getMoveUserData() {
                this.moveUserData = []
                // this.$refs.moveUserPie.startLoading()
                ajax.post(`${apiRoot}/temporaryUserCount`).then(resp => {
                    let { data } = resp
                    let indata = []
                    // let indata = [
                    //     { value: data.out > 0 ? data.out : 0, name: '外省' },
                    //     { value: data.in > 0 ? data.in : 0, name: '本市' }
                    // ]
                    if (data.out > 0) {
                        indata.push({ value: data.out, name: '外省流动用户' })
                    }
                    if (data.in > 0) {
                        indata.push({ value: data.in, name: '省内流动用户', selected: true })
                    }
                    let moveUserData = []
                    moveUserData.push(indata)
                    data.detail = []
                    moveUserData.push(data.detail)
                    this.$refs.moveUserPie.loadData(moveUserData)
                    // this.$refs.moveUserPie.endLoading()
                }).catch(err => {
                    console.log(err)
                    // this.$refs.moveUserPie.endLoading()
                })
            },
            // 获取常住用户统计分布饼图数据
            getResidenceUserData() {
                this.residenceUserData = []
                // this.$refs.residenceUserPie.startLoading()
                ajax.post(`${apiRoot}/permanentUserCount`).then(resp => {
                    let { rows } = resp
                    if (rows && rows.length) {
                        this.residenceUserData.push(rows)
                    }
                    // this.$refs.residenceUserPie.endLoading()
                }).catch(err => {
                    console.log(err)
                    // this.$refs.residenceUserPie.endLoading()
                })
            },
            // 获取近一周用户趋势图数据
            getUserLineData() {
                let allUserData = [
                    { name: '总用户', data: [], time: [] },
                    { name: '常住用户', data: [], time: [] },
                    { name: '流动用户', data: [], time: [] }
                ]
                ajax.post(`${apiRoot}/userTrendWeekCount`).then(resp => {
                    let { rows } = resp
                    rows.forEach(item => {
                        if (item.type === 1) {
                            allUserData[0].data.push(item.value)
                            allUserData[0].time.push(item.time)
                        } else if (item.type === 2) {
                            allUserData[1].data.push(item.value)
                            allUserData[1].time.push(item.time)
                        } else if (item.type === 3) {
                            allUserData[2].data.push(item.value)
                            allUserData[2].time.push(item.time)
                        }
                    })
                    this.allUserData = allUserData
                }).catch(err => {
                    console.log(err)
                })
            },
            //  获取外地旅游用户统计分布数据
            getTourUserData() {
                // ajax.post(`${apiRoot}/foreignTravelCount`).then(resp => {
                //     let { rows } = resp
                //     if (rows && rows.length) {
                //         rows.forEach(item => {
                //             if (item.type === 0) {
                //                 this.touristProvince.data.push(item)
                //             } else if (item.type === 1) {
                //                 this.touristSpot.data.push(item)
                //             }
                //         })
                //     }
                // }).catch(err => {
                //     console.log(err)
                // })
                ajax.post(`/ybrz/getYbrz`, {
                    code: '0',
                    flag: 2
                })
                    .then(resp => {
                        if (resp) {
                            let { data } = resp;
                            if (data) {
                                this.touristProvince.data = data.appTop.slice(0, 5)
                                this.touristSpot.data = data.internetHotWord.slice(0, 5)
                            }
                        }
                    })
                    .catch(error => {
                        console.log('请求接口错误信息：', error)
                    })
            },
            // 重点区域用户统计
            getUserCount() {
                this.scenicOpt.dat = []
                this.trafficOpt.data = []
                ajax.post(`keyArea/userCountTop5`).then(resp => {
                    let { data } = resp
                    let { scenic, transportation } = data
                    if (scenic && scenic.length) {
                        this.scenicOpt.data = scenic.slice(0, 5)
                    }
                    if (transportation && transportation.length) {
                        this.trafficOpt.data = transportation.slice(0, 5)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        components: {
            mainBorder,
            containerBorder,
            lineAreaChart,
            pieChart,
            pointMap,
            transferMap,
            barChart,
            touristCom,
            userCount,
            topCom,
            populMap,
            gisMap
        }
    }
</script>

<style>
    @component-namespace ga {
        @b newHome {
            @e container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                color: #a2eeff;
            }
            @e sidePart {
                height: 100%;
                display: flex;
                flex-direction: column;
                width: 25%;
            }
            @e middlePart {
                height: 100%;
                display: flex;
                flex-direction: column;
                width: 50%;
            }
            @e gismap {
                width: 100%;
                height: 100%;
            }
            @e mid {
                height: 49.5%;
                margin: 0 3px 4px;
                position: relative;
            }
            @e min {
                height: 33%;
                margin: 0 3px 4px;
                position: relative;
            }
            @e pointMap {
                margin-top: -28px;
            }
            @e top {
                position: absolute;
                bottom: 5px;
            }
            @e middleTop {
                height: 100%;
                margin: 0 4px 4px;
            }
            @e middleBottm {
                height: 36%;
                margin: 0 4px
            }
            @e touristPart {
                display: flex;
                margin: 10px 0;
                height: calc(100% - 20px);
            }
            @e touristLeft {
                /*width: 50%;*/
                border-right: 1px dashed #979797;
            }
            @e touristRight {
                /*width: 50%;*/
            }
            @e warnSit {
                width: 100%;
                height: 36px;
                font-size: 12px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                overflow: hidden;
                /*text-overflow: ellipsis;*/
                /*white-space: nowrap;*/
                border-bottom: 1px solid rgba(0, 164, 255, 0.3);
                padding: 0 5px;
            }
            @e warnItem {
                margin-right: 4px;
            }
        }
    }
</style>
