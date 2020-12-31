<template>
    <div id='ga-all'>
        <div class="ga-all__title">
            <p>手机号: {{rightAllTitle.msisdnTitle}}</p>
            <p>运营商：{{rightAllTitle.operatorTitle}}</p>
            <el-tooltip :content="rightAllTitle.locationTitle" placement="top"
            v-if="rightAllTitle.locationTitle !== ''">
                <p>归属地: {{rightAllTitle.locationTitle}}</p>
            </el-tooltip>
            <p v-else>归属地: </p>
            <p>研判结果: {{rightAllTitle.typeTitle}}</p>
        </div>
        <ul class='ga-all__judgment'>
            <li v-for="(item, index) in termData"
                class="ga-all__judgment--lis"
                v-if="termData[index].rulename !== ''">
                <el-tooltip :content="item.rulename" placement="top">
                    <p>{{ item.rulename }}</p>
                </el-tooltip>
                <p>{{ item.count }}</p>
            </li>
            <li v-else class="ga-all__judgment--lis">
                <p></p>
                <p></p>
            </li>
        </ul>
        <div class='ga-all__tabs'>
            <el-tabs v-model="tabsValue" @tab-click="handleClick" type='card'>
                <el-tab-pane
                    v-for="(item, index) in tabs"
                    :label="item.name"
                    :name="item.name"
                    :key="item.flag"
                >
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="ga-all__content">
            <div class="ga-all__content--map"
                 v-if="showType === 'map'"
                 id="actionMap"
                 :style="mapStyle">
            </div>
            <tableComp v-else
                :option="contentTable"
                :comSize="contentHeight"
                @handleCurrentPageChange="contentCurrent"
                @handleSizePageChange = "contentSize"
                ref="contentTables">
            </tableComp>
        </div>
        <!-- 个人详情表格相关弹窗 -->
        <sysDialog  size='small'
            :title='contentTableTittle'
            @change="contentChangeResult"
            :dialogVisible="contentTableDialog"
            :showCancel='false'
            :showConfirm='false'>
            <ul class="dialogUl">
                <li v-for="(item, index) in contentTypeDialogs.tittleTop">
                    <p>{{item.key}}</p>
                    <el-tooltip :content="item.value" placement="top">
                        <p>{{ item.value }}</p>
                    </el-tooltip>
                </li>
            </ul>
            <ul :class="contentTypeDialogs.type === 'table' ? 'dialogUlTable' : 'dialogUlMap'">
                <li v-for="(item, index) in contentTypeDialogs.tittleMiddle1">
                    <p>{{item.key}}</p>
                    <p>{{item.value}}</p>
                </li>
            </ul>
            <ul class="dialogUlTable" v-if="contentTypeDialogs.tittleMiddle2">
                <li v-for="(item, index) in contentTypeDialogs.tittleMiddle2">
                    <p>{{item.key}}</p>
                    <p>{{item.value}}</p>
                </li>
            </ul>
            <p  class="dialogContent"
                v-if="contentTypeDialogs.type === 'table'"
                v-html="contentTypeDialogs.titleContent">
                {{contentTypeDialogs.titleContent}}
            </p>
            <tableComp v-else 
                       :option="diaglogTable"
                       :comSize="diaglogTableHeight"
                       id="contentDiaglogTable">
            </tableComp>
        </sysDialog>
        <div class="ga-all__loading" v-show="allLoading"></div>
    </div>
