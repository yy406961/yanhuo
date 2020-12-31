<template>
    <el-dialog
        :modal="true"
        :visible="showdialog"
        :width="width"
        :top="top"
        @open="openFn"
        :closeOnClickModal="false"
        :closeOnPressEscape="false"
        :before-close="closeFn">
        <div class="ga-dialogMain">
            <p class="ga-dialogMain__dialogTitle" v-text="title"></p>
            <!-- <span class="ga-dialogContent__dialogTitleCenter">{{ title }}</span>
            <span class="ga-dialogContent__dialogTitleRight"></span> -->
        </div>
        <p class="ga-dialogMain__leftTop"></p>
        <p class="ga-dialogMain__rightTop"></p>
        <p class="ga-dialogMain__leftBot"></p>
        <p class="ga-dialogMain__rightBot"></p>
        <slot></slot>
        <p slot="footer" class="dialog-footer">
            <el-button :type="showConfirm && isConDefaultBtn ? 'default' : 'primary'"
                        :size = "dialogBtnSize"
                       v-show="showConfirm" :disabled="isDisabled"
                       @click="confirmFn">{{okText.replace(/^(\W{1})(\W{1})$/, '$1 $2')}}</el-button>
            <el-button style="margin-left: 12px"
                :type="showCancel && isCanDefaultBtn ? 'default' : 'primary'"
                :size = "dialogBtnSize"
                v-show="showCancel" @click="closeFn">{{cancleText.replace(/^(\W{1})(\W{1})$/, '$1 $2')}}</el-button>
        </p>
    </el-dialog>
</template>
<script>
    export default {
        data () {
            return {
                showdialog: this.dialogVisible,
                width: '30%'
            }
        },
        mounted() {
            this.width = this.getWidth(this.size)
        },
        watch: {
            dialogVisible (val) {
                this.showdialog = val
            }
        },
        props: {
            // margint-top
            top: {
                type: String,
                default: '10vh'
            },
            //  是否禁用
            isDisabled: {
                type: Boolean,
                default: false
            },
            // 是否显示弹框
            dialogVisible: {
                type: Boolean,
                default: false
            },
            // 标题
            title: {
                type: String,
                default: '标题'
            },
            // 确定文字
            okText: {
                type: String,
                default: '确 定'
            },
            // 是否显示确认
            showConfirm: {
                type: Boolean,
                default: true
            },
            // dialog底部button大小
            dialogBtnSize: {
                type: String,
                default: 'large'
            },
            isConDefaultBtn: {
                type: Boolean,
                default: false
            },
            isCanDefaultBtn: {
                type: Boolean,
                default: true
            },
            // 取消文字
            cancleText: {
                type: String,
                default: '取 消'
            },
            // 是否显示取消
            showCancel: {
                type: Boolean,
                default: true
            },
            // 弹框大小
            size: {
                type: String,
                default: 'small'
            },
            // 确认回调
            okFn: {
                type: Function
            },
            // 取消回调
            cancleFn: {
                type: Function
            }
        },
        methods: {
            confirmFn () {
                if (this.okFn) {
                    this.okFn()
                } else {
                    this.$emit('change', this.showdialog = false)
                }
            },
            closeFn () {
                this.$emit('change', this.showdialog = false)
                if (this.cancleFn) {
                    this.cancleFn()
                }
            },
            openFn () {
                this.$nextTick(() => {
                    this.$emit('openCallback', this.showdialog)
                })
            },
            // dialog宽度
            getWidth(str) {
                let width = '30%'
                switch (str) {
                    case 'mini':
                        width = '44%'
                        break;
                    case 'small':
                        width = '61%'
                        break;
                    case 'middle':
                        width = '75%'
                        break;
                    case 'large':
                        width = '90%'
                        break;
                    case 'fullscreen':
                        width = window.innerWidth - 40 + 'px'
                        break;
                    default:
                        width = '30%'
                }
                return width
            }
        }
    }
</script>
<style >
    @component-namespace ga {
        @b dialogMain{
            margin-top: -50px;
            width: 100%;
            position: absolute;
            left: 0;
            @e dialogTitle{
                font-size:16px;
                font-weight: bold;
                height: 40px;
                line-height: 40px;
                padding-left:12px;
                background: rgba(27,117,184,0.20);
                box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.10);
                /* text-align: center; */
                /* float: left; */
                /* padding: 0 30px; */
                /* margin-left: -1px; */
                /* cursor: default; */
            }
            @e leftTop {
                position: absolute;
                width: 89px;
                height: 51px;
                background: url('~@/assets/images/common/leftTop.png') no-repeat;
                top: -2px;
                left: -4px;
            }
            @e leftBot {
                position: absolute;
                width: 33px;
                height: 45px;
                background: url('~@/assets/images/common/leftBot.png') no-repeat;
                bottom: -2px;
                left: -3px;
            }
            @e rightTop {
                position: absolute;
                width: 33px;
                height: 52px;
                background: url('~@/assets/images/common/rightTop.png') no-repeat;
                top: -2px;
                right: -3px;
            }
            @e rightBot {
                position: absolute;
                width: 89px;
                height: 53px;
                background: url('~@/assets/images/common/rightBot.png') no-repeat;
                bottom: -3px;
                right: -6px;
            }
        }
        @b dialogContent {
            height: 45px;
            line-height: 35px;
            font-size: 16px;
            color: #fff;
            text-shadow:0px 0px 10px #199fd4;
            font-weight: 400;
            margin: 0 auto;
            margin-top: -46px;
            display: table;
            @e dialogTitleLeft {
                display: inline-block;
                width: 62px;
                height: 42px;
                background: url('~@/assets/images/common/dialogTitleLeft.png') no-repeat;
                float: left;
            }
            @e dialogTitleCenter {
                display: inline-block;
                height: 42px;
                line-height: 30px;
                background: url('~@/assets/images/common/dialogCenter.png') repeat-x;
                text-align: center;
                float: left;
                padding: 0 30px;
                margin-left: -1px;
                cursor: default;
            }
            @e dialogTitleRight {
                display: inline-block;
                width: 65px;
                height: 42px;
                background: url('~@/assets/images/common/dialogTitleRight.png') no-repeat;
                float: left;
                margin-left: -1px;
            }
        }
        @b dialogTopLeft {
            width: 31px;
            height: 8px;
            background: url("~@/assets/images/common/dialogIcon04.png") no-repeat;
            position: absolute;
            top: -9px;
            left: 0;
        }
        @b dialogTopRight {
            width: 31px;
            height: 8px;
            background: url("~@/assets/images/common/dialogIcon05.png") no-repeat;
            position: absolute;
            top: -8px;
            right: -4px;
        }
        @b dialogLeftBorder {
            width: 16px;
            height: 40%;
            background: url("~@/assets/images/common/dialogIcon02.png") no-repeat;
            background-size: contain;
            position: absolute;
            left: -1px;
            top: 30%;
        }
        @b dialogRightBorder {
            width: 16px;
            height: 40%;
            background: url("~@/assets/images/common/dialogIcon03.png") no-repeat right;
            background-size: contain;
            position: absolute;
            right: -1px;
            top: 30%;
        }
    }
</style>
