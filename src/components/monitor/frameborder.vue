<template>
    <div :style="mainStyle">
        <div class="ga-frame">
            <div class="ga-frame__header" v-if="title">{{ title }}</div>
            <div class="ga-frame__tabsTitle" v-if="tabs">
                <span :class="['ga-frame__tabs', tabSwitch == 'line' ? 'bottomLine' : '']" @click="rightTabsLine()">变化趋势</span>
                <span :class="['ga-frame__tabs', tabSwitch == 'table' ? 'bottomLine' : '']" @click="rightTabsTable()">人员列表</span>
            </div>
            <div class="ga-frame__content" ref="content"  @mousewheel="frameMouseWheel" >
                <slot></slot>
            </div>
            <!-- <span class="ga-frame__leftTop"></span>
            <span class="ga-frame__rightTop"></span>
            <span class="ga-frame__leftBottom"></span>
            <span class="ga-frame__rightBottom"></span>
            <span class="ga-frame__left"></span>
            <span class="ga-frame__right"></span>
            <span class="ga-frame__top"></span>
            <span class="ga-frame__bottom"></span> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'frame',
        props: ['title', 'tabs'],
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
            'title' (newVal) {
                if (newVal === '') {
                    $('.ga-frame__content').css('height', '101%')
                } else {
//                    $('.ga-frame__content').css('height', 'calc(100% - 20px)')
                }
            },
            'tabs' (newVal) {
                this.tabSwitch = newVal
            }
        },
        mounted () {
            if (this.title) {
//                $('.ga-frame__content').css('height', 'calc(100% - 20px)')
            } else {
                $('.ga-frame__content').css('height', '101%')
            }
        },
        methods: {
            frameMouseWheel () {
                $('.el-tooltip__popper.is-dark').css({
                    'display': 'none'
                })
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
            border: 1px solid rgba(60,164,255,1);
            /* padding: 0 0 10px 6px; */
            @e header {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 13px;
                color: #fff;
                height: 28px;
                padding: 4px 10px 4px 18px;
                background: linear-gradient(135deg, transparent 9px, #0B245F 0);
            }
            @e content {
                /*overflow: hidden;*/
                /*padding: 8px 5px;*/
                width: 100%;
                /*height: calc(100% - 28px);*/
                /* background: linear-gradient(-45deg, transparent 9px, rgba(0, 0, 0, 0.7) 0); */
            }
            @e tabsTitle {
                position: relative;
                /*overflow: hidden;*/
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
                position: absolute;
                left: -1px;
                top: -2px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat 0 0;
            }
            @e rightTop {
                position: absolute;
                right: -1px;
                top: -2px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat -25px 0;
            }
            @e leftBottom {
                position: absolute;
                left: -1px;
                bottom: -1px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat 0 -25px;
            }
            @e rightBottom {
                position: absolute;
                right: -1px;
                bottom: -1px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat -25px -25px;
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
