<template>
    <div class="ga-extensionBorder">
        <div class="ga-extensionBorder__leftTop"></div>
        <div class="ga-extensionBorder__leftBot"></div>
        <div class="ga-extensionBorder__rightTop"></div>
        <div class="ga-extensionBorder__rightBot"></div>
        <div class="ga-extensionBorder__boxTitle" v-if="title">
            <img src="~@/assets/images/common/title.png" alt="">
            <span>{{ title }}</span>
            &nbsp;<span class="ga-extensionBorder__warnNumber">{{ warnNumber }}</span>
        </div>
        <div class="ga-extensionBorder__containerMain" :style="containStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'extensionBorder',
        data() {
            return {
            }
        },
        computed: {
            containStyle() {
                if (!this.title) {
                    return {
                        'height': '100%',
                        'top': '0'
                    }
                }
            }
        },
        props: ['title', 'warnNumber']
    }
</script>

<style>
    @component-namespace ga {
        @b extensionBorder {
            width: 100%;
            height: 100%;
            border: 1px solid #00a4ff;
            position: relative;
            text-align: left;
            /* overflow: hidden; */
            @e leftTop {
                position: absolute;
                width: 89px;
                height: 51px;
                background: url('~@/assets/images/common/leftTop.png') no-repeat;
                top: -3px;
                left: -3px;
            }
            @e leftBot {
                position: absolute;
                width: 33px;
                height: 45px;
                background: url('~@/assets/images/common/leftBot.png') no-repeat;
                bottom: -3px;
                left: -3px;
            }
            @e rightTop {
                position: absolute;
                width: 33px;
                height: 52px;
                background: url('~@/assets/images/common/rightTop.png') no-repeat;
                top: -3px;
                right: -3px;
            }
            @e rightBot {
                position: absolute;
                width: 89px;
                height: 53px;
                background: url('~@/assets/images/common/rightBot.png') no-repeat;
                bottom: -3px;
                right: -5px;
            }
            @e boxTitle {
                width: 100%;
                padding-left: 6px;
                height: 28px;
                line-height: 28px;
                background: rgba(27,117,184,0.20);
                font-size: 14px;
                color: #A2EEFF;
                position: absolute;
                z-index: 10;
                display: flex;
                align-items: center;
                img {
                  width: 25px;
                  height: 25px;
                }
            }
            /* @e boxTitle:before {
                content: '';
                display: inline-block;
                position: relative;
                top: 2px;
                width: 3px;
                height: 13px;
                margin-right: 6px;
                background-color: #00a4ff;
            } */
            @e warnNumber  {
                color: rgba(255,64,64,1)
            }
            @e containerMain {
                position: absolute;
                top: 28px;
                width: 100%;
                padding: 6px 5px;
                height: calc(100% - 25px);
                overflow: auto;
                font-size: 14px;
            }
        }
    }
</style>