<template>
    <div class="ga-userCount__main">
        <div class="ga-userCount__title" :style="titleStyle">
            <span>{{ title }}</span>
        </div>
        <div class="ga-userCount__content">
            <div v-for="item, index in option.data"  class="ga-userCount__item">
                <el-tooltip  class="item" effect="dark" :content="index + 1 + item.areaName + ''" placement="top">
                    <span class="ga-userCount__index">{{ index + 1 }} {{ item.areaName }}</span>
                </el-tooltip>
                <p class="ga-userCount__areaWrap">
                    <span class="ga-userCount__area" :style="areaWidth(item.areaValue)"></span>
                </p>
                <el-tooltip  class="item" effect="dark" :content="item.areaValue + ''" placement="top">
                    <span class="ga-userCount__count">{{ item.areaValue }}</span>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'userCount',
        data() {
            return {
            }
        },
        props: ['option'],
        computed: {
            titleStyle () {
                return {
                    background: this.option.color
                }
            },
            title() {
                return this.option.title
            }
        },
        methods: {
            areaWidth(value) {
                let max = this.option.data[0].areaValue
                let width = Math.pow(value / max, 1 / 2) * 100
                return {
                    width: width + '%'
                }
            }
        }
    }
</script>

<style>
    @component-namespace ga {
        @b userCount {
            @e main {
                width:50%;
                font-size: 12px;
                padding: 0 10px;
                color: #A2EEFF;
            }
            @e title {
                height: 30px;
                background: rgba(60,181,255, 0.5);
                border-radius: 10px;
                line-height: 30px;
                text-align: center;
                color:#fff;
                font-size: 13px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
            }
            @e item {
                display: flex;
                align-items: center;
            }
            @e index {
                width: 120px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: left;
            }
            @e content {
                margin-top: 8px;
                height: calc(100% - 43px);
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
            @e areaWrap{
                display: flex;
                height: 8px;
                margin-left: 6px;
                width: calc(100% - 76px);
                border-radius: 6px;
                background: rgba(24,117,240,0.20);
            }
            @e area {
                height: 100%;
                background: #1874F0;
                border-radius: 6px;
                min-width: 1px;
                width: calc(100% - 220px);
            }
            @e count {
                width: 100px;
                margin-left: 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: left;
            }
        }
    }
</style>