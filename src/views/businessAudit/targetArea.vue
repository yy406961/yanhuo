<template lang="html">
      <div :style="mainHeight" class="ga-targetNumberManage">
            <el-row class="ga-targetNumberManage__form">
                <formComp :option="formOpt" ref="form"></formComp>
            </el-row>
            <el-row class="ga-targetNumberManage__table">
                <tableDemo :option="tableOpt"
                            :comSize="comSize"
                            @handleCurrentPageChange="handleCurrentPageChange"
                            @handleSizePageChange = "handleSizePageChange"></tableDemo>
            </el-row>
      </div>
</template>

<script>
    import formComp from 'components/Form'
    import tableDemo from 'components/Table'
    import { selectedAreaInfoQuery } from 'api/task/taskArea'
    import { mapGetters } from 'vuex'
    export default {
        name: 'targetNumberManage',
        data () {
            let me = this;
            return {
                comSize: {},
                formHeight: '',
                formObj: {
                    page: 1,
                    rows: 10,
                    areaName: '',
                    approverStatus: 0,
                    owner: ''
                },
                formOpt: {
                    inline: true,
                    labelPos: 'left',
                    labelWidth: '80',
                    items: [{
                        label: '区域名称',
                        type: 'text',
                        comOpt: {
                            id: 'name',
                            placeholder: '请输入区域名称',
                            disabled: false
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '查询',
                            disabled: false,
                            click () {
                                me.formObj.areaName = $.trim(me.$refs.form.getValue().name);
                                me.formObj.page = 1;
                                me.tableOpt.pageOpt.currentPage = 1;
                                me.fetchData();
                            }
                        }
                    }]
                },
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '区域名称', value: 'areaName', align: 'center' },
                        { name: '来源', value: 'areaSourceType', width: 180, align: 'center' }
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
        props: {
            isLoadArea: false
        },
        components: {
            formComp,
            tableDemo
        },
        created () {
            if (localStorage.getItem('taskId')) {
                this.formObj.owner = localStorage.getItem('taskId');
            }
        },
        mounted () {
            this.formHeight = this.$refs.form.getContainerHeight();
            this.comSize = {
                height: this.vsHeight - 155 - this.formHeight
            };
        },
        computed: {
            mainHeight () {
                return {
                    overflow: 'auto',
                    height: this.vsHeight - 90 + 'px'
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'userName': 'global/userName'
            })
        },
        methods: {
            async fetchData () {
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                let resp = await selectedAreaInfoQuery(this.formObj);
                if (resp) {
                    resp.rows.forEach((item) => {
                        if (+item.areaSourceType === 1) {
                            item.areaSourceType = '系统内置区域'
                        } else if (+item.areaSourceType === 2) {
                            item.areaSourceType = '地图框选'
                        } else if (+item.areaSourceType === 3) {
                            item.areaSourceType = '导入'
                        } else if (+item.areaSourceType === 4) {
                            item.areaSourceType = '录入'
                        }
                    })
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
            }
        },
        watch: {
            'isLoadArea' (val) {
                val && this.fetchData();
            }
        }
    }
</script>

<style lang="postcss" scoped>
    .el-upload-list {
        /*background: red;*/
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
    }

    .el-icon-close {
        color: #ffffff !important;
    }
    @component-namespace ga {
        @b targetNumberManage {
            padding:0 6px;
            @e form {
                margin-top:-20px;
            }
            @e table {}
            @e dialog {
                margin-top: 5px;
            }
            @e addShow {
                @m active {
                    border: 1px solid #4081dc;
                }
                span {
                    display: inline-block;
                    padding: 5px 20px;
                    cursor: pointer;
                    /*border: 1px solid red;*/
                }
            }
        }
    }
</style>
