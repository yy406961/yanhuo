<template>
    <div style="width: 100%;" class="ga-personnel">
        <el-row :span="24">
            <el-col :span="5" class="ga-personnel__left">
                <div class="ga-personnel__left--boxs" :style="treeWrapHeight">
                    <div class="ga-containerBorder__leftTop"></div>
                    <div class="ga-containerBorder__leftBot"></div>
                    <div class="ga-containerBorder__rightTop"></div>
                    <div class="ga-containerBorder__rightBot"></div>
                    <div class="ga-personnel__left--boxTitle">组织机构树</div>
                    <!-- <span class="ga-personnel__left--box" :class="span.className" :key="span.className" v-for="span in spans"></span> -->
                    <div :style="treeDivHeight" class="treeDivHeight">
                        <el-tree :data="rows"
                                 :props="defaultProps"
                                 highlight-current
                                 @node-click="handleNodeClick"
                                 :style="treeHeight">
                        </el-tree>
                    </div>
                </div>
            </el-col>
            <el-col :span="19" class="ga-personnel__right">
                <!-- 表单 -->
                <FormComp class="formMarginTB" :option="formOpt" ref="form"></FormComp>
                <!-- 按钮 -->
                <div class="ga-personnel__right--btFunc">
                    <!-- <i class="ga-personnel__right--btFunc_imgAdd"></i> -->
                    <buttonComp :option="btnOptAdd"></buttonComp>
                    <!-- <i class="ga-personnel__right--btFunc_imgModModify"></i> -->
                    <buttonComp :option="btnOptModify"></buttonComp>
                    <!-- <i class="ga-personnel__right--btFunc_imgDel"></i> -->
                    <!-- <i class="ga-personnel__right--btFunc_imgReset"></i> -->
                    <buttonComp :option="btnOptReset"></buttonComp>
                    <buttonComp :option="btnOptDel"></buttonComp>
                </div>
                <!-- 表格 -->
                <tableComp class="ga-personnel__right--tableList" :option="tableOpt" :comSize="tableSize" ref="tableShow"
                           @handleCurrentPageChange="handleCurrentPageChange"
                           @handleSizePageChange = "handleSizePageChange"
                           @handleSelectionChange="handleSelectionChange">
                </tableComp>
            </el-col>
        </el-row>
        <!--新增模态框-->
        <sysDialog v-if="personnelAddShow"
            :dialogVisible="personnelAddShow"
            title="新增用户信息"
            size="small"
            @change="dialogAddChange"
            :okFn="personnelAdd">
            <el-row>
                <el-col :span="21" :offset="2" style="overflow: auto;height: 400px">
                    <FormComp :option="formAddOne" ref="formAddOne"></FormComp>
                    <span style="margin-left: 30px"> (手机,固定电话,电子邮箱三个当中至少录入一个)</span>
                    <FormComp :option="formAddTwo" ref="formAddTwo"></FormComp>
                    <label class="personnelAddLabel">所属部门：</label>
                    <div class="deptComfirm">
                        <textComp :option="textAddOpt" :value="addDeptName" ref="textAddOpt"></textComp>
                        <span class="redStar">*</span>
                        <div class="personnelAddForm">
                            <el-tree :data="rows"
                                     :props="defaultProps"
                                     accordion
                                     highlight-current
                                     default-expand-all
                                     ref="addTreeDept"
                                     @node-click="handleNodeClickAdd">
                            </el-tree>
                        </div>
                    </div>
                    <FormComp :option="formAddThree" ref="formAddThree"></FormComp>
                    <label class="personnelAddLabel">角色授权：</label>
                    <div class="personnelAddForm">
                        <el-tree :data="roleName"
                                 show-checkbox
                                 :props="personnelProps"
                                 default-expand-all
                                 ref="addTree">
                        </el-tree>
                    </div>
                    <FormComp :option="formFour" ref="formAddFour"></FormComp>
                </el-col>
            </el-row>
        </sysDialog>
        <!--修改模态框-->
        <sysDialog v-if="personnelModifyShow" :dialogVisible="personnelModifyShow" title="修改用户信息" size="small" @change="dialogModifyChange" :okFn="personnelModify" >
            <el-row>
                <el-col :span="21" :offset="2" style="overflow: auto;height: 400px">
                    <FormComp :option="formModifyOne" ref="formModifyOne"></FormComp>
                    <span style="margin-left: 30px"> (手机,固定电话,电子邮箱三个当中至少录入一个)</span>
                    <FormComp :option="formModifyTwo" ref="formModifyTwo"></FormComp>
                    <label class="personnelAddLabel">所属部门：</label>
                    <div class="deptComfirm">
                        <textComp :option="textModifyOpt" :value="modifyDeptName"></textComp>
                        <span class="redStar">*</span>
                        <div class="personnelAddForm">
                            <el-tree :data="rows"
                                     :props="defaultProps"
                                     accordion
                                     highlight-current
                                     default-expand-all
                                     node-key="deptId"
                                     ref="modifyTreeDept"
                                     @node-click="handleNodeClickModify">
                            </el-tree>
                        </div>
                    </div>
                    <FormComp :option="formModifyThree" ref="formModifyThree"></FormComp>
                    <label class="personnelModifyLabel">角色授权：</label>
                    <div class="personnelModifyForm">
                        <el-tree :data="roleName"
                                 show-checkbox
                                 :props="personnelProps"
                                 default-expand-all
                                 ref="modifyTree"
                                 node-key="id">
                        </el-tree>
                    </div>
                    <FormComp :option="formFour" ref="formModifyFour"></FormComp>
                </el-col>
            </el-row>
        </sysDialog>
    </div>
