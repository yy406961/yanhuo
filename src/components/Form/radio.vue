<template>
    <el-radio-group v-model="value" :disabled="option.disabled" @change="changeHandler">
        <el-radio v-for='item in option.data' :key="item.name" :label="item.value">{{item.name}}</el-radio>
    </el-radio-group>
</template>
<script>
    export default {
        name: 'radio',
        props: [
            'option'
        ],
        data () {
            return {
                value: ''
            }
        },
        created () {
        },
        mounted () {
            this.value = this.option.value;
        },
        components: {},
        watch: {},
        methods: {
            changeHandler (value) {
                if (this.option.change && _.isFunction(this.option.change)) {
                    this.option.change(value);
                }
            },
            getValue () {
                return { [this.option.id]: this.value };
            },
            setValue (val) {
                if (val !== undefined) {
                    this.value = val;
                }
            }
        }
    }
</script>
<style>

</style>
