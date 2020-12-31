<template>
    <div style="width: 100%;height: 100%">
        <div class='ga-mapSty__btn'>
            <formSelect :option='choice'></formSelect>
        </div>
        <!--目标选择弹出框-->
        <sysDialog size="small"
                   v-if="selectShow"
                   :dialogVisible="selectShow"
                   title="目标选择"
                   :okFn="confirm"
                   @change="dialogChange">
            <!--目标选择穿梭框-->
            <transfer :option="transferOpt">
            </transfer>
        </sysDialog>
        <!--主要内容-->
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
        <div class='ga-mainContent'>
            <gis @bigToSmall="bigToSmall"
                 :option="mapData"
                 :labelShow="labelShow"
                 :part="part"
                 :chooseNum="chooseNum">
            </gis>
            <div style="position: absolute;
                 width: 600px;height: 500px;z-index: -999"
                 v-show="!middleMapShow">
                <screenShotMap :option="smallMapData"
                               :part="part">
                </screenShotMap>
            </div>
            <!--中间按钮-->
            <div class="ga-mainContent__content"
                 v-if="centerContent">
                <div style="display: flex;justify-content: center;align-items: center;height: 100%">
                    <btnComp :option="btnOpt"></btnComp>
                    <!-- <span style="margin-right: 5px;cursor: pointer"
                          @click="refreshAll">刷新 -->
                    <!-- </span> -->
                    <checkBox class="ga-mainContent__content--btn ga-mainContent__content--btnL"
                              :option='showNameBtn'>
                    </checkBox>
                    <checkBox class="ga-mainContent__content--btn ga-mainContent__content--btnR"
                              :option='showNumBtn'>
                    </checkBox>
                </div>
            </div>
            <!--左侧下拉列表 leftContent-->
            <div :class="[{ 'ga-mainContent__partLeft': part === 'part', 'ga-mainContent__nationLeft': part === 'nation' }, 'ga-mainContent__left']"
                 ref="popLeftTable"
                 v-if="leftContent">
                <el-row class="ga-mainContent__title">
                    <!--title-->
                    <el-col v-if="part === 'part'"
                            :span="20"
                            :offset="1"
                            class="">
                        <span>{{panesName[currentView]}}</span>
                        <span class="ga-sty__opacity">({{numberOfPeople}}人)</span>
                    </el-col>
                    <el-col v-if="part === 'nation'"
                            :span="20"
                            :offset="1">
                        <span>{{panesNameNation[currentView]}}</span>
                        <span class="ga-sty__opacity">({{numberOfPeople}}人)</span>
                    </el-col>
                    <!--折叠按钮-->
                    <el-col :span="2">
                        <div @click="leftToggleShow" class="ga-arrowWrap">
                            <span :class="[isLeftToggle ? 'ga-arrow__up' : 'ga-arrow__down', 'ga-arrow']"></span>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="padding: 0px 10px">
                    <formSelect :option="quickQueryOpt" ref="quickQuery" style="margin: 0px"></formSelect>
                </el-row>
                <!--tab切换-->
                <el-row>
                    <tab class="ga-tab nxPolice-table WB"
                         @currentSelected="tabCurrentSelected"
                         :act="currentView"
                         :panes="panes"
                         :option="tabsOpt">
                        <!--折叠框-->
                        <el-row class="nxPolice-collapse"
                                id="ga-collapse">
                            <el-collapse accordion
                                         v-model="collapseName"
                                         v-for="(item, index) in collapseArr"
                                         :key="item.name">
                                <el-collapse-item :name="item.name">
                                    <template slot="title">
                                        <div v-if="index !== 5">
                                            <div v-if="part === 'part'">
                                                <div class="ga-sty__opacity" v-if="currentView !== 2">
                                                    {{timeName[index]}}
                                                    <span>小时内</span>
                                                    <!--<span v-if="index !== 4">内</span>-->
                                                    <!--<span v-else>上</span>-->
                                                    ( {{divideData[index]}} 人)
                                                </div>
                                                <div class="ga-sty__opacity" v-if="currentView === 2">
                                                    {{timeName[index + 5]}}
                                                    <span>天</span>
                                                    <span v-if="index !== 4">内</span>
                                                    <span v-else>以上</span>
                                                    ( {{divideData[index]}} 人)
                                                </div>
                                            </div>
                                            <div v-if="part === 'nation'">
                                                <div v-if="currentView !== 3">
                                                    {{timeName[index]}}
                                                    <span>小时内</span>
                                                    <!--<span v-if="index !== 4">内</span>-->
                                                    <!--<span v-else>上</span>-->
                                                    ( {{divideData[index]}} 人)
                                                </div>
                                                <div v-if="currentView === 3">
                                                    {{timeName[index + 5]}}
                                                    <span>天</span>
                                                    <span v-if="index !== 4">内</span>
                                                    <span v-else>以上</span>
                                                    ( {{divideData[index]}} 人)
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            {{item.title}}
                                        </div>
                                    </template>
                                    <div v-if="collapseName === index + 1" @mousewheel="tableMouseWheel">
                                        <popTable ref="leftTable"
                                                  :option="leftTableOptBase"
                                                  :comSize="comSizeLeft">
                                        </popTable>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </el-row>
                    </tab>
                </el-row>
            </div>
            <!--右侧下拉列表 rightContent-->
            <div class="ga-mainContent__right"
                 ref="popRightTable"
                 v-if="rightContent">
                <el-row class="ga-mainContent__title">
                    <!--title-->
                    <el-col :span="20"
                            :offset="1">
                        <span>&nbsp;{{rightBaseData.name}} {{rightBaseMsisdn}}
                            <!--最新位置详情-->
                        </span>
                        <!--&nbsp;&nbsp;<a @click="getMap">导出</a>-->
                    </el-col>
                    <!--折叠按钮-->
                    <el-col :span="2">
                        <div @click="rightToggleShow" class="ga-arrowWrap">
                            <span :class="[isRightToggle ? 'ga-arrow__up' : 'ga-arrow__down', 'ga-arrow']"></span>
                        </div>
                    </el-col>
                </el-row>
                <!--基本信息-->
                <el-row class="ga-mainContent__right--base">
                    <el-col :span="22" :offset="1" class="ga-title">
                        <el-row>
                            <span></span>目标基本信息
                        </el-row>
                    </el-col>
                    <div class="nxPolice-table realTimeSearch-dtTable WB">
                        <div v-loading="baseDataListLoading" style="position: absolute;top: 57%;left: 45%;"></div>
                        <popTable :option="baseDataOpt" :comSize="{height: 82}"></popTable>
                    </div>
                    <!-- <div class="ga-locationMessage__devide"></div> -->
                    <div>
                        <div v-loading="baseDataListLoading" style="top:18px;transform: scale(0.75,0.75)"></div>
                        <div v-if="!baseDataListLoading">
                            <p v-if="!rightBaseNewInfo" style="text-align: center;
                                                            color: #9af5f6;
                                                            opacity: 0.6;
                                                            font-size: 12px;
                                                            line-height: 38px;">
                                暂无数据</p>
                            <p v-else style="padding-left: 5px">{{ rightBaseNewInfo }}</p>
                        </div>
                    </div>
                </el-row>
                <!--<el-row class="ga-mainContent__right&#45;&#45;base">-->
                    <!--<el-col :span="22" :offset="2">-->
                        <!--<el-row style="margin-top: 10px;">-->
                            <!--<el-col :span="12">-->
                                <!--<span>-->
                                    <!--姓名：{{rightBaseData.name}}-->
                                <!--</span>-->
                            <!--</el-col>-->
                            <!--<el-col :span="12" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;color:#fff;">-->
                                <!--归属地：<el-tooltip :content="rightBaseData.homeCode" placement="top-start" >-->
                                    <!--<span>-->
                                        <!--{{rightBaseData.homeCode}}-->
                                    <!--</span>-->
                                <!--</el-tooltip>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                        <!--<el-row style="">-->
                            <!--<el-col :span="12">-->
                                <!--<span>-->
                                    <!--手机号：{{rightBaseData.msisdn}}-->
                                <!--</span>-->
                            <!--</el-col>-->
                            <!--<el-col :span="12">-->
                                <!--<span>-->
                                    <!--机身码：{{rightBaseData.imei}}-->
                                <!--</span>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                    <!--</el-col>-->
                <!--</el-row>-->
                <!--间隙-->
                <!-- <el-row class="ga-mainContent__right--interspace">
                    <div></div><div></div>
                </el-row> -->
                <!--位置信息-->
                <el-row class="ga-mainContent__right--location">
                    <el-col :span="22" :offset="1" class="ga-title">
                        <el-row>
                            <span></span>位置信息
                            <!--<span></span>&nbsp;&nbsp;<a @click="getMap">导出</a>-->
                        </el-row>
                    </el-col>
                    <div class="nxPolice-table WB">
                        <div v-loading="rightTableLoading" style="position: absolute;top: 59%;left: 45%"></div>
                        <popTable :option="locationTableOpt" :comSize="{height: 135}"></popTable>
                    </div>
                </el-row>
                <!--间隙-->
                <!-- <el-row class="ga-mainContent__right--interspace"
                        v-show="currentView === 1">
                    <div></div><div></div>
                </el-row> -->
                <!--最新事件信息-->
                <el-row class="ga-mainContent__right--incident"
                        v-show="currentView === 1">
                    <el-col :span="22" :offset="1"
                            class="ga-title">
                        <el-row>
                            <span></span>最新事件信息
                        </el-row>
                        <el-row>
                            <el-col :span="12">时间：{{rightHasNew.eventTypeTime}}</el-col>
                            <el-col :span="12">事件：{{rightHasNew.eventType}}</el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <!--间隙-->
                <!-- <el-row class="ga-mainContent__right--interspace">
                    <div></div><div></div>
                </el-row> -->
                <!--小地图 省内 消失-->
                <el-row v-if="currentView !== 1"
                        class="ga-mainContent__right--map"
                        @click="showMiddleMap">
                    <smallMap @openMiddleMap="showMiddleMap"
                              :option="smallMapData"
                              class="ga-gis"
                              :part="part">
                    </smallMap>
                </el-row>
                <!--小地图 不明-->
                <el-row v-else
                        class="ga-mainContent__right--map1"
                        @click="showMiddleMap">
                    <smallMap @openMiddleMap="showMiddleMap"
                              class="ga-gis"
                              :option="smallMapData"
                              :part="part">
                    </smallMap>
                </el-row>
            </div>
        </div>
        <sysDialog size="tiny"
                   :class="{'realTimeSearch-dialog':cdrShow}"
                   :dialogVisible="locationMessageShow"
                   title="位置详情"
                   :showCancel="false"
                   :showConfirm="false"
                   @change="dialogChange">
            <div class="ga-locationMessage">
                <p v-for="item in locationData" :key="item.name" class="ga-locationMessage__content">
                    <span>
                        {{item.name}}
                    </span>
                    <span>
                        {{item.value}}
                    </span>
                </p>
                <template v-if="cdrShow">
                    <div class="ga-locationMessage__devide"></div>
                    <p class="ga-locationMessage__title">{{rightBaseMsisdn}}最新信令</p>
                    <div>
                        <popTable :option="detailDataOpt" :comSize="{height: 220}"></popTable>
                    </div>
                </template>
            </div>
        </sysDialog>
    </div>
