<template>
    <div>
        <el-row>
            <el-col :span="24">
                <tableComp :option="tableOpt" :style="" class="tableComp" :comSize="tableSize" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange = "handleSizePageChange"></tableComp>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import tableComp from 'components/Table'
    import { mapGetters } from 'vuex'
    import { getKeywordList } from 'api/task/taskArea'
    export default {
        name: 'targetNumber',
        data () {
            return {
                pageOpt: {
                    rows: 10,
                    page: 1
                },
                tableOpt: {
                    listLoading: false,
                    //  是否为斑马纹 table
//                    rowHeight: 50,
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框index/selection
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '关键词', value: 'words', align: 'center' }
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
                    height: this.vsHeight - 200
                }
            }
        },
        mounted () {
            this.pageOpt.approverStatus = this.approverStatusProp;
            this.getKeywordList();
        },
        components: { tableComp },
        methods: {
            async getKeywordList () {
                this.pageOpt.owner = this.taskIdProp;
                let resp = await getKeywordList(this.pageOpt);
                if (resp) {
                    console.log(resp)
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total;
                }
            },
//            测试数据
            handleCurrentPageChange (val) {
                this.pageOpt.page = val;
                this.getKeywordList();
            },
            handleSizePageChange (val) {
//                console.log(val);
                this.pageOpt.rows = val;
                this.getKeywordList();
            }
        }
    }
</script>
<style scoped>
    .tableComp {
        margin-top: 15px;
    }
</style>
