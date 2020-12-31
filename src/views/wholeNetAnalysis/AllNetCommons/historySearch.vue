<template>
    <div style="width: 100%;height: calc(100% - 50px)">
        <!--目标选择 按钮-->
        <div v-if="isMultiPath">
            <div v-if="!isQuickQuery" class='ga-mapSty__btn'>
                <formSelect :option='choice'></formSelect>
            </div>
            <div v-else class="ga-quickQuery">
                <formSelect style="background: #041024;margin-left: 4px" :option="quickQueryOpt" ref="quickQuery"></formSelect>
            </div>
        </div>
        <!--目标选择弹出框-->
        <sysDialog size="small"
                   v-if="selectShow"
                   :dialogVisible="selectShow"
                   title="目标选择"
                   :okFn="confirm"
                   @change="dialogChange">
            <!--时间范围 友情提示-->
            <el-row style="text-align: center">
                <p>最大时间范围为 24 小时</p>
            </el-row>
            <!--时间范围选择 开始 结束时间-->
            <el-row class="nxPolice-picker">
                <formSelect :option='formOpt'
                            ref="form">
                </formSelect>
            </el-row>
            <!--目标选择穿梭框-->
            <transfer :option="transferOpt">
            </transfer>
        </sysDialog>
        <!--位置详情框-->
        <sysDialog size="tiny"
                   :dialogVisible="locationMessageShow"
                   title="位置详情"
                   :showCancel="false"
                   :showConfirm="false"
                   @change="dialogChange">
            <div class="ga-locationMessage">
                <div v-for="item in locationData" :key="item.name" class="ga-locationMessage__content">
                    <div>
                        {{item.name}}
                    </div>
                    <div>
                        {{item.value}}
                    </div>
                </div>
            </div>
        </sysDialog>
        <!--主要内容-->
        <div class='ga-mainContent'>
            <gis :option="mapData"
                 :part="part"
                 :chooseNum="chooseNum"
                 :locus="locusIndex"
                 :playBack="disClick"
                 :dragVal="dragVal"
                 @alreadyDraw="alreadyDraw"
                 @numChanged="numChanged"
                 :closeMapDialog="closeMapDialog">
            </gis>
            <!--左侧下拉列表 leftFold-->
            <div v-if="!isQuickQuery" class='ga-mainContent__left'
                 v-show="leftFold">
                <!--左侧下拉列表 头部-->
                <div class="ga-leftFold__headline">
                    <el-row>
                        <!--title部分-->
                        <el-col :span="20"
                                :offset="2"
                                class="ga-leftFold__headline--title">
                            监测目标({{ monitorTargetNum }}个)
                        </el-col>
                        <!--折叠按钮部分-->
                        <el-col :span="2">
                            <div @click="leftToggle"
                                 class="ga-leftFold__headline--btn">
                                <div :class="[isLeftToggle ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"></div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <!--左侧下拉列表 内容部分-->
                <div class="ga-leftFold__content">
                    <div style="width: 345px;margin: auto"
                         slot="content"
                         class="nxPolice-table"
                         v-loading="leftTableLoading">
                        <!--左侧 table表格-->
                        <popTable :option="leftTableOpt"
                                  :comSize="{height: 290}">
                        </popTable>
                    </div>
                </div>
            </div>
            <!--右侧下拉列表 leftFold-->
            <div class="ga-mainContent__right"
                 v-show="rightFold">
                <!--右侧下拉列表 头部-->
                <div class="ga-rightFold__headline">
                    <el-row>
                        <!--title 部分-->
                        <el-col :span="20"
                                :offset="2"
                                class="ga-rightFold__headline--title">
                            <p v-show="!isDetail">{{rightTitle}}</p>
                            <p v-show="isDetail">个人详情</p>
                        </el-col>
                        <!--折叠按钮 部分-->
                        <el-col :span="2">
                            <div @click="rightToggle"
                                 class="ga-rightFold__headline--btn">
                                <div :class="[isRightToggle ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"></div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <!--右侧下拉列表 内容部分-->
                <div class="ga-rightFold__content">
                    <!--全部概况-->
                    <div v-show="!isDetail"
                         style="width: 560px;margin: auto"
                         class="nxPolice-table"
                         v-loading="rightTableLoading">
                        <popTable :option="rightAllTableOpt"
                                  :comSize="{height: 240}">
                        </popTable>
                    </div>
                    <!--个人详情-->
                    <div v-show="isDetail"
                         class="nxPolice-table">
                        <!--个人详情标题-->
                        <el-row>
                            <el-col :span="2"
                                    :offset="1"
                                    v-show="isDetail"
                                    class="ga-mainContent__right--avatar">
                            </el-col>
                            <el-col :span="21" style="height: 30px;line-height: 40px">
                                <span>{{name}}</span>
                                <span>{{phoneNum}}</span>
                            </el-col>
                        </el-row>
                        <!--间隔部分-->
                        <el-row class="ga-mainContent__right--interspace">
                            <div></div><div></div>
                        </el-row>
                        <!--基本信息-->
                        <el-row>
                            <el-col :span="22"
                                    :offset="1"
                                    class="ga-title">
                                <span></span>
                                <span>目标基本信息</span>
                            </el-col>
                        </el-row>
                        <div style="width: 560px;margin: auto">
                            <popTable :option="rightPerBaseInfo"
                                      :comSize="{height: 85}">
                            </popTable>
                        </div>
                        <!--间隔部分-->
                        <el-row class="ga-mainContent__right--interspace">
                            <div></div><div></div>
                        </el-row>
                        <!--位置信息-->
                        <el-col :span="23"
                                :offset="1"
                                class="ga-title">
                            <div class="ga-title__vertical">
                                <span></span>
                                <span>位置信息</span>
                            </div>
                            <div class="ga-title__eventType">
                                <template v-for="item in eventType">
                                    {{item.name}} &nbsp;<span :style="eventTypeColor(item.color)"></span>
                                </template>
                            </div>
                        </el-col>
                        <!--tableMouseWheel 清楚 滚动 tooltip随之滚动的问题-->
                        <div style="width: 560px;margin: auto;"
                             @mousewheel="tableMouseWheel">
                            <div v-loading="rightTableLocationLoading"
                                 style="position: absolute;bottom: 50px;left: 50%">
                            </div>
                            <popTable :option="rightPerLocationInfo"
                                      :comSize="comSizeHeight">
                            </popTable>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ga-mainContent__bottom"
                 v-show="bottomArea">
                <el-button :type="realType"
                           @click="clearHandler"
                           class='ga-button__realTime'
                           :class="{'actived': btnSts === 'real'}">实时</el-button>
                <el-button type="primary"
                           :disabled="isLoading"
                           @click="startHandler"
                           class='ga-button__startBtn'
                           :class="{'actived': btnSts === 'playback'}">{{startBtn}}</el-button>
                <div class="ga-mainContent__bottom--trackAxle">
                    <!--<div :style="bubble" v-show="disClick || isStop"-->
                         <!--:class="['ga-mainContent__bottom&#45;&#45;bubble', {-->
                             <!--'ga-mainContent__bottom&#45;&#45;bubbleMoving': !moving-->
                         <!--}]">-->
                        <!--<div v-show="!moving">-->
                            <!--到达时间：{{bubbleArriveTime}} <br>-->
                            <!--停留时间：{{bubbleStayTime}}-->
                        <!--</div>-->
                        <!--<div v-show="moving" class="moving">-->
                            <!--&lt;!&ndash;移动中&ndash;&gt;-->
                        <!--</div>-->
                    <!--</div>-->
                    <el-slider
                        class="nxPolice-slider"
                        ref="trackAxle"
                        :show-tooltip="false"
                        v-model="trackAxleVal"
                        :max="trackAxleMax"
                        @change="trackAxleValChange"
                        show-stops>
                    </el-slider>
                </div>
                <div class="ga-mainContent__bottom--cover">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import sysDialog from 'components/common/dialog'
    import formSelect from 'components/Form'
    import transfer from 'components/transfer'
    import popTable from 'components/Table/'
    import gis from './mapHistory'
    import { forbiddenDate } from 'utils'
    import { getQuickData } from 'api/quickQuery/quickQueryPage'
    import { getPartAreaImportant, getPartAreaLocusData,
        getNationImportant, getNationLocusData } from 'api/allNetAnalyze/historyTrack'
    import { mapGetters } from 'vuex'
    import { phoneNumChange } from 'utils/index'
    const HISLABEL = '回放'
    const CONLABEL = '继续'
    const PAUSELABEL = '暂停'
    let clicktag = 0;
    export default {
        data () {
            let yesterDay = new Date().getTime()
            let yesterDay1 = new Date().getTime() - 24 * 60 * 60 * 1000
            let minDay = new Date().getTime()
            let me = this
            return {
                realType: 'primary',
                transferOpt: {
                    titles: ['目标号码', '已选目标'],
                    data: [],
                    handleChange: me.handleChange
                },
                playMinTime: 5,
                playMaxTime: 5,
                filterArrLengthLeft: '',
                filterArrLengthRight: '',
                isLoading: false,
                moving: false,
                bubbleArriveTime: '',
                bubbleStayTime: '',
                trackAxleMax: 0,
                trackAxleVal: 0,
//                穿梭框
                transferData: [],
                value3: [],
                tableData: [],
                //  底部 轨迹内容 区域是否显示
                bottomArea: false,
                //  是否显示位置详情框
                locationMessageShow: false,
//                左右折叠框 显示隐藏属性
                leftFold: false,
                rightFold: false,
//                左右折叠框 是否折叠
                isLeftToggle: false,
                isRightToggle: false,
//                触发关闭小地图弹窗
                closeMapDialog: false,
//                table内容加载 load动画
                leftTableLoading: false,
                rightTableLoading: false,
//                右边折叠框 详情 位置 table 加载动画
                rightTableLocationLoading: false,
//                最大时间范围
                maxTimeRange: 86400,
//                最大选择人数
                maxSelect: 20,
//                获取重点人 传给后台的对象值
                getImportantObj: {
                    msisdn: '',
                    owner: '',
                    approverStatus: 3
                },
//                控制 选择重点人 弹框的显示
                selectShow: false,
//                是否显示详情 个人具体位置轨迹
                isDetail: false,
//                检测的目标人数
                monitorTargetNum: '',
//                详情 个人的 姓名 号码 信息
                name: '',
                phoneNum: '',
                row: null,
                status: true,
//                传给地图的数据
                mapData: {},
                rightTitle: '监测目标详情动态',
//                向后台发送的 所选重点人数据
                sendPhones: [],
//                点击详情 个人信息 数据 保存
                personInfoArr: [],
//                每次点击左侧折叠框 表格row 所选重点人的号码
                chooseNum: null,
                locusIndex: null,
//                目标选择 按钮 配置
                choice: {
                    items: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '目标选择',
                                disabled: false,
                                // btnType: 'rightTop',
                                click: function () {
                                    me.showPopTable()
                                }
                            }
                        }
                    ]
                },
                // 快捷查询 搜索配置
                quickQueryOpt: {
                    inline: true,
                    labelWidth: '80',
                    items: [
                        {
                            label: '开始时间',
                            type: 'date',
                            comOpt: {
                                id: 'start',
                                value: yesterDay1,
                                disabled: false,
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate (time) {
                                        return forbiddenDate(time, minDay)
                                    }
                                }
                            }
                        },
                        {
                            label: '截止时间',
                            type: 'date',
                            comOpt: {
                                id: 'end',
                                value: yesterDay,
                                disabled: false,
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate (time) {
                                        return forbiddenDate(time, yesterDay)
                                    }
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '查询',
                                disabled: false,
                                btnType: '',
                                click: function () {
                                    me.quickQuery()
                                }
                            }
                        }
                    ]
                },
