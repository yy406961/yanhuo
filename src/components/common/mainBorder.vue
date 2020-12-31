<template>
    <div class="ga-mainBorder__border">
        <div class="ga-mainBorder__title">{{ option.title }}</div>
        <div class="ga-mainBorder__numBox">
            <div v-for="item in option.data">
                <div class="ga-mainBorder__numName"> {{ item.name }}</div>
                <!--<div class="ga-mainBorder__numValue"> {{ item.value }}</div>-->
                <numberFlip :randerData="item.value"></numberFlip>
            </div>
        </div>
        <div class="ga-mainBorder__map">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import numberFlip from './numberFlip'
    export default {
        name: 'mainBorder',
        data() {
            return {
            }
        },
        props: ['option'],
        watch: {
        },
        created () {
        },
        methods: {
        },
        components: {
            numberFlip
        }
    }
</script>

<style>
    @component-namespace ga {
        @b mainBorder {
            @e border {
                width: 100%;
                height: 100%;
                z-index: -1;
                background: url('~@/assets/images/common/Group.png') no-repeat center 0;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
                text-align: left;
                overflow: hidden;
            }
            @e title {
                position: relative;
                top: 7%;
                left: 5%;
                /*color: #00a4ff;*/
                color: #A2EEFF;
            }
            @e title:before {
                content: '';
                display: inline-block;
                position: relative;
                top: 2px;
                width: 4px;
                height: 16px;
                margin-right: 8px;
                background-color: rgba(0,170,255,1);
            }
            @e numBox {
                float: right;
                margin-right: 6%;
                margin-top: 1%;
            }
            @e numName {
                font-size: 14px;
            }
            @e numValue {
                font-size: 22px;
                font-family: 'lcdd';
                background: url('~@/assets/images/common/num.png') no-repeat center 0;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
                margin-bottom: 10px;
                margin-top: 5px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                padding: 0 8px;
            }
            @e map {
                height: 90%;
                width: 69%;
                position: relative;
                /*top: 10%;*/
                left: 5%;
            }
        }
    }
</style>