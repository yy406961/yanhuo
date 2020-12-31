<template lang="html">
    <div style="width: 100%;height:100%;">
        <div class="ga-figurePortrait__select">
            <formSelect :option='choice'></formSelect>
        </div>
        <div class="ga-figurePortrait__tabs">
            <!--tabs页签-->
            <formSelect :option='btnGroup' ref="btnGroup"></formSelect>
        </div>
        <sysDialog size="small"
                   :dialogVisible="selectShow"
                   title="目标选择"
                   :okFn="confirm"
                   @change="dialogChange">
            <!--目标选择穿梭框-->
            <el-transfer
                class="history-transfer"
                v-model="transferVal"
                filterable
                :filter-method="filterMethod"
                :render-content="renderFunc"
                :titles="['目标号码', '已选目标']"
                @change="handleChange"
                :data="transferData">
            </el-transfer>
        </sysDialog>
        <baseData :option="baseDataOpt" :renderData="sendImportantObj" :showIndexChange="showIndexChange" v-show="showIndex === 0"></baseData>
        <communication :option="activeAreaOpt" :renderData="communicationData" v-show="showIndex === 1"></communication>
        <activeArea :renderData="activeData" v-show="showIndex === 2" :showIndexChange="showIndexChange"></activeArea>
        <stability :option="activeAreaOpt" :renderData="szObj" v-show="showIndex === 3"></stability>
        <stability :option="activeAreaOpt" :renderData="sjObj"v-show="showIndex === 4"></stability>
    </div>
</template>
<script>
    import baseData from './config/baseData'
    import activeArea from './config/activeArea'
    import communication from './config/communication'
    import stability from './config/stability'
    import formSelect from 'components/Form'
    import sysDialog from 'components/common/dialog'
    import { mapGetters } from 'vuex'
    import { getImportantMsisdn } from 'api/relationAnalysis/figurePortrait/index'

    export default {
        name: 'figurePortrait',
        data () {
            let me = this;
            return {
                showIndexChange: null,
                maxSelect: 1,
                //  给baseData发送的 所选重点人数据
                sendImportantObj: null,
                //  控制 选择重点人 弹框的显示
                selectShow: false,
                //  获取重点人 传给后台的对象值
                getImportantObj: {
                    owner: '',
                    approverStatus: 3
                },
                //  sjsz
                szObj: {
                },
                sjObj: {
                },
                activeData: {},
                communicationData: {},
                tableData: [],
                //  穿梭框 所选定的
                checkedPhones: [],
                //  穿梭框
                transferData: [],
                transferVal: [],
                showIndex: 0,
                btnGroupHeight: '',
                choice: {
                    items: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '目标选择',
                                disabled: false,
                                btnType: 'rightTop',
                                click: function () {
                                    me.selectShow = true;
                                }
                            }
                        }
                    ]
                },
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
                                value: '通联信息',
                                disabled: false,
                                click: function () {
                                    me.showIndex = 1
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '区域活动',
                                disabled: false,
                                click: function () {
                                    me.showIndex = 2
                                }
                            }
                        }
                    ]
                }
            }
        },
        created () {
            if (localStorage.getItem('taskId')) {
                this.getImportantObj.owner = localStorage.getItem('taskId')
            } else {
                this.getImportantObj.owner = this.userName
            }
            this.getImportantPhone();
        },
        mounted () {
            this.btnGroupHeight = this.$refs.btnGroup.getContainerHeight();
        },
        watch: {
            'showIndex' (val) {
                this.showIndexChange = val
                if (!this.sendImportantObj) return
                if (val === 1) {
                    this.communicationData = this.sendImportantObj
                } else if (val === 2) {
//                    this.activeData = null
                    setTimeout(() => {
                        this.activeData = this.sendImportantObj
                    }, 100)
                } else if (val === 3) {
                    this.szObj = {
                        msisdn: this.sendImportantObj.msisdn,
                        type: 0
                    }
                } else if (val === 4) {
                    this.sjObj = {
                        msisdn: this.sendImportantObj.msisdn,
                        type: 1
                    }
                }
            }
        },
        methods: {
            async getImportantPhone () {
                this.tableData = await getImportantMsisdn(this.getImportantObj);
                let data = [];
                if (this.tableData.data) {
                    this.tableData.data.forEach((item, index) => {
                        data.push({
                            label: `${item.name} - ${item.msisdn}`,
                            key: index + 1
                        })
                    });
                }
                this.transferData = data;
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
                this.btnGroup.items = [];
                let me = this;
                this.btnGroup.items.push(
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '基本信息',
                            disabled: false,
                            click: function () {
                                me.showIndex = 0
                            }
                        }
                    },
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '通联信息',
                            disabled: false,
                            click: function () {
                                me.showIndex = 1
                            }
                        }
                    },
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '区域活动',
                            disabled: false,
                            click: function () {
                                me.showIndex = 2
                            }
                        }
                    }
                );
                let sendObj = {
                    msisdn: this.checkedPhones[0].msisdn,
                    name: this.checkedPhones[0].name,
                    type: this.checkedPhones[0].type - 0
                }
                this.sendImportantObj = sendObj
                this.showIndex = 0;
                if (sendObj.type === 0) {
                    this.btnGroup.items.splice(2, 0, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '涉藏',
                            disabled: false,
                            click: function () {
                                me.showIndex = 3
                            }
                        }
                    })
                } else if (sendObj.type === 1) {
                    this.btnGroup.items.splice(2, 0, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '涉疆',
                            disabled: false,
                            click: function () {
                                me.showIndex = 4
                            }
                        }
                    })
                } else if (sendObj.type === 3) {
                    this.btnGroup.items.splice(2, 0, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '涉藏',
                            disabled: false,
                            click: function () {
                                me.showIndex = 3
                            }
                        }
                    })
                    this.btnGroup.items.splice(2, 0, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '涉疆',
                            disabled: false,
                            click: function () {
                                me.showIndex = 4
                            }
                        }
                    })
                }
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
            //  穿梭框的方法
            handleChange () {
                this.checkedPhones = [];
                if (this.transferVal.length > this.maxSelect) {
                    this.$alert('单次选取重点人不能超过' + this.maxSelect + '个', {
                        confirmButtonText: '确定'
                    });
                    this.transferVal.length = this.maxSelect;
                }
                let orgData = this.tableData.data;
                for (let j = 0; j < this.transferVal.length; j++) {
                    this.checkedPhones.push(orgData[this.transferVal[j] - 1])
                }
            }
        },
        computed: {
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
                'userName': 'global/userName'
            })
        },
        components: {
            formSelect,
            baseData,
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
            @e select {
                position: absolute;
                top: 0px;
            }
            @e tabs {
                margin-top: -10px;
                margin-bottom: -5px;
                color: red;
                height: 50px;
            }
        }
    }
</style>
