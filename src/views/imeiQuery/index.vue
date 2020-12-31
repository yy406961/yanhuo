<template>
    <div class="ga-quickImeiQuery">
        <!-- <div class="ga-bigTitleSty ga-dialogContent ga-layout__body-title">
            <span class="ga-dialogContent__dialogTitleLeft"></span>
            <span class="ga-dialogContent__dialogTitleCenter">{{ title }}</span>
            <span class="ga-dialogContent__dialogTitleRight"></span>
        </div> -->
        <formSelect class="ga-quickImeiQuery__btn" :option='queryOpt'></formSelect>
        <div class="ga-targetNumSingleQuery" v-show="isTableShow">
            <p class="ga-quickImeiQuery__pTitle">
                {{curNumberName}}：<span>{{curNumber}}</span> 的查询结果
            </p>
            <div class="ga-quickImeiQuery__tableWarp">
                <tableComp :option="tableOpt" :comSize="comSize"
                    @handleCurrentPageChange="handleCurrentPageChange"
                    @handleSizePageChange = "handleSizePageChange"></tableComp>
            </div>
        </div>
        <sysDialog size="large"
                   v-if="queryInput"
                   :dialogVisible="queryInput"
                   :title="queryInputTitle"
                   :okFn="confirm"
                   :isRightBtn="false"
                   :showCancel="false"
                   :isDisabled="confirmIsDisabled"
                   :showConfirm="showConfirm"
                   @change="dialogChange">
            查询信息<br/>
            <el-row>
                <formSelect ref="queryInfo"
                            :option='queryInfo'></formSelect>
            </el-row>
            <div v-show="!isDirectQuery">
                审批信息<br/>
                <!--第一行-->
                <el-row>
                    <el-col :offset="1" :span="4">
                        <el-row class="ga-quickImeiQuery__textSty">
                            <el-col :span="11">号码类型：</el-col>
                            <el-col :span="13">{{ queryData.numType }}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="4">
                        <el-row class="ga-quickImeiQuery__textSty">
                            <el-col :span="11">手机属地：</el-col>
                            <el-col :span="13">{{ queryData.phoneArea }}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="4">
                        <el-row class="ga-quickImeiQuery__textSty">
                            <el-col :span="11">目标号码：</el-col>
                            <el-col :span="13">{{ queryData.msisdn }}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="5">
                        <el-row class="ga-quickImeiQuery__textSty">
                            <el-col :span="11">目标姓名：</el-col>
                            <el-col :span="13">
                                <textComp ref="nameVal" :option="textOptName"></textComp>
                                <!--<span style="right: -33px" class='yq-form__required'>*</span>-->
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="5">
                        <el-row class="ga-quickImeiQuery__textSty">
                            <el-col :span="11">有效日期：</el-col>
                            <el-col :span="13">
                                <dateComp ref="dateVal" :option="textOptTime"></dateComp>
                                <span style="right: -46px" class='yq-form__required'>*</span>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <!--第二行-->
                <el-row style="margin-top: 20px">
                    <el-col :offset="1" :span="4">
                        <el-row class="ga-quickImeiQuery__textSty">
                            <el-col :span="11">申请人：</el-col>
                            <el-col :span="13">{{ queryData.applicant }}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="6">
                        <el-row class="ga-quickImeiQuery__textSty">
                            <el-col :span="7">申请时间：</el-col>
                            <el-col :span="17">{{ queryData.applyTime }}</el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <!--第三行-->
                <el-row style="margin-top: 20px">
                    <el-col :offset="1" :span="2">
                        <checkboxComp ref="greenVal" :option="checkOption"></checkboxComp>
                    </el-col>
                    <el-col v-show="!greenChannel" :span="6">
                        <el-row class="ga-quickImeiQuery__textSty">
                            <el-col :span="11">批准文号：</el-col>
                            <el-col :span="13">
                                <textComp ref="approveNum" :option="approveNumOpt"></textComp>
                                <span style="right: -22px" class='yq-form__required'>*</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col v-show="!greenChannel" :span="6">
                        <el-row class="ga-quickImeiQuery__textSty">
                            <el-col :span="11">批准人/单位：</el-col>
                            <el-col :span="13">
                                <textComp ref="approvePerson" :option="approvePersonOpt"></textComp>
                                <span style="right: -22px" class='yq-form__required'>*</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col v-show="!greenChannel" :span="6">
                        <el-row class="ga-quickImeiQuery__textSty">
                            <el-col :span="11">批准时间：</el-col>
                            <el-col :span="13">
                                <dateComp ref="approveTime" :option="approveTimeOpt"></dateComp>
                                <span style="right: -22px" class='yq-form__required'>*</span>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </sysDialog>
    </div>
