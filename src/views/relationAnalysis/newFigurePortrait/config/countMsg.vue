<template>
    <div class="ga-countMsg" >
        <el-row class="figurePortrait-baseData__base--title smallNotLong">
            <div style="display: inline-block;line-height: 22px;">
                <b class="icon"></b>
                <span v-if="renderData">{{renderData.name}} （{{msisdn}}）</span>
                <span class="basetitle">账动信息</span>
            </div>
            <FormComp class="formMarginTB figurePortrait" style="display: inline-block;margin: 0" :option="formOpt" ref="form"></FormComp>
        </el-row>
        <!-- <div class="figurePortrait-baseData__base--title"> {{userName}} <span v-if="msisdn">（</span>{{ msisdn }}<span v-if="msisdn">）</span>帐动信息</div> -->
        <div>
            <tableComp :option = "tableOptResult" :comSize="comSize"
                       @handleCurrentPageChange="handleCurrentPageChange"
                       @handleSizePageChange = "handleSizePageChange">
            </tableComp>
        </div>
    </div>
</template>

<script>
    import tableComp from 'components/Table/';
    import FormComp from 'components/Form/index';
    import { mapGetters } from 'vuex';
    import { forbiddenDate, getIntervalDate } from 'utils'
    import { lifeMsgList, getMsgType } from 'api/relationAnalysis/newFigurePortrait/countMsg'
    export default {
        name: 'countMsg',
        data () {
            let me = this;
            return {
                msgHeight: 0,
                numberAutos: [],
                queryObj: {
                    type: 0,
                    keyId: 0,
                    startTime: '',
                    endTime: '',
                    msisdn: '',
                    pageSize: 10,
                    pageNum: 1
                },
                formHeight: 0,
                msisdn: '',
                userName: '',
                // 短信类型请求参数
                getMsgObj: {
                    type: 0
                },
                changeVal: 0,
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    labelWidth: '80',
                    // btnPos: 'right',
                    // 表单项
                    items: [
                        {
                            label: '帐动类型',
                            type: 'select',
                            required: true,
                            comOpt: {
                                id: 'keyId',
                                value: '',
                                disabled: false,
                                width: '200',
                                data: [],
                                change: function (val) {
                                    me.changeVal = val
                                }
                            }
                        },
                        // {
                        //     label: '银行账号',
                        //     type: 'autoCompletet',
                        //     required: true,
                        //     comOpt: {
                        //         id: 'bankCount',
                        //         value: '',
                        //         disabled: false,
                        //         width: '200',
                        //         data: []
                        //     }
                        // },
                        {
                            label: '起始时间',
                            type: 'date',
                            required: true,
                            comOpt: {
                                id: 'startTime',
                                value: getIntervalDate(1),
                                disabled: false,
                                type: 'date',
                                pickOptions: {
                                    disabledDate (time) {
                                        let maxDay = getIntervalDate(1)
                                        return forbiddenDate(time, maxDay)
                                    }
                                },
                                width: '200'
                            }
                        },
                        {
                            label: '截止时间',
                            type: 'date',
                            required: true,
                            comOpt: {
                                id: 'endTime',
                                value: getIntervalDate(),
                                disabled: false,
                                type: 'date',
                                pickOptions: {
                                    disabledDate (time) {
                                        return forbiddenDate(time)
                                    }
                                },
                                width: '200'
                            }
                        }
                    ],
                    btns: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                // id: 'yq12',
                                value: '查询',
                                disabled: false,
                                click: function () {
                                    me.formValidation()
                                }
                            }
                        }
                    ]
                },
                // 结果列表
                tableOptResult: {
                    listLoading: false,
                    column: [],
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
                tableComun0: [
                    { name: '序号', value: 'index', width: 55, align: 'center' },
                    { name: '银行', value: 'bank', width: 150, align: 'center' },
                    { name: '账号', value: 'accountnumber', width: 150, align: 'center' },
                    { name: '金额', value: 'amounts', width: 140, align: 'center' },
                    { name: '余额', value: 'balance', width: 140, align: 'center' },
                    { name: '交易类型', value: 'tradetype', width: 150, align: 'center' },
                    { name: '时间', value: 'dateTime', width: 140, align: 'center' },
                    { name: '短信内容', value: 'message', align: 'center', tooltip: true }
                ],
                tableComun1: [
                    { name: '序号', value: 'index', width: 55, align: 'center' },
                    { name: '类型', value: 'type', width: 120, align: 'center' },
                    { name: '编号', value: 'serialnumber', width: 150, align: 'center' },
                    { name: '行为', value: 'behavior', width: 150, align: 'center' },
                    { name: '时间', value: 'dateTime', width: 130, align: 'center' },
                    { name: '证券账号', value: 'securitiesaccount', width: 180, align: 'center', tooltip: true },
                    { name: '一码通账号', value: 'ymtaccount', width: 180, align: 'center' },
                    { name: '短信内容', value: 'message', align: 'center', tooltip: true }
                ],
                tableComun2: [
                    { name: '序号', value: 'index', width: 55, align: 'center' },
                    { name: '保险名称', value: 'insurance', width: 240, align: 'center' },
                    { name: '保单', value: 'policy', width: 240, align: 'center' },
                    { name: '保单号', value: 'policynumber', width: 220, align: 'center' },
                    { name: '时间', value: 'dateTime', width: 150, align: 'center' },
                    { name: '短信内容', value: 'message', align: 'center', tooltip: true }
                ],
                tableComun3: [
                    { name: '序号', value: 'index', width: 55, align: 'center' },
                    { name: '短信发送平台', value: 'platform', width: 150, align: 'center' },
                    { name: '银行', value: 'bank', width: 180, align: 'center' },
                    { name: '行为', value: 'behavior', width: 150, align: 'center' },
                    { name: '时间', value: 'dateTime', width: 150, align: 'center' },
                    { name: '金额', value: 'amounts', width: 150, align: 'center' },
                    { name: '余额', value: 'balance', width: 150, align: 'center' },
                    { name: '短信内容', value: 'message', align: 'center', tooltip: true }
                ]
            }
        },
        components: {
            tableComp,
            FormComp
        },
        props: [
            'option',
            'renderData'
        ],
        watch: {
            'renderData' (val) {
                this.msisdn = val.msisdn
                this.userName = val.name
                this.initData()
                this.$nextTick(() => {
                    this.getApi()
                })
            }
        },
        mounted () {
            this.tableOptResult.column = this.tableComun0
            this.formHeight = this.$refs.form.getContainerHeight();
            this.getMsgType()
            // this.keyWordSelectFun()
            //  银行类型
            // getDictionary('bankType').then(resp => {
            //     let { rows, status } = resp
            //     if (resp && status === 200 && _.isArray(rows)) {
            //         rows.forEach((item) => {
            //             let { compKey, compValue } = item
            //             item.value = compKey
            //             item.name = compValue
            //         })
            //         this.$refs.form.setItemData('bankType', rows)
            //     }
            // })
            // 银行账户自动补全
            // bankTypeAll({ owner: this.msisdn, approverStatus: 3 }).then(resp => {
            //     //  测试代码
            //     // autoMatch({ owner: 'T341', approverStatus: 3 }).then(resp => {
            //     let { rows, status } = resp
            //     let goalNumberAuto = []
            //     if (resp && status === 200 && _.isArray(rows)) {
            //         rows.forEach((item, index) => {
            //             let { bankCount } = item
            //             this.numberAutos.push(bankCount);
            //             goalNumberAuto[index] = { value: bankCount }
            //         })
            //         // console.log(this.numberAutos);
            //         this.$refs.form.setItemData('bankCount', goalNumberAuto)
            //         goalNumberAuto = []
            //     }
            // })
        },
        computed: {
            comSize () {
                return {
                    height: this.vsHeight - this.formHeight - 150
                }
            },
            // taskId () {
            //     return localStorage.getItem('taskId');
            // },
            // ownerId () {
            //     return this.taskId ? this.taskId : this.userName;
            // },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
                // 'userName': 'global/userName'
            })
        },
        methods: {
            // 短信类型接口
            getMsgType() {
                // getMsgObj
                getMsgType(this.getMsgObj).then(resp => {
                    let { data } = resp
                    if (data) {
                        data.forEach((item) => {
                            let { keyId, name } = item
                            item.value = keyId
                            item.name = name
                        })
                        this.$refs.form.setItemData('keyId', data)
                        this.$refs.form.setValue([{ id: 'keyId', value: 0 }])
                    }
                })
            },
            // 获取查询结果列表
            async lifeMsgList () {
                this.tableOptResult.data = []
                this.tableOptResult.listLoading = true;
                let resp = await lifeMsgList(this.queryObj);
                let { rows, total } = resp;
                if (rows && _.isArray(rows)) {
                    this.tableOptResult.data = rows;
                    this.tableOptResult.pageOpt.total = total;
                    this.tableOptResult.listLoading = false;
                } else {
                    this.tableOptResult.listLoading = false;
                }
            },
            // 表格页码
            handleCurrentPageChange (val) {
                this.tableOptResult.pageOpt.currentPage = val;
                this.queryObj.pageNum = val
                if (this.tableOptResult.data.length !== 0) {
                    this.lifeMsgList()
                }
            },
            handleSizePageChange (val) {
                this.tableOptResult.pageOpt.currentPage = 1;
                this.tableOptResult.pageOpt.pageSize = val;
                this.queryObj.pageSize = val
                this.queryObj.pageNum = 1
                if (this.tableOptResult.data.length !== 0) {
                    this.lifeMsgList();
                }
            },
            // 表单验证函数
            formValidation () {
                if (!this.renderData) {
                    return
                }
                let queryList = this.$refs.form.getValue();
                let { keyId, startTime, endTime } = queryList
                // let phoneReg = /^1[3,4,5,7,8]\d{9}$/;
                // let isKeyNum = this.numberAutos.includes(bankCount)
                // else if (!bankCount) {
                //     this.$alert('请输入银行账号', {
                //         confirmButtonText: '确定'
                //     });
                // }
                if (!keyId && keyId !== 0) {
                    this.$alert('请选择帐动类型', {
                        confirmButtonText: '确定'
                    });
                } else if (!startTime) {
                    this.$alert('请选择开始时间', {
                        confirmButtonText: '确定'
                    });
                } else if (!endTime) {
                    this.$alert('请选择结束时间', {
                        confirmButtonText: '确定'
                    });
                } else if (startTime > endTime) {
                    this.$alert('请选择正确的起止时间', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.getChangeVal(this.changeVal)
                    this.getApi()
                }
            },
            // 得到表格的内容
            getChangeVal(val) {
                this.tableOptResult.column = []
                this.$nextTick(() => {
                    switch (val) {
                        case 0: this.tableOptResult.column = this.tableComun0
                            break;
                        case 1: this.tableOptResult.column = this.tableComun1
                            break;
                        case 2: this.tableOptResult.column = this.tableComun2
                            break;
                        default: this.tableOptResult.column = this.tableComun3
                            break;
                    }
                })
            },
            getApi() {
                let queryList = this.$refs.form.getValue();
                this.queryObj = queryList;
                this.queryObj.type = 0
                this.queryObj.pageNum = 1
                this.queryObj.pageSize = 10
                this.queryObj.msisdn = this.msisdn
                this.tableOptResult.pageOpt.pageSize = 10
                this.tableOptResult.pageOpt.currentPage = 1;
                this.tableOptResult.pageOpt.total = 0;
                this.lifeMsgList()
            },
            // 初始化
            initData() {
                // 表头赋值初始化
                this.getChangeVal(0)
                // 表单清空赋值
                this.$refs.form.clearValue()
                this.$refs.form.setValue([
                    { id: 'keyId', value: 0 },
                    { id: 'startTime', value: getIntervalDate(1) },
                    { id: 'endTime', value: getIntervalDate() }
                ])
            }
        }
    }
</script>
<style scoped>
    @component-namespace ga {
        @b countMsg {
            @e msg {
                font-size: 18px;
                /*padding-bottom: 5px;*/
                color: #9af5f6;
            }
        }
    }
</style>