</template>

<script>
    //  截图 地图
    import screenShotMap from './screenshotMap.vue'
    import transfer from 'components/transfer'
    import middleMap from './middleMap.vue'
    import smallMap from './smallMap.vue'
    import selectComp from 'components/Form/select'
    import btnComp from 'components/Form/button'
    import checkBox from 'components/Form/checkbox'
    import tab from './tab'
    import sysDialog from 'components/common/dialog'
    import formSelect from 'components/Form'
    import popTable from 'components/Table'
    import gis from './map'
    import { nationImpPerList, getNationData, nationClickDetailQuery, nationExportImg, nationExportData } from 'api/allNetAnalyze/newestLocationQuery'
    import { partAreaImpPerList, getPartData, partClickDetailQuery, partExportImg, partExportData } from 'api/allNetAnalyze/newestLocationQuery'
    import buttonComp from 'components/Form/button'
    import { mapGetters } from 'vuex'
    import { phoneNumChange } from 'utils/index'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '/policeBusiness' : 'http://192.168.3.175:8080/policeBusiness'

    export default {
        data () {
            let me = this;
            return {
                btnOpt: {
                    value: '刷新',
                    click () {
                        me.refreshAll()
                    }
                },
                rightBaseNewInfo: '',
                transferOpt: {
                    titles: ['目标号码', '已选目标'],
                    data: [],
                    handleChange: me.handleChange
                },
//              最大选择人数
                maxSelect: 20,
//                是否显示 信令
                cdrShow: false,
//                右侧基本信息 加载动画
                baseDataListLoading: false,
                filterArrLengthLeft: '',
                filterArrLengthRight: '',
                exportUrl: '',
                exportIndex: '',
                quickQueryOpt: {
                    inline: true,
                    labelPos: 'left',
                    labelWidth: '80',
                    items: [{
                        label: '',
                        type: 'text',
                        comOpt: {
                            id: 'targetTel',
                            placeholder: '精准号码快速定位',
                            width: 160,
                            disabled: false
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '查询',
                            disabled: false,
                            click () {
                                me.quickQuery();
                            }
                        }
                    }]
                },
                rowLocationData: {},
//                穿梭框
                transferData: [],
                value3: [],
                tableData: [],
//                时间段 个数
                timeFlagLength: 5,
//                弹框显示 位置详情
                locationMessageShow: false,
                rightTableLoading: false,
//                左 table 是否有数据
                noData: false,
//                table 数据长度 变化否
                changeTableLength: false,
//                中地图 显示
                middleMapShow: false,
//                小地图 显示
                smallMapShow: false,
                isFromTask: false,
//                左 是否折叠
                isLeftToggle: true,
//                右 是否折叠
                isRightToggle: true,
//                目标选择 弹框 显示
                selectShow: false,
//                左 中 右 是否显示
                centerContent: false,
                leftContent: false,
                rightContent: false,
//                table 数据 长度 默认为 -1 为了监听到变化
                leftTableHeight: -1,
//                左侧 高度
                leftFoldHeight: 410,
//                目标选择 弹框 表格高度
                tableHeight: 260,
                panesName: ['省内', '位置不明', '消失'],
                panesNameNation: ['省外', '省内', '位置不明', '消失'],
//                每个时间段 的人数  数组
                divideData: [],
                inProvinceNum: 0,
                locationUnknownNum: 0,
                disappearNum: 0,
//                所选号码
                chooseNum: 0,
//                右侧 事件信息
                rightHasNew: {
                    eventTypeTime: '',
                    eventType: ''
                },
                rightBaseMsisdn: '',
//                右侧 基本信息
                rightBaseData: {
                    homeCode: '',
                    name: '',
                    msisdn: '',
                    imei: '',
                    newInfo: ''
                },
//                中地图 数据
                middleMapData: {},
//                小地图数据
                smallMapData: {},
//                时间名字
                timeName: [
                    '1', '1-2', '2-6', '6-12', '12-24',
                    '1-3', '3-7', '7-15', '15-30', '31'
                ],
//                折叠面板 当前展开第几个
                collapseName: 1,
//                折叠面板 标题 数组
                collapseArr: [
                    {
                        name: 1,
                        title: '1小时以内'
                    },
                    {
                        name: 2,
                        title: '1-2小时以内'
                    },
                    {
                        name: 3,
                        title: '2-6小时以内'
                    },
                    {
                        name: 4,
                        title: '6-12小时以内'
                    },
                    {
                        name: 5,
                        title: '12-24小时以内'
                    }

                ],
                allData: [],
                showMapData: [],
                labelShow: {
                    showName: 0,
                    showNum: 0
                },
                showNameBtn: {
                    data: [{
                        name: '显示姓名'
                    }],
                    change (val) {
                        if (val) {
                            me.labelShow.showName = 1;
                        } else {
                            me.labelShow.showName = 0;
                        }
                    }
                },
                showNumBtn: {
                    data: [{
                        name: '显示手机号'
                    }],
                    change (val) {
                        if (val) {
                            me.labelShow.showNum = 1;
                        } else {
                            me.labelShow.showNum = 0;
                        }
                    }
                },
                leftTableData: [],
                numberOfPeople: 0,
//                左 table
                leftTableOptBase: {
                    listLoading: false,
                    stripe: false,
                    highlightRow: true,
                    column: [
                        { name: '姓名', value: 'name', width: '', align: 'center', tooltip: true },
                        { name: '手机号', value: 'msisdn', width: 130, align: 'center' },
                        { name: '归属地', value: 'homeCode', width: 58, align: 'center', tooltip: true, highlightKey: true, keys: [] }
                    ],
                    data: [],
                    rowClick: function (row) {
                        let tab = $('.ga-mainContent__right');
                        tab.animate({
                            'height': '490px'
                        })
                        me.baseDataOpt.data = []
                        let { homeCode, spCode, imsi, imei } = row
                        me.baseDataOpt.data = [{ homeCode, spCode, imsi, imei }]
                        me.rightBaseData = row;
                        me.rightBaseMsisdn = me.isPhoneJM ? phoneNumChange(row.msisdn) : row.msisdn
                        me.clickDetail(row.msisdn + '&' + row.name + '$');
//                        rap
                        // me.clickDetail(111);
                        me.isRightToggle = true
                        me.rightHasNew = row;
                        me.chooseNum = row.msisdn;
//                        setTimeout(() => {
//                            me.chooseNum = '';
//                        }, 500)
                    }
                },
//                右 位置 table
                locationTableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '到达时间', value: 'presentTime', width: 140, align: 'center' },
//                        { name: 'LAC', value: 'lac', align: 'center' },
//                        { name: 'CI', value: 'ci', align: 'center' },
//                        { name: '位置坐标', value: 'coordinate', width: 150, align: 'center' },
                        { name: '停留时长', value: 'stayTimes', width: 130, align: 'center' },
                        { name: '位置描述', value: 'placeCname', align: 'center', tooltip: true },
                        { name: '位置详情', value: '', width: 60, align: 'center', operations: [
                            { label: '查看', type: 'label', click: me.showLocationMessage
                            }]
                        }
                    ],
                    data: [],
                    pagination: false
                },
