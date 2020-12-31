<template>
    <div style="width: 100%;height: 100%">
        <div class='ga-select'>
            <formComp :option="formOpt" ref="form"></formComp>
        </div>
        <!--主要内容-->
        <div class='ga-mainContent'>
            <targetMsgTable :option="tableOptResult" :comSize="tableSize" @handleCurrentPageChange="handleCurrentPageChange"
                               @handleSizePageChange="handleSizePageChange"></targetMsgTable>
        </div>
        <!-- 新增/修改弹框 -->
        <targetNumManageDialog size="mini" :title="dialogTitle"
                            :okFn="okFn"
                            @change="dialogTableChange"
                            :dialogVisible="dialogFormVisible">
            <div class="add">
                <formComp :option="formAddOpt" ref="formDialog"></formComp>
            </div>
        </targetNumManageDialog>
    </div>
</template>

<script>
    import formComp from 'components/Form'
    import targetMsgTable from 'components/Table'
    import targetNumManageDialog from 'components/common/dialog'
    import { getFlagList, addFlag, updateFlag, deleteFlag } from 'api/system/tarNumLabelMag'
    import { mapGetters } from 'vuex'
    export default {
        name: 'targetMsgManger',
        data () {
            let me = this;
            return {
                dialogFormVisible: false,
                flagId: '',
                dialogTitle: '',
                updateFlageId: '',
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    // 表单项
                    items: [
                        {
                            label: '标签名称',
                            type: 'select',
                            comOpt: {
                                id: 'flagId',
                                value: '',
                                width: 200,
                                disabled: false,
                                data: [],
                                change: function (val) {
                                    console.log(val);
                                    me.flagId = val
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                // id: 'yq12',
                                value: '查询',
                                disabled: false,
                                click: function () {
                                    let pageSize = me.tableOptResult.pageOpt.pageSize;
                                    me.tableOptResult.pageOpt.currentPage = 1;
                                    me.getFlagList(me.flagId, pageSize, 1);
                                }
                            }
                        }, {
                            label: '',
                            type: 'button',
                            wrap: true,
                            comOpt: {
                                // id: 'yq12',
                                value: '新增',
                                disabled: false,
                                click: function () {
                                    me.dialogFormVisible = true
                                    me.dialogTitle = '目标号码标签新增'
                                }
                            }
                        }
                    ]
                },
                formAddOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    // 表单项
                    items: [
                        {
                            label: '标签名称',
                            type: 'text',
                            comOpt: {
                                id: 'flagName',
                                width: 200,
                                value: '',
                                disabled: false
                            }
                        }
                    ]
                },
                tableOptResult: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 300, align: 'center' },
                        { name: '标签名称', value: 'flagName', align: 'center' },
                        { name: '操作', value: '', width: 240, align: 'center', operations: [
                            { label: '修改', type: 'label', click: me.updateClick },
                            { label: '删除', type: 'label', click: me.deleteClick }
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
        methods: {
            okFn () {
                console.log(this.dialogTitle);
                let resp = this.$refs.formDialog.getValue();
                let { flagName } = resp
                if (this.dialogTitle === '目标号码标签新增') {
                    this.addFlag(flagName)
                    console.log(flagName);
                }
                if (this.dialogTitle === '目标号码标签修改') {
                    this.updateFlag(this.updateFlageId, flagName);
                }
                this.$refs.formDialog.clearValue()
            },
            // 任务列表提示框
            dialogTableChange (val) {
                this.dialogFormVisible = val;
                this.$refs.formDialog.clearValue()
            },
            updateClick (val) {
                this.dialogFormVisible = true
                this.dialogTitle = '目标号码标签修改'
                console.log(val);
                let { flagId, flagName } = val
                this.updateFlageId = flagId
                this.$nextTick(() => {
                    console.log(flagName)
                    this.$refs.formDialog.setValue([{ id: 'flagName', value: flagName }])
                })
            },
            deleteClick (val) {
                let { flagId } = val
                this.deleteFlag(flagId)
            },
//            初始化下啦菜单
            async getFlagSelect () {
                let resp = await getFlagList();
                let { rows, status } = resp
                console.log(resp);
                let flagNameList = []
                if (resp && status === 200 && _.isArray(rows)) {
                    flagNameList.push({ name: '全部', value: '' })
                    rows.forEach((item, index) => {
                        let { flagId, flagName } = item
                        flagNameList[index + 1] = { name: flagName, value: flagId }
                    })
//                    flagNameList.push({ name: '全部', value: '' })
//                    console.log(flagNameList);
                    this.$refs.form.setItemData('flagId', flagNameList)
                }
            },
            // 获取号码标签页列表
            async getFlagList (id, pageSize, page) {
                this.tableOptResult.data = [];
                this.tableOptResult.listLoading = true;
                let resp = await getFlagList({
                    'flagId': id,
                    'rows': pageSize,
                    'page': page
                });
                let { rows, total } = resp;
                if (rows) {
                    this.tableOptResult.data = rows;
                    this.tableOptResult.pageOpt.total = total;
                    this.tableOptResult.listLoading = false;
                }
            },
            // 结果列表分页
            handleCurrentPageChange (val) {
                this.tableOptResult.pageOpt.currentPage = val;
                let pageSize = this.tableOptResult.pageOpt.pageSize;
                this.getFlagList(this.flagId, pageSize, val);
            },
            handleSizePageChange (val) {
                this.tableOptResult.pageOpt.currentPage = 1;
                this.tableOptResult.pageOpt.pageSize = val;
                if (this.tableOptResult.data.length !== 0) {
                    this.getFlagList(this.flagId, val, 1);
                }
            },
            // 新增目标号码标签接口
            async addFlag (val) {
                let reg = /\s+/g
                if (val.match(reg)) {
                    this.$message({
                        type: 'warning',
                        message: '目标号码标签不能有空格'
                    });
                } else {
                    let resp = await addFlag({
                        'flagName': val
                    });
                    if (resp) {
                        this.dialogFormVisible = false
                        let pageSize = this.tableOptResult.pageOpt.pageSize;
                        this.tableOptResult.pageOpt.currentPage = 1;
                        this.getFlagList('', pageSize, 1);
                        this.getFlagSelect();
                    }
                }
            },
            // 删除目标号码标签接口
            async deleteFlag (val) {
                let resp = await deleteFlag({
                    'flagId': val
                });
                if (resp && resp.status === 201) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    let pageSize = this.tableOptResult.pageOpt.pageSize;
                    this.tableOptResult.pageOpt.currentPage = 1;
                    this.getFlagList('', pageSize, 1);
                    this.getFlagSelect();
                }
            },
            //  修改目标号码标签接口
            async updateFlag (id, name) {
                let resp = await updateFlag({
                    'flagName': name,
                    'flagId': id
                })
                if (resp) {
                    this.dialogFormVisible = false
                    this.$refs.form.setValue([{ id: 'flagId', value: '' }])
                    let pageSize = this.tableOptResult.pageOpt.pageSize;
                    this.tableOptResult.pageOpt.currentPage = 1;
                    if (this.flagId) {
                        this.getFlagList(id, pageSize, 1);
                    } else {
                        this.getFlagList('', pageSize, 1);
                    }
                    this.getFlagSelect();
                    this.$refs.form.clearValue()
                }
            }
        },
        mounted () {
            this.getFlagSelect()
            let pageSize = this.tableOptResult.pageOpt.pageSize;
            this.tableOptResult.pageOpt.currentPage = 1;
            this.getFlagList('', pageSize, 1);
        },
        components: {
            formComp,
            targetMsgTable,
            targetNumManageDialog
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
    @component-namespace ga {
        /*上方选择框*/
        @b select {
            padding-top: 5px;
            margin-bottom: 15px;
            /*目标选择*/
            @e targetSelect {
                width: 81px;
                height: 38px;
                background-color: rgb(39, 141, 227);
                border: none;
                color: #fff;
                border-radius: 4px;
            }
            @e targetSelect:hover {
                cursor: pointer;
            }
        }
    }
</style>
