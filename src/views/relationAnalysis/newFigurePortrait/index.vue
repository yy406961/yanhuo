<template lang="html">
    <div>
        <div class="ga-figurePortrait__select">
            <buttonComp :option='choice'></buttonComp>
        </div>
        <div class="ga-figurePortrait" ref="figurePortraitContent">
                <div class="ga-containerBorder__leftTop" style="z-index: -1"></div>
                <div class="ga-containerBorder__leftBot"></div>
                <div class="ga-containerBorder__rightTop"></div>
                <div class="ga-containerBorder__rightBot"></div>
            <!--tabs页签-->
            <p :class="['ga-figurePortrait__tabs', tabsDisable ? 'ga-figurePortrait__tabsDisable' : '']">
                <span v-for="item in tabsGroups" v-text="item.name" :class="['tabs' + item.value, {'active': item.value === 0}]"
                    @click="tabsChange(item.value)"></span>
            </p>
            <!-- <div class="ga-figurePortrait__tabs">
                <formSelect :option='btnGroup' ref="btnGroup"></formSelect>
            </div> -->
            <div class="ga-figurePortrait__content" :style="contentHeight">
                <!--基本信息-->
                <baseData :option="baseDataOpt" :renderData="baseDataObj" :showIndexChange="showIndexChange" v-show="showIndex === 0"></baseData>
                <!--关系人信息-->
                <related :option="activeAreaOpt" :renderData="relatedObj" v-show="showIndex === 1" :showIndexChange="showIndexChange"></related>
                <!--通联详情-->
                <!--<communication :option="baseDataOpt" :renderData="communicationObj" v-show="showIndex === 2"></communication>-->
                <!--app使用-->
                <appUse :option="baseDataOpt" :renderData="appUseObj" v-show="showIndex === 3" :showIndexChange="showIndexChange"></appUse>
                <!--上网情况-->
                <internetUse :option="baseDataOpt" :renderData="internetUseObj" v-show="showIndex === 4" :showIndexChange="showIndexChange"></internetUse>
                <!--app详情-->
                <!--<appDetail :option="baseDataOpt" :renderData="appDetailObj" v-show="showIndex === 5"></appDetail>-->
                <!--上网详情-->
                <!--<internetDetail :option="baseDataOpt" :renderData="internetDetailObj" v-show="showIndex === 6"></internetDetail>-->
                <!--工作居住地-->
                <homeWork :option="baseDataOpt" :renderData="homeWorkObj" v-show="showIndex === 7" :showIndexChange="showIndexChange" @change="disableChange"></homeWork>
                <!--活动区域-->
                <activeArea :renderData="activeAreaObj" v-show="showIndex === 8" :showIndexChange="showIndexChange" @change="disableChange"></activeArea>
                <!--账动信息-->
                <countMsg :option="baseDataOpt" :renderData="accountMsgObj" v-show="showIndex === 9"></countMsg>
                <!--生活短信-->
                <lifeMsg :option="baseDataOpt" :renderData="lifeMsgObj" v-show="showIndex === 10"></lifeMsg>
            </div>
            <sysDialog size="small"
                    :dialogVisible="selectShow"
                    title="目标选择"
                    :okFn="confirm"
                    @change="dialogChange"
                    @openCallback="dialogOpendCallback">
                <el-row style="margin-bottom: 5px">
                    <el-input style="width: 200px" placeholder="目标号码/用户名快查" v-model="quickContent" type="text"></el-input>
                </el-row>
                <el-row>
                    <popTable :option="tableOpt"
                            :comSize="{height: 320}"
                            ref="dialogTable"
                            @handleSelectionChange="handleSelectionChange">
                    </popTable>
                </el-row>
            </sysDialog>
        </div>
    </div>
