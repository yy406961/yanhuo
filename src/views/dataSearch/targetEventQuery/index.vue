<template>
    <div width="100%" class="ga-targetEvent">
        <el-row :span="24">
            <el-col :span="24">
                <div class="ga-targetEvent__search">
                    <targetEventQueryFrom :option="formOpt" ref="form"></targetEventQueryFrom>
                </div>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="24">
                    <div>
                        {{options.msisdn || options.imei}}{{options.eventType | eTypetrans}}&nbsp;
                    </div>
                    <component :is="childrenComponents" :option="compHeight" ref="showCmponents" :style="width = compHeight + 'px'"></component>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import targetEventQueryFrom from 'components/Form/index'
    import callLoss from './callLoss.vue'
    import changeCardEvent from './changeCardEvent.vue'
    import switchEvent from './switchEvent.vue'
    import replacementEvent from './replacementEvent.vue'
    import { getDictionary } from 'api/platform/dictionary'
    import { mapGetters } from 'vuex'
    import { forbiddenDate } from 'utils'
    export default {
        name: 'targetMsgSeach',
        data () {
            const me = this;
            let yesterday = new Date().getTime() - 24 * 60 * 60 * 1000
            return {
//                向子组件传递的参数
                options: '',
                compHeight: '',
//                子组件名称
                childrenComponents: '',
//                标识码类型
                idCodeTypeData: '',
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    labelWidth: '80',
                    btnPos: 'right',
                    // 表单项
                    items: [
                        {
                            label: '事件类型',
                            type: 'select',
                            comOpt: {
                                id: 'eventType',
                                value: '',
                                disabled: false,
                                data: [],
                                change: function (event) {
                                    me.childrenComponents = event;
                                    if (event === 'changeCardEvent') {
                                        me.formOpt.items[1].label = '机身码';
                                        me.formOpt.items[1].comOpt.id = 'imei';
                                    } else {
                                        me.formOpt.items[1].label = '手机号';
                                        me.formOpt.items[1].comOpt.id = 'msisdn';
                                    }
                                    me.$refs.form.$refs.comp1.value = '';
                                    me.options = '';
                                }
                            }
                        },
                        {
                            label: '标识码',
                            type: 'text',
                            comOpt: {
                                id: 'symbleNum',
                                value: '',
                                disabled: false,
                                width: '180'
                            }
                        },
                        {
                            label: '开始时间',
                            type: 'date',
                            comOpt: {
                                id: 'queryStartTime',
                                value: yesterday,
                                disabled: false,
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate (time) {
                                        return forbiddenDate(time, yesterday);
                                    }
                                }
                            }
                        },
                        {
                            label: '结束时间',
                            type: 'date',
                            comOpt: {
                                id: 'queryEndTime',
                                value: yesterday,
                                disabled: false,
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate (time) {
                                        return forbiddenDate(time, yesterday);
                                    }
                                }
                            }
                        }
                    ],
                    btns: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                id: 'targetE6',
                                value: '查询',
                                disabled: false,
                                click: function () {
                                    me.options = me.$refs.form.getValue();
                                    if (me.options.eventType === 'callLoss') {
                                        me.options.eventType = '1';
                                    } else if (me.options.eventType === 'switchEvent') {
                                        me.options.eventType = '2';
                                    } else if (me.options.eventType === 'replacementEvent') {
                                        me.options.eventType = '3';
                                    } else if (me.options.eventType === 'changeCardEvent') {
                                        me.options.eventType = '4';
                                    }
                                    if (!me.options.eventType) {
                                        me.$alert('请选择事件类型', {
                                            confirmButtonText: '确定'
                                        });
                                    } else if (!me.$refs.form.$refs.comp1.value) {
                                        me.$alert('请输入号码', {
                                            confirmButtonText: '确定'
                                        });
                                    } else if (me.options.queryStartTime > me.options.queryEndTime) {
                                        me.$alert('请输入正确的起止时间', {
                                            confirmButtonText: '确定'
                                        });
                                    } else if (me.options.eventType) {
//                                    调用子组件的showcCmponents方法加载数据
                                        me.$refs.showCmponents.getList(me.options);
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        },
        methods: {
        },
        filters: {
            idTypeTrans (value) {
                if (value) {
                    switch (value) {
                        case '1' :
                            return '手机号'
                        case '2' :
                            return '机身码'
                        case '3' :
                            return '卡号'
                        default: break;
                    }
                }
            },
            eTypetrans (value) {
                if (value) {
                    switch (value) {
                        case '1' :
                            return '呼损事件'
                        case '2' :
                            return '开关机事件'
                        case '3' :
                            return '换机事件'
                        case '4' :
                            return '换卡事件'
                        default: break;
                    }
                }
            }
        },
        components: {
            targetEventQueryFrom,
            callLoss,
            changeCardEvent,
            switchEvent,
            replacementEvent
        },
        created () {
//            页面初始化，获取事件类型
            getDictionary('eventType').then(resp => {
                let { rows, status } = resp;
                if (resp && status === 200 && _.isArray(rows)) {
                    rows.forEach((item) => {
                        let { compKey, compValue } = item
                        item.value = compKey
                        item.name = compValue
                    });
                    rows.map(function (item) {
                        if (item.value === '1') {
                            item.value = 'callLoss';
                        } else if (item.value === '2') {
                            item.value = 'switchEvent'
                        } else if (item.value === '3') {
                            item.value = 'replacementEvent'
                        } else {
                            item.value = 'changeCardEvent'
                        }
                    });
                    this.$refs.form.setItemData('eventType', resp.rows);
                }
            })
        },
        mounted () {
            this.formHeight = this.$refs.form.getContainerHeight();
            this.compHeight = this.componentHeight;
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            componentHeight () {
                return {
                    height: this.vsHeight - this.formHeight - 70
                }
            }
        }
    }
</script>

<style scoped>
</style>