</template>
<script>
    import tableComp from 'components/Table'
    import { mapGetters } from 'vuex'
    import BMap from 'BMap'
    import sysDialog from 'components/common/dialog'
    import { getList, getInfo, dialogDetail } from 'api/relationAnalysis/figurePortrait/stability'
    const RED = './static/vendor/gis/baidumapv2/images/point-collection/red-map-szsj.png'
    export default {
        data () {
            return {
                minType: 0,
                minMsisdn: '',
                allLoading: false,
                // 弹窗相关
                contentTableDialog: false,
                contentTableTittle: '',
                // 最顶部数据信息显示
                rightAllTitle: {
                    msisdnTitle: '',
                    operatorTitle: '',
                    locationTitle: '',
                    typeTitle: ''
                },
                // 判断依据
                termData: [],
                // tab标签页相关
                tabsValue: '',
                // 定义数组，存放对应的flag和内容类型
                tabs: [],
                // 判断显示表格还是地图的标志
                showType: '',
                // 保存当前flag
                showFlag: '',
                // 地图点的等级
                iconLe: [
                    { lev1: 26, lev2: 31 },
                    { lev1: 32, lev2: 36 },
                    { lev1: 37, lev2: 41 },
                    { lev1: 44, lev2: 48 },
                    { lev1: 51, lev2: 55 }
                ],
                icon: RED,
                // 保存地图数据
                mapArr: [],
                columnAll: [],
                /**
                 * SZ个人详情表格表头
                 * column1 -- 藏文短信，column2 -- 关键词短信
                 * column3 -- 境外通联，column3 -- 外省藏区通联，
                 * column6 -- 登陆基站排行，
                 */
                columnSZArr: [
                    {
                        flag: 2,
                        columns: [
                            { name: '序号', value: 'index', width: 40, align: 'center' },
                            { name: '短信内容', value: 'oriContent', align: 'center', width: 480, highlightKey: true, keys: [], tooltip: true },
                            { name: '时间', value: 'timestamp', align: 'center', width: 130 },
                            { name: '类型', value: 'cdrType', align: 'center', width: 80 },
                            { name: '对端号码', value: 'relateNum', align: 'center', width: 230 },
                            { name: '对端号码归属地', value: 'relateNumHomecode', align: 'center', width: 290 }
                        ]
                    },
                    {
                        flag: 3,
                        columns: [
                            { name: '序号', value: 'index', width: 60, align: 'center' },
                            { name: '中标关键字', value: 'keywords', align: 'center', width: 180 },
                            { name: '短信内容', value: 'oriContent', align: 'center', width: 480, highlightKey: true, keys: [], tooltip: true },
                            { name: '时间', value: 'timestamp', align: 'center', width: 130 },
                            { name: '类型', value: 'cdrType', align: 'center', width: 60 },
                            { name: '对端号码', value: 'relateNum', align: 'center', width: 200 },
                            { name: '对端号码归属地', value: 'relateNumHomecode', align: 'center', width: 140 }
                        ]
                    },
                    {
                        flag: 4,
                        columns: [
                            { name: '序号', value: 'index', width: 60, align: 'center' },
                            { name: '对端号码', value: 'relateNum', align: 'center', width: 200 },
                            { name: '对端号码归属地', value: 'relateNumHomecode', align: 'center', width: 230 },
                            { name: '类型', value: 'cdrType', align: 'center', width: 120 },
                            { name: '发生时间', value: 'timestamp', align: 'center', width: 230 },
                            { name: '通话时长(秒) / 短信内容', value: 'callTime', align: 'center', width: 400, highlightKey: true, keys: [], tooltip: true }
                        ]
                    },
                    {
                        flag: 5,
                        columns: [
                            { name: '序号', value: 'index', width: 60, align: 'center' },
                            { name: '对端号码', value: 'relateNum', align: 'center', width: 200 },
                            { name: '对端号码归属地', value: 'relateNumHomecode', align: 'center', width: 230 },
                            { name: '类型', value: 'cdrType', align: 'center', width: 120 },
                            { name: '发生时间', value: 'timestamp', align: 'center', width: 230 },
                            { name: '通话时长(秒) / 短信内容', value: 'callTime', align: 'center', width: 400, highlightKey: true, keys: [], tooltip: true }
                        ]
                    },
                    {
                        flag: 6
                    },
                    {
                        flag: 7,
                        columns: [
                            { name: '序号', value: 'index', width: 60, align: 'center' },
                            { name: '停留总时长', value: 'allTime', align: 'center', width: 300 },
                            { name: 'LAC', value: 'lac', align: 'center', width: 200 },
                            { name: 'CI', value: 'ci', align: 'center', width: 200 },
                            { name: '位置描述', value: 'uliPositionName', align: 'center', width: 470 }
                        ]
                    }
                ],
                /**
                 * SJ个人详情表格表头
                 * column1 -- 维文短信，column2 -- 境外通联
                 * column3 -- 涉疆通联，column4 -- 穆斯林区
                 * column5 -- 特定区域，column6 -- 登陆基站排行，
                 */
                columnSJArr: [
                    {
                        flag: 2,
                        columns: [
                            { name: '序号', value: 'index', width: 40, align: 'center' },
                            { name: '短信内容', value: 'oriContent', align: 'center', width: 460, highlightKey: true, keys: [], tooltip: true },
                            { name: '时间', value: 'timestamp', align: 'center', width: 130 },
                            { name: '类型', value: 'cdrType', align: 'center', width: 80 },
                            { name: '对端号码', value: 'relateNum', align: 'center', width: 230 },
                            { name: '对端号码归属地', value: 'relateNumHomecode', align: 'center', width: 290 }
                        ]
                    },
                    {
                        flag: 3,
                        columns: [
                            { name: '序号', value: 'index', width: 60, align: 'center' },
                            { name: '对端号码', value: 'relateNum', align: 'center', width: 200 },
                            { name: '对端号码归属地', value: 'relateNumHomecode', align: 'center', width: 230 },
                            { name: '类型', value: 'cdrType', align: 'center', width: 80 },
                            { name: '发生时间', value: 'timestamp', align: 'center', width: 250 },
                            { name: '通话时长(秒) / 短信内容', value: 'callTime', align: 'center', width: 400, highlightKey: true, keys: [], tooltip: true }
                        ]
                    },
                    {
                        flag: 4,
                        columns: [
                            { name: '序号', value: 'index', width: 60, align: 'center' },
                            { name: '对端号码', value: 'relateNum', align: 'center', width: 200 },
                            { name: '对端号码归属地', value: 'relateNumHomecode', align: 'center', width: 230 },
                            { name: '类型', value: 'cdrType', align: 'center', width: 80 },
                            { name: '发生时间', value: 'timestamp', align: 'center', width: 250 },
                            { name: '通话时长(秒) / 短信内容', value: 'callTime', align: 'center', width: 400, highlightKey: true, keys: [], tooltip: true }
                        ]
                    },
                    {
                        flag: 5
                    },
                    {
                        flag: 6,
                        columns: [
                            { name: '序号', value: 'index', width: 80, align: 'center' },
                            { name: '特定区域', value: 'specificname', width: 250, align: 'center' },
                            { name: '停留总时长', value: 'allTime', align: 'center', width: 170 },
                            { name: 'LAC', value: 'lac', align: 'center', width: 150 },
                            { name: 'CI', value: 'ci', align: 'center', width: 150 },
                            { name: '位置描述', value: 'uliPositionName', align: 'center', width: 410 }
                        ]
                    },
                    {
                        flag: 7
                    },
                    {
                        flag: 8,
                        columns: [
                            { name: '序号', value: 'index', width: 80, align: 'center' },
                            { name: '停留总时长', value: 'allTime', align: 'center', width: 280 },
                            { name: 'LAC', value: 'lac', align: 'center', width: 200 },
                            { name: 'CI', value: 'ci', align: 'center', width: 200 },
                            { name: '位置描述', value: 'uliPositionName', align: 'center', width: 470 }
                        ]
                    }
                ],
                contentTable: {
                    stripe: true,
                    listLoading: false,
                    emptyText: ' ',
                    highlightRow: true,
                    column: [],
                    data: [],
                    // 添加分页
                    pagination: true,
                    // 分页参数
                    pageOpt: {
                        total: 0,
                        currentPage: 1,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    },
                    rowClick: (row) => {
                        let ids = row.ids;
                        let keywords = row.keywords;
                        this.rowClicks(ids, keywords);
                    }
                },
                contentHeight: {
                    height: 0
                },
                // 个人详情每行弹出数据 -- 表格
                diaglogTable: {
                    scrollLoading: true,
                    scrollListLength: 20,
                    scrollListContainer: 'contentDiaglogTable',
                    widthType: true,
                    listLoading: false,
                    stripe: true,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '到达时间', value: 'arriveTime', width: 400, align: 'center' },
                        { name: '停留时间', value: 'stayTime', align: 'center' }
                    ],
                    data: []
                },
                diaglogTableHeight: {
                    height: 250
                },
                // SZ个人详情每行弹出数据
                // type -- table --- 短信，通联，弹窗无表格
                // type -- map --- 基站排行型弹窗有表格
                contentSZDialog: [
                    {
                        flag: 2,
                        type: '',
                        tittleTop: [
                            { key: '时间' },
                            { key: '类型' },
                            { key: '对端号码' },
                            { key: '对端号码归属地' }
                        ],
                        tittleMiddle1: [
                            { key: '本端位置' },
                            { key: '本端机身码' },
                            { key: '本端卡号' }
                        ],
                        tittleMiddle2: [
                            { key: '对端位置' },
                            { key: '对端机身码' },
                            { key: '对端卡号' }
                        ],
                        titleContent: ''
                    },
                    {
                        flag: 3,
                        type: '',
                        tittleTop: [
                            { key: '中标关键字' },
                            { key: '时间' },
                            { key: '类型' },
                            { key: '对端号码' },
                            { key: '对端号码归属地' }
                        ],
                        tittleMiddle1: [
                            { key: '本端位置' },
                            { key: '本端机身码' },
                            { key: '本端卡号' }
                        ],
                        tittleMiddle2: [
                            { key: '对端位置' },
                            { key: '对端机身码' },
                            { key: '对端卡号' }
                        ],
                        titleContent: ''
                    },
                    {
                        flag: 4,
                        type: '',
                        tittleTop: [
                            { key: '对端号码' },
                            { key: '对端号码归属地' },
                            { key: '类型' },
                            { key: '时间' },
                            { key: '通话时长' }
                        ],
                        tittleMiddle1: [
                            { key: '本端位置' },
                            { key: '本端机身码' },
                            { key: '本端卡号' }
                        ],
                        tittleMiddle2: [
                            { key: '对端位置' },
                            { key: '对端机身码' },
                            { key: '对端卡号' }
                        ],
                        titleContent: ''
                    },
                    {
                        flag: 5,
                        type: '',
                        tittleTop: [
                            { key: '对端号码' },
                            { key: '对端号码归属地' },
                            { key: '类型' },
                            { key: '时间' },
                            { key: '通话时长' }
                        ],
                        tittleMiddle1: [
                            { key: '本端位置' },
                            { key: '本端机身码' },
                            { key: '本端卡号' }
                        ],
                        tittleMiddle2: [
                            { key: '对端位置' },
                            { key: '对端机身码' },
                            { key: '对端卡号' }
                        ],
                        titleContent: ''
                    },
                    {
                        flag: 6,
                        type: '',
                        tittleTop: [
                            { key: '活动次数' },
                            { key: '基站名称' },
                            { key: 'LAC' },
                            { key: 'CI' },
                            { key: '经度' },
                            { key: '纬度' }
                        ],
                        tittleMiddle1: [
                            { key: '位置名称' }
                        ],
                        titleContent: []
                    },
                    {
                        flag: 7,
                        type: '',
                        tittleTop: [
                            { key: '停留总时长' },
                            { key: '基站名称' },
                            { key: 'LAC' },
                            { key: 'CI' },
                            { key: '经度' },
                            { key: '纬度' }
                        ],
                        tittleMiddle1: [
                            { key: '位置名称' }
                        ],
                        titleContent: []
                    }
                ],
                // SJ个人详情每行弹出数据
                // 短信  通联   基站
                // type -- table --- 短信，通联，弹窗无表格
                // type -- map --- 基站排行型弹窗有表格
                contentSJDialog: [
                    {
                        flag: 2,
                        type: '',
                        tittleTop: [
                            { key: '时间' },
                            { key: '类型' },
                            { key: '对端号码' },
                            { key: '对端号码归属地' }
                        ],
                        tittleMiddle1: [
                            { key: '本端位置' },
                            { key: '本端机身码' },
                            { key: '本端卡号' }
                        ],
                        tittleMiddle2: [
                            { key: '对端位置' },
                            { key: '对端机身码' },
                            { key: '对端卡号' }
                        ],
                        titleContent: ''
                    },
                    {
                        flag: 3,
                        type: '',
                        tittleTop: [
                            { key: '对端号码' },
                            { key: '对端号码归属地' },
                            { key: '类型' },
                            { key: '发生时间' },
                            { key: '通话时长' }
                        ],
                        tittleMiddle1: [
                            { key: '本端位置' },
                            { key: '本端机身码' },
                            { key: '本端卡号' }
                        ],
                        tittleMiddle2: [
                            { key: '对端位置' },
                            { key: '对端机身码' },
                            { key: '对端卡号' }
                        ],
                        titleContent: ''
                    },
                    {
                        flag: 4,
                        type: '',
                        tittleTop: [
                            { key: '对端号码' },
                            { key: '对端号码归属地' },
                            { key: '类型' },
                            { key: '发生时间' },
                            { key: '通话时长' }
                        ],
                        tittleMiddle1: [
                            { key: '本端位置' },
                            { key: '本端机身码' },
                            { key: '本端卡号' }
                        ],
                        tittleMiddle2: [
                            { key: '对端位置' },
                            { key: '对端机身码' },
                            { key: '对端卡号' }
                        ],
                        titleContent: ''
                    },
                    {
                        flag: 5,
                        type: '',
                        tittleTop: [
                            { key: '停留总时长' },
                            { key: '基站名称' },
                            { key: 'LAC' },
                            { key: 'CI' },
                            { key: '经度' },
                            { key: '纬度' }
                        ],
                        tittleMiddle1: [
                            { key: '位置名称' }
                        ],
                        titleContent: []
                    },
                    {
                        flag: 6,
                        type: '',
                        tittleTop: [
                            { key: '停留总时长' },
                            { key: '基站名称' },
                            { key: 'LAC' },
                            { key: 'CI' },
                            { key: '经度' },
                            { key: '纬度' }
                        ],
                        tittleMiddle1: [
                            { key: '位置名称' }
                        ],
                        titleContent: []
                    },
                    {
                        flag: 7,
                        type: '',
                        tittleTop: [
                            { key: '活动次数' },
                            { key: '基站名称' },
                            { key: 'LAC' },
                            { key: 'CI' },
                            { key: '经度' },
                            { key: '纬度' }
                        ],
                        tittleMiddle1: [
                            { key: '位置名称' }
                        ],
                        titleContent: []
                    },
                    {
                        flag: 8,
                        type: '',
                        tittleTop: [
                            { key: '停留总时长' },
                            { key: '基站名称' },
                            { key: 'LAC' },
                            { key: 'CI' },
                            { key: '经度' },
                            { key: '纬度' }
                        ],
                        tittleMiddle1: [
                            { key: '位置名称' }
                        ],
                        titleContent: []
                    }
                ],
                contentDialogAll: [],
                contentTypeDialogs: {}
            }
        },
        props: ['option', 'renderData'],
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'globalKeys': 'global/globalKeys',
                'mapCenter': 'global/globalKeys'
            }),
            mapStyle () {
                return {
                    height: this.option.height - 195 + 'px'
                }
            }
        },
        watch: {
            'renderData' () {
                this.minType = this.renderData.type;
                this.minMsisdn = this.renderData.msisdn;
                // 确定使用涉藏的表格或者涉疆的表格
                if (this.minType === 0) {
                    this.columnAll = this.columnSZArr;
                    this.contentDialogAll = this.contentSZDialog;
                } else {
                    this.columnAll = this.columnSJArr;
                    this.contentDialogAll = this.contentSZDialog;
                }
                this.getInfoFun();
            },
            'option' () {
                this.contentHeight.height = this.option.height - 195
            }
        },
        mounted () {
            this.$nextTick(() => {
                // 显示分页
                this.contentTable.pagination = true;
            })
        },
        methods: {
            // 关键词高亮
            highlight (item, con) {
                item = item.split(',');
                item.forEach(it => {
                    con = con.replace(new RegExp(it, 'gm'), `<span style='color:#efb414'>$&</span>`)
                })
                return con;
            },
            // 显示个人详情相应的弹窗
            contentChangeResult (val) {
                this.contentTableDialog = val;
            },
            // 为活动区域画地图
            drawMap () {
                // 百度地图API功能
                let this_ = this;
                let { gMapCenterRvrovice } = this.mapCenter
                var map = new BMap.Map('actionMap');
                map.clearOverlays()
                // 地图中心点
                var point = new BMap.Point(gMapCenterRvrovice[0], gMapCenterRvrovice[1]);
                map.centerAndZoom(point, 9);
                map.enableScrollWheelZoom();
                // 编写自定义函数,创建标注
                function addMarker (point, leavel, datas) {
                    let lev1 = this_.iconLe[leavel].lev1;
                    let lev2 = this_.iconLe[leavel].lev2;
                    let myIcon = new BMap.Icon(this_.icon, new BMap.Size(lev1, lev2), {
                        imageSize: new BMap.Size(lev1, lev2)
                    })
                    var marker = new BMap.Marker(point, { icon: myIcon });
                    marker.addEventListener('click', () => {
                        this_.rowClicks(datas);
                    });
                    map.addOverlay(marker);
                }
                if (this.mapArr.length && this.mapArr.length > 0) {
                    let pointsArr = [];
                    for (let i in this.mapArr) {
                        pointsArr.push({
                            lng: this.mapArr[i].longtitude,
                            lat: this.mapArr[i].latitude
                        })
                    }
                    let view = map.getViewport(pointsArr);
                    map.centerAndZoom(view.center, view.zoom);
                    this.mapArr.forEach((item) => {
                        let leavel = item.leavel;
                        let datas = item.ids;
                        point = new BMap.Point(item.longtitude, item.latitude);
                        addMarker(point, leavel, datas);
                    })
                }
            },
            // 初始化信息
            async getInfoFun () {
                let resp = await getInfo({
                    msisdn: this.minMsisdn,
                    type: this.minType
                })
                this.rightAllTitle.msisdnTitle = resp.data.msisdn;
                this.rightAllTitle.operatorTitle = resp.data.spcode;
                this.rightAllTitle.locationTitle = resp.data.homecode;
                this.rightAllTitle.typeTitle = resp.data.judgmentFlag;
                this.termData = resp.data.result;
                this.tabs = resp.data.tag;
                this.tabsValue = this.tabs[0].name;
                this.showFlag = this.tabs[0].flag;
                this.getListFun(1, 10);
            },
            // 表格分页
            contentCurrent (val) {
                this.getListFun(val, this.contentTable.pageOpt.pageSize)
            },
            contentSize (val) {
                this.contentTable.pageOpt.pageSize = val
                if (this.contentTable.pageOpt.total === 0) {
                    return;
                }
                this.getListFun(1, val)
            },
            // 显示个人表格数据
            async getListFun (page, rows) {
                this.allLoading = true;
                this.contentTable.listLoading = true;
                this.contentTable.emptyText = '';
                let resp = await getList({
                    msisdn: this.minMsisdn,
                    type: this.minType,
                    flag: this.showFlag,
                    pag: page,
                    rows: rows
                })
                if (resp.rows) {
                    this.allLoading = false;
                    this.contentTable.listLoading = false;
                    this.contentTable.pageOpt.currentPage = page;
                    this.contentTable.pageOpt.pageSize = rows;
                    this.columnAll.forEach((item) => {
                        if (this.showFlag === item.flag) {
                            if (item.columns) {
                                this.contentTable.column = item.columns;
                            }
                        }
                    })
                    this.$nextTick(() => {
                        resp.rows.forEach((item) => {
                            if (item.oriContent || item.calltime) {
                                if ((item.oriContent === null || item.oriContent === '') && (item.callTime !== null && item.calltime !== '')) {
                                } else {
                                    item.callTime = item.oriContent
                                }
                            }
                        })
                    })
                    if (this.minType === 0) {
                        // 如果有关键词
                        if (this.showFlag === 3) {
                            resp.rows.forEach((item) => {
                                if (item.keywords) {
                                    this.$refs.contentTables.setColumnKeys('oriContent', item.keywords)
                                    item.keywords = item.keywords.join(',')
                                }
                            })
                        } else if (this.showFlag === 6) {
                            this.mapArr = resp.rows
                            this.contentTable.pagination = false;
                            this.$nextTick(() => {
                                this.drawMap();
                            })
                            return
                        }
                    } else {
                        if (this.showFlag === 5 || this.showFlag === 7) {
                            this.mapArr = resp.rows
                            this.contentTable.pagination = false;
                            this.$nextTick(() => {
                                this.drawMap();
                            })
                            return
                        }
                    }
                }
                this.contentTable.data = resp.rows;
                this.contentTable.pageOpt.total = resp.total;
            },
            // 显示个人弹窗
            async rowClicks (ids, keywords) {
                this.tabs.forEach((item) => {
                    if (item.flag === this.showFlag) {
                        this.contentTableTittle = item.name
                    }
                })
                let resp = await dialogDetail({
                    ids: ids
                })
                this.contentTableDialog = true;
                this.diaglogTable.data = [];
                this.contentDialogAll.forEach((item) => {
                    if (item.flag === this.showFlag) {
                        this.contentTypeDialogs = item;
                    }
                })
                this.contentTypeDialogs.type = resp.data.dialogType;
                if (this.contentTypeDialogs.type === 'map') {
                    this.contentTypeDialogs.tittleTop.forEach((item, index) => {
                        item.value = resp.data.info[index]
                    })
                    this.contentTypeDialogs.tittleMiddle1.forEach((item, index) => {
                        item.value = resp.data.cname[index]
                    })
                    this.contentTypeDialogs.titleContent = resp.data.timeInfo;
                    this.$nextTick(() => {
                        this.diaglogTable.data = this.contentTypeDialogs.titleContent;
                    })
                } else {
                    this.contentTypeDialogs.type = resp.data.dialogType;
                    if (this.minType === 0 && this.showFlag === 3) {
                        let oriContent = this.highlight(keywords, resp.data.oriContent)
                        this.contentTypeDialogs.titleContent = oriContent;
                    } else {
                        this.contentTypeDialogs.titleContent = resp.data.oriContent;
                    }
                    this.contentTypeDialogs.tittleTop.forEach((item, index) => {
                        item.value = resp.data.info[index]
                    })
                    this.contentTypeDialogs.tittleMiddle1.forEach((item, index) => {
                        item.value = resp.data.usernuminfo[index]
                    })
                    this.contentTypeDialogs.tittleMiddle2.forEach((item, index) => {
                        item.value = resp.data.relatenuminfo[index]
                    })
                }
            },
            handleClick (val) {
                // 显示表格或者地图
                this.showType = this.tabs[val.index].type
                this.columnAll.forEach((item) => {
                    if (item.flag === this.tabs[val.index].flag) {
                        this.showFlag = this.tabs[val.index].flag;
                        // 0涉藏; 1涉疆
                        if (this.minType === 0) {
                            if (this.showFlag === 6 || this.showFlag === 7) {
                                this.contentTable.pagination = false;
                            } else {
                                this.contentTable.pagination = true;
                            }
                        } else {
                            if ([5, 6, 7, 8].includes(this.showFlag)) {
                                this.contentTable.pagination = false;
                            } else {
                                this.contentTable.pagination = true;
                            }
                        }
                        this.getListFun(1, 10);
                    }
                })
            }
        },
        components: {
            tableComp,
            sysDialog
        }
    }
