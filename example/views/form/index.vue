<template>
    <div style = "width:100%;">
        <span class="demo-title"> Form 表单</span>
        <FormDemo :option="formOpt" ref="form" @formSlideChange="sliderChange"></FormDemo>
        <span class="demo-title"> 组件单独调用 </span>
        <el-row>
            <el-col :span="2">活动名称</el-col>
            <el-col :span="4"><textComp :option="textOpt"></textComp></el-col>
            <el-col :span="2">活动日期</el-col>
            <el-col :span="4"><dateComp :option="dateOpt"></dateComp></el-col>
            <el-col :span="2">活动名称</el-col>
            <el-col :span="4"><textComp :option="textOpt"></textComp></el-col>
            <el-col :span="6"><buttonComp :option="btnOpt"></buttonComp></el-col>
            <el-col :span="2">文本域测试</el-col>
            <el-col :span="8"><textComp :option="textareaOpt"></textComp></el-col>
        </el-row>
        <!-- <keyWordComp ref="kw"></keyWordComp> -->
    </div>
</template>
<script>
    import FormDemo from 'components/Form/index'
    import textComp from 'components/Form/text'
    import textNumberComp from 'components/Form/textNumber'
    import dateComp from 'components/Form/date'
    import selectComp from 'components/Form/select'
    import radioComp from 'components/Form/radio'
    import checkBoxComp from 'components/Form/checkbox'
    import switchComp from 'components/Form/switch'
    import buttonComp from 'components/Form/button'
    import keyWordComp from 'components/Form/keyWord'
    import moment from 'moment'
    import { getDictionary } from 'api/platform/dictionary'
    export default {
        name: 'formDemo',
        data () {
            let me = this;
            return {
                selectV1: '1',
                selectArr2: [],
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    canSlider: true,
                    // 不写，默认right
                    labelPos: 'right',
                    labelWidth: '150',
                    // 按钮位置，right 居右, 不写 默认紧跟
                    btnPos: 'right',
                    // 表单项
                    items: [{
                        label: '产品名称',
                        type: 'text',
                        required: true,
                        comOpt: {
                            id: 'yq1',
                            width: 200,
                            value: 'hello',
                            disabled: true
                        }
                    }, {
                        label: '产品名称',
                        type: 'textNumber',
                        wrap: true,
                        required: true,
                        comOpt: {
                            id: 'yq2',
                            value: 10,
                            width: 200,
                            disabled: false
                        }
                    }, {
                        label: '产品名称',
                        type: 'select',
                        comOpt: {
                            id: 'yq3',
                            value: '2',
                            width: 200,
                            disabled: false,
                            data: [{
                                name: 'opt1', value: '1'
                            }, {
                                name: 'opt2', value: '2'
                            }],
                            change: function (val) {
                                let arr = []
                                if (val === '1') {
                                    arr = [
                                        { name: '西瓜', value: '1' }
                                    ]
                                } else {
                                    arr = [
                                        { name: '苹果', value: '1' }
                                    ]
                                }
                                me.$refs.form.setItemData('select222', arr)
                            }

                        }
                    },
                    {
                        label: '测试级联下拉',
                        type: 'select',
                        comOpt: {
                            id: 'select222',
                            value: '2',
                            width: 200,
                            disabled: false,
                            data: me.selectArr2,
                            change: function () {
                            }

                        }
                    },
                    {
                        label: '产品列表',
                        type: 'select',
                        wrap: true,
                        comOpt: {
                            id: 'yq4',
                            value: ['1'],
                            width: 200,
                            disabled: false,
                            // 全部
                            isAll: true,
                            multiple: true,
                            data: [{
                                name: 'opt1', value: '1'
                            }, {
                                name: 'opt2', value: '2'
                            }],
                            change: function () {
                            }
                        }
                    }, {
                        label: '年月日时分秒',
                        type: 'date',
                        comOpt: {
                            id: 'yq5',
                            value: '2017-5-24 10:00:00',
                            disabled: false,
                            width: 200,
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
                    }, {
                        label: '年月日',
                        type: 'date',
                        wrap: true,
                        comOpt: {
                            id: 'yq6',
                            value: '',
                            width: 200,
                            disabled: false,
                            type: 'date'
                        }
                    }, {
                        label: '年月',
                        type: 'date',
                        comOpt: {
                            id: 'yq7',
                            value: '',
                            width: 200,
                            disabled: false,
                            type: 'month'
                        }
                    }, {
                        label: '年',
                        type: 'date',
                        wrap: true,
                        comOpt: {
                            id: 'yq8',
                            value: '',
                            width: 200,
                            disabled: false,
                            type: 'year'
                        }
                    }, {
                        label: '特殊资源',
                        type: 'radio',
                        comOpt: {
                            id: 'yq9',
                            value: '1',
                            disabled: false,
                            data: [{
                                name: 'opt1', value: '1'
                            }, {
                                name: 'opt2', value: '2'
                            }],
                            change: function () {
                            }
                        }
                    }, {
                        label: '活动性质',
                        type: 'checkbox',
                        wrap: true,
                        comOpt: {
                            id: 'yq10',
                            value: ['1', '2'],
                            disabled: false,
                            data: [{
                                name: 'opt1', value: '1'
                            }, {
                                name: 'opt2', value: '2'
                            }, {
                                name: 'opt3', value: '3'
                            }, {
                                name: 'opt4', value: '4'
                            }],
                            change: function () {
                            }
                        }
                    }, {
                        label: '即时配送',
                        type: 'switch',
                        comOpt: {
                            id: 'yq11',
                            value: true,
                            disabled: false,
                            text: '',
                            onText: '实时',
                            offText: '历史',
                            width: 100,
                            click: function (value) {
                                this.value = value;
                            }
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            // id: 'yq12',
                            value: '查询1',
                            disabled: false,
                            click: function () {
                                console.log(me.$refs.form.getValue());
                            }
                        }
                    }, {
                        label: '',
                        type: 'button',
                        wrap: true,
                        comOpt: {
                            // id: 'yq12',
                            value: '查询2',
                            disabled: false,
                            click: function () {
                                console.log(me.$refs.form.getValue());
                            }
                        }
                    },
                    {
                        label: '关键词',
                        type: 'keyWord',
                        comOpt: {
                            width: 200,
                            id: 'keyWordx'
                        }
                    }
                    ],
                    btns: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                // id: 'yq12',
                                value: '查询3',
                                disabled: false,
                                click: function () {
                                    let h = me.$refs.form.getContainerHeight()
                                    console.log(h)
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                // id: 'yq12',
                                value: '清空',
                                disabled: false,
                                click: function () {
                                    me.$refs.form.clearValue()
                                }
                            }
                        }
                    ]
                },
                textOpt: {
                    id: 'text1',
                    value: 'hello',
                    disabled: false
                },
                textareaOpt: {
                    id: 'textarea1',
                    iptType: 'textarea',
                    width: 500,
                    rows: 10
                },
                btnOpt: {
                    id: 'btn1',
                    value: '重置',
                    disabled: false,
                    click: function () {
                    }
                },
                dateOpt: {
                    id: 'btn2',
                    value: '',
                    disabled: false,
                    type: 'datetime'
                }
            }
        },
        created () {
        },
        mounted () {
            getDictionary('eventType').then(resp => {
                console.log(resp.data);
            })

            let h = this.$refs.form.getContainerHeight()
            console.log(h)
        },
        watch: {
        },
        components: {
            FormDemo,
            textComp,
            textNumberComp,
            dateComp,
            selectComp,
            radioComp,
            checkBoxComp,
            switchComp,
            buttonComp,
            keyWordComp
        },
        methods: {
            sliderChange (v) {
                console.log(v)
                console.log(this.$refs.form.getContainerHeight())
            }
        }
    }
</script>
<style>
    .demo-title{
        font-size:14px;
        line-height:26px;
        padding-left:10px;
        display: block;
        background: #ccc;
        margin: 10px;
    }
</style>
