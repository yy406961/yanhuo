<template>
    <div :style="mainStyle">
        <div class="ga-frame">
            <div class="ga-frame__header" v-if="title">{{ title }}</div>
            <div class="ga-frame__tabsTitle" v-if="tabs">
                <span :class="['ga-frame__tabs', tabSwitch == 'line' ? 'bottomLine' : '']" @click="rightTabsLine()">变化趋势</span>
                <span :class="['ga-frame__tabs', tabSwitch == 'table' ? 'bottomLine' : '']" @click="rightTabsTable()">人员列表</span>
            </div>
            <div class="ga-frame__content"
                 :style="contentHeight()"
                 ref="content"  @mousewheel="frameMouseWheel" >
                <slot></slot>
            </div>
            <span class="ga-frame__leftTop" v-if="!normal"></span>
            <span class="ga-frame__rightTop" v-if="!normal"></span>
            <span class="ga-frame__leftBottom" v-if="!normal"></span>
            <span class="ga-frame__rightBottom" v-if="!normal"></span>
            <!--<span class="ga-frame__left"></span>-->
            <!--<span class="ga-frame__right"></span>-->
            <!--<span class="ga-frame__top"></span>-->
            <!--<span class="ga-frame__bottom"></span>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'frame',
        props: ['title', 'tabs', 'normal'],
        data () {
            return {
                mainStyle: {
                    width: '100%',
                    height: '100%'
                },
                tabSwitch: this.tabs
            }
        },
        watch: {
            'tabs' (newVal) {
                this.tabSwitch = newVal
            }
        },
        mounted () {
        },
        methods: {
            frameMouseWheel () {
                $('.el-tooltip__popper.is-dark').css({
                    'display': 'none'
                })
            },
            contentHeight() {
                return {
                    height: this.title ? 'calc(100% - 20px)' : 'calc(100% + 12px)',
                    padding: this.title ? '0 5px' : '0'
                }
            },
            rightTabsLine () {
                this.$emit('rightTabsChange', true)
            },
            rightTabsTable () {
                this.$emit('rightTabsChange', false)
            }
        }
    }
</script>

<style scoped>
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .bottomLine::after {
        content: '';
        width: 100px;
        height: 2px;
        display: block;
        background: #4aa6dc;
        position: absolute;
        top: 28px;
    }
    @component-namespace ga {
        @b frame {
            position: relative;
            color: #ffffff;
            font-size: 12px;
            width: 100%;
            height: 100%;
            /* z-index: 0; */
            border: 1px solid rgba(60,164,255,1);
            padding-bottom: 12px;
            background: rgba(16,42,74,1);
            @e header {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 14px;
                color: #A2EEFF;
                height: 28px;
                padding: 4px 10px 4px 18px;
                background: #11365D;
                box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.10);
            }
            @e content {
                overflow: auto;
                width: 100%;
            }
            @e tabsTitle {
                position: relative;
                white-space: nowrap;
                font-size: 13px;
                color: #fff;
                height: 28px;
                background: linear-gradient(135deg, transparent 9px, #0B245F 0);
            }
            @e tabs {
                display: inline-block;
                width: 100px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                cursor: pointer;
            }
            @e leftTop {
                width: 89px;
                height: 41px;
                background: url("~@/assets/images/login/topLeft.png") no-repeat;
                position: absolute;
                top: -3px;
                left: -3px;
                /* z-index: -1; */
            }
            @e rightTop {
                width: 33px;
                height: 41px;
                background: url("~@/assets/images/login/topRight.png") no-repeat;
                position: absolute;
                top: -2.5px;
                right: -3px;
                /* z-index: -1; */
            }
            @e leftBottom {
                width: 33px;
                height: 48px;
                background: url("~@/assets/images/login/bottomLeft.png") no-repeat;
                background-size: contain;
                position: absolute;
                left: -2px;
                bottom: -2px;
                /* z-index: -1; */
            }
            @e rightBottom {
                width: 89px;
                height: 48px;
                background: url("~@/assets/images/login/bottomRight.png") no-repeat right;
                background-size: contain;
                position: absolute;
                right: -2px;
                bottom: -2px;
                /* z-index: -1; */
            }
            @e left {
                position: absolute;
                left: -1px;
                bottom: 20px;
                width: 1px;
                height: calc(100% - 40px);
                background: #4f8ee5;
            }
            @e right {
                position: absolute;
                right: -1px;
                bottom: 20px;
                width: 1px;
                height: calc(100% - 40px);
                background: #4f8ee5;
            }
            @e top {
                position: absolute;
                left: 20px;
                top: -1px;
                width: calc(100% - 40px);
                height: 1px;
                background: #4f8ee5;
            }
            @e bottom {
                position: absolute;
                left: 20px;
                bottom: -1px;
                width: calc(100% - 40px);
                height: 1px;
                background: #4f8ee5;
            }
        }
    }
</style>
