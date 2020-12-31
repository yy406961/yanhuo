<template>
    <div class="ga-organizationManage">
        <!--输入框 查询按钮-->
        <el-row class="ga-organizationManage__form">
            <formComp class="formMarginTB" style="display: inline-block" :option="formOpt" ref="form"></formComp>
            <div class="ga-organizationManage__buttonGroup">
                <buttonComp :option="btnOptAdd"></buttonComp>
                <buttonComp :option="btnOptModify"></buttonComp>
                <buttonComp :option="btnOptReset"></buttonComp>
                <buttonComp :option="btnOptDel"></buttonComp>
            </div>
        </el-row>
        <!--新增 修改 重置密码 删除 按钮组-->
        <el-row class="ga-organizationManage__buttonGroup">
            <!-- <a href="javascript:void(0);"
                   class="ga-organizationManage__buttonGroup--item"
                   @click="addClick">
                        <div class="ga-organizationManage__buttonGroup--item-iconAdd"></div>
                        <span class="ga-organizationManage__buttonGroup--item-text">新增</span>
            </a>
            <a href="javascript:void(0);"
                   class="ga-organizationManage__buttonGroup--item"
                   @click="editClick">
                        <div class="ga-organizationManage__buttonGroup--item-iconModify"></div>
                        <span class="ga-organizationManage__buttonGroup--item-text">修改</span>
            </a>
            <a href="javascript:void(0);"
                   class="ga-organizationManage__buttonGroup--item"
                   @click="restClick">
                        <div class="ga-organizationManage__buttonGroup--item-iconRest"></div>
                        <span class="ga-organizationManage__buttonGroup--item-text">重置密码</span>
            </a>
            <a href="javascript:void(0);"
                   class="ga-organizationManage__buttonGroup--item"
                   @click="delClick">
                        <div class="ga-organizationManage__buttonGroup--item-iconDel"></div>
                        <span class="ga-organizationManage__buttonGroup--item-text">删除</span>
            </a> -->
        </el-row>
        <!--机构table-->
        <el-row>
            <tableComp ref="tableShow"
                       :option="tableOpt"
                       :comSize="comSize"
                       @handleSelectionChange ="handleSelectionChange"
                       @handleCurrentPageChange="handleCurrentPageChange"
                       @handleSizePageChange = "handleSizePageChange">
            </tableComp>
        </el-row>
        <!--查看 增加 修改 的弹框-->
        <sysDialog size="small" v-if="dialogShow"
                   :dialogVisible="dialogShow"
                   :showConfirm="false"
                   :showCancel="false"
                   :title="dialogTitle"
                   :okFn="nextStep"
                   @change="dialogChange">
            <!--第一页 基本信息-->
            <div v-show="dialogNextStep">
                <el-row>
                    <el-col :span="18"
                            :offset="3"
                            style="height:360px">
                        <formComp
                            :option="formOptDialog"
                            ref="formOptDialog">
                        </formComp>
                    </el-col>
                </el-row>
                <el-row style="text-align: center;margin-top: 10px;">
                    <formComp :option="dialogBtn"></formComp>
                </el-row>
            </div>
            <!--第二页 功能 数据权限-->
            <div v-show="!dialogNextStep">
                <el-row>
                    <el-col :span="10"
                            :offset="1"
                            style="margin-right: 5px">
                        <!--外面框样式-->
                        <square title="功能权限"
                                :minHeight="360">
                            <!--滚动条-->
                            <div style="overflow: auto;height: 318px">
                                <!--功能树-->
                                <el-tree
                                    ref="funTree"
                                    :data="funTree"
                                    :props="defaultProps"
                                    show-checkbox
                                    node-key="id"
                                    default-expand-all
                                    @check-change="checkChange"
                                    :expand-on-click-node="false">
                                </el-tree>
                            </div>
                        </square>
                        <!--功能权限-->
                    </el-col>
                    <el-col :span="12">
                        <square title="数据权限"
                                :minHeight="360">
                            <div style="text-align: center">
                                <p>注意：如果项目作为省级项目，则只选择相应的省份</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;如果作为市区级项目，则需选择所在辖区</p>
                            </div>
                            <!--所在省份、辖区、人数、面积总和-->
                            <formComp :option="formOptDialogAuthority"
                                      ref="formOptDialogAuthority">
                            </formComp>
                            <!--重点区域范围-->
                            <formComp v-if="dialogAreaAuthority"
                                      :option="formOptDialogAuthorityArea"
                                      ref="formOptDialogAuthorityArea">
                            </formComp>
                        </square>
                    </el-col>
                </el-row>
                <!--弹框 按钮-->
                <el-row style="margin-top: 10px;text-align: center">
                    <formComp :option="dialogFunBtn"></formComp>
                </el-row>
            </div>
        </sysDialog>
    </div>
