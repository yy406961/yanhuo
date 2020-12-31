<template>
    <el-button v-if="option.popover"
        :type = "option.btnType ? option.btnType : 'primary'"
        :size= "option.btnSize ? option.btnSize : ''"
        v-popover:option.popover
        :disabled="option.disabled"
        @click.native="clickHandler">{{option.value.replace(/^(\W{1})(\W{1})$/, '$1 $2')}}</el-button>
    <el-button v-else
        :type="option.btnType ? option.btnType : 'primary'"
        :size= "option.btnSize ? option.btnSize : ''"
        :disabled="option.disabled"
        @click.native="clickHandler">{{option.value.replace(/^(\W{1})(\W{1})$/, '$1 $2')}}</el-button>
</template>
<script>
    export default {
        name: 'vbutton',
        props: [
            'option'
        ],
        data () {
            return {}
        },
        created () {
        },
        mounted () {

        },
        components: {},
        watch: {},
        methods: {
            clickHandler () {
                if (this.option.click && _.isFunction(this.option.click)) {
                    this.option.click();
                }
            },
            getValue () {
                return { [this.option.id]: this.option.value };
            }
        }
    }
</script>
<style>

</style>
