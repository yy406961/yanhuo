<template>
    <div style="width: 100%;height: 100%">
        <reportForm :option="formOpt" ref="form"></reportForm>
        <!--主要内容-->
        <div class='ga-mainContent'>
            <reportTable :option="tableOptResult" :comSize="tableSize" @handleCurrentPageChange="handleCurrentPageChange"
                         @handleSizePageChange="handleSizePageChange"></reportTable>
        </div>
        <!-- 查看任务弹框 -->
        <sysDialog size="large"
                   title="报表详情"
                   @change="dialogTableChange"
                   :dialogVisible="dialogTableVisible"
                   :showCancel='false'
                   :showConfirm="false">
            <div style="width: 100%; height: 550px;">
                <reportDetailForm v-if="dialogTableVisible" :detailId="detailId"></reportDetailForm>
            </div>
        </sysDialog>
    </div>
</template>

<script>
    import reportForm from 'components/Form'
    import reportTable from 'components/Table'
    import sysDialog from 'components/common/dialog'
    import reportDetailForm from './reportFromDetail.vue'
    import { queryExportFrom, createExportFrom } from 'api/reportForm/index'
    import { mapGetters } from 'vuex'
    const exportUrl = process.env.NODE_ENV === 'production'
        ? '/policeBusiness' : 'http://192.168.3.183:8080/policeBusiness'
    export default {
        name: 'reportFrom',
        data () {
            let me = this;
            return {
                dialogTableVisible: false,
                detailId: '',
                queryTime: '',
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    labelWidth: '80',
                    // 表单项
                    items: [
                        {
                            label: '日报日期',
                            type: 'date',
                            editable: false,
                            comOpt: {
                                id: 'reportFromTime',
                                value: '',
                                disabled: false,
                                type: 'date',
                                width: 180,
                                pickOptions: {
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                id: 'yq12',
                                width: 200,
                                value: '查询',
                                disabled: false,
                                click: function () {
                                    let value = me.$refs.form.getValue()
                                    me.queryTime = value.reportFromTime
                                    let pageSize = me.tableOptResult.pageOpt.pageSize;
                                    me.queryExportFrom(me.queryTime, me.ownerId, pageSize, 1)
                                }
                            }
                        }, {
                            label: '',
                            type: 'button',
                            wrap: true,
                            comOpt: {
                                // id: 'yq12',
                                width: 200,
                                value: '生成',
                                disabled: false,
                                click: function () {
                                    me.createExportFrom()
                                }
                            }
                        }
                    ]
                },
                tableOptResult: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 100, align: 'center' },
                        { name: '报表名称', value: 'name', align: 'center' },
                        { name: '生成日期', value: 'time', width: 340, align: 'center' },
                        { name: '操作', value: '', width: 240, align: 'center', operations: [
                            { label: '查看', type: 'label', click: me.searchClick },
                            { label: '下载', type: 'label', click: me.downloadClick }
                        ]
                        }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                }
            }
        },
        mounted () {
            let pageSize = this.tableOptResult.pageOpt.pageSize;
            this.queryExportFrom('', this.ownerId, pageSize, 1)
        },
        methods: {
            // 任务列表提示框
            dialogTableChange (val) {
                this.dialogTableVisible = val
            },
            searchClick (val) {
                let { id } = val;
                console.log(id);
                this.dialogTableVisible = true
                this.detailId = id;
//                this.$router.push({
//                    name: '报表详情',
//                    params: {
//                        id: id
//                    }
//                })
            },
//            下载
            downloadClick (val) {
                let { id } = val;
                let exportDataOne = `${exportUrl}/export/down/${id}`;
                location.href = exportDataOne;
            },
            // 表格页码
            handleCurrentPageChange (val) {
                let pageSize = this.tableOptResult.pageOpt.pageSize;
                this.queryExportFrom(this.queryTime, this.ownerId, pageSize, val);
            },
            handleSizePageChange (val) {
                this.tableOptResult.pageOpt.pageSize = val;
                if (this.tableOptResult.data.length !== 0) {
                    this.queryExportFrom(this.queryTime, this.ownerId, val, 1);
                }
            },
//            生成报表
            async createExportFrom () {
//                this.tableOptResult.listLoading = true;
                let resp = await createExportFrom();
                console.log(resp);
                if (resp) {
                    let { message } = resp;
                    this.$message({
                        type: 'success',
                        message: message
                    });
                }
            },
//          获取报表列表
            async queryExportFrom (time, owner, pageSize, page) {
                this.tableOptResult.listLoading = true;
                let resp = await queryExportFrom({
                    'time': time,
                    'owner': owner,
                    'rows': pageSize,
                    'page': page
                });
                let { rows, total } = resp
                if (resp && _.isArray(rows)) {
//                    this.tableOptResult.pageOpt.currentPage = 1;
                    this.tableOptResult.listLoading = false;
                    this.tableOptResult.data = rows;
                }
                this.tableOptResult.listLoading = false;
                this.tableOptResult.data = rows;
                //                    给分页的总条数赋值
                this.tableOptResult.pageOpt.total = total;
            }
        },
//        created () {
//            let pageSize = this.tableOptResult.pageOpt.pageSize;
//            this.queryExportFrom('', this.ownerId, pageSize, 1)
//        },
        components: {
            reportForm,
            reportTable,
            sysDialog,
            reportDetailForm
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'userName': 'global/userName'
            }),
            taskId () {
                return localStorage.getItem('taskId');
            },
            ownerId () {
                return this.taskId ? this.taskId : this.userName;
            },
            tableSize () {
                return {
                    height: this.vsHeight - 90
                }
            }
        }
    }
</script>

<style scoped>
</style>

