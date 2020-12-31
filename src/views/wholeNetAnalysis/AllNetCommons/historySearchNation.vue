<template>
    <div style="width: 100%;height: calc(100% - 50px)">
        <!--目标选择 按钮-->
        <div class='ga-mapSty__btn'>
            <formSelect :option='choice'></formSelect>
        </div>
        <!--目标选择弹出框-->
        <sysDialog size="small"
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
            <!--<el-transfer-->
                <!--class="history-transfer"-->
                <!--v-model="value3"-->
                <!--filterable-->
                <!--:filter-method="filterMethod"-->
                <!--:render-content="renderFunc"-->
                <!--:titles="['目标号码', '已选目标']"-->
                <!--@change="handleChange"-->
                <!--:data="transferData">-->
                <!--<span style="margin-left: 30px" slot="left-footer">搜索结果：{{filterArrLengthLeft}} 项</span>-->
                <!--<span style="margin-left: 30px" slot="right-footer">搜索结果：{{filterArrLengthRight}} 项</span>-->
            <!--</el-transfer>-->
            <!--弹窗 table表格-->
            <!--<el-row>-->
                <!--<popTable :option="tableOpt"-->
                          <!--:comSize="{height: 320}"-->
                          <!--@handleSelectionChange="handleSelectionChange">-->
                <!--</popTable>-->
            <!--</el-row>-->
        </sysDialog>
        <!--主要内容-->
        <div class='ga-mainContent'>
            <gis :option="mapData"
                 :part="part"
                 :chooseNum="chooseNum"
                 :closeMapDialog="closeMapDialog">
            </gis>
            <!--左侧下拉列表 leftFold-->
            <div class='ga-mainContent__left'
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
            <div class='ga-mainContent__right'
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
                        <el-col :span="22"
                                :offset="1"
                                class="ga-title">
                            <span></span>
                            <span>位置信息</span>
                        </el-col>
                        <!--tableMouseWheel 清楚 滚动 tooltip随之滚动的问题-->
                        <div style="width: 560px;margin: auto;"
                             @mousewheel="tableMouseWheel">
                            <div v-loading="rightTableLocationLoading"
                                 style="position: absolute;bottom: 50px;left: 50%">
                            </div>
                            <popTable :option="rightPerLocationInfo"
                                      :comSize="{height: 150}">
                            </popTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import sysDialog from 'components/common/dialog'
    import formSelect from 'components/Form'
    import popTable from 'components/Table/'
    import gis from './mapHistory'
    import { forbiddenDate } from 'utils'
    import transfer from 'components/transfer'
    import { mapGetters } from 'vuex'
    import { phoneNumChange } from 'utils/index'
    import { getPartAreaImportant, getPartAreaLocusData,
        getNationImportant, getNationLocusData } from 'api/allNetAnalyze/historyTrack'
    export default {
        data () {
            let yesterDay = new Date().getTime()
            let yesterDay1 = new Date().getTime() - 24 * 60 * 60 * 1000
            let me = this
            return {
                transferOpt: {
                    titles: ['目标号码', '已选目标'],
                    data: [],
                    handleChange: me.handleChange
                },
                filterArrLengthLeft: '',
                filterArrLengthRight: '',
//                穿梭框
                transferData: [],
                value3: [],
                tableData: [],
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
                    isborder: false,
                    // 	是否为斑马纹 table
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
                        me.rightPerLocationInfo.data = [];
                        me.rightPerLocationInfo.listLoading = true;
                        // me.rightTableLocationLoading = true;
                        setTimeout(function () {
                            me.rightPerLocationInfo.data = me.personInfoArr[row.msisdn].points;
                            me.rightPerBaseInfo.data = me.personInfoArr[row.msisdn].baseData;
                            me.name = row.name;
                            me.phoneNum = me.isPhoneJM ? phoneNumChange(row.msisdn) : row.msisdn;
                            me.chooseNum = row.msisdn;
                            me.rightPerLocationInfo.listLoading = false;
                            // me.rightTableLocationLoading = false;
//                            me.mapData = {
//                                info: me.personInfoArr[row.msisdn]
//                            }
                            me.changeDetail();
                        }, 100)
                    }
                },
//                右折叠 所有重点人 最后位置 table配置
                rightAllTableOpt: {
                    width: 560,
                    listLoading: false,
                    stripe: false,
                    isborder: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '到达时间', value: 'arriveTime', width: 160, align: 'center' },
                        { name: '手机号', value: 'msisdn', width: 140, align: 'center' },
                        { name: '位置', value: 'placeCname', width: 100, align: 'center', tooltip: true },
                        { name: '停留时长', value: 'stayTime', width: 100, align: 'center' }
                    ],
                    data: []
                },
//                右折叠 详情 个人位置信息 table配置
                rightPerLocationInfo: {
//                    width: 560,
                    listLoading: false,
                    stripe: false,
                    isborder: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '到达时间', value: 'arriveTime', width: 160, align: 'center' },
//                        { name: 'LAC', value: 'lac', align: 'center' },
//                        { name: 'CI', value: 'ci', align: 'center' },
                        { name: '位置', value: 'placeCname', align: 'center', tooltip: true },
                        { name: '停留时长', value: 'stayTime', width: 100, align: 'center' }
                    ],
                    data: []
                },
//                右折叠 详情 个人信息 table配置
                rightPerBaseInfo: {
                    width: 560,
                    listLoading: false,
                    stripe: false,
                    isborder: false,
                    column: [
                        { name: '号码归属地', value: 'homeCode', width: 120, align: 'center', tooltip: true },
                        { name: '运营商', value: 'ispCode', width: 90, align: 'center' },
                        { name: '卡号', value: 'imsi', width: 175, align: 'center' },
                        { name: '机身码', value: 'imei', width: 175, align: 'center' }
                    ],
                    data: []
                }
            }
        },
        props: ['hint', 'part', 'owner'],
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
            })
        },
        methods: {
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
                    'height': '355px'
                });
                $('.ga-rightFold__content').animate({
                    'height': '327px'
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
                                let baseData = [{ homeCode, imei, imsi, ispCode, name, msisdn }];
                                personInfoArr[data[i].baseData.msisdn] = { baseData, points };
                                mapData.push({ baseData, points })
                            } else {
                                let { homeCode, imei, imsi, ispCode, name, msisdn } = data[i].baseData;
                                allInfo.push({ msisdn });
                                let baseData = [{ homeCode, imei, imsi, ispCode, name, msisdn }];
                                personInfoArr[data[i].baseData.msisdn] = { baseData };
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
                        }
                    } else {
                        me.leftTableLoading = false;
                        me.rightTableLoading = false;
                        me.leftTableOpt.listLoading = false;
                        me.rightAllTableOpt.listLoading = false;
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
                this.selectShow = false;
                this.leftFold = true;
                this.rightFold = true;
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
                let param = {
                    owner: this.owner,
                    msisdn: this.sendPhones.join(','),
                    queryStartTime: time.start,
                    queryEndTime: time.end
                };
                this.getHistoryData(param);
            },
            dialogChange (val) {
                this.selectShow = val;
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
    .el-transfer .el-transfer-panel .el-transfer-panel__body {
        height: 200px;
    }
    @component-namespace ga {
        @b title {
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
        /*上方选择框*/
        @b menu {
            width: 100px;
            position: relative;
            z-index: 11;
            top: -42px;
            left: 1px;
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
        }
        @b leftFold {
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
                height: 222px;
                background-color: rgba(0,0,0,0.9);
            }
        }
    }
</style>
