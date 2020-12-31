<template>
    <div class="ga-areaCondition">
        <FormComp :option="formObj" ref="form"></FormComp>
    </div>
</template>
<script>
import FormComp from 'components/Form/index'
import { ajax } from 'common'
import { mapGetters } from 'vuex'
export default {
    name: 'areaCondition',
    data() {
        let me = this
        return {
            formOpt: {},
            formObj: {
                inline: true,
                labelPos: 'right',
                labelWidth: '120',
                btnPos: 'right',
                items: [
                    {
                        label: '省编码',
                        type: 'text',
                        // required: true,
                        wrap: true,
                        comOpt: {
                            id: 'province',
                            width: 400,
                            required: true,
                            value: ''
                        }
                    },
                    {
                        label: '省名称',
                        type: 'text',
                        // required: true,
                        wrap: true,
                        comOpt: {
                            id: 'provinceName',
                            width: 400,
                            required: true,
                            value: ''
                        }
                    },
                    {
                        label: '城市编码',
                        type: 'text',
                        // required: true,
                        wrap: true,
                        comOpt: {
                            id: 'city',
                            width: 400,
                            required: true,
                            value: ''
                        }
                    },
                    {
                        label: '区域名称',
                        type: 'text',
                        // required: true,
                        wrap: true,
                        comOpt: {
                            id: 'areaName',
                            width: 400,
                            required: true,
                            value: ''
                        }
                    },
                    {
                        label: '区域类型',
                        type: 'select',
                        // required: true,
                        wrap: true,
                        comOpt: {
                            id: 'type',
                            data: [
                                { name: '景区', value: 1 },
                                { name: '交通枢纽', value: 2 },
                                { name: '其他', value: 3 }
                            ],
                            width: 400,
                            required: true,
                            value: 1
                        }
                    },
                    {
                        label: '经纬度字符串',
                        type: 'text',
                        wrap: true,
                        comOpt: {
                            id: 'coordinates',
                            iptType: 'textarea',
                            width: 400,
                            rows: 6
                        }
                    },
                    {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '提交',
                            disabled: false,
                            click () {
                                me.submitClick()
                            }
                        }
                    }
                ]
                // btns: [{
                //     label: '',
                //     type: 'button',
                //     comOpt: {
                //         value: '提交',
                //         disabled: false,
                //         click () {
                //             me.submitClick()
                //         }
                //     }
                // }]
            }
        }
    },
    created() {
    },
    computed: {
        ...mapGetters({
            visualHeight: 'global/visualHeight'
        })
    },
    mounted() {
    },
    methods: {
        submitClick() {
            let obj = this.$refs.form.getValue()
            let { province, provinceName, city, coordinates, areaName, type } = obj
            this.formOpt = {
                province,
                provinceName,
                city,
                areaName,
                type,
                coordinates
            }
            ajax.post('/keyArea/getAreaCells', this.formOpt).then(resp => {
                console.log('提交成功！', resp)
            })
            .catch(err => {
                console.log('/keyArea/getAreaCells', err)
            })
        }
    },
    components: {
        FormComp
    }
}
</script>
<style scoped>
@component-namespace ga {
    @b areaCondition {
        height:100%;
        font-size: 14px;
        overflow: hidden;
        padding-top: 20px;
        width: 600px;
        margin: 20px auto;
        text-align: center;
    }
}
</style>