</template>

<script>
    import square from 'components/common/square'
    import sysDialog from 'components/common/dialog'
    import tableComp from 'components/Table/'
    import formComp from 'components/Form/index'
    import buttonComp from 'components/Form/button'
    import { getProvince, getCity, getFunTree, getOrganizationList, saveOrganization, deleteOrganization, resetKeys } from 'api/system/organizationManage'
    import { mapGetters } from 'vuex'
    export default {
        name: 'organizationManage',
        data () {
            let me = this;
            return {
                addCityType: false,
                addShow: false,
//                重点区域监测范围 是否显示
                dialogAreaAuthority: false,
//                是否下一页
                dialogNextStep: true,
//                行点击 查看 状态
                rowShow: true,
//                弹框 显示与否
                dialogShow: false,
//                保存 修改 删除 部门号和名字
                modifyDeleteDataOrgNum: '',
                modifyDeleteDataOrgName: '',
                provinceName: '',
                provinceVal: '',
                cityName: '',
                cityVal: '',
                btnOptAdd: {
                    id: 'btnAdd',
                    value: '新增',
                    disabled: false,
                    click: function () {
                        me.addClick();
                    }
                },
//                修改按钮
                btnOptModify: {
                    id: 'btnModify',
                    value: '修改',
                    disabled: false,
                    click: function () {
                        me.editClick();
                    }
                },
//                删除按钮
                btnOptDel: {
                    id: 'btnDel',
                    value: '删除',
                    disabled: false,
                    btnSize: 'danger',
                    click: function () {
                        me.delClick();
                    }
                },
//                重置密码按钮
                btnOptReset: {
                    id: 'btnOptReset',
                    value: '重置密码',
                    disabled: false,
                    click: function () {
                        me.restClick();
                    }
                },
//                保存 辖区 数组 只改辖区的情况 专设
                city: [],
                provinceData: [],
                checkNodeArr: [],
                dialogTitle: '',
                dialogBtn: {
                    inline: true,
                    items: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '下一页',
                                click: function () {
                                    me.nextStep()
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '取消',
                                click: function () {
                                    me.cancelShow()
                                }
                            }
                        }
                    ]
                },
                dialogFunBtn: {
                    inline: true,
                    items: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '上一页',
                                click: function () {
                                    me.lastStep()
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '确定',
                                click: function () {
                                    me.cancelShow()
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '取消',
                                click: function () {
                                    me.cancelShow()
                                }
                            }
                        }
                    ]
                },
                funTree: [],
                defaultProps: {
                    children: 'menus',
                    label: 'name',
                    disabled: 'disabled'
                },
                selectIdFun: {
                    orgId: ''
                },
                formHeight: '',
                formObj: {
                    orgId: '',
                    orgName: '',
                    rows: 10,
                    page: 1
                },
                tableSelections: [],
                formOpt: {
                    inline: true,
                    labelPos: 'right',
                    labelWidth: '78',
                    items: [{
                        label: '机构编号：',
                        type: 'text',
                        comOpt: {
                            id: 'queryOrganNumber',
                            width: '150',
                            disabled: false
                        }
                    }, {
                        label: '机构名称：',
                        type: 'text',
                        comOpt: {
                            id: 'queryOrganName',
                            width: '150',
                            disabled: false
                        }
                    }, {
                        label: ' ',
                        type: 'button',
                        comOpt: {
                            value: '查询',
                            disabled: false,
                            click () {
                                let { queryOrganNumber: orgId, queryOrganName: orgName } = me.$refs.form.getValue();
                                me.formObj.orgId = $.trim(orgId);
                                me.formObj.orgName = $.trim(orgName);
                                me.tableOpt.pageOpt.currentPage = 1;
                                me.modifyDeleteDataOrgNum = me.formObj.orgId;
                                me.modifyDeleteDataOrgName = me.formObj.orgName;
                                me.fetchData();
                            }
                        }
                    }]
                },
                formOptDialog: {
                    inline: false,
                    labelPos: 'right',
                    labelWidth: '120',
                    items: [{
                        label: '机构名称：',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'addOrgName',
                            value: '',
                            placeholder: '请输入机构名称',
                            disabled: false
                        }
                    }, {
                        label: '机构简称：',
                        type: 'text',
                        comOpt: {
                            id: 'addShortName',
                            value: '',
                            placeholder: '请输入机构简称',
                            disabled: false
                        }
                    }, {
                        label: '联系人：',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'addContact',
                            value: '',
                            placeholder: '请输入机构联系人',
                            disabled: false
                        }
                    }, {
                        label: '联系电话：',
                        required: true,
                        type: 'text',
                        comOpt: {
                            id: 'addTel',
                            value: '',
                            placeholder: '请输入机构联系电话',
                            disabled: false
                        }
                    }, {
                        label: '邮箱：',
                        type: 'text',
                        comOpt: {
                            id: 'addEmail',
                            value: '',
                            placeholder: '请输入机构邮箱',
                            disabled: false
                        }
                    }, {
                        label: '机构信息：',
                        type: 'text',
                        comOpt: {
                            id: 'addDeptInformation',
                            value: '',
                            iptType: 'textarea',
                            rows: 5,
                            placeholder: '请输入机构描述信息',
                            disabled: false
                        }
                    }]
                },
                formOptDialogAuthority: {
                    inline: false,
                    labelPos: 'right',
                    labelWidth: '160',
                    items: [{
                        label: '所在省份：',
                        type: 'select',
                        comOpt: {
//                            width: 267,
                            id: 'province',
                            value: '',
                            placeholder: '请输入所在省份',
                            disabled: false,
                            data: [],
                            change (val) {
                                me.getCity(val);
                                if (!me.dialogNextStep) {
                                    me.$nextTick(() => {
                                        me.addCityType = true;
                                        me.$refs.formOptDialogAuthority.setValue([{ id: 'city', value: '' }])
                                    })
                                }
                            }
                        }
                    }, {
                        label: '所在辖区：',
                        type: 'select',
                        comOpt: {
//                            width: 267,
                            id: 'city',
                            value: '',
                            placeholder: '请选择目标所在辖区',
                            disabled: false,
                            data: []
                        }
                    }, {
                        label: '重点人数上限：',
                        type: 'text',
                        comOpt: {
                            id: 'importantCount',
                            value: '',
                            placeholder: '请输入整数',
                            disabled: false
                        }
                    }, {
                        label: '重点区域面积总和：',
                        type: 'text',
                        comOpt: {
                            id: 'importantSize',
                            value: '',
                            placeholder: '请输入整数(单位：平方公里)',
                            disabled: false
                        }
                    }]
                },
                formOptDialogAuthorityArea: {
                    inline: false,
                    labelPos: 'right',
                    labelWidth: '160',
                    warp: true,
                    items: [{
                        label: '重点区域监测维度：',
                        type: 'checkbox',
                        comOpt: {
                            id: 'situation1',
                            value: ['1'],
                            data: [{
                                name: '本省', value: '1', disabled: true
                            }, {
                                name: '外省', value: '2'
                            }]
                        }
                    }, {
                        label: '',
                        type: 'checkbox',
                        comOpt: {
                            id: 'situation2',
                            value: [],
                            disabled: false,
                            data: [{
                                name: '境外', value: '3'
                            }, {
                                name: '重点人', value: '4'
                            }]
                        }
                    }, {
                        label: '',
                        type: 'checkbox',
                        comOpt: {
                            id: 'situation3',
                            value: [],
                            disabled: false,
                            data: [{
                                name: '涉疆', value: '5'
                            }, {
                                name: '涉藏', value: '6'
                            }]
                        }
                    }]
                },
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '', value: 'selection', width: 60, align: 'center' },
                        { name: '机构编号', value: 'orgId', width: 190, align: 'center' },
                        { name: '机构名称', value: 'orgName', width: 160, align: 'center' },
                        { name: '机构简称', value: 'shortName', width: 100, align: 'center' },
                        { name: '联系人', value: 'contact', width: 160, align: 'center' },
                        { name: '联系电话', value: 'msisdn', width: 160, align: 'center' },
                        { name: '邮箱', value: 'email', align: 'center' },
                        { name: '管理员编号', value: 'code', width: 190, align: 'center' }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    },
                    rowClick: function (row) {
                        let _ = me;
                        if (me.formOptDialog.items.length === 6) {
                            me.formOptDialog.items.unshift({
                                label: '机构编号：',
                                type: 'text',
                                comOpt: {
                                    id: 'orgNumber',
                                    value: '',
                                    placeholder: '请输入机构名称',
                                    disabled: true
                                }
                            })
                        }
                        setTimeout(function () {
                            if (_.rowShow) {
                                _.dialogTitle = '机构查看'
                                _.dealFormDialogFunBtn(true);
                                _.dealFormDialogStatus(true);
                                _.messageAssignment('formOptDialog', row);
                                _.dialogNextStep = true;
                                _.dialogShow = true;
                            }
                        })
                    }
                }
            }
        },
        components: {
            square,
            formComp,
            buttonComp,
            tableComp,
            sysDialog
        },
        created () {
        },
        mounted () {
            this.fetchData();
            // this.fetchFun();
            this.getProvince();
            this.formHeight = this.$refs.form.getContainerHeight();
        },
        computed: {
            comSize () {
                return {
                    height: this.vsHeight - this.formHeight - 5
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
        watch: {
        },
        methods: {
//            获取省份 接口
            async getProvince () {
                let resp = await getProvince();
                let arr = [];
                let row = resp.rows;
                for (let i in row) {
                    let obj = {
                        name: row[i].compValue,
                        value: row[i].compKey - 0
                    }
                    arr.push(obj)
                }
                this.provinceData = arr;
            },
//            获取辖区 接口
            async getCity (obj) {
                let resp = await getCity(obj);
                let arr = [{ name: '-----请选择-----', value: '' }];
                let row = resp.rows;
                for (let i in row) {
                    let obj = {
                        name: row[i].compValue,
                        value: row[i].compKey - 0
                    }
                    arr.push(obj)
                }
                this.city = arr;
                if (!this.addShow) {
                    this.$refs.formOptDialogAuthority.setItemData('city', this.city);
                } else {
                    if (!this.addCityType) {
                        this.$refs.formOptDialogAuthority.setItemData('city', []);
                    } else {
                        this.$refs.formOptDialogAuthority.setItemData('city', this.city);
                    }
                }
            },
//            获取 功能权限树 接口
            async fetchFun () {
                let resp = await getFunTree();
//                this.funTree = [{
//                    id: 4,
//                    name: '二级 1-1',
//                    menus: [{
//                        id: 9,
//                        name: '三级 1-1-1'
//                    }, {
//                        id: 10,
//                        name: '三级 1-1-2'
//                    }]
//                }, {
//                    id: 2,
//                    name: '一级 2',
//                    menus: [{
//                        id: 5,
//                        name: '二级 2-1'
//                    }, {
//                        id: 6,
//                        name: '二级 2-2'
//                    }]
//                }, {
//                    id: 3,
//                    name: '一级 3',
//                    menus: [{
//                        id: 7,
//                        name: '二级 3-1'
//                    }, {
//                        id: 8,
//                        name: '二级 3-2'
//                    }]
//                }]
                let { data } = resp
                if (data && data.length) {
                    this.funTree = this.dynamicDisabled(data, true);
                } else {
                    this.$message({
                        waring: '功能树请求异常'
                    })
                }
            },
//            获取 机构列表 接口
            async fetchData () {
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                let resp = await getOrganizationList(this.formObj);
                if (resp) {
                    for (let i in resp.rows) {
                        resp.rows[i].code = 'admin' + resp.rows[i].orgId
                    }
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total;
                    if (this.tableOpt.data.length) {
                        this.tableOpt.listLoading = false;
                    }
                    let me = this;
                    if (resp.rows.length === 0) {
                        setTimeout(() => {
                            me.tableOpt.listLoading = false;
                        }, 200)
                    }
                }
            },
//            机构 删除 接口
            async deleteData (id) {
                let resp = await deleteOrganization(id);
//                存在不能删除的机构 后台需要返回 不能删除的机构
                if (resp) {
//                    this.tableOpt.pageOpt.currentPage = 1;
                    this.formObj.orgId = this.modifyDeleteDataOrgNum;
                    this.formObj.orgName = this.modifyDeleteDataOrgName;
                    this.fetchData();
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                }
            },
//            机构 新增 接口
            async addData (addObj) {
                let resp = await saveOrganization(addObj);
                if (resp) {
                    this.$message({
                        type: 'success',
                        message: '新增成功!'
                    });
                    this.dialogShow = false;
                    this.formObj.orgId = '';
                    this.formObj.orgName = '';
                    this.formObj.page = 1
                    this.modifyDeleteDataOrgNum = '';
                    this.modifyDeleteDataOrgName = '';
                    this.tableOpt.pageOpt.currentPage = 1;
                    this.checkNodeArr = [];
                    this.addShow = false;
                    this.fetchData();
                }
            },
//            机构 修改 接口 和 新增是同一个 接口
            async reviseData (modifyObj) {
                let resp = await saveOrganization(modifyObj);
                if (resp) {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.dialogChange(false);
//                    this.formObj.orgId = '';
//                    this.formObj.orgName = '';
//                    this.formObj.page = 1;
//                    this.tableOpt.pageOpt.currentPage = 1;
                    this.formObj.orgId = this.modifyDeleteDataOrgNum;
                    this.formObj.orgName = this.modifyDeleteDataOrgName;
                    this.fetchData();
                }
            },
//            机构 重置密码接口
            async resetPaw (resetObj) {
                let resp = await resetKeys(resetObj);
//                备注：存在不能重置密码的情况
                if (resp) {
                    this.$message({
                        type: 'success',
                        message: '重置密码成功'
                    })
                }
            },
//  -----------------------功能权限树 重点区域是否选择 禁用 预警-------------------
            dynamicDisabled (data, val) {
                for (let i in data) {
                    if (data[i].id === 100000) {
                        for (let j in data[i].menus) {
                            if (data[i].menus[j].id === 9) {
                                data[i].menus[j].disabled = val;
                            }
                        }
                    }
                }
                return data;
            },
//  -----------------------处理表单 功能 权限 禁用与否的状态------------------------
            dealFormDialogStatus (val) {
                let data = this.formOptDialog.items;
                let data1 = this.formOptDialogAuthority.items;
                let data2 = this.formOptDialogAuthorityArea.items;
                for (let i in data) {
                    if (data[i].comOpt.id !== 'orgNumber') {
                        data[i].comOpt.disabled = val;
                    }
                }
                for (let i in data1) {
                    data1[i].comOpt.disabled = val;
                }
                for (let i in data2) {
                    for (let j in data2[i].comOpt.data) {
                        data2[i].comOpt.data[j].disabled = val
                    }
                }
                data2[0].comOpt.data[0].disabled = true
                let tree = this.funTree;
                for (let i in tree) {
                    tree[i].disabled = val;
                    if (tree[i].menus) {
                        for (let j in tree[i].menus) {
                            tree[i].menus[j].disabled = val;
                        }
                    }
                }
                this.funTree = this.dynamicDisabled(tree, true);
            },
//  -----------------------处理弹框表单值 都置空 -----------------------------------
            dealFormDialogValue () {
                let data = this.formOptDialog.items;
                for (let i in data) {
                    data[i].comOpt.value = '';
                }
            },
//  -----------------------处理弹框按钮 显示状态与功能------------------------------
            dealFormDialogFunBtn (row = false) {
                this.fetchFun();
                if (row) {
                    this.dialogBtn.items[1].comOpt.value = '确定';
                    if (this.dialogFunBtn.items.length === 3) {
                        this.dialogFunBtn.items.splice(1, 1);
                        this.dialogFunBtn.items[1].comOpt.value = '确定';
                    }
                } else {
                    this.dialogBtn.items[1].comOpt.value = '取消';
                    if (this.dialogFunBtn.items.length !== 3) {
                        let item = {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '确定',
                                disabled: false,
                                click: function () {
                                    this.cancelShow()
                                }
                            }
                        }
                        this.dialogFunBtn.items.splice(1, 0, item);
                        this.dialogFunBtn.items[2].comOpt.value = '取消';
                    }
                }
            },
            addClick () {
                if (this.formOptDialog.items.length === 7) {
                    this.formOptDialog.items.shift()
                }
                this.addShow = true;
                this.dialogAreaAuthority = false;
                this.addCityType = false;
                this.dialogTitle = '机构新增'
                this.dealFormDialogValue();
                this.dealFormDialogFunBtn();
                this.dealFormDialogStatus(false);
                this.dialogFunBtn.items[1].comOpt.click = () => {
                    this.commitAdd();
                }
                this.dialogNextStep = true;
                this.dialogShow = true;
                this.formOptDialogAuthority.items[0].comOpt.value = '';
                this.formOptDialogAuthority.items[1].comOpt.value = '';
                this.formOptDialogAuthority.items[2].comOpt.value = '';
                this.formOptDialogAuthority.items[3].comOpt.value = '';
                this.formOptDialogAuthorityArea.items[0].comOpt.value = ['1'];
                this.formOptDialogAuthorityArea.items[1].comOpt.value = [];
                this.formOptDialogAuthorityArea.items[2].comOpt.value = [];
            },
//  -----------------------勾选树图某个 显示区域管理--------------------------------
            checkChange (obj, node) {
                if (obj.id === 70004) {
                    if (node) {
                        this.dialogAreaAuthority = true;
                        this.funTree = this.dynamicDisabled(this.funTree, false);
                    } else {
                        this.dialogAreaAuthority = false;
                        this.funTree = this.dynamicDisabled(this.funTree, true);
                    }
                }
            },
            cancelShow () {
                this.addShow = false;
                this.dialogShow = false;
                this.addCityType = false;
            },
//  -----------------------按钮下一步------------------------------------------------
            nextStep () {
                this.dialogNextStep = false;
//                这里设置选中状态
//                this.$refs.funTree.setCheckedNodes([{ id: 4 }]); this.checkNodeArr
//                this.$refs.formOptDialogAuthority.setValue().province = '';
//                this.$refs.formOptDialogAuthority.setValue().city = '';
                if (!this.addShow) {
                    this.$refs.funTree.setCheckedNodes(this.checkNodeArr);
                }
                if (this.tableSelections[0]) {
                    this.getCity(this.tableSelections[0].province)
                }
                this.$refs.formOptDialogAuthority.setItemData('province', this.provinceData);
            },
//  -----------------------按钮 上一步-----------------------------------------------
            lastStep () {
                this.dialogNextStep = true;
            },
//  -----------------------删除操作--------------------------------------------------
            delClick () {
                if (this.tableSelections.length === 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择一条要删除的数据'
                    });
                } else if (this.tableSelections.length !== 1) {
                    this.$message({
                        type: 'warning',
                        message: '仅能选择一条要删除的数据'
                    });
                } else {
                    this.$confirm('是否确认删除？', '删除提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        let orgId = [];
                        for (let i in this.tableSelections) {
                            orgId.push(this.tableSelections[i].orgId);
                        }
                        this.selectIdFun.orgId = orgId.join(',')
                        this.deleteData(this.selectIdFun);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
                }
            },
//  -----------------------重置密码--------------------------------------------------
            restClick () {
                if (this.tableSelections.length === 0) {
                    this.$message({
                        type: 'warning',
                        message: '至少选择一个需要重置密码的机构'
                    });
                } else {
                    let n = this.tableSelections.length;
                    this.$confirm('是否确认重置' + n + '个机构密码？', '重置密码', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        let idArr = [];
                        for (let i in this.tableSelections) {
                            idArr.push(this.tableSelections[i].orgId);
                        }
                        this.selectIdFun.orgId = idArr.join(',')
                        this.resetPaw(this.selectIdFun);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消密码重置'
                        })
                    })
                }
            },
