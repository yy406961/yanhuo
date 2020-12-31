<template>
    <div class="ga-touristCom__main" :style="chartStyle">
        <div class="ga-touristCom__title" :style="titleStyle">
            <!--<i :class="iconClass"></i>-->
            <span>{{ title }}</span>
        </div>
        <div class="ga-touristCom__content">
            <div v-for="item, index in option.data"  class="ga-touristCom__item">
                <span class="ga-touristCom__index">{{ index + 1 }}</span>
                <el-tooltip  class="item" effect="dark" :content="item.name" placement="top">
                    <span class="ga-touristCom__area">{{ item.name }}</span>
                </el-tooltip>
                <el-tooltip  class="item" effect="dark" :content="item.value + ''" placement="top">
                    <span class="ga-touristCom__count">{{ item.value }}</span>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'touristCom',
        data() {
            return {
            }
        },
        props: ['option'],
        computed: {
            chartStyle () {
                return {
                    width: this.width
                }
            },
            titleStyle () {
                return {
                    background: this.option.type === 0 ? 'rgba(60,181,255, 0.5)' : 'rgba(0,255,191, 0.5)'
                }
            },
            iconClass () {
                return ['ga-touristCom__icon', this.option.type === 0 ? 'ga-touristCom__iconPlace' : 'ga-touristCom__iconView']
            },
            title() {
                // return this.option.type === 0 ? '来源地用户排名' : '景点用户排名'
                return this.option.type === 0 ? 'APP访问排名' : '手机上网热搜词排名'
            }
        },
        created () {
            this.width = '49%'
        }
    }
</script>

<style>
    @component-namespace ga {
        @b touristCom {
            @e main {
                /*display: flex;*/
                /*flex-wrap: wrap;*/
                font-size: 12px;
                padding: 0 10px;
                color: #fff;
            }
            @e title {
                height: 30px;
                background: rgba(60,181,255, 0.5);
                border-radius: 10px;
                line-height: 30px;
                display: flex;
                align-items: center;
                font-size: 13px;
                padding-left: 8px;
            }
            @e icon {
                display: inline-block;
                height: 18px;
                width: 18px;
                margin: 0 4px 0 6px;
                /* border: 1px solid #f00; */
            }
            @e iconPlace {
                background: url('~@/assets/images/common/place.png') no-repeat;
                background-size: contain;
            }
            @e iconView {
                background: url('~@/assets/images/common/view.png') no-repeat;
                background-size: contain;
            }
            @e item {
                /*width: 98%;*/
                /* margin: 2px; */
                display: flex;
                align-items: center;
            }
            @e index {
                width: 20px;
            }
            @e content {
                margin-top: 8px;
                height: calc(100% - 43px);
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                color: #A2EEFF;
            }
            @e itemContent {
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
                width: 40%;
                margin-left: 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
            }
        }
    }
</style>