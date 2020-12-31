<template>
    <div style="width: 100%;" class="ga-personnel">
        <el-row :span="24">
            <el-col :span="5"  class="ga-personnel__left">
                <div class="ga-personnel__left--boxs" :style="treeWrapHeight">
                    <div class="ga-containerBorder__leftTop"></div>
                    <div class="ga-containerBorder__leftBot"></div>
                    <div class="ga-containerBorder__rightTop"></div>
                    <div class="ga-containerBorder__rightBot"></div>
                    <div class="ga-personnel__left--boxTitle">部门机构树</div>
                    <!-- <span class="ga-personnel__left--box" :class="span.className" :key="span.className" v-for="span in spans"></span> -->
                    <div :style="treeDivHeight" class="treeDivHeight">
                        <el-tree :data="rows"
                                :props="defaultProps"
                                highlight-current
                                @node-click="handleNodeClick"
                                ref="tree"
                                class="deptTree"
                                :style="treeHeight">
                        </el-tree>
                    </div>
                </div>
            </el-col>
            <el-col :span="19"  class="ga-personnel__right">
                <formComp style="display: inline-block" class="formMarginTB" :option="formOpt" ref="form"></formComp>
                <div class="ga-department__right--formOptBtn">
                    <!-- <i class="imgAdd"></i> -->
                    <buttonComp :option="btnOptAdd"></buttonComp>
                    <!-- <i class="imgMod"></i> -->
                    <buttonComp :option="btnOptModify"></buttonComp>
                    <!-- <i class="imgDel"></i> -->
                    <buttonComp :option="btnOptDel"></buttonComp>
                </div>
                <tableComp class="tableList" :option="tableOpt" :comSize="tableSize" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange = "handleSizePageChange" @handleSelectionChange="handleSelectionChange"></tableComp>
            </el-col>
        </el-row>
        <!--新增-弹出框-->
        <sysDialog :dialogVisible="deptAddShow" title="部门新增" size="mini" @change="dialogChange" :okFn="confirmAddInfo" :cancleFn="cancleFn">
            <el-row>
                <formComp :option="formOptAdd" ref="formAdd"></formComp>
                <label class="deptComfirmLabel">父级部门：</label>
                <div class="deptComfirm">
                    <textComp :option="textAddOpt" :value="addDeptName"></textComp>
                    <span class="redStar">*</span>
                    <div class="addTree">
                        <el-tree :data="rowsAdd"
                                    :props="defaultProps"
                                    highlight-current
                                    ref="addTree"
                                    @node-click="handleNodeClickAdd"
                        >
                        </el-tree>
                    </div>
                </div>
            </el-row>
        </sysDialog>
        <!--修改-弹出框-->
        <sysDialog :dialogVisible="deptModifyShow" title="部门修改" size="mini" @change="dialogChange" :okFn="confirmModifyInfo">
            <el-row>
                <formComp :option="formOptModify" ref="formModify"></formComp>
                <label class="deptComfirmLabel">父级部门：</label>
                <div class="deptComfirm">
                    <textComp :option="textModifyOpt" :value="modifyDeptName"></textComp>
                    <span class="redStar">*</span>
                    <div class="addTree">
                        <el-tree :data="rowsAdd"
                                    :props="defaultProps"
                                    highlight-current
                                    ref="modifyTree"
                                    @node-click="handleNodeClickModify"
                        >
                        </el-tree>
                    </div>
                </div>
            </el-row>
        </sysDialog>
        <!--删除确认框-->
        <sysDialog :dialogVisible="deleteShow" title="任务删除" size="tiny" @change="dialogChange" :okFn="confirmDelete" :cancleFn="cancleDel">
            <span>是否删除该部门</span>
        </sysDialog>
    </div>
