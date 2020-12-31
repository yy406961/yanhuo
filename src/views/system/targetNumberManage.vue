<template lang="html">
      <div class="ga-targetNumManage">
            <el-row class="ga-targetNumManage__form">
                <formComp :option="formOpt" ref="form"></formComp>
            </el-row>
            <el-row class="ga-targetNumManage__table">
                <tableDemo :option="tableOpt" :comSize="comSize" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange = "handleSizePageChange"></tableDemo>
            </el-row>
            <sysDialog size="tiny" v-if="addShow" :dialogVisible="addShow" title="目标号码新增" :okFn="commitAdd" @change="dialogChange">
                <el-row style="text-align: center" class="ga-targetNumManage__addShow">
                    <!-- <el-col :span="8" :offset="4">
                        <span @click="changeHomeAbroad(true)"
                        :class="{ 'ga-targetNumManage__addShow--active': showChina }">
                            境内
                        </span>
                    </el-col> -->
                    <el-col :span="12" :offset="6">
                        <el-button type="primary"
                            @click="changeHomeAbroad(true)"
                            class='ga-button__realTime' :class="{'actived': showChina}">
                            境 内
                        </el-button><el-button type="primary" 
                            @click="changeHomeAbroad(false)"
                            class='ga-button__startBtn' :class="{'actived': !showChina}">境 外</el-button>
                        <!-- <span @click="changeHomeAbroad(false)"
                        :class="{ 'ga-targetNumManage__addShow--active': !showChina }">
                            境外
                        </span> -->
                    </el-col>
                </el-row>
                <el-row v-if="showChina">
                    <el-col :span="20" :offset="2">
                        <formComp :option="formOptAdd" ref="formAdd"></formComp>
                    </el-col>
                </el-row>
                <el-row v-if="!showChina">
                    <el-col :span="20" :offset="2">
                        <formComp :option="formOptAdd" ref="formAdd"></formComp>
                    </el-col>
                </el-row>
            </sysDialog>
            <sysDialog size="tiny" v-if="modifyShow" :dialogVisible="modifyShow" title="目标号码修改" :okFn="commitModify" @change="dialogChange">
                <el-row>
                    <el-col :span="20" :offset="2">
                        <formComp :option="formOptModify" ref="formModify"></formComp>
                    </el-col>
                </el-row>
            </sysDialog>
            <sysDialog size="tiny" v-if="importShow" :dialogVisible="importShow" title="目标号码导入" :okFn="commitImport" @change="dialogChange">
                <!-- <el-row>
                    <el-col :offset="1">
                        目标号码导入
                    </el-col>
                </el-row> -->
                <el-row class="ga-targetNumManage__dialog">
                    <!-- <el-col :span="6" :offset="3">
                        模板下载：
                    </el-col> -->
                    <el-col :span="14" :offset="1" class="ga-targetNumManage__uploadTitle">
                        目标号码管理模板：<a :href="importUrl" class="ga-targetNumManage__uploadA">点击下载</a>
                    </el-col>
                </el-row>
                <el-row class="ga-targetNumManage__dialog">
                    <el-col :span="21" :offset="3">
                        <!--<textComp :option="textOptImport"></textComp>-->
                        <el-upload ref="upload"
                        :data="owner"
                        :action="uploadUrl"
                        :on-error="handleError"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        :auto-upload="false">
                        <el-button slot="trigger" size="large" type="primary" icon="el-icon-upload2">上 传</el-button>
                        <!--<el-button style="margin-left: 10%;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                        <p class="ga-targetNumManage__uploadText" slot="tip"><span style="color: red">*&nbsp;</span>只能上传Excel文件(.xls)</p>
                        <p class="ga-targetNumManage__uploadText" slot="tip"><span style="color: red">*&nbsp;</span>模板中目标号码和LBS监控为必填项</p>
                        <!--<p style="margin-top: 5px;" slot="tip"><span style="color: red">*&nbsp;</span>模板中监控停止时间必须大于当前时间</p>-->
                    </el-upload>
                    </el-col>
                    <!--<el-col :span="4">-->
                        <!--<buttonComp :option="buttonOptImport"></buttonComp>-->
                    <!--</el-col>-->
                </el-row>
            </sysDialog>
      </div>