</template>
<script>
    import textComp from 'components/Form/text'
    import FormComp from 'components/Form/index'
    import buttonComp from 'components/Form/button'
    import tableComp from 'components/Table'
    import sysDialog from 'components/common/dialog'
    import { userInfoQuery, userSave, userDelete, userPwdUpdate, deptOrgTreeLoad,
        rolesList, usersById } from 'api/system/personnelManagement'
    import { mapGetters } from 'vuex'
    import { addMarkId } from 'utils'
    export default {
        name: 'personnel',
        data () {
            let me = this;
            return {
                roleArr: false,
                rolesArr: false,
                resourceId: '',
                type: [],
                treeHead: {},
                formHeight: '',
                rows: [],
                defaultProps: {
                    children: 'depts',
                    label: 'deptName'
                },
                personnelProps: {
                    id: 'id',
                    label: 'roleName'
                },
                roleName: [],
                roleIds: [],
                roleNames: [],
                formObj: {
                    deptId: '',
                    userName: '',
                    userNick: '',
                    phone: '',
                    status: '',
                    rows: 10,
                    page: 1
                },
                personnelAddShow: false,
                personnelModifyShow: false,
                tableSelections: [],
                selfName: '',
                selfId: '',
                deptSupId: '',
                addDeptName: '',
                modifyDeptName: '',
//                新增弹框所属部门树text框
                textAddOpt: {
                    id: '',
                    value: '',
                    width: 200,
                    disabled: true,
                    placeholder: '请选择'
                },
//                修改弹框所属部门树text框
                textModifyOpt: {
                    id: '',
                    value: '',
                    width: 200,
                    disabled: true
                },
//                弹框所属部门树
                treeSearchOpt: {
                    deptTreeId: '',
                    rows: 10,
                    page: 1
                },
//                查询条件
                formOpt: {
                    labelWidth: '78',
                    labelPos: 'right',
                    inline: true,
                    btnPos: 'right',
                    items: [{
                        label: '账号：',
                        type: 'text',
                        comOpt: {
                            id: 'userName',
                            value: '',
                            disabled: false,
                            width: '150'
                        }
                    }, {
                        label: '姓名：',
                        type: 'text',
                        comOpt: {
                            id: 'userNick',
                            value: '',
                            disabled: false,
                            width: '150'
                        }
                    }, {
                        label: '手机号：',
                        type: 'text',
                        comOpt: {
                            id: 'phone',
                            value: '',
                            disabled: false,
                            width: '150'
                        }
                    }, {
                        label: '用户状态：',
                        type: 'select',
                        comOpt: {
                            id: 'status',
                            value: 2,
                            disabled: false,
                            width: '100',
                            data: [{
                                name: '全部', value: 2
                            }, {
                                name: '有效', value: 0
                            }, {
                                name: '终止', value: 1
                            }],
                            change: function () {
                            }
                        }
                    }],
                    btns: [{
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '查询',
                            disabled: false,
                            click () {
                                me.getList();
                                me.userInfoQuery();
                            }
                        }
                    }]
                },
//                新增弹框
                formAddOne: {
                    labelWidth: '100',
                    inline: true,
                    items: [{
                        label: '账号：',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'userName',
                            value: '',
                            placeholder: '请输入账号',
                            disabled: false,
                            width: '150'
                        }
                    }, {
                        label: '姓名：',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'userNick',
                            value: '',
                            placeholder: '请输入姓名',
                            disabled: false,
                            width: '150'
                        }
                    }, {
                        label: '警号：',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'alarmId',
                            value: '',
                            placeholder: '请输入警号',
                            disabled: false,
                            width: '150'
                        }
                    }, {
                        label: '手机号：',
                        type: 'text',
                        comOpt: {
                            id: 'phone',
                            value: '',
                            placeholder: '请输入手机号',
                            disabled: false,
                            width: '150'
                        }
                    }, {
                        label: '固定电话：',
                        type: 'text',
                        comOpt: {
                            id: 'telphone',
                            value: '',
                            placeholder: '请输入固定电话',
                            disabled: false,
                            width: '150'
                        }
                    }, {
                        label: '电子邮箱：',
                        type: 'text',
                        comOpt: {
                            id: 'email',
                            value: '',
                            placeholder: '请输入电子邮箱',
                            disabled: false,
                            width: '150'
                        }
                    }]
                },
                formAddTwo: {
                    labelWidth: '100',
                    inline: true,
                    items: [{
                        label: '备注：',
                        type: 'text',
                        comOpt: {
                            value: '',
                            id: 'remark',
                            placeholder: '请输入备注',
                            iptType: 'textarea',
                            width: '300',
                            rows: 3
                        }
                    }]
                },
                formAddThree: {
                    labelWidth: '100',
                    inline: true,
                    items: [{
                        label: '用户状态：',
                        type: 'select',
                        comOpt: {
                            id: 'status',
                            value: '0',
                            disabled: true,
                            width: '200',
                            data: [{
                                name: '有效', value: '0'
                            }, {
                                name: '终止', value: '1'
                            }],
                            change: function () {
                            }
                        }
                    }]
                },
                formFour: {
                    labelWidth: '265',
                    inline: true,
                    required: true,
                    items: [{
                        label: '是否有查看实时监测短信内容的权限：',
                        type: 'radio',
                        comOpt: {
                            id: 'isMsg',
                            value: '1',
                            disabled: false,
                            data: [{
                                name: '是', value: '0'
                            }, {
                                name: '否', value: '1'
                            }],
                            change: function () {
                            }
                        }
                    }]
                },
