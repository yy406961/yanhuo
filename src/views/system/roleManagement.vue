<template>
    <div width="100%" class="ga-role">
        <formComp :option="formOpt" ref="form"></formComp>
        <div class="ga-role__infoSearch">
            <i class="ga-role__infoSearch--imgAdd"></i>
            <buttonComp :option="btnOptAdd"></buttonComp>
            <i class="ga-role__infoSearch--imgMod"></i>
            <buttonComp :option="btnOptModify"></buttonComp>
            <i class="ga-role__infoSearch--imgDel"></i>
            <buttonComp :option="btnOptDel"></buttonComp>
        </div>
        <div class="ga-role__tableList">
            <tableComp :option="tableOpt" :comSize="tableSize" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange = "handleSizePageChange" @handleSelectionChange="handleSelectionChange"></tableComp>
        </div>
        <!--新增-弹出框-->
        <sysDialog  v-if="roleAddShow" :dialogVisible="roleAddShow" title="角色新增" size="small" @change="dialogChange" :okFn="confirmAddInfo">
            <el-row>
                <el-col :span="20" :offset="2">
                    <formComp :option="formOptAdd" ref="formAdd"></formComp>
                    <label class="roleComfirmLabel">角色授权</label>
                    <div class="roleComfirm">
                        <el-tree :data="rows"
                                 show-checkbox
                                 :props="defaultProps"
                                 default-expand-all
                                 ref="addTree"
                        >
                        </el-tree>
                    </div>
                </el-col>
            </el-row>
        </sysDialog>
        <!--修改-弹出框-->
        <sysDialog v-if="roleModifyShow" :dialogVisible="roleModifyShow" title="角色修改" size="small" @change="dialogChange" :okFn="confirmModifyInfo">
            <el-row>
                <el-col :span="20" :offset="2">
                    <formComp :option="formOptModify" ref="formModify"></formComp>
                    <label class="roleModifyLabel">角色授权</label>
                    <div class="roleModify">
                        <el-tree :data="rows"
                                 show-checkbox
                                 :props="defaultProps"
                                 default-expand-all
                                 ref="modifyTree"
                                 node-key="id"
                                 :default-checked-keys="this.autho"
                        >
                        </el-tree>
                    </div>
                </el-col>
            </el-row>
        </sysDialog>
    </div>
