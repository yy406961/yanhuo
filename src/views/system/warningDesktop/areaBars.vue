<template lang="html">
    <div class="ga-areaBars">
        <div class="ga-areaBars__shade" v-if="!option.click"></div>
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item v-for="(item, index) in option.data" :key="index" :name="index">
                <template slot="title">
                    <span @click="barClick(item, index, $event)" class="ga-areaBars__area">
                        <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
                            <span :style="{'color': activeIndex === index ? '#00FFBF' : ''}">{{ item.name }}</span>
                        </el-tooltip>
                    </span>
                    <div class="ga-areaBars__barContent" style="width: calc(100% - 115px)" @click="barClick(item, index, $event)">
                    <span class="ga-areaBars__bar"
                          :w="item.count"
                          :style="{'background': activeIndex === index ? '#00FFBF' : ''}" ref="areaBar"></span>
                    </div>
                    <span @click="barClick(item, index, $event)" class="ga-areaBars__count">{{ item.count }}</span>
                </template>
                <div v-if="option.secondShow && item.data && item.data.length !== 0" class="ga-areaBars__content">
                    <ul>
                        <li v-for="(detail, idx) in item.data" @click="secondBarClick(detail, idx, $event)" class="secondBar">
                            <span class="ga-areaBars__sencondArea">
                                <el-tooltip class="item" effect="dark" :content="detail.name" placement="top">
                                    <span>{{ detail.name }}</span>
                                </el-tooltip>
                            </span>
                            <!--<span class="ga-areaBars__sencondBar" :style="getBarWidth(detail.count)"></span>-->
                            <span class="ga-areaBars__sencondBar"
                                  :w="detail.count"
                                  :style="{'background': activeIdx === idx ? '#00FFBF' : ''}" ref="secondBar"></span>
                            <span class="ga-areaBars__count">{{ detail.count }}</span>
                        </li>
                    </ul>
                </div>
            </el-collapse-item>
        </el-collapse>
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
//                if (this.activeIdx !== idx) {
//                    this.activeIdx = idx
//                } else {
//                    this.activeIdx = -1
//                }
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
        line-height: 18px;
    }
    /*.active {*/
        /*background: #3cf887;*/
    /*}*/
    @component-namespace ga {
        @b areaBars {
            position: relative;
            margin: 5px 0;
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
                /*border-right: 1px solid #7D818D;*/
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
                /*background: #0077BE;*/
                background-image: linear-gradient(90deg, #0076FF 0%, #00C4FF 100%);
                border-radius: 3px;
                /*background: repeating-linear-gradient(90deg, #34befc, #34befc 5px, transparent 0, transparent 6px);*/
                /*background: repeating-linear-gradient(90deg, #34befc, #34befc .4rem, transparent 0, transparent .5rem);*/
                /*background: repeating-linear-gradient(90deg, #0077be, #0077be 0.1rem, transparent 0, transparent 0.13rem);*/
                transition:width 1s;
                -moz-transition:width 1s; /* Firefox 4 */
                -webkit-transition:width 1s; /* Safari and Chrome */
                -o-transition:width 1s; /* Opera */
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
                /*border-right: 1px solid #7D818D;*/
            }
            @e sencondBar {
                margin-right: 10px;
                min-width: 5px;
                width: 10px;
                height: 5px;
                background: #1874F0;
                border-radius: 3px;
                /*background: repeating-linear-gradient(90deg, #fbd13d, #fbd13d 5px, transparent 0, transparent 6px);*/
                transition:width 1s;
                -moz-transition:width 1s; /* Firefox 4 */
                -webkit-transition:width 1s; /* Safari and Chrome */
                -o-transition:width 1s; /* Opera */
            }
        }
    }
</style>