//                选择重点人 弹框 时间 form 配置
                formOpt: {
                    inline: true,
                    labelWidth: '80',
                    items: [
                        {
                            label: '开始时间',
                            type: 'date',
                            comOpt: {
                                id: 'start',
                                value: yesterDay1,
                                disabled: false,
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate (time) {
                                        return forbiddenDate(time, yesterDay)
                                    }
                                }
                            }
                        },
                        {
                            label: '结束时间',
                            type: 'date',
                            comOpt: {
                                id: 'end',
                                value: yesterDay,
                                disabled: false,
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate (time) {
                                        return forbiddenDate(time, yesterDay)
                                    }
                                }
                            }
                        }
                    ]
                },
//                选择重点人 弹框 table配置
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 70, align: 'center' },
                        { name: '用户名', value: 'name', align: 'center' },
                        { name: '手机号', value: 'msisdn', align: 'center' },
                        { name: '卡号', value: 'imsi', width: 175, align: 'center' },
                        { name: '机身码', value: 'imei', width: 175, align: 'center' },
                        { name: '选择', value: 'selection', align: 'center' }
                    ],
                    data: [],
                    // 是否分页
                    pagination: false,
                    pageOpt: {
                        total: 100,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
//                左折叠框 table配置
                leftTableOpt: {
                    width: 345,
                    listLoading: false,
                    // 	是否为斑马纹 table
                    isborder: false,
                    stripe: false,
                    highlightRow: true,
                    column: [
                        // 首列是否显示序号、复选框index/selection
                        { name: '序号', value: 'index', width: 65, align: 'center' },
                        { name: '号码', value: 'msisdn', width: 150, align: 'center' },
                        { name: '姓名', value: 'name', width: 140, align: 'center' }
                    ],
                    data: [],
                    rowClick: function (row) {
                        me.changeDetail();
                        me.rightPerLocationInfo.data = [];
                        me.rightPerLocationInfo.listLoading = true;
                        // me.rightTableLocationLoading = true;
                        setTimeout(() => {
                            me.dealDetailLocationData(row)
                            me.locusIndex = null;
                            me.clearHandler();
                        })
                    }
                },
//                右折叠 所有重点人 最后位置 table配置
                rightAllTableOpt: {
                    width: 560,
                    listLoading: false,
                    isborder: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '到达时间', value: 'arriveTime', width: 136, align: 'center' },
                        { name: '手机号', value: 'msisdn', width: 140, align: 'center' },
                        { name: '位置', value: 'placeCname', align: 'center', tooltip: true },
                        { name: '停留时长', value: 'stayTime', width: 100, align: 'center' }
                    ],
                    data: []
                },
