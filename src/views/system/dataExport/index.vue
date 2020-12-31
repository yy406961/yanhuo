<template>
    <div class="ga-all">
        <FormComp :option="formOpt1" ref="form1"></FormComp>
        <div :gutter="5" class="ga-all__formSec">
            <el-col :span="6">
                <FormComp :option="formOpt2"></FormComp>
            </el-col>
            <el-col :span="12">
                <FormComp 
                    :option="formOpt3"
                    v-show="showForm === 1"
                    ref="form3"
                    class="exportData"
                    >
                </FormComp>
                <el-button size="small" type="primary" class="ga-all__formSecMiddle"
                            @click="chooseCounty"
                            v-show="showForm === 2">
                请选择境外国家(或地区)</el-button>
            </el-col>
            <el-col :span="6" class="ga-all__formRightBtn">
                <el-button type="primary" class="ga-all__search" @click="tableLoadFun(1, 10)">查 询</el-button>
                <a  :href="exportUrl"
                    class="ga-all__export"
                    v-if="isExportAbled"
                    @click="exportLink">导 出</a>
                <el-button type="primary" class="ga-all__export1" v-else :disabled="true">导 出</el-button>
            </el-col>
        </div>
        <div class="ga-all__tables">
            <TableComp :option="tableOpt" :comSize="tableHeight"
            @handleCurrentPageChange="tableCurrent"
            @handleSizePageChange = "tableSize"></TableComp>
        </div>
        <sysDialog  size="small"
                    title="境外国家(或地区)"
                    @change="changeCounty"
                    :dialogVisible='showCounty'
                    :okFn='saveCounty'>
            <div class="ga-all__exportDataDialogs exportDataDialogs">
                <formComp :option="countyForm" ref="countyFormValue"></formComp>
            </div>
        </sysDialog>
    </div>
</template>

