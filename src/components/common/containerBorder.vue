<template>
    <div class="ga-containerBorder">
        <div class="ga-containerBorder__leftTop"></div>
        <div class="ga-containerBorder__leftBot"></div>
        <div class="ga-containerBorder__rightTop"></div>
        <div class="ga-containerBorder__rightBot"></div>
        <div class="ga-containerBorder__boxTitle" v-if="title">{{ title }}
            &nbsp;<span class="ga-containerBorder__warnNumber">{{ warnNumber }}</span>
        </div>
        <div class="ga-containerBorder__containerMain" :style="containStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'containerBorder',
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
        @b containerBorder {
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
                font-size: 12px;
                /*color: #00a4ff;*/
                color: #A2EEFF;
                position: absolute;
                z-index: 10;
            }
            @e boxTitle:before {
                content: '';
                display: inline-block;
                position: relative;
                top: 2px;
                width: 3px;
                height: 13px;
                margin-right: 6px;
                background-color: #00a4ff;
            }
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
            }
        }
    }
</style>