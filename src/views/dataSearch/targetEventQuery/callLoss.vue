<template>
    <div class="ga-callLoss">
        <div class="ga-callLoss__content">
                <callLossTable :option="tableOpt" :comSize="comSize" @handleCurrentPageChange="handleCurrentPageChange"
                               @handleSizePageChange = "handleSizePageChange"></callLossTable>
        </div>
    </div>
</template>

<script>
    import callLossTable from 'components/Table'
    import { callLostEventQuery } from 'api/dataSearch/dataSearch'
    import { mapGetters } from 'vuex'
    export default {
        name: 'callLoss',
        data () {
            return {
                formObj: {
                    eventType: '',
                    idCodeType: '',
                    msisdn: '',
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
                        { name: '序号', value: 'index', align: 'center', width: 100 },
                        { name: '发生时间', value: 'callTime', width: 200, align: 'center' },
                        { name: '呼损信息', value: 'receiveMsisdn', width: 180, align: 'center' },
                        { name: '呼损类型', value: 'lossType', width: 130, align: 'center' },
                        { name: '目标位置', value: 'sendPlace', width: 180, align: 'center' },
                        { name: '对方位置', value: 'receivePlace', width: 180, align: 'center' },
                        { name: '对方归属地', value: 'receiveHomeCode', align: 'center' }
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
//            获得呼损列表数据
            async callLossList () {
                this.tableOpt.listLoading = true;
                this.formObj.owner = this.ownerId
                let resp = await callLostEventQuery(this.formObj);
                if (resp) {
                    this.tableOpt.listLoading = false;
                    this.tableOpt.data = resp.rows;
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
                this.formObj.owner = this.owner;
                this.callLossList();
            }
        },
        components: {
            callLossTable
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
