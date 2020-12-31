<template>
    <div class="ga-confirmBtn">
        <div class="ga-confirmBtn__container" v-for="(item, index) in operateArr" :key="index">
            <el-tooltip placement="top" :key="item.label"
                :disabled="tooltipDisabled(index, item.disabled)">
                <div slot="content">
                    <p class="ga-confirmBtn__tootipText" v-text="item.text"></p>
                    <p class="ga-confirmBtn__center">
                        <el-button :type="getType(item.label)" class="el-button--mini"
                            @click="item.click">确定
                    </el-button>
                        <el-button type="primary" size="mini" @click="cancelFunc">取消</el-button>
                    </p>
                </div>
                <el-button
                        :type="item.type || 'primary'"
                        :disabled="item.disabled"
                        @click="operateClick(index)"
                        :style="labelColor(item.label)">
                    {{ item.label }}
                </el-button>
            </el-tooltip>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'containerBorder',
        props: ['option'],
        data() {
            return {
                maiBtnType: 'primary',
                toolDisabled: [],
                operateArr: [
                    // {
                    //     label: '新增',
                    //     text: '是否新增一个新任务？',
                    //     click() {
                    //         console.log('新增')
                    //     }
                    // },
                    // {
                    //     label: '删除',
                    //     text: '是否删除此任务？',
                    //     color: 'rgba(255,103,103,1)',
                    //     click() {
                    //         console.log('删除')
                    //     }
                    // },
                    // {
                    //     label: '提交',
                    //     text: '是否提交此任务？',
                    //     color: 'rgba(255,157,107,1)',
                    //     disabled: true,
                    //     click() {
                    //         console.log('提交')
                    //     }
                    // }
                ]
            }
        },
        computed: {
        },
        mounted() {
            this.operateArr = this.option
            this.operateArr.forEach((item, index) => {
                this.toolDisabled[index] = true
            });
        },
        methods: {
            operateClick(index) {
                this.toolDisabled = this.toolDisabled.map(item => {
                    item = true
                    return item
                })
                this.toolDisabled[index] = false
            },
            cancelFunc() {
                this.toolDisabled = this.toolDisabled.map(item => {
                    item = true
                    return item
                })
            },
            tooltipDisabled(index, isDisabled) {
                let bool = isDisabled === true
                return this.toolDisabled[index] !== false || bool
            },
            labelColor(val) {
                let color = '#fff'
                if (val && val.length > 0) {
                    color = val
                }
                return {
                    color: color
                }
            },
            getType(val) {
                let type = 'warn'
                if (val === '删除') {
                    type = 'danger'
                }
                if (val === '追加' || val === '提交') {
                    type = 'warn'
                }
                return type
            }
        },
        watch: {
            'option': {
                deep: true,
                handler (newval) {
                    console.log('1111111111111', newval)
                    this.operateArr = newval
                }
            }
        }
    }
</script>

<style>
    @component-namespace ga {
        @b confirmBtn {
            width: 100%;
            height: 100%;
            display:flex;
            @e container{
                text-align:center;
                margin-right:12px;
            }
            @e tootipText{
                margin-bottom:10px;
            }
            @e center{
                text-align:center;
            }
        }
    }
</style>