//                右 基本信息
                baseDataOpt: {
                    listLoading: false,
                    stripe: false,
                    emptyText: '暂无数据',
                    column: [
                        { name: '号码归属地', value: 'homeCode', align: 'center', tooltip: true },
                        { name: '运营商', value: 'spCode', width: 100, align: 'center' },
                        { name: '卡号', value: 'imsi', width: 140, align: 'center' },
                        { name: '机身码', value: 'imei', width: 120, align: 'center' }
                    ],
                    data: [],
                    pagination: false
                },
//                信令
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
//                tab 配置
                tabsOpt: {
                    panes: {
                        height: 0,
                        width: 50
                    },
                    content: {
                    }
                },
//                tab 当前切换页
                currentView: 0,
                panes: [],
                personList: [],
                curPersonPhone: '',
                mapData: {},
//                选择重点人 手机号码 数组
                sendPhones: [],
//                目标选择 按钮
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
//                目标选择 弹框按钮
                formBtnOpt: {
                    inline: true,
                    items: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '确定',
                                disabled: false,
                                click: function () {
                                    me.confirm()
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '取消',
                                disabled: false,
                                click: function () {
                                    me.selectShow = false
//                          保证 如果关掉目标选择 弹框 加载动画不显示
                                    me.tableOpt.listLoading = false;
                                }
                            }
                        }
                    ]
                },
//                弹出表格
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框index/selection
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
//                位置信息
                locationData: [
                    { name: '基站名称', value: ' ' },
                    { name: 'LAC', value: ' ' },
                    { name: 'CI', value: ' ' },
                    { name: '经纬度', value: ' ' },
                    { name: '位置中文名', value: '' }
                ],
