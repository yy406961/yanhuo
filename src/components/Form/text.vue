<template>
    <el-input v-model="value"
              :disabled="option.disabled"
              :placeholder="placeholder"
              auto-complete="on"
              :style = "widthStyle"
              :type = "option.iptType"
              :rows = "option.rows"
              :class="'input' + option.id"
              @focus="focusFuc(option.id)"
              @blur="blurFuc(option.id)"></el-input>
</template>
<script>
    import { getConnerColor } from './form.js'
    export default {
        name: 'vtext',
        props: [
            'option'
        ],
        data () {
            return {
                value: '',
                placeholder: ''
            }
        },
        watch: {
            'option.value': {
                deep: true,
                handler (newVal) {
                    this.value = newVal;
                }
            },
            'option.placeholder': {
                deep: true,
                handler (newVal) {
                    this.placeholder = newVal;
                }
            }
        },
        mounted () {
            this.value = this.option.value;
            this.placeholder = this.option.placeholder ? this.option.placeholder : '请输入内容'
        },
        computed: {
            widthStyle () {
                return {
                    width: this.option.width + 'px'
                }
            }
        },
        methods: {
            getValue () {
                return { [this.option.id]: this.value || '' };
            },
            setValue (val) {
                this.value = val;
            },
            focusFuc(id) {
                getConnerColor(id, 'rgba(0,242,184,1)')
            },
            blurFuc(id) {
                getConnerColor(id, 'rgba(0,164,255,0.6)')
            }
        }
    }
</script>
<style>

</style>
