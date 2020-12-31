<template>
    <div class="ga-topIcon__main" :style="chartStyle">
        <div v-for="item, index in option.data" class="ga-topIcon__item">
            <i class="ga-topIcon__index" :style="'background:' + colors[index]">{{ index + 1 }}</i>
            <div class="ga-topIcon__content">
                <el-tooltip  class="item" effect="dark" :content="item.name" placement="top">
                    <span class="ga-topIcon__area">{{ item.name }}</span>
                </el-tooltip>
                <el-tooltip  class="item" effect="dark" :content="item.count + ''" placement="top">
                    <span class="ga-topIcon__count">{{ item.count }}</span>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'topCom',
        data() {
            return {
                colors: [
                    'rgba(255,103,103,1)',
                    'rgba(255,157,107,1)',
                    'rgba(211,201,90,1)',
                    'rgba(85,202,105,1)',
                    'rgba(103,204,255,1)',
                    'rgba(129,103,255,1)'
                ]
            }
        },
        props: ['option'],
        computed: {
            chartStyle () {
                return {
                    width: this.width
                }
            }
        },
        created () {
            this.width = this.option.width
        }
    }
</script>

<style>
    @component-namespace ga {
        @b topIcon {
            @e main {
                display: flex;
                flex-wrap: wrap;
                font-size: 12px;
            }
            @e item {
                width: 32%;
                margin: 2px;
                display: flex;
            }
            @e index {
                display: inline-block;
                width: 16px;
                height: 16px;
                background: #f00;
                color: #000;
                /*text-align: center;*/
                line-height: 16px;
                margin-right: 5px;
                padding-left: 3px;
            }
            @e content {
                display: flex;
                justify-content: space-between;
                width: calc(100% - 21px);
                line-height: 16px;
            }
            @e area {
                width: 40%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            @e count {
                width: 59%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>