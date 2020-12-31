<template>
    <div style="width: 100%;height: 100%">
        <el-row class="ga-baseData__base--title">
            <span v-if="renderData">{{renderData.name}} （{{renderData.msisdn}}）</span>APP详情
        </el-row>
        <el-row style="color: red">
            <formComp style="margin: 0px;padding: 0px"
                      ref="form"
                      :option="formOpt">
            </formComp>
        </el-row>
        <el-row style="height: calc(100% - 60px);">
            <tableComp :option="tableOpt"
                       :comSize="tableHeight"
                       @handleCurrentPageChange="handleCurrentPageChange"
                       @handleSizePageChange="handleSizePageChange">
            </tableComp>
        </el-row>
    </div>
</template>

<script>
    import frameComp from 'components/monitor/frame'
    import tableComp from 'components/Table'
    import formComp from 'components/Form'
    import { forbiddenDate } from 'utils'
    import { getAppDetailData, getAppType, getAppActive } from 'api/relationAnalysis/newFigurePortrait'
    export default {
        name: 'appUse',
        props: ['option', 'renderData'],
        data () {
            let yesterDay = new Date().getTime()
            let yesterDay1 = new Date().getTime() - 24 * 60 * 60 * 1000
            let me = this
            return {
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    highlightRow: true,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: 'APP名称', value: 'name', width: 100, align: 'center' },
                        { name: '使用时间', value: 'account', width: 100, align: 'center' },
                        { name: '账号', value: 'firstTime', width: 160, align: 'center' },
                        { name: '动作', value: 'action', width: 160, align: 'center' },
                        { name: '内容', value: 'content', align: 'center' }
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
                    labelPos: 'left',
                    items: [{
                        label: '',
                        type: 'checkbox',
                        comOpt: {
                            id: 'radioId',
                            value: [],
                            disabled: false,
                            data: [{
                                name: '敏感APP', value: 0
                            }, {
                                name: 'APP', value: 1
                            }],
                            change: function (val) {
                                me.tableObj.type = val
                            }
                        }
                    }, {
                        label: 'APP分类',
                        type: 'select',
                        comOpt: {
                            id: 'appType',
                            value: '',
                            disabled: false,
                            width: 170,
                            data: [],
                            change: function (val) {
                                me.tableObj.appType = val
                            }
                        }
                    }, {
                        label: '动作',
                        type: 'select',
                        comOpt: {
                            id: 'appActive',
                            value: '',
                            disabled: false,
                            width: 170,
                            data: [],
                            change: function (val) {
                                me.tableObj.action = val
                            }
                        }
                    }, {
                        label: '起始时间',
                        type: 'date',
                        comOpt: {
                            id: 'start',
                            value: yesterDay1,
                            disabled: false,
                            type: 'datetime',
                            width: 170,
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time, yesterDay)
                                }
                            }
                        }
                    }, {
                        label: '截止时间',
                        type: 'date',
                        comOpt: {
                            id: 'end',
                            value: yesterDay,
                            disabled: false,
                            type: 'datetime',
                            width: 170,
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time, yesterDay)
                                }
                            }
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '查询',
                            disabled: false,
                            data: [],
                            click: function () {
                                me.tableObj.startTime = me.$refs.form.getValue().start
                                me.tableObj.endTime = me.$refs.form.getValue().end
                                if (me.judgeIsFetch(me.tableObj)) {
                                    me.fetchData()
                                }
                            }
                        }
                    }]
                },
                tableHeight: {
                    height: ''
                },
                tableObj: {
                    type: 0,
                    appType: '',
//                    active: '',
                    startTime: '',
                    endTime: '',
                    action: '',
                    msisdn: ''
                }
            }
        },
        watch: {
            'renderData' (val) {
                this.tableObj.startTime = this.$refs.form.getValue().start
                this.tableObj.endTime = this.$refs.form.getValue().end
                this.tableObj.msisdn = val.msisdn
                this.tableObj.type = this.$refs.form.getValue().radioId
                this.tableObj.action = this.$refs.form.getValue().appActive
                this.tableObj.appType = this.$refs.form.getValue().appType
                this.fetchData()
            }
        },
        created () {
            this.tableHeight.height = this.option.height + 40
            this.getAppTypeFun()
            this.getAppActiveFun()
        },
        mounted () {
        },
        methods: {
            async fetchData () {
                if (!this.renderData) {
                    return
                }
                this.tableOpt.data = []
                this.tableOpt.listLoading = true
                let resp = await getAppDetailData(this.tableObj)
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
            async getAppTypeFun () {
                let resp = await getAppType();
                if (resp && resp.data) {
                    this.formOpt.items[1].comOpt.data = resp.data
                    this.$refs.form.setValue([{ id: 'appType', value: resp.data[0].value }])
                }
            },
            async getAppActiveFun () {
                let resp = await getAppActive();
                if (resp && resp.data) {
                    this.formOpt.items[2].comOpt.data = resp.data
                    this.$refs.form.setValue([{ id: 'appActive', value: resp.data[0].value }])
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
            handleCurrentPageChange (val) {
                this.tableObj.page = val;
            },
            handleSizePageChange (val) {
                this.tableObj.rows = val;
                this.tableObj.page = 1;
                this.tableOpt.pageOpt.currentPage = 1;
                this.fetchData();
            }
        },
        components: {
            frameComp,
            formComp,
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
