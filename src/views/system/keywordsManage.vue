<template lang="html">
      <div class="ga-keywordManage">
            <el-row class="ga-keywordManage__form">
                <formComp :option="formOpt" ref="form"></formComp>
            </el-row>
            <el-row class="ga-keywordManage__table">
                <tableComp :option="tableOpt" :comSize="comSize" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange = "handleSizePageChange"></tableComp>
            </el-row>
            <sysDialog size="tiny" v-if="addShow" :dialogVisible="addShow" title="关键词新增" :okFn="commitAdd" @change="dialogChange">
                <el-row>
                    <el-col :span="20" :offset="2">
                        <formComp :option="formOptAdd" ref="formAdd"></formComp>
                    </el-col>
                </el-row>
            </sysDialog>
            <sysDialog size="tiny" v-if="modifyShow" :dialogVisible="modifyShow" title="关键词码修改" :okFn="commitModify" @change="dialogChange">
                <el-row>
                    <el-col :span="20" :offset="2">
                        <formComp :option="formOptModify" ref="modify"></formComp>
                    </el-col>
                </el-row>
            </sysDialog>
            <sysDialog size="tiny" v-if="importShow" :dialogVisible="importShow" title="关键词导入" :okFn="commitImport" @change="dialogChange">
                <el-row>
                    <el-col :offset="1">
                        关键词导入
                    </el-col>
                </el-row>
                <el-row class="ga-keywordManage__dialog">
                    <el-col :span="6" :offset="3">
                        模板下载：
                    </el-col>
                    <el-col :span="14" :offset="1">
                        关键词管理模板<a :href="importUrl">【点击下载】</a>
                    </el-col>
                </el-row>
                <el-row class="ga-keywordManage__dialog">
                    <el-col :span="21" :offset="3">
                        <el-upload ref="upload"
                        :data="owner"
                        :action="uploadUrl"
                        :on-error="handleError"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10%;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <p style="margin-top: 5px;" slot="tip"><span style="color: red">*&nbsp;</span>只能上传Excel文件(.xls)</p>
                    </el-upload>
                    </el-col>
                </el-row>
            </sysDialog>
      </div>
</template>

