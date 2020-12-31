    <template>
    <div class="ga-warningInArea__container warningDialogExport">
        <!--<div class="ga-mapSty">-->
        <div class="ga-layout__bodyTitle">
            <span class="ga-layout__titleTopLeft"></span>
            <span class="ga-layout__titleLeft"></span>
            <span class="ga-layout__titleCenter">{{ warnName }}</span>
            <span class="ga-layout__titleRight"></span>
            <span class="ga-layout__titleRightLeft"></span>
        </div>
        <!--</div>-->
        <!--<div class="ga-warningInArea__eventHeader">
            <h3 class="ga-warningInArea__eventTitle">{{eventName}}</h3>
            <div class="ga-warningInArea__eventWarning">{{wnum}}</div>
        </div>-->
        <div class="ga-warningInArea__giscontainer">
            <div class="ga-warningInArea__leftTable">
                <pullPanel :opt ='tableLeft'
                @handleSizePageChange="handleSizePageChange"
                @handleCurrentPageChange="handleCurrentPageChange"
                @disposeAllData="getDisposeAllData"
                @disposeData="getResourceIds"
                @showDialog="showDialogFun"></pullPanel>
            </div>
            <div class="ga-warningInArea__rightTable">
                <template v-if="isTable">
                    <pullPanel :opt='tableRight'></pullPanel>
                </template>
                <template v-else>
                    <pullText :opt='TextOpt'></pullText>
                </template>
            </div>
            <div class="ga-warningInArea__gis">
                <template v-if="isMapShow">
                    <BmapComPart :option="mapDataPart" :labelShow="checkboxShow"  ref="mapPart" :mapCenter="mapCenter"></BmapComPart>
                </template>
                <template v-else>
                    <BmapCom :option="mapData"  :warnmoDelId='BigwarnmoDelId' :mapCenter="mapCenter" :labelShow="checkboxShow"></BmapCom>
                </template>
            </div>
            <div v-if="isPart" class="ga-checkbox smallNotLong">
                <checkBox :option="checkNameOption" class="ga-checkbox__child"></checkBox>
                <checkBox :option="checkMsisdnOption" class="ga-checkbox__child"></checkBox>
                <checkBox :option="checkTimeOption" class="ga-checkbox__child"></checkBox>
            </div>
        </div>
        <div class="ga-warningInArea__leftSmallMap" v-if="smallMap">
            <p class="small_p">离开信息</p>
            <div id="leftMap"></div>
            <div class="animated ga-popover" v-show="popoverLeft" ref="popoverLeft">
                <p class="topP">
                    <span class="ga-close" @click="close(0)">×</span>
                </p>
                <div class="ga-map ga-mapLeft">
                    <table>
                        <tbody>
                        <tr v-for="(item, index) in tableInfo0" :key="index">
                            <td v-for="j in item" :key="j">{{j}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="ga-warningInArea__rightSmallMap" v-if="smallMap">
            <p class="small_p">到达信息</p>
            <div id="rightMap"></div>
            <div class="animated ga-popover" v-show="popoverRight" ref="popoverRight">
                <p class="topP">
                    <span class="ga-close" @click="close(1)">×</span>
                </p>
                <div class="ga-map ga-mapRight">
                    <table>
                        <tbody>
                        <tr v-for="(item, index) in tableInfo1" :key="index">
                            <td v-for="j in item" :key="j">{{j}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="ga-warningInArea__inMinMap" v-if="inMinMap">
            <div id="inMinMap"></div>
        </div>
        <sysDialog
            v-if="dialogVisible"
            title="预警导出"
            @change="dialogChange"
            :dialogVisible="dialogVisible"
            :showConfirm="false"
            :showCancel="false"
            >
                <FormComp :option="formOpt" ref="dialogForm"></FormComp>
                <tableCom :option="dialogTable" :comSize="dialogTableHeight"></tableCom>
        </sysDialog>
    </div>
</template>

<script>
    const CIRCLE = './static/vendor/gis/baidumapv2/images/circle.png'
    import tableCom from 'components/Table'
    import sysDialog from 'components/common/dialog'
    import pullPanel from 'views/warning/pullPanel'
    import pullText from 'views/warning/pullText'
    import BmapCom from './mapCom'
    import FormComp from 'components/Form/index'
    import BmapComPart from './mapComPart'
    import BMap from 'BMap'
    import Io from 'utils/websocket'
    import { phoneNumChange } from 'utils/index.js'
    import checkBox from 'components/Form/checkbox'
    import { mapGetters } from 'vuex'
    import { forbiddenDate, getIntervalDate } from 'utils'
    import { tarInAreaResLoad, tarInOutResLoad, tarOffResLoad,
            tarFlowResLoad, tarDisResLoad, tarJoinResLoad,
            tarTraResLoad, tarFlowInAreaResLoad, tarFlowNationResLoad,
            tarFlowOutProvResLoad, tarInAreaAlaDispose, tarInOutAlaDispose, tarOffAlaDispose,
            tarFlowAlaDispose, tarDisAlaDispose, tarJoinAlaDispose,
            tarTraAlaDispose, tarFlowInAreaAlaDispose,
            tarFlowNationAlaDispose, tarFlowInProvAlaDispose,
            tarInAreaAlaDetail, tarInOutAlaDetail, tarOffAlaDetail,
            tarFlowAlaDetail, tarDisAlaDetail, tarJoinAlaDetail,
            tarTraAlaDetail, tarFlowInAreaAlaDetail, tarFlowNationAlaDetail,
            tarFlowInProvAlaDetail, tarCityAreaResLoad,
            tarCityAreaAlaDispose, tarCityAreaDetail, warmExport } from 'api/warning/AreaWarning'

    const apiUrl = process.env.NODE_ENV === 'production'
        ? '' : 'ws://10.8.0.11:8080/policeBusiness'
    const apiUrls = process.env.NODE_ENV === 'production'
    ? '/policeBusiness' : 'ws://10.8.0.11:8080/policeBusiness'
    // const apiUrl = process.env.NODE_ENV === 'production'
        // ? '' : 'ws://192.168.3.210:8080/policeBusiness'
    export default {
        name: 'inArea',
        data () {
            let me = this
            return {
                dialogVisible: false,
                // 是否可以处置
                canChange: true,
                // tableHeight: [],
                currentNode: '',
                timer: '',
                AlarmAllData: [],
                page: 1,
                isTable: true,
                eventName: '',
                warnName: '',
                taskBaseId: '',
                alarmTaskIds: '',
                alarmTaskIdList: [],
                warnmoDelId: '',
                BigwarnmoDelId: '',
                // bigZoom: 7,
                wnum: 0,
                detailText: '',
                detailTime: '',
                detailID: '',
                disposeID: '',
                // 批量处置参数
                getResourceIdStr: '',
                funName: [],
                // websocket 高亮
                // tdIndex: 0,
                // warnLength: 0,
                // tdTarget: '',
                //   <------
                // webscoket相关
                socket: new Io(),
                realTimeData: '',
                webscoketURL: `${apiUrl}/websocket/alarmDetailsSocket`,
                // 地图相关
                map: null,
                zoom: 19,
                isPart: true,
                isMapShow: true,
                mapData: {},
                mapDataPart: {},
                smallMapId: ['leftMap', 'rightMap', 'inMinMap'],
                // 省内漫出和省际漫出
                smallMap: true,
                leftMap: '',
                rightMap: '',
                popoverLeft: false,
                popoverRight: false,
                tableInfo0: [],
                tableInfo1: [],
                // 目标漫入出现小地图
                inMinMap: false,
                inMap: '',
                icon: [CIRCLE],
                inMinMapData: '',
                inMinZoom: 7,
                // table相关
                unTableData: [],
                // tarMsisdn: '',
                // 控制label标签显示的值
                checkboxShow: {
                    name: false,
                    msisdn: false,
                    time: false
                },
                checkNameOption: {
                    data: [{
                        name: '显示姓名'
                    }],
                    change (val) {
                        if (val) {
                            me.checkboxShow.name = true
                        } else {
                            me.checkboxShow.name = false
                        }
                    }
                },
                checkMsisdnOption: {
                    data: [{
                        name: '显示手机号'
                    }],
                    change (val) {
                        if (val) {
                            me.checkboxShow.msisdn = true
                        } else {
                            me.checkboxShow.msisdn = false
                        }
                    }
                },
                checkTimeOption: {
                    data: [{
                        name: '显示时间'
                    }],
                    change (val) {
                        if (val) {
                            me.checkboxShow.time = true
                        } else {
                            me.checkboxShow.time = false
                        }
                    }
                },
                column1: [
                    { name: '序号', value: 'index', width: 90, align: 'center' },
                    { name: '时间', value: 'alarmTime', width: 148, tooltip: true, align: 'center' },
                    { name: '告警名称', value: 'alarmTaskName', tooltip: true, align: 'center' },
                    { name: '操作', width: 60, align: 'center', operations: [
                            { label: '处置', type: 'label', click: me.disposeClick }
                    ] },
                    { name: '', value: 'selection', align: 'center', width: 40 }
                ],
                column2: [
                    { name: '序号', value: 'index', width: 90, align: 'center' },
                    { name: '时间', value: 'alarmTime', width: 148, tooltip: true, align: 'center' },
                    { name: '告警名称', value: 'alarmTaskName', tooltip: true, align: 'center' },
                    { name: '告警级别', value: 'action', align: 'center', width: 60 },
                    { name: '操作', width: 60, align: 'center', operations: [
                            { label: '处置', type: 'label', click: me.disposeClick }
                    ] },
                    { name: '', value: 'selection', align: 'center', width: 40 }
                ],
                column3: [
                    { name: '序号', value: 'index', width: 90, align: 'center' },
                    { name: '时间', value: 'alarmTime', width: 148, tooltip: true, align: 'center' },
                    { name: '告警名称', value: 'alarmTaskName', tooltip: true, align: 'center' }
                ],
                column4: [
                    { name: '序号', value: 'index', width: 90, align: 'center' },
                    { name: '时间', value: 'alarmTime', width: 148, tooltip: true, align: 'center' },
                    { name: '告警名称', value: 'alarmTaskName', tooltip: true, align: 'center' },
                    { name: '告警级别', value: 'action', align: 'center', width: 80 }
                ],
                tableLeft: {
                    title1: '目标进入告警', // 第一个title
                    title2: '历史记录', // 第二个title
                    leftTitle: true,
                    isOpen: true, // 是否打开
                    hasSec: true,  // 是否显示第二个表格
                    warnmoDelId: '',
                    alarmTaskIds: '',
                    // 第一个表格大小
                    tableSize1: {
                        height: 160
                    },
                    // 第二个表格大小
                    tableSize2: {
                        height: 190
                    },
                    // 第一个表格配置
                    tableTop: {
                        scrollLoading: true,
                        scrollListLength: 20,
                        scrollListContainer: 'ga-warning-leftTable',
                        listLoading: false,
                        isborder: false,
                        //  是否为斑马纹 table
                        stripe: false,
                        highlightRow: true,
                        column: [],
                        data: [],
                        rowClick: function (row, event) {
                            event.stopPropagation()
                            // 点击复选框时阻止请求
                            if (event.target.className === 'el-checkbox__inner' ||
                                event.target.className === 'el-checkbox__original') {
                                return;
                            }
                            me.detailText = row.alarmTaskName
                            me.detailTime = row.alarmTime
                            me.detailID = row.resourceId
                            $('.current-row').removeClass('current-row')
                            $(event.currentTarget).addClass('current-row')
                            // 保存当前高亮行的下标
                            // me.tdIndex = $(event.currentTarget)['context'].rowIndex;
                            if (me.isTable) {
                                me.tableRight.isOpen = true
                                me.tableRight.title1 = `${row.alarmTaskName}详情`
                                // me.tableRight.tableTop.pageOpt.currentPage = 1
                                me.page = 1
                            } else {
                                me.TextOpt.isOpen = true
                                let title = me.warnmoDelId === 9 ? `${row.alarmTaskName}详情`
                                : `${me.warnName}详情`
                                me.TextOpt.title1 = title
                                // me.TextOpt.title1 = `${row.alarmTaskName}详情`
                            }
                            me.getDetailData()
                        }
                    },
                    // 第二个表格配置
                    tableBottom: {
                        listLoading: false,
                        //  是否为斑马纹 table
                        highlightRow: true,
                        isborder: false,
                        stripe: false,
                        column: [],
                        pagination: true,
                        pageOpt: {
                            total: 0,
                            currentPage: 1,
                            pageSizes: [10, 20, 30],
                            pageSize: 10,
                            layout: 'total, sizes, prev, next, jumper'
                        },
                        data: [],
                        rowClick: function (row, event) {
                            $('.current-row').removeClass('current-row')
                            $(event.currentTarget).addClass('current-row')
                            event.stopPropagation()
                            me.detailTime = row.alarmTime
                            me.detailText = row.alarmTaskName
                            me.detailID = row.resourceId
                            if (me.isTable) {
                                me.tableRight.isOpen = true
                                me.tableRight.title1 = `${row.alarmTaskName}详情`
                                // me.tableRight.tableTop.pageOpt.currentPage = 1
                                me.page = 1
                            } else {
                                me.TextOpt.isOpen = true
                                let title = me.warnmoDelId === 9 ? `${row.alarmTaskName}详情`
                                : `${me.warnName}详情`
                                me.TextOpt.title1 = title
                                // me.TextOpt.title1 = `${row.alarmTaskName}详情`
                            }
                            me.getDetailData()
                        }
                    }
                },
                tableRight: {
                    title1: '',
                    subtitle: '',
                    hasSec: false,
                    isOpen: false,
                    tableSize1: {
                        height: 300
                    },
                    tableTop: {
                        listLoading: false,
                        highlightRow: true,
                        //  是否为斑马纹 table
                        stripe: false,
                        column: [],
                        data: [],
                        // 是否分页
                        pagination: false
                        // 分页参数
                        // pageOpt: {
                        //     currentPage: 1,
                        //     total: 20,
                        //     pageSizes: [10],
                        //     pageSize: 10
                        // }
                    }
                },
                TextOpt: {
                    title1: '',
                    isOpen: false,
                    name: '',
                    phoneNumber: '',
                    content: '',
                    lineDataArr: []
                },
                // 弹窗相关
                formOpt: {
                    inline: true,
                    labelWidth: '80',
                    btnPos: 'right',
                    items: [
                        {
                            label: '开始时间',
                            type: 'date',
                            comOpt: {
                                id: 'startTime',
                                width: 160,
                                value: getIntervalDate(),
                                disabled: false,
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate(time) {
                                        let maxDay = getIntervalDate()
                                        return forbiddenDate(time, maxDay, 8)
                                    }
                                }
                            }
                        },
                        {
                            label: '结束时间',
                            type: 'date',
                            comOpt: {
                                id: 'endTime',
                                width: 160,
                                value: getIntervalDate(),
                                disabled: false,
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate(time) {
                                        let maxDay = getIntervalDate()
                                        return forbiddenDate(time, maxDay, 8)
                                    }
                                }
                            }
                        },
                        {
                            label: '告警名称',
                            type: 'text',
                            comOpt: {
                                id: 'alarmTaskName',
                                width: 160,
                                value: ''
                            }
                        }
                    ],
                    btns: [
                        {
                            comOpt: {
                                id: 'query',
                                value: '查询',
                                width: 130,
                                click: () => {
                                    let { alarmTaskName, startTime, endTime } = me.$refs.dialogForm.getValue();
                                    if (startTime === '' || endTime === '') {
                                        me.$alert('起止时间不能为空', {
                                            confirmButtonText: '确定'
                                        })
                                        return
                                    }
                                    if (startTime > endTime) {
                                        me.$alert('开始时间不能大于结束时间', {
                                            confirmButtonText: '确定'
                                        })
                                        return
                                    }
                                    me.warmExportFun(alarmTaskName, startTime, endTime)
                                }
                            }
                        }
                    ]
                },
                dialogTable: {
                    listLoading: false,
                    highlightRow: true,
                    emptyText: ' ',
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '告警名称', value: 'alarmTaskName', align: 'center', width: 300 },
                        { name: '时间', value: 'allTime', align: 'center' },
                        {
                            name: '操作',
                            value: '',
                            align: 'center',
                            type: 'icon',
                            width: 80,
                            operations: [
                                {
                                    label: '下载',
                                    type: 'label',
                                    click: e => {
                                        let url = `${apiUrls}/export/detailResult/`;
                                        url += me.warnmoDelId + '/';
                                        url += e.alarmTaskId + '/';
                                        url += e.alarmTaskName + '/';
                                        url += e.startTime + '/';
                                        url += e.endTime;
                                        window.location.href = url;
                                    }
                                }
                            ]
                        }
                    ],
                    data: []
                },
                dialogTableHeight: {
                    height: 300,
                    width: 1000
                }
            }
        },
        computed: {
            ...mapGetters({
                'mapCenter': 'global/globalKeys',
                'isPhoneJM': 'global/isPhoneJM',
                'gMapMaxZoom': 'global/gMapMaxZoom'
            })
        },
        watch: {
            'tableLeft.isOpen' (val) {
                this.tableLeft.alarmTaskIds = this.alarmTaskIds;
                this.tableLeft.warnmoDelId = this.warnmoDelId;
                if (!val) {
                    this.tableLeft.tableTop.listLoading = false
                    this.tableLeft.tableBottom.listLoading = false
                }
            },
            'tableRight.isOpen' (val) {
                if (val) {
                    this.tableRight.title1 = `${this.detailText}详情`
                } else {
                    this.tableRight.title1 = `${this.warnName}详情`
                    this.tableRight.tableTop.listLoading = false
                }
            },
            'TextOpt.isOpen' (val) {
                if (val) {
                    let title = this.warnmoDelId === 9 ? `${this.detailText}详情` : `${this.warnName}详情`
                    this.TextOpt.title1 = title
                } else {
                    let title = this.warnmoDelId === 9 ? `${this.warnName}详情` : `详情面板`
                    this.TextOpt.title1 = title
                }
            }
            // 右侧表格自适应
            // 'tableHeight' (val) {
            //     if (this.tableHeight.length <= 10 && val && this.tableHeight.length > 0) {
            //         this.tableRight.tableSize1.height = this.tableHeight.length * 40 + 45
            //     } else {
            //         this.tableRight.tableSize1.height = 300
            //     }
            // }
        },
        components: {
            tableCom,
            pullPanel,
            pullText,
            BmapComPart,
            BmapCom,
            FormComp,
            sysDialog,
            checkBox
        },
        beforeDestroy () {
            this.socket.disconnect();
        },
        mounted () {
            // 初始化刷新表格
            this.setTitle()
            // 直接传递warnmoDelId到子组件
            this.tableLeft.warnmoDelId = this.warnmoDelId;
            this.tableLeft.alarmTaskIds = this.alarmTaskIds;
            if (this.warnmoDelId === 11) {
                this.tableLeft.tableTop.column = this.column2
                this.tableLeft.tableBottom.column = this.column4
            } else {
                this.tableLeft.tableTop.column = this.column1
                this.tableLeft.tableBottom.column = this.column3
            }
            if ([1, 2, 3, 4, 5, 6, 7, 9, 11, 8, 10].includes(this.warnmoDelId)) {
                this.smallMap = false
            }
            if ([4, 11, 8, 10].includes(this.warnmoDelId)) {
                this.inMinMap = true
                // 地图和行政区加载太慢，this.$nextTick
                // this.$nextTick(() => {
                //     this.createInMap()
                // })
            }
            // this.$nextTick(() => {
            //     if (this.warnmoDelId === 4 || this.warnmoDelId === 11) {
            //         $('.ga-warningInArea__rightTable').css(
            //             { width: '335px' }
            //         )
            //     }
            // })
            this.webscoket()
        },
        created () {
            if (localStorage.getItem('taskStatus1') === '1') {
                this.canChange = true;
            } else {
                this.canChange = false;
            }
        },
        methods: {
            // 告警导出 --- 无参数时传空
            async warmExportFun (alarmTaskName = '', startTime = '', endTime = '') {
                let nameRule = /^[\s0-9a-zA-Z\u4E00-\u9FA5][0-9a-zA-Z\u4E00-\u9FA5-_]\s*$/g
                // 先去除前后空格，再做判断
                alarmTaskName = alarmTaskName.replace(/(^\s*)|(\s*$)/g, '')
                if (!nameRule.test(alarmTaskName) && alarmTaskName.length !== 0) {
                    this.$message('请正确输入告警名称')
                    return
                }
                this.dialogTable.data = []
                this.dialogTable.listLoading = true
                await warmExport({
                    alarmTaskIds: this.alarmTaskIds,
                    alarmTypeId: this.warnmoDelId,
                    alarmTaskName: alarmTaskName,
                    startTime: startTime,
                    endTime: endTime
                })
                    .then(resp => {
                        let { data } = resp
                        this.dialogTable.data = data.map(item => {
                            item.allTime = `${item.startTime}---${item.endTime}`
                            return item
                        })
                    })
                    .catch(error => {
                        this.dialogTable.data = []
                        console.log(error)
                    })
                this.dialogTable.listLoading = false
            },
            showDialogFun (val) {
                this.dialogVisible = val;
                this.warmExportFun()
            },
            dialogChange (val) {
                this.dialogVisible = val;
            },
            getResourceIds(val) {
                this.getResourceIdStr = val;
            },
            // 从路由中获取相关参数AND设置每个界面
            setTitle () {
                if (this.$route.params.eventName !== undefined) {
                    localStorage.setItem('eventName', this.$route.params.eventName)
                    localStorage.setItem('alarmName', this.$route.params.alarmName)
                    localStorage.setItem('alarmTaskIds', this.$route.params.alarmTaskIds)
                    localStorage.setItem('alarmTaskIdList', this.$route.params.alarmTaskIdList)
                    localStorage.setItem('alarmId', this.$route.params.alarmId)
                }
                this.eventName = localStorage.getItem('eventName')
                this.warnName = localStorage.getItem('alarmName')
                this.alarmTaskIds = localStorage.getItem('alarmTaskIds')
                // this.alarmTaskIds = '2152, 2507, 2508'
                this.alarmTaskIdList = localStorage.getItem('alarmTaskIdList')
                this.warnmoDelId = Number(localStorage.getItem('alarmId'))
                // this.warnmoDelId = Number(this.warnmoDelId)
                this.getResLoadData()
                if ([1, 3, 6, 7].includes(this.warnmoDelId)) {
                    this.isTable = true
                    this.tableRight.title1 = `${this.warnName}详情`
                } else if ([2, 4, 5, 8, 9, 10, 11].includes(this.warnmoDelId)) {
                    this.isTable = false
                    if (this.warnmoDelId === 9) {
                        this.TextOpt.title1 = `${this.warnName}详情`
                    } else {
                        this.TextOpt.title1 = `详情面板`
                    }
                    this.TextOpt.warnmoDelId = this.warnmoDelId
                }
                if ([1, 2, 3, 4, 5, 6, 7, 11].includes(this.warnmoDelId)) {
                    this.isPart = true
                    this.isMapShow = true
                } else if ([8, 10].includes(this.warnmoDelId)) {
                    this.isPart = true
                    this.isMapShow = false
                } else if ([9].includes(this.warnmoDelId)) {
                    this.isPart = false
                    this.isMapShow = false
                }
                this.BigwarnmoDelId = this.warnmoDelId
            },
            // 漫入出现告警右下小地图------画地图AND连线
            createInMap () {
                let { gMapCenterRvrovice } = this.mapCenter
                let map = new BMap.Map(this.smallMapId[2], { minZoom: 3, maxZoom: this.gMapMaxZoom })
                this.inMap = map
                map.centerAndZoom(new BMap.Point(gMapCenterRvrovice[0], gMapCenterRvrovice[1]), 7);
                map.enableScrollWheelZoom();
                // this.getBoundary()
            },
            createInPoint (data) {
                let map = this.inMap
                map.clearOverlays();
                let pointLine = [];
                let pointsArr = [];
                for (let i = 0; i < data.length; i++) {
                    pointsArr.push({
                        lng: data[i].longtitude,
                        lat: data[i].latitude
                    })
                }
                if (data.length === 1) {
                    map.centerAndZoom(new BMap.Point(data[0].longtitude, data[0].latitude), 7);
                } else {
                    let view = map.getViewport(pointsArr);
                    map.centerAndZoom(view.center, view.zoom);
                }
                for (let i = 0; i < data.length; i++) {
                    let points = new BMap.Point(data[i].longtitude, data[i].latitude)
                    let myIcon = new BMap.Icon(this.icon[0], new BMap.Size(25, 29))
                    let marker = new BMap.Marker(points, { icon: myIcon })
                    map.addOverlay(marker)
                    pointLine.push(points)
                }
                if (pointLine.length > 1) {
                    let polyline = new BMap.Polyline(pointLine, { strokeColor: '#f00',
                        strokeWeight: 2, strokeOpacity: 0.9 })
                    map.addOverlay(polyline)
                }
            },
            getfun (fn, arg) {
                return fn.apply(this, [arg])
            },
            handleSizePageChange (val) {
                this.tableLeft.tableBottom.pageOpt.pageSize = val
                this.tableLeft.tableBottom.pageOpt.currentPage = 1
                this.getPageloadData()
            },
            handleCurrentPageChange (val) {
                this.tableLeft.tableBottom.pageOpt.currentPage = val
                this.getPageloadData()
            },
            //  分页按钮
            async getPageloadData () {
                if (this.tableLeft.isOpen) {
                    this.tableLeft.tableBottom.listLoading = true
                }
                const funArray1 = [tarInAreaResLoad, tarInOutResLoad, tarOffResLoad,
                    tarFlowResLoad, tarDisResLoad, tarJoinResLoad,
                    tarTraResLoad, tarFlowInAreaResLoad, tarFlowNationResLoad,
                    tarFlowOutProvResLoad, tarCityAreaResLoad]
                let respData = {
                    'alarmTaskIds': this.alarmTaskIds === 'null' ? 0 : this.alarmTaskIds,
                    'type': 1,
                    'page': this.tableLeft.tableBottom.pageOpt.currentPage,
                    'rows': this.tableLeft.tableBottom.pageOpt.pageSize
                }
                let resp = await this.getfun(funArray1[this.warnmoDelId - 1], respData)
                if (resp.data.list2) {
                    this.tableLeft.tableBottom.pageOpt.total = resp.data.list2.total
                    this.tableLeft.tableBottom.data = resp.data.list2.rows
                }
                this.tableLeft.tableBottom.listLoading = false
            },
            // 告警表格
            async getResLoadData () {
                // 初始化标题
                this.tableLeft.title1 = `${this.warnName}`
                if (this.tableLeft.isOpen) {
                    this.tableLeft.tableTop.listLoading = true
                    this.tableLeft.tableBottom.listLoading = true
                }
                const funArray1 = [tarInAreaResLoad, tarInOutResLoad, tarOffResLoad,
                    tarFlowResLoad, tarDisResLoad, tarJoinResLoad,
                    tarTraResLoad, tarFlowInAreaResLoad, tarFlowNationResLoad,
                    tarFlowOutProvResLoad, tarCityAreaResLoad]
                // this.taskBaseId------, 'warnmoDelId': this.warnmoDelId
                let respData = {
                    'alarmTaskIds': this.alarmTaskIds === 'null' ? 0 : this.alarmTaskIds,
                    'type': 0,
                    'page': this.tableLeft.tableBottom.pageOpt.currentPage,
                    'rows': this.tableLeft.tableBottom.pageOpt.pageSize
                }
                let resp = await this.getfun(funArray1[this.warnmoDelId - 1], respData)
                if (resp.data.list1 && resp.data.list2) {
                    this.tableLeft.tableTop.listLoading = false;
                    this.tableLeft.tableBottom.listLoading = false;
                    let realTimeData = resp.data.list1
                    let historyData = resp.data.list2.rows
                    // this.AlarmAllData = resp.data
                    // resp.data.map(v => {
                    //     if (v.alarmStatus === '1') {
                    //         realTimeData.push(v)
                    //     } else {
                    //         historyData.push(v)
                    //     }
                    // })
                    // this.wnum = realTimeData.length
                    this.tableLeft.tableBottom.pageOpt.total = resp.data.list2.total
                    this.tableLeft.tableBottom.data = historyData
                    this.unTableData = realTimeData
                    this.getRealTimeData(realTimeData)
                } else {
                    this.tableLeft.tableTop.listLoading = false;
                    this.tableLeft.tableBottom.listLoading = false;
                }
                // this.getDetailData()
            },
            // webscoket
            webscoket () {
                // 与后端建立 socket 连接
                this.socket.connect(this.webscoketURL)
                // 0表示尚未链接，1表示连接已建立，可以进行通信，2表示连接正在进行关闭， 表示连接已经关闭或者连接不能打开
                // 监听连接是否建立
                this.socket.on('open', () => {
                    // 连接建立后触发此事件
                    // 将字符串alarmTaskIdList转化为数组
                    let alarmTaskIdsArr = this.alarmTaskIdList.split(',').map(item => {
                        return Number(item)
                    })
                    let alarmId = {};
                    let arr = [];
                    let obj = {
                        alarmTaskId: alarmTaskIdsArr,
                        alarmTypeId: this.warnmoDelId
                    };
                    arr.push(obj);
                    alarmId.data = arr;
                    // 触发自定义事件，传递的数据为对象，对象里面的数据为数组
                    this.socket.emit('webScoketData', alarmId);
                })
                // 监听事件
                this.socket.on('message', resp => {
                    // 对接收到的数据进行转换
                    let data = this.socket.JSONparse(resp.data);
                    // 接收到后端传过来得数据时对数据包得标签进行判断，判断条件为 emit 中的 eventName
                    if (data && data.alarmTypeId === this.warnmoDelId) {
                        let leftTableData = {
                            'alarmTaskName': data.alarmDetailsJson.alarmTaskName,
                            'alarmTime': data.alarmDetailsJson.alarmTime,
                            'resourceId': data.alarmDetailsJson.alarmResultId,
                            'alarmStatus': data.alarmDetailsJson.alarmStatus,
                            'alarmCount': data.alarmDetailsJson.alarmCount
                            // action貌似没啥用
                            // 'action': data.action
                        }
                        this.unTableData.unshift(leftTableData)
                        // this.unTableData = realTimeData
                        // this.wnum = leftTableData.alarmCount
                        this.tableLeft.tableTop.data = []
                        // this.warnLength = 1;
                        this.getRealTimeData(this.unTableData)
                    }
                })
            },
            // WEBSCOKET方法
            getRealTimeData (data) {
                this.wnum = data.length
                this.tableLeft.title1 = `${this.warnName} ${this.wnum}个`
                this.tableLeft.tableTop.data = data
                if (data.length >= 1) {
                    let { resourceId, alarmTaskName, alarmTime } = data[0]
                    this.detailID = resourceId
                    this.detailText = alarmTaskName
                    this.detailTime = alarmTime
                    // this.getDetailData()
                }
                // 改变高亮行
                // if (this.warnLength === 1) {
                //     this.tdIndex ++;
                //     console.log(this.tdIndex, $('.current-row').parent()[0].children)
                //     this.tdTarget = $('.current-row').parent()[0].children[this.tdIndex]
                //     $('.current-row').removeClass('current-row')
                //     $(this.tdTarget).addClass('current-row')
                // }
                // this.getDetailData()
            },
            // 处置点击事件
            disposeClick (row, index, e) {
                if (this.canChange === true) {
                    e.stopPropagation()
                    this.tableLeft.tableBottom.pageOpt.currentPage = 1
                    this.disposeID = row.resourceId
                    this.tableRight.isOpen = false
                    this.TextOpt.isOpen = false
                    this.getDisposeData()
                } else {
                    e.stopPropagation()
                    this.$alert('非在控任务不可处置')
                    return
                }
            },
            // 处置接口
            async getDisposeData () {
                const funArray3 = [tarInAreaAlaDispose, tarInOutAlaDispose, tarOffAlaDispose,
                    tarFlowAlaDispose, tarDisAlaDispose, tarJoinAlaDispose,
                    tarTraAlaDispose, tarFlowInAreaAlaDispose, tarFlowNationAlaDispose,
                    tarFlowInProvAlaDispose, tarCityAreaAlaDispose]
                let resp = await this.getfun(funArray3[this.warnmoDelId - 1], { 'resourceIds': this.disposeID })
                if (resp) {
                    if (resp.status === 201) {
                        // 处置成功后刷新实时和历史表格
                        this.getResLoadData()
                    }
                }
            },
            // 批量处置接口
            async getDisposeAllData () {
                this.tableLeft.tableBottom.pageOpt.currentPage = 1
                this.tableRight.isOpen = false
                this.TextOpt.isOpen = false
                const funArray3 = [tarInAreaAlaDispose, tarInOutAlaDispose, tarOffAlaDispose,
                    tarFlowAlaDispose, tarDisAlaDispose, tarJoinAlaDispose,
                    tarTraAlaDispose, tarFlowInAreaAlaDispose, tarFlowNationAlaDispose,
                    tarFlowInProvAlaDispose, tarCityAreaAlaDispose]
                let resp = await this.getfun(
                    funArray3[this.warnmoDelId - 1],
                    { 'resourceIds': this.getResourceIdStr }
                )
                if (resp) {
                    if (resp.status === 201) {
                        // 处置成功后刷新实时和历史表格
                        this.getResLoadData()
                    }
                }
            },
            // 右边分页
            // handleCurrentPageChange (val) {
            //     this.page = val
            //     this.getDetailData()
            // },
            // 详情表格更新
            async getDetailData () {
                this.tableRight.tableTop.data = []
                if (this.isTable && this.tableRight.isOpen) {
                    this.tableRight.tableTop.listLoading = true
                }
                const funArray4 = [tarInAreaAlaDetail, tarInOutAlaDetail, tarOffAlaDetail,
                    tarFlowAlaDetail, tarDisAlaDetail, tarJoinAlaDetail,
                    tarTraAlaDetail, tarFlowInAreaAlaDetail, tarFlowNationAlaDetail,
                    tarFlowInProvAlaDetail, tarCityAreaDetail]
                let resp = await this.getfun(funArray4[this.warnmoDelId - 1], { 'resourceId': this.detailID })
                let { data } = resp
                // let { alarmMsisdn, alarmArea } = data
                if (data) {
                    let tableRightData = []
                    let cityPointArr = []
                    if (!(data.alarmMsisdn instanceof Array)) {
                        let aramMsisdnTest = data.alarmMsisdn
                        data.alarmMsisdn = []
                        data.alarmMsisdn.push(aramMsisdnTest)
                    }
                    let { alarmMsisdn, alarmArea } = data
                    alarmMsisdn.forEach((item, index) => {
                        let { goalLocations, msisdn, name, alarmInfo } = item
                        let length
                        let TimeCname
                        if (goalLocations.length) {
                            item.goalLocations = goalLocations.filter(item => {
                                let { longtitude, latitude } = item
                                let bool = this.isPoint(longtitude, latitude)
                                if (bool) {
                                    return item
                                }
                            })
                            length = goalLocations.length
                            TimeCname = goalLocations[length - 1]
                            tableRightData[index] = {
                                'goalArriveTime': TimeCname.goalArriveTime,
                                'locationCname': TimeCname.locationCname,
                                'lac': TimeCname.lac,
                                'ci': TimeCname.ci,
                                'msisdn': msisdn,
                                'name': name,
                                'alarmInfo': alarmInfo
                            }
                        } else {
                            tableRightData[index] = {
                                // 没有点的时候显示----
                                'goalArriveTime': '----',
                                'locationCname': '----',
                                'lac': '----',
                                'ci': '----',
                                'msisdn': msisdn,
                                'name': name,
                                'alarmInfo': alarmInfo
                            }
                        }
                    })
                    if ([2, 4, 5, 8, 10, 11].includes(this.warnmoDelId)) {
                        this.TextOpt.name = tableRightData[0].name
                        this.TextOpt.phoneNumber = tableRightData[0].msisdn
                        this.TextOpt.content = tableRightData[0].alarmInfo
                    }
                    let me = this
                    // this.tableHeight = tableRightData;
                    switch (this.warnmoDelId) {
                        case 1:
                            // 目标进入区域告警
                            this.tableRight.tableTop.column = [
                                { name: '序号', value: 'index', width: 40, align: 'center' },
                                { name: '姓名', value: 'name', width: 60, align: 'center', tooltip: true },
                                { name: '手机号', value: 'msisdn', width: 80, align: 'center', tooltip: true },
                                { name: '进入时间', value: 'goalArriveTime', width: 80, align: 'center', tooltip: true },
                                { name: '进入位置', value: 'locationCname', tooltip: true, align: 'center', width: 80 },
                                { name: 'LAC', value: 'lac', width: 60, align: 'center', tooltip: true },
                                { name: 'CI', value: 'ci', align: 'center', tooltip: true }]
                            this.tableRight.tableTop.data = tableRightData
                            // this.tableRight.tableTop.pageOpt.total = tableRightData.length
                            this.tableRight.tableTop.listLoading = false
                            this.tableRight.tableTop.rowClick = function (row, event) {
                                event.stopPropagation()
                                me.$refs.mapPart.gettarMsisdn(row.msisdn)
                            }
                            this.mapDataPart = {
                                alarmArea: alarmArea,
                                alarmMsisdn: alarmMsisdn,
                                warnmoDelId: this.warnmoDelId
                            }
                            break;
                        case 2:
                            // 目标进入离开告警
                            this.mapDataPart = {
                                // time: 'realTime',
                                alarmArea: alarmArea,
                                // alarmArea: [],
                                alarmMsisdn: alarmMsisdn,
                                warnmoDelId: this.warnmoDelId
                                // center: resp.data.borderInfo
                            }
                            break;
                        case 3:
                            // 目标关机告警
                            this.tableRight.tableTop.column = [
                                { name: '序号', value: 'index', width: 40, align: 'center' },
                                { name: '姓名', value: 'name', width: 60, align: 'center', tooltip: true },
                                { name: '手机号', value: 'msisdn', width: 80, align: 'center', tooltip: true },
                                { name: '关机时间', value: 'goalArriveTime', width: 80, align: 'center', tooltip: true },
                                { name: '关机位置', value: 'locationCname', tooltip: true, align: 'center', width: 80 },
                                { name: 'LAC', value: 'lac', width: 60, align: 'center', tooltip: true },
                                { name: 'CI', value: 'ci', align: 'center', tooltip: true }
                            ]
                            this.tableRight.tableTop.data = tableRightData
                            // this.tableRight.tableTop.pageOpt.total = tableRightData.length
                            this.tableRight.tableTop.listLoading = false
                            this.tableRight.tableTop.rowClick = function (row, event) {
                                event.stopPropagation()
                                me.$refs.mapPart.gettarMsisdn(row.msisdn)
                            }
                            this.mapDataPart = {
                                alarmArea: alarmArea,
                                alarmMsisdn: alarmMsisdn,
                                warnmoDelId: this.warnmoDelId
                            }
                            break;
                        case 4:
                            // 目标漫入告警
                            // 右下角画点, 将点集放入cityPointArr
                            let { goalLocations } = alarmMsisdn[0]
                            goalLocations.forEach((items, indexs) => {
                                let { latitude, longtitude } = items
                                cityPointArr[indexs] = {
                                    'latitude': latitude,
                                    'longtitude': longtitude
                                }
                            })
                            // alarmMsisdn数组，删除某一点，大地图只显示最新点
                            // 点数大于一做处理
                            if (goalLocations.length > 1) {
                                goalLocations.splice(0, 1)
                            }
                            // 目标漫入详情
                            this.createInMap()
                            // 画漫入预警右下角小地图中的点和线
                            this.createInPoint(cityPointArr)
                            this.mapDataPart = {
                                alarmArea: alarmArea,
                                alarmMsisdn: alarmMsisdn,
                                warnmoDelId: this.warnmoDelId
                            }
                            break;
                        case 5:
                            // 目标消失详情
                            this.mapDataPart = {
                                alarmArea: alarmArea,
                                alarmMsisdn: alarmMsisdn,
                                warnmoDelId: this.warnmoDelId
                            }
                            break;
                        case 6:
                            // 目标接头告警
                            this.tableRight.tableTop.column = [
                                { name: '序号', value: 'index', width: 40, align: 'center' },
                                { name: '姓名', value: 'name', width: 60, align: 'center', tooltip: true },
                                { name: '手机号', value: 'msisdn', width: 80, align: 'center', tooltip: true },
                                { name: '聚集时间', value: 'goalArriveTime', width: 80, align: 'center', tooltip: true },
                                { name: '位置', value: 'locationCname', tooltip: true, align: 'center', width: 80 },
                                { name: 'LAC', value: 'lac', width: 60, align: 'center', tooltip: true },
                                { name: 'CI', value: 'ci', align: 'center', tooltip: true }
                            ]
                            this.tableRight.tableTop.data = tableRightData
                            // this.tableRight.tableTop.pageOpt.total = tableRightData.length
                            this.tableRight.tableTop.listLoading = false
                            // 暂时取消标题
                            // this.tableRight.subtitle = `${this.detailTime}在${tableRightData[0].locationCname}有${this.detailText}`
                            this.tableRight.tableTop.rowClick = function (row, event) {
                                event.stopPropagation()
                                me.$refs.mapPart.gettarMsisdn(row.msisdn)
                            }
                            this.mapDataPart = {
                                // time: 'realTime',
                                alarmArea: alarmArea,
                                alarmMsisdn: alarmMsisdn,
                                warnmoDelId: this.warnmoDelId
                                // center: resp.data.borderInfo
                            }
                            break;
                        case 7:
                            // 目标实时跟踪告警
                            this.tableRight.tableTop.column = [
                                { name: '序号', value: 'index', width: 40, align: 'center' },
                                { name: '姓名', value: 'name', width: 60, align: 'center', tooltip: true },
                                { name: '时间', value: 'goalArriveTime', width: 80, align: 'center', tooltip: true },
                                { name: '位置', value: 'locationCname', widthType: true, align: 'center', width: 160, tooltip: true },
                                { name: 'LAC', value: 'lac', width: 60, align: 'center', tooltip: true },
                                { name: 'CI', value: 'ci', width: 60, align: 'center', tooltip: true }]
                            this.tableRight.tableTop.data = tableRightData
                            // this.tableRight.tableTop.pageOpt.total = tableRightData.length
                            this.tableRight.tableTop.listLoading = false
                            this.mapDataPart = {
                                // time: 'realTime',
                                alarmArea: alarmArea,
                                alarmMsisdn: alarmMsisdn,
                                warnmoDelId: this.warnmoDelId
                            }
                            break;
                        case 8:
                            // 关闭一次弹框
                            this.popoverRight = false;
                            this.popoverLeft = false;
                            // 目标省内漫出告警
                            // this.createSmallMap(alarmMsisdn[0].goalLocations)
                            alarmMsisdn[0].goalLocations.forEach((items, indexs) => {
                                let { latitude, longtitude } = items
                                cityPointArr[indexs] = {
                                    'latitude': latitude,
                                    'longtitude': longtitude
                                }
                            })
                            this.createInMap()
                            this.createInPoint(cityPointArr)
                            // this.createPoint(alarmMsisdn[0], alarmMsisdn[0].goalLocations, alarmMsisdn[0].name, alarmMsisdn[0].msisdn)
                            this.mapData = {
                                info: alarmMsisdn[0],
                                warnmoDelId: this.warnmoDelId
                            }
                            break;
                        case 9:
                            // 区域人群异常告警
                            // this.createSmallMap()
                            // this.createPoint()
                            /**
                             * 模拟数据 pointHotArrs ---> center 热力图显示点
                             * 模拟数据 pointNineArea ---> alarmMsisdn 区域点
                             */
                            let pointNineArea = []
                            let pointHotArrs = []
                            let goalLocationsData = alarmMsisdn[0].goalLocations
                            this.TextOpt.lineDataArr.splice(0, this.TextOpt.lineDataArr.length)
                            // let arr = [];
                            // for (var i = 0; i < 10000; i++) {
                            //     let obj = {};
                            //     let num = Math.floor(Math.random() * 300);
                            //     obj.name = i;
                            //     obj.type = 'ss';
                            //     obj.value = num;
                            //     arr.push(obj);
                            // }
                            // alarmMsisdn[0].graphs = arr;
                            for (let i in alarmMsisdn[0].graphs) {
                                this.TextOpt.lineDataArr.push(alarmMsisdn[0].graphs[i])
                            }
                            // 判断区域 圆 或 不规则图形
                            if (data.alarmArea.length === 1) {
                                pointNineArea = data.alarmArea
                            } else {
                                for (let i in data.alarmArea) {
                                    pointNineArea.push({
                                        latitude: data.alarmArea[i].latitude,
                                        longtitude: data.alarmArea[i].longtitude
                                    })
                                }
                            }
                            // 绘制热力图点位
                            for (let i in goalLocationsData) {
                                pointHotArrs.push({
                                    lat: goalLocationsData[i].latitude,
                                    lng: goalLocationsData[i].longtitude,
                                    count: goalLocationsData[i].msisdn
                                })
                            }
                            this.TextOpt.content = data.alarmMsisdn[0].alarmInfo
                            // 重置热力图点位数据格式
                            this.mapData = {
                                // info: alarmMsisdn[0],
                                warnmoDelId: this.warnmoDelId,
                                center: pointHotArrs,
                                alarmArea: pointNineArea
                            }
                            break;
                        case 10:
                            // 关闭一次弹框
                            this.popoverRight = false;
                            this.popoverLeft = false;
                            alarmMsisdn[0].goalLocations.forEach((items, indexs) => {
                                let { latitude, longtitude } = items
                                cityPointArr[indexs] = {
                                    'latitude': latitude,
                                    'longtitude': longtitude
                                }
                            })
                            this.createInMap()
                            this.createInPoint(cityPointArr)
                            // 目标省际漫出告警
                            // this.createSmallMap(alarmMsisdn[0].goalLocations)
                            // this.createPoint(alarmMsisdn[0], alarmMsisdn[0].goalLocations, alarmMsisdn[0].name, alarmMsisdn[0].msisdn)
                            this.mapData = {
                                info: alarmMsisdn[0],
                                warnmoDelId: this.warnmoDelId
                            }
                            break;
                        case 11:
                            let pointArea = []
                            let goalLocs = alarmMsisdn[0].goalLocations
                            // 判断区域 圆 或 不规则图形
                            if (data.alarmArea.length === 1) {
                                pointArea = data.alarmArea
                            } else {
                                for (let i in data.alarmArea) {
                                    pointArea.push({
                                        latitude: data.alarmArea[i].latitude,
                                        longtitude: data.alarmArea[i].longtitude
                                    })
                                }
                            }
                            // 目标漫入告警
                            // 右下角画点, 将点集放入cityPointArr
                            goalLocs.forEach((items, indexs) => {
                                let { latitude, longtitude } = items
                                cityPointArr[indexs] = {
                                    'latitude': latitude,
                                    'longtitude': longtitude
                                }
                            })
                            // alarmMsisdn数组，删除某一点，大地图只显示最新点
                            // 点数大于一做处理
                            if (goalLocs.length > 1) {
                                goalLocs.splice(0, 1)
                            }
                            // 目标漫入详情
                            this.createInMap()
                            // 画漫入预警右下角小地图中的点和线
                            this.createInPoint(cityPointArr)
                            this.mapDataPart = {
                                alarmArea: pointArea,
                                alarmMsisdn: alarmMsisdn,
                                warnmoDelId: this.warnmoDelId
                            }
                            break;
                    }
                }
            },
            // 判断是否去这个点
            isPoint(lat, lng) {
                let reg = /^[0-9]+.?[0-9]*$/
                if (reg.test(lat) && reg.test(lng)) {
                    return true
                } else {
                    return false
                }
            },
            // 为省内漫出告警和省际漫出告警界面创建下方两个小地图
            createSmallMap (points) {
                // 只有一个点，显示到达
                if (points.length === 1) {
                    this.createMap(this.smallMapId[1], this.zoom, points[0])
                } else if (points.length > 1) {
                    this.createMap(this.smallMapId[0], this.zoom, points[0])
                    this.createMap(this.smallMapId[1], this.zoom, points[1])
                }
            },
            createMap (mapId, zoom, pointObj) {
                let map = new BMap.Map(mapId)
                let point = new BMap.Point(pointObj.longtitude, pointObj.latitude)
                if (mapId === this.smallMapId[0]) {
                    this.leftMap = map
                    map.centerAndZoom(point, zoom)
                } else if (mapId === this.smallMapId[1]) {
                    this.rightMap = map
                    map.centerAndZoom(point, zoom)
                }
                map.enableScrollWheelZoom();
            },
            // 给两个小地图画点
            createPoint (info, points, name, msisdn) {
                // 只有一个点，显示到达？离开
                if (points.length === 1) {
                    this.createPointCommon(this.smallMapId[1], info, points[0], name, msisdn)
                } else if (points.length > 1) {
                    this.createPointCommon(this.smallMapId[0], info, points[0], name, msisdn)
                    this.createPointCommon(this.smallMapId[1], info, points[1], name, msisdn)
                }
            },
            createPointCommon (mapId, info, pointCenter, name, msisdn) {
                let map = ''
                let flag;
                if (mapId === this.smallMapId[0]) {
                    map = this.leftMap
                    flag = 0;
                } else if (mapId === this.smallMapId[1]) {
                    map = this.rightMap
                    flag = 1;
                }
                let point = new BMap.Point(pointCenter.longtitude, pointCenter.latitude)
                map.centerAndZoom(point, 15)
                let marker = new BMap.Marker(point)
                map.addOverlay(marker)
                marker.addEventListener('click', (e) => {
                    if (flag === 0) {
                        this.openInfo(info, 0)
                    } else {
                        this.openInfo(info, 1)
                    }
                    e = e || window.event
                    let nowX = e.clientX - 20
                    let nowY = e.clientY - 130
                    if (flag === 0) {
                        this.location(nowX, nowY, 0)
                    } else {
                        this.location(nowX, nowY, 1)
                    }
                })
                let label = new BMap.Label(name + ' ' + msisdn +
                '<br/>' + pointCenter.goalArriveTime, { offset: new BMap.Size(20, 20) })
                let style = {
                    backgroundColor: '#f00',
                    color: '#fff',
                    fontSize: '14px',
                    padding: '4px 8px',
                    opacity: 0.9
                }
                label.setStyle(style);
                marker.setLabel(label)
            },
            // 生成随机颜色的函数
            ranColor () {
                let r = Math.floor(Math.random() * 240)
                let g = Math.floor(Math.random() * 240)
                let b = Math.floor(Math.random() * 240)
                return 'rgb(' + r + ',' + g + ',' + b + ')'
            },
            // 对弹出表格信息赋值 -- 为省内漫出告警
            openInfo (content, j) {
                let popover;
                if (j === 0) {
                    this.popoverLeft = true;
                    popover = this.$refs.popoverLeft
                } else {
                    this.popoverRight = true;
                    popover = this.$refs.popoverRight
                }
                // this.curTitle = this.title[0]
                let locationInfo = content
                if (locationInfo.length === 0) {
                    $(popover).css({ 'height': '28px', 'width': '160px' })
                } else {
                    let info = []
                    // let point = content.curLng + ',' + content.curLat
                    let state = []
                    let location = []
                    // 只有一个点的时候，显示到达，下标取1， 所以头插一个值
                    if (locationInfo.goalLocations.length === 1) {
                        locationInfo.goalLocations.unshift('');
                    }
                    if (j === 0) {
                        state = ['离开时间', locationInfo.goalLocations[0].goalArriveTime]
                        location = ['离开位置', locationInfo.goalLocations[0].locationCname]
                    } else if (j === 1) {
                        state = ['到达时间', locationInfo.goalLocations[1].goalArriveTime]
                        location = ['到达位置', locationInfo.goalLocations[1].locationCname]
                    }
                    if (this.isPhoneJM) {
                        locationInfo.msisdn = phoneNumChange(locationInfo.msisdn)
                    }
                    info.push(['姓名', locationInfo.name], ['手机号', locationInfo.msisdn],
                        ['卡号', locationInfo.imsi], ['机身码', locationInfo.imei],
                        ['LAC', locationInfo.goalLocations[j].lac],
                        ['CI', locationInfo.goalLocations[j].ci], state, location)
                    $('.ga-popover').css({ 'height': 'auto' })
                    $('.ga-map').css({ 'height': 'auto' })
                    // 分开绑定数据，离开和到达不会被混淆
                    if (j === 0) {
                        this.tableInfo0 = info
                    } else {
                        this.tableInfo1 = info
                    }
                }
            },
            // 关闭弹出表格函数 -- 为省内漫出告警
            close (flag) {
                if (flag === 0) {
                    this.popoverLeft = false
                } else {
                    this.popoverRight = false
                }
            },
            // 给弹出表格进行定位 -- 为省内漫出告警
            location (nowX, nowY, flag) {
                this.$nextTick(() => {
                    if (flag === 0) {
                        this.$refs.popoverLeft.style.left = 4 + 'px'
                        this.$refs.popoverLeft.style.top = 0 + 'px'
                    } else {
                        this.$refs.popoverRight.style.left = 0 + 'px'
                        this.$refs.popoverRight.style.top = 0 + 'px'
                    }
                })
            }
            // 漫入出现告警--------画行政区域
        /* getBoundary () {
                let provices = NINGXIAAROUND
                let ctiys = NINGXIACITIES
                // #389BB7
                this.getBoundaryDetail(ctiys, '#fff', 'rgb(50,131,205)')
                this.getBoundaryDetail(provices, '#fff', '#fff')
            },
            getBoundaryDetail (names, strokeColor, fillColor) {
                let map = this.inMap
                let bdary = new BMap.Boundary()
                for (let i = 0; i < names.length; i++) {
                    bdary.get(names[i], function (rs) {
                        let count = rs.boundaries.length
                        if (count === 0) {
                            alert('未能获取当前输入行政区域');
                            return
                        }
                        for (let j = 0; j < count; j++) {
                            let ply = new BMap.Polygon(rs.boundaries[j],
                                { strokeWeight: 1, strokeColor: strokeColor, fillColor: fillColor, fillOpacity: 1 })
                            ply.disableMassClear()
                            map.addOverlay(ply)
                        }
                    })
                }
            },*/
        }
    }