//  -----------------------修改按钮--------------------------------------------------
            editClick () {
                if (this.tableSelections.length === 0) {
                    this.$message({
                        type: 'warning',
                        message: '需选择一条待修改的数据'
                    });
                } else if (this.tableSelections.length === 1) {
                    this.addShow = false;
                    if (this.formOptDialog.items.length === 6) {
                        this.formOptDialog.items.unshift({
                            label: '机构编号：',
                            type: 'text',
                            comOpt: {
                                id: 'orgNumber',
                                value: '',
                                placeholder: '请输入机构名称',
                                disabled: true
                            }
                        })
                    }
                    this.dialogAreaAuthority = false;
                    this.messageAssignment('formOptDialog', this.tableSelections[0]);
                    this.dialogTitle = '机构修改'
                    this.dealFormDialogFunBtn();
                    this.dealFormDialogStatus(false);
                    this.dialogFunBtn.items[1].comOpt.click = () => {
                        this.commitModify();
                    }
                    this.dialogNextStep = true;
                    this.dialogShow = true;
                } else {
                    this.$message({
                        type: 'warning',
                        message: '单次只能修改一条'
                    });
                }
            },
//  -----------------------确认增加 获取需要增加的数据-------------------------------
            commitAdd () {
                let {
                    addOrgName: orgName, addEmail: email, addShortName: shortName,
                    addContact: contact, addTel: msisdn, addCode: code, addDeptInformation: description
                } = this.$refs.formOptDialog.getValue();
                let { type } = { type: 1 }
                let funArr = this.$refs.funTree.getCheckedNodes();
                let treeArr = this.funTree;
                let checkNode = new Set();
                for (let i in funArr) {
                    let id = funArr[i].id
                    let ids = '';
                    checkNode.add(id)
                    for (let j in treeArr) {
                        if (id !== treeArr[j].id) {
                            if (treeArr[j].menus !== 'null') {
                                for (let k in treeArr[j].menus) {
                                    if (id === treeArr[j].menus[k].id) {
                                        ids = treeArr[j].id;
                                    }
                                }
                            }
                        }
                    }
                    if (ids !== '') {
                        checkNode.add(ids);
                    }
                }
                let arr = Array.from(checkNode)
                let { authority } = { authority: arr.join(',') }
                orgName = orgName.trim()
                contact = contact.trim()
                if (this.$refs.formOptDialogAuthorityArea) {
                    let { situation1, situation2, situation3 } = this.$refs.formOptDialogAuthorityArea.getValue()
                    let { situation } = {
                        situation: situation1.concat(situation2, situation3).join(',')
                    }
                    let { importantCount, importantSize, province, city } = this.$refs.formOptDialogAuthority.getValue()
                    let addObj = { situation, authority, importantCount, importantSize, province,
                        city, orgName, email, contact, msisdn, code, shortName, description, type };
                    this.commitIsCorrect(addObj, '新增');
                } else {
                    let { situation } = {
                        situation: '1'
                    }
                    let { importantCount, importantSize, province, city } = this.$refs.formOptDialogAuthority.getValue()
                    let addObj = { situation, authority, importantCount, importantSize, province,
                        city, orgName, email, contact, msisdn, code, shortName, description, type };
                    this.commitIsCorrect(addObj, '新增');
                }
            },
