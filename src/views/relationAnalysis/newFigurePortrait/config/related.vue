<template lang="html">
    <div style="width: 100%;height:100%;position: relative">
        <el-row class="figurePortrait-baseData__base--title smallNotLong">
            <b class="icon"></b>
            <span v-if="renderData">{{renderData.name}} （{{saveRenderMsisdn}}）</span>
            <span class="basetitle">关系人信息</span>
            <!-- {{userName}} <span v-if="msisdn">（</span>{{ msisdn }}<span v-if="msisdn">）</span>关系人信息 -->
            <el-radio-group v-model="radioVal">
                <el-radio :label="0">近一天</el-radio>
                <el-radio :label="1">近一周</el-radio>
                <el-radio :label="2">近一月</el-radio>
                <el-radio :label="3">按月
                    <el-select v-model="chooseMonth" placeholder="请选择" :disabled="monthDisabled" style="width: 120px;">
                        <el-option
                            v-for="item in monthArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-radio>
            </el-radio-group>
        </el-row>
        <el-row style="position: relative">
            <el-col style="cursor: pointer" :span="10">
                <tableComp :option="tableOpt"
                           :comSize="tableHeight"
                           @handleCurrentPageChange="handleCurrentPageChange"
                           @handleSizePageChange = "handleSizePageChange">
                </tableComp>
            </el-col>
            <el-col :span="14">
                <!-- <frameCom :title='secBarsTitle'>
                    <div :style="{ height: detailAllHeight }">
                        <graphComp v-show="grafShow" :options="opts" :size="sizeStyle" @graphClick="clickHandler" ref="chart"></graphComp>
                        <div v-if="!grafShow" class="ga-baseMsg__relation">
                            <div class='ga-baseMsg__popHide' @click='popHide'> </div>
                            <FormComp :option="formOpt" ref="form" style="display: none"></FormComp>
                            <el-col :span="9" style="margin-top: 20px;">
                                <frameCom :title='thirdBarsTitle'>
                                    <div ref="detaiList" style="margin: 0 auto" :style="{ height: detaiListHeight }">
                                        <el-row :span="24" :key="item.key" v-for="item in detailNumData">
                                            <el-col :span="11" style="text-align: right">{{item.key}}</el-col>
                                            <el-col :span="13">{{item.value}}</el-col>
                                        </el-row>
                                    </div>
                                </frameCom>
                            </el-col>
                            <el-col style="cursor: pointer; margin-top: 20px;" :span="15">
                                <tableComp :option="tableDetailOpt"
                                           :comSize="tableDetailHeight"
                                           @handleCurrentPageChange="handleCurrentPageDetailChange"
                                           @handleSizePageChange = "handleSizePageDetailChange">
                                </tableComp>
                            </el-col>
                        </div>
                    </div>
                </frameCom> -->
                <div v-show="grafSwitchValue" >
                    <div :style="{ height: detailAllHeight }">
                        <div class="figurePortrait-baseData__base--title figurePortrait" style="line-height: 22px">
                            <b class="icon"></b>
                            <span>关系通联图</span>
                            <el-checkbox
                                    style="margin-left: 20px"
                                    v-model="grafSwitchValue"
                                >
                            </el-checkbox>
                            通联信息
                        </div>
                        <graphComp :options="opts" :size="sizeStyle" @graphClick="clickHandler" ref="chart"></graphComp>
                    </div>
                </div>
                <frameCom v-show="!grafSwitchValue">
                    <div class="figurePortrait-baseData__frame--title">
                        <span>{{ secBarsTitle }}</span>
                    </div>
                    <div :style="{ height: detailAllHeight }" class="ga-baseMsg__content">
                        <div class='ga-baseMsg__popHide' @click='popHide'> </div>
                        <!-- <FormComp :option="formOpt" ref="form" style="display: none"></FormComp> -->
                        <el-col :span="9">
                            <frameCom>
                                <div class="figurePortrait-baseData__frame--title" style="height:30px;line-height: 30px">
                                    <span>{{ thirdBarsTitle }}</span>
                                </div>
                                <div ref="detaiList" class="ga-baseMsg__list" :style="{ height: detaiListHeight }">
                                    <el-row :span="24" :key="item.key" v-for="item in detailNumData" :style="rowHeight">
                                        <el-col :span="11" class="ga-baseMsg__list--left">{{item.key}}</el-col>
                                        <el-col :span="13">{{item.value}}</el-col>
                                    </el-row>
                                </div>
                            </frameCom>
                        </el-col>
                        <el-col style="cursor: pointer;" :span="15">
                            <tableComp :option="tableDetailOpt"
                                        :comSize="tableDetailHeight"
                                        @handleCurrentPageChange="handleCurrentPageDetailChange"
                                        @handleSizePageChange = "handleSizePageDetailChange">
                            </tableComp>
                        </el-col>
                    </div>
                </frameCom>
            </el-col>
        </el-row>
        <!-- 短信详情弹框 -->
        <sysDialog size="small"
                   :title="dialogTitle"
                   @change="dialogTableChange"
                   :dialogVisible="dialogTableVisible"
                   :showConfirm="false"
                   :showCancel='false'>
            <div class="ga-baseMsg__detailPop">
                <div v-for="(items, index) in detailMsgData"
                     :key="index" class="ga-baseMsg__detailPop--itemContent">
                    <ul class="dialogUl">
                        <li v-if="item.value" v-for="(item, index) in items" :key="index">
                            <p>{{item.key}}</p>
                            <p>{{ item.value}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </sysDialog>
    </div>
</template>

<script>
    import tableComp from 'components/Table'
    import graphComp from './graph'
    import frameCom from 'components/monitor/frameborder'
    import FormComp from 'components/Form/index';
    import sysDialog from 'components/common/dialog';
    import { mapGetters } from 'vuex'
    import { forbiddenDate, phoneNumChange } from 'utils'
    import { getRelatedInfo, relatedCertain, relatedDetail } from 'api/relationAnalysis/newFigurePortrait/index'
    export default {
        name: 'figurePortrait',
        data () {
            let nowDate = new Date().getTime()
            let me = this
            return {
                saveRenderMsisdn: '',
                radioVal: 0,  //  单选默认选项
                chooseMonth: '',  //  下拉框选中的项
                monthDisabled: true, // 月份选择下拉框是否禁用
                //  下拉框数据
                monthArr: [],
                day: 'day',
                week: 'week',
                month: 'month',
                all: 'all',
                detailNumData: [
                    { key: '人物标签：', value: '' },
                    { key: '手机号：', value: '' },
                    { key: '卡号：', value: '' },
                    { key: '机身码：', value: '' },
                    { key: '运营商：', value: '' },
                    { key: '手机归属地：', value: '' },
                    { key: '手机型号：', value: '' },
                    { key: '操作系统：', value: '' }
                ],
                detailMsgData: [],
                contentType: '',
                // 本方号码、电话
                msisdn: '',
                userName: '',
                // 对方号码
                detailNum: '',
                detailStartTime: '',
                detailEndTime: '',
                secBarsTitle: '关系人通联图',
                thirdBarsTitle: '',
                dialogTitle: '',
                dialogTableVisible: false,
                grafShow: true,
                //  图表控制开关
                grafSwitchValue: true,
                detailAllHeight: '',
                detaiListHeight: '',
                // 点击左侧表格有用的状态
                activeStatus: true,
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    labelWidth: '80',
                    btnPos: 'right',
                    // 表单项
                    items: [
                        {
                            label: '起始时间',
                            type: 'date',
                            required: true,
                            comOpt: {
                                id: 'startTime',
                                value: nowDate,
                                disabled: false,
                                type: 'date',
                                pickOptions: {
                                    disabledDate (time) {
                                        return forbiddenDate(time)
                                    }
                                },
                                width: '200'
                            }
                        },
                        {
                            label: '截止时间',
                            type: 'date',
                            required: true,
                            comOpt: {
                                id: 'endTime',
                                value: nowDate,
                                disabled: false,
                                type: 'date',
                                pickOptions: {
                                    disabledDate (time) {
                                        return forbiddenDate(time)
                                    }
                                },
                                width: '200'
                            }
                        }
                    ],
                    btns: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                // id: 'yq12',
                                value: '查询',
                                disabled: false,
                                click: function () {
                                    let list = me.$refs.form.getValue();
                                    let { startTime, endTime } = list
                                    if (startTime > endTime) {
                                        me.$message({
                                            type: 'warning',
                                            message: '开始时间不能大于结束时间'
                                        });
                                    } else {
                                        let pageSize = me.tableDetailOpt.pageOpt.pageSize;
                                        me.tableDetailOpt.pageOpt.currentPage = 1;
                                        me.tableDetailOpt.pageOpt.total = 0;
                                        me.detailStartTime = startTime
                                        me.detailEndTime = endTime
                                        me.relatedCertain(me.detailNum, me.detailStartTime, me.detailEndTime, pageSize, 1)
                                    }
                                }
                            }
                        }
                    ]
                },
                tableOpt: {
                    listLoading: false,
                    dataLoading: false,
                    stripe: false,
                    highlightRow: true,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '手机号码', value: 'msisdn', width: 110, align: 'center', tooltip: true },
                        { name: '手机归属地', value: 'homecode', align: 'center', tooltip: true },
                        { name: '运营商', value: 'ispcode', width: 70, align: 'center' },
                        { name: '通联次数', value: 'count', width: 70, align: 'center' },
                        { name: '主叫', value: 'callOut', width: 70, align: 'center' },
                        { name: '被叫', value: 'callIn', width: 70, align: 'center' },
                        { name: '主短', value: 'msgOut', width: 70, align: 'center' },
                        { name: '被短', value: 'msgIn', width: 70, align: 'center' }
                    ],
                    rowClick: function (row) {
                        me.grafShow = false;
                        me.grafSwitchValue = false;
                        me.leftTableClick(row)
                    },
                    data: [],
                    // pagination: true,
                    pagination: false,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
                tableDetailOpt: {
                    listLoading: false,
                    dataLoading: false,
                    stripe: false,
                    highlightRow: true,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '类型', value: 'type', width: 80, align: 'center' },
                        { name: '发生时间', value: 'occurTime', width: 150, align: 'center' },
                        // { name: '通话时长(秒) / 短信内容', value: 'content', align: 'center', tooltip: true }
                        { name: '通话时长(秒)/短信内容', value: 'content', align: 'center', tooltip: true }
                    ],
                    // rowClick: function (row) {
                    //         //  console.log(row);
                    //     me.relatedDetail(row);
                    //     let { contentType } = row
                    //     if (contentType === '0') {
                    //         me.dialogTitle = '短信详情'
                    //     } else if (contentType === '1') {
                    //         me.dialogTitle = '电话详情'
                    //     }
                    //     me.dialogTableVisible = true
                    //         //  me.dialogTitle = '目标号码标签新增'
                    // },
                    data: [],
                    pagination: true,
                    pageOpt: {
                        layout: 'total, sizes, prev, slot, next, jumper',
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
                tableHeight: {
                    height: ''
                },
                tableDetailHeight: {
                    height: ''
                },
                formObj: {
                    mark: '',
                    page: 1,
                    rows: 10,
                    type: 0,
                    time: 'null',
                    msisdn: '',
                    rltmsisdn: ''
                },
                inforMationObj: {
                    msisdn: '',
                    owner: '',
                    time: '',
                    type: ''
                },
                // 关联图数据
                opts: {
                    // 重点人信息列表 (号码 , 通联人数, 类型)
                    phoneData: [],
                    // 重点人关系列表
                    relData: []
                },
                sizeStyle: {},
                cardKeys: ['人物标签', '手机号', '卡号', '机身码', '运营商', '手机归属地', '手机型号', '操作系统']
            }
        },
        created () {
            this.tableHeight.height = this.option.height - 40
            this.getSixMonths()
            // 对月份先行赋值
            this.chooseMonth = this.monthArr[0].value;
        },
        mounted () {
            // this.tableDetailHeight.height = this.tableHeight.height - 40
            // this.detaiListHeight = this.tableHeight.height - 170 + 'px';
            // this.detailAllHeight = this.tableHeight.height - 50 + 'px';
        },
        props: [
            'option',
            'renderData'
        ],
        watch: {
            'showIndexChange' (val) {
                if (val === 1) {
                    // 数据状态与loading状态同步
                    this.tableOpt.listLoading = this.tableOpt.dataLoading;
                    this.tableDetailOpt.listLoading = this.tableDetailOpt.dataLoading;
                } else {
                    this.tableOpt.listLoading = false;
                    this.tableDetailOpt.listLoading = false;
                }
            },
            'renderData' (val) {
                this.formObj.mark = val.flagNames
                this.tableOpt.dataLoading = false;
                this.tableDetailOpt.dataLoading = false;
                this.msisdn = val.msisdn
                this.userName = val.name
                this.sizeStyle = {
                    width: '98%',
                    height: this.option.height - 40 - 60 + 'px'
                }
                this.radioVal = 0;
                this.formObj.type = 0;
                if (this.isPhoneJM) {
                    this.saveRenderMsisdn = phoneNumChange(this.renderData.msisdn)
                } else {
                    this.saveRenderMsisdn = this.renderData.msisdn
                }
                this.formObj.msisdn = this.renderData.msisdn
                // 第一次进入页签，清空time
                this.formObj.time = 'null';
                this.formObj.owner = this.owner
                this.getRelatedInfoFun();
            },
            'radioVal' (val) {
                this.formObj.time = 'null'
                if (val === 3) {
                    this.monthDisabled = false
                    // 取当前选中的时间
                    this.formObj.time = this.chooseMonth
                } else {
                    this.monthDisabled = true
                }
                this.formObj.type = +val
                this.getRelatedInfoFun();
            },
            'chooseMonth' (val) {
                this.formObj.time = val
                this.getRelatedInfoFun();
            },
            'option.height' (val) {
                this.tableHeight.height = val - 40
                this.detaiListHeight = val - 150 + 'px';
                this.detailAllHeight = val - 40 - 50 + 'px';
                this.tableDetailHeight.height = val - 40 - 90
                this.sizeStyle.height = val - 40 - 60 + 'px'
                this.sizeStyle.width = ($(window).width() - 40) * 7 / 12 - 50 + 'px'
            }
        },
        methods: {
            // 计算6个月份 -- 最大跨度只有两年
            getSixMonths () {
                let nowYear = (new Date()).getFullYear();
                let beforeYear = nowYear - 1;
                let nowMonth = (new Date()).getMonth() - 0 + 1;
                for (let i = 0; i < 6; i++) {
                    let obj = {}
                    let nowMonthStr = '';
                    if (nowMonth - i > 0) {
                        if (nowMonth - i < 10) {
                            nowMonthStr = '0' + (nowMonth - i + '');
                        } else {
                            nowMonthStr = nowMonth - i;
                        }
                        obj.label = nowYear + '-' + nowMonthStr
                        obj.value = nowYear + '-' + nowMonthStr
                        this.monthArr.push(obj)
                    } else {
                        if (nowMonth - i + 12 < 10) {
                            nowMonthStr = '0' + (nowMonth - i + 12 + '');
                        } else {
                            nowMonthStr = nowMonth - i + 12;
                        }
                        obj.label = beforeYear + '-' + nowMonthStr
                        obj.value = beforeYear + '-' + nowMonthStr
                        this.monthArr.push(obj)
                    }
                }
            },
            // 获取左边表格数据
            async getRelatedInfoFun () {
                // 隐藏弹窗
                this.popHide();
                if (!this.formObj.msisdn) {
                    return;
                }
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                this.tableOpt.dataLoading = true;
                let resp = await getRelatedInfo(this.formObj);
                let { rows } = resp
                let center = this.renderData.msisdn
                if (rows) {
                    this.tableOpt.data = rows
                    this.tableOpt.pageOpt.total = resp.total;
                    if (this.tableOpt.data.length) {
                        this.tableOpt.listLoading = false;
                        this.tableOpt.dataLoading = false;
                        this.leftTableClick(rows[0])
                    }
                    let me = this;
                    if (resp.rows.length === 0) {
                        setTimeout(() => {
                            me.tableOpt.listLoading = false;
                            me.tableOpt.dataLoading = false;
                        }, 200)
                    }
                    let point = [];
                    let msg = 0;
                    let call = 0;
                    let mms = 0;
                    rows.forEach((item) => {
                        point.push({
                            'name': item.msisdn + '',
                            'userName': item.userName,
                            'msg': item.msgcount + '',
                            'mms': item.mulmsg + '',
                            'image': 'image://./static/phone.png',
                            'flag': item.flag,
                            'type': 1
                        })
                        // call += item.callcount;
                        msg += item.msgcount;
                        mms += item.mulmsg;
                    })
                    point.push({
                        'name': this.renderData.msisdn + '',
                        'userName': this.renderData.name,
                        'call': call,
                        'msg': msg + '',
                        'mms': mms + '',
                        'image': 'circle',
                        'type': 1
                    })
                    this.opts.phoneData = point;
                    let line = [];
                    rows.forEach((item) => {
                        line.push({
                            'name': center + '',
                            'targetName': item.msisdn + '',
                            'count': item.count,
                            'callAmount': item.callAmount,
                            'msgAmount': item.msgAmount
                        })
                    });
                    rows.forEach((item) => {
                        let ownMsisdn = item.msisdn
                        if (item.center && item.center.length) {
                            let relatedPoint = item.center;
                            relatedPoint.forEach((item) => {
                                line.push({
                                    'name': ownMsisdn + '',
                                    'targetName': item.msisdn + '',
                                    'count': item.count,
                                    'callAmount': item.callAmount,
                                    'msgAmount': item.msgAmount
                                })
                            })
                        }
                    });
                    this.opts.relData = line;
                }
            },
            // 获取关系人详情数据
            async relatedCertain () {
                this.activeStatus = false
                this.tableDetailOpt.data = []
                this.detailNumData.map(item => {
                    item.value = ''
                })
                this.tableDetailOpt.listLoading = true;
                this.tableDetailOpt.dataLoading = true;
                let resp = await relatedCertain(this.formObj)
                let { rows, total, data } = resp;
                if (data) {
                    let saveMsisdn;
                    if (this.isPhoneJM) {
                        saveMsisdn = phoneNumChange(data.msisdn)
                    } else {
                        saveMsisdn = data.msisdn
                    }
                    this.detailNumData[0].value = data.personLabel
                    this.detailNumData[1].value = saveMsisdn
                    this.detailNumData[2].value = data.cardNumber
                    this.detailNumData[3].value = data.imei
                    this.detailNumData[4].value = data.ispcode
                    this.detailNumData[5].value = data.homecode
                    this.detailNumData[6].value = data.phoneType
                    this.detailNumData[7].value = data.optSystem
                }
                if (rows) {
                    rows.filter((item) => {
                        if (item.contentType === '0') {
                            item.type = item.type === '0' ? '主短' : '被短'
                        } else {
                            item.type = item.type === '0' ? '主叫' : '被叫'
                        }
                        item.content = item.contentType === '0' ? '----' : item.content
                        return item
                    })
                    this.tableDetailOpt.data = rows;
                    this.tableDetailOpt.pageOpt.total = total;
                    this.tableDetailOpt.listLoading = false;
                    this.tableDetailOpt.dataLoading = false;
                    this.activeStatus = true
                } else {
                    this.tableDetailOpt.listLoading = false;
                    this.tableDetailOpt.dataLoading = false;
                    this.activeStatus = true
                }
            },
            // 获取关系人通话时长/短信内容详情数据
            async relatedDetail (val) {
                let resp = await relatedDetail({
                    'details': val.content,
                    'happenTime': val.occurTime,
                    'rltNumber': this.detailNum,
                    'type': val.type
                });
                if (resp) {
                    let data = resp.rows
                    // console.log(data)
                    if (data) {
                        this.detailMsgData = [
                            [
                                { key: '对端号码', value: data.rltNumber },
                                { key: '对方号码归属地', value: data.rltHomeCode },
                                { key: '类型', value: data.type },
                                { key: '短信发送时间', value: data.sendTime }
                            ],
                            [
                                { key: '通话开始时间', value: data.talkStartTime },
                                { key: '通话时长', value: data.talkTime },
                                { key: '本端位置', value: data.localPositi },
                                { key: '本端机身码', value: data.localImei },
                                { key: '本端卡号', value: data.localImsi }
                            ],
                            [
                                { key: '对端位置', value: data.endOnPositi },
                                { key: '对端机身码', value: data.endOnImei },
                                { key: '对端卡号', value: data.endOnImsi }
                            ],
                            [
                                { key: '短信内容', value: data.count }
                            ]
                        ]
                        // console.log(this.detailMsgData)
                    }
                }

                // console.log(data);
                // if (data) {
                //     this.detailNumData = [
                //         { key: '卡号', value: data.cardNumber },
                //         { key: '手机归属地', value: data.homeCode },
                //         { key: '机身码', value: data.imei },
                //         { key: '运营商', value: data.ispCode },
                //         { key: '电话', value: data.msisdn },
                //         { key: '操作系统', value: data.optSystem },
                //         { key: '人物标签', value: data.personLabel },
                //         { key: '手机型号', value: data.phoneType }
                //     ]
                //     console.log(this.detailNumData);
                // }
            },
            // 获取对方号码数据
            clickHandler (arg) {
                // console.log(arg);
                if (arg) {
                    // console.log(arg)
                    this.$refs.chart.setNodeFocus(arg.name)
                    // this.$refs.chart.setNodeFocus(arg.userName + ',' + arg.name)
                }
            },
            handleCurrentPageChange (val) {
                this.formObj.page = val;
                if (this.tableOpt.data.length) {
                    this.getRelatedInfoFun()
                }
            },
            handleSizePageChange (val) {
                this.formObj.rows = val;
                this.formObj.page = 1;
                this.tableOpt.pageOpt.currentPage = 1;
                if (this.tableOpt.data.length) {
                    this.getRelatedInfoFun()
                }
            },
            handleCurrentPageDetailChange (val) {
                this.tableDetailOpt.pageOpt.currentPage = val;
                this.formObj.page = val
                if (this.tableDetailOpt.data.length !== 0) {
                    this.relatedCertain()
                }
            },
            handleSizePageDetailChange (val) {
                this.tableDetailOpt.pageOpt.pageSize = val;
                this.formObj.rows = val
                this.tableDetailOpt.pageOpt.currentPage = 1;
                this.formObj.page = 1
                if (this.tableDetailOpt.data.length !== 0) {
                    this.relatedCertain()
                }
            },
            // 任务列表提示框
            dialogTableChange (val) {
                this.dialogTableVisible = val;
            },
            popHide () {
                this.grafShow = true;
                //  有开关
                this.grafSwitchValue = true;
                // this.secBarsTitle = '通联人关系图'
            },
            // 判断数据是否为空，为空不显示
            isNull(val, key, data) {
                if (val === null || val === 'null') {
                    data.push({ key: key, value: '----' })
                } else {
                    data.push({ key: key, value: val })
                }
            },
            leftTableClick (row) {
                this.detailStartTime = ''
                this.detailEndTime = ''
                this.detailNum = row.msisdn
                if (this.activeStatus) {
                    console.log('进来否')
                    let locMsisdn, relMsisdn;
                    if (this.isPhoneJM) {
                        locMsisdn = phoneNumChange(this.renderData.msisdn)
                        relMsisdn = phoneNumChange(row.msisdn)
                    } else {
                        locMsisdn = this.renderData.msisdn
                        relMsisdn = row.msisdn
                    }
                    this.secBarsTitle = `本方号码：${locMsisdn}与对方号码：${relMsisdn}通联详情`
                    this.thirdBarsTitle = `${relMsisdn}基本信息`
                    // let pageSize = me.tableDetailOpt.pageOpt.pageSize;
                    this.tableDetailOpt.pageOpt.pageSize = 10
                    this.tableDetailOpt.pageOpt.currentPage = 1;
                    this.tableDetailOpt.data = []
                    this.tableDetailOpt.pageOpt.total = 0;
                    this.formObj.rltmsisdn = row.msisdn
                    this.formObj.page = 1
                    this.formObj.rows = 10
                    this.relatedCertain(this.formObj)
                    // me.relatedCertain(me.detailNum, me.detailStartTime, me.detailEndTime, pageSize, 1)
                } else {
                    this.$message({
                        message: '上次操作还未完成，请稍等片刻！',
                        type: 'warning'
                    })
                }
            }
        },
        computed: {
            ...mapGetters({
                'userOwnerName': 'global/userName',
                'isPhoneJM': 'global/isPhoneJM'
            }),
            rowHeight () {
                return {
                    height: parseInt(100 / this.detailNumData.length) + '%'
                }
            },
            owner() {
                if (localStorage.getItem('taskId')) {
                    return localStorage.getItem('taskId')
                } else {
                    return this.userOwnerName
                }
            }
        },
        components: {
            tableComp,
            graphComp,
            frameCom,
            FormComp,
            sysDialog
        }
    }
