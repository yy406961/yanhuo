<template lang="html">
      <div class="ga-targetNumberManage">
            <el-row class="ga-targetNumberManage__form">
                <formComp :option="formOpt" ref="form"></formComp>
            </el-row>
            <el-row class="ga-targetNumberManage__table">
                <tableDemo :option="tableOpt" :comSize="comSize" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange = "handleSizePageChange"></tableDemo>
            </el-row>
      </div>
</template>

<script>
    import textComp from 'components/Form/text'
    import buttonComp from 'components/Form/button'
    import formComp from 'components/Form'
    import tableDemo from 'components/Table'
    import { baseStationSearch } from 'api/system/baseStationSearch'
    import { mapGetters } from 'vuex'
    export default {
        name: 'targetNumberManage',
        data () {
            let me = this;
            return {
                owner: {
                    owner: ''
                },
                formHeight: '',
                formObj: {
                    page: 1,
                    rows: 10,
                    province: '',
                    city: '',
                    county: '',
                    town: '',
                    lac: '',
                    ci: '',
                    lon: '',
                    lat: ''
                },
                formOpt: {
                    inline: true,
                    labelPos: 'center',
                    labelWidth: '60',
                    btnPos: 'right',
                    items: [{
                        label: 'LAC',
                        type: 'text',
                        comOpt: {
                            id: 'lac',
                            placeholder: '请输入LAC',
                            disabled: false
                        }
                    }, {
                        label: 'CI',
                        type: 'text',
                        comOpt: {
                            id: 'ci',
                            placeholder: '请输CI',
                            disabled: false
                        }
                    }, {
                        label: '经度',
                        type: 'text',
                        comOpt: {
                            id: 'lon',
                            placeholder: '请输入经度',
                            disabled: false
                        }
                    }, {
                        label: '纬度',
                        type: 'text',
                        comOpt: {
                            id: 'lat',
                            placeholder: '请输入纬度',
                            disabled: false
                        }
                    }, {
                        label: '省',
                        type: 'text',
                        comOpt: {
                            id: 'province',
                            placeholder: '请输入省',
                            disabled: false
                        }
                    }, {
                        label: '市',
                        type: 'text',
                        comOpt: {
                            id: 'city',
                            placeholder: '请输入市',
                            disabled: false
                        }
                    }, {
                        label: '县/区',
                        type: 'text',
                        comOpt: {
                            id: 'district',
                            placeholder: '请输入县',
                            disabled: false
                        }
                    }, {
                        label: '镇',
                        type: 'text',
                        comOpt: {
                            id: 'township',
                            placeholder: '请输入镇',
                            disabled: false
                        }
                    }],
                    btns: [{
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '查询',
                            disabled: false,
                            click () {
                                me.formObj.province = $.trim(me.$refs.form.getValue().province);
                                me.formObj.city = $.trim(me.$refs.form.getValue().city);
                                me.formObj.district = $.trim(me.$refs.form.getValue().district);
                                me.formObj.township = $.trim(me.$refs.form.getValue().township);
                                me.formObj.lac = $.trim(me.$refs.form.getValue().lac);
                                me.formObj.ci = $.trim(me.$refs.form.getValue().ci);
                                me.formObj.lon = $.trim(me.$refs.form.getValue().lon);
                                me.formObj.lat = $.trim(me.$refs.form.getValue().lat);
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
                        { name: 'MCC', value: 'mcc', width: 80, align: 'center' },
                        { name: '运营商', value: 'mnc', width: 100, align: 'center' },
                        { name: 'LAC', value: 'lac', align: 'center' },
                        { name: 'CI', value: 'ci', align: 'center' },
                        { name: '纬度', value: 'lat', width: 100, align: 'center' },
                        { name: '经度', value: 'lon', width: 100, align: 'center' },
                        { name: '精度', value: 'acc', width: 80, align: 'center' },
                        { name: '日期', value: 'date', width: 180, align: 'center' },
                        { name: '有效性', value: 'validity', width: 60, align: 'center' },
                        { name: '地址', value: 'addr', width: 180, align: 'center', tooltip: true },
                        { name: '省', value: 'province', width: 180, align: 'center' },
                        { name: '市', value: 'city', width: 180, align: 'center' },
                        { name: '县/区', value: 'district', width: 180, align: 'center' },
                        { name: '镇', value: 'township', width: 180, align: 'center' }
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
        },
        components: {
            formComp,
            buttonComp,
            textComp,
            tableDemo
        },
        created () {
            this.formObj.owner = this.userName;
            this.owner.owner = this.userName;
        },
        mounted () {
            this.formHeight = this.$refs.form.getContainerHeight();
            this.fetchData();
        },
        computed: {
            comSize () {
                let a = this.targetNumberHeight
                if (typeof this.targetNumberHeight === 'undefined') {
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
            async fetchData () {
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                let resp = await baseStationSearch(this.formObj);
                if (resp && resp.rows) {
                    let data = resp.rows;
                    for (let i in data) {
                        if (data[i].mnc === '0') {
                            data[i].mnc = '移动'
                        } else if (data[i].mnc === '1') {
                            data[i].mnc = '联通'
                        } else {
                            data[i].mnc = '电信'
                        }
                    }
                    this.tableOpt.data = data;
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
                } else {
                    this.tableOpt.listLoading = false;
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
        }
    }
</script>

<style lang="postcss">
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
            @e form {}
            @e table {}
            @e dialog {
                margin-top: 5px;
            }
        }
    }
</style>