//                修改弹框
                formModifyOne: {
                    labelWidth: '100',
                    inline: true,
                    required: true,
                    items: [{
                        label: '账号：',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'userName',
                            value: '',
                            disabled: true,
                            width: '150'
                        }
                    }, {
                        label: '姓名：',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'userNick',
                            value: '',
                            disabled: false,
                            width: '150'
                        }
                    }, {
                        label: '警号：',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'alarmId',
                            value: '',
                            placeholder: '请输入警号',
                            disabled: false,
                            width: '150'
                        }
                    }, {
                        label: '手机号：',
                        type: 'text',
                        comOpt: {
                            id: 'phone',
                            value: '',
                            disabled: false,
                            width: '150'
                        }
                    }, {
                        label: '固定电话：',
                        type: 'text',
                        comOpt: {
                            id: 'telphone',
                            value: '',
                            disabled: false,
                            width: '150'
                        }
                    }, {
                        label: '电子邮箱：',
                        type: 'text',
                        comOpt: {
                            id: 'email',
                            value: '',
                            disabled: false,
                            width: '150'
                        }
                    }]
                },
                formModifyTwo: {
                    labelWidth: '100',
                    inline: true,
                    items: [{
                        label: '备注：',
                        type: 'text',
                        comOpt: {
                            value: '',
                            id: 'remark',
                            placeholder: '请输入备注',
                            iptType: 'textarea',
                            width: '300',
                            rows: 3
                        }
                    }]
                },
                formModifyThree: {
                    labelWidth: '100',
                    inline: true,
                    required: true,
                    items: [{
                        label: '用户状态：',
                        type: 'select',
                        comOpt: {
                            id: 'status',
                            value: '0',
                            disabled: false,
                            width: '200',
                            data: [{
                                name: '有效', value: '0'
                            }, {
                                name: '终止', value: '1'
                            }],
                            change: function () {
                            }
                        }
                    }]
                },
//                新增按钮
                btnOptAdd: {
                    id: 'btnAdd',
                    value: '新增',
                    disabled: false,
                    click: function () {
                        me.personnelAddShow = true;
                        me.rolesList();
                        me.textAddOpt.value = me.selfName;
                        me.roleName = [];
                        me.roleIds = [];
                    }
                },
//                修改按钮
                btnOptModify: {
                    id: 'btnModify',
                    value: '修改',
                    disabled: false,
                    click: function () {
                        me.modifyClick();
                    }
                },
//                删除按钮
                btnOptDel: {
                    id: 'btnDel',
                    value: '删除',
                    disabled: false,
                    btnSize: 'danger',
                    click: function () {
                        me.deleteClick();
                    }
                },
//                重置密码按钮
                btnOptReset: {
                    id: 'btnOptReset',
                    value: '重置密码',
                    disabled: false,
                    click: function () {
                        me.resetClick();
                    }
                },
//                表格
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '', value: 'selection', width: '50', align: 'center', fixed: 'left' },
                        { name: '账号', value: 'userName', width: '100', align: 'center', fixed: 'left' },
                        { name: '姓名', value: 'userNick', width: '180', align: 'center', fixed: 'left' },
                        { name: '警号', value: 'alarmId', width: '100', align: 'center' },
                        { name: '所属部门', value: 'deptName', width: '150', align: 'center' },
                        { name: '手机', value: 'phone', width: '150', align: 'center' },
                        { name: '固定电话', value: 'telphone', width: '100', align: 'center' },
                        { name: '电子邮箱', value: 'email', width: '230', align: 'center' },
                        { name: '角色', value: 'rolename', width: '150', align: 'center' },
                        { name: '用户状态', value: 'statusName', width: '', align: 'center' }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
