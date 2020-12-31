<template>
    <div style="width: 100%;height: 100%">
        <div id="realTimeMap"></div>
        <div v-if="leftContent" class="ga-realTimeSearch__right"
             ref="popRightTable">
            <el-row style="background-color: rgba(9,94,179,0.8);color: #fff"
                    id="popRightTableTop">
                <!--title-->
                <el-col :span="20"
                        :offset="1">
                    <span>&nbsp;{{rightBaseData.name}} {{rightBaseData.msisdn}}</span>
                    <!--&nbsp;&nbsp;<a @click="getMap">导出</a>-->
                </el-col>
                <!--折叠按钮-->
                <el-col :span="2"
                        style="cursor: pointer" >
                    <div @click="rightToggleShow">
                        <div :class="[isRightToggle ? 'arrowUp' : 'arrowDown']"></div>
                    </div>
                </el-col>
            </el-row>
            <!--基本信息-->
            <el-row class="ga-realTimeSearch__right--base">
                <el-col :span="22" :offset="1" class="ga-title">
                    <el-row>
                        <span></span>目标基本信息
                    </el-row>
                </el-col>
                <div class="nxPolice-table realTimeSearch-dtTable">
                    <div v-loading="baseDataListLoading" style="position: absolute;top: 57%;left: 45%;"></div>
                    <tableComp :option="baseDataOpt" :comSize="{height: 82}"></tableComp>
                </div>
                <div class="ga-locationMessage__devide"></div>
                <div>
                    <div v-loading="baseDataListLoading" style="top:18px;transform: scale(0.75,0.75)"></div>
                    <div v-if="!baseDataListLoading">
                        <p v-if="!rightBaseData.newInfo" style="text-align: center;
                                                            color: #9af5f6;
                                                            opacity: 0.6;
                                                            font-size: 12px;
                                                            line-height: 38px;">
                            暂无数据</p>
                        <p v-else style="padding-left: 5px">{{ rightBaseData.newInfo }}</p>
                    </div>
                </div>
            </el-row>
            <el-row class="ga-realTimeSearch__right--interspace">
                <div></div><div></div>
            </el-row>
            <!--位置信息-->
            <el-row class="ga-realTimeSearch__right--location">
                <el-col :span="22" :offset="1" class="ga-title">
                    <el-row>
                        <span></span>位置信息
                        <!--<span></span>&nbsp;&nbsp;<a @click="getMap">导出</a>-->
                    </el-row>
                </el-col>
                <div class="nxPolice-table">
                    <div v-loading="rightTableLoading" style="position: absolute;top: 59%;left: 45%"></div>
                    <tableComp :option="locationTableOpt" :comSize="{height: 135}"></tableComp>
                </div>
            </el-row>
            <!--间隙-->
            <el-row class="ga-realTimeSearch__right--interspace">
                <div></div><div></div>
            </el-row>
            <!--小地图 省内 消失-->
            <el-row class="ga-realTimeSearch__right--map1"
                    @click="showMiddleMap">
                <smallMap @openMiddleMap="showMiddleMap"
                          class="ga-gis"
                          :option="smallMapData"
                          :part="part">
                </smallMap>
            </el-row>
        </div>
        <sysDialog size="large"
                   :dialogVisible="middleMapShow"
                   title="详情轨迹"
                   :showCancel="false"
                   :showConfirm="false"
                   @change="dialogChange">
            <div :style="middleMapDialogHeight"
                 v-if="middleMapShow">
                <middleMap @openMiddleMap="showMiddleMap"
                           :option="middleMapData"
                           :part="part">
                </middleMap>
            </div>
        </sysDialog>
        <sysDialog size="tiny"
                   :class="{'realTimeSearch-dialog':cdrShow}"
                   :dialogVisible="locationMessageShow"
                   title="位置详情"
                   :showCancel="false"
                   :showConfirm="false"
                   @change="dialogChange">
            <div class="ga-locationMessage">
                <div v-for="item in locationData" class="ga-locationMessage__content">
                    <div>
                        {{item.name}}
                    </div>
                    <div>
                        {{item.value}}
                    </div>
                </div>
                <template v-if="cdrShow">
                    <div class="ga-locationMessage__devide"></div>
                    <p class="ga-locationMessage__title">{{rightBaseData.msisdn}}最新信令</p>
                    <div>
                        <tableComp :option="detailDataOpt" :comSize="{height: 220}"></tableComp>
                    </div>
                </template>
            </div>
        </sysDialog>
    </div>