//  -----------------------确认修改 获取需要修改的数据-------------------------------
            commitModify () {
                let {
                    addOrgName: orgName, addEmail: email, addShortName: shortName,
                    addContact: contact, addTel: msisdn, addCode: code, addDeptInformation: description
                } = this.$refs.formOptDialog.getValue();
                let { orgId } = this.tableSelections[0];
                let { type } = { type: 2 }
//                获得打勾勾的 数据
                let funArr = this.$refs.funTree.getCheckedNodes();
                let treeArr = this.funTree;
//                创建 不重复数据存放 打勾数据
                let checkNode = new Set();
                for (let i in funArr) {
                    let id = funArr[i].id
                    let ids = '';
                    checkNode.add(id)
                    for (let j in treeArr) {
                        if (id !== treeArr[j].id) {
                            for (let k in treeArr[j].menus) {
                                if (id === treeArr[j].menus[k].id) {
                                    ids = treeArr[j].id;
                                }
                            }
                        }
                    }
                    if (ids !== '') {
                        checkNode.add(ids);
                    }
                }
                let checkNodeArr = [];
                checkNode.forEach(item => {
                    checkNodeArr.push(item)
                })
//                将set 转为 数组
                let arr = Array.from(checkNodeArr)
//                authority是功能权限 获取
                let { authority } = { authority: arr.join(',') }
                let s = {};
//                重点区域监测维度
                if (this.$refs.formOptDialogAuthorityArea) {
//                    打勾重点区域监测
                    let { situation1, situation2, situation3 } = this.$refs.formOptDialogAuthorityArea.getValue()
                    s = {
                        situation: situation1.concat(situation2, situation3).join(',')
                    }
                } else {
//                    不打勾重点区域监测 默认本省
                    s = {
                        situation: '1'
                    }
                }
                let { situation } = s;
//                获取重点人总数，重点区域面积以及所在辖区
                let { importantCount, importantSize } = this.$refs.formOptDialogAuthority.getValue()
//                获取所在省份
//                如果存储的省名字 和从select获取到的一样 则使用存储的省value值
                let province = {}
                if (this.provinceName === this.$refs.formOptDialogAuthority.getValue().province) {
                    province = this.provinceVal
                } else {
//                    如果存储的省名字 和从select获取到的不一样 则直接使用从select里获取的value值
                    province = this.$refs.formOptDialogAuthority.getValue().province
//                    let addObj = { situation, authority, orgId, importantCount, importantSize,
//                        province, city, orgName, email, contact, msisdn, code, shortName, description, type };
//                    this.commitIsCorrect(addObj, '修改');
                }
                let city = {};
                if (this.cityName === this.$refs.formOptDialogAuthority.getValue().city) {
                    city = this.cityVal
                } else {
                    city = this.$refs.formOptDialogAuthority.getValue().city
                }
                let addObj = { situation, authority, orgId, importantCount, importantSize,
                    province, city, orgName, email, contact, msisdn, code, shortName, description, type };
                this.commitIsCorrect(addObj, '修改');
            },