//                左侧机构数方框四个角
                spans: [{
                    className: 'ga-personnel__left--box_lf'
                }, {
                    className: 'ga-personnel__left--box_rt'
                }, {
                    className: 'ga-personnel__left--box_ld'
                }, {
                    className: 'ga-personnel__left--box_rd'
                }],
                currentPage: 1,
                pageSize: 10
            }
        },
        components: {
            sysDialog,
            FormComp,
            buttonComp,
            tableComp,
            textComp
        },
//        页面加载时请求的接口
        created () {
            // this.userInfoQuery();
            // this.deptOrgTreeLoad(null);
        },
        methods: {
//            表格数据-可根据条件查询
            async userInfoQuery () {
                this.tableOpt.listLoading = true;
                this.tableOpt.data = []
                let resp = await userInfoQuery(this.formObj);
                if (resp && resp.status === 200) {
                    this.tableOpt.listLoading = false;
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total
                }
            },
//            新增接口
            async userAdd (addObj) {
                let resp = await userSave(addObj);
                if (resp && resp.status === 201) {
                    this.dialogAddChange(false);
                    this.userInfoQuery();
                    this.deptSupId = '';
                }
            },
//            修改接口
            async userModify (ModifyObj) {
                ModifyObj.resourceId = this.resourceId;
                let resp = await userSave(ModifyObj);
                if (resp && resp.status === 201) {
                    this.dialogModifyChange(false);
                    this.userInfoQuery();
                }
            },
//            删除接口
            async userDelete (id) {
                let resp = await userDelete(id);
                if (resp && resp.status === 201) {
                    this.userInfoQuery();
                }
            },
//            重置密码接口
            async userPwdUpdate (id) {
                let resp = await userPwdUpdate(id);
                if (resp && resp.status === 201) {}
            },
//            页面左侧组织机构数树and弹框内所属部门树
            async deptOrgTreeLoad () {
                let resp = await deptOrgTreeLoad();
                if (resp && resp.status === 200) {
                    this.rows = resp.data;
                }
            },
//            弹框内角色授权树
            async rolesList () {
                let resp = await rolesList();
                if (resp && resp.status === 200) {
                    let arr = resp.rows;
                    for (let i in resp.rows) {
                        let { roleId: id, roleName: roleName } = arr[i];
                        this.roleName.push({ id, roleName })
                    }
                }
            },
//            修改时修改弹框的数据
            async usersById () {
                let resp = await usersById(this.resourceId);
                let idArr = [];
                if (resp.data.roleIds) {
                    idArr = resp.data.roleIds.split(',');
                    for (let i = 0; i < idArr.length; i++) {
                        idArr[i] = Number(idArr[i])
                    }
                }
                if (resp && resp.status === 200) {
                    this.formModifyOne.items[0].comOpt.value = resp.data.userName;
                    this.formModifyOne.items[1].comOpt.value = resp.data.userNick;
                    this.formModifyOne.items[2].comOpt.value = resp.data.alarmId;
                    this.formModifyOne.items[3].comOpt.value = resp.data.phone;
                    this.formModifyOne.items[4].comOpt.value = resp.data.telphone;
                    this.formModifyOne.items[5].comOpt.value = resp.data.email;
                    this.formModifyTwo.items[0].comOpt.value = resp.data.remark;
                    this.deptSupId = resp.data.deptId;
                    this.textModifyOpt.value = resp.data.deptName;
                    if (resp.data.status === 1) {
                        this.$refs.formModifyThree.setValue([{ 'id': 'status', value: '1' }])
                    } else if (resp.data.status === 0) {
                        this.$refs.formModifyThree.setValue([{ 'id': 'status', value: '0' }])
                    }
                    if (resp.data.isMsg === 1) {
                        this.$refs.formModifyFour.setValue([{ 'id': 'isMsg', value: '1' }])
                    } else if (resp.data.isMsg === 0) {
                        this.$refs.formModifyFour.setValue([{ 'id': 'isMsg', value: '0' }])
                    }
                    this.$nextTick(function () {
                        let arr = [];
                        for (let i in idArr) {
                            let obj = {
                                id: ''
                            };
                            obj.id = idArr[i];
                            arr[i] = obj
                        }
                        this.$refs.modifyTree.setCheckedNodes(arr);
                    })
                }
            },
//            表格currentPage改变时触发
            handleCurrentPageChange (val) {
                this.currentPage = val;
                this.formObj.page = val;
                this.userInfoQuery();
            },
//            表格pageSize改变时触发
            handleSizePageChange (val) {
                this.pageSize = val;
                this.formObj.rows = val;
                this.getList();
            },
//            表格复选框，当选择项发生变化时会触发该事件
            handleSelectionChange (val) {
                this.tableSelections = val;
                if (val.length) {
                    this.resourceId = val[0].resourceId;
                }
            },
            addMarkId,
//            新增弹框关闭按钮
            dialogAddChange (val) {
                this.personnelAddShow = val;
            },
//            修改弹框关闭按钮
            dialogModifyChange (val) {
                this.personnelModifyShow = val;
            },
//            修改按钮事件
            async modifyClick () {
                if (this.tableSelections.length === 0) {
                    this.$alert('请选择一条需要修改的数据', {
                        confirmButtonText: '确定'
                    });
                } else if (this.tableSelections.length === 1) {
                    this.personnelModifyShow = true;
                    this.roleName = [];
                    this.roleIds = [];
                    let resp = await rolesList();
                    if (resp && resp.status === 200) {
                        let arr = resp.rows;
                        for (let i in resp.rows) {
                            let { roleId: id, roleName: roleName } = arr[i];
                            this.roleName.push({ id, roleName })
                        }
                    }
                    this.usersById();
                } else {
                    this.$alert('单次只能选择一条需要修改的数据', {
                        confirmButtonText: '确定'
                    });
                }
            },
//            删除按钮事件
            deleteClick () {
                if (this.tableSelections.length === 0) {
                    this.$alert('至少选择一条要删除的数据', {
                        confirmButtonText: '确定'
                    });
                } else {
                    let n = this.tableSelections.length;
                    this.$confirm('是否确认删除' + n + '条数据？', '删除提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        let resourceIds = [];
                        for (let i in this.tableSelections) {
                            resourceIds.push(this.tableSelections[i].resourceId);
                        }
                        let resourceId = {
                            resourceId: resourceIds.join(',')
                        };
                        this.userDelete(resourceId);
                    }).catch(() => {
                        this.$alert('已取消删除', {
                            confirmButtonText: '确定'
                        })
                    })
                }
            },
