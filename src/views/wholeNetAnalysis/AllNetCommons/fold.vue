<template>
    <div :class="['ga-fold', foldType === 'left' ? 'leftFold' : 'rightFold']" ref="fold">
        <div class="ga-fold__headline">
            <el-row>
                <el-col :span="20" :offset="2" class="ga-fold__headline--title">
                    <slot name="title">title</slot>
                </el-col>
                <el-col :span="2">
                    <div @click="toggle" class="ga-fold__headline--btn">
                        <div :class="[isToggle ? 'arrowDown' : 'arrowUp']"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="ga-fold__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script scoped>
    export default {
        data () {
            return {
                isToggle: false
            }
        },
        created () {
        },
        mounted () {
        },
        props: {
            foldType: {
                default: 'left'
            },
            foldToggle: {
                default: false
            },
            foldHeight: {
                default: 300
            }
        },
        watch: {
            foldToggle (val) {
                let h = this.foldHeight
                this.isToggle = val;
                let tab = $(this.$refs.fold);
                if (tab.height() > 28 && this.isToggle) {
                    tab.animate({
                        'height': '28px'
                    })
                } else {
                    tab.animate({
                        'height': h + 'px'
                    })
                }
            },
            foldHeight (val) {
                if (val > 300) {
                    let tab = $(this.$refs.fold);
                    tab.animate({
                        'height': val + 'px'
                    })
                } else {
                    let tab = $(this.$refs.fold);
                    tab.animate({
                        'height': val + 'px'
                    })
                }
            }
        },
        computed: {
        },
        methods: {
            toggle () {
                let tab = $(this.$refs.fold);
                this.isToggle = !this.isToggle
                let h = this.foldHeight;
                if (tab.height() > 28) {
                    tab.animate({
                        'height': '28px'
                    })
                } else {
                    tab.animate({
                        'height': h + 'px'
                    })
                }
                this.$emit('foldState', this.isToggle)
            }
        }
    }
</script>

<style lang="postcss" scoped>
    .arrowDown {
        background: url("~assets/images/warning/arrow.png") no-repeat center;
        background-size: 100% 100%;
        background-origin: content-box;
        height: 26px;
        width: 26px;
        cursor: pointer;
    }
    .arrowUp {
        background: url("~assets/images/warning/arrow.png") no-repeat center;
        background-size: 100% 100%;
        background-origin: content-box;
        height: 26px;
        width: 26px;
        margin-right: 6px;
        cursor: pointer;
        transform:rotate(180deg);
        -moz-transform:rotate(180deg);
        -webkit-transform:rotate(180deg);
        -o-transform:rotate(180deg);
    }
    .leftFold {
        border-bottom-right-radius: 15px;
    }
    .rightFold {
        border-bottom-left-radius: 15px;
    }
    @component-namespace ga {
        @b fold {
            background-color: rgba(0,0,0,0.7);
            overflow: hidden;
            @e headline {
                height: 28px;
                /*border: 1px solid red;*/
                background-color: #1C74C8;
                color: #fff;
                @m title {
                    /*border: 1px solid yellow;*/
                    font-size: 14px;
                }
                @m btn {
                    width: 25px;
                    text-align: center;
                    line-height: 30px;
                    font-size: 25px;
                }
            }
            @e content {
                height: 0px;
            }
        }
    }
</style>
