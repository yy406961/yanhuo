<template>
    <el-select multiple  v-model="checked"
        style="width: 120px"
        popper-class="selectMultiple"
        class="selectMultiple"
        @change="change"
        ref="selectMultiple"
        @visible-change="visibleChange"
        placeholder="请选择">
        <el-option
            v-for="item in option.data"
            :key="item.name"
            :label="item.label"
            :value="item.value">
            <el-checkbox-group v-model="checked" @change="checkedChange">
                <el-checkbox :label="item.value">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
        </el-option>
        <div>
            <el-checkbox :indeterminate="isIndeterminate" 
                    class="selectMultiple-checkAll"
                    v-model="checkAll" 
                    @change="checkAllChange">全选</el-checkbox>
        <span class="selectMultiple-span" @click="confirmChecked">确定</span>
        <span class="selectMultiple-span" @click="cancelChecked">取消</span>
        </div>
    </el-select>
</template>

<script>
import Emitter from 'element-ui/src/mixins/emitter';

export default {
    name: 'selectMultipe',
    props: ['option'],
    mixins: [Emitter],
    data () {
        return {
            isIndeterminate: false,
            checkAll: false,
            checked: []
        }
    },
    created () {},
    mounted () {},
    methods: {
        addClassFun () {
            // this.$nextTick(() => {
            //     $('div.el-select-dropdown').addClass('selectMultiple')
            // })
        },
        visibleChange () {
            this.addClassFun()
        },
        change () {
            this.addClassFun()
        },
        checkedChange (value) {
            this.sortFun()
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.option.data.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.option.data.length;
        },
        checkAllChange (event) {
            this.addClassFun()
            let data = []
            this.option.data.forEach(item => {
                data.push(item.value)
            })
            this.checked = event.target.checked ? data : [];
            this.isIndeterminate = false;
        },
        cancelChecked () {
            this.checked = []
        },
        sortFun () {
            this.checked = this.checked.sort(function(a, b) {
                if (a > b) {
                    return 1;
                } else if (a < b) {
                    return -1
                } else {
                    return 0;
                }
            })
        },
        confirmChecked () {
            // this.$refs.selectMultiple.$el.querySelector('input').blur();
            // $('i.el-input__icon').removeClass('is-reverse')
            // this.broadcast('ElSelectDropdown', 'destroyPopper');
            this.$refs.selectMultiple.handleClose();
            this.$emit('select-value', this.checked)
        }
    }
}
</script>

<style>
    .selectMultiple-checkAll {
        left: 10px;
    }
    .selectMultiple-span {
        cursor: pointer;
        margin-left: 45px;
    }
</style>
