<template>
    <div class="ga-switchEvent">
        <el-row :gutter="30">
            <el-col :span="9">
                <switchEventTable :option="tableOpt" :comSize="comSize" @handleCurrentPageChange="handleCurrentPageChange"
                                  @handleSizePageChange = "handleSizePageChange"></switchEventTable>
            </el-col>
            <el-col :span="15">
                <el-row>
                    <el-col :span="12">
                        <Bar :option="openBarOp" :renderData="openBarData"></Bar>
                    </el-col>
                    <el-col :span="12">
                        <Bar :option="closeBarOp" :renderData="closeBarData"></Bar>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <barLevel :option="switchBarOp" :renderData="switchBarData"></barLevel>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import switchEventTable from 'components/Table'
    import Bar from 'components/Chart/bar'
    import barLevel from 'components/Chart/barLevel'
    import { mapGetters } from 'vuex'
    import { onOffEventQuery, getFullDayEventList, getOpenEventList, getCloseEventList } from 'api/dataSearch/dataSearch'
    export default {
        name: 'switchEvent',
        data () {
            return {
                formObj: {
                    eventType: '',
                    idCodeType: '',
                    idCode: '',
                    queryBeginTime: '',
                    queryEndTime: '',
                    rows: 10,
                    page: 1
                },
                tableOpt: {
                    // 不设置width ，默认自适应
                    listLoading: false,
                    // 	是否为斑马纹 table
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '发生时间', value: 'time', width: 120, align: 'center', tooltip: true },
                        { name: '事件类型', value: 'type', width: 120, align: 'center' },
                        { name: '位置信息', value: 'location', align: 'center', tooltip: true }
                    ],
                    data: [],
                    // 是否分页
                    pagination: true,
                    pageOpt: {
                        total: 100,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
                comSize: {
                },
                openBarOp: {
                    height: String(this.option.height / 2),
                    props: {
                        xName: '开机次数',
                        yName: '地域'
                    }
                },
                openBarData: [],
                closeBarOp: {
                    height: String(this.option.height / 2),
                    props: {
                        xName: '关机次数',
                        yName: '地域'
                    }
                },
                closeBarData: [],
                switchBarOp: {
                    width: '850',
                    height: String(this.option.height / 2),
                    props: {
                        xName: '',
                        yName: '开关机次数'
                    }
                },
                switchBarData: []
            }
        },
        methods: {
//            获取开关机事件数据列表
            async switchEventList () {
                this.tableOpt.listLoading = true;
                this.formObj.owner = this.ownerId
                let resp = await onOffEventQuery(this.formObj);
                if (resp && resp.status === 200) {
                    this.tableOpt.listLoading = false;
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total;
                }
            },
//            24小时开关机图表查询
            async switchEventChartList (value) {
                this.tableOpt.listLoading = true;
                let resp = await getFullDayEventList(value);
                if (resp && resp.status === 200) {
                    this.switchBarData = resp.rows;
                }
            },
//          开机事件图表查询
            async openEventChartList (value) {
                let resp = await getOpenEventList(value);
                if (resp && resp.status === 200) {
                    this.openBarData = resp.rows;
                }
            },
//         关机事件图表查询
            async closeEventChartList (value) {
                let resp = await getCloseEventList(value);
                if (resp && resp.status === 200) {
                    this.closeBarData = resp.rows;
                }
            },
            handleCurrentPageChange (val) {
                this.formObj.page = val;
                this.getList();
            },
            handleSizePageChange (val) {
                this.formObj.rows = val;
                this.getList();
            },
            getList (value) {
                this.formObj = Object.assign(this.formObj, value);
                this.switchEventList();
                this.openEventChartList(value);
                this.closeEventChartList(value);
                this.switchEventChartList(value)
            }
        },
        props: {
            option: {
                type: Object
            }
        },
        components: {
            switchEventTable,
            Bar,
            barLevel
        },
        mounted () {
            this.comSize = this.option;
        },
        computed: {
            ...mapGetters({
                'userName': 'global/userName'
            }),
            taskId () {
                return localStorage.getItem('taskId');
            },
            ownerId () {
                return this.taskId ? this.taskId : this.userName;
            }
        }
    }
</script>

<style scoped>

</style>