</template>
<script>
    import textComp from 'components/Form/text'
    import sysDialog from 'components/common/dialog'
    import formComp from 'components/Form/index'
    import buttonComp from 'components/Form/button'
    import tableComp from 'components/Table/'
    import { mapGetters, mapActions } from 'vuex'
    import { deptInfoQuery, deptOrgTreeLoad, deptOrgTreeLoads, addDept, deptDelete } from 'api/system/departmentManage.js'

    export default {
        data () {
            const me = this;
            return {
                deleteShow: false,
                rows: [],
                rowsAdd: [],
                defaultProps: {
                    children: 'depts',
                    label: 'deptName'
                },
                defaultPropsAdd: {
                    children: 'depts',
                    label: 'deptName'
                },
                formHeight: '',
                deptAddShow: false,
                deptModifyShow: false,
                selfRankMod: '',
                selfIdMod: '',
                selfName: '',
                selfId: '',
                selfRank: '',
                searchOpt: {
                    deptId: '',
                    deptName: '',
                    deptTreeId: '',
                    rows: 10,
                    page: 1
                },
                treeSearchOpt: {
                    deptTreeId: '',
                    rows: 10,
                    page: 1
                },
                deptSupId: '',
                deptSupRank: '',
                addDeptName: '',
                modifyDeptName: '',
                selectedId: '',
                getRowData: [],
                textAddOpt: {
                    id: '',
                    value: '',
                    width: 400,
                    disabled: true,
                    placeholder: '请选择'
                },
                textModifyOpt: {
                    id: '',
                    value: '',
                    width: 400,
                    disabled: true
                },
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    labelWidth: '78',
                    labelPos: 'right',
                    // btnPos: 'right',
                    // 表单项
                    items: [
                        {
                            label: '部门编号：',
                            type: 'text',
                            comOpt: {
                                id: 'deptId',
                                value: '',
                                disabled: false,
                                width: '150'
                            }
                        },
                        {
                            label: '部门名称：',
                            type: 'text',
                            comOpt: {
                                id: 'deptName',
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
                                id: 'btnSearch',
                                value: '查询',
                                disabled: false,
                                width: 150,
                                click: function () {
                                    let { deptId: deptId, deptName: deptName } = me.$refs.form.getValue();
                                    me.searchOpt.deptId = $.trim(deptId);
                                    me.searchOpt.deptName = $.trim(deptName);
//                                    me.searchOpt.rows = 10;
                                    me.tableOpt.pageOpt.currentPage = 1;
                                    me.tableOpt.pageOpt.total = 0;
                                    me.deptInfoQuery();
                                }
                            }
                        }
                    ]
                },
                formOptAdd: {
                    // form 表单true横排，false竖排
                    inline: true,
                    labelWidth: '120',
                    // 表单项
                    items: [
                        {
                            label: '部门名称：',
                            type: 'text',
                            required: true,
                            comOpt: {
                                id: 'nameAdd',
                                value: '',
                                disabled: false,
                                width: '400'
                            }
                        },
                        {
                            label: '部门描述：',
                            required: true,
                            type: 'text',
                            comOpt: {
                                id: 'describeAdd',
                                iptType: 'textarea',
                                width: 400,
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
                            label: '部门编号：',
                            type: 'text',
                            required: true,
                            comOpt: {
                                id: 'deptIdModify',
                                value: '',
                                disabled: true,
                                width: '400'
                            }
                        },
                        {
                            label: '部门名称：',
                            type: 'text',
                            required: true,
                            comOpt: {
                                id: 'nameModify',
                                value: '',
                                disabled: false,
                                width: '400'
                            }
                        },
                        {
                            label: '部门描述：',
                            type: 'text',
                            required: true,
                            comOpt: {
                                id: 'describeModify',
                                value: '',
                                iptType: 'textarea',
                                width: 400,
                                rows: 3
                            }
                        }
                    ]
                },
                btnOptAdd: {
                    value: '新增',
                    disabled: false,
                    click () {
                        me.deptAddShow = true;
                        me.textAddOpt.value = me.selfName;
                        // console.log(me.selfId);
                        me.deptOrgTreeLoads();
                    }
                },
                btnOptModify: {
                    value: '修改',
                    disabled: false,
                    click: function () {
                        me.modifyClick();
                        me.deptOrgTreeLoads();
                    }
                },
                btnOptDel: {
                    value: '删除',
                    disabled: false,
                    btnSize: 'danger',
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
                        { name: '', value: 'selection', width: 50, align: 'center' },
                        { name: '部门编号', value: 'deptId', width: 120, align: 'center' },
                        { name: '部门名称', value: 'deptName', width: 350, align: 'center' },
                        { name: '父级部门', value: 'deptSupname', align: 'center' }
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
                },
                spans: [{
                    className: 'ga-department__left--box_lf'
                }, {
                    className: 'ga-department__left--box_rt'
                }, {
                    className: 'ga-department__left--box_ld'
                }, {
                    className: 'ga-department__left--box_rd'
                }]
            }
        },
        components: {
            formComp,
            buttonComp,
            tableComp,
            sysDialog,
            textComp
        },
        mounted () {
            this.formHeight = this.$refs.form.getContainerHeight();
        },
        computed: {
            tableSize () {
                return {
                    height: this.vsHeight - this.formHeight - 30
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
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
        created () {
            this.deptOrgTreeLoad();
        },
        methods: {
            // 查询
            async deptInfoQuery () {
                this.tableOpt.listLoading = true;
                let resp;
                if (this.treeSearchOpt.deptTreeId !== '') {
                    resp = await deptInfoQuery(this.treeSearchOpt);
                    this.treeSearchOpt.deptTreeId = '';
                } else {
                    resp = await deptInfoQuery(this.searchOpt);
                }
                if (resp) {
                    this.tableOpt.listLoading = false;
                    this.tableOpt.data = resp.rows;
                    this.tableOpt.pageOpt.total = resp.total;
                }
            },
            // 左侧部门树
            async deptOrgTreeLoad () {
                let resp = await deptOrgTreeLoad();
                if (resp) {
                    this.rows = resp.data;
                }
            },
            // 新增 修改弹框树
            async deptOrgTreeLoads () {
                let resp = await deptOrgTreeLoads();
                if (resp) {
//                    console.log(resp)
                    this.rowsAdd = resp.data;
                }
            },
            // 新增
            async deptAdd (addObj) {
                let resp = await addDept(addObj);
//                console.log(resp);
                if (resp && resp.status === 201) {
                    this.$message({
                        type: 'success',
                        message: '新增成功'
                    });
                    this.deptInfoQuery();
                    this.deptOrgTreeLoad();
                }
            },
            // 修改
            async deptModify (modifyObj) {
                let resp = await addDept(modifyObj);
                if (resp && resp.status === 201) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    this.deptInfoQuery();
                    this.deptOrgTreeLoad();
                }
            },
            // 删除
            async deptDeleteRow (deptId) {
//                this.formOpt.items[0].comOpt.value = '';
//                this.formOpt.items[1].comOpt.value = '';
                let resp = await deptDelete(deptId);
                if (resp) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.deptInfoQuery();
                    this.deptOrgTreeLoad();
                }
            },
//            新增弹框确定
            confirmAddInfo () {
                let { nameAdd: deptName, describeAdd: description } = this.$refs.formAdd.getValue();
//                console.log(this.textAddOpt.value);
//                console.log(this.selfId)
//                let deptSupId;
//                let deptSupRank;
//                if (this.selfId) {
//                    deptSupId = this.selfId;
//                } else {
//                    deptSupId = this.deptSupId;
//                }
//                if (this.selfRank) {
//                    deptSupRank = this.selfRank;
//                } else {
//                    deptSupRank = this.deptSupRank;
//                }
                let deptSupId = this.selfId;
                let deptSupRank = this.selfRank;
                let obj = { deptName, description, deptSupId, deptSupRank, type: 1 };
                if (obj.deptName === null || obj.deptName === '') {
                    this.$message({
                        type: 'warning',
                        message: '部门名称不能为空'
                    })
                } else if (/^[A-Za-z0-9]{60}/.test(obj.deptName)) {
                    this.$message({
                        type: 'warning',
                        message: '长度过长'
                    })
                } else if (/\s/.test(obj.deptName)) {
                    this.$message({
                        type: 'warning',
                        message: '不能输入空格'
                    })
                } else if (obj.deptName === this.selfName) {
                    this.$message({
                        type: 'warning',
                        message: '子部门不能与父级部门相同'
                    })
                } else if (obj.description === null || obj.description === '') {
                    this.$message({
                        type: 'warning',
                        message: '部门描述不能为空'
                    })
                } else if (obj.deptSupId === null || obj.deptSupId === '') {
                    this.$message({
                        type: 'warning',
                        message: '父级部门不能为空'
                    })
                } else {
                    this.deptAdd(obj);
                    this.$refs.formAdd.clearValue();
                    this.deptOrgTreeLoad();
                    this.dialogChange(false);
                }
            },
//            编辑弹框确定
            confirmModifyInfo () {
                let { deptIdModify: deptId, nameModify: deptName, describeModify: description } = this.$refs.formModify.getValue();
                let deptSupId = this.deptSupId;
                let deptSupRank = this.deptSupRank;
//                console.log(this.deptSupRank)
//                console.log(deptSupRank)
                let modifyObj = { deptId, deptName, description, deptSupId, deptSupRank, type: 2 };
                if (/\s/.test(modifyObj.deptName)) {
                    this.$message({
                        type: 'warning',
                        message: '不能输入空格'
                    })
                } else if (modifyObj.description === '' || modifyObj.deptName === '') {
                    this.$message({
                        type: 'warning',
                        message: '不能为空'
                    })
                } else if (modifyObj.deptName === this.modifyDeptName) {
                    this.$message({
                        type: 'warning',
                        message: '子部门不能与父级部门相同'
                    })
                } else {
                    this.deptModify(modifyObj);
                    this.deptOrgTreeLoad();
                    this.deptInfoQuery();
                    this.dialogChange(false);
                }
            },
//            点击左侧树
            handleNodeClick (data) {
//                console.log(data)
                this.selfName = data.deptName;
                this.selfId = data.deptId;
                this.selfRank = data.deptRank;
//                this.detpSupId = data.deptId;
//                this.detpSupRank = data.deptRank;
//                console.log(this.selfName);
                this.treeSearchOpt.deptTreeId = data.deptId;
//                console.log(this.treeSearchOpt.deptTreeId)
                this.deptInfoQuery();
            },
//            点击新增弹框树
            handleNodeClickAdd (data) {
//                console.log(data)
//                this.deptSupId = data.deptId;
//                this.deptSupRank = data.deptRank;
                this.selfId = data.deptId;
                this.selfRank = data.deptRank;
//                console.log(this.deptSupRank)
//                console.log(data.deptRank);
                this.addDeptName = data.deptName;
                this.textAddOpt.value = this.addDeptName;
//                console.log(this.deptSupId)
//                console.log(this.addDeptName)
            },
//            点击修改弹框树
            handleNodeClickModify (data) {
//                console.log(data)
                this.deptSupId = data.deptId;
                this.deptSupRank = data.deptRank;
//                this.selfId = data.deptId;
//                this.selfRank = data.deptRank;
                this.modifyDeptName = data.deptName;
                this.textModifyOpt.value = this.modifyDeptName;
//                console.log(this.deptSupId)
//                console.log(this.modifyDeptName)
            },
            handleCurrentPageChange (val) {
                this.searchOpt.page = val;
                this.deptInfoQuery();
            },
            handleSizePageChange (val) {
                this.searchOpt.rows = val;
                this.deptInfoQuery();
            },
            handleSelectionChange (val) {
                this.getRowData = val;
//                console.log(this.getRowData);
                if (this.getRowData.length) {
                    this.modifyDeptName = this.getRowData[0].deptSupname;
                    this.selfRankMod = this.getRowData[0].deptSupRank;
                    this.selfIdMod = this.getRowData[0].deptSupId;
//                    console.log(this.modifyDeptName);
//                    console.log(this.selfRankMod);
//                    console.log(this.selfIdMod);
                }
            },
            dialogChange (val) {
                this.deleteShow = val;
                this.deptAddShow = val;
                this.deptModifyShow = val;
            },
            modifyClick () {
                if (this.getRowData.length === 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择一行进行修改!'
                    })
                } else if (this.getRowData.length === 1 && this.getRowData[0].deptRank === 0) {
                    this.$message({
                        type: 'warning',
                        message: '该部门禁止修改!'
                    })
                } else if (this.getRowData.length === 1) {
                    this.deptModifyShow = true;
                    this.formOptModify.items[0].comOpt.value = this.getRowData[0].deptId;
                    this.formOptModify.items[1].comOpt.value = this.getRowData[0].deptName;
                    this.formOptModify.items[2].comOpt.value = this.getRowData[0].description;
                    this.deptSupId = this.getRowData[0].deptSupId;
                    this.deptSupRank = this.getRowData[0].deptSupRank;
                    this.textModifyOpt.value = this.modifyDeptName;
//                    console.log(this.deptSupId);
//                    console.log(this.textModifyOpt.value);
                } else {
                    this.$message({
                        type: 'warning',
                        message: '只能选择一条数据!'
                    })
                }
            },
            // 确认删除
            confirmDelete () {
                let id = [];
                for (let i in this.getRowData) {
                    id.push(this.getRowData[i].deptId);
                }
                let deptId = {
                    deptId: id.join(',')
                }
                this.deptDeleteRow(deptId);
//                this.deptInfoQuery();
//                this.deptOrgTreeLoad();
                this.deleteShow = false;
            },
            deleteClick () {
                if (this.getRowData.length === 0) {
                    this.$message({
                        type: 'warning',
                        message: '至少选择一条要删除的数据'
                    });
                } else {
                    this.deleteShow = true;
//                    this.deptInfoQuery();
                }
            },
            getList () {
                this.searchOpt = Object.assign(this.searchOpt, this.$refs.form.getValue());
                console.log(this.searchOpt)
//                if (/\s/.test(this.searchOpt.deptName) || /\s/.test(this.searchOpt.deptId)) {
//                    this.$message({
//                        type: 'warning',
//                        message: '字符中包含空格'
//                    })
//                } else {
//                }
                this.deptInfoQuery()
            },
            cancleFn () {
                this.$refs.formAdd.clearValue();
            },
            cancleDel () {
                this.getRowData = [];
//                console.log(this.getRowData)
            },
            ...mapActions({
                'syncHeight': 'global/syncVisualHeight'
            })
        }
    }
