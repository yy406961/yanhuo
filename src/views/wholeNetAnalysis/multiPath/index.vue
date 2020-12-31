<template>
    <div class="multiPath-common">
        <div class="ga-mapSty__btn">
            <formSelect :option='tarSelect'></formSelect>
        </div>
        <history v-if="!isMultiPath" ref="history" :part="part" :owner="owner" :isMultiPath="isMultiPath" :selectObj="selectObj"></history>
        <div v-if="isMultiPath" class="multiPath-common" style="position: relative">
            <div class="multiPath-center smallNotLong">
                <el-radio-group :disabled="radioDisabled" v-model="radioVal">
                    <el-radio :label=0>时序</el-radio>
                    <span class="multiPath-center__label">第</span>
                    <el-select v-model="selectVal"
                            :disabled="!!radioVal"
                            class="selectMultiple multiPath-center__select">
                        <el-option v-for="(item,index) in selectArr"
                        :key="item.name"
                        :label="`${++index}      ${item.name}`"
                        :value="item.value">
                        {{index++}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}
                        </el-option>
                    </el-select>
                    <span class="multiPath-center__label">天</span>
                    <el-radio :label=1>时段</el-radio>
                </el-radio-group>
                <!-- <div class="multiPath-center__select">
                    第 -->
                    <!-- <selectMultipe :option="selectMultipeOpt" @select-value="selectVal"></selectMultipe>
                天
                </div> -->
            </div>
            <gis :mapData="mapData"
                :checkObj="checkObj"
                :playBackState="playBackState"
                :type="radioVal"
                :closeMapDialog="closeMapDialog">
            </gis>
            <div class="multiPath-left nxPolice-table">
                <fold :option="leftFoldOpt" @foldClick="leftFoldClick">
                    <tableCom ref="leftTable" :option="leftTableOpt"
                        class="gutterNone"
                        :comSize="{height: 265}">
                    </tableCom>
                </fold>
            </div>
            <div class="multiPath-right">
                <fold :option="rightFoldOpt" @foldClick="rightFoldClick">
                    <div>
                        <div style="padding: 2px">
                            <div class="multiPath-verticalBar">
                                基本信息
                            </div>
                        </div>
                        <div class="nxPolice-table multiPath-table">
                            <div v-loading="infoLoading" style="position: absolute;top: 19%;left: 45%;"></div>
                            <tableCom :option="rightTableOptInfo"
                                :comSize="{height: 75}">
                            </tableCom>
                        </div>
                        <div style="padding: 2px">
                            <div class="multiPath-verticalBar">
                                {{radioVal ? '时段' : '时序'}}
                            </div>
                        </div>
                        <div class="nxPolice-table multiPath-tableRowBtn">
                            <tableCom v-show="!radioVal" :option="rightTableOptLoc"
                                :comSize="rightTableHeight">
                            </tableCom>
                            <tableCom v-show="radioVal" :option="rightTableOptTime"
                                :comSize="rightTableHeight">
                            </tableCom>
                        </div>
                        <div v-if="smallMapShow" class="multiPath-right__smallMap">
                            <!-- <div class="multiPath-right__fullIcon" @click="showMiddleMap"></div> -->
                            <div class="multiPath-right__close" @click="closeMidMap">X</div>
                            <smallMap :mapData="smallData"
                                :obj="periodObj"></smallMap>
                        </div>
                    </div>
                </fold>
            </div>
            <div :class="['multiPath-legend', {'multiPath-legend__hide': !legendShow}]" v-show="radioVal">
                <div class="multiPath-legend__item"
                        :style="`color: ${color[index]}`"
                        v-for="(item,index) in legendArr"
                        :key="index">
                    <span :style="`background: ${color[index]}`"></span>&nbsp;&nbsp;  第{{++index}}天 &nbsp;&nbsp; {{item.name}}
                </div>
            </div>
            <el-switch
                @click="legendSwitch"
                class="multiPath-legend__switch" v-show="radioVal"
                v-model="legendShow"
                active-text	="图例开"
                inactive-text="图例关"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
            <!-- <div  @click="legendSwitch">图例</div> -->
            <div class="multiPath-bottom">
                <playBack ref="playBack"
                    :maxVal="maxVal"
                    :fn="playBackFn"
                    @playBackState="playBack"></playBack>
            </div>
            <sysDialog size="tiny"
                    :dialogVisible="locationMessageShow"
                    title="位置详情"
                    :showCancel="false"
                    :showConfirm="false"
                    @change="dialogChange">
                <div class="multiPath-locationMessage">
                    <div v-for="item in locationData"
                        :key="item.name"
                        class="multiPath-locationMessage__content">
                        <div>
                            {{item.name}}
                        </div>
                        <div>
                            {{item.value}}
                        </div>
                    </div>
                </div>
            </sysDialog>
            <!-- <sysDialog size="large"
                    v-if="middleMapShow"
                    :dialogVisible="middleMapShow"
                    title="目标选择"
                    :okFn="confirm"
                    @change="dialogChange">
                <div style="width: 100%;height:100%;border: 1px solid red"></div>
            </sysDialog> -->
            <el-dialog
                top="5%"
                class="multiPath-dialog dialogMap"
                title="详情轨迹"
                :visible="middleMapShow"
                :before-close="closeFn"
                size="large"
                >
                <div class="multiPath-dialog__left">
                    <p style="padding-bottom: 5px;">张三的个人详情</p>
                    <div class="multiPath-verticalBar">
                        基本信息
                    </div>
                    <div class="nxPolice-table multiPath-table">
                        <tableCom :option="rightTableOptInfo"
                            :comSize="{height: 85}">
                        </tableCom>
                    </div>
                    <div class="multiPath-verticalBar">
                        位置信息
                    </div>
                    <div class="nxPolice-table">
                        <tableCom :option="rightTableOptLoc"
                            :comSize="middleMapTable">
                        </tableCom>
                    </div>
                </div>
                <div class="multiPath-dialog__right">
                    <middleMap></middleMap>
                </div>
            </el-dialog>
        </div>
        <sysDialog size="small"
                v-if="selectShow"
                :dialogVisible="selectShow"
                title="目标选择"
                :okFn="confirm"
                @change="dialogChange">
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
    </div>