</template>
<script>
    import sysDialog from 'components/common/dialog'
    import formComp from 'components/Form/index'
    import buttonComp from 'components/Form/button'
    import tableComp from 'components/Table/'
    import { mapGetters, mapActions } from 'vuex'
    import { roleInfoQuery, roleSave, roleDelete, authTreeLoad } from 'api/system/roleManage.js'

    export default {
        name: 'roleManagement',
        data () {
            let me = this;
            return {
                autho: [],
                formHeight: '',
                getRowData: [],
                roleModifyShow: false,
                roleAddShow: false,
                rows: [],
                defaultProps: {
                    children: 'menus',
                    label: 'name'
                },
//                分页所需
                searchOpt: {
                    roleName: '',
                    roleId: '',
                    rows: 10,
                    page: 1
                },
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    btnPos: 'right',
                    labelWidth: '90',
                    // 表单项
                    items: [
                        {
                            label: '角色名称',
                            type: 'text',
                            comOpt: {
                                id: 'roleName',
                                value: '',
                                disabled: false,
                                width: '150'
                            }
                        },
                        {
                            label: '角色代码',
                            type: 'text',
                            comOpt: {
                                id: 'roleId',
                                value: '',
                                disabled: false,
                                width: '150'
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
                                    me.searchOpt.page = 1;
                                    me.getList();
                                }
                            }
                        }
                    ]
                },
                formOptAdd: {
                    // form 表单true横排，false竖排
                    inline: true,
                    btnPos: '',
                    labelWidth: '120',
                    // 表单项
                    items: [
                        {
                            label: '角色名称',
                            type: 'text',
                            required: true,
                            comOpt: {
                                id: 'addName',
                                value: '',
                                disabled: false,
                                width: '150'
                            }
                        },
//                        {
//                            label: '角色代码',
//                            type: 'text',
//                            required: true,
//                            comOpt: {
//                                id: 'addRoleId',
//                                value: '',
//                                disabled: false,
//                                width: '150'
//                            }
//                        },
                        {
                            label: '角色描述',
                            type: 'text',
                            comOpt: {
                                id: 'addDescription',
                                iptType: 'textarea',
                                width: 430,
                                rows: 3
                            }
                        }
                    ]
                },
                formOptModify: {
                    // form 表单true横排，false竖排
                    inline: true,
                    btnPos: '',
                    labelWidth: '120',
                    // 表单项
                    items: [
                        {
                            label: '角色名称',
                            type: 'text',
                            comOpt: {
                                id: 'modifyRoleName',
                                value: '',
                                disabled: false,
                                width: '150'
                            }
                        },
                        {
                            label: '角色代码',
                            type: 'text',
                            comOpt: {
                                id: 'modifyRoleId',
                                value: '',
                                disabled: true,
                                width: '150'
                            }
                        },
                        {
                            label: '角色描述',
                            type: 'text',
                            comOpt: {
                                id: 'modifyRoleDescription',
                                iptType: 'textarea',
                                width: 430,
                                rows: 3
                            }
                        }
                    ]
                },
                btnOptAdd: {
                    value: '新增',
                    disabled: false,
                    click: function () {
                        me.addClick();
                    }
                },
                btnOptModify: {
                    value: '修改',
                    disabled: false,
                    click: function () {
                        me.modifyClick();
                    }
                },
                btnOptDel: {
                    id: 'btnDel',
                    value: '删除',
                    disabled: false,
                    click: function () {
                        me.deleteClick();
                    }
                },
                tableOpt: {
                    // 不设置width ，默认自适应
                    listLoading: false,
                    // 	是否为斑马纹 table
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '', value: 'selection', width: 80, align: 'center' },
                        { name: '角色代码', value: 'roleId', width: 140, align: 'center' },
                        { name: '角色名称', value: 'roleName', width: 160, align: 'center' },
                        { name: '描述', value: 'description', align: 'center' }
                    ],
                    data: [],
                    // 是否分页
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
        components: {
            tableComp,
            formComp,
            buttonComp,
            sysDialog
        },
        methods: {
//            查询
            async roleInfoQuery () {
                this.tableOpt.listLoading = true;
                let resp = await roleInfoQuery(this.searchOpt);
                console.log(resp);
                if (resp) {
                    this.tableOpt.listLoading = false;
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total;
                }
            },
//            新增
            async roleAdd (addObj) {
                let resp = await roleSave(addObj);
                if (resp && resp.status === 201) {
                    this.$message({
                        type: 'success',
                        message: '新增成功'
                    });
                    this.roleInfoQuery();
                    this.roleAddShow = false;
                }
            },
//            修改
            async roleModify (modifyObj) {
                let resp = await roleSave(modifyObj);
                if (resp && resp.status === 201) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    this.setCheckedNodes();
                    this.roleInfoQuery();
                    this.dialogChange(false);
                }
            },
//            删除
            async roleDelete (id) {
                let resp = await roleDelete(id);
                if (resp && resp === 201) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
//                    this.roleInfoQuery();
                }
            },
//            获取功能授权树
            async authTreeLoad () {
                let resp = await authTreeLoad();
                if (resp && resp.status === 200) {
                    this.rows = resp.data;
                }
            },
            handleCurrentPageChange (val) {
                this.searchOpt.page = val;
                this.getList();
            },
            handleSizePageChange (val) {
                this.searchOpt.rows = val;
                this.getList();
            },
            handleSelectionChange (val) {
                this.getRowData = val;
                console.log(this.getRowData);
            },
            dialogChange (val) {
                this.roleAddShow = val;
                this.roleModifyShow = val;
            },
//            新增弹框确定
            confirmAddInfo () {
                let { addName: roleName, addDescription: description } = this.$refs.formAdd.getValue();
                let a = this.$refs.addTree.getCheckedNodes();
//                console.log(a);
                let authorityId = [];
                for (let i in a) {
                    authorityId.push(a[i].id);
                }
                let authority = authorityId.join(',');
//                console.log(authority);
                let addObj = { roleName, description, authority, type: 1 };
                if (addObj.roleName === null || addObj.roleName === '') {
                    this.$message({
                        type: 'warning',
                        message: '角色名称不能为空'
                    })
                } else if (addObj.description === null || addObj.description === '') {
                    this.$message({
                        type: 'warning',
                        message: '角色描述不能为空'
                    })
                } else if (addObj.authority === '') {
                    this.$message({
                        type: 'warning',
                        message: '功能授权不能为空'
                    })
                } else {
                    this.roleAdd(addObj);
                }
            },
