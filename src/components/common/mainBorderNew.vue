<template>
    <div class="ga-mainBorderNew__border">
        <div class="ga-mainBorderNew__data">
            <el-tooltip  class="item" effect="dark" :content="option.tip" placement="top">
                <div class="ga-mainBorderNew__title">{{ option.title }}</div>
            </el-tooltip>
            <div :class="countStyle" @click="itemChange(1)">
                <i class="ga-mainBorderNew__countIcon"></i>
                <!--<span>{{ getThousandNum(option.count) }}</span>-->
                <numberFlip :randerData="option.count"></numberFlip>
            </div>
            <div class="ga-mainBorderNew__numBox">
                <div :key="index" v-for="(item, index) in option.data"  :class="numStyle(index)"
                     :style="colorStyle(index)"
                    @click="itemChange(item.type)">
                    <el-tooltip  class="item" effect="dark" :content="item.tip" placement="top">
                        <div class="ga-mainBorderNew__numIn">
                            <div class="ga-mainBorderNew__numName"> {{ item.name }}：</div>
                            <!--<div class="ga-mainBorderNew__numValue"> {{ getThousandNum(item.value) }}</div>-->
                            <numberFlip :randerData="item.value"></numberFlip>
                            <!-- <i v-if="activeIndex === index" :class="iconStyle(index)"></i> -->
                        </div>
                    </el-tooltip>
                    <!--<div class="ga-mainBorderNew__numIn">-->
                        <!--<div class="ga-mainBorderNew__numName"> {{ item.name }}：</div>-->
                        <!--&lt;!&ndash;<div class="ga-mainBorderNew__numValue"> {{ getThousandNum(item.value) }}</div>&ndash;&gt;-->
                        <!--<numberFlip :randerData="item.value"></numberFlip>-->
                        <!--&lt;!&ndash; <i v-if="activeIndex === index" :class="iconStyle(index)"></i> &ndash;&gt;-->
                    <!--</div>-->
                </div>
            </div>
        </div>
        <div class="ga-mainBorderNew__map">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import numberFlip from './numberFlipNew'
    import { mapGetters } from 'vuex';
    export default {
        name: 'mainBorderNew',
        data() {
            return {
                activeIndex: -1,
                typeArr: [
                    { key: -1, value: 1 },
                    { key: 0, value: 2 },
                    { key: 1, value: 3 },
                    // { key: 2, value: 4 },
                    { key: 2, value: 9 },
                    { key: 3, value: 5 },
                    { key: 4, value: 6 }
                ],
                colors: ['#00FFBF', '#E5C100', 'rgba(255,157,107,1)', '#A78CFF', '#00C5FF', '#D77272'],
                // 轮询
                timer: null
            }
        },
        props: ['option'],
        computed: {
            countStyle () {
                return ['ga-mainBorderNew__count', this.activeIndex === -1 ? `ga-mainBorderNew__countActive` : '']
            },
            ...mapGetters({
                rollState: 'global/rollState'
            })
        },
        watch: {
            rollState (newval) {
                if (newval) {
                    this.rollPoling()
                } else {
                    clearInterval(this.timer)
                }
            }
        },
        created () {
        },
        mounted () {
            // 轮询
            this.rollPoling()
        },
        destroyed () {
            clearInterval(this.timer)
        },
        methods: {
            rollPoling() {
                this.timer = setInterval(() => {
                    if (this.activeIndex >= -1 && this.activeIndex < this.option.data.length - 1) {
                        this.activeIndex ++
                    } else {
                        this.activeIndex = -1
                    }
                    let type
                    this.typeArr.forEach(it => {
                        if (it.key === this.activeIndex) {
                            type = it.value
                        }
                    })
                    this.$emit('activeDataType', type)
                    // 20000 接口数据返回过慢，改为40s
                }, 40000)
            },
            numStyle (index) {
                return ['ga-mainBorderNew__num', this.activeIndex === index ? `ga-mainBorderNew__numActive` : '']
            },
            colorStyle (index) {
                return {
                    color: this.colors[index]
                }
            },
            iconStyle (index) {
                return ['ga-mainBorderNew__numIcon', `ga-mainBorderNew__pointer${index}`]
            },
            itemChange (type) {
                this.typeArr.forEach(it => {
                    if (it.value === type) {
                        this.activeIndex = it.key
                    }
                })
                this.$emit('activeDataType', type)
            }
        },
        components: {
            numberFlip
        }
    }
</script>

<style>
    @component-namespace ga {
        @b mainBorderNew {
            @e border {
                width: 100%;
                height: 100%;
                z-index: -1;
                background: url('~@/assets/images/common/GroupNew.png') no-repeat center 0;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
                text-align: left;
                overflow: hidden;
                padding: 30px 10px 20px 35px;
                display: flex;
                justify-content: space-between;
            }
            @e data {
                width: 215px;
                /*min-width: 200px;*/
                height: 100%;
                text-align: left;
                margin-right: 15px;
            }
            @e title {
                font-size: 16px;
                color: #A2EEFF;
            }
            @e countIcon {
                display: inline-block;
                height: 30px;
                width: 30px;
                background: url('~@/assets/images/common/totalNum.png') no-repeat center 0;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
                position: relative;
                top: 9px;
                margin-right: 8px;
            }
            @e count {
                display: flex;
                cursor: pointer;
                font-size: 34px;
                color: #00FFBF;
                margin-bottom: 8px;
                border-bottom: 3px solid transparent;
            }
            @e countActive {
                border-bottom: 3px solid #00FFBF;
            }
            @e numBox {
                height: calc(100% - 75px);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            @e num {
                position: relative;
                /* width: 150px; */
                height: 14%;
                background: rgba(0,197,255,0.10);
                border: 1px solid rgba(0,255,191,0.20);
                border-radius: 2px;
                /*padding: 4px 6px;*/
                padding: 0.55vh 0.82vh;
                font-size: 20px;
                /* font-size: 1.65vh; */
                cursor: pointer;
            }
            @e num:hover {
                background: rgba(0,197,255,0.30);
                border: 1px solid rgba(0,255,191,0.60);
            }
            @e numActive {
                background: rgba(0,197,255,0.30);
                border: 1px solid rgba(0,255,191,0.60);
            }
            @e numIn {
                /* width: 100%;
                position: absolute;
                top: 50%;
                transform: translate(0%, -50%); */
                height: 100%;
                display: flex;
                align-items: center;
                /* flex-direction: column; */
                /* justify-content: space-between; */
                /* font-size: 14px; */
            }
            @e numName {
            }
            @e numValue {
                margin-top: 2px;
                font-size: 1.79vh;
                /*font-size: 13px;*/
            }
            @e numIcon {
                display: inline-block;
                width: 25px;
                height: 20px;
                position: absolute;
                top: 50%;
                right: 8px;
                margin-top: -10px;
            }
            @e pointer0 {
                background: url('~@/assets/images/common/pointer0.png') no-repeat;
                background-size: contain;
            }
            @e pointer1 {
                background: url('~@/assets/images/common/pointer1.png') no-repeat;
                background-size: contain;
            }
            @e pointer2 {
                background: url('~@/assets/images/common/pointer2.png') no-repeat;
                background-size: contain;
            }
            @e pointer3 {
                background: url('~@/assets/images/common/pointer3.png') no-repeat;
                background-size: contain;
            }
            @e pointer4 {
                background: url('~@/assets/images/common/pointer4.png') no-repeat;
                background-size: contain;
            }
            @e map {
                /*width: 64%;*/
                width: calc(100% - 230px);
            }
        }
    }
</style>