</template>
<script>
    import homeWork from './config/residencePlace.vue'
    import internetUse from './config/internetUse.vue'
    import internetDetail from './config/internetDetail.vue'
    import countMsg from './config/countMsg.vue'
    import lifeMsg from './config/lifeMsg.vue'
    import popTable from 'components/Table/'
    import appUse from './config/appUse'
    import appDetail from './config/appDetail'
    import baseData from './config/baseData'
    import activeArea from './config/activeArea'
    import related from './config/related'
    import communication from './config/communication'
    import stability from './config/stability'
    import formSelect from 'components/Form'
    import buttonComp from 'components/Form/button'
    import sysDialog from 'components/common/dialog'
    import { mapGetters } from 'vuex'
    import { getImportantMsisdn } from 'api/relationAnalysis/newFigurePortrait/index'

    export default {
        name: 'figurePortrait',
        data () {
            let me = this;
            return {
                tabsDisable: false,
                quickContent: '',
                showIndexChange: null,
                maxSelect: 1,
                //  控制 选择重点人 弹框的显示
                selectShow: false,
                // 基本信息
                baseDataObj: null,
                //  关系人信息
                relatedObj: null,
                //  通联信息
                communicationObj: null,
                //  app详情
                appDetailObj: null,
                //  app使用
                appUseObj: null,
                //  活动区域
                activeAreaObj: null,
                //  上网使用
                internetUseObj: null,
                //  上网详情
                internetDetailObj: null,
                //  工作居住地
                homeWorkObj: null,
                //  账动信息
                accountMsgObj: null,
                //  生活短信
                lifeMsgObj: null,
                //  获取重点人 传给后台的对象值
                getImportantObj: {
                    owner: '',
                    approverStatus: 3
                },
                activeData: {},
                communicationData: {},
                tableData: [],
                // 所选号码
                checkedPhones: [],
                transferVal: [],
                showIndex: 0,
                btnGroupHeight: '',
                choice: {
                    value: '目标选择',
                    disabled: false,
                    // btnType: 'rightTop',
                    click: function () {
                        me.selectShow = true;
                    }
                },
                tabsGroups: [
                    { name: '基本信息', value: 0 },
                    { name: '关系人信息', value: 1 },
                    { name: 'APP使用', value: 3 },
                    { name: '上网情况', value: 4 },
                    { name: '工作居住地', value: 7 },
                    { name: '活动区域', value: 8 },
                    { name: '账动信息', value: 9 },
                    { name: '生活短信', value: 10 }
                ],
                btnGroup: {
                    inline: true,
                    items: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '基本信息',
                                disabled: false,
                                click: function () {
                                    me.showIndex = 0;
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '关系人信息',
                                disabled: false,
                                click: function () {
                                    me.showIndex = 1
                                }
                            }
                        },
//                        {
//                            label: '',
//                            type: 'button',
//                            comOpt: {
//                                value: '通联详情',
//                                disabled: false,
//                                click: function () {
//                                    me.showIndex = 2
//                                }
//                            }
//                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: 'APP使用',
                                disabled: false,
                                click: function () {
                                    me.showIndex = 3;
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '上网情况',
                                disabled: false,
                                click: function () {
                                    me.showIndex = 4;
                                }
                            }
                        },
//                        {
//                            label: '',
//                            type: 'button',
//                            comOpt: {
//                                value: 'APP详情',
//                                disabled: false,
//                                click: function () {
//                                    me.showIndex = 5;
//                                }
//                            }
//                        },
//                        {
//                            label: '',
//                            type: 'button',
//                            comOpt: {
//                                value: '上网详情',
//                                disabled: false,
//                                click: function () {
//                                    me.showIndex = 6;
//                                }
//                            }
//                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '工作居住地',
                                disabled: false,
                                click: function () {
                                    me.showIndex = 7;
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '活动区域',
                                disabled: false,
                                click: function () {
                                    me.showIndex = 8;
                                }
                            }
                        }
//                        {
//                            label: '',
//                            type: 'button',
//                            comOpt: {
//                                value: '账动信息',
//                                disabled: false,
//                                click: function () {
//                                    me.showIndex = 9;
//                                }
//                            }
//                        },
//                        {
//                            label: '',
//                            type: 'button',
//                            comOpt: {
//                                value: '生活短信',
//                                disabled: false,
//                                click: function () {
//                                    me.showIndex = 10;
//                                }
//                            }
//                        }
//                        {
//                            label: '',
//                            type: 'button',
//                            comOpt: {
//                                value: '区域活动',
//                                disabled: false,
//                                click: function () {
//                                    me.showIndex = 2
//                                }
//                            }
//                        }
                    ]
                },
                once: true,
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 70, align: 'center' },
                        { name: '用户名', value: 'name', align: 'center' },
                        { name: '手机号', value: 'msisdn', align: 'center' },
                        // { name: '卡号', value: 'imsi', width: 175, align: 'center' },
                        // { name: '机身码', value: 'imei', width: 175, align: 'center' },
                        { name: '选择', value: 'selection', align: 'center' }
                    ],
                    data: [],
                    // 是否分页
                    pagination: false,
                    pageOpt: {
                        total: 100,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                }
            }
        },
        created () {
            if (localStorage.getItem('taskId')) {
                this.getImportantObj.owner = localStorage.getItem('taskId')
            } else {
                this.getImportantObj.owner = this.userName
            }
//            this.getImportantPhone();
        },
        mounted () {
            this.btnGroupHeight = 67
            // this.btnGroupHeight = this.$refs.btnGroup.getContainerHeight();
        },
        props: ['gTime'],
        watch: {
            'quickContent' (val) {
                if (val.trim()) {
                    let arr = []
                    this.tableData.rows.forEach((item) => {
                        let { msisdn, name } = item
                        if (msisdn && msisdn.toString().includes(val)) {
                            arr.push(item);
                        }
                        if (name && name.toString().includes(val)) {
                            arr.push(item);
                        }
                    })
                    $.unique(arr)
                    if (arr.length) {
                        this.tableOpt.data = arr
                    } else {
                        this.tableOpt.data = []
                    }
                } else {
                    if (this.tableOpt.data) {
                        this.tableOpt.data = []
                    }
                }
                if (val.trim() === '') {
                    this.tableOpt.data = this.tableData.rows
                }
            },
            'showIndex' (val) {
                this.showIndexChange = val
                // this.tabsChange(val)
                if (!this.sendImportantData) return
                if (val === 1) {
                    this.relatedObj = this.sendImportantData
                } else if (val === 2) {
                    this.communicationObj = this.sendImportantData
                } else if (val === 3) {
                    this.appUseObj = this.sendImportantData
                } else if (val === 4) {
                    this.internetUseObj = this.sendImportantData
                } else if (val === 5) {
                    this.appDetailObj = this.sendImportantData
                } else if (val === 6) {
                    this.internetDetailObj = this.sendImportantData
                } else if (val === 7) {
                    this.homeWorkObj = this.sendImportantData
                } else if (val === 8) {
                    this.activeAreaObj = this.sendImportantData
                } else if (val === 9) {
                    this.accountMsgObj = this.sendImportantData
                } else if (val === 10) {
                    this.lifeMsgObj = this.sendImportantData
                }
            }
        },
        methods: {
            // 工作居住地/活动区域页签内容查询时，tabs切换禁用，查询结束后启用
            disableChange(val) {
                this.tabsDisable = val
                this.choice.items[0].comOpt.disabled = val
            },
            async getImportantPhone () {
                this.tableOpt.listLoading = true;
                this.tableOpt.emptyText = ' ';
                let tableData = await getImportantMsisdn(this.getImportantObj);
                if (tableData && tableData.rows && tableData.rows.length !== 0) {
                    this.tableData = tableData
                    this.tableOpt.data = this.tableData.rows;
                    if (this.tableOpt.data.length) {
                        this.tableOpt.listLoading = false;
                    } else {
                        setTimeout(() => {
                            this.tableOpt.listLoading = false;
                        }, 500)
                    }
                } else {
                    setTimeout(() => {
                        this.tableOpt.listLoading = false;
                        this.tableOpt.emptyText = '暂无数据';
                    }, 1500)
                }
            },
            dialogOpendCallback () {
                this.quickContent = ''
                this.getImportantPhone()
            },
            confirm () {
                if (this.checkedPhones.length === 0) {
                    this.$alert('请选择目标', {
                        confirmButtonText: '确定'
                    });
                    return
                } else if (this.checkedPhones.length > this.maxSelect) {
                    this.$alert('单次选取重点人不能超过' + this.maxSelect + '个', {
                        confirmButtonText: '确定'
                    });
                    return;
                }
                this.selectShow = false;
                let arr = []
                let gTime = sessionStorage.getItem('gTime')
                let nowYear = (new Date(gTime)).getFullYear();
                let beforeYear = nowYear - 1;
                let nowMonth = (new Date(gTime)).getMonth() - 0 + 1;
                for (let i = 0; i < 6; i++) {
                    let obj = {}
                    if (nowMonth - i > 0) {
                        let m = nowMonth - i
                        if (m < 10) {
                            m = `0${m}`
                        }
                        obj.name = nowYear + '-' + (m)
                        obj.value = nowYear + '-' + (m)
                        arr.push(obj)
                    } else {
                        let m = nowMonth - i + 12
                        if (m < 10) {
                            m = `0${m}`
                        }
                        obj.name = beforeYear + '-' + (m)
                        obj.value = beforeYear + '-' + (m)
                        arr.push(obj)
                    }
                }
                let phoneMds = this.$refs.dialogTable.phoneMap[this.checkedPhones[0].msisdn]
                let propPhone = this.isPhoneJM ? phoneMds : this.checkedPhones[0].msisdn
                let sendObj = {
                    msisdn: propPhone,
                    name: this.checkedPhones[0].name,
                    mark: this.checkedPhones[0].mark,
                    imsi: this.checkedPhones[0].imsi,
                    imei: this.checkedPhones[0].imei,
                    flagNames: this.checkedPhones[0].flagNames,
                    time: arr
                }
                this.baseDataObj = sendObj
                this.sendImportantData = sendObj
                this.showIndex = 0;
                this.tabsDisable = false
                this.tabsChange(this.showIndex)
            },
            dialogChange (val) {
                this.selectShow = val;
            },
            renderFunc (h, option) {
                return <span>{ option.key } - { option.label }</span>;
            },
            filterMethod (query, item) {
                return item.label.indexOf(query) > -1;
            },
            //  表格多选的方法
            handleSelect (val) {
                this.checkedPhones = [];
                for (let i = 0; i < val.length; i++) {
                    this.checkedPhones.push(val[i])
                }
                // if (this.transferVal.length > this.maxSelect) {
                //     this.$alert('单次选取重点人不能超过' + this.maxSelect + '个', {
                //         confirmButtonText: '确定'
                //     });
                //     this.transferVal.length = this.maxSelect;
                // }
                // let orgData = this.tableData.data;
                // for (let j = 0; j < this.transferVal.length; j++) {
                //     this.checkedPhones.push(orgData[this.transferVal[j] - 1])
                // }
            },
            handleSelectionChange (val) {
                this.checkedPhones = [];
                // if (val.length > this.maxSelect) {
                //     this.$message({
                //         type: 'warning',
                //         message: '最多选择' + this.maxSelect + '个重点人'
                //     });
                //     val.splice(this.maxSelect)
                // }
                for (let i = 0; i < val.length; i++) {
                    this.checkedPhones.push(val[i])
                }
            },
            tabsChange(index) {
                if (!this.tabsDisable) {
                    this.showIndex = index
                    $('.ga-figurePortrait__tabs span').removeClass('active')
                    $('.tabs' + index).addClass('active')
                }
            }
        },
        computed: {
            contentHeight () {
                return {
                    height: this.vsHeight - 45 - 36 + 'px'
                }
            },
            baseDataOpt () {
                return {
                    height: this.vsHeight - this.btnGroupHeight - 200
                }
            },
            activeAreaOpt () {
                return {
                    height: this.vsHeight - this.btnGroupHeight
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'userName': 'global/userName',
                'isPhoneJM': 'global/isPhoneJM'
            })
        },
        components: {
            homeWork,
            internetUse,
            internetDetail,
            lifeMsg,
            countMsg,
            popTable,
            formSelect,
            buttonComp,
            appUse,
            appDetail,
            baseData,
            related,
            communication,
            stability,
            activeArea,
            sysDialog
        }
    }
</script>

<style lang="postcss" scoped>
    @component-namespace ga {
        @b figurePortrait {
            position: relative;
            width: 100%;
            height: calc(100% - 45px);
            margin: auto;
            border: 1px solid rgba(60,164,255,1);
            @e select {
                /* position: absolute; */
                /* top: 0px; */
                margin-bottom: 5px;
            }
            @e tabs {
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #A2EEFF;
                height: 36px;
                background: rgba(27,117,184,0.20);
                box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.10);
                span{
                    display:inline-block;
                    width:100px;
                    height:36px;
                    line-height:36px;
                    margin-right:4px;
                    text-align: center;
                    cursor: pointer;
                    border-bottom:none;
                }
            }
            @e tabsDisable {
                span{
                    color: #bfcbd9;
                    cursor: not-allowed;
                }
            }
            @e content {
                width: calc(100% - 10px);
                margin: auto;
                /* border: 1px solid rgba(60,164,255,1); */
                padding: 5px;
                overflow: hidden;
            }
        }
    }
    .ga-figurePortrait__tabs .active{
        color: #00FFBF;
    }
</style>