</template>

<script>
import formSelect from 'components/Form'
import sysDialog from 'components/common/dialog'
import transfer from 'components/transfer'
import tableCom from 'components/Table'
import selectMultipe from './common/selectMultiple'
import gis from './common/map'
import smallMap from './common/smallMap'
import middleMap from './common/middleMap'
import fold from './common/fold'
import playBack from './common/playBack'
import history from '../AllNetCommons/historySearch'
import { forbiddenDate } from 'utils'
import { getPartAreaImportant, getMultiPathData, queryTimeSeries, queryTimeInterval } from 'api/allNetAnalyze/multiPath'
import { mapGetters } from 'vuex'
const color = ['#FF0000', '#FF7F00', '#EEEE00', '#66CD00', '#00CDCD', '#1E90FF', '#4B0082', '#0000FE']

export default {
    name: 'multiPath',
    components: {
        tableCom,
        formSelect,
        sysDialog,
        transfer,
        selectMultipe,
        gis,
        smallMap,
        middleMap,
        fold,
        playBack,
        history
    },
    props: {
        // part: '',
        // owner: ''
    },
    data () {
        let me = this
        let yesterDay = new Date().getTime()
        let yesterDay1 = new Date().getTime() - 24 * 60 * 60 * 1000
        // let minDay = new Date().getTime()
        return {
            legendShow: true,
            radioDisabled: true,
            part: 'part',
            owner: null,
            selectObj: {},
            color: ['#FF0000', '#FF7F00', '#EEEE00', '#66CD00', '#00CDCD', '#1E90FF', '#4B0082', '#0000FE'],
            maxSelect: 20,
             //  最大时间范围
            maxTimeRange: 86400 * 7,
            maxVal: 0,
            leftHeight: null,
            rightHeight: null,
            leftChecked: '',
            selectVal: '',
            dateIndex: '',
            rightRowIndex: '',
            radioVal: 0,
            infoLoading: false,
            isMultiPath: false,
            playBackState: false,
            smallMapShow: false,
            middleMapShow: false,
            selectShow: false,
            locationMessageShow: false,
            // 触发关闭小地图弹窗
            closeMapDialog: false,
            leftFoldOpt: {
                title: '监测目标'
            },
            rightFoldOpt: {
                title: '个人详情'
            },
            getImportantObj: {
                msisdn: '',
                owner: '',
                approverStatus: 3
            },
            tableData: [],
            sendPhones: [],
            dateIndexArr: [],
            period: [],
            periodLength: 0,
            timeSeries: [],
            chooseDays: '',
            checkBox: [],
            mapData: [],
            smallData: [],
            checkObj: {
                leftChecked: '',
                selectVal: 0
            },
            periodObj: {
            },
            legendArr: [
            ],
            selectArr: [
            ],
            locationData: [
                { name: '基站名称', value: ' ' },
                { name: 'LAC', value: ' ' },
                { name: 'CI', value: ' ' },
                { name: '经纬度', value: ' ' },
                { name: '位置中文名', value: '' }
            ],
            daysArr: [
                {
                    name: '第1天',
                    lable: '一',
                    value: '1'
                },
                {
                    name: '第2天',
                    lable: '二',
                    value: '2'
                }
            ],
            tarSelect: {
                items: [
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '目标选择',
                            disabled: false,
                            // btnType: 'rightTop',
                            click: function () {
                                me.showSelectTable()
                            }
                        }
                    }
                ]
            },
            // 选择重点人 弹框
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
            transferOpt: {
                titles: ['目标号码', '已选目标'],
                data: [],
                handleChange: me.handleChange
            },
            leftTableOpt: {
                listLoading: false,
                // 	是否为斑马纹 table
                stripe: false,
                isborder: false,
                highlightRow: true,
                column: [
                    // 首列是否显示序号、复选框index/selection
                    { name: '序号', value: 'index', width: 50, align: 'center' },
                    { name: '号码', value: 'msisdn', width: 122, align: 'center' },
                    { name: '姓名', value: 'name', width: 70, align: 'center', tooltip: true }
                ],
                data: [],
                rowClick: function (row) {
                    me.handleLeftClick(row)
                    // let { homeCode, ispCode, imsi, imei } = row;
                    // me.rightTableOptInfo.data = [{ homeCode, ispCode, imsi, imei }]
                    // me.rightTableOptLoc.data = me.timeSeries[row.msisdn][me.selectVal]
                    // me.checkObj.leftChecked = me.leftChecked
                }
            },
            rightTableOptInfo: {
                width: 400,
                listLoading: false,
                isborder: false,
                stripe: false,
                column: [
                    { name: '号码归属地', value: 'homeCode', width: 90, align: 'center', tooltip: true },
                    { name: '运营商', value: 'ispCode', width: 80, align: 'center' },
                    { name: '卡号', value: 'imsi', width: 110, align: 'center', tooltip: true },
                    { name: '机身码', value: 'imei', align: 'center' }
                ],
                data: []
            },
            rightTableOptLoc: {
                width: 400,
                listLoading: false,
                emptyText: '暂无数据',
                isborder: false,
                stripe: false,
                highlightRow: true,
                column: [
                    { name: '序号', value: 'index', width: 50, align: 'center' },
                    { name: '到达时间', value: 'arriveTime', width: 127, align: 'center' },
                    { name: '停留时长', value: 'stayTime', width: 70, align: 'center' },
                    { name: '位置描述', value: 'placeCname', align: 'center', tooltip: true },
                    { name: '位置详情', value: '', width: 60, align: 'center', operations: [
                        { label: '查看', type: 'label', click: me.showLocationMessage
                        }]
                    }
                ],
                rowClick: function () {
                },
                data: []
            },
            rightTableOptTime: {
                width: 400,
                listLoading: false,
                isborder: false,
                emptyText: '暂无数据',
                stripe: false,
                highlightRow: true,
                column: [
                    { name: '序号', value: 'index', width: 45, align: 'center' },
                    { name: '时段', value: 'period', width: 75, align: 'center' },
                    { name: '日期', value: '', width: 280, align: 'center', dateIndex: [
                    ] }
                ],
                rowClick: function (row) {
                    (function (arg) {
                        me.rightRowIndex = row.rowIndex;
                        if (arg !== row.rowIndex) {
                            me.periodFn(me.leftChecked, row.rowIndex)
                        }
                    })(me.rightRowIndex)
                },
                data: [
                ]
            }
        }
    },
    watch: {
        radioVal (val) {
            if (!this.isMultiPath) {
                return
            }
            this.dateIndex = ''
            if (!this.leftChecked) {
                return false
            }
            this.$refs.playBack.clearHandler(false)
            this.radioDisabled = true
            if (val) {
                this.initPeriod()
                this.periodFn(this.leftChecked, 0)
            } else {
                this.initTimeSeries()
                this.timeSeriesFn(this.leftChecked, val)
            }
        },
        selectVal (val) {
            if (!this.isMultiPath || val === '') {
                return
            }
            this.$refs.playBack.clearHandler(false)
            this.radioDisabled = true
            this.initTimeSeries()
            this.timeSeriesFn(this.leftChecked, val)
            // this.rightTableOptLoc.data = this.timeSeries[this.leftChecked][val];
            if (!this.timeSeries.length) {
                return
            }
            // if (!this.timeSeries[this.leftChecked].length) {
            //     return
            // }
            // this.maxVal = !this.radioVal ? this.timeSeries.length - 1 : this.periodLength - 1
            this.maxVal = this.timeSeries.length ? this.timeSeries.length - 1 : 0
        },
        dateIndex (val) {
            if (val !== '') {
                this.smallMapShow = true
            } else {
                this.smallMapShow = false
            }
        }
    },
    created () {
        if (localStorage.getItem('taskStatus')) {
            if (+localStorage.getItem('taskStatus') !== 1) {
                this.tarSelect.items[0].comOpt.disabled = true
            }
        }
        if (localStorage.getItem('taskId')) {
            this.owner = localStorage.getItem('taskId')
        } else {
            this.owner = this.userName
        }
        this.getImportantData();
        // this.getAllData()
    },
    mounted () {
    },
    computed: {
        ...mapGetters({
            'vsHeight': 'global/visualHeight',
            'mapCenter': 'global/globalKeys',
            'userName': 'global/userName'
        }),
        rightTableHeight () {
            return {
                height: (this.vsHeight + 14 - 60 - 30 - 44 - 75) - 10
            }
        },
        middleMapTable () {
            let h = document.body.clientHeight
            return {
                height: h * 0.9 - 39 - 15 - 18 * 2 - 19 - 75
            }
        },
        legendColor (index) {
            return {
                background: color[index]
            }
        }
    },
    methods: {
        // 时序数据获取
        async getTimeSeries (obj) {
            return queryTimeSeries(obj)
        },
        // 时段数据获取
        async getPeriod (obj) {
            return await queryTimeInterval(obj)
        },
        // 获取重点人列表
        async getImportantData () {
            this.getImportantObj.owner = this.owner;
            this.loadLoading(0, this.tableData);
            this.tableData = await getPartAreaImportant(this.getImportantObj);
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
            this.transferOpt.data = data;
            this.cancelLoading(0, this.transferOpt, this.tableData.rows)
        },
        timeSeriesFn (checked, select) {
            this.getTimeSeries({
                date: select,
                msisdn: checked
            }).then(resp => {
                this.delTimeSeries(resp)
                this.checkObj = {
                    leftChecked: checked,
                    selectVal: select
                }
                this.radioDisabled = false
            })
        },
        initTimeSeries () {
            this.infoLoading = true
            this.rightTableOptInfo.emptyText = ' '
            this.rightTableOptInfo.data = []
            this.loadLoading(0, this.rightTableOptLoc, '瓜皮')
        },
        delTimeSeries (resp) {
            if (resp && resp.data) {
                // TODO 待处理
                this.timeSeries = resp.data.timeSeries
                this.maxVal = this.timeSeries.length ? this.timeSeries.length - 1 : 0
                this.rightTableOptLoc.data = resp.data.timeSeries;
                this.mapData = {
                    days: this.selectArr.length,
                    base: resp.data.baseData,
                    timeSeries: this.timeSeries,
                    period: []
                }
                let { homeCode, ispCode, imsi, imei } = resp.data.baseData
                this.rightTableOptInfo.data = [{ homeCode, ispCode, imsi, imei }];
                this.infoLoading = false;
                if (this.timeSeries.length) {
                    this.cancelLoading(0, this.rightTableOptLoc, this.timeSeries)
                } else {
                    this.rightTableOptLoc.listLoading = false;
                }
            }
        },
        delBaseInfo (resp) {
            let leftBase = []
            let base = []
            let dateIndexArr = []
            let me = this
            //  leftBase timeSeries
            resp.data.baseData.forEach((item) => {
                leftBase.push(item);
                base[item.msisdn] = item;
            })
            resp.data.dates.forEach((item, index) => {
                this.selectArr.push({
                    name: item,
                    value: item
                })
                this.legendArr.push({
                    name: item.slice(5)
                })
                dateIndexArr.push({
                    label: item.slice(5),
                    click: me.clickIndex,
                    callback: function () {
                        if (me.dateIndex === index) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                })
            })
            this.leftTableOpt.data = leftBase;
            this.leftFoldOpt.title = `监测目标（${leftBase.length}个）`
            this.leftChecked = leftBase[0].msisdn
            setTimeout(() => {
                this.$refs.leftTable.setRow(this.leftTableOpt.data[0])
            }, 60)
            this.cancelLoading(0, this.leftTableOpt, leftBase)
            this.rightTableOptTime.column[2].dateIndex = dateIndexArr
        },
        initPeriod () {
            this.infoLoading = true
            this.rightTableOptInfo.emptyText = ' '
            this.rightTableOptInfo.data = []
            this.loadLoading(0, this.rightTableOptTime)
        },
        delPeriod (resp) {
            if (resp && resp.data) {
                // TODO 待处理
                this.period = resp.data.timeInterval
                let length = 0
                this.period.forEach(item => {
                    length += item.dataList.length
                })
                this.periodLength = length
                this.maxVal = this.periodLength ? this.periodLength - 1 : 0
                this.mapData = {
                    days: this.selectArr.length,
                    base: resp.data.baseData,
                    timeSeries: this.timeSeries,
                    period: this.period
                }
                this.smallData = {
                    base: resp.data.baseData,
                    period: this.period
                }
                let { homeCode, ispCode, imsi, imei } = resp.data.baseData
                this.rightTableOptInfo.data = [{ homeCode, ispCode, imsi, imei }];
                this.infoLoading = false;
                let period = Array.from({ length: 24 }, (item, i) => {
                    let str = i < 9 ? `0${i}-0${i + 1}` : i === 9 ? `0${i}-${i + 1}` : `${i}-${i + 1}`
                    return {
                        rowIndex: i,
                        period: str
                    }
                })
                this.rightTableOptTime.data = period;
                this.cancelLoading(0, this.rightTableOptTime, period)
            }
        },
        periodFn (checked, select) {
            this.getPeriod({
                timeInterval: select,
                msisdn: checked
            }).then(resp => {
                this.delPeriod(resp)
                this.checkObj = {
                    leftChecked: checked,
                    selectVal: select
                }
                if (this.dateIndex !== '') {
                    this.periodObj = {
                        leftChecked: this.leftChecked,
                        indexOne: this.rightRowIndex,
                        indexTwo: this.dateIndex
                    }
                }
                this.radioDisabled = false
            })
        },
        // 获取查询基本信息
        async getBaseInfo (obj) {
            return getMultiPathData(obj)
        },
        confimQuery (obj) {
            this.radioDisabled = true
            this.selectArr = []
            this.legendArr = []
            this.loadLoading(0, this.leftTableOpt)
            // this.infoLoading = true
            // this.rightTableOptInfo.emptyText = ' '
            // this.rightTableOptInfo.data = []
            // !this.radioVal ? this.loadLoading(0, this.rightTableOptLoc) : this.loadLoading(0, this.rightTableOptTime)
            this.getBaseInfo(obj).then(resp => {
                this.delBaseInfo(resp)
                this.selectVal = this.selectArr[this.selectArr.length - 1].value
                // let timeSeries = {
                //     date: this.selectVal,
                //     msisdn: this.leftChecked
                // }
                // this.getTimeSeries(timeSeries).then(resp => {
                //     this.delTimeSeries(resp)
                //     this.checkObj.leftChecked = this.leftChecked;
                //     this.radioDisabled = false
                // })
            })
        },
        async getAllData (obj) {
            this.radioDisabled = true
            this.selectArr = []
            this.legendArr = []
            this.loadLoading(0, this.leftTableOpt)
            this.infoLoading = true
            this.rightTableOptInfo.emptyText = ' '
            this.rightTableOptInfo.data = []
            // this.loadLoading(0, this.rightTableOptInfo)
            !this.radioVal ? this.loadLoading(0, this.rightTableOptLoc) : this.loadLoading(0, this.rightTableOptTime)
            if (this.radioVal) {
                // this.loadLoading(0, this.rightTableOptTime)
            }
            getMultiPathData(obj).then(resp => {
                if (resp && resp.data) {
                    let leftBase = []
                    let dateIndexArr = []
                    let timeSeries = []
                    let period = []
                    let base = []
                    let me = this;
                    //  leftBase timeSeries
                    resp.data.forEach((item) => {
                        leftBase.push(item.baseData);
                        timeSeries[item.baseData.msisdn] = item.timeSeries.map(item => item.dataList);
                        period[item.baseData.msisdn] = item.timeInterval;
                        base[item.baseData.msisdn] = item.baseData;
                    })
                    // selectArr legendArr dateIndexArr
                    resp.data[0].dates.forEach((item, index) => {
                        this.selectArr.push({
                            name: item,
                            value: index
                        })
                        this.legendArr.push({
                            name: item.slice(5)
                        })
                        dateIndexArr.push({
                            label: item.slice(5),
                            click: me.clickIndex,
                            callback: function () {
                                if (me.dateIndex === index) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        })
                    })
                    this.rightTableOptTime.column[2].dateIndex = dateIndexArr
                    this.leftTableOpt.data = leftBase;
                    this.leftFoldOpt.title = `监测目标（${leftBase.length}个）`
                    this.dateIndexArr = dateIndexArr;
                    let { homeCode, ispCode, imsi, imei } = leftBase[0]
                    this.rightTableOptInfo.data = [{ homeCode, ispCode, imsi, imei }];
                    this.timeSeries = timeSeries;
                    this.period = period;
                    this.leftChecked = resp.data[0].baseData.msisdn
                     // period数据量
                    let l = 0;
                    this.period[this.leftChecked].forEach(item => {
                        item.dataList.forEach((items) => {
                            l += items.dataList.length;
                        })
                    })
                    this.periodLength = l;
                    setTimeout(() => {
                        this.$refs.leftTable.setRow(this.leftTableOpt.data[0])
                    }, 60)
                    this.rightTableOptLoc.data = timeSeries[this.leftChecked][0];
                    this.mapData = {
                        days: this.selectArr.length,
                        base: base,
                        timeSeries: timeSeries,
                        period: period
                    }
                    this.selectVal = this.selectArr[this.selectArr.length - 1].value
                    // 测试用
                    // this.selectVal = this.selectArr[0].value
                    if (timeSeries[this.leftChecked].length && timeSeries[this.leftChecked][this.selectVal]) {
                        this.maxVal = timeSeries[this.leftChecked][this.selectVal].length - 1
                    }
                    this.smallData = {
                        base: base,
                        period: period
                    }
                    this.checkObj.leftChecked = this.leftChecked;
                    this.periodInit()
                    this.cancelLoading(0, this.leftTableOpt, leftBase)
                    this.infoLoading = false;
                    // this.cancelLoading(0, this.rightTableOptInfo, leftBase[0])
                    if (timeSeries[resp.data[0].baseData.msisdn].length) {
                        this.cancelLoading(0, this.rightTableOptLoc, timeSeries[resp.data[0].baseData.msisdn][0])
                    } else {
                        // this.cancelLoading(0, this.rightTableOptLoc, [])
                        this.rightTableOptLoc.listLoading = false;
                    }
                }
                this.radioDisabled = false
            })
        },
        periodInit () {
            let period = Array.from({ length: 24 }, (item, i) => {
                let str = i < 9 ? `0${i}-0${i + 1}` : i === 9 ? `0${i}-${i + 1}` : `${i}-${i + 1}`
                return {
                    rowIndex: i,
                    period: str
                }
            })
            this.rightTableOptTime.data = period;
            this.cancelLoading(0, this.rightTableOptTime, period)
        },
        handleLeftClick (row) {
            this.closeMapDialog = !this.closeMapDialog;
            this.leftChecked = row.msisdn
            this.radioDisabled = true
            this.$refs.playBack.clearHandler(false)
            this.dateIndex = ''
            if (this.radioVal) {
                this.initPeriod()
                this.periodFn(this.leftChecked, 0)
            } else {
                this.initTimeSeries()
                this.timeSeriesFn(this.leftChecked, this.selectVal)
            }
        },
        //  加载loading 0 表格 1 echart图
        //  opt[0] 清空数据 opt[1] 当前加载动画 opt[2] 切换前的动画 取消
        loadLoading (type, opt) {
            switch (type) {
                case 0:
                    opt.data = [];
                    opt.emptyText = ' ';
                    opt.listLoading = true;
                    break;
                case 1:
                    this.$nextTick(() => {
                        this[opt[0]] = [];
                        this[opt[1]] = true;
                        this[opt[2]] = false;
                    })
                    break;
            }
        },
            //  取消loading
        cancelLoading (type, opt, resp) {
            switch (type) {
                case 0:
                    if (opt.data.length) {
                        opt.listLoading = false;
                    }
                    if (resp.length === 0) {
                        setTimeout(() => {
                            opt.listLoading = false;
                        }, 200)
                    }
                    break;
                case 1:
                    if (this[opt[0]].length) {
                        this[opt[2]] = false;
                        this[opt[3]] = true;
                    } else {
                        setTimeout(() => {
                            this[opt[2]] = false;
                        }, 200)
                    }
                    if (opt[1].length === 0) {
                        setTimeout(() => {
                            this[opt[2]] = false;
                        }, 200)
                    }
                    break;
            }
        },
        clickIndex (index) {
            this.dateIndex = index
            setTimeout(() => {
                this.periodObj = {
                    leftChecked: this.leftChecked,
                    indexOne: this.rightRowIndex,
                    indexTwo: index
                }
            })
        },
        showSelectTable () {
            this.selectShow = true;
        },
        dialogChange (val) {
            this.selectShow = val;
            this.middleMapShow = val;
            this.locationMessageShow = val;
        },
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
        confirm () {
            // this.timeRange = true
            this.closeMapDialog = !this.closeMapDialog;
            let time = this.$refs.form.getValue();
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
            } else if (timeRange <= 0) {
                this.$alert('开始时间不能大于或等于结束时间', {
                    confirmButtonText: '确定'
                });
                return
            } else if (timeRange1 < 0) {
                this.$alert('结束时间不能超过当前时间', {
                    confirmButtonText: '确定'
                })
                return
            } else if (timeRange > this.maxTimeRange) {
                this.$alert('结束时间和开始时间之间不得大于7天', {
                    confirmButtonText: '确定'
                });
                return
            } else if (this.sendPhones.length > this.maxSelect) {
                this.$alert('单次选取重点人不能超过' + this.maxSelect + '个', {
                    confirmButtonText: '确定'
                });
                return;
            }
            this.selectShow = false;
            if (timeRange <= 86400) {
                this.isMultiPath = false;
                setTimeout(() => {
                    this.selectObj = {
                        start: time.start,
                        end: time.end,
                        sendPhones: this.sendPhones
                    }
                    this.sendPhones = []
                    this.selectVal = ''
                    this.radioVal = 0
                })
            } else {
                this.isMultiPath = true;
                this.confimQuery({
                    owner: this.owner,
                    msisdn: this.sendPhones.join(','),
                    queryStartTime: time.start,
                    queryEndTime: time.end
                });
                this.sendPhones = []
                if (this.$refs.playBack) {
                    this.$refs.playBack.clearHandler(false)
                }
            }
        },
        leftFoldClick (val) {
            this.foldClickFun(val, 'multiPath-left', 'leftHeight')
        },
        rightFoldClick (val) {
            this.foldClickFun(val, 'multiPath-right', 'rightHeight')
        },
        foldClickFun (val, className, height) {
            let h = $(`.${className}`).height()
            if (h !== 30) {
                this[height] = h
            }
            if (val) {
                $(`.${className}`).animate({ height: 30 })
            } else {
                $(`.${className}`).animate({ height: this[height] })
            }
        },
        showLocationMessage (data) {
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
        // selectVal (val) {
            // let dateIndex = []
            // val.forEach(item => {
            //     dateIndex.push({
            //         label: item,
            //         click: this.clickIndex
            //     })
            // })
            // this.rightTableOptTime.column[2].dateIndex = dateIndex
            // this.dataIndex = ''
        // },
        showMiddleMap () {
            this.middleMapShow = true
        },
        closeFn () {
            this.middleMapShow = false;
            this.dateIndex = ''
        },
        closeMidMap () {
            this.dateIndex = ''
            this.smallMapShow = false;
        },
        playBack (val) {
            this.playBackState = val;
        },
        playBackFn () {
            let val = this.checkObj.leftChecked;
            this.checkObj.leftChecked = null
            setTimeout(() => {
                this.checkObj.leftChecked = val;
            })
        },
        legendSwitch () {
            this.legendShow = !this.legendShow
        }
    }
}
</script>

<style scoped lang="postcss">
    @component-namespace multiPath {
        @b common {
            width: 100%;
            height: 100%;
        }
        @b center {
            position: absolute;
            top: 0px;
            left: 50%;
            margin-left: -150px;
            width: 300px;
            height: 30px;
            background: rgba(0,0,0,0.7);
            margin-top: 10px;
            font-size: 16px;
            color: #fff;
            text-aline: center;
            line-height: 30px;
            z-index: 3;
            @e label {
                // padding-left: 5px;
                font-size: 14px;
            }
            &:before {
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
            }
            @e select {
                display: inline-block;
                width:150px;
                font-size: 14px;
                font-weight: normal;
                margin: 0 5px;
            }
        }
        @b left {
            display: inline-block;
            position: absolute;
            box-shadow:4px 4px 9px rgba(0,0,0,0.5);
            border-radius: 0 0 18px 0;
            top: 40px;
            left: 14px;
            width: 250px;
            height: 295px;
            overflow: hidden;
            & p {
                color: #fff;
            }

        }
        @b right {
            display: inline-block;
            position: absolute;
            box-shadow:-4px 4px 9px rgba(0,0,0,0.5);
            border-radius: 0 0 0 18px;
            top: 40px;
            right: 4px;
            width: 400px;
            height: calc(100% - 110px);
            & p {
                color: #fff;
            }
            overflow: hidden;
            @e smallMap{
                position: absolute;
                bottom: 0px;
                width: 98%;
                height: calc((100% - 44px - 75px) * 0.6);
            }
            @e close {
                z-index: 3;
                position: absolute;
                width: 20px;
                height: 20px;
                top: 5px;
                right: 5px;
                border: 1px solid #fff;
                border-radius: 50%;
                background: red;
                text-align: center;
                color: #fff;
                cursor: pointer;
            }
        }
        @b bottom {
            position: absolute;
            bottom: 55px;
            left: 1%;
            width: 95%;
            height: 30px;
            background: transparent;
        }
        @b legend {
            position: absolute;
            bottom: 110px;
            left: 16px;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items:center;
            flex-direction: column;
            overflow: hidden;
            font-size: 14px;
            transition: all 0.5s ease-in-out;
            @e hide {
                height: 0px;
                transition: all 0.5s ease-in-out;
            }
            @e item {
                overflow: hidden;
                padding: 5px;
                height: 19px;
                line-height: 0.5;
                & span {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                }
            }
            @e switch {
                position: absolute;
                left: 16px;
                bottom: 85px;
                height: 20px;
                cursor: pointer;
            }
        }
        @b verticalBar {
            margin-left: 10px;
            padding-left: 5px;
            height: 18px;
            line-height: 18px;
            border-left: 3px solid #03A8FF;
            color: #fff;
            font-size: 13px;
        }
        @b dialog {
            @e left {
                display: inline-block;
                width: 35%;
                height: 100%;
                float: left;
            }
            @e right {
                position: relative;
                display: inline-block;
                float: left;
                width: 64%;
                height: 100%;
                border: 1px solid #03A8FF;
                &::after {
                    clear: both;
                }
            }
        }
        @b locationMessage {
            padding: 5px 10px;
            height: 160px;
            text-align: center;
            overflow: auto;
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
