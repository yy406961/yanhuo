<template>
    <div style="width: 100%;height: 100%">
        <el-row class="ga-baseData__base--title">
            <span v-if="renderData">{{renderData.name}} （{{renderData.msisdn}}）</span>通联详情
        </el-row>
        <el-row>
            <formComp style="margin: 0px;padding: 0px"
                      :option='formOpt'
                      ref="form"></formComp>
        </el-row>
        <el-row style="height: calc(100% - 60px);">
            <tableComp :option="tableOpt"
                       :comSize="tableHeight"
                       @handleCurrentPageChange="handleCurrentPageChange"
                       @handleSizePageChange="handleSizePageChange">
            </tableComp>
        </el-row>
        <sysDialog size="small"
                   :dialogVisible="numShow"
                   title="目标选择"
                   :okFn="confirm"
                   @change="dialogChange">
            <!--目标选择穿梭框-->
            <transfer :option="transferOpt">
            </transfer>
            <!--<el-transfer-->
                <!--class="history-transfer"-->
                <!--v-model="transferVal"-->
                <!--filterable-->
                <!--:filter-method="filterMethod"-->
                <!--:render-content="renderFunc"-->
                <!--:titles="['目标号码', '已选目标']"-->
                <!--@change="handleChange"-->
                <!--:data="transferData">-->
                <!--<span style="margin-left: 30px" slot="left-footer">搜索结果：{{filterArrLengthLeft}} 项</span>-->
                <!--<span style="margin-left: 30px" slot="right-footer">搜索结果：{{filterArrLengthRight}} 项</span>-->
            <!--</el-transfer>-->
        </sysDialog>
    </div>
</template>