</script>

<style lang="postcss">
    @component-namespace ga {
        @b baseMsg {
            @e base {
                height: 100%;
                /*border: 1px solid red;*/
                /*height: 230px;*/
                /*linear-gradient(-45deg, transparent 15px, #58a 0);*/
                @m title {
                    font-size: 18px;
                    padding-bottom: 5px;
                    color: #9af5f6;
                }
                @m content {
                    height: calc(100% - 29px);
                }
                @m headImg {
                    width: 100%;
                    height: 100%;
                    /*overflow: hidden;*/
                    /*background-size: cover;*/
                    /*background: url('~@/assets/images/headImg.png') no-repeat 0px 0px;*/
                }
                @m message {
                    height: 100%;
                    position: relative;
                    top: 2px;
                    border: 1px solid #0B4973;
                    padding: 5px;
                    overflow: auto;
                    /*text-align: center;*/
                }
                @m message2 {
                    display: flex;
                    align-items: center;
                    padding: 5px;
                    /*background: #000D36;*/
                    /*height: 300px;*/
                }
                @m span {
                    display: inline-block;
                    height: 10px;
                    width: 10px;
                    background: red;
                    cursor: pointer;
                }
            }
            @e chart {
                /*position: absolute;*/
                width: 100%;
            }
            @e popHide {
                float: right;
                width: 10px;
                height: 13px;
                cursor: pointer;
                position: absolute;
                top: 11px;
                right: 20px;
                background: url("~assets/images/common/close.png") no-repeat 0 center;
            }
            @e detailPop {
                /*display: -webkit-flex;*/
                /*display: flex;*/
                /*flex-wrap: wrap ;*/
                /*justify-content: space-between;*/
                height: 300px;
                width: 100%;
                overFlow: hidden;
                @m itemContent {
                    float: left
                }
                @m item{
                    /*width: 23%;*/
                    height: 30px;
                    border: 1px solid #fff;
                    text-align: center;
                }
            }
            @e grafSwitch {
                position: absolute;
                right: 18px;
                top: 0;
            }
            @e content {
                padding: 7px;
            }
            @e list {
                margin: 0 auto;
                padding: 10px;
                & div {
                    color: #A2EEFF;
                }
                @m left {
                    text-align: left;
                    opacity: 0.75;
                }
            }
        }
    }
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
</style>