<script>
    import sysDialog from 'components/common/dialog'
    import formComp from 'components/Form'
    import tableComp from 'components/Table'
    import textComp from 'components/Form/text'
    import buttonComp from 'components/Form/button'
    import { getKeywordList, deleteKeyword, reviseKeyword, addKeyword } from 'api/baseData'
    import { mapGetters } from 'vuex'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '/policeBusiness' : 'http://10.8.0.20:8080/policeBusiness'
    export default {
        name: 'keywordManage',
        data () {
            let me = this;
            return {
                owner: {
                    owner: ''
                },
                fileList: [],
                importUrl: '',
                uploadUrl: '',
                formHeight: '',
                formObj: {
                    page: 1,
                    rows: 10,
                    words: '',
                    owner: '',
                    approverStatus: ''
                },
                importShow: false,
                addShow: false,
                modifyShow: false,
                modifyData: {},
                formOpt: {
                    inline: true,
                    labelPos: 'left',
                    labelWidth: '70',
                    items: [{
                        label: '关键词',
                        type: 'text',
                        comOpt: {
                            id: 'keyword',
                            placeholder: '请输入关键词',
                            disabled: false
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '查询',
                            disabled: false,
                            click () {
                                me.formObj.words = $.trim(me.$refs.form.getValue().keyword);
                                me.modifyDeleteData = me.formObj.words;
                                me.formObj.page = 1;
                                me.tableOpt.pageOpt.currentPage = 1;
                                me.fetchData();
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
                    items: [{
                        label: '',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'modifyKeyword',
                            value: '',
                            placeholder: '请输入关键词',
                            disabled: false
                        }
                    }]
                },
                formOptAdd: {
                    inline: false,
                    items: [{
                        label: '',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'addKeyword',
                            iptType: 'textarea',
                            // width: 500,
                            rows: 10,
                            value: '',
                            placeholder: '请输入关键词',
                            disabled: false
                        }
                    }]
                },
                textOptImport: {
                    id: 'importKeyword',
                    value: '',
                    disabled: false
                },
                buttonOptImport: {
                    id: 'importKeyword',
                    value: '导入',
                    disabled: false
                },
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '关键词', value: 'words', align: 'center' },
                        { name: '录入时间', value: 'createTime', width: 180, align: 'center' },
                        {
                            name: '操作', value: '', width: 100, align: 'center', operations: [
                                { label: '修改', type: 'label', callback: function (row) {
    //                                    if (me.operateStatusInit === 3 || row.approverStatus !== 0) {
    //                                        me.tableOpt.column[8].operations[0].disabled = true;
    //                                    } else {
    //                                        console.log('哈哈')
    //                                        me.tableOpt.column[8].operations[0].disabled = false;
    //                                    }
                                    if (me.operateStatusInit === 3 || row.approverStatus !== 0) {
                                        this.disabled = true;
                                        return 'is-disabled'
                                    } else {
                                        this.disabled = false;
                                    }
                                }, click: me.editClick },
                                { label: '删除', type: 'label', text: '确认删除此关键字？', isConfirm: true, callback: function (row) {
    //                                    if (me.operateStatusInit === 3 || row.approverStatus !== 0) {
    //                                        me.tableOpt.column[8].operations[1].disabled = true;
    //                                    } else {
    //                                        console.log('哈哈')
    //                                        me.tableOpt.column[8].operations[1].disabled = false;
    //                                    }
                                    if (me.operateStatusInit === 3 || row.approverStatus !== 0) {
                                        this.disabled = true;
                                        return 'is-disabled'
                                    } else {
                                        this.disabled = false;
                                    }
                                }, click: me.deleteClick }]
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
            keywordHeight: {
                default: this.vsHeight
            },
            taskId: {
                default: ''
            },
            isLoad: {
                default: true
            },
            taskType: {
                default: ''
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
            tableComp,
            buttonComp,
            textComp,
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
            if (this.taskTypeInit === 2) {
                this.formObj.isAdd = '1'
            } else {
                this.formObj.isAdd = '0'
            }
            if (this.operateStatusInit === 3) {
                this.formOpt.items[2].comOpt.disabled = true;
                this.formOpt.items[3].comOpt.disabled = true;
            }
            if (this.operateStatusInit === 3 || this.operateStatusInit === 1) {
//                console.log(this.approverStatusInit)
                this.formObj.approverStatus = this.approverStatusInit
            } else {
                this.formObj.approverStatus = 0;
            }
        },
        mounted () {
            this.formHeight = this.$refs.form.getContainerHeight();
            this.importUrl = apiUrl + '/keywords/downloadModel'
            this.uploadUrl = apiUrl + '/keywords/uploadFile'
            if (this.isLoad) {
                this.fetchData();
            }
        },
        computed: {
            comSize () {
                let a = this.keywordHeight
                if (typeof this.keywordHeight === 'undefined') {
                    return {
                        height: this.vsHeight - this.formHeight - 20
                    }
                } else {
                    return {
                        height: a - this.formHeight - 20
                    }
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'userName': 'global/userName'
            })
        },
        methods: {
            handleError (err) {
                this.$message({
                    type: 'warning',
                    message: err
                })
            },
            handleSuccess (resp) {
                if (resp.status === 201) {
                    this.$message({
                        type: 'info',
                        message: resp.message
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: resp.message
                    })
                }
            },
            handleRemove (file) {
                this.$message({
                    type: 'success',
                    message: file.name + '移除成功'
                })
            },
            submitUpload () {
                this.$refs.upload.submit();
            },
            commitModify () {
                let { modifyKeyword: words } = this.$refs.modify.getValue();
                let { wordsId } = this.modifyData;
                let { owner } = this.formObj
                let modifyObj = { words, wordsId, owner };
                this.commitIsCorrect(modifyObj, 'modify');
            },
            commitAdd () {
                let { addKeyword: words } = this.$refs.formAdd.getValue();
                let { owner } = this.formObj
                let addObj = { words, owner };
                this.commitIsCorrect(addObj, 'add');
            },
            commitImport () {
                this.dialogChange(false);
                this.fetchData();
            },
            async fetchData () {
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                let resp = await getKeywordList(this.formObj);
                if (resp) {
                    this.tableOpt.data = resp.rows;
//                    this.tableOpt.listLoading = false;
//                    this.tableOpt.pageOpt.currentPage = val || 1;
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
            async deleteData (id) {
                let resp = await deleteKeyword(id);
                if (resp) {
//                    this.tableOpt.pageOpt.currentPage = 1;
                    this.formObj.words = this.$refs.form.getValue().keyword;
                    this.fetchData();
                }
            },
            async addData (addObj) {
                let resp = await addKeyword(addObj);
                if (resp) {
                    this.dialogChange(false);
                    this.formObj.page = 1;
                    this.formObj.words = '';
                    this.tableOpt.pageOpt.currentPage = 1;
                    this.fetchData();
                }
            },
            async reviseData (modifyObj) {
                let resp = await reviseKeyword(modifyObj);
                if (resp) {
                    this.dialogChange(false);
//                    this.formObj.page = 1;
//                    this.formObj.words = '';
//                    this.tableOpt.pageOpt.currentPage = 1;
                    this.formObj.words = this.$refs.form.getValue().keyword;
                    this.fetchData();
                }
            },
            addClick () {
                this.addShow = true;
            },
            editClick (row) {
                this.modifyData = row;
                this.modifyShow = true;
                this.formOptModify.items[0].comOpt.value = this.modifyData.words;
            },
            deleteClick (row) {
                let wordsId = row.wordsId;
                this.$confirm('是否确认删除？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.deleteData(wordsId);
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
                let word = obj.words;
                // let recxWords = /^[0-9A-Za-z\u4e00-\u9fa5]{15,}$/
                if (word.length < 15) {
                    this.$alert('请输入不小于15位字符组成的的有害短信样本', {
                        confirmButtonText: '确定'
                    })
                } else {
                    if (type === 'add') {
                        this.addData(obj);
                    } else {
                        this.reviseData(obj)
                    }
                }
                // if (obj.words === null || obj.words === '') {
                //     this.$message({
                //         type: 'warning',
                //         message: '关键词不能为空'
                //     });
                // } else if (obj.words.length < 2 || obj.words.length > 10) {
                //     this.$message({
                //         type: 'warning',
                //         message: '关键词长度为2-10'
                //     });
                // } else if (obj.words.indexOf(' ') >= 0) {
                //     this.$message({
                //         type: 'warning',
                //         message: '关键词含有空格'
                //     });
                // } else {
                //     if (type === 'add') {
                //         this.addData(obj);
                //     } else {
                //         this.reviseData(obj)
                //     }
                // }
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
                if (val === 2) {
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

<style lang="postcss">
    @component-namespace ga {
        @b keywordManage {
            @e form {
            }
            @e table {
            }
            @e dialog {
                margin-top: 5px;
            }
        }
    }
</style>