</script>
<style scoped>
    .deptComfirm {
        display: inline-block;
        width: 430px;
        height: 150px;
        border: 0px solid #015483;
        box-sizing: border-box;
        margin-left: -4px;
        /*padding-left: 5px;*/
    }
    .addTree {
        width: 400px;
        height: 120px;
        overflow: auto;
        /*overflow-x: scroll;*/
        /*overflow-y: auto;*/
    }
    .redStar {
        color: red;
    }
    .deptComfirmLabel {
        display: inline-block;
        width: 120px;
        text-align: right;
        vertical-align: top;
        padding-right: 8px;
        opacity: 0.75;
        font-family: PingFangSC-Regular;
        color: #FFFFFF;
    }
    @component-namespace ga {
        @b department {
            width: 100%;
            min-height: 600px;
            margin-top: 30px;
            @e left {
                min-height: 500px;
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
                    padding-left: 10px;
                    padding-top: 10px;

                    /*.deptTree {*/
                        /*margin: 10px;*/
                        /*width: 270px;*/
                        /*height: 340px;*/
                        /*overflow:auto;*/
                    /*}*/
                    .treeDivHeight {
                        overflow-y: auto;
                    }
                    .el-tree-node__content {
                        color: #0997DC;
                    }
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
                .tableList {
                    padding-left: 35px;
                }
                @m formOptBtn{
                    /* margin-left: 35px;
                    margin-bottom: 20px; */
                    margin: 10px 0;
                    float: right;
                    display: inline-block;
                    &::after {
                        clear: both;
                    }
                    .imgAdd {
                            display: inline-block;
                            padding-left: 24px;
                            height: 26px;
                            line-height: 26px;
                            vertical-align: bottom;
                            background-image: url('../../assets/images/system/add.png');
                            background-repeat: no-repeat;
                        }
                    .imgMod {
                            display: inline-block;
                            padding-left: 24px;
                            margin-left: 20px;
                            height: 26px;
                            line-height: 26px;
                            vertical-align: bottom;
                            background-image: url('../../assets/images/system/change.png');
                            background-repeat: no-repeat;
                        }
                    .imgDel {
                            display: inline-block;
                            padding-left: 24px;
                            margin-left: 20px;
                            height: 26px;
                            line-height: 26px;
                            vertical-align: bottom;
                            background-image: url('../../assets/images/system/delete.png');
                            background-repeat: no-repeat;
                        }
                }
            }
        }
    }
</style>
