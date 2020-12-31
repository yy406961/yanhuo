<template>
    <div class="ga-quickQuery">
        <div class="ga-layout__bodyTitle">
            <span class="ga-layout__titleTopLeft"></span>
            <span class="ga-layout__titleLeft"></span>
            <span class="ga-layout__titleCenter">{{ title }}</span>
            <span class="ga-layout__titleRight"></span>
            <span class="ga-layout__titleRightLeft"></span>
        </div>
        <formSelect class="ga-quickQuery__btn" :option='queryOpt'></formSelect>
        <selectComp v-if="showSelcet" class="ga-quickQuery__select unOpacity" ref="selectFun" :option="selectFunOpt"></selectComp>
        <div class="ga-quickQuery__numTypeSty">
            <span v-if="numTypeShow && baseData.type !== 1">{{ numTypeArr[baseData.numType - 1] }}{{ baseData.msisdn }}</span>
            <span v-if="numTypeShow && baseData.type === 1">{{ numTypeArr[baseData.numType - 1] }}{{ msisdnShow }}</span>
        </div>
        <div v-if="!showFunPage" id="map"></div>
        <realTimeSearch :baseData="baseData" style="width: 100%;height: 100%;position: absolute" v-if="showFunPage && queryStatus === 1"></realTimeSearch>
        <historySearch :isQuickQuery="isQuickQuery" :baseData="baseData"
                       style="width: calc(100% + 40px);height: 100%;position: absolute;left: -20px;top: 45px;"
                       v-if="showFunPage && queryStatus === 2"></historySearch>
        <targetNumSingleQuery :baseData="baseData" class="ga-targetNumSingleQuery" v-if="queryStatus === 3"></targetNumSingleQuery>
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
                        <el-row class="ga-quickQuery__textSty">
                            <el-col :span="11">号码类型：</el-col>
                            <el-col :span="13">{{ queryData.numType }}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="4">
                        <el-row class="ga-quickQuery__textSty">
                            <el-col :span="11">手机属地：</el-col>
                            <el-col :span="13">{{ queryData.phoneArea }}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="4">
                        <el-row class="ga-quickQuery__textSty">
                            <el-col :span="11">目标号码：</el-col>
                            <el-col :span="13">{{ queryData.msisdn }}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="5">
                        <el-row class="ga-quickQuery__textSty">
                            <el-col :span="11">目标姓名：</el-col>
                            <el-col :span="13">
                                <textComp ref="nameVal" :option="textOptName"></textComp>
                                <!--<span style="right: -33px" class='yq-form__required'>*</span>-->
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="5">
                        <el-row class="ga-quickQuery__textSty">
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
                        <el-row class="ga-quickQuery__textSty">
                            <el-col :span="11">申请人：</el-col>
                            <el-col :span="13">{{ queryData.applicant }}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="6">
                        <el-row class="ga-quickQuery__textSty">
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
                        <el-row class="ga-quickQuery__textSty">
                            <el-col :span="11">批准文号：</el-col>
                            <el-col :span="13">
                                <textComp ref="approveNum" :option="approveNumOpt"></textComp>
                                <!--<span style="right: -22px" class='yq-form__required'>*</span>-->
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col v-show="!greenChannel" :span="6">
                        <el-row class="ga-quickQuery__textSty">
                            <el-col :span="11">批准人/单位：</el-col>
                            <el-col :span="13">
                                <textComp ref="approvePerson" :option="approvePersonOpt"></textComp>
                                <span style="right: -22px" class='yq-form__required'>*</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col v-show="!greenChannel" :span="6">
                        <el-row class="ga-quickQuery__textSty">
                            <el-col :span="11">批准时间：</el-col>
                            <el-col :span="13">
                                <dateComp ref="approveTime" :option="approveTimeOpt"></dateComp>
                                <span style="right: -22px" class='yq-form__required'>*</span>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <!--第四行-->
                <el-row style="margin-top: 20px">
                    <el-col :offset="1" :span="2">查询原因：</el-col>
                    <el-col :span="20">
                        <el-row class="ga-quickQuery__textSty">
                            <textComp ref="queryReason" :option="queryReasonOpt"></textComp>
                            <span style="right: -22px" class='yq-form__required'>*</span>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </sysDialog>
    </div>