</script>

<style scoped>
    .ga-popover {
        position: absolute;
        color: #fff;
        font-size: 12px;
        z-index: 1000;
        overflow:hidden;
    }
    .ga-popover tr{
        width: 160px;
        line-height: 18px;
    }
    .ga-map {
        height: auto;
    }
    .ga-map table tr td:last-child{
        max-width: 150px;
        line-height: 18px;
        height: auto;
        word-wrap: break-word;
    }
    .ga-map table tr td:first-child{
        width: 56px;
        line-height: 18px;
        height: auto;
        padding: 0 5px 0 0;
    }
    .ga-map table td{
        padding:2px 5px;
    }
    .ga-map table td:first-child{
        text-align: right;
    }
    .ga-map table td:last-child{
        text-align: left;
    }
    .topP{
        text-align: right;
        height: 18px;
        line-height:18px;
        font-size:12px;
        padding-right:6px;
        background: rgba(9,94,179,0.8);
    }
    .ga-close {
        float:right;
        width: 18px;
        text-align:center;
        cursor: pointer;
    }
    .ga-close:hover{
        transform:rotateZ(360deg);
        -moz-transform:rotateZ(360deg); 
        -webkit-transform:rotateZ(360deg);
        -o-transform:rotateZ(360deg);
    }
    .ga-map{
        height:162px;
        padding-top:6px;
        background: rgba(0,0,0,0.7);
    }
    .ga-map table {
        width: 100%;
    }
    #leftMap {
        width: 398px;
        height: 238px;
        position: absolute;
        box-shadow:4px -4px 9px rgba(0,0,0,0.5);
    }
    #rightMap {
        width: 398px;
        height: 238px;
        position: absolute;
        box-shadow:-4px -4px 9px rgba(0,0,0,0.5);
    }
    #inMinMap {
        width: 348px;
        height: 258px;
        position: absolute;
        box-shadow:-4px -4px 9px rgba(0,0,0,0.5);
    }
    .small_p {
        position: absolute;
        top:0;
        display:block;
        width:400px;
        height:28px;
        line-height:28px;
        padding-left:8px;
        font-size:14px;
        color:#eee;
        background: rgba(21,52,162,.6);
        z-index:1;
    }
    .ga-checkbox {
        /* width: 300px; */
        height: 30px;
        padding: 0 12px;
        background: rgba(17,97,145,1);
        border: 1px solid #028AD5;
        position: absolute;
        top: 5px;
        left: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    }
