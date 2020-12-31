<template>
    <div class="ga-home__container">
        <div class="ga-home__sidePart">
            <div class="ga-home__min">
                <containerBorder title="近24小时省外在线用户总体变化趋势">
                    <lineAreaChart ref="outProvinceLine" :option="outProvinceOpt" :renderData="outProvinceData"></lineAreaChart>
                </containerBorder>
            </div>
            <div class="ga-home__min">
                <containerBorder title="省外用户来源分布图">
                    <pointMap ref="chinaRef" :option="chinaMapOpt" :renderData="chinaMapData" :mini="true"
                              class="ga-home__pointMap"></pointMap>
                    <topCom :option="topProvince" class="ga-home__top"></topCom>
                </containerBorder>
            </div>
            <div class="ga-home__min">
                <containerBorder title="APP访问TOP5">
                    <tableComp :option="appTableOpt" :comSize="comSize" ref="appTable"></tableComp>
                </containerBorder>
            </div>
        </div>
        <div class="ga-home__middlePart">
            <div class="ga-home__middleTop">
                <mainBorder :option="mainOpt">
                    <mapLight :renderData="mapLightData" :mapType="mapLightType" :size="mapLightSize"></mapLight>
                </mainBorder>
            </div>
            <div class="ga-home__middleBottm">
                <containerBorder title="近24小时在线用户总体变化趋势">
                    <lineAreaChart ref="allUserLine" :option="allUserOpt" :renderData="allUserData"></lineAreaChart>
                </containerBorder>
            </div>
        </div>
        <div class="ga-home__sidePart">
            <div class="ga-home__min">
                <containerBorder title="近24小时境外在线用户总体变化趋势">
                    <lineAreaChart ref="overseasLine" :option="overseasOpt" :renderData="overseasData"></lineAreaChart>
                </containerBorder>
            </div>
            <div class="ga-home__min">
                <containerBorder title="境外用户来源分布图">
                    <pointMap ref="worldRef" :option="worldMapOpt" :renderData="worldMapData" :mini="true"
                              class="ga-home__pointMap"></pointMap>
                    <topCom :option="topCountry"  class="ga-home__top"></topCom>
                </containerBorder>
            </div>
            <div class="ga-home__min">
                <containerBorder title="热搜词TOP5">
                    <tableComp :option="wordTableOpt" :comSize="comSize" ref="wordTable"></tableComp>
                </containerBorder>
            </div>
        </div>
    </div>
</template>