</template>

<script>
    import sysDialog from 'components/common/dialog'
    import BMap from 'BMap'
    import { mapGetters } from 'vuex'
    import formSelect from 'components/Form'
    import textComp from 'components/Form/text'
    import dateComp from 'components/Form/date'
    import selectComp from 'components/Form/select'
    import checkboxComp from 'components/Form/checkbox'
    import realTimeSearch from './realTimeSearch.vue'
    import historySearch from 'views/wholeNetAnalysis/AllNetCommons/historySearch.vue'
    import targetNumSingleQuery from './targetNumSingleQuery.vue'
    import { queryInterface, approveInterface } from 'api/quickQuery/quickQueryPage'
    import { forbiddenDate, getIntervalDate } from 'utils'
    export default {
        data () {
            let me = this
//            let day = new Date(this.gTime).getTime()
//            let maxDay = new Date(this.gTime).getTime() + 30 * 24 * 60 * 60 * 1000
            return {
                day: '',
                // maxDay: '',
                // limit: 31,
                ifExist: '',
                dataCopy: {},
                title: this.$route.name,
                map: null,
                zoom: 5,
                numTypeShow: false,
                showSelcet: false,
                isQuickQuery: false,
                queryInput: false,
                greenChannel: 0,
                showConfirm: false,
                confirmIsDisabled: false,
                showFunPage: false,
                queryStatus: 0,
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
                numTypeArr: ['手机号码：', 'IMEI：', 'IMSI：'],
                msisdnShow: '',
                baseData: {
                    type: '',
                    time: me.gTime,
                    numType: '',
                    name: '',
                    msisdn: '',
                    owner: me.owner
                },
                targetNumType: '',
                // 功能类型
                selectFunOpt: {
                    id: '',
                    value: 1,
                    width: 160,
                    data: [],
                    change: function (val) {
                        me.queryStatus = val
                        if (val === 2) {
                            me.isQuickQuery = true
                        } else {
                            me.isQuickQuery = false
                        }
                        me.showFunPage = true
                    }
                },
                // FIXME 需和后端碰接口字段
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
                    mark: 1
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
                    // 查询原因
                    reason: '',
                    // 用于后台区分快捷查询或机身码查询 1：快捷查询，2：机身码查询
                    mark: 1
                },
                checkOption: {
                    id: 'green',
                    value: [],
                    data: [{
                        name: '绿色通道', value: 1, disabled: false
                    }],
                    change: function (val) {
                        if (val.length) {
                            me.greenChannel = 1
                            let day = getIntervalDate(-3)
                            me.$refs.dateVal.setValue(day)
                            me.textOptTime.disabled = true
                        } else {
                            me.greenChannel = 0
                            let Day = getIntervalDate(-30)
                            me.$refs.dateVal.setValue(Day)
                            me.textOptTime.disabled = false
                        }
                    }
                },
                // 功能类型数值
                funArr: [
                    {
                        name: '省内最新位置查询',
                        value: 1
                    },
                    {
                        name: '省内历史轨迹查询',
                        value: 2
                    },
                    {
                        name: '目标号码话单查询',
                        value: 3
                    }
                ],
                // 查询录入 号码类型
                numberType: [
                    {
                        name: '手机号码',
                        value: 1
                    }
                    // ,
                    // {
                    //     name: 'IMEI（手机机身码）',
                    //     value: 2
                    // },
                    // {
                    //     name: 'IMSI（SIM卡号）',
                    //     value: 3
                    // }
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
                textOptName: {
                    id: 'spName',
                    width: 150,
                    value: '',
                    placeholder: ' '
                },
                textOptTime: {
                    id: 'spTime',
                    type: 'date',
                    width: 165,
                    disabled: false,
                    value: getIntervalDate(-30),
                    defaultVal: '',
                    pickOptions: {
                        disabledDate (time) {
                            let maxDay = getIntervalDate(-30)
                            return forbiddenDate(time, maxDay, 30)
                        }
                    }
                },
                approveNumOpt: {
                    id: 'approveNum',
                    type: 'text',
                    width: 165,
                    value: '',
                    placeholder: ' '
                },
                approvePersonOpt: {
                    id: 'approvePerson',
                    type: 'text',
                    width: 165,
                    value: '',
                    placeholder: ' '
                },
                approveTimeOpt: {
                    id: 'approveTime',
                    type: 'datetimeMinute',
                    width: 165,
                    required: true,
                    value: '',
                    defaultVal: '',
                    pickOptions: {
                        disabledDate (time) {
                            return forbiddenDate(time, me.day)
                        }
                    }
                },
                queryReasonOpt: {
                    id: 'queryReason',
                    type: 'text',
                    // width: 165,
                    value: '',
                    placeholder: ' '
                },
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
                                        me.$nextTick(() => {
                                            me.$refs.queryInfo.setItemData('areaType', me.areaType);
                                        })
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
                                placeholder: '目标号码'
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
                }
            }
        },
        // props: ['gTime'],
        created () {
            // 判断是否来自 任务 初加载  （以前有功能 来说）
            // this.isFromTask = this.owner.substring(0, 1) === 'T'
            if (localStorage.getItem('taskStatus')) {
                if (+localStorage.getItem('taskStatus') !== 1) {
                    this.queryOpt.items[0].comOpt.disabled = true
                }
            }
        },
        mounted () {
            this.createMap()
            this.selectFunOpt.data = this.funArr
        },
        destroyed () {
            this.map = null;
        },
        watch: {
        },
        computed: {
            ...mapGetters({
                'mapCenter': 'global/globalKeys',
                'userNick': 'global/userNick',
                owner: 'global/userName'
            }),
            gTime () {
                return sessionStorage.gTime;
            }
        },
        methods: {
            // 查询 TODO 返回状态不同 显示不同
            async query () {
                let {
                    numberType: numType, areaType: ispCode, msisdn: msisdn, name: applicant
                } = this.$refs.queryInfo.getValue()
                msisdn = $.trim(msisdn)
                applicant = $.trim(applicant)
                let phoneNumRegExp = /^1[3,4,5,6,7,8,9]\d{9}$/;
                let abroadPhoneNumRegExp = /^[0-9]{6,15}$/;
                // let imeiRegExp = /^[0-9]{15}$/;
                let imeiRegExp = /^([a-zA-Z]|\d){14,15}$/;
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
                    if (+data.numType === 1) {
                        if (+data.ispCode === 1) {
                            this.targetNumType = 1
                            this.msisdnShow = data.msisdn
                            if (data.msisdn && (data.msisdn.toString().substr(0, 2) === '86')) {
                                this.msisdnShow = data.msisdn.toString().substr(2)
                            }
                        } else if (+data.ispCode === 2) {
                            this.targetNumType = 2
                        }
                    } else if (+data.numType === 2) {
                        this.targetNumType = 3
                    } else if (+data.numType === 3) {
                        this.targetNumType = 4
                    }
                    this.checkOption.data[0].disabled = false
                    if (+data.ifExist === 1) {
                        // 已经审批 且在日期内 符合条件 直接查询
                        this.queryInput = false
                        this.showSelcet = true
                        this.showFunPage = true
                        this.numTypeShow = true
                        this.queryStatus = 1
                        this.$nextTick(() => {
                            this.$refs.selectFun.setValue(1)
                        })
                        this.baseData = {
                            type: this.targetNumType,
                            time: this.gTime,
                            numType: +data.numType,
                            msisdn: data.msisdn,
                            name: data.name,
                            owner: this.owner
                        }
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
                    this.showSelcet = true
                    this.showFunPage = true
                    this.numTypeShow = true
                    this.queryStatus = 1
                    this.$nextTick(() => {
                        this.$refs.selectFun.setValue(1)
                    })
                    this.baseData = {
                        type: this.targetNumType,
                        time: this.gTime,
                        numType: +this.dataCopy.numType,
                        msisdn: this.dataCopy.msisdn,
                        name: this.dataCopy.name,
                        owner: this.owner
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
                }
            },
            // 审批
            confirm () {
//                let nameRegExp = /^[\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z]+$/
                let name = $.trim(this.$refs.nameVal.getValue().spName)
                let effectiveDate = this.$refs.dateVal.getValue().spTime
                let approveNum = $.trim(this.$refs.approveNum.getValue().approveNum)
                let approvePerson = $.trim(this.$refs.approvePerson.getValue().approvePerson)
                let approveTime = this.$refs.approveTime.getValue().approveTime
                let queryReason = $.trim(this.$refs.queryReason.getValue().queryReason)
                // let timeRange = new Date(effectiveDate).getTime()
                // let timeRangeMax = Date.now() + 30 * 24 * 60 * 60 * 1000;
                // let timeRangeMin = Date.now();
                if (!effectiveDate) {
                    this.regExpMsg('有效日期没有录入，请检查后重新录入')
                    return
                }
                // else if (timeRange > timeRangeMax) {
                //     this.regExpMsg('有效期超出范围，请检查后重新录入')
                //     return
                // } else
                if (!this.greenChannel) {
                    // if (approveNum === null || approveNum === '') {
                    //     this.regExpMsg('批准文号信息未录入，请检查后重新录入')
                    //     return
                    // } else
                    if (approvePerson === null || approvePerson === '') {
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
                if (queryReason === null || queryReason === '') {
                    this.regExpMsg('查询原因未录入，请检查后重新录入')
                    return
                }
                this.approveObj.expiryDate = effectiveDate
                this.approveObj.operator = this.userNick
                this.approveObj.name = name
                this.approveObj.reason = queryReason
                this.approveObj.greenChannel = this.greenChannel
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
            //  右侧 折叠 按钮
            rightToggleShow () {
                let tab = $('.ga-mainContent__right');
                this.isRightToggle = !this.isRightToggle;
                if (tab.height() > 50) {
                    tab.animate({
                        'height': '28px'
                    });
                    this.locationTableOpt.listLoading = false
                } else {
                    tab.animate({
                        'height': '470px'
                    });
                    if (!this.locationTableOpt.data.length) {
                        this.locationTableOpt.listLoading = true
                    }
                }
            },
            // 创建地图
            createMap () {
                let map = new BMap.Map('map', { minZoom: 3, maxZoom: 18 })
                this.map = map
                this.zoom = 10
                let point = new BMap.Point(this.mapCenter.gMapCenter[0], this.mapCenter.gMapCenter[1])
                map.centerAndZoom(point, this.zoom)
                map.enableScrollWheelZoom();
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
                this.day = new Date(this.gTime).getTime()
                // this.maxDay = new Date(this.gTime).getTime() + 30 * 24 * 60 * 60 * 1000
                this.$nextTick(function () {
                    this.$refs.queryInfo.setItemData('numberType', this.numberType);
                    this.$refs.queryInfo.setItemData('areaType', this.areaType);
                })
            }
        },
        components: {
            sysDialog,
            textComp,
            dateComp,
            selectComp,
            checkboxComp,
            targetNumSingleQuery,
            realTimeSearch,
            historySearch,
            formSelect
        }
    }
</script>

<style scoped lang="postcss">
    #map {
        width: calc(100% + 40px);
        height: 100%;
        position: absolute;
        left: -20px;
        top: -10px;
    }
    @component-namespace ga {
        @b quickQuery {
            width: calc(100% - 32px);
            height: 100%;
            position: absolute;
            /*top: 6px;*/
            /*left: 18px;*/
            @e btn {
                position: absolute;
                top: 45px;
                left: 4px;
                padding: 0;
                margin: 0;
            }
            @e select {
                z-index: 2;
                position: absolute;
                top: 56px;
                left: 70px;
                padding: 0;
                margin: 0;
            }
            @e numTypeSty {
                position: absolute;
                top: 56px;
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
            width: calc(100% - 20px);
            height: calc(100% - 45px);
            margin-top: 45px;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