</template>

<script>
    import BMap from 'BMap'
    import { mapGetters } from 'vuex'
    import { pointRandom } from 'utils'
    import { partClickDetailQuery } from 'api/quickQuery/quickQueryPage'
    import sysDialog from 'components/common/dialog'
    import tableComp from 'components/Table'
    import smallMap from 'views/wholeNetAnalysis/AllNetCommons/smallMap.vue'
    import middleMap from 'views/wholeNetAnalysis/AllNetCommons/middleMap.vue'

    export default {
        data () {
            let me = this
            return {
                noDataMsg: '最近三天暂无数据',
                //  右侧基本信息 加载动画
                baseDataListLoading: false,
                //  右 基本信息
                baseDataOpt: {
                    listLoading: false,
                    stripe: false,
                    emptyText: '暂无数据',
                    column: [
                        { name: '号码归属地', value: 'homeCode', align: 'center', tooltip: true },
                        { name: '运营商', value: 'spCode', width: 100, align: 'center' },
                        { name: '卡号', value: 'imsi', width: 120, align: 'center' },
                        { name: '机身码', value: 'imei', width: 120, align: 'center' }
                    ],
                    data: [],
                    pagination: false
                },
                //  信令
                detailDataOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 35, align: 'center' },
                        { name: '信令时间', value: 'dateTime', width: '', align: 'center' },
                        { name: '事件', value: 'cdrType', width: 85, tooltip: true, align: 'center' },
                        { name: 'LAC', value: 'lac', width: 75, align: 'center' },
                        { name: 'CI', value: 'ci', width: 75, align: 'center' }
                    ],
                    data: [],
                    pagination: false
                },
                //  是否显示 信令
                cdrShow: false,
                leftContent: false,
                showMsg: {
                    time: '',
                    location: ''
                },
                part: 'part',
                // 小地图 数据
                smallMapData: {},
                // 中地图 显示
                middleMapShow: false,
                // 中地图 数据
                middleMapData: {},
                // 右侧 基本信息
                rightBaseData: {
                    homeCode: '',
                    name: '',
                    msisdn: '',
                    imei: '',
                    newInfo: ''
                },
                // 右 是否折叠
                isRightToggle: true,
                // 有 加载动画
                rightTableLoading: false,
                // 右 位置 table
                locationTableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '到达时间', value: 'presentTime', width: 130, align: 'center' },
                        { name: '停留时长', value: 'stayTimes', width: 130, align: 'center' },
                        { name: '位置描述', value: 'placeCname', width: 120, align: 'center', tooltip: true },
                        { name: '位置详情', value: '', width: 60, align: 'center', operations: [
                            { label: '查看', type: 'label', click: me.showLocationMessage
                            }]
                        }
                    ],
                    data: [],
                    pagination: false
                },
                mapData: {},
                // 弹框位置信息
                locationData: [
                    { name: '基站名称', value: ' ' },
                    { name: 'LAC', value: ' ' },
                    { name: 'CI', value: ' ' },
                    { name: '经纬度', value: ' ' },
                    { name: '位置中文名', value: '' }
                ],
                // 弹窗 是否显示
                locationMessageShow: false
            }
        },
        props: {
            baseData: {
                time: '',
                name: '',
                msisdn: ''
            }
        },
        created () {
            this.clickDetail(this.baseData.msisdn + '&' + this.baseData.name + '$')
//            this.clickDetail(111);
        },
        mounted () {
            this.createMap()
        },
        watch: {
            'baseData' () {
                this.clickDetail(this.baseData.msisdn + '&' + this.baseData.name + '$')
            }
        },
        computed: {
            middleMapDialogHeight () {
                return {
                    height: window.screen.height * 0.55 + 'px'
                }
            },
            ...mapGetters({
                'mapCenter': 'global/globalKeys'
            })
        },
        methods: {
            //  获取最新位置
            async clickDetail (val) {
                this.leftContent = true
                this.locationTableOpt.data = [];
                this.baseDataOpt.data = []
                if (this.isRightToggle) {
                    this.locationTableOpt.listLoading = true;
                    this.baseDataListLoading = true;
                }
                this.rightBaseData.newInfo = ' '
                this.baseDataOpt.emptyText = ' '
                this.locationTableOpt.emptyText = ' ';
//                let time = new Date(this.baseData.time.split(' ')[0]).getTime()
//                let timeRange = time - 3 * 24 * 60 * 60 * 1000
                if (val) {
                    let resp;
                    resp = await partClickDetailQuery(val)
                    if (resp && resp.data) {
                        let data = resp.data
                        if (data.newInfo) {
                            this.rightBaseData.newInfo = data.newInfo
                        } else {
                            this.$alert('数据返回错误，缺少newInfo字段')
                        }
                        if (data.base) {
                            let { homeCode, imei, imsi, spCode } = data.base
                            this.baseDataOpt.data = [{ homeCode, spCode, imsi, imei }]
                            this.baseDataListLoading = false;
//                            this.baseDataOpt.emptyText = '暂无数据';
                        } else {
                            this.baseDataOpt.data = []
                            this.$alert('数据返回错误，缺少data字段')
                        }
                    } else {
                        this.baseDataOpt.data = []
                        this.baseDataListLoading = false;
                        this.baseDataOpt.emptyText = '暂无数据';
                    }
                    if (resp && resp.rows && resp.rows.length) {
                        if (!resp.rows[0].presentTime) {
                            this.$alert('数据返回错误，缺少presentTime字段', {
                                confirmButtonText: '确定'
                            });
//                            this.leftContent = false
                            this.locationTableOpt.data = [];
                            this.smallMapData = {
                                time: 'realTime',
                                info: '',
                                detail: '',
                                center: ''
                            };
                            this.locationTableOpt.listLoading = false;
                            this.rightTableLoading = false;
                            return
                        }
//                        if (new Date(resp.rows[0].presentTime.substr(0, 10)).getTime() < timeRange) {
//                            this.$alert(this.noDataMsg, {
//                                confirmButtonText: '确定'
//                            });
//                            this.locationTableOpt.data = [];
//                            this.smallMapData = {
//                                time: 'realTime',
//                                info: '',
//                                detail: '',
//                                center: ''
//                            };
//                            this.locationTableOpt.listLoading = false;
//                            this.rightTableLoading = false;
//                            return
//                        }
                        let pointData = [];
                        let detailData = [];
                        let detailCenter = '';
                        let dataArr = []
                        resp.rows.forEach((item) => {
                            if (!item.presentTime) {
                                this.$alert('数据返回错误，缺少presentTime字段', {
                                    confirmButtonText: '确定'
                                });
                                return
                            }
//                            if (new Date(item.presentTime.substr(0, 10)).getTime() >= timeRange) {
//                                dataArr.push(item)
//                            }
                            dataArr.push(item)
                        })
                        for (let i in dataArr) {
                            if (!dataArr[i].presentTime) {
                                dataArr[i].presentTime = '';
                            }
                            if (!dataArr[i].stationLocation) {
                                dataArr[i].stationLocation = '';
                            }
                            if (!dataArr[i].stayTimes) {
                                dataArr[i].stayTimes = '';
                            }
                            if (!dataArr[i].placeCname) {
                                dataArr[i].placeCname = '';
                            }
                            if (!dataArr[i].longtitude) {
                                dataArr[i].longtitude = '';
                            }
                            if (!dataArr[i].latitude) {
                                dataArr[i].latitude = '';
                            }
                            if (!dataArr[i].lac) {
                                dataArr[i].lac = '';
                            }
                            if (!dataArr[i].ci) {
                                dataArr[i].ci = '';
                            }
                            let { name,
                                msisdn,
                                homeCode,
                                imei,
                                longtitude,
                                latitude,
                                presentTime,
                                stayTimes,
                                placeCname,
                                stationLocation,
                                cdr,
                                lac,
                                ci } = dataArr[i]
                            this.rightBaseData.homeCode = homeCode
                            this.rightBaseData.name = name
                            this.rightBaseData.msisdn = msisdn
                            this.rightBaseData.imei = imei
                            pointData.push({ longtitude, latitude })
                            let { coordinate } = {
                                coordinate: Math.floor(longtitude * 100000) / 100000 + ',' +
                                Math.floor(latitude * 100000) / 100000
                            };
                            let arr = coordinate.split(',');
                            for (let i in arr) {
                                if (arr[i] === '0') {
                                    arr[i] = ''
                                    coordinate = ''
                                }
                            }
                            detailData.push({ name,
                                msisdn,
                                longtitude,
                                latitude,
                                presentTime,
                                stayTimes,
                                placeCname,
                                coordinate,
                                stationLocation,
                                cdr,
                                lac,
                                ci })
                        }
//                        this.leftContent = true
                        this.mapData = detailData[0]
                        this.showMsg.time = detailData[0].presentTime
                        this.showMsg.location = detailData[0].placeCname
                        if (this.mapData.longtitude && this.mapData.latitude) {
                            this.createPoint()
                        }
                        this.$nextTick(() => {
                            this.locationTableOpt.data = detailData;
                        })
                        if (this.locationTableOpt.data.length === 0) {
                            setTimeout(() => {
                                this.locationTableOpt.listLoading = false;
                                this.rightTableLoading = false;
                            }, 200)
                        } else {
                            this.locationTableOpt.listLoading = false;
                            this.rightTableLoading = false;
                        }
                        this.$nextTick(() => {
                            this.smallMapData = {
                                time: 'realTime',
                                info: pointData,
                                detail: detailData,
                                center: detailCenter
                            }
                        })
                    } else {
                        this.$alert(this.noDataMsg, {
                            confirmButtonText: '确定'
                        });
                        this.locationTableOpt.data = [];
                        this.smallMapData = {
                            time: 'realTime',
                            info: '',
                            detail: '',
                            center: ''
                        };
                        this.locationTableOpt.listLoading = false;
                        this.rightTableLoading = false;
                        let map = this.map
                        map.clearOverlays();
                        this.leftContent = false
                    }
                } else {
                    this.locationTableOpt.data = [];
                    this.smallMapData = {
                        time: 'realTime',
                        info: '',
                        detail: '',
                        center: ''
                    };
                    this.locationTableOpt.listLoading = false;
                    this.rightTableLoading = false;
                }
            },
            // 数据过滤
//            dataFilter () {
//
//            },
            // 创建地图
            createMap () {
                let map = new BMap.Map('realTimeMap', { minZoom: 3, maxZoom: 18 })
                this.map = map
                this.zoom = 10
                let point = new BMap.Point(this.mapCenter.gMapCenter[0], this.mapCenter.gMapCenter[1])
                map.centerAndZoom(point, this.zoom)
                map.enableScrollWheelZoom();
            },
            //  给 中 地图 传数据 数据来自 小地图
            showMiddleMap (center, data, detail) {
                this.middleMapShow = true;
                this.middleMapData = {
                    center: center,
                    detail: detail,
                    info: data
                };
            },
            //  右侧 折叠 按钮
            rightToggleShow () {
                let tab = $('.ga-realTimeSearch__right');
                this.isRightToggle = !this.isRightToggle;
                if (tab.height() > 50) {
                    tab.animate({
                        'height': '28px'
                    });
                    this.locationTableOpt.listLoading = false
                    this.baseDataListLoading = false;
                    this.baseDataOpt.emptyText = ' ';
                } else {
                    tab.animate({
                        'height': '490px'
                    });
                    if (!this.locationTableOpt.data.length) {
                        this.locationTableOpt.listLoading = true
                    }
                    if (!this.baseDataOpt.data.length) {
                        this.baseDataListLoading = true;
                        this.baseDataOpt.emptyText = '暂无数据';
                    }
                }
            },
            //  显示弹窗位置信息
            showLocationMessage (row, index) {
                let data = row;
                this.locationMessageShow = true;
                let locationData = this.locationData
                // 后期数据跟上 修改index
                locationData[0].value = data.stationLocation
                locationData[1].value = data.lac
                locationData[2].value = data.ci
                if (data.longtitude === '' || data.latitude === '') {
                    locationData[3].value = ''
                } else {
                    locationData[3].value = '(' + Math.floor(data.longtitude * 100000) / 100000 + ',' +
                        Math.floor(data.latitude * 100000) / 100000 + ')'
                }
                locationData[4].value = data.placeCname
                this.locationData = locationData;
                if (row.cdr && index === 0) {
                    this.cdrShow = true
                    this.$nextTick(() => {
                        this.detailDataOpt.data = row.cdr
                    })
                } else {
                    this.cdrShow = false
                    this.detailDataOpt.data = []
                }
            },
            //  地图打点 只打一个
            createPoint () {
                let map = this.map
                map.clearOverlays();
                let points = {
                    longtitude: this.mapData.longtitude,
                    latitude: this.mapData.latitude
                }
                // 初始化数据
                if (points.longtitude && points.latitude) {
                    let pointArr = []
                    pointArr[this.mapData.msisdn] = []
                    let point = new BMap.Point(pointRandom(points.longtitude), pointRandom(points.latitude))
                    let marker = new BMap.Marker(point)
                    map.addOverlay(marker)
                    map.panTo(point);
                } else {
                    this.zoom = this.mapData.zoom ? this.mapData.zoom : 11
                    this.center = this.mapData.center ? this.mapData.center : [this.mapData.longtitude,
                        this.mapData.latitude]
                    // 初始化地图
                    let point = new BMap.Point(this.center[0], this.center[1])
                    map.panTo(point);
                    map.enableScrollWheelZoom();
                }
            },
            //  模态框状态
            dialogChange (val) {
                this.middleMapShow = val;
                this.locationMessageShow = val;
            }
        },
        components: {
            sysDialog,
            tableComp,
            middleMap,
            smallMap
        }
    }