<script>
    import mainBorder from 'components/common/mainBorder'
    import mapLight from 'components/Chart/newHome/maplight'
    import containerBorder from 'components/common/containerBorder'
    import lineAreaChart from 'components/Chart/newHome/lineArea'
    import pointMap from 'components/Chart/newHome/pointMap'
    import topCom from 'components/common/topCom.vue'
    import tableComp from 'components/Table/'
    import { mapGetters } from 'vuex'
    import { ajax } from 'common'
    export default {
        name: 'home',
        data() {
            return {
                // 中间热力图
                mapLightType: '',
                mapLightData: [],
                // 近1小时境外在线用户总体变化趋势
                overseasOpt: {
                    width: '100%',
                    height: '100px',
                    props: {
                        gridLeft: 45,
                        gridTop: 15,
                        gridRight: 10,
                        gridBottom: 8,
                        colorStyle: 'yellow'
                    }
                },
                overseasData: [],
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
                worldMapData: [
                ],
                topCountry: {
                    width: '100%',
                    data: [
                    ]
                },
                // APP访问TOP5
                appTableOpt: {
                    listLoading: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 40, align: 'center' },
                        { name: 'APP名称', value: 'name', align: 'center', tooltip: true },
                        { name: '访问次数', value: 'value', align: 'center' }
                    ],
                    data: []
                },
                // 实时在线用户态势分析
                mainOpt: {
                    title: '实时在线用户态势分析',
                    data: [
                        {
                            name: '实时在线用户',
                            value: 0
                        },
                        {
                            name: '省内在线用户',
                            value: 0
                        },
                        {
                            name: '省外在线用户',
                            value: 0
                        },
                        {
                            name: '境外在线用户',
                            value: 0
                        }
                    ]
                },
                // 近1小时全体在线用户总体变化趋势
                allUserOpt: {
                    width: '100%',
                    height: '150px',
                    props: {
                        gridLeft: 50,
                        gridTop: 15,
                        gridRight: 10,
                        gridBottom: 8
                    }
                },
                allUserData: [],
                // 近1小时省外在线用户总体变化趋势
                outProvinceOpt: {
                    width: '100%',
                    height: '100px',
                    props: {
                        gridLeft: 50,
                        gridTop: 15,
                        gridRight: 10,
                        gridBottom: 8,
                        colorStyle: 'red'
                    }
                },
                outProvinceData: [],
                // 省外用户来源分布图
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
                chinaMapData: [
                ],
                topProvince: {
                    width: '100%',
                    data: [
                    ]
                },
                // 热搜词TOP5
                wordTableOpt: {
                    listLoading: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 40, align: 'center' },
                        { name: '热搜词', value: 'name', align: 'center', tooltip: true },
                        { name: '访问次数', value: 'value', align: 'center' }
                    ],
                    data: []
                },
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
            comSize() {
                return { height: this.contentHeight * 0.33 - 37 }
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
            this.chartsHeight()
            this.getHotData()
            this.getAllUserData()
            this.getUserSourceData(0)
            this.getUserSourceData(1)
            this.getTopData()
            this.getUserLineData()
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
                    this.getHotData()
                    this.getAllUserData()
                    this.getUserSourceData(0)
                    this.getUserSourceData(1)
                    this.getTopData()
                    this.getUserLineData()
                }, 120000)
            },
            // 初始高度
            chartsHeight() {
                let basicsHeight = this.contentHeight * 0.33 - 43
                let middleHeight = this.contentHeight * 0.36 - 43
                this.overseasOpt.height = basicsHeight + 'px'
                this.allUserOpt.height = middleHeight + 'px'
                this.outProvinceOpt.height = basicsHeight + 'px'
                this.chinaMapOpt.height = basicsHeight + 28 + 'px'
                this.worldMapOpt.height = basicsHeight + 28 + 'px'
            },
            // 获取中间热地图数据
            getHotData() {
                // $.getJSON('/static/mock/testData.json').then(response => {
                //     console.log(response)
                //     let { data } = response;
                //     if (data) {
                //         let lenght = data.length
                //         data.forEach((item, index) => {
                //             if (index < lenght * 0.2) {
                //                 item.rank = 3
                //             } else if (index >= lenght * 0.2 && index <= lenght * 0.6) {
                //                 item.rank = 2
                //             } else {
                //                 item.rank = 1
                //             }
                //         })
                //         this.mapLightData = data
                //     } else {
                //         this.mapLightData = []
                //     }
                // })
                ajax.post(`situation/heat`, {
                    timestamp: null,
                    type: 1
                })
                    .then(resp => {
                        if (resp) {
                            let { data } = resp;
                            if (data.data) {
                                let lenght = data.data.length
                                data.data.forEach((item, index) => {
                                    if (index < lenght * 0.2) {
                                        item.rank = 3
                                    } else if (index >= lenght * 0.2 && index <= lenght * 0.6) {
                                        item.rank = 2
                                    } else {
                                        item.rank = 1
                                    }
                                })
                                this.mapLightData = data.data
                            } else {
                                this.mapLightData = []
                            }
                        }
                    })
                    .catch(error => {
                        console.log('请求接口错误信息：', error)
                    })
            },
            // 获取在线用户数据获取
            getAllUserData() {
                ajax.post(`situation/overall`)
                    .then(resp => {
                        if (resp) {
                            let { data } = resp;
                            if (data) {
                                this.mainOpt.data = [
                                    {
                                        name: '实时在线用户',
                                        value: data.allcount
                                    },
                                    {
                                        name: '省内在线用户',
                                        value: data.sncount
                                    },
                                    {
                                        name: '省外在线用户',
                                        value: data.swcount
                                    },
                                    {
                                        name: '境外在线用户',
                                        value: data.jwcount
                                    }
                                ]
                            }
                        }
                    })
                    .catch(error => {
                        console.log('请求接口错误信息：', error)
                    })
            },
            // 获取境外、省外用户来源分布图数据
            getUserSourceData(val) {
                // 0境外 1省外
                let type = val === 0 ? 9 : 3
                ajax.post(`situation/zhutu`, {
                    timestamp: null,
                    type: type
                })
                    .then(resp => {
                        if (resp) {
                            let { data } = resp;
                            if (data) {
                                if (val === 0) {
                                    // 境外用户来源分布图数据
                                    this.worldMapData = data
                                    this.topCountry.data = data.slice(0, 6)
                                } else {
                                    // 省外用户来源分布图数据
                                    this.chinaMapData = data
                                    this.topProvince.data = data.slice(0, 6)
                                }
                            }
                        }
                    })
                    .catch(error => {
                        this.$refs.overseasLine.endLoading()
                        this.$refs.allUserLine.endLoading()
                        console.log('请求接口错误信息：', error)
                    })
            },
            // 获取境外、省外、全体用户折线图数据
            getUserLineData() {
                this.$refs.overseasLine.startLoading()
                this.$refs.allUserLine.startLoading()
                this.$refs.outProvinceLine.startLoading()
                ajax.post(`situation/snapHomePage`, {
                    type: 1,
                    timeType: 2 // 1 近1小时 2 近24小时 3 近7天
                })
                    .then(resp => {
                        this.$refs.overseasLine.endLoading()
                        this.$refs.allUserLine.endLoading()
                        this.$refs.outProvinceLine.endLoading()
                        if (resp) {
                            let { data } = resp;
                            if (data && data.length) {
                                let allUserData = [
                                    { name: '实时在线用户', data: [], time: [] },
                                    { name: '省内在线用户', data: [], time: [] }
                                ]
                                let outProvinceData = [
                                    { name: '省外在线用户', data: [], time: [] }
                                ]
                                let overseasData = [
                                    { name: '境外在线用户', data: [], time: [] }
                                ]
                                data.forEach(item => {
                                    if (item.type === '实时在线用户') {
                                        allUserData[0].data.push(item.value)
                                        allUserData[0].time.push(item.time)
                                    } else if (item.type === '省内在线用户') {
                                        allUserData[1].data.push(item.value)
                                        allUserData[1].time.push(item.time)
                                    } else if (item.type === '省外在线用户') {
                                        outProvinceData[0].data.push(item.value)
                                        outProvinceData[0].time.push(item.time)
                                    } else if (item.type === '境外在线用户') {
                                        overseasData[0].data.push(item.value)
                                        overseasData[0].time.push(item.time)
                                    }
                                })
                                this.allUserData = allUserData
                                this.outProvinceData = outProvinceData
                                this.overseasData = overseasData
                            }
                        }
                    })
                    .catch(error => {
                        this.$refs.overseasLine.endLoading()
                        this.$refs.allUserLine.endLoading()
                        this.$refs.outProvinceLine.endLoading()
                        console.log('请求接口错误信息：', error)
                    })
            },
            //  获取热搜词top5、APP访问top5数据
            getTopData() {
                ajax.post(`/ybrz/getYbrz`, {
                    code: '0',
                    flag: 2
                })
                    .then(resp => {
                        if (resp) {
                            let { data } = resp;
                            if (data) {
                                this.appTableOpt.data = data.appTop.slice(0, 5)
                                this.wordTableOpt.data = data.internetHotWord.slice(0, 5)
                            }
                        }
                    })
                    .catch(error => {
                        console.log('请求接口错误信息：', error)
                    })
            }
        },
        components: {
            mainBorder,
            containerBorder,
            lineAreaChart,
            pointMap,
            topCom,
            tableComp,
            mapLight
        }
    }
</script>

<style>
    @component-namespace ga {
        @b home {
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
                height: 64%;
                margin: 0 4px 4px;
            }
            @e middleBottm {
                height: 36%;
                margin: 0 4px
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