<script>
    import frameComp from 'components/monitor/frame'
    import tableComp from 'components/Table'
    import formComp from 'components/Form'
    import transfer from 'components/transfer'
    import { forbiddenDate } from 'utils'
    import { getOpposeNum, getCommunicationDetail } from 'api/relationAnalysis/newFigurePortrait/index'
    import sysDialog from 'components/common/dialog'

    export default {
        name: 'appUse',
        props: ['option', 'renderData'],
        data () {
            let yesterDay = new Date().getTime()
            let yesterDay1 = new Date().getTime() - 24 * 60 * 60 * 1000
            let me = this;
            return {
                transferOpt: {
                    titles: ['目标号码', '已选目标'],
                    data: [],
                    handleChange: me.handleChange
                },
                filterArrLengthLeft: '',
                filterArrLengthRight: '',
                //  最大时间范围
                maxTimeRange: 86400,
                numShow: false,
                transferData: [],
                checkedPhones: [],
                transferVal: [],
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    highlightRow: true,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '对端号码', value: 'rltNumber', width: 100, align: 'center' },
                        { name: '类型', value: 'type', width: 80, align: 'center' },
                        { name: '对端号码归属地', value: 'rltHomeCode', width: 150, align: 'center', tooltip: true },
                        { name: '所属运营商', value: 'spcode', width: 100, align: 'center' },
                        { name: '通联时间', value: 'happenTime', align: 'center', width: 140 },
                        { name: '通话时长（秒）/短信内容', value: 'content', align: 'center', tooltip: true },
                        { name: '对端卡号', value: 'rltImsi', align: 'center', width: 100 },
                        { name: '对端机身码', value: 'rltImei', align: 'center', width: 100 },
                        { name: '对端位置', value: 'rltPosition', align: 'center', tooltip: true },
                        { name: '本端位置', value: 'homePosition', align: 'center', tooltip: true }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [20, 30, 40, 50, 60],
                        pageSize: 20
                    }
                },
                formOpt: {
                    inline: true,
                    items: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '对端号码',
                                disabled: false,
                                click: function () {
                                    me.numShow = true
                                }
                            }
                        },
                        {
                            label: '起始时间',
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
                                click: function () {
                                    if (me.isFetch) {
                                        me.tableObj.startTime = me.$refs.form.getValue().start
                                        me.tableObj.endTime = me.$refs.form.getValue().end
                                        if (me.judgeIsFetch(me.tableObj)) {
                                            me.isFetched = true;
                                            me.fetchData()
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                tableHeight: {
                    height: ''
                },
                opposeObj: {
                    msisdn: ''
                },
                tableObj: {
                    msisdn: '',
                    rltNumber: '',
                    startTime: '',
                    endTime: '',
                    page: 1,
                    rows: 20
                },
                isFetch: false,
                isFetched: false
            }
        },
        watch: {
            'renderData' (val) {
                this.tableObj.msisdn = val.msisdn
                this.isFetch = true
                this.fetchData()
            }
        },
        created () {
            this.tableHeight.height = this.option.height + 40
            this.getOpposeNumFun()
        },
        mounted () {
        },
        methods: {
            // 获取 所有对端号码
            async getOpposeNumFun () {
                let tableData = await getOpposeNum(this.opposeObj);
                let data = [];
                if (tableData.data) {
                    tableData.data.forEach((item, index) => {
                        data.push({
                            label: `${item}`,
                            key: index + 1
                        })
                    });
                }
//                this.transferData = data;
                this.transferOpt.data = data;
            },
            async fetchData () {
                if (!this.isFetched) {
                    return
                }
                this.tableOpt.data = []
                this.tableOpt.listLoading = true
                let msisdn = '';
                this.checkedPhones.forEach((item, index) => {
                    if (index === 0) {
                        msisdn += `${item}`
                    } else {
                        msisdn += `,${item}`
                    }
                })
                this.tableObj.rltNumber = msisdn
                let resp = await getCommunicationDetail(this.tableObj)
                if (resp && resp.rows) {
                    this.tableOpt.data = resp.rows
                    this.tableOpt.pageOpt.total = resp.total
                    if (this.tableOpt.data.length) {
                        this.tableOpt.listLoading = false
                    }
                    if (resp.length === 0) {
                        setTimeout(() => {
                            this.tableOpt.listLoading = false;
                        }, 200)
                    }
                }
            },
            // 判断 是否 符合查询条件
            judgeIsFetch (obj) {
                let time = this.$refs.form.getValue();
                let timeRange = (new Date(time.end).getTime() - new Date(time.start).getTime()) / 1000;
                let timeRange1 = Date.now() - new Date(time.end).getTime();
                if (!obj.startTime) {
                    this.$alert('请选择开始时间', {
                        confirmButtonText: '确定'
                    });
                    return false;
                } else if (!obj.endTime) {
                    this.$alert('请选择结束时间', {
                        confirmButtonText: '确定'
                    });
                    return false;
                } else if (timeRange < 0) {
                    this.$alert('开始时间不能大于结束时间', {
                        confirmButtonText: '确定'
                    });
                    return false;
                } else if (timeRange1 < 0) {
                    this.$alert('结束时间不能超过当前时间', {
                        confirmButtonText: '确定'
                    })
                    return false;
                } else if (timeRange > this.maxTimeRange) {
                    this.$alert('最大时间范围为 24 小时', {
                        confirmButtonText: '确定'
                    });
                    return false;
                }
                return true;
            },
            handleChange (data) {
                this.checkedPhones = [];
                for (let j = 0; j < data.length; j++) {
                    this.checkedPhones.push(this.transferData[data[j] - 1].label)
                }
            },
            dialogChange (val) {
                this.numShow = val;
            },
            confirm () {
                this.numShow = false;
                this.fetchData()
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
            handleCurrentPageChange (val) {
                this.tableObj.page = val;
                this.fetchData();
            },
            handleSizePageChange (val) {
                this.tableObj.rows = val;
                //                备注：是否跳回第一页
                this.tableObj.page = 1;
                this.tableOpt.pageOpt.currentPage = 1;
                this.fetchData();
            }
        },
        components: {
            transfer,
            frameComp,
            formComp,
            sysDialog,
            tableComp
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b appUse {
        }
    }
</style>