//  -----------------------获取表格勾选的数据-----------------------------------------
            handleSelectionChange (val) {
                this.tableSelections = val;
                this.rowShow = false;
                let me = this;
                setTimeout(function () {
                    me.rowShow = true;
                }, 100)
                return false;
            },
//  -----------------------页码改变---------------------------------------------------
            handleCurrentPageChange (val) {
                this.formObj.page = val;
                this.fetchData();
            },
//  -----------------------每页显示条数改变-------------------------------------------
            handleSizePageChange (val) {
                this.formObj.rows = val;
                this.formObj.page = 1;
                this.tableOpt.pageOpt.currentPage = 1;
                this.fetchData();
            },
//  -----------------------模态框状态改变---------------------------------------------
            dialogChange (val) {
                this.addShow = val;
                this.dialogShow = val;
                this.addCityType = false;
            },
//  -----------------------确认 增加 修改 是否正确 验证-------------------------------
            commitIsCorrect (obj, type) {
                let email = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
                let phone = /^((0\d{2,3}-\d{7,8})|(1[3,4,5,7,8]\d{9}))$/;
                let num = /^[1-9]\d*|0$/;
                if (obj.orgName === null || obj.orgName === '') {
                    this.$message({
                        type: 'warning',
                        message: '机构名称不能为空'
                    })
                } else if (obj.contact === null || obj.contact === '') {
                    this.$message({
                        type: 'warning',
                        message: '联系人不能为空'
                    })
                } else if (obj.msisdn === null || obj.tel === '') {
                    this.$message({
                        type: 'warning',
                        message: '联系电话不能为空'
                    })
                } else if (!phone.test(obj.msisdn)) {
                    this.$message({
                        type: 'warning',
                        message: '请输入正确的联系电话'
                    })
                } else if (obj.email !== '' && !email.test(obj.email)) {
                    this.$message({
                        type: 'warning',
                        message: '请输入正确的邮箱'
                    })
                } else if (obj.importantCount !== '' && !num.test(obj.importantCount)) {
                    this.$message({
                        type: 'warning',
                        message: '请输入非负整数'
                    })
                } else if (obj.importantSize !== '' && !num.test(obj.importantSize)) {
                    this.$message({
                        type: 'warning',
                        message: '请输入非负整数'
                    })
                } else {
                    if (type === '新增') {
                        this.addData(obj);
                    } else {
                        this.reviseData(obj);
                    }
                }
            },