</script>

<style scoped>
    .dialogUl {
        width: 100%;
        height: 60px;
        list-style: none;
        display: table;
        table-layout: fixed;
        border-bottom: 1px solid #4F8EE5;
        border-right: 1px solid #4F8EE5;
        margin-bottom: 6px;
    }
    .dialogUl li {
        display: table-cell;
        line-height: 30px;
        text-align: center;
    }
    .dialogUl li p {
        border-top: 1px solid #4F8EE5;
        border-left: 1px solid #4F8EE5;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        min-height: 30px;
    }
    .dialogUl li p:first-child {
        background: #102546;
    }
    .dialogUlTable {
        width: 100%;
        height: 60px;
        list-style: none;
        display: table;
        table-layout: fixed;
        border-bottom: 1px solid #4F8EE5;
        border-right: 1px solid #4F8EE5;
        margin-bottom: 6px;
    }
    .dialogUlTable li:not(:first-child) {
        width: 25%;
        display: table-cell;
        line-height: 30px;
    }
    .dialogUlTable li:first-child {
        width: 50%;
        display: table-cell;
        line-height: 30px;
    }
    .dialogUlTable li p {
        border-top: 1px solid #4F8EE5;
        border-left: 1px solid #4F8EE5;
        text-align: center;
        min-height: 30px;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .dialogUlTable li p:first-child {
        background: #102546;
    }
    .dialogUlMap {
        width: 100%;
        height: 32px;
        list-style: none;
        border-bottom: 1px solid #4F8EE5;
        border-right: 1px solid #4F8EE5;
        margin-bottom: 6px;
    }
    .dialogUlMap li {
        height: 32px;
        width: 100%;
        overflow: hidden;
        line-height: 30px;
        text-align: center;
    }
    .dialogUlMap li p:first-child{
        width: 20%;
        height: 30px;
        background: #102546;
        float: left;
        border-top: 1px solid #4F8EE5;
        border-left: 1px solid #4F8EE5;
        min-height: 30px;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .dialogUlMap li p:last-child{
        width: 80%;
        float: left;
        height: 30px;
        border-top: 1px solid #4F8EE5;
        border-left: 1px solid #4F8EE5;
        min-height: 30px;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    @component-namespace ga {
        @b all {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
            @e title {
                width: 99%;
                height: 50px;
                font-size: 17px;
                text-align: left;
                margin-left: 1%;
                color: #fff;
            }
            @e title p {
                width: 20%;
                float: left;
                height: 50px;
                line-height: 50px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow:ellipsis;
            }
            @e title p:nth-child(3) {
                width: 30%;
            }
            @e judgment {
                width: 99%;
                height: auto;
                position: relative;
                margin-left: 1%;
                margin-bottom: 10px;
                /*border-top: 1px solid #4F8EE5;*/
                border-left: 1px solid #4F8EE5;
                overflow: hidden;
                color: #fff;
                @m lis {
                    list-style: none;
                    width: 25%;
                    height: 28px;
                    font-size: 12px;
                    float: left;
                    overflow: hidden;
                }
                @m lis p {
                    list-style: none;
                    text-align: center;
                    line-height: 27px;
                    float: left;
                    height: 27px;
                    border-bottom: 1px solid #4F8EE5;
                    border-right: 1px solid #4F8EE5;
                    border-top: 1px solid #4F8EE5;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                    overflow: hidden;
                }
                @m lis p:first-child {
                    width: 80%
                }
                @m lis p:nth-child(2) {
                    width: 20%
                }
            }
            @e tabs {
                width: 99%;
                height: auto;
                margin-left: 1%;
            }
            @e content {
                width: 99%;
                height: auto;
                margin-left: 1%;
                @m map {
                    width: 100%;
                    height: auto;
                }
            }
            @e loading {
                position: absolute;
                bottom: 10%;
                left: 0;
                width: 100%;
                height: 70%;
                background: rgba(225, 225, 225, 0);
                cursor: wait;
                z-index: 999999;
            }
        }
    }
</style>