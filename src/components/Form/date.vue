<template>
    <div class="yq-form__date" :style = "widthStyle">
        <el-date-picker :format="formatDate"
            :disabled="option.disabled"
            :editable=false
            :default-value="option.defaultVal"
            v-if="type=='datetime'"
            v-model="value"
            type="datetime"
            @change="changeHandler"
            placeholder="选择日期时间"
            :picker-options="option.pickOptions"
            :class="'input' + option.id"
            @focus="focusFuc(option.id)"
            @blur="blurFuc(option.id)"></el-date-picker>
        <el-date-picker
            :format="formatDate"
            :disabled="option.disabled"
            :editable=false
            :default-value="option.defaultVal"
            v-if="type=='datetimerange'"
            v-model="value"
            type="datetimerange"
            placeholder="选择日期时间"
            :picker-options="option.pickOptions"
            :class="'input' + option.id"
            @focus="focusFuc(option.id)"
            @blur="blurFuc(option.id)"></el-date-picker>
        <el-date-picker
            :format="formatDate"
            :disabled="option.disabled" 
            :editable=false
            :default-value="option.defaultVal"
            v-if="type=='datetimeMinute'"
            v-model="value" type="datetime"
            @change="changeHandler"
            placeholder="选择日期时间"
            :picker-options="option.pickOptions"
            :class="'input' + option.id"
            @focus="focusFuc(option.id)"
            @blur="blurFuc(option.id)"></el-date-picker>
        <el-date-picker
            :format="formatDate"
            :disabled="option.disabled"
            :editable=false
            :default-value="option.defaultVal"
            v-if="type=='date'"
            v-model="value" type="date"
            @change="changeHandler"
            placeholder="选择日期"
            :picker-options="option.pickOptions"
            :class="'input' + option.id"
            @focus="focusFuc(option.id)"
            @blur="blurFuc(option.id)"></el-date-picker>
        <el-date-picker
            :format="formatDate"
            :disabled="option.disabled"
            :editable=false
            :default-value="option.defaultVal"
            v-if="type=='year'"
            v-model="value"
            type="year" 
            placeholder="选择年"
            :picker-options="option.pickOptions"
            :class="'input' + option.id"
            @focus="focusFuc(option.id)"
            @blur="blurFuc(option.id)"></el-date-picker>
        <el-date-picker
            :format="formatDate"
            :disabled="option.disabled"
            :editable=false
            :default-value="option.defaultVal"
            v-if="type=='month'"
            v-model="value"
            type="month"
            placeholder="选择月"
            :picker-options="option.pickOptions"
            :class="'input' + option.id"
            @focus="focusFuc(option.id)"
            @blur="blurFuc(option.id)"></el-date-picker>
    </div>
</template>
<script>
    import { getConnerColor } from './form.js'
    import moment from 'moment'
    export default {
        name: 'date',
        props: [
            'option'
        ],
        data () {
            return {
                value: '',
                type: '',
                formatDate: '',
                pickerOptions2: {
                    disabledDate (time) {
                        let cDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                        let cTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
                        let pDate = moment(new Date()).subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss');
                        return !moment(cTime).isBetween(pDate, cDate);
                    }
                }
            }
        },
        mounted () {
            this.value = this.option.value
            this.type = this.option.type;
            this.formatFun(this.type)
        },
        watch: {
            'option.value': {
                deep: true,
                handler (newVal) {
                    this.value = newVal;
                }
            }
        },
        computed: {
            widthStyle () {
                return {
                    width: this.option.width + 'px'
                }
            }
        },
        methods: {
            formatFun(val) {
                if (this.option.format) {
                    this.formatDate = this.option.format
                } else {
                    this.typeFormat(val)
                }
            },
            getValue () {
                let format;
                switch (this.type) {
                    case 'datetime':
                        format = 'YYYY-MM-DD HH:mm:ss';
                        break;
                    case 'datetimerange':
                        format = 'YYYY-MM-DD HH:mm:ss';
                        break;
                    case 'datetimeMinute':
                        format = 'YYYY-MM-DD HH:mm';
                        break;
                    case 'date':
                        format = 'YYYY-MM-DD';
                        break;
                    case 'year':
                        format = 'YYYY';
                        break;
                    case 'month':
                        format = 'YYYY-MM';
                        break;
                    default:;
                }
                if (this.value === '' || !this.value) {
                    return { [this.option.id]: this.value || '' };
                }
                return { [this.option.id]: moment(this.value).format(format) };
            },
            setValue (val) {
                if (val !== undefined) {
                    this.value = val;
                }
            },
            changeHandler (value) {
                if (this.option.change && _.isFunction(this.option.change)) {
                    this.option.change(value);
                }
            },
            typeFormat(val) {
                switch (val) {
                    case 'datetime':
                        this.formatDate = 'yy-MM-dd HH:mm:ss';
                        break;
                    case 'datetimerange':
                        this.formatDate = 'yy-MM-dd HH:mm:ss';
                        break;
                    case 'datetimeMinute':
                        this.formatDate = 'yy-MM-dd HH:mm';
                        break;
                    case 'date':
                        this.formatDate = 'yy-MM-dd';
                        break;
                    case 'year':
                        this.formatDate = 'yy';
                        break;
                    case 'month':
                        this.formatDate = 'yy-MM';
                        break;
                    default:;
                }
            },
            focusFuc(id) {
                getConnerColor(id, 'rgba(0,242,184,1)', 1)
            },
            blurFuc(id) {
                getConnerColor(id, 'rgba(0,164,255,0.6)', 1)
            }
        }
    }
</script>
<style>

</style>