<script>
    import FormComp from 'components/Form'
    import TableComp from 'components/Table'
    import { mapGetters } from 'vuex'
    import sysDialog from 'components/common/dialog'
    import { dataLoad, tableLoad, dataLoadMore } from 'api/system/dataExport'
    const apiUrl = process.env.NODE_ENV === 'production'
    ? '/policeBusiness' : 'http://192.168.3.183:8080/policeBusiness'
    export default {
        data () {
            let me = this;
            return {
                // 导出路径
                exportUrl: `${apiUrl}/export/daochu`,
                // 境外国家的弹窗
                showCounty: false,
                countyText: '',
                // 第二行表单显示依据
                showForm: 1,
                // 地市; 区县; 省; 市 -- 数据
                areaData: [],
                countyData: [],
                provincesData: [],
                cityData: [],
                formValue: new Date(),
                // 第一行表单
                formOpt1: {
                    inline: true,
                    labelWidth: 100,
                    items: [
                        {
                            label: '所在地市',
                            type: 'select',
                            required: true,
                            comOpt: {
                                width: 165,
                                id: 'area',
                                value: '',
                                data: [],
                                change: function (e) {
                                    if (e) {
                                        me.$refs.form1.setValue([{ id: 'county', value: '' }]);
                                        me.dataLoadMoreFun(e, 1);
                                    }
                                }
                            }
                        },
                        {
                            label: '区县',
                            type: 'select',
                            required: true,
                            comOpt: {
                                width: 165,
                                id: 'county',
                                value: '',
                                data: []
                            }
                        },
                        {
                            label: '起始时间',
                            type: 'date',
                            required: true,
                            comOpt: {
                                width: 200,
                                id: 'startTime',
                                value: new Date() - 60000,
                                disabled: false,
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate (time) {
                                        let cDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                                        let cTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
                                        let pDate = moment(new Date()).subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss');
                                        return !moment(cTime).isBetween(pDate, cDate);
                                    }
                                }
                                // change: function (e) {
                                //     me.formValue = e
                                // }
                            }
                        },
                        {
                            label: '截止时间',
                            type: 'date',
                            required: true,
                            comOpt: {
                                width: 200,
                                id: 'endTime',
                                value: new Date(),
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate (time) {
                                        let cDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                                        let cTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
                                        let pDate = moment(new Date()).subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss');
                                        return !moment(cTime).isBetween(pDate, cDate);
                                    }
                                }
                            }
                        }
                    ]
                },
                // 第二行表单
                formOpt2: {
                    inline: true,
                    labelWidth: 100,
                    btnPos: 'right',
                    items: [
                        {
                            label: '手机归属地',
                            type: 'select',
                            comOpt: {
                                id: 'choose',
                                width: 165,
                                value: 'a',
                                data: [
                                    { name: '省外', value: 'a' },
                                    { name: '境外', value: 'b' }
                                ],
                                change: function (e) {
                                    if (e === 'a') {
                                        me.showForm = 1
                                    } else if (e === 'b') {
                                        me.showForm = 2
                                    }
                                }
                            }
                        }
                    ]
                },
                // 隐藏的表单
                formOpt3: {
                    inline: true,
                    // labelWidth: 170,
                    items: [
                        {
                            label: '省（市、自治区）',
                            type: 'select',
                            required: true,
                            comOpt: {
                                id: 'provinces',
                                width: 165,
                                data: [],
                                value: '',
                                change: function (e) {
                                    if (e) {
                                        me.$refs.form3.setValue([{ id: 'city', value: '' }]);
                                        me.dataLoadMoreFun(e, 2);
                                    }
                                }
                            }
                        },
                        {
                            label: '市（地区、自治州、盟）',
                            type: 'select',
                            required: true,
                            comOpt: {
                                id: 'city',
                                width: 165,
                                value: '',
                                data: []
                            }
                        }
                    ]
                },
                // 境外国家的表单
                countyForm: {
                    inline: true,
                    labelWidth: 130,
                    items: [{
                        type: 'radio',
                        comOpt: {
                            id: 'countryRadio',
                            data: []
                        }
                    }]
                },
                // 底部表格
                tableOpt: {
                    listLoading: false,
                    //  是否为斑马纹 table
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '手机号码', value: 'usernum', width: 200, align: 'center' },
                        { name: '所属运营商', value: 'ispcode', width: 200, align: 'center' },
                        { name: '归属地', value: 'hometown', align: 'center' },
                        { name: '手机卡号（IMSI）', value: 'imsi', width: 200, align: 'center' },
                        { name: '机身码（IMEI）', value: 'imei', width: 200, align: 'center' }
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
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            tableHeight () {
                return {
                    height: this.vsHeight - 135
                }
            },
            isExportAbled () {
                if (this.tableOpt.data.length) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        watch: {
            // 'formValue' () {
            //     // 毫秒为单位
            //     let values = moment(this.$refs.form1.getValue().startTime) - 0 + 60000;
            //     this.formOpt1.items[3].comOpt.value = moment(values).format('YYYY-MM-DD HH:mm:ss');
            // }
        },
        mounted () {
            this.dataLoadFun();
        },
        methods: {
            // 显示弹窗
            chooseCounty (e) {
                this.countyText = e.target;
                this.showCounty = true;
            },
            changeCounty (val) {
                let countyFormValue = this.$refs.countyFormValue.getValue();
                if (countyFormValue.countryRadio) {
                    this.countyText.innerText = '已选择境外国家(或地区)'
                } else {
                    this.countyText.innerText = '未选择境外国家(或地区)'
                }
                this.showCounty = val;
            },
            saveCounty () {
                let countyFormValue = this.$refs.countyFormValue.getValue();
                if (countyFormValue.countryRadio) {
                    this.countyText.innerText = '已选择境外国家(或地区)'
                } else {
                    this.countyText.innerText = '未选择境外国家(或地区)'
                }
                this.showCounty = false;
            },
            // 导出文件
            exportLink () {
                this.exportUrl = `${apiUrl}/export/daochu`;
                let formValue1 = this.$refs.form1.getValue();
                let formValue3 = this.$refs.form3.getValue();
                this.exportUrl += '/' + formValue1.area + '/' + formValue1.county +
                '/' + formValue3.provinces + '/' + formValue3.city
                if (this.showForm === 1) {
                    this.exportUrl += '/undefined/' + formValue1.startTime + '/' + formValue1.endTime + '/1'
                } else {
                    if (this.$refs.countyFormValue) {
                        let countyVlaue = this.$refs.countyFormValue.getValue();
                        this.exportUrl += '/' + countyVlaue.countryRadio + '/' + formValue1.startTime + '/' + formValue1.endTime + '/2'
                    }
                }
            },
            // 加载初始数据
            async dataLoadFun () {
                let resp = await dataLoad()
                this.formOpt1.items[0].comOpt.data = resp.data.areaData;
                this.formOpt3.items[0].comOpt.data = resp.data.provincesData;
                this.countyForm.items[0].comOpt.data = resp.data.overseas;
            },
            // 加载二级表单数据
            async dataLoadMoreFun (str, flag) {
                let resp = await dataLoadMore({
                    compKey: str,
                    flag: flag
                })
                if (flag === 1) {
                    this.formOpt1.items[1].comOpt.data = resp.data;
                } else {
                    this.formOpt3.items[1].comOpt.data = resp.data;
                }
            },
            // 分页
            tableCurrent (val) {
                this.tableLoadFun(val, this.tableOpt.pageOpt.pageSize)
            },
            tableSize (val) {
                this.tableLoadFun(1, val)
            },
            // 加载表格数据
            async tableLoadFun (page, rows) {
                let formValue1 = this.$refs.form1.getValue()
                for (let obj1 in formValue1) {
                    if (formValue1[obj1] === undefined || formValue1[obj1] === '') {
                        this.$alert('请输入全部查询条件')
                        return
                    }
                    if (formValue1.startTime >= formValue1.endTime) {
                        this.$alert('请输入正确的起止时间')
                        return
                    }
                }
                if (this.showForm === 1) {
                    let formValue3 = this.$refs.form3.getValue()
                    for (let obj3 in formValue3) {
                        if (formValue3[obj3] === undefined || formValue3[obj3] === '') {
                            this.$alert('请输入全部查询条件')
                            return
                        }
                    }
                } else {
                    // 未曾打开过弹窗，getValue请求报错
                    if (this.$refs.countyFormValue) {
                        let countyFormValue = this.$refs.countyFormValue.getValue()
                        if (countyFormValue.countryRadio === undefined || countyFormValue.countryRadio === '') {
                            this.$alert('请输入全部查询条件')
                            return
                        }
                    } else {
                        this.$alert('请输入全部查询条件')
                        return
                    }
                }
                let objs;
                this.tableOpt.listLoading = true;
                this.tableOpt.pageOpt.pageSize = rows;
                this.tableOpt.pageOpt.currentPage = page;
                if (this.showForm === 1) {
                    let formValue3 = this.$refs.form3.getValue()
                    objs = Object.assign(formValue1, formValue3)
                    objs.choose = '1';
                } else {
                    let countyFormValue = this.$refs.countyFormValue.getValue()
                    objs = Object.assign(formValue1, countyFormValue)
                    objs.choose = '2';
                }
                let resp = await tableLoad({
                    objs: objs,
                    page: page,
                    rows: rows
                })
                if (resp.rows) {
                    this.tableOpt.listLoading = false;
                    this.tableOpt.data = resp.rows
                    this.tableOpt.pageOpt.total = resp.total;
                }
            }
        },
        components: {
            FormComp,
            TableComp,
            sysDialog
        }
    }
</script>

<style scoped>
    .el-row {
        height: 43px;
        margin: 0px;
    }
    .ga-all__dialogChecks .yq-form .el-form .el-form-item .el-form-item__content .el-radio-group .el-radio {
        font-size: 14px;
        width: 150px;
        margin-left: 38px;
    }
    @component-namespace ga {
        @b all {
            width: 100%;
            height: 100%;
            @e export {
                /*width: 60px;*/
                /*height: 26px;*/
                /*border: 1px solid #4081dc;*/
                /*background: #0D2E54;*/
                display: inline-block;
                /*text-align: center;*/
                /*line-height: 26px;*/
                /*color: #fff;*/
                margin-top: 9px;
                color:#fff;
                background:url("~assets/images/formImage/btn.png") no-repeat 0 center;
                background-size: 95% 95%;
                background-position: center;
                padding: 0px 15px;
            }
            @e export1 {
                /*width: 60px;*/
                /*height: 26px;*/
                /*border: 1px solid #ccc;*/
                /*background: #6c8aad;*/
                /*display: inline-block;*/
                /*text-align: center;*/
                /*line-height: 26px;*/
                /*color: #fff;*/
                margin-top: 10px;
                cursor: no-drop;
            }
            @e search {
                /*width: 60px;*/
                /*height: 26px;*/
                /*border: 1px solid #4081dc;*/
                /*background: #0D2E54;*/
                /*display: inline-block;*/
                /*text-align: center;*/
                /*line-height: 26px;*/
                /*color: #fff;*/
                margin-top: 10px;
            }
            @e formSec{
                margin-top:-30px;
            }
            @e formSecMiddle{
                margin-top: 22px;
            }
            @e formRightBtn{
                text-align:right;
                margin-top: 22px;
            }
            @e tables {
                width: 100%;
                height: 70%;
                /*margin-left: 3%;*/
            }
            @e exportDataDialogs {
                width: 100%;
                height: 370px;
                overflow-y: scroll;
            }

        }
    }
</style>