//                事件类型
//                eventType: ['通话', '短信', '事件'],
                // 是否默认 显示第一个
                isDefaultOne: true
            }
        },
        props: ['hint', 'part', 'owner'],
        computed: {
            ...mapGetters({
                'isPhoneJM': 'global/isPhoneJM'
            }),
            middleMapDialogHeight () {
                return {
                    height: window.screen.height * 0.63 + 'px'
                }
            },
            comSize () {
                return {
                    height: 250
                }
            },
            comSizeLeft () {
                return {
                    height: this.tableHeight
                }
            },
            comSizeRight () {
                return {
                    height: 380
                }
            },
            comSizeBaseInfo () {
                return {
                    height: 130
                }
            },
            comSizeTab () {
                return {
//                    height: 130
                    height: 200
                }
            }
        },
        created () {
//            判断是否来自 任务 初加载  （以前有功能 来说）
//            this.isFromTask = this.owner.substring(0, 1) === 'T'
            if (localStorage.getItem('taskStatus')) {
                if (+localStorage.getItem('taskStatus') !== 1) {
                    this.choice.items[0].comOpt.disabled = true
                }
            }
        },
        mounted () {
//            this.exportUrl = `${apiUrl}/realTimeSearch/exportLocation${this.exportIndex}`
            this.fetchPopTableData()
        },
        watch: {
            'leftTableHeight' (val) {
                this.noData = false;
                if (this.collapseName !== '') {
                    // this.changeTableLength = true;
                    let tableHeight = 290;
                    let leftFoldHeight = 541;
                    if (val === 7) {
                        tableHeight -= 30;
                        leftFoldHeight -= 30;
                    } else if (val === 6) {
                        tableHeight -= 60;
                        leftFoldHeight -= 60;
                    } else if (val === 5) {
                        tableHeight -= 90;
                        leftFoldHeight -= 90;
                    } else if (val === 4) {
                        tableHeight -= 120;
                        leftFoldHeight -= 120;
                    } else if (val === 3) {
                        tableHeight -= 150;
                        leftFoldHeight -= 150;
                    } else if (val === 2) {
                        tableHeight -= 180;
                        leftFoldHeight -= 180;
                    } else if (val === 1) {
                        tableHeight -= 210;
                        leftFoldHeight -= 210;
                    } else if (val === 0) {
                        tableHeight -= 180;
                        leftFoldHeight -= 180;
                        this.noData = true;
                    } else {
                        tableHeight = 260;
                        leftFoldHeight = 470;
                    }
                    this.tableHeight = tableHeight;
                    this.leftFoldHeight = leftFoldHeight;
                    $('.ga-mainContent__left').height(leftFoldHeight)
                    // $('.ga-mainContent__left').animate({
                    //     'height': leftFoldHeight + 'px'
                    // })
                }
            },
            'leftContent' (val) {
                if (val) {
                    let me = this;
                    setTimeout(function () {
                        me.tabsOpt.panes.height = $('.ga-tab').height()
                    })
                }
            },
            'collapseName' (val) {
                if (val !== '') {
                    this.cutCollapseData(this.currentView, val - 1);
                }
                setTimeout(() => {
                    let tab = $('#ga-collapse');
                    if (val !== '' && !this.changeTableLength) {
                        let leftTableHeight = this.leftTableHeight;
                        let tableHeight = 290;
                        let leftFoldHeight = 541;
                        this.noData = false;
                        if (leftTableHeight === 7) {
                            tableHeight -= 30;
                            leftFoldHeight -= 30;
                        } else if (leftTableHeight === 6) {
                            tableHeight -= 60;
                            leftFoldHeight -= 60;
                        } else if (leftTableHeight === 5) {
                            tableHeight -= 90;
                            leftFoldHeight -= 90;
                        } else if (leftTableHeight === 4) {
                            tableHeight -= 120;
                            leftFoldHeight -= 120;
                        } else if (leftTableHeight === 3) {
                            tableHeight -= 150;
                            leftFoldHeight -= 150;
                        } else if (leftTableHeight === 2) {
                            tableHeight -= 180;
                            leftFoldHeight -= 180;
                        } else if (leftTableHeight === 1) {
                            tableHeight -= 210;
                            leftFoldHeight -= 210;
                        } else if (leftTableHeight === 0) {
                            tableHeight -= 180;
                            leftFoldHeight -= 180;
                        } else {
                            tableHeight = 260;
                            leftFoldHeight = 470;
                        }
                        this.tableHeight = tableHeight;
                        this.leftFoldHeight = leftFoldHeight;
                        $('.ga-mainContent__left').height(leftFoldHeight)
                        // $('.ga-mainContent__left').animate({
                        //     'height': leftFoldHeight + 'px'
                        // })
                    } else {
                        if (tab.height() > 146) {
                            $('.ga-mainContent__left').animate({
                                'height': '267px'
                            });
                            this.leftFoldHeight = 267;
                        }
                    }
                }, 70)
            },
            'currentView' (val) {
                if (this.collapseName !== '') {
                    this.cutCollapseData(val, this.collapseName - 1);
                } else {
                    this.cutCollapseData(val, 0);
                }
            }
        },
        methods: {
            //  导出方法
            getMap () {
                let imgBase = null;
                let exportObj = null;
                let me = this;
                let canvasDom = $('.ga-mainContent__right--map')
                let image = new Image();
                image.crossOrigin = 'anonymous';
                image.setAttribute('crossOrigin', 'anonymous');
                image.src = 'http://api0.map.bdimg.com/images/blank.gif'
//                console.log(image)
                html2canvas(canvasDom[0], {
                    logging: false,
//                    useCORS: true,
//                    allowTaint: true,
//                    allowTaint: true,
                    timeout: 2000,
                    proxy: 'http://localhost:8111',
                    onrendered: function (canvas) {
                        imgBase = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
                        exportObj = {
                            img: imgBase
                        }
                        document.body.appendChild(image)
                        me.exportImg(exportObj)
                        //  测试 基本信息
//                        let test = {
//                            msisdn: 15709286892,
//                            name: '大哥大'
//                        }
//                        me.exportData(test.msisdn + '&' + test.name + '$')
                        //  部署 基本信息
                        me.exportData(me.rightBaseData.msisdn + '&' + me.rightBaseData.name + '$')
                        let url = null;
                        if (me.part === 'nation') {
                            url = `countrywide/outMsisdn/${me.rightBaseData.msisdn}&${me.rightBaseData.name}$`
                        } else {
                            //  部署
                            url = `areaRealTime/outMsisdn/${me.rightBaseData.msisdn}&${me.rightBaseData.name}$`
                            //  测试
//                            url = `areaRealTime/outMsisdn/${test.msisdn}&${test.name}$`
                        }
                        //  测试
//                        window.location.href = `http://192.168.3.174:8082/policeBusiness/${url}`
                        // 部署
                        console.log(`${apiUrl}/${url}`)
//                        window.location.href = `${apiUrl}/${url}`
                    }
                });
            },
            /* 导出接口
            *  exportImg 传后台图片
            *  exportData 传后台基本信息
            * */
            async exportImg (exportObj) {
                let resp;
                if (this.part === 'nation') {
                    resp = await nationExportImg(exportObj);
                } else {
                    resp = await partExportImg(exportObj);
                }
                return resp;
            },
            async exportData (exportObj) {
                let resp;
                if (this.part === 'nation') {
                    resp = await nationExportData(exportObj);
                } else {
                    resp = await partExportData(exportObj);
                }
                return resp;
            },
            //  目标选择弹框 table数据
            async fetchPopTableData () {
                let owner = {
                    owner: this.owner,
                    approverStatus: 3
                };
//                this.tableOpt.listLoading = true;
//                this.tableOpt.emptyText = ' ';
                if (this.part === 'part') {
                    this.personList = await partAreaImpPerList(owner);
                } else if (this.part === 'nation') {
                    this.personList = await nationImpPerList(owner);
                }
//                if (this.personList.rows.length !== 0) {
//                    this.tableOpt.data = this.personList.rows;
//                    if (this.tableOpt.data.length) {
//                        this.tableOpt.listLoading = false;
//                    } else {
//                        setTimeout(() => {
//                            this.tableOpt.listLoading = false;
//                        }, 200)
//                    }
//                } else {
//                    setTimeout(() => {
//                        this.tableOpt.listLoading = false;
//                        this.tableOpt.emptyText = '暂无数据';
//                    }, 1500)
//                }
                let data = [];
                if (this.personList.rows) {
                    this.personList.rows.forEach((item, index) => {
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
//                let sendPhones = [];
//                let msisdn = '';
//                if (this.isFromTask) {
//                    let val = this.tableOpt.data;
//                    for (let i = 0; i < val.length; i++) {
//                        sendPhones.push(val[i].msisdn + '&' + val[i].name + '&' + val[i].imei + '$')
//                    }
//                    msisdn = sendPhones.join(',')
//                    this.sendImportantPerson(msisdn)
//                    this.provinceTabData();
//                }
            },
            //  改为一个接口 获取所有数据
            async getAllData (args) {
                let resp;
                if (this.part === 'nation') {
                    resp = await getNationData(args);
                } else {
                    resp = await getPartData(args);
                }
                return resp;
            },
            //  点击详情
            async clickDetail (val) {
                this.locationTableOpt.data = [];
                if (this.isRightToggle) {
                    this.locationTableOpt.listLoading = true;
                }
                this.locationTableOpt.emptyText = ' ';
                if (val) {
                    let resp;
                    if (this.part === 'nation') {
                        resp = await nationClickDetailQuery(val)
                    } else {
                        resp = await partClickDetailQuery(val)
                    }
                    if (resp && resp.rows && resp.rows.length) {
                        let pointData = [];
                        let detailData = [];
                        let detailCenter = '';
                        for (let i in resp.rows) {
                            if (!resp.rows[i].presentTime) {
                                resp.rows[i].presentTime = '';
                            }
                            if (!resp.rows[i].stationLocation) {
                                resp.rows[i].stationLocation = '';
                            }
                            if (!resp.rows[i].stayTimes) {
                                resp.rows[i].stayTimes = '';
                            }
                            if (!resp.rows[i].placeCname) {
                                resp.rows[i].placeCname = '';
                            }
                            if (!resp.rows[i].longtitude) {
                                resp.rows[i].longtitude = '';
                            }
                            if (!resp.rows[i].latitude) {
                                resp.rows[i].latitude = '';
                            }
                            if (!resp.rows[i].lac) {
                                resp.rows[i].lac = '';
                            }
                            if (!resp.rows[i].ci) {
                                resp.rows[i].ci = '';
                            }
                            let { name,
                                msisdn,
                                longtitude,
                                latitude,
                                presentTime,
                                stayTimes,
                                placeCname,
                                stationLocation,
                                cdr,
                                lac,
                                ci } = resp.rows[i]
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
                        if (this.collapseName !== '') {
                            let arr = this.showMapData[this.collapseName];
                            for (let i in arr) {
                                if (arr[i].msisdn === val) {
                                    detailCenter = arr[i].point;
                                }
                            }
                        }
                        this.locationTableOpt.data = detailData;
                        if (this.locationTableOpt.data.length === 0) {
                            setTimeout(() => {
                                this.locationTableOpt.listLoading = false;
                            }, 200)
                        } else {
                            this.locationTableOpt.listLoading = false;
                            this.rightTableLoading = false;
                        }
                        this.smallMapData = {
                            time: 'realTime',
                            info: pointData,
                            detail: detailData,
                            center: detailCenter
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
                    if (resp && resp.data) {
                        let left = resp.data.indexOf('(')
                        let right = resp.data.indexOf(')')
                        let a = resp.data.substring(left + 1, right)
                        a = this.isPhoneJM ? phoneNumChange(a) : a
                        this.rightBaseNewInfo = resp.data.substring(0, left + 1) + a + resp.data.substring(right)
                    } else {
                        this.rightBaseNewInfo = ' '
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
            //  确认 操作
            confirm () {
                if (this.sendPhones.length === 0) {
                    this.$alert('请选择目标', {
                        confirmButtonText: '确定'
                    });
                    return
                }
                //  else if (this.sendPhones.length > this.maxSelect) {
                //     this.$alert('单次选取重点人不能超过' + this.maxSelect + '个', {
                //         confirmButtonText: '确定'
                //     });
                //     return;
                // }
                this.selectShow = false;
                this.value3 = []
                let msisdn = this.sendPhones.join(',');
                this.msisdn = msisdn;
                this.centerContent = true;
                this.leftContent = true;
                this.rightContent = true;
                this.currentView = 0;
                //  收起来的时候 不转圈 展开的时候 不显示暂无数据
                setTimeout(() => {
                    this.leftTableOptBase.data = [];
                    if (this.collapseName !== '' && this.isLeftToggle) {
                        this.leftTableOptBase.listLoading = true;
                    }
                });
                //  右侧 位置信息表格 初始数据 加载动画
                this.locationTableOpt.data = [];
                this.baseDataOpt.data = [];
                if (this.isRightToggle) {
                    this.locationTableOpt.listLoading = true;
                    this.baseDataListLoading = true;
                }
//                this.rightBaseData.newInfo = ' '
                this.rightBaseNewInfo = ' '
                this.baseDataOpt.emptyText = ' '
                this.locationTableOpt.emptyText = ' ';
                //  发送所选重点人
                this.sendImportantPerson({
                    msisdn: msisdn
                });
                this.collapseName = 1;
            },
            //  发送 所选重点人
            sendImportantPerson (param) {
                let _ = this;
                this.getAllData(param).then(function (resp) {
                    if (resp) {
                        if (resp.data) {
//                            存储所有数据
                            _.allData = resp.data;
//                            初始化 table页签
                            if (_.part === 'part') {
                                _.panes = [
                                    {
                                        name: `省内(${_.allData.inProvince.length})`
                                    },
                                    {
                                        name: `不明(${_.allData.locationUnknown.length})`
                                    },
                                    {
                                        name: `消失(${_.allData.disappear.length})`
                                    }
                                ];
                            } else {
                                _.panes = [
                                    {
                                        name: `省外(${_.allData.outProvince.length})`
                                    },
                                    {
                                        name: `省内(${_.allData.inProvince.length})`
                                    },
                                    {
                                        name: `不明(${_.allData.locationUnknown.length})`
                                    },
                                    {
                                        name: `消失(${_.allData.disappear.length})`
                                    }
                                ];
                            }
//                            默认展示省内数据
                            if (_.part === 'part') {
                                _.provinceTabData();
                            } else {
                                _.outsideProvinceTabData();
                            }
                            if (resp.message) {
                                _.$message({
                                    type: 'info',
                                    message: resp.message
                                })
                            }
                        } else {
//                            _.$message({
//                                type: 'waring',
//                                message: '请求出错 服务器报错'
//                            })
                        }
                    } else {
//                        无返回 或者返回其他状态码 的处理
                        _.leftTableOptBase.listLoading = false;
                        _.locationTableOpt.listLoading = false;
                        _.baseDataListLoading = false;
                        _.baseDataOpt.emptyText = '暂无数据';
                        _.rightTableLoading = false;
                        _.leftTableOptBase.data = [];
                        _.$message({
                            type: 'warning',
                            message: '请求数据失败或返回数据格式错误'
                        })
                    }
                });
            },
            /**
                省内 位置不明 消失 全国 页签
                val为时段 默认为0 第一个时段
                usualData 处理正常数据
                unusualData 处理不正常数据 data 不存在的情况
                dealTableData 处理对应的页签 返回该页签所有数据
            */
            provinceTabData (val = 0) {
                let data = this.dealTableData(this.allData.inProvince);
                if (data) {
                    this.usualData(data, val);
                } else {
                    this.unusualData(val);
                }
            },
            locationUnknownTabData (val = 0) {
                let data = this.dealTableData(this.allData.locationUnknown);
                if (data) {
                    this.usualData(data, val);
                } else {
                    this.unusualData(val);
                }
            },
            disappearTabData (val) {
                let data = this.dealTableData(this.allData.disappear);
                if (data) {
                    this.usualData(data, val);
                } else {
                    this.unusualData(val);
                }
            },
            outsideProvinceTabData (val = 0) {
                let data = this.dealTableData(this.allData.outProvince);
                if (data) {
                    this.usualData(data, val);
                } else {
                    this.unusualData(val);
                }
            },
            //  处理对应页签数据的方法 处理数据为 map数据 table数据
            dealTableData (data) {
            //  创建 数组 其长度为时段个数
                let tableData = [];
                for (let i = 0; i < this.timeFlagLength; i++) {
                    tableData.push([])
                }
                for (let i in data) {
//                 对存在的 坏数据的处理 msisdn homeCode imei 统统置空
                    if (!data[i].msisdn) {
                        data[i].msisdn = '';
                    }
                    if (!data[i].homeCode) {
                        data[i].homeCode = '';
                    }
                    if (!data[i].msisdn) {
                        data[i].imei = '';
                    }
                    if (!data[i].spCode) {
                        data[i].spCode = '';
                    }
                    if (!data[i].imsi) {
                        data[i].ismi = '';
                    }
                    if (!data[i].newInfo) {
                        data[i].newInfo = ''
                    }
//                    将数据 存放在对应时段数组里
                    if (data[i].timeFlag === 1) {
                        tableData[0].push(data[i]);
                    } else if (data[i].timeFlag === 2) {
                        tableData[1].push(data[i]);
                    } else if (data[i].timeFlag === 3) {
                        tableData[2].push(data[i]);
                    } else if (data[i].timeFlag === 4) {
                        tableData[3].push(data[i]);
                    } else if (data[i].timeFlag === 5) {
                        tableData[4].push(data[i]);
                    } else {
//                        时段类型不在约定范围内 timeFalg为0或者其他 不做处理
                        this.$message({
                            type: 'warning',
                            message: '含有异常数据 数据不在规定时段内 '
                        })
                    }
                }
            //  对应页签 总人数 的计算
                let numberOfPeople = 0;
                for (let i in tableData) {
                    numberOfPeople += tableData[i].length;
                }
                this.numberOfPeople = numberOfPeople;
            //  处理页签中 每个时段的 数据 分为 table数据 map数据
                let tableData1 = [{}, {}, {}, {}, {}];
                let mapData = [[], [], [], [], []];
                for (let i in tableData1) {
                    tableData1[i] = {
                        baseData: [], detailData: []
                    }
                }
                for (let i in tableData) {
                    for (let j in tableData[i]) {
                        let { name, msisdn, imei, imsi, spCode, newInfo, homeCode, presentTime,
                            placeCname, longtitude, latitude, eventTypeTime } = tableData[i][j];
                        tableData1[i].baseData.push({ name, msisdn, imei, homeCode });
                        //  全国 区内 两种情况
                        if (this.part === 'nation') {
                            if (this.currentView !== 2) {
                                tableData1[i].detailData.push({ name, msisdn, imei, imsi, spCode, newInfo, homeCode,
                                    presentTime, placeCname })
                            } else {
//                                let event = tableData[i][j].eventType - 0;
                                let event = tableData[i][j].eventType;
                                let { eventType } = {
                                    eventType: event
                                };
                                tableData1[i].detailData.push({ name, msisdn, imei, imsi, spCode, newInfo, homeCode,
                                    presentTime, placeCname, eventType, eventTypeTime })
                            }
                        } else {
                            if (this.currentView !== 1) {
                                tableData1[i].detailData.push({ name, msisdn, imei, imsi, spCode, newInfo, homeCode,
                                    presentTime, placeCname })
                            } else {
//                                let event = tableData[i][j].eventType - 0;
                                let event = tableData[i][j].eventType;
                                let { eventType } = {
                                    eventType: event
                                };
                                tableData1[i].detailData.push({ name, msisdn, imei, imsi, spCode, newInfo, homeCode,
                                    presentTime, placeCname, eventType, eventTypeTime })
                            }
                        }
                        //   map 数据
                        let point = { longtitude, latitude };
                        mapData[i].push({ name, msisdn, point, imei, imsi, spCode, newInfo, homeCode, presentTime })
                    }
                }
                return { mapData, tableData1 }
            },
            //  正常数据处理  val为时段
            usualData (data, val) {
//                分为取到 map table数据 给leftTableData 赋值
                this.showMapData = data.mapData;
                this.leftTableData = data.tableData1;
//                每个时段 的人数 计算
                this.divideData = [];
                for (let i = 0; i < 5; i++) {
                    this.divideData[i] = this.leftTableData[i].detailData.length
                }
//                显示table
                this.showTableData(val);
                setTimeout(() => {
                    if (this.$refs.leftTable.length) {
                        this.$refs.leftTable[0].setRow(this.leftTableOptBase.data[0])
                    }
                }, 60)
//                显示map
                this.showMap(val);
            },
            //  不正常数据处理 val为时段
            unusualData (val) {
//                map数据 table数据 都置空
                this.showMapData = [];
                this.leftTableData = [];
//                显示table map
                this.showTableData(val);
                this.showMap(val);
//                给出不正常数据提示信息
                this.$message({
                    type: 'warning',
                    message: '数据异常'
                })
            },
            //  显示table
            showTableData (val) {
                if (this.leftContent) {
                    //  正常情况 leftTableData 不为空 且对应时段 有表格数据
                    if (this.leftTableData.length && this.leftTableData[val].detailData.length) {
                        setTimeout(() => {
                            this.leftTableOptBase.data = this.leftTableData[val].detailData;
                            //  获取 每个时段 表格 数据的长度 动态高度
                            let leftTableLength = this.leftTableOptBase.data.length;
                            //  左侧 表格 数据不为空
                            if (leftTableLength) {
                                this.leftTableOptBase.listLoading = false;
                                this.leftTableHeight = leftTableLength;
                                //  长度不变 不重新计算高度
                                if (leftTableLength === this.leftTableHeight) {
                                    this.changeTableLength = false;
                                }
                            }
                        }, 50)
                        //  右边数据的处理 给右侧 基本信息 新事件信息
                        if (this.isDefaultOne) {
                            let { homeCode, spCode, imsi, imei } = this.leftTableData[val].detailData[0]
                            this.baseDataOpt.data = [{ homeCode, spCode, imsi, imei }]
                            if (this.baseDataOpt.data.length) {
                                this.baseDataListLoading = false;
                                this.baseDataOpt.emptyText = '暂无数据'
                            }
                            let detailData = this.leftTableData[val].detailData[0]
                            this.rightBaseMsisdn = this.isPhoneJM
                                ? phoneNumChange(this.leftTableData[val].detailData[0].msisdn)
                                : this.leftTableData[val].detailData[0].msisdn
                            let left = detailData.newInfo.indexOf('(')
                            let right = detailData.newInfo.indexOf(')')
                            let a = detailData.newInfo.substring(left + 1, right)
                            a = this.isPhoneJM ? phoneNumChange(a) : a
                            this.rightBaseNewInfo = detailData.newInfo.substring(0, left + 1) +
                                a + detailData.newInfo.substring(right)
                            this.rightBaseData = this.leftTableData[val].detailData[0];
                            this.rightHasNew = this.leftTableData[val].detailData[0];
                            this.chooseNum = this.rightBaseData.msisdn
                        } else {
                            this.isDefaultOne = true;
                        }
                        this.clickDetail(this.leftTableData[val].detailData[0].msisdn + '&' +
                            this.leftTableData[val].detailData[0].name + '$');
                        // rap用
//                        this.clickDetail(111);
                    } else {
                        this.leftTableOptBase.listLoading = false;
                        this.leftTableOptBase.data = [];
//                        this.$message({
//                            type: 'warning',
//                            message: '数据异常'
//                        })
//     -----------------右边数据都置空-------------------------------------------
                        this.rightBaseData = {
                            homeCode: '',
                            name: '',
                            msisdn: '',
                            imei: '',
                            newInfo: ''
                        };
                        this.rightBaseMsisdn = ''
                        this.rightHasNew = {
                            eventTypeTime: '',
                            eventType: ''
                        };
                        this.clickDetail(false);
//                        this.locationTableOpt.data = [];
//                        this.smallMapData = {
//                            time: 'realTime',
//                            info: '',
//                            detail: '',
//                            center: ''
//                        };
//                        this.locationTableOpt.listLoading = false;
//                        this.rightTableLoading = false;
                        this.baseDataListLoading = false;
                        this.baseDataOpt.data = []
                        this.baseDataOpt.emptyText = '暂无数据'
                        //  处理没有数据 左框动态高度
                        this.leftTableHeight = 0;
                        this.changeTableLength = false;
                    }
                }
            },
            //  显示 map 给gis 传数据
            showMap (val) {
                if (this.showMapData[val]) {
                    let data = this.showMapData[val]
                    this.mapData = {
                        time: 'realTime',
                        info: data
                    }
                }
            },
            //  鼠标滚轮 滚动 tooltip不显示
            tableMouseWheel () {
                $('.el-tooltip__popper.is-dark').css({
                    'display': 'none'
                })
            },
            //  大地图 传数据 过来 中心点，map数据，显示的数据
            //  点击大地图 点 传过来的数据
            bigToSmall (center, data, showData, baseData) {
                this.smallMapData = {
                    time: 'realTime',
                    info: data,
                    detail: showData,
                    center: center
                };
                let detailData = [];
                for (let i in showData) {
                //  如若不存在 都置空处理
                    if (!showData[i].presentTime) {
                        showData[i].presentTime = '';
                    }
                    if (!showData[i].stayTimes) {
                        showData[i].stayTimes = '';
                    }
                    if (!showData[i].placeCname) {
                        showData[i].placeCname = '';
                    }
                    if (!showData[i].longtitude) {
                        showData[i].longtitude = '';
                    }
                    if (!showData[i].latitude) {
                        showData[i].latitude = '';
                    }
                    let { longtitude, latitude, presentTime, stayTimes, placeCname } = showData[i];
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
                    detailData.push({ presentTime, stayTimes, placeCname, coordinate, longtitude, latitude })
                }
                this.locationTableOpt.data = detailData;
                this.rightBaseMsisdn = this.isPhoneJM ? phoneNumChange(baseData.msisdn) : baseData.msisdn
                this.rightBaseData = baseData;
                let { homeCode, spCode, imsi, imei } = baseData
                this.baseDataOpt.data = [{ homeCode, spCode, imsi, imei }]
                this.smallMapShow = !this.smallMapShow;
                this.chooseNum = baseData.msisdn
                let leftTableData = this.leftTableOptBase.data
                for (let i in leftTableData) {
                    if (leftTableData[i].msisdn === baseData.msisdn) {
                        if (this.$refs.leftTable.length) {
                            this.$refs.leftTable[0].setRow(this.leftTableOptBase.data[i])
                        }
                    }
                }
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
            //  左侧折叠按钮
            leftToggleShow () {
                let tab = $('.ga-mainContent__left');
                this.isLeftToggle = !this.isLeftToggle;
                if (tab.height() > 50) {
                    tab.animate({
                        'height': '69px'
                    })
                } else {
                    $('.ga-mainContent__left').animate({
                        'height': this.leftFoldHeight + 'px'
                    })
                }
            },
            //  右侧 折叠 按钮
            rightToggleShow () {
                let tab = $('.ga-mainContent__right');
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
                    if (this.rightTableLoading) {
                        this.locationTableOpt.listLoading = true
                        this.baseDataListLoading = true;
                        this.baseDataOpt.emptyText = '暂无数据';
                    }
                }
            },
            //  collapse切换
            cutCollapseData (val, it = 0) {
                let selectVal = it;
                this.cutTabDeal(val, selectVal);
            },
            //  tab 切换 显示 处理
            cutTabDeal (val, it = 0) {
                if (this.part === 'part') {
                    if (val === 0) {
                        this.provinceTabData(it)
                    } else if (val === 1) {
                        this.locationUnknownTabData(it)
                    } else {
                        this.disappearTabData(it)
                    }
                } else {
                    if (val === 0) {
                        this.outsideProvinceTabData(it)
                    } else if (val === 1) {
                        this.provinceTabData(it)
                    } else if (val === 2) {
                        this.locationUnknownTabData(it)
                    } else {
                        this.disappearTabData(it)
                    }
                }
            },
            //  tab切换 tab组件传来的 当前tab页
            tabCurrentSelected (val) {
                this.currentView = val;
            },
            //  刷新
            refreshAll () {
//                this.centerContent = false;
//                setTimeout(() => {
//                    this.centerContent = true;
//                })
//                this.labelShow.showName = null;
//                this.labelShow.showNum = null;
                let _ = this;
                this.chooseNum = null;
                if (this.collapseName !== '') {
                    this.leftTableOptBase.data = [];
                    if (this.isLeftToggle) {
                        setTimeout(() => {
                            this.leftTableOptBase.listLoading = true;
                        })
                    }
                    this.locationTableOpt.data = [];
                    this.baseDataOpt.data = [];
                    if (this.isRightToggle) {
                        this.locationTableOpt.listLoading = true;
                        this.baseDataListLoading = true;
                    }
                    this.baseDataOpt.emptyText = ' '
                }
                this.getAllData({
                    msisdn: this.msisdn
                }).then(function (resp) {
                    if (resp.status === 200) {
                        let selectVal = 0;
                        if (_.collapseName !== '') {
                            selectVal = _.collapseName - 1;
                        } else {
                            selectVal = 0;
                        }
                        _.allData = resp.data;
                        if (_.part === 'part') {
                            _.panes = [
                                {
                                    name: `省内(${_.allData.inProvince.length})`
                                },
                                {
                                    name: `不明(${_.allData.locationUnknown.length})`
                                },
                                {
                                    name: `消失(${_.allData.disappear.length})`
                                }
                            ];
                        } else {
                            _.panes = [
                                {
                                    name: `省外(${_.allData.outProvince.length})`
                                },
                                {
                                    name: `省内(${_.allData.inProvince.length})`
                                },
                                {
                                    name: `不明(${_.allData.locationUnknown.length})`
                                },
                                {
                                    name: `消失(${_.allData.disappear.length})`
                                }
                            ];
                        }
                        _.cutTabDeal(_.currentView, selectVal);
                    }
                });
            },
            //  弹框显示
            showPopTable () {
                this.selectShow = true;
//                if (this.isFromTask) {
//                    let me = this;
//                    setTimeout(() => {
//                        me.tableOpt.data.forEach(row => {
//                            me.$refs.multipleTable.toggleSelection(row);
//                        });
//                    })
//                }
//                this.isFromTask = false;
            },
            // 根据手机号筛选信息封装函数
            searchPhoneInfo (phoneNum, info) {
                let searchInfo = [];
                for (let i = 0; i < info.length; i++) {
                    if (phoneNum === info[i].msisdn) {
                        searchInfo.push(info[i])
                    }
                }
                return searchInfo
            },
            //  目标选择 弹框 选人
            handleSelectionChange (val) {
                this.sendPhones = []
                // if (val.length > this.maxSelect) {
                //     this.$message({
                //         type: 'warning',
                //         message: '最多选择' + this.maxSelect + '个重点人'
                //     });
                //     val.splice(this.maxSelect)
                // }
                for (let i = 0; i < val.length; i++) {
                    this.sendPhones.push(val[i].msisdn + '&' + val[i].name + '&' + val[i].imei + '$')
                }
            },
            dialogChange (val) {
                this.selectShow = val;
                this.middleMapShow = val;
                this.locationMessageShow = val;
//                保证 如果关掉目标选择 弹框 加载动画不显示
                if (!val) {
                    this.tableOpt.listLoading = false;
                }
            },
            //  穿梭框的方法
            handleChange (data) {
                this.sendPhones = [];
                // if (data.length > this.maxSelect) {
                //     this.$alert('单次选取重点人不能超过' + this.maxSelect + '个', {
                //         confirmButtonText: '确定'
                //     });
                //     data.length = this.maxSelect;
                // }
                let orgData = this.personList.rows;
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
            },
            //  弹窗 显示位置信息
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
            quickQuery () {
                let targetNum = /^86(1[3,4,5,7,8]\d{9})$/
                let targetNum1 = /^(1[3,4,5,7,8]\d{9})$/
                let targetTel = $.trim(this.$refs.quickQuery.getValue().targetTel);
                if (!targetNum.test(targetTel)) {
                    if (!targetNum1.test(targetTel)) {
                        this.$message({
                            type: 'warning',
                            message: '请输入正确格式的完整手机号码'
                        })
                    } else {
                        this.findTargetNum(targetTel - 0);
                    }
                } else {
                    this.findTargetNum(targetTel.slice(2) - 0);
                }
            },
            findTargetNum (num) {
                let allData = this.allData;
                let allDataParam;
                let isFind = false;
                let isRepet = 0;
                let num1 = '86' + num - 0
                if (this.part === 'part') {
                    allDataParam = ['inProvince', 'locationUnknown', 'disappear']
                } else {
                    allDataParam = ['outProvince', 'inProvince', 'locationUnknown', 'disappear']
                }
                for (let i in allDataParam) {
                    let data = allData[allDataParam[i]]
                    for (let j in data) {
                        if (data[j].msisdn - 0 === num) {
                            isRepet++;
                            if (this.currentView !== i - 0) {
                                this.currentView = i - 0;
                            }
                            this.judgeNum(data, j, num)
                            isFind = true;
                        }
                        if (data[j].msisdn - 0 === num1) {
                            isRepet++;
                            if (this.currentView !== i - 0) {
                                this.currentView = i - 0;
                            }
                            this.judgeNum(data, j, num1)
                            isFind = true;
                        }
                    }
                }
                if (!isFind) {
                    this.$message({
                        type: 'info',
                        message: '暂无此手机号位置数据'
                    })
                }
                if (isRepet > 1) {
                    this.$message({
                        type: 'warning',
                        message: `有重复数据，该手机号有${isRepet}处数据`
                    })
                }
            },
            judgeNum (data, Index, num) {
                this.collapseName = data[Index].timeFlag
                this.isDefaultOne = false;
                // this.clickDetail(data[Index].msisdn + '&' + data[Index].name + '$')
                //  rpa 用
                this.clickDetail(111)
                this.rightBaseData = {
                    homeCode: data[Index].homeCode,
                    name: data[Index].name,
                    msisdn: data[Index].msisdn,
                    imei: data[Index].imei,
                    newInfo: data[Index].newInfo
                };
                this.rightBaseMsisdn = this.isPhoneJM ? phoneNumChange(data[Index].msisdn) : data[Index].msisdn
                this.baseDataOpt.data = [{
                    homeCode: data[Index].homeCode,
                    spCode: data[Index].spCode,
                    imsi: data[Index].imsi,
                    imei: data[Index].imei }]
                this.rightHasNew = {
                    eventTypeTime: data[Index].eventTypeTime,
                    eventType: data[Index].eventType
                }
                this.chooseNum = data[Index].msisdn;
                let data1 = this.dealTableData(data).tableData1;
                let index = null;
                for (let i in data1) {
                    let data2 = data1[i].baseData
                    for (let j in data2) {
                        if (data2[j].msisdn - 0 === num) {
                            index = j;
                        }
                    }
                }
                let time = index - 0 === 0 ? null : 300
                setTimeout(() => {
                    if (this.$refs.leftTable.length) {
                        this.$refs.leftTable[0].setRow(this.leftTableOptBase.data[index])
                    }
                }, time)
            }
        },
        components: {
            transfer,
            screenShotMap,
            middleMap,
            smallMap,
            selectComp,
            btnComp,
            checkBox,
            tab,
            formSelect,
            popTable,
            gis,
            buttonComp,
            sysDialog

        }
    }
</script>

<style scoped lang="postcss">
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
    .arrowDown {
        width: 10px;
        height: 10px;
        margin-top: 12px;
        text-align: center;
        opacity: 0.75;
        transform: rotate(45deg);
        border-left:2px solid #fff;
        border-top:2px solid #fff;
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
    @component-namespace ga {
        @b arrowWrap {
            width: 28px;
            height: 28px;
            cursor: pointer;
            text-align: center;
        }
        @b arrow {
            display: inline-block;
            width: 10px;
            height: 10px;
            opacity: 0.75;
            border-left:2px solid #fff;
            border-top:2px solid #fff;
            @e up {
                transform-origin: 1px 5px;
                transform: rotate(45deg);
            }
            @e down {
                transform-origin: 4px 4px;
                transform: rotate(-135deg);
            }
        }
        @b sty {
            @e color {
                color:#fff;
            }
            @e opacity {
                opacity: 0.75;
            }
        }
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

        /*上方选择框*/
        @b menu {
            width: 100px;
            position: relative;
            z-index: 11;
            top: -38px;
            left: 1px;
            /*padding-top: 5px;*/
            /*目标选择*/
            @e targetSelect {
                width: 81px;
                height: 38px;
                background-color: rgb(39, 141, 227);
                border: none;
                color: #fff;
                border-radius: 4px;
            }
            @e targetSelect:hover {
                cursor: pointer;
            }
        }

        /*弹出框*/
        @b tarSelTb {
            background: url("~assets/images/allInterAnalyze/popTableBg.png") no-repeat 30px top;
            width: 60%;
            height: 485px;
            position: absolute;
            left: 20%;
            top:10%;
            z-index: 10;

            /*表单组件样式*/
            @e formSelect {
                display: inline-block;
                position: relative;
                bottom: -7px;
                left: 61px;
            }
            /*弹出框标题*/
            @e title {
                font-size: 14px;
                font-weight: 700;
                text-align: center;
                position: relative;
                left: -15px;
                color: #ffffff;
            }
            @e popTable {
                width: 80%;
                margin-left: 10%;
                margin-top: 2%;
            }
            /*弹出框下方按钮*/
            @e bottomBtn {
                position: absolute;
                width: 140px;
                bottom: 15px;
                left: 42%;
            }
        }

        /*下方内容样式*/
        @b mainContent {
            /*内容左上方下拉框*/
            @e content {
                top: 50px;
                left: 120px;
                position: absolute;
                /* width: 300px; */
                height: 26px;
                /* background: rgba(0,0,0,0.7); */
                margin-top: 11px;
                font-size: 16px;
                color: #fff;
                @m btn {
                    height: 100%;
                    padding: 2px 5px 2px 10px;
                    background: #116191;
                }
                @m btnL {
                    margin-left: 5px;
                    border: 1px solid #028AD5;
                    border-right: none;
                    border-radius: 3px 0 0 3px;
                }
                @m btnR {
                    border: 1px solid #028AD5;
                    /* border-left: none; */
                    border-radius: 0 3px 3px 0;
                }
                /* &:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -20px;
                    width: 0;
                    height: 0;
                    border-top: 15px solid transparent;
                    border-bottom: 15px solid transparent;
                    border-right: 20px solid rgba(0,0,0,0.7);
                }
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: -20px;
                    width: 0;
                    height: 0;
                    border-top: 15px solid transparent;
                    border-bottom: 15px solid transparent;
                    border-left: 20px solid rgba(0,0,0,0.7);
                } */
            }
            @e title {
                /* height: 36px; */
                background: rgba(13,74,128,0.85);
                box-shadow: 0 2px 4px 0 rgba(0,0,0,0.40), inset -1px 0 0 0 rgba(255,255,255,0.30),
                            inset 1px 0 0 0 rgba(255,255,255,0.30), inset 0 1px 0 0 rgba(255,255,255,0.30),
                            inset 0 -1px 0 0 rgba(255,255,255,0.15);
            }
            @e partLeft {
                background-color: rgba(0,0,0,0.7);
                box-shadow: 3px 1px 3px rgba(0,0,0,0.3);
                display: inline-block;
                position: absolute;
                top: 100px;
                left: 30px;
                width: 264px;
                padding:0 0 25px 0 ;
                height: 470px;
                font-size: 14px;
                overflow: hidden;
                z-index: 555;
                border-bottom-right-radius: 18px;
                /*background:linear-gradient(-45deg, transparent 12px, rgba(0,0,0,0.7) 0);*/
                background: rgba(0,0,0,0.80);
                box-shadow: 0 2px 4px 0 rgba(0,0,0,0.53), inset -1px 0 0 0 rgba(255,255,255,0.50),
                            inset 0 -1px 0 0 rgba(255,255,255,0.50), inset 1px 0 0 0 rgba(255,255,255,0.50);
                border-radius: 6px;
                & span {
                    color: #fff;
                }
            }
            @e nationLeft {
                background-color: rgba(0,0,0,0.7);
                box-shadow: 3px 1px 3px rgba(0,0,0,0.3);
                display: inline-block;
                position: absolute;
                top: 100px;
                left: 30px;
                width: 315px;
                padding:0 0 25px 0 ;
                height: 470px;
                font-size: 14px;
                overflow: hidden;
                z-index: 555;
                border-bottom-right-radius: 18px;
                /*background:linear-gradient(-45deg, transparent 12px, rgba(0,0,0,0.7) 0);*/
                & span {
                    color: #fff;
                }
            }
            @e right {
                box-shadow: 3px 1px 3px rgba(0,0,0,0.3);
                display: inline-block;
                position: absolute;
                padding:0 0 25px 0 ;
                font-size: 14px;
                overflow: hidden;
                z-index: 555;
                right: 20px;
                top: 100px;
                width: 450px;
                height: 490px;
                /* border-bottom-left-radius: 18px; */
                background: rgba(0,0,0,0.80);
                box-shadow: 0 2px 4px 0 rgba(0,0,0,0.53), inset -1px 0 0 0 rgba(255,255,255,0.50),
                            inset 0 -1px 0 0 rgba(255,255,255,0.50), inset 1px 0 0 0 rgba(255,255,255,0.50);
                border-radius: 6px;
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
                    height: 140px;
                    /* background-color: rgba(0,0,0,0.7); */
                    overflow: auto;
                }
                @m location {
                    height: 153px;
                    /* background-color: rgba(0,0,0,0.7); */
                }
                @m incident{
                    height: 60px;
                    color: #fff;
                    /* background-color: rgba(0,0,0,0.7); */
                    & div {
                        color: #fff;
                    }
                }
                @m map {
                    height: 170px;
                    width: 100%;
                    /* background-color: rgba(0,0,0,0.7); */
                    /*background:linear-gradient(45deg, transparent 12px, rgba(0,0,0,0.7) 0);*/
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                }
                @m map1 {
                    height: 115px;
                    width: 100%;
                    /* background-color: rgba(0,0,0,0.7); */
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                }
            }
            @e detailInfo {
                display: inline-block;
                float: right;
                width: 590px;
                height: 0;
                color: #ffffff;
                font-size: 14px;
                background-color: #243966;
                padding-left: 10px;
                overflow: hidden;
                opacity: .9;
                @m avatar {
                    background: url("~assets/images/allInterAnalyze/avatar.png") no-repeat left center;
                    background-size: 40px 40px;
                    height: 50px;
                    padding: 7px 0 0 50px;
                }
                @m bottomIcon {
                    background: url("~assets/images/allInterAnalyze/pullUp.png") no-repeat center center;
                    height: 25px;
                    width: 25px;
                    float: right;
                    margin-top: -22px;
                    margin-right: 3px;
                    cursor: pointer;
                }
            }
        }

        @b locationMessage {
            padding: 5px 10px;
            text-align: left;
            min-height: 160px;
            @e devide {
                clear: both;
                height: 2px;
                background-color: rgba(255, 255, 255, 0.7);
            }
            @e title {
                margin: 2px 0px;
            }
            @e content {
                display:flex;
                & span:first-child {
                    display: inline-block;
                    width: 30%;
                    line-height: 30px;
                    min-height: 30px;
                }
                & span:last-child {
                    display: inline-block;
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