</template>

<script>
    import sysDialog from 'components/common/dialog'
    import textComp from 'components/Form/text'
    import buttonComp from 'components/Form/button'
    import formComp from 'components/Form'
    import tableDemo from 'components/Table'
    // import { getTargetTelList, addTargetTel, reviseTargetTel, deleteTargetTel, flagList } from 'api/baseData'
    import { mapGetters } from 'vuex'
    // import { ts2Date } from 'utils'
    // import { forbiddenDate } from 'utils'
    import { getDictionary } from 'api/platform/dictionary'
    import { ajax } from 'common'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '/policeBusiness' : 'http://10.8.0.21:8080/policeBusiness'
    export default {
        name: 'targetNumManage',
        data () {
            let me = this;
            let day = new Date().getTime()
            return {
                showChina: true,
                modifyDeleteData: '',
                owner: {
                    owner: ''
                },
                fileList: [],
                importUrl: '',
                uploadUrl: '',
                lbsList: [],
                //  lable 标签
                labelList: [],
                formHeight: '',
                formObj: {
                    isAdd: '',
                    page: 1,
                    rows: 10,
                    msisdn: '',
                    approverStatus: '',
                    owner: ''
                },
                importShow: false,
                addShow: false,
                modifyShow: false,
                modifyData: {},
                formOpt: {
                    inline: true,
                    labelPos: 'left',
                    labelWidth: '80',
                    items: [{
                        label: '目标号码',
                        type: 'text',
                        comOpt: {
                            id: 'targetTel',
                            placeholder: '请输入目标号码',
                            disabled: false
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '查询',
                            disabled: false,
                            click () {
                                let targetNum = /^[0-9]*$/
                                let targetTel = $.trim(me.$refs.form.getValue().targetTel);
                                if (!targetNum.test(targetTel)) {
                                    me.$message({
                                        type: 'warning',
                                        message: '请输入正确格式的手机号码'
                                    })
                                } else {
                                    me.formObj.msisdn = $.trim(me.$refs.form.getValue().targetTel);
                                    me.modifyDeleteData = me.formObj.msisdn;
                                    me.formObj.page = 1;
                                    me.tableOpt.pageOpt.currentPage = 1;
                                    me.fetchData();
                                }
                            }
                        }
                    },
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '导入',
                            disabled: false,
                            click () {
                                me.importShow = true;
                            }
                        }
                    },
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            // id: 'yq12',
                            value: '新增',
                            disabled: false,
                            click () {
                                me.addClick()
                            }
                        }
                    }]
                },
                formOptModify: {
                    inline: false,
                    labelPos: 'left',
                    labelWidth: '110',
                    items: [{
                        label: '目标号码',
                        type: 'text',
                        comOpt: {
                            id: 'modifyTargetTel',
                            value: '',
                            placeholder: '请输入目标号码',
                            disabled: true
                        }
                    }, {
                        label: '卡号',
                        type: 'text',
                        comOpt: {
                            id: 'modifyCardNumber',
                            value: '',
                            placeholder: '请输入卡号',
                            disabled: false
                        }
                    }, {
                        label: '机身码',
                        type: 'text',
                        comOpt: {
                            id: 'modifyPhoneCode',
                            value: '',
                            placeholder: '请输入机身码',
                            disabled: false
                        }
                    }, {
                        label: '姓名',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'modifyName',
                            value: '',
                            placeholder: '请输入姓名',
                            disabled: false
                        }
                    }, {
                        label: '标签',
                        type: 'select',
                        comOpt: {
                            id: 'modifyLabel',
                            value: [],
                            placeholder: '请输入标签',
                            disabled: false,
                            multiple: true,
                            data: []
                        }
                    }, {
                        label: 'LBS监控',
                        type: 'select',
                        comOpt: {
                            id: 'modifyLBS',
                            value: '',
                            disabled: true,
                            data: []
                        }
                    }, {
                        label: '监控停止时间',
                        type: 'date',
                        comOpt: {
                            id: 'modifyStopTime',
                            value: day,
                            disabled: false,
                            type: 'datetime',
                            placeholder: '请选择日期',
                            pickOptions: {
                                // disabledDate (time) {
                                //     return forbiddenDate(time, day)
                                // }
                            }
                        }
                    }]
                },
                formOptAdd: {
                    inline: false,
                    labelPos: 'left',
                    labelWidth: '100',
                    items: [{
                        label: '目标号码 + 86',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'addTargetTel',
                            value: '',
                            placeholder: '请输入目标号码',
                            disabled: false
                        }
                    }, {
                        label: '卡号',
                        type: 'text',
                        comOpt: {
                            id: 'addCardNumber',
                            value: '',
                            placeholder: '请输入卡号',
                            disabled: false
                        }
                    }, {
                        label: '机身码',
                        type: 'text',
                        comOpt: {
                            id: 'addPhoneCode',
                            value: '',
                            placeholder: '请输入机身码',
                            disabled: false
                        }
                    }, {
                        label: 'LBS监控',
                        type: 'select',
                        comOpt: {
                            id: 'addLBS',
                            value: '',
                            disabled: true,
                            data: []
                        }
                    }, {
                        label: '姓名',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'addName',
                            value: '',
                            placeholder: '请输入姓名',
                            disabled: false
                        }
                    }, {
                        label: '标签',
                        type: 'select',
                        comOpt: {
                            id: 'addLabel',
                            value: [],
                            placeholder: '请输入标签',
                            disabled: false,
                            multiple: true,
                            data: []
                        }
                    }, {
                        label: '监控停止时间',
                        type: 'date',
                        comOpt: {
                            id: 'addStopTime',
                            value: day,
                            placeholder: '请选择日期',
                            disabled: false,
                            type: 'datetime',
                            pickOptions: {
                                disabledDate (time) {
                                    return time.getTime() < day - 24 * 60 * 60 * 1000
                                }
                            }
                        }
                    }]
                },
                textOptImport: {
                    id: 'importTargetTel',
                    value: '',
                    disabled: false
                },
                buttonOptImport: {
                    id: 'importTargetTel',
                    value: '导入',
                    disabled: false
                },
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '姓名', value: 'name', align: 'center' },
                        { name: '标签', value: 'label', align: 'center', tooltip: true },
                        { name: '目标号码', value: 'msisdn', width: 150, align: 'center' },
                        { name: '卡号', value: 'imsi', align: 'center' },
                        { name: '机身码', value: 'imei', align: 'center' },
                        { name: 'LBS监控', value: 'lbsName', width: 90, align: 'center' },
                        { name: '监控停止时间', value: 'endTime', width: 180, align: 'center' },
                        { name: '录入时间', value: 'createTime', width: 180, align: 'center' },
                        {
                            name: '操作', value: '', width: 100, align: 'center', operations: [
                                { label: '修改', type: 'label',
                                    callback: row => {
                                        if (me.operateStatusInit === 3 || row.approverStatus !== 0) {
                                            this.disabled = true;
                                            return 'is-disabled'
                                        }
                                    },
                                    click: row => {
                                        if (me.operateStatusInit !== 3 && row.approverStatus === 0) {
                                            me.editClick
                                        }
                                    }
                                },
                                { label: '删除', type: 'label', isConfirm: true, text: '确定删除此条数据？',
                                    callback: row => {
                                        if (me.operateStatusInit === 3 || row.approverStatus !== 0) {
                                            this.disabled = true;
                                            return 'is-disabled'
                                        }
                                    },
                                    click: row => {
                                        if (me.operateStatusInit !== 3 && row.approverStatus === 0) {
                                            me.deleteClick
                                        }
                                    }
                                }
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
                },
                taskIdInit: this.taskId,
                taskTypeInit: this.taskType,
                approverStatusInit: this.approverStatus,
                operateStatusInit: this.operateStatusProp
            }
        },
        props: {
            targetNumberHeight: {
                default: undefined
            },
            taskId: {
                default: ''
            },
            isLoad: {
                default: true
            },
            taskType: {
                default: 0
            },
            approverStatus: {
                default: 0
            },
            operateStatusProp: {
                default: 0
            }
        },
        components: {
            formComp,
            buttonComp,
            textComp,
            tableDemo,
            sysDialog
        },
        created () {
            this.formObj.owner = this.userName;
            this.owner.owner = this.userName;
            if (localStorage.getItem('SFtaskId')) {
                this.taskIdInit = localStorage.getItem('SFtaskId')
            }
            if (localStorage.getItem('approverStatus')) {
                this.approverStatusInit = localStorage.getItem('approverStatus')
            }
            if (localStorage.getItem('operateStatus')) {
                this.operateStatusInit = Number(localStorage.getItem('operateStatus'))
            }
            if (this.taskIdInit !== '' && this.taskIdInit !== null) {
                this.formObj.owner = this.taskIdInit
                this.owner.owner = this.taskIdInit
                // this.formObj.approverStatus = this.approverStatusInit;
            }
            if (this.taskTypeInit === 2 || localStorage.getItem('isAdd') === '1') {
                this.formObj.isAdd = '1'
            } else {
                this.formObj.isAdd = '0'
            }
            if (this.operateStatusInit === 3) {
                this.formOpt.items[2].comOpt.disabled = true;
                this.formOpt.items[3].comOpt.disabled = true;
            }
            getDictionary('isControl').then(resp => {
                let arr = [{}, {}];
                for (let i in resp.rows) {
                    arr[i].name = resp.rows[i].compValue;
                    arr[i].value = resp.rows[i].compKey - 0;
                }
                this.lbsList = arr;
            });
            this.flagListFun();
            if (this.operateStatusInit === 3 || this.operateStatusInit === 1) {
                this.formObj.approverStatus = this.approverStatusInit
            } else {
                this.formObj.approverStatus = 0;
            }
        },
        mounted () {
            this.formHeight = this.$refs.form.getContainerHeight();
            this.importUrl = apiUrl + '/targetNumberManage/downloadModel'
            this.uploadUrl = apiUrl + '/targetNumberManage/uploadFile'
            if (this.isLoad) {
                this.fetchData();
            }
        },
        computed: {
            comSize () {
                let height = 0
                if (typeof this.targetNumberHeight === 'undefined') {
                    height = this.vsHeight - this.formHeight
                } else {
                    height = this.targetNumberHeight
                }
                return {
                    height: height
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'userName': 'global/userName'
            })
        },
        methods: {
            changeHomeAbroad (val) {
                this.showChina = val
                if (val) {
                    this.formOptAdd.items[0].label = '目标号码 + 86'
                } else {
                    this.formOptAdd.items[0].label = '目标号码'
                }
            },
            handleError (err) {
                this.$message({
                    type: 'warning',
                    message: err
                })
            },
            handleSuccess (resp) {
                this.$message({
                    type: 'success',
                    message: resp.message
                })
                this.fetchData();
                // if (resp.status === 201) {
                //     this.$message({
                //         type: 'info',
                //         message: resp.message
                //     })
                // } else {
                //     this.$message({
                //         type: 'warning',
                //         message: resp.message
                //     })
                // }
            },
            submitUpload () {
                this.$refs.upload.submit();
            },
            handleRemove (file) {
                this.$message({
                    type: 'success',
                    message: file.name + '移除成功'
                })
            },
            commitModify () {
                let {
                    modifyTargetTel: msisdn, modifyCardNumber: imsi, modifyLBS: lbs,
                    modifyPhoneCode: imei, modifyName: name, modifyStopTime: endTime,
                    modifyLabel: flagArr
                } = this.$refs.formModify.getValue();
                let { owner } = this.formObj;
                let { resourceId } = this.modifyData;
                let flag = flagArr.length ? flagArr.join(',') : ''
                let modifyOpt = { resourceId, msisdn, imsi, imei, name, lbs, endTime, owner, flag };
                this.commitIsCorrect(modifyOpt, '修改');
            },
            commitAdd () {
                let {
                    addTargetTel: msisdn, addCardNumber: imsi, addLBS: lbs,
                    addPhoneCode: imei, addName: name, addStopTime: endTime,
                    addLabel: flagArr
                } = this.$refs.formAdd.getValue();
                let { owner } = this.formObj;
                let numType = 0;
                if (!this.showChina) {
                    numType = 1
                }
                let flag = flagArr.join(',')
                let addOpt = { msisdn, imsi, imei, name, lbs,
                    flag, endTime, owner, numType };
                this.commitIsCorrect(addOpt, 'add');
            },
            commitImport () {
                this.submitUpload()
                this.dialogChange(false);
                // setTimeout(() => {
                //     this.fetchData();
                // }, 1000)
            },
            // 获取目标号码列表
            fetchData () {
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                ajax.post(`/targetNumberManage/tarNumQuery`, this.formObj).then(resp => {
                    if (resp) {
                        resp.rows.forEach((item) => {
                            if (item.flag.length) {
                                item.label = item.flag.reduce((p, c) => {
                                    return p + ',' + c.split(':')[1]
                                }, '').substring(1);
                            } else {
                                item.label = ''
                            }
                        })
                        this.tableOpt.data = resp.rows;
                        // this.tableOpt.pageOpt.currentPage = val || 1;
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
                })
            },
            // 删除目标号码
            deleteData (id) {
                ajax.delete(`/targetNumberManage/tarNumDelete/${id}`).then(resp => {
                    if (resp) {
                        // this.tableOpt.pageOpt.currentPage = 1;
                        this.formObj.msisdn = this.modifyDeleteData;
                        this.fetchData();
                    }
                })
            },
            // 新增目标号码
            addData (addObj) {
                ajax.post(`/targetNumberManage/tarNumAdd`, addObj).then(resp => {
                    if (resp) {
                        this.dialogChange(false);
                        this.formObj.page = 1;
                        this.formObj.msisdn = '';
                        this.modifyDeleteData = ''
                        this.tableOpt.pageOpt.currentPage = 1;
                        this.fetchData();
                    }
                })
            },
            // 修改目标号码
            reviseData (modifyObj) {
                ajax.post(`/targetNumberManage/tarNumModify`, modifyObj).then(resp => {
                    if (resp) {
                        this.dialogChange(false);
                        // this.formObj.msisdn = '';
                        // this.formObj.page = 1;
                        // this.tableOpt.pageOpt.currentPage = 1;
                        this.formObj.msisdn = this.modifyDeleteData;
                        this.fetchData();
                    }
                })
            },
            // 标签
            flagListFun () {
                ajax.post(`/msisdnFlag/flagList`).then(resp => {
                    if (resp) {
                        let arr = [];
                        for (let i in resp.rows) {
                            arr[i] = {}
                        }
                        for (let i in resp.rows) {
                            arr[i].name = resp.rows[i].flagName;
                            arr[i].value = `${resp.rows[i].flagId}:${resp.rows[i].flagName}`;
                        }
                        this.labelList = arr;
                    }
                })
            },
            addClick () {
                this.addShow = true;
                this.$nextTick(function () {
                    this.$refs.formAdd.setItemData('addLBS', this.lbsList);
                    this.$refs.formAdd.setItemData('addLabel', this.labelList);
                })
                this.formOptAdd.items[3].comOpt.value = 0;
            },
            editClick (row) {
                this.modifyData = row;
                this.formOptModify.items[0].comOpt.value = row.msisdn;
                this.formOptModify.items[1].comOpt.value = row.imsi;
                this.formOptModify.items[2].comOpt.value = row.imei;
                this.formOptModify.items[3].comOpt.value = row.name;
                this.formOptModify.items[4].comOpt.value = row.flag
                this.formOptModify.items[5].comOpt.value = row.lbs;
                this.formOptModify.items[6].comOpt.value = row.endTime;
                this.modifyShow = true;
                this.$nextTick(function () {
                    this.$refs.formModify.setItemData('modifyLBS', this.lbsList);
                    this.$refs.formModify.setItemData('modifyLabel', this.labelList);
                })
            },
            deleteClick (row) {
                // let id = row.resourceId;
                // this.deleteData(id);
                this.$confirm('是否确认删除？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    let id = row.resourceId;
                    this.deleteData(id);
                })
            },
            handleCurrentPageChange (val) {
                this.formObj.page = val;
                this.fetchData();
            },
            handleSizePageChange (val) {
                this.formObj.rows = val;
                //                备注：是否跳回第一页
                this.formObj.page = 1;
                this.tableOpt.pageOpt.currentPage = 1;
                this.fetchData();
            },
            commitIsCorrect (obj, type) {
                // let targetNum = /^861[3,4,5,7,8]\d{9}$/;
                let targetNumAdd = /^1[3,4,5,6,7,8,9]\d{9}$/;
                let abroadTargetNum = /^[0-9]{6,15}$/;
                if (obj.msisdn === null || obj.msisdn === '') {
                    this.$message({
                        type: 'warning',
                        message: '目标号码不能为空'
                    })
                } else if (this.showChina) {
                    if (type === 'add' && !targetNumAdd.test(obj.msisdn)) {
                        this.$message({
                            type: 'warning',
                            message: '请输入正确格式的境内手机号码'
                        })
                    } else if (obj.name === null || obj.name === '') {
                        this.$message({
                            type: 'warning',
                            message: '姓名不能为空'
                        })
                    } else {
                        if (type === 'add') {
                            this.addData(obj);
                        } else {
                            this.reviseData(obj)
                        }
                    }
                } else {
                    if (type === 'add' && !abroadTargetNum.test(obj.msisdn)) {
                        this.$message({
                            type: 'warning',
                            message: '请输入正确格式的境外手机号码'
                        })
                    } else if (obj.name === null || obj.name === '') {
                        this.$message({
                            type: 'warning',
                            message: '姓名不能为空'
                        })
                    } else {
                        if (type === 'add') {
                            this.addData(obj);
                        } else {
                            this.reviseData(obj)
                        }
                    }
                }
            },
            dialogChange (val) {
                this.addShow = val;
                this.modifyShow = val;
                this.importShow = val;
            }
        },
        watch: {
            'isLoad' (val) {
                if (val) {
                    this.fetchData();
                }
            },
            taskType (val) {
                if (val === 2 || localStorage.getItem('isAdd') === '1') {
                    this.formObj.isAdd = '1'
                } else {
                    this.formObj.isAdd = '0'
                }
                this.taskTypeInit = val;
            },
            approverStatus (val) {
                this.approverStatusInit = val;
                // this.formObj.approverStatus = val
            },
            taskId (val) {
                this.taskIdInit = val;
            }
        }
    }
</script>

<style scoped>
    /* .el-upload-list {
        height: 80px;
        overflow: auto !important;
    }

    .el-icon-document,
    .el-upload-list__item-name {
        color: #9AF5F6 !important;
    }

    .el-upload-list__item:hover {
        color: #9AF5F6 !important;
        background: #186986 !important;
    } */

    .el-icon-close {
        color: #ffffff !important;
    }
    @component-namespace ga {
        @b targetNumManage {
            padding:0 12px;
            @e form {
                margin-top:-20px;
            }
            @e uploadText{
                margin-top:5px;
                font-size:12px;
                text-align: left;
                color: rgba(255,255,255,0.35);
            }
            @e uploadTitle{
                margin-left:-8px;
                text-align: left;
            }
            @e uploadA{
                color: rgba(0,197,255,1);
            }
            @e table {}
            @e dialog {
                margin-top: 15px;
                text-align: center;
            }
            @e addShow {
                @m active {
                    border: 1px solid #4081dc;
                }
                span {
                    display: inline-block;
                    /* padding: 5px 20px; */
                    cursor: pointer;
                    /*border: 1px solid red;*/
                }
            }
        }
    }
</style>
