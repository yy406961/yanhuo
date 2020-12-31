<template>
    <div class="ga-colorText">
        <p class="ga-colorText__title" v-text="title"></p>
        <div class="ga-colorText__countWrap">
            <div class="ga-colorText__flipWrap">
                <i class="ga-colorText__countIcon"></i>
                <numberFlip :randerData="allCount" class="ga-colorText__count"></numberFlip>
                <!-- <i class="ga-colorText__plane"></i> -->
            </div>
            <p class="ga-colorText__country">来自：<span v-text="countryCount"></span> 个国家</p>
        </div>
    </div>
</template>

<script>
    import numberFlip from 'components/common/numberFlipNew'
    export default {
        name: 'colorText',
        props: ['title', 'allCount', 'countryCount'],
        data() {
            return {
            }
        },
        computed: {
        },
        mounted() {
        },
        components: {
            numberFlip
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b colorText {
            width: 100%;
            height: 100%;
            color: #00C5FF;
            padding: 3px 6px;
            display: flex;
            flex-flow: column;
            justify-content: space-evenly;
            @e title{
                color:#00FFBF;
                font-size: 14px;
            }
            @e countWrap {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                width: 100%;
            }
            @e flipWrap {
                position: relative;
                width: calc(100% - 120px);
                height: 52px;
                border-bottom: 3px solid #00FFBF;
            }
            @e countIcon{
                display: inline-block;
                height: 28px;
                width: 28px;
                background: url('~@/assets/images/common/totalNum.png') no-repeat center 0;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
                position: absolute;
                top: 11px;
                margin-right: 8px;
            }
            @e count {
                position: absolute;
                left: 40px;
                font-size: 40px;
                color: #00FFBF;
            }
            @e plane {
                width: 15px;
                height: 15px;
                background: url('~@/assets/images/common/plane.png') no-repeat;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
                position: absolute;
                bottom: 2px;
                right: 0
            }
            @e country {
                font-size: 14px;
                span {
                    color: #00FFBF;
                    font-size: 18px;
                }
            }
    }
}
</style>