//                右折叠 详情 个人位置信息 table配置
                rightPerLocationInfo: {
                    width: 555,
                    listLoading: false,
                    isborder: false,
                    emptyText: '暂无数据',
                    stripe: false,
                    highlightRow: true,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '到达时间', value: 'arriveTime', width: 136, align: 'center' },
//                        { name: 'LAC', value: 'lac', align: 'center' },
//                        { name: 'CI', value: 'ci', align: 'center' },
                        { name: '停留时长', value: 'stayTime', width: 110, align: 'center' },
                        { name: '事件', value: 'eventType', width: 70, align: 'center', eventType: true },
                        { name: '位置描述', value: 'placeCname', align: 'center', tooltip: true },
                        { name: '位置详情', value: '', width: 60, align: 'center', operations: [
                            { label: '查看', type: 'label', click: me.showLocationMessage
                            }]
                        }
                    ],
                    rowClick: function (row) {
                        if (!me.disClick) {
                            me.locusIndex = row.index
                        }
                    },
                    data: []
                },
//                右折叠 详情 个人信息 table配置
                rightPerBaseInfo: {
                    width: 560,
                    listLoading: false,
                    isborder: false,
                    stripe: false,
                    column: [
                        { name: '号码归属地', value: 'homeCode', align: 'center', tooltip: true },
                        { name: '运营商', value: 'ispCode', width: 90, align: 'center' },
                        { name: '卡号', value: 'imsi', width: 180, align: 'center' },
                        { name: '机身码', value: 'imei', width: 175, align: 'center' }
                    ],
                    data: []
                },
                eventType: [
                    { name: '正常通信', color: '#0198F1' },
                    { name: '开关机', color: '#000267' },
                    { name: '切出省', color: '#FDF21C' },
                    { name: '时间超长没有信令', color: '#00931B' }
                ],
                locationData: [
                    { name: '基站名称', value: ' ' },
                    { name: 'LAC', value: ' ' },
                    { name: 'CI', value: ' ' },
                    { name: '经纬度', value: ' ' },
                    { name: '位置中文名', value: '' }
                ],
                playBackBtnOpt: {
                    inline: true,
                    items: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '返回',
                                disabled: false,
                                btnType: 'rightBottom',
                                click: function () {
                                    me.showPopTable()
                                }
                            }
                        },
                        {
                            label: ' ',
                            type: 'button',
                            comOpt: {
                                value: '全览',
                                disabled: false,
                                btnType: 'leftTop',
                                click: function () {
                                    me.showPopTable()
                                }
                            }
                        }
                    ]
                },
                btnSts: 'real',
                startBtn: HISLABEL,
                disClick: false,
                timeArr: [],
                mapMarker: [],
                timer: 0,
                rightPerLocationInfoHeight: 220,
                rightPerLocationDataLength: -1,
                rightFoldContent: 402,
                mainContentRight: 430,
                dragVal: 0,
                isStop: false
            }
        },
        props: {
            baseData: {},
            isQuickQuery: {
                default: false
            },
            isMultiPath: {
                default: true
            },
            selectObj: {},
            part: '',
            owner: ''
        },
        created () {
//            console.log(this.part)
            if (localStorage.getItem('taskStatus')) {
                if (+localStorage.getItem('taskStatus') !== 1) {
                    this.choice.items[0].comOpt.disabled = true
                }
            }
            this.getImportantData();
        },
        updated () {
//            if (this.owner.slice(0, 1) === 'T') {
//                if (this.status && this.selectShow) {
//                    this.$refs.table.toggleSelection()
//                    this.status = false
//                }
//            }
        },
        computed: {
            ...mapGetters({
                'isPhoneJM': 'global/isPhoneJM'
            }),
            comSizeHeight () {
                return {
                    height: this.rightPerLocationInfoHeight
                }
            },
            bubble () {
                let w = $('.nxPolice-slider').width()
                let val = this.trackAxleVal
                let max = this.trackAxleMax
                let average = Math.round(w / max)
                let leftVal = val * average - 30
                if (!this.moving) {
                    leftVal = val * average - 130
                }
//                console.log($('.ga-mainContent').width())
//                console.log(leftVal)
                if (val === max) {
                    leftVal = w - 200
                }
                return {
                    left: `${leftVal}px`
                }
            }
        },
        watch: {
            selectObj: {
                deep: true,
                handler: function (val) {
                    console.log(val)
                    this.confirm()
                }
            },
            'isQuickQuery' () {
            },
            'rightPerLocationDataLength' (val) {
                let rightPerLocationInfoHeight = 260;
                let rightFoldContent = 425;
                let mainContentRight = 453;
                if (val === 6) {
                    rightPerLocationInfoHeight -= 30;
                    rightFoldContent -= 30;
                    mainContentRight -= 30;
                } else if (val === 5) {
                    rightPerLocationInfoHeight -= 60;
                    rightFoldContent -= 60;
                    mainContentRight -= 60;
                } else if (val === 4) {
                    rightPerLocationInfoHeight -= 90;
                    rightFoldContent -= 90;
                    mainContentRight -= 90;
                } else if (val === 3) {
                    rightPerLocationInfoHeight -= 120;
                    rightFoldContent -= 120;
                    mainContentRight -= 120;
                } else if (val === 2) {
                    rightPerLocationInfoHeight -= 150;
                    rightFoldContent -= 150;
                    mainContentRight -= 150;
                } else if (val === 1) {
                    rightPerLocationInfoHeight -= 180;
                    rightFoldContent -= 180;
                    mainContentRight -= 180;
                } else if (val === 0) {
                    rightPerLocationInfoHeight -= 150;
                    rightFoldContent -= 150;
                    mainContentRight -= 150;
                } else {
                    rightPerLocationInfoHeight = 220;
                    rightFoldContent = 395;
                    mainContentRight = 423;
                }
                this.rightPerLocationInfoHeight = rightPerLocationInfoHeight;
                this.rightFoldContent = rightFoldContent;
                this.mainContentRight = mainContentRight;
                $('.ga-rightFold__content').animate({
                    'height': rightFoldContent + 'px'
                })
                $('.ga-mainContent__right').animate({
                    'height': `${this.mainContentRight}px`
                });
            },
            'trackAxleVal' (val) {
                let timeArrLength = this.timeArr.length;
                if (val === -1) {
                    return
                }
                if (this.timer) {
//                    let cover = $('.ga-mainContent__bottom--cover');
//                    cover.css({
//                        'display': 'block'
//                    })
                }
                let showVal = parseInt(val)
                if (val !== showVal) {
                    this.moving = true
                } else {
                    this.moving = false
                    this.bubbleArriveTime = `${this.timeArr[timeArrLength - val - 1].arriveTime}`
                    this.bubbleStayTime = `${this.timeArr[timeArrLength - val - 1].stayTime}`
                }
            },
            'leftTableLoading' (val) {
                if (val) {
                    this.isLoading = true
                } else {
                    setTimeout(() => {
                        this.isLoading = false
                    }, 1000)
                }
            },
            'timer' (val) {
//                console.log(val)
                if (val === 0 && this.disClick) {
//                    let cover = $('.ga-mainContent__bottom--cover');
//                    cover.css({
//                        'display': 'none'
//                    })
                    this.controlCover(false)
                }
            }
        },
        methods: {
            quickQuery () {
                let baseData = this.baseData
                baseData.imei = ''
                baseData.imsi = ''
                this.sendPhones = []
                this.sendPhones.push(baseData.msisdn + '&' +
                    baseData.name + '&' + baseData.imei + '&' + baseData.imsi + '$')
                this.closeMapDialog = !this.closeMapDialog;
                let maxTimeRange = 1 * 24 * 60 * 60
//                let startTimeRange = 4 * 24 * 60 * 60 * 1000
                let time = this.$refs.quickQuery.getValue();
                let timeRange = (new Date(time.end).getTime() - new Date(time.start).getTime()) / 1000;
//                let timeRange1 = (Date.now() - new Date(time.start).getTime());
                if (!time.start) {
                    this.$alert('开始时间信息没有录入，请检查后重新录入', {
                        confirmButtonText: '确定'
                    });
                    return
                } else if (!time.end) {
                    this.$alert('结束时间信息没有录入，请检查后重新录入', {
                        confirmButtonText: '确定'
                    });
                    return
                } else if (this.sendPhones.length === 0) {
                    this.$alert('请选择目标', {
                        confirmButtonText: '确定'
                    });
                    return
                } else if (timeRange < 0) {
                    this.$alert('开始时间必须小于截止时间，请检查后重新录入', {
                        confirmButtonText: '确定'
                    });
                    return
                } else if (timeRange > maxTimeRange) {
                    this.$alert('查询范围最大为24小时，请检查后重新录入', {
                        confirmButtonText: '确定'
                    });
                    return
                } else if (this.sendPhones.length > this.maxSelect) {
                    this.$alert('单次选取重点人不能超过' + this.maxSelect + '个', {
                        confirmButtonText: '确定'
                    });
                    return;
                }
                this.value3 = []
                this.rightFold = true;
                this.bottomArea = true;
                this.disClick = false;
                clearInterval(this.timer)
                this.trackAxleVal = 0;
                this.isDetail = true;
                this.rightAllTableOpt.data = [];
                this.leftTableOpt.data = [];
                this.rightPerLocationInfo.data = [];
                this.rightPerLocationInfo.listLoading = true;
                this.rightPerLocationInfo.emptyText = ' ';
                let param = {
                    owner: this.owner,
                    msisdn: this.sendPhones.join(','),
                    queryStartTime: time.start,
                    queryEndTime: time.end
                };
                this.getHistoryDataQuick(param);
            },
            getHistoryDataQuick (param) {
                let me = this;
                this.chooseNum = null;
                this.dynamicInterface(getNationLocusData, getQuickData, param).then((resp) => {
                    let data = resp.data;
                    if (resp && data && data.length) {
                        me.monitorTargetNum = resp.data.length;
                        let baseData = resp.data.map((item) => {
                            return item.baseData;
                        });
                        me.leftTableOpt.data = baseData;
                        let allInfo = [];
                        let personInfoArr = [];
                        let mapData = [];
                        for (let i in data) {
                            if (data[i].points.length !== 0) {
                                let { homeCode, imei, imsi, ispCode, name, msisdn } = data[i].baseData;
                                let { arriveTime, placeCname, stayTime } = data[i].points[0];
                                allInfo.push({ msisdn, arriveTime, placeCname, stayTime });
                                let { points } = data[i];
                                for (let i in points) {
                                    points[i].index = i - 0;
                                }
                                let baseData = [{ homeCode, imei, imsi, ispCode, name, msisdn }];
                                personInfoArr[data[i].baseData.msisdn] = { baseData, points };
                                mapData.push({ baseData, points })
                            } else {
                                let { homeCode, imei, imsi, ispCode, name, msisdn } = data[i].baseData;
                                allInfo.push({ msisdn });
                                let points = [];
                                let baseData = [{ homeCode, imei, imsi, ispCode, name, msisdn }];
                                personInfoArr[data[i].baseData.msisdn] = { baseData, points };
                            }
                            me.personInfoArr = personInfoArr;
                            me.mapData = {
                                info: personInfoArr
                            };
                            me.chooseNum = data[0].baseData.msisdn;
                            me.dealDetailLocationData(me.leftTableOpt.data[0])
                            me.changeDetail();
                            me.locusIndex = null;
                            me.clearHandler();
                        }
                    } else {
                        me.rightPerLocationInfo.data = []
                        me.rightPerLocationInfo.listLoading = false
                        me.rightPerLocationInfo.emptyText = '暂无数据'
                        me.leftTableOpt.data = [];
                    }
                })
            },
            //  控制 覆盖物是否显示 （轴禁用与否）
            controlCover (isShow) {
                let val = isShow ? 'block' : 'none'
                let cover = $('.ga-mainContent__bottom--cover');
                cover.css({
                    'display': val
                })
            },
            //  个人详情 处理 位置数据
            dealDetailLocationData (row) {
                this.rightPerLocationInfo.data = this.personInfoArr[row.msisdn].points;
                this.rightPerLocationDataLength = this.rightPerLocationInfo.data.length;
                this.rightPerBaseInfo.data = this.personInfoArr[row.msisdn].baseData;
                this.name = row.name;
                this.phoneNum = this.isPhoneJM ? phoneNumChange(row.msisdn) : row.msisdn;
                this.chooseNum = row.msisdn;
                this.rightTableLocationLoading = false;
                this.rightPerLocationInfo.listLoading = false;
                if (this.rightPerLocationDataLength) {
                    this.bottomArea = true;
                } else {
                    this.bottomArea = false;
                }
            },
            //  轴改变事件
            trackAxleValChange (val) {
//                console.log(val)
                this.dragVal = val;
//                console.log('轴值改变事件')
            },
            //  号码改变返回 事件
            numChanged (val) {
                if (this.trackAxleVal === 0) {
                    this.trackAxleVal = -1
                    setTimeout(() => {
                        this.trackAxleVal = 0
                    }, 100)
                } else {
                    this.trackAxleVal = 0;
                }
                this.controlCover(true)
                this.mapMarker = val;
                this.dealTimeArr(this.mapData.info[this.chooseNum].points)
                this.startBtn = HISLABEL
                this.btnSts = 'real'
                if (this.disClick) {
                    this.disClick = false
                }
            },
            //  轴 显示 时间数组
            dealTimeArr (val) {
                if (val.length) {
                    let data = val;
                    let arr = [];
                    for (let i in data) {
                        arr.push({
                            arriveTime: data[i].arriveTime,
                            stayTime: data[i].stayTime
                        })
                    }
                    this.timeArr = arr;
                    this.trackAxleMax = this.timeArr.length - 1;
                } else {
//                    console.log('为空哦')
                }
            },
            // 地图 画完
            alreadyDraw () {
                this.startBtn = CONLABEL
                this.disClick = false;
            },
            //  清除键（实时键）
            clearHandler () {
                this.realType = 'primary'
                this.controlCover(true)
                this.trackAxleVal = 0;
                clearInterval(this.timer)
                this.btnSts = 'real'
                this.startBtn = HISLABEL
                this.disClick = false
                this.isStop = false;
                let val = this.chooseNum;
                this.chooseNum = null;
                setTimeout(() => {
                    this.chooseNum = val;
                })
            },
            //  回放键
            startHandler () {
                if (!this.leftTableLoading) {
                    if (clicktag === 0) {
                        clicktag = 1;
                        setTimeout(function () { clicktag = 0 }, 500);
                    } else {
                        alert('请勿频繁点击！');
                        return;
                    }
                    //  回放 两折叠框 收起
                    let tab = $('.ga-mainContent__left');
                    if (tab.height() > 50) {
                        tab.animate({
                            'height': '28px'
                        })
                    }
                    let tab1 = $('.ga-mainContent__right');
                    if (tab1.height() > 50) {
                        tab1.animate({
                            'height': '28px'
                        })
                    }
                    //  暂停 状态 真
                    this.isStop = true;
                    //  个人详情 标题
                    if (!this.isQuickQuery) {
                        this.isDetail = false;
                    }
                    this.isLeftToggle = true;
                    this.isRightToggle = true;
                    this.btnSts = 'playback'
                    if (this.disClick) {
                        // 暂停
                        this.realType = 'primary'
                        clearInterval(this.timer)
                        this.startBtn = CONLABEL
                        this.controlCover(false)
                        this.disClick = false;
                    } else {
                        //  播放
//                        console.log('轴')
                        this.realType = 'default'
                        this.controlCover(true)
                        this.startBtn = PAUSELABEL
                        //  播放完 归零
                        if (this.trackAxleVal === this.trackAxleMax) {
                            this.trackAxleVal = 0;
                        }
                        let speed = 1;
                        let speedTime = this.playTime(20, this.trackAxleMax * 2 - 1, this.playMinTime, this.playMaxTime)
                        //  轴值 不为0 说明是暂停再播放情况
                        if (this.trackAxleVal) {
                            this.trackAxleVal += 0.5
                        }
//                        let trackAxleVal = 0;
//                        if (this.trackAxleVal) {
//                            console.log(this.trackAxleVal)
//                            trackAxleVal = Math.ceil(this.trackAxleVal) * 10 + 1
//                        }
//                        this.timer = setInterval(() => {
//                            trackAxleVal += 1;
//                            this.trackAxleVal = trackAxleVal / 10
//                            speed += 0.5;
//                            if (this.trackAxleVal === this.trackAxleMax) {
//                                clearInterval(this.timer)
//                                this.timer = 0;
//                            }
//                        }, 200 * speed)
                        this.timer = setInterval(() => {
                            this.trackAxleVal += 0.5
                            speed += 1;
                            if (this.trackAxleVal === this.trackAxleMax) {
                                clearInterval(this.timer)
                                this.timer = 0;
                            } else {
//                                console.log('没到最后')
                            }
                        }, speedTime * (speed++))
                        this.disClick = true
                    }
                } else {
//                    console.log('还是空的呢')
                }
            },
            /**
             * [playTime 播放]
             * @param  {[type]} minTime  [description] 最小播放时间 单位s
             * @param  {[type]} maxTime [description]  最大播放时间 单位s
             * @return {[type]} num        [description]  最小播放时间可播放的最大个数
             * @return {[type]} total        [description]  播放总个数
             */
            playTime (num, total, minTime, maxTime) {
                let speedTime = 1000
                let n = +(total / num).toFixed(2)
                let subtract = maxTime - minTime
                if (n > 1 && n < subtract) {
                    speedTime = ((minTime + n - 1) * 1000) / (total)
                } else if (n <= 1) {
                    speedTime = (minTime * 1000) / (total)
                } else if (n >= subtract) {
                    speedTime = ((maxTime) * 1000) / (total)
                }
                return speedTime
            },
            showLocationMessage (row) {
                let data = row;
                this.locationMessageShow = true;
                let locationData = this.locationData
                locationData[0].value = data.stationLocation
                locationData[1].value = data.lac
                locationData[2].value = data.ci
                locationData[3].value = '(' + Math.floor(data.longtitude * 100000) / 100000 + ',' +
                    Math.floor(data.latitude * 100000) / 100000 + ')'
                locationData[4].value = data.placement
                this.locationData = locationData;
            },
            //  事件颜色
            eventTypeColor (val) {
                return {
                    background: val
                }
            },
            //  获取所有重点人数据
            async dynamicInterface (nation, part, args) {
                if (this.part === 'nation') {
                    return await nation(args);
                } else {
                    if (part !== '' || part !== null) {
                        return await part(args);
                    }
                }
            },
            //  目标选择 获取重点人 this.owner
            async getImportantData () {
                this.getImportantObj.owner = this.owner;
                //      this.tableOpt.listLoading = true;
                //      this.tableOpt.emptyText = ' ';
                //      let tableData = [];
                if (this.part === 'part') {
                    this.tableData = await getPartAreaImportant(this.getImportantObj);
                } else if (this.part === 'nation') {
                    this.tableData = await getNationImportant(this.getImportantObj);
                }
                //      if (this.tableData.rows.length !== 0) {
                //          this.tableOpt.data = this.tableData.rows;
                //      if (this.tableOpt.data.length) {
                //          this.tableOpt.listLoading = false;
                //      } else {
                //          setTimeout(() => {
                //              this.tableOpt.listLoading = false;
                //          }, 500)
                //       } else {
                //          setTimeout(() => {
                //              this.tableOpt.listLoading = false;
                //              this.tableOpt.emptyText = '暂无数据';
                //          }, 1500)
                //       }
                let data = [];
                if (this.tableData.rows) {
                    this.tableData.rows.forEach((item, index) => {
                        data.push({
                            name: item.name,
                            msisdn: item.msisdn,
                            label: `${item.name} - ${item.msisdn}`,
                            key: index + 1
                        })
                    });
                }
//                this.transferData = data;
                this.transferOpt.data = data;
            },
            tableMouseWheel () {
                $('.el-tooltip__popper.is-dark').css({
                    'display': 'none'
                })
            },
            //  控制 左右折叠框 折叠
            leftToggle () {
                let tab = $('.ga-mainContent__left');
                this.isLeftToggle = !this.isLeftToggle;
                if (tab.height() > 50) {
                    tab.animate({
                        'height': '28px'
                    })
                } else {
                    $('.ga-mainContent__left').animate({
                        'height': '300px'
                    })
                }
            },
            rightToggle () {
                if (this.isQuickQuery) {
                    let tab = $('.ga-mainContent__right');
                    this.isRightToggle = !this.isRightToggle;
                    if (tab.height() > 50) {
                        tab.animate({
                            'height': '28px'
                        })
                    } else {
                        this.changeDetail()
                    }
                } else {
                    let tab = $('.ga-mainContent__right');
                    this.isRightToggle = !this.isRightToggle;
                    if (this.isDetail) {
                        tab.animate({
                            'height': '28px'
                        })
                    } else {
                        if (tab.height() > 50) {
                            tab.animate({
                                'height': '28px'
                            })
                        } else {
                            $('.ga-mainContent__right').animate({
                                'height': '250px'
                            });
                            // $('.ga-rightFold__content').animate({
                            //     'height': `${this.rightFoldContent}px`
                            // })
                        }
                    }
                    this.isDetail = false;
                }
            },
            //  点击详情
            changeDetail () {
                this.closeMapDialog = !this.closeMapDialog;
                this.isDetail = true;
                this.isRightToggle = false;
                $('.ga-mainContent__right').animate({
//                    'height': '355px'
                    'height': `${this.mainContentRight}px`
                });
                $('.ga-rightFold__content').animate({
                    // 'height': `${this.rightFoldContent}px`
                })
            },
            getHistoryData (param) {
                let me = this;
                this.chooseNum = null;
                this.dynamicInterface(getNationLocusData, getPartAreaLocusData, param).then((resp) => {
                    let data = resp.data;
                    if (resp && data && data.length) {
                        me.monitorTargetNum = resp.data.length;
                        let baseData = resp.data.map((item) => {
                            return item.baseData;
                        });
                        me.leftTableOpt.data = baseData;
                        if (me.leftTableOpt.data.length) {
                            me.leftTableOpt.listLoading = false;
                            me.leftTableLoading = false;
                        }
                        let allInfo = [];
                        let personInfoArr = [];
                        let mapData = [];
                        for (let i in data) {
                            if (data[i].points.length !== 0) {
                                let { homeCode, imei, imsi, ispCode, name, msisdn } = data[i].baseData;
                                let { arriveTime, placeCname, stayTime } = data[i].points[0];
                                allInfo.push({ msisdn, arriveTime, placeCname, stayTime });
                                let { points } = data[i];
                                for (let i in points) {
                                    points[i].index = i - 0;
                                }
                                let baseData = [{ homeCode, imei, imsi, ispCode, name, msisdn }];
                                personInfoArr[data[i].baseData.msisdn] = { baseData, points };
                                mapData.push({ baseData, points })
                            } else {
                                let { homeCode, imei, imsi, ispCode, name, msisdn } = data[i].baseData;
                                allInfo.push({ msisdn });
                                let points = [];
                                let baseData = [{ homeCode, imei, imsi, ispCode, name, msisdn }];
                                personInfoArr[data[i].baseData.msisdn] = { baseData, points };
                            }
                        }
                        me.personInfoArr = personInfoArr;
                        me.rightAllTableOpt.data = allInfo;
                        if (me.rightAllTableOpt.data.length) {
                            me.rightTableLoading = false;
                            me.rightAllTableOpt.listLoading = false;
                        }
                        me.mapData = {
                            info: personInfoArr
                        };
                        me.chooseNum = data[0].baseData.msisdn;
                    } else {
                        me.leftTableOpt.listLoading = false;
                        me.rightAllTableOpt.listLoading = false;
                        me.leftTableLoading = false;
                        me.rightTableLoading = false;
                        me.leftTableOpt.data = [];
                        me.rightAllTableOpt.data = [];
                    }
                })
            },
            showPopTable () {
                this.selectShow = true;
            },
            //  选取目标人
            handleSelectionChange (val) {
                this.sendPhones = [];
                if (val.length > this.maxSelect) {
                    this.$message({
                        type: 'warning',
                        message: '最多选择' + this.maxSelect + '个重点人'
                    });
                    val.splice(this.maxSelect)
                }
                for (let i = 0; i < val.length; i++) {
                    this.sendPhones.push(val[i].msisdn + '&' +
                        val[i].name + '&' + val[i].imei + '&' + val[i].imsi + '$')
                }
            },
            confirm () {
                let timeVal = ''
                if (this.isMultiPath) {
                    let time = this.$refs.form.getValue();
                    this.closeMapDialog = !this.closeMapDialog;
                    let timeRange = (new Date(time.end).getTime() - new Date(time.start).getTime()) / 1000;
                    let timeRange1 = Date.now() - new Date(time.end).getTime();
                    if (!time.start) {
                        this.$alert('请选择开始时间', {
                            confirmButtonText: '确定'
                        });
                        return
                    } else if (!time.end) {
                        this.$alert('请选择结束时间', {
                            confirmButtonText: '确定'
                        });
                        return
                    } else if (this.sendPhones.length === 0) {
                        this.$alert('请选择目标', {
                            confirmButtonText: '确定'
                        });
                        return
                    } else if (timeRange < 0) {
                        this.$alert('开始时间不能大于结束时间', {
                            confirmButtonText: '确定'
                        });
                        return
                    } else if (timeRange1 < 0) {
                        this.$alert('结束时间不能超过当前时间', {
                            confirmButtonText: '确定'
                        })
                        return
                    } else if (timeRange > this.maxTimeRange) {
                        this.$alert('最大时间范围为 24 小时', {
                            confirmButtonText: '确定'
                        });
                        return
                    } else if (this.sendPhones.length > this.maxSelect) {
                        this.$alert('单次选取重点人不能超过' + this.maxSelect + '个', {
                            confirmButtonText: '确定'
                        });
                        return;
                    }
                    timeVal = time
                }
                this.selectShow = false;
                this.value3 = []
                this.leftFold = true;
                this.rightFold = true;
                this.bottomArea = true;
                this.disClick = false;
                clearInterval(this.timer)
                this.trackAxleVal = 0;
                $('.ga-mainContent__right').animate({
                    'height': '250px'
                });
                $('.ga-mainContent__left').animate({
                    'height': '300px'
                });
                this.isDetail = false;
                this.rightAllTableOpt.data = [];
                this.leftTableOpt.data = [];
                this.leftTableOpt.listLoading = true;
                this.rightAllTableOpt.listLoading = true;
                this.leftTableLoading = true;
                this.rightTableLoading = true;
                console.log(this.selectObj)
                let start = this.isMultiPath ? timeVal.start : this.selectObj.start
                let end = this.isMultiPath ? timeVal.end : this.selectObj.end
                let sendPhones = this.isMultiPath ? this.sendPhones : this.selectObj.sendPhones
                let param = {
                    owner: this.owner,
                    msisdn: sendPhones.join(','),
                    queryStartTime: start,
                    queryEndTime: end
                };
                this.sendPhones = []
                this.getHistoryData(param);
            },
            dialogChange (val) {
                this.selectShow = val;
                this.locationMessageShow = val;
            },
            //  穿梭框的方法
            handleChange (data) {
                this.sendPhones = [];
                if (data.length > this.maxSelect) {
                    this.$alert('单次选取重点人不能超过' + this.maxSelect + '个', {
                        confirmButtonText: '确定'
                    });
                    data.length = this.maxSelect;
                }
                let orgData = this.tableData.rows;
                for (let j = 0; j < data.length; j++) {
                    this.sendPhones.push(orgData[data[j] - 1].msisdn + '&' +
                        orgData[data[j] - 1].name + '&' + orgData[data[j] - 1].imei + '&' + orgData[data[j] - 1].imsi + '$')
                }
            },
            renderFunc (h, option) {
                return <span>{ option.key } - { option.label }</span>;
            },
            filterMethod (query, item) {
                this.$nextTick(() => {
                    this.filterArrLengthLeft = $('.el-transfer-panel:first .el-transfer-panel__item').length
                })
                this.$nextTick(() => {
                    this.filterArrLengthRight = $('.el-transfer-panel:last .el-transfer-panel__item').length
                })
                return item.label.indexOf(query) > -1;
            }
        },
        components: {
            transfer,
            formSelect,
            popTable,
            gis,
            sysDialog
        }
    }