//  -----------------------增加修改 获取要显示的数据----------------------------------
            messageAssignment (val, source) {
//               修改 显示 机构编号
                if (this[val].items.length === 6) {
                    this[val].items[0].comOpt.value = source.orgName;
                    this[val].items[1].comOpt.value = source.shortName;
                    this[val].items[2].comOpt.value = source.contact;
                    this[val].items[3].comOpt.value = source.msisdn;
                    this[val].items[4].comOpt.value = source.email;
                    this[val].items[5].comOpt.value = source.description;
                } else {
                    this[val].items[0].comOpt.value = source.orgId;
                    this[val].items[1].comOpt.value = source.orgName;
                    this[val].items[2].comOpt.value = source.shortName;
                    this[val].items[3].comOpt.value = source.contact;
                    this[val].items[4].comOpt.value = source.msisdn;
                    this[val].items[5].comOpt.value = source.email;
                    this[val].items[6].comOpt.value = source.description;
                }
                this.formOptDialogAuthority.items[0].comOpt.value = source.provinceName;
                if (source.cityName !== '') {
                    this.formOptDialogAuthority.items[1].comOpt.value = source.cityName;
                    this.cityName = source.cityName
                } else {
                    this.formOptDialogAuthority.items[1].comOpt.value = source.areaName;
                    this.cityName = source.areaName
                }
                this.provinceVal = source.province;
                this.provinceName = source.provinceName;
//                this.cityName = source.cityName
                this.cityVal = source.city
                this.formOptDialogAuthority.items[2].comOpt.value = source.importantCount;
                this.formOptDialogAuthority.items[3].comOpt.value = source.importantSize;
//                获取重点区域监测维度 上下两组
                if (source.situation !== '') {
                    let situationArr = source.situation.split(',');
                    let situation1 = [];
                    let situation2 = [];
                    let situation3 = [];
                    for (let i in situationArr) {
                        if (situationArr[i] === '1') {
                            situation1.push('1')
                        } else if (situationArr[i] === '2') {
                            situation1.push('2')
                        } else if (situationArr[i] === '3') {
                            situation2.push('3')
                        } else if (situationArr[i] === '4') {
                            situation2.push('4')
                        } else if (situationArr[i] === '5') {
                            situation3.push('5')
                        } else if (situationArr[i] === '6') {
                            situation3.push('6')
                        }
                    }
                    this.formOptDialogAuthorityArea.items[0].comOpt.value = situation1;
                    this.formOptDialogAuthorityArea.items[1].comOpt.value = situation2;
                    this.formOptDialogAuthorityArea.items[2].comOpt.value = situation3;
                }
                this.checkNodeArr = [];
//                获取功能权限
                if (source.authoritys.length) {
                    let nodeArr = source.authoritys.split(',');
                    let arr = [];
                    for (let i in nodeArr) {
                        let id = {
                            id: nodeArr[i]
                        }
                        arr.push(id);
                    }
                    this.checkNodeArr = arr;
                    for (let i in arr) {
                        if (arr[i].id === 70004) {
                            this.dynamicDisabled(this.funTree, false)
                        }
                    }
                } else {
                    source.authoritys = [];
                }
            }
        }
    }
</script>

<style lang="postcss">
    @component-namespace ga {
        @b organizationManage {
            @e form {
            }
            @e buttonGroup {
                display: inline-block;
                float: right;
                margin: 10px 0;
                &::after {
                    clear: both;
                }
                @m item {
                    margin-left: 20px;
                    display: inline-block;
                    text-align: center;
                }
                @m item-text {
                    width: 30px;
                    top: -5px;
                    margin-left: 5px;
                    position: relative;
                }
                @m item-iconAdd {
                    display: inline-block;
                    height: 25px;
                    width: 25px;
                    background: url("~assets/images/system/add.png");
                }
                @m item-iconModify {
                    display: inline-block;
                    height: 25px;
                    width: 25px;
                    background: url("~assets/images/system/change.png");
                }
                @m item-iconDel {
                    display: inline-block;
                    height: 25px;
                    width: 25px;
                    background: url("~assets/images/system/delete.png");
                }
                @m item-iconRest {
                    display: inline-block;
                    height: 25px;
                    width: 25px;
                    background: url("~assets/images/system/reset.png");
                }
            }
        }
    }
</style>