//            编辑弹框确定
            confirmModifyInfo () {
                let { modifyRoleName: roleName, modifyRoleId: roleId, modifyRoleDescription: description } = this.$refs.formModify.getValue();
                let a = this.$refs.modifyTree.getCheckedNodes();
                let authorityId = [];
                for (let i in a) {
                    authorityId.push(a[i].id);
                }
                let authority = authorityId.join(',');
                if (authority !== null || authority !== '') {
                    let modifyObj = { roleName, roleId, description, authority, type: 2 };
                    this.roleModify(modifyObj);
                } else {
                    console.log('为null了');
                }
//                console.log(authority);
            },
            addClick () {
                this.roleAddShow = true;
                this.authTreeLoad();
            },
            modifyClick () {
                if (this.getRowData.length === 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择一行进行修改!'
                    })
                } else if (this.getRowData.length === 1) {
                    this.roleModifyShow = true;
                    this.authTreeLoad();
                    if (this.getRowData[0].autho) {
                        let authos = this.getRowData[0].autho.split(',');
                        this.autho = authos.map(function (data) {
                            return +data;
                        })
                    };
//                    console.log(this.autho);
                    this.formOptModify.items[0].comOpt.value = this.getRowData[0].roleName;
                    this.formOptModify.items[1].comOpt.value = this.getRowData[0].roleId;
                    this.formOptModify.items[2].comOpt.value = this.getRowData[0].description;
                    let me = this;
                    setTimeout(function () {
                        me.setCheckedNodes();
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '只能选择一条数据!'
                    })
                }
            },
            deleteClick () {
                if (this.getRowData.length === 0) {
                    this.$message({
                        type: 'warning',
                        message: '至少选择一条要删除的数据'
                    });
                } else {
                    this.$confirm('是否确认删除？', '删除提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        let roleIds = [];
                        for (let i in this.getRowData) {
                            roleIds.push(this.getRowData[i].roleId);
                        }
                        let roleId = {
                            roleId: roleIds.join(',')
                        };
                        this.roleDelete(roleId);
                        this.roleInfoQuery();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                        this.roleInfoQuery();
                    })
                }
            },
            getList () {
                let { roleId: roleId, roleName: roleName } = this.$refs.form.getValue();
                this.searchOpt.roleId = roleId;
                this.searchOpt.roleName = roleName;
                this.tableOpt.pageOpt.currentPage = this.searchOpt.page;
                this.roleInfoQuery()
            },
            ...mapActions({
                'syncHeight': 'global/syncVisualHeight'
            }),
            setCheckedNodes () {
                if (this.autho) {
                    this.$refs.modifyTree.setCheckedNodes([{
                        id: this.autho
                    }]);
                }
            }
        },
        mounted () {
            this.formHeight = this.$refs.form.getContainerHeight();
        },
        computed: {
            tableSize () {
                return {
                    height: this.vsHeight - this.formHeight - 100
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
        created () {
            this.roleInfoQuery();
//            this.authTreeLoad()
        }
    }
</script>
<style scoped>
    @component-namespace ga {
        @b role {
            @e infoSearch {
                margin-left: 28px;
                margin-bottom: 20px;
                margin-top: 5px;
                @m imgAdd {
                    display: inline-block;
                    padding-left: 24px;
                    height: 24px;
                    line-height: 24px;
                    vertical-align: bottom;
                    background-image: url('../../assets/images/system/add.png');
                    background-repeat: no-repeat;
                }
                @m imgMod {
                    display: inline-block;
                    padding-left: 24px;
                    margin-left: 20px;
                    height: 24px;
                    line-height: 24px;
                    vertical-align: bottom;
                    background-image: url('../../assets/images/system/change.png');
                    background-repeat: no-repeat;
                }
                @m imgDel {
                    display: inline-block;
                    padding-left: 24px;
                    margin-left: 20px;
                    height: 24px;
                    line-height: 24px;
                    vertical-align: bottom;
                    background-image: url('../../assets/images/system/delete.png');
                    background-repeat: no-repeat;
                }
            }
            @e form {
                width: 800px;
                margin-bottom: 10px;
                margin-top: 20px;
            }
            @e tableList {
                padding-left: 28px;
            }
            @e btnComps {
                margin-left: 240px;
                margin-top: 20px;
            }
            .roleComfirm {
                display: inline-block;
                width: 430px;
                height: 120px;
                border: 1px solid #015483;
                box-sizing: border-box;
                margin-left: -4px;
                padding-left: 50px;
                overflow: auto;
            }
            .roleComfirmLabel {
                display: inline-block;
                width: 120px;
                text-align: right;
                vertical-align: top;
                padding-right: 10px
            }
            .roleModify {
                display: inline-block;
                width: 430px;
                height: 120px;
                border: 1px solid #015483;
                box-sizing: border-box;
                margin-left: -4px;
                padding-left: 50px;
                overflow: auto;
            }
            .roleModifyLabel {
                display: inline-block;
                width: 120px;
                text-align: right;
                vertical-align: top;
                padding-right: 10px
            }
        }
    }
</style>