</script>

<style lang="postcss" scoped>
    /*@media only screen and (min-width: 1440px) {*/
        /*.ga-mainContent {*/
            /*width: 100%;*/
            /*height: calc(105% - 70px);*/
            /*position: relative;*/
            /*top: -5%;*/
        /*}*/
    /*}*/
    /*@media only screen and (max-width: 1440px) {*/
        /*.ga-mainContent {*/
            /*width: 100%;*/
            /*height: calc(107% - 70px);*/
            /*position: relative;*/
            /*top: -7%;*/
        /*}*/
    /*}*/
    .moving {
        width: 60px;
        height: 50px;
        background: url('~@/assets/images/moving.gif');
    }
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
    .ga-mainContent__bottom--clearBtn.active:before {
        background: #1A498A;
    }
    .ga-mainContent__bottom--clearBtn.active:after {
        background: #1A498A;
    }
    .ga-mainContent__bottom--startBtn.active:before {
        background: #1A498A;
    }
    .ga-mainContent__bottom--startBtn.active:after {
        background: #1A498A;
    }
    .el-transfer .el-transfer-panel .el-transfer-panel__body {
        height: 200px;
    }
    @component-namespace ga {
        @b quickQuery {
            position: absolute;
            z-index: 3;
            left: 20px;
            top: 32px;
        }
        @b title {
            @e vertical {
                display: inline-block;
                & span:first-child {
                    display: inline-block;
                    width: 5px;
                    height: 13px;
                    background-color: #268CC6;
                    margin-right: 10px;
                }
                & span:last-child {
                    color: #fff;
                }
            }
            @e eventType {
                display: inline-block;
                margin-left: 20px;
                color: #fff;
                span {
                    display: inline-block;
                    margin-right: 15px;
                    width: 20px;
                    height: 10px;
                }
            }
        }
        /*上方选择框*/
        @b menu {
            width: 100px;
            position: absolute;
            z-index: 11;
            top: -13px;
            left: -5px;
        }
        /*下方内容样式*/
        @b mainContent {
            @e left {
                display: inline-block;
                position: absolute;
                box-shadow:4px 4px 9px rgba(0,0,0,0.5);
                border-radius: 0 0 18px 0;
                top: 100px;
                left: 30px;
                width: 360px;
                overflow: hidden;
                & p {
                    color: #fff;
                }
            }
            @e right {
                display: inline-block;
                position: absolute;
                box-shadow:-4px 4px 9px rgba(0,0,0,0.5);
                border-radius: 0 0 0 18px;
                top: 100px;
                right: 19px;
                width: 575px;
                background-color: rgba(0,0,0,0.9);
                & p {
                    color: #fff;
                }
                overflow: hidden;
                @m avatar{
                    /*background: rgba(0,0,0,0.7) url("~assets/images/allInterAnalyze/avatar.png") no-repeat left center;*/
                    background: url("~assets/images/warning/head.png") no-repeat left center;
                    background-size: 40px 40px;
                    height: 39px;
                    line-height: 22px;
                    padding: 0px 0px 0px 55px;
                    padding-bottom: 10px;
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
            }
            @e rightDetail {
                display: inline-block;
                position: absolute;
                top: 0;
                right: 0;
                width: 593px;
            }
            @e bottom {
                position: absolute;
                bottom: 16px;
                left: 0%;
                width: 100%;
                height: 30px;
                background: transparent;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 0 30px;
                @m clearBtn {
                    font-size: 12px;
                    position: relative;
                    margin-left: 25px;
                    margin-right: 25px;
                    margin-bottom: 0px;
                    z-index: 1;
                    &:before {
                        content: '';
                        z-index: -1;
                        top: 3px;
                        bottom: 3px;
                        right: 5px;
                        left: -17px;
                        background: var(--bg-color);
                        position: absolute;
                        border: 1px solid #4081dc;
                    }
                    &:after {
                        content: '';
                        position: absolute;
                        top: 3px;
                        bottom: 3px;
                        left: 0px;
                        right: -18px;
                        z-index: -1;
                        background: var(--bg-color);
                        -webkit-transform: skew(-25deg);
                        transform: skew(-25deg);
                        border: 1px solid #4081dc;
                        border-left: none;
                    }
                }
                @m startBtn {
                    font-size: 12px;
                    position: relative;
                    margin-bottom: 0px;
                    z-index: 1;
                    &:before {
                        content: '';
                        z-index: -1;
                        top: 3px;
                        bottom: 3px;
                        right: 5px;
                        left: -15px;
                        background: var(--bg-color);
                        position: absolute;
                        -webkit-transform: skew(-25deg);
                        transform: skew(-25deg);
                        border: 1px solid #4081dc;
                        border-right: none;
                    }
                    &:after {
                        content: '';
                        position: absolute;
                        top: 3px;
                        bottom: 3px;
                        left: 8px;
                        right: -15px;
                        z-index: -1;
                        background: var(--bg-color);
                        border: 1px solid #4081dc;
                        border-left: none;
                    }
                }
                @m trackAxle {
                    position: relative;
                    left: 30px;
                    width: calc(100% - 145px)
                }
                @m cover {
                    position: absolute;
                    bottom: 0px;
                    z-index: 1002;
                    right: 0px;
                    height: 30px;
                    width: calc(100% - 125px);
                    /*background-color: red;*/
                    cursor:not-allowed;
                }
                @m bubble {
                    position: absolute;
                    left: -30px;
                    bottom: 42px;
                    /*border: 1px solid red;*/
                }
                @m bubbleMoving {
                    padding: 5px;
                    background: var(--bg-color);
                    color: var(--font-color);
                }
            }
        }
        @b leftFold {
            @e headline {
                height: 28px;
                /*background-color: rgba(9,94,179,0.8);*/
                /*color: #fff;*/
                background: rgba(11, 63, 120, 0.9);
                border-radius: 5px 5px 0 0;
                @m title {
                    color: #fff;
                    font-size: 14px;
                }
                @m btn {
                    width: 25px;
                    text-align: center;
                    line-height: 30px;
                    font-size: 25px;
                }
            }
            @e content {
                height: 272px;
                background-color: rgba(0,0,0,0.9);
            }
        }
        @b rightFold {
            @e headline {
                height: 28px;
                /*background-color: rgba(9,94,179,0.8);*/
                /*color: #fff;*/
                background: rgba(11, 63, 120, 0.9);
                border-radius: 5px 5px 0 0;
                @m title {
                    font-size: 14px;
                }
                @m btn {
                    width: 25px;
                    text-align: center;
                    line-height: 30px;
                    font-size: 25px;
                }
            }
            @e content {
                height: 402px;
                background-color: rgba(0,0,0,0.9);
            }
        }
        @b locationMessage {
            padding: 5px 10px;
            height: 160px;
            text-align: center;
            @e content {
                display:flex;
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
