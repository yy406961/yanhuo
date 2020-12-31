<template>
    <div class="ga-countMsg">
        <el-row class="figurePortrait-baseData__base--title smallNotLong">
            <div style="display: inline-block;line-height: 22px;">
                <b class="icon"></b>
                <span v-if="renderData">{{renderData.name}} （{{msisdn}}）</span>
                <span class="basetitle">生活短信</span>
            </div>
            <FormComp class="formMarginTB figurePortrait" style="display: inline-block;margin: 0" :option="formOpt" ref="form"></FormComp>
        </el-row>
        <!-- <div class="ga-baseData__base--title"> {{userName}} <span v-if="msisdn">（</span>{{ msisdn }}<span v-if="msisdn">）</span>生活信息</div> -->
        <!-- <FormComp :option="formOpt" ref="form" style="margin: 0"></FormComp> -->
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
                formHeight: 0,
                msisdn: '',
                userName: '',
                queryObj: {
                    type: 1,
                    keyId: 0,
                    startTime: '',
                    endTime: '',
                    pageSize: 10,
                    pageNum: 1
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
                            label: '短信类型',
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
                // 短信类型请求参数
                getMsgObj: {
                    type: 1
                },
                msgTypeNames: [],
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
                    { name: '短信发送平台', value: 'platform', width: 100, align: 'center' },
                    { name: '订票时间', value: 'dateTime', width: 130, align: 'center' },
                    { name: '出发地', value: 'departure', width: 100, align: 'center' },
                    { name: '出发时间', value: 'departuretime', width: 130, align: 'center' },
                    { name: '订单号', value: 'ordernumber', width: 150, align: 'center' },
                    { name: '旅行工具', value: 'travelvehicle', width: 90, align: 'center' },
                    { name: '航班号/火车车次', value: 'travelnumber', width: 120, align: 'center' },
                    { name: '目的地', value: 'destination', width: 100, align: 'center' },
                    { name: '到达时间', value: 'arrivaltime', width: 130, align: 'center' },
                    { name: '短信内容', value: 'message', align: 'center', tooltip: true }
                ],
                tableComun1: [
                    { name: '序号', value: 'index', width: 55, align: 'center' },
                    { name: '短信发送平台', value: 'platform', width: 120, align: 'center' },
                    { name: '时间', value: 'dateTime', width: 130, align: 'center' },
                    { name: '出发地', value: 'departure', width: 80, align: 'center', tooltip: true },
                    { name: '出发时间', value: 'departuretime', width: 130, align: 'center' },
                    { name: '司机', value: 'driver', width: 100, align: 'center' },
                    { name: '司机手机号', value: 'driverphone', width: 120, align: 'center' },
                    { name: '车型', value: 'vehicle', width: 120, align: 'center' },
                    { name: '车牌', value: 'license', width: 100, align: 'center' },
                    { name: '车牌注解', value: 'licensenote', width: 100, align: 'center', tooltip: true },
                    { name: '目的地', value: 'destination', width: 80, align: 'center', tooltip: true },
                    { name: '短信内容', value: 'message', align: 'center', tooltip: true }
                ],
                tableComun2: [
                    { name: '序号', value: 'index', width: 55, align: 'center' },
                    { name: '短信发送平台', value: 'platform', width: 100, align: 'center' },
                    { name: '时间', value: 'dateTime', width: 130, align: 'center' },
                    { name: '车型', value: 'vehicle', width: 120, align: 'center' },
                    { name: '取车时间', value: 'collectiontime', width: 130, align: 'center' },
                    { name: '到期时间', value: 'expirationtime', width: 130, align: 'center' },
                    { name: '门店地址', value: 'address', width: 120, align: 'center', tooltip: true },
                    { name: '门店电话', value: 'telephone', width: 120, align: 'center' },
                    { name: '短信内容', value: 'message', align: 'center', tooltip: true }
                ],
                tableComun3: [
                    { name: '序号', value: 'index', width: 55, align: 'center' },
                    // { name: '短信发送平台', value: 'platform', width: 120, align: 'center' },
                    { name: '驾驶证号码', value: 'licensenumber', width: 150, align: 'center' },
                    { name: '车牌', value: 'license', width: 120, align: 'center' },
                    { name: '时间', value: 'dateTime', width: 130, align: 'center' },
                    { name: '扣分', value: 'point', width: 120, align: 'center' },
                    { name: '违章代码', value: 'violationnumber', width: 100, align: 'center', tooltip: true },
                    { name: '违章时间', value: 'violationtime', width: 130, align: 'center' },
                    { name: '违章地点', value: 'violationplace', width: 120, align: 'center', tooltip: true },
                    { name: '违章内容', value: 'violationcontent', width: 120, align: 'center', tooltip: true },
                    { name: '短信内容', value: 'message', align: 'center', tooltip: true }
                ],
                tableComun4: [
                    { name: '序号', value: 'index', width: 55, align: 'center' },
                    { name: '短信发送平台', value: 'platform', width: 150, align: 'center' },
                    { name: '时间', value: 'dateTime', width: 130, align: 'center' },
                    { name: '类型', value: 'type', width: 150, align: 'center' },
                    { name: '公司', value: 'company', width: 150, align: 'center', tooltip: true },
                    { name: '配送员', value: 'deliveryman', width: 150, align: 'center' },
                    { name: '配送员手机号', value: 'deliveryphone', width: 150, align: 'center' },
                    { name: '短信内容', value: 'message', align: 'center', tooltip: true }
                ],
                tableComun5: [
                    { name: '序号', value: 'index', width: 55, align: 'center' },
                    { name: '住客', value: 'guest', width: 120, align: 'center' },
                    { name: '入住时间', value: 'checkintime', width: 130, align: 'center' },
                    { name: '离店时间', value: 'checkouttime', width: 130, align: 'center' },
                    { name: '详情', value: 'details', width: 150, align: 'center', tooltip: true },
                    { name: '时间', value: 'dateTime', width: 130, align: 'center' },
                    { name: '酒店', value: 'hotel', width: 120, align: 'center', tooltip: true },
                    { name: '电话', value: 'telephone', width: 120, align: 'center' },
                    { name: '短信内容', value: 'message', align: 'center', tooltip: true }
                ]
            }
        },
        components: {
            tableComp,
            FormComp
        },
        mounted () {
            this.formHeight = this.$refs.form.getContainerHeight();
            //  银行类型
            this.getMsgType()
            // getDictionary('lifeMsgType').then(resp => {
            //     let { rows, status } = resp
            //     if (resp && status === 200 && _.isArray(rows)) {
            //         rows.forEach((item) => {
            //             let { compKey, compValue } = item
            //             item.value = compKey
            //             item.name = compValue
            //         })
            //         this.$refs.form.setItemData('msgType', rows)
            //     }
            // })
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
        computed: {
            comSize () {
                return {
                    height: this.vsHeight - this.formHeight - 150
                }
            },
            // ownerId () {
            //     return localStorage.getItem('taskId') || '';
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
                this.queryObj.pageNum = 1
                this.queryObj.pageSize = val
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
                if (!keyId && keyId !== 0) {
                    this.$alert('请选择短信类型名称', {
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
                    this.$alert('请输入正确的起止时间', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.getChangeVal(this.changeVal)
                    this.getApi()
                }
            },
            getApi() {
                let queryList = this.$refs.form.getValue();
                this.queryObj = queryList;
                this.queryObj.type = 1
                this.queryObj.pageNum = 1
                this.queryObj.pageSize = 10
                this.queryObj.msisdn = this.msisdn
                this.tableOptResult.pageOpt.pageSize = 10
                this.tableOptResult.pageOpt.currentPage = 1;
                this.tableOptResult.pageOpt.total = 0;
                this.lifeMsgList()
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
                        case 3: this.tableOptResult.column = this.tableComun3
                            break;
                        case 4: this.tableOptResult.column = this.tableComun4
                            break;
                        default: this.tableOptResult.column = this.tableComun5
                            break;
                    }
                })
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

