<template lang="html">
    <div class="ga-areaBars">
        <div class="ga-areaBars__shade" v-if="!option.click"></div>
        <div v-for="(itNum, ik) in [[0, option.data.length / 2], [option.data.length / 2, option.data.length]]"
                :key="ik"
                style="width:49%;height:100%">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="(item, index) in option.data"
                    :key="index"
                    :name="index"
                    v-if="index >= itNum[0] && index < itNum[1]">
                    <template slot="title">
                            <span @click="barClick(item, index, $event)" class="ga-areaBars__area">
                                <el-tooltip class="item" effect="dark" :content="item.area" placement="top">
                                    <span :style="{'color': activeIndex === index ? '#00FFBF' : ''}">{{ item.area }}</span>
                                </el-tooltip>
                            </span>
                            <div class="ga-areaBars__barContent"
                                :style="{'background': activeIndex === index ? 'rgba(0,255,191,0.20)' : ''}"
                                @click="barClick(item, index, $event)">
                                <span class="ga-areaBars__bar"
                                    :w="item.count"
                                    :style="{'background': activeIndex === index ? '#00FFBF' : ''}" ref="areaBar"></span>
                            </div>
                            <span @click="barClick(item, index, $event)" class="ga-areaBars__count"
                                :style="{'color': activeIndex === index ? '#00FFBF' : ''}">{{ item.count }}</span>
                    </template>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'areaBars',
        props: ['option', 'areaIndex'],
        data () {
            return {
                activeName: -1,
                activeIndex: -1,
                activeIdx: -1
            }
        },
        updated () {
            this.$nextTick(function () {
                this.showBarWidth()
            })
        },
        watch: {
            'option.click' (newVal) {
                if (!newVal) {
                    this.activeIndex = -1
                    this.activeName = -1
                }
            },
            'option.data' (newVal) {
                if (newVal) {
                    this.activeIndex = -1
                    this.activeName = -1
                }
            },
            // 控制左侧二级柱图和左侧一级柱图下拉列表的显示
            'option.secondShow' (newVal) {
                if (!newVal) {
                    this.activeIndex = -1
                    this.activeName = -1
                }
            },
            'areaIndex' (newVal) {
                this.activeName = newVal
                if (newVal === -1) {
                    this.activeIndex = newVal
                } else {
                    this.barClick(this.option.data[newVal], newVal)
                }
            }
        },
        computed: {
            baseWidth () {
                if (this.option.data && this.option.data.length !== 0) {
                    return this.option.data[0].count
                }
            }
        },
        methods: {
            showBarWidth () {
                let span = this.$refs.areaBar
                let senSpan = this.$refs.secondBar
                let baseWidth = this.baseWidth
                if (span) {
                    span.forEach(item => {
                        let width = item.getAttribute('w')
                        let per = width / baseWidth * 100
                        // 105px为柱图左边名字的宽度65px加上柱图右边数字最长宽度40px
                        item.style.width = `calc(${per}%)`
                    })
                }
                if (senSpan) {
                    senSpan.forEach(item => {
                        let width = item.getAttribute('w')
                        let per = width / baseWidth
                        // 105px为柱图左边名字的宽度65px加上柱图右边数字最长宽度40px
                        item.style.width = `calc((100% - 110px) * ${per})`
                    })
                }
                $('.ga-areaBars i').css('display', 'none')
            },
            // 一级柱图点击事件
            barClick (item, index, e) {
                this.option.secondShow = true
                this.activeIndex = index
                this.activeIdx = -1;
                if (this.option.barClick && _.isFunction(this.option.barClick)) {
                    this.option.barClick(item, index, e);
                }
            },
            // 二级柱图点击事件
            secondBarClick (item, idx, e) {
                this.activeIdx = idx
                this.activeIndex = -1;
                if (this.option.secondBarClick && _.isFunction(this.option.secondBarClick)) {
                    this.option.secondBarClick(item, idx, e);
                }
            }
        }
    }
</script>

<style scoped>
    .secondBar {
        cursor: pointer;
        align-items: center;
        display: flex;
        font-size: 12px;
        color: #fff;
        line-height: 22px;
    }
    @component-namespace ga {
        @b areaBars {
            position: relative;
            margin: 5px 0;
            display: flex;
            @e shade {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: transparent;
            }
            @e area {
                text-overflow: ellipsis;
                width: 55px;
                overflow: hidden;
                white-space: nowrap;
                color: #A2EEFF;
            }
            @e barContent {
                width: calc(100% - 115px);
                background: rgba(24,117,240,0.20);
                border-radius: 3px;
                height: 6px;
            }
            @e bar {
                display: inline-block;
                position: relative;
                top: -13px;
                min-width: 5px;
                width: 10px;
                height: 6px;
                background-image: linear-gradient(90deg, #0076FF 0%, #00C4FF 100%);
                border-radius: 3px;
                transition:width 1s;
                &:hover {
                    background: #00FFBF;
                }
            }
            @e count {
                margin-left: 10px;
                width: 45px;
                color: #A2EEFF;
            }
            @e content {
                padding-left: 16px;
                background: rgba(0,0,0,.3);
            }
            @e sencondArea{
                text-overflow: ellipsis;
                width: 44px;
                overflow: hidden;
                white-space: nowrap;
                color: #A2EEFF;
            }
            @e sencondBar {
                margin-right: 10px;
                min-width: 5px;
                width: 10px;
                height: 5px;
                background: #1874F0;
                border-radius: 3px;
                transition:width 1s;
            }
        }
    }
</style>
