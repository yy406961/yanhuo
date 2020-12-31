<template>
    <div class="ga-taskCreate">
        <el-row>
            <formComp :option="formOpt" ref="form"></formComp>
        </el-row>
        <el-row>
            <buttonComp :option="btnOptAdd"></buttonComp>
        </el-row>
        <el-row>
            <tableComp :option="tableOpt" :comSize="tableSize" @handleCurrentPageChange="" @handleSizePageChange = ""></tableComp>
        </el-row>
        <!--修改弹框-->
        
    </div>
</template>
<script>
    import formComp from 'components/Form/index'
    import buttonComp from 'components/Form/button'
    import tableComp from 'components/Table/'
    import { getUserNumber } from 'api/demo'
    import { mapGetters } from 'vuex'

    export default {
        name: 'taskCreate',
        data () {
            let me = this
            return {
                searchOpt: {
                    name: '',
                    taskPerson: '',
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
                                id: 'taskUser',
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
                                id: 'isGreenChannel',
                                value: '请选择',
                                disabled: false,
                                width: '90',
                                data: [{
                                    name: '是', value: '1'
                                }, {
                                    name: '否', value: '2'
                                }],
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
                                    console.log('点击查询');
                                    me.getSearch();
                                }
                            }
                        }
                    ]
                },
                btnOptAdd: {
                    value: '新增',
                    disabled: false,
                    click: function () {
//                        me.addClick();
                    }
                },
                tableOpt: {
//                    不设置width ，默认自适应
                    listLoading: false,
//                    是否为斑马纹 table
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '任务名称', value: 'name', width: 180, align: 'center' },
                        { name: '开始时间', value: 'beginTime', width: 150, align: 'center' },
                        { name: '结束时间', value: 'endTime', width: 150, align: 'center' },
                        { name: '任务管理员', value: 'taskAdmin', width: 100, align: 'center' },
                        { name: '任务使用人', value: 'taskPerson', width: 100, align: 'center' },
                        { name: '任务创建时间', value: 'createTime', width: 150, align: 'center' },
                        { name: '绿色通道', value: 'greenPass', width: 80, align: 'center' },
                        { name: '审批时间', value: 'agreeTime', width: 150, align: 'center' },
                        { name: '操作', value: '', align: 'center', operations: [
                            { label: '修改', icon: 'edit', click: me.editClick },
                            { label: '删除', icon: 'close' },
                            { label: '提交', icon: 'check' },
                            { label: '追加', icon: 'plus' },
                            { label: '撤回', icon: 'minus' }
                        ] }
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
                    cellClick: function (row) {
                        console.log(row);
                    }
                }
            }
        },
        components: {
            formComp, tableComp, buttonComp
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            tableSize () {
                return {
                    height: this.vsHeight - 150
                }
            }
        },
        created () {
            this.fetchData();
        },
        methods: {
//            测试数据
            async fetchData () {
                let resp = await getUserNumber(this.searchOpt);
                if (resp) {
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total
                }
            },
            getSearch () {
                this.searchOpt = Object.assign(this.searchOpt, this.$refs.form.getValue());
                this.fetchData();
            },
            editClick () {
                console.log(111)
            }
        }
    }
</script>
