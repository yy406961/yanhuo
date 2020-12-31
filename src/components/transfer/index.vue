<template>
    <!--目标选择穿梭框-->
    <el-transfer
        v-model="value"
        filterable
        :filter-method="filterMethod"
        :render-content="renderFunc"
        :titles="option.titles || titles"
        :right-default-checked = "value"
        @change="handleChange"
        :data="option.data">
        <span v-if="option.spanBool" style="margin-left: 30px" slot="left-footer">搜索结果：{{filterArrLengthLeft}} 项</span>
        <span v-if="option.spanBool" style="margin-left: 30px" slot="right-footer">搜索结果：{{filterArrLengthRight}} 项</span>
    </el-transfer>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { phoneNumChange } from 'utils/index'
    export default {
        props: ['option'],
        data () {
            return {
                titles: ['目标', '已选'],
                value: [],
                filterArrLengthLeft: 0,
                filterArrLengthRight: 0
            }
        },
        computed: {
            ...mapGetters({
                isPhoneJM: 'global/isPhoneJM'
            })
        },
        methods: {
            // 穿梭框的方法
            handleChange () {
                if (this.option.handleChange && _.isFunction(this.option.handleChange)) {
                    this.option.handleChange(this.value);
                }
            },
            renderFunc (h, option) {
                // let label = '';
                // for (let k in option) {
                //     if (k !== 'key') {
                //         label += ' - ' + option[k]
                //     }
                // }
                let phone = this.isPhoneJM ? phoneNumChange(option.msisdn) : option.msisdn
                option.label = `${option.name} - ${phone}`
                return <span> { option.label }</span>;
                // return <span> { option.key } - { option.name } - { option.label }</span>;
            },
            filterMethod (query, item) {
                if (this.option.spanBool) {
                    this.$nextTick(() => {
                        this.filterArrLengthLeft = $('.el-transfer-panel:first .el-transfer-panel__item').length
                    })
                    this.$nextTick(() => {
                        this.filterArrLengthRight = $('.el-transfer-panel:last .el-transfer-panel__item').length
                    })
                }
                return item.label.indexOf(query) > -1;
            },
            clearValue() {
                this.value = []
            }
        }
    }
</script>