</template>

<script>
    import sysDialog from 'components/common/dialog'
    import { mapGetters } from 'vuex'
    import formSelect from 'components/Form'
    import textComp from 'components/Form/text'
    import dateComp from 'components/Form/date'
    import checkboxComp from 'components/Form/checkbox'
    import tableComp from 'components/Table'
    import { queryInterface, approveInterface } from 'api/quickQuery/quickQueryPage'
    import { imeiQuery } from 'api/imeiQuery/imeiQuery'
    import { forbiddenDate, getIntervalDate, setTablePage } from 'utils'
    export default {
        data () {
            let me = this
            return {
                vsHeight: 0,
                ifExist: '',
                dataCopy: {},
                title: this.$route.name,
                queryInput: false,
                greenChannel: 0,
                showConfirm: false,
                confirmIsDisabled: false,
                // 是否可以直接查询
                isDirectQuery: true,
                queryInputTitle: '查询条件录入',
                // 查询结果
                queryData: {
                    // 号码类型
                    numType: '',
                    // 手机属地
                    phoneArea: '',
                    msisdn: '',
                    //  申请人
                    aplicant: '',
                    //  申请时间
                    applyTime: ''
                },
                // 查询 obj
                queryObj: {
                    operator: '',
                    msisdn: '',
                    // 境内境外
                    ispCode: '',
                    //  号码类型
                    numType: '',
                    // 申请人
                    applicant: '',
                    imei: '',
                    imsi: '',
                    // 用于后台区分快捷查询或机身码查询 1：快捷查询，2：机身码查询
                    mark: 2
                },
                //  审批 obj
                approveObj: {
                    operator: '',
                    numType: '',
                    //  手机号或者  IMEI IMSI
                    msisdn: '',
                    //  申请人
                    applicant: '',
                    //  申请时间
                    applyTime: '',
                    //  姓名
                    name: '',
                    //  有效时间
                    expiryDate: '',
                    //  是否绿色通道 0表示否  1表示是
                    greenChannel: '',
                    //  批准文号
                    fileNo: '',
                    // 申请单位
                    approvalUnit: '',
                    // 批准时间
                    approvalTime: '',
                    // 用于后台区分快捷查询或机身码查询 1：快捷查询，2：机身码查询
                    mark: 2
                },
                // 绿色通道
                checkOption: {
                    id: 'green',
                    value: [],
                    data: [{
                        name: '绿色通道', value: 1, disabled: false
                    }],
                    change: function (val) {
                        if (val.length) {
                            me.greenChannel = 1
                        } else {
                            me.greenChannel = 0
                        }
                    }
                },
                // 查询录入 号码类型
                numberType: [
                    {
                        name: '手机号码',
                        value: 1
                    },
                    {
                        name: 'IMEI（手机机身码）',
                        value: 2
                    },
                    {
                        name: 'IMSI（SIM卡号）',
                        value: 3
                    }
                ],
                // 查询录入 区域类型
                areaType: [
                    {
                        name: '境内',
                        value: 1
                    },
                    {
                        name: '境外',
                        value: 2
                    }
                ],
                // 左上查询按钮
                queryOpt: {
                    items: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '查询',
                                disabled: false,
                                btnType: '',
                                click: function () {
                                    me.queryInput = true
                                    me.showDialog()
                                }
                            }
                        }
                    ]
                },
                // 弹窗-审批-目标姓名
                textOptName: {
                    id: 'spName',
                    width: 150,
                    value: '',
                    placeholder: ' '
                },
                // 弹窗-审批-有效日期
                textOptTime: {
                    id: 'spTime',
                    type: 'date',
                    width: 165,
                    value: getIntervalDate(-30),
                    defaultVal: '',
                    pickOptions: {
                        disabledDate (time) {
                            let maxDay = getIntervalDate(-30)
                            return forbiddenDate(time, maxDay, 30)
                        }
                    }
                },
                // 弹窗-审批-批准文号
                approveNumOpt: {
                    id: 'approveNum',
                    type: 'text',
                    width: 165,
                    value: '',
                    placeholder: ' '
                },
                // 弹窗-审批-批准人/单位
                approvePersonOpt: {
                    id: 'approvePerson',
                    type: 'text',
                    width: 165,
                    value: '',
                    placeholder: ' '
                },
                // 弹窗-审批-批准时间
                approveTimeOpt: {
                    id: 'approveTime',
                    type: 'datetimeMinute',
                    width: 165,
                    required: true,
                    value: getIntervalDate(),
                    defaultVal: '',
                    pickOptions: {
                        disabledDate (time) {
                            let maxDay = getIntervalDate()
                            return forbiddenDate(time, maxDay)
                        }
                    }
                },
                // 弹窗 查询条件
                ploceholderArr: ['手机号码', 'IMEI（手机机身码）', 'IMSI（SIM卡号）'],
                queryInfo: {
                    inline: true,
                    labelWidth: '50',
                    btnPos: 'right',
                    items: [
                        {
                            label: ' ',
                            type: 'select',
                            required: true,
                            comOpt: {
                                id: 'numberType',
                                value: 1,
                                width: 180,
                                data: [],
                                change: function (val) {
                                    if ((val !== 1 && val !== '') && me.queryInfo.items.length === 5) {
                                        me.queryInfo.items.splice(1, 1)
                                        me.queryInfo.items[1].comOpt.placeholder = me.ploceholderArr[val - 1]
                                    } else if (val === 1 && me.queryInfo.items.length === 4) {
                                        me.queryInfo.items.splice(1, 0, {
                                            label: ' ',
                                            type: 'select',
                                            required: true,
                                            comOpt: {
                                                id: 'areaType',
                                                value: 1,
                                                width: 180,
                                                data: []
                                            }
                                        })
                                        me.queryInfo.items[2].comOpt.placeholder = me.ploceholderArr[0]
                                        me.$nextTick(() => {
                                            me.$refs.queryInfo.setItemData('areaType', me.areaType);
                                        })
                                    } else {
                                        me.queryInfo.items[1].comOpt.placeholder = me.ploceholderArr[val - 1]
                                    }
                                }
                            }
                        },
                        {
                            label: ' ',
                            type: 'select',
                            required: true,
                            comOpt: {
                                id: 'areaType',
                                value: 1,
                                width: 180,
                                data: [],
                                change: function () {
                                }
                            }
                        },
                        {
                            label: ' ',
                            type: 'text',
                            required: true,
                            comOpt: {
                                id: 'msisdn',
                                value: '',
                                width: 180,
                                placeholder: '手机号码'
                            }
                        },
                        {
                            label: ' ',
                            type: 'text',
                            required: true,
                            comOpt: {
                                id: 'name',
                                value: '',
                                width: 180,
                                placeholder: '申请人'
                            }
                        },
                        {
                            label: ' ',
                            type: 'button',
                            comOpt: {
                                value: '查询',
                                click: function () {
                                    me.confirmIsDisabled = false
                                    me.query()
                                }
                            }
                        }
                    ]
                },
                // 获取【机身码查询结果列表】的接口参数
                baseData: {
                    time: me.gTime,
                    numType: '',
                    name: '',
                    msisdn: ''
                },
                // 机身码查询结果列表
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: 'IMEI', value: 'imsi', align: 'center' },
                        { name: 'IMSI', value: 'imei', align: 'center' },
                        { name: '最后一次使用时间', value: 'timestamp', align: 'center' }
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
                // 结果列表是否显示
                isTableShow: false,
                // 机身码查询号码名称
                curNumberName: '',
                // 机身码查询号码
                curNumber: '',
                // 机身码查询结果总数据
                totalData: null
            }
        },
        props: ['gTime'],
        mounted () {
            this.vsHeight = $('.ga-targetNumSingleQuery').height()
        },
        computed: {
            comSize () {
                return {
                    height: this.vsHeight - 140
                }
            },
            ...mapGetters({
                'mapCenter': 'global/globalKeys',
                'userNick': 'global/userNick'
            })
        },
        methods: {
            // 查询 返回状态不同 显示不同
            async query () {
                let {
                    numberType: numType,
                    areaType: ispCode,
                    msisdn: msisdn,
                    name: applicant
                } = this.$refs.queryInfo.getValue()
                msisdn = $.trim(msisdn)
                applicant = $.trim(applicant)
                let phoneNumRegExp = /^1[3,4,5,6,7,8,9]\d{9}$/;
                let abroadPhoneNumRegExp = /^[0-9]{6,15}$/;
                let imeiRegExp = /^([a-zA-Z]|\d){14,15}$/;
                // let imeiRegExp = /^[0-9]{15}$/;
                let imsiRegExp = /^[0-9]{15}$/;
                let applicantRegExp = /^[\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z]+$/;
                if (numType === null || numType === '') {
                    this.regExpMsg('号码类型没有录入信息，请检查后重新录入')
                    return
                } else if (numType === 1 && (ispCode === null || ispCode === '')) {
                    this.regExpMsg('手机属地没有录入信息，请检查后重新录入')
                    return
                } else if (msisdn === null || msisdn === '') {
                    this.regExpMsg('目标号码没有录入信息，请检查后重新录入')
                    return
                } else if (applicant === null || applicant === '') {
                    this.regExpMsg('申请人没有录入信息，请检查后重新录入')
                    return
                } else if (numType === 1 && ispCode === 1 && !phoneNumRegExp.test(msisdn)) {
                    // 号码类型为手机号码，手机属地如是境内
                    this.regExpMsg('境内手机号码录入错误，请检查后重新录入')
                    return
                } else if (numType === 1 && ispCode === 2 && !abroadPhoneNumRegExp.test(msisdn)) {
                    this.regExpMsg('境外手机号码录入错误，请检查后重新录入')
                    return
                } else if (numType === 2 && !imeiRegExp.test(msisdn)) {
                    // 号码类型为IMEI，目标号码长度为15位且为数字
                    this.regExpMsg('IMEI录入错误，请检查后重新录入')
                    return
                } else if (numType === 3 && !imsiRegExp.test(msisdn)) {
                    // 号码类型为IMSI，目标号码长度小于等于15位且为数字
                    this.regExpMsg('IMSI录入错误，请检查后重新录入')
                    return
                } else if (!applicantRegExp.test(applicant) || this.getLength(applicant) > 20) {
                    // 申请人为最大长度为10个汉字或20个字母
                    this.regExpMsg('申请人录入最大长度为10个汉字或20个字母，请检查后重新录入')
                    return
                }
                if (numType === 2 || numType === 3) {
                    ispCode = ''
                }
                this.queryObj.operator = this.userNick
                this.queryObj.msisdn = msisdn
                this.queryObj.ispCode = ispCode
                this.queryObj.numType = numType
                this.queryObj.applicant = applicant
                this.isDirectQuery = true
                this.showConfirm = false
                let resp = await queryInterface(this.queryObj)
                if (resp && resp.data) {
                    let data = resp.data
                    this.dataCopy = data
                    this.checkOption.data[0].disabled = false
                    if (+data.ifExist === 1) {
                        // 已经审批 且在日期内 符合条件 直接查询
                        this.queryInput = false
                        this.baseData = {
                            time: this.gTime,
                            numType: +data.numType,
                            msisdn: data.msisdn,
                            name: data.name
                        }
                        this.getImeiList()
                    } else {
                        if (data.numType) {
                            this.approveObj.numType = data.numType
                            if (+data.numType === 1) {
                                this.queryData.numType = '手机号码'
                            } else if (+data.numType === 2) {
                                this.queryData.numType = 'IMEI'
                            } else if (+data.numType === 3) {
                                this.queryData.numType = 'IMSI'
                            }
                        }
                        if (data.ispCode) {
                            this.approveObj.ispCode = data.ispCode
                            if (+data.ispCode === 1) {
                                this.queryData.phoneArea = '境内'
                            } else if (+data.ispCode === 2) {
                                this.queryData.phoneArea = '境外'
                            }
                        }
                        if (data.msisdn) {
                            this.approveObj.msisdn = data.msisdn
                            this.queryData.msisdn = data.msisdn
                        }
                        if (data.applicant) {
                            this.approveObj.applicant = data.applicant
                            this.queryData.applicant = data.applicant
                        }
                        if (data.applyTime) {
                            this.approveObj.applyTime = data.applyTime
                            this.queryData.applyTime = data.applyTime
                        }
                        if (+data.ifExist === 0) {
                            // 需录入审批信息
                            this.ifExist = 0
                            this.isDirectQuery = false
                            this.showConfirm = true
                        } else if (+data.ifExist === 2) {
                            // 审批过期啦
                            this.ifExist = 2
                            this.regExpMsg(resp.message)
                            this.isDirectQuery = false
                            this.showConfirm = true
                            if (+data.greenChannel === 1) {
                                this.$nextTick(() => {
                                    this.checkOption.data[0].disabled = true
                                })
                            }
                        }
                    }
                }
            },
            //  审批录入接口
            async approve () {
                this.confirmIsDisabled = true
                let resp = await approveInterface(this.approveObj)
                if (resp) {
                    this.queryInput = false
                    this.baseData = {
                        time: this.gTime,
                        numType: +this.dataCopy.numType,
                        msisdn: this.dataCopy.msisdn,
                        name: this.dataCopy.name
                    }
                    if (this.approveObj.name) {
                        this.baseData.name = this.approveObj.name
                    }
                    this.confirmIsDisabled = false
                    this.showConfirm = false
                    this.isDirectQuery = true
                    this.checkOption.data[0].disabled = false
                    this.greenChannel = 0
                    this.checkOption.value = []
                    this.getImeiList()
                }
            },
            // 获取机身码查询结果列表
            async getImeiList () {
                this.isTableShow = true;
                this.tableOpt.data = [];
                this.tableOpt.pageOpt.total = 0;
                this.tableOpt.listLoading = true;
                this.changeTableOpt()
                let params = {
                    msisdn: this.baseData.msisdn,
                    numType: this.baseData.numType
                }
                let resp = await imeiQuery(params);
                if (resp && resp.rows) {
                    let curPageNum = this.tableOpt.pageOpt.currentPage;
                    let curPageSize = this.tableOpt.pageOpt.pageSize;
                    // 存储请求结果
                    this.totalData = resp.rows;
                    // 显示分页后列表
                    this.curNumber = this.queryObj.msisdn;
                    this.tableOpt.data = setTablePage(this.totalData, curPageNum, curPageSize);
                    this.tableOpt.pageOpt.total = resp.total;
                    this.tableOpt.listLoading = false;
                }
            },
            // 审批
            confirm () {
                let name = $.trim(this.$refs.nameVal.getValue().spName)
                let effectiveDate = this.$refs.dateVal.getValue().spTime
                let approveNum = $.trim(this.$refs.approveNum.getValue().approveNum)
                let approvePerson = $.trim(this.$refs.approvePerson.getValue().approvePerson)
                let approveTime = this.$refs.approveTime.getValue().approveTime
                let timeRange = new Date(effectiveDate).getTime()
                let timeRangeMax = Date.now() + 30 * 24 * 60 * 60 * 1000;
                if (!effectiveDate) {
                    this.regExpMsg('有效日期没有录入，请检查后重新录入')
                    return
                } else if (timeRange > timeRangeMax) {
                    this.regExpMsg('有效期超出范围，请检查后重新录入')
                    return
                } else if (!this.greenChannel) {
                    if (approveNum === null || approveNum === '') {
                        this.regExpMsg('批准文号信息未录入，请检查后重新录入')
                        return
                    } else if (approvePerson === null || approvePerson === '') {
                        this.regExpMsg('批准人/单位信息未录入，请检查后重新录入')
                        return
                    } else if (approveTime === null || approveTime === '') {
                        this.regExpMsg('批准时间信息未录入，请检查后重新录入')
                        return
                    } else if (approveNum.length > 20) {
                        this.regExpMsg('批准文号信息录入错误(不超过20个字符)，请检查后重新录入')
                        return
                    } else if (approvePerson.length > 20) {
                        this.regExpMsg('批准人/单位信息录入错误(不超过20个字符)，请检查后重新录入')
                        return
                    }
                }
                this.approveObj.operator = this.userNick
                this.approveObj.name = name
                this.approveObj.expiryDate = effectiveDate
                this.approveObj.greenChannel = this.greenChannel
                // console.log(this.greenChannel)
                if (this.greenChannel) {
                    this.approveObj.fileNo = ''
                    this.approveObj.approvalUnit = ''
                    this.approveObj.approvalTime = ''
                } else {
                    this.approveObj.fileNo = approveNum
                    this.approveObj.approvalUnit = approvePerson
                    this.approveObj.approvalTime = approveTime
                }
                this.approve()
            },
            // 弹窗表单验证
            infoTest () {},
            // 弹窗表单验证弹出信息
            regExpMsg (msg) {
                this.$alert(msg, {
                    confirmButtonText: '确定'
                });
            },
            getLength (str) {
                let realLength = 0;
                for (let i = 0; i < str.length; i++) {
                    let charCode = str.charCodeAt(i);
                    if (charCode >= 0 && charCode <= 128) {
                        realLength += 1
                    } else {
                        realLength += 2
                    }
                }
                return realLength;
            },
            // 弹框关闭
            dialogChange (val) {
                this.queryInput = val;
                this.isDirectQuery = true
                this.confirmIsDisabled = false
                this.showConfirm = false
                this.greenChannel = 0
                this.checkOption.data[0].disabled = false
                this.checkOption.value = []
                this.queryData = {
                    // 号码类型
                    numType: '',
                    // 手机属地
                    phoneArea: '',
                    msisdn: '',
                    //  申请人
                    aplicant: '',
                    //  申请时间
                    applyTime: ''
                }
            },
            // 显示弹框
            showDialog () {
                this.approveTimeOpt.defaultVal = this.gTime
                this.textOptTime.defaultVal = this.gTime
                this.$nextTick(function () {
                    this.$refs.queryInfo.setItemData('numberType', this.numberType);
                    this.$refs.queryInfo.setItemData('areaType', this.areaType);
                })
            },
            // 根据查询条件中的号码类型生成不同类型的表格
            changeTableOpt () {
                let type = this.queryObj.numType;
                if (type === 1) {
                    this.curNumberName = '手机号'
                    this.tableOpt.column[1].name = 'IMSI'
                    this.tableOpt.column[1].value = 'imsi'
                    this.tableOpt.column[2].name = 'IMEI'
                    this.tableOpt.column[2].value = 'imei'
                } else if (type === 2) {
                    this.curNumberName = 'IMEI（机身码）'
                    this.tableOpt.column[1].name = '手机号'
                    this.tableOpt.column[1].value = 'num'
                    this.tableOpt.column[2].name = 'IMSI'
                    this.tableOpt.column[2].value = 'imsi'
                } else if (type === 3) {
                    this.curNumberName = 'IMSI（手机卡号）'
                    this.tableOpt.column[1].name = '手机号'
                    this.tableOpt.column[1].value = 'num'
                    this.tableOpt.column[2].name = 'IMEI'
                    this.tableOpt.column[2].value = 'imei'
                }
            },
            handleCurrentPageChange (val) {
                let curPageSize = this.tableOpt.pageOpt.pageSize;
                this.tableOpt.data = setTablePage(this.totalData, val, curPageSize);
            },
            handleSizePageChange (val) {
                this.tableOpt.pageOpt.currentPage = 1;
                this.tableOpt.pageOpt.pageSize = val;
                this.tableOpt.data = setTablePage(this.totalData, 1, val);
            }
        },
        components: {
            sysDialog,
            textComp,
            dateComp,
            checkboxComp,
            tableComp,
            formSelect
        }
    }
</script>

<style scoped lang="postcss">
    @component-namespace ga {
        @b quickImeiQuery {
            // width: calc(100% - 20px);
            // height: calc(100% - 10px);
            @e btn {
                margin-top: -10px;
            }
            @e pTitle{
                color:#eee;
                margin-bottom:12px;
                span{
                    color:#d4b32f;
                }
            }
            @e tableWarp{
                width:99%;
                margin: 0 auto;
            }
            @e select {
                z-index: 2;
                position: absolute;
                top: 2px;
                left: 70px;
                padding: 0;
                margin: 0;
            }
            @e numTypeSty {
                position: absolute;
                left: 250px;
                z-index: 1;
                height: 30px;
                line-height: 30px;
                color: red;
            }
            @e textSty {
                div:first-child {
                    text-align: right;
                }
                div:last-child{
                    text-align: left;
                }
            }
        }
        @b targetNumSingleQuery {
            width: 100%;
            height: calc(100% - 45px);
            // margin: 40px auto 0;
        }
    }
</style>
