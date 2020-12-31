<template>
    <div class="ga-callLoss">
        <div class="ga-callLoss__content">
            <changeCardEventTable :option="tableOpt" :comSize="comSize" @handleCurrentPageChange="handleCurrentPageChange"
                                  @handleSizePageChange = "handleSizePageChange"></changeCardEventTable>
        </div>
    </div>
</template>

<script>
    import changeCardEventTable from 'components/Table'
    import { changeCardEventQuery } from 'api/dataSearch/dataSearch'
    import { mapGetters } from 'vuex'
    export default {
        name: 'callLoss',
        data () {
            return {
                formObj: {
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
                        { name: '序号', value: 'index', width: 100, align: 'center' },
                        { name: '手机号', value: 'msisdn', width: 230, align: 'center' },
                        { name: '开始时间', value: 'beginTime', width: 230, align: 'center' },
                        { name: '开始位置信息', value: 'begPlaceCname', width: 230, align: 'center' },
                        { name: '结束时间', value: 'endTime', width: 230, align: 'center' },
                        { name: '结束位置信息', value: 'endPlaceCname', align: 'center' }
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
//                    height: 350
                }
            }
        },
        methods: {
//            获取换卡事件列表
            async changeCardList () {
                this.tableOpt.listLoading = true;
                this.formObj.owner = this.ownerId
                let resp = await changeCardEventQuery(this.formObj);
                if (resp) {
                    this.tableOpt.listLoading = false;
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total;
                    //                    给分页的总条数赋值
                    this.tableOpt.pageOpt.total = resp.total;
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
                this.changeCardList();
            }
        },
        components: {
            changeCardEventTable
        },
        props: {
            option: {
                type: Object
            }
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