</script>

<style scoped lang="postcss">
    .arrowDown {
        background: url("~assets/images/warning/arrow.png") no-repeat center;
        background-size: 100% 100%;
        background-origin: content-box;
        height: 26px;
        width: 26px;
        cursor: pointer;
    }
    .arrowUp {
        background: url("~assets/images/warning/arrow.png") no-repeat center;
        background-size: 100% 100%;
        background-origin: content-box;
        height: 26px;
        width: 26px;
        margin-right: 6px;
        cursor: pointer;
        transform:rotate(180deg);
        -moz-transform:rotate(180deg);
        -webkit-transform:rotate(180deg);
        -o-transform:rotate(180deg);
    }
    #realTimeMap {
        width: calc(100% + 40px);
        height: 100%;
        position: absolute;
        left: -20px;
        top: -10px;
    }
    @component-namespace ga {
        @b title {
            & div {
                color: #fff;
            }
            & span {
                display: inline-block;
                width: 5px;
                height: 13px;
                background-color: #268CC6;
                margin-right: 10px;
            }
        }
        @b realTimeSearch {
            @e right {
                box-shadow: 3px 1px 3px rgba(0,0,0,0.3);
                display: inline-block;
                position: absolute;
                padding:0 0 25px 0 ;
                font-size: 14px;
                overflow: hidden;
                z-index: 555;
                right: 15px;
                top: 35px;
                width: 450px;
                /*height: 470px;*/
                height: 490px;
                border-bottom-left-radius: 18px;
                & span {
                    color: #fff;
                }
                @m interspace {
                    height: 5px;
                    background: transparent;
                    & div:first-child {
                        /*background: red;*/
                        height: 5px;
                        float: left;
                        width: 5%;
                        background: url("~@/assets/images/fold/shadow1.png") no-repeat;
                    }
                    & div:last-child {
                        height: 5px;
                        /*background: palevioletred;*/
                        float: left;
                        width: 95%;
                        background: url("~@/assets/images/fold/shadow2.png") repeat-x;
                    }
                }
                @m base {
                    color: #fff;
                    /*height: 70px;*/
                    height: 140px;
                    background-color: rgba(0,0,0,0.7);
                    overflow: auto;
                }
                @m location {
                    height: 153px;
                    background-color: rgba(0,0,0,0.7);
                }
                @m incident{
                    height: 60px;
                    color: #fff;
                    background-color: rgba(0,0,0,0.7);
                    & div {
                        color: #fff;
                    }
                }
                @m map {
                    /*height: 215px;*/
                    height: 159px;
                    width: 100%;
                    background-color: rgba(0,0,0,0.7);
                    /*background:linear-gradient(45deg, transparent 12px, rgba(0,0,0,0.7) 0);*/
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                }
                @m map1 {
                    height: 145px;
                    width: 100%;
                    background-color: rgba(0,0,0,0.7);
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                }
            }
        }
        @b locationMessage {
            padding: 5px 10px;
            text-align: center;
            @e devide {
                clear: both;
                height: 2px;
                background-color: rgba(255, 255, 255, 0.7);
            }
            @e content {
                & div:first-child {
                    display: inline-block;
                    float: left;
                    width: 30%;
                    line-height: 30px;
                    min-height: 30px;
                }
                & div:last-child {
                    display: inline-block;
                    float: left;
                    width: 70%;
                    line-height: 30px;
                    min-height: 30px;
                    /*width: 250px;*/
                    /*overflow: auto;*/
                }
            }
        }
    }
</style>