//            重置密码按钮事件
            resetClick () {
                if (this.tableSelections.length === 0) {
                    this.$alert('至少选择一个需要重置密码的人员', {
                        confirmButtonText: '确定'
                    });
                } else {
                    let n = this.tableSelections.length;
                    this.$confirm('是否确认重置' + n + '个人员密码？', '重置密码', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        let resourceIds = [];
                        for (let i in this.tableSelections) {
                            resourceIds.push(this.tableSelections[i].resourceId);
                        }
                        let resourceId = {
                            resourceId: resourceIds.join(',')
                        };
                        this.userPwdUpdate(resourceId);
                    }).catch(() => {
                        this.$alert('已取消密码重置', {
                            confirmButtonText: '确定'
                        })
                    })
                }
            },
//            查询条件事件
            getList () {
                this.formObj = Object.assign(this.formObj, this.$refs.form.getValue());
                let { userName: userName, userNick: userNick, phone: phone } = this.$refs.form.getValue();
                this.formObj.userName = $.trim(userName);
                this.formObj.userNick = $.trim(userNick);
                this.formObj.phone = $.trim(phone);
                let longness = /^.{0,20}$/;
                if (this.formObj.userName !== '' && !longness.test(this.formObj.userName)) {
                    this.$alert('账号长度超出最大限制', {
                        confirmButtonText: '确定'
                    });
                } else if (this.formObj.userNick !== '' && !longness.test(this.formObj.userNick)) {
                    this.$alert('姓名长度超出最大限制', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.userInfoQuery();
                }
            },
//            新增弹框事件
            getAdd () {
                let { userName: userName, userNick: userNick, alarmId: alarmId, phone: phone, telphone: telphone, email: email } =
                    this.$refs.formAddOne.getValue();
                let { remark: remark } = this.$refs.formAddTwo.getValue();
                let { status: status } = this.$refs.formAddThree.getValue();
                let { isMsg: isMsg } = this.$refs.formAddFour.getValue();
                let deptId = this.selfId || this.deptSupId;
                let roleId = this.$refs.addTree.getCheckedNodes();
                let roleName = this.$refs.addTree.getCheckedNodes();
                for (let i in roleId) {
                    this.roleIds.push(roleId[i].id);
                }
                for (let i in roleName) {
                    this.roleNames.push(roleName[i].roleName);
                }
                let addObj = { userName, userNick, alarmId, deptId, phone, telphone, email, remark, status, isMsg, roleId, roleName, type: 1 };
                let longness = /^.{0,20}$/;
                let emails = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
                let phoneReg = /^1[3,4,5,7,8]\d{9}$/;
                let tel = /^(((0\d{3}[\-])?\d{6,8}|(0\d{2}[\-])?\d{8}))([\-]\d{2,4})?$/;
                if (addObj.userName === '' || addObj.userName === null) {
                    this.$alert('请输入账号', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (addObj.userName !== '' && !longness.test(addObj.userName)) {
                    this.$alert('账号长度超出最大限制', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (addObj.userNick === '' || addObj.userNick === null) {
                    this.$alert('请输入姓名', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (addObj.userNick !== '' && !longness.test(addObj.userNick)) {
                    this.$alert('姓名长度超出最大限制', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (addObj.alarmId === '' || addObj.alarmId === null) {
                    this.$alert('请输入警号', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (addObj.alarmId !== '' && !longness.test(addObj.alarmId)) {
                    this.$alert('警号长度超出最大限制', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (addObj.phone === '' && addObj.telphone === '' && addObj.email === '') {
                    this.$alert('请输入手机号、固定电话、邮箱至少一个', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (addObj.phone !== '' && !phoneReg.test(addObj.phone)) {
                    this.$alert('请输入正确的手机号码', {
                        confirmButtonText: '确定'
                    });
                } else if (addObj.email !== '' && !emails.test(addObj.email)) {
                    this.$alert('请输入正确的电子邮箱', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (addObj.telphone !== '' && !tel.test(addObj.telphone)) {
                    this.$alert('请输入正确的固定电话', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (addObj.deptId === '' || addObj.deptId === null) {
                    this.$alert('请选择所属部门', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (this.roleIds.length === 0) {
                    this.$alert('请选择角色授权', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (this.roleIds.length === 2) {
//                    if ((this.roleIds.includes(56) && this.roleIds.includes(58)) || (this.roleIds.includes(57) && this.roleIds.includes(61))) {
                    if ((this.roleNames.includes('任务管理员') && this.roleNames.includes('任务使用人')) ||
                        (this.roleNames.includes('任务审批人') && this.roleNames.includes('系统管理员'))) {
                        let roleId = this.roleIds.join(',');
                        let roleName = this.roleNames.join(',');
                        let addObj = { userName, userNick, alarmId, deptId, phone, telphone, email, remark, status, isMsg, roleId, roleName, type: 1 };
                        this.userAdd(addObj);
                        this.personnelAddShow = false;
                    } else {
                        this.$alert('角色组合不合法', {
                            confirmButtonText: '确定'
                        });
                        this.roleIds = [];
                        this.roleNames = [];
                        return false
                    }
                } else if (this.roleIds.length > 2) {
                    this.$alert('角色授权最多只能选择两个角色', {
                        confirmButtonText: '确定'
                    });
                    this.roleIds = [];
                    this.roleNames = [];
                    return false
                } else {
                    let roleId = this.roleIds.join(',');
                    let roleName = this.roleNames.join(',');
                    let addObj = { userName, userNick, alarmId, deptId, phone, telphone, email, remark, status, isMsg, roleId, roleName, type: 1 };
                    this.userAdd(addObj);
                    this.personnelAddShow = false;
                }
                this.deptOrgTreeLoad();
                this.userInfoQuery();
            },
//            修改弹框事件
            getModify () {
                let { userName: userName, userNick: userNick, alarmId: alarmId, phone: phone, telphone: telphone, email: email } =
                    this.$refs.formModifyOne.getValue();
                let { remark: remark } = this.$refs.formModifyTwo.getValue();
                let { status: status } = this.$refs.formModifyThree.getValue();
                let { isMsg: isMsg } = this.$refs.formModifyFour.getValue();
                let deptId = this.deptSupId;
                let roleId = this.$refs.modifyTree.getCheckedNodes();
                let roleName = this.$refs.modifyTree.getCheckedNodes();
                for (let i in roleId) {
                    this.roleIds.push(roleId[i].id);
                }
                for (let i in roleName) {
                    this.roleNames.push(roleName[i].roleName);
                }
                let modifyObj = { userName, userNick, alarmId, deptId, phone, telphone, email, remark, status, isMsg, roleId, roleName, type: 2 };
                let longness = /^.{0,20}$/;
                let emails = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
                let phoneReg = /^1[3,4,5,7,8]\d{9}$/;
                let tel = /^(((0\d{3}[\-])?\d{6,8}|(0\d{2}[\-])?\d{8}))([\-]\d{2,4})?$/;
                if (modifyObj.userName === '' || modifyObj.userName === null) {
                    this.$alert('请输入账号', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (modifyObj.userName !== '' && !longness.test(modifyObj.userName)) {
                    this.$alert('账号长度超出最大限制', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (modifyObj.userNick === '' || modifyObj.userNick === null) {
                    this.$alert('请输入姓名', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (modifyObj.userNick !== '' && !longness.test(modifyObj.userNick)) {
                    this.$alert('姓名长度超出最大限制', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (modifyObj.alarmId === '' || modifyObj.alarmId === null) {
                    this.$alert('请输入警号', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (modifyObj.alarmId !== '' && !longness.test(modifyObj.alarmId)) {
                    this.$alert('警号长度超出最大限制', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (modifyObj.phone === '' && modifyObj.telphone === '' && modifyObj.email === '') {
                    this.$alert('请输入手机号、固定电话、邮箱至少一个', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (modifyObj.phone !== '' && !phoneReg.test(modifyObj.phone)) {
                    this.$alert('请输入正确的手机号码', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (modifyObj.email !== '' && !emails.test(modifyObj.email)) {
                    this.$alert('请输入正确的电子邮箱', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (modifyObj.telphone !== '' && !tel.test(modifyObj.telphone)) {
                    this.$alert('请输入正确的固定电话', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (modifyObj.deptId === '' || modifyObj.deptId === null) {
                    this.$alert('请选择所属部门', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (modifyObj.roleId === '' || modifyObj.roleId === null) {
                    this.$alert('请选择角色授权', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (this.roleIds.length === 0) {
                    this.$alert('请选择角色授权', {
                        confirmButtonText: '确定'
                    });
                    return false
                } else if (this.roleIds.length === 2) {
//                    if ((this.roleIds.includes(56) && this.roleIds.includes(58)) || (this.roleIds.includes(57) && this.roleIds.includes(61))) {
                    if ((this.roleNames.includes('任务管理员') && this.roleNames.includes('任务使用人')) ||
                        (this.roleNames.includes('任务审批人') && this.roleNames.includes('系统管理员'))) {
                        let roleId = this.roleIds.join(',');
                        let roleName = this.roleNames.join(',');
                        let modifyObj = { userName, userNick, alarmId, deptId, phone, telphone, email, remark, status, isMsg, roleId, roleName, type: 2 };
                        this.userModify(modifyObj);
                        this.personnelModifyShow = false;
                    } else {
                        this.$alert('角色组合不合法', {
                            confirmButtonText: '确定'
                        });
                        this.roleIds = [];
                        this.roleNames = [];
                        return false
                    }
                } else if (this.roleIds.length > 2) {
                    this.$alert('角色授权最多只能选择两个角色', {
                        confirmButtonText: '确定'
                    });
                    this.roleIds = [];
                    this.roleNames = [];
                    return false
                } else {
                    let roleId = this.roleIds.join(',');
                    let roleName = this.roleNames.join(',');
                    let modifyObj = { userName, userNick, alarmId, deptId, phone, telphone, email, remark, status, isMsg, roleId, roleName, type: 2 };
                    this.userModify(modifyObj);
                    this.personnelModifyShow = false;
                }
                this.deptOrgTreeLoad();
                this.userInfoQuery();
            },
//            新增弹框事件
            personnelAdd () {
                this.roleIds = [];
                this.roleNames = [];
                this.getAdd();
                // this.deptOrgTreeLoad();
                // this.userInfoQuery();
            },
//            修改弹框事件
            personnelModify () {
                this.roleIds = [];
                this.roleNames = [];
                this.getModify();
                // this.deptOrgTreeLoad();
                // this.userInfoQuery();
            },
//            左侧部门树-节点被点击时的回调
            async handleNodeClick (data) {
                this.selfName = data.deptName;
                this.selfId = data.deptId;
                this.treeSearchOpt.deptTreeId = data.deptId;
                this.formObj.deptId = data.deptId;

                this.tableOpt.listLoading = true;
                this.tableOpt.data = []
                let resp = await userInfoQuery({
                    deptId: data.deptId,
                    userName: '',
                    userNick: '',
                    phone: '',
                    status: 2,
                    rows: this.pageSize,
                    page: this.currentPage
                });
                if (resp && resp.status === 200) {
                    this.tableOpt.listLoading = false;
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total
                }
            },
//            新增弹框所属部门树-节点被点击时的回调
            handleNodeClickAdd (data) {
                this.deptSupId = data.deptId;
                this.addDeptName = data.deptName;
                this.textAddOpt.value = this.addDeptName;
            },
//            修改弹框所属部门树-节点被点击时的回调
            handleNodeClickModify (data) {
                this.deptSupId = data.deptId;
                this.modifyDeptName = data.deptName;
                this.textModifyOpt.value = this.modifyDeptName;
            }
        },
        mounted () {
            this.formHeight = this.$refs.form.getContainerHeight();
            this.$nextTick(function () {
                this.userInfoQuery();
                this.deptOrgTreeLoad(null);
            })
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            tableSize () {
                return {
                    height: this.vsHeight - this.formHeight - 70
                }
            },
            treeWrapHeight () {
                return {
                    height: this.vsHeight - 60 + 'px'
                }
            },
            treeDivHeight () {
                return {
                    height: this.vsHeight - 100 + 'px'
                }
            },
            treeHeight () {
                return {
                    height: this.vsHeight - 100 + 'px'
                }
            }
        }
    }
</script>
<style>
    @component-namespace ga {
        @b personnel {
            width: 100%;
            min-height: 600px;
            margin-top: 30px;
            @e left {
                min-height: 500px;
                box-sizing: border-box;
                @m test {
                    margin-left: 20px;
                    color: #ff7300;
                    font-size: 18px;
                }
                @m block {
                    margin-bottom: 5%;
                    margin-top: 3%;
                    width:100%;
                    height: 5px;
                    border-bottom: 3px solid #115889;
                }
                @m block_line-left {
                    display: block;
                    width:25%;
                    height: 100%;
                    background: #115889;
                    float: left;
                }
                @m block_line-right {
                    display: block;
                    width:25%;
                    height: 100%;
                    background: #115889;
                    float: right;
                }
                @m boxs {
                    margin-top: 1%;
                    margin-bottom: 1%;
                    border: 1px solid #063e42;
                    width: 90%;
                    position: relative;
                    margin: 0 auto;
                    /* padding-left: 10px; */
                }
                @m boxTitle {
                    background: rgba(27,117,184,0.20);
                    box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.10);
                    height: 36px;
                    line-height: 36px;
                    text-indent: 10px;
                }
                @m box {
                    position: absolute;
                    padding: 4px;
                    border-style: solid;
                    border-color: #0ec3f9;
                }
                @m box_lf{
                    border-width: 3px 0 0 3px;
                    top: -5px;
                    left: -5px;
                }
                @m box_rt {
                    border-width: 3px 3px 0 0;
                    top: -5px;
                    right: -5px;
                }
                @m box_ld {
                    border-width: 0 3px 3px 0;
                    bottom: -5px;
                    right: -5px;
                }
                @m box_rd {
                    border-width: 0px 0 3px 3px;
                    bottom: -5px;
                    left: -5px;
                }
                @m title {
                    line-height:26px;
                    color: #fff;
                    text-shadow:
                        0 0 1px #fff,
                        0 0 4px #fff,
                        0 0 15px #014c5c,
                        0 0 30px #014c5c,
                        0 0 35px #014c5c,
                        0 0 45px #014c5c,
                        0 0 65px #014c5c;
                }
            & .icon {
                  display: inline-block;
                  width: 15px;
                  height: 15px;
                  background-color: #DAA520;
                  margin: 0 15px;
              }
            }
            @e right {
                min-height: 500px;
                box-sizing: border-box;
                margin: 0 auto;
                @m btFunc {
                    padding-left: 25px;
                    text-align: left;
                    margin-bottom: 10px;
                }
                @m btFunc_imgAdd {
                    display: inline-block;
                    padding-left: 24px;
                    height: 26px;
                    line-height: 26px;
                    vertical-align: bottom;
                    background-image: url('../../assets/images/system/add.png');
                    background-repeat: no-repeat;
                }
                @m btFunc_imgModModify {
                    display: inline-block;
                    padding-left: 24px;
                    margin-left: 20px;
                    height: 26px;
                    line-height: 26px;
                    vertical-align: bottom;
                    background-image: url('../../assets/images/system/change.png');
                    background-repeat: no-repeat;
                }
                @m btFunc_imgDel {
                    display: inline-block;
                    padding-left: 24px;
                    margin-left: 20px;
                    height: 26px;
                    line-height: 26px;
                    vertical-align: bottom;
                    background-image: url('../../assets/images/system/delete.png');
                    background-repeat: no-repeat;
                    /* background-image: radial-gradient(50% 100%, #D84C53 50%, #813036 100%);
                    border: 1px solid #B33338;
                    border-radius: 3px; */
                }
                @m btFunc_imgReset {
                    display: inline-block;
                    padding-left: 24px;
                    margin-left: 20px;
                    height: 26px;
                    line-height: 26px;
                    vertical-align: bottom;
                    background-image: url('../../assets/images/system/reset.png');
                    background-repeat: no-repeat;
                }
                @m tableList {
                    /* padding-left: 35px; */
                }
            }
            .personnelAddLabel,
            .personnelModifyLabel {
                display: inline-block;
                width: 100px;
                text-align: right;
                vertical-align: top;
                padding-right: 8px;
            }
            .personnelAddForm,
            .personnelModifyForm {
                display: inline-block;
                width: 300px;
                height: 100px;
                border: 1px solid #015483;
                box-sizing: border-box;
                margin-left: 0px;
                padding-left: 30px;
                overflow: auto;
            }
            .treeDivHeight {
                overflow-y: auto;
            }
            .deptComfirm {
                display: inline-block;
                width: 430px;
                height: 140px;
                border: 0px solid #015483;
                box-sizing: border-box;
                margin-left: -4px;
            }
            .redStar {
                color: red;
            }
        }
    }
</style>