/*    .ga-checkbox::before {
        content: "";
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        top: 0;
        left: -20px;
        border-top: 15px solid transparent;
        border-bottom: 15px solid transparent;
        border-right: 20px solid rgba(0,0,0,0.7);
    }
    .ga-checkbox::after {
        content: "";
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        top: 0;
        right: -20px;
        border-top: 15px solid transparent;
        border-bottom: 15px solid transparent;
        border-left: 20px solid rgba(0,0,0,0.7);
    }*/
    .ga-checkbox__child {
        margin-left: 5px;
        color: #fff;
    }
    @component-namespace ga {
        @b warningInArea{
            font-family:'Microsoft YaHei';
            @e leftSmallMap {
                position: absolute;
                bottom:-4px;
                left: 0;
                height:240px;
                width:400px;
                float:left;
                /*border:1px solid rgb(21,52,162);*/
                overflow: hidden;
            }
            @e rightSmallMap {
                position: absolute;
                bottom: -4px;
                right: 0;
                height: 240px;
                width: 400px;
                float: right;
                /*border: 1px solid rgb(21, 52, 162)*/
            }
            @e inMinMap {
                position: absolute;
                bottom: -10px;
                right: 0;
                height: 260px;
                width: 350px;
                float: right;
                /*border: 1px solid rgb(21, 52, 162)*/
            }
            @e container {
                height: 100%;
                position:relative;
            }
            @e bodyTitle{
                width: 12%;
                height: 20px;
                margin: 0 auto;
                color: #fff;
                text-align: center;
                padding-right: 10px;
                font-size: 1.2em;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            @e eventHeader {
                height: 26px;
                width: 100%;
                margin-bottom:5px;
                margin-top:-26px;
                overflow: hidden;
            }
            @e eventTitle{
                color: #fff;
                padding: 0 10px;
                height: 24px;
                line-height: 26px;
                font-size:14px;
                display: inline-block;
                float: left;
            }
            @e eventWarning{
                color: #e54545;
                background: url("~assets/images/warning/warning.png") no-repeat 0 center;
                float: left;
                width: 70px;
                height: 22px;
                padding-left:26px;
                font-size:14px;
            }
            @e giscontainer {
                /* width: 100%;
                height: calc(100% - 36px); */
                background-origin: content-box;
                position: relative;
                width: calc(100% + 20px);
                height: calc(100% + 10px);
                top: -6px;
                left: -10px;
            }
            @e gis {
                /* background: url("~assets/images/warning/gis.png") no-repeat 0 center; */
                /* background-size: 100% 100%;  */
                width: 100%;
                height: 100%;
            }
            @e leftTable {
                width: 450px;
                position: absolute;
                left:15px;
                top:40px;
                z-index: 99;
            }
            @e rightTable {
                width: 490px;
                position: absolute;
                right:15px;
                top:5px;
                z-index: 99;
            }
        }
    }
    .ga-mapSty {
        top: -4px;
    }
</style>
