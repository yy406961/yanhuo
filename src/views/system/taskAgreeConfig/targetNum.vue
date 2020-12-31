<template>
    <div>
        <tableComp :option="tableOpt" :comSize="tableSize" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange = "handleSizePageChange"></tableComp>
    </div>
</template>
<script>
    import tableComp from 'components/Table'
    import { tarNumQuery } from 'api/task/taskArea'
    import { mapGetters } from 'vuex'

    export default {
        name: 'targetNumber',
        data () {
            return {
                pageOpt: {
                    approverStatus: '',
                    rows: 10,
                    page: 1
                },
                tableOpt: {
                    listLoading: false,
                    //  是否为斑马纹 table
                    // rowHeight: 50,
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框index/selection
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '代号', value: 'name', width: 180, align: 'center' },
                        { name: '手机号', value: 'msisdn', width: 200, align: 'center' },
                        { name: '卡号', value: 'imsi', width: 200, align: 'center' },
                        { name: '机身码', value: 'imei', width: 200, align: 'center' },
                        { name: '录入时间', value: 'createTime', align: 'center' }
                    ],
                    data: [],
                    // 是否分页
                    pagination: true,
                    // 分页参数
                    pageOpt: {
                        currnetPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                }
            }
        },
        props: {
            taskIdProp: {
                type: String
            },
            approverStatusProp: {
                type: Number
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            tableSize () {
                return {
                    height: Math.floor((this.vsHeight - 180) / 4)
                }
            }
        },
        mounted () {
            this.pageOpt.approverStatus = this.approverStatusProp;
            this.fetchData();
        },
        components: { tableComp },
        methods: {
            // 测试数据
            async fetchData () {
                this.pageOpt.owner = this.taskIdProp;
                let resp = await tarNumQuery(this.pageOpt);
                if (resp) {
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total
                }
            },
            handleCurrentPageChange (val) {
                this.pageOpt.page = val;
                this.fetchData()
            },
            handleSizePageChange (val) {
                this.pageOpt.rows = val;
                this.tableOpt.pageOpt.current = 1;
                this.fetchData()
            }
        }
    }
</script>
<style scoped>
    .tableComp {
        margin-top: 15px;
    }
</style>
