<template>
    <div class="ga-taskAgree">
        <el-row>
            <formComp :option="formOpt" ref="form"></formComp>
        </el-row>
        <el-row>
            <tableComp :option="tableOpt" :comSize="tableSize" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange = "handleSizePageChange"></tableComp>
        </el-row>
    </div>
</template>
<script>
    import formComp from 'components/Form/index'
    import tableComp from 'components/Table/'
    import { mapGetters } from 'vuex'
    import { getAllList } from 'api/system/taskAgree.js'
    // import firstTab from './taskAgreeConfig/one'
    // import secondTab from './taskAgreeConfig/two'
    // import thirdTab from './taskAgreeConfig/three'
    // import fourthTab from './taskAgreeConfig/four'
    // import fifthTab from './taskAgreeConfig/five'

    export default {
        name: 'taskAgree',
        data () {
            let me = this;
            return {
                taskBaseId: '',
                agreeData: {
                    approverStatus: '',
                    approverId: '',
                    taskBaseId: '',
                    dialogShow: false
                },
                listData: '',
                taskName: '',
                dialogShow: true,
                activeName: 'firstTab',
                searchOpt: {
                    fileNo: '',
                    taskName: '',
                    owner: '',
                    approverStatus: '1',
                    greenChannel: '0',
                    rows: 10,
                    page: 1
                },
                formOpt: {
//                    form 表单true横排，false竖排
                    inline: true,
                    btnPos: 'right',
                    labelWidth: '90',
                    // 表单项
                    items: [
                        {
                            label: '任务名称',
                            type: 'text',
                            comOpt: {
                                id: 'taskName',
                                value: '',
                                disabled: false,
                                width: '150'
                            }
                        },
                        {
                            label: '任务使用人',
                            type: 'text',
                            comOpt: {
                                id: 'owner',
                                value: '',
                                disabled: false,
                                width: '150'
                            }
                        },
                        {
                            label: '批准文号',
                            type: 'text',
                            comOpt: {
                                id: 'fileNo',
                                value: '',
                                disabled: false,
                                width: '150'
                            }
                        },
                        {
                            label: '绿色通道',
                            type: 'select',
                            comOpt: {
                                id: 'greenChannel',
                                value: '0',
                                disabled: false,
                                width: '90',
                                data: [
//                                    {
//                                        name: '全部', value: ''
//                                    },
                                    {
                                        name: '是', value: '1'
                                    },
                                    {
                                        name: '否', value: '0'
                                    }
                                ],
                                change: function () {
                                    me.tableOpt.pageOpt.currentPage = 1;
                                }
                            }
                        },
                        {
                            label: '审批状态',
                            type: 'select',
                            comOpt: {
                                id: 'approverStatus',
                                value: '1',
                                disabled: false,
                                width: '130',
                                data: [
//                                    {
//                                        name: '全部', value: ''
//                                    },
                                    {
                                        name: '已提交', value: '1'
                                    },
                                    {
                                        name: '审批未通过', value: '2'
                                    },
                                    {
                                        name: '审批已通过', value: '3'
                                    }
                                ],
                                change: function () {
                                }
                            }
                        }
                    ],
                    btns: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '查询',
                                disabled: false,
                                click: function () {
//                                    console.log('点击查询');
                                    // console.log(me.$refs.form.getValue())
                                    me.getSearch();
                                }
                            }
                        }
                    ]
                },
                tableOpt: {
//                    不设置width ，默认自适应
                    listLoading: false,
//                    是否为斑马纹 table
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '任务名称', value: 'taskName', width: 180, align: 'center' },
                        { name: '开始时间', value: 'beginTime', width: 150, align: 'center' },
                        { name: '结束时间', value: 'endTime', width: 150, align: 'center' },
                        { name: '任务管理员', value: 'taskCreater', width: 130, align: 'center' },
                        { name: '任务使用人', value: 'owner', width: 130, align: 'center' },
                        { name: '任务创建时间', value: 'taskCreateTime', width: 150, align: 'center' },
                        { name: '绿色通道', value: 'greenChannel', width: 80, align: 'center' },
                        { name: '审批时间', value: 'approverTime', width: 150, align: 'center' },
                        { name: '操作', value: '', align: 'center', operations: [{ label: '审批', type: 'label', click: me.agreeClick,
                            callback (row) {
                                me.taskBaseId = row.taskBaseId;
                                me.listData = row;
//                                console.log(me.listData);
//                                if (row.approverStatus === 3) {
//                                    this.disabled = true;
//                                } else {
//                                    this.disabled = false;
//                                }
                            }
                        }]
                        }
                    ],
                    data: [],
                    // 是否分页
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    },
                    rowClick: function (row) {
//                        console.log(1);
                        me.taskName = row.taskName;
                        me.agreeData = row;
                        // console.log(me.agreeData);
                    }
                }
            }
        },
        computed: {
            tableSize () {
                return {
                    height: this.vsHeight - 100
                }
            },
            boxHeight () {
                return {
                    height: this.vsHeight - 100 + 'px'
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
        created () {
            this.getAllList()
        },
        components: { formComp, tableComp },
        methods: {
//            查询数据
            async getAllList () {
                let resp = await getAllList(this.searchOpt);
                if (resp) {
                    resp.rows.map((item) => {
                        if (item.greenChannel === '1') {
                            item.greenChannel = '是'
                        } else {
                            item.greenChannel = '否'
                        }
                    })
                    // console.log(resp);
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total
                }
            },
//            分页重新加载
            async reloadGetAllList () {
                let resp = await getAllList(this.searchOpt);
                if (resp) {
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total
                }
            },
            handleCurrentPageChange (val) {
                this.searchOpt.page = val;
                this.getAllList();
            },
            handleSizePageChange (val) {
                this.searchOpt.rows = val;
//                备注：是否跳回第一页
                this.searchOpt.page = 1;
                this.tableOpt.pageOpt.currentPage = 1;
                this.getAllList();
            },
            agreeClick (row) {
                // console.log(row);
//                this.$emit('listData', row);
                this.$router.push({
                    name: '审批详情',
                    params: {
                        taskId: `T${row.taskBaseId}`,
                        owner: row.owner,
                        approvalId: row.approvalId,
                        taskBaseId: row.taskBaseId,
                        approverStatus: row.approverStatus,
//                        listData: row,
                        operateStatus: 1

                    }
                })
            },
//            dialogChange (val) {
//                this.activeName = 'firstTab';
//            },
            getSearch () {
                this.searchOpt = Object.assign(this.searchOpt, this.$refs.form.getValue());
                this.searchOpt.rows = this.tableOpt.pageOpt.pageSize;
//                console.log(this.searchOpt);
                this.tableOpt.pageOpt.currentPage = 1;
                if (this.searchOpt.greenChannel === '请选择') {
                    this.searchOpt.greenChannel = '0';
                }
                this.getAllList();
            }
        }
    }
</script>
<style>
    .ga-taskAgree__box {
        border: 1px solid rgb(71, 130, 209);
        box-shadow: rgb(71, 130, 209) 0px 0px 10px inset;
    }